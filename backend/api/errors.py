"""Standard error classes and FastAPI exception handlers for RHLN API."""

import logging
import uuid
from typing import Any, Dict, List, Optional
from fastapi import Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from rhln.api.schemas import ErrorBody, ErrorDetail, ErrorEnvelope
from rhln.config import settings

logger = logging.getLogger("rhln.api.errors")


class RHLNException(Exception):
    """Base exception for application errors."""

    def __init__(
        self,
        code: str,
        message: str,
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        details: Optional[List[ErrorDetail]] = None,
    ):
        super().__init__(message)
        self.code = code
        self.message = message
        self.status_code = status_code
        self.details = details or []


class BadRequestError(RHLNException):
    def __init__(self, message: str = "Bad request", details: Optional[List[ErrorDetail]] = None):
        super().__init__(
            code="bad_request",
            message=message,
            status_code=status.HTTP_400_BAD_REQUEST,
            details=details,
        )


class UnauthorizedError(RHLNException):
    def __init__(self, message: str = "Missing or invalid API key", details: Optional[List[ErrorDetail]] = None):
        super().__init__(
            code="unauthorized",
            message=message,
            status_code=status.HTTP_401_UNAUTHORIZED,
            details=details,
        )


class NotFoundError(RHLNException):
    def __init__(self, message: str = "Resource not found", details: Optional[List[ErrorDetail]] = None):
        super().__init__(
            code="not_found",
            message=message,
            status_code=status.HTTP_404_NOT_FOUND,
            details=details,
        )


class ConflictError(RHLNException):
    def __init__(self, message: str = "Resource conflict or run already in progress", details: Optional[List[ErrorDetail]] = None):
        super().__init__(
            code="conflict",
            message=message,
            status_code=status.HTTP_409_CONFLICT,
            details=details,
        )


class PayloadTooLargeError(RHLNException):
    def __init__(self, message: str = "Payload exceeds size limit", details: Optional[List[ErrorDetail]] = None):
        super().__init__(
            code="payload_too_large",
            message=message,
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            details=details,
        )


class ValidationError(RHLNException):
    def __init__(self, message: str = "Validation failed", details: Optional[List[ErrorDetail]] = None):
        super().__init__(
            code="validation_error",
            message=message,
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            details=details,
        )


class RateLimitedError(RHLNException):
    def __init__(self, message: str = "Too many requests", retry_after_seconds: int = 60):
        super().__init__(
            code="rate_limited",
            message=message,
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
        )
        self.retry_after_seconds = retry_after_seconds


class InternalError(RHLNException):
    def __init__(self, message: str = "An unexpected error occurred", details: Optional[List[ErrorDetail]] = None):
        super().__init__(
            code="internal_error",
            message=message,
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            details=details,
        )


class ProviderError(RHLNException):
    def __init__(self, message: str = "Upstream provider (LLM or geocoder) failed", details: Optional[List[ErrorDetail]] = None):
        super().__init__(
            code="provider_error",
            message=message,
            status_code=status.HTTP_502_BAD_GATEWAY,
            details=details,
        )


class UnavailableError(RHLNException):
    def __init__(self, message: str = "Service unavailable", details: Optional[List[ErrorDetail]] = None):
        super().__init__(
            code="unavailable",
            message=message,
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            details=details,
        )


def _get_request_id(request: Request) -> str:
    """Retrieve or generate request_id."""
    return getattr(request.state, "request_id", None) or f"req_{uuid.uuid4().hex[:12]}"


def _create_error_response(
    status_code: int,
    code: str,
    message: str,
    request_id: str,
    details: Optional[List[ErrorDetail]] = None,
    headers: Optional[Dict[str, str]] = None,
) -> JSONResponse:
    """Helper to build standardized JSON error response with mandatory headers."""
    resp_headers = {
        "X-Request-Id": request_id,
        "X-Disclaimer": settings.DISCLAIMER_TEXT_EN,
    }
    if headers:
        resp_headers.update(headers)

    body = ErrorEnvelope(
        error=ErrorBody(
            code=code,
            message=message,
            details=details,
            request_id=request_id,
        )
    ).model_dump(exclude_none=True)

    return JSONResponse(status_code=status_code, content=body, headers=resp_headers)


async def rhln_exception_handler(request: Request, exc: RHLNException) -> JSONResponse:
    """Handles all internal application exceptions."""
    request_id = _get_request_id(request)
    headers = {}
    if isinstance(exc, RateLimitedError):
        headers["Retry-After"] = str(exc.retry_after_seconds)

    logger.warning("RHLNException [%s]: %s (request_id=%s)", exc.code, exc.message, request_id)
    return _create_error_response(
        status_code=exc.status_code,
        code=exc.code,
        message=exc.message,
        request_id=request_id,
        details=exc.details,
        headers=headers,
    )


async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    """Formats FastAPI/Pydantic validation errors according to TRD 8.2."""
    request_id = _get_request_id(request)
    details: List[ErrorDetail] = []

    for err in exc.errors():
        loc = err.get("loc", ())
        # Filter out body/query/path wrapper prefixes to get clean field name
        field_parts = [str(part) for part in loc if str(part) not in ("body", "query", "path")]
        field_name = ".".join(field_parts) if field_parts else "request"

        details.append(
            ErrorDetail(
                field=field_name,
                issue=err.get("type", "invalid"),
                message=err.get("msg"),
            )
        )

    logger.info("Validation error on %s: %s (request_id=%s)", request.url.path, details, request_id)
    return _create_error_response(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        code="validation_error",
        message="Request fields failed validation",
        request_id=request_id,
        details=details,
    )


async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    """Handles standard HTTPExceptions from Starlette/FastAPI."""
    request_id = _get_request_id(request)

    status_code_map = {
        400: "bad_request",
        401: "unauthorized",
        403: "forbidden",
        404: "not_found",
        405: "method_not_allowed",
        409: "conflict",
        413: "payload_too_large",
        429: "rate_limited",
        500: "internal_error",
        502: "provider_error",
        503: "unavailable",
    }
    code = status_code_map.get(exc.status_code, "http_error")
    message = str(exc.detail) if exc.detail else "HTTP Exception"

    return _create_error_response(
        status_code=exc.status_code,
        code=code,
        message=message,
        request_id=request_id,
    )


async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Catches unhandled errors, logs traceback, returns 500 without leaking stack traces."""
    request_id = _get_request_id(request)
    logger.exception("Unhandled server error: %s (request_id=%s)", exc, request_id)

    return _create_error_response(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        code="internal_error",
        message="An unexpected internal server error occurred",
        request_id=request_id,
    )
