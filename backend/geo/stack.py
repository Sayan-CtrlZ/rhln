"""Jurisdiction resolution and stack construction for addresses."""

from typing import Any, Dict, List, Optional
from pydantic import BaseModel
from backend.models import SampleAddress


class JurisdictionNode(BaseModel):
    id: str
    level: str  # state, county, city, consolidated
    name: str
    state: str


class ResolvedLocation(BaseModel):
    legal_city: str
    legal_county: str
    state: str
    stack: List[JurisdictionNode]


# Canonical legal city mapping from postal / neighborhood names
POSTAL_TO_LEGAL_CITY = {
    # Boston neighborhoods
    ("allston", "ma"): "Boston",
    ("brighton", "ma"): "Boston",
    ("boston", "ma"): "Boston",
    ("dorchester", "ma"): "Boston",
    ("east boston", "ma"): "Boston",
    ("hyde park", "ma"): "Boston",
    ("jamaica plain", "ma"): "Boston",
    ("mattapan", "ma"): "Boston",
    ("roxbury", "ma"): "Boston",
    ("south boston", "ma"): "Boston",
    ("cambridge", "ma"): "Cambridge",
    # California
    ("berkeley", "ca"): "Berkeley",
    ("los angeles", "ca"): "Los Angeles",
    ("san diego", "ca"): "San Diego",
    ("san ysidro", "ca"): "San Diego",
    ("san francisco", "ca"): "San Francisco",
    ("santa ana", "ca"): "Santa Ana",
    # New Jersey
    ("hoboken", "nj"): "Hoboken",
    ("jersey city", "nj"): "Jersey City",
    ("newark", "nj"): "Newark",
}

CITY_TO_COUNTY = {
    ("Boston", "MA"): "Suffolk County",
    ("Cambridge", "MA"): "Middlesex County",
    ("Berkeley", "CA"): "Alameda County",
    ("Los Angeles", "CA"): "Los Angeles County",
    ("San Diego", "CA"): "San Diego County",
    ("San Francisco", "CA"): "San Francisco County",
    ("Santa Ana", "CA"): "Orange County",
    ("Hoboken", "NJ"): "Hudson County",
    ("Jersey City", "NJ"): "Hudson County",
    ("Newark", "NJ"): "Essex County",
}

STATE_NAMES = {
    "CA": "California",
    "NJ": "New Jersey",
    "MA": "Massachusetts",
}


class JurisdictionResolver:
    """Resolves postal addresses into legal jurisdiction hierarchies."""

    def resolve_address(self, address: SampleAddress) -> ResolvedLocation:
        """Resolves a SampleAddress to its legal jurisdiction hierarchy."""
        postal_city_clean = address.postal_city.strip().lower()
        state_clean = address.state.strip().upper()

        legal_city = POSTAL_TO_LEGAL_CITY.get(
            (postal_city_clean, state_clean.lower()), address.postal_city.strip()
        )
        legal_county = CITY_TO_COUNTY.get((legal_city, state_clean), "Unknown County")

        # Build stack: State -> County -> City
        state_id = state_clean.lower()
        state_node = JurisdictionNode(
            id=state_id,
            level="state",
            name=STATE_NAMES.get(state_clean, state_clean),
            state=state_clean,
        )

        city_slug = legal_city.lower().replace(" ", "-")
        city_id = f"{state_id}-{city_slug}"

        # San Francisco is a consolidated city-county
        if legal_city == "San Francisco":
            city_node = JurisdictionNode(
                id=city_id,
                level="city",
                name="City and County of San Francisco",
                state=state_clean,
            )
            stack = [state_node, city_node]
        else:
            county_slug = legal_county.lower().replace(" ", "-").replace("-county", "")
            county_node = JurisdictionNode(
                id=f"{state_id}-{county_slug}",
                level="county",
                name=legal_county,
                state=state_clean,
            )
            city_node = JurisdictionNode(
                id=city_id,
                level="city",
                name=f"City of {legal_city}",
                state=state_clean,
            )
            stack = [state_node, county_node, city_node]

        return ResolvedLocation(
            legal_city=legal_city,
            legal_county=legal_county,
            state=state_clean,
            stack=stack,
        )

    def is_jurisdiction_match(self, rule_jurisdiction: str, resolved: ResolvedLocation) -> bool:
        """
        Tests if a rule's jurisdiction applies to the resolved address.
        e.g., 'CA' matches any CA address.
              'San Francisco, CA' matches only San Francisco addresses.
        """
        rule_jur = rule_jurisdiction.strip()
        # State-level rule
        if rule_jur.upper() == resolved.state:
            return True

        # City-level rule (e.g. 'Berkeley, CA', 'San Francisco, CA')
        if "," in rule_jur:
            city_part, state_part = [p.strip() for p in rule_jur.split(",", 1)]
            if state_part.upper() == resolved.state and city_part.lower() == resolved.legal_city.lower():
                return True

        return False
