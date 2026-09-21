import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scan, 
  Box, 
  CheckCircle, 
  Layers, 
  Recycle, 
  Zap, 
  Flame, 
  Award,
  ChevronDown,
  Calendar,
  TrendingUp,
  Target
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockUserScans, mockImpactMetrics } from '../services/mockData';
import { formatNumber, formatWeight } from '../utils/helpers';
import { WasteCompositionBars } from '../components/charts/WasteComposition';
import { WasteDNA } from '../components/charts/WasteDNA';

const mockMonthlyComposition = [
  { month: 'Jan', plastic: 30, eWaste: 25, organic: 20, paper: 15, glass: 10 },
  { month: 'Feb', plastic: 28, eWaste: 27, organic: 22, paper: 13, glass: 10 },
  { month: 'Mar', plastic: 32, eWaste: 24, organic: 18, paper: 16, glass: 10 },
  { month: 'Apr', plastic: 29, eWaste: 26, organic: 21, paper: 14, glass: 10 },
  { month: 'May', plastic: 31, eWaste: 23, organic: 19, paper: 17, glass: 10 },
  { month: 'Jun', plastic: 27, eWaste: 28, organic: 20, paper: 15, glass: 10 },
];

const mockTopCategories = [
  { name: 'Plastic Waste', count: 156, percentage: 32, color: '#3b82f6' },
  { name: 'E-Waste', count: 134, percentage: 28, color: '#ec4899' },
  { name: 'Organic Waste', count: 89, percentage: 18, color: '#16a34a' },
  { name: 'Paper & Cardboard', count: 67, percentage: 14, color: '#8b5cf6' },
  { name: 'Glass Waste', count: 38, percentage: 8, color: '#f59e0b' },
];

