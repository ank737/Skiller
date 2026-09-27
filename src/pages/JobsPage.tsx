import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle, ArrowRight, Briefcase, Building2, Calendar, Clock, DollarSign,
  ExternalLink, MapPin, RefreshCw, Search, SlidersHorizontal, X,
} from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { EmptyState } from '@/components/EmptyState';
import { Skeleton } from '@/components/Skeleton';
import {
  companyInitial, formatUpdated, normalizeJob, relativeUpdated, type Job, type JoobleResponse,
} from '/home/linank/VSCODE/Skiller/src/lib/jobs.ts';

const API_URL = 'http://127.0.0.1:8000/api/jobs';

type Status = 'loading' | 'success' | 'error';

export function JobsPage() {
  const [status, setStatus] = useState<Status>('loading');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ location: '', type: '', source: '' });

  const fetchJobs = async () => {
    setStatus('loading');
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data: JoobleResponse = await res.json();
      const list = Array.isArray(data.jobs) ? data.jobs.map(normalizeJob) : [];
      setJobs(list);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => { void fetchJobs(); }, []);

  // Build filter option lists from actual fetched data only.
  const typeOptions = useMemo(() => uniqueSorted(jobs.map((j) => j.type)), [jobs]);
  const sourceOptions = useMemo(() => uniqueSorted(jobs.map((j) => j.source)), [jobs]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((j) => {
      if (q) {
        const hay = `${j.title} ${j.company} ${j.location} ${j.snippet} ${j.source}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.location && !j.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.type && j.type !== filters.type) return false;
      if (filters.source && j.source !== filters.source) return false;
      return true;
    });
  }, [jobs, search, filters]);

  const clearFilters = () => setFilters({ location: '', type: '', source: '' });
  const hasFilters = !!(filters.location || filters.type || filters.source || search);

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/70 bg-brand-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:border-brand-800/60 dark:bg-brand-950/40 dark:text-brand-400">
            <Briefcase className="h-3.5 w-3.5" /> Job Discovery
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Find Your Next Opportunity</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Skiller surfaces real, live job openings so you can discover roles that fit your skills and goals. Search, filter, and apply directly to the original posting.
          </p>
        </motion.div>

        {/* Search + filter toggle */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-6 flex gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, company, location, or keyword…"
              className="input-field pl-11 py-3.5"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" aria-label="Clear search">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters((p) => !p)}
            className={`btn-secondary px-4 py-3.5 ${showFilters ? 'border-brand-400 text-brand-600 dark:border-brand-600 dark:text-brand-400' : ''}`}
          >
            <SlidersHorizontal className="h-4 w-4" /> <span className="hidden sm:inline">Filters</span>
            {(filters.location || filters.type || filters.source) && (
              <span className="ml-1 grid h-5 w-5 place-items-center rounded-full bg-brand-500 text-xs font-bold text-white">!</span>
            )}
          </button>
        </motion.div>

        {/* Filters panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 card p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Filters</h3>
                  <button onClick={clearFilters} className="text-xs text-brand-600 dark:text-brand-400 hover:underline">Clear all</button>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Location</label>
                    <input value={filters.location} onChange={(e) => setFilters((p) => ({ ...p, location: e.target.value }))} placeholder="City, region, or country" className="input-field py-2.5 text-sm" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Job Type</label>
                    <select value={filters.type} onChange={(e) => setFilters((p) => ({ ...p, type: e.target.value }))} className="input-field py-2.5 text-sm" disabled={typeOptions.length === 0}>
                      <option value="">Any type</option>
                      {typeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Source</label>
                    <select value={filters.source} onChange={(e) => setFilters((p) => ({ ...p, source: e.target.value }))} className="input-field py-2.5 text-sm" disabled={sourceOptions.length === 0}>
                      <option value="">Any source</option>
                      {sourceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active filter chips */}
        {(filters.location || filters.type || filters.source) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {filters.location && <FilterChip label={`Location: ${filters.location}`} onClear={() => setFilters((p) => ({ ...p, location: '' }))} />}
            {filters.type && <FilterChip label={filters.type} onClear={() => setFilters((p) => ({ ...p, type: '' }))} />}
            {filters.source && <FilterChip label={filters.source} onClear={() => setFilters((p) => ({ ...p, source: '' }))} />}
          </div>
        )}

        {/* Results count */}
        {status === 'success' && (
          <p className="mt-8 text-sm font-medium text-slate-500 dark:text-slate-400">
            {filtered.length} job{filtered.length !== 1 ? 's' : ''} found
          </p>
        )}

        {/* Content */}
        <div className="mt-4">
          {status === 'loading' && <JobGridSkeleton />}

          {status === 'error' && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-rose-300 dark:border-rose-900/60 px-6 py-20 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-rose-50 text-rose-500 dark:bg-rose-950/40">
                <AlertCircle className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">Unable to load jobs</h3>
              <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                We could not reach the job listings service. Please check your connection and try again.
              </p>
              <button onClick={fetchJobs} className="btn-primary mt-6">
                <RefreshCw className="h-4 w-4" /> Retry
              </button>
            </div>
          )}

          {status === 'success' && filtered.length === 0 && (
            <EmptyState
              icon={Briefcase}
              title="No jobs found"
              description={hasFilters ? 'Try changing your search or clearing filters to see more roles.' : 'There are no job listings available right now. Please check back soon.'}
              action={hasFilters ? <button onClick={() => { clearFilters(); setSearch(''); }} className="btn-primary">Clear search & filters</button> : undefined}
            />
          )}

          {status === 'success' && filtered.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((j, i) => (
                <JobCard key={j.id} job={j} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-400">
      {label}
      <button onClick={onClear} className="hover:text-brand-800 dark:hover:text-brand-200" aria-label="Remove filter"><X className="h-3 w-3" /></button>
    </span>
  );
}

function JobCard({ job, index }: { job: Job; index: number }) {
  const updated = relativeUpdated(job.updated);
  const updatedFull = formatUpdated(job.updated);
  const hasLink = !!job.link;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -4 }}
      className="card group flex flex-col p-6 transition-shadow hover:shadow-soft-lg"
    >
      {/* Header: avatar + title + company */}
      <div className="flex items-start gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 font-display text-lg font-bold text-white shadow-soft">
          {companyInitial(job.company)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold leading-tight line-clamp-2">{job.title}</h3>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400 truncate">{job.company}</p>
        </div>
      </div>

      {/* Metadata row */}
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
        {job.location && (
          <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> <span className="truncate max-w-[10rem]">{job.location}</span></span>
        )}
        {job.type && (
          <span className="inline-flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {job.type}</span>
        )}
        {job.salary && (
          <span className="inline-flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" /> <span className="truncate max-w-[8rem]">{job.salary}</span></span>
        )}
        {updated && (
          <span className="inline-flex items-center gap-1" title={updatedFull || undefined}><Clock className="h-3.5 w-3.5" /> {updated}</span>
        )}
      </div>

      {/* Snippet */}
      {job.snippet && (
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 flex-1 line-clamp-3">{job.snippet}</p>
      )}

      {/* Source + apply */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-200/70 dark:border-slate-800/70 pt-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          {job.source ? (
            <>
              <Building2 className="h-3.5 w-3.5" /> <span className="truncate max-w-[8rem]">{job.source}</span>
            </>
          ) : (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {updatedFull || 'Recently posted'}
            </span>
          )}
        </div>
        {hasLink ? (
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-4 py-2.5 text-xs"
          >
            View Job <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : (
          <span className="chip text-slate-400">No link available</span>
        )}
      </div>
    </motion.div>
  );
}

function JobGridSkeleton() {
  return (
    <div>
      <Skeleton className="mb-6 h-4 w-28" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="card p-6">
            <div className="flex items-start gap-3">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-2/3" />
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-slate-200/70 dark:border-slate-800/70 pt-4">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-8 w-24 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean))).sort();
}
