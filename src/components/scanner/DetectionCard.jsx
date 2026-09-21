import React from 'react';
import { motion } from 'framer-motion';
import { getCategoryColor, getCategoryLabel, getRiskColor, getRiskLabel, formatConfidence } from '../../utils/helpers';
import { CategoryBadge, RiskBadge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const DetectionCard = ({ 
  detection, 
  selected, 
  onSelect, 
  index 
}) => {
  const categoryColor = getCategoryColor(detection.category);
  const riskColor = getRiskColor(detection.risk);

  return (
    <motion.button
      onClick={() => onSelect(detection.id)}
      className={`
        w-full relative p-4 rounded-xl border-2 transition-all duration-200
        ${selected 
          ? 'border-forest-500 bg-forest-50 shadow-lg shadow-forest-500/10' 
          : 'border-slate-200 hover:border-forest-200 hover:bg-slate-50'
        }
        text-left focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2
      `}
      style={{ borderLeftColor: selected ? categoryColor : 'transparent', borderLeftWidth: '4px' }}
      aria-pressed={selected}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg text-white text-sm font-bold"
          style={{ backgroundColor: categoryColor }}>
          {index + 1}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-slate-900 truncate">{detection.object}</h4>
            <CategoryBadge category={detection.category} size="sm" />
          </div>
          
          <div className="flex items-center gap-3 text-sm text-slate-500 mb-2">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryColor }} />
              {getCategoryLabel(detection.category)}
            </span>
            <span className="flex items-center gap-1 font-medium" style={{ color: riskColor }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: riskColor }} />
              {getRiskLabel(detection.risk)} Risk
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1 font-medium text-slate-600">
              Confidence: {formatConfidence(detection.confidence)}
            </span>
            <span>Materials: {detection.material.slice(0, 2).join(', ')}{detection.material.length > 2 ? '...' : ''}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${detection.confidence * 100}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full rounded-full"
              style={{ backgroundColor: categoryColor }}
            />
          </div>
          <span className="text-xs font-medium" style={{ color: categoryColor }}>
            {formatConfidence(detection.confidence)}
          </span>
        </div>
      </div>
      
      {selected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-forest-100"
        >
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" size="sm" className="gap-1">
              Segregate
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              View Guide
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              Ask AI
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              Find Center
            </Button>
          </div>
        </motion.div>
      )}
    </motion.button>
  );
};