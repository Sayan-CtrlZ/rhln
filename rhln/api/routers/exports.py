import io
import json
import os
import zipfile
from fastapi import APIRouter, Depends
from fastapi.responses import Response
from pydantic import BaseModel

from rhln.api.deps import get_request_id
from rhln.api.schemas import DataEnvelope, wrap_data

router = APIRouter(tags=["Exports & Evaluation"])


class ExportBundleInfo(BaseModel):
    bundle_name: str
    rules_count: int
    lookups_count: int
    changes_count: int
    score_report_included: bool


def _get_counts():
    rc, lc, cc = 0, 0, 0
    if os.path.exists("out/rules.json"):
        with open("out/rules.json") as f:
            rc = len(json.load(f).get("rules", []))
    if os.path.exists("out/lookups.json"):
        with open("out/lookups.json") as f:
            lc = len(json.load(f).get("lookups", []))
    if os.path.exists("out/changes.json"):
        with open("out/changes.json") as f:
            data = json.load(f)
            if isinstance(data, dict):
                cc = len(data.get("cases", data.keys()))
            elif isinstance(data, list):
                cc = len(data)
    return rc, lc, cc


@router.get("/exports/bundle/latest", response_model=DataEnvelope[ExportBundleInfo])
async def get_latest_bundle_info(
    request_id: str = Depends(get_request_id),
) -> DataEnvelope[ExportBundleInfo]:
    """Summary of current exported deliverables: rules.json, lookups.json, changes.json (TRD P0)."""
    rc, lc, cc = _get_counts()
    return wrap_data(
        data=ExportBundleInfo(
            bundle_name="rhln_deliverables_latest.zip",
            rules_count=rc,
            lookups_count=lc,
            changes_count=cc,
            score_report_included=True,
        ),
        request_id=request_id,
    )


@router.get("/exports/bundle/download")
async def download_bundle():
    """Download a zip archive containing rules.json, lookups.json, and changes.json."""
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        for fname in ["rules.json", "lookups.json", "changes.json"]:
            path = os.path.join("out", fname)
            if os.path.exists(path):
                zf.write(path, arcname=fname)
    zip_buffer.seek(0)
    return Response(
        content=zip_buffer.getvalue(),
        media_type="application/zip",
        headers={"Content-Disposition": 'attachment; filename="rhln_deliverables.zip"'},
    )
