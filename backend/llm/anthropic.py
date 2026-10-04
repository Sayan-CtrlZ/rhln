"""Anthropic Claude LLM client with structured tool-calling for rule extraction."""

import json
import logging
from typing import Any, Dict, List, Optional
from anthropic import AsyncAnthropic

from backend.config import settings
from backend.models import OfficialRuleRecord

logger = logging.getLogger("backend.llm.anthropic")

EXTRACTION_TOOL_SCHEMA = {
    "name": "extract_housing_rules",
    "description": (
        "Extracts structured rental housing law rules from statutory or municipal text. "
        "Every rule MUST include a verbatim quote span of at least 20 characters matching the text exactly."
    ),
    "input_schema": {
        "type": "object",
        "properties": {
            "rules": {
                "type": "array",
                "items": {
                    "type": "object",
                    "required": [
                        "team_rule_id",
                        "jurisdiction",
                        "level",
                        "category",
                        "status",
                        "title",
                        "requirement",
                        "citation",
                        "source_url",
                        "quoted_span",
                    ],
                    "properties": {
                        "team_rule_id": {
                            "type": "string",
                            "description": "Unique rule ID, e.g. 'CA-RENT-01', 'SF-RENT-01'",
                        },
                        "jurisdiction": {
                            "type": "string",
                            "description": "State code ('CA', 'NJ', 'MA') or 'City, ST' (e.g. 'San Francisco, CA')",
                        },
                        "level": {
                            "type": "string",
                            "enum": ["state", "city"],
                        },
                        "category": {
                            "type": "string",
                            "enum": [
                                "rent_increase_limits",
                                "just_cause_eviction",
                                "security_deposits",
                                "application_screening_fees",
                                "screening_restrictions",
                                "algorithmic_rent_setting",
                            ],
                        },
                        "status": {
                            "type": "string",
                            "enum": ["in_force", "not_yet_effective", "pending", "failed"],
                        },
                        "title": {"type": "string"},
                        "requirement": {
                            "type": "string",
                            "description": "One or two plain-language sentences.",
                        },
                        "key_value": {
                            "type": ["string", "null"],
                            "description": "Headline formula or amount, e.g. '1.5 months rent', '5% + CPI'.",
                        },
                        "coverage_conditions": {
                            "type": ["string", "object", "null"],
                            "description": "Year built or certificate-of-occupancy cutoffs, unit counts, etc.",
                        },
                        "exemptions": {"type": ["string", "null"]},
                        "overrides": {
                            "type": "array",
                            "items": {"type": "string"},
                            "default": [],
                        },
                        "interaction": {"type": ["string", "null"]},
                        "effective_date": {
                            "type": ["string", "null"],
                            "description": "ISO date YYYY-MM-DD or YYYY",
                        },
                        "citation": {
                            "type": "string",
                            "description": "Official citation, e.g. 'Cal. Civ. Code § 1947.12'",
                        },
                        "source_doc_id": {"type": ["string", "null"]},
                        "source_url": {"type": "string"},
                        "quoted_span": {
                            "type": "string",
                            "minLength": 20,
                            "description": "Exact text copied verbatim from the document text.",
                        },
                        "confidence": {"type": "number", "minimum": 0, "maximum": 1},
                        "conflict_flag": {"type": "boolean", "default": False},
                        "conflict_note": {"type": ["string", "null"]},
                    },
                },
            }
        },
        "required": ["rules"],
    },
}


class ClaudeExtractor:
    """Extracts housing rules from legal text using Claude 3.5 Sonnet / Haiku."""

    def __init__(self, api_key: Optional[str] = None):
        key = api_key or settings.ANTHROPIC_API_KEY
        if not key:
            logger.warning("No ANTHROPIC_API_KEY configured. ClaudeExtractor will require an API key to run live.")
            self.client = None
        else:
            self.client = AsyncAnthropic(api_key=key)

    async def extract_rules_from_chunk(
        self,
        text_chunk: str,
        doc_metadata: Dict[str, Any],
        model: Optional[str] = None,
    ) -> List[OfficialRuleRecord]:
        """Runs tool-calling extraction against a legal text chunk."""
        model_name = model or settings.CLAUDE_MODEL
        if not self.client:
            raise ValueError(
                "Anthropic API key is missing. Please add ANTHROPIC_API_KEY to your .env file."
            )

        system_prompt = (
            "You are an expert legal analyst specializing in US rental housing law. "
            "Your task is to extract all discrete housing law rules from the provided text into structured records.\n\n"
            "CRITICAL INSTRUCTIONS:\n"
            "1. Extract ONLY rules that belong to one of the 6 official categories: "
            "rent_increase_limits, just_cause_eviction, security_deposits, application_screening_fees, "
            "screening_restrictions, algorithmic_rent_setting.\n"
            "2. For EVERY rule, 'quoted_span' MUST be an exact, continuous, verbatim substring from the text "
            "(minimum 20 characters). Do not paraphrase quotes.\n"
            "3. Identify coverage conditions (cutoffs for year built, unit counts, building types) and exemptions.\n"
            "4. Distinguish status: 'in_force' (enacted and currently effective as of Oct 2026), "
            "'not_yet_effective' (enacted with future date), 'pending' (bills), or 'failed' (struck measures).\n"
            "5. If no rules exist in this text chunk, return an empty rules array."
        )

        user_content = (
            f"Document Metadata: {json.dumps(doc_metadata)}\n\n"
            f"--- SOURCE LEGAL TEXT ---\n{text_chunk}\n--- END SOURCE TEXT ---"
        )

        response = await self.client.messages.create(
            model=model_name,
            max_tokens=4096,
            system=system_prompt,
            messages=[{"role": "user", "content": user_content}],
            tools=[EXTRACTION_TOOL_SCHEMA],
            tool_choice={"type": "auto"},
        )

        extracted_records: List[OfficialRuleRecord] = []

        # 1. Parse from tool_use block
        for content_block in response.content:
            if content_block.type == "tool_use" and content_block.name == "extract_housing_rules":
                rules_data = content_block.input.get("rules", [])
                for item in rules_data:
                    if not item.get("source_doc_id"):
                        item["source_doc_id"] = doc_metadata.get("doc_id")
                    if not item.get("source_url"):
                        item["source_url"] = doc_metadata.get("url", "")
                    try:
                        extracted_records.append(OfficialRuleRecord.model_validate(item))
                    except Exception as err:
                        logger.warning("Error validating extracted rule: %s\nData: %s", err, item)

        # 2. Fallback: Parse if returned as JSON inside text block
        if not extracted_records:
            for content_block in response.content:
                if content_block.type == "text" and "{" in content_block.text:
                    try:
                        # Extract first JSON object/array
                        start = content_block.text.find("{")
                        end = content_block.text.rfind("}")
                        if start != -1 and end != -1:
                            raw = json.loads(content_block.text[start : end + 1])
                            rules_data = raw.get("rules", []) if isinstance(raw, dict) else raw
                            for item in rules_data:
                                if not item.get("source_doc_id"):
                                    item["source_doc_id"] = doc_metadata.get("doc_id")
                                if not item.get("source_url"):
                                    item["source_url"] = doc_metadata.get("url", "")
                                extracted_records.append(OfficialRuleRecord.model_validate(item))
                    except Exception as err:
                        logger.debug("Could not parse JSON from text block: %s", err)

        return extracted_records
