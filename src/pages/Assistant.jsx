import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  Paperclip, 
  Sparkles, 
  Shield, 
  Database, 
  Brain, 
  AlertCircle,
  ChevronDown,
  X,
  Copy,
  Check,
  RotateCcw,
  Scan
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { chatApi } from '../services/wasteApi';
import { mockDetections } from '../services/mockData';
import { CategoryBadge, RiskBadge } from '../components/ui/Badge';
import { getCategoryLabel, getCategoryColor } from '../utils/helpers';

const suggestions = [
  'What should I do with this phone?',
  'Can this bottle be recycled?',
  'Why is this waste hazardous?',
  'How should I segregate this garbage?',
  'How do I dispose of a battery?',
  'What are the safety risks?',
];

export const Assistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to WasteVision AI Assistant! I can help you understand your waste scan results, provide disposal guidance, and answer questions about waste management. What would you like to know?',
      timestamp: new Date().toISOString(),
      sources: [
        { title: 'E-Waste Management Rules, 2022', category: 'regulation', relevance: 0.94 },
        { title: 'CPCB Disposal Guidelines', category: 'guideline', relevance: 0.89 }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [attachedScan, setAttachedScan] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() && !attachedScan) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setShowSuggestions(false);

    const newUserMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: userMessage || `Question about ${attachedScan?.detections.length || 0} detected items`,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await chatApi.sendMessage(userMessage, attachedScan ? { detections: attachedScan.detections, scanId: attachedScan.image_id } : undefined);
      
      const aiMessage = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
        sources: response.sources,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch {
      const errorMessage = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    handleSend({ preventDefault: () => {} });
  };

  const handleAttachScan = () => {
    setAttachedScan({
      image_id: 'scan_current',
      detections: mockDetections,
      timestamp: new Date().toISOString(),
    });
  };

  const removeAttachment = () => {
    setAttachedScan(null);
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-forest-600" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900">WasteVision AI Assistant</h1>
                <p className="text-sm text-slate-500">Powered by RAG + IBM Granite</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="info" size="sm" dot>
                <Database className="w-3 h-3 mr-1" />
                Knowledge Base
              </Badge>
              <Badge variant="purple" size="sm" dot>
                <Brain className="w-3 h-3 mr-1" />
                Granite AI
              </Badge>
            </div>
          </div>
          
          {attachedScan && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Scan className="w-5 h-5 text-forest-600" />
                <div>
                  <p className="font-medium text-slate-900">Scan Attached</p>
                  <p className="text-sm text-slate-500">{attachedScan.detections.length} objects detected</p>
                </div>
                <div className="flex gap-1 ml-2">
                  {attachedScan.detections.slice(0, 3).map(d => (
                    <CategoryBadge key={d.id} category={d.category} size="sm" />
                  ))}
                </div>
              </div>
              <button onClick={removeAttachment} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full px-4 py-6">
        <AnimatePresence mode="popLayout">
          {showSuggestions && messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <p className="text-sm text-slate-500 mb-3">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <motion.button
                    key={s}
                    onClick={() => handleSuggestionClick(s)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i }}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:border-forest-300 hover:bg-forest-50 hover:text-forest-700 transition-all"
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${message.role === 'user' ? 'bg-forest-100' : 'bg-forest-50'}`}>
                {message.role === 'user' ? (
                  <svg className="w-4 h-4 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                ) : (
                  <Sparkles className="w-4 h-4 text-forest-600" />
                )}
              </div>
              
              <div className={`flex-1 max-w-[85%] ${message.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-4 rounded-2xl ${message.role === 'user' ? 'bg-forest-600 text-white' : 'bg-white border border-slate-200 text-slate-900'}`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.sources && message.sources.length > 0 && message.role === 'assistant' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 ml-2"
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <Database className="w-3 h-3" />
                      <span>Sources used:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {message.sources.map((source, i) => (
                        <Badge key={i} variant="info" size="sm" className="bg-blue-50 text-blue-700 border-blue-100">
                          {source.title}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-2 ml-2">
                      Answer generated from WasteVision knowledge base.
                    </p>
                  </motion.div>
                )}

                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-slate-400">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                  {message.role === 'assistant' && (
                    <button
                      onClick={() => copyMessage(message.content)}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded"
                      title="Copy"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-forest-50 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-forest-600 animate-pulse" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 max-w-[85%]">
                <div className="flex gap-2">
                  <div className="w-8 h-4 bg-slate-200 rounded animate-pulse" />
                  <div className="w-12 h-4 bg-slate-200 rounded animate-pulse" />
                  <div className="w-16 h-4 bg-slate-200 rounded animate-pulse" />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSend} className="flex gap-3">
            <button
              type="button"
              onClick={handleAttachScan}
              disabled={!!attachedScan}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Attach current scan"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about waste disposal, recycling, safety..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent resize-none min-h-[52px] max-h-32 pr-12"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={!inputValue.trim() && !attachedScan || isLoading}
              className="h-12 w-12 rounded-xl"
              aria-label="Send message"
            >
              {isLoading ? (
                <RotateCcw className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};