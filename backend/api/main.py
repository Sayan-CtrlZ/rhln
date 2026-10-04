"""FastAPI Application Entrypoint for Rental Housing Law Navigator (RHLN)."""

import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException

from backend.api.errors import (
    RHLNException,
    http_exception_handler,
    rhln_exception_handler,
    unhandled_exception_handler,
    validation_exception_handler,
)
from backend.api.middleware import RequestContextMiddleware
from backend.api.routers import (
    ai,
    audit,
    changes,
    documents,
    exports,
    extraction,
    jurisdictions,
    lookups,
    rules,
    system,
)
from backend.config import settings

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [%(name)s] %(message)s",
)
logger = logging.getLogger("backend.api")


from backend.db import seed_database_if_needed


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Lifespan context manager for startup and shutdown hooks."""
    logger.info("Starting up %s v%s", settings.PROJECT_NAME, settings.VERSION)
    try:
        seed_database_if_needed()
    except Exception as exc:
        logger.warning("Database seeding notice: %s", exc)
    yield
    logger.info("Shutting down %s", settings.PROJECT_NAME)


TAGS_METADATA = [
    {
        "name": "System",
        "description": "System health, metadata, prompt versions, and mandatory legal disclaimers (TRD Section 8.3).",
    },
    {
        "name": "Jurisdictions",
        "description": "Supported jurisdictions and Census-level spatial hierarchy resolution (State -> County -> City).",
    },
    {
        "name": "Documents",
        "description": "Corpus manifest of 87 statutory documents and raw source text reader for quote verification.",
    },
    {
        "name": "Extraction",
        "description": "Offline Lexi statutory rule extraction pipeline status and execution triggers.",
    },
    {
        "name": "Rules",
        "description": "Extracted statutory housing rules catalog with verified verbatim quotes and schema validation.",
    },
    {
        "name": "Lookups",
        "description": "Deterministic address-level rulebook lookup engine and 500 benchmark sample properties.",
    },
    {
        "name": "Change Tracking",
        "description": "Longitudinal change evaluation scenarios (T1 through T6) tracking statutory shifts.",
    },
    {
        "name": "Exports & Evaluation",
        "description": "Direct downloads of official system deliverables (rules.json, lookups.json, changes.json, and all-in-one ZIP).",
    },
]


def create_app() -> FastAPI:
    """Builds and configures the FastAPI application."""
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description=(
            "## Rental Housing Law Navigator (RHLN) API\n\n"
            "An AI and deterministic logic system that turns thousands of pages of housing statutes into "
            "accurate, cited, address-level answers for renters, housing advocates, and property managers.\n\n"
            "### Core Architectural Tenet\n"
            "*'The model reads, code decides'*: Lexi extracts structured rules offline; "
            "online address lookup is 100% deterministic Python code using Kleene 3-valued logic.\n\n"
            "**Disclaimer:** Not legal advice. This tool summarizes public law for information only."
        ),
        openapi_url="/openapi.json",
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_tags=TAGS_METADATA,
        lifespan=lifespan,
    )

    # 1. Custom Exception Handlers
    app.add_exception_handler(RHLNException, rhln_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(StarletteHTTPException, http_exception_handler)
    app.add_exception_handler(Exception, unhandled_exception_handler)

    # 2. Middlewares (FastAPI executes outermost middleware first)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["X-Request-Id", "X-Disclaimer", "X-As-Of"],
    )
    app.add_middleware(RequestContextMiddleware)

    # 3. Mount Routers at root (for health/meta) and /api/v1
    app.include_router(system.router)

    prefix = settings.API_V1_PREFIX
    app.include_router(system.router, prefix=prefix)
    app.include_router(jurisdictions.router, prefix=prefix)
    app.include_router(documents.router, prefix=prefix)
    app.include_router(extraction.router, prefix=prefix)
    app.include_router(rules.router, prefix=prefix)
    app.include_router(lookups.router, prefix=prefix)
    app.include_router(changes.router, prefix=prefix)
    app.include_router(exports.router, prefix=prefix)
    app.include_router(ai.router, prefix=prefix)
    app.include_router(audit.router, prefix=prefix)

    return app


app = create_app()
