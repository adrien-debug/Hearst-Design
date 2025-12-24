// Types TypeScript pour Hearst Control Frontend

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'manager' | 'operator' | 'viewer';
  tenant_id: string;
  tenant?: Tenant;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: 'active' | 'maintenance' | 'offline';
  icon: string;
  color: string;
  baseUrl: string;
  apiUrl: string;
  port: number;
  tenant_id: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectStats {
  servers: number;
  serversOnline: number;
  pages: number;
  conflicts: number;
  uptime: number; // en secondes
  lastActivity?: string;
}

export interface ProjectConfig {
  id: string;
  name: string;
  slug: string;
  color: string;
  baseUrl: string;
  apiUrl: string;
  pages: {
    category: string;
    items: { path: string; label: string; icon: string }[];
  }[];
}

export interface ServerInfo {
  id: string;
  name: string;
  port: number;
  status: 'running' | 'stopped' | 'unknown';
  pid?: number;
  description: string;
}

export interface ConflictLog {
  id: string;
  type: string;
  message: string;
  sessions: string[];
  timestamp: number;
}

export interface MetricsData {
  totalPageViews: number;
  totalSessions: number;
  activeSessions: number;
  totalConflicts: number;
  mostVisitedPages: { page: string; count: number }[];
  uptime: number;
}

export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

