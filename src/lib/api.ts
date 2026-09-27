const API_BASE_URL = "http://127.0.0.1:8000";

export type ApiJob = {
  id: string;
  title: string;
  location: string;
  company: string;
  salary: string;
  type: string;
  link: string;
  updated: string;
  snippet: string;
};

export async function fetchJobs(
  keywords: string = "Python Developer",
  location: string = "India"
): Promise<ApiJob[]> {
  const params = new URLSearchParams({
    keywords,
    location,
  });

  const response = await fetch(
    `${API_BASE_URL}/api/jobs?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await response.json();

  return data.jobs ?? [];
}