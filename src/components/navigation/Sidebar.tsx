import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useBackground } from '../../context/BackgroundContext';
import { Logo } from '../ui/Logo';
import kuchuPuchuAvatar from '../../assets/images/kuchu_puchu_avatar_1788586131006.jpg';
import {
  LayoutDashboard,
  Sparkles,
  Compass,
  FolderGit2,
  Bot,
  MapPin,
  TrendingUp,
  FileText,
  Mic,
  Settings,
  LogOut,
  ChevronRight,
  UserCheck,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { user, activeProject, logout, resetDemoData } = useApp();
  const { palette, atmosphere } = useBackground();
  const navigate = useNavigate();
  const isDark = atmosphere === 'gothic-dark';

  const mainNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Generate Project', path: '/generate', icon: Sparkles, highlight: true },
    { label: 'Explore Projects', path: '/projects', icon: Compass }
  ];

  const projectWorkspaceItems = [
    { label: 'Project Blueprint', path: `/projects/${activeProject.id}`, icon: FolderGit2 },
    { label: 'Development Roadmap', path: `/projects/${activeProject.id}/roadmap`, icon: MapPin },
    { label: 'Kuchu Puchu (AI Mentor)', path: `/projects/${activeProject.id}/mentor`, icon: Bot, isAi: true },
    { label: 'Project Improvements', path: `/projects/${activeProject.id}/improvements`, icon: TrendingUp },
    { label: 'Documentation Drafts', path: `/projects/${activeProject.id}/documentation`, icon: FileText },
    { label: 'Viva Preparation', path: `/projects/${activeProject.id}/viva`, icon: Mic }
  ];

  const bottomNavItems = [
    { label: 'Student Profile', path: '/profile', icon: GraduationCap },
    { label: 'Settings', path: '/settings', icon: Settings }
  ];

  const handleLinkClick = () => {
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 border-r flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isDark ? 'text-slate-200' : 'bg-white text-slate-800 border-slate-200'}`}
        style={{
          backgroundColor: isDark ? palette.darkCanvasBg : undefined,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : undefined,
        }}
      >
        {/* Header / Brand */}
        <div
          className="h-16 flex items-center justify-between px-5 border-b"
          style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : undefined }}
        >
          <Logo size="md" to="/dashboard" />
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {/* Main Primary Links */}
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Overview
            </p>
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'text-white font-semibold shadow-xs'
                        : isDark
                        ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                        : item.highlight
                        ? 'text-indigo-600 hover:bg-indigo-50/70'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: palette.primary }
                      : undefined
                  }
                >
                  <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
                  <span className="flex-1">{item.label}</span>
                  {item.highlight && (
                    <span
                      className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md text-white shadow-2xs"
                      style={{ backgroundColor: isDark ? palette.secondary : undefined }}
                    >
                      AI
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Active Project Workspace Section */}
          <div className="space-y-1">
            <div className="px-3 flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Current Project
              </p>
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white"
                style={{ backgroundColor: palette.primary }}
              >
                {activeProject.progress || 68}%
              </span>
            </div>

            {/* Quick switcher badge showing current project title */}
            <div
              className="mx-2 mb-2 p-2.5 rounded-xl border"
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(226, 232, 240, 0.8)',
              }}
            >
              <p className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {activeProject.title}
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                <span>{activeProject.currentStage || 'Backend Development'}</span>
                <span className="font-semibold" style={{ color: palette.primary }}>8 wks</span>
              </div>
            </div>

            {projectWorkspaceItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'text-white font-semibold shadow-sm'
                        : isDark
                        ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: palette.primary }
                      : undefined
                  }
                >
                  <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.isAi && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-white/40" />
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Kuchu Puchu Mini Helper Card */}
          <div
            className="p-3 rounded-2xl border shadow-2xs"
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : undefined,
              borderColor: isDark ? palette.cardBorder : undefined,
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="h-9 w-9 rounded-xl overflow-hidden ring-1 shadow-2xs shrink-0"
                style={{ borderColor: palette.primary }}
              >
                <img
                  src={kuchuPuchuAvatar}
                  alt="Kuchu Puchu"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="overflow-hidden">
                <p className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Kuchu Puchu AI
                </p>
                <p className="text-[10px] font-semibold" style={{ color: palette.primary }}>
                  24/7 Viva & Code Guide
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                navigate(`/projects/${activeProject.id}/mentor`);
                if (setMobileOpen) setMobileOpen(false);
              }}
              className="mt-2.5 w-full py-1.5 px-2 rounded-lg text-white text-[11px] font-bold text-center shadow-xs transition-opacity hover:opacity-90"
              style={{ backgroundColor: palette.primary }}
            >
              Ask Kuchu Puchu
            </button>
          </div>

          {/* Settings & Profile */}
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Account
            </p>
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? isDark ? 'bg-white/15 text-white font-semibold' : 'bg-slate-100 text-slate-900 font-semibold'
                        : isDark ? 'text-slate-300 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Footer / User Profile & Demo Switcher */}
        <div
          className="p-3 border-t space-y-2"
          style={{
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : undefined,
            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.25)' : undefined,
          }}
        >
          {user && (
            <div
              className="flex items-center justify-between p-2 rounded-xl border shadow-2xs"
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(226, 232, 240, 0.8)',
              }}
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div
                  className="w-8 h-8 rounded-lg text-white flex items-center justify-center font-bold text-xs shrink-0"
                  style={{ backgroundColor: palette.primary }}
                >
                  {user.name ? user.name.split(' ').map((n) => n[0]).join('') : 'U'}
                </div>
                <div className="overflow-hidden">
                  <p className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {user.name || 'Student'}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">{user.branch || 'Engineering'}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Demo Mode Active
            </span>
            <button
              onClick={resetDemoData}
              className="text-[11px] font-semibold hover:underline"
              style={{ color: palette.primary }}
            >
              Reset Data
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
