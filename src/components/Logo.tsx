import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export function Logo({ className = '', showText = true }: { className?: string; showText?: boolean }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 shadow-glow transition-transform duration-300 group-hover:scale-105">
        <Sparkles className="h-5 w-5 text-white" strokeWidth={2.5} />
        <span className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
      </span>
      {showText && (
        <span className="font-display text-lg font-bold tracking-tight">
          Skill<span className="gradient-text">er</span>
        </span>
      )}
    </Link>
  );
}
