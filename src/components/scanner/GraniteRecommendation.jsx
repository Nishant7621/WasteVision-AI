import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Info, ArrowRight, Recycle, Trash2, AlertTriangle, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

const sections = [
  { 
    key: 'why_it_matters', 
    label: 'Why This Matters', 
    icon: Info, 
    color: 'blue',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    text: 'text-blue-800'
  },
  { 
    key: 'segregation', 
    label: 'How to Segregate', 
    icon: ArrowRight, 
    color: 'forest',
    bg: 'bg-forest-50',
    border: 'border-forest-100',
    text: 'text-forest-800'
  },
  { 
    key: 'disposal', 
    label: 'How to Dispose', 
    icon: Trash2, 
    color: 'amber',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    text: 'text-amber-800'
  },
  { 
    key: 'safety', 
    label: 'Safety', 
    icon: AlertTriangle, 
    color: 'red',
    bg: 'bg-red-50',
    border: 'border-red-100',
    text: 'text-red-800'
  },
  { 
    key: 'recovery', 
    label: 'Potential Recovery', 
    icon: Recycle, 
    color: 'purple',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    text: 'text-purple-800'
  },
];

export const GraniteRecommendation = ({ recommendation, groundedIn, loading = false }) => {
  if (loading) {
    return (
      <Card padding="lg">
        <CardHeader>
          <CardTitle>Granite AI Recommendation</CardTitle>
          <CardDescription>Generating grounded guidance...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!recommendation) {
    return (
      <Card padding="lg">
        <CardHeader>
          <CardTitle>Granite AI Recommendation</CardTitle>
          <CardDescription>No recommendation available</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500 text-center py-8">Run a scan to get AI-powered guidance</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card padding="lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-forest-600" />
            <CardTitle className="text-lg">Granite AI Recommendation</CardTitle>
          </div>
          <Badge variant="purple" size="sm" dot>
            AI Generated
          </Badge>
        </div>
        <CardDescription className="mt-2">
          Grounded in {groundedIn?.length || 0} knowledge source{groundedIn?.length !== 1 ? 's' : ''} from WasteVision knowledge base
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recommendation.summary && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 bg-forest-50 border border-forest-100 rounded-xl mb-6"
          >
            <p className="text-forest-800">{recommendation.summary}</p>
          </motion.div>
        )}

        <div className="space-y-4">
          {sections.map((section, index) => {
            const content = recommendation[section.key];
            if (!content) return null;
            
            const Icon = section.icon;
            
            return (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className={`p-4 rounded-xl border ${section.bg} ${section.border}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${section.color}-100`, color: `${section.color}-600` }}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-slate-900 mb-1">{section.label}</h5>
                    <p className={`text-sm ${section.text}`}>{content}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {groundedIn && groundedIn.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-6 pt-6 border-t border-slate-200"
          >
            <h5 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-forest-600" />
              Grounded in Knowledge Sources
            </h5>
            <div className="flex flex-wrap gap-2">
              {groundedIn.map((source, i) => (
                <Badge key={i} variant="info" size="sm" className="bg-blue-50 text-blue-700 border-blue-100">
                  {source}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};