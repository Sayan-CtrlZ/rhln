"""Jurisdiction and spatial resolution endpoints."""

from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel, Field

from rhln.api.deps import get_request_id, verify_api_key
from rhln.api.schemas import DataEnvelope, wrap_data

router = APIRouter(tags=["Jurisdictions"])


class JurisdictionItem(BaseModel):
    id: str
    level: str  # state, county, city, consolidated
    name: str
    state: str
    in_scope: bool = True
    rule_count: int = 0


class ResolveRequest(BaseModel):
    street: str
    city: str
    state: str
    zip: str


class ResolveResult(BaseModel):
    address: dict
    geocode: dict
    stack: List[dict]


@router.get("/jurisdictions", response_model=DataEnvelope[List[JurisdictionItem]])
async def list_jurisdictions(
    level: Optional[str] = Query(None, description="state, county, city"),
    state: Optional[str] = Query(None, description="Two-letter state code"),
    in_scope: Optional[bool] = Query(True),
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[List[JurisdictionItem]]:
    """List supported jurisdictions with filtering (TRD P0)."""
    # Sample starter data
    items: List[JurisdictionItem] = [
        JurisdictionItem(id="ca", level="state", name="California", state="CA", rule_count=9),
        JurisdictionItem(id="ca-sf", level="consolidated", name="City and County of San Francisco", state="CA", rule_count=6),
        JurisdictionItem(id="nj", level="state", name="New Jersey", state="NJ", rule_count=5),
        JurisdictionItem(id="ma", level="state", name="Massachusetts", state="MA", rule_count=4),
    ]
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
    return wrap_data(
        data=JurisdictionItem(id=id, level="state", name=id.upper(), state=id.upper()[:2], rule_count=0),
        request_id=request_id,
    )


@router.post("/resolve", response_model=DataEnvelope[ResolveResult])
async def resolve_address_stack(
    req: ResolveRequest,
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[ResolveResult]:
    """Resolve an address to Census geocode and jurisdiction stack without evaluating rules (TRD P0)."""
    res = ResolveResult(
        address=req.model_dump(),
        geocode={"status": "match", "lat": 37.75, "lon": -122.41, "state_fips": "06", "county_fips": "075"},
        stack=[
            {"id": "ca", "level": "state", "name": "California"},
            {"id": "ca-sf", "level": "consolidated", "name": "San Francisco"},
        ],
    )
    return wrap_data(data=res, request_id=request_id)
