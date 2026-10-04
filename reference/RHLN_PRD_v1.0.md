# Rental Housing Law Navigator (RHLN)

> **Product Requirements Document (PRD)** — Hack-Nation × RealPage, 7th Global AI Hackathon, Challenge 02  
> **Version:** 1.0 (draft for build)  
> **Date:** October 3, 2026  
> **Prepared by:** Sayan Shil  
> **Companion document:** Technical Requirements Document (TRD) v1.0  
> **Scope:** 3 states, 10 cities, 6 rule categories  
>
> **Disclaimer:** Not legal advice. This document describes a software product that summarizes public law.

---

Hack-Nation x RealPage | 7th Global AI Hackathon | Challenge 02

PRODUCT REQUIREMENTS DOCUMENT

Rental Housing
Law Navigator
Which rules apply here today, and what is about to change?

VERSION 1.0 (draft for build)

DATE October 3, 2026

PREPARED BY Sayan Shil

COMPANION Technical Requirements Document (TRD) v1.0

SCOPE 3 states, 10 cities, 6 rule categories

Not legal advice. This document describes a software product that summarizes public law.

---

Contents
## 1. Document Overview . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
### 1.1 Purpose . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4### 1.2 How to read this document . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
## 2. Executive Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
### 2.1 What we are building . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5### 2.2 Key product decisions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5### 2.3 What success looks like . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
## 3. Problem and Opportunity . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
### 3.1 Who feels the pain . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .6### 3.2 Why it is hard . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6### 3.3 Opportunity . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
## 4. Goals, Non-Goals and Success Criteria . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
### 4.1 Goals . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7### 4.2 Non-goals . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7### 4.3 Success criteria mapped to scoring . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
## 5. Users and Personas . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
### 5.1 User stories . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
## 6. Scope . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 9
### 6.1 Jurisdictions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 9### 6.2 Rule categories . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 9### 6.3 Facts we have and facts we lack . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 9### 6.4 Out of scope . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 10
## 7. Product Principles and Responsible AI . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 11
### 7.1 Status vocabulary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 11### 7.2 Guardrails at a glance . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 11
## 8. Functional Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 12
### 8.1 Module A: Rule extraction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 12### 8.2 Module B: Address lookup (resolve and apply) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 13### 8.3 Module C: Change tracking . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 13### 8.4 Presentation and user experience . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 14### 8.5 Responsible AI controls . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15### 8.6 Stretch goals . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
---
### 8.7 Submission features . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
## 9. Business Rules . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 16## 10. User Journeys and Screens . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17
### 10.1 Journeys . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17### 10.2 Screen inventory . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17### 10.3 Result screen wireframe . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 18
## 11. Change-Tracking Test Cases . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19
### 11.1 Extra regression checks . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19
## 12. Deliverables and Output Specifications . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20
### 12.1 Other deliverables . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20
## 13. Non-Functional Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 21## 14. Data Requirements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 22## 15. Metrics and Evaluation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 23
### 15.1 Internal quality metrics . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 23### 15.2 Evaluation loop . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 23
## 16. Release Plan and Milestones . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 24
### 16.1 Cut line . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 24### 16.2 Feature freeze . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 24
## 17. Demo and Submission Plan . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 25
### 17.1 Demo script (about 4 minutes) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 25### 17.2 Video requirements (from the brief) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 25### 17.3 Submission checklist . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 25
## 18. Risks and Mitigations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 26## 19. Assumptions, Dependencies and Open Questions . . . . . . . . . . . . . . . . . . . . . . . . . 27
### 19.1 Assumptions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 27### 19.2 Dependencies . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 27### 19.3 Open questions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 27
## Appendix A. Glossary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 28## Appendix B. Standard Text . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 28## Appendix C. Traceability to Scoring . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 29
---
## 1. Document Overview
Product Rental Housing Law Navigator (RHLN)

Event Hack-Nation 7th Global AI Hackathon, Challenge 02, powered by RealPage

Document Product Requirements Document (PRD)

Version 1.0 (draft for build)

Date October 3, 2026

Author Sayan Shil

Companion document Technical Requirements Document (TRD) v1.0

Source material Challenge brief (6 pages). The starter pack and participant guide were not available when this was
written.
### 1.1 Purpose
This document defines what we are building, for whom, and how we will know it works. It lists every feature, rule
and deliverable for the 24-hour build. The TRD explains how to build it.
### 1.2 How to read this document
- Priority tags. P0 means required to compete. P1 means should have. P2 means nice to have.
- [Confirm] marks items that depend on the starter pack or participant guide. Check them in the first hour.
- Status words. The five result statuses are applies, unknown, superseded, not yet effective and pending. They
are used the same way in every section.
- Scope. All laws named here come from the challenge brief. The brief says the answer key has not been
reviewed by counsel. Nothing in this product is legal advice.

Before you build
Hour 0 to 1 task: open the starter pack and compare the rule schema, the answer key format and the participant guide
with the assumptions listed in Section 19. Update this PRD if anything differs.

---
## 2. Executive Summary
Rental housing in the United States is regulated in layers. State statutes, county rules and city ordinances each
have their own coverage tests, effective dates and exemptions. The answer to "what rules apply to this
apartment?" depends on the exact address, and it changes often.
RHLN is an AI system that reads public housing law and answers one question for any apartment address: which
rules apply here today, and what is about to change? Every answer is cited, dated and honest about what it
does not know.
### 2.1 What we are building
Module Name What it does Output

A Extract Reads the 87-document law corpus with an AI agent and writes one rules.json
structured record per rule, each with a verified quote.

B Resolve and Apply Geocodes an address, builds its state, county and city stack, and tests each lookups.json
rule against building facts.

C Track change Runs the six change tests, supports "as of" queries, and separates enacted changes.json
from pending law.

Explain Plain language Shows each rule in simple words with a citation. English first, Spanish as a Web app
stretch goal.
### 2.2 Key product decisions
## 1. The AI reads. Code decides. The model turns legal text into structured data. A deterministic engine decides
which rules apply to an address. This keeps answers repeatable and auditable.
2. "Unknown" is a first-class answer. When a rule depends on a fact we do not have, we say unknown. We
never guess. The brief confirms that unknown earns partial credit.
## 3. No quote, no rule. A rule enters the dataset only if its quoted source text is found word for word in the corpus.
## 4. Every answer has an as-of date. Enacted law and pending law are always shown apart.
## 5. One pipeline for everything. The same automated pipeline handles the 87 starter documents and the
ordinance released at hour 16. Nothing is hand-coded.
### 2.3 What success looks like
- A judge types an address and sees the jurisdiction stack, every applicable rule, and a source quote for each, in
under 30 seconds.
- The team shows score.py output on the dev set, results for tests T1 to T6, and the hour-16 ordinance
processed live.
- Unknown answers explain which fact is missing.
- Adding a new jurisdiction means adding documents, not writing code.

