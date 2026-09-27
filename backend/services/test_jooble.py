from jooble_service import search_jobs


data = search_jobs(
    keywords="Python Developer",
    location="India"
)

print("Total jobs:", data.get("totalCount"))

for job in data.get("jobs", []):
    print("\n--------------------")
    print("Title:", job.get("title"))
    print("Company:", job.get("company"))
    print("Location:", job.get("location"))
    print("Salary:", job.get("salary"))
    print("Type:", job.get("type"))
    print("Link:", job.get("link"))