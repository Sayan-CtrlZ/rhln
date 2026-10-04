"""Document management and corpus catalog endpoints."""

from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel, Field

from rhln.api.deps import get_request_id
from rhln.api.errors import NotFoundError
from rhln.api.schemas import DataEnvelope, wrap_data
from rhln.ingest.loaders import CorpusLoader, DocumentMeta

router = APIRouter(tags=["Documents"])

corpus_loader = CorpusLoader(corpus_dir="data/corpus")


class DocumentItem(BaseModel):
    id: str = Field(..., description="Document ID (e.g. D001)")
    jurisdiction: str = Field(..., description="Jurisdiction label")
    url: str = Field(..., description="Official source URL")
    source_type: str = Field(..., description="official, secondary, code publisher")
    capture: str = Field(..., description="yes or link-only")
    retrieved_at: Optional[str] = Field(default=None)
    has_text: bool = Field(default=False)
    character_count: int = Field(default=0)


class DocumentTextResponse(BaseModel):
    id: str
    character_count: int
    text_slice: str
    start: int
    end: int


@router.get("/documents", response_model=DataEnvelope[List[DocumentItem]])
async def list_documents(
    jurisdiction: Optional[str] = Query(None, description="Filter by jurisdiction name"),
    source_type: Optional[str] = Query(None, description="Filter by source type"),
    q: Optional[str] = Query(None, description="Text search in URL or ID"),
    limit: int = Query(50, ge=1, le=500),
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[List[DocumentItem]]:
    """List legal corpus documents with metadata (TRD P0)."""
    manifest_docs = corpus_loader.load_manifest()

    items: List[DocumentItem] = []
    for d in manifest_docs:
        if jurisdiction and jurisdiction.lower() not in d.jurisdiction.lower():
            continue
        if source_type and source_type.lower() not in d.source_type.lower():
            continue
        if q and q.lower() not in d.doc_id.lower() and q.lower() not in d.url.lower():
            continue

        char_count = len(d.raw_text) if d.raw_text else 0
        items.append(
            DocumentItem(
                id=d.doc_id,
                jurisdiction=d.jurisdiction,
                url=d.url,
                source_type=d.source_type,
                capture=d.capture,
                retrieved_at=d.retrieved_at,
                has_text=bool(d.raw_text and len(d.raw_text.strip()) > 0),
                character_count=char_count,
            )
        )

    total = len(items)
    paged = items[:limit]
    return wrap_data(data=paged, request_id=request_id, total=total)


@router.get("/documents/{id}", response_model=DataEnvelope[DocumentItem])
async def get_document(
    id: str,
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[DocumentItem]:
    """Get single document metadata and profile (TRD P0)."""
    manifest_docs = corpus_loader.load_manifest()
    for d in manifest_docs:
        if d.doc_id.lower() == id.lower():
            char_count = len(d.raw_text) if d.raw_text else 0
            return wrap_data(
                data=DocumentItem(
                    id=d.doc_id,
                    jurisdiction=d.jurisdiction,
                    url=d.url,
                    source_type=d.source_type,
                    capture=d.capture,
                    retrieved_at=d.retrieved_at,
                    has_text=bool(d.raw_text and len(d.raw_text.strip()) > 0),
                    character_count=char_count,
                ),
                request_id=request_id,
            )
    raise NotFoundError(f"Document with ID '{id}' not found")


@router.get("/documents/{id}/text", response_model=DataEnvelope[DocumentTextResponse])
async def get_document_text(
    id: str,
    start: int = Query(0, ge=0),
    end: Optional[int] = Query(None),
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[DocumentTextResponse]:
    """Fetch text or a slice from a corpus document (TRD P0)."""
    manifest_docs = corpus_loader.load_manifest()
    for d in manifest_docs:
        if d.doc_id.lower() == id.lower():
            if not d.raw_text:
                raise NotFoundError(f"Document '{id}' is link-only and has no local text available")

            total_len = len(d.raw_text)
            slice_end = min(end, total_len) if end is not None else min(start + 5000, total_len)
            text_slice = d.raw_text[start:slice_end]

            return wrap_data(
                data=DocumentTextResponse(
                    id=d.doc_id,
                    character_count=total_len,
                    text_slice=text_slice,
                    start=start,
                    end=slice_end,
                ),
                request_id=request_id,
            )
    raise NotFoundError(f"Document with ID '{id}' not found")
