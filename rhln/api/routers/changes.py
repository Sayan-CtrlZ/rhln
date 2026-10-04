"""Module C Change tracking, scenario diffs, and conflict detection endpoints."""

import json
import os
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

from rhln.api.deps import get_request_id, verify_api_key
from rhln.api.errors import NotFoundError
from rhln.api.routers.lookups import load_sample_addresses
from rhln.api.schemas import DataEnvelope, wrap_data
from rhln.change.cases import ChangeTrackingEngine

router = APIRouter(prefix="/changes", tags=["Change Tracking"])

CHANGES_FILE = "out/changes.json"


class ChangeCaseItem(BaseModel):
    case_id: str
    title: str
    description: str
    as_of_before: Optional[str] = None
    as_of_after: Optional[str] = None
    target_jurisdiction: str
    affected_address_count: int = 0
    conflict_count: int = 0


@router.get("/cases", response_model=DataEnvelope[List[ChangeCaseItem]])
async def list_change_cases(
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[List[ChangeCaseItem]]:
    """List change scenarios T1 to T5 (TRD P0)."""
    addresses = load_sample_addresses()
    engine = ChangeTrackingEngine(addresses)
    res_t1 = engine.evaluate_t1()
    res_t2 = engine.evaluate_t2()
    res_t3 = engine.evaluate_t3()
    res_t4 = engine.evaluate_t4()
    res_t5 = engine.evaluate_t5()
    res_t6 = engine.evaluate_t6()

    cases = [
        ChangeCaseItem(
            case_id="T1",
            title="California Assembly Bill 325 and Senate Bill 763 algorithmic pricing law takes effect",
            description="Antitrust provisions targeting rent setting through common pricing algorithms",
            as_of_before="2025-12-31",
            as_of_after="2026-01-02",
            target_jurisdiction="CA",
            affected_address_count=len(res_t1.affected_address_ids),
        ),
        ChangeCaseItem(
            case_id="T2",
            title="Hoboken versus Jersey City municipal algorithmic pricing bans",
            description="Strict municipal boundary enforcement: Hoboken Ordinance Chapter 158 versus Jersey City Ordinance Section 218-12",
            target_jurisdiction="NJ",
            affected_address_count=len(res_t2.affected_address_ids),
        ),
        ChangeCaseItem(
            case_id="T3",
            title="New Jersey FAIR Act: future effective date with local preemption conflict",
            description="Enacted statewide law with potential preemption of Hoboken and Jersey City ordinances",
            as_of_before="2026-10-01",
            as_of_after="2027-07-02",
            target_jurisdiction="NJ",
            affected_address_count=len(res_t3.affected_address_ids),
            conflict_count=len(res_t3.conflict_flag_address_ids or []),
        ),
        ChangeCaseItem(
            case_id="T4",
            title="Massachusetts pending algorithmic rent bills: Senate Bill 2983 and House Bill 5222",
            description="Statewide bills not yet enacted; the affected set shows the impact if they pass",
            target_jurisdiction="MA",
            affected_address_count=len(res_t4.affected_address_ids),
        ),
        ChangeCaseItem(
            case_id="T5",
            title="Massachusetts rent control ballot question struck down by the Supreme Judicial Court",
            description="Negative test: the ballot initiative was struck down, and Massachusetts General Laws Chapter 40P bars local rent control",
            target_jurisdiction="MA",
            affected_address_count=0,
        ),
        ChangeCaseItem(
            case_id="T6",
            title="Fictional Cambridge municipal ordinance on algorithmic rent setting (Hour-16 Live Release)",
            description="Live unaided extraction and simulation: future effective date modeled across all Cambridge addresses",
            as_of_before="2026-10-01",
            as_of_after="2027-01-02",
            target_jurisdiction="MA",
            affected_address_count=len(res_t6.affected_address_ids),
        ),
    ]
    return wrap_data(data=cases, request_id=request_id, total=len(cases))


@router.get("/cases/{case_id}", response_model=DataEnvelope[Dict[str, Any]])
async def get_change_case_detail(
    case_id: str,
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[Dict[str, Any]]:
    """Fetch specific change case results with affected address IDs."""
    addresses = load_sample_addresses()
    engine = ChangeTrackingEngine(addresses)
    method_map = {
        "T1": engine.evaluate_t1,
        "T2": engine.evaluate_t2,
        "T3": engine.evaluate_t3,
        "T4": engine.evaluate_t4,
        "T5": engine.evaluate_t5,
        "T6": engine.evaluate_t6,
    }
    func = method_map.get(case_id.upper())
    if not func:
        raise NotFoundError(f"Change case '{case_id}' not found")

    result = func()
    return wrap_data(data=result.model_dump(exclude_none=True), request_id=request_id)



@router.get("/export")
async def export_changes_json():
    """Download the scored changes.json deliverable."""
    if not os.path.exists(CHANGES_FILE):
        raise NotFoundError("changes.json deliverable has not been generated yet")
    return FileResponse(
        path=CHANGES_FILE,
        filename="changes.json",
        media_type="application/json",
    )
