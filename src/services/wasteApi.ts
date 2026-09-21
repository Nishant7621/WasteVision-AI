import type { ScanResult, Detection, WasteComposition, FeedbackData } from '../types';
import { mockScanResult, mockDetections, mockComposition } from './mockData';

const DEMO_MODE = true;
const USE_LOCAL_VISION = true;
const API_BASE = '/api';
const DELAY_MS = 800;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const wasteApi = {
  async analyzeWaste(imageFile: File): Promise<ScanResult> {
    if (!USE_LOCAL_VISION) {
      await delay(DELAY_MS * 3);
      
      const objectUrl = URL.createObjectURL(imageFile);
      
      return {
        ...mockScanResult,
        image_id: `scan_${Date.now()}`,
        image_url: objectUrl,
        timestamp: new Date().toISOString()
      };
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE}/analyze-waste`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('AI analysis failed. Please try again.');
    }

    return response.json();
  },

  async getCategories() {
    if (DEMO_MODE) {
      await delay(300);
      const { wasteCategories } = await import('./mockData');
      return wasteCategories;
    }

    const response = await fetch(`${API_BASE}/waste/categories`);
    return response.json();
  },

  async submitFeedback(feedback: FeedbackData): Promise<{ success: boolean }> {
    if (DEMO_MODE) {
      await delay(500);
      console.log('Feedback submitted:', feedback);
      return { success: true };
    }

    const response = await fetch(`${API_BASE}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback)
    });

    return response.json();
  },

  async getScanHistory(): Promise<ScanResult[]> {
    if (DEMO_MODE) {
      await delay(400);
      return [mockScanResult];
    }

    const response = await fetch(`${API_BASE}/scans/history`);
    return response.json();
  }
};

export const ragApi = {
  async query(query: string, detectedObjects: Detection[], categories: string[]) {
    if (DEMO_MODE) {
      await delay(DELAY_MS);
      const { mockRAGResponse } = await import('./mockData');
      return {
        ...mockRAGResponse,
        query
      };
    }

    const response = await fetch(`${API_BASE}/rag/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, detected_objects: detectedObjects, categories })
    });

    return response.json();
  }
};

export const graniteApi = {
  async recommend(detections: Detection[], composition: WasteComposition[], ragContext: string) {
    if (DEMO_MODE) {
      await delay(DELAY_MS * 2);
      const { mockGraniteResponse } = await import('./mockData');
      return mockGraniteResponse;
    }

    const response = await fetch(`${API_BASE}/granite/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ detections, composition, retrieved_context: ragContext })
    });

    return response.json();
  }
};

export const disposalApi = {
  async getCenters(city: string, category?: string) {
    if (DEMO_MODE) {
      await delay(600);
      const { mockDisposalCenters } = await import('./mockData');
      let centers = mockDisposalCenters.filter(c => c.city.toLowerCase() === city.toLowerCase());
      if (category) {
        centers = centers.filter(c => c.categories.includes(category as any));
      }
      return centers;
    }

    const params = new URLSearchParams({ city });
    if (category) params.append('category', category);
    
    const response = await fetch(`${API_BASE}/disposal-centers?${params}`);
    return response.json();
  }
};

export const chatApi = {
  async sendMessage(message: string, context?: { detections: Detection[], scanId: string }) {
    if (DEMO_MODE) {
      await delay(DELAY_MS * 1.5);
      
      const responses: Record<string, string> = {
        'phone': 'Your mobile phone is classified as E-Waste. It contains valuable materials like gold, silver, copper, and rare earth elements. Please take it to an authorized e-waste recycler. Do not throw in regular trash.',
        'battery': 'Batteries are hazardous waste. Tape the terminals to prevent short circuits. Drop at battery collection bins (often at electronics stores) or hazardous waste facilities. Never put in regular trash - fire risk.',
        'syringe': 'CRITICAL: This is biomedical waste. Do NOT handle with bare hands. Use tongs/thick gloves. Place immediately in rigid sharps container. Contact authorized biomedical waste facility for disposal.',
        'plastic': 'Plastic bottle (PET) is recyclable. Rinse clean, remove cap, and place in recycling bin. Check local guidelines for plastic codes 1-7.',
        'glass': 'Glass bottle is infinitely recyclable. Rinse and separate by color if required locally. Place in glass recycling bin.',
        'organic': 'Vegetable waste is compostable. Place in green/organic bin for municipal composting or use home compost.',
        'default': 'I\'ve analyzed your waste. For specific items, please ask about individual objects or check the detailed recommendations below.'
      };

      const lowerMsg = message.toLowerCase();
      let response = responses.default;
      
      for (const [key, value] of Object.entries(responses)) {
        if (lowerMsg.includes(key)) {
          response = value;
          break;
        }
      }

      return {
        content: response,
        sources: [
          { title: 'E-Waste Management Rules, 2022', category: 'regulation', relevance: 0.94 },
          { title: 'CPCB Disposal Guidelines', category: 'guideline', relevance: 0.89 }
        ]
      };
    }

    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context })
    });

    return response.json();
  }
};
