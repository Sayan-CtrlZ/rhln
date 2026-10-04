"""Document management and corpus catalog endpoints."""

import os
import re
import urllib.parse
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
    doc_id: str = Field(..., description="Alias for document ID")
    document_title: str = Field(..., description="Descriptive title of the document")
    jurisdiction: str = Field(..., description="Jurisdiction label")
    jurisdiction_name: str = Field(..., description="Clean City or State name")
    jurisdiction_level: str = Field(..., description="Jurisdiction level: state, county, or city")
    state: str = Field(..., description="State postal code: CA, NJ, MA")
    category: str = Field(..., description="Legal topic category")
    url: str = Field(..., description="Official source URL")
    source_type: str = Field(..., description="official, secondary, code publisher")
    capture: str = Field(..., description="yes or link-only")
    retrieved_at: Optional[str] = Field(default=None)
    has_text: bool = Field(default=False)
    character_count: int = Field(default=0)


class DocumentTextResponse(BaseModel):
    id: str
    doc_id: str
    title: str
    character_count: int
    char_count: int
    text_slice: str
    text: str
    start: int
    end: int


def parse_jurisdiction_details(j_str: str) -> tuple[str, str, str]:
    """Extract (jurisdiction_name, state, jurisdiction_level)."""
    clean = j_str.strip()
    if clean == "CA":
        return "California", "CA", "state"
    if clean == "NJ":
        return "New Jersey", "NJ", "state"
    if clean == "MA":
        return "Massachusetts", "MA", "state"
    if "," in clean:
        parts = [p.strip() for p in clean.split(",")]
        name = parts[0]
        state = parts[1] if len(parts) > 1 else ""
        level = "county" if "County" in name else "city"
        return name, state, level
    return clean, "", "city"


def derive_document_title(doc_id: str, url: str, raw_text: Optional[str] = None) -> str:
    """Extract or synthesize human-readable title from corpus text or URL."""
    path = urllib.parse.urlparse(url).path
    parts = [p for p in path.split("/") if p]
    filename_raw = parts[-1] if parts else ""
    filename_clean = (
        urllib.parse.unquote(filename_raw)
        .split("?")[0]
        .replace(".pdf", "")
        .replace(".html", "")
        .replace("-", " ")
        .replace("_", " ")
        .strip()
    )

    if raw_text:
        lines = [line.strip() for line in raw_text.splitlines()[:25] if line.strip()]
        filtered = [
            line
            for line in lines
            if not line.startswith("SOURCE:")
            and not line.startswith("RETRIEVED:")
            and not line.startswith("http")
            and not line.startswith("Page ")
            and not line.startswith("Skip to")
            and not re.match(r"^\d+\s+[A-Za-z]+\s+(Street|St|Ave|Avenue|Suite)", line)
            and not any(k in line.upper() for k in ["TEL:", "EMAIL:", "WEB:", "FAX:", "TDD:"])
        ]
        if filtered:
            candidate = filtered[0]
            if len(candidate) > 5 and not candidate.startswith("---"):
                if "BERKELEY RENT STABILIZATION BOARD" in candidate.upper() and len(filename_clean) > 3:
                    return f"{candidate} - {filename_clean.title()}"
                return candidate[:140]

    if len(filename_clean) > 3 and not filename_clean.isdigit() and filename_clean.lower() != "view":
        return filename_clean.title()

    return f"Housing Statute / Regulation {doc_id}"


def classify_document_category(title: str, url: str) -> str:
    """Determine topic classification for document."""
    text = (title + " " + url).lower()
    if any(k in text for k in ["fair chance", "screening", "criminal", "background", "credit", "fee"]):
        return "screening_fair_chance"
    if any(k in text for k in ["deposit"]):
        return "security_deposit"
    if any(k in text for k in ["evict", "just cause", "relocation", "moratorium", "retaliation"]):
        return "eviction_protection"
    if any(k in text for k in ["algorithmic", "realpage", "software", "pricing", "7992", "price fixing", "collusion", "artificial intelligence"]):
        return "algorithmic_pricing"
    if any(k in text for k in ["rent control", "stabilization", "aga", "adjustment", "board", "cap", "ab 1482", "costa-hawkins", "fair act", "c. 43"]):
        return "rent_stabilization"
    if any(k in text for k in ["notice", "notification", "habitable", "warranty", "disclosure", "stability"]):
        return "tenant_rights"
    return "general_housing_code"


@router.get("/documents", response_model=DataEnvelope[List[DocumentItem]])
async def list_documents(
    jurisdiction: Optional[str] = Query(None, description="Filter by jurisdiction name"),
    source_type: Optional[str] = Query(None, description="Filter by source type"),
    q: Optional[str] = Query(None, description="Text search in URL or ID"),
    limit: int = Query(100, ge=1, le=500),
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[List[DocumentItem]]:
    """List legal corpus documents with enriched metadata (TRD P0)."""
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
        j_name, state_code, j_level = parse_jurisdiction_details(d.jurisdiction)
        doc_title = derive_document_title(d.doc_id, d.url, d.raw_text)
        cat = classify_document_category(doc_title, d.url)

        items.append(
            DocumentItem(
                id=d.doc_id,
                doc_id=d.doc_id,
                document_title=doc_title,
                jurisdiction=d.jurisdiction,
                jurisdiction_name=j_name,
                jurisdiction_level=j_level,
                state=state_code,
                category=cat,
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
            j_name, state_code, j_level = parse_jurisdiction_details(d.jurisdiction)
            doc_title = derive_document_title(d.doc_id, d.url, d.raw_text)
            cat = classify_document_category(doc_title, d.url)

            return wrap_data(
                data=DocumentItem(
                    id=d.doc_id,
                    doc_id=d.doc_id,
                    document_title=doc_title,
                    jurisdiction=d.jurisdiction,
                    jurisdiction_name=j_name,
                    jurisdiction_level=j_level,
                    state=state_code,
                    category=cat,
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
            slice_end = min(end, total_len) if end is not None else min(start + 10000, total_len)
            text_slice = d.raw_text[start:slice_end]
            doc_title = derive_document_title(d.doc_id, d.url, d.raw_text)

            return wrap_data(
                data=DocumentTextResponse(
                    id=d.doc_id,
                    doc_id=d.doc_id,
                    title=doc_title,
                    character_count=total_len,
                    char_count=total_len,
                    text_slice=text_slice,
                    text=text_slice,
                    start=start,
                    end=slice_end,
                ),
                request_id=request_id,
            )
    raise NotFoundError(f"Document with ID '{id}' not found")
