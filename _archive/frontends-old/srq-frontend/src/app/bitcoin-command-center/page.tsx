'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Bitcoin,
  Target,
  BarChart3,
  Activity,
  TrendingUpIcon,
  Zap,
  Calendar,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  ReferenceLine,
} from 'recharts';

// Données mock pour Bitcoin Price (30 jours)
const mockBitcoinPriceData = [
  { date: '21 Nov', open: 38500, high: 39200, low: 38100, close: 38800, volume: 45000 },
  { date: '22 Nov', open: 38800, high: 40500, low: 38600, close: 40200, volume: 52000 },
  { date: '23 Nov', open: 40200, high: 41200, low: 39800, close: 40800, volume: 48000 },
  { date: '24 Nov', open: 40800, high: 41800, low: 40500, close: 41500, volume: 51000 },
  { date: '25 Nov', open: 41500, high: 42500, low: 41200, close: 42100, volume: 55000 },
  { date: '26 Nov', open: 42100, high: 43000, low: 41800, close: 42700, volume: 49000 },
  { date: '27 Nov', open: 42700, high: 43500, low: 42400, close: 43200, volume: 46000 },
  { date: '28 Nov', open: 43200, high: 44200, low: 42900, close: 43800, volume: 53000 },
  { date: '29 Nov', open: 43800, high: 44800, low: 43500, close: 44400, volume: 57000 },
  { date: '30 Nov', open: 44400, high: 45500, low: 44100, close: 45100, volume: 59000 },
  { date: '1 Dec', open: 45100, high: 46000, low: 44800, close: 45600, volume: 61000 },
  { date: '2 Dec', open: 45600, high: 46500, low: 45300, close: 46200, volume: 58000 },
  { date: '3 Dec', open: 46200, high: 47200, low: 45900, close: 46800, volume: 62000 },
  { date: '4 Dec', open: 46800, high: 47800, low: 46500, close: 47400, volume: 65000 },
  { date: '5 Dec', open: 47400, high: 48200, low: 47100, close: 47900, volume: 63000 },
  { date: '6 Dec', open: 47900, high: 48800, low: 47600, close: 48400, volume: 66000 },
  { date: '7 Dec', open: 48400, high: 49200, low: 48100, close: 48800, volume: 68000 },
  { date: '8 Dec', open: 48800, high: 49600, low: 48500, close: 49200, volume: 67000 },
  { date: '9 Dec', open: 49200, high: 50000, low: 48900, close: 49600, volume: 69000 },
  { date: '10 Dec', open: 49600, high: 50400, low: 49300, close: 50000, volume: 70000 },
  { date: '11 Dec', open: 50000, high: 50800, low: 49700, close: 50500, volume: 71000 },
  { date: '12 Dec', open: 50500, high: 51200, low: 50200, close: 50900, volume: 69000 },
  { date: '13 Dec', open: 50900, high: 51600, low: 50600, close: 51300, volume: 68000 },
  { date: '14 Dec', open: 51300, high: 52000, low: 51000, close: 51700, volume: 67000 },
  { date: '15 Dec', open: 51700, high: 52400, low: 51400, close: 52100, volume: 66000 },
  { date: '16 Dec', open: 52100, high: 52800, low: 51800, close: 52500, volume: 65000 },
  { date: '17 Dec', open: 52500, high: 53200, low: 52200, close: 52900, volume: 64000 },
  { date: '18 Dec', open: 52900, high: 53600, low: 52600, close: 53300, volume: 63000 },
  { date: '19 Dec', open: 53300, high: 54000, low: 53000, close: 53700, volume: 62000 },
  { date: '20 Dec', open: 53700, high: 54400, low: 53400, close: 51200, volume: 60000 },
];

// Données mock pour BTC Accumulation (12 mois)
const mockAccumulationData = [
  { month: 'Jan', btc: 125.5, added: 12.5 },
  { month: 'Fév', btc: 138.2, added: 12.7 },
  { month: 'Mar', btc: 145.8, added: 7.6 },
  { month: 'Avr', btc: 158.3, added: 12.5 },
  { month: 'Mai', btc: 165.9, added: 7.6 },
  { month: 'Juin', btc: 172.4, added: 6.5 },
  { month: 'Juil', btc: 180.1, added: 7.7 },
  { month: 'Août', btc: 188.5, added: 8.4 },
  { month: 'Sept', btc: 195.2, added: 6.7 },
  { month: 'Oct', btc: 205.8, added: 10.6 },
  { month: 'Nov', btc: 212.4, added: 6.6 },
  { month: 'Déc', btc: 220.5, added: 8.1 },
];

// Données mock pour Portfolio Value (12 mois)
const mockPortfolioData = [
  { month: 'Jan', value: 5200000, invested: 4800000, gain: 400000 },
  { month: 'Fév', value: 5800000, invested: 5100000, gain: 700000 },
  { month: 'Mar', value: 6500000, invested: 5400000, gain: 1100000 },
  { month: 'Avr', value: 7200000, invested: 5800000, gain: 1400000 },
  { month: 'Mai', value: 7800000, invested: 6200000, gain: 1600000 },
  { month: 'Juin', value: 8200000, invested: 6600000, gain: 1600000 },
  { month: 'Juil', value: 9100000, invested: 7000000, gain: 2100000 },
  { month: 'Août', value: 10500000, invested: 7500000, gain: 3000000 },
  { month: 'Sept', value: 11200000, invested: 8000000, gain: 3200000 },
  { month: 'Oct', value: 13800000, invested: 8500000, gain: 5300000 },
  { month: 'Nov', value: 16200000, invested: 9000000, gain: 7200000 },
  { month: 'Déc', value: 22000000, invested: 12000000, gain: 10000000 },
];

export default function BitcoinCommandCenter() {
  const [timeFilter, setTimeFilter] = useState('month');

  // KPIs principaux
  const kpis = {
    btcPrice: 49800,
    priceChange: 18.6,
    reserve: 220.5,
    roi: 83.3,
    portfolioValue: 22000000,
    invested: 12000000,
    pnl: 10000000,
    avgCost: 54422,
    monthlyAdd: 8.1,
    target: 300,
    sharpeRatio: 2.4,
    volatility: 12.5,
    maxDrawdown: -8.2,
    breakeven: 54422,
    profitStreak: 8,
    volume24h: 55000,
    high24h: 52000,
    low24h: 49500,
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-700 border border-grey-100 rounded-lg p-3 shadow-xl">
          <p className="text-grey-400 text-xs mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-white font-mono text-sm font-bold" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
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
        {/* Header avec badges KPIs */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-hearst-green/10 border border-hearst-green/30 rounded-lg">
                <Bitcoin className="w-4 h-4 text-hearst-green" />
                <span className="text-xs font-semibold text-hearst-green uppercase tracking-wide">
                  Bitcoin Command Center
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-dark-600 border border-grey-100 rounded">
                <div className="w-2 h-2 rounded-full bg-hearst-green animate-pulse-green" />
                <span className="text-xs font-medium text-grey-400 uppercase tracking-wide">Live</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Strategic Reserve - Qatar</h1>
            <p className="text-grey-400 text-sm">
              Terminal Bloomberg unifié - Monitoring de la réserve stratégique Bitcoin
            </p>
          </div>

          {/* Filtres temps */}
          <div className="flex items-center gap-2">
            {['day', 'week', 'month', 'year', 'all'].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-wide transition-all duration-normal ${
                  timeFilter === filter
                    ? 'bg-hearst-green text-black'
                    : 'bg-dark-600 text-grey-400 hover:bg-dark-500'
                }`}
              >
                {filter === 'day' && 'Day'}
                {filter === 'week' && 'Week'}
                {filter === 'month' && 'Month'}
                {filter === 'year' && 'Year'}
                {filter === 'all' && 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* KPIs Header (3 cartes principales) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* BTC Price */}
          <div className="bg-dark-700 border border-grey-100 rounded-xl p-6 hover:border-hearst-green/30 transition-all duration-normal">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-grey-400 text-xs font-medium uppercase tracking-wide mb-1">BTC Price</p>
                <p className="text-3xl font-bold text-white font-mono">
                  ${kpis.btcPrice.toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-hearst-green/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-hearst-green" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-hearst-green" />
              <span className="text-hearst-green font-semibold text-sm">+{kpis.priceChange}%</span>
              <span className="text-grey-500 text-xs ml-1">24h</span>
            </div>
          </div>

          {/* Reserve */}
          <div className="bg-dark-700 border border-grey-100 rounded-xl p-6 hover:border-hearst-green/30 transition-all duration-normal">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-grey-400 text-xs font-medium uppercase tracking-wide mb-1">Reserve</p>
                <p className="text-3xl font-bold text-white font-mono">{kpis.reserve} BTC</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-hearst-green/10 flex items-center justify-center">
                <Bitcoin className="w-5 h-5 text-hearst-green" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-grey-400" />
              <span className="text-grey-400 text-sm">
                {((kpis.reserve / kpis.target) * 100).toFixed(1)}% of target
              </span>
            </div>
          </div>

          {/* ROI */}
          <div className="bg-dark-700 border border-grey-100 rounded-xl p-6 hover:border-hearst-green/30 transition-all duration-normal">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-grey-400 text-xs font-medium uppercase tracking-wide mb-1">ROI</p>
                <p className="text-3xl font-bold text-hearst-green font-mono">+{kpis.roi}%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-hearst-green/10 flex items-center justify-center">
                <TrendingUpIcon className="w-5 h-5 text-hearst-green" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-grey-400" />
              <span className="text-grey-400 text-sm">Excellent performance</span>
            </div>
          </div>
        </div>

        {/* Layout principal : Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* SIDEBAR - Statistiques détaillées */}
          <div className="lg:col-span-1 space-y-6">
            {/* BTC RESERVE */}
            <div className="bg-dark-700 border border-grey-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Bitcoin className="w-4 h-4 text-hearst-green" />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wide">BTC Reserve</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-grey-400 mb-1">Total BTC</p>
                  <p className="text-lg font-bold text-white font-mono">{kpis.reserve} BTC</p>
                </div>
                <div>
                  <p className="text-xs text-grey-400 mb-1">Monthly Add</p>
                  <p className="text-lg font-bold text-hearst-green font-mono">+{kpis.monthlyAdd} BTC</p>
                </div>
                <div>
                  <p className="text-xs text-grey-400 mb-1">Avg Cost</p>
                  <p className="text-lg font-bold text-white font-mono">${kpis.avgCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-grey-400 mb-1">Target</p>
                  <p className="text-lg font-bold text-white font-mono">{kpis.target} BTC</p>
                </div>
              </div>
            </div>

            {/* PORTFOLIO USD */}
            <div className="bg-dark-700 border border-grey-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-4 h-4 text-hearst-green" />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Portfolio USD</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-grey-400 mb-1">Valeur actuelle</p>
                  <p className="text-lg font-bold text-white font-mono">
                    ${(kpis.portfolioValue / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div>
                  <p className="text-xs text-grey-400 mb-1">Invested</p>
                  <p className="text-lg font-bold text-white font-mono">
                    ${(kpis.invested / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div>
                  <p className="text-xs text-grey-400 mb-1">P&L</p>
                  <p className="text-lg font-bold text-hearst-green font-mono">
                    +${(kpis.pnl / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div>
                  <p className="text-xs text-grey-400 mb-1">ROI</p>
                  <p className="text-lg font-bold text-hearst-green font-mono">+{kpis.roi}%</p>
                </div>
              </div>
            </div>

            {/* PERFORMANCE */}
            <div className="bg-dark-700 border border-grey-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-hearst-green" />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Performance</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-grey-400 mb-1">ROI</p>
                  <p className="text-lg font-bold text-hearst-green font-mono">+{kpis.roi}%</p>
                </div>
                <div>
                  <p className="text-xs text-grey-400 mb-1">Sharpe Ratio</p>
                  <p className="text-lg font-bold text-white font-mono">{kpis.sharpeRatio}</p>
                </div>
                <div>
                  <p className="text-xs text-grey-400 mb-1">Volatility</p>
                  <p className="text-lg font-bold text-white font-mono">{kpis.volatility}%</p>
                </div>
                <div>
                  <p className="text-xs text-grey-400 mb-1">Max Drawdown</p>
                  <p className="text-lg font-bold text-error font-mono">{kpis.maxDrawdown}%</p>
                </div>
              </div>
            </div>

            {/* QUICK STATS */}
            <div className="bg-dark-700 border border-grey-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-hearst-green" />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Quick Stats</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-grey-400 mb-1">Breakeven</p>
                  <p className="text-lg font-bold text-white font-mono">${kpis.breakeven.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-grey-400 mb-1">Profit Streak</p>
                  <p className="text-lg font-bold text-hearst-green font-mono">{kpis.profitStreak} months</p>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT - Graphiques */}
          <div className="lg:col-span-3 space-y-6">
            {/* Bitcoin Price Action */}
            <div className="bg-dark-700 border border-grey-100 rounded-xl p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">Bitcoin Price Action</h3>
                <p className="text-sm text-grey-400">30 derniers jours (21 Nov - 20 Dec)</p>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={mockBitcoinPriceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
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
                    domain={[35000, 55000]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={54422} stroke="#f39c12" strokeDasharray="3 3" label="Breakeven" />
                  <Area
                    type="monotone"
                    dataKey="close"
                    stroke="#8afd81"
                    strokeWidth={2}
                    fill="url(#priceGradient)"
                  />
                  <Bar dataKey="volume" fill="#8afd81" opacity={0.1} yAxisId="right" />
                  <YAxis yAxisId="right" orientation="right" hide />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* BTC Accumulation */}
            <div className="bg-dark-700 border border-grey-100 rounded-xl p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">BTC Accumulation</h3>
                <p className="text-sm text-grey-400">12 mois (Janvier - Décembre)</p>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <ComposedChart data={mockAccumulationData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                  <XAxis
                    dataKey="month"
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
                  <ReferenceLine y={300} stroke="#f39c12" strokeDasharray="3 3" label="Target" />
                  <Bar dataKey="added" fill="#8afd81" radius={[4, 4, 0, 0]} opacity={0.6} />
                  <Line
                    type="monotone"
                    dataKey="btc"
                    stroke="#8afd81"
                    strokeWidth={3}
                    dot={{ fill: '#8afd81', r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Portfolio Value */}
            <div className="bg-dark-700 border border-grey-100 rounded-xl p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">Portfolio Value</h3>
                <p className="text-sm text-grey-400">12 mois (Janvier - Décembre)</p>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <ComposedChart data={mockPortfolioData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8afd81" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8afd81" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                  <XAxis
                    dataKey="month"
                    stroke="#666666"
                    tick={{ fill: '#666666', fontSize: 11 }}
                    axisLine={{ stroke: '#2a2a2a' }}
                  />
                  <YAxis
                    stroke="#666666"
                    tick={{ fill: '#666666', fontSize: 11 }}
                    axisLine={{ stroke: '#2a2a2a' }}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8afd81"
                    strokeWidth={2}
                    fill="url(#portfolioGradient)"
                  />
                  <Line
                    type="monotone"
                    dataKey="invested"
                    stroke="#666666"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Footer - Statistiques 24h */}
        <div className="bg-dark-700 border border-grey-100 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div>
                <p className="text-xs text-grey-400 mb-1">Volume 24h</p>
                <p className="text-sm font-bold text-white font-mono">{kpis.volume24h.toLocaleString()} BTC</p>
              </div>
              <div className="h-8 w-px bg-grey-100" />
              <div>
                <p className="text-xs text-grey-400 mb-1">High 24h</p>
                <p className="text-sm font-bold text-hearst-green font-mono">${kpis.high24h.toLocaleString()}</p>
              </div>
              <div className="h-8 w-px bg-grey-100" />
              <div>
                <p className="text-xs text-grey-400 mb-1">Low 24h</p>
                <p className="text-sm font-bold text-error font-mono">${kpis.low24h.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-hearst-green/10 border border-hearst-green/30 rounded">
                <div className="w-2 h-2 rounded-full bg-hearst-green animate-pulse-green" />
                <span className="text-xs font-semibold text-hearst-green uppercase tracking-wide">Live</span>
              </div>
              <span className="text-xs text-grey-400">Hearst Qatar • Strategic Reserve</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

