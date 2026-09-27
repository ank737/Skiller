from services.extract_text import extract_text_fromResume
from pypdf import PdfReader
from services.supabase_client import supabase
# from supabase_client import supabase


SKILLS = {
    "python": "programming",
    "java": "programming",
    "c": "programming",
    "c++": "programming",
    "javascript": "programming",

    "sql": "database",
    "postgresql": "database",
    "mysql": "database",

    "html": "web development",
    "css": "web development",
    "react": "web development",
    "node.js": "web development",

    "numpy": "data science",
    "pandas": "data science",
    "matplotlib": "data science",
    "scikit-learn": "machine learning",

    "tensorflow": "machine learning",
    "pytorch": "machine learning",
    "machine learning": "machine learning",
    "deep learning": "machine learning",
}


def normalize_skill(skill):
    return skill.strip().lower()


def extract_skills(text):
    text=text.lower()
    found_skills=[]
    for skill,category in SKILLS.items():
        if skill in text:
            found_skills.append({
                "skill_name":normalize_skill(skill),
                "skill_category":category,
                "source":"resume",
                "confidence":1.0

            })
    return found_skills

# text=extract_text_fromResume("./services/Soft_resume.pdf")
# skills=extract_skills(text)
# print(skills)



def save_skills(user_id, skills):
    rows = []

    for skill in skills:
        rows.append({
            "user_id": user_id,
            "skill_name": skill["skill_name"],
            "skill_category": skill["skill_category"],
            "source": skill["source"],
        })

    if rows:
        supabase.table("user_skills").upsert(
            rows,
            on_conflict="user_id,skill_name"
        ).execute()