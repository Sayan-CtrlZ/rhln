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


class RuleSourceResponse(BaseModel):
    rule_id: str
    doc_id: Optional[str]
    citation: str
    source_url: str
    quote: str
    text_before: str
    text_after: str


@router.get("/rules/{rule_id}/source", response_model=DataEnvelope[RuleSourceResponse])
async def get_rule_source(
    rule_id: str,
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[RuleSourceResponse]:
    """Fetch verbatim quote in statutory context (text_before, quote, text_after) for TRD 9.5 SourceDrawer."""
    rules = load_rules()
    target_rule: Optional[OfficialRuleRecord] = None
    for r in rules:
        if r.team_rule_id.lower() == rule_id.lower():
            target_rule = r
            break
    if not target_rule:
        raise NotFoundError(f"Rule with ID '{rule_id}' not found")

    text_before = ""
    text_after = ""
    quote = target_rule.quoted_span

    # Try to load document full text from disk or database
    doc_id = target_rule.source_doc_id
    if doc_id:
        doc_path = os.path.join("data", "corpus", "text", f"{doc_id}.txt")
        if os.path.exists(doc_path):
            with open(doc_path, "r", encoding="utf-8", errors="ignore") as f:
                full_text = f.read()
                pos = full_text.find(quote)
                if pos != -1:
                    start_slice = max(0, pos - 450)
                    end_slice = min(len(full_text), pos + len(quote) + 450)
                    text_before = full_text[start_slice:pos]
                    text_after = full_text[pos + len(quote):end_slice]

    if not text_before and not text_after:
        text_before = f"... [Context from official statutory code: {target_rule.citation}] ...\n\n"
        text_after = "\n\n... [Statutory text continues in official codification] ..."

    return wrap_data(
        data=RuleSourceResponse(
            rule_id=target_rule.team_rule_id,
            doc_id=doc_id,
            citation=target_rule.citation,
            source_url=target_rule.source_url,
            quote=quote,
            text_before=text_before,
            text_after=text_after,
        ),
        request_id=request_id,
    )
