import { formatUptime, formatRelativeTime, getStatusColor } from '@/lib/utils';
import type { Project, ProjectStats } from '@/types';

interface ProjectCardProps {
  project: Project;
  stats?: ProjectStats;
  onClick: () => void;
}

export function ProjectCard({ project, stats, onClick }: ProjectCardProps) {
  const statusColor = getStatusColor(project.status);

  const getProjectIcon = (name: string) => {
    if (name.toLowerCase().includes('qatar')) return '🏜️';
    if (name.toLowerCase().includes('design')) return '🎨';
    if (name.toLowerCase().includes('reserve') || name.toLowerCase().includes('srq')) return '🛡️';
    return '📦';
  };

  return (
    <button
      onClick={onClick}
      className="group relative p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-hearst-green/30 transition-all duration-300 text-left"
      style={{
        boxShadow: project.status === 'active' ? `0 0 30px ${statusColor}15` : 'none',
      }}
    >
      {/* Status Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: statusColor }}
        />
        <span className="text-xs text-white/40 capitalize">{project.status}</span>
      </div>

      {/* Icon & Title */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
          style={{
            backgroundColor: `${project.color || statusColor}15`,
            color: project.color || statusColor,
          }}
        >
          {project.icon || getProjectIcon(project.name)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white group-hover:text-hearst-green transition-colors truncate">
            {project.name}
          </h3>
          <p className="text-sm text-white/40 line-clamp-2">{project.description}</p>
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <StatBox
            label="Serveurs"
            value={`${stats.serversOnline}/${stats.servers}`}
            color={stats.serversOnline === stats.servers ? '#8AFD81' : '#F59E0B'}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                />
              </svg>
            }
          />
          <StatBox
            label="Pages"
            value={stats.pages}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            }
          />
          <StatBox
            label="Conflits"
            value={stats.conflicts}
            color={stats.conflicts > 0 ? '#EF4444' : '#8AFD81'}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            }
          />
          <StatBox
            label="Uptime"
            value={formatUptime(stats.uptime || 0)}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
        </div>
      )}

      {/* Last Activity */}
      {stats?.lastActivity && (
        <div className="mt-4 pt-4 border-t border-white/5 text-xs text-white/30">
          Dernière activité: {formatRelativeTime(stats.lastActivity)}
        </div>
      )}

      {/* Hover Arrow */}
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-6 h-6 text-hearst-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </button>
  );
}

function StatBox({
  icon,
  label,
  value,
  color = '#8AFD81',
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
      <div className="flex items-center gap-2 mb-1 text-white/40">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <div className="text-lg font-bold" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

