import React from 'react';
import { motion } from 'framer-motion';
import { Recycle, Leaf, Cpu, Skull, Syringe, AlertTriangle, Trash2, ArrowRight, CheckCircle } from 'lucide-react';
import { getCategoryColor, getCategoryLabel, getRiskColor, getRiskLabel } from '../../utils/helpers';
import { CategoryBadge, RiskBadge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

const binConfig = {
  'organic': { 
    label: 'BIO WASTE', 
    icon: Leaf, 
    color: '#16a34a', 
    bg: 'bg-forest-50',
    border: 'border-forest-100',
    categories: ['organic']
  },
  'recyclable': { 
    label: 'RECYCLABLE', 
    icon: Recycle, 
    color: '#3b82f6', 
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    categories: ['plastic', 'paper', 'glass', 'metal']
  },
  'e-waste': { 
    label: 'E-WASTE', 
    icon: Cpu, 
    color: '#ec4899', 
    bg: 'bg-pink-50',
    border: 'border-pink-100',
    categories: ['e-waste']
  },
  'hazardous': { 
    label: 'HAZARDOUS', 
    icon: Skull, 
    color: '#dc2626', 
    bg: 'bg-red-50',
    border: 'border-red-100',
    categories: ['hazardous', 'battery', 'chemical']
  },
  'biomedical': { 
    label: 'BIOMEDICAL', 
    icon: Syringe, 
    color: '#ef4444', 
    bg: 'bg-red-50',
    border: 'border-red-100',
    categories: ['biomedical', 'sanitary']
  },
};

export const SegregationPlan = ({ detections, composition }) => {
  const bins = Object.entries(binConfig).map(([key, config]) => {
    const binDetections = detections.filter(d => config.categories.includes(d.category));
    const binComposition = composition.filter(c => config.categories.includes(c.category));
    const totalPercentage = binComposition.reduce((sum, c) => sum + c.percentage, 0);
    const totalObjects = binDetections.length;
    const maxRisk = binDetections.reduce((max, d) => {
      const riskOrder = { low: 0, medium: 1, high: 2, critical: 3 };
      return riskOrder[d.risk] > riskOrder[max] ? d.risk : max;
    }, 'low');

    return {
      key,
      ...config,
      detections: binDetections,
      totalPercentage,
      totalObjects,
      maxRisk,
    };
  }).filter(bin => bin.totalObjects > 0);

  return (
    <Card padding="lg">
      <CardHeader>
        <CardTitle>Recommended Segregation Plan</CardTitle>
        <CardDescription>Virtual bins for smart waste separation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bins.map((bin, index) => (
            <motion.div
              key={bin.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              className={`relative p-4 rounded-xl border ${bin.bg} ${bin.border}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: bin.color }}>
                  <bin.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-slate-900">{bin.label}</h5>
                  <p className="text-xs text-slate-500">{bin.totalObjects} items • {bin.totalPercentage}%</p>
                </div>
                <RiskBadge risk={bin.maxRisk} size="sm" />
              </div>
              
              <ul className="space-y-2 mb-4">
                {bin.detections.map((detection) => (
                  <li key={detection.id} className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: getCategoryColor(detection.category) }} />
                    <span className="font-medium text-slate-700 truncate">{detection.object}</span>
                    <span className="text-slate-400">{Math.round(detection.confidence * 100)}%</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-1 text-slate-600">
                  <CheckCircle className="w-3 h-3" style={{ color: bin.color }} />
                  <span>Separate into designated bin</span>
                </div>
                <div className="flex items-center gap-1 text-slate-600">
                  <CheckCircle className="w-3 h-3" style={{ color: bin.color }} />
                  <span>Follow preparation guidelines</span>
                </div>
                {bin.key === 'biomedical' && (
                  <div className="flex items-center gap-1 text-red-600">
                    <AlertTriangle className="w-3 h-3" />
                    <span>CRITICAL: Professional handling required</span>
                  </div>
                )}
                {bin.key === 'hazardous' && (
                  <div className="flex items-center gap-1 text-red-600">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Use authorized disposal facility</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};