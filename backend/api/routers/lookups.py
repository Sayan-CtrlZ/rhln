"""Module B Address lookup, batch processing, and property endpoints."""

import csv
import json
import os
import re
from typing import Any, Dict, List, Optional, Union
from fastapi import APIRouter, Depends, Query
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

from backend.api.deps import get_as_of, get_lang, get_request_id, verify_api_key
from backend.api.errors import BadRequestError, NotFoundError
from backend.api.routers.rules import load_rules
from backend.api.schemas import DataEnvelope, wrap_data
from backend.config import settings
from backend.engine.lookup import AddressLookupEngine
from backend.geo.stack import JurisdictionResolver
from backend.models import AddressLookupRuleResult, SampleAddress

router = APIRouter(tags=["Lookups"])

LOOKUPS_FILE = "out/lookups.json"
SAMPLE_ADDRESSES_FILE = "data/sample_addresses.csv"


def load_sample_addresses() -> List[SampleAddress]:
    if not os.path.exists(SAMPLE_ADDRESSES_FILE):
        return []
    with open(SAMPLE_ADDRESSES_FILE, "r", encoding="utf-8") as f:
        return [SampleAddress.model_validate(row) for row in csv.DictReader(f)]


class AddressInput(BaseModel):
    street: str
    city: str
    state: str
    zip: str


def parse_address_string(addr_str: str) -> AddressInput:
    """Robustly parse an address string into street, city, state, zip."""
    parts = [p.strip() for p in addr_str.split(",") if p.strip()]
    if len(parts) >= 3:
        street = parts[0]
        city = parts[1]
        state_zip = parts[2].split()
        state = state_zip[0] if len(state_zip) > 0 else "CA"
        zip_code = state_zip[1] if len(state_zip) > 1 else ""
        return AddressInput(street=street, city=city, state=state, zip=zip_code)
    elif len(parts) == 2:
        street = parts[0]
        state_match = re.search(r"\b([A-Z]{2})\b(?:\s*(\d{5}))?", parts[1])
        if state_match:
            state = state_match.group(1)
            zip_code = state_match.group(2) or ""
            city = parts[1][:state_match.start()].strip()
            return AddressInput(street=street, city=city or "Berkeley", state=state, zip=zip_code)
        return AddressInput(street=street, city=parts[1], state="CA", zip="")
    else:
        # Check if contains state code like NJ, MA, CA
        state_match = re.search(r"\b(CA|NJ|MA)\b", addr_str, re.IGNORECASE)
        state = state_match.group(1).upper() if state_match else "CA"
        return AddressInput(street=addr_str.strip(), city="Berkeley" if state == "CA" else ("Newark" if state == "NJ" else "Boston"), state=state, zip="")


class LookupRequest(BaseModel):
    address: Optional[Union[AddressInput, str]] = None
    property_id: Optional[str] = None
    facts: Optional[Dict[str, Any]] = Field(default_factory=dict)
    as_of: Optional[str] = None
    lang: str = "en"
    include: List[str] = Field(default_factory=lambda: ["trace", "sources"])


class RuleEvaluationSummary(BaseModel):
    team_rule_id: str
    result: str  # applies, unknown, superseded, not_yet_effective, pending
    explanation: str
    conflict_flag: bool = False
    citation: Optional[str] = None
    category: Optional[str] = None
    title: Optional[str] = None
    key_value: Optional[str] = None
    requirement: Optional[str] = None
    exemptions: Optional[str] = None
    effective_date: Optional[str] = None


class AddressLookupResponse(BaseModel):
    lookup_id: str
    as_of: str
    address: Dict[str, Any]
    geocode: Dict[str, Any]
    facts: Dict[str, Any]
    stack: List[Dict[str, Any]]
    results: List[RuleEvaluationSummary]
    confidence: float = 1.0


