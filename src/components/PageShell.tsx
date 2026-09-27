import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function PageShell({ children, footer = true }: { children: ReactNode; footer?: boolean }) {
  return (
    <div className="relative min-h-screen">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-300/20 blur-[120px] dark:bg-brand-700/20" />
        <div className="absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-accent-300/20 blur-[120px] dark:bg-accent-700/20" />
        <div className="absolute bottom-0 -left-40 h-[28rem] w-[28rem] rounded-full bg-brand-200/20 blur-[120px] dark:bg-brand-800/10" />
      </div>
      <Navbar />
      <main>{children}</main>
      {footer && <Footer />}
    </div>
  );
}
