import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Image, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { validateImageFile, parseFileSize } from '../../utils/helpers';

export const UploadZone = ({ 
  onUpload, 
  onCamera, 
  image, 
  onRemove, 
  analyzing,
  error,
  onAnalyze
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = React.useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return { error: validation.error };
    }
    
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onUpload(file);
    return { success: true };
  };

  const handleCameraClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    };
    input.click();
  };

  const handleRemove = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    onRemove();
  };

  if (image || preview) {
    return (
      <Card className="overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={preview || image}
            alt="Uploaded waste image for analysis"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRemove}
              disabled={analyzing}
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {analyzing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                <p>Analyzing...</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-forest-600" />
            <span className="font-medium text-slate-700">Image ready for analysis</span>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              onClick={() => fileInputRef.current?.click()}
              disabled={analyzing}
            >
              <Image className="w-4 h-4" />
              Change Image
            </Button>
            <Button 
              onClick={onAnalyze}
              disabled={analyzing || !image}
              className="gap-2"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyze Waste
            </Button>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Upload waste image"
        />
      </Card>
    );
  }

  return (
    <Card 
      className={`relative border-2 border-dashed transition-all duration-300 ${
        dragActive ? 'border-forest-500 bg-forest-50' : 'border-slate-200 hover:border-forest-300'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Upload waste image"
      />
      
      <div className="py-16 px-6 text-center">
        <motion.div
          animate={dragActive ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-forest-100 flex items-center justify-center">
            <Upload className="w-8 h-8 text-forest-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Drop your garbage image here
          </h3>
          <p className="text-slate-500 mb-6">or upload an image</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => fileInputRef.current?.click()}
              className="gap-2 min-w-[160px]"
            >
              <Upload className="w-5 h-5" />
              Upload Image
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={handleCameraClick}
              className="gap-2 min-w-[160px]"
            >
              <Camera className="w-5 h-5" />
              Use Camera
            </Button>
          </div>
          
          <p className="text-sm text-slate-400 flex flex-wrap justify-center gap-4">
            <span className="flex items-center gap-1">
              <Image className="w-3 h-3" />
              JPG, PNG, WebP
            </span>
            <span className="flex items-center gap-1">
              Max 10MB
            </span>
          </p>
        </motion.div>
      </div>
      
      {error && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </Card>
  );
};