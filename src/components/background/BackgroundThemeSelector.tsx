import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Waves,
  Cpu,
  Network,
  Box,
  Palette,
  Check,
  Zap,
  Moon,
  Sun,
  Flame,
  Scroll,
  X,
} from 'lucide-react';
import {
  useBackground,
  BgVisualMode,
  GothicPaletteId,
  GOTHIC_PALETTES,
  MotionIntensity,
  AtmosphereMode,
} from '../../context/BackgroundContext';

export const BackgroundThemeSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'palettes' | 'animations'>('palettes');
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
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const visualModes: {
    id: BgVisualMode;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    category: 'gothic' | 'standard';
  }[] = [
    {
      id: 'gothic-crypt',
      label: 'Gothic Crypt & Blood Moon',
      description: 'Pulsing moon, rising ember particles, cathedral silhouettes & mist',
      icon: Flame,
      category: 'gothic',
    },
    {
      id: 'gothic-runes',
      label: 'Occult Alchemical Runes',
      description: 'Rotating arcane sigils, floating gothic glyphs & candlelight glow',
      icon: Scroll,
      category: 'gothic',
    },
    {
      id: 'aurora',
      label: 'Fluid Aurora Mesh',
      description: 'Luminous ambient gradient orbs with gentle harmonic drift',
      icon: Sparkles,
      category: 'standard',
    },
    {
      id: 'constellation',
      label: 'Neural Spiderweb',
      description: 'Interactive canvas particles connected by neural energy sparks',
      icon: Network,
      category: 'standard',
    },
    {
      id: 'blueprint',
      label: 'Blueprint Matrix',
      description: 'Engineering coordinates, radar rings & sweeping laser beam',
      icon: Cpu,
      category: 'standard',
    },
    {
      id: 'cyberwave',
      label: 'Harmonic Data Stream',
      description: 'Flowing harmonic sine wave ribbons & telemetry curves',
      icon: Waves,
      category: 'standard',
    },
    {
      id: 'geometric',
      label: 'Floating 3D Prisms',
      description: 'Rotating isometric cubes & floating capstone engineering glyphs',
      icon: Box,
      category: 'standard',
    },
  ];

  const intensities: { id: MotionIntensity; label: string }[] = [
    { id: 'subtle', label: 'Subtle' },
    { id: 'dynamic', label: 'Dynamic' },
    { id: 'vibrant', label: 'Vibrant' },
    { id: 'paused', label: 'Pause' },
  ];

  const currentMode = visualModes.find((m) => m.id === mode) || visualModes[0];
  const CurrentIcon = currentMode.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-xs font-semibold text-slate-800 hover:text-indigo-600 transition-all border border-slate-200/90 shadow-2xs group"
        title="Customize Gothic Color Themes and Background Visuals"
        aria-label="Background & Gothic Theme Settings"
      >
        <div
          className="w-4 h-4 rounded-full border border-white/60 shadow-xs flex items-center justify-center shrink-0"
          style={{ backgroundColor: palette.primary }}
        />
        <span className="hidden sm:inline font-bold">Theme</span>
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded-md text-white shadow-2xs"
          style={{ backgroundColor: palette.primary }}
        >
          {palette.tag}
        </span>
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-84 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/90 p-4 z-50 animate-pop-in text-left">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <div
                className="p-1.5 rounded-xl text-white shadow-xs"
                style={{ backgroundColor: palette.primary }}
              >
                <Palette className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Atmosphere & Visuals</h4>
                <p className="text-[11px] text-slate-500">Gothic color combinations & effects</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Atmosphere Toggle (Gothic Midnight vs Clean Studio) */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/90 mb-3">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 pl-1">
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              Atmosphere:
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setAtmosphere('gothic-dark')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  atmosphere === 'gothic-dark'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Moon className="w-3 h-3 text-rose-400" />
                Gothic Dark
              </button>
              <button
                onClick={() => setAtmosphere('studio-light')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  atmosphere === 'studio-light'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sun className="w-3 h-3 text-amber-500" />
                Studio Light
              </button>
            </div>
          </div>

          {/* Tabs: Gothic Palettes vs Visual Animations */}
          <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl mb-3">
            <button
              onClick={() => setActiveTab('palettes')}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'palettes'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gothic Palettes ({Object.keys(GOTHIC_PALETTES).length})
            </button>
            <button
              onClick={() => setActiveTab('animations')}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'animations'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Visual Modes ({visualModes.length})
            </button>
          </div>

          {/* TAB 1: GOTHIC COLOR PALETTES */}
          {activeTab === 'palettes' && (
            <div className="space-y-1.5 max-h-[290px] overflow-y-auto pr-1 mb-3">
              {Object.values(GOTHIC_PALETTES).map((pal) => {
                const isSelected = paletteId === pal.id;
                return (
                  <button
                    key={pal.id}
                    onClick={() => setPaletteId(pal.id as GothicPaletteId)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-50 border-slate-400 ring-2 shadow-xs'
                        : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/70'
                    }`}
                    style={{
                      borderColor: isSelected ? pal.primary : undefined,
                    }}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      {/* Color Preview Swatches */}
                      <div className="flex items-center -space-x-1 shrink-0">
                        <div
                          className="w-4.5 h-4.5 rounded-full ring-2 ring-white shadow-xs"
                          style={{ backgroundColor: pal.primary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full ring-2 ring-white shadow-xs"
                          style={{ backgroundColor: pal.secondary }}
                        />
                        <div
                          className="w-3.5 h-3.5 rounded-full ring-2 ring-white shadow-xs"
                          style={{ backgroundColor: pal.darkCanvasBg }}
                        />
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900">{pal.name}</span>
                          <span
                            className="text-[9px] font-bold px-1.5 py-0.2 rounded text-white"
                            style={{ backgroundColor: pal.primary }}
                          >
                            {pal.tag}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 truncate max-w-[210px]">
                          {pal.subtitle}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 shrink-0" style={{ color: pal.primary }} />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* TAB 2: VISUAL ANIMATION MODES */}
          {activeTab === 'animations' && (
            <div className="space-y-1.5 max-h-[290px] overflow-y-auto pr-1 mb-3">
              {visualModes.map((vMode) => {
                const Icon = vMode.icon;
                const isSelected = mode === vMode.id;
                return (
                  <button
                    key={vMode.id}
                    onClick={() => setMode(vMode.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-50 border-slate-400 ring-2 shadow-xs'
                        : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/70'
                    }`}
                    style={{
                      borderColor: isSelected ? palette.primary : undefined,
                    }}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs"
                        style={{ backgroundColor: palette.primary }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900">{vMode.label}</span>
                          {vMode.category === 'gothic' && (
                            <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-rose-100 text-rose-700">
                              Gothic
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 truncate max-w-[210px]">
                          {vMode.description}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 shrink-0" style={{ color: palette.primary }} />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Intensity & Speed Controls */}
          <div className="pt-2.5 border-t border-slate-100 mb-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" />
                Motion Velocity
              </span>
              <span
                className="text-[10px] font-bold uppercase"
                style={{ color: palette.primary }}
              >
                {intensity}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-xl">
              {intensities.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setIntensity(item.id)}
                  className={`py-1 text-[11px] font-bold rounded-lg transition-all ${
                    intensity === item.id
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            <label className="flex items-center justify-between text-[11px] text-slate-700 cursor-pointer">
              <span className="font-medium">Architectural Grid Overlay</span>
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
              />
            </label>
            <label className="flex items-center justify-between text-[11px] text-slate-700 cursor-pointer">
              <span className="font-medium">Interactive Cursor Glow</span>
              <input
                type="checkbox"
                checked={interactiveMouse}
                onChange={(e) => setInteractiveMouse(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
