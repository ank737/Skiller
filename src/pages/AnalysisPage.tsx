import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  AlertTriangle, ArrowRight, Brain, Briefcase, CheckCircle2, GraduationCap, Lightbulb,
  Sparkles, Target, TrendingUp, XCircle, Award, Rocket, Code2,
} from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { CircularProgress } from '@/components/CircularProgress';
import {
  aiSummary, atsScore, atsTrend, careerSuggestions, keywordMatch, missingSkills,
  resumeImprovementTips, resumeSections, resumeStrengths, resumeWeaknesses, skillDistribution,
  skillsFound,
} from '@/lib/mockData';
import { useTheme } from '@/lib/theme';

const priorityColor: Record<string, string> = {
  High: 'text-rose-500 bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-900',
  Medium: 'text-amber-500 bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900',
  Low: 'text-slate-500 bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700',
};

export function AnalysisPage() {
  const { theme } = useTheme();
  const axisColor = theme === 'dark' ? '#64748b' : '#94a3b8';
  const gridColor = theme === 'dark' ? '#1e293b' : '#e2e8f0';

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/70 bg-brand-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:border-brand-800/60 dark:bg-brand-950/40 dark:text-brand-400">
              <Brain className="h-3.5 w-3.5" /> AI Analysis
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">Your Resume Analysis</h1>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">Aisha_Patel_Resume.pdf · analyzed 2 hours ago</p>
          </div>
          <Link to="/upload" className="btn-secondary text-sm">
            <Sparkles className="h-4 w-4" /> Re-analyze
          </Link>
        </motion.div>

        {/* Top row: ATS score + AI summary */}
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card flex flex-col items-center justify-center p-8">
            <CircularProgress value={atsScore} label="ATS Score" sublabel="out of 100" />
            <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
              {atsScore >= 80 ? 'Excellent — your resume passes most ATS filters.' : atsScore >= 60 ? 'Good, but there is room to improve.' : 'Needs work to pass ATS filters.'}
            </p>
            <div className="mt-4 flex gap-2">
              <span className="chip text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-900">
                <TrendingUp className="h-3 w-3" /> +24 since last upload
              </span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="card p-7 lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-600">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold">AI Summary</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{aiSummary}</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: 'Experience', value: '3 yrs', icon: Briefcase, color: 'text-brand-500' },
                { label: 'Education', value: 'B.S. CS', icon: GraduationCap, color: 'text-accent-500' },
                { label: 'Projects', value: '5 listed', icon: Code2, color: 'text-emerald-500' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-slate-200/70 dark:border-slate-800/70 p-3">
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                  <p className="mt-2 text-xs text-slate-400">{s.label}</p>
                  <p className="text-sm font-semibold">{s.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills found / missing */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Skills Found</h3>
              <span className="chip text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-900">
                {skillsFound.length} skills
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {skillsFound.map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Missing Skills</h3>
              <span className="chip text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/30 dark:border-rose-900">
                {missingSkills.length} gaps
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {missingSkills.map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400">
                  <AlertTriangle className="h-3.5 w-3.5" /> {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Charts row */}
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
            <h3 className="font-semibold">Skill Distribution</h3>
            <p className="mt-1 text-xs text-slate-400">Your strength across domains</p>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillDistribution}>
                  <PolarGrid stroke={gridColor} />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: axisColor, fontSize: 12 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar dataKey="value" stroke="#3366ff" fill="#3366ff" fillOpacity={0.35} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
            <h3 className="font-semibold">ATS Score Trend</h3>
            <p className="mt-1 text-xs text-slate-400">Last 6 weeks of improvements</p>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={atsTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="week" tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[40, 100]} tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 30px -6px rgba(0,0,0,0.15)' }} />
                  <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
            <h3 className="font-semibold">Resume Sections</h3>
            <p className="mt-1 text-xs text-slate-400">Quality score per section</p>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resumeSections} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 30px -6px rgba(0,0,0,0.15)' }} cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={18}>
                    {resumeSections.map((s, i) => (
                      <Cell key={i} fill={s.score >= 80 ? '#10b981' : s.score >= 60 ? '#3366ff' : s.score >= 40 ? '#f59e0b' : '#f43f5e'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Strengths / Weaknesses */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-500" />
              <h3 className="font-semibold">Strengths</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {resumeStrengths.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {s}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold">Weaknesses</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {resumeWeaknesses.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" /> {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Keyword match */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-5 card p-7">
          <h3 className="font-semibold">Keyword Match</h3>
          <p className="mt-1 text-xs text-slate-400">How well your resume matches keywords for your target role</p>
          <div className="mt-5 space-y-3">
            {keywordMatch.map((k) => (
              <div key={k.keyword} className="flex items-center gap-4">
                <div className="w-32 shrink-0 text-sm font-medium">{k.keyword}</div>
                <div className="flex-1">
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${k.weight}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className={`h-full rounded-full ${k.present ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-rose-400 to-rose-500'}`}
                    />
                  </div>
                </div>
                <div className="w-20 shrink-0 text-right">
                  {k.present ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400"><CheckCircle2 className="h-3.5 w-3.5" /> Present</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500"><XCircle className="h-3.5 w-3.5" /> Missing</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Career suggestions */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-5 card p-7">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-brand-500" />
            <h3 className="font-semibold">Career Suggestions</h3>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {careerSuggestions.map((c) => (
              <div key={c.role} className="rounded-xl border border-slate-200/70 dark:border-slate-800/70 p-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{c.role}</h4>
                  <span className={`text-sm font-bold ${c.match >= 85 ? 'text-emerald-500' : c.match >= 70 ? 'text-brand-500' : 'text-amber-500'}`}>{c.match}%</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{c.reason}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.companies.map((co) => <span key={co} className="chip text-xs">{co}</span>)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Resume improvement tips */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-5 card p-7">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h3 className="font-semibold">Resume Improvement Tips</h3>
          </div>
          <div className="mt-5 space-y-3">
            {resumeImprovementTips.map((t) => (
              <div key={t.section} className="flex items-start gap-4 rounded-xl border border-slate-200/70 dark:border-slate-800/70 p-4">
                <div className="w-24 shrink-0">
                  <span className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-semibold ${priorityColor[t.priority]}`}>{t.priority}</span>
                  <p className="mt-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">{t.section}</p>
                </div>
                <p className="flex-1 text-sm text-slate-600 dark:text-slate-300">{t.tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-brand-600 to-accent-700 p-8 text-white sm:flex-row">
          <div className="flex items-center gap-3">
            <Rocket className="h-8 w-8" />
            <div>
              <p className="font-semibold">Ready to close your skill gaps?</p>
              <p className="text-sm text-white/80">Your personalized roadmap will get you there in 8 weeks.</p>
            </div>
          </div>
          <Link to="/roadmap" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-700 hover:bg-white/90 transition-colors">
            View Roadmap <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </PageShell>
  );
}
