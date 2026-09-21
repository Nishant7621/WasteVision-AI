import React from 'react';
import { motion } from 'framer-motion';
import { X, AlertTriangle, Shield, Recycle, Trash2, Leaf, Info } from 'lucide-react';
import { getCategoryColor, getCategoryLabel, getRiskColor, getRiskLabel } from '../../utils/helpers';
import { CategoryBadge, RiskBadge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export const ItemIntelligence = ({ 
  detection, 
  onClose,
  graniteRecommendation,
  ragSources 
}) => {
  if (!detection) return null;

  const categoryColor = getCategoryColor(detection.category);
  const riskColor = getRiskColor(detection.risk);

  const recommendation = graniteRecommendation?.recommendation;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-end"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="item-intelligence-title"
    >
      <motion.div
        className="w-full sm:w-96 lg:w-[400px] max-h-[90vh] bg-white shadow-2xl rounded-t-2xl sm:rounded-xl overflow-y-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: categoryColor }}>
              <span className="text-lg font-bold">{detection.object.charAt(0)}</span>
            </div>
            <div>
              <h3 id="item-intelligence-title" className="font-semibold text-slate-900">{detection.object}</h3>
              <CategoryBadge category={detection.category} size="sm" />
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl text-center">
              <p className="text-2xl font-bold text-slate-900">{Math.round(detection.confidence * 100)}%</p>
              <p className="text-xs text-slate-500">Confidence</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl text-center">
              <RiskBadge risk={detection.risk} size="sm" className="mx-auto" />
              <p className="text-xs text-slate-500 mt-1">Risk Level</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl text-center">
              <p className="text-sm font-bold text-slate-900">{detection.material.length}</p>
              <p className="text-xs text-slate-500">Materials</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-slate-700">Materials</h4>
            <div className="flex flex-wrap gap-2">
              {detection.material.map((material, i) => (
                <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                  {material}
                </span>
              ))}
            </div>
          </div>

          {recommendation && (
            <div className="space-y-4 border-t border-slate-200 pt-4">
              <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-forest-600" />
                AI Understanding
              </h4>
              
              <div className="space-y-3">
                {recommendation.why_it_matters && (
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                    <p className="text-sm text-blue-800">{recommendation.why_it_matters}</p>
                  </div>
                )}
                
                {recommendation.segregation && (
                  <div className="p-3 bg-forest-50 border border-forest-100 rounded-xl">
                    <p className="text-sm text-forest-800">
                      <strong>How to segregate:</strong> {recommendation.segregation}
                    </p>
                  </div>
                )}
                
                {recommendation.disposal && (
                  <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
                    <p className="text-sm text-amber-800">
                      <strong>How to dispose:</strong> {recommendation.disposal}
                    </p>
                  </div>
                )}
                
                {recommendation.safety && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-sm text-red-800">
                      <strong>Safety:</strong> {recommendation.safety}
                    </p>
                  </div>
                )}
                
                {recommendation.recovery && (
                  <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl">
                    <p className="text-sm text-purple-800">
                      <strong>Potential recovery:</strong> {recommendation.recovery}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {ragSources && ragSources.length > 0 && (
            <div className="space-y-3 border-t border-slate-200 pt-4">
              <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-forest-600" />
                Knowledge Sources
              </h4>
              <div className="space-y-2">
                {ragSources.map((source, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="font-medium text-slate-700 text-sm">{source.title}</p>
                    <p className="text-xs text-slate-500 mt-1">Relevance: {Math.round(source.relevance * 100)}%</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};