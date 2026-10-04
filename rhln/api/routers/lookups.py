"""Module B Address lookup, batch processing, and property endpoints."""

import csv
import json
import os
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, Query
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

from rhln.api.deps import get_as_of, get_lang, get_request_id, verify_api_key
from rhln.api.errors import BadRequestError, NotFoundError
from rhln.api.routers.rules import load_rules
from rhln.api.schemas import DataEnvelope, wrap_data
from rhln.config import settings
from rhln.engine.lookup import AddressLookupEngine
from rhln.geo.stack import JurisdictionResolver
from rhln.models import AddressLookupRuleResult, SampleAddress

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


class LookupRequest(BaseModel):
    address: Optional[AddressInput] = None
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
                target_addr = a
                break
        if not target_addr:
            raise NotFoundError(f"Property with ID '{req.property_id}' not found")
    elif req.address:
        target_addr = SampleAddress(
            address_id="ADHOC",
            street_address=req.address.street,
            postal_city=req.address.city,
            state=req.address.state,
            zip=req.address.zip,
            year_built=req.facts.get("year_built") if req.facts else None,
            units=req.facts.get("units") if req.facts else None,
        )
    else:
        raise BadRequestError("Either address or property_id must be provided")

    # 2. Run deterministic lookup engine
    rules = load_rules()
    lookup_engine = AddressLookupEngine(rules)
    eval_results = lookup_engine.evaluate_address(target_addr, as_of=effective_as_of)

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
