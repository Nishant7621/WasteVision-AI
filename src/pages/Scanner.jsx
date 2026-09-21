import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, RotateCcw, Trash2, Download, Share2, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { UploadZone } from '../components/scanner/UploadZone';
import { ScanProgress } from '../components/scanner/ScanProgress';
import { DetectionViewer } from '../components/scanner/DetectionViewer';
import { DetectionCard } from '../components/scanner/DetectionCard';
import { WasteComposition } from '../components/charts/WasteComposition';
import { WasteDNA } from '../components/charts/WasteDNA';
import { SegregationPlan } from '../components/scanner/SegregationPlan';
import { GraniteRecommendation } from '../components/scanner/GraniteRecommendation';
import { ItemIntelligence } from '../components/scanner/ItemIntelligence';
import { SmartActions, DetectionTable } from '../components/scanner/SmartActions';
import { RiskAlert, SanitizationBanner } from '../components/scanner/RiskAlert';
import { wasteApi, ragApi, graniteApi, chatApi } from '../services/wasteApi';
import { useApp } from '../context/AppContext';
import { mockScanResult, mockGraniteResponse, mockRAGResponse, mockDetections, mockComposition } from '../services/mockData';
import { getCategoryLabel, getCategoryColor } from '../utils/helpers';

const pipelineStages = [
  'image',
  'detection',
  'classification',
  'material',
  'composition',
  'rag',
  'granite',
  'recommendation',
];

const DEMO_WASTE_IMAGE = 'https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=1200&q=85';

