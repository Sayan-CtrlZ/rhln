"""Root entrypoint for running the RHLN FastAPI application."""

import uvicorn
from backend.api.main import app

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
