'use client';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  highlight?: boolean;
}

export default function StatCard({ 
  label, 
  value, 
  subtitle, 
  icon,
  trend,
  highlight = false 
}: StatCardProps) {
  return (
    <div className="card group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="stat-label">{label}</p>
          <p className={`stat-value mt-2 ${highlight ? 'stat-value-green' : ''}`}>
            {value}
          </p>
          {subtitle && (
            <p className="stat-subtitle mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              trend.isPositive ? 'text-hearst-green' : 'text-error'
            }`}>
              {trend.isPositive ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              <span className="font-medium">{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 bg-dark-600 rounded-xl flex items-center justify-center text-hearst-green group-hover:bg-hearst-green group-hover:text-black transition-all duration-normal">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

