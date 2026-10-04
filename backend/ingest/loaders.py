"""Corpus loaders for reading manifest and document texts."""

import csv
import os
from typing import Dict, List, Optional
from pydantic import BaseModel


class DocumentMeta(BaseModel):
    doc_id: str
    jurisdiction: str
    url: str
    source_type: str
    capture: str
    retrieved_at: Optional[str] = None
    sha256: Optional[str] = None
    text_file: Optional[str] = None
    status: str
    raw_text: Optional[str] = None


class CorpusLoader:
    def __init__(self, corpus_dir: str = "data/corpus"):
        self.corpus_dir = corpus_dir
        self.manifest_path = os.path.join(corpus_dir, "corpus_manifest.csv")

    def load_manifest(self) -> List[DocumentMeta]:
        """Loads and returns all documents listed in corpus_manifest.csv."""
        documents: List[DocumentMeta] = []
        if not os.path.exists(self.manifest_path):
            raise FileNotFoundError(f"Manifest not found at {self.manifest_path}")

        with open(self.manifest_path, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                # Normalize keys and values
                doc = DocumentMeta(
                    doc_id=row["doc_id"].strip(),
                    jurisdiction=row["jurisdictions"].strip(),
                    url=row["url"].strip(),
                    source_type=row.get("source_type", "").strip(),
                    capture=row.get("capture", "").strip(),
                    retrieved_at=row.get("retrieved_at", "").strip() or None,
                    sha256=row.get("sha256", "").strip() or None,
                    text_file=row.get("text_file", "").strip() or None,
                    status=row.get("status", "").strip(),
                )

                # Load raw text if available on disk
                if doc.text_file:
                    text_path = os.path.join(self.corpus_dir, doc.text_file)
                    if os.path.exists(text_path):
                        with open(text_path, mode="r", encoding="utf-8", errors="replace") as tf:
                            doc.raw_text = tf.read()

                documents.append(doc)

        return documents

    def get_captured_documents(self) -> List[DocumentMeta]:
        """Returns only documents that have full text available."""
        all_docs = self.load_manifest()
        return [d for d in all_docs if d.raw_text and len(d.raw_text.strip()) > 0]
