'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface DashboardLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  footerVariant?: 'light' | 'dark';
}

export default function DashboardLayout({ 
  children, 
  showFooter = true,
  footerVariant = 'light'
}: DashboardLayoutProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          {/* Modern Loading Animation */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            {/* Outer ring */}
            <div className="absolute inset-0 border-2 border-gray-200 rounded-full" />
            {/* Spinning ring */}
            <div className="absolute inset-0 border-2 border-transparent border-t-emerald-500 rounded-full animate-spin" />
            {/* Inner glow */}
            <div className="absolute inset-4 bg-emerald-50 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-8 h-8">
                <path
                  d="M20 10 L20 90 L35 90 L35 55 L45 45 L65 65 L65 10 L80 10 L80 90 L65 90 L65 75 L55 65 L35 45 L35 10 Z"
                  fill="#10B981"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>
          <p className="text-gray-700 text-sm font-medium">
            Initializing Hearst Systems...
          </p>
          <p className="text-gray-500 text-xs mt-1">
            SRQ-001 · Strategic Reserve Qatar
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Main Content Area */}
      <div 
        className={`
          flex flex-col min-h-screen transition-all duration-300 ease-out
          ${sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'}
        `}
      >
        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>

        {/* Footer */}
        {showFooter && <Footer variant={footerVariant} />}
      </div>
    </div>
  );
}
