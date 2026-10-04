"""Quote verification module ensuring zero hallucinations against source documents."""

import re
from typing import Optional, Tuple
from backend.models import OfficialRuleRecord


def normalize_whitespace(text: str) -> str:
    """Collapses consecutive whitespace to a single space for fuzzy alignment if needed."""
    return re.sub(r"\s+", " ", text).strip()


def verify_quote_span(
    document_text: str, quoted_span: str
) -> Tuple[bool, Optional[int], Optional[int]]:
    """
    Checks if quoted_span exists verbatim in document_text.
    Returns: (is_valid, start_idx, end_idx)
    """
    if not quoted_span or len(quoted_span.strip()) < 20:
        return False, None, None

    # 1. Exact verbatim match check
    exact_idx = document_text.find(quoted_span)
    if exact_idx != -1:
        return True, exact_idx, exact_idx + len(quoted_span)

    # 2. Whitespace-normalized match check
    norm_quote = normalize_whitespace(quoted_span)
    # Search with regex that permits flexible whitespace
    pattern = re.escape(norm_quote)
    pattern = re.sub(r"\\ ", r"\\s+", pattern)

    match = re.search(pattern, document_text)
    if match:
        return True, match.start(), match.end()

    return False, None, None


def verify_rule_evidence(
    rule: OfficialRuleRecord, document_text: str
) -> Tuple[bool, str]:
    """
    Validates a rule record against its source document.
    Returns (passed, failure_reason).
    """
    if len(rule.quoted_span) < 20:
        return False, f"Quoted span too short ({len(rule.quoted_span)} chars < 20 min)"

    is_valid, start, end = verify_quote_span(document_text, rule.quoted_span)
    if not is_valid:
        return False, "Quoted span could not be located in source document text"

    return True, "Verified exact substring in source"
