'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface User {
  name: string;
  role: string;
  email: string;
}

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'super_admin':
      case 'admin':
        return 'badge-success';
      case 'manager':
        return 'badge-info';
      case 'operator':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  };

  return (
    <header className="h-header bg-dark-800 border-b border-grey-100 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          Strategic Reserve Qatar
        </h1>
        <p className="text-xs text-grey-500 mt-0.5">
          Mining Operations Dashboard
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-600 rounded-full">
          <span className="w-2 h-2 bg-hearst-green rounded-full animate-pulse-green" />
          <span className="text-xs text-grey-400">Online</span>
        </div>

        {/* User Info */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <span className={`badge ${getRoleBadgeClass(user.role)}`}>
                {user.role}
              </span>
            </div>
            <div className="w-10 h-10 bg-dark-500 rounded-full flex items-center justify-center border border-grey-100">
              <span className="text-sm font-semibold text-white">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="btn-secondary py-2 px-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:inline">Déconnexion</span>
        </button>
      </div>
    </header>
  );
}