export const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [streak, setStreak] = useState(12);

  const stats = [
    { label: 'My Scans', value: mockUserScans.length, icon: Scan, color: 'blue', trend: '+3 this month' },
    { label: 'Objects Identified', value: mockUserScans.reduce((sum, s) => sum + s.detections_count, 0), icon: Box, color: 'forest', trend: '+47 this month' },
    { label: 'Correct Detections', value: mockUserScans.filter(s => s.is_verified).length, icon: CheckCircle, color: 'green', trend: '94% accuracy' },
    { label: 'Categories Found', value: [...new Set(mockUserScans.flatMap(s => s.categories))].length, icon: Layers, color: 'purple', trend: 'All 15 categories' },
    { label: 'Recyclable Waste', value: formatWeight(12.4), icon: Recycle, color: 'amber', trend: '68% of total' },
    { label: 'Eco Points', value: 2847, icon: Award, color: 'yellow', trend: '+234 this week' },
  ];

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
              <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
              <p className="text-slate-600 mt-1">Track your waste segregation journey and impact</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-forest-50 border border-forest-200 rounded-xl px-4 py-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-bold text-forest-700">{streak}</span>
                <span className="text-sm text-forest-600">Day Streak</span>
              </div>
              <Button variant="secondary" className="gap-2">
                <Calendar className="w-4 h-4" />
                {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <Card padding="lg" className="h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{stat.trend}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-[${stat.color}]-100 flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6" style={{ color: `var(--color-${stat.color}-600)` }} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card padding="lg">
              <CardHeader>
                <CardTitle>Monthly Waste Composition</CardTitle>
                <CardDescription>Your waste breakdown over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="h-full space-y-4">
                    {mockMonthlyComposition.map((month, index) => (
                      <motion.div
                        key={month.month}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-slate-700 w-16">{month.month}</span>
                          <div className="flex-1 h-8 bg-slate-100 rounded-full overflow-hidden relative">
                            <div className="absolute inset-0 flex" style={{ backgroundColor: 'transparent' }}>
                              <div className="h-full rounded-full" style={{ 
                                width: `${month.plastic}%`, 
                                backgroundColor: '#3b82f6',
                                left: 0,
                              }} />
                              <div className="h-full rounded-full" style={{ 
                                width: `${month.eWaste}%`, 
                                backgroundColor: '#ec4899',
                                left: `${month.plastic}%`,
                              }} />
                              <div className="h-full rounded-full" style={{ 
                                width: `${month.organic}%`, 
                                backgroundColor: '#16a34a',
                                left: `${month.plastic + month.eWaste}%`,
                              }} />
                              <div className="h-full rounded-full" style={{ 
                                width: `${month.paper}%`, 
                                backgroundColor: '#8b5cf6',
                                left: `${month.plastic + month.eWaste + month.organic}%`,
                              }} />
                              <div className="h-full rounded-full" style={{ 
                                width: `${month.glass}%`, 
                                backgroundColor: '#f59e0b',
                                left: `${month.plastic + month.eWaste + month.organic + month.paper}%`,
                              }} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500" /> Plastic</div>
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-pink-500" /> E-Waste</div>
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500" /> Organic</div>
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-500" /> Paper</div>
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500" /> Glass</div>
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
                <CardTitle>Most Detected Categories</CardTitle>
                <CardDescription>Your top waste categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTopCategories.map((cat, index) => (
                    <motion.div
                      key={cat.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-slate-300 w-6 text-right">{index + 1}</span>
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                          <span className="text-sm font-medium text-slate-700">{cat.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{cat.count}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card padding="lg">
              <CardHeader>
                <CardTitle>Waste DNA - All Time</CardTitle>
                <CardDescription>Your cumulative waste fingerprint</CardDescription>
              </CardHeader>
              <CardContent>
                <WasteDNA composition={[
                  { category: 'plastic', percentage: 28, object_count: 45, confidence: 0.94 },
                  { category: 'e-waste', percentage: 24, object_count: 38, confidence: 0.93 },
                  { category: 'organic', percentage: 18, object_count: 29, confidence: 0.89 },
                  { category: 'paper', percentage: 12, object_count: 19, confidence: 0.92 },
                  { category: 'glass', percentage: 8, object_count: 13, confidence: 0.91 },
                  { category: 'biomedical', percentage: 6, object_count: 10, confidence: 0.97 },
                  { category: 'battery', percentage: 4, object_count: 6, confidence: 0.95 },
                ]} />
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
                  <CardTitle>Segregation Streak</CardTitle>
                  <Badge variant="success" size="sm" dot>{streak} Days</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-forest-100 flex items-center justify-center">
                    <Flame className="w-10 h-10 text-orange-500" />
                  </div>
                  <p className="text-4xl font-bold text-slate-900">{streak}</p>
                  <p className="text-slate-500">Consecutive Days</p>
                  <p className="text-sm text-slate-400 mt-2">Keep scanning to maintain your streak!</p>
                </div>
                <div className="mt-6 grid grid-cols-7 gap-1" role="img" aria-label="Activity calendar">
                  {[...Array(28)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-8 rounded ${i < streak ? 'bg-forest-500' : 'bg-slate-200'}`}
                      title={i < streak ? 'Active' : 'Inactive'}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500 text-center mt-2">Last 28 days</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card padding="lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Scan History</CardTitle>
                  <CardDescription>Your recent waste analyses</CardDescription>
                </div>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Date</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Image</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Objects</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Categories</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Composition</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockUserScans.map((scan) => (
                      <tr key={scan.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm text-slate-600">{new Date(scan.timestamp).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <img src={scan.image_url} alt="Scan preview" className="w-16 h-12 object-cover rounded-lg" />
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-slate-900">{scan.detections_count}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {scan.categories.slice(0, 3).map(cat => (
                              <Badge key={cat} variant="category" category={cat} size="sm" />
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {scan.composition.slice(0, 2).map(c => `${c.category} ${c.percentage}%`).join(', ')}
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
      </div>
    </div>
  );
};