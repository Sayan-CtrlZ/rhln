"""FastAPI Application Entrypoint for Rental Housing Law Navigator (RHLN)."""

import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException

from rhln.api.errors import (
    RHLNException,
    http_exception_handler,
    rhln_exception_handler,
    unhandled_exception_handler,
    validation_exception_handler,
)
from rhln.api.middleware import RequestContextMiddleware
from rhln.api.routers import (
    changes,
    documents,
    exports,
    extraction,
    jurisdictions,
    lookups,
    rules,
    system,
)
from rhln.config import settings

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [%(name)s] %(message)s",
)
logger = logging.getLogger("rhln.api")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Lifespan context manager for startup and shutdown hooks."""
    logger.info("Starting up %s v%s", settings.PROJECT_NAME, settings.VERSION)
    yield
    logger.info("Shutting down %s", settings.PROJECT_NAME)


def create_app() -> FastAPI:
    """Builds and configures the FastAPI application."""
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description=(
            "Rental Housing Law Navigator (RHLN) API — answers which housing rules apply to an "
            "apartment address today, and what is about to change.\n\n"
            "**Disclaimer:** Not legal advice. This tool summarizes public law for information only."
        ),
        openapi_url="/openapi.json",
        docs_url="/docs",
        redoc_url="/redoc",
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

    return app


app = create_app()
