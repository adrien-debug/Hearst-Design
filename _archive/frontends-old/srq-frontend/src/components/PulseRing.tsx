'use client';

import { ReactNode } from 'react';

interface PulseRingProps {
  children: ReactNode;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export default function PulseRing({
  children,
  color = '#8afd81',
  size = 'md',
  intensity = 'medium',
  className = '',
}: PulseRingProps) {
  const sizeConfig = {
    sm: { ring1: 8, ring2: 16, ring3: 24 },
    md: { ring1: 12, ring2: 24, ring3: 36 },
    lg: { ring1: 16, ring2: 32, ring3: 48 },
  };

  const intensityConfig = {
    low: { opacity: 0.1, duration: 3 },
    medium: { opacity: 0.2, duration: 2 },
    high: { opacity: 0.3, duration: 1.5 },
  };

  const config = sizeConfig[size];
  const intensityCfg = intensityConfig[intensity];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Pulse rings */}
      <div 
        className="absolute inset-0 rounded-full animate-ping"
        style={{
          backgroundColor: color,
          opacity: intensityCfg.opacity * 0.3,
          animationDuration: `${intensityCfg.duration}s`,
        }}
      />
      <div 
        className="absolute rounded-full animate-pulse-ring-1"
        style={{
          inset: `-${config.ring1}px`,
          border: `1px solid ${color}`,
          opacity: intensityCfg.opacity,
        }}
      />
      <div 
        className="absolute rounded-full animate-pulse-ring-2"
        style={{
          inset: `-${config.ring2}px`,
          border: `1px solid ${color}`,
          opacity: intensityCfg.opacity * 0.7,
        }}
      />
      <div 
        className="absolute rounded-full animate-pulse-ring-3"
        style={{
          inset: `-${config.ring3}px`,
          border: `1px solid ${color}`,
          opacity: intensityCfg.opacity * 0.4,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Composant KPI avec Pulse Ring intégré
interface PulseKPIProps {
  value: string | number;
  label: string;
  sublabel?: string;
  color?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export function PulseKPI({
  value,
  label,
  sublabel,
  color = '#8afd81',
  icon,
  trend,
  trendValue,
}: PulseKPIProps) {
  return (
    <div className="relative p-6 bg-dark-700/50 backdrop-blur-sm border border-grey-100/30 rounded-2xl overflow-hidden group hover:border-opacity-50 transition-all duration-300">
      {/* Background glow */}
      <div 
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-grey-500 uppercase tracking-wider mb-2">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <span 
              className="text-3xl font-bold font-mono tracking-tight"
              style={{ color }}
            >
              {value}
            </span>
            {trend && trendValue && (
              <span className={`text-sm font-semibold ${
                trend === 'up' ? 'text-hearst-green' : 
                trend === 'down' ? 'text-red-500' : 'text-grey-500'
              }`}>
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
              </span>
            )}
          </div>
          {sublabel && (
            <p className="text-xs text-grey-500 mt-1">{sublabel}</p>
          )}
        </div>

        {icon && (
          <PulseRing color={color} size="sm" intensity="low">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              {icon}
            </div>
          </PulseRing>
        )}
      </div>
    </div>
  );
}

