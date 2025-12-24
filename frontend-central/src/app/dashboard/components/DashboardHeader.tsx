'use client';

import { useState, useEffect } from 'react';

interface DashboardHeaderProps {
  user: any;
  onLogout: () => void;
}

export function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl bg-hearst-black/80">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-hearst-green to-hearst-green-dark p-2.5 shadow-glow-green-sm">
              <svg className="w-full h-full text-hearst-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">HEARST CONTROL</h1>
              <p className="text-xs text-white/40 font-mono">
                {currentTime?.toLocaleString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </p>
            </div>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-hearst-green/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-hearst-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-white">{user?.name || user?.email}</div>
                <div className="text-xs text-white/40 capitalize">{user?.role}</div>
              </div>
              <svg
                className={`w-4 h-4 text-white/40 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />

                {/* Menu */}
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-hearst-black-light border border-white/10 shadow-2xl z-20">
                  <div className="p-4 border-b border-white/5">
                    <div className="text-sm font-medium text-white">{user?.name || 'Utilisateur'}</div>
                    <div className="text-xs text-white/40 mt-1">{user?.email}</div>
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 rounded-md bg-hearst-green/20 text-hearst-green text-xs font-medium capitalize">
                        {user?.role}
                      </span>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Déconnexion
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

