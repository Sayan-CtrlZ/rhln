# Rental Housing Law Navigator (RHLN)

> **Hack-Nation × RealPage Hackathon · Challenge 02: Rental Housing Law Navigator**  
> *Autonomous AI Rule Extraction & Deterministic Multi-Jurisdictional Housing Law Engine*

---

## 1. Project Overview & Motivation

Rental housing in the United States is regulated in complex, overlapping jurisdictional tiers: state statutes, county regulations, municipal ordinances, and local rent board rules. Determining whether a specific housing law applies to an apartment depends on nuanced property facts (building construction year, unit count, occupancy type, tenancy tenure) and changes frequently over time.

**Rental Housing Law Navigator (RHLN)** solves this challenge by transforming thousands of pages of housing statutes into accurate, cited, address-level answers for renters, housing advocates, and property managers.

### Core Architectural Tenet: *"The Model Reads, Code Decides"*

```
                     OFFLINE PIPELINE                                      ONLINE ENGINE
+--------------------+      +--------------------+      +---------------------+      +---------------------+
| 87 Public Statutes | ---> | Claude Sonnet 5.5  | ---> |   out/rules.json    | ---> | Deterministic Logic |
|   & Municipal Acts |      | & Quote Verifier   |      | (Validated Schema)  |      |   (Kleene 3-Valued) |
+--------------------+      +--------------------+      +---------------------+      +---------------------+
                                                                                                |
                                                               +-------------------+            v
                                                               | Address & Facts   | ---> [ Applies / Unknown / ]
                                                               | (500 Properties)  |      [ Superseded / Pending]
                                                               +-------------------+
```

1. **LLMs Run Strictly Offline:** Claude Sonnet (`claude-sonnet-5-5`) reads raw statutory legal documents offline and extracts structured rule definitions into standard schemas.
2. **Code Decides Online:** Address lookup and rule evaluation are **100% deterministic Python code**. There is no runtime vector search or fuzzy RAG hallucinating legal coverage.
3. **Evidence-First Verification:** Every single rule must contain a verified verbatim quoted substring ($\ge 20$ characters) matching the source document in `data/corpus/`.
4. **Kleene 3-Valued Logic (`true`, `false`, `unknown`):** If a property assessor fact is missing (e.g. unknown owner occupancy), the engine safely outputs `unknown` with a clear explanation rather than guessing.
5. **Explicit Precedence & Conflict Detection:** Local stricter caps (e.g., Boston/Cambridge municipal rules) override state baselines; potential preemption conflicts are flagged for review.

---

## 2. Quickstart Guide

### Prerequisites
* Linux / macOS
* Python 3.11+
* Node.js 18+ & npm

### Step 1: Backend Setup & Launch

```bash
# 1. Activate virtual environment
source .venv/bin/activate

# 2. Install dependencies (if not already installed)
pip install -r requirements.txt

# 3. Launch FastAPI backend on port 8000
uvicorn rhln.api.main:app --host 0.0.0.0 --port 8000 --reload
```

* Backend API is now live at: `http://localhost:8000`
* **Interactive Swagger UI:** `http://localhost:8000/docs`
* **ReDoc Documentation:** `http://localhost:8000/redoc`
* **OpenAPI JSON:** `http://localhost:8000/openapi.json`

### Step 2: Frontend Setup & Launch

```bash
# 1. Navigate to web directory
cd web

# 2. Install web dependencies (TanStack Start, React 19, TailwindCSS v4)
npm install

# 3. Launch frontend dev server on port 3000
npm run dev -- --port 3000
```

* Web UI is now live at: `http://localhost:3000`

---

## 3. End-to-End Web Application Architecture

The frontend application (`web/`) is an end-to-end multi-page web application built with **React 19, TanStack Start, and TailwindCSS v4**. It features a dedicated landing page plus six independent, fully functional workspaces connected directly to the FastAPI backend:

