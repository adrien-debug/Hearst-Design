'use client';

import { Bitcoin, Zap, Box, Activity } from 'lucide-react';

interface FooterProps {
  variant?: 'light' | 'dark';
}

export default function Footer({ variant = 'light' }: FooterProps) {
  const isLight = variant === 'light';

  return (
    <footer 
      className={`
        mt-auto border-t
        ${isLight 
          ? 'bg-white border-grey-200 text-black' 
          : 'bg-dark-700 border-grey-100 text-white'
        }
      `}
    >
      <div className="max-w-full mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left Section - Copyright & Links */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-sm">
            {/* Logo Mini */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-hearst-green rounded flex items-center justify-center">
                <span className="text-xs font-bold text-black">H</span>
              </div>
              <span className={`font-semibold ${isLight ? 'text-black' : 'text-white'}`}>
                Hearst Corporation
              </span>
            </div>

            <span className={isLight ? 'text-grey-300' : 'text-grey-100'}>|</span>
            
            <span className={isLight ? 'text-grey-400' : 'text-grey-500'}>
              © 2025 All Rights Reserved
            </span>

            <span className={isLight ? 'text-grey-300' : 'text-grey-100'}>|</span>
            
            <span className={`font-mono text-xs ${isLight ? 'text-grey-500' : 'text-grey-500'}`}>
              SRQ-001
            </span>

            <span className={isLight ? 'text-grey-300' : 'text-grey-100'}>|</span>
            
            <span className={isLight ? 'text-grey-400' : 'text-grey-500'}>
              Strategic Reserve Qatar
            </span>
          </div>

          {/* Right Section - Live Stats */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4">
            {/* Containers */}
            <div className="flex items-center gap-2">
              <Box className={`w-4 h-4 ${isLight ? 'text-grey-400' : 'text-grey-500'}`} />
              <span className={`text-sm ${isLight ? 'text-grey-500' : 'text-grey-400'}`}>
                30 Containers
              </span>
            </div>

            {/* Miners */}
            <div className="flex items-center gap-2">
              <Activity className={`w-4 h-4 ${isLight ? 'text-grey-400' : 'text-grey-500'}`} />
              <span className={`text-sm ${isLight ? 'text-grey-500' : 'text-grey-400'}`}>
                9,240 Miners
              </span>
            </div>

            {/* Power */}
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-hearst-green" />
              <span className="text-sm font-semibold text-hearst-green">
                52.95 MW
              </span>
            </div>

            {/* Hashrate */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono font-bold text-hearst-green">
                4.37 EH/s
              </span>
            </div>

            {/* System Status Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-hearst-green rounded-full">
              <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
              <span className="text-[11px] font-bold text-black uppercase tracking-wider">
                System Online
              </span>
            </div>
          </div>
        </div>

        {/* Bottom row - Legal Links */}
        <div className={`
          flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 
          border-t ${isLight ? 'border-grey-100' : 'border-grey-100/30'}
        `}>
          <a 
            href="#" 
            className={`text-xs hover:text-hearst-green transition-colors ${
              isLight ? 'text-grey-400' : 'text-grey-500'
            }`}
          >
            Privacy Policy
          </a>
          <span className={isLight ? 'text-grey-200' : 'text-grey-100/30'}>•</span>
          <a 
            href="#" 
            className={`text-xs hover:text-hearst-green transition-colors ${
              isLight ? 'text-grey-400' : 'text-grey-500'
            }`}
          >
            Terms of Service
          </a>
          <span className={isLight ? 'text-grey-200' : 'text-grey-100/30'}>•</span>
          <a 
            href="#" 
            className={`text-xs hover:text-hearst-green transition-colors ${
              isLight ? 'text-grey-400' : 'text-grey-500'
            }`}
          >
            Documentation
          </a>
          <span className={isLight ? 'text-grey-200' : 'text-grey-100/30'}>•</span>
          <a 
            href="#" 
            className={`text-xs hover:text-hearst-green transition-colors ${
              isLight ? 'text-grey-400' : 'text-grey-500'
            }`}
          >
            API Reference
          </a>
        </div>
      </div>
    </footer>
  );
}

