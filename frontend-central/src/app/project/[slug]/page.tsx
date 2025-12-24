'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { isAuthenticated } from '@/lib/auth';
import type { Project, ProjectConfig } from '@/types';

export default function ProjectMonitorPage() {
  const router = useRouter();
  const params = useParams();
  const projectSlug = params.slug as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'servers'>('overview');
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;

    // Vérifier l'authentification
    if (!isAuthenticated()) {
      router.replace('/login');
      return;
    }

    // Clock
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    const fetchProject = async () => {
      try {
        const response: any = await apiClient.getProject(projectSlug);
        if (cancelled) return;
        if (response.project) {
          setProject(response.project);
        }
      } catch (error) {
        if (cancelled) return;
        console.error('Error fetching project:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProject();

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [projectSlug, router]);

  const handleBack = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-hearst-green to-hearst-green-dark p-3 shadow-glow-green animate-pulse">
            <svg className="w-full h-full text-hearst-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>
          <p className="text-white/60">Chargement du projet...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white/60 mb-2">Projet non trouvé</h3>
          <p className="text-white/40 mb-6">Le projet demandé n'existe pas ou vous n'y avez pas accès</p>
          <button onClick={handleBack} className="btn-primary">
            Retour au dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl bg-hearst-black/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Back Button */}
              <button
                onClick={handleBack}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Logo & Title */}
              <div
                className="w-12 h-12 rounded-xl p-2.5 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${project.color || '#8AFD81'}, ${
                    project.color || '#8AFD81'
                  }99)`,
                  boxShadow: `0 0 40px ${project.color || '#8AFD81'}66`,
                }}
              >
                <div className="text-2xl">{project.icon || '📦'}</div>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-wide">{project.name}</h1>
                <p className="text-xs text-white/40 font-mono">
                  {currentTime?.toLocaleString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor:
                    project.status === 'active'
                      ? '#8AFD81'
                      : project.status === 'maintenance'
                      ? '#F59E0B'
                      : '#EF4444',
                }}
              />
              <span className="text-sm font-medium capitalize">{project.status}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/5">
          {[
            { value: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
            { value: 'pages', label: 'Pages', icon: '📄' },
            { value: 'servers', label: 'Serveurs', icon: '🖥️' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value as typeof activeTab)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all ${
                activeTab === tab.value
                  ? 'border-hearst-green text-hearst-green'
                  : 'border-transparent text-white/40 hover:text-white/60'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="card-base p-8">
              <h2 className="text-2xl font-bold mb-6">Vue d'ensemble</h2>
              <div className="space-y-4">
                <InfoRow label="Nom" value={project.name} />
                <InfoRow label="Description" value={project.description} />
                <InfoRow label="Status" value={project.status} />
                <InfoRow label="URL" value={project.baseUrl} />
                <InfoRow label="Port" value={project.port.toString()} />
              </div>
              <div className="mt-8 p-4 rounded-xl bg-hearst-green/10 border border-hearst-green/20">
                <p className="text-sm text-hearst-green">
                  ✨ Le monitoring avancé (pages, serveurs, métriques) sera connecté aux APIs spécifiques du projet.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'pages' && (
            <div className="card-base p-8">
              <h2 className="text-2xl font-bold mb-4">Pages du projet</h2>
              <p className="text-white/40 mb-6">Liste des pages disponibles dans {project.name}</p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center text-white/40">
                Connexion à l'API du projet en cours...
              </div>
            </div>
          )}

          {activeTab === 'servers' && (
            <div className="card-base p-8">
              <h2 className="text-2xl font-bold mb-4">Serveurs</h2>
              <p className="text-white/40 mb-6">État des serveurs de {project.name}</p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center text-white/40">
                Connexion à l'API du projet en cours...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5">
      <span className="text-white/40">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

