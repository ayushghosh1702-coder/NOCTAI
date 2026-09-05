import React, { useEffect, useRef, useState } from 'react';
import { useBackground } from '../../context/BackgroundContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export const AnimatedBackground: React.FC = () => {
  const { mode, palette, atmosphere, intensity, showGrid, interactiveMouse } = useBackground();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const mouseTargetRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  // Multipliers based on intensity
  const opacityMultiplier =
    intensity === 'paused' ? 0.35 : intensity === 'subtle' ? 0.6 : intensity === 'vibrant' ? 1.3 : 0.95;
  const speedMultiplier =
    intensity === 'paused' ? 0 : intensity === 'subtle' ? 0.5 : intensity === 'vibrant' ? 1.4 : 1.0;

  // Track mouse coordinates for subtle ambient interaction
  useEffect(() => {
    if (!interactiveMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseTargetRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactiveMouse]);

  // Constellation / Particle Canvas Animation Loop (Uses Gothic palette colors)
  useEffect(() => {
    if (mode !== 'constellation') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(Math.floor((width * height) / 20000), 55);
    const colors = palette.canvasParticles;

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7 * speedMultiplier,
      vy: (Math.random() - 0.5) * 0.7 * speedMultiplier,
      size: Math.random() * 2.2 + 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (intensity !== 'paused') {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * opacityMultiplier * 0.75;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = palette.primary;
            const lineAlpha = (1 - dist / 135) * 0.22 * opacityMultiplier;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        if (interactiveMouse && mouseTargetRef.current.x > 0) {
          const mdx = p.x - mouseTargetRef.current.x;
          const mdy = p.y - mouseTargetRef.current.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < 165) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseTargetRef.current.x, mouseTargetRef.current.y);
            ctx.strokeStyle = palette.primary;
            ctx.globalAlpha = (1 - mdist / 165) * 0.4 * opacityMultiplier;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode, palette, intensity, speedMultiplier, opacityMultiplier, interactiveMouse]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none transition-colors duration-700"
      style={{
        backgroundColor: atmosphere === 'gothic-dark' ? palette.darkCanvasBg : 'transparent',
      }}
      aria-hidden="true"
    >
      {/* Gothic Atmosphere Dark Vignette / Nocturne Shadow */}
      {atmosphere === 'gothic-dark' && (
        <div
          className="absolute inset-0 opacity-85"
          style={{
            background: `radial-gradient(ellipse at 50% 10%, transparent 20%, ${palette.darkCanvasBg} 90%)`,
          }}
        />
      )}

      {/* Interactive Cursor Spotlight Glow */}
      {interactiveMouse && mousePos.x > 0 && (
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${mousePos.x - 250}px, ${mousePos.y - 250}px)`,
            background: `radial-gradient(circle, ${palette.accentGlow} 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Architectural Dot / Matrix Grid Overlay */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage: `radial-gradient(${
              atmosphere === 'gothic-dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(148, 163, 184, 0.3)'
            } 1px, transparent 1px)`,
            backgroundSize: mode === 'blueprint' ? '24px 24px' : '30px 30px',
          }}
        />
      )}

      {/* MODE 1: GOTHIC CRYPT & BLOOD MOON (NEW DEDICATED GOTHIC MODE) */}
      {mode === 'gothic-crypt' && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: opacityMultiplier }}
        >
          {/* Pulsing Gothic Moon / Orb */}
          <div className="absolute top-10 right-1/4 sm:right-24 flex items-center justify-center">
            {/* Outer halo */}
            <div
              className="w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-2xl animate-gothic-moon"
              style={{
                background: `radial-gradient(circle, ${palette.primary} 0%, ${palette.secondary} 40%, transparent 75%)`,
              }}
            />
            {/* Inner moon silhouette */}
            <div
              className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-white/20 shadow-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.secondary} 70%, #000 100%)`,
              }}
            >
              {/* Moon surface crater textures */}
              <div className="absolute top-4 left-5 w-7 h-7 rounded-full bg-black/25 blur-xs" />
              <div className="absolute bottom-6 right-7 w-10 h-10 rounded-full bg-black/20 blur-xs" />
              <div className="absolute top-12 right-4 w-4 h-4 rounded-full bg-black/30 blur-xs" />
            </div>
          </div>

          {/* Gothic Cathedral / Silhouette Spires Silhouette at Bottom */}
          <div className="absolute inset-x-0 bottom-0 h-44 opacity-25 flex items-end justify-around pointer-events-none">
            <svg
              viewBox="0 0 1200 180"
              className="w-full h-full preserve-3d"
              fill="currentColor"
              style={{ color: palette.secondary }}
            >
              <path d="M0,180 L0,120 L80,120 L120,40 L160,120 L240,120 L270,70 L300,120 L420,120 L450,20 L480,120 L600,120 L640,60 L680,120 L780,120 L820,30 L860,120 L960,120 L990,75 L1020,120 L1120,120 L1160,50 L1200,120 L1200,180 Z" />
            </svg>
          </div>

          {/* Ascending Gothic Embers */}
          {intensity !== 'paused' && (
            <>
              {[
                { left: '15%', delay: '0s', size: 'w-2 h-2' },
                { left: '28%', delay: '1.4s', size: 'w-3 h-3' },
                { left: '42%', delay: '2.8s', size: 'w-2 h-2' },
                { left: '55%', delay: '0.8s', size: 'w-2.5 h-2.5' },
                { left: '68%', delay: '3.5s', size: 'w-3 h-3' },
                { left: '79%', delay: '2.1s', size: 'w-2 h-2' },
                { left: '88%', delay: '4.2s', size: 'w-2.5 h-2.5' },
              ].map((ember, i) => (
                <div
                  key={i}
                  className={`absolute bottom-6 rounded-full blur-[0.5px] animate-gothic-ember ${ember.size}`}
                  style={{
                    left: ember.left,
                    animationDelay: ember.delay,
                    backgroundColor: palette.primary,
                    boxShadow: `0 0 12px ${palette.primary}`,
                  }}
                />
              ))}
            </>
          )}

          {/* Drifting Eerie Ground Mist */}
          <div
            className="absolute inset-x-0 bottom-0 h-40 animate-gothic-mist opacity-40 blur-xl"
            style={{
              background: `linear-gradient(to top, ${palette.secondary} 0%, transparent 100%)`,
            }}
          />
        </div>
      )}

      {/* MODE 2: GOTHIC OCCULT & ALCHEMICAL RUNES (NEW DEDICATED GOTHIC MODE) */}
      {mode === 'gothic-runes' && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: opacityMultiplier }}
        >
          {/* Giant Rotating Alchemical Sigil in Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] opacity-18 pointer-events-none">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full animate-gothic-sigil"
              style={{ stroke: palette.primary }}
              fill="none"
            >
              <circle cx="200" cy="200" r="180" strokeWidth="2" strokeDasharray="6 4" />
              <circle cx="200" cy="200" r="150" strokeWidth="1.5" />
              <polygon points="200,50 330,275 70,275" strokeWidth="2" />
              <polygon points="200,350 70,125 330,125" strokeWidth="2" />
              <circle cx="200" cy="200" r="80" strokeWidth="1.5" strokeDasharray="8 6" />
              <circle cx="200" cy="200" r="40" strokeWidth="2" />
              <line x1="20" y1="200" x2="380" y2="200" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="200" y1="20" x2="200" y2="380" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Floating Gothic Glyphs & Runes */}
          <div className="absolute top-24 left-16 text-xs sm:text-sm font-mono tracking-widest px-3 py-1.5 rounded-lg border border-white/10 bg-black/40 backdrop-blur-xs text-white/60 animate-float-subtle">
            ✦ NOCTURNE :: VIVA_DEFENSE ✦
          </div>

          <div
            className="absolute bottom-28 right-20 text-xs font-mono tracking-widest px-3 py-1.5 rounded-lg border border-white/10 bg-black/40 backdrop-blur-xs text-white/60 animate-float-subtle"
            style={{ animationDelay: '2s' }}
          >
            ⚖ ALCHEMY_MATRIX // CAPSTONE
          </div>

          {/* Ambient Candlelight Glow Orbs */}
          <div
            className="absolute top-1/4 left-10 w-72 h-72 rounded-full blur-3xl opacity-35"
            style={{
              background: `radial-gradient(circle, ${palette.primary} 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute bottom-1/4 right-12 w-80 h-80 rounded-full blur-3xl opacity-35"
            style={{
              background: `radial-gradient(circle, ${palette.secondary} 0%, transparent 70%)`,
            }}
          />
        </div>
      )}

      {/* MODE 3: FLUID AURORA (ADAPTS TO GOTHIC PALETTE) */}
      {mode === 'aurora' && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: opacityMultiplier }}
        >
          <div
            className={`absolute -top-24 -right-24 w-[560px] h-[560px] rounded-full blur-3xl ${
              intensity !== 'paused' ? 'animate-aurora-1' : ''
            }`}
            style={{
              background: `radial-gradient(circle, ${palette.primary} 0%, ${palette.secondary} 50%, transparent 80%)`,
              opacity: 0.35,
            }}
          />
          <div
            className={`absolute top-1/4 -left-32 w-[620px] h-[620px] rounded-full blur-3xl ${
              intensity !== 'paused' ? 'animate-aurora-2' : ''
            }`}
            style={{
              background: `radial-gradient(circle, ${palette.secondary} 0%, #000 60%, transparent 80%)`,
              opacity: 0.3,
            }}
          />
          <div
            className={`absolute -bottom-36 left-1/3 w-[580px] h-[580px] rounded-full blur-3xl ${
              intensity !== 'paused' ? 'animate-aurora-3' : ''
            }`}
            style={{
              background: `radial-gradient(circle, ${palette.primary} 0%, transparent 70%)`,
              opacity: 0.28,
            }}
          />
        </div>
      )}

      {/* MODE 4: CONSTELLATION & NODE SPIDERWEB (CANVAS) */}
      {mode === 'constellation' && (
        <div className="absolute inset-0">
          <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
      )}

      {/* MODE 5: BLUEPRINT MATRIX WITH GOTHIC LASER */}
      {mode === 'blueprint' && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: opacityMultiplier }}
        >
          <div
            className="absolute top-12 left-1/4 text-xs font-mono select-none"
            style={{ color: palette.primary, opacity: 0.5 }}
          >
            + [GOTHIC_MATRIX :: {palette.name.toUpperCase()}]
          </div>

          {intensity !== 'paused' && (
            <div
              className="absolute left-0 right-0 h-28 border-b animate-laser-scan blur-[1px]"
              style={{
                background: `linear-gradient(to bottom, transparent, ${palette.laserColor}, transparent)`,
                borderColor: palette.primary,
              }}
            />
          )}

          <div
            className="absolute top-16 right-12 w-64 h-64 rounded-full border flex items-center justify-center"
            style={{ borderColor: `${palette.primary}33` }}
          >
            <div
              className="w-48 h-48 rounded-full border border-dashed animate-radar-spin"
              style={{ borderColor: `${palette.primary}55` }}
            />
            <div
              className="w-32 h-32 rounded-full border"
              style={{ borderColor: `${palette.primary}33` }}
            />
          </div>
        </div>
      )}

      {/* MODE 6: DATA STREAM WAVE */}
      {mode === 'cyberwave' && (
        <div
          className="absolute inset-0 overflow-hidden transition-opacity duration-700"
          style={{ opacity: opacityMultiplier }}
        >
          <div className="absolute inset-x-0 bottom-0 h-96 w-[200%] animate-cyber-wave opacity-45">
            <svg viewBox="0 0 1200 400" className="w-full h-full" fill="none">
              <path
                d="M0,160 C200,280 400,60 600,190 C800,320 1000,100 1200,210 L1200,400 L0,400 Z"
                fill={`url(#gothicWave1)`}
                opacity="0.4"
              />
              <path
                d="M0,220 C240,110 480,310 720,180 C960,70 1100,260 1200,190 L1200,400 L0,400 Z"
                fill={`url(#gothicWave2)`}
                opacity="0.3"
              />
              <path
                d="M0,190 C180,80 380,260 600,150 C820,40 1020,240 1200,160"
                stroke={palette.primary}
                strokeWidth="2.5"
                strokeDasharray="6 8"
                opacity="0.8"
              />
              <defs>
                <linearGradient id="gothicWave1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={palette.primary} />
                  <stop offset="50%" stopColor={palette.secondary} />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>
                <linearGradient id="gothicWave2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#000000" />
                  <stop offset="50%" stopColor={palette.secondary} />
                  <stop offset="100%" stopColor={palette.primary} />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      )}

      {/* MODE 7: GEOMETRIC PRISMS */}
      {mode === 'geometric' && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: opacityMultiplier }}
        >
          <div className="absolute top-20 left-16 w-24 h-24 opacity-40 animate-float-rotate-3d">
            <svg viewBox="0 0 100 100" className="w-full h-full" style={{ stroke: palette.primary }}>
              <polygon points="50,15 85,35 50,55 15,35" strokeWidth="2" fill={`${palette.primary}22`} />
              <polygon points="15,35 50,55 50,90 15,70" strokeWidth="2" fill={`${palette.secondary}33`} />
              <polygon points="85,35 50,55 50,90 85,70" strokeWidth="2" fill={`${palette.primary}15`} />
            </svg>
          </div>

          <div
            className="absolute top-1/3 right-20 w-20 h-20 opacity-40 animate-float-rotate-3d"
            style={{ animationDuration: '24s', animationDelay: '-3s' }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full" style={{ stroke: palette.primary }}>
              <polygon points="50,10 90,50 50,90 10,50" strokeWidth="2" fill={`${palette.secondary}25`} />
              <line x1="10" y1="50" x2="90" y2="50" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
