import type { WasteCategory, RiskLevel, Detection } from '../types';
import { categoryColors } from '../services/mockData';

export const formatConfidence = (confidence: number): string => {
  return `${Math.round(confidence * 100)}%`;
};

export const getCategoryColor = (category: WasteCategory): string => {
  return categoryColors[category] || categoryColors.mixed;
};

export const getRiskColor = (risk: RiskLevel): string => {
  const colors: Record<RiskLevel, string> = {
    critical: '#ef4444',
    high: '#f97316',
    medium: '#f59e0b',
    low: '#16a34a'
  };
  return colors[risk];
};

export const getRiskLabel = (risk: RiskLevel): string => {
  const labels: Record<RiskLevel, string> = {
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
    low: 'Low'
  };
  return labels[risk];
};

export const getCategoryLabel = (category: WasteCategory): string => {
  const labels: Record<WasteCategory, string> = {
    organic: 'Organic / Bio Waste',
    plastic: 'Plastic Waste',
    paper: 'Paper & Cardboard',
    glass: 'Glass Waste',
    metal: 'Metal Waste',
    'e-waste': 'E-Waste',
    biomedical: 'Biomedical / Medical Waste',
    hazardous: 'Hazardous Waste',
    textile: 'Textile Waste',
    construction: 'Construction & Demolition Waste',
    rubber: 'Rubber Waste',
    battery: 'Battery Waste',
    sanitary: 'Sanitary Waste',
    chemical: 'Chemical Waste',
    mixed: 'Mixed / Unknown Waste'
  };
  return labels[category] || category;
};

export const getCategoryIcon = (category: WasteCategory): string => {
  const icons: Record<WasteCategory, string> = {
    organic: 'leaf',
    plastic: 'recycle',
    paper: 'file-text',
    glass: 'wine',
    metal: 'cog',
    'e-waste': 'cpu',
    biomedical: 'syringe',
    hazardous: 'skull',
    battery: 'battery',
    textile: 'shirt',
    construction: 'building',
    rubber: 'circle',
    sanitary: 'droplet',
    chemical: 'flask-conical',
    mixed: 'question-mark'
  };
  return icons[category] || 'help-circle';
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export const formatWeight = (kg: number): string => {
  if (kg >= 1000) return `${(kg / 1000).toFixed(2)} tonnes`;
  return `${kg.toFixed(1)} kg`;
};

export const calculateCompositionPercentage = (detections: Detection[], category: WasteCategory): number => {
  const categoryDetections = detections.filter(d => d.category === category);
  return (categoryDetections.length / detections.length) * 100;
};

export const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 0.9) return '#16a34a';
  if (confidence >= 0.75) return '#f59e0b';
  if (confidence >= 0.5) return '#f97316';
  return '#ef4444';
};

export const isLowConfidence = (confidence: number): boolean => {
  return confidence < 0.7;
};

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const parseFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload a JPG, PNG, or WebP image.' };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: 'Image size must be less than 10MB.' };
  }
  
  return { valid: true };
};