'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
} from 'recharts';

interface ChartProps {
  data: any[];
  dataKey: string;
  xAxisKey?: string;
  title?: string;
  subtitle?: string;
  color?: string;
  height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-700 border border-grey-100 rounded-lg p-3 shadow-xl">
        <p className="text-grey-400 text-xs mb-1">{label}</p>
        <p className="text-white font-mono font-bold">
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function HashrateChart({ data, title, subtitle }: ChartProps) {
  return (
    <div className="card">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-grey-500 mt-1">{subtitle}</p>}
        </div>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="hashrateGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8afd81" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8afd81" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#666666" 
            tick={{ fill: '#666666', fontSize: 11 }}
            axisLine={{ stroke: '#2a2a2a' }}
          />
          <YAxis 
            stroke="#666666" 
            tick={{ fill: '#666666', fontSize: 11 }}
            axisLine={{ stroke: '#2a2a2a' }}
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}`}
          />
          <Tooltip content={<CustomTooltip />} />
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
  );
}

export function PowerChart({ data, title, subtitle }: ChartProps) {
  return (
    <div className="card">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-grey-500 mt-1">{subtitle}</p>}
        </div>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#666666" 
            tick={{ fill: '#666666', fontSize: 11 }}
            axisLine={{ stroke: '#2a2a2a' }}
          />
          <YAxis 
            stroke="#666666" 
            tick={{ fill: '#666666', fontSize: 11 }}
            axisLine={{ stroke: '#2a2a2a' }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="power" 
            fill="#8afd81" 
            radius={[4, 4, 0, 0]}
            opacity={0.8}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TemperatureChart({ data, title, subtitle }: ChartProps) {
  return (
    <div className="card">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-grey-500 mt-1">{subtitle}</p>}
        </div>
      )}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#666666" 
            tick={{ fill: '#666666', fontSize: 11 }}
            axisLine={{ stroke: '#2a2a2a' }}
          />
          <YAxis 
            stroke="#666666" 
            tick={{ fill: '#666666', fontSize: 11 }}
            axisLine={{ stroke: '#2a2a2a' }}
            domain={[30, 50]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#f39c12"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MiniChart({ data, dataKey, color = '#8afd81' }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={60}>
      <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`mini-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.2} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#mini-${dataKey})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

