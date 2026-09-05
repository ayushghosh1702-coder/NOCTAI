import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  useBackground,
  BgVisualMode,
  MotionIntensity,
  GothicPaletteId,
  GOTHIC_PALETTES,
} from '../context/BackgroundContext';
import {
  Settings,
  User,
  Bell,
  Cpu,
  Shield,
  Download,
  RotateCcw,
  Save,
  CheckCircle2,
  Lock,
  Mail,
  Building,
  Palette,
  Sparkles,
  Network,
  Waves,
  Box,
  Zap,
  Flame,
  Scroll,
  Moon,
  Sun,
  Check,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, updateUserProfile, resetDemoData, addToast, projects, activeProject } = useApp();
  const {
    mode,
    setMode,
    paletteId,
    setPaletteId,
    palette,
    atmosphere,
    setAtmosphere,
    intensity,
    setIntensity,
    showGrid,
    setShowGrid,
    interactiveMouse,
    setInteractiveMouse,
  } = useBackground();

  const [name, setName] = useState(user?.name || 'Ayush');
  const [college, setCollege] = useState(user?.college || 'PARUL UNIVERSITY');
  const [branch, setBranch] = useState(user?.branch || 'Computer Science & Engineering');
  const [email, setEmail] = useState(user?.email || 'ayush@paruluniversity.ac.in');

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyMilestoneReminder, setWeeklyMilestoneReminder] = useState(true);
  const [aiDepth, setAiDepth] = useState<'Standard' | 'Research Grade'>('Research Grade');

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      college,
      branch,
      email
    });
    addToast('Account settings updated successfully!', 'success');
  };

  const handleExportWorkspace = () => {
    const backupData = {
      user,
      activeProject,
      exportTimestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `projectmentor-workspace-backup.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Workspace configuration exported!', 'info');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200/80">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200 mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>Account Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Settings & Workspace Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Manage your academic credentials, AI response preferences, and project backups.
        </p>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Student Profile Credentials</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">Verified Academic Profile</span>
        </div>

        <form onSubmit={handleSaveGeneral} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Legal Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                College Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                College / University
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Degree & Branch
              </label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Account Information</span>
            </button>
          </div>
        </form>
      </div>

      {/* AI Inference & Guidance Settings */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <Cpu className="w-4 h-4 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">AI Mentor & Inference Settings</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900">Academic Technical Depth</p>
              <p className="text-xs text-slate-500">
                Calibrates the depth of code snippets, algorithmic tradeoffs, and examiner rubrics.
              </p>
            </div>
            <div className="flex gap-2">
              {(['Standard', 'Research Grade'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setAiDepth(mode);
                    addToast(`AI mode set to ${mode}`, 'info');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    aiDepth === mode
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-900">Milestone Deadlines Reminders</p>
              <p className="text-xs text-slate-500">
                Receive proactive sprint reminders before university evaluation cycles.
              </p>
            </div>
            <input
              type="checkbox"
              checked={weeklyMilestoneReminder}
              onChange={(e) => setWeeklyMilestoneReminder(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Workspace Atmosphere & Background Animated Visuals */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Atmosphere & Gothic Color Palettes</h3>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full text-white shadow-2xs"
              style={{ backgroundColor: palette.primary }}
            >
              {palette.name}
            </span>
          </div>
        </div>

        {/* Atmosphere Mode Selection */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              Workspace Atmosphere Mode
            </p>
            <p className="text-xs text-slate-500">
              Toggle between deep Gothic dark obsidian canvas or daytime studio light backdrop.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setAtmosphere('gothic-dark');
                addToast('Enabled Gothic Dark Atmosphere!', 'info');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                atmosphere === 'gothic-dark'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Moon className="w-3 h-3 text-rose-400" />
              Gothic Dark
            </button>
            <button
              onClick={() => {
                setAtmosphere('studio-light');
                addToast('Enabled Studio Light Atmosphere!', 'info');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                atmosphere === 'studio-light'
                  ? 'bg-white border-2 border-indigo-600 text-slate-900 shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Sun className="w-3 h-3 text-amber-500" />
              Studio Light
            </button>
          </div>
        </div>

        {/* Section 1: Gothic Color Combinations */}
        <div>
          <p className="text-xs font-bold text-slate-800 mb-1">Gothic & Atmospheric Color Combinations</p>
          <p className="text-xs text-slate-500 mb-4">
            Select a custom gothic color scheme that styles all background halos, lasers, embers, and accents:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.values(GOTHIC_PALETTES).map((pal) => {
              const isSelected = paletteId === pal.id;
              return (
                <button
                  key={pal.id}
                  onClick={() => {
                    setPaletteId(pal.id as GothicPaletteId);
                    addToast(`Switched palette to ${pal.name}!`, 'info');
                  }}
                  className={`text-left p-3.5 rounded-2xl border transition-all relative ${
                    isSelected
                      ? 'bg-slate-50/90 ring-2 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                  style={{
                    borderColor: isSelected ? pal.primary : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center -space-x-1.5">
                      <div
                        className="w-5 h-5 rounded-full ring-2 ring-white shadow-xs"
                        style={{ backgroundColor: pal.primary }}
                      />
                      <div
                        className="w-4.5 h-4.5 rounded-full ring-2 ring-white shadow-xs"
                        style={{ backgroundColor: pal.secondary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full ring-2 ring-white shadow-xs"
                        style={{ backgroundColor: pal.darkCanvasBg }}
                      />
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white shadow-2xs"
                      style={{ backgroundColor: pal.primary }}
                    >
                      {pal.tag}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-slate-900">{pal.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{pal.subtitle}</p>

                  {isSelected && (
                    <div
                      className="absolute top-3 right-3 p-1 rounded-full text-white"
                      style={{ backgroundColor: pal.primary }}
                    >
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Visual Themes */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-800 mb-1">Animated Visual Theme</p>
          <p className="text-xs text-slate-500 mb-4">
            Select the animated aesthetic layer rendered behind your project workspace:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                id: 'gothic-crypt' as BgVisualMode,
                label: 'Gothic Crypt & Moon',
                desc: 'Pulsing blood moon, floating embers, silhouettes and ground mist',
                icon: Flame,
                gradient: 'from-rose-600 to-red-950',
              },
              {
                id: 'gothic-runes' as BgVisualMode,
                label: 'Occult Arcane Runes',
                desc: 'Rotating alchemical sigils, floating occult runes and candle glow',
                icon: Scroll,
                gradient: 'from-purple-600 to-violet-950',
              },
              {
                id: 'aurora' as BgVisualMode,
                label: 'Fluid Aurora',
                desc: 'Luminous ambient gradient orbs with soft floating physics',
                icon: Sparkles,
                gradient: 'from-indigo-500 to-purple-500',
              },
              {
                id: 'constellation' as BgVisualMode,
                label: 'Neural Constellation',
                desc: 'Interactive particles connected by real-time neural sparks',
                icon: Network,
                gradient: 'from-purple-600 to-cyan-500',
              },
              {
                id: 'blueprint' as BgVisualMode,
                label: 'Blueprint Matrix',
                desc: 'Engineering coordinates, radar rings & laser sweep beam',
                icon: Cpu,
                gradient: 'from-sky-500 to-indigo-600',
              },
              {
                id: 'cyberwave' as BgVisualMode,
                label: 'Data Stream',
                desc: 'Flowing harmonic sine wave ribbons and telemetry curves',
                icon: Waves,
                gradient: 'from-cyan-500 to-fuchsia-500',
              },
              {
                id: 'geometric' as BgVisualMode,
                label: 'Floating Prisms',
                desc: '3D rotating isometric cubes & capstone engineering glyphs',
                icon: Box,
                gradient: 'from-violet-500 to-pink-500',
              },
            ].map((theme) => {
              const Icon = theme.icon;
              const isSelected = mode === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    setMode(theme.id);
                    addToast(`Switched background to ${theme.label}!`, 'info');
                  }}
                  className={`text-left p-3.5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-400/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className={`w-7 h-7 rounded-xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center text-white shadow-xs`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">{theme.label}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{theme.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Motion Intensity Settings */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Motion Intensity & Speed
            </p>
            <p className="text-xs text-slate-500">
              Adjust animation velocity and energy based on your concentration preference.
            </p>
          </div>
          <div className="flex gap-2">
            {(['subtle', 'dynamic', 'vibrant', 'paused'] as MotionIntensity[]).map((val) => (
              <button
                key={val}
                onClick={() => setIntensity(val)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  intensity === val
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Toggles */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-800">Architectural Grid Matrix</p>
              <p className="text-[11px] text-slate-500">Subtle background coordinate points</p>
            </div>
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-800">Interactive Cursor Glow</p>
              <p className="text-[11px] text-slate-500">Soft ambient halo following cursor</p>
            </div>
            <input
              type="checkbox"
              checked={interactiveMouse}
              onChange={(e) => setInteractiveMouse(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <Shield className="w-4 h-4 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">Data Management & Reset</h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-slate-900">Export Project Workspace</p>
            <p className="text-xs text-slate-500">
              Download your full roadmaps, custom tasks, mentor dialogues, and documentation drafts.
            </p>
          </div>
          <button
            onClick={handleExportWorkspace}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
        </div>

        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-rose-700">Reset Demo Data</p>
            <p className="text-xs text-slate-500">
              Restore initial seed projects, sample questions, and clear local state cache.
            </p>
          </div>
          <button
            onClick={resetDemoData}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition-colors shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </div>
    </div>
  );
};
