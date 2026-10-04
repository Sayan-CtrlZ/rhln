"""Precedence and preemption resolution engine for local vs state laws."""

from typing import List
from backend.models import AddressLookupRuleResult, OfficialRuleRecord


class PrecedenceResolver:
    """Resolves hierarchical overrides (e.g. local rent control superseding state rent cap)."""

    @classmethod
    def apply_precedence(
        cls,
        evaluations: List[AddressLookupRuleResult],
        rule_map: dict[str, OfficialRuleRecord],
        legal_city: str,
        state: str,
    ) -> List[AddressLookupRuleResult]:
        """
        Adjusts evaluation results based on statutory precedence:
        1. Local rent control (SF, LA, Berkeley) supersedes CA statewide AB 1482 rent cap.
        2. Sets conflict flags where state laws potentially conflict or preempt.
        """
        # Collect categories and statuses
        has_local_rent_control = False
        local_rent_rule_id = None

        for eval_res in evaluations:
            rule = rule_map.get(eval_res.team_rule_id)
            if not rule:
                continue

            # Check if this is a local city rent increase rule that applies or is unknown
            if (
                rule.category == "rent_increase_limits"
                and rule.level == "city"
                and eval_res.result in ("applies", "unknown")
            ):
                has_local_rent_control = True
                local_rent_rule_id = rule.team_rule_id
                break

        resolved: List[AddressLookupRuleResult] = []
        for eval_res in evaluations:
            rule = rule_map.get(eval_res.team_rule_id)
            if not rule:
                resolved.append(eval_res)
                continue

            # CA Statewide rent cap yields to local rent control in SF, Berkeley, LA
            if (
                state == "CA"
                and rule.level == "state"
                and rule.category == "rent_increase_limits"
                and has_local_rent_control
                and eval_res.result == "applies"
            ):
                resolved.append(
                    AddressLookupRuleResult(
                        team_rule_id=eval_res.team_rule_id,
                        result="superseded",
                        explanation=f"Statewide rent cap yields to local municipal rent ordinance ({local_rent_rule_id}) at this address.",
                        conflict_flag=eval_res.conflict_flag,
                    )
                )
                continue

            # Pass-through
            resolved.append(eval_res)

        return resolved
