"""Three-valued Kleene logic predicate evaluator for housing law coverage."""

from enum import Enum
from typing import Any, Dict, List, Optional, Tuple, Union


class TriBool(str, Enum):
    TRUE = "true"
    FALSE = "false"
    UNKNOWN = "unknown"

    @classmethod
    def from_bool(cls, b: Optional[bool]) -> "TriBool":
        if b is None:
            return cls.UNKNOWN
        return cls.TRUE if b else cls.FALSE

    def to_bool(self) -> Optional[bool]:
        if self == TriBool.TRUE:
            return True
        elif self == TriBool.FALSE:
            return False
        return None


def kleene_not(val: TriBool) -> TriBool:
    """Kleene negation: NOT true -> false, NOT false -> true, NOT unknown -> unknown."""
    if val == TriBool.TRUE:
        return TriBool.FALSE
    elif val == TriBool.FALSE:
        return TriBool.TRUE
    return TriBool.UNKNOWN


def kleene_and(vals: List[TriBool]) -> TriBool:
    """
    Kleene conjunction:
    - If any value is FALSE -> FALSE
    - Else if any value is UNKNOWN -> UNKNOWN
    - Else -> TRUE
    """
    has_unknown = False
    for v in vals:
        if v == TriBool.FALSE:
            return TriBool.FALSE
        if v == TriBool.UNKNOWN:
            has_unknown = True
    return TriBool.UNKNOWN if has_unknown else TriBool.TRUE


def kleene_or(vals: List[TriBool]) -> TriBool:
    """
    Kleene disjunction:
    - If any value is TRUE -> TRUE
    - Else if any value is UNKNOWN -> UNKNOWN
    - Else -> FALSE
    """
    has_unknown = False
    for v in vals:
        if v == TriBool.TRUE:
            return TriBool.TRUE
        if v == TriBool.UNKNOWN:
            has_unknown = True
    return TriBool.UNKNOWN if has_unknown else TriBool.FALSE


class PredicateEvaluator:
    """Evaluates JSON predicates against property facts with 3-valued logic."""

    @classmethod
    def evaluate(
        cls,
        condition: Union[Dict[str, Any], str, None],
        facts: Dict[str, Any],
        trace: Optional[List[Dict[str, Any]]] = None,
    ) -> TriBool:
        """
        Evaluates a predicate against a dictionary of property facts.
        None or empty condition means unconditionally true (e.g. statewide conduct rule).
        """
        if condition is None or condition == "" or condition == {}:
            return TriBool.TRUE

        # If condition is string, try basic heuristic parsing
        if isinstance(condition, str):
            return cls._evaluate_string_condition(condition, facts, trace)

        if not isinstance(condition, dict):
            return TriBool.TRUE

        op = condition.get("op", "").lower()

        # Logical connectors
        if op == "all" or op == "and":
            args = condition.get("args", [])
            sub_results = [cls.evaluate(arg, facts, trace) for arg in args]
            res = kleene_and(sub_results)
            return res

        elif op == "any" or op == "or":
            args = condition.get("args", [])
            sub_results = [cls.evaluate(arg, facts, trace) for arg in args]
            res = kleene_or(sub_results)
            return res

        elif op == "not":
            arg = condition.get("arg", {})
            sub = cls.evaluate(arg, facts, trace)
            return kleene_not(sub)

        # Atomic comparison: {"fact": "year_built", "cmp": "lte", "value": 1979}
        fact_name = condition.get("fact")
        cmp_op = condition.get("cmp")
        target_val = condition.get("value")

        if fact_name:
            fact_val = facts.get(fact_name)
            result = cls._compare(fact_name, cmp_op, fact_val, target_val)
            if trace is not None:
                trace.append({
                    "fact": fact_name,
                    "cmp": cmp_op,
                    "target": target_val,
                    "actual": fact_val,
                    "result": result.value,
                })
            return result

        return TriBool.TRUE

    @classmethod
    def _compare(
        cls,
        fact_name: str,
        cmp_op: Optional[str],
        actual_val: Any,
        target_val: Any,
    ) -> TriBool:
        # If the fact is missing in data, answer is UNKNOWN
        if actual_val is None or actual_val == "":
            return TriBool.UNKNOWN

        try:
            if cmp_op == "eq":
                return TriBool.TRUE if actual_val == target_val else TriBool.FALSE
            elif cmp_op == "neq":
                return TriBool.TRUE if actual_val != target_val else TriBool.FALSE
            elif cmp_op == "lte":
                return TriBool.TRUE if float(actual_val) <= float(target_val) else TriBool.FALSE
            elif cmp_op == "lt":
                return TriBool.TRUE if float(actual_val) < float(target_val) else TriBool.FALSE
            elif cmp_op == "gte":
                return TriBool.TRUE if float(actual_val) >= float(target_val) else TriBool.FALSE
            elif cmp_op == "gt":
                return TriBool.TRUE if float(actual_val) > float(target_val) else TriBool.FALSE
            elif cmp_op == "in":
                return TriBool.TRUE if actual_val in target_val else TriBool.FALSE
        except (ValueError, TypeError):
            return TriBool.UNKNOWN

        return TriBool.UNKNOWN

    @classmethod
    def _evaluate_string_condition(
        cls,
        text: str,
        facts: Dict[str, Any],
        trace: Optional[List[Dict[str, Any]]],
    ) -> TriBool:
        """Parses common statutory conditions expressed as natural text."""
        lower = text.lower()

        # 1. Building Age / Year Built / Certificate of Occupancy
        year_built = facts.get("year_built")
        if any(kw in lower for kw in ["1979", "1978", "1980", "certificate of occupancy", "new construction", "15-year", "15 years", "built before", "construction date"]):
            if year_built is None:
                return TriBool.UNKNOWN
            if "1979" in lower:
                if year_built == 1979:
                    return TriBool.UNKNOWN
                return TriBool.TRUE if year_built < 1979 else TriBool.FALSE
            if "1978" in lower:
                if year_built == 1978:
                    return TriBool.UNKNOWN
                return TriBool.TRUE if year_built < 1978 else TriBool.FALSE
            if "15-year" in lower or "15 years" in lower:
                # Rolling 15-year exemption relative to 2026
                return TriBool.TRUE if year_built <= 2011 else TriBool.FALSE

        # 2. Unit counts and property structure
        units = facts.get("units")
        if "5 or more" in lower or "5+" in lower:
            if units is None:
                return TriBool.UNKNOWN
            return TriBool.TRUE if units >= 5 else TriBool.FALSE

        if any(kw in lower for kw in ["small-landlord", "small landlord", "two rental properties", "no more than four", "4 residential units"]):
            # Small landlord status requires facts not in single-parcel assessor records
            small_ll = facts.get("small_landlord")
            if small_ll is None:
                return TriBool.UNKNOWN
            return TriBool.TRUE if small_ll else TriBool.FALSE

        if any(kw in lower for kw in ["single-family", "single family", "condominium", "condo", "separately alienable"]):
            use_desc = (facts.get("use_description") or "").lower()
            if not use_desc and units is None:
                return TriBool.UNKNOWN
            if "single" in use_desc or "condo" in use_desc or units == 1:
                return TriBool.TRUE
            return TriBool.FALSE

        # 3. Owner-occupied properties (almost always missing from public assessor records)
        if "2 or fewer" in lower or "owner-occupied" in lower or "owner occupied" in lower:
            owner_occupied = facts.get("owner_occupied")
            if owner_occupied is None:
                return TriBool.UNKNOWN
            return TriBool.TRUE if owner_occupied else TriBool.FALSE

        # Default for general applicability
        return TriBool.TRUE