---
## 3. Problem and Opportunity
The source text of housing law is public. But it is unstructured, scattered and constantly changing. Getting a
reliable answer today means reading municipal codes, statutes and pending bills by hand.

Signal from the brief Why it matters to the product

14 cities and counties across 8 states have enacted local bans on Local rules differ in small ways. A tool must read each one, not
algorithmic rent-setting since late 2024, most with different assume they match.
definitions and penalties.

January 2026: California amended its antitrust law on common The same address can be covered by both a state and a local
pricing algorithms (AB 325 / SB 763). It added a state layer on top rule, with different effective dates.
of local rules.

June 2026: Massachusetts' high court removed a statewide Proposed changes do not always become law. The tool must
rent-control question from the November ballot. know the difference and must not report rules that do not exist.
### 3.1 Who feels the pain
- Renters do not know their rights at their own address: rent increase limits, deposit caps, fee rules, eviction
protections.
- Small housing providers do not have legal teams. They do not know their obligations before they act.
- Advocates and agencies cannot see the full picture across jurisdictions, or what a pending bill would change.
### 3.2 Why it is hard
Difficulty Example from the corpus

Layered law California has a statewide rent cap and just-cause rule, plus local rent control in cities such as San
Francisco and Los Angeles.

Coverage tests Rules apply by building age, unit count or owner type. The SF Rent Ordinance applies when the certificate
of occupancy is on or before 6/13/1979.

Precedence The AB 1482 state cap yields to the SF Rent Ordinance. Massachusetts law bars local rent control. The
NJ FAIR Act may preempt two local bans.

Time Laws take effect later (NJ FAIR Act: signed 7/20/2026, effective 7/1/2027). Bills stay pending. Measures
get struck.

Missing data Parcel data has no year built for San Diego, and no year built or units for Berkeley. No owner names exist
at all.
### 3.3 Opportunity
Modern language models can read long legal text and return structured data. The hard part is trust. RHLN is
designed so that every claim can be traced to a quoted sentence, every uncertainty is shown, and every change is
dated. That is the intended outcome in the brief: make housing law visible at the level of a single address.

---
## 4. Goals, Non-Goals and Success Criteria
### 4.1 Goals
ID Goal

G1 Extract rules automatically from the 87-document corpus into schema-valid records, each with a verified quote.

G2 Resolve every sample address to a jurisdiction stack using legal city limits, not postal city.

G3 Return every applicable rule for an address with a plain-language summary and a citation.

G4 Say "unknown" whenever coverage depends on a fact the data does not contain.

G5 Show what changes by date: "as of" queries, enacted versus pending, and before and after rule sets.

G6 Show conflicts and preemption honestly, including possible conflicts.

G7 Extend to a new jurisdiction by adding documents only.
### 4.2 Non-goals
ID We will not

N1 Give legal advice or a compliance certification.

N2 Suggest ways to avoid, structure around or evade a rule.

N3 Cover states beyond California, New Jersey and Massachusetts (except the live new-jurisdiction demo).

N4 Cover federal law, lease review, court cases or individual tenancy facts such as current rent.

N5 Use customer, resident, pricing or any other non-public data.

N6 Scrape sites against their terms. We use the starter corpus and free public sources.

N7 Build user accounts, payments or notifications.

N8 Predict whether a pending bill will pass.
### 4.3 Success criteria mapped to scoring
The brief scores 100 points. Seventy-five are automatic. Teams self-test with score.py on the dev key. The targets
below are our own internal goals.

Component Points How it is measured Our target

Extraction accuracy 25 auto Rules matched to the held-out key by Match every dev-key rule. All fields
jurisdiction, category and citation. Field correct on matched rules.
accuracy on date, status, key value, citation.

Address coverage 20 auto 100 held-out addresses. Missing an applicable Zero missed applicable rules on the
rule costs double. Unknown earns partial credit. 20 dev addresses. Unknown only
when a fact is truly missing.

Citations 15 auto Share of "applies" answers backed by a source 100% of results carry a verified quote.
and a quoted span found in the corpus.

Change tracking 15 auto Overlap with expected affected-address sets for All six tests pass. T3 conflict flagged.
T1 to T6, plus conflict flags on T3.

Plain language and 10 judges Demo. A non-expert understands a result in
usability 30 seconds.

Responsible design 10 judges Uncertainty, audit trail, guardrails. Each guardrail is visible in the demo.

Scalability path 5 judges How the approach extends to new jurisdictions. Live add of a new ordinance with no
code change.

---
## 5. Users and Personas
Persona Context and need Key questions Success moment

Renter Lives in a multifamily building. Can my rent go up this much? Is there Reads a short answer with a
Wants to know rights at this a cap on my deposit? Can I be evicted source and knows what to do
address. Not a lawyer. May read without a reason? What are the fees? next.
English or Spanish.

Small housing Owns a few buildings. No legal Which rules cover my building? Does Sees a clear list, sees where the
provider team. Wants to understand a small-owner exemption apply? What answer is unknown, and sees
obligations before acting. changes next year? what fact would settle it.

Advocate or Works across many addresses Which buildings does this bill affect? Runs a change test and gets a
agency analyst and cities. Needs the full picture. Which cities have the strongest list of affected addresses with
protections? Where do state and local before and after rules.
rules conflict?

Judge or reviewer Scores the demo and the outputs. Is it accurate? Is it cited? Does it say Sees scores, citations,
(stakeholder) Time is short. unknown? Is it safe? guardrails and a live rerun in the
demo.
### 5.1 User stories
ID As a... I want to... So that... Pri

US-01 Renter enter my address and see the rules that apply today I know my rights. P0

US-02 Renter see a source quote and link for each rule I can check it myself. P0

US-03 Renter read each rule in plain language I can act on it. P0

US-04 Renter switch the view to Spanish I can read it in my language. P1

US-05 Provider see which of my obligations are certain and which I know what to check. P0
are unknown

US-06 Provider add facts I know, such as unit count or year built unknown results can be settled. P1

US-07 Provider see rules that take effect soon I can plan ahead. P0

US-08 Advocate run a change case and list affected addresses I see who a law change touches. P0

