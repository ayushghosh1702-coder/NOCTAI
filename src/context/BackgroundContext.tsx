import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type BgVisualMode =
  | 'gothic-crypt'
  | 'gothic-runes'
  | 'aurora'
  | 'constellation'
  | 'blueprint'
  | 'cyberwave'
  | 'geometric';

export type GothicPaletteId =
  | 'crimson-nocturne'
  | 'victorian-amethyst'
  | 'abyssal-onyx'
  | 'spectral-crypt'
  | 'antique-cathedral'
  | 'bramble-rose'
  | 'classic-indigo';

export type AtmosphereMode = 'gothic-dark' | 'studio-light';
export type MotionIntensity = 'subtle' | 'dynamic' | 'vibrant' | 'paused';

export interface GothicColorPalette {
  id: GothicPaletteId;
  name: string;
  subtitle: string;
  tag: string;
  primary: string;
  secondary: string;
  tertiary: string;
  accentGlow: string;
  darkCanvasBg: string;
  darkHeaderBg: string;
  cardBorder: string;
  cardBg: string;
  textColor: string;
  canvasParticles: string[];
  laserColor: string;
  previewGradient: string;
  badgeBg: string;
  badgeText: string;
}

export const GOTHIC_PALETTES: Record<GothicPaletteId, GothicColorPalette> = {
  'crimson-nocturne': {
    id: 'crimson-nocturne',
    name: 'Crimson Nocturne',
    subtitle: 'Blood Moon, Wine Velvet & Obsidian',
    tag: 'Blood Gothic',
    primary: '#e11d48', // ruby rose
    secondary: '#881337', // dark wine
    tertiary: '#fda4af',
    accentGlow: 'rgba(225, 29, 72, 0.22)',
    darkCanvasBg: '#0b0407',
    darkHeaderBg: 'rgba(17, 7, 12, 0.88)',
    cardBorder: 'rgba(225, 29, 72, 0.2)',
    cardBg: 'rgba(20, 8, 14, 0.82)',
    textColor: '#ffe4e6',
    canvasParticles: ['#e11d48', '#be123c', '#9f1239', '#fb7185', '#4c0519'],
    laserColor: 'rgba(225, 29, 72, 0.35)',
    previewGradient: 'from-rose-600 via-red-900 to-black',
    badgeBg: 'bg-rose-950/80',
    badgeText: 'text-rose-300',
  },
  'victorian-amethyst': {
    id: 'victorian-amethyst',
    name: 'Victorian Amethyst',
    subtitle: 'Midnight Violet, Velvet Plum & Black Onyx',
    tag: 'Coven Violet',
    primary: '#a855f7',
    secondary: '#581c87',
    tertiary: '#e9d5ff',
    accentGlow: 'rgba(168, 85, 247, 0.22)',
    darkCanvasBg: '#08040e',
    darkHeaderBg: 'rgba(14, 8, 24, 0.88)',
    cardBorder: 'rgba(168, 85, 247, 0.2)',
    cardBg: 'rgba(19, 10, 32, 0.82)',
    textColor: '#f3e8ff',
    canvasParticles: ['#a855f7', '#7e22ce', '#9333ea', '#c084fc', '#3b0764'],
    laserColor: 'rgba(168, 85, 247, 0.35)',
    previewGradient: 'from-purple-600 via-fuchsia-950 to-black',
    badgeBg: 'bg-purple-950/80',
    badgeText: 'text-purple-300',
  },
  'abyssal-onyx': {
    id: 'abyssal-onyx',
    name: 'Abyssal Onyx',
    subtitle: 'Raven Jet Black, Cold Ash & Silver Mist',
    tag: 'Monochrome Noir',
    primary: '#e4e4e7',
    secondary: '#71717a',
    tertiary: '#ffffff',
    accentGlow: 'rgba(228, 228, 231, 0.15)',
    darkCanvasBg: '#09090b',
    darkHeaderBg: 'rgba(15, 15, 18, 0.9)',
    cardBorder: 'rgba(255, 255, 255, 0.14)',
    cardBg: 'rgba(24, 24, 27, 0.85)',
    textColor: '#f4f4f5',
    canvasParticles: ['#ffffff', '#e4e4e7', '#a1a1aa', '#71717a', '#3f3f46'],
    laserColor: 'rgba(228, 228, 231, 0.25)',
    previewGradient: 'from-zinc-400 via-zinc-800 to-black',
    badgeBg: 'bg-zinc-900',
    badgeText: 'text-zinc-200',
  },
  'spectral-crypt': {
    id: 'spectral-crypt',
    name: 'Spectral Crypt',
    subtitle: 'Eerie Necropolis Jade & Haunted Emerald',
    tag: 'Spectral Jade',
    primary: '#10b981',
    secondary: '#064e3b',
    tertiary: '#6ee7b7',
    accentGlow: 'rgba(16, 185, 129, 0.2)',
    darkCanvasBg: '#020c08',
    darkHeaderBg: 'rgba(4, 18, 12, 0.9)',
    cardBorder: 'rgba(16, 185, 129, 0.2)',
    cardBg: 'rgba(5, 26, 18, 0.82)',
    textColor: '#ecfdf5',
    canvasParticles: ['#10b981', '#059669', '#34d399', '#047857', '#022c22'],
    laserColor: 'rgba(16, 185, 129, 0.35)',
    previewGradient: 'from-emerald-500 via-teal-950 to-black',
    badgeBg: 'bg-emerald-950/80',
    badgeText: 'text-emerald-300',
  },
  'antique-cathedral': {
    id: 'antique-cathedral',
    name: 'Antique Cathedral',
    subtitle: 'Tarnished Bronze, Candlelight Gold & Charcoal',
    tag: 'Cathedral Bronze',
    primary: '#f59e0b',
    secondary: '#78350f',
    tertiary: '#fde68a',
    accentGlow: 'rgba(245, 158, 11, 0.2)',
    darkCanvasBg: '#0a0804',
    darkHeaderBg: 'rgba(18, 14, 8, 0.9)',
    cardBorder: 'rgba(245, 158, 11, 0.2)',
    cardBg: 'rgba(26, 20, 12, 0.82)',
    textColor: '#fef3c7',
    canvasParticles: ['#f59e0b', '#d97706', '#b45309', '#fcd34d', '#451a03'],
    laserColor: 'rgba(245, 158, 11, 0.35)',
    previewGradient: 'from-amber-500 via-amber-950 to-black',
    badgeBg: 'bg-amber-950/80',
    badgeText: 'text-amber-300',
  },
  'bramble-rose': {
    id: 'bramble-rose',
    name: 'Bramble Rose',
    subtitle: 'Dark Romance, Thorny Mauve & Midnight Rose',
    tag: 'Dark Romance',
    primary: '#f43f5e',
    secondary: '#881337',
    tertiary: '#fecdd3',
    accentGlow: 'rgba(244, 63, 94, 0.2)',
    darkCanvasBg: '#0c0409',
    darkHeaderBg: 'rgba(19, 7, 14, 0.9)',
    cardBorder: 'rgba(244, 63, 94, 0.2)',
    cardBg: 'rgba(26, 10, 19, 0.82)',
    textColor: '#fff1f2',
    canvasParticles: ['#f43f5e', '#e11d48', '#be123c', '#fb7185', '#4c0519'],
    laserColor: 'rgba(244, 63, 94, 0.35)',
    previewGradient: 'from-pink-600 via-rose-950 to-black',
    badgeBg: 'bg-pink-950/80',
    badgeText: 'text-pink-300',
  },
  'classic-indigo': {
    id: 'classic-indigo',
    name: 'Modern Indigo',
    subtitle: 'Electric Violet, Cyan & Tech Studio Indigo',
    tag: 'Studio Classic',
    primary: '#6366f1',
    secondary: '#4338ca',
    tertiary: '#c7d2fe',
    accentGlow: 'rgba(99, 102, 241, 0.2)',
    darkCanvasBg: '#060714',
    darkHeaderBg: 'rgba(10, 12, 26, 0.9)',
    cardBorder: 'rgba(99, 102, 241, 0.2)',
    cardBg: 'rgba(15, 18, 38, 0.82)',
    textColor: '#e0e7ff',
    canvasParticles: ['#6366f1', '#8b5cf6', '#38bdf8', '#a855f7', '#4f46e5'],
    laserColor: 'rgba(99, 102, 241, 0.35)',
    previewGradient: 'from-indigo-600 via-purple-900 to-slate-950',
    badgeBg: 'bg-indigo-950/80',
    badgeText: 'text-indigo-300',
  },
};

