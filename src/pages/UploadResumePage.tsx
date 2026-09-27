import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, FileText, RefreshCw, Sparkles, Upload, X, FileCheck2, AlertCircle,
} from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { useToast } from '@/components/Toast';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';
const ACCEPTED = ['.pdf', '.docx', '.doc'];
const MAX_MB = 5;

type Status = 'idle' | 'dragging' | 'uploading' | 'done';

export function UploadResumePage() {
  const { notify } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [status, setStatus] = useState<Status>('idle');
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = (f: File): string | null => {
    const ext = '.' + f.name.split('.').pop()?.toLowerCase();
    if (!ACCEPTED.includes(ext)) return 'Only PDF, DOCX, or DOC files are allowed';
    if (f.size > MAX_MB * 1024 * 1024) return `File too large — max ${MAX_MB}MB`;
    return null;
  };

  const handleFile = useCallback(async (f: File) => {
  const err = validate(f);

  if (err) {
    setError(err);
    notify({ type: 'error', title: err });
    return;
  }

  const {
  data: { user: currentUser },
  error: authError,
} = await supabase.auth.getUser();

if (authError || !currentUser) {
  const message = 'Your login session has expired. Please log in again.';
  setError(message);
  notify({ type: 'error', title: message });
  navigate('/login');
  return;
}

  setError(null);
  setFile(f);
  setStatus('uploading');
  setProgress(10);

  try {
    const fileExt = f.name.split('.').pop()?.toLowerCase() || 'pdf';

    const safeFileName = f.name
      .replace(/[^a-zA-Z0-9._-]/g, '_');

    const filePath = `${currentUser.id}/${Date.now()}-${safeFileName}`;

    setProgress(30);

    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filePath, f, {
        cacheControl: '3600',
        upsert: false,
        contentType: f.type || `application/${fileExt}`,
      });

    if (uploadError) {
      throw uploadError;
    }

    setProgress(70);

    const { error: dbError } = await supabase
      .from('resumes')
      .insert({
        user_id: currentUser.id,
        file_name: f.name,
        file_path: filePath,
        file_type: f.type || fileExt,
        file_size: f.size,
      });

    if (dbError) {
      // If database insertion fails, remove the uploaded file
      // so Storage and database don't become inconsistent.
      await supabase.storage
        .from('resumes')
        .remove([filePath]);

      throw dbError;
    }

    setProgress(100);
    setStatus('done');

    notify({
      type: 'success',
      title: 'Resume uploaded',
      message: f.name,
    });
  } catch (err: any) {
    console.error('Resume upload error:', err);

    setFile(null);
    setProgress(0);
    setStatus('idle');

    const message =
      err?.message || 'Failed to upload your resume. Please try again.';

    setError(message);

    notify({
      type: 'error',
      title: 'Upload failed',
      message,
    });
  }
}, [notify, user, navigate]);

  const onDrop = (e: React.DragEvent) => {
  e.preventDefault();
  setIsDragging(false);

  const f = e.dataTransfer.files?.[0];

  if (f) {
    handleFile(f);
  }
};
  const reset = () => {
    setFile(null);
    setStatus('idle');
    setProgress(0);
    setError(null);
  };

  const formatSize = (b: number) => (b < 1024 * 1024 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`);

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/70 bg-brand-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:border-brand-800/60 dark:bg-brand-950/40 dark:text-brand-400">
            <Upload className="h-3.5 w-3.5" /> Step 1
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Upload your resume</h1>
          <p className="mx-auto mt-3 max-w-lg text-slate-500 dark:text-slate-400">
            Drop your resume below and our AI will parse it in seconds. We accept PDF, DOCX, and DOC up to {MAX_MB}MB.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-10">
          <AnimatePresence mode="wait">
            {status === 'idle' && !file && (
              <motion.div
                key="drop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { setIsDragging(false); onDrop(e); }}
                onClick={() => inputRef.current?.click()}
                className={`relative cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition-all ${
                  isDragging
                    ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/30 scale-[1.01]'
                    : 'border-slate-300 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-600'
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept={ACCEPTED.join(',')}
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                />
                <motion.div
                  animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                  className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-600 shadow-glow"
                >
                  <Upload className="h-8 w-8 text-white" />
                </motion.div>
                <p className="mt-5 text-lg font-semibold">
                  {isDragging ? 'Drop your file here' : 'Drag & drop your resume'}
                </p>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                  or <span className="font-semibold text-brand-600 dark:text-brand-400">browse files</span> from your computer
                </p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  {ACCEPTED.map((a) => <span key={a} className="chip uppercase">{a.replace('.', '')}</span>)}
                  <span className="chip">Max {MAX_MB}MB</span>
                </div>
                {error && (
                  <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-rose-500"><AlertCircle className="h-4 w-4" /> {error}</p>
                )}
              </motion.div>
            )}

            {status === 'uploading' && (
              <motion.div key="uploading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card p-10 text-center">
                <div className="relative mx-auto h-20 w-20">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800" />
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-500 border-r-accent-500"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="text-sm font-semibold">{progress}%</span>
                  </div>
                </div>
                <p className="mt-5 font-semibold">Uploading {file?.name}…</p>
                <div className="mx-auto mt-4 h-1.5 max-w-xs overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-3 text-xs text-slate-400">Parsing your resume with AI…</p>
              </motion.div>
            )}

            {status === 'done' && file && (
              <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
                <div className="card p-6">
                  <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-soft">
                      <FileCheck2 className="h-7 w-7 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-semibold">{file.name}</p>
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      </div>
                      <p className="mt-0.5 text-sm text-slate-400">{formatSize(file.size)} · {file.type || 'document'}</p>
                    </div>
                    <button onClick={reset} className="btn-ghost px-3 py-2 text-xs">
                      <RefreshCw className="h-3.5 w-3.5" /> Replace
                    </button>
                  </div>

                  {/* Resume preview */}
                  <div className="mt-6 rounded-xl border border-slate-200/70 dark:border-slate-800/70 bg-slate-50/50 dark:bg-slate-900/40 p-5">
                    <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-slate-800/70 pb-3">
                      <p className="text-sm font-semibold">Resume Preview</p>
                      <span className="chip text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-900">
                        <CheckCircle2 className="h-3 w-3" /> Parsed
                      </span>
                    </div>
                    <div className="mt-4 space-y-2.5">
                      <div className="h-3 w-2/5 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <div className="h-2 w-3/5 rounded-full bg-slate-200 dark:bg-slate-800" />
                      {[0.9, 0.75, 0.85, 0.6].map((w, i) => (
                        <div key={i} className="h-2 rounded-full bg-slate-200 dark:bg-slate-800" style={{ width: `${w * 100}%` }} />
                      ))}
                      <div className="h-3 w-1/3 rounded-full bg-slate-300 dark:bg-slate-700" />
                      {[0.8, 0.7, 0.9, 0.65].map((w, i) => (
                        <div key={`b-${i}`} className="h-2 rounded-full bg-slate-200 dark:bg-slate-800" style={{ width: `${w * 100}%` }} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button onClick={reset} className="btn-secondary">
                    <X className="h-4 w-4" /> Upload different resume
                  </button>
                  <button onClick={() => navigate('/analysis')} className="btn-primary px-6 py-3.5">
                    <Sparkles className="h-4 w-4" /> Analyze Resume
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* privacy note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
          <FileText className="h-3.5 w-3.5" />
          Your resume is encrypted in transit and never shared with employers without your consent.
        </div>
      </div>
    </PageShell>
  );
}
