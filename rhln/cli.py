import argparse
import asyncio
import csv
import json
import os
import sys

# Ensure project root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from rhln.change.cases import ChangeTrackingEngine
from rhln.engine.lookup import AddressLookupEngine
from rhln.extract.extractor import RuleExtractionPipeline
from rhln.models import OfficialRuleRecord, SampleAddress


def parse_args():
    parser = argparse.ArgumentParser(description="Rental Housing Law Navigator (RHLN) CLI")
    subparsers = parser.add_subparsers(dest="command", help="Command to execute")

    # Extract command
    extract_p = subparsers.add_parser("extract", help="Run Module A rule extraction")
    extract_p.add_argument("--all", action="store_true", help="Extract all captured corpus documents")
    extract_p.add_argument("--doc", type=str, help="Extract single document by doc_id (e.g. D006)")
    extract_p.add_argument("--force", action="store_true", help="Force refresh bypassing local cache")
    extract_p.add_argument("--out", type=str, default="out/rules.json", help="Output path for rules.json")

    # Lookup command
    lookup_p = subparsers.add_parser("lookup", help="Run Module B address coverage engine")
    lookup_p.add_argument("--as-of", type=str, default="2026-10-01", help="Temporal query date (YYYY-MM-DD)")
    lookup_p.add_argument("--addresses", type=str, default="data/sample_addresses.csv", help="Sample addresses CSV")
    lookup_p.add_argument("--rules", type=str, default="out/rules.json", help="Rules JSON file")
    lookup_p.add_argument("--out", type=str, default="out/lookups.json", help="Output path for lookups.json")

    # Changes command
    changes_p = subparsers.add_parser("changes", help="Run Module C change tracking engine")
    changes_p.add_argument("--addresses", type=str, default="data/sample_addresses.csv", help="Sample addresses CSV")
    changes_p.add_argument("--out", type=str, default="out/changes.json", help="Output path for changes.json")

    # Export all
    subparsers.add_parser("export-all", help="Generate all three scored deliverable files")

    return parser.parse_args()


async def run_extract(args):
    pipeline = RuleExtractionPipeline()
    doc_ids = [args.doc] if args.doc else None
    print(f"Starting Module A extraction (doc_ids={doc_ids}, force={args.force})...")
    rules = await pipeline.run_pipeline(doc_ids=doc_ids, force_refresh=args.force)
    out_path = pipeline.export_rules_json(rules, args.out)
    print(f"Extraction complete! {len(rules)} verified rules saved to {out_path}")


def run_lookup(args):
    with open(args.rules) as f:
        rules_data = json.load(f)["rules"]
        rules = [OfficialRuleRecord.model_validate(r) for r in rules_data]

    with open(args.addresses) as f:
        addresses = [SampleAddress.model_validate(row) for row in csv.DictReader(f)]

    print(f"Running Module B lookup engine across {len(addresses)} addresses as of {args.as_of}...")
    engine = AddressLookupEngine(rules)
    deliv = engine.generate_lookups_deliverable(addresses, as_of=args.as_of, output_path=args.out)
    print(f"Lookups complete! Saved {len(deliv.lookups)} evaluations to {args.out}")


def run_changes(args):
    with open(args.addresses) as f:
        addresses = [SampleAddress.model_validate(row) for row in csv.DictReader(f)]

    print(f"Running Module C change tracking engine for T1-T5 across {len(addresses)} addresses...")
    engine = ChangeTrackingEngine(addresses)
    res = engine.generate_changes_deliverable(output_path=args.out)
    print(f"Change tracking complete! Saved cases {list(res.keys())} to {args.out}")


def main():
    args = parse_args()
    if args.command == "extract":
        asyncio.run(run_extract(args))
    elif args.command == "lookup":
        run_lookup(args)
    elif args.command == "changes":
        run_changes(args)
    elif args.command == "export-all":
        # Run lookup and changes with defaults
        print("Generating all deliverables...")
        class DefaultLookupArgs:
            rules = "out/rules.json"
            addresses = "data/sample_addresses.csv"
            as_of = "2026-10-01"
            out = "out/lookups.json"

        class DefaultChangesArgs:
            addresses = "data/sample_addresses.csv"
            out = "out/changes.json"

        run_lookup(DefaultLookupArgs())
        run_changes(DefaultChangesArgs())
        print("All deliverables generated in out/ (rules.json, lookups.json, changes.json)")
    else:
        print("Use --help to view available commands.")


if __name__ == "__main__":
    main()
