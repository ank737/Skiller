import { supabase } from "@/lib/supabaseClient";
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Building2, CheckCircle2, Eye, EyeOff, GraduationCap, Lock, Mail, Sparkles,
  User, XCircle,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useTheme } from '@/lib/theme';
import { useToast } from '@/components/Toast';

type Field = 'name' | 'email' | 'password' | 'confirm' | 'college' | 'degree' | 'year' | 'role' | 'experience';
type Errors = Partial<Record<Field, string>>;

const roles = ['Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'Data Analyst', 'Product Designer', 'Product Manager', 'ML Engineer', 'DevOps Engineer'];
const experiences = ['Student / No experience', '0–1 years', '1–3 years', '3–5 years', '5+ years'];

export function RegisterPage() {
  const { theme, toggleTheme } = useTheme();
  const { notify } = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<Record<Field, string>>({
    name: '', email: '', password: '', confirm: '', college: '', degree: '', year: '', role: '', experience: '',
  });

  const set = (k: Field, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Please enter your full name';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Use at least 8 characters';
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match';
    if (!form.college.trim()) e.college = 'College name is required';
    if (!form.degree.trim()) e.degree = 'Degree is required';
    if (!form.year.trim()) e.year = 'Select your graduation year';
    if (!form.role) e.role = 'Select your preferred role';
    if (!form.experience) e.experience = 'Select your experience level';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

const onSubmit = async (ev: FormEvent) => {
  ev.preventDefault();

  if (!agree) {
    notify({
      type: "warning",
      title: "Please accept the terms to continue",
    });
    return;
  }

  if (!validate()) {
    notify({
      type: "error",
      title: "Please fix the highlighted fields",
    });
    return;
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.name,
        },
      },
    });

    if (error) throw error;

    if (data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          full_name: form.name,
          college: form.college,
          degree: form.degree,
          graduation_year: form.year,
          desired_role: form.role,
          experience: form.experience,
        });

      if (profileError) {
        console.error(profileError);
      }
    }

    notify({
      type: "success",
      title: "Registration Successful",
      message: "Please verify your email before logging in.",
    });

    navigate("/login");
  } catch (err: any) {
    notify({
      type: "error",
      title: "Registration Failed",
      message: err.message,
    });
  }
};

