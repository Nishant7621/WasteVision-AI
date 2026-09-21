import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, X, Shield, Info, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export const RiskAlert = ({ detections, onDismiss, onViewDetails }) => {
  const criticalDetections = detections.filter(d => d.risk === 'critical');
  const highRiskDetections = detections.filter(d => d.risk === 'high');
  
  if (criticalDetections.length === 0 && highRiskDetections.length === 0) {
    return null;
  }

  const hasCritical = criticalDetections.length > 0;
  const alertDetections = hasCritical ? criticalDetections : highRiskDetections;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      className={`relative max-w-2xl mx-auto mt-4 px-4 z-10 ${hasCritical ? 'animate-pulse' : ''}`}
      role="alert"
      aria-live="assertive"
    >
      <div className={`bg-white border-2 rounded-2xl shadow-2xl overflow-hidden ${hasCritical ? 'border-red-500' : 'border-orange-500'}`}>
        <div className={`p-4 flex items-start gap-3 ${hasCritical ? 'bg-red-50' : 'bg-orange-50'}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${hasCritical ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
            {hasCritical ? <AlertTriangle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className={`font-semibold ${hasCritical ? 'text-red-800' : 'text-orange-800'}`}>
                {hasCritical ? 'CRITICAL RISK DETECTED' : 'HIGH RISK DETECTED'}
              </h3>
              <button
                onClick={onDismiss}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                aria-label="Dismiss alert"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className={`mt-1 text-sm ${hasCritical ? 'text-red-700' : 'text-orange-700'}`}>
              {hasCritical 
                ? 'Immediate professional handling required. Do not attempt to handle without proper training and equipment.'
                : 'Exercise caution. Follow safety protocols for handling and disposal.'
              }
            </p>
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-200">
          <div className="space-y-2">
            {alertDetections.map((detection) => (
              <div key={detection.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${hasCritical ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                  {detection.category === 'biomedical' && <Info className="w-4 h-4" />}
                  {detection.category === 'battery' && <AlertTriangle className="w-4 h-4" />}
                  {detection.category === 'hazardous' && <AlertCircle className="w-4 h-4" />}
                  {detection.category === 'e-waste' && <Shield className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{detection.object}</p>
                  <p className="text-sm text-slate-500">{detection.category} • {Math.round(detection.confidence * 100)}% confidence</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onViewDetails(detection)}
                  className="text-xs"
                >
                  Details
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="text-sm text-slate-600 mb-3">
              {hasCritical ? (
                <>
                  <strong>Immediate actions required:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Avoid direct contact with hazardous materials</li>
                    <li>Use appropriate PPE (gloves, eye protection)</li>
                    <li>Contact authorized disposal facility immediately</li>
                    <li>Do not mix with regular waste</li>
                  </ul>
                </>
              ) : (
                <>
                  <strong>Recommended precautions:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Wear protective gloves when handling</li>
                    <li>Keep separate from other waste streams</li>
                    <li>Follow specific disposal guidelines for each item</li>
                  </ul>
                </>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant={hasCritical ? 'danger' : 'primary'} 
                size="sm"
                onClick={() => onViewDetails(alertDetections[0])}
                className="gap-1"
              >
                <Shield className="w-4 h-4" />
                View Safety Protocol
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onDismiss}
              >
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const SanitizationBanner = ({ detections }) => {
  const biomedicalItems = detections.filter(d => d.category === 'biomedical');
  const hasBiomedical = biomedicalItems.length > 0;

  if (!hasBiomedical) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 text-red-600">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-red-800">Sanitization Risk Mode Active</h4>
          <p className="text-red-700 mt-1">
            Biomedical waste detected: {biomedicalItems.map(d => d.object).join(', ')}. 
            These items pose contamination and sharps injury risks.
          </p>
          <div className="mt-3 p-3 bg-white rounded-lg border border-red-100">
            <ul className="space-y-1 text-sm text-red-700">
              <li>• Avoid direct handling — use tongs or thick gloves</li>
              <li>• Place immediately in rigid sharps container</li>
              <li>• Contact authorized biomedical waste facility</li>
              <li>• Follow CBWTF disposal procedures</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
