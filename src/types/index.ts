export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Detection {
  id: string;
  object: string;
  category: WasteCategory;
  confidence: number;
  material: string[];
  risk: RiskLevel;
  bbox: BoundingBox;
}

export type WasteCategory = 
  | 'organic'
  | 'plastic'
  | 'paper'
  | 'glass'
  | 'metal'
  | 'e-waste'
  | 'biomedical'
  | 'hazardous'
  | 'textile'
  | 'construction'
  | 'rubber'
  | 'battery'
  | 'sanitary'
  | 'chemical'
  | 'mixed';

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';

export interface WasteComposition {
  category: WasteCategory;
  percentage: number;
  object_count: number;
  confidence: number;
  weight_estimate?: number;
}

export interface ScanResult {
  image_id: string;
  detections: Detection[];
  composition: WasteComposition[];
  timestamp: string;
  image_url?: string;
}

export interface RAGSource {
  title: string;
  category: string;
  relevance: number;
  content?: string;
}

export interface RAGResponse {
  query: string;
  sources: RAGSource[];
  context: string;
}

export interface GraniteRecommendation {
  summary: string;
  why_it_matters: string;
  segregation: string;
  disposal: string;
  safety: string;
  recovery: string;
  grounded_in: string[];
}

export interface GraniteResponse {
  recommendation: GraniteRecommendation;
  grounded_in: string[];
}

export interface WasteCategoryInfo {
  id: WasteCategory;
  name: string;
  icon: string;
  description: string;
  risk: RiskLevel;
  typical_items: string[];
  materials: string[];
  segregation: string;
  recycling: string;
  disposal: string;
  safety: string;
  color: string;
}

export interface DisposalCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  categories: WasteCategory[];
  contact: string;
  hours: string;
  lat: number;
  lng: number;
  verified: boolean;
}

export interface FeedbackData {
  scan_id: string;
  detection_id: string;
  is_correct: boolean;
  corrected_category?: WasteCategory;
  corrected_material?: string[];
  notes?: string;
}

export interface ImpactMetrics {
  waste_analyzed: number;
  objects_detected: number;
  potentially_recoverable: number;
  landfill_diversion: number;
  co2_avoidance: number;
  scans_completed: number;
}

export interface UserScan {
  id: string;
  image_url: string;
  timestamp: string;
  detections_count: number;
  categories: WasteCategory[];
  composition: WasteComposition[];
  is_verified: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: RAGSource[];
  detections_context?: Detection[];
}

export interface PipelineStep {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'pending' | 'active' | 'completed' | 'error';
}