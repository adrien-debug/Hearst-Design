# 🎨 DESIGN BRIEF - PAGE OVERVIEW "STRATEGIC RESERVE QATAR"

**Version:** 1.1  
**Date:** 24 Décembre 2025  
**Projet:** Hearst Strategic Reserve Qatar  
**Focus:** PAGE OVERVIEW UNIQUEMENT (page d'accueil `/`)

---

## ⚠️ PROBLÈME ACTUEL À CORRIGER

### Layout Cassé
Le body n'est pas aligné avec la sidebar. Il y a un **offset sérieux** entre:
- La sidebar (fixée à gauche, `w-sidebar` = 200px)
- Le contenu principal (qui utilise `ml-sidebar` mais ne s'aligne pas correctement)

### Fichiers concernés
- `frontend/src/components/DashboardLayout.tsx`
- `frontend/src/components/Sidebar.tsx`
- `frontend/src/components/Header.tsx`
- `frontend/src/app/page.tsx`
- `frontend/src/app/globals.css`
- `frontend/tailwind.config.js`

---

## 🎯 OBJECTIF

Refactorer **UNIQUEMENT** la page Overview "Strategic Reserve Qatar" avec:

1. **Layout corrigé** - Body parfaitement aligné avec la sidebar
2. **Sidebar Collapsible** - 60px fermée, 240px ouverte
3. **Hero Bubble** - En-tête pleine largeur avec image de fond
4. **Footer Blanc** - Fond blanc en bas du body
5. **Logo Hearst** - En haut à gauche, toujours visible

---

## 🏗️ NOUVEAU LAYOUT À IMPLÉMENTER

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                │
│  ┌── SIDEBAR ──┐  ┌── MAIN CONTENT (prend le reste de la largeur) ──────────┐ │
│  │             │  │                                                          │ │
│  │  [H] HEARST │  │  ╔══════════════════════════════════════════════════╗   │ │
│  │             │  │  ║                                                  ║   │ │
│  │  [≡] Toggle │  │  ║   HERO BUBBLE (100% width)                      ║   │ │
│  │             │  │  ║   - Background image (containers/mining)        ║   │ │
│  │  [🏠] Home  │  │  ║   - Overlay gradient noir                       ║   │ │
│  │  [₿] Bitcoin│  │  ║   - Titre: "Strategic Reserve Qatar"            ║   │ │
│  │  [📊] Mining│  │  ║   - Sous-titre: "Mining Operations Dashboard"   ║   │ │
│  │  [⚡] Infra │  │  ║   - KPIs: BTC Price, Hashrate, etc.             ║   │ │
│  │  [📦] Gallery│ │  ║   - Badges: LIVE, SRQ-001                       ║   │ │
│  │  [📋] Monitor│ │  ║                                                  ║   │ │
│  │  [🎮] Unreal│  │  ╚══════════════════════════════════════════════════╝   │ │
│  │             │  │                                                          │ │
│  │             │  │  ┌─ CONTENT AREA (fond #0a0a0a) ───────────────────────┐ │ │
│  │  ─────────  │  │  │                                                     │ │ │
│  │  PROJECT    │  │  │  [6 KPI Cards en grille]                           │ │ │
│  │  SRQ-001    │  │  │  Reserve | Daily | Power | Miners | Temp | Uptime  │ │ │
│  │             │  │  │                                                     │ │ │
│  │  ─────────  │  │  │  [Section: Dashboard Navigation]                   │ │ │
│  │  v1.0.0     │  │  │  [6 Navigation Cards en grille 3x2]                │ │ │
│  │             │  │  │                                                     │ │ │
│  └─────────────┘  │  │  [Section: Container Fleet + Quick Actions]        │ │ │
│                   │  │                                                     │ │ │
│  Collapsed: 60px  │  └─────────────────────────────────────────────────────┘ │ │
│  Expanded: 240px  │                                                          │ │
│                   │  ╔══════════════════════════════════════════════════╗   │ │
│                   │  ║                                                  ║   │ │
│                   │  ║   FOOTER (Fond BLANC #ffffff)                    ║   │ │
│                   │  ║   - © 2025 Hearst Corporation                    ║   │ │
│                   │  ║   - Stats: 30 Containers | 9,240 Miners          ║   │ │
│                   │  ║   - Badge: SYSTEM ONLINE (vert)                  ║   │ │
│                   │  ║                                                  ║   │ │
│                   │  ╚══════════════════════════════════════════════════╝   │ │
│                   │                                                          │ │
│                   └──────────────────────────────────────────────────────────┘ │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📐 CORRECTIONS CSS À APPLIQUER

### 1. Variables CSS (globals.css)

```css
:root {
  /* Layout - CORRIGER CES VALEURS */
  --sidebar-collapsed: 60px;      /* Sidebar fermée */
  --sidebar-expanded: 240px;      /* Sidebar ouverte */
  --sidebar-width: 60px;          /* Par défaut: collapsed */
  --header-height: 70px;
  
  /* Footer blanc */
  --footer-bg: #ffffff;
  --footer-text: #1a1a1a;
  --footer-text-muted: #666666;
}
```

### 2. Tailwind Config (tailwind.config.js)

```javascript
// Ajouter dans spacing:
spacing: {
  'sidebar-collapsed': '60px',
  'sidebar-expanded': '240px',
  'sidebar': 'var(--sidebar-width)',
  'header': '70px',
},
```

### 3. DashboardLayout.tsx - CORRIGER

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Par défaut: fermé

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-hearst-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-grey-500 text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      {/* Main Content - S'adapte à la sidebar */}
      <div 
        className="flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{ 
          marginLeft: sidebarCollapsed ? '60px' : '240px' 
        }}
      >
        {/* Hero Bubble + Content seront dans children */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* Footer Blanc */}
        <footer className="bg-white border-t border-gray-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm">
                <span className="text-gray-600">© 2025 Hearst Corporation</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600">Strategic Reserve Qatar</span>
                <span className="text-gray-300">|</span>
                <span className="font-mono text-gray-500">SRQ-001</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm text-gray-600">30 Containers</span>
                <span className="text-sm text-gray-600">9,240 Miners</span>
                <span className="text-sm font-semibold text-[#8afd81]">4.37 EH/s</span>
                <div className="px-3 py-1.5 bg-[#8afd81] rounded-full">
                  <span className="text-xs font-bold text-black uppercase tracking-wide">
                    SYSTEM ONLINE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
```

### 4. Sidebar.tsx - REFACTORER COMPLÈTEMENT

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Bitcoin,
  Activity,
  Server,
  Box,
  Layers,
  Gamepad2,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Overview', href: '/', icon: Home },
  { name: 'Bitcoin Command', href: '/bitcoin-command-center', icon: Bitcoin },
  { name: 'Mining Dashboard', href: '/mining-dashboard', icon: Activity },
  { name: 'Infrastructure', href: '/infrastructure', icon: Server },
  { name: 'Gallery 3D', href: '/gallery', icon: Box },
  { name: 'Project Monitoring', href: '/monitoring', icon: Layers },
  { name: 'Unreal Viewer', href: '/unreal-viewer', icon: Gamepad2 },
];

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside 
      className={`
        fixed left-0 top-0 h-screen bg-[#0a0a0a] border-r border-[#2a2a2a] 
        flex flex-col z-50 transition-all duration-300
      `}
      style={{ width: isCollapsed ? '60px' : '240px' }}
    >
      {/* Logo + Toggle */}
      <div className="h-[70px] flex items-center justify-between px-3 border-b border-[#2a2a2a]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-[#8afd81] rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
            <span className="text-black font-bold text-base">H</span>
          </div>
          {!isCollapsed && (
            <span className="text-sm font-semibold tracking-wide text-white uppercase whitespace-nowrap">
              HEARST
            </span>
          )}
        </Link>
        
        {/* Toggle Button */}
        <button 
          onClick={onToggle}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#2a2a2a] transition-colors"
        >
          {isCollapsed ? (
            <Menu className="w-4 h-4 text-[#999999]" />
          ) : (
            <X className="w-4 h-4 text-[#999999]" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-[#8afd81] text-black font-semibold' 
                  : 'text-[#999999] hover:bg-[#2a2a2a] hover:text-white'
                }
              `}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-sm whitespace-nowrap">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Project Info (visible seulement si expanded) */}
      {!isCollapsed && (
        <div className="p-3 border-t border-[#2a2a2a]">
          <div className="p-3 bg-[#1a1a1a] rounded-lg">
            <p className="text-[10px] font-semibold text-[#666666] uppercase tracking-wider mb-1">
              Project
            </p>
            <p className="text-sm font-medium text-white">SRQ-001</p>
            <p className="text-xs text-[#666666] mt-1">Strategic Reserve Qatar</p>
          </div>
        </div>
      )}

      {/* Version */}
      <div className={`px-3 py-3 border-t border-[#2a2a2a] ${isCollapsed ? 'text-center' : ''}`}>
        <p className="text-[10px] text-[#666666]">
          {isCollapsed ? 'v1.0' : 'v1.0.0 · Hearst Mining'}
        </p>
      </div>
    </aside>
  );
}
```

---

## 🖼️ HERO BUBBLE COMPONENT

### Créer: `frontend/src/components/HeroBubble.tsx`

```tsx
'use client';