| Page / Route | Title & Purpose | Live Endpoints Connected |
| :--- | :--- | :--- |
| **`/`** | **Official Landing Page**<br>System introduction, value proposition, quick-evaluator preview, and architectural tenets. | `GET /api/v1/meta`, `GET /health` |
| **`/lookup`** | **Address Lookup & Rule Engine**<br>Evaluate apartment addresses against statutory rules with property facts, As-Of calendar presets, Kleene logic badges, and verbatim evidence drawer. | `POST /api/v1/lookup`, `GET /api/v1/properties` |
| **`/jurisdictions`** | **Jurisdictions Catalog & Stack Resolver**<br>Directory of all 13 supported jurisdictions across CA, NJ, and MA with rule counts and an interactive geocode/spatial resolution sandbox. | `GET /api/v1/jurisdictions`, `POST /api/v1/resolve` |
| **`/changes`** | **Change Tracking Benchmark (T1–T5)**<br>Longitudinal scenario center for T1 through T5, with visual before/after timeline comparison, address-level status shifts, and conflict flags. | `GET /api/v1/changes/cases`, `GET /api/v1/changes/cases/{id}` |
| **`/rules`** | **Housing Rules Registry**<br>Searchable and filterable catalog of all extracted rules with statutory citations, criteria, effective dates, and verified quotes. | `GET /api/v1/rules`, `GET /api/v1/rules/{id}` |
| **`/documents`** | **Corpus Law Library & Reader**<br>Manifest browser of all 87 public housing statutes with an in-app full legal text modal reader. | `GET /api/v1/documents`, `GET /api/v1/documents/{id}/text` |
| **`/api`** | **API Reference & Deliverables Hub**<br>Direct links to interactive Swagger UI (`/docs`), ReDoc (`/redoc`), OpenAPI spec, and downloads for scored files (`rules.json`, `lookups.json`, `changes.json`, `rhln_deliverables.zip`). | `GET /health`, `GET /api/v1/meta`, Deliverables Exports |

---

## 4. Official Scored Deliverables (`out/`)

The repository includes pre-generated, schema-validated deliverables ready for evaluation:

