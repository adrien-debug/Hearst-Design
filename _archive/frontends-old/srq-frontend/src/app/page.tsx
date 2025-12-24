'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DashboardLayout from '@/components/DashboardLayout';
import AnimatedCounter from '@/components/AnimatedCounter';
import {
  Bitcoin,
  Activity,
  Server,
  Box,
  Layers,
  Gamepad2,
  TrendingUp,
  Zap,
  ThermometerSun,
  Cpu,
  ArrowRight,
  ChevronRight,
  Play,
  Pause,
  MapPin,
  Shield,
  Globe,
  BarChart3,
  Clock,
  Droplets,
} from 'lucide-react';

// ============================================
// HERO MEDIA CAROUSEL
// ============================================

const heroMedia = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832',
    alt: 'Bitcoin Mining Infrastructure',
    title: 'Strategic Reserve Qatar',
    subtitle: 'Next-Generation Bitcoin Mining Facility'
  },
  {
    type: 'image', 
    src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2765',
    alt: 'High-Performance Computing',
    title: 'Industrial Scale Operations',
    subtitle: '4.37 Exahash Per Second Computing Power'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2940',
    alt: 'Advanced Technology',
    title: 'Hydro-Cooled Excellence',
    subtitle: '30 ANTSPACE HD5 Containers'
  },
];

// ============================================
// PROJECT DATA
// ============================================

const projectKPIs = {
  btcReserve: 220.5,
  btcValue: 21.7, // millions USD
  totalHashrate: 4.37,
  hashrateUnit: 'EH/s',
  totalPower: 52.95,
  powerUnit: 'MW',
  activeMiners: 9166,
  totalMiners: 9240,
  containers: 30,
  uptime: 99.8,
  dailyProduction: 0.847,
  efficiency: 12,
  temperature: 38.5,
  roi: 83.3,
};

const specifications = {
  containerModel: 'ANTSPACE HD5',
  minerModel: 'S21XP Hydro',
  minerHashrate: 473,
  minerPower: 5676,
  minersPerContainer: 308,
  coolingType: 'Hydro Cooling',
  location: 'Qatar',
  gridVoltage: '132 kV',
};

// ============================================
// NAVIGATION CARDS
// ============================================

const navigationCards = [
  {
    id: 'bitcoin-command-center',
    title: 'Bitcoin Command Center',
    description: 'Terminal Bloomberg unifié pour le monitoring de la réserve stratégique Bitcoin',
    icon: Bitcoin,
    route: '/bitcoin-command-center',
    color: '#F7931A',
    stats: [
      { label: 'Reserve', value: '220.5 BTC' },
      { label: 'ROI', value: '+83.3%' },
    ],
  },
  {
    id: 'mining-dashboard',
    title: 'Mining Dashboard',
    description: 'Centre de commande opérationnel avec monitoring temps réel des opérations',
    icon: Activity,
    route: '/mining-dashboard',
    color: '#10B981',
    stats: [
      { label: 'Hashrate', value: '4.37 EH/s' },
      { label: 'Production', value: '0.847 BTC/day' },
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    description: 'Monitoring des systèmes électriques et de refroidissement industriel',
    icon: Server,
    route: '/infrastructure',
    color: '#3B82F6',
    stats: [
      { label: 'Power', value: '52.95 MW' },
      { label: 'Uptime', value: '99.8%' },
    ],
  },
  {
    id: 'gallery',
    title: 'Gallery 3D',
    description: "Bibliothèque d'assets 3D ultra-réalistes pour l'infrastructure",
    icon: Box,
    route: '/gallery',
    color: '#A855F7',
    stats: [
      { label: 'Models', value: '18+' },
      { label: 'Quality', value: '4K Ultra' },
    ],
  },
  {
    id: 'monitoring',
    title: 'Project Monitoring',
    description: 'Gouvernance de projet avec framework Master SOP et 7 phases',
    icon: Layers,
    route: '/monitoring',
    color: '#06B6D4',
    stats: [
      { label: 'Progress', value: '58%' },
      { label: 'Phase', value: 'Industrial' },
    ],
  },
  {
    id: 'unreal-viewer',
    title: 'Unreal Viewer',
    description: 'Visualisation 3D temps réel avec Pixel Streaming Unreal Engine 5',
    icon: Gamepad2,
    route: '/unreal-viewer',
    color: '#EF4444',
    stats: [
      { label: 'Resolution', value: '4K @ 60fps' },
      { label: 'Engine', value: 'UE 5.4' },
    ],
  },
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroMedia.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Update clock
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout showFooter={false}>
      <div className="space-y-0 -m-8">
        
        {/* ========================================
            HERO SECTION - CINEMATIC HEADER
            ======================================== */}
        <section className="relative h-[65vh] min-h-[500px] overflow-hidden">
          {/* Background Media */}
          {heroMedia.map((media, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={media.src}
                alt={media.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
            </div>
          ))}

          {/* Animated Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-12 pb-16">
            <div className="max-w-4xl">
              {/* Top Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6 animate-fade-in">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Live System
                </span>
                <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                  SRQ-001
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-white/90 backdrop-blur-sm">
                  <MapPin className="w-3 h-3" />
                  Qatar
                </span>
              </div>

              {/* Main Title */}
              <h1 
                className="text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight text-white mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span className="block">Strategic</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400">
                  Reserve Qatar
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-white/70 max-w-2xl leading-relaxed mb-8">
                {heroMedia[currentSlide].subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-4">
                <Link
                  href="/bitcoin-command-center"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
                >
                  <Bitcoin className="w-5 h-5" />
                  View Reserve
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/unreal-viewer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 transition-all duration-300 hover:scale-105"
                >
                  <Gamepad2 className="w-5 h-5" />
                  3D Experience
                </Link>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="absolute bottom-12 right-12 flex items-center gap-4">
              {/* Slide Indicators */}
              <div className="flex items-center gap-2">
                {heroMedia.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'w-8 bg-emerald-400' 
                        : 'w-4 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              {/* Play/Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm border border-white/20 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Live Clock Badge */}
          <div className="absolute top-12 right-12 flex items-center gap-3 px-5 py-3 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-white/90 font-mono text-sm tabular-nums">
              {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </span>
            <span className="text-white/50 text-sm">UTC+3</span>
          </div>
        </section>

        {/* ========================================
            LIVE METRICS TICKER BAR
            ======================================== */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-y border-white/5">
          <div className="flex items-center justify-between py-4 px-8">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center border border-orange-500/20">
                  <Bitcoin className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium">BTC Reserve</p>
                  <p className="text-lg font-bold text-white font-mono">
                    <AnimatedCounter value={projectKPIs.btcReserve} decimals={1} suffix=" BTC" />
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center border border-emerald-500/20">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Hashrate</p>
                  <p className="text-lg font-bold text-white font-mono">
                    <AnimatedCounter value={projectKPIs.totalHashrate} decimals={2} suffix=" EH/s" />
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center border border-blue-500/20">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Power Draw</p>
                  <p className="text-lg font-bold text-white font-mono">
                    <AnimatedCounter value={projectKPIs.totalPower} decimals={2} suffix=" MW" />
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center border border-purple-500/20">
                  <Cpu className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Active Miners</p>
                  <p className="text-lg font-bold text-white font-mono">
                    <AnimatedCounter value={projectKPIs.activeMiners} decimals={0} />
                    <span className="text-white/40 text-sm">/{projectKPIs.totalMiners.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold text-sm">+{projectKPIs.roi}% ROI</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <Shield className="w-4 h-4 text-white/60" />
                <span className="text-white/60 font-medium text-sm">{projectKPIs.uptime}% Uptime</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================
            MAIN CONTENT AREA
            ======================================== */}
        <div className="bg-gray-50 p-8 pt-12">
          
          {/* Key Performance Metrics Grid */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Performance Overview
                </h2>
                <p className="text-gray-500 mt-1">Real-time operational metrics</p>
              </div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Live Data
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {/* BTC Reserve Card */}
              <div className="group relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-orange-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <Bitcoin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Bitcoin Reserve</p>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 font-mono tracking-tight">
                    <AnimatedCounter value={projectKPIs.btcReserve} decimals={1} />
                  </p>
                  <p className="text-sm text-gray-500 mt-2">BTC</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-600 font-semibold text-sm">≈ ${projectKPIs.btcValue}M USD</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hashrate Card */}
              <div className="group relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-emerald-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Hashrate</p>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 font-mono tracking-tight">
                    <AnimatedCounter value={projectKPIs.totalHashrate} decimals={2} />
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Exahash / Second</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      <span className="text-gray-700 font-medium">4,369,920</span> TH/s aggregate
                    </p>
                  </div>
                </div>
              </div>

              {/* Power Draw Card */}
              <div className="group relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-blue-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Power Draw</p>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 font-mono tracking-tight">
                    <AnimatedCounter value={projectKPIs.totalPower} decimals={2} />
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Megawatts</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      Grid: <span className="text-gray-700 font-medium">132 kV</span> · 2×55 MVA
                    </p>
                  </div>
                </div>
              </div>

              {/* Daily Production Card */}
              <div className="group relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-cyan-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-100 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Daily Output</p>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 font-mono tracking-tight">
                    <AnimatedCounter value={projectKPIs.dailyProduction} decimals={3} />
                  </p>
                  <p className="text-sm text-gray-500 mt-2">BTC / Day</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      Efficiency: <span className="text-emerald-600 font-semibold">{projectKPIs.efficiency} W/TH</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Infrastructure Specifications */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-slate-700/50">
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Infrastructure Specifications</h3>
                    <p className="text-slate-400 mt-1">Industrial-grade mining hardware configuration</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 text-sm font-medium">Qatar</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Container Spec */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                      <Server className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="text-3xl font-bold text-white font-mono">{specifications.containerModel.split(' ')[1]}</p>
                    <p className="text-sm text-slate-400 mt-1">ANTSPACE Container</p>
                    <p className="text-xs text-slate-500 mt-3">{projectKPIs.containers} units deployed</p>
                  </div>

                  {/* Miner Spec */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                      <Cpu className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-3xl font-bold text-white font-mono">{specifications.minerModel.split(' ')[0]}</p>
                    <p className="text-sm text-slate-400 mt-1">XP Hydro Miner</p>
                    <p className="text-xs text-slate-500 mt-3">{projectKPIs.totalMiners.toLocaleString()} total units</p>
                  </div>

                  {/* Hashrate per Unit */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                      <Activity className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-3xl font-bold text-white font-mono">{specifications.minerHashrate}</p>
                    <p className="text-sm text-slate-400 mt-1">TH/s per miner</p>
                    <p className="text-xs text-slate-500 mt-3">{specifications.minerPower.toLocaleString()} W power</p>
                  </div>

                  {/* Cooling */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                      <Droplets className="w-5 h-5 text-cyan-400" />
                    </div>
                    <p className="text-3xl font-bold text-white font-mono">Hydro</p>
                    <p className="text-sm text-slate-400 mt-1">Cooling System</p>
                    <p className="text-xs text-slate-500 mt-3">Avg. {projectKPIs.temperature}°C</p>
                  </div>
                </div>

                {/* Container Fleet Visualization */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-slate-400">Container Fleet Status</p>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-emerald-400" />
                        <span className="text-slate-400">Optimal (28)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-amber-400" />
                        <span className="text-slate-400">Warning (1)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-slate-600" />
                        <span className="text-slate-400">Maintenance (1)</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-15 gap-2">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer ${
                          i === 15 
                            ? 'bg-amber-400 shadow-lg shadow-amber-400/30' 
                            : i === 22 
                              ? 'bg-slate-600' 
                              : 'bg-emerald-400 shadow-sm'
                        }`}
                        title={`Container ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Cards */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Dashboard Navigation
                </h2>
                <p className="text-gray-500 mt-1">Access all monitoring modules</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {navigationCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.id}
                    href={card.route}
                    className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Hover Gradient */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${card.color}08 0%, transparent 60%)`
                      }}
                    />

                    <div className="relative p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                          style={{
                            background: `linear-gradient(135deg, ${card.color}20 0%, ${card.color}10 100%)`,
                            border: `1px solid ${card.color}30`,
                          }}
                        >
                          <Icon className="w-7 h-7" style={{ color: card.color }} />
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300 tracking-tight">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                        {card.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                        {card.stats.map((stat, idx) => (
                          <div key={idx}>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                              {stat.label}
                            </p>
                            <p
                              className="text-base font-bold font-mono tracking-tight"
                              style={{ color: card.color }}
                            >
                              {stat.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Footer Stats */}
          <section className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-center gap-16 py-10 px-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900 font-mono mb-1">
                  <AnimatedCounter value={projectKPIs.totalHashrate} decimals={2} />
                </p>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  Total Hashrate (EH/s)
                </p>
              </div>
              <div className="h-12 w-px bg-gray-100" />
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900 font-mono mb-1">
                  <AnimatedCounter value={projectKPIs.efficiency} decimals={0} />
                </p>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  Efficiency (W/TH)
                </p>
              </div>
              <div className="h-12 w-px bg-gray-100" />
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900 font-mono mb-1">
                  {projectKPIs.containers}
                </p>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  Active Containers
                </p>
              </div>
              <div className="h-12 w-px bg-gray-100" />
              <div className="text-center">
                <p className="text-4xl font-bold text-emerald-600 font-mono mb-1">
                  {projectKPIs.uptime}%
                </p>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  System Uptime
                </p>
              </div>
            </div>
          </section>

          {/* Project Footer */}
          <div className="text-center text-gray-400 text-xs pt-10 pb-4">
            <p>Strategic Reserve Qatar · SRQ-001 · © 2025 Hearst Mining</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
