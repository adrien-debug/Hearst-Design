'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Activity,
  Zap,
  TrendingUp,
  Server,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MinusCircle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

// Données mock pour Hashrate Evolution (30 jours)
const mockHashrateHistory = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  hashrate: 850000 + Math.random() * 100000,
}));

// Données mock pour BTC Accumulation (90 jours)
const mockReserveHistory = Array.from({ length: 90 }, (_, i) => ({
  date: `Day ${i + 1}`,
  btc: 180 + (i * 0.45) + Math.random() * 2,
}));

// Données mock pour Daily Production (30 jours)
const mockProductionHistory = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  btc: 1.2 + Math.random() * 0.3,
}));

// Données mock pour Container Performance (48 containers, 6 Power Blocks de 8)
const mockContainerPerformance = Array.from({ length: 48 }, (_, i) => {
  const statuses = ['optimal', 'optimal', 'optimal', 'optimal', 'optimal', 'warning', 'optimal', 'critical'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    id: `C-${String(i + 1).padStart(2, '0')}`,
    powerBlock: String.fromCharCode(65 + Math.floor(i / 8)), // A-F
    status: i === 15 ? 'warning' : i === 31 ? 'critical' : i === 47 ? 'offline' : 'optimal',
    performance: i === 47 ? 0 : 85 + Math.random() * 15,
    temperature: i === 47 ? 0 : 35 + Math.random() * 10,
    hashrate: i === 47 ? 0 : 145 + Math.random() * 10,
  };
});

