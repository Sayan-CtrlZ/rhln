"""Configuration settings for Rental Housing Law Navigator (RHLN)."""

from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    PROJECT_NAME: str = "Rental Housing Law Navigator"
    VERSION: str = "1.0"
    API_V1_PREFIX: str = "/api/v1"

    # Legal Disclaimer
    DISCLAIMER_TEXT_EN: str = "Not legal advice. This tool summarizes public law for information only."
    DISCLAIMER_TEXT_ES: str = "No constituye asesoramiento legal. Esta herramienta resume la legislación pública únicamente con fines informativos."

    # CORS
    CORS_ORIGINS: Union[List[str], str] = ["*"]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return ["*"]

    # Security & API Keys
    API_KEY: str = "rhln-hackathon-write-key"
    API_KEY_HEADER_NAME: str = "X-API-Key"

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/rhln"

    # AI Models
    ANTHROPIC_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    CLAUDE_MODEL: str = "claude-sonnet-5-5"

    # Defaults
    DEFAULT_AS_OF: str = "2026-10-01"
    MAX_UPLOAD_SIZE_MB: int = 10
    RATE_LIMIT_READS_PER_MIN: int = 120
    RATE_LIMIT_WRITES_PER_MIN: int = 30


settings = Settings()