US-09 Advocate see the rule set before and after a date I understand what changes. P0

US-10 Advocate see pending bills clearly marked as proposed I do not confuse them with law. P0

US-11 Advocate see where a state and a local rule conflict or may I can flag it for review. P0
conflict

US-12 Analyst query any address "as of" a past or future date I can audit history. P0

US-13 Analyst drop in a new ordinance and see new rules and I can react to a new law fast. P0
affected addresses

US-14 Reviewer see an audit trail of sources, model outputs and I can trust the system. P1
changes

US-15 Reviewer see a confidence score and a conflict flag on every I know when to review by hand. P1
answer

---
## 6. Scope
The brief sets the scope at 3 states, 10 cities and 6 rule categories. It is small enough to finish and varied enough
to be hard.
### 6.1 Jurisdictions
State Cities in scope Why it is in the set

California Los Angeles, San Francisco, San Diego, Densest layering: statewide rent cap and just cause, local rent
Berkeley, Santa Ana* control, state and local algorithmic-pricing rules with different
effective dates.

New Jersey Jersey City, Hoboken, Newark Rent control is set city by city. Statewide eviction, screening and
fee rules. Two local algorithmic-pricing bans and a new statewide
FAIR Act (effective July 2027) that may preempt them.

Massachusetts Boston, Cambridge State law bars local rent control. A 2026 ballot question was struck
before the vote. Algorithmic-pricing bills are pending. Tests
whether systems avoid reporting rules that do not exist.

*Santa Ana laws are in the corpus for extraction. No open parcel data with addresses exists for Santa Ana, so the address sample
covers the other 9 cities.
### 6.2 Rule categories
# Category What to capture Examples named in the brief

1 Rent increase limits Cap formula, covered buildings, CA Tenant Protection Act, Civ. Code 1947.12 (5% + CPI, max
exemptions, local versus state 10%). SF Rent Ordinance, Admin. Code ch. 37. LA Rent
precedence Stabilization Ordinance. MA G.L. c.40P (state bar on local rent
control).

2 Just-cause eviction Allowed causes, notice, relocation CA Civ. Code 1946.2. NJ Anti-Eviction Act, N.J.S.A.
assistance, coverage 2A:18-61.1.

