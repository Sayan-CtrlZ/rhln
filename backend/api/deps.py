"""FastAPI dependencies for authentication, request tracing, and parameter parsing."""

from typing import Optional
import re
from fastapi import Header, Query, Request

from rhln.api.errors import BadRequestError, UnauthorizedError
from rhln.config import settings

ISO_DATE_REGEX = re.compile(r"^\d{4}-\d{2}-\d{2}$")


async def get_request_id(request: Request) -> str:
    """Returns the unique request_id stored in request.state."""
    return getattr(request.state, "request_id", "req_unknown")


async def get_as_of(
    as_of: Optional[str] = Query(
        default=None,
        description="Point-in-time ISO date (YYYY-MM-DD). Defaults to system default if omitted in lookups.",
        examples=["2026-10-01"],
    )
) -> Optional[str]:
    """Validates and returns the as_of date parameter if provided."""
    if as_of is not None:
        if not ISO_DATE_REGEX.match(as_of):
            raise BadRequestError(message=f"as_of must be a valid ISO date in YYYY-MM-DD format, got '{as_of}'")
    return as_of


async def verify_api_key(
    x_api_key: Optional[str] = Header(default=None, alias=settings.API_KEY_HEADER_NAME)
) -> str:
    """Validates API Key for protected endpoints (write endpoints)."""
    if not x_api_key or x_api_key != settings.API_KEY:
        raise UnauthorizedError(message="Invalid or missing X-API-Key header")
    return x_api_key


async def get_lang(
    lang: str = Query(
        default="en",
        description="Response language code ('en' or 'es')",
        pattern="^(en|es)$",
    )
) -> str:
    """Validates and returns language preference."""
    return lang
