'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { getUser, isAuthenticated, removeToken } from '@/lib/auth';
import { ProjectCard } from './components/ProjectCard';
import { DashboardHeader } from './components/DashboardHeader';
import type { Project, ProjectStats } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<(Project & { stats?: ProjectStats })[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'offline'>('all');
  const user = getUser();

  useEffect(() => {
    let cancelled = false;

    // Récupérer le token depuis l'URL si présent (cross-origin depuis login)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get('token');
      const userFromUrl = urlParams.get('user');
      
      if (tokenFromUrl) {
        localStorage.setItem('hearst_token', tokenFromUrl);
        if (userFromUrl) {
          localStorage.setItem('hearst_user', decodeURIComponent(userFromUrl));
        }
        // Nettoyer l'URL
        window.history.replaceState({}, '', '/dashboard');
      }
    }

    // Vérifier l'authentification
    if (!isAuthenticated()) {
      router.replace('/login');
      return;
    }

    const fetchProjects = async () => {
      try {
        const response: any = await apiClient.getProjects();

        if (cancelled) return;

        if (response.projects) {
          // Fetch stats pour chaque projet
          const projectsWithStats = await Promise.all(
            response.projects.map(async (project: Project) => {
              try {
                const statsResponse: any = await apiClient.getProjectStats(project.id);
                return {
                  ...project,
                  stats: statsResponse.stats || getDefaultStats(),
                };
              } catch (err) {
                return {
                  ...project,
                  stats: getDefaultStats(),
                };
              }
            })
          );

          if (cancelled) return;

          setProjects(projectsWithStats);
        }
      } catch (error: any) {
        if (cancelled) return;

        console.error('Error fetching projects:', error);

        // Si erreur d'auth, rediriger vers login
        if (error.message.includes('401') || error.message.includes('token')) {
          removeToken();
          router.replace('/login');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProjects();

    // Polling toutes les 30 secondes (augmenté pour éviter le rate limiting)
    const interval = setInterval(() => {
      fetchProjects();
    }, 30000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [router]);

  const getDefaultStats = (): ProjectStats => ({
    servers: 0,
    serversOnline: 0,
    pages: 0,
    conflicts: 0,
    uptime: 0,
  });

  const handleProjectClick = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };

  const handleLogout = () => {
    removeToken();
    router.replace('/login');
  };

  const filteredProjects = projects.filter((p) =>
    filter === 'all' ? true : p.status === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-hearst-green to-hearst-green-dark p-3 shadow-glow-green animate-pulse">
            <svg className="w-full h-full text-hearst-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>
          <p className="text-white/60">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <DashboardHeader user={user} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-wide mb-2">HEARST CONTROL</h1>
          <p className="text-white/40">Sélectionnez un projet pour accéder au monitoring</p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-10">
          {[
            { value: 'all', label: 'Tous les projets' },
            { value: 'active', label: 'Actifs' },
            { value: 'offline', label: 'Hors ligne' },
          ].map((filterOption) => {
            const count = projects.filter((p) =>
              filterOption.value === 'all' ? true : p.status === filterOption.value
            ).length;

            return (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value as typeof filter)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  filter === filterOption.value
                    ? 'bg-hearst-green text-hearst-black'
                    : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {filterOption.label}
                {count > 0 && (
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-md text-xs ${
                      filter === filterOption.value
                        ? 'bg-hearst-black/20 text-hearst-black'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/5 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white/60 mb-2">Aucun projet trouvé</h3>
            <p className="text-white/40">
              {filter === 'all'
                ? "Vous n'avez accès à aucun projet pour le moment"
                : `Aucun projet ${filter === 'active' ? 'actif' : 'hors ligne'}`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                stats={project.stats}
                onClick={() => handleProjectClick(project.slug || project.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

