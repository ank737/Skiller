from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from services.jooble_service import search_jobs

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/api/jobs")
def get_jobs(
    keywords: str = "Python Developer",
    location: str = "India",
    page: int = 1
):
    return search_jobs(
        keywords=keywords,
        location=location,
        page=page
    )