import { motion } from 'framer-motion';
import { CheckCircle2, FileText, Sparkles, TrendingUp } from 'lucide-react';

export function ResumeAnalysisIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      {/* glow */}
      <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand-500/20 to-accent-500/20 blur-2xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-[2rem] p-6 shadow-soft-lg"
      >
        {/* Resume card */}
        <div className="rounded-xl border border-slate-200/70 dark:border-slate-800/70 bg-white/60 dark:bg-slate-900/60 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-600">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">User_Resume.pdf</p>
                <p className="text-xs text-slate-400">Analyzing…</p>
              </div>
            </div>
            <span className="chip text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-900">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
            </span>
          </div>

          {/* fake resume lines */}
          <div className="mt-4 space-y-2">
            {[0.9, 0.7, 0.85, 0.6, 0.8].map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.12 }}
                className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-800"
                style={{ width: `${w * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* AI analysis chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 grid grid-cols-2 gap-3"
        >
          {[
            { icon: Sparkles, label: 'ATS Score', value: '78/100', color: 'text-brand-500' },
            { icon: TrendingUp, label: 'Skills Found', value: '8 skills', color: 'text-accent-500' },
            { icon: CheckCircle2, label: 'Strengths', value: '4 found', color: 'text-emerald-500' },
            { icon: FileText, label: 'Sections', value: '5 parsed', color: 'text-amber-500' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="rounded-xl border border-slate-200/70 dark:border-slate-800/70 bg-white/50 dark:bg-slate-900/50 p-3"
            >
              <s.icon className={`h-4 w-4 ${s.color}`} />
              <p className="mt-2 text-xs text-slate-400">{s.label}</p>
              <p className="text-sm font-semibold">{s.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-4"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Parsing resume…</span>
            <span>100%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1.5, duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* floating badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="absolute -right-4 -top-4 hidden sm:block"
      >
        <div className="animate-float glass-strong rounded-xl px-3 py-2 shadow-soft-lg">
          <p className="text-xs font-semibold gradient-text">AI Powered</p>
        </div>
      </motion.div>
    </div>
  );
}
