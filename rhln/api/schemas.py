"""Pydantic v2 Base Envelopes and Response Schemas for RHLN API."""

from typing import Any, Generic, List, Optional, TypeVar
from pydantic import BaseModel, Field

from rhln.config import settings

T = TypeVar("T")


class MetaResponse(BaseModel):
    """Metadata envelope present in every successful API response."""

    request_id: str = Field(..., description="Unique request tracing ID")
    as_of: Optional[str] = Field(
        default=None,
        description="Point-in-time ISO date (YYYY-MM-DD) for temporal evaluation",
    )
    version: str = Field(default=settings.VERSION, description="API version")
    disclaimer: str = Field(
        default=settings.DISCLAIMER_TEXT_EN,
        description="Mandatory legal disclaimer",
    )
    total: Optional[int] = Field(
        default=None,
        description="Total items available (when paginating lists)",
    )
    next_cursor: Optional[str] = Field(
        default=None,
        description="Opaque pagination cursor for fetching the next page",
    )


class DataEnvelope(BaseModel, Generic[T]):
    """Standard success envelope wrapping all 2xx responses."""

    data: T = Field(..., description="Response payload")
    meta: MetaResponse = Field(..., description="Response metadata")


class ErrorDetail(BaseModel):
    """Specific field or issue detail within an error response."""

    field: Optional[str] = Field(default=None, description="Field name that failed validation")
    issue: str = Field(..., description="Specific validation or operational issue code/description")
    message: Optional[str] = Field(default=None, description="Human-readable explanation")


class ErrorBody(BaseModel):
    """Structured error payload adhering to TRD 8.2."""

    code: str = Field(..., description="Standardized error code (e.g., validation_error, not_found)")
    message: str = Field(..., description="Human-readable explanation of error")
    details: Optional[List[ErrorDetail]] = Field(default=None, description="Detailed validation errors if any")
    request_id: Optional[str] = Field(default=None, description="Request ID associated with the error")


class ErrorEnvelope(BaseModel):
    """Standard error envelope wrapping all non-2xx responses."""

    error: ErrorBody = Field(..., description="Error details body")


def build_meta(
    request_id: str,
    as_of: Optional[str] = None,
    total: Optional[int] = None,
    next_cursor: Optional[str] = None,
    disclaimer: Optional[str] = None,
) -> MetaResponse:
    """Helper to construct standard response metadata."""
    return MetaResponse(
        request_id=request_id,
        as_of=as_of,
        version=settings.VERSION,
        disclaimer=disclaimer or settings.DISCLAIMER_TEXT_EN,
        total=total,
        next_cursor=next_cursor,
    )


def wrap_data(
    data: T,
    request_id: str,
    as_of: Optional[str] = None,
    total: Optional[int] = None,
    next_cursor: Optional[str] = None,
    disclaimer: Optional[str] = None,
) -> DataEnvelope[T]:
    """Helper to wrap response data into a DataEnvelope."""
    return DataEnvelope(
        data=data,
        meta=build_meta(
            request_id=request_id,
            as_of=as_of,
            total=total,
            next_cursor=next_cursor,
            disclaimer=disclaimer,
        ),
    )