3 Security deposits Maximum, exceptions, effective CA Civ. Code 1950.5 as amended by AB 12 (one month; two
date for qualifying small landlords; effective 7/1/2024). NJ N.J.S.A.
46:8-21.2 (1.5 months). MA G.L. c.186 15B (first month's rent).

4 Application and Fee caps, allowed upfront charges, CA Civ. Code 1950.6 (CPI-adjusted cap). NJ P.L.2025, c.405
screening fees receipts and refunds ($50 cap, effective 5/1/2026). MA G.L. c.186 15B. MA
broker-fee rule, G.L. c.112 87DDD1/2 (8/1/2025).

5 Screening restrictions Limits on criminal-history and NJ Fair Chance in Housing Act (2021). CA source-of-income
income-source screening; timing protections under FEHA (SB 329).
rules

6 Algorithmic Definition of covered software, CA AB 325 / SB 763 (1/1/2026). San Francisco 37.10C (Oct
rent-setting prohibited conduct, penalties, 2024). San Diego 98.1101 to 98.1104 (Jun 2025). Berkeley ch.
effective date 13.63 (2026). Santa Ana Ord. NS-3090 (Apr 2026). Jersey City
218-12 (Jun 2025). Hoboken ch. 158, Art. II (Jul 2025). NJ
FAIR Act, P.L.2026, c.43 (7/1/2027). MA S.2983 / H.5222
(pending).

The answer key holds 58 rules and 19 "no rule at this level" findings. 52 of the 58 rules were verified against public sources as of
October 1, 2026. It has not been reviewed by counsel.
### 6.3 Facts we have and facts we lack
The sample is about 500 multifamily properties in 9 cities from public assessor data. Each has street, postal city,
ZIP, year built, units and use code. There are no owner names. Teams resolve the legal jurisdiction themselves.

---

Fact Availability Effect on results

Year built Available except San Diego and Berkeley Age-based coverage becomes unknown
where missing. Edge years are unknown.

Unit count Available except Berkeley Unit-based coverage becomes unknown
where missing.

Use code Available (varies by county) Normalized to a property type.

Owner type and portfolio size Never available Small-owner exemptions are unknown unless
the user supplies the fact.

Certificate of occupancy date Not available (year built is a proxy) Dates inside a year are unknown. Example: a
1979 building and the 6/13/1979 test.

Current rent, tenancy length, tenant Not available and not wanted Rules that need them cannot be fully
details resolved. We say unknown.
### 6.4 Out of scope
Everything in the non-goals list (Section 4.2), plus: federal fair housing law, eviction court procedure, local
registration or licensing rules not in the six categories, and law-firm or news pages. The brief provides law-firm and
news pages as links only. We treat them as non-authoritative and do not extract rules from them.

---
## 7. Product Principles and Responsible AI
The brief asks for transparency, not legal verdicts. These principles are requirements, not preferences. Each maps
to features in Section 8.

The solution should The solution must not

Cite the source text and retrieval date for every rule it reports. Present output as legal advice or a compliance certification.

Show an "as of" date on every answer and separate enacted from Suggest ways to avoid, structure around or evade a rule.
pending law.

Say "unknown" when coverage depends on facts it does not Invent rules or citations where the source text is silent.
have.

Flag conflicts and low-confidence answers for human review. Use customer, resident, pricing or other non-public data.

Explain rules in plain language that a renter can act on. Scrape sites in violation of their terms of use.

Keep an auditable log of sources, model outputs and changes.
### 7.1 Status vocabulary
These five statuses are the only result values in lookups.json. The labels below are what people see in the app.

Status English label Spanish label Meaning

applies Applies Aplica In force on the as-of date and the building
meets all conditions.

unknown Unknown (facts missing) No se sabe (faltan datos) In force, but a needed fact is missing. Or
precedence depends on a missing fact.

superseded Overridden by another rule Reemplazada por otra norma Another rule takes precedence at this
address. Both are shown.

not yet effective Not yet in effect Aún no está vigente Enacted, with an effective date after the
as-of date.

pending Proposed. Not law. Propuesta. No es ley. A bill or proposal that has not been enacted.
Never shown as in force.
### 7.2 Guardrails at a glance
- "Not legal advice" appears in every interface, every export and every video.
- No result is shown without a verified quote, a source link and a retrieval date.
- Unknown results say which fact is missing. They do not suggest how to change the outcome.
- Struck, withdrawn or repealed measures are never reported as rules.
- A possible state and local conflict is flagged, not hidden.
- Every model call, source and change is written to an audit log.

---
## 8. Functional Requirements
Every feature has an ID, a priority and an acceptance test. IDs are used in the TRD and in the build plan. P0
features are required for the minimum viable entry and for the three required modules.
### 8.1 Module A: Rule extraction
ID Feature Description Pri Acceptance criteria

A-01 Corpus ingestion Load the 87 documents and the manifest CSV P0 All 87 loaded. Count matches
(URL, retrieval date, type). Mark link-only pages as manifest. Link-only items listed,
non-authoritative. not extracted.

A-02 Document profiling Classify each document (statute, ordinance, bill, P0 Every document has jurisdiction
regulation). Find jurisdiction, short title and and type. Spot-check of 10
enacted or pending signals. documents passes.

A-03 Section-aware chunking Split by section markers. Attach definitions and P0 No chunk loses its heading.
exemption sections as context. Definitions are visible to the
extractor.

A-04 Structured rule The model returns one record per rule: category, P0 Output validates against the
extraction jurisdiction, requirement, coverage, exemptions, schema 100%. Dev-key score
effective date, status, penalty, citation, quoted reported.
span.

A-05 Quote verification Each quote must match the document text exactly P0 Zero records without a verified
after normalizing spaces and quote marks. Store quote in rules.json.
character offsets.

A-06 Coverage and Convert coverage text into machine-checkable P0 Conditions parse and evaluate.
exemption conditions conditions on units, year built, owner type, Missing facts give unknown.
property type and location.

A-07 Dates and status Extract effective date (absolute or relative) and P0 Date and status match the dev
status (enacted or pending). Compute relative key. Relative dates computed or
dates when the base date is stated. flagged.

A-08 Penalty and key values Capture penalties, caps, formulas and amounts P0 Key value present whenever the
(for example 5% + CPI, max 10%). text states one.

A-09 Deduplication and Merge duplicates across chunks and documents P0 No duplicate rule IDs.
merge with a stable key. Link amendments to the base Amendments linked.
rule.

A-10 Relation extraction Extract precedence statements: yields to, P0 SF over AB 1482 and the MA
preempts, supplements, amends. c.40P bar are found from text.

A-11 Non-rule event registry Record struck, withdrawn or failed measures (for P0 T5 shows no rent cap for Boston
example the MA ballot question) so they are never or Cambridge.
reported as rules.

A-12 Plain-language One short summary per rule, grounded in the P0 / No new facts in the summary.
summaries quote. English first. Spanish as a stretch. P1 Reading level about grade 8.

A-13 Resumable, cached Cache by document hash and prompt version. P0 A rerun makes no new model
runs Resume after a failure. calls.

A-14 Dev-key self-score One command runs score.py on the dev key and P0 Report saved with a run ID.
prints the report.

A-15 One-command ingest of Add a document and get new rules, relations and P0 Hour-16 ordinance processed end
a new document affected addresses. to end in under 5 minutes.

A-16 Confidence and review Score each record. Queue low-confidence items. P1 Queue visible in the console.
queue Reviewers can flag or annotate but not edit Extracted fields are read-only.
extracted fields.

A-17 Multi-format input Accept txt, md, html, pdf and docx for new P1 Each format yields text with stable
documents. offsets.

---
### 8.2 Module B: Address lookup (resolve and apply)
ID Feature Description Pri Acceptance criteria

B-01 Address intake Single-address form. CSV batch with street, postal P0 All ~500 sample rows load. Bad
city, ZIP, year built, units, use code. rows are listed.

B-02 Normalization and Use the Census batch geocoder. Cache results. P0 Geocode coverage reported.
geocoding Store match type. Cache hit on rerun.

B-03 Legal city resolution Decide the city from the incorporated place, not P0 No Hoboken address is treated as
the postal city. Newark, and the reverse.

B-04 Jurisdiction stack Return state, county and city. San Francisco is P0 Stack correct for all sample cities.
one city and county.

B-05 Fallback resolution If the geocoder fails, use point-in-polygon on P1 No address ends without a stack
TIGER boundaries. Mark lower confidence. or a clear reason.

B-06 Fact normalization Normalize year built, units and use code into a P0 Every fact has provenance.
property type. Keep the source of each fact.

B-07 Data gap handling Treat San Diego (no year built), Berkeley (no year P0 Affected rules return unknown, not
built or units) and owner type as unknown. applies or not covered.

B-08 Candidate rule Collect all rules in the stack for the six categories. P0 Candidate list complete for a test
selection address.

B-09 Lifecycle by as-of date Decide in force, not yet effective, pending or P0 Boundary dates pass (see T1 and
ended. T3).

B-10 Coverage test Evaluate coverage and exemptions with true, false P0 Unknown propagates correctly.
and unknown logic. Unit tests pass.

B-11 Precedence Apply extracted relations. Mark superseded rules P0 SF 20-unit example matches the
and show which rule overrides which. brief mock-up.

B-12 No-rule findings For each category and level, say "No rule found in P0 Findings match the key's "no rule"
the provided corpus at this level" when none entries on the dev set.
exists.

B-13 Result statuses Return applies, unknown, superseded, not yet P0 Only these five values appear.
effective or pending per rule.

B-14 Citations Each result has citation label, URL, retrieval date P0 Quote found in the source text at
and verified quote. stored offsets.

B-15 Missing-fact guidance For unknown results, list the missing fact and P0 Every unknown names at least
where a person may find it. No advice on changing one missing fact or reason.
the outcome.

B-16 Batch run and export Compute all ~500 addresses and export P0 File validates. Runs without errors.
lookups.json.

B-17 Confidence and conflict Score each answer. Flag conflicts and low P1 Flag shown in the UI and in
flag confidence. exports.

B-18 User-supplied facts Let a person add facts they know, labelled P1 Result changes only through the
"user-supplied". Used for that session only. supplied fact. Label shown.

B-19 Upcoming and pending List not-yet-effective and pending rules for the P0 Panel shows dates and a
panel address. "Proposed. Not law." label for
pending items.
### 8.3 Module C: Change tracking
ID Feature Description Pri Acceptance criteria

C-01 Temporal rule model Each rule has effective date, end date and P0 Lifecycle drives status at any date.
lifecycle (enacted, pending, struck, withdrawn,
repealed).

---

ID Feature Description Pri Acceptance criteria

C-02 As-of query Every lookup and rule query accepts an as-of P0 Same address gives different
date. Default is Oct 1, 2026 [Confirm]. results across dates.

C-03 Change case runner Run T1 to T6 and write changes.json. P0 All six produce expected affected
sets on self-check.

C-04 Before and after diff For each affected address list the rule set before, P0 Diff shows added, removed and
after, and the difference. changed items.

C-05 Pending-bill impact Evaluate pending bills as a hypothetical. Never P0 T4 lists addresses, status stays
report them as in force. pending.

C-06 Conflict flags Flag possible preemption or overlap between state P0 T3 flags the NJ FAIR Act against
and local rules. the Hoboken and Jersey City
bans.

C-07 Live ordinance handling New document to new rules to affected addresses, P0 T6 passes with no code change.
with the future effective date right.

C-08 Address timeline Show how one address's rules change over a date P1 Timeline lists each change date.
range.

C-09 Ad hoc impact analysis Pick a rule or document and see affected P1 Works for any rule in the dataset.
addresses.

C-10 Change export Write changes.json with affected addresses and P0 Structure matches the submission
conflict flags for each test. format [Confirm].
### 8.4 Presentation and user experience
ID Feature Description Pri Acceptance criteria

D-01 Address search Search box with sample-address suggestions and P0 A result appears in under 3
a free-text option. seconds.

D-02 Result by category Six category cards with status badge, summary P0 All six categories always shown,
and citation chip. even when "no rule".

D-03 Jurisdiction stack view Breadcrumb of state, county, city with rule counts P0 Shown on every result.
per level.

D-04 Source viewer Side drawer with source text and the quote P0 Highlight matches the stored
highlighted. offsets.

D-05 As-of control Date picker and quick jumps (today, effective P0 Changing the date refreshes
dates). statuses.

D-06 Upcoming and pending See B-19. P0 See B-19.
panel

D-07 Unknown explanation A box that says why a result is unknown and what P0 Present on every unknown.
is missing.

D-08 Disclaimer banner "Not legal advice" on every page, export and P0 Cannot be dismissed.
video.

D-09 Spanish view Toggle for English and Spanish on all result text. P1 Switch needs no reload.

D-10 Change explorer List of T1 to T6 with before and after diff and an P0 Counts match changes.json.
affected-address table.

D-11 Pipeline console Run extraction, upload a document, watch P1 Live progress for a run.
progress, see failures.

D-12 Audit trail viewer Search sources, model calls and changes. P1 Each result links to its audit
events.

D-13 Score report viewer Show the latest score.py report. P1 Matches the file output.

D-14 Accessibility and mobile Keyboard use, readable contrast, screen-reader P1 No blocking issues on a quick
labels, mobile layout. audit.

---

ID Feature Description Pri Acceptance criteria

D-15 Result export Download one result as JSON or a printable page. P2 Export carries the disclaimer and
as-of date.
### 8.5 Responsible AI controls
ID Feature Description Pri Acceptance criteria

R-01 Citation gate No rule or result without a verified quote, source P0 Automated check on every export.
and retrieval date.

R-02 Unknown policy Missing facts give unknown. Omission and P0 Unit tests on all dev-set gaps.
guessing are both disallowed.

R-03 Enacted versus Separate in data, labels and layout. P0 T4 and T5 pass.
pending

R-04 No-evasion filter Summaries and guidance must not suggest ways P0 Red-team prompts produce refusal
to avoid or structure around a rule. text. Filter tests pass.

R-05 No invented law Absence is stated as "no rule found in the provided P0 Struck ballot question never
corpus". appears as a rule.

R-06 Conflict and Show flags and queue items for human review. P1 Flagged items listed.
low-confidence flags

R-07 Audit log Append-only log of sources, model calls, outputs, P1 Every lookup links to its audit trail.
changes and exports.

R-08 Public data only Use only the starter pack and free public sources. P0 Source list in the README.
No scraping against terms.

R-09 Privacy No owner names or personal data stored. P0 Database review shows no
User-supplied facts are not saved by default. personal data.
### 8.6 Stretch goals
ID Feature Description Pri Acceptance criteria

S-01 Spanish renter view Plain-language Spanish for every rule and status P1 All statuses and summaries
label. available in Spanish.

S-02 Confidence and conflict Per-answer score and flag, see B-17. P1 Visible in UI and exports.
flag

S-03 Live new-jurisdiction Add one new jurisdiction during the event by P1 New city rules appear with no code
demo adding documents only. change.
### 8.7 Submission features
ID Feature Description Pri Acceptance criteria

Z-01 rules.json All rule records in the provided format, with citation P0 Validates against the schema.
and quoted text.

Z-02 lookups.json For all 500 addresses, each rule's result status. P0 All 500 present. Only the five
statuses.

Z-03 changes.json Affected addresses and conflict flags for each test. P0 T1 to T6 present.

Z-04 GitHub repository Code, README with run steps, and the three P0 Fresh clone runs by following the
output files. README.

Z-05 Live demo link A working link to the tool. P0 Loads and answers a lookup.

Z-06 Three videos Team, demo and technical videos. They include P0 Each video meets the rules in
the scores. Section 17.

---
## 9. Business Rules
These rules decide what the product shows. They are written so they can be tested.

ID Rule

BR-01 As-of is inclusive. A rule with effective date D is in force on D and after.

BR-02 Enacted with a future effective date is "not yet effective". Enacted with an effective date on or before the as-of date is in
force. Pending is never in force.

BR-03 Pending items are shown apart from law and labelled "Proposed. Not law."

BR-04 Struck, withdrawn or repealed measures never appear as rules. They appear only in change history.

BR-05 The legal city (incorporated place) decides which city rules apply. The postal city does not.

BR-06 A rule covers an address only if every coverage condition is true and no exemption is true. If no condition is false and at
least one is unknown, the result is unknown.

BR-07 If any coverage condition is false, the rule is left out of results. It stays visible in the trace on request.

BR-08 If a local rule overrides a state rule, the state rule is "superseded" and both citations are shown. If the override depends
on an unknown fact, both rules are "unknown".

BR-09 If rules supplement each other (for example state and local algorithmic-pricing rules), both apply.

BR-10 Missing a rule that applies is worse than saying unknown. When unsure, use unknown.

BR-11 Absence is stated as "No rule found in the provided corpus at this level." We never say no law exists.

BR-12 A rule without a verified quote cannot enter the dataset.

BR-13 A year-built value that equals the year of a date threshold is unknown. Years before are before. Years after are after.

BR-14 Relative effective dates (for example "60 days after adoption") are computed only when the base date is stated.
Otherwise the date is empty and the result is unknown.

BR-15 A possible conflict is flagged when a future-effective state rule overlaps a local rule in the same category and no
savings clause is found.

BR-16 User-supplied facts override dataset facts for that session only and are labelled.

BR-17 "Not legal advice" appears in every interface and export.

BR-18 The product never suggests how to restructure, time or describe a property to avoid a rule.

---
## 10. User Journeys and Screens
### 10.1 Journeys
J1. Renter checks an address
## 1. Opens the app. Sees the disclaimer and a search box.
## 2. Types an address. Picks the as-of date or keeps the default.
## 3. Sees the jurisdiction stack and six category cards.
## 4. Reads a plain-language line for each rule. Opens a source drawer to read the exact text.
## 5. Sees an "Upcoming and pending" panel for rules that start soon or are only proposed.
J2. Provider meets an unknown
## 1. Looks up a building. Sees "Unknown (facts missing)" on a small-landlord exemption.
## 2. Reads which fact is missing (owner type) and why it matters.
## 3. Optionally adds a fact they know. The result updates and is labelled "user-supplied".
J3. Advocate checks a pending bill (T4)
## 1. Opens the change explorer. Picks MA S.2983 / H.5222.
## 2. Sees the label "Proposed. Not law." and the list of Massachusetts addresses it would touch.
## 3. Sees that no address shows the bill as "applies".
J4. Analyst processes the hour-16 ordinance (T6)
## 1. Opens the pipeline console. Uploads the new ordinance file.
## 2. Watches extraction, quote verification and relation steps finish.
## 3. Opens the change case. Sees the new rule, its future effective date and affected Cambridge addresses.
## 4. Runs a lookup "as of" before and after the effective date to confirm the status change.
J5. Team adds a new jurisdiction (stretch)
## 1. Registers the jurisdiction (name, level, FIPS or place code).
## 2. Uploads its documents. The same pipeline runs.
## 3. Looks up an address in the new city. Rules appear with citations. No code changed.
### 10.2 Screen inventory
Screen Route Purpose Key elements Pri

Home / lookup / Start a lookup Search, as-of, language, disclaimer, sample addresses P0

Result /lookup Show rules for an address Stack, summary bar, six category cards, upcoming P0
panel, conflict banner

Source drawer overlay Show the exact source Highlighted quote, link, retrieval date P0
text

Rule explorer /rules Browse all rules Filters, status, source link P1

Rule detail /rules/[id] Inspect one rule Fields, conditions, relations, timeline P1

Change explorer /changes List T1 to T6 Case cards, status, counts P0

Change case /changes/[id] Before and after Diff, affected table, conflict flags P0

Address timeline /timeline History by date Date line of rule changes P1

Pipeline console /pipeline Run and watch extraction Runs, live log, upload, review queue P1

---

Screen Route Purpose Key elements Pri

Audit trail /audit Trace sources and calls Search, filters, linked events P1

Score report /eval Show scores Dev-set report, test results P1

About and limits /about Explain method and limits Disclaimer, data sources, known gaps P0
### 10.3 Result screen wireframe
Not legal advice. Summaries of public law. Always check the source text.

Rental Housing Law Navigator EN | ES

100 Example Street, San Francisco, CA 94110 As of: 2026-10-01 Facts: 1962 | 20 units Search

California > City & County of San Francisco 4 apply 1 unknown 2 upcoming

Source drawer
Rent increases Summary + citation chip APPLIES
Cal. Civ. Code 1950.5
Retrieved: [date] | Link
Just cause Summary + citation chip APPLIES
Quoted span highlighted here
in the original source text
Security deposit Summary + citation chip APPLIES

Why this applies
units = 20 (assessor)
Screening fee Summary + citation chip UNKNOWN
year built = 1962 (assessor)
owner type = unknown

Algorithmic pricing Summary + citation chip APPLIES Conflict flag: none

Upcoming and pending
Rule X: not yet in effect, starts [date] | Bill Y: Proposed. Not law.

Schematic only. The example uses the brief's sample: a 20-unit building in San Francisco built in 1962. The screening-fee status is
shown as unknown to illustrate the pattern.

---
## 11. Change-Tracking Test Cases
These six tests come from the brief. Expected affected addresses are held by the judges, so we also write our own
checks from the rule text.

Test Scenario What a correct system does How we check

T1 CA AB 325 / SB 763, effective "Not yet effective" for CA addresses as of Run lookups on both dates. Also
1/1/2026 12/31/2025. "Applies" as of 1/2/2026. check 1/1/2026 (inclusive).

T2 Hoboken and Jersey City local Each ban applies only inside its own city limits. Use incorporated place. Check
bans Neither applies in Newark. borders and postal-city mismatches.

T3 NJ FAIR Act, signed "Not yet effective" today. "Applies" on 7/2/2027. Run lookups at 3 dates. Check the
7/20/2026, effective 7/1/2027 Flags a possible conflict with the two local bans. conflict flag.

T4 MA S.2983 and H.5222 Reports them as pending, never in force. Lists the No "applies" status for these rules at
(pending bills) addresses they would affect. any date.

T5 MA rent-control ballot Reports no rent cap for Boston or Cambridge. The Rule list for MA rent contains no cap.
question, struck 6/23/2026 affected set is empty. Affected set equals zero.

T6 Fictional Cambridge ordinance Extracts it unaided, lists affected addresses, gets Run the pipeline on the file. Check
(released at hour 16) the future effective date right. rule, date and affected list.
### 11.1 Extra regression checks
- SF 20-unit building built in 1962: the SF Rent Ordinance applies and the AB 1482 cap is superseded (matches
the brief's mock-up).
- A 1979 building in San Francisco: the certificate-of-occupancy test is unknown.
- A Berkeley address with no year built and no units: age and size rules return unknown.
- A Massachusetts address: "no rule" for local rent control, and the c.40P state bar is shown.
- Any lookup with a rule whose quote cannot be verified: the rule never reaches the output.

---
## 12. Deliverables and Output Specifications
Three files are scored. Final field names must match the provided schema [Confirm]. Our internal format may carry
extra fields. An export step maps them.

File Contents Validation

rules.json One record per rule: category, jurisdiction, requirement, Schema check. Every quote found in the
coverage conditions, exemptions, effective date, status (enacted corpus. No duplicates. No struck or
or pending), penalty, source citation, quoted span. withdrawn items.

lookups.json For all 500 addresses, each rule's result: applies, unknown, All 500 present. Only five statuses. Each
superseded, not yet effective or pending. Includes jurisdiction "applies" has a quote.
stack and as-of date.

changes.json For each test T1 to T6: affected addresses, before and after rule All six tests present. Counts match the
sets, conflict flags (T3). change engine.
### 12.1 Other deliverables
- GitHub repository with code, a README that explains how to run it, and the three output files.
- Live demo link to a working tool.
- Team video: introduce the team.
- Demo video: show the tool in use.
- Technical video: explain how the system works.
- Each video must show the full score.py report on the dev set, results for T1 to T6, and the system processing
the hour-16 ordinance.

---
## 13. Non-Functional Requirements
Area Requirement Target

Performance Single lookup from precomputed rules p95 under 1 second; under 3 seconds for a cold
computation

Performance Batch lookup for 500 addresses Under 2 minutes after geocoding is cached

Performance Hour-16 ordinance end to end Under 5 minutes, one document

Performance Full corpus extraction Under 30 minutes with parallel calls; free on rerun
(cache)

Reliability Demo availability Static fallback with cached results if a service is
down

Accuracy Citations 100% of reported rules carry a verified quote

Accuracy Dates Boundary-date tests pass (before, on, after)

Determinism Same inputs and cache give the same outputs Model temperature 0. Prompt version logged.

Security Write endpoints protected API key. Rate limits. Input validation.

Privacy No personal data No owner names. No tenant data. User facts not
stored by default.

Accessibility Basic WCAG-style checks Keyboard use, contrast, labels

Localization English and Spanish Statuses and summaries

Auditability Trace every answer Source, quote, model call, run ID

Maintainability New jurisdiction by data only No code change for a new city

Cost Stay inside credits Cache everything. Use a cheaper model for
simple steps.

Compliance Source terms Starter corpus and free public sources only

---
## 14. Data Requirements
Source What it provides Use in product Notes

Starter law corpus 87 documents (statute, ordinance and bill text) Module A input Official text only. Retrieval
plus manifest CSV with URL and retrieval date. date shown to users.
Law-firm and news pages are links only.

Sample addresses ~500 multifamily properties in 9 cities. Street, Module B input No owner names.
postal city, ZIP, year built, units, use code.

Rule schema JSON Schema with required fields and a Output format Map internal fields to it.
worked sample record.

Dev answer key 10 rules and expected results for 20 addresses. Self-testing Run often.

Change test cases The 6 tests. Expected sets held by judges. Module C

Scoring script score.py, the same script judges use. Self-scoring Show output in videos.

Census Geocoder Address to coordinates, state, county, place. Module B No key. Batch up to 10,000
addresses.

Census TIGER/Line City and county boundary shapefiles. Fallback and checks Free download.

Parcel and assessor Year built, units, use code (MassGIS, NJ Facts Gaps: San Diego year built;
data MOD-IV, LA County, SF). Berkeley year built and
units; Santa Ana none.

LegiScan and Open Bill text, status, votes. Optional pending-bill Free keys. LegiScan: 10,000
States checks queries a month.

LSC Eviction Laws Coded eviction laws as of 1/1/2021. Methods only Not current truth.
Database

Data boundaries
Not provided and not allowed: customer or resident data, rent or pricing data, internal legal analysis, and scraping that
breaks a site's terms. Municipal code sites often restrict bulk scraping. Use the starter corpus.

---
## 15. Metrics and Evaluation
### 15.1 Internal quality metrics
Metric Definition Goal

Dev-key extraction score score.py extraction component on the dev key Top of range; no regressions

Quote verification rate Records whose quote is found exactly / records produced 100% in rules.json

Missed-applicable-rule rate Applicable rules answered as omitted / all applicable rules 0 on the dev set

Unknown rate Unknown results / all results, with a reason for each Explained, not hidden

Citation coverage Applies results with a verified quote / applies results 100%

Change-test pass rate T1 to T6 matched to our own expectation 6 of 6

Hour-16 time Minutes from file received to affected list Under 5

Cost per full run Model spend for corpus extraction Within credits, with room for
3 reruns
### 15.2 Evaluation loop
## 1. Run extraction on a few documents. Read the output by eye.
## 2. Run the dev-key score. Record the report.
## 3. Change the prompt or code. Rerun only what changed (cache).
## 4. Repeat until the score stops improving. Freeze the prompt version.
## 5. Run the full corpus. Run lookups for 500 addresses. Run T1 to T6.
## 6. Run score.py one last time and capture the report for the videos.
---
## 16. Release Plan and Milestones
The hackathon plan in the brief sets the rhythm. Our build milestones follow it.

Hours Milestone Exit criteria

0 to 1 Kickoff and setup Starter pack read. Schema and dev key understood. Repo created. Assumptions
confirmed.

1 to 6 Module A running All 87 documents processed. Dev-key score recorded. Quote gate on.

6 to 11 Module B core Geocoding cached. Stacks correct. Coverage engine passes unit tests.

11 to 16 Address lookup complete lookups.json for 500 addresses. Citations. English summaries. UI result page.

16 to 20 Change tracking Hour-16 ordinance processed. T1 to T6 pass. Conflict flag on T3.

20 to 23 Scoring and polish score.py run. Fixes. Spanish view. Videos recorded.

23 to 24 Demo and submit Files, repo, live link and videos submitted.
### 16.1 Cut line
If time runs short, drop work in this order. Never cut P0.
## 1. Result export (D-15) and map views.
## 2. Address timeline (C-08) and ad hoc analysis (C-09).
## 3. Audit viewer and score viewer screens (D-12, D-13). Keep the audit data.
## 4. Pipeline console UI (D-11). Keep the CLI.
## 5. Spanish view (S-01).
## 6. Confidence score formula detail (keep a simple version and the conflict flag).
### 16.2 Feature freeze
Freeze new features at hour 20. After that, only fixes, scoring runs, documentation and videos.

---
## 17. Demo and Submission Plan
### 17.1 Demo script (about 4 minutes)
Time Scene What to show What it proves

0:00 Hook The question. One address typed in. Clear purpose

0:30 Result SF 20-unit building. Stack, six categories, citations. Accuracy, plain language

1:15 Source Open the drawer. Highlighted quote and retrieval date. Traceability

1:45 Unknown A Berkeley or San Diego address with missing facts. Honest uncertainty

2:15 As-of Move the date across 1/1/2026 and 7/1/2027. Change tracking

2:45 Changes T1 to T6 and the T3 conflict flag. Module C

3:15 Hour-16 Process the new ordinance live. Automation, scalability

3:45 Scores score.py report on screen. Measured results
### 17.2 Video requirements (from the brief)
- Team video: introduce the team.
- Demo video: show the tool in use.
- Technical video: walk through how the system works.
- All videos must include test scores. Run score.py on the dev set and show the full report on screen. Show
results for T1 to T6. Show the system processing the hour-16 ordinance dataset.
- Every interface shown must say "not legal advice".
### 17.3 Submission checklist
Item Done when

rules.json Validated. Quotes verified. In repo.

lookups.json 500 addresses. Only five statuses. In repo.

changes.json T1 to T6. Conflict flags on T3. In repo.

README Install, env vars, run steps, data sources, limits, disclaimer.

Live demo Link opens. Sample lookup works. Disclaimer visible.

Videos Three videos with scores and T1 to T6 and hour-16 shown.

Final score run Report saved and shown in a video.

---
## 18. Risks and Mitigations
Risk Impact Mitigation

Model invents text or citations Lost trust; citation points lost Exact quote check. Reject on failure. Retry once. Log it.

Over- or under-extraction of rules Extraction score falls Clear prompt on "one record per rule". Dev-key loop. Merge
duplicates.

Wrong dates or relative dates Wrong status at as-of dates Parse dates in code. Boundary tests. Flag relative dates.

Postal city differs from legal city Wrong local rules Use incorporated place from Census. Test border cases.

Missing parcel facts Wrong "applies" or "not Unknown policy. Explain the gap.
covered"

Preemption is nuanced Wrong precedence Extract from text. Flag uncertainty. Show both citations.

Hour-16 document is a new format or T6 fails Multi-format loader. Rehearse with our own synthetic
style ordinance.

Schema or matching differs from our Rework at the end Read schema in hour 0 to 1. Export adapter. Run score.py
assumption early.

Rate limits or model outage Extraction stalls Caching. Provider fallback. Concurrency limit. Resume.

Credits run out Cannot rerun Estimate tokens first. Cheaper model for simple steps.
Cache.

Live demo fails Lost demo Static fallback. Recorded backup. Precomputed lookups.

Answer key is not counsel-reviewed (6 Some expected answers Trust the source text. Note limits in the README.
of 58 rules unverified) may be off

Time overrun Missing P0 Cut line in Section 16.1. Freeze at hour 20.

Scope creep on UI Less time for accuracy Accuracy first. Keep the UI simple and clear.

---
## 19. Assumptions, Dependencies and Open Questions
### 19.1 Assumptions
- The rule schema has the fields listed in the brief: category, jurisdiction, requirement, coverage conditions,
exemptions, effective date, status, penalty, source citation, quoted span.
- The default as-of date for scoring is October 1, 2026, as in the brief's example [Confirm].
- lookups.json lists rules whose result is one of the five statuses. Rules that clearly do not cover a property are
left out [Confirm].
- The hour-16 ordinance arrives as text, markdown, HTML, PDF or DOCX in the shared folder.
- Using hosted language models and the sponsor credits is allowed.
### 19.2 Dependencies
- Starter pack in the shared Drive folder.
- Language-model API credits (Anthropic credits provided; other providers as backup).
- Census Geocoder and TIGER files (free, public).
- Hosting for a live demo (frontend, API, database).
### 19.3 Open questions
# Question Where to find the answer

1 What are the exact JSON field names and enums in the rule schema? Starter pack, schema file

2 How does matching and partial credit work for statuses and key values? Participant guide

3 Should lookups.json include rules that do not cover a property? Participant guide, dev key

4 How does the key represent "no rule at this level" for counties? Dev answer key

5 Does "superseded" need the superseding rule ID? Schema and dev key

6 In what format will the hour-16 ordinance arrive? Organizers

7 Is the team solo or a group? How should workstreams be split? Team

8 Are time limits set for the three videos? Organizers

---
## Appendix A. Glossary
Term Meaning

As-of date The date for which rules are evaluated. Inclusive.

Coverage conditions Tests that decide if a rule applies to a building: units, year built, owner type and similar.

Exemption A condition that removes a building from a rule.

Jurisdiction stack The state, county and city that govern an address.

Legal city The incorporated place from the Census, not the postal city.

Preemption When a higher level of law blocks or overrides a lower level.

Supersede When one rule takes precedence over another at an address.

Enacted Passed into law. May still have a future effective date.

Pending Proposed, not law.

Not yet effective Enacted, with an effective date after the as-of date.

Unknown A rule is in force but a needed fact is missing.

No-rule finding A statement that the provided corpus holds no rule for a category at a level.

Quoted span The exact sentence or phrase from the source that supports a rule.

Starter pack The data and code provided by the organizers.

Dev key The small answer key for self-testing: 10 rules and 20 addresses.
## Appendix B. Standard Text
Disclaimer (English)

This tool summarizes public law for information only. It is not legal advice and not a compliance certification. Laws
change. Check the source text, or ask a qualified professional, before you act.

Disclaimer (Spanish)

Esta herramienta resume leyes públicas solo con fines informativos. No es asesoría legal ni una certificación de
cumplimiento. Las leyes cambian. Revise el texto de la fuente o consulte a un profesional calificado antes de actuar.

Standard messages
Situation Message

No rule at a level No rule found in the provided corpus at this level.

Unknown We cannot tell if this rule covers the building. Missing fact: [fact].

Superseded This rule is overridden at this address by [rule]. Both are shown.

Not yet effective This rule is enacted but starts on [date].

Pending Proposed. Not law. This bill has not been enacted.

Possible conflict A state rule and a local rule may overlap. Flagged for review.

Low confidence Low confidence. Please check the source text.

---
## Appendix C. Traceability to Scoring
Scoring component Main features Related business rules

Extraction accuracy (25) A-01 to A-15 BR-12, BR-14

Address coverage (20) B-01 to B-16 BR-05 to BR-10, BR-13

Citations (15) A-05, B-14, R-01 BR-12

Change tracking (15) C-01 to C-07, C-10 BR-01 to BR-04, BR-15

Plain language and usability (10) A-12, D-01 to D-10, S-01 BR-17

Responsible design (10) R-01 to R-09, B-17, D-07, D-08 BR-10, BR-11, BR-17, BR-18

Scalability path (5) A-15, S-03, J5 None (data-driven design)
