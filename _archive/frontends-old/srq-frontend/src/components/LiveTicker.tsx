'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Zap, Cpu, Thermometer, Activity, Bitcoin } from 'lucide-react';

interface TickerItem {
  id: string;
  label: string;
  value: string;
  change?: number;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
}

interface LiveTickerProps {
  items?: TickerItem[];
  speed?: number; // pixels per second
  className?: string;
}

const defaultItems: TickerItem[] = [
  { id: 'btc', label: 'BTC', value: '$98,450', change: 2.4, icon: Bitcoin, color: '#f7931a' },
  { id: 'hashrate', label: 'HASHRATE', value: '4.37 EH/s', icon: Activity, color: '#8afd81' },
  { id: 'power', label: 'POWER', value: '52.95 MW', icon: Zap, color: '#3b82f6' },
  { id: 'miners', label: 'MINERS', value: '9,166 / 9,240', icon: Cpu, color: '#a855f7' },
  { id: 'temp', label: 'AVG TEMP', value: '38.5°C', icon: Thermometer, color: '#06b6d4' },
  { id: 'reserve', label: 'RESERVE', value: '220.5 BTC', icon: Bitcoin, color: '#f7931a' },
  { id: 'daily', label: 'DAILY', value: '+0.847 BTC', change: 0.847, icon: TrendingUp, color: '#8afd81' },
  { id: 'uptime', label: 'UPTIME', value: '99.8%', icon: Activity, color: '#8afd81' },
];

export default function LiveTicker({ 
  items = defaultItems, 
  speed = 50,
  className = '' 
}: LiveTickerProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Double the items for seamless loop
  const tickerItems = [...items, ...items];

  return (
    <div 
      className={`relative overflow-hidden bg-dark-800/80 backdrop-blur-sm border-y border-grey-100/30 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark-800 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark-800 to-transparent z-10 pointer-events-none" />

      {/* Live indicator */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center gap-2 bg-dark-800 pr-4">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-hearst-green/20 border border-hearst-green/40 rounded">
          <span className="w-1.5 h-1.5 bg-hearst-green rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-hearst-green uppercase tracking-wider">LIVE</span>
        </div>
      </div>

      {/* Ticker content */}
      <div 
        className={`flex items-center py-2.5 ${isPaused ? '' : 'animate-ticker'}`}
        style={{
          animationDuration: `${(tickerItems.length * 200) / speed}s`,
        }}
      >
        {tickerItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-3 px-6 border-r border-grey-100/20 whitespace-nowrap"
            >
              {Icon && (
                <Icon 
                  className="w-4 h-4" 
                  style={{ color: item.color || '#8afd81' }} 
                />
              )}
              <span className="text-xs font-semibold text-grey-500 uppercase tracking-wider">
                {item.label}
              </span>
              <span 
                className="text-sm font-bold font-mono"
                style={{ color: item.color || '#ffffff' }}
              >
                {item.value}
              </span>
              {item.change !== undefined && (
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${
                  item.change >= 0 ? 'text-hearst-green' : 'text-red-500'
                }`}>
                  {item.change >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {item.change >= 0 ? '+' : ''}{item.change}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Ticker vertical pour sidebar
export function VerticalTicker({ items = defaultItems }: { items?: TickerItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  const currentItem = items[currentIndex];
  const Icon = currentItem.icon;

  return (
    <div className="overflow-hidden h-6">
      <div 
        className="transition-transform duration-500 ease-out"
        style={{ transform: `translateY(-${currentIndex * 24}px)` }}
      >
        {items.map((item, index) => {
          const ItemIcon = item.icon;
          return (
            <div key={item.id} className="h-6 flex items-center gap-2">
              {ItemIcon && <ItemIcon className="w-3 h-3" style={{ color: item.color }} />}
              <span className="text-xs font-mono" style={{ color: item.color }}>
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

