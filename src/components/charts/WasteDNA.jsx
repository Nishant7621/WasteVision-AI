import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCategoryColor, getCategoryLabel } from '../../utils/helpers';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';

export const WasteDNA = ({ composition }) => {
  const barsRef = useRef(null);
  
  const sorted = [...composition].sort((a, b) => b.percentage - a.percentage);
  if (sorted.length === 0) {
    return (
      <Card padding="lg">
        <CardHeader>
          <CardTitle>Waste DNA</CardTitle>
          <CardDescription>A visual fingerprint of everything detected in this waste sample</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">No verified detections are available to build a Waste DNA profile.</p>
        </CardContent>
      </Card>
    );
  }
  const maxPercentage = Math.max(...sorted.map(c => c.percentage));

  return (
    <Card padding="lg">
      <CardHeader>
        <CardTitle>Waste DNA</CardTitle>
        <CardDescription>A visual fingerprint of everything detected in this waste sample</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4" ref={barsRef}>
          {sorted.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: getCategoryColor(item.category) }} />
                <span className="text-sm font-medium text-slate-700 w-32 truncate">{getCategoryLabel(item.category)}</span>
                <span className="text-sm font-semibold text-slate-900 w-12 text-right">{item.percentage}%</span>
              </div>
              <div className="relative h-8 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.percentage / maxPercentage) * 100}%` }}
                  transition={{ delay: 0.1 * index + 0.2, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-y-0 left-0 rounded-full flex items-center pl-3"
                  style={{ backgroundColor: getCategoryColor(item.category) }}
                >
                  <span className="text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.object_count} object{item.object_count > 1 ? 's' : ''} • {Math.round(item.confidence * 100)}% avg confidence
                  </span>
                </motion.div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-slate-500">
                  {item.percentage}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200"
        >
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
            <span className="font-medium text-slate-900">Total:</span>
            <span>{sorted.reduce((sum, c) => sum + c.object_count, 0)} objects detected</span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <span className="font-medium text-slate-900">Categories:</span>
              <span>{sorted.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-slate-900">Avg Confidence:</span>
              <span>{Math.round(sorted.reduce((sum, c) => sum + c.confidence, 0) / sorted.length * 100)}%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-slate-900">Dominant:</span>
              <span className="font-medium" style={{ color: getCategoryColor(sorted[0].category) }}>
                {getCategoryLabel(sorted[0].category)} ({sorted[0].percentage}%)
              </span>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};
