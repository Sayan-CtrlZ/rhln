"""Unit tests for Modules A, B, and C core engines and deliverables."""

import pytest
from httpx import ASGITransport, AsyncClient
from rhln.api.main import app
from rhln.change.cases import ChangeTrackingEngine
from rhln.engine.predicate import PredicateEvaluator, TriBool, kleene_and, kleene_or, kleene_not
from rhln.engine.lookup import AddressLookupEngine
from rhln.extract.verify import verify_quote_span
from rhln.geo.stack import JurisdictionResolver
from rhln.models import SampleAddress, OfficialRuleRecord


def test_kleene_three_valued_logic():
    # NOT
    assert kleene_not(TriBool.TRUE) == TriBool.FALSE
    assert kleene_not(TriBool.FALSE) == TriBool.TRUE
    assert kleene_not(TriBool.UNKNOWN) == TriBool.UNKNOWN

    # AND
    assert kleene_and([TriBool.TRUE, TriBool.TRUE]) == TriBool.TRUE
    assert kleene_and([TriBool.TRUE, TriBool.UNKNOWN]) == TriBool.UNKNOWN
    assert kleene_and([TriBool.TRUE, TriBool.FALSE]) == TriBool.FALSE
    assert kleene_and([TriBool.FALSE, TriBool.UNKNOWN]) == TriBool.FALSE

    # OR
    assert kleene_or([TriBool.FALSE, TriBool.FALSE]) == TriBool.FALSE
    assert kleene_or([TriBool.FALSE, TriBool.UNKNOWN]) == TriBool.UNKNOWN
    assert kleene_or([TriBool.FALSE, TriBool.TRUE]) == TriBool.TRUE
    assert kleene_or([TriBool.TRUE, TriBool.UNKNOWN]) == TriBool.TRUE


def test_predicate_evaluator_missing_facts():
    # When year_built or units is missing (None), evaluation MUST return UNKNOWN
    pred = {"fact": "year_built", "cmp": "lte", "value": 1979}
    assert PredicateEvaluator.evaluate(pred, {"year_built": None}) == TriBool.UNKNOWN
    assert PredicateEvaluator.evaluate(pred, {"year_built": 1970}) == TriBool.TRUE
    assert PredicateEvaluator.evaluate(pred, {"year_built": 1985}) == TriBool.FALSE


def test_jurisdiction_resolver_neighborhoods():
    resolver = JurisdictionResolver()

    # Dorchester -> Boston, MA
    dorchester_addr = SampleAddress(
        address_id="TEST-01",
        street_address="123 Columbia Rd",
        postal_city="Dorchester",
        state="MA",
        zip="02121",
    )
    resolved = resolver.resolve_address(dorchester_addr)
    assert resolved.legal_city == "Boston"
    assert resolved.state == "MA"
    assert resolved.legal_county == "Suffolk County"

    # Berkeley -> Berkeley, CA
    berkeley_addr = SampleAddress(
        address_id="TEST-02",
        street_address="2100 Shattuck Ave",
        postal_city="Berkeley",
        state="CA",
        zip="94704",
    )
    res_ca = resolver.resolve_address(berkeley_addr)
    assert res_ca.legal_city == "Berkeley"
    assert res_ca.state == "CA"
    assert res_ca.legal_county == "Alameda County"


def test_quote_verification():
    doc = "Section 2. Under the Rent Ordinance, landlords may increase rent by at most 5% annually."
    valid_quote = "landlords may increase rent by at most 5% annually."
    is_valid, start, end = verify_quote_span(doc, valid_quote)
    assert is_valid is True
    assert doc[start:end] == valid_quote

    # Non-existent quote
    invalid_quote = "landlords may increase rent by 15% without notice."
    is_invalid, _, _ = verify_quote_span(doc, invalid_quote)
    assert is_invalid is False


def test_change_tracking_tests_t1_to_t5():
    sample_addresses = [
        SampleAddress(address_id="CA-01", street_address="1st St", postal_city="Los Angeles", state="CA", zip="90001"),
        SampleAddress(address_id="NJ-HOB", street_address="Washington St", postal_city="Hoboken", state="NJ", zip="07030"),
        SampleAddress(address_id="NJ-JC", street_address="Grove St", postal_city="Jersey City", state="NJ", zip="07302"),
        SampleAddress(address_id="NJ-NWK", street_address="Broad St", postal_city="Newark", state="NJ", zip="07102"),
        SampleAddress(address_id="MA-BOS", street_address="Boylston St", postal_city="Boston", state="MA", zip="02116"),
    ]
    engine = ChangeTrackingEngine(sample_addresses)

    # T1: CA addresses
    t1 = engine.evaluate_t1()
    assert "CA-01" in t1.affected_address_ids
    assert "NJ-HOB" not in t1.affected_address_ids

    # T2: Hoboken and Jersey City, NOT Newark
    t2 = engine.evaluate_t2()
    assert "NJ-HOB" in t2.affected_address_ids
    assert "NJ-JC" in t2.affected_address_ids
    assert "NJ-NWK" not in t2.affected_address_ids

    # T3: NJ addresses, conflict flag on HOB and JC
    t3 = engine.evaluate_t3()
    assert "NJ-HOB" in t3.affected_address_ids
    assert "NJ-JC" in t3.conflict_flag_address_ids

    # T5: Negative test - affected set is empty
    t5 = engine.evaluate_t5()
    assert len(t5.affected_address_ids) == 0


@pytest.mark.anyio
async def test_live_deliverable_export_endpoints():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # 1. Download rules.json
        r_rules = await client.get("/api/v1/rules/export")
        assert r_rules.status_code == 200
        assert "rules" in r_rules.json()

        # 2. Download lookups.json
        r_lookups = await client.get("/api/v1/lookup/export")
        assert r_lookups.status_code == 200
        assert "lookups" in r_lookups.json()

        # 3. Download changes.json
        r_changes = await client.get("/api/v1/changes/export")
        assert r_changes.status_code == 200
        assert "T1" in r_changes.json()
        assert "T5" in r_changes.json()
