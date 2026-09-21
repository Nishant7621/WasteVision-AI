import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Leaf, 
  Recycle, 
  Package, 
  Clock, 
  Calendar, 
  BarChart2,
  PieChart as PieChartIcon,
  AlertCircle,
  Info
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge, CategoryBadge } from '../components/ui/Badge';
import { mockImpactMetrics, mockUserScans } from '../services/mockData';
import { formatNumber, formatWeight } from '../utils/helpers';
import { WasteCompositionDonut, WasteCompositionBars } from '../components/charts/WasteComposition';

const mockMonthlyData = [
  { month: 'Jan', scans: 245, objects: 1234, co2: 156, recovered: 89 },
  { month: 'Feb', scans: 289, objects: 1456, co2: 189, recovered: 112 },
  { month: 'Mar', scans: 312, objects: 1567, co2: 203, recovered: 134 },
  { month: 'Apr', scans: 298, objects: 1498, co2: 195, recovered: 121 },
  { month: 'May', scans: 345, objects: 1723, co2: 234, recovered: 156 },
  { month: 'Jun', scans: 378, objects: 1890, co2: 267, recovered: 178 },
];

const mockCategoryTrends = [
  { category: 'plastic', percentage: 35, trend: 2.1 },
  { category: 'e-waste', percentage: 22, trend: 5.4 },
  { category: 'organic', percentage: 18, trend: -1.2 },
  { category: 'paper', percentage: 12, trend: 0.8 },
  { category: 'glass', percentage: 8, trend: -0.5 },
  { category: 'biomedical', percentage: 3, trend: 0.2 },
  { category: 'battery', percentage: 2, trend: 1.5 },
];

