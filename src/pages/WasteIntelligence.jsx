import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, BookOpen, Leaf, Recycle, Trash2, AlertTriangle, Sparkles, ArrowRight, Send, X, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge, CategoryBadge, RiskBadge } from '../components/ui/Badge';
import { wasteCategories, categoryColors } from '../services/mockData';
import { getCategoryLabel, getCategoryColor } from '../utils/helpers';
import { chatApi } from '../services/wasteApi';

const wasteItems = [
  { name: 'Mobile Phone', category: 'e-waste', materials: ['Glass', 'Plastic', 'Metal', 'Electronics'], risk: 'high', recyclable: true, compostable: false, disposal: 'Authorized e-waste recycler', preparation: 'Remove case, backup data, factory reset' },
  { name: 'Lithium Battery', category: 'battery', materials: ['Lithium-ion', 'Metal casing'], risk: 'high', recyclable: true, compostable: false, disposal: 'Battery collection bin', preparation: 'Tape terminals, place in plastic bag' },
  { name: 'PET Bottle', category: 'plastic', materials: ['PET'], risk: 'low', recyclable: true, compostable: false, disposal: 'Plastic recycling bin', preparation: 'Rinse, remove cap, flatten' },
  { name: 'Glass Bottle', category: 'glass', materials: ['Glass'], risk: 'medium', recyclable: true, compostable: false, disposal: 'Glass recycling bin', preparation: 'Rinse, remove label if possible' },
  { name: 'Syringe', category: 'biomedical', materials: ['Plastic', 'Metal needle'], risk: 'critical', recyclable: false, compostable: false, disposal: 'Authorized biomedical facility', preparation: 'Do not handle - use tongs, place in sharps container' },
  { name: 'Cardboard Box', category: 'paper', materials: ['Corrugated cardboard'], risk: 'low', recyclable: true, compostable: true, disposal: 'Paper recycling', preparation: 'Flatten, remove tape, keep dry' },
  { name: 'Food Waste', category: 'organic', materials: ['Organic matter'], risk: 'low', recyclable: false, compostable: true, disposal: 'Compost bin / green waste', preparation: 'Remove packaging, drain liquids' },
  { name: 'Clothing', category: 'textile', materials: ['Cotton', 'Polyester blend'], risk: 'low', recyclable: true, compostable: false, disposal: 'Textile bank / donation', preparation: 'Clean, dry, bag separately' },
  { name: 'Paint Can', category: 'hazardous', materials: ['Metal', 'Chemical residue'], risk: 'high', recyclable: false, compostable: false, disposal: 'Hazardous waste facility', preparation: 'Seal tightly, keep upright' },
  { name: 'CFL Bulb', category: 'hazardous', materials: ['Glass', 'Mercury', 'Phosphor'], risk: 'high', recyclable: true, compostable: false, disposal: 'Hazardous waste / special collection', preparation: 'Handle carefully, avoid breaking' },
];