interface BackgroundContextType {
  mode: BgVisualMode;
  setMode: (mode: BgVisualMode) => void;
  paletteId: GothicPaletteId;
  setPaletteId: (paletteId: GothicPaletteId) => void;
  palette: GothicColorPalette;
  atmosphere: AtmosphereMode;
  setAtmosphere: (atmosphere: AtmosphereMode) => void;
  intensity: MotionIntensity;
  setIntensity: (intensity: MotionIntensity) => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  interactiveMouse: boolean;
  setInteractiveMouse: (interactive: boolean) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

const STORAGE_MODE = 'kuchu_bg_visual_mode';
const STORAGE_PALETTE = 'kuchu_bg_gothic_palette';
const STORAGE_ATMOSPHERE = 'kuchu_bg_atmosphere';
const STORAGE_INTENSITY = 'kuchu_bg_motion_intensity';
const STORAGE_GRID = 'kuchu_bg_show_grid';
const STORAGE_MOUSE = 'kuchu_bg_interactive_mouse';

export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<BgVisualMode>(() => {
    const saved = localStorage.getItem(STORAGE_MODE);
    if (
      saved &&
      [
        'gothic-crypt',
        'gothic-runes',
        'aurora',
        'constellation',
        'blueprint',
        'cyberwave',
        'geometric',
      ].includes(saved)
    ) {
      return saved as BgVisualMode;
    }
    return 'gothic-crypt'; // Default to gothic visual mode per user request!
  });

