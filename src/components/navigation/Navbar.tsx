import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { useApp } from '../../context/AppContext';
import { useBackground } from '../../context/BackgroundContext';
import { Menu, X, ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import { BackgroundThemeSelector } from '../background/BackgroundThemeSelector';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loginAsDemo } = useApp();
  const { palette, atmosphere } = useBackground();
  const isDark = atmosphere === 'gothic-dark';

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'Features', path: '/#features' },
    { label: 'Projects', path: '/projects' }
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const id = path.replace('/#', '');
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const id = path.replace('/#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-all ${
        isDark
          ? 'text-slate-100 border-white/10'
          : 'bg-white/85 text-slate-900 border-slate-200/80'
      }`}
      style={{
        backgroundColor: isDark ? palette.darkHeaderBg : undefined,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Left: Logo */}
        <Logo size="md" />

        {/* Center: Navigation links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.path)}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? isDark ? 'text-white font-bold' : 'text-indigo-600 font-semibold'
                  : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-3">
          <BackgroundThemeSelector />

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-200"
              >
                <span>Dashboard</span>
              </Link>
              <Link
                to="/generate"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-sm shadow-indigo-500/20 transition-all hover:shadow-indigo-500/30"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Project</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  loginAsDemo();
                  navigate('/dashboard');
                }}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1.5"
                title="Instant evaluator access"
              >
                <UserCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Demo Student</span>
              </button>

              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl transition-colors"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/25 transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          {user ? (
            <Link
              to="/dashboard"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 text-white"
            >
              Dashboard
            </Link>
          ) : (
            <button
              onClick={() => {
                loginAsDemo();
                navigate('/dashboard');
              }}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200"
            >
              Demo
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold rounded-xl bg-slate-100 text-slate-900"
                >
                  Go to Dashboard
                </Link>
                <Link
                  to="/generate"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold rounded-xl bg-indigo-600 text-white"
                >
                  Generate My Project
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold rounded-xl border border-slate-300 text-slate-800"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold rounded-xl bg-indigo-600 text-white"
                >
                  Get Started (Create Account)
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
