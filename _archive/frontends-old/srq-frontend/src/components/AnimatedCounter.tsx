'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  onComplete?: () => void;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function AnimatedCounter({
  value,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  onComplete,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      
      setDisplayValue(easedProgress * value);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        onComplete?.();
      }
    };

    // Delay start for stagger effect
    const timeout = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [value, duration, onComplete]);

  const formattedValue = displayValue.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}

// Composant pour les gros chiffres avec effet de glow
export function GlowingCounter({
  value,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  color = '#8afd81',
  size = 'lg',
}: AnimatedCounterProps & { color?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl',
  };

  return (
    <div className="relative inline-block">
      {/* Glow layer */}
      <div 
        className="absolute inset-0 blur-lg opacity-50"
        style={{ color }}
      >
        <AnimatedCounter
          value={value}
          duration={duration}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          className={`${sizeClasses[size]} font-bold font-mono`}
        />
      </div>
      {/* Main text */}
      <AnimatedCounter
        value={value}
        duration={duration}
        decimals={decimals}
        prefix={prefix}
        suffix={suffix}
        className={`${sizeClasses[size]} font-bold font-mono relative`}
        style={{ color }}
      />
    </div>
  );
}

