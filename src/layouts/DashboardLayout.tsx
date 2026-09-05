import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';
import { useApp } from '../context/AppContext';
import { Menu, Bell, Sparkles, FolderGit2, ChevronDown } from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { KuchuPuchuAssistant } from '../components/assistant/KuchuPuchuAssistant';
import kuchuPuchuAvatar from '../assets/images/kuchu_puchu_avatar_1788586131006.jpg';
import { AnimatedBackground } from '../components/background/AnimatedBackground';
import { BackgroundThemeSelector } from '../components/background/BackgroundThemeSelector';
import { useBackground } from '../context/BackgroundContext';

export const DashboardLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, projects, activeProjectId, setActiveProjectId, activeProject } = useApp();
  const { palette, atmosphere } = useBackground();
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-500 relative"
      style={{
        backgroundColor: atmosphere === 'gothic-dark' ? palette.darkCanvasBg : '#f8fafc',
      }}
    >
      {/* Sidebar (desktop fixed, mobile drawer) */}
      <Sidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col flex-1 min-h-screen relative z-10">
        {/* Top bar for dashboard */}
        <header
          className={`sticky top-0 z-30 h-16 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between border-b transition-colors duration-500 ${
            atmosphere === 'gothic-dark'
              ? 'border-white/10 text-white'
              : 'border-slate-200/80 text-slate-900'
          }`}
          style={{
            backgroundColor: atmosphere === 'gothic-dark' ? palette.darkHeaderBg : 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
              aria-label="Open Sidebar Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Quick Project Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-800 transition-colors border border-slate-200"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="max-w-[160px] sm:max-w-[240px] truncate">
                  {activeProject.title}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {projectDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setProjectDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-1.5 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40 animate-in fade-in zoom-in-95">
                    <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Select Active Workspace
                    </p>
                    {projects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setActiveProjectId(p.id);
                          setProjectDropdownOpen(false);
                          if (location.pathname.startsWith('/projects/')) {
                            navigate(`/projects/${p.id}`);
                          }
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          p.id === activeProjectId
                            ? 'bg-indigo-50/70 text-indigo-700 font-semibold'
                            : 'text-slate-700'
                        }`}
                      >
                        <span className="truncate pr-2">{p.title}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {p.matchScore}%
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Background Visuals Customizer */}
            <BackgroundThemeSelector />

            <button
              onClick={() => navigate(`/projects/${activeProject.id}/mentor`)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 transition-all hover:scale-105"
            >
              <div className="h-5 w-5 rounded-full overflow-hidden ring-1 ring-purple-400">
                <img
                  src={kuchuPuchuAvatar}
                  alt="Kuchu Puchu"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span>Ask Kuchu Puchu</span>
            </button>

            <button
              onClick={() => navigate('/generate')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold border border-indigo-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Idea</span>
            </button>

            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs border ${
                atmosphere === 'gothic-dark'
                  ? 'bg-white/10 text-white border-white/20'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title={user?.name || 'Ayush'}
            >
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto relative z-10">
          <Outlet />
        </main>
      </div>

      {/* Global Kuchu Puchu AI Assistant */}
      <KuchuPuchuAssistant />

      {/* Background Animated Visuals Engine */}
      <AnimatedBackground />
    </div>
  );
};