  const [paletteId, setPaletteIdState] = useState<GothicPaletteId>(() => {
    const saved = localStorage.getItem(STORAGE_PALETTE);
    if (saved && Object.keys(GOTHIC_PALETTES).includes(saved)) {
      return saved as GothicPaletteId;
    }
    return 'crimson-nocturne'; // Default to Gothic Crimson Nocturne!
  });

  const [atmosphere, setAtmosphereState] = useState<AtmosphereMode>(() => {
    const saved = localStorage.getItem(STORAGE_ATMOSPHERE);
    if (saved && ['gothic-dark', 'studio-light'].includes(saved)) {
      return saved as AtmosphereMode;
    }
    return 'gothic-dark'; // Default to gothic dark atmosphere!
  });

  const [intensity, setIntensityState] = useState<MotionIntensity>(() => {
    const saved = localStorage.getItem(STORAGE_INTENSITY);
    if (saved && ['subtle', 'dynamic', 'vibrant', 'paused'].includes(saved)) {
      return saved as MotionIntensity;
    }
    return 'dynamic';
  });

  const [showGrid, setShowGridState] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_GRID);
    return saved !== null ? saved === 'true' : true;
  });

  const [interactiveMouse, setInteractiveMouseState] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_MOUSE);
    return saved !== null ? saved === 'true' : true;
  });

  const palette = GOTHIC_PALETTES[paletteId] || GOTHIC_PALETTES['crimson-nocturne'];

  const setMode = (newMode: BgVisualMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_MODE, newMode);
  };

  const setPaletteId = (newPalette: GothicPaletteId) => {
    setPaletteIdState(newPalette);
    localStorage.setItem(STORAGE_PALETTE, newPalette);
  };

  const setAtmosphere = (newAtmosphere: AtmosphereMode) => {
    setAtmosphereState(newAtmosphere);
    localStorage.setItem(STORAGE_ATMOSPHERE, newAtmosphere);
  };

  const setIntensity = (newIntensity: MotionIntensity) => {
    setIntensityState(newIntensity);
    localStorage.setItem(STORAGE_INTENSITY, newIntensity);
  };

  const setShowGrid = (show: boolean) => {
    setShowGridState(show);
    localStorage.setItem(STORAGE_GRID, String(show));
  };

  const setInteractiveMouse = (interactive: boolean) => {
    setInteractiveMouseState(interactive);
    localStorage.setItem(STORAGE_MOUSE, String(interactive));
  };

  return (
    <BackgroundContext.Provider
      value={{
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
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = (): BackgroundContextType => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};
