import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, 
  TrendingUp, 
  AlertTriangle, 
  Cpu, 
  Syringe, 
  Recycle, 
  MapPin, 
  Filter, 
  Calendar, 
  Download,
  Eye,
  Settings
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { wasteCategories } from '../services/mockData';
import { getCategoryLabel, getCategoryColor } from '../utils/helpers';

const mockAdminMetrics = {
  totalScans: 12847,
  totalObjects: 67892,
  highRiskWaste: 3421,
  eWaste: 15678,
  biomedicalWaste: 2341,
  recyclableWaste: 28901,
};

const mockWeeklyTrends = [
  { week: 'Week 1', scans: 1245, highRisk: 89, eWaste: 342, biomedical: 23 },
  { week: 'Week 2', scans: 1567, highRisk: 112, eWaste: 401, biomedical: 31 },
  { week: 'Week 3', scans: 1389, highRisk: 97, eWaste: 378, biomedical: 28 },
  { week: 'Week 4', scans: 1723, highRisk: 134, eWaste: 445, biomedical: 35 },
];

const mockAreaData = [
  { area: 'Central', scans: 3421, highRisk: 234, eWaste: 890 },
  { area: 'North', scans: 2890, highRisk: 189, eWaste: 678 },
  { area: 'South', scans: 2567, highRisk: 156, eWaste: 543 },
  { area: 'East', scans: 2101, highRisk: 123, eWaste: 432 },
  { area: 'West', scans: 1868, highRisk: 98, eWaste: 378 },
];

