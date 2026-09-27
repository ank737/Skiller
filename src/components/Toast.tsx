import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X, XCircle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';
type Toast = { id: number; type: ToastType; title: string; message?: string };

type ToastContextValue = { notify: (t: Omit<Toast, 'id'>) => void };
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const config: Record<ToastType, { icon: typeof Info; color: string; ring: string }> = {
  success: { icon: CheckCircle2, color: 'text-emerald-500', ring: 'ring-emerald-500/20' },
  error: { icon: XCircle, color: 'text-rose-500', ring: 'ring-rose-500/20' },
  info: { icon: Info, color: 'text-brand-500', ring: 'ring-brand-500/20' },
  warning: { icon: AlertCircle, color: 'text-amber-500', ring: 'ring-amber-500/20' },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: number) => setToasts((p) => p.filter((t) => t.id !== id)), []);
  const notify = useCallback(
    (t: Omit<Toast, 'id'>) => {
      const id = Date.now() + Math.random();
      setToasts((p) => [...p, { ...t, id }]);
      setTimeout(() => remove(id), 4000);
    },
    [remove],
  );

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-full max-w-sm flex-col gap-3">
        <AnimatePresence>
          {toasts.map((t) => {
            const c = config[t.type];
            const Icon = c.icon;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className={`pointer-events-auto flex items-start gap-3 rounded-xl glass-strong p-4 shadow-soft-lg ring-1 ${c.ring}`}
              >
                <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${c.color}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{t.title}</p>
                  {t.message && <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{t.message}</p>}
                </div>
                <button onClick={() => remove(t.id)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
