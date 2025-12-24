'use client';

import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import AnimatedCounter from '@/components/AnimatedCounter';
import {
  Search,
  Filter,
  Box,
  Layers,
  Zap,
  Snowflake,
  Grid3X3,
  Eye,
  Download,
  ChevronRight,
  Sparkles,
  Star,
  Info,
} from 'lucide-react';

// ============================================
// TYPES
// ============================================

interface UnifiedModel {
  id: string;
  name: string;
  category: string;
  description: string;
  dimensions: { length: number; width: number; height: number };
  power?: string;
  capacity?: string;
  tags: string[];
  quality: 'ultra-realistic' | 'high' | 'medium';
  featured?: boolean;
  manufacturer?: string;
  polyCount?: string;
  fileSize?: string;
}

// ============================================
// CATALOGUE MODELS
// ============================================

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
    manufacturer: 'Generic',
    polyCount: '1.2M',
    fileSize: '64 MB',
  },
  {
    id: 'power-block-01',
    name: 'Power Distribution Block',
    category: 'power',
    description: "Bloc de distribution d'alimentation électrique pour infrastructure data center.",
    dimensions: { length: 2.0, width: 1.5, height: 1.8 },
    power: '1.5MVA',
    tags: ['power', 'distribution', 'infrastructure'],
    quality: 'medium',
    manufacturer: 'Schneider Electric',
    polyCount: '0.8M',
    fileSize: '42 MB',
  },
  {
    id: 's21-xp-hydro-01',
    name: 'Antminer S21 XP Hydro',
    category: 'miner',
    description: 'Miner Bitcoin haute performance avec refroidissement liquide intégré.',
    dimensions: { length: 0.47, width: 0.195, height: 0.29 },
    power: '5.676kW',
    capacity: '473 TH/s',
    tags: ['bitmain', 's21', 'hydro', 'asic'],
    quality: 'ultra-realistic',
    featured: true,
    manufacturer: 'Bitmain',
    polyCount: '1.5M',
    fileSize: '78 MB',
  },
  {
    id: 'hvac-unit-01',
    name: 'Industrial HVAC Unit',
    category: 'cooling',
    description: 'Unité de climatisation industrielle pour data center.',
    dimensions: { length: 2.5, width: 1.2, height: 2.0 },
    power: '75kW',
    tags: ['hvac', 'cooling', 'climate'],
    quality: 'high',
    manufacturer: 'Carrier',
    polyCount: '0.9M',
    fileSize: '48 MB',
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'container': return <Box className="w-5 h-5" />;
    case 'transformer': return <Zap className="w-5 h-5" />;
    case 'cooling': return <Snowflake className="w-5 h-5" />;
    case 'power': return <Zap className="w-5 h-5" />;
    case 'miner': return <Layers className="w-5 h-5" />;
    default: return <Grid3X3 className="w-5 h-5" />;
  }
};

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    container: 'Containers',
    transformer: 'Transformers',
    cooling: 'Cooling',
    power: 'Power',
    miner: 'Miners',
  };
  return labels[category] || category;
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Catégories uniques
  const categories = useMemo(() => {
    const cats = Array.from(new Set(UNIFIED_MODEL_CATALOG.map(m => m.category)));
    return ['all', ...cats];
  }, []);

  // Filtrage des modèles
  const filteredModels = useMemo(() => {
    return UNIFIED_MODEL_CATALOG.filter(model => {
      const matchesSearch = 
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || model.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Stats
  const stats = useMemo(() => {
    const totalPolys = UNIFIED_MODEL_CATALOG.reduce((sum, m) => {
      const poly = parseFloat(m.polyCount?.replace('M', '') || '0');
      return sum + poly;
    }, 0);
    
    const totalSize = UNIFIED_MODEL_CATALOG.reduce((sum, m) => {
      const size = parseFloat(m.fileSize?.replace(' MB', '') || '0');
      return sum + size;
    }, 0);
    
    return { totalPolys, totalSize };
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        
        {/* ============================================
            HERO SECTION - Modern & Clean
            ============================================ */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '48px 48px'
            }} />
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center backdrop-blur-sm border border-emerald-500/30">
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                <span className="text-sm font-medium text-emerald-400">3D Asset Library</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Bibliothèque de
              <span className="block mt-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Modèles 3D
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl mb-12 leading-relaxed">
              Collection complète de modèles 3D ultra-réalistes pour visualisation et simulation d'infrastructure minière.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-1">
                  <AnimatedCounter value={UNIFIED_MODEL_CATALOG.length} duration={1500} />
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Modèles 3D</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-1">
                  <AnimatedCounter value={stats.totalPolys} duration={2000} decimals={1} suffix="M" />
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Total Polygones</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-1">
                  <AnimatedCounter value={stats.totalSize} duration={1800} decimals={0} suffix=" MB" />
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Taille Totale</div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================
            FILTERS & SEARCH - Minimalist
            ============================================ */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row gap-4">
              
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher un modèle, tag, ou fabricant..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`
                        px-5 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200
                        ${isActive
                          ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/25'
                          : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2">
                        {cat !== 'all' && getCategoryIcon(cat)}
                        <span>{cat === 'all' ? 'Tous' : getCategoryLabel(cat)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-slate-500">
              {filteredModels.length} modèle{filteredModels.length > 1 ? 's' : ''} trouvé{filteredModels.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* ============================================
            MODELS GRID - Card Design Premium
            ============================================ */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {filteredModels.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                Aucun modèle trouvé
              </h3>
              <p className="text-slate-500 mb-6">
                Essayez de modifier vos critères de recherche
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredModels.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

// ============================================
// MODEL CARD COMPONENT
// ============================================

function ModelCard({ model }: { model: UnifiedModel }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50"
    >
      {/* Featured Badge */}
      {model.featured && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-amber-500 text-white rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
          <Star className="w-3 h-3 fill-current" />
          Featured
        </div>
      )}

      {/* Image Placeholder with gradient */}
      <div className="relative h-56 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
            {getCategoryIcon(model.category)}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center">
                {React.cloneElement(getCategoryIcon(model.category) as React.ReactElement, {
                  className: 'w-12 h-12 text-emerald-600'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <button className="flex-1 py-2 px-4 bg-white text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              Voir
            </button>
            <button className="py-2 px-4 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quality Badge */}
        <div className="absolute top-4 left-4">
          <div className={`
            px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm
            ${model.quality === 'ultra-realistic' ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/30' : ''}
            ${model.quality === 'high' ? 'bg-blue-500/20 text-blue-700 border border-blue-500/30' : ''}
            ${model.quality === 'medium' ? 'bg-slate-500/20 text-slate-700 border border-slate-500/30' : ''}
          `}>
            {model.quality === 'ultra-realistic' ? 'Ultra HD' : model.quality === 'high' ? 'High' : 'Medium'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-slate-100">
            {React.cloneElement(getCategoryIcon(model.category) as React.ReactElement, {
              className: 'w-4 h-4 text-slate-600'
            })}
          </div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {getCategoryLabel(model.category)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
          {model.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
          {model.description}
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {model.power && (
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-slate-600">{model.power}</span>
            </div>
          )}
          {model.capacity && (
            <div className="flex items-center gap-2 text-sm">
              <Layers className="w-4 h-4 text-blue-500" />
              <span className="text-slate-600">{model.capacity}</span>
            </div>
          )}
          {model.polyCount && (
            <div className="flex items-center gap-2 text-sm">
              <Grid3X3 className="w-4 h-4 text-purple-500" />
              <span className="text-slate-600">{model.polyCount}</span>
            </div>
          )}
          {model.fileSize && (
            <div className="flex items-center gap-2 text-sm">
              <Info className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600">{model.fileSize}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {model.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {model.tags.length > 3 && (
            <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-medium">
              +{model.tags.length - 3}
            </span>
          )}
        </div>

        {/* Manufacturer */}
        {model.manufacturer && (
          <div className="pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              Fabricant: <span className="font-semibold text-slate-700">{model.manufacturer}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