export default function Scanner() {
  const navigate = useNavigate();
  const { 
    currentScan, 
    setCurrentScan, 
    isScanning, 
    setIsScanning, 
    scanStage, 
    scanProgress,
    setScanStage, 
    setScanProgress,
    graniteResponse, 
    setGraniteResponse,
    ragResponse,
    setRagResponse,
    selectedDetection,
    setSelectedDetection,
    setShowSanitizationAlert,
    resetScanner,
    addScanToHistory,
    demoMode,
  } = useApp();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [resultsView, setResultsView] = useState('overview');
  const [showItemPanel, setShowItemPanel] = useState(false);
  const [feedback, setFeedback] = useState({});

  const handleUpload = useCallback(async (file, { previewUrl: providedPreviewUrl } = {}) => {
    setError(null);
    setImage(file);
    const previewUrl = providedPreviewUrl || URL.createObjectURL(file);
    setImagePreview(previewUrl);
    resetScanner();
    
    setIsScanning(true);
    setScanStage('image');
    setScanProgress(0);

    try {
      let result;
      
      if (demoMode) {
        for (let i = 0; i < pipelineStages.length; i++) {
          setScanStage(pipelineStages[i]);
          setScanProgress(((i + 1) / pipelineStages.length) * 100);
          await new Promise(r => setTimeout(r, 400));
        }
        result = {
          ...mockScanResult,
          image_id: `scan_${Date.now()}`,
          image_url: previewUrl,
          timestamp: new Date().toISOString(),
        };
      } else {
        result = await wasteApi.analyzeWaste(file);
      }

      setCurrentScan(result);
      
      setScanStage('rag');
      setScanProgress(90);
      const ragResult = await ragApi.query(
        'How should I dispose of these items?',
        result.detections,
        result.composition.map(c => c.category)
      );
      setRagResponse(ragResult);

      setScanStage('granite');
      setScanProgress(95);
      const graniteResult = await graniteApi.recommend(
        result.detections,
        result.composition,
        ragResult.context
      );
      setGraniteResponse(graniteResult);

      setScanStage('recommendation');
      setScanProgress(100);
      
      await new Promise(r => setTimeout(r, 300));
      setIsScanning(false);
      setResultsView('overview');
      
      addScanToHistory({
        id: result.image_id,
        image_url: result.image_url,
        timestamp: result.timestamp,
        detections_count: result.detections.length,
        categories: [...new Set(result.detections.map(d => d.category))],
        composition: result.composition,
        is_verified: false,
      });
    } catch {
      setError('Analysis failed. Please try again.');
      setIsScanning(false);
    }
  }, [demoMode, resetScanner, setCurrentScan, setIsScanning, setScanStage, setScanProgress, setRagResponse, setGraniteResponse, addScanToHistory]);

  const handleRemove = useCallback(() => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImage(null);
    setImagePreview(null);
    resetScanner();
  }, [imagePreview, resetScanner]);

  const handleRetake = useCallback(() => {
    handleRemove();
  }, [handleRemove]);

  const handleAction = useCallback((action, detection) => {
    switch (action) {
      case 'guide':
        navigate(`/disposal-guide?category=${detection.category}`);
        break;
      case 'ask':
        navigate('/assistant');
        break;
      case 'center':
        navigate(`/disposal-centers?category=${detection.category}`);
        break;
      case 'report':
        setFeedback({ detectionId: detection.id, open: true });
        break;
      case 'retake':
        handleRetake();
        break;
      default:
        break;
    }
  }, [navigate, handleRetake]);

  const handleViewDetails = useCallback((detection) => {
    setSelectedDetection(detection);
    setShowItemPanel(true);
  }, []);

  const dismissAlert = useCallback(() => {
    setShowSanitizationAlert(false);
  }, []);

  const scanAnother = useCallback(() => {
    handleRemove();
  }, [handleRemove]);

  const startDemo = useCallback(async () => {
    const file = new File(['WasteVision AI demo scenario'], 'mixed-waste-demo.jpg', { type: 'image/jpeg' });
    await handleUpload(file, { previewUrl: DEMO_WASTE_IMAGE });
  }, [handleUpload]);

  const getDetectionById = (id) => {
    return currentScan?.detections.find(d => d.id === id);
  };

  const selectedDetectionData = getDetectionById(selectedDetection);

  if (isScanning) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-forest-100 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-forest-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyzing Waste</h2>
            <p className="text-slate-600 mb-8">{scanStage.replace('_', ' ')}...</p>
            
            <ScanProgress currentStage={scanStage} />
            
            <div className="mt-8 h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-forest-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${scanProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="mt-2 text-sm text-slate-500">{Math.round(scanProgress)}% complete</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-4 right-4 max-w-2xl mx-auto z-50"
        >
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
            <p className="text-red-700">{error}</p>
            <Button variant="ghost" size="sm" onClick={() => setError(null)}>Dismiss</Button>
          </div>
        </motion.div>
      )}

      {!demoMode && (
        <RiskAlert
          detections={currentScan?.detections || []}
          onDismiss={dismissAlert}
          onViewDetails={handleViewDetails}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">AI Waste Scanner</h1>
              <p className="text-slate-600 mt-1">Don't just classify the garbage. Understand everything inside it.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={scanAnother} disabled={!currentScan}>
                <RotateCcw className="w-4 h-4" />
                Scan Another
              </Button>
              <Button onClick={startDemo} variant="secondary" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Launch Demo
              </Button>
            </div>
          </div>
        </div>

        {!currentScan ? (
          <UploadZone 
            onUpload={handleUpload}
            onCamera={handleUpload}
            image={image}
            onRemove={handleRemove}
            onAnalyze={image ? () => handleUpload(image) : undefined}
            analyzing={isScanning}
            error={error}
          />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScan.image_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800" role="status">
                <Badge variant="warning">Demo inference</Badge>
                This sample output is shown to demonstrate the interface. It does not describe the image you uploaded.
              </div>
              {!demoMode && <SanitizationBanner detections={currentScan.detections} />}

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card padding="lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Detection Results</CardTitle>
                          <CardDescription>{currentScan.detections.length} objects detected</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setResultsView('overview')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              resultsView === 'overview'
                                ? 'bg-forest-100 text-forest-700'
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            Overview
                          </button>
                          <button
                            onClick={() => setResultsView('table')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              resultsView === 'table'
                                ? 'bg-forest-100 text-forest-700'
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            Table
                          </button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {currentScan.detections.length === 0 && (
                        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                          No supported waste objects were recognized with sufficient confidence. Try a clearer photo, or verify the item manually.
                        </div>
                      )}
                      {resultsView === 'overview' && (
                        <>
                          <DetectionViewer
                            imageSrc={currentScan.image_url || imagePreview}
                            detections={currentScan.detections}
                            selectedId={selectedDetection}
                            onSelect={setSelectedDetection}
                          />
                          
                          <div className="mt-4">
                            <h4 className="font-semibold text-slate-900 mb-3">Detected Objects</h4>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {currentScan.detections.map((detection, index) => (
                                <DetectionCard
                                  key={detection.id}
                                  detection={detection}
                                  selected={selectedDetection === detection.id}
                                  onSelect={setSelectedDetection}
                                  index={index}
                                />
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                      
                      {resultsView === 'table' && (
                        <DetectionTable
                          detections={currentScan.detections}
                          selectedId={selectedDetection}
                          onSelect={setSelectedDetection}
                          onAction={handleAction}
                        />
                      )}
                    </CardContent>
                  </Card>

                  <WasteComposition composition={currentScan.composition} />
                  <WasteDNA composition={currentScan.composition} />
                  <SegregationPlan detections={currentScan.detections} composition={currentScan.composition} />
                  <GraniteRecommendation 
                    recommendation={graniteResponse?.recommendation} 
                    groundedIn={graniteResponse?.grounded_in} 
                  />
                </div>

                <div className="space-y-6">
                  <Card padding="lg">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Act on detected items</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {currentScan.detections.map((detection) => (
                          <SmartActions
                            key={detection.id}
                            detection={detection}
                            onAction={handleAction}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card padding="lg">
                    <CardHeader>
                      <CardTitle>Scan Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Scan ID</span>
                        <span className="font-mono text-slate-900">{currentScan.image_id}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Timestamp</span>
                        <span className="text-slate-900">{new Date(currentScan.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Objects</span>
                        <span className="text-slate-900">{currentScan.detections.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Categories</span>
                        <span className="text-slate-900">{[...new Set(currentScan.detections.map(d => d.category))].length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Avg Confidence</span>
                        <span className="text-slate-900">
                          {currentScan.detections.length
                            ? `${Math.round(currentScan.detections.reduce((sum, d) => sum + d.confidence, 0) / currentScan.detections.length * 100)}%`
                            : '—'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <ItemIntelligence
                detection={selectedDetectionData}
                onClose={() => { setSelectedDetection(null); setShowItemPanel(false); }}
                graniteRecommendation={graniteResponse}
                ragSources={ragResponse?.sources}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
    );
  }