| File Path | Description | Evaluation Scope |
| :--- | :--- | :--- |
| [`out/rules.json`](file:///home/anonym/Documents/rhln/out/rules.json) | Extracted statutory rules with verified quotes and criteria | Validated against `rule_record.schema.json` |
| [`out/lookups.json`](file:///home/anonym/Documents/rhln/out/lookups.json) | Deterministic rulebook evaluations on `2026-10-01` | All 500 benchmark sample addresses |
| [`out/changes.json`](file:///home/anonym/Documents/rhln/out/changes.json) | Longitudinal change tracking evaluations | Official benchmark cases T1–T5 |
| [`rhln_deliverables.zip`](http://localhost:8000/api/v1/exports/bundle/download) | Complete ZIP archive of all 3 scored files | Instant evaluator download |

### Regenerating Scored Deliverables via CLI

You can regenerate any or all deliverables at any time using the unified CLI:

```bash
# 1. Extract rules from corpus documents using Claude Sonnet
python cli.py extract --doc D001

# 2. Run deterministic lookup across all 500 addresses
python cli.py lookup-all --as-of 2026-10-01

# 3. Evaluate change tracking benchmark cases T1-T5
python cli.py change-all

# 4. Export all scored files and validate schemas
python cli.py export-all
```

---

## 5. API Reference & Swagger Endpoints

All endpoints are hosted under `/api/v1/` and comply with the RHLN Technical Requirements Document (TRD v1.0). Every response includes standard JSON envelopes and required headers (`X-Disclaimer`, `X-Request-Id`, `X-As-Of`).

### Core Endpoints Summary

| Tag | Method | Path | Summary | TRD Ref |
| :--- | :--- | :--- | :--- | :--- |
| **System** | `GET` | `/health` | Server health and database connection status | TRD 8.3 |
| **System** | `GET` | `/api/v1/meta` | Supported jurisdictions, categories, prompt versions | TRD 8.3 |
| **System** | `GET` | `/api/v1/disclaimer` | Mandatory legal disclaimer (English / Spanish) | TRD 8.3 |
| **Jurisdictions** | `GET` | `/api/v1/jurisdictions` | List supported states, counties, and cities | TRD 8.3 |
| **Jurisdictions** | `POST` | `/api/v1/resolve` | Resolve address to Census geocode and jurisdiction stack | TRD 8.3 |
| **Documents** | `GET` | `/api/v1/documents` | List 87 corpus documents with filters | TRD 8.3 |
| **Documents** | `GET` | `/api/v1/documents/{id}/text` | Raw text of source statute for quote inspection | TRD 8.3 |
| **Rules** | `GET` | `/api/v1/rules` | Query extracted rules with filters | TRD 8.3 |
| **Rules** | `GET` | `/api/v1/rules/export` | Download scored `out/rules.json` | TRD 8.3 |
| **Lookups** | `POST` | `/api/v1/lookup` | Evaluate rules for an address and property facts | TRD 8.3 |
| **Lookups** | `GET` | `/api/v1/properties` | List 500 sample addresses with assessor facts | TRD 8.3 |
| **Lookups** | `GET` | `/api/v1/lookup/export` | Download scored `out/lookups.json` (500 addresses) | TRD 8.3 |
| **Change Tracking** | `GET` | `/api/v1/changes/cases` | List benchmark change scenarios T1 through T5 | TRD 8.3 |
| **Change Tracking** | `GET` | `/api/v1/changes/cases/{id}` | Get detail and status shifts for specific change case | TRD 8.3 |
| **Change Tracking** | `GET` | `/api/v1/changes/export` | Download scored `out/changes.json` | TRD 8.3 |
| **Exports** | `GET` | `/api/v1/exports/bundle/latest` | Metadata summary of latest exported deliverables | TRD 8.3 |
| **Exports** | `GET` | `/api/v1/exports/bundle/download`| Download all 3 deliverables as a ZIP package | Deliverable |

### Example cURL Requests

#### 1. Evaluate Address Rules (`POST /api/v1/lookup`)
```bash
curl -X POST http://localhost:8000/api/v1/lookup \
  -H "Content-Type: application/json" \
  -d '{
    "address": {
      "street": "2100 Shattuck Ave",
      "city": "Berkeley",
      "state": "CA",
      "zip": "94704"
    },
    "facts": {
      "year_built": 1962,
      "units": 20
    },
    "as_of": "2026-10-01"
  }'
```

#### 2. Resolve Jurisdiction Hierarchy (`POST /api/v1/resolve`)
```bash
curl -X POST http://localhost:8000/api/v1/resolve \
  -H "Content-Type: application/json" \
  -d '{
    "street": "742 Evergreen Terr",
    "city": "Boston",
    "state": "MA",
    "zip": "02124"
  }'
```

#### 3. Inspect Raw Source Statute (`GET /api/v1/documents/D001/text`)
```bash
curl http://localhost:8000/api/v1/documents/D001/text
```

---

## 6. Automated Testing & Verification

The test suite validates boilerplate compliance, Kleene 3-valued logic, quote verification, spatial resolving, and deliverable export endpoints:

```bash
# Run pytest test suite
.venv/bin/pytest tests/unit/ -v
```

All 13 unit tests pass cleanly:
```
tests/unit/test_api_boilerplate.py::test_health_endpoint_envelope_and_headers PASSED
tests/unit/test_api_boilerplate.py::test_incoming_request_id_preserved PASSED
tests/unit/test_api_boilerplate.py::test_disclaimer_endpoint_languages PASSED
tests/unit/test_api_boilerplate.py::test_not_found_error_envelope PASSED
tests/unit/test_api_boilerplate.py::test_validation_error_envelope PASSED
tests/unit/test_api_boilerplate.py::test_protected_route_unauthorized_envelope PASSED
tests/unit/test_api_boilerplate.py::test_protected_route_authorized PASSED
tests/unit/test_modules.py::test_kleene_three_valued_logic PASSED
tests/unit/test_modules.py::test_predicate_evaluator_missing_facts PASSED
tests/unit/test_modules.py::test_jurisdiction_resolver_neighborhoods PASSED
tests/unit/test_modules.py::test_quote_verification PASSED
tests/unit/test_modules.py::test_change_tracking_tests_t1_to_t5 PASSED
tests/unit/test_modules.py::test_live_deliverable_export_endpoints PASSED
```

### Independent System Validation (For Participant Videos)

Per official challenge guidelines, `score.py` and the private dev answer key are not shared with participants. Submissions and video walk-throughs must demonstrate the team's **own independent system output and validation**:

```bash
# Run self-contained system audit across all 3 modules
python cli.py validate
```

This command independently audits:
1. **Module A (Citation Metric):** Checks all rules in `out/rules.json` against supplied corpus documents (`data/corpus/text/`) verifying exact substring matches ($\ge 20$ chars). Only supplied, verifiable corpus text is counted.
2. **Module B (Address Lookups):** Audits `out/lookups.json` across all 500 benchmark sample properties for 100% deterministic coverage with Kleene logic.
3. **Module C (Change Cases T1–T5):** Validates all 5 explicit change tests defined at kickoff (`T1` through `T5`), confirming zero reliance on any removed "hour-16" ordinance.

---

## 7. Responsible AI & Legal Ethics

* **Mandatory Legal Disclaimer:** Every HTTP response returned by the backend injects the `X-Disclaimer` header:
  `Not legal advice. This tool summarizes public law for information only.`
* **Verbatim Grounding:** No rule can be saved or evaluated without an exact substring match from the source corpus.
* **Bilingual Accessibility:** User-facing summaries and legal warnings are natively available in English and Spanish.
* **Audit Trail:** Every request logs a unique `X-Request-Id` and `X-As-Of` timestamp for reproducibility and statutory time-travel.

---

## 8. Repository Structure

```
rhln/
├── cli.py                        # Unified CLI (extract, lookup-all, change-all, export-all)
├── main.py                       # ASGI server entrypoint
├── requirements.txt              # Backend Python dependencies
├── rhln/
│   ├── config.py                 # Pydantic v2 configuration & env loader
│   ├── models.py                 # Core domain models & Pydantic schemas
│   ├── api/                      # FastAPI service layer
│   │   ├── main.py               # App factory, middlewares, OpenAPI tags
│   │   ├── middleware.py         # ASGI disclaimer and request ID injection
│   │   ├── errors.py             # TRD 8.2 JSON error envelopes
│   │   ├── schemas.py            # Generic DataEnvelope[T] models
│   │   └── routers/              # 8 modular routers (all TRD endpoints)
│   ├── ingest/                   # Corpus loaders & document chunker
│   ├── llm/                      # Anthropic Claude client
│   ├── extract/                  # Structured rule extraction & quote verification
│   ├── geo/                      # Spatial jurisdiction stack resolver
│   ├── engine/                   # Kleene logic predicate & precedence evaluator
│   └── change/                   # Benchmark longitudinal change evaluator (T1–T5)
├── web/                          # Modern React 19 / TanStack Start frontend
│   ├── src/routes/index.tsx      # Comprehensive 5-tab UI application
│   ├── src/lib/api.ts            # Typed client connecting all 23+ backend endpoints
│   └── src/styles.css            # Tailored styling system
├── data/
│   ├── corpus/                   # 87 statutory housing law documents
│   ├── sample_addresses.csv      # 500 benchmark sample properties
│   └── schema/                   # Official hackathon JSON schemas
├── out/                          # Generated Scored Deliverables
│   ├── rules.json                # Extracted rules validated against schema
│   ├── lookups.json              # 500 address evaluations on 2026-10-01
│   └── changes.json              # Evaluated change cases T1–T5
├── reference/                    # Hackathon PRD, TRD, and original starter materials
└── tests/                        # Comprehensive pytest test suite
```
