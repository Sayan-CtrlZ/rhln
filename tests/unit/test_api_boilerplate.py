"""Unit tests for FastAPI boilerplate: envelopes, middleware, headers, and error handling."""

import pytest
from httpx import ASGITransport, AsyncClient
from rhln.api.main import app
from rhln.config import settings


@pytest.mark.anyio
async def test_health_endpoint_envelope_and_headers():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/health")
        assert response.status_code == 200

        # Check required headers
        assert "x-request-id" in response.headers
        assert response.headers["x-disclaimer"] == settings.DISCLAIMER_TEXT_EN

        # Check envelope structure
        body = response.json()
        assert "data" in body
        assert "meta" in body
        assert body["data"]["status"] == "ok"
        assert body["meta"]["version"] == "1.0"
        assert body["meta"]["disclaimer"] == settings.DISCLAIMER_TEXT_EN
        assert body["meta"]["request_id"] == response.headers["x-request-id"]


@pytest.mark.anyio
async def test_incoming_request_id_preserved():
    custom_id = "req_custom_trace_12345"
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/health", headers={"X-Request-Id": custom_id})
        assert response.status_code == 200
        assert response.headers["X-Request-Id"] == custom_id
        body = response.json()
        assert body["meta"]["request_id"] == custom_id


@pytest.mark.anyio
async def test_disclaimer_endpoint_languages():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # Default English
        res_en = await client.get("/disclaimer")
        assert res_en.status_code == 200
        assert res_en.json()["data"]["lang"] == "en"
        assert res_en.json()["data"]["disclaimer"] == settings.DISCLAIMER_TEXT_EN

        # Spanish
        res_es = await client.get("/disclaimer?lang=es")
        assert res_es.status_code == 200
        assert res_es.json()["data"]["lang"] == "es"
        assert res_es.json()["data"]["disclaimer"] == settings.DISCLAIMER_TEXT_ES


@pytest.mark.anyio
async def test_not_found_error_envelope():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/v1/non_existent_route")
        assert response.status_code == 404

        assert "x-request-id" in response.headers
        assert "x-disclaimer" in response.headers

        body = response.json()
        assert "error" in body
        assert body["error"]["code"] == "not_found"
        assert "message" in body["error"]
        assert body["error"]["request_id"] == response.headers["x-request-id"]


@pytest.mark.anyio
async def test_validation_error_envelope():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # Pass invalid lang parameter (pattern fails)
        response = await client.get("/disclaimer?lang=invalid_lang")
        assert response.status_code == 422

        body = response.json()
        assert "error" in body
        assert body["error"]["code"] == "validation_error"
        assert isinstance(body["error"]["details"], list)
        assert len(body["error"]["details"]) > 0
        assert body["error"]["details"][0]["field"] == "lang"


@pytest.mark.anyio
async def test_protected_route_unauthorized_envelope():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # POST /api/v1/extraction/runs requires X-API-Key
        response = await client.post("/api/v1/extraction/runs", json={"mode": "all"})
        assert response.status_code == 401

        body = response.json()
        assert "error" in body
        assert body["error"]["code"] == "unauthorized"


@pytest.mark.anyio
async def test_protected_route_authorized():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.post(
            "/api/v1/extraction/runs",
            json={"mode": "all"},
            headers={"X-API-Key": settings.API_KEY},
        )
        assert response.status_code == 200
        body = response.json()
        assert "data" in body
        assert body["data"]["mode"] == "all"
        assert body["data"]["status"] == "pending"
