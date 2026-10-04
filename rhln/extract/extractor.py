"""Module A: Automated Rule Extraction Pipeline with Quote Verification and Caching."""

import json
import logging
import os
from typing import Dict, List, Optional
from rhln.config import settings
from rhln.extract.verify import verify_rule_evidence
from rhln.ingest.chunker import LegalChunker
from rhln.ingest.loaders import CorpusLoader, DocumentMeta
from rhln.llm.anthropic import ClaudeExtractor
from rhln.models import OfficialRuleRecord, RulesDeliverable

logger = logging.getLogger("rhln.extract.extractor")


class RuleExtractionPipeline:
    """End-to-end extraction pipeline that extracts, verifies, deduplicates, and caches rules."""

    def __init__(
        self,
        cache_path: str = "data/extracted_rules_cache.json",
        corpus_dir: str = "data/corpus",
    ):
        self.cache_path = cache_path
        self.loader = CorpusLoader(corpus_dir=corpus_dir)
        self.chunker = LegalChunker(max_chunk_chars=12000, overlap_chars=800)
        self.extractor = ClaudeExtractor()

    def load_cache(self) -> Dict[str, List[dict]]:
        """Loads cached rules grouped by doc_id."""
        if os.path.exists(self.cache_path):
            try:
                with open(self.cache_path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception as e:
                logger.warning("Failed to read extraction cache: %s", e)
        return {}

    def save_cache(self, cache: Dict[str, List[dict]]) -> None:
        """Saves cached rules safely."""
        os.makedirs(os.path.dirname(self.cache_path) or ".", exist_ok=True)
        with open(self.cache_path, "w", encoding="utf-8") as f:
            json.dump(cache, f, indent=2)

    async def extract_from_document(
        self, doc: DocumentMeta, force_refresh: bool = False
    ) -> List[OfficialRuleRecord]:
        """Extracts and verifies rules from a single document."""
        if not doc.raw_text or len(doc.raw_text.strip()) == 0:
            return []

        cache = self.load_cache()
        if not force_refresh and doc.doc_id in cache:
            logger.info("Loaded %d cached rules for %s", len(cache[doc.doc_id]), doc.doc_id)
            return [OfficialRuleRecord.model_validate(r) for r in cache[doc.doc_id]]

        chunks = self.chunker.chunk_document(doc.raw_text)
        logger.info("Extracting %s (%d chunks)...", doc.doc_id, len(chunks))

        candidate_rules: List[OfficialRuleRecord] = []
        meta_dict = {
            "doc_id": doc.doc_id,
            "jurisdiction": doc.jurisdiction,
            "url": doc.url,
            "source_type": doc.source_type,
        }

        for i, chunk in enumerate(chunks):
            try:
                extracted = await self.extractor.extract_rules_from_chunk(chunk, meta_dict)
                for r in extracted:
                    # Enforce jurisdiction and level normalization
                    if not r.source_doc_id:
                        r.source_doc_id = doc.doc_id
                    if not r.source_url:
                        r.source_url = doc.url

                    # Normalize level
                    if "," in doc.jurisdiction:
                        r.level = "city"
                    else:
                        r.level = "state"

                    # Verify verbatim evidence against full document text
                    is_valid, reason = verify_rule_evidence(r, doc.raw_text)
                    if is_valid:
                        candidate_rules.append(r)
                    else:
                        logger.warning("Dropped unverified rule %s: %s", r.team_rule_id, reason)
            except Exception as err:
                logger.error("Extraction error in %s chunk %d: %s", doc.doc_id, i, err)

        # Deduplicate candidate rules by citation & category
        unique_rules: List[OfficialRuleRecord] = []
        seen = set()
        for r in candidate_rules:
            key = (r.jurisdiction, r.category, r.citation.strip().lower(), r.requirement.strip()[:60].lower())
            if key not in seen:
                seen.add(key)
                unique_rules.append(r)

        # Update cache
        cache[doc.doc_id] = [r.model_dump() for r in unique_rules]
        self.save_cache(cache)
        return unique_rules

    async def run_pipeline(
        self,
        doc_ids: Optional[List[str]] = None,
        max_docs: Optional[int] = None,
        force_refresh: bool = False,
    ) -> List[OfficialRuleRecord]:
        """Runs the complete extraction pipeline over documents and returns aggregated rules."""
        docs = self.loader.get_captured_documents()
        if doc_ids:
            docs = [d for d in docs if d.doc_id in doc_ids]
        if max_docs:
            docs = docs[:max_docs]

        all_rules: List[OfficialRuleRecord] = []
        for doc in docs:
            rules = await self.extract_from_document(doc, force_refresh=force_refresh)
            all_rules.extend(rules)

        logger.info("Extraction pipeline finished. Total verified rules: %d", len(all_rules))
        return all_rules

    def export_rules_json(self, rules: List[OfficialRuleRecord], output_path: str = "out/rules.json") -> str:
        """Exports verified rules into the official deliverable format rules.json."""
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        deliverable = RulesDeliverable(rules=rules)
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(deliverable.model_dump_json(indent=2))
        logger.info("Saved %d rules to %s", len(rules), output_path)
        return output_path
