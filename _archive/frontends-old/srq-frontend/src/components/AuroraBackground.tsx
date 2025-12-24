'use client';

import { ReactNode } from 'react';

interface AuroraBackgroundProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  color?: string;
  showGrid?: boolean;
  showParticles?: boolean;
  showScanlines?: boolean;
}

export default function AuroraBackground({
  children,
  className = '',
  intensity = 'medium',
  color = '#8afd81',
  showGrid = true,
  showParticles = true,
  showScanlines = false,
}: AuroraBackgroundProps) {
  const intensityConfig = {
    low: { opacity: 0.05, blur: 100 },
    medium: { opacity: 0.1, blur: 80 },
    high: { opacity: 0.15, blur: 60 },
  };

  const config = intensityConfig[intensity];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main aurora blob */}
        <div 
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full animate-aurora-1"
          style={{
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity: config.opacity,
            filter: `blur(${config.blur}px)`,
          }}
        />
        {/* Secondary aurora blob */}
        <div 
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full animate-aurora-2"
          style={{
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity: config.opacity * 0.7,
            filter: `blur(${config.blur}px)`,
          }}
        />
        {/* Tertiary aurora blob */}
        <div 
          className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full animate-aurora-3"
          style={{
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity: config.opacity * 0.5,
            filter: `blur(${config.blur}px)`,
          }}
        />
      </div>

      {/* Grid overlay */}
      {showGrid && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(${color} 1px, transparent 1px),
              linear-gradient(90deg, ${color} 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      )}

      {/* Particles */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: color,
                opacity: 0.3 + Math.random() * 0.4,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Scanlines */}
      {showScanlines && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03] animate-scanline"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${color} 2px,
              ${color} 4px
            )`,
            backgroundSize: '100% 4px',
          }}
        />
      )}

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Composant Matrix Rain (style terminal)
export function MatrixRain({ 
  color = '#8afd81',
  opacity = 0.05,
  density = 20,
}: { 
  color?: string;
  opacity?: number;
  density?: number;
}) {
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(density)].map((_, i) => (
        <div
          key={i}
          className="absolute text-xs font-mono animate-matrix-fall whitespace-nowrap"
          style={{
            left: `${(i / density) * 100}%`,
            color,
            opacity,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 20}s`,
          }}
        >
          {[...Array(30)].map((_, j) => (
            <div key={j} className="leading-tight">
              {chars[Math.floor(Math.random() * chars.length)]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Noise overlay pour texture
export function NoiseOverlay({ opacity = 0.02 }: { opacity?: number }) {
  return (
    <div 
      className="absolute inset-0 pointer-events-none mix-blend-overlay"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

