import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCategoryColor, getCategoryLabel, formatConfidence } from '../../utils/helpers';
import { CategoryBadge, RiskBadge } from '../ui/Badge';

export const DetectionViewer = ({ 
  imageSrc, 
  detections, 
  selectedId, 
  onSelect,
  className = '' 
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [showLabels, setShowLabels] = useState(true);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      setImageSize({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight
      });
    }
  }, [imageSrc]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && imageRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setImageSize({
          width: rect.width,
          height: rect.height
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBoxStyle = (bbox) => {
    if (!imageSize.width || !imageSize.height) return {};
    
    return {
      left: `${bbox.x}%`,
      top: `${bbox.y}%`,
      width: `${bbox.width}%`,
      height: `${bbox.height}%`,
    };
  };

  const handleBoxClick = (detection, e) => {
    e.stopPropagation();
    onSelect(detection.id);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="relative aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden">
        <img
          ref={imageRef}
          src={imageSrc}
          alt="Waste analysis with detection bounding boxes"
          className="w-full h-full object-cover"
          onLoad={() => {
            if (imageRef.current) {
              setImageSize({
                width: imageRef.current.naturalWidth,
                height: imageRef.current.naturalHeight
              });
            }
          }}
        />
        
        <AnimatePresence>
          {detections.map((detection) => {
            const isSelected = selectedId === detection.id;
            const categoryColor = getCategoryColor(detection.category);
            
            return (
              <motion.div
                key={detection.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute cursor-pointer"
                style={getBoxStyle(detection.bbox)}
                onClick={(e) => handleBoxClick(detection, e)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleBoxClick(detection, e)}
                aria-label={`${detection.object}, ${getCategoryLabel(detection.category)}, ${formatConfidence(detection.confidence)} confidence`}
                aria-pressed={isSelected}
              >
                <div 
                  className={`
                    absolute inset-0 border-2 rounded-lg transition-all duration-200
                    ${isSelected ? 'border-4 shadow-lg shadow-forest-500/30' : ''}
                  `}
                  style={{ borderColor: categoryColor }}
                >
                  <div className="absolute -top-6 left-0 w-max px-2 py-1 text-xs font-medium text-white rounded"
                    style={{ backgroundColor: categoryColor }}>
                    {detection.object}
                  </div>
                </div>
                
                {showLabels && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute bottom-full left-0 mb-1 w-max"
                    >
                      <div className="px-2 py-1 text-xs font-medium text-white rounded shadow-lg"
                        style={{ backgroundColor: categoryColor }}>
                        {detection.object}
                        <span className="ml-2 opacity-80">{formatConfidence(detection.confidence)}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-center" role="legend" aria-label="Detection summary">
          {detections.slice(0, 6).map((detection) => (
            <CategoryBadge 
              key={detection.id} 
              category={detection.category} 
              size="sm"
              className={selectedId === detection.id ? 'ring-2 ring-white' : ''}
            />
          ))}
          {detections.length > 6 && (
            <span className="px-2 py-1 text-xs bg-white/90 backdrop-blur text-slate-600 rounded">
              +{detections.length - 6} more
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={showLabels}
            onChange={(e) => setShowLabels(e.target.checked)}
            className="w-4 h-4 text-forest-600 rounded border-slate-300 focus:ring-forest-500"
          />
          Show labels
        </label>
      </div>
    </div>
  );
};