export const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const stats = [
    { label: 'Total Scans', value: mockAdminMetrics.totalScans.toLocaleString(), icon: BarChart2, color: 'blue', trend: '+12.3%' },
    { label: 'Total Objects', value: mockAdminMetrics.totalObjects.toLocaleString(), icon: TrendingUp, color: 'forest', trend: '+8.7%' },
    { label: 'High-Risk Waste', value: mockAdminMetrics.highRiskWaste.toLocaleString(), icon: AlertTriangle, color: 'red', trend: '+5.2%' },
    { label: 'E-Waste', value: mockAdminMetrics.eWaste.toLocaleString(), icon: Cpu, color: 'pink', trend: '+15.4%' },
    { label: 'Biomedical', value: mockAdminMetrics.biomedicalWaste.toLocaleString(), icon: Syringe, color: 'rose', trend: '+3.1%' },
    { label: 'Recyclable', value: mockAdminMetrics.recyclableWaste.toLocaleString(), icon: Recycle, color: 'amber', trend: '+22.1%' },
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
              <h1 className="text-3xl font-bold text-slate-900">Municipal Dashboard</h1>
              <p className="text-slate-600 mt-1">Waste management analytics for city administration</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" className="gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
              <Button variant="ghost" className="gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
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
                    <p className="text-xs text-slate-500 mt-1">{stat.trend} vs last period</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-[${stat.color}]-100 flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6" style={{ color: `var(--color-${stat.color}-600)` }} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

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
                    <CardTitle>Weekly Trends</CardTitle>
                    <CardDescription>Scan activity and waste detection over time</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
                    >
                      <option value="week">Weekly</option>
                      <option value="month">Monthly</option>
                      <option value="quarter">Quarterly</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="h-full flex items-end justify-around gap-4 px-4">
                    {mockWeeklyTrends.map((data, index) => (
                      <motion.div
                        key={data.week}
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        transition={{ delay: 0.05 * index, duration: 0.5 }}
                        className="flex flex-col items-center flex-1"
                      >
                        <div className="flex gap-1 mb-2">
                          <div 
                            className="w-8 bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                            style={{ height: `${(data.scans / 2000) * 100}%` }}
                            title={`Total Scans: ${data.scans}`}
                          />
                          <div 
                            className="w-8 bg-red-500 rounded-t transition-all hover:bg-red-600"
                            style={{ height: `${(data.highRisk / 200) * 100}%` }}
                            title={`High Risk: ${data.highRisk}`}
                          />
                          <div 
                            className="w-8 bg-pink-500 rounded-t transition-all hover:bg-pink-600"
                            style={{ height: `${(data.eWaste / 500) * 100}%` }}
                            title={`E-Waste: ${data.eWaste}`}
                          />
                          <div 
                            className="w-8 bg-rose-500 rounded-t transition-all hover:bg-rose-600"
                            style={{ height: `${(data.biomedical / 50) * 100}%` }}
                            title={`Biomedical: ${data.biomedical}`}
                          />
                        </div>
                        <span className="text-xs text-slate-500">{data.week}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500" /> Total Scans</div>
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500" /> High Risk</div>
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-pink-500" /> E-Waste</div>
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-rose-500" /> Biomedical</div>
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
                <CardTitle>Waste Hotspots</CardTitle>
                <CardDescription>Areas with high waste activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAreaData.map((area, index) => (
                    <motion.div
                      key={area.area}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-500" />
                          <span className="font-semibold text-slate-900">{area.area}</span>
                        </div>
                        <Badge variant="info" size="sm">{area.scans.toLocaleString()} scans</Badge>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: `${(area.highRisk / 300) * 100}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>High Risk: {area.highRisk}</span>
                        <span>E-Waste: {area.eWaste}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card padding="lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Category Distribution</CardTitle>
                    <CardDescription>Waste breakdown by category</CardDescription>
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
                  >
                    <option value="all">All Categories</option>
                    {wasteCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <div className="h-full space-y-3">
                    {wasteCategories.slice(0, 8).map((cat, index) => {
                      const percentage = Math.random() * 30 + 5;
                      return (
                        <motion.div
                          key={cat.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * index }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                              <span className="text-sm font-medium text-slate-700">{cat.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-slate-900">{percentage.toFixed(1)}%</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: cat.color }} />
                          </div>
                        </motion.div>
                      );
                    })}
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
                <CardTitle>Hazardous Waste Alerts</CardTitle>
                <CardDescription>Critical waste requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: 'Biomedical', count: 23, area: 'Central Hospital Zone', severity: 'critical' },
                    { type: 'E-Waste', count: 156, area: 'Tech Park District', severity: 'high' },
                    { type: 'Battery', count: 45, area: 'Residential Sector 4', severity: 'high' },
                    { type: 'Chemical', count: 12, area: 'Industrial Zone B', severity: 'critical' },
                    { type: 'Mixed Hazardous', count: 8, area: 'Commercial District', severity: 'medium' },
                  ].map((alert, index) => (
                    <motion.div
                      key={alert.type}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className={`p-3 rounded-xl border-l-4 ${alert.severity === 'critical' ? 'bg-red-50 border-red-500' : alert.severity === 'high' ? 'bg-orange-50 border-orange-500' : 'bg-amber-50 border-amber-500'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-900">{alert.type} Waste</p>
                          <p className="text-sm text-slate-500">{alert.area}</p>
                        </div>
                        <Badge 
                          variant={alert.severity === 'critical' ? 'danger' : alert.severity === 'high' ? 'warning' : 'info'} 
                          size="sm" 
                          dot
                        >
                          {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {alert.count} items</span>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">View</Button>
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
          transition={{ delay: 0.6 }}
        >
          <Card padding="lg">
            <CardHeader>
              <CardTitle>Waste Hotspots Map</CardTitle>
              <CardDescription>Geographic distribution of waste activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-forest-100 to-blue-100 opacity-50" />
                <div className="relative z-10 text-center">
                  <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 text-lg">Interactive Map Placeholder</p>
                  <p className="text-slate-400 text-sm mt-1">Connect to mapping service (Mapbox, Leaflet, Google Maps)</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <Button variant="ghost" size="sm">Heatmap</Button>
                    <Button variant="ghost" size="sm">Clusters</Button>
                    <Button variant="ghost" size="sm">Filters</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};