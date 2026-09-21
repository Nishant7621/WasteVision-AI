import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, Image, ScanEye, Tag, Box, PieChart, Database, Brain, CheckCircle2 } from 'lucide-react';

const stages = [
  { id: 'image', label: 'Image Received', icon: Image, description: 'Upload validated and preprocessed' },
  { id: 'detection', label: 'Object Detection', icon: ScanEye, description: 'YOLOv8 identifies individual objects' },
  { id: 'classification', label: 'Waste Classification', icon: Tag, description: 'ResNet classifies each object into waste categories' },
  { id: 'material', label: 'Material Analysis', icon: Box, description: 'Material composition identified per object' },
  { id: 'composition', label: 'Composition Calculation', icon: PieChart, description: 'Waste composition profile generated' },
  { id: 'rag', label: 'Knowledge Retrieval', icon: Database, description: 'RAG fetches relevant waste guidelines' },
  { id: 'granite', label: 'Granite AI Reasoning', icon: Brain, description: 'IBM Granite generates grounded recommendations' },
  { id: 'recommendation', label: 'Actionable Guidance', icon: CheckCircle2, description: 'Segregation, disposal, and safety plan delivered' },
];

const stageOrder = stages.map(s => s.id);

export const ScanProgress = ({ currentStage, completed = false }) => {
  const currentIndex = stageOrder.indexOf(currentStage);
  const isComplete = completed || currentIndex === stageOrder.length - 1;

  return (
    <div className="space-y-4" role="region" aria-label="Analysis pipeline progress" aria-live="polite">
      {stages.map((stage, index) => {
        const isCompleted = index < currentIndex || (index === currentIndex && isComplete);
        const isActive = index === currentIndex && !isComplete;
        
        const Icon = stage.icon;
        
        return (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            className="flex items-start gap-4"
          >
            <div className="relative flex-shrink-0">
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                ${isCompleted 
                  ? 'bg-forest-500 text-white' 
                  : isActive 
                    ? 'bg-forest-100 text-forest-600 ring-2 ring-forest-500' 
                    : 'bg-slate-100 text-slate-400'
                }
              `}>
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              
              {index < stages.length - 1 && (
                <div className="absolute left-4.5 top-10 bottom-0 w-0.5" aria-hidden="true">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isCompleted ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="h-full bg-forest-500 rounded-full origin-top"
                  />
                </div>
              )}
            </div>
            
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2">
                <motion.span
                  key={`${stage.id}-label`}
                  className={`font-medium ${isCompleted || isActive ? 'text-slate-900' : 'text-slate-500'}`}
                >
                  {stage.label}
                </motion.span>
                {isActive && (
                  <motion.span
                    className="text-xs px-2 py-0.5 bg-forest-100 text-forest-700 rounded-full"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Active
                  </motion.span>
                )}
                {isCompleted && index === stages.length - 1 && (
                  <motion.span
                    className="text-xs px-2 py-0.5 bg-forest-100 text-forest-700 rounded-full"
                  >
                    Complete
                  </motion.span>
                )}
              </div>
              <p className="text-sm text-slate-500 mt-0.5 ml-12">{stage.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};