"""Jurisdiction and spatial resolution endpoints."""

import json
import os
from typing import Dict, List, Optional
from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel, Field

from rhln.api.deps import get_request_id, verify_api_key
from rhln.api.errors import NotFoundError
from rhln.api.geo_catalog import JURISDICTION_CATALOG
from rhln.api.schemas import DataEnvelope, wrap_data
from rhln.geo.stack import JurisdictionResolver
from rhln.models import SampleAddress

router = APIRouter(tags=["Jurisdictions"])
geo_resolver = JurisdictionResolver()


class JurisdictionItem(BaseModel):
    id: str
    level: str  # state, county, city, consolidated
    name: str
    state: str
    in_scope: bool = True
    rule_count: int = 0


class AddressFields(BaseModel):
    street: str
    city: str
    state: str
    zip: str


class ResolveRequest(BaseModel):
    street: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip: Optional[str] = None
    address: Optional[AddressFields] = None


class ResolveResult(BaseModel):
    address: dict
    geocode: dict
    stack: List[dict]


def get_rule_counts_by_jurisdiction() -> Dict[str, int]:
    counts: Dict[str, int] = {}
    if os.path.exists("out/rules.json"):
        with open("out/rules.json") as f:
            rules = json.load(f).get("rules", [])
            for r in rules:
                jur = r.get("jurisdiction", "")
                counts[jur] = counts.get(jur, 0) + 1
    return counts


@router.get("/jurisdictions", response_model=DataEnvelope[List[JurisdictionItem]])
async def list_jurisdictions(
    level: Optional[str] = Query(None, description="state, county, city"),
    state: Optional[str] = Query(None, description="Two-letter state code"),
    in_scope: Optional[bool] = Query(True),
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[List[JurisdictionItem]]:
    """List supported jurisdictions with real rule counts (TRD P0)."""
    counts = get_rule_counts_by_jurisdiction()
    items: List[JurisdictionItem] = []

    for entry in JURISDICTION_CATALOG:
        jur_count = counts.get(entry["name"], 0) or counts.get(entry["state"], 0)
        items.append(
            JurisdictionItem(
                id=entry["id"],
                level=entry["level"],
                name=entry["name"],
                state=entry["state"],
                in_scope=entry.get("in_scope", True),
                rule_count=jur_count,
            )
        )

    if state:
        items = [j for j in items if j.state.lower() == state.lower()]
    if level:
        items = [j for j in items if j.level == level]

    return wrap_data(data=items, request_id=request_id, total=len(items))


@router.get("/jurisdictions/{id}", response_model=DataEnvelope[JurisdictionItem])
async def get_jurisdiction(
    id: str,
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[JurisdictionItem]:
    """Get single jurisdiction detail (TRD P0)."""
    counts = get_rule_counts_by_jurisdiction()
    for entry in JURISDICTION_CATALOG:
        if entry["id"].lower() == id.lower():
            jur_count = counts.get(entry["name"], 0) or counts.get(entry["state"], 0)
            return wrap_data(
                data=JurisdictionItem(
                    id=entry["id"],
                    level=entry["level"],
                    name=entry["name"],
                    state=entry["state"],
                    in_scope=entry.get("in_scope", True),
                    rule_count=jur_count,
                ),
                request_id=request_id,
            )
    raise NotFoundError(f"Jurisdiction '{id}' not found")


@router.post("/resolve", response_model=DataEnvelope[ResolveResult])
async def resolve_address_stack(
    req: ResolveRequest,
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[ResolveResult]:
    """Resolve an address to Census geocode and jurisdiction stack without evaluating rules (TRD P0)."""
    street = req.street or (req.address.street if req.address else "")
    city = req.city or (req.address.city if req.address else "")
    state = req.state or (req.address.state if req.address else "")
    zip_code = req.zip or (req.address.zip if req.address else "")

    addr = SampleAddress(
        address_id="ADHOC",
        street_address=street,
        postal_city=city,
        state=state,
        zip=zip_code,
    )
    resolved = geo_resolver.resolve_address(addr)

    res = ResolveResult(
        address={"street": street, "city": city, "state": state, "zip": zip_code},
        geocode={
            "status": "match",
            "legal_city": resolved.legal_city,
            "county": resolved.legal_county,
            "state": resolved.state,
        },
        stack=[n.model_dump() for n in resolved.stack],
    )
    return wrap_data(data=res, request_id=request_id)
