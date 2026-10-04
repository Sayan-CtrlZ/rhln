"""Rules catalog and export endpoints."""

import json
import os
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, Query, Response
from fastapi.responses import FileResponse
from pydantic import BaseModel

from rhln.api.deps import get_as_of, get_request_id
from rhln.api.errors import NotFoundError
from rhln.api.schemas import DataEnvelope, wrap_data
from rhln.models import OfficialRuleRecord

router = APIRouter(tags=["Rules"])

RULES_FILE = "out/rules.json"


def load_rules() -> List[OfficialRuleRecord]:
    if not os.path.exists(RULES_FILE):
        return []
    with open(RULES_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
        return [OfficialRuleRecord.model_validate(r) for r in data.get("rules", [])]


@router.get("/rules", response_model=DataEnvelope[List[OfficialRuleRecord]])
async def list_rules(
    jurisdiction: Optional[str] = Query(None, description="e.g. 'CA' or 'Berkeley, CA'"),
    category: Optional[str] = Query(None, description="Rule category"),
    status: Optional[str] = Query(None, description="in_force, not_yet_effective, pending, failed"),
    as_of: Optional[str] = Depends(get_as_of),
    limit: int = Query(50, ge=1, le=500),
    cursor: Optional[str] = Query(None),
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[List[OfficialRuleRecord]]:
    """List and filter rules (TRD P0)."""
    rules = load_rules()

    if jurisdiction:
        rules = [r for r in rules if jurisdiction.lower() in r.jurisdiction.lower()]
    if category:
        rules = [r for r in rules if r.category == category]
    if status:
        rules = [r for r in rules if r.status == status]

    total = len(rules)
    paged = rules[:limit]

    return wrap_data(data=paged, request_id=request_id, as_of=as_of, total=total)


@router.get("/rules/export")
async def export_rules_json():
    """Download the scored rules.json deliverable."""
    if not os.path.exists(RULES_FILE):
        raise NotFoundError("rules.json deliverable has not been generated yet")
    return FileResponse(
        path=RULES_FILE,
        filename="rules.json",
        media_type="application/json",
    )


@router.get("/rules/{rule_id}", response_model=DataEnvelope[OfficialRuleRecord])
async def get_rule(
    rule_id: str,
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[OfficialRuleRecord]:
    """Fetch complete rule record with verbatim quote (TRD P0)."""
    rules = load_rules()
    for r in rules:
        if r.team_rule_id.lower() == rule_id.lower():
            return wrap_data(data=r, request_id=request_id)
    raise NotFoundError(f"Rule with ID '{rule_id}' not found")
