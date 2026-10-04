"""Deterministic Address Lookup Engine for Module B."""

import json
from typing import Dict, List, Optional
from rhln.engine.predicate import PredicateEvaluator, TriBool
from rhln.engine.precedence import PrecedenceResolver
from rhln.geo.stack import JurisdictionResolver, ResolvedLocation
from rhln.models import (
    AddressLookupRuleResult,
    LookupsDeliverable,
    OfficialRuleRecord,
    SampleAddress,
)


class AddressLookupEngine:
    """Evaluates address-level housing law coverage deterministically."""

    def __init__(self, rules: List[OfficialRuleRecord]):
        self.rules = rules
        self.rule_map = {r.team_rule_id: r for r in rules}
        self.geo_resolver = JurisdictionResolver()

    def evaluate_address(
        self,
        address: SampleAddress,
        as_of: str = "2026-10-01",
    ) -> List[AddressLookupRuleResult]:
        """Evaluates all rules for a given address on the specified as_of date."""
        resolved: ResolvedLocation = self.geo_resolver.resolve_address(address)
        facts = {
            "year_built": address.year_built,
            "units": address.units,
            "use_code": address.use_code,
            "use_description": address.use_description,
            "city": resolved.legal_city,
            "state": resolved.state,
            "owner_occupied": None,  # Always missing in public records
        }

        evaluations: List[AddressLookupRuleResult] = []

        for rule in self.rules:
            # 1. Jurisdiction filter
            if not self.geo_resolver.is_jurisdiction_match(rule.jurisdiction, resolved):
                continue

            # 2. Status & Temporal evaluation
            if rule.status == "failed":
                # Struck / failed ballot measures don't apply
                continue

            if rule.status == "pending":
                evaluations.append(
                    AddressLookupRuleResult(
                        team_rule_id=rule.team_rule_id,
                        result="pending",
                        explanation=f"Pending legislative proposal in {rule.jurisdiction}: not yet enacted law.",
                        conflict_flag=rule.conflict_flag,
                    )
                )
                continue

            # Check if effective_date is in the future relative to as_of
            if rule.effective_date and rule.effective_date > as_of:
                evaluations.append(
                    AddressLookupRuleResult(
                        team_rule_id=rule.team_rule_id,
                        result="not_yet_effective",
                        explanation=f"Enacted with effective date {rule.effective_date}, which is after query date {as_of}.",
                        conflict_flag=rule.conflict_flag,
                    )
                )
                continue

            # 3. Coverage condition evaluation
            tribool = PredicateEvaluator.evaluate(rule.coverage_conditions, facts)

            if tribool == TriBool.FALSE:
                # Omit rules that do not apply
                continue

            if tribool == TriBool.UNKNOWN:
                evaluations.append(
                    AddressLookupRuleResult(
                        team_rule_id=rule.team_rule_id,
                        result="unknown",
                        explanation=f"Coverage depends on property facts not available in public assessor records ({rule.coverage_conditions or 'building age / unit count'}).",
                        conflict_flag=rule.conflict_flag,
                    )
                )
                continue

            # tribool == TriBool.TRUE
            evaluations.append(
                AddressLookupRuleResult(
                    team_rule_id=rule.team_rule_id,
                    result="applies",
                    explanation=f"In force and covers this property in {resolved.legal_city}, {resolved.state} as of {as_of}.",
                    conflict_flag=rule.conflict_flag,
                )
            )

        # 4. Resolve precedence & preemption
        final_results = PrecedenceResolver.apply_precedence(
            evaluations=evaluations,
            rule_map=self.rule_map,
            legal_city=resolved.legal_city,
            state=resolved.state,
        )

        return final_results

    def generate_lookups_deliverable(
        self,
        addresses: List[SampleAddress],
        as_of: str = "2026-10-01",
        output_path: str = "out/lookups.json",
    ) -> LookupsDeliverable:
        """Generates the official lookups.json deliverable covering all supplied addresses."""
        lookup_dict: Dict[str, List[AddressLookupRuleResult]] = {}

        for addr in addresses:
            results = self.evaluate_address(addr, as_of=as_of)
            lookup_dict[addr.address_id] = results

        deliverable = LookupsDeliverable(as_of=as_of, lookups=lookup_dict)

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(deliverable.model_dump_json(indent=2))

        return deliverable
