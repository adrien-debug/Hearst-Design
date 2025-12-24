'use client';

import { ReactNode } from 'react';

interface HeroBubbleProps {
  title: string;
  subtitle?: string;
  badges?: Array<{
    label: string;
    variant?: 'success' | 'warning' | 'info' | 'error' | 'bitcoin' | 'purple';
    pulse?: boolean;
  }>;
  stats?: Array<{
    value: string | number;
    label: string;
    color?: string;
  }>;
  backgroundImage?: string;
  backgroundGradient?: string;
  children?: ReactNode;
  height?: 'sm' | 'md' | 'lg';
  pattern?: 'grid' | 'dots' | 'lines' | 'none';
}

const badgeVariants = {
  success: 'bg-hearst-green/20 text-hearst-green border-hearst-green/40',
  warning: 'bg-warning/20 text-warning border-warning/40',
  info: 'bg-info/20 text-info border-info/40',
  error: 'bg-error/20 text-error border-error/40',
  bitcoin: 'bg-[#f7931a]/20 text-[#f7931a] border-[#f7931a]/40',
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
};

const heightClasses = {
  sm: 'min-h-[180px]',
  md: 'min-h-[240px]',
  lg: 'min-h-[320px]',
};

export default function HeroBubble({
  title,
  subtitle,
  badges = [],
  stats = [],
  backgroundImage,
  backgroundGradient,
  children,
  height = 'md',
  pattern = 'grid',
}: HeroBubbleProps) {
  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl 
        ${heightClasses[height]}
        border border-grey-100/50
        shadow-xl
      `}
    >
      {/* Background Layer */}
      <div className="absolute inset-0">
        {/* Image or Gradient Background */}
        {backgroundImage ? (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <div 
            className="absolute inset-0"
            style={{ 
              background: backgroundGradient || 
                'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f1f0f 100%)'
            }}
          />
        )}

        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />

        {/* Pattern Overlay */}
        {pattern === 'grid' && (
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(138, 253, 129, 1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(138, 253, 129, 1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        )}
        {pattern === 'dots' && (
          <div 
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(138, 253, 129, 1) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
        )}
        {pattern === 'lines' && (
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(138, 253, 129, 1) 50px)',
            }}
          />
        )}

        {/* Glowing orb effect */}
        <div 
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(138, 253, 129, 0.4) 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(138, 253, 129, 0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        {/* Top Section */}
        <div>
          {/* Badges Row */}
          {badges.length > 0 && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {badges.map((badge, index) => (
                <div 
                  key={index}
                  className={`
                    inline-flex items-center gap-1.5 px-3 py-1.5 
                    text-[11px] font-bold uppercase tracking-wider
                    border rounded-md backdrop-blur-sm
                    ${badgeVariants[badge.variant || 'success']}
                    ${badge.pulse ? 'animate-pulse' : ''}
                  `}
                >
                  {badge.pulse && (
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-ping" />
                  )}
                  {badge.label}
                </div>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 
            className="text-4xl font-bold text-white mb-2 tracking-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg text-grey-400 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Bottom Section - Stats & Children */}
        <div className="mt-6">
          {/* Stats Row */}
          {stats.length > 0 && (
            <div className="flex items-center gap-8 flex-wrap">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-baseline gap-2">
                  <span 
                    className="text-3xl font-bold font-mono"
                    style={{ 
                      color: stat.color || '#8afd81',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-sm text-grey-500 uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Custom Children Content */}
          {children && (
            <div className="mt-4">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-dark-900/50 to-transparent" />
    </div>
  );
}

