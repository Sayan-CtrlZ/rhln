"""Domain data models adhering to the official challenge schema."""

from enum import Enum
from typing import Any, Dict, List, Literal, Optional, Union
from pydantic import BaseModel, Field, field_validator


JurisdictionLevel = Literal["state", "city"]
RuleCategory = Literal[
    "rent_increase_limits",
    "just_cause_eviction",
    "security_deposits",
    "application_screening_fees",
    "screening_restrictions",
    "algorithmic_rent_setting",
]
RuleStatus = Literal["in_force", "not_yet_effective", "pending", "failed"]
LookupResultStatus = Literal["applies", "unknown", "superseded", "not_yet_effective", "pending"]


class OfficialRuleRecord(BaseModel):
    """Rule record matching schema/rule_record.schema.json."""

    team_rule_id: str = Field(..., description="Unique ID, e.g. 'r-0001' or 'CA-ALG-01'")
    jurisdiction: str = Field(..., description="State code ('CA','NJ','MA') or 'City, ST' (e.g. 'San Francisco, CA')")
    level: JurisdictionLevel = Field(..., description="'state' or 'city'")
    category: RuleCategory = Field(..., description="One of the 6 official categories")
    status: RuleStatus = Field(..., description="As of query date: in_force, not_yet_effective, pending, or failed")
    title: str = Field(..., description="Title of the rule")
    requirement: str = Field(..., description="One or two plain-language sentences")
    key_value: Optional[str] = Field(default=None, description="Headline number or formula")
    coverage_conditions: Optional[Union[str, Dict[str, Any]]] = Field(default=None, description="Conditions for coverage")
    exemptions: Optional[str] = Field(default=None, description="Exemptions text or summary")
    overrides: List[str] = Field(default_factory=list, description="IDs this rule supersedes or yields to")
    interaction: Optional[str] = Field(default=None, description="Interaction type or relationship")
    effective_date: Optional[str] = Field(default=None, description="ISO date YYYY-MM-DD or YYYY")
    citation: str = Field(..., description="Official cite, e.g. 'Cal. Civ. Code § 1947.12'")
    source_doc_id: Optional[str] = Field(default=None, description="doc_id from corpus_manifest.csv")
    source_url: str = Field(..., description="Source URL")
    quoted_span: str = Field(..., min_length=20, description="Exact text verbatim copied from source document")
    confidence: Optional[float] = Field(default=1.0, ge=0.0, le=1.0)
    conflict_flag: bool = Field(default=False)
    conflict_note: Optional[str] = Field(default=None)


class RulesDeliverable(BaseModel):
    """File structure for rules.json."""

    rules: List[OfficialRuleRecord]


class AddressLookupRuleResult(BaseModel):
    """Individual rule evaluation in lookups.json."""

    team_rule_id: str
    result: LookupResultStatus
    explanation: str
    conflict_flag: bool = False


class LookupsDeliverable(BaseModel):
    """File structure for lookups.json."""

    as_of: str = "2026-10-01"
    lookups: Dict[str, List[AddressLookupRuleResult]]


class ChangeTestCaseResult(BaseModel):
    """Case result in changes.json."""

    affected_address_ids: List[str] = Field(default_factory=list)
    conflict_flag_address_ids: Optional[List[str]] = Field(default=None)
    notes: Optional[str] = None


class ChangesDeliverable(BaseModel):
    """File structure for changes.json."""

    cases: Dict[str, ChangeTestCaseResult] = Field(default_factory=dict)


class SampleAddress(BaseModel):
    """Property record from sample_addresses.csv."""

    address_id: str
    street_address: str
    postal_city: str
    state: str
    zip: str
    year_built: Optional[int] = None
    units: Optional[int] = None
    use_code: Optional[str] = None
    use_description: Optional[str] = None
    source_dataset: Optional[str] = None
    retrieved_at: Optional[str] = None

    @field_validator("year_built", mode="before")
    @classmethod
    def parse_year_built(cls, v: Any) -> Optional[int]:
        if v is None or v == "" or str(v).strip() == "":
            return None
        try:
            return int(float(v))
        except (ValueError, TypeError):
            return None

    @field_validator("units", mode="before")
    @classmethod
    def parse_units(cls, v: Any) -> Optional[int]:
        if v is None or v == "" or str(v).strip() == "":
            return None
        try:
            return int(float(v))
        except (ValueError, TypeError):
            return None
