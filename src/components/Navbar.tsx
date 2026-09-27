import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3, Briefcase, ChevronDown, Home, LayoutDashboard, LogOut, Menu, Moon, Sparkles,
  Sun, Target, Upload, User, X,
} from 'lucide-react';
import { useTheme } from '@/lib/theme';
import { Logo } from './Logo';

const navLinks = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Jobs', to: '/jobs', icon: Briefcase },
  { label: 'Roadmap', to: '/roadmap', icon: Target },
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
const { user, signOut } = useAuth();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setUserMenu(false); }, [location.pathname]);

  const isActive = (to: string) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to));

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong shadow-soft' : 'bg-transparent'}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive(l.to)
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {l.label}
                {isActive(l.to) && (
                  <motion.span layoutId="nav-active" className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
{!user && (
  <>
    <div className="hidden md:block">
      <Link to="/login" className="btn-ghost">
        Login
      </Link>
    </div>

    <div className="hidden md:block">
      <Link to="/register" className="btn-primary px-4 py-2.5">
        <Sparkles className="h-4 w-4" /> Get Started
      </Link>
    </div>
  </>
)}

          {/* User avatar dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setUserMenu((p) => !p)}
              className="flex items-center gap-1.5 rounded-full p-0.5 pl-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-600 text-xs font-bold text-white">
                {(user?.user_metadata?.full_name || user?.email || "U").charAt(0).toUpperCase()}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>
            <AnimatePresence>
              {userMenu && 
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                   className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-xl glass-strong p-2 shadow-soft-lg"
                  >
                    <div className="px-3 py-2 border-b border-slate-200/70 dark:border-slate-800/70">
                      <p className="text-sm font-semibold">{user?.user_metadata?.full_name || "User"}</p><p className="text-xs text-slate-500 dark:text-slate-400">
                        {user?.email}</p></div>
                    <div className="mt-1.5 space-y-0.5">
                      {[
                        { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
                        { label: 'Upload Resume', to: '/upload', icon: Upload },
                        { label: 'Analysis', to: '/analysis', icon: BarChart3 },
                        { label: 'Profile', to: '/dashboard', icon: User },
                      ].map((i) => (
                        <button
                          key={i.label}
                          onClick={() => navigate(i.to)}
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                        >
                          <i.icon className="h-4 w-4" /> {i.label}
                        </button>
                      ))}
                      <div className="my-1 border-t border-slate-200/70 dark:border-slate-800/70" />
                      <button onClick={async () => {try {await signOut();
                      setUserMenu(false);
                      navigate("/login", { replace: true });
                    } catch (err) {
                      console.error(err);}}}
  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
><LogOut className="h-4 w-4" /> Sign out</button>
                    </div>
                  </motion.div>
                </>
              }
            </AnimatePresence>
          </div>

          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="glass-strong border-t border-slate-200/70 dark:border-slate-800/70 px-4 py-4 space-y-1">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive(l.to) ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400' : 'text-slate-600 dark:text-slate-300'
                }`}>
                  <l.icon className="h-4 w-4" /> {l.label}
                </Link>
              ))}
             {!user && (
  <div className="flex gap-2 pt-3">
    <Link to="/login" className="btn-secondary flex-1">
      Login
    </Link>
    <Link to="/register" className="btn-primary flex-1">
      Get Started
    </Link>
  </div>
)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
