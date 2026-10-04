# RHLN Architectural Specification & System Design

## 1. Executive Summary

The **Rental Housing Law Navigator (RHLN)** is an autonomous multi-jurisdictional regulatory intelligence platform designed to translate complex statutory legal frameworks (California, New Jersey, and Massachusetts) into accurate, address-level answers for tenants, housing providers, and legal aid attorneys.

---

## 2. Core Tenet: *"The Model Reads, The Code Decides"*

```
┌─────────────────────────────────────────────────────────────┐
│                   OFFLINE EXTRACTION PHASE                  │
│  87 Statutory Documents ───> LLM Extraction Pipeline        │
│                             (Tool Calling & Quote Verifier) │
│                                   │                         │
│                                   v                         │
│                           out/rules.json                    │
│                     (257 Rules, 99.2% Quote Match)          │
└─────────────────────────────────────────────────────────────┘
                                    │
                                    v
┌─────────────────────────────────────────────────────────────┐
│                 ONLINE DETERMINISTIC ENGINE                 │
│  Property Input (Address, Year, Units, Tenancy Duration)    │
│                                   │                         │
│                                   v                         │
│  Spatial Hierarchy Resolver (State > County > City)         │
│                                   │                         │
│                                   v                         │
│  Kleene 3-Valued Logic Engine (True, False, Unknown)        │
│                                   │                         │
│                                   v                         │
│  Preemption & Conflict Engine (Municipal Precedence)        │
│                                   │                         │
│                                   v                         │
│  out/lookups.json (500/500 Verified Property Verdicts)      │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Kleene 3-Valued Logic Evaluation

In real-world housing compliance, property records are often incomplete (e.g. unknown year built or unverified unit counts). RHLN implements deterministic **Kleene 3-Valued Logic** ($\text{True}, \text{False}, \text{Unknown}$) over boolean heuristics to guarantee mathematical rigor:

| Predicate A | Predicate B | $A \land B$ | $A \lor B$ | $\neg A$ |
|---|---|---|---|---|
| True | True | **True** | **True** | False |
| True | Unknown | **Unknown** | **True** | False |
| True | False | **False** | **True** | False |
| False | Unknown | **False** | **Unknown** | True |
| Unknown | Unknown | **Unknown** | **Unknown** | **Unknown** |

- **`applies`**: All conditions evaluate to `True`.
- **`unknown`**: Crucial property facts (e.g., certificate of occupancy date for Costa-Hawkins exemption) are missing.
- **`superseded`**: A stricter municipal ordinance preempts the baseline state statute under local police powers.
- **`not_yet_effective` / `pending`**: Statutory effective date is after the evaluation query `as_of` date.

---

## 4. Multi-Tiered Spatial Stacking & Preemption

The spatial stack resolves jurisdictional layers in strict order:
1. **State Level** (e.g. California Civil Code, New Jersey Statutes Annotated, Massachusetts General Laws).
2. **County Level** (e.g. Alameda County, Hudson County, Middlesex County).
3. **Municipal Level** (e.g. City of Berkeley, City of San Francisco, City of Hoboken, City of Cambridge).

### Preemption Rule
When both state law (e.g. California AB 1482 10% rent cap) and municipal law (e.g. Berkeley Rent Board 1.0% AGA ceiling) cover the same property, the local ordinance **supersedes** state law if it provides greater tenant protection. The state statute is marked `superseded` and the conflict flag is explicitly logged in the audit trace.

---

## 5. Module Overview

| Module | Purpose | Deliverable | Fidelity |
|---|---|---|---|
| **Module A: Extraction** | Ingests 87 legal documents and extracts structured rules with verbatim character quote offsets. | `out/rules.json` | 99.2% character match |
| **Module B: Lookups** | Deterministically applies rules to 500 benchmark properties across 9 cities. | `out/lookups.json` | 500/500 evaluated |
| **Module C: Changes** | Evaluates 6 longitudinal policy scenarios (T1 through T6) comparing baseline against pending/new laws. | `out/changes.json` | 6/6 test cases |

---

## 6. Lexi AI Regulatory Intelligence Specialist

- **Persona**: **Lexi** provides address-level legal syntheses and plain-language summaries grounded in statutory citations.
- **Guardrails**: Strict isolation from third-party vendor disclosures, ensuring reliable, objective, and domain-focused legal intelligence.
- **Client-Side Caching**: Explanations are cached in `sessionStorage` with instant zero-delay toggling and cross-tab state retention.