export const WasteIntelligence = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('cards');
  const [selectedItem, setSelectedItem] = useState(null);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  const filteredItems = wasteItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...wasteCategories.map(c => c.id)];

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    try {
      const response = await chatApi.sendMessage(aiQuestion);
      setAiAnswer(response);
    } catch {
      setAiAnswer({ content: 'Sorry, I encountered an error. Please try again.', sources: [] });
    } finally {
      setIsAiLoading(false);
    }
  };

  const openAiModal = () => {
    setAiQuestion('');
    setAiAnswer(null);
    setShowAiModal(true);
  };

  const closeAiModal = () => {
    setShowAiModal(false);
    setAiQuestion('');
    setAiAnswer(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900">Waste Intelligence</h1>
          <p className="text-slate-600 mt-1">Searchable knowledge base for waste identification, segregation, and disposal guidance</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <Card padding="lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search waste items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Filter by Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : getCategoryLabel(cat)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <Button 
                  variant="primary" 
                  fullWidth 
                  className="gap-2"
                  onClick={openAiModal}
                >
                  <Sparkles className="w-4 h-4" />
                  Ask WasteVision AI
                </Button>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Categories</h3>
              <div className="space-y-2">
                {wasteCategories.slice(0, 10).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat.id
                        ? `bg-[${cat.color}] text-white`
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedCategory === cat.id ? 'white' : cat.color }} />
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                {['cards', 'list'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === mode
                        ? 'bg-forest-100 text-forest-700'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {mode === 'cards' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    )}
                  </button>
                ))}
              </div>
              <span className="text-sm text-slate-500">{filteredItems.length} items found</span>
            </div>

            {viewMode === 'cards' ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    onClick={() => setSelectedItem(item)}
                    className="bg-white rounded-xl border border-slate-200 p-4 hover:border-forest-300 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${getCategoryColor(item.category)}20` }}>
                        <span className="text-lg" style={{ color: getCategoryColor(item.category) }}>
                          {item.category === 'e-waste' && '📱'}
                          {item.category === 'battery' && '🔋'}
                          {item.category === 'plastic' && '🥤'}
                          {item.category === 'glass' && '🍾'}
                          {item.category === 'biomedical' && '💉'}
                          {item.category === 'paper' && '📦'}
                          {item.category === 'organic' && '🍎'}
                          {item.category === 'textile' && '👕'}
                          {item.category === 'hazardous' && '☠️'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 truncate">{item.name}</h4>
                        <CategoryBadge category={item.category} size="sm" className="mt-1" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Item</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Category</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Risk</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Recyclable</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-500">Compostable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item, index) => (
                      <tr
                        key={item.name}
                        onClick={() => setSelectedItem(item)}
                        className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium text-slate-900">{item.name}</div>
                          <div className="text-xs text-slate-500">{item.materials.slice(0, 2).join(', ')}</div>
                        </td>
                        <td className="px-4 py-3">
                          <CategoryBadge category={item.category} size="sm" />
                        </td>
                        <td className="px-4 py-3">
                          <RiskBadge risk={item.risk} size="sm" />
                        </td>
                        <td className="px-4 py-3">
                          {item.recyclable ? (
                            <span className="flex items-center gap-1 text-forest-600">
                              <Recycle className="w-4 h-4" /> Yes
                            </span>
                          ) : (
                            <span className="text-slate-400">No</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {item.compostable ? (
                            <span className="flex items-center gap-1 text-forest-600">
                              <Leaf className="w-4 h-4" /> Yes
                            </span>
                          ) : (
                            <span className="text-slate-400">No</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: getCategoryColor(selectedItem.category) }}>
                    <span className="text-2xl">
                      {selectedItem.category === 'e-waste' && '📱'}
                      {selectedItem.category === 'battery' && '🔋'}
                      {selectedItem.category === 'plastic' && '🥤'}
                      {selectedItem.category === 'glass' && '🍾'}
                      {selectedItem.category === 'biomedical' && '💉'}
                      {selectedItem.category === 'paper' && '📦'}
                      {selectedItem.category === 'organic' && '🍎'}
                      {selectedItem.category === 'textile' && '👕'}
                      {selectedItem.category === 'hazardous' && '☠️'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{selectedItem.name}</h3>
                    <CategoryBadge category={selectedItem.category} />
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl text-center">
                    <RiskBadge risk={selectedItem.risk} className="mx-auto mb-1" />
                    <p className="text-xs text-slate-500">Risk Level</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl text-center">
                    <span className="text-xl font-bold text-slate-900">{selectedItem.recyclable ? 'Yes' : 'No'}</span>
                    <p className="text-xs text-slate-500">Recyclable</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl text-center">
                    <span className="text-xl font-bold text-slate-900">{selectedItem.compostable ? 'Yes' : 'No'}</span>
                    <p className="text-xs text-slate-500">Compostable</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-forest-600" />
                      Disposal Guide
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <p className="font-medium text-slate-700">How to Dispose</p>
                        <p className="text-slate-600 mt-1">{selectedItem.disposal}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <p className="font-medium text-slate-700">Preparation</p>
                        <p className="text-slate-600 mt-1">{selectedItem.preparation}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <Button 
                      variant="primary" 
                      fullWidth 
                      className="gap-2"
                      onClick={() => { setSelectedItem(null); }}
                    >
                      <Sparkles className="w-4 h-4" />
                      Ask AI About This Item
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAiModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeAiModal}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-forest-100 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-forest-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Ask WasteVision AI</h3>
                    <p className="text-sm text-slate-500">Get instant answers about waste disposal</p>
                  </div>
                </div>
                <button
                  onClick={closeAiModal}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {!aiAnswer ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Your Question
                      </label>
                      <textarea
                        value={aiQuestion}
                        onChange={(e) => setAiQuestion(e.target.value)}
                        placeholder="e.g., How should I dispose of a broken CFL bulb? Can I recycle pizza boxes? What to do with old batteries?"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent resize-none min-h-[100px]"
                        rows={3}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleAskAI();
                          }
                        }}
                      />
                    </div>
                    <Button 
                      variant="primary" 
                      fullWidth 
                      className="gap-2"
                      onClick={handleAskAI}
                      disabled={isAiLoading || !aiQuestion.trim()}
                    >
                      {isAiLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Thinking...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Ask AI
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-forest-50 rounded-xl border border-forest-100">
                      <h4 className="font-semibold text-forest-900 mb-2 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-forest-600" />
                        AI Response
                      </h4>
                      <p className="text-slate-700 whitespace-pre-wrap">{aiAnswer.content}</p>
                    </div>
                    {aiAnswer.sources && aiAnswer.sources.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-forest-600" />
                          Sources
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {aiAnswer.sources.map((source, i) => (
                            <Badge key={i} variant="info" size="sm" className="bg-blue-50 text-blue-700 border-blue-100">
                              {source.title}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="pt-4 border-t border-slate-200 flex gap-3">
                      <Button 
                        variant="secondary" 
                        fullWidth 
                        onClick={() => { setAiAnswer(null); setAiQuestion(''); }}
                      >
                        Ask Another Question
                      </Button>
                      <Button 
                        variant="primary" 
                        fullWidth 
                        className="gap-2"
                        onClick={closeAiModal}
                      >
                        Done
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};