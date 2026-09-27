import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Award, BookOpen, Briefcase, CheckCircle2, Circle, Code2, GraduationCap, ListChecks,
  Rocket, Target, TrendingUp, Users, Video, ArrowRight, Trophy, Flag,
} from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { SectionHeading } from '@/components/SectionHeading';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import {
  milestones, monthlyGoals, roadmapPhases, weeklyGoals,
} from '@/lib/mockData';

const typeIcon = { course: BookOpen, project: Code2, cert: Award, interview: Video };
const typeColor = {
  course: 'text-brand-500 bg-brand-50 dark:bg-brand-950/40',
  project: 'text-accent-500 bg-accent-50 dark:bg-accent-950/40',
  cert: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40',
  interview: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40',
};
const statusStyle = {
  completed: { dot: 'bg-emerald-500', ring: 'border-emerald-300 dark:border-emerald-700', text: 'text-emerald-600 dark:text-emerald-400', label: 'Completed' },
  active: { dot: 'bg-brand-500 animate-pulse', ring: 'border-brand-400 dark:border-brand-600', text: 'text-brand-600 dark:text-brand-400', label: 'In progress' },
  upcoming: { dot: 'bg-slate-300 dark:bg-slate-700', ring: 'border-slate-200 dark:border-slate-800', text: 'text-slate-400', label: 'Upcoming' },
};

export function RoadmapPage() {
  const completedPhases = roadmapPhases.filter((p) => p.status === 'completed').length;
  const overall = Math.round((completedPhases / roadmapPhases.length) * 100 + (roadmapPhases.find((p) => p.status === 'active')?.progress ?? 0) / roadmapPhases.length);

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/70 bg-brand-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:border-brand-800/60 dark:bg-brand-950/40 dark:text-brand-400">
            <Target className="h-3.5 w-3.5" /> Your Roadmap
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Your personalized career roadmap</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Target role: <span className="font-semibold text-slate-700 dark:text-slate-200">Full-Stack Engineer</span> · 8-week plan to close your skill gaps and land interviews.
          </p>
        </motion.div>

        {/* Overview cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Current Skills', value: 8, suffix: '', icon: CheckCircle2, color: 'from-emerald-500 to-teal-600' },
            { label: 'Missing Skills', value: 6, suffix: '', icon: Target, color: 'from-rose-500 to-pink-600' },
            { label: 'Roadmap Progress', value: overall, suffix: '%', icon: TrendingUp, color: 'from-brand-500 to-brand-600' },
            { label: 'Target Role', value: 0, suffix: '', icon: Briefcase, color: 'from-accent-500 to-accent-600', text: 'Full-Stack' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card p-6">
              <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${s.color} shadow-soft`}>
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <p className="mt-4 text-3xl font-bold font-display">
                {s.text ? s.text : <AnimatedCounter value={s.value} suffix={s.suffix} />}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Current vs missing skills */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <h3 className="font-semibold">Current Skills</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {['React', 'TypeScript', 'REST APIs', 'Git', 'Node.js', 'CSS', 'Jest', 'Agile'].map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> {s}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-rose-500" />
              <h3 className="font-semibold">Missing Skills for Target Role</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {['AWS', 'Docker', 'Kubernetes', 'GraphQL', 'CI/CD', 'System Design'].map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400">
                  <Circle className="h-3.5 w-3.5" /> {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="mt-12">
          <SectionHeading align="left" eyebrow="Timeline" title="Your 8-week plan" subtitle="Four phases that take you from frontend foundations to interview readiness." />
          <div className="mt-10 relative">
            {/* vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-brand-400 via-accent-400 to-transparent sm:left-6" />
            <div className="space-y-6">
              {roadmapPhases.map((phase, i) => {
                const st = statusStyle[phase.status];
                return (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: i * 0.05 }}
                    className="relative pl-14 sm:pl-16"
                  >
                    {/* dot */}
                    <div className={`absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border-2 ${st.ring} bg-white dark:bg-slate-950 sm:h-12 sm:w-12`}>
                      <span className={`h-3 w-3 rounded-full ${st.dot}`} />
                    </div>
                    <div className={`card p-6 ${phase.status === 'active' ? 'ring-1 ring-brand-400/40 dark:ring-brand-600/40' : ''}`}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{phase.phase} · {phase.duration}</p>
                          <h3 className="mt-1 text-lg font-semibold">{phase.title}</h3>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${st.text}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} /> {st.label}
                        </span>
                      </div>
                      {/* progress */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>Progress</span><span>{phase.progress}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${phase.progress}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} className={`h-full rounded-full ${phase.status === 'completed' ? 'bg-emerald-500' : phase.status === 'active' ? 'bg-gradient-to-r from-brand-500 to-accent-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
                        </div>
                      </div>
                      {/* items */}
                      <div className="mt-4 space-y-2">
                        {phase.items.map((item) => {
                          const Icon = typeIcon[item.type];
                          return (
                            <div key={item.label} className="flex items-center gap-3 rounded-lg border border-slate-200/70 dark:border-slate-800/70 p-3">
                              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${typeColor[item.type]}`}>
                                <Icon className="h-4 w-4" />
                              </span>
                              <span className="flex-1 text-sm text-slate-600 dark:text-slate-300">{item.label}</span>
                              {item.done ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Circle className="h-4 w-4 text-slate-300 dark:text-slate-700" />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Goals + Milestones */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {/* Weekly goals */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
            <div className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-brand-500" />
              <h3 className="font-semibold">Weekly Goals</h3>
            </div>
            <div className="mt-4 space-y-2.5">
              {weeklyGoals.map((g) => (
                <div key={g.label} className="flex items-center gap-3 rounded-lg border border-slate-200/70 dark:border-slate-800/70 p-3">
                  {g.done ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5 text-slate-300 dark:text-slate-700" />}
                  <span className={`flex-1 text-sm ${g.done ? 'text-slate-400 line-through' : 'text-slate-600 dark:text-slate-300'}`}>{g.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Monthly goals */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-7">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-accent-500" />
              <h3 className="font-semibold">Monthly Goals</h3>
            </div>
            <div className="mt-4 space-y-4">
              {monthlyGoals.map((g) => (
                <div key={g.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{g.label}</span>
                    <span className="text-xs font-semibold text-slate-400">{g.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${g.progress}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-gradient-to-r from-accent-500 to-brand-500" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Milestones */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-5 card p-7">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <h3 className="font-semibold">Milestones</h3>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m) => (
              <div key={m.label} className={`rounded-xl border p-5 text-center ${m.done ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20' : 'border-slate-200/70 dark:border-slate-800/70'}`}>
                <div className={`mx-auto grid h-12 w-12 place-items-center rounded-xl ${m.done ? 'bg-emerald-500' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  <m.icon className={`h-6 w-6 ${m.done ? 'text-white' : 'text-slate-400'}`} />
                </div>
                <p className="mt-3 text-sm font-semibold">{m.label}</p>
                <p className="mt-1 text-xs text-slate-400">Target: {m.target}</p>
                {m.done && <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400"><CheckCircle2 className="h-3.5 w-3.5" /> Achieved</span>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-accent-600 to-brand-700 p-8 text-white sm:flex-row">
          <div className="flex items-center gap-3">
            <Rocket className="h-8 w-8" />
            <div>
              <p className="font-semibold">Ready to start Phase 2?</p>
              <p className="text-sm text-white/80">Pick up the backend module where you left off.</p>
            </div>
          </div>
          <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-accent-700 hover:bg-white/90 transition-colors">
            Go to Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </PageShell>
  );
}
