
import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
# TEST_EMAIL="ankushraj7373@gmail.com"
# TEST_PASSWORD="1234567890-"

# print("Supabase URL loaded:", bool(SUPABASE_URL))
# print("Supabase key loaded:", bool(SUPABASE_KEY))

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)


# import os
# # from supabase_client import create_client
# from dotenv import load_dotenv
# from supabase import create_client
# # from supabase_client import create_client

# supabase=create_client(
#     os.getenv("https://hewmdbhwhcnglhetkrlj.supabase.co"),
#     os.getenv("sb_publishable_yQT8Y1BgiVEl5GPtgpVTPg_oE4go3OS")
# )

def login_test_user():
    email = os.getenv("TEST_EMAIL")
    password = os.getenv("TEST_PASSWORD")

    response = supabase.auth.sign_in_with_password({
        "email": "ankushraj7373@gmail.com",
        "password": "1234567890-"
    })

    return response

def save_skills(user_id, skills):
    rows = []

    for skill in skills:
        rows.append({
            "user_id": user_id,
            "skill_name": skill["skill_name"],
            "skill_category": skill["skill_category"],
            "source": skill["source"],
            "confidence": skill["confidence"]
        })

    if rows:
        supabase.table("user_skills").upsert(
            rows,
            on_conflict="user_id,skill_name"
        ).execute()