import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Home, Search } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function NotFoundPage() {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-4">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-300/20 blur-[120px] dark:bg-brand-700/20" />
        <div className="absolute right-1/4 top-1/2 h-72 w-72 rounded-full bg-accent-300/20 blur-[120px] dark:bg-accent-700/20" />
      </div>
      <div className="text-center">
        <div className="flex justify-center"><Logo /></div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative mx-auto mt-10 grid h-24 w-24 place-items-center">
          <Compass className="h-20 w-20 text-brand-500 animate-float" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 font-display text-7xl font-bold gradient-text">
          404
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-3 text-lg font-semibold">
          This page took a different career path.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
          The page you are looking for may have been moved or never existed. Let's get you back on track.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-8 flex justify-center gap-3">
          <Link to="/" className="btn-primary"><Home className="h-4 w-4" /> Back to Home</Link>
          <Link to="/jobs" className="btn-secondary"><Search className="h-4 w-4" /> Browse Jobs</Link>
        </motion.div>
      </div>
    </div>
  );
}
