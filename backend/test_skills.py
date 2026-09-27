# from services.extract_text import extract_text_fromResume
# from services.skill_extractor import extract_skills
# from services.supabase_client import login_test_user,save_skills
# # from services.supabase_client import save_skills
# # from services.supabase_client import save_skills
# # from supabase_client import supabase


# USER_ID ="ba97b560-fb63-4865-b644-3bf01b9548ef"
# RESUME_PATH = "resume.pdf"

# # extract text from resume 
# text = extract_text_fromResume("resume.pdf")
# print("\nExtracted text: ")
# print(text)

# #  extract skills
# skills = extract_skills(text)
# print("\n Extracted skills:")
# print(skills)

# # save skills to supabase
# save_skills(USER_ID, skills)

# print("Skills saved successfully!")



from services.extract_text import extract_text_fromResume
from services.skill_extractor import extract_skills
from services.supabase_client import login_test_user, save_skills


RESUME_PATH = "resume.pdf"


# Login
session = login_test_user()

user_id = session.user.id

print("Logged in user:", user_id)


# Extract resume text
text = extract_text_fromResume(RESUME_PATH)


# Extract skills
skills = extract_skills(text)

print("\nExtracted skills:")
print(skills)


# Save skills
save_skills(user_id, skills)

print("\nSkills saved successfully!")