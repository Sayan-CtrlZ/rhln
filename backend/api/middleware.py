"""Pure ASGI Middleware for request tracing, legal disclaimer, and temporal headers."""

import uuid
from typing import Any, Callable, Dict, List
from backend.config import settings


class RequestContextMiddleware:
    """
    Pure ASGI middleware that ensures every request has a request_id,
    propagates custom headers (X-Request-Id, X-Disclaimer, X-As-Of),
    and records execution context without the pitfalls of BaseHTTPMiddleware.
    """

    def __init__(self, app: Any):
        self.app = app

    async def __call__(self, scope: Dict[str, Any], receive: Callable, send: Callable) -> None:
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        # 1. Resolve or generate request_id from headers
        headers = dict(scope.get("headers", []))
        req_id = headers.get(b"x-request-id", b"").decode("utf-8").strip()
        if not req_id:
            req_id = f"req_{uuid.uuid4().hex[:12]}"

        # Store in scope state
        if "state" not in scope:
            scope["state"] = {}
        scope["state"]["request_id"] = req_id

        # 2. Extract as_of from query string if present
        query_string = scope.get("query_string", b"").decode("utf-8")
        as_of_val = None
        for param in query_string.split("&"):
            if param.startswith("as_of="):
                as_of_val = param.split("=", 1)[1]
                break
        if as_of_val:
            scope["state"]["as_of"] = as_of_val

        # 3. Intercept response start to inject mandatory headers
        async def send_wrapper(message: Dict[str, Any]) -> None:
            if message["type"] == "http.response.start":
                resp_headers: List[tuple[bytes, bytes]] = list(message.get("headers", []))
                header_names = {h[0].lower() for h in resp_headers}

                if b"x-request-id" not in header_names:
                    resp_headers.append((b"x-request-id", req_id.encode("utf-8")))
                if b"x-disclaimer" not in header_names:
                    resp_headers.append((b"x-disclaimer", settings.DISCLAIMER_TEXT_EN.encode("utf-8")))

                # Check state for as_of if set dynamically
                state_as_of = scope.get("state", {}).get("as_of", as_of_val)
                if b"x-as-of" not in header_names and state_as_of:
                    resp_headers.append((b"x-as-of", str(state_as_of).encode("utf-8")))

                message["headers"] = resp_headers
            await send(message)

        await self.app(scope, receive, send_wrapper)
