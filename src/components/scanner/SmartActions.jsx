import React from 'react';
import { motion } from 'framer-motion';
import { Recycle, BookOpen, MessageSquare, MapPin, AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { CategoryBadge, RiskBadge } from '../ui/Badge';

export const SmartActions = ({ detection, onAction }) => {
  const actions = [
    {
      key: 'segregate',
      label: 'Segregate',
      icon: Recycle,
      variant: 'primary',
      description: 'Add to segregation plan',
    },
    {
      key: 'guide',
      label: 'View Guide',
      icon: BookOpen,
      variant: 'secondary',
      description: 'Detailed disposal guide',
    },
    {
      key: 'ask',
      label: 'Ask AI',
      icon: MessageSquare,
      variant: 'ghost',
      description: 'Chat with WasteVision AI',
    },
    {
      key: 'center',
      label: 'Find Center',
      icon: MapPin,
      variant: 'ghost',
      description: 'Locate disposal facility',
    },
    {
      key: 'report',
      label: 'Report Issue',
      icon: AlertCircle,
      variant: 'ghost',
      description: 'Flag incorrect detection',
    },
    {
      key: 'retake',
      label: 'Retake',
      icon: RotateCcw,
      variant: 'ghost',
      description: 'Capture new image',
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <motion.button
          key={action.key}
          onClick={() => onAction(action.key, detection)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * actions.indexOf(action) }}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200
            ${action.variant === 'primary' 
              ? 'bg-forest-700 text-white hover:bg-forest-800' 
              : action.variant === 'secondary'
                ? 'bg-white text-forest-700 border-2 border-forest-700 hover:bg-forest-50'
                : 'text-slate-600 hover:bg-slate-100'
            }
          `}
        >
          <action.icon className="w-4 h-4" />
          <span>{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export const DetectionTable = ({ detections, selectedId, onSelect, onAction }) => {
  const headers = ['Object', 'Category', 'Confidence', 'Material', 'Risk', 'Action'];

  return (
    <div className="overflow-x-auto">
      <table className="w-full" role="table">
        <thead>
          <tr className="border-b border-slate-200">
            {headers.map((header) => (
              <th key={header} className="text-left px-4 py-3 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {detections.map((detection, index) => (
            <tr 
              key={detection.id}
              className={`${selectedId === detection.id ? 'bg-forest-50' : ''} hover:bg-slate-50 transition-colors`}
              onClick={() => onSelect(detection.id)}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: getCategoryColor(detection.category) }}>
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-slate-900">{detection.object}</p>
                    <p className="text-xs text-slate-500">{detection.material.slice(0, 2).join(', ')}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <CategoryBadge category={detection.category} size="sm" />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ 
                      width: `${detection.confidence * 100}%`,
                      backgroundColor: getCategoryColor(detection.category)
                    }} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{Math.round(detection.confidence * 100)}%</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {detection.material.slice(0, 3).map((m, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs">
                      {m}
                    </span>
                  ))}
                  {detection.material.length > 3 && (
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded-full text-xs">
                      +{detection.material.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <RiskBadge risk={detection.risk} size="sm" />
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onAction('guide', detection); }}>
                    Guide
                  </Button>
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onAction('ask', detection); }}>
                    Ask AI
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function getCategoryColor(category) {
  const colors = {
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
  return colors[category] || colors.mixed;
}