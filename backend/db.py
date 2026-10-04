"""Database setup and SQLAlchemy models adhering to TRD Section 4.7.

Supports SQLite (local development and scoring runs) and PostgreSQL (production).
Provides initialization and seeding functions from corpus, rules, and sample properties.
"""

from __future__ import annotations

import csv
import json
import logging
import os
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

from sqlalchemy import (
    Boolean,
    Column,
    Date,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    create_engine,
)
from sqlalchemy.orm import declarative_base, relationship, sessionmaker

logger = logging.getLogger("backend.db")

Base = declarative_base()

# Determine database URL: default to SQLite in data/backend.db for local dev
DB_PATH = Path(__file__).resolve().parent.parent / "data" / "backend.db"
DEFAULT_SQLITE_URL = f"sqlite:///{DB_PATH}"

DATABASE_URL = os.environ.get("DATABASE_URL", DEFAULT_SQLITE_URL)
if DATABASE_URL.startswith("postgresql+asyncpg://"):
    # Synchronous engine compatibility if needed
    DATABASE_URL = DATABASE_URL.replace("postgresql+asyncpg://", "postgresql://")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
    echo=False,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# ---------------------------------------------------------------------------
# SQLAlchemy Models matching TRD Section 4.7
# ---------------------------------------------------------------------------

class Jurisdiction(Base):
    __tablename__ = "jurisdictions"

    id = Column(String, primary_key=True)
    level = Column(String, nullable=False)  # state, county, city, consolidated
    name = Column(String, nullable=False)
    state_fips = Column(String(2), nullable=False)
    county_fips = Column(String(3), nullable=True)
    place_geoid = Column(String(7), nullable=True)
    parent_id = Column(String, ForeignKey("jurisdictions.id"), nullable=True)
    in_scope = Column(Boolean, default=True, nullable=False)
    meta_json = Column(Text, default="{}", nullable=False)

    rules = relationship("Rule", back_populates="jurisdiction")


class Document(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True)
    jurisdiction_id = Column(String, ForeignKey("jurisdictions.id"), nullable=True)
    doc_type = Column(String, nullable=True)  # statute, ordinance, bill, regulation, other
    title = Column(String, nullable=True)
    url = Column(String, nullable=True)
    retrieval_date = Column(Date, nullable=True)
    content_type = Column(String, default="full_text", nullable=False)
    sha256 = Column(String(64), nullable=False)
    text = Column(Text, nullable=True)
    profile_json = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    rules = relationship("Rule", back_populates="document")


class Rule(Base):
    __tablename__ = "rules"

    id = Column(String, primary_key=True)
    document_id = Column(String, ForeignKey("documents.id"), nullable=True)
    jurisdiction_id = Column(String, ForeignKey("jurisdictions.id"), nullable=False)
    category = Column(String, nullable=False)
    rule_kind = Column(String, default="substantive", nullable=False)
    title = Column(String, nullable=True)
    requirement = Column(Text, nullable=False)
    key_values_json = Column(Text, default="{}", nullable=False)
    coverage_json = Column(Text, default="{}", nullable=False)
    coverage_text = Column(Text, nullable=True)
    exemptions_json = Column(Text, default="[]", nullable=False)
    effective_date = Column(String, nullable=True)
    effective_date_text = Column(String, nullable=True)
    date_basis_json = Column(Text, nullable=True)
    end_date = Column(String, nullable=True)
    status = Column(String, nullable=False)  # enacted, pending, in_force
    penalty = Column(Text, nullable=True)
    citation_label = Column(String, nullable=False)
    section_ref = Column(String, nullable=True)
    quote = Column(Text, nullable=False)
    quote_start = Column(Integer, default=0, nullable=False)
    quote_end = Column(Integer, default=0, nullable=False)
    summary_en = Column(Text, nullable=True)
    summary_es = Column(Text, nullable=True)
    confidence = Column(Float, default=1.0)
    flags_json = Column(Text, default="[]", nullable=False)
    conflict_flag = Column(Boolean, default=False)
    conflict_note = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    jurisdiction = relationship("Jurisdiction", back_populates="rules")
    document = relationship("Document", back_populates="rules")


class RuleRelation(Base):
    __tablename__ = "rule_relations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    from_rule_id = Column(String, ForeignKey("rules.id"), nullable=False)
    to_rule_id = Column(String, ForeignKey("rules.id"), nullable=False)
    relation = Column(String, nullable=False)  # yields_to, preempts, supplements, amends, possible_conflict
    origin = Column(String, default="text", nullable=False)
    condition_json = Column(Text, nullable=True)
    quote = Column(Text, nullable=True)
    confidence = Column(Float, default=1.0)


class NonRuleEvent(Base):
    __tablename__ = "non_rule_events"

    id = Column(String, primary_key=True)
    document_id = Column(String, ForeignKey("documents.id"), nullable=True)
    jurisdiction_id = Column(String, ForeignKey("jurisdictions.id"), nullable=True)
    category = Column(String, nullable=True)
    event_type = Column(String, nullable=False)
    lifecycle = Column(String, nullable=False)  # struck, withdrawn, failed, repealed
    title = Column(String, nullable=False)
    event_date = Column(String, nullable=True)
    quote = Column(Text, nullable=False)
    note = Column(Text, nullable=True)


class Property(Base):
    __tablename__ = "properties"

    id = Column(String, primary_key=True)
    source_row = Column(Integer, nullable=True)
    street = Column(String, nullable=True)
    postal_city = Column(String, nullable=True)
    state = Column(String(2), nullable=True)
    zip = Column(String, nullable=True)
    year_built = Column(Integer, nullable=True)
    units = Column(Integer, nullable=True)
    use_code = Column(String, nullable=True)
    property_type = Column(String, nullable=True)
    data_gaps_json = Column(Text, default="[]", nullable=False)
    raw_json = Column(Text, nullable=True)


class Geocode(Base):
    __tablename__ = "geocodes"

    property_id = Column(String, ForeignKey("properties.id"), primary_key=True)
    status = Column(String, nullable=False)  # match, tie, no_match, fallback
    match_type = Column(String, nullable=True)
    matched_address = Column(String, nullable=True)
    lat = Column(Float, nullable=True)
    lon = Column(Float, nullable=True)
    state_fips = Column(String(2), nullable=True)
    county_fips = Column(String(3), nullable=True)
    place_geoid = Column(String(7), nullable=True)
    source = Column(String, default="census_batch", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class LookupRecord(Base):
    __tablename__ = "lookups"

    id = Column(String, primary_key=True)
    property_id = Column(String, ForeignKey("properties.id"), nullable=True)
    as_of = Column(String, nullable=False)
    facts_json = Column(Text, nullable=False)
    stack_json = Column(Text, nullable=False)
    confidence = Column(Float, default=1.0)
    flags_json = Column(Text, default="[]", nullable=False)
    result_json = Column(Text, nullable=False)
    input_hash = Column(String(64), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class ChangeCase(Base):
    __tablename__ = "change_cases"

    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    trigger_json = Column(Text, nullable=False)
    before_as_of = Column(String, nullable=True)
    after_as_of = Column(String, nullable=True)
    scenario = Column(String, default="enacted", nullable=False)
    affected_count = Column(Integer, default=0)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


# ---------------------------------------------------------------------------
# Seeding and Initialization Helper
# ---------------------------------------------------------------------------

def init_db():
    """Create all tables defined in TRD 4.7."""
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables verified/created at %s", engine.url)


def seed_database_if_needed():
    """Seed jurisdictions, corpus documents, extracted rules, and properties into SQLite."""
    init_db()
    session = SessionLocal()
    try:
        root_dir = Path(__file__).resolve().parent.parent

        # 1. Seed Jurisdictions
        jur_count = session.query(Jurisdiction).count()
        if jur_count == 0:
            logger.info("Seeding jurisdictions...")
            base_jurisdictions = [
                Jurisdiction(id="J-CA", level="state", name="State of California", state_fips="06", in_scope=True),
                Jurisdiction(id="J-NJ", level="state", name="State of New Jersey", state_fips="34", in_scope=True),
                Jurisdiction(id="J-MA", level="state", name="Commonwealth of Massachusetts", state_fips="25", in_scope=True),
                Jurisdiction(id="J-CA-001", level="county", name="Alameda County", state_fips="06", county_fips="001", parent_id="J-CA"),
                Jurisdiction(id="J-CA-075", level="consolidated", name="City and County of San Francisco", state_fips="06", county_fips="075", place_geoid="0667000", parent_id="J-CA"),
                Jurisdiction(id="J-CA-037", level="county", name="Los Angeles County", state_fips="06", county_fips="037", parent_id="J-CA"),
                Jurisdiction(id="J-CA-BERK", level="city", name="City of Berkeley", state_fips="06", county_fips="001", place_geoid="0606000", parent_id="J-CA-001"),
                Jurisdiction(id="J-CA-OAK", level="city", name="City of Oakland", state_fips="06", county_fips="001", place_geoid="0653000", parent_id="J-CA-001"),
                Jurisdiction(id="J-CA-LA", level="city", name="City of Los Angeles", state_fips="06", county_fips="037", place_geoid="0644000", parent_id="J-CA-037"),
                Jurisdiction(id="J-CA-SM", level="city", name="City of Santa Monica", state_fips="06", county_fips="037", place_geoid="0670000", parent_id="J-CA-037"),
                Jurisdiction(id="J-CA-SJ", level="city", name="City of San Jose", state_fips="06", county_fips="085", place_geoid="0668000", parent_id="J-CA"),
                Jurisdiction(id="J-NJ-NEW", level="city", name="City of Newark", state_fips="34", county_fips="013", place_geoid="3451000", parent_id="J-NJ"),
                Jurisdiction(id="J-NJ-JC", level="city", name="City of Jersey City", state_fips="34", county_fips="017", place_geoid="3436000", parent_id="J-NJ"),
                Jurisdiction(id="J-NJ-HOB", level="city", name="City of Hoboken", state_fips="34", county_fips="017", place_geoid="3432250", parent_id="J-NJ"),
                Jurisdiction(id="J-MA-BOS", level="city", name="City of Boston", state_fips="25", county_fips="025", place_geoid="2507000", parent_id="J-MA"),
            ]
            session.add_all(base_jurisdictions)
            session.commit()

        # 2. Seed Documents from Corpus Manifest & Text
        doc_count = session.query(Document).count()
        manifest_path = root_dir / "data" / "corpus" / "corpus_manifest.csv"
        text_dir = root_dir / "data" / "corpus" / "text"
        if doc_count == 0 and manifest_path.exists():
            logger.info("Seeding documents from corpus manifest...")
            with open(manifest_path, mode="r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                docs = []
                for row in reader:
                    doc_id = row.get("doc_id")
                    if not doc_id:
                        continue
                    txt_file = text_dir / f"{doc_id}.txt"
                    txt_content = ""
                    if txt_file.exists():
                        try:
                            txt_content = txt_file.read_text(encoding="utf-8", errors="ignore")
                        except Exception:
                            pass
                    
                    jur_val = row.get("jurisdiction", "")
                    jur_id = "J-CA"
                    if "NJ" in jur_val or "Jersey" in jur_val:
                        jur_id = "J-NJ"
                    elif "MA" in jur_val or "Mass" in jur_val or "Boston" in jur_val:
                        jur_id = "J-MA"
                    elif "San Francisco" in jur_val:
                        jur_id = "J-CA-075"
                    elif "Berkeley" in jur_val:
                        jur_id = "J-CA-BERK"
                    elif "Oakland" in jur_val:
                        jur_id = "J-CA-OAK"
                    elif "Los Angeles" in jur_val:
                        jur_id = "J-CA-LA"

                    docs.append(
                        Document(
                            id=doc_id,
                            jurisdiction_id=jur_id,
                            doc_type=row.get("doc_type", "statute"),
                            title=row.get("title", doc_id),
                            url=row.get("source_url", ""),
                            sha256=row.get("sha256", "0" * 64),
                            text=txt_content[:500000] if txt_content else "",
                            content_type="full_text" if txt_content else "link_only",
                        )
                    )
                if docs:
                    session.add_all(docs)
                    session.commit()
                    logger.info("Seeded %d documents into database.", len(docs))

        # 3. Seed Rules from out/rules.json or extracted rules cache
        rule_count = session.query(Rule).count()
        rules_file = root_dir / "out" / "rules.json"
        if rule_count == 0 and rules_file.exists():
            logger.info("Seeding rules into database...")
            with open(rules_file, "r", encoding="utf-8") as f:
                rules_data = json.load(f)
                rules_list = rules_data.get("rules", [])
                db_rules = []
                for r in rules_list:
                    jur_name = r.get("jurisdiction", "")
                    jur_id = "J-CA"
                    if "NJ" in jur_name:
                        jur_id = "J-NJ"
                    elif "MA" in jur_name:
                        jur_id = "J-MA"
                    elif "Berkeley" in jur_name:
                        jur_id = "J-CA-BERK"
                    elif "San Francisco" in jur_name:
                        jur_id = "J-CA-075"
                    elif "Oakland" in jur_name:
                        jur_id = "J-CA-OAK"
                    elif "Los Angeles" in jur_name:
                        jur_id = "J-CA-LA"

                    db_rules.append(
                        Rule(
                            id=r.get("team_rule_id"),
                            document_id=r.get("source_doc_id"),
                            jurisdiction_id=jur_id,
                            category=r.get("category"),
                            title=r.get("title"),
                            requirement=r.get("requirement", ""),
                            key_values_json=json.dumps({"key_value": r.get("key_value")}),
                            coverage_json=json.dumps(r.get("coverage_conditions") or {}),
                            coverage_text=str(r.get("coverage_conditions")),
                            exemptions_json=json.dumps([r.get("exemptions")] if r.get("exemptions") else []),
                            effective_date=r.get("effective_date"),
                            status=r.get("status", "in_force"),
                            citation_label=r.get("citation", ""),
                            quote=r.get("quoted_span", ""),
                            summary_en=r.get("requirement"),
                            summary_es=r.get("requirement"),
                            confidence=r.get("confidence", 1.0),
                            conflict_flag=r.get("conflict_flag", False),
                            conflict_note=r.get("conflict_note"),
                        )
                    )
                if db_rules:
                    session.add_all(db_rules)
                    session.commit()
                    logger.info("Seeded %d rules into database.", len(db_rules))

        # 4. Seed Properties from sample_addresses.csv
        prop_count = session.query(Property).count()
        sample_path = root_dir / "data" / "sample_addresses.csv"
        if prop_count == 0 and sample_path.exists():
            logger.info("Seeding properties from sample_addresses.csv...")
            with open(sample_path, mode="r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                props = []
                for idx, row in enumerate(reader):
                    p_id = row.get("address_id") or f"P-{idx+1:04d}"
                    yb = None
                    try:
                        yb = int(row.get("year_built", "")) if row.get("year_built") else None
                    except Exception:
                        pass
                    u = None
                    try:
                        u = int(row.get("units", "")) if row.get("units") else None
                    except Exception:
                        pass

                    props.append(
                        Property(
                            id=p_id,
                            source_row=idx + 1,
                            street=row.get("street_address"),
                            postal_city=row.get("postal_city"),
                            state=row.get("state"),
                            zip=row.get("zip"),
                            year_built=yb,
                            units=u,
                            use_code=row.get("use_code"),
                            property_type=row.get("use_description"),
                            raw_json=json.dumps(row),
                        )
                    )
                if props:
                    session.add_all(props)
                    session.commit()
                    logger.info("Seeded %d sample properties into database.", len(props))

        # 5. Seed Change Cases
        case_count = session.query(ChangeCase).count()
        changes_file = root_dir / "out" / "changes.json"
        if case_count == 0 and changes_file.exists():
            logger.info("Seeding change cases into database...")
            with open(changes_file, "r", encoding="utf-8") as f:
                cdata = json.load(f)
                cases = cdata.get("cases", {})
                t_cases = [
                    ChangeCase(
                        id="T1",
                        title="T1: Effective Date Horizon / AB 12 Deposit Cap",
                        trigger_json=json.dumps({"type": "effective_date", "law": "AB 12"}),
                        before_as_of="2024-06-30",
                        after_as_of="2024-07-01",
                        scenario="enacted",
                        affected_count=len(cases.get("T1", {}).get("affected_address_ids", [])),
                        notes=cases.get("T1", {}).get("notes"),
                    ),
                    ChangeCase(
                        id="T2",
                        title="T2: Pending Legislation Horizon / CA Algorithmic Ban (AB 325)",
                        trigger_json=json.dumps({"type": "pending_bill", "law": "AB 325"}),
                        before_as_of="2026-10-01",
                        after_as_of="2027-01-01",
                        scenario="enacted",
                        affected_count=len(cases.get("T2", {}).get("affected_address_ids", [])),
                        notes=cases.get("T2", {}).get("notes"),
                    ),
                    ChangeCase(
                        id="T3",
                        title="T3: Jurisdictional Override / Newark Rent Control Preemption",
                        trigger_json=json.dumps({"type": "local_ordinance", "jurisdiction": "Newark, NJ"}),
                        before_as_of="2026-10-01",
                        after_as_of="2026-10-01",
                        scenario="enacted",
                        affected_count=len(cases.get("T3", {}).get("affected_address_ids", [])),
                        notes=cases.get("T3", {}).get("notes"),
                    ),
                    ChangeCase(
                        id="T4",
                        title="T4: Multi-Jurisdictional Cross-Border / Jersey City vs Hoboken vs State",
                        trigger_json=json.dumps({"type": "cross_border", "states": ["NJ"]}),
                        before_as_of="2026-10-01",
                        after_as_of="2026-10-01",
                        scenario="enacted",
                        affected_count=len(cases.get("T4", {}).get("affected_address_ids", [])),
                        notes=cases.get("T4", {}).get("notes"),
                    ),
                    ChangeCase(
                        id="T5",
                        title="T5: Non-Rule Legal Event / Court Injunction Striking Ordinance",
                        trigger_json=json.dumps({"type": "court_injunction", "status": "struck"}),
                        before_as_of="2026-10-01",
                        after_as_of="2026-10-01",
                        scenario="enacted",
                        affected_count=len(cases.get("T5", {}).get("affected_address_ids", [])),
                        notes=cases.get("T5", {}).get("notes"),
                    ),
                ]
                session.add_all(t_cases)
                session.commit()
                logger.info("Seeded 5 change cases into database.")

    except Exception as exc:
        session.rollback()
        logger.error("Failed to seed database: %s", exc)
    finally:
        session.close()


def get_db():
    """Dependency for FastAPI route handlers."""
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
