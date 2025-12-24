'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Bitcoin,
  Activity,
  Server,
  Box,
  Layers,
  Gamepad2,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
}

const navigation: NavItem[] = [
  { id: 'overview', name: 'Overview', href: '/dashboard', icon: Home },
  { id: 'bitcoin', name: 'Bitcoin Command', href: '/bitcoin-command-center', icon: Bitcoin, color: '#f7931a' },
  { id: 'mining', name: 'Mining Dashboard', href: '/mining-dashboard', icon: Activity, color: '#8afd81' },
  { id: 'infrastructure', name: 'Infrastructure', href: '/infrastructure', icon: Server, color: '#3b82f6' },
  { id: 'gallery', name: 'Gallery 3D', href: '/gallery', icon: Box, color: '#a855f7' },
  { id: 'monitoring', name: 'Project Monitoring', href: '/monitoring', icon: Layers, color: '#06b6d4' },
  { id: 'unreal', name: 'Unreal Viewer', href: '/unreal-viewer', icon: Gamepad2, color: '#ef4444' },
];

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ isCollapsed: controlledCollapsed, onToggle }: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(true);
  const pathname = usePathname();

  // Use controlled or internal state
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
  const handleToggle = onToggle || (() => setInternalCollapsed(!internalCollapsed));

  return (
    <>
      {/* Backdrop for mobile when expanded */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={handleToggle}
        />
      )}

      <aside 
        className={`
          fixed left-0 top-0 h-screen bg-dark-700 border-r border-grey-100 
          flex flex-col z-50 transition-all duration-300 ease-out
          ${isCollapsed ? 'w-[72px]' : 'w-[260px]'}
        `}
      >
        {/* Logo & Toggle Section */}
        <div className="h-[72px] flex items-center justify-between px-4 border-b border-grey-100/50">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            {/* Hearst Logo - H stylisé */}
            <div className="relative w-10 h-10 flex-shrink-0">
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full transition-transform duration-300 group-hover:scale-105"
              >
                {/* H stylisé Hearst */}
                <path
                  d="M20 10 L20 90 L35 90 L35 55 L45 45 L65 65 L65 10 L80 10 L80 90 L65 90 L65 75 L55 65 L35 45 L35 10 Z"
                  fill="#8afd81"
                  className="drop-shadow-[0_0_10px_rgba(138,253,129,0.5)]"
                />
              </svg>
            </div>
            
            {/* Text Logo - visible only when expanded */}
            <div 
              className={`
                overflow-hidden transition-all duration-300
                ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
              `}
            >
              <span className="text-base font-bold tracking-wider text-white whitespace-nowrap">
                HEARST
              </span>
              <p className="text-[10px] text-grey-500 uppercase tracking-widest whitespace-nowrap">
                Mining Operations
              </p>
            </div>
          </Link>

          {/* Toggle Button */}
          <button
            onClick={handleToggle}
            className={`
              p-2 rounded-lg bg-dark-600 border border-grey-100/50
              hover:bg-dark-500 hover:border-hearst-green/30
              transition-all duration-200 group
              ${isCollapsed ? 'mx-auto' : ''}
            `}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-grey-400 group-hover:text-hearst-green transition-colors" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-grey-400 group-hover:text-hearst-green transition-colors" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || 
              (item.href !== '/dashboard' && pathname?.startsWith(item.href));
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  group relative flex items-center gap-3 px-3 py-3 rounded-xl
                  transition-all duration-200 ease-out
                  ${isActive 
                    ? 'bg-hearst-green text-black font-semibold shadow-glow' 
                    : 'text-grey-400 hover:bg-dark-500 hover:text-white'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Active indicator line */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-black rounded-r-full" />
                )}

                <Icon 
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? '' : ''
                  }`}
                  style={{ color: isActive ? 'black' : item.color }}
                />
                
                {/* Label - hidden when collapsed */}
                <span 
                  className={`
                    text-sm font-medium whitespace-nowrap transition-all duration-300
                    ${isCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}
                  `}
                >
                  {item.name}
                </span>

                {/* Tooltip when collapsed */}
                {isCollapsed && (
                  <div className="
                    absolute left-full ml-3 px-3 py-2 
                    bg-dark-600 border border-grey-100 rounded-lg
                    text-sm text-white font-medium whitespace-nowrap
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                    transition-all duration-200 z-50
                    shadow-xl
                  ">
                    {item.name}
                    {/* Arrow */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 
                      w-2 h-2 bg-dark-600 border-l border-b border-grey-100 rotate-45" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Project Info - only when expanded */}
        <div 
          className={`
            border-t border-grey-100/50 transition-all duration-300 overflow-hidden
            ${isCollapsed ? 'p-0 h-0' : 'p-3'}
          `}
        >
          <div className="p-3 bg-dark-600/50 rounded-xl border border-grey-100/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-hearst-green rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-hearst-green uppercase tracking-wider">
                LIVE
              </span>
            </div>
            <p className="text-sm font-semibold text-white">SRQ-001</p>
            <p className="text-xs text-grey-500 mt-0.5">Strategic Reserve Qatar</p>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-grey-100/30">
              <span className="text-xs text-grey-500">Hashrate:</span>
              <span className="text-xs font-mono font-semibold text-hearst-green">4.37 EH/s</span>
            </div>
          </div>
        </div>

        {/* Version Footer */}
        <div 
          className={`
            border-t border-grey-100/50 transition-all duration-300
            ${isCollapsed ? 'py-3 px-2' : 'px-4 py-3'}
          `}
        >
          <p className={`text-[10px] text-grey-500 ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? 'v1.1' : 'v1.1.0 · Hearst Mining'}
          </p>
        </div>
      </aside>
    </>
  );
}
