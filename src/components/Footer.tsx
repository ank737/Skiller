import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Logo } from './Logo';

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/' },
      { label: 'Upload Resume', to: '/upload' },
      { label: 'Job Matches', to: '/jobs' },
      { label: 'Roadmap', to: '/roadmap' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/' },
      { label: 'Privacy', to: '/' },
      { label: 'Terms', to: '/' },
      { label: 'Contact', to: '/' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Login', to: '/login' },
      { label: 'Register', to: '/register' },
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Analysis', to: '/analysis' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-slate-200/70 dark:border-slate-800/70">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Your personal AI career assistant. Upload your resume once and let intelligence guide your next move.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Mail, label: 'Email' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-brand-600 hover:border-brand-300 dark:hover:text-brand-400 dark:hover:border-brand-700 transition-colors"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{c.title}</h4>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/70 dark:border-slate-800/70 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400 dark:text-slate-500">© 2026 Skiller. All rights reserved.</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Built for the next generation of careers.</p>
        </div>
      </div>
    </footer>
  );
}
