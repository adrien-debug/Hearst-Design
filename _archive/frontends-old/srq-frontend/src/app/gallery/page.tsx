'use client';

import { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import HeroBubble from '@/components/HeroBubble';
import AnimatedCounter from '@/components/AnimatedCounter';
import LiveTicker from '@/components/LiveTicker';
import { PulseKPI } from '@/components/PulseRing';
import AuroraBackground, { NoiseOverlay } from '@/components/AuroraBackground';
import {
  Sparkles,
  Filter,
  Box,
  Zap,
  Snowflake,
  Shield,
  Layers,
  Grid3X3,
  LayoutGrid,
  Search,
  X,
  Eye,
  Star,
  Download,
  Info,
  ChevronRight,
  Cpu,
  HardDrive,
  Maximize2,
  Play,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Types
interface UnifiedModel {
  id: string;
  name: string;
  category: string;
  description: string;
  dimensions: { length: number; width: number; height: number };
  power?: string;
  capacity?: string;
  tags: string[];
  quality: string;
  featured?: boolean;
  manufacturer?: string;
  polyCount?: string;
  fileSize?: string;
}

// Catalogue enrichi
const UNIFIED_MODEL_CATALOG: UnifiedModel[] = [
  {
    id: 'antspace-hk3-v5-01',
    name: 'Antspace HK3 V5',
    category: 'container',
    description: 'Conteneur de mining hydro-refroidi nouvelle génération avec système de cooling intégré.',
    dimensions: { length: 6.058, width: 2.438, height: 2.896 },
    power: '250kW',
    capacity: '210 miners',
    tags: ['bitmain', 'hydro', 'immersion', 's19'],
    quality: 'ultra-realistic',
    featured: true,
    manufacturer: 'Bitmain',
    polyCount: '2.4M',
    fileSize: '128 MB',
  },
  {
    id: 'transformer-abb-01',
    name: 'ABB Power Transformer',
    category: 'transformer',
    description: 'Transformateur électrique haute capacité pour distribution primaire.',
    dimensions: { length: 3.5, width: 2.2, height: 2.8 },
    power: '3.75MVA',
    tags: ['abb', 'power', 'distribution'],
    quality: 'high',
    featured: true,
    manufacturer: 'ABB',
    polyCount: '1.8M',
    fileSize: '96 MB',
  },
  {
    id: 'cooling-tower-01',
    name: 'Cooling Tower System',
    category: 'cooling',
    description: 'Système de refroidissement industriel pour dissipation thermique optimale.',
    dimensions: { length: 4.0, width: 3.0, height: 5.5 },
    power: '150kW',
    tags: ['cooling', 'hvac', 'industrial'],
    quality: 'high',
    featured: false,
    manufacturer: 'Generic',
    polyCount: '1.2M',
    fileSize: '64 MB',
  },
  {
    id: 'power-block-01',
    name: 'Power Distribution Block',
    category: 'power',
    description: "Bloc de distribution d'alimentation électrique pour infrastructure data center.",
    dimensions: { length: 2.5, width: 1.8, height: 2.2 },
    power: '25MW',
    tags: ['power', 'distribution', 'electrical'],
    quality: 'standard',
    featured: false,
    polyCount: '850K',
    fileSize: '48 MB',
  },
  {
    id: 'switchgear-01',
    name: 'High Voltage Switchgear',
    category: 'distribution',
    description: 'Appareillage de commutation haute tension avec isolation SF6.',
    dimensions: { length: 2.0, width: 1.5, height: 2.5 },
    tags: ['switchgear', 'electrical', 'distribution'],
    quality: 'high',
    featured: false,
    polyCount: '920K',
    fileSize: '52 MB',
  },
  {
    id: 'concrete-ground-01',
    name: 'Concrete Ground Surface',
    category: 'ground',
    description: 'Surface en béton industriel avec joints de dilatation.',
    dimensions: { length: 100, width: 100, height: 0.3 },
    tags: ['ground', 'concrete', 'foundation'],
    quality: 'standard',
    featured: false,
    polyCount: '50K',
    fileSize: '8 MB',
  },
  {
    id: 'fence-security-01',
    name: 'Security Fence System',
    category: 'environment',
    description: 'Système de clôture de sécurité périmétrique avec capteurs intégrés.',
    dimensions: { length: 50, width: 0.1, height: 3.0 },
    tags: ['security', 'fence', 'perimeter'],
    quality: 'standard',
    featured: false,
    polyCount: '120K',
    fileSize: '12 MB',
  },
  {
    id: 'antspace-hk3-v5-02',
    name: 'Antspace HK3 V5 Pro',
    category: 'container',
    description: 'Version améliorée avec monitoring avancé et système IoT intégré.',
    dimensions: { length: 6.058, width: 2.438, height: 2.896 },
    power: '280kW',
    capacity: '210 miners',
    tags: ['bitmain', 'hydro', 'immersion', 'pro'],
    quality: 'ultra-realistic',
    featured: true,
    manufacturer: 'Bitmain',
    polyCount: '2.8M',
    fileSize: '156 MB',
  },
];

// Catégories
const CATEGORIES = [
  { id: 'all', name: 'Tous', icon: Filter, color: '#8afd81' },
  { id: 'container', name: 'Containers', icon: Box, color: '#8afd81' },
  { id: 'transformer', name: 'Transformateurs', icon: Zap, color: '#f59e0b' },
  { id: 'power', name: 'Power Blocks', icon: Zap, color: '#3b82f6' },
  { id: 'cooling', name: 'Refroidissement', icon: Snowflake, color: '#06b6d4' },
  { id: 'distribution', name: 'Distribution', icon: Shield, color: '#a855f7' },
  { id: 'ground', name: 'Sols', icon: Layers, color: '#78716c' },
  { id: 'environment', name: 'Environnement', icon: Layers, color: '#22c55e' },
];

// Niveaux de qualité
const QUALITY_LEVELS = {
  'ultra-realistic': { label: 'Ultra HD', color: '#8afd81', icon: '✦' },
  high: { label: 'High Quality', color: '#3b82f6', icon: '◆' },
  standard: { label: 'Standard', color: '#64748b', icon: '●' },
  basic: { label: 'Basic', color: '#94a3b8', icon: '○' },
};

export default function Gallery() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filtrage
  const filteredModels = useMemo(() => {
    let models = UNIFIED_MODEL_CATALOG;
    if (selectedCategory !== 'all') {
      models = models.filter((m) => m.category === selectedCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      models = models.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query) ||
          m.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    return models;
  }, [searchQuery, selectedCategory]);

  const featuredModels = UNIFIED_MODEL_CATALOG.filter((m) => m.featured);
  
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: UNIFIED_MODEL_CATALOG.length };
    UNIFIED_MODEL_CATALOG.forEach((model) => {
      counts[model.category] = (counts[model.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Stats pour les KPIs animés
  const totalPolys = UNIFIED_MODEL_CATALOG.reduce((acc, m) => {
    const num = parseFloat(m.polyCount?.replace(/[^0-9.]/g, '') || '0');
    const mult = m.polyCount?.includes('M') ? 1000000 : m.polyCount?.includes('K') ? 1000 : 1;
    return acc + num * mult;
  }, 0);

  const totalSize = UNIFIED_MODEL_CATALOG.reduce((acc, m) => {
    return acc + parseFloat(m.fileSize?.replace(/[^0-9.]/g, '') || '0');
  }, 0);

  return (
    <DashboardLayout showFooter={true} footerVariant="light">
      {/* Live Ticker at top */}
      <LiveTicker className="sticky top-0 z-30" />

      <AuroraBackground 
        className="min-h-screen" 
        intensity="low" 
        showGrid={true} 
        showParticles={true}
      >
        <NoiseOverlay opacity={0.015} />
        
        <div className="p-6 lg:p-8 space-y-8">
          
          {/* Hero Section avec Stats Animées */}
          <section className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative overflow-hidden rounded-3xl border border-grey-100/30 bg-gradient-to-br from-dark-700/80 via-dark-800/80 to-dark-900/80 backdrop-blur-xl">
              {/* Gradient orbs */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-hearst-green/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
              
              <div className="relative p-8 lg:p-12">
                {/* Badges */}
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-hearst-green/20 border border-hearst-green/40 rounded-lg animate-glow-pulse-intense">
                    <span className="w-2 h-2 bg-hearst-green rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-hearst-green uppercase tracking-wider">LIVE</span>
                  </div>
                  <div className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/40 rounded-lg">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">3D Library</span>
                  </div>
                  <div className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/40 rounded-lg">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">UE5 Ready</span>
                  </div>
                </div>

                {/* Title with shimmer effect */}
                <h1 className="text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                  <span className="text-white">Galerie de </span>
                  <span className="text-shimmer">Modèles 3D</span>
                </h1>
                
                <p className="text-lg text-grey-400 max-w-2xl mb-10 leading-relaxed">
                  Explorez notre bibliothèque d'assets ultra-réalistes pour l'infrastructure mining. 
                  Chaque modèle est optimisé pour le rendu temps réel Unreal Engine 5.
                </p>

                {/* Animated KPI Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-5 bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-grey-100/20 group hover:border-hearst-green/30 transition-all duration-300">
                    <p className="text-xs font-semibold text-grey-500 uppercase tracking-wider mb-2">Total Assets</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-hearst-green font-mono">
                        <AnimatedCounter value={UNIFIED_MODEL_CATALOG.length} duration={1500} />
                      </span>
                      <span className="text-sm text-grey-500">models</span>
                    </div>
                  </div>

                  <div className="p-5 bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-grey-100/20 group hover:border-purple-500/30 transition-all duration-300">
                    <p className="text-xs font-semibold text-grey-500 uppercase tracking-wider mb-2">Total Polygons</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-purple-400 font-mono">
                        <AnimatedCounter value={totalPolys / 1000000} duration={2000} decimals={1} suffix="M" />
                      </span>
                    </div>
                  </div>

                  <div className="p-5 bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-grey-100/20 group hover:border-blue-500/30 transition-all duration-300">
                    <p className="text-xs font-semibold text-grey-500 uppercase tracking-wider mb-2">Library Size</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-blue-400 font-mono">
                        <AnimatedCounter value={totalSize} duration={1800} decimals={0} suffix=" MB" />
                      </span>
                    </div>
                  </div>

                  <div className="p-5 bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-grey-100/20 group hover:border-cyan-500/30 transition-all duration-300">
                    <p className="text-xs font-semibold text-grey-500 uppercase tracking-wider mb-2">Texture Quality</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-cyan-400 font-mono">4K</span>
                      <span className="text-sm text-grey-500">PBR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Models - Bento Grid */}
          {selectedCategory === 'all' && !searchQuery && featuredModels.length > 0 && (
            <section className={`transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-warning/20 to-orange-500/20 border border-warning/30 animate-breathe">
                    <Star className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Modèles en Vedette</h2>
                    <p className="text-sm text-grey-500">Assets premium du projet SRQ-001</p>
                  </div>
                </div>
                <button className="group flex items-center gap-2 px-4 py-2 text-sm text-grey-400 hover:text-hearst-green transition-colors">
                  Voir tout
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Bento Grid Layout */}
              <div className="grid grid-cols-12 gap-4">
                {/* Main Featured Card - Large */}
                <div className="col-span-12 lg:col-span-6 row-span-2">
                  <FeaturedModelCard model={featuredModels[0]} size="large" index={0} />
                </div>
                
                {/* Secondary Featured Cards */}
                <div className="col-span-6 lg:col-span-3">
                  <FeaturedModelCard model={featuredModels[1]} size="medium" index={1} />
                </div>
                <div className="col-span-6 lg:col-span-3">
                  <FeaturedModelCard model={featuredModels[2]} size="medium" index={2} />
                </div>
                
                {/* Stats Cards */}
                <div className="col-span-6 lg:col-span-3">
                  <div className="h-full p-5 bg-dark-700/50 backdrop-blur-sm rounded-2xl border border-grey-100/30 flex flex-col justify-center">
                    <Cpu className="w-8 h-8 text-hearst-green mb-3" />
                    <p className="text-3xl font-bold text-white font-mono">
                      <AnimatedCounter value={99.8} duration={2500} decimals={1} suffix="%" />
                    </p>
                    <p className="text-xs text-grey-500 uppercase tracking-wider mt-1">UE5 Compatible</p>
                  </div>
                </div>
                <div className="col-span-6 lg:col-span-3">
                  <div className="h-full p-5 bg-gradient-to-br from-hearst-green/10 to-transparent rounded-2xl border border-hearst-green/30 flex flex-col justify-center animate-border-glow">
                    <HardDrive className="w-8 h-8 text-hearst-green mb-3" />
                    <p className="text-3xl font-bold text-hearst-green font-mono">GLB</p>
                    <p className="text-xs text-grey-500 uppercase tracking-wider mt-1">Primary Format</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Search & Filters */}
          <section className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="p-5 bg-dark-700/50 backdrop-blur-xl border border-grey-100/30 rounded-2xl">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-grey-500 group-focus-within:text-hearst-green transition-colors" />
                  <input
                    type="text"
                    placeholder="Rechercher un modèle, tag, fabricant..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-dark-800/80 border border-grey-100/30 rounded-xl text-white placeholder-grey-500 focus:border-hearst-green/50 focus:outline-none focus:ring-2 focus:ring-hearst-green/20 transition-all duration-200"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-dark-600 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-grey-400" />
                    </button>
                  )}
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2 p-1.5 bg-dark-800/80 rounded-xl border border-grey-100/30">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-all duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-hearst-green text-black shadow-glow'
                        : 'text-grey-400 hover:text-white hover:bg-dark-600'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('large')}
                    className={`p-3 rounded-lg transition-all duration-200 ${
                      viewMode === 'large'
                        ? 'bg-hearst-green text-black shadow-glow'
                        : 'text-grey-400 hover:text-white hover:bg-dark-600'
                    }`}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  const count = categoryCounts[category.id] || 0;
                  const isActive = selectedCategory === category.id;

                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 whitespace-nowrap group magnetic-hover ${
                        isActive
                          ? 'bg-dark-600 border-hearst-green/50'
                          : 'bg-dark-800/50 border-grey-100/30 hover:border-grey-100/50'
                      }`}
                    >
                      <Icon 
                        className="w-4 h-4 transition-transform group-hover:scale-110" 
                        style={{ color: isActive ? category.color : '#666666' }} 
                      />
                      <span className={`text-xs font-semibold uppercase tracking-wider ${isActive ? 'text-white' : 'text-grey-400'}`}>
                        {category.name}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-hearst-green/20 text-hearst-green' : 'bg-dark-600 text-grey-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Models Grid */}
          {filteredModels.length > 0 ? (
            <section className={`transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}>
                {filteredModels.map((model, index) => (
                  <ModelCard
                    key={model.id}
                    model={model}
                    large={viewMode === 'large'}
                    index={index}
                    isHovered={hoveredCard === model.id}
                    onHover={setHoveredCard}
                  />
                ))}
              </div>

              {/* Results Footer */}
              <div className="mt-8 p-6 bg-dark-700/30 backdrop-blur-sm border border-grey-100/20 rounded-2xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Box className="w-4 h-4 text-grey-500" />
                      <span className="text-sm text-grey-400">
                        <span className="font-bold text-white">{filteredModels.length}</span> modèles affichés
                      </span>
                    </div>
                    <div className="h-4 w-px bg-grey-100/30" />
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-grey-400">Formats:</span>
                      {['GLB', 'GLTF', 'FBX'].map((format) => (
                        <span key={format} className="px-2 py-1 bg-dark-600 rounded text-xs font-mono text-grey-300">
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-hearst-green" />
                    <span className="text-sm font-medium text-shimmer">Qualité 4K Ultra • PBR Materials</span>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <EmptyState onReset={() => { setSearchQuery(''); setSelectedCategory('all'); }} />
          )}
        </div>
      </AuroraBackground>
    </DashboardLayout>
  );
}

// Featured Model Card (Bento style)
function FeaturedModelCard({ model, size, index }: { model: UnifiedModel; size: 'large' | 'medium'; index: number }) {
  const router = useRouter();
  const quality = QUALITY_LEVELS[model.quality as keyof typeof QUALITY_LEVELS] || QUALITY_LEVELS.standard;
  
  return (
    <div
      onClick={() => router.push(`/unreal-viewer?model=${model.id}`)}
      className={`
        group relative overflow-hidden rounded-2xl cursor-pointer
        bg-dark-700/50 backdrop-blur-sm border border-grey-100/30
        hover:border-hearst-green/30 transition-all duration-500
        animate-breathe
        ${size === 'large' ? 'h-full min-h-[400px]' : 'h-[200px]'}
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-600/50 via-dark-700/50 to-dark-800/50" />
      
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-20 bg-hearst-green/5 blur-3xl" />
      </div>

      {/* 3D placeholder with animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <Box className={`${size === 'large' ? 'w-24 h-24' : 'w-16 h-16'} text-grey-600 group-hover:text-hearst-green transition-all duration-500 group-hover:scale-110`} />
          <div className="absolute inset-0 blur-xl bg-hearst-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        {/* Top badges */}
        <div className="flex items-start justify-between">
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-warning/20 border border-warning/40 rounded-lg backdrop-blur-sm">
              <Star className="w-3 h-3 text-warning fill-warning" />
              <span className="text-[10px] font-bold text-warning uppercase tracking-wider">Featured</span>
            </div>
            <div
              className="px-2.5 py-1.5 rounded-lg backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider border"
              style={{
                backgroundColor: `${quality.color}20`,
                borderColor: `${quality.color}40`,
                color: quality.color,
              }}
            >
              {quality.icon} {quality.label}
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-hearst-green transition-colors mb-1">
            {model.name}
          </h3>
          {model.manufacturer && (
            <p className="text-xs text-grey-500 uppercase tracking-wider mb-2">{model.manufacturer}</p>
          )}
          {size === 'large' && (
            <p className="text-sm text-grey-400 line-clamp-2 mb-3">{model.description}</p>
          )}
          
          {/* Quick stats */}
          <div className="flex items-center gap-3">
            {model.power && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-dark-800/80 rounded-lg">
                <Zap className="w-3 h-3 text-hearst-green" />
                <span className="text-xs font-semibold text-hearst-green">{model.power}</span>
              </div>
            )}
            {model.polyCount && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-dark-800/80 rounded-lg">
                <span className="text-[10px] text-grey-500">POLY</span>
                <span className="text-xs font-mono text-grey-300">{model.polyCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Play button on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button className="flex items-center gap-2 px-6 py-3 bg-hearst-green text-black rounded-xl font-semibold shadow-glow transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <Play className="w-4 h-4" />
          Ouvrir
        </button>
      </div>
    </div>
  );
}

// Model Card
function ModelCard({ model, large, index, isHovered, onHover }: {
  model: UnifiedModel;
  large?: boolean;
  index: number;
  isHovered?: boolean;
  onHover?: (id: string | null) => void;
}) {
  const router = useRouter();
  const quality = QUALITY_LEVELS[model.quality as keyof typeof QUALITY_LEVELS] || QUALITY_LEVELS.standard;

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-dark-700/50 backdrop-blur-sm border border-grey-100/30 hover:border-hearst-green/30 transition-all duration-300 cursor-pointer card-3d"
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={() => onHover?.(model.id)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => router.push(`/unreal-viewer?model=${model.id}`)}
    >
      {/* Preview */}
      <div className={`relative overflow-hidden ${large ? 'aspect-[4/3]' : 'aspect-video'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-dark-600 via-dark-700 to-dark-800" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#8afd81 1px, transparent 1px), linear-gradient(90deg, #8afd81 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* 3D Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Box className={`w-16 h-16 transition-all duration-300 ${isHovered ? 'text-hearst-green scale-110' : 'text-grey-600'}`} />
        </div>

        {/* Quality badge */}
        <div className="absolute top-3 left-3">
          <div
            className="px-2.5 py-1.5 rounded-lg backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider border"
            style={{
              backgroundColor: `${quality.color}20`,
              borderColor: `${quality.color}40`,
              color: quality.color,
            }}
          >
            {quality.icon} {quality.label}
          </div>
        </div>

        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end justify-center pb-6 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-hearst-green text-black rounded-xl font-semibold shadow-glow">
            <Eye className="w-4 h-4" />
            Voir
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-white group-hover:text-hearst-green transition-colors mb-1">
          {model.name}
        </h3>
        {model.manufacturer && (
          <p className="text-xs text-grey-500 uppercase tracking-wider mb-2">{model.manufacturer}</p>
        )}
        <p className="text-sm text-grey-400 line-clamp-2 mb-4">{model.description}</p>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2 bg-dark-600/50 rounded-lg">
            <Maximize2 className="w-3.5 h-3.5 text-grey-500" />
            <span className="text-xs text-grey-400 font-mono truncate">
              {model.dimensions.length}×{model.dimensions.width}m
            </span>
          </div>
          {model.power && (
            <div className="flex items-center gap-2 p-2 bg-dark-600/50 rounded-lg">
              <Zap className="w-3.5 h-3.5 text-hearst-green" />
              <span className="text-xs text-hearst-green font-semibold">{model.power}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Empty State
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <section className="py-16">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-full bg-dark-700 border border-grey-100/30 flex items-center justify-center mb-6 animate-breathe">
          <Box className="w-12 h-12 text-grey-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Aucun modèle trouvé</h3>
        <p className="text-grey-400 mb-6 max-w-md">
          Aucun résultat ne correspond à votre recherche.
        </p>
        <button onClick={onReset} className="btn-primary">
          <Filter className="w-4 h-4" />
          Réinitialiser
        </button>
      </div>
    </section>
  );
}
