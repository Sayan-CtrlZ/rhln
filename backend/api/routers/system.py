"""System, health, and meta endpoints."""

from typing import Any, Dict, List
from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from backend.api.deps import get_lang, get_request_id
from backend.api.schemas import DataEnvelope, wrap_data
from backend.config import settings

router = APIRouter(tags=["System"])


class HealthStatus(BaseModel):
    status: str = Field(default="ok", description="Application status")
    database: str = Field(default="configured", description="Database connectivity status")


class MetaInfo(BaseModel):
    project: str = Field(default=settings.PROJECT_NAME)
    version: str = Field(default=settings.VERSION)
    default_as_of: str = Field(default=settings.DEFAULT_AS_OF)
    jurisdictions_supported: List[str] = Field(
        default=[
            "ca", "ca-sf", "ca-oakland", "ca-berkeley", "ca-san-jose",
            "nj", "nj-hoboken", "nj-jersey-city", "nj-newark",
            "ma", "ma-boston", "ma-cambridge",
        ]
    )
    categories_supported: List[str] = Field(
        default=[
            "rent_increase_limits",
            "just_cause_eviction",
            "security_deposits",
            "lease_terms",
            "disclosure_requirements",
            "algorithmic_rent_setting",
        ]
    )
    prompt_versions: Dict[str, str] = Field(
        default={
            "profile": "profile.v1",
            "extract_rules": "extract_rules.v1",
            "relations": "relations.v1",
            "summarize": "summarize.v1",
            "translate": "translate.v1",
        }
    )


class DisclaimerData(BaseModel):
    lang: str
    disclaimer: str


@router.get("/health", response_model=DataEnvelope[HealthStatus])
async def get_health(request_id: str = Depends(get_request_id)) -> DataEnvelope[HealthStatus]:
    """Health check endpoint (TRD P0)."""
    return wrap_data(data=HealthStatus(), request_id=request_id)


@router.get("/meta", response_model=DataEnvelope[MetaInfo])
async def get_meta(request_id: str = Depends(get_request_id)) -> DataEnvelope[MetaInfo]:
    """Corpus, version, and supported parameters metadata (TRD P0)."""
    return wrap_data(
        data=MetaInfo(),
        request_id=request_id,
        as_of=settings.DEFAULT_AS_OF,
    )


@router.get("/disclaimer", response_model=DataEnvelope[DisclaimerData])
async def get_disclaimer(
    lang: str = Depends(get_lang),
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[DisclaimerData]:
    """Legal disclaimer in requested language (TRD P0)."""
    text = settings.DISCLAIMER_TEXT_ES if lang == "es" else settings.DISCLAIMER_TEXT_EN
    return wrap_data(
        data=DisclaimerData(lang=lang, disclaimer=text),
        request_id=request_id,
        disclaimer=text,
    )
