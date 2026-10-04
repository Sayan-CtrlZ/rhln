"""Module A Rule extraction pipeline endpoints."""

from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel, Field

from backend.api.deps import get_request_id, verify_api_key
from backend.api.schemas import DataEnvelope, wrap_data

router = APIRouter(prefix="/extraction", tags=["Extraction"])


class ExtractionRunCreate(BaseModel):
    mode: str = Field(default="all", description="all, listed, or new")
    document_ids: Optional[List[str]] = None


class ExtractionRunItem(BaseModel):
    run_id: str
    status: str
    mode: str
    documents_total: int = 0
    documents_processed: int = 0
    rules_extracted: int = 0
    cost_estimate_usd: float = 0.0


@router.post("/runs", response_model=DataEnvelope[ExtractionRunItem])
async def start_extraction_run(
    req: ExtractionRunCreate,
    api_key: str = Depends(verify_api_key),
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[ExtractionRunItem]:
    """Start an extraction run (TRD P0)."""
    item = ExtractionRunItem(
        run_id=f"run_{request_id.replace('req_', '')}",
        status="pending",
        mode=req.mode,
    )
    return wrap_data(data=item, request_id=request_id)


@router.get("/runs", response_model=DataEnvelope[List[ExtractionRunItem]])
async def list_extraction_runs(
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[List[ExtractionRunItem]]:
    """List extraction runs (TRD P1)."""
    return wrap_data(data=[], request_id=request_id, total=0)


@router.get("/runs/{run_id}", response_model=DataEnvelope[Optional[ExtractionRunItem]])
async def get_extraction_run(
    run_id: str,
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[Optional[ExtractionRunItem]]:
    """Get status of an extraction run (TRD P0)."""
    return wrap_data(data=None, request_id=request_id)
