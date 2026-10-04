# RHLN: One-Page Method Note
**Project:** Rental Housing Law Navigator (Challenge 02)  
**Track:** RealPage × Hack-Nation Hackathon (October 2026)  
**Authors:** Team CtrlZ  

---

### 1. Executive Summary & Design Tenet
Rental housing law in the United States is regulated in overlapping jurisdictional tiers (state statutes, county regulations, municipal ordinances) with nuanced coverage exemptions (building age, unit count, occupancy type). Navigating these laws requires high precision and deterministic consistency.

Our system is founded on a singular architectural principle:
> **"The model reads, code decides."**  
> Large Language Models (LLMs) are used strictly offline to read public statutes and extract structured rule definitions. Runtime address-level lookups and change tracking are **100% deterministic Python code**. There is no runtime vector DB or fuzzy RAG hallucinating legal coverage.

---

### 2. Module A — Automated Rule Extraction & Verification
* **Extraction Pipeline:** Automated document ingestion of the 87-statute corpus using Claude Sonnet (`claude-sonnet-5-5`) with native JSON Schema tool-calling.
* **Verbatim Evidence Verification:** Every rule record requires a verbatim quoted substring (`quoted_span`) of at least 20 characters. Our extractor validates via programmatic substring matching against the raw source document before acceptance. Records that fail exact substring verification are automatically rejected.
* **Schema Conformance:** Extracted rules are validated against the official `rule_record.schema.json`, capturing category, jurisdiction, coverage criteria, exemptions, effective dates, citations, and confidence scores.

---

### 3. Module B — Deterministic Address Coverage Engine
* **Spatial Hierarchy Resolution:** Maps postal addresses and sub-neighborhoods (e.g., Dorchester $\to$ Boston, MA; Van Nuys $\to$ Los Angeles, CA) to Census legal entities (State, County, Consolidated/Municipal City).
* **Kleene 3-Valued Logic:** When property assessor facts (e.g. owner-occupancy or exemption filings) are unobserved in the public parcel data, the engine returns `unknown` with a clear explanation rather than guessing or hallucinating compliance.
* **Precedence & Conflict Resolution:** Stricter local ordinances (e.g. Berkeley Measure BB, Hoboken rent control) take precedence over baseline state statutes (e.g. California AB 1482). Overlapping rules are flagged with `conflict_flag: true` for human review.

---

### 4. Module C — Longitudinal Change Tracking (T1–T5)
The engine evaluates temporal diffs and statutory transitions across all 500 benchmark sample addresses:
* **T1 (CA AB 325 / SB 763):** Correctly evaluates as `not_yet_effective` on `2025-12-31` and `applies` on `2026-01-02` across all 250 California addresses.
* **T2 (Hoboken & Jersey City Local Bans):** Strict boundary enforcement; applies each ban only within its municipal borders (40 Hoboken properties, 50 Jersey City properties, 0 in Newark).
* **T3 (NJ FAIR Act):** Reports `not_yet_effective` on `2026-10-01`, `applies` on `2027-07-02` for all 140 NJ addresses, and flags potential preemption conflicts on local municipal bans.
* **T4 (MA S.2983 / H.5222):** Accurately reports both bills as `pending` (non-enacted) and outputs the 110 MA properties that would be impacted if enacted.
* **T5 (MA Rent Control Ballot Question):** Reflects the SJC ruling striking Initiative Petition 25-21; returns no rent cap for Boston or Cambridge (affected set is empty).

---

### 5. Responsible AI, Ethics & Compliance
* **No Legal Advice:** Every HTTP response injects the `X-Disclaimer` header:  
  *`Not legal advice. This tool summarizes public law for information only.`*
* **Full Traceability:** Every evaluation returns the exact statutory citation, retrieval timestamp, and link to the raw corpus text.
* **Bilingual Equity:** Renter-facing plain-language summaries and interfaces are available in English and Spanish.
* **Auditable Deliverables:** Three reproducible, schema-validated artifacts generated in `out/`:
  1. `rules.json` (Structured rules catalog)
  2. `lookups.json` (Address evaluations for all 500 sample properties on `2026-10-01`)
  3. `changes.json` (Benchmark test results for T1 through T5)
