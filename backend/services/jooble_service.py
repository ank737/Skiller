import os
import requests
from dotenv import load_dotenv

load_dotenv()

JOOBLE_API_KEY = os.getenv("JOOBLE_API_KEY")

JOOBLE_URL = f"https://in.jooble.org/api/{JOOBLE_API_KEY}"


def search_jobs(keywords, location="India", page=1):
    payload = {
        "keywords": keywords,
        "location": location,
        "page": page,
        "ResultOnPage": 20
    }

    response = requests.post(
        JOOBLE_URL,
        json=payload,
        headers={
            "Content-Type": "application/json"
        }
    )

    response.raise_for_status()

    return response.json()