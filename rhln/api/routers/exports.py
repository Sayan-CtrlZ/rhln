"""Export and evaluation endpoints."""

from typing import Any, Dict
from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from rhln.api.deps import get_request_id, verify_api_key
from rhln.api.schemas import DataEnvelope, wrap_data

router = APIRouter(tags=["Exports & Evaluation"])


class ExportBundleInfo(BaseModel):
    bundle_name: str
    rules_count: int
    lookups_count: int
    changes_count: int
    score_report_included: bool


@router.get("/exports/bundle/latest", response_model=DataEnvelope[ExportBundleInfo])
async def get_latest_bundle_info(
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[ExportBundleInfo]:
    """Summary of current exported deliverables: rules.json, lookups.json, changes.json (TRD P0)."""
    return wrap_data(
        data=ExportBundleInfo(
            bundle_name="rhln_deliverables_latest.zip",
            rules_count=0,
            lookups_count=0,
            changes_count=6,
            score_report_included=True,
        ),
        request_id=request_id,
    )
