'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Zap,
  Thermometer,
  Activity,
  TrendingUp,
  Droplets,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

// Données mock pour Power Load Monitoring (24h)
const mockPowerHistory = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}h`,
  total: 75 + Math.random() * 20,
}));

// Données mock pour System Uptime (30 jours)
const mockSystemUptime = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  overall: 99.5 + Math.random() * 0.5,
}));

// Données mock pour Operational Efficiency (30 jours)
const mockEfficiencyHistory = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  pb1: 94 + Math.random() * 4,
  pb2: 94 + Math.random() * 4,
  pb3: 94 + Math.random() * 4,
  pb4: 94 + Math.random() * 4,
}));

// Données mock pour Power Systems (4 Power Blocks)
const mockPowerSystems = [
  { id: 'PB-1', name: 'Power Block 1', currentLoad: 23.5, efficiency: 96.2, temperature: 38.5 },
  { id: 'PB-2', name: 'Power Block 2', currentLoad: 24.1, efficiency: 95.8, temperature: 39.2 },
  { id: 'PB-3', name: 'Power Block 3', currentLoad: 22.8, efficiency: 96.5, temperature: 37.9 },
  { id: 'PB-4', name: 'Power Block 4', currentLoad: 23.9, efficiency: 95.3, temperature: 38.8 },
];

// Données mock pour Cooling Systems (4 systèmes)
const mockCoolingSystems = [
  { id: 'CS-1', name: 'Cooling System 1', flowRate: 245, inputTemp: 45.2, outputTemp: 32.8, efficiency: 97.5 },
  { id: 'CS-2', name: 'Cooling System 2', flowRate: 238, inputTemp: 44.8, outputTemp: 33.2, efficiency: 96.8 },
  { id: 'CS-3', name: 'Cooling System 3', flowRate: 252, inputTemp: 45.5, outputTemp: 32.5, efficiency: 98.1 },
  { id: 'CS-4', name: 'Cooling System 4', flowRate: 241, inputTemp: 45.0, outputTemp: 33.0, efficiency: 97.2 },
];

export default function Infrastructure() {
  const [timeFilter, setTimeFilter] = useState('24h');

  // Calculs KPIs
  const totalLoad = mockPowerSystems.reduce((sum, pb) => sum + pb.currentLoad, 0);
  const avgEfficiency = mockPowerSystems.reduce((sum, pb) => sum + pb.efficiency, 0) / mockPowerSystems.length;
  const avgTemperature = mockPowerSystems.reduce((sum, pb) => sum + pb.temperature, 0) / mockPowerSystems.length;
  const systemUptime = 99.8;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-700 border border-grey-100 rounded-lg p-3 shadow-xl">
          <p className="text-grey-400 text-xs mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-white font-mono text-sm font-bold" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-hearst-green/10 border border-hearst-green/30 rounded-lg">
                <Zap className="w-4 h-4 text-hearst-green" />
                <span className="text-xs font-semibold text-hearst-green uppercase tracking-wide">Infrastructure</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-600 border border-grey-100 rounded-lg">
                <span className="text-xs font-semibold text-grey-400 uppercase tracking-wide">100MW Facility</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-dark-600 border border-grey-100 rounded">
                <div className="w-2 h-2 rounded-full bg-hearst-green animate-pulse-green" />
                <span className="text-xs font-medium text-grey-400 uppercase tracking-wide">Live</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Infrastructure Monitoring</h1>
            <p className="text-grey-400 text-sm">
              Surveillance de l'infrastructure - Systèmes électriques et de refroidissement
            </p>
          </div>

          {/* Filtres temps */}
          <div className="flex items-center gap-2">
            {['24h', '7d', '30d'].map((filter) => (
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

        {/* KPIs principaux (4 cartes) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* System Uptime */}
          <div className="bg-dark-700 border border-grey-100 rounded-xl p-6 hover:border-hearst-green/30 transition-all duration-normal">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-grey-400 text-xs font-medium uppercase tracking-wide mb-1">System Uptime</p>
                <p className="text-3xl font-bold text-white font-mono">{systemUptime}%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-hearst-green/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-hearst-green" />
              </div>
            </div>
            <p className="text-xs text-grey-400 mb-3">Last 30 days</p>
            <div className="flex items-center gap-1.5 mb-3">
              <CheckCircle className="w-3 h-3 text-hearst-green" />
              <span className="text-grey-400 text-xs">Optimal</span>
            </div>
            <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-hearst-green rounded-full transition-all duration-slow"
                style={{ width: `${systemUptime}%` }}
              />
            </div>
          </div>

          {/* Total Load */}
          <div className="bg-dark-700 border border-grey-100 rounded-xl p-6 hover:border-hearst-green/30 transition-all duration-normal">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-grey-400 text-xs font-medium uppercase tracking-wide mb-1">Total Load</p>
                <p className="text-3xl font-bold text-white font-mono">{totalLoad.toFixed(1)} MW</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-hearst-green/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-hearst-green" />
              </div>
            </div>
            <p className="text-xs text-grey-400 mb-3">of 100 MW capacity</p>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-grey-400 text-xs">Power consumption</span>
            </div>
            <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-hearst-green rounded-full transition-all duration-slow"
                style={{ width: `${(totalLoad / 100) * 100}%` }}
              />
            </div>
          </div>

          {/* Efficiency */}
          <div className="bg-dark-700 border border-grey-100 rounded-xl p-6 hover:border-hearst-green/30 transition-all duration-normal">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-grey-400 text-xs font-medium uppercase tracking-wide mb-1">Efficiency</p>
                <p className="text-3xl font-bold text-white font-mono">{avgEfficiency.toFixed(1)}%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-hearst-green/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-hearst-green" />
              </div>
            </div>
            <p className="text-xs text-grey-400 mb-3">Power systems</p>
            <div className="flex items-center gap-1.5 mb-3">
              <CheckCircle className="w-3 h-3 text-hearst-green" />
              <span className="text-grey-400 text-xs">High</span>
            </div>
            <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-hearst-green rounded-full transition-all duration-slow"
                style={{ width: `${avgEfficiency}%` }}
              />
            </div>
          </div>

          {/* Temperature */}
          <div className="bg-dark-700 border border-grey-100 rounded-xl p-6 hover:border-hearst-green/30 transition-all duration-normal">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-grey-400 text-xs font-medium uppercase tracking-wide mb-1">Temperature</p>
                <p className="text-3xl font-bold text-white font-mono">{avgTemperature.toFixed(1)}°C</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-hearst-green/10 flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-hearst-green" />
              </div>
            </div>
            <p className="text-xs text-grey-400 mb-3">Average</p>
            <div className="flex items-center gap-1.5 mb-3">
              <CheckCircle className="w-3 h-3 text-hearst-green" />
              <span className="text-grey-400 text-xs">Normal</span>
            </div>
            <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-hearst-green rounded-full transition-all duration-slow"
                style={{ width: `${(avgTemperature / 50) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Graphiques de monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Power Load Monitoring */}
          <div className="lg:col-span-2 bg-dark-700 border border-grey-100 rounded-xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Power Load Monitoring</h3>
                <p className="text-sm text-grey-400">24 dernières heures</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-dark-600 border border-grey-100 rounded">
                  <div className="w-2 h-2 rounded-full bg-hearst-green animate-pulse-green" />
                  <span className="text-xs font-medium text-grey-400 uppercase tracking-wide">Live</span>
                </div>
                <div className="px-3 py-1 bg-dark-600 rounded-lg">
                  <p className="text-xs text-grey-400">Current Load</p>
                  <p className="text-sm font-bold text-white font-mono">{totalLoad.toFixed(1)} MW</p>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={380}>
              <AreaChart data={mockPowerHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8afd81" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8afd81" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis
                  dataKey="hour"
                  stroke="#666666"
                  tick={{ fill: '#666666', fontSize: 11 }}
                  axisLine={{ stroke: '#2a2a2a' }}
                />
                <YAxis
                  stroke="#666666"
                  tick={{ fill: '#666666', fontSize: 11 }}
                  axisLine={{ stroke: '#2a2a2a' }}
                  label={{ value: 'MW', angle: -90, position: 'insideLeft', fill: '#666666', fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  y={85}
                  stroke="#666666"
                  strokeDasharray="3 3"
                  label={{ value: 'Avg', fill: '#666666', fontSize: 11 }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#8afd81"
                  strokeWidth={2}
                  fill="url(#powerGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* System Uptime Graph */}
          <div className="bg-dark-700 border border-grey-100 rounded-xl p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-1">System Uptime</h3>
              <p className="text-sm text-grey-400">30 derniers jours</p>
              <div className="mt-3 px-3 py-2 bg-dark-600 rounded-lg">
                <p className="text-xs text-grey-400 mb-0.5">Average</p>
                <p className="text-xl font-bold text-white font-mono">{systemUptime}%</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={mockSystemUptime} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1">
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
                  domain={[98, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="overall"
                  stroke="#8afd81"
                  strokeWidth={2}
                  fill="url(#uptimeGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operational Efficiency */}
        <div className="bg-dark-700 border border-grey-100 rounded-xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Operational Efficiency</h3>
              <p className="text-sm text-grey-400">30 derniers jours - Moyenne des 4 Power Blocks</p>
            </div>
            <div className="px-3 py-1 bg-dark-600 rounded-lg">
              <p className="text-xs text-grey-400">Average</p>
              <p className="text-sm font-bold text-white font-mono">{avgEfficiency.toFixed(1)}%</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={mockEfficiencyHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
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
                domain={[90, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="pb1"
                stroke="#8afd81"
                strokeWidth={0}
                fill="url(#efficiencyGradient)"
                fillOpacity={0.8}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* System Status - Power Systems & Cooling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Power Systems */}
          <div className="bg-dark-700 border border-grey-100 rounded-xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Power Systems</h3>
                <p className="text-sm text-grey-400">4 Power Blocks Status</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-hearst-green/10 border border-hearst-green/30 rounded-lg">
                <CheckCircle className="w-3 h-3 text-hearst-green" />
                <span className="text-xs font-semibold text-hearst-green uppercase tracking-wide">All Online</span>
              </div>
            </div>

            <div className="space-y-4">
              {mockPowerSystems.map((system) => (
                <div
                  key={system.id}
                  className="bg-dark-600 border border-grey-100 rounded-lg p-4 hover:border-hearst-green/30 transition-all duration-normal"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-hearst-green animate-pulse-green" />
                      <h4 className="text-sm font-bold text-white">{system.name}</h4>
                    </div>
                    <span className="text-xs text-grey-400 uppercase tracking-wide">{system.id}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-grey-400 mb-1">Load</p>
                      <p className="text-sm font-bold text-white font-mono">{system.currentLoad} MW</p>
                    </div>
                    <div>
                      <p className="text-xs text-grey-400 mb-1">Efficiency</p>
                      <p className="text-sm font-bold text-hearst-green font-mono">{system.efficiency}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-grey-400 mb-1">Temperature</p>
                      <p className="text-sm font-bold text-white font-mono">{system.temperature}°C</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cooling Systems */}
          <div className="bg-dark-700 border border-grey-100 rounded-xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Cooling Systems</h3>
                <p className="text-sm text-grey-400">Hydro Cooling Status</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-hearst-green/10 border border-hearst-green/30 rounded-lg">
                <CheckCircle className="w-3 h-3 text-hearst-green" />
                <span className="text-xs font-semibold text-hearst-green uppercase tracking-wide">Optimal</span>
              </div>
            </div>

            <div className="space-y-4">
              {mockCoolingSystems.map((system) => (
                <div
                  key={system.id}
                  className="bg-dark-600 border border-grey-100 rounded-lg p-4 hover:border-hearst-green/30 transition-all duration-normal"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-hearst-green animate-pulse-green" />
                      <h4 className="text-sm font-bold text-white">{system.name}</h4>
                    </div>
                    <span className="text-xs text-grey-400 uppercase tracking-wide">{system.id}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-grey-400 mb-1">Flow Rate</p>
                      <p className="text-sm font-bold text-white font-mono">{system.flowRate} L/min</p>
                    </div>
                    <div>
                      <p className="text-xs text-grey-400 mb-1">ΔT</p>
                      <p className="text-sm font-bold text-hearst-green font-mono">
                        {(system.inputTemp - system.outputTemp).toFixed(1)}°C
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-grey-400 mb-1">Efficiency</p>
                      <p className="text-sm font-bold text-hearst-green font-mono">{system.efficiency}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
