// Types and helpers for the Jooble Jobs API response served by our backend
// at GET http://127.0.0.1:8000/api/jobs. Based on the official Jooble REST API
// response shape: { totalCount, jobs: [...] }.

/** Raw job object as returned by the Jooble API. Every field may be missing. */
export interface JoobleJob {
  id?: number | string;
  title?: string;
  location?: string;
  snippet?: string;
  salary?: string;
  source?: string;
  type?: string;
  link?: string;
  company?: string;
  updated?: string;
}

/** Top-level response envelope from the backend. */
export interface JoobleResponse {
  totalCount?: number;
  jobs?: JoobleJob[];
}

/** Normalized job used throughout the Jobs UI. All fields are safe strings. */
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  snippet: string;
  salary: string;
  source: string;
  type: string;
  link: string;
  updated: string;
}

const str = (v: unknown): string =>
  v == null ? '' : typeof v === 'string' ? v : String(v);

/** Convert a raw Jooble job into a normalized, null-safe Job. */
export function normalizeJob(j: JoobleJob): Job {
  return {
    id: str(j.id) || str(j.link) || Math.random().toString(36).slice(2),
    title: cleanTitle(j.title),
    company: str(j.company) || 'Company not listed',
    location: str(j.location) || 'Location not specified',
    snippet: cleanText(j.snippet),
    salary: str(j.salary),
    source: str(j.source),
    type: str(j.type),
    link: str(j.link),
    updated: str(j.updated),
  };
}
const cleanText = (value: unknown): string => {
  return str(value)
    .replace(/<[^>]*>/g, ' ')       // remove HTML tags
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
};

const cleanTitle = (value: unknown): string => {
  let title = cleanText(value);

  // Remove common extra metadata appended to Jooble titles
  title = title
    .replace(/\s*:\s*\d+\+?\s*yrs?.*$/i, '')
    .replace(/\s*-\s*\d+\+?\s*yrs?.*$/i, '')
    .replace(/\s*\|\s*\d+\+?\s*yrs?.*$/i, '')
    .trim();

  return title || 'Untitled role';
};
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Format an ISO timestamp into "Aug 15, 2026". Returns '' if invalid/empty. */
export function formatUpdated(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/** Relative time like "3d ago" / "2h ago" from an ISO timestamp. Returns '' if invalid. */
export function relativeUpdated(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const diff = Date.now() - d.getTime();
  const hrs = diff / 36e5;
  if (hrs < 1) return 'just now';
  if (hrs < 24) return `${Math.floor(hrs)}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  return formatUpdated(iso);
}

/** Initial of a company name, used for the avatar tile. */
export function companyInitial(company: string): string {
  if (!company || company === 'Company not listed') return '?';
  return company.trim().charAt(0).toUpperCase();
}
