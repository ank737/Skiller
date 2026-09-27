import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  ArrowRight, CheckCircle2, FileText, Play, Quote, Star, Upload, Zap,
} from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { SectionHeading } from '@/components/SectionHeading';
import { ResumeAnalysisIllustration } from '@/components/ResumeAnalysisIllustration';
import {
  features, howItWorksSteps, testimonials,
} from '@/lib/mockData';

export function HomePage() {
  const { user } = useAuth();

  return (
    <PageShell>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/60 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-800/80 dark:bg-slate-900/60 dark:text-slate-300"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Now with AI-powered resume scoring
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl text-balance"
              >
                Your Personal <span className="gradient-text">AI Career</span> Assistant
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 max-w-xl text-lg leading-relaxed text-slate-500 dark:text-slate-400"
              >
                Upload your resume once. Analyze your skills. Find better internships and jobs.
                Receive a personalized learning roadmap. Track your career growth.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link to={user ? "/dashboard" : "/register"} className="btn-primary px-6 py-3.5">
  {user ? "Go to Dashboard" : "Get Started"}
  <ArrowRight className="h-4 w-4" />
</Link>
                <Link to="/upload" className="btn-secondary px-6 py-3.5">
                  <Upload className="h-4 w-4" /> Upload Resume
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-8 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400"
              >
                <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> No credit card</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Free for students</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 2 min setup</div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <ResumeAnalysisIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title={<>Everything you need to <span className="gradient-text">land the role</span></>}
          subtitle="Eight AI-powered tools that take you from an unpolished resume to a job offer, with a clear plan for every step in between."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.05 }}
              whileHover={{ y: -4 }}
              className="card group p-6 transition-shadow hover:shadow-soft-lg"
            >
              <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${f.accent} shadow-soft`}>
                <f.icon className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title={<>From upload to offer in <span className="gradient-text">five steps</span></>}
          subtitle="A guided path that turns your resume into a career plan — no guesswork required."
        />
        <div className="mt-14">
          <div className="grid gap-6 lg:grid-cols-5">
            {howItWorksSteps.map((s, i) => (
              <div key={s.number} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card h-full p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-bold text-slate-200 dark:text-slate-800">{s.number}</span>
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400">
                      <s.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{s.description}</p>
                </motion.div>
                {/* connector arrow */}
                {i < howItWorksSteps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-slate-300 dark:text-slate-700 lg:block">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS BANNER ===== */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-600 to-accent-700 p-10 sm:p-14"
        >
          <div className="absolute inset-0 bg-grid-dark opacity-20" />
          <div className="relative grid gap-8 sm:grid-cols-4">
            {[
              { value: '120+', label: 'Resumes analyzed' },
              { value: '38%', label: 'Avg. ATS score lift' },
              { value: '400+', label: 'Jobs matched monthly' },
              { value: '82%', label: 'Offer rate after roadmap' },
            ].map((s) => (
              <div key={s.label} className="text-center text-white">
                <p className="font-display text-3xl font-bold sm:text-4xl">{s.value}</p>
                <p className="mt-1.5 text-sm text-white/80">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

    

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center sm:p-16"
        >
          <div className="absolute -top-20 left-1/2 h-60 w-96 -translate-x-1/2 rounded-full bg-brand-400/20 blur-3xl" />
          <div className="relative">
            <Zap className="mx-auto h-10 w-10 text-brand-500" />
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              Ready to let AI <span className="gradient-text">guide your career?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-500 dark:text-slate-400">
              Join thousands of students who stopped guessing and started getting interviews.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to={user ? "/dashboard" : "/register"} className="btn-primary px-6 py-3.5">
  {user ? "Go to Dashboard" : "Create free account"}
  <ArrowRight className="h-4 w-4" />
</Link>
              <Link to="/upload" className="btn-secondary px-6 py-3.5">
                <FileText className="h-4 w-4" /> Try resume analysis
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}