export const Impact = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [viewMode, setViewMode] = useState('overview');

  const metrics = mockImpactMetrics;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Impact Dashboard</h1>
              <p className="text-slate-600 mt-1">Environmental impact estimates from waste analysis</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="info" size="sm" dot>
                <AlertCircle className="w-3 h-3 mr-1" />
                Modelled Estimates
              </Badge>
              <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
                {['week', 'month', 'quarter', 'year'].map(range => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      timeRange === range
                        ? 'bg-white text-forest-700 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Waste Analyzed</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{formatWeight(metrics.waste_analyzed)}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm text-forest-600">
              <TrendingUp className="w-4 h-4" />
              <span>+12.3% vs last period</span>
            </div>
          </Card>

          <Card padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Objects Detected</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{formatNumber(metrics.objects_detected)}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-forest-100 flex items-center justify-center">
                <Recycle className="w-6 h-6 text-forest-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm text-forest-600">
              <TrendingUp className="w-4 h-4" />
              <span>+8.7% vs last period</span>
            </div>
          </Card>

          <Card padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Potentially Recoverable</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{formatWeight(metrics.potentially_recoverable)}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm text-forest-600">
              <TrendingUp className="w-4 h-4" />
              <span>+15.2% vs last period</span>
            </div>
          </Card>

          <Card padding="lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">CO₂ Avoidance (Est.)</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{formatNumber(metrics.co2_avoidance)} kg</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm text-forest-600">
              <TrendingUp className="w-4 h-4" />
              <span>+22.1% vs last period</span>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card padding="lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Waste Composition</CardTitle>
                    <CardDescription>Breakdown of all analyzed waste</CardDescription>
                  </div>
                  <Badge variant="info" size="sm" dot>Modelled</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <WasteCompositionDonut composition={[
                    { category: 'plastic', percentage: 28, object_count: 45, confidence: 0.94 },
                    { category: 'e-waste', percentage: 24, object_count: 38, confidence: 0.93 },
                    { category: 'organic', percentage: 18, object_count: 29, confidence: 0.89 },
                    { category: 'paper', percentage: 12, object_count: 19, confidence: 0.92 },
                    { category: 'glass', percentage: 8, object_count: 13, confidence: 0.91 },
                    { category: 'biomedical', percentage: 6, object_count: 10, confidence: 0.97 },
                    { category: 'battery', percentage: 4, object_count: 6, confidence: 0.95 },
                  ]} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card padding="lg">
              <CardHeader>
                <CardTitle>Category Trends</CardTitle>
                <CardDescription>Detection frequency by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCategoryTrends.map((item, index) => (
                    <motion.div
                      key={item.category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryColors[item.category] }} />
                          <span className="text-sm font-medium text-slate-700 capitalize">{item.category.replace('-', ' ')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900">{item.percentage}%</span>
                          <span className={`text-xs font-medium ${item.trend >= 0 ? 'text-forest-600' : 'text-red-600'}`}>
                            {item.trend >= 0 ? '↑' : '↓'} {Math.abs(item.trend)}%
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000" style={{ 
                          width: `${item.percentage}%`,
                          backgroundColor: categoryColors[item.category]
                        }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid lg:grid-cols-2 gap-6 mb-8"
        >
          <Card padding="lg">
            <CardHeader>
              <CardTitle>Monthly Scans Trend</CardTitle>
              <CardDescription>Waste analysis activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <div className="h-full flex items-end justify-around gap-2 px-4">
                  {mockMonthlyData.map((data, index) => (
                    <motion.div
                      key={data.month}
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ delay: 0.05 * index, duration: 0.5 }}
                      className="flex flex-col items-center flex-1"
                    >
                      <div 
                        className="w-full bg-forest-500 rounded-t transition-all duration-300 hover:bg-forest-600"
                        style={{ height: `${(data.scans / 400) * 100}%`, minHeight: '20px' }}
                      />
                      <span className="text-xs text-slate-500 mt-2">{data.month}</span>
                      <span className="text-xs font-medium text-slate-900">{data.scans}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card padding="lg">
            <CardHeader>
              <CardTitle>Recovery Potential</CardTitle>
              <CardDescription>Estimated material recovery by month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <div className="h-full flex items-end justify-around gap-2 px-4">
                  {mockMonthlyData.map((data, index) => (
                    <motion.div
                      key={data.month}
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ delay: 0.05 * index, duration: 0.5 }}
                      className="flex flex-col items-center flex-1"
                    >
                      <div 
                        className="w-full bg-purple-500 rounded-t transition-all duration-300 hover:bg-purple-600"
                        style={{ height: `${(data.recovered / 200) * 100}%`, minHeight: '20px' }}
                      />
                      <span className="text-xs text-slate-500 mt-2">{data.month}</span>
                      <span className="text-xs font-medium text-slate-900">{data.recovered} kg</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card padding="lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Scans</CardTitle>
                  <CardDescription>Latest waste analysis activity</CardDescription>
                </div>
                <Badge variant="info" size="sm" dot>Estimated Values</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Date</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Objects</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Categories</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Top Category</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Recoverable (Est.)</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">CO₂ Avoided (Est.)</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockUserScans.map((scan) => (
                      <tr key={scan.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {new Date(scan.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-slate-900">{scan.detections_count}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{scan.categories.length}</td>
                        <td className="px-4 py-3">
                          <CategoryBadge category={scan.categories[0]} size="sm" />
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-900">
                          {formatWeight(scan.composition.reduce((sum, c) => sum + (c.weight_estimate || 0), 0))}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-900">
                          {Math.round(scan.composition.reduce((sum, c) => sum + c.percentage * 10, 0))} kg
                        </td>
                        <td className="px-4 py-3">
                          {scan.is_verified ? (
                            <Badge variant="success" size="sm" dot>Verified</Badge>
                          ) : (
                            <Badge variant="warning" size="sm" dot>Pending</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-6 bg-slate-950 text-white rounded-2xl"
        >
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-forest-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-lg mb-2">About These Estimates</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                All impact values shown are <strong className="text-white">modelled estimates</strong> based on detected waste composition, 
                configured assumptions, and standard emission factors. They are not measured real-world impacts.
              </p>
              <ul className="list-disc list-inside text-slate-400 text-sm mt-3 space-y-1">
                <li>Weight estimates based on average object weights per category</li>
                <li>CO₂ avoidance calculated using EPA WARM model equivalents</li>
                <li>Recovery potential based on typical material recovery rates</li>
                <li>Landfill diversion assumes proper segregation and disposal</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const categoryColors = {
  organic: '#16a34a',
  plastic: '#3b82f6',
  paper: '#8b5cf6',
  glass: '#f59e0b',
  metal: '#64748b',
  'e-waste': '#ec4899',
  biomedical: '#ef4444',
  hazardous: '#dc2626',
  battery: '#f97316',
  textile: '#06b6d4',
  construction: '#78716c',
  rubber: '#525252',
  sanitary: '#f43f5e',
  chemical: '#7c2d12',
  mixed: '#94a3b8'
};