import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from "@/hooks/useAuth";
import { useMemo } from "react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import {
  ArrowRight, ArrowUpRight, Bell, BookOpen, Briefcase, Calendar, CheckCircle2, ChevronRight,
  Clock, GraduationCap, Mail, Plus, Sparkles, Target, TrendingUp, Trophy, Upload, Zap,
} from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { useTheme } from '@/lib/theme';
import {
  applicationPipeline, calendarEvents, learningProgress, profileCompletion, quickStats,
  recentActivities, upcomingTasks,
} from '@/lib/mockData';
import { jobs } from '@/lib/mockData';

const activityTrend = [
  { day: 'Mon', apps: 2, saves: 1 },
  { day: 'Tue', apps: 3, saves: 2 },
  { day: 'Wed', apps: 1, saves: 0 },
  { day: 'Thu', apps: 4, saves: 3 },
  { day: 'Fri', apps: 2, saves: 1 },
  { day: 'Sat', apps: 0, saves: 1 },
  { day: 'Sun', apps: 0, saves: 0 },
];

const eventColor: Record<string, string> = {
  interview: 'bg-brand-500',
  callback: 'bg-accent-500',
  exam: 'bg-rose-500',
  milestone: 'bg-amber-500',
};

export function DashboardPage() {
  const { user } = useAuth();

const displayName =
  user?.user_metadata.full_name ||
  user?.email?.split("@")[0] ||
  "User";

const email = user?.email || "";

const initials = useMemo(() => {
  return displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}, [displayName]);
  const { theme } = useTheme();
  const axisColor = theme === 'dark' ? '#64748b' : '#94a3b8';
  const gridColor = theme === 'dark' ? '#1e293b' : '#e2e8f0';
  const recommended = jobs.slice(0, 3);

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Welcome card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-accent-700 p-8 text-white sm:p-10"
        >
          <div className="absolute inset-0 bg-grid-dark opacity-20" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-400/30 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Sparkles className="h-4 w-4" /> Welcome back
              </div>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
  Hi, {displayName.split(" ")[0]} 👋
</h1>
              <p className="mt-2 max-w-md text-white/80">
                You are <span className="font-semibold text-white">22% away</span> from your monthly goal. Complete today's tasks to stay on track.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/upload" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-700 hover:bg-white/90 transition-colors">
                  <Upload className="h-4 w-4" /> Upload Resume
                </Link>
                <Link to="/jobs" className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/25 transition-colors">
                  Browse Jobs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            {/* profile completion ring */}
            <div className="shrink-0">
              <div className="relative grid h-32 w-32 place-items-center rounded-full">
                <svg className="-rotate-90" width={128} height={128}>
                  <circle cx={64} cy={64} r={56} fill="none" strokeWidth={10} className="stroke-white/20" />
                  <motion.circle
                    cx={64} cy={64} r={56} fill="none" strokeWidth={10}
                    stroke="white" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 56}
                    initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - profileCompletion / 100) }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute text-center">
                  <p className="font-display text-2xl font-bold">{profileCompletion}%</p>
                  <p className="text-xs text-white/70">complete</p>
                </div>
              </div>
              <p className="mt-2 text-center text-xs text-white/70">Profile</p>
            </div>
          </div>
        </motion.div>

        {/* Quick stats */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -3 }} className="card p-6">
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400">
                  <s.icon className="h-5 w-5" />
                </div>
                <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${s.trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                  <ArrowUpRight className="h-3.5 w-3.5" /> {s.trend}
                </span>
              </div>
              <p className="mt-4 font-display text-3xl font-bold">
                <AnimatedCounter value={parseInt(s.value)} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Main grid */}
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {/* Left col (2/3) */}
          <div className="space-y-5 lg:col-span-2">
            {/* Activity chart */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Application Activity</h3>
                  <p className="mt-1 text-xs text-slate-400">Applications and saves this week</p>
                </div>
                <span className="chip text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-900">
                  <TrendingUp className="h-3 w-3" /> +18% vs last week
                </span>
              </div>
              <div className="mt-5 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityTrend}>
                    <defs>
                      <linearGradient id="appsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3366ff" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#3366ff" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="savesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 30px -6px rgba(0,0,0,0.15)' }} />
                    <Area type="monotone" dataKey="apps" stroke="#3366ff" strokeWidth={2} fill="url(#appsGrad)" />
                    <Area type="monotone" dataKey="saves" stroke="#8b5cf6" strokeWidth={2} fill="url(#savesGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Application pipeline */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
              <h3 className="font-semibold">Application Pipeline</h3>
              <div className="mt-5 grid grid-cols-4 gap-3">
                {applicationPipeline.map((p, i) => (
                  <div key={p.stage} className="relative">
                    <div className="rounded-xl border border-slate-200/70 dark:border-slate-800/70 p-4 text-center">
                      <p className="font-display text-2xl font-bold"><AnimatedCounter value={p.count} /></p>
                      <p className="mt-1 text-xs text-slate-400">{p.stage}</p>
                    </div>
                    {i < applicationPipeline.length - 1 && (
                      <ChevronRight className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-slate-300 dark:text-slate-700 lg:block" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recommended jobs */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Recommended Jobs</h3>
                <Link to="/jobs" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">View all</Link>
              </div>
              <div className="mt-4 space-y-3">
                {recommended.map((j) => (
                  <div key={j.id} className="flex items-center gap-4 rounded-xl border border-slate-200/70 dark:border-slate-800/70 p-4 hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
                    <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${j.logoColor} font-display text-base font-bold text-white`}>
                      {j.logo}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{j.role}</p>
                      <p className="text-xs text-slate-400">{j.company} · {j.location}</p>
                    </div>
                    <span className={`shrink-0 text-sm font-bold ${j.match >= 85 ? 'text-emerald-500' : 'text-brand-500'}`}>{j.match}%</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-700" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Learning progress */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Learning Progress</h3>
                <Link to="/roadmap" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">Roadmap</Link>
              </div>
              <div className="mt-5 space-y-4">
                {learningProgress.map((c) => (
                  <div key={c.course}>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-200">{c.course}</p>
                        <p className="text-xs text-slate-400">{c.platform}</p>
                      </div>
                      <span className="text-xs font-semibold text-slate-400">{c.progress}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={`h-full rounded-full ${c.progress === 100 ? 'bg-emerald-500' : c.progress > 0 ? 'bg-gradient-to-r from-brand-500 to-accent-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right col (1/3) */}
          <div className="space-y-5">
            {/* Upcoming tasks */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Upcoming Tasks</h3>
                <button className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900/40">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 space-y-2.5">
                {upcomingTasks.map((t) => (
                  <div key={t.task} className="flex items-start gap-3 rounded-lg border border-slate-200/70 dark:border-slate-800/70 p-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-700 dark:text-slate-200">{t.task}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs text-slate-400">Due: {t.due}</span>
                        <span className={`text-xs font-semibold ${t.priority === 'High' ? 'text-rose-500' : t.priority === 'Medium' ? 'text-amber-500' : 'text-slate-400'}`}>{t.priority}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent activity */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
              <h3 className="font-semibold">Recent Activity</h3>
              <div className="mt-4 space-y-4">
                {recentActivities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 dark:bg-slate-800 ${a.color}`}>
                      <a.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 dark:text-slate-300">{a.text}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Calendar */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">August 2026</h3>
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
              <div className="mt-4 grid grid-cols-7 gap-1 text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i} className="text-xs text-slate-400">{d}</div>)}
                {Array.from({ length: 31 }).map((_, i) => {
                  const event = calendarEvents.find((e) => e.day === i + 1);
                  return (
                    <div key={i} className="relative grid h-9 place-items-center text-sm">
                      <span className={event ? 'font-semibold text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-300'}>{i + 1}</span>
                      {event && <span className={`absolute bottom-1 h-1 w-1 rounded-full ${eventColor[event.type]}`} />}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 space-y-1.5">
                {calendarEvents.slice(0, 3).map((e) => (
                  <div key={e.day} className="flex items-center gap-2 text-xs">
                    <span className={`h-2 w-2 rounded-full ${eventColor[e.type]}`} />
                    <span className="text-slate-600 dark:text-slate-300">{e.title}</span>
                    <span className="ml-auto text-slate-400">Aug {e.day}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
