import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { ScanResult, Detection, WasteComposition, GraniteResponse, RAGResponse, ChatMessage, UserScan, ImpactMetrics } from '../types';

interface AppState {
  currentScan: ScanResult | null;
  scanHistory: UserScan[];
  isScanning: boolean;
  scanStage: string;
  scanProgress: number;
  graniteResponse: GraniteResponse | null;
  ragResponse: RAGResponse | null;
  chatMessages: ChatMessage[];
  isChatLoading: boolean;
  impactMetrics: ImpactMetrics;
  demoMode: boolean;
  selectedDetection: Detection | null;
  showSanitizationAlert: boolean;
}

interface AppContextType extends AppState {
  setCurrentScan: (scan: ScanResult | null) => void;
  setIsScanning: (scanning: boolean) => void;
  setScanStage: (stage: string) => void;
  setScanProgress: (progress: number) => void;
  setGraniteResponse: (response: GraniteResponse | null) => void;
  setRagResponse: (response: RAGResponse | null) => void;
  addChatMessage: (message: ChatMessage) => void;
  setIsChatLoading: (loading: boolean) => void;
  setSelectedDetection: (detection: Detection | null) => void;
  setShowSanitizationAlert: (show: boolean) => void;
  toggleDemoMode: () => void;
  addScanToHistory: (scan: UserScan) => void;
  resetScanner: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScan, setCurrentScan] = useState<ScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState<UserScan[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStage, setScanStage] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [graniteResponse, setGraniteResponse] = useState<GraniteResponse | null>(null);
  const [ragResponse, setRagResponse] = useState<RAGResponse | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [impactMetrics] = useState<ImpactMetrics>({
    waste_analyzed: 0,
    objects_detected: 0,
    potentially_recoverable: 0,
    landfill_diversion: 0,
    co2_avoidance: 0,
    scans_completed: 0
  });
  const [demoMode, setDemoMode] = useState(false);
  const [selectedDetection, setSelectedDetection] = useState<Detection | null>(null);
  const [showSanitizationAlert, setShowSanitizationAlert] = useState(false);

  const addChatMessage = useCallback((message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  }, []);

  const addScanToHistory = useCallback((scan: UserScan) => {
    setScanHistory(prev => [scan, ...prev].slice(0, 50));
  }, []);

  const resetScanner = useCallback(() => {
    setCurrentScan(null);
    setGraniteResponse(null);
    setRagResponse(null);
    setSelectedDetection(null);
    setShowSanitizationAlert(false);
    setScanStage('');
    setScanProgress(0);
  }, []);

  const toggleDemoMode = useCallback(() => {
    setDemoMode(prev => !prev);
  }, []);

  return (
    <AppContext.Provider value={{
      currentScan,
      scanHistory,
      isScanning,
      scanStage,
      scanProgress,
      graniteResponse,
      ragResponse,
      chatMessages,
      isChatLoading,
      impactMetrics,
      demoMode,
      selectedDetection,
      showSanitizationAlert,
      setCurrentScan,
      setIsScanning,
      setScanStage,
      setScanProgress,
      setGraniteResponse,
      setRagResponse,
      addChatMessage,
      setIsChatLoading,
      setSelectedDetection,
      setShowSanitizationAlert,
      toggleDemoMode,
      addScanToHistory,
      resetScanner
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
