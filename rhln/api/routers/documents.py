"""Document management and corpus catalog endpoints."""

from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel, Field

from rhln.api.deps import get_request_id, verify_api_key
from rhln.api.schemas import DataEnvelope, wrap_data

router = APIRouter(tags=["Documents"])


class DocumentItem(BaseModel):
    id: str
    jurisdiction_id: str
    doc_type: str  # statute, ordinance, court_rule, bill, voter_pamphlet
    title: str
    citation: str
    effective_date: Optional[str] = None
    character_count: int = 0
    rule_count: int = 0


@router.get("/documents", response_model=DataEnvelope[List[DocumentItem]])
async def list_documents(
    jurisdiction: Optional[str] = Query(None),
    doc_type: Optional[str] = Query(None),
    q: Optional[str] = Query(None),
    limit: int = Query(50, ge=1, le=500),
    cursor: Optional[str] = Query(None),
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[List[DocumentItem]]:
    """List corpus documents with metadata (TRD P0)."""
    return wrap_data(data=[], request_id=request_id, total=0)


@router.get("/documents/{id}", response_model=DataEnvelope[Optional[DocumentItem]])
async def get_document(
    id: str,
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[Optional[DocumentItem]]:
    """Get single document metadata and profile (TRD P0)."""
    return wrap_data(data=None, request_id=request_id)
