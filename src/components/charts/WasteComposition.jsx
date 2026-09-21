import React, { useRef, useEffect } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { motion } from 'framer-motion';
import { getCategoryColor, getCategoryLabel } from '../../utils/helpers';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';

const COLORS = [
  '#16a34a', '#3b82f6', '#8b5cf6', '#f59e0b', '#64748b',
  '#ec4899', '#ef4444', '#dc2626', '#f97316', '#06b6d4',
  '#78716c', '#525252', '#f43f5e', '#7c2d12', '#94a3b8'
];

export const WasteCompositionDonut = ({ composition, animate = true }) => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (chartRef.current && animate) {
      chartRef.current.replayAnimation?.();
    }
  }, [composition, animate]);

  const data = composition.map((item, index) => ({
    name: getCategoryLabel(item.category),
    value: item.percentage,
    category: item.category,
    color: getCategoryColor(item.category),
    object_count: item.object_count,
    confidence: Math.round(item.confidence * 100),
  }));

  const totalObjects = composition.reduce((sum, item) => sum + item.object_count, 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-lg min-w-[200px]"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="font-semibold text-slate-900">{item.name}</span>
          </div>
          <div className="space-y-1 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Percentage</span>
              <span className="font-medium">{item.value}%</span>
            </div>
            <div className="flex justify-between">
              <span>Objects</span>
              <span className="font-medium">{item.object_count}</span>
            </div>
            <div className="flex justify-between">
              <span>Avg Confidence</span>
              <span className="font-medium">{item.confidence}%</span>
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="relative h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart ref={chartRef}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => percent > 0.08 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            formatter={(value) => value}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="text-center">
          <p className="text-3xl font-bold text-slate-900">{totalObjects}</p>
          <p className="text-sm text-slate-500">Total Objects</p>
        </div>
      </motion.div>
    </div>
  );
};

export const WasteCompositionBars = ({ composition, animate = true }) => {
  const data = composition
    .sort((a, b) => b.percentage - a.percentage)
    .map((item, index) => ({
      name: getCategoryLabel(item.category),
      value: item.percentage,
      category: item.category,
      color: getCategoryColor(item.category),
      object_count: item.object_count,
      confidence: Math.round(item.confidence * 100),
    }));

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <motion.div
          key={item.category}
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '100%' }}
          transition={{ delay: animate ? 0.1 * index : 0, duration: 0.5 }}
          className="group"
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-sm font-medium text-slate-700 w-28 truncate">{item.name}</span>
            <span className="text-sm font-semibold text-slate-900 w-12 text-right">{item.value}%</span>
            <span className="text-xs text-slate-400">({item.object_count} objects)</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.value}%` }}
              transition={{ delay: animate ? 0.1 * index + 0.2 : 0, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full rounded-full transition-all"
              style={{ backgroundColor: item.color }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const WasteCompositionCards = ({ composition }) => {
  const sorted = [...composition].sort((a, b) => b.percentage - a.percentage);
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {sorted.map((item) => (
        <motion.div
          key={item.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-forest-200 hover:bg-forest-50 transition-colors"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCategoryColor(item.category) }} />
            <span className="text-sm font-medium text-slate-700 truncate">{getCategoryLabel(item.category)}</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900">{item.percentage}%</span>
            <span className="text-xs text-slate-400">({item.object_count})</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const WasteComposition = ({ composition, view = 'donut' }) => {
  const [activeView, setActiveView] = React.useState(view);

  return (
    <Card padding="lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Waste Composition</CardTitle>
            <CardDescription>Breakdown of detected waste by category</CardDescription>
          </div>
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            {['donut', 'bars', 'cards'].map((v) => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                className={`
                  px-3 py-1.5 rounded-md text-sm font-medium transition-all
                  ${activeView === v 
                    ? 'bg-white text-forest-700 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                  }
                `}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {activeView === 'donut' && <WasteCompositionDonut composition={composition} />}
        {activeView === 'bars' && <WasteCompositionBars composition={composition} />}
        {activeView === 'cards' && <WasteCompositionCards composition={composition} />}
      </CardContent>
    </Card>
  );
};