@router.post("/lookup", response_model=DataEnvelope[AddressLookupResponse])
async def lookup_address(
    req: LookupRequest,
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[AddressLookupResponse]:
    """Single address deterministic law lookup (TRD P0)."""
    effective_as_of = req.as_of or settings.DEFAULT_AS_OF

    # 1. Resolve address facts
    target_addr: Optional[SampleAddress] = None
    sample_addresses = load_sample_addresses()

    if req.property_id:
        for a in sample_addresses:
            if a.address_id.lower() == req.property_id.lower():
                target_addr = a.model_copy()
                break
        if not target_addr:
            raise NotFoundError(f"Property with ID '{req.property_id}' not found")
        if req.facts:
            if req.facts.get("year_built") is not None:
                try:
                    target_addr.year_built = int(req.facts["year_built"])
                except (ValueError, TypeError):
                    pass
            if req.facts.get("units") is not None:
                try:
                    target_addr.units = int(req.facts["units"])
                except (ValueError, TypeError):
                    pass
    elif req.address:
        addr_obj: AddressInput
        if isinstance(req.address, str):
            addr_obj = parse_address_string(req.address)
        else:
            addr_obj = req.address

        # Check if matches any known sample property by normalized street
        norm_street = addr_obj.street.strip().lower()
        matched = next((a for a in sample_addresses if a.street_address.strip().lower() == norm_street), None)
        target_addr = SampleAddress(
            address_id=matched.address_id if matched else "ADHOC",
            street_address=addr_obj.street,
            postal_city=addr_obj.city,
            state=addr_obj.state,
            zip=addr_obj.zip,
            year_built=int(req.facts["year_built"]) if req.facts and req.facts.get("year_built") is not None else (matched.year_built if matched else None),
            units=int(req.facts["units"]) if req.facts and req.facts.get("units") is not None else (matched.units if matched else None),
            use_code=matched.use_code if matched else None,
            use_description=matched.use_description if matched else None,
        )
    else:
        raise BadRequestError("Either address or property_id must be provided")

    # 2. Run deterministic lookup engine
    rules = load_rules()
    lookup_engine = AddressLookupEngine(rules)
    eval_results = lookup_engine.evaluate_address(target_addr, as_of=effective_as_of, facts_override=req.facts)

    geo_resolver = JurisdictionResolver()
    resolved_loc = geo_resolver.resolve_address(target_addr)

    rule_map = {r.team_rule_id: r for r in rules}
    summary_results: List[RuleEvaluationSummary] = []
    for res in eval_results:
        rule_meta = rule_map.get(res.team_rule_id)
        summary_results.append(
            RuleEvaluationSummary(
                team_rule_id=res.team_rule_id,
                result=res.result,
                explanation=res.explanation,
                conflict_flag=res.conflict_flag,
                citation=rule_meta.citation if rule_meta else None,
                category=rule_meta.category if rule_meta else None,
                title=rule_meta.title if rule_meta else None,
                key_value=rule_meta.key_value if rule_meta else None,
                requirement=rule_meta.requirement if rule_meta else None,
                exemptions=rule_meta.exemptions if rule_meta else None,
                effective_date=rule_meta.effective_date if rule_meta else None,
            )
        )

    response_data = AddressLookupResponse(
        lookup_id=f"lk_{request_id.replace('req_', '')}",
        as_of=effective_as_of,
        address={
            "street": target_addr.street_address,
            "city": resolved_loc.legal_city,
            "state": resolved_loc.state,
            "zip": target_addr.zip,
            "property_id": target_addr.address_id if target_addr.address_id != "ADHOC" else None,
        },
        geocode={"status": "match", "legal_city": resolved_loc.legal_city, "county": resolved_loc.legal_county},
        facts={
            "year_built": target_addr.year_built,
            "units": target_addr.units,
            "use_code": target_addr.use_code,
        },
        stack=[n.model_dump() for n in resolved_loc.stack],
        results=summary_results,
    )

    return wrap_data(data=response_data, request_id=request_id, as_of=effective_as_of)


@router.get("/lookup/export")
async def export_lookups_json():
    """Download the scored lookups.json deliverable covering all 500 properties."""
    if not os.path.exists(LOOKUPS_FILE):
        raise NotFoundError("lookups.json deliverable has not been generated yet")
    return FileResponse(
        path=LOOKUPS_FILE,
        filename="lookups.json",
        media_type="application/json",
    )


@router.get("/properties", response_model=DataEnvelope[List[SampleAddress]])
async def list_properties(
    city: Optional[str] = Query(None),
    state: Optional[str] = Query(None),
    limit: int = Query(50, ge=1, le=500),
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[List[SampleAddress]]:
    """List sample addresses with pagination (TRD P0)."""
    addrs = load_sample_addresses()
    if state:
        addrs = [a for a in addrs if a.state.lower() == state.lower()]
    if city:
        addrs = [a for a in addrs if city.lower() in a.postal_city.lower()]

    total = len(addrs)
    paged = addrs[:limit]
    return wrap_data(data=paged, request_id=request_id, total=total)