export default function MiningDashboard() {
  const [timeFilter, setTimeFilter] = useState('30d');

  // KPIs principaux
  const kpis = {
    fleetStatus: 99.2,
    activeMiners: 9169,
    maintenanceMiners: 71,
    totalMiners: 9240,
    totalHashrate: 925.4,
    targetHashrate: 1000,
    efficiency: 12.2,
    dailyProduction: 1.45,
    productionChange: 2.1,
    dailyRevenue: 142.8,
    monthlyProduction: 43.5,
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-700 border border-grey-100 rounded-lg p-3 shadow-xl">
          <p className="text-grey-400 text-xs mb-1">{label}</p>
          <p className="text-white font-mono text-sm font-bold">
            {typeof payload[0].value === 'number' ? payload[0].value.toLocaleString() : payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  // Comptage des statuts des containers
  const statusCount = mockContainerPerformance.reduce((acc, container) => {
    acc[container.status] = (acc[container.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-hearst-green/10 border border-hearst-green/30 rounded-lg">
                <Activity className="w-4 h-4 text-hearst-green" />
                <span className="text-xs font-semibold text-hearst-green uppercase tracking-wide">Operations</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-600 border border-grey-100 rounded-lg">
                <span className="text-xs font-semibold text-grey-400 uppercase tracking-wide">Real-time Analytics</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-dark-600 border border-grey-100 rounded">
                <div className="w-2 h-2 rounded-full bg-hearst-green animate-pulse-green" />
                <span className="text-xs font-medium text-grey-400 uppercase tracking-wide">Live</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Mining Command Center</h1>
            <p className="text-grey-400 text-sm">
              Centre de commande opérationnel - Monitoring temps réel des opérations de mining
            </p>
          </div>

          {/* Filtres temps */}
          <div className="flex items-center gap-2">
            {['7d', '30d', '90d'].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-wide transition-all duration-normal ${
                  timeFilter === filter
                    ? 'bg-hearst-green text-black'
                    : 'bg-dark-600 text-grey-400 hover:bg-dark-500'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* KPIs principaux (3 cartes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fleet Status */}
          <div className="bg-dark-700 border border-grey-100 rounded-xl p-6 hover:border-hearst-green/30 transition-all duration-normal">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-grey-400 text-xs font-medium uppercase tracking-wide mb-1">Fleet Status</p>
                <p className="text-3xl font-bold text-white font-mono">{kpis.fleetStatus}%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-hearst-green/10 flex items-center justify-center">
                <Server className="w-5 h-5 text-hearst-green" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-hearst-green animate-pulse-green" />
              <span className="text-grey-400 text-xs uppercase tracking-wide">Live</span>
            </div>
            {/* Barre de progression */}
            <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-hearst-green rounded-full transition-all duration-slow"
                style={{ width: `${kpis.fleetStatus}%` }}
              />
            </div>
            {/* Détails */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-grey-100">
              <div>
                <p className="text-xs text-grey-400 mb-0.5">Active</p>
                <p className="text-sm font-bold text-hearst-green">{kpis.activeMiners.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-grey-400 mb-0.5">Maintenance</p>
                <p className="text-sm font-bold text-warning">{kpis.maintenanceMiners}</p>
              </div>
              <div>
                <p className="text-xs text-grey-400 mb-0.5">Total</p>
                <p className="text-sm font-bold text-white">{kpis.totalMiners.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Total Hashrate */}
          <div className="bg-dark-700 border border-grey-100 rounded-xl p-6 hover:border-hearst-green/30 transition-all duration-normal">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-grey-400 text-xs font-medium uppercase tracking-wide mb-1">Total Hashrate</p>
                <p className="text-3xl font-bold text-white font-mono">{kpis.totalHashrate} PH/s</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-hearst-green/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-hearst-green" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-grey-400 text-xs uppercase tracking-wide">Optimal</span>
            </div>
            {/* Mini chart */}
            <div className="mb-3">
              <div className="flex gap-1">
                {Array.from({ length: 15 }, (_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-hearst-green/20 rounded"
                    style={{ height: `${45 + Math.random() * 40}%` }}
                  />
                ))}
              </div>
            </div>
            {/* Détails */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-grey-100">
              <div>
                <p className="text-xs text-grey-400 mb-0.5">Target</p>
                <p className="text-sm font-bold text-white">{kpis.targetHashrate} PH/s</p>
              </div>
              <div>
                <p className="text-xs text-grey-400 mb-0.5">Efficiency</p>
                <p className="text-sm font-bold text-hearst-green">{kpis.efficiency} J/TH</p>
              </div>
            </div>
          </div>

          {/* Daily Production */}
          <div className="bg-dark-700 border border-grey-100 rounded-xl p-6 hover:border-hearst-green/30 transition-all duration-normal">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-grey-400 text-xs font-medium uppercase tracking-wide mb-1">Daily Production</p>
                <p className="text-3xl font-bold text-white font-mono">{kpis.dailyProduction} BTC</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-hearst-green/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-hearst-green" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mb-3">
              <TrendingUp className="w-3 h-3 text-hearst-green" />
              <span className="text-hearst-green text-xs font-semibold">+{kpis.productionChange}%</span>
              <span className="text-grey-400 text-xs">Stable</span>
            </div>
            {/* Area mini chart */}
            <div className="mb-3 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockProductionHistory.slice(-15)} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="miniProdGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8afd81" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8afd81" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="btc"
                    stroke="#8afd81"
                    strokeWidth={2}
                    fill="url(#miniProdGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* Détails */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-grey-100">
              <div>
                <p className="text-xs text-grey-400 mb-0.5">Revenue</p>
                <p className="text-sm font-bold text-white">${kpis.dailyRevenue}k</p>
              </div>
              <div>
                <p className="text-xs text-grey-400 mb-0.5">Monthly</p>
                <p className="text-sm font-bold text-white">{kpis.monthlyProduction} BTC</p>
              </div>
            </div>
          </div>
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hashrate Evolution */}
          <div className="lg:col-span-2 bg-dark-700 border border-grey-100 rounded-xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Hashrate Evolution</h3>
                <p className="text-sm text-grey-400">30 derniers jours</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-dark-600 border border-grey-100 rounded">
                  <div className="w-2 h-2 rounded-full bg-hearst-green animate-pulse-green" />
                  <span className="text-xs font-medium text-grey-400 uppercase tracking-wide">Live</span>
                </div>
                <div className="px-3 py-1 bg-dark-600 rounded-lg">
                  <p className="text-xs text-grey-400">Current</p>
                  <p className="text-sm font-bold text-white font-mono">{kpis.totalHashrate} PH/s</p>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={380}>
              <AreaChart data={mockHashrateHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="hashrateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8afd81" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8afd81" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#666666"
                  tick={{ fill: '#666666', fontSize: 11 }}
                  axisLine={{ stroke: '#2a2a2a' }}
                />
                <YAxis
                  stroke="#666666"
                  tick={{ fill: '#666666', fontSize: 11 }}
                  axisLine={{ stroke: '#2a2a2a' }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  y={900000}
                  stroke="#666666"
                  strokeDasharray="3 3"
                  label={{ value: 'Avg', fill: '#666666', fontSize: 11 }}
                />
                <Area
                  type="monotone"
                  dataKey="hashrate"
                  stroke="#8afd81"
                  strokeWidth={2}
                  fill="url(#hashrateGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* BTC Accumulation */}
          <div className="bg-dark-700 border border-grey-100 rounded-xl p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-1">BTC Accumulation</h3>
              <p className="text-sm text-grey-400">90 derniers jours</p>
              <div className="mt-3 px-3 py-2 bg-dark-600 rounded-lg">
                <p className="text-xs text-grey-400 mb-0.5">Total</p>
                <p className="text-xl font-bold text-white font-mono">
                  {mockReserveHistory[mockReserveHistory.length - 1].btc.toFixed(1)} BTC
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={mockReserveHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="reserveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8afd81" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8afd81" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis hide />
                <YAxis
                  stroke="#666666"
                  tick={{ fill: '#666666', fontSize: 11 }}
                  axisLine={{ stroke: '#2a2a2a' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  y={210}
                  stroke="#666666"
                  strokeDasharray="3 3"
                  label={{ value: 'Avg', fill: '#666666', fontSize: 11 }}
                />
                <Area
                  type="monotone"
                  dataKey="btc"
                  stroke="#8afd81"
                  strokeWidth={2}
                  fill="url(#reserveGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Production Chart */}
        <div className="bg-dark-700 border border-grey-100 rounded-xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Daily Production</h3>
              <p className="text-sm text-grey-400">30 derniers jours</p>
            </div>
            <div className="px-3 py-1 bg-dark-600 rounded-lg">
              <p className="text-xs text-grey-400">Average</p>
              <p className="text-sm font-bold text-white font-mono">
                {(mockProductionHistory.reduce((sum, d) => sum + d.btc, 0) / mockProductionHistory.length).toFixed(3)}{' '}
                BTC
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={mockProductionHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8afd81" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8afd81" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#666666"
                tick={{ fill: '#666666', fontSize: 11 }}
                axisLine={{ stroke: '#2a2a2a' }}
              />
              <YAxis
                stroke="#666666"
                tick={{ fill: '#666666', fontSize: 11 }}
                axisLine={{ stroke: '#2a2a2a' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                y={1.35}
                stroke="#666666"
                strokeDasharray="3 3"
                label={{ value: 'Avg', fill: '#666666', fontSize: 11 }}
              />
              <Area
                type="monotone"
                dataKey="btc"
                stroke="#8afd81"
                strokeWidth={2}
                fill="url(#productionGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Infrastructure Heatmap - Container Status */}
        <div className="bg-dark-700 border border-grey-100 rounded-xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Container Status</h3>
              <p className="text-sm text-grey-400">
                Statut en temps réel des 48 conteneurs Hydro organisés par Power Block
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-dark-600 border border-grey-100 rounded">
                <div className="w-2 h-2 rounded-full bg-hearst-green animate-pulse-green" />
                <span className="text-xs font-medium text-grey-400 uppercase tracking-wide">Live Monitoring</span>
              </div>
            </div>
          </div>

          {/* Légende */}
          <div className="flex items-center gap-6 mb-6 p-4 bg-dark-600 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-hearst-green" />
              <span className="text-xs text-grey-400">
                Optimal <span className="text-white font-semibold">({statusCount.optimal || 0})</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-xs text-grey-400">
                Warning <span className="text-white font-semibold">({statusCount.warning || 0})</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-error" />
              <span className="text-xs text-grey-400">
                Critical <span className="text-white font-semibold">({statusCount.critical || 0})</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MinusCircle className="w-4 h-4 text-grey-400" />
              <span className="text-xs text-grey-400">
                Offline <span className="text-white font-semibold">({statusCount.offline || 0})</span>
              </span>
            </div>
          </div>

          {/* Grille des 6 Power Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['A', 'B', 'C', 'D', 'E', 'F'].map((block) => {
              const containers = mockContainerPerformance.filter((c) => c.powerBlock === block);
              return (
                <div key={block} className="bg-dark-600 border border-grey-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-white">Power Block {block}</h4>
                    <span className="text-xs text-grey-400">{containers.length} unités</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {containers.map((container) => {
                      const statusColors = {
                        optimal: 'bg-hearst-green hover:bg-hearst-green-dark',
                        warning: 'bg-warning hover:bg-warning/80',
                        critical: 'bg-error hover:bg-error/80',
                        offline: 'bg-grey-300 hover:bg-grey-200',
                      };

                      return (
                        <div
                          key={container.id}
                          className={`
                            aspect-square rounded-lg flex items-center justify-center
                            ${statusColors[container.status as keyof typeof statusColors]}
                            cursor-pointer transition-all duration-normal
                            hover:scale-110 hover:shadow-lg
                            group relative
                          `}
                          title={`${container.id} - ${container.status}`}
                        >
                          <span className="text-[10px] font-bold text-black/70 group-hover:text-black">
                            {container.id.split('-')[1]}
                          </span>
                          {/* Tooltip on hover */}
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-fast pointer-events-none z-10">
                            <div className="bg-dark-700 border border-grey-100 rounded-lg p-2 whitespace-nowrap shadow-xl">
                              <p className="text-xs font-bold text-white mb-1">{container.id}</p>
                              <p className="text-[10px] text-grey-400">
                                {container.status === 'optimal' && 'Fonctionnement optimal'}
                                {container.status === 'warning' && 'Performance dégradée'}
                                {container.status === 'critical' && 'Performance critique'}
                                {container.status === 'offline' && 'Hors ligne'}
                              </p>
                              {container.status !== 'offline' && (
                                <p className="text-[10px] text-grey-400 mt-1">
                                  {container.performance.toFixed(1)}% • {container.temperature.toFixed(1)}°C
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
