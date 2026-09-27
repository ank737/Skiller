import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mx-auto grid h-16 w-16 place-items-center"
        >
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-600 animate-pulse-ring" />
          <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-600 shadow-glow">
            <Sparkles className="h-8 w-8 text-white" />
          </span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 font-display text-lg font-semibold"
        >
          Skil<span className="gradient-text">ler</span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-3 h-1 w-32 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
        >
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
          />
        </motion.div>
      </div>
    </div>
  );
}
