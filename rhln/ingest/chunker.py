"""Section-aware chunker for statutes, municipal codes, and bills."""

import re
from typing import List


class LegalChunker:
    """Splits legal text documents while preserving section boundaries and context."""

    def __init__(self, max_chunk_chars: int = 12000, overlap_chars: int = 800):
        self.max_chunk_chars = max_chunk_chars
        self.overlap_chars = overlap_chars
        # Regex to locate legal division headings: Section, Article, Chapter, §
        self.section_pattern = re.compile(
            r"(?:\n|^)(?:SEC\.|SECTION|ARTICLE|CHAPTER|DIVISION|Part|§)\s+[\dA-Za-z\.-]+",
            re.IGNORECASE,
        )

    def chunk_document(self, text: str) -> List[str]:
        """Divides a document into overlapping, section-aware chunks."""
        if not text or len(text.strip()) == 0:
            return []

        # If document fits comfortably in one context, return whole
        if len(text) <= self.max_chunk_chars:
            return [text]

        chunks: List[str] = []
        start = 0
        total_len = len(text)

        while start < total_len:
            end = min(start + self.max_chunk_chars, total_len)

            # If not at the very end, attempt to find a clean section or paragraph break
            if end < total_len:
                # Look for section heading near the end boundary
                search_region = text[max(start, end - 2000) : end]
                matches = list(self.section_pattern.finditer(search_region))
                if matches:
                    # Cut right before the last section heading found in search region
                    last_match = matches[-1]
                    cut_pos = max(start, end - 2000) + last_match.start()
                    if cut_pos > start + 2000:
                        end = cut_pos
                else:
                    # Fallback to double newline (paragraph break)
                    double_nl = text.rfind("\n\n", max(start, end - 1500), end)
                    if double_nl != -1 and double_nl > start + 2000:
                        end = double_nl

            chunks.append(text[start:end].strip())

            # Advance start with overlap
            if end >= total_len:
                break
            start = max(start + 1, end - self.overlap_chars)

        return [c for c in chunks if len(c) > 0]
