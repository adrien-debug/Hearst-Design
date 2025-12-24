'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import { HashrateChart, PowerChart, TemperatureChart } from '@/components/Charts';
import { metricsAPI } from '@/lib/api';

// Données de démonstration pour les graphiques
const generateMockChartData = () => {
  const now = new Date();
  const data = [];
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    data.push({
      time: time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      hashrate: 4200000 + Math.random() * 400000,
      power: 48000 + Math.random() * 8000,
      temperature: 38 + Math.random() * 6,
    });
  }
  return data;
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
    setChartData(generateMockChartData());
    
    // Refresh every 30 seconds
    const interval = setInterval(() => {
      loadDashboardData();
      setChartData(generateMockChartData());
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsRes] = await Promise.all([
        metricsAPI.getStats(),
      ]);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      // Données par défaut basées sur PROJECT_INFO
      setStats({
        containers: { total: 30, operational: 28 },
        miners: { total: 9240, online: 9100, totalHashrate: 4369920, totalPower: 52447040 },
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-hearst-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-grey-500 text-sm">Chargement des données...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Vue d'ensemble</h2>
            <p className="text-grey-500 text-sm mt-1">
              Dernière mise à jour : {new Date().toLocaleTimeString('fr-FR')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-success">
              <span className="w-2 h-2 bg-hearst-green rounded-full animate-pulse-green" />
              Système opérationnel
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Containers"
            value={stats?.containers?.total || 30}
            subtitle={`${stats?.containers?.operational || 28} opérationnels`}
            highlight
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            }
          />
          
          <StatCard
            label="Miners"
            value={(stats?.miners?.total || 9240).toLocaleString()}
            subtitle={`${(stats?.miners?.online || 9100).toLocaleString()} en ligne`}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            }
          />
          
          <StatCard
            label="Hashrate Total"
            value={`${((stats?.miners?.totalHashrate || 4369920) / 1000000).toFixed(2)} EH/s`}
            subtitle={`${((stats?.miners?.totalHashrate || 4369920)).toLocaleString()} TH/s`}
            highlight
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
          
          <StatCard
            label="Puissance Totale"
            value={`${((stats?.miners?.totalPower || 52447040) / 1000000).toFixed(2)} MW`}
            subtitle={`${((stats?.miners?.totalPower || 52447040) / 1000).toLocaleString()} kW`}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HashrateChart 
            data={chartData} 
            dataKey="hashrate"
            title="Hashrate (24h)"
            subtitle="Performance de minage sur les dernières 24 heures"
          />
          <PowerChart 
            data={chartData} 
            dataKey="power"
            title="Consommation (24h)"
            subtitle="Puissance électrique consommée"
          />
        </div>

        {/* Project Specs */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Spécifications du Projet</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-dark-600 rounded-xl">
              <p className="stat-label">Modèle Container</p>
              <p className="text-white font-medium mt-1">ANTSPACE HD5</p>
            </div>
            <div className="p-4 bg-dark-600 rounded-xl">
              <p className="stat-label">Miners par Container</p>
              <p className="text-white font-medium mt-1">308 unités</p>
            </div>
            <div className="p-4 bg-dark-600 rounded-xl">
              <p className="stat-label">Modèle Miner</p>
              <p className="text-white font-medium mt-1">S21XP Hydro</p>
            </div>
            <div className="p-4 bg-dark-600 rounded-xl">
              <p className="stat-label">Hashrate Unitaire</p>
              <p className="text-white font-medium mt-1">473 TH/s</p>
            </div>
            <div className="p-4 bg-dark-600 rounded-xl">
              <p className="stat-label">Puissance Unitaire</p>
              <p className="text-white font-medium mt-1">5,676 W</p>
            </div>
            <div className="p-4 bg-dark-600 rounded-xl">
              <p className="stat-label">Efficacité</p>
              <p className="text-white font-medium mt-1">12 W/TH</p>
            </div>
            <div className="p-4 bg-dark-600 rounded-xl">
              <p className="stat-label">Refroidissement</p>
              <p className="text-white font-medium mt-1">Hydro Cooling</p>
            </div>
            <div className="p-4 bg-dark-600 rounded-xl">
              <p className="stat-label">Localisation</p>
              <p className="text-white font-medium mt-1">Qatar</p>
            </div>
          </div>
        </div>

        {/* Temperature Chart */}
        <TemperatureChart 
          data={chartData} 
          dataKey="temperature"
          title="Température Moyenne"
          subtitle="Évolution de la température des containers"
        />

        {/* Footer */}
        <div className="text-center text-grey-500 text-xs pt-4 border-t border-grey-100">
          <p>Strategic Reserve Qatar · SRQ-001 · © 2025 Hearst Mining</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