// DEMO ONSUBMIT 

  // const onSubmit = (ev: formEvent) => {
  //   ev.preventDefault();
  //   if (!agree) { notify({ type: 'warning', title: 'Please accept the terms to continue' }); return; }
  //   if (!validate()) { notify({ type: 'error', title: 'Please fix the highlighted fields' }); return; }
  //   notify({ type: 'success', title: 'Account created', message: 'Welcome to Skiller, ' + form.name.split(' ')[0] + '!' });
  //   navigate('/upload');
  // };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left illustration */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-accent-800 lg:flex lg:flex-col lg:justify-between p-12">
        <div className="absolute inset-0 bg-grid-dark opacity-20" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-accent-400/30 blur-3xl" />
        <div className="absolute top-1/4 -right-20 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl" />

        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 backdrop-blur">
              <Sparkles className="h-5 w-5 text-white" />
            </span>
            <span className="font-display text-lg font-bold text-white">Skiller</span>
          </Link>
        </div>

        <div className="relative max-w-md text-white">
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl font-bold leading-tight">
            Start your journey to the perfect job.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 text-white/80">
            Join 12,000+ students who use Skiller to analyze their resume, find matched roles, and follow a personalized roadmap to an offer.
          </motion.p>
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 space-y-3">
            {['Free AI resume analysis', 'Personalized career roadmap', 'Smart job recommendations', 'ATS score tracking'].map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-white/90">
                <CheckCircle2 className="h-5 w-5 text-white/80" /> {b}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative flex items-center gap-3 text-white/70 text-sm">
          <div className="flex -space-x-2">
            {['AP', 'ML', 'SR', 'DK'].map((a) => (
              <span key={a} className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-xs font-bold ring-2 ring-brand-700">{a}</span>
            ))}
          </div>
          Loved by students at top universities
        </div>
      </div>

      {/* Right form */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-5">
          <div className="lg:hidden"><Logo /></div>
          <div className="ml-auto flex items-center gap-3">
            <button onClick={toggleTheme} className="btn-ghost px-3 py-2 text-xs">
              {theme === 'dark' ? 'Light' : 'Dark'} mode
            </button>
            <Link to="/login" className="btn-ghost text-xs">Login</Link>
          </div>
        </div>

        <div className="flex flex-1 items-start justify-center px-4 py-6 sm:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Create your account</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Start your AI-guided career journey — it takes two minutes.</p>

            <form onSubmit={onSubmit} className="mt-7 space-y-4">
              <FieldWrap label="Full Name" error={errors.name}>
                <Input icon={User} value={form.name} onChange={(v) => set('name', v)} placeholder="Aisha Patel" error={!!errors.name} />
              </FieldWrap>

              <FieldWrap label="Email" error={errors.email}>
                <Input icon={Mail} type="email" value={form.email} onChange={(v) => set('email', v)} placeholder="you@university.edu" error={!!errors.email} />
              </FieldWrap>

              <div className="grid grid-cols-2 gap-3">
                <FieldWrap label="Password" error={errors.password}>
                  <div className="relative">
                    <Input icon={Lock} type={show ? 'text' : 'password'} value={form.password} onChange={(v) => set('password', v)} placeholder="8+ characters" error={!!errors.password} />
                    <button type="button" onClick={() => setShow((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FieldWrap>
                <FieldWrap label="Confirm Password" error={errors.confirm}>
                  <div className="relative">
                    <Input icon={Lock} type={showConfirm ? 'text' : 'password'} value={form.confirm} onChange={(v) => set('confirm', v)} placeholder="Re-enter" error={!!errors.confirm} />
                    <button type="button" onClick={() => setShowConfirm((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FieldWrap>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FieldWrap label="College" error={errors.college}>
                  <Input icon={Building2} value={form.college} onChange={(v) => set('college', v)} placeholder="Georgia Tech" error={!!errors.college} />
                </FieldWrap>
                <FieldWrap label="Degree" error={errors.degree}>
                  <Input icon={GraduationCap} value={form.degree} onChange={(v) => set('degree', v)} placeholder="B.S. Computer Science" error={!!errors.degree} />
                </FieldWrap>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FieldWrap label="Graduation Year" error={errors.year}>
                  <Select value={form.year} onChange={(v) => set('year', v)} error={!!errors.year} options={['2026', '2027', '2028', '2029']} placeholder="Select year" />
                </FieldWrap>
                <FieldWrap label="Experience Level" error={errors.experience}>
                  <Select value={form.experience} onChange={(v) => set('experience', v)} error={!!errors.experience} options={experiences} placeholder="Select level" />
                </FieldWrap>
              </div>

              <FieldWrap label="Preferred Role" error={errors.role}>
                <Select value={form.role} onChange={(v) => set('role', v)} error={!!errors.role} options={roles} placeholder="Select role" />
              </FieldWrap>

              <label className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                <span>I accept the <Link to="/" className="text-brand-600 dark:text-brand-400 hover:underline">Terms</Link> and <Link to="/" className="text-brand-600 dark:text-brand-400 hover:underline">Privacy Policy</Link>.</span>
              </label>

              <button type="submit" className="btn-primary w-full py-3.5">
                Create Account <ArrowRight className="h-4 w-4" />
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800" /></div>
                <div className="relative flex justify-center"><span className="bg-white dark:bg-slate-950 px-3 text-xs text-slate-400">or</span></div>
              </div>

              <button type="button" onClick={() => notify({ type: 'info', title: 'Google sign-in coming soon' })} className="btn-secondary w-full py-3.5">
                <GoogleIcon /> Continue with Google
              </button>

              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Already have an account? <Link to="/login" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">Login</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FieldWrap({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      {children}
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-rose-500"><XCircle className="h-3.5 w-3.5" /> {error}</p>
      )}
    </div>
  );
}

function Input({
  icon: Icon, value, onChange, type = 'text', placeholder, error,
}: {
  icon: typeof User; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; error?: boolean;
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`input-field pl-10 ${error ? 'border-rose-400 focus:ring-rose-400/40' : ''}`}
      />
    </div>
  );
}

function Select({
  value, onChange, options, placeholder, error,
}: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder?: string; error?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`input-field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394a3b8%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-no-repeat bg-[right_0.75rem_center] pr-10 ${error ? 'border-rose-400 focus:ring-rose-400/40' : ''}`}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