import { TrendingUp } from 'lucide-react';

interface HeroBubbleProps {
  title: string;
  subtitle: string;
  kpis?: {
    label: string;
    value: string;
    change?: string;
    positive?: boolean;
  }[];
  backgroundImage?: string;
}

export default function HeroBubble({ 
  title, 
  subtitle, 
  kpis = [],
  backgroundImage 
}: HeroBubbleProps) {
  return (
    <div className="relative w-full h-[220px] overflow-hidden rounded-b-3xl">
      {/* Background Image */}
      {backgroundImage ? (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        /* Fallback: Gradient + Pattern */
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(138, 253, 129, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(138, 253, 129, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          {/* Glow effect */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 30% 50%, rgba(138, 253, 129, 0.15) 0%, transparent 50%)'
            }}
          />
        </div>
      )}
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8">
        {/* Badges */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#8afd81]/10 border border-[#8afd81]/30 rounded-lg">
            <span className="w-2 h-2 bg-[#8afd81] rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-[#8afd81] uppercase tracking-wide">LIVE</span>
          </div>
          <div className="px-3 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
            <span className="text-xs font-semibold text-[#666666] uppercase tracking-wide">SRQ-001</span>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          {title}
        </h1>
        <p className="text-lg text-[#999999] mb-6">
          {subtitle}
        </p>
        
        {/* KPIs Row */}
        {kpis.length > 0 && (
          <div className="flex items-center gap-8">
            {kpis.map((kpi, index) => (
              <div key={index} className="flex items-center gap-3">
                <div>
                  <p className="text-xs text-[#666666] uppercase tracking-wide mb-1">{kpi.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white font-mono tracking-tight">
                      {kpi.value}
                    </span>
                    {kpi.change && (
                      <span className={`flex items-center gap-1 text-sm font-semibold ${
                        kpi.positive ? 'text-[#8afd81]' : 'text-[#e74c3c]'
                      }`}>
                        <TrendingUp className={`w-4 h-4 ${!kpi.positive ? 'rotate-180' : ''}`} />
                        {kpi.change}
                      </span>
                    )}
                  </div>
                </div>
                {index < kpis.length - 1 && (
                  <div className="w-px h-10 bg-[#2a2a2a] ml-5" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## 📄 PAGE OVERVIEW - REFACTORER

### `frontend/src/app/page.tsx`

```tsx
'use client';

import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import HeroBubble from '@/components/HeroBubble';
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
} from 'lucide-react';

// ============================================
// DONNÉES MOCKÉES
// ============================================

const mockKPIs = {
  btcPrice: 98450,
  btcChange: 2.4,
  totalHashrate: 4.37,
  hashrateUnit: 'EH/s',
  totalPower: 52.95,
  powerUnit: 'MW',
  activeMiners: 9166,
  totalMiners: 9240,
  containers: 30,
  uptime: 99.8,
  reserve: 220.5,
  dailyProduction: 0.847,
  temperature: 38.5,
};

const navigationCards = [
  {
    id: 'bitcoin-command-center',
    title: 'Bitcoin Command Center',
    description: 'Terminal Bloomberg unifié pour le monitoring de la réserve stratégique Bitcoin',
    icon: Bitcoin,
    route: '/bitcoin-command-center',
    color: '#f7931a',
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
    color: '#8afd81',
    stats: [
      { label: 'Hashrate', value: '4.37 EH/s' },
      { label: 'Production', value: '0.847 BTC/day' },
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    description: 'Monitoring des systèmes électriques et de refroidissement',
    icon: Server,
    route: '/infrastructure',
    color: '#3b82f6',
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
    color: '#a855f7',
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
    color: '#06b6d4',
    stats: [
      { label: 'Progress', value: '58%' },
      { label: 'Phase', value: 'Industrialisation' },
    ],
  },
  {
    id: 'unreal-viewer',
    title: 'Unreal Viewer',
    description: 'Visualisation 3D temps réel avec Pixel Streaming Unreal Engine 5',
    icon: Gamepad2,
    route: '/unreal-viewer',
    color: '#ef4444',
    stats: [
      { label: 'Resolution', value: '4K @ 60fps' },
      { label: 'Engine', value: 'UE 5.4' },
    ],
  },
];

// ============================================
// COMPOSANT PRINCIPAL
// ============================================

export default function HomePage() {
  return (
    <DashboardLayout>
      {/* Hero Bubble - Full Width */}
      <HeroBubble
        title="Strategic Reserve Qatar"
        subtitle="Mining Operations Dashboard • Hearst Corporation"
        kpis={[
          { label: 'BTC Price', value: '$98,450', change: '+2.4%', positive: true },
          { label: 'Hashrate', value: '4.37 EH/s' },
          { label: 'Reserve', value: '220.5 BTC' },
        ]}
      />
      
      {/* Content Area */}
      <div className="p-8 space-y-8">
        
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-6 gap-4">
          {/* Reserve */}
          <div className="bg-gradient-to-br from-[#f7931a]/10 to-transparent border border-[#f7931a]/20 rounded-xl p-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <Bitcoin className="w-5 h-5 text-[#f7931a]" />
              <span className="text-[10px] text-[#666666] uppercase tracking-wide font-semibold">Reserve</span>
            </div>
            <p className="text-2xl font-bold text-white font-mono">{mockKPIs.reserve} BTC</p>
          </div>
          
          {/* Daily */}
          <div className="bg-gradient-to-br from-[#8afd81]/10 to-transparent border border-[#8afd81]/20 rounded-xl p-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-[#8afd81]" />
              <span className="text-[10px] text-[#666666] uppercase tracking-wide font-semibold">Daily</span>
            </div>
            <p className="text-2xl font-bold text-white font-mono">{mockKPIs.dailyProduction} BTC</p>
          </div>
          
          {/* Power */}
          <div className="bg-gradient-to-br from-[#3b82f6]/10 to-transparent border border-[#3b82f6]/20 rounded-xl p-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-[#3b82f6]" />
              <span className="text-[10px] text-[#666666] uppercase tracking-wide font-semibold">Power</span>
            </div>
            <p className="text-2xl font-bold text-white font-mono">{mockKPIs.totalPower} {mockKPIs.powerUnit}</p>
          </div>
          
          {/* Miners */}
          <div className="bg-gradient-to-br from-[#a855f7]/10 to-transparent border border-[#a855f7]/20 rounded-xl p-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-5 h-5 text-[#a855f7]" />
              <span className="text-[10px] text-[#666666] uppercase tracking-wide font-semibold">Miners</span>
            </div>
            <p className="text-2xl font-bold text-white font-mono">
              {mockKPIs.activeMiners.toLocaleString()}
              <span className="text-[#666666] text-lg">/{mockKPIs.totalMiners.toLocaleString()}</span>
            </p>
          </div>
          
          {/* Temp */}
          <div className="bg-gradient-to-br from-[#06b6d4]/10 to-transparent border border-[#06b6d4]/20 rounded-xl p-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <ThermometerSun className="w-5 h-5 text-[#06b6d4]" />
              <span className="text-[10px] text-[#666666] uppercase tracking-wide font-semibold">Temp</span>
            </div>
            <p className="text-2xl font-bold text-white font-mono">{mockKPIs.temperature}°C</p>
          </div>
          
          {/* Uptime */}
          <div className="bg-gradient-to-br from-[#8afd81]/10 to-transparent border border-[#8afd81]/20 rounded-xl p-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-5 h-5 text-[#8afd81]" />
              <span className="text-[10px] text-[#666666] uppercase tracking-wide font-semibold">Uptime</span>
            </div>
            <p className="text-2xl font-bold text-[#8afd81] font-mono">{mockKPIs.uptime}%</p>
          </div>
        </div>

        {/* Dashboard Navigation Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">Dashboard Navigation</h2>
            <p className="text-sm text-[#666666] mt-1">Accédez à toutes les sections du dashboard</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {navigationCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.id}
                  href={card.route}
                  className="group relative overflow-hidden rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-opacity-50 transition-all duration-300 hover:-translate-y-2"
                  style={{ borderColor: `${card.color}30` }}
                >
                  {/* Background gradient */}
                  <div 
                    className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${card.color}15 0%, transparent 50%)` 
                    }}
                  />
                  
                  <div className="relative p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${card.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: card.color }} />
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#666666] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#8afd81] transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#666666] mb-4 line-clamp-2">
                      {card.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-6">
                      {card.stats.map((stat, statIndex) => (
                        <div key={statIndex}>
                          <span className="text-[10px] text-[#666666] uppercase tracking-wider font-semibold block mb-1">
                            {stat.label}
                          </span>
                          <span 
                            className="text-sm font-bold font-mono"
                            style={{ color: card.color }}
                          >
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Bottom Section: Container Fleet + Quick Actions */}
        <section className="grid grid-cols-2 gap-6">
          {/* Container Fleet */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Container Fleet</h3>
                <p className="text-sm text-[#666666] mt-1">30 ANTSPACE HD5 Containers</p>
              </div>
              <Link href="/mining-dashboard" className="flex items-center gap-2 px-4 py-2 bg-[#242424] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-full text-sm text-white transition-all">
                View Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg ${
                    i === 15 ? 'bg-[#f39c12]' : i === 22 ? 'bg-[#4a4a4a]' : 'bg-[#8afd81]'
                  }`}
                  title={`Container ${i + 1}`}
                />
              ))}
            </div>
            
            <div className="flex items-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#8afd81]" />
                <span className="text-[#666666]">Optimal (28)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#f39c12]" />
                <span className="text-[#666666]">Warning (1)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#4a4a4a]" />
                <span className="text-[#666666]">Offline (1)</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white">Quick Actions</h3>
              <p className="text-sm text-[#666666] mt-1">Accès rapide aux fonctionnalités</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/bitcoin-command-center"
                className="flex items-center gap-4 p-4 bg-[#242424] rounded-xl hover:bg-[#2a2a2a] hover:-translate-y-1 transition-all duration-300 group border border-[#2a2a2a]"
              >
                <Bitcoin className="w-6 h-6 text-[#f7931a]" />
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-[#8afd81] transition-colors">View Reserve</p>
                  <p className="text-xs text-[#666666] font-mono">220.5 BTC</p>
                </div>
              </Link>
              
              <Link 
                href="/infrastructure"
                className="flex items-center gap-4 p-4 bg-[#242424] rounded-xl hover:bg-[#2a2a2a] hover:-translate-y-1 transition-all duration-300 group border border-[#2a2a2a]"
              >
                <Zap className="w-6 h-6 text-[#3b82f6]" />
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-[#8afd81] transition-colors">Power Status</p>
                  <p className="text-xs text-[#666666] font-mono">52.95 MW Active</p>
                </div>
              </Link>
              
              <Link 
                href="/unreal-viewer"
                className="flex items-center gap-4 p-4 bg-[#242424] rounded-xl hover:bg-[#2a2a2a] hover:-translate-y-1 transition-all duration-300 group border border-[#2a2a2a]"
              >
                <Gamepad2 className="w-6 h-6 text-[#ef4444]" />
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-[#8afd81] transition-colors">3D Viewer</p>
                  <p className="text-xs text-[#666666]">Unreal Engine 5</p>
                </div>
              </Link>
              
              <Link 
                href="/monitoring"
                className="flex items-center gap-4 p-4 bg-[#242424] rounded-xl hover:bg-[#2a2a2a] hover:-translate-y-1 transition-all duration-300 group border border-[#2a2a2a]"
              >
                <Layers className="w-6 h-6 text-[#06b6d4]" />
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-[#8afd81] transition-colors">Project Status</p>
                  <p className="text-xs text-[#666666] font-mono">58% Complete</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
```

---

## 📋 CHECKLIST D'IMPLÉMENTATION

### Fichiers à créer/modifier:

1. ☐ **`frontend/src/components/DashboardLayout.tsx`** - Nouveau layout avec sidebar state + footer blanc
2. ☐ **`frontend/src/components/Sidebar.tsx`** - Sidebar collapsible (60px ↔ 240px)
3. ☐ **`frontend/src/components/HeroBubble.tsx`** - NOUVEAU composant Hero
4. ☐ **`frontend/src/app/page.tsx`** - Page Overview refactorisée
5. ☐ **`frontend/src/app/globals.css`** - Ajouter variables CSS
6. ☐ **`frontend/tailwind.config.js`** - Ajouter spacing sidebar

### Points de vérification:

- ☐ Body parfaitement aligné avec sidebar
- ☐ Sidebar collapse/expand fonctionne (60px ↔ 240px)
- ☐ Logo Hearst toujours visible
- ☐ Hero Bubble prend 100% de la largeur
- ☐ Footer blanc en bas
- ☐ Transitions fluides (250ms)
- ☐ Pas d'offset entre sidebar et content

---

## 🎨 CHARTE COULEURS RAPPEL

```css
/* Vert HEARST signature */
#8afd81

/* Backgrounds */
#000000  /* Body */
#0a0a0a  /* Header/Sidebar */
#1a1a1a  /* Cards */
#242424  /* Tertiary */
#2a2a2a  /* Borders */

/* Texte */
#ffffff  /* Primary */
#999999  /* Secondary */
#666666  /* Muted */

/* Footer BLANC */
#ffffff  /* Background footer */
#1a1a1a  /* Texte footer */

/* Accents */
#f7931a  /* Bitcoin orange */
#3b82f6  /* Info blue */
#a855f7  /* Purple */
#06b6d4  /* Cyan */
#ef4444  /* Red */
```

---

**Dernière mise à jour:** 24 Décembre 2025  
**Focus:** Page Overview "Strategic Reserve Qatar" uniquement  
**Statut:** 📋 Prêt pour implémentation
