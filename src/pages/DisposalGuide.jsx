import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, MapPin, Truck, Recycle, Leaf, AlertTriangle, Clock, Phone } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge, CategoryBadge, RiskBadge } from '../components/ui/Badge';
import { wasteCategories, mockDisposalCenters, categoryColors } from '../services/mockData';
import { getCategoryLabel, getCategoryColor } from '../utils/helpers';

const guides = {
  'e-waste': {
    title: 'E-Waste Disposal Guide',
    icon: '📱',
    what: 'Electronic and electrical equipment including phones, computers, TVs, cables, and circuit boards.',
    identify: 'Look for electronic components, screens, batteries, cables, or circuit boards. Items with plugs or batteries.',
    segregate: 'Keep completely separate from all other waste. Do not dismantle - lithium batteries pose fire risk.',
    prepare: '1. Backup data and factory reset devices. 2. Remove personal accessories (cases, screen protectors). 3. Bundle cables separately. 4. Tape battery terminals if removable.',
    recycle: 'Take to authorized e-waste recycler (CPCB registered). Many manufacturers offer take-back programs. Retailers often have collection bins.',
    dispose: 'Never put in regular trash. E-waste contains toxic materials (lead, mercury, cadmium) that leach into soil and water.',
    safety: 'High risk - contains heavy metals, flame retardants. Fire risk from lithium batteries. Never burn or dismantle at home.',
  },
  'plastic': {
    title: 'Plastic Waste Disposal Guide',
    icon: '🥤',
    what: 'Synthetic polymer materials - bottles, containers, bags, packaging, straws, etc.',
    identify: 'Check for recycling symbol with number 1-7. Common types: PET (1), HDPE (2), PVC (3), LDPE (4), PP (5), PS (6), Other (7).',
    segregate: 'Rinse clean and separate in recycling bin. Remove caps and labels when possible. Keep different plastic types separate if required locally.',
    prepare: '1. Empty and rinse thoroughly. 2. Remove caps (often different plastic). 3. Flatten bottles to save space. 4. Check local guidelines for accepted types.',
    recycle: 'PET (1) and HDPE (2) widely recycled. Others vary by location. Check municipal guidelines. Plastics can be recycled 2-3 times before downcycling.',
    dispose: 'Non-recyclable plastics go to general waste. Consider reducing single-use plastic consumption.',
    safety: 'Low risk. Avoid burning - releases dioxins and furans. Microplastics concern in environment.',
  },
  'organic': {
    title: 'Organic Waste Disposal Guide',
    icon: '🍎',
    what: 'Biodegradable waste from plants, animals, and food - food scraps, vegetable peels, garden waste, coffee grounds.',
    identify: 'Food waste, fruit/vegetable scraps, eggshells, coffee grounds, tea bags, garden trimmings, flowers.',
    segregate: 'Separate in green/compost bin. Keep free from plastics, metals, glass. Use compostable bags or paper bags only.',
    prepare: '1. Remove all packaging. 2. Drain excess liquids. 3. Chop large pieces for faster composting. 4. Avoid meat, dairy, oils in home compost.',
    recycle: 'Composted into nutrient-rich soil amendment. Municipal facilities create compost for agriculture/landscaping. Anaerobic digestion produces biogas.',
    dispose: 'Green bin for municipal collection. Home composting for garden waste. Community composting programs.',
    safety: 'Low risk. Handle with basic hygiene. Wash hands after handling. Avoid contaminated materials.',
  },
  'biomedical': {
    title: 'Biomedical Waste Disposal Guide',
    icon: '💉',
    what: 'Waste from healthcare activities - syringes, needles, bandages, gloves, medicines, samples, PPE.',
    identify: 'Sharps (needles, syringes, scalpels), contaminated materials (blood, body fluids), expired medicines, PPE from medical settings.',
    segregate: 'IMMEDIATE segregation at point of generation. Yellow bags for infectious waste. Red bags for contaminated waste. White puncture-proof containers for sharps.',
    prepare: 'Do NOT handle with bare hands. Use tongs/forceps. Place sharps directly in rigid container. Do not recap needles. Segregate by category at source.',
    recycle: 'NOT recyclable. Requires treatment (autoclaving, incineration, microwaving) at authorized CBWTF (Common Biomedical Waste Treatment Facility).',
    dispose: 'Only authorized CBWTF. Follow Biomedical Waste Management Rules 2016. Maintain records. Color-coded bags/containers mandatory.',
    safety: 'CRITICAL RISK - Infection transmission, sharps injury, chemical exposure. Professional handling only. PPE mandatory. Vaccination recommended for handlers.',
  },
  'battery': {
    title: 'Battery Waste Disposal Guide',
    icon: '🔋',
    what: 'All battery types - AA/AAA alkaline, lithium-ion (phones, laptops), lead-acid (vehicles), button cells, power banks.',
    identify: 'Check labels for chemistry: Alkaline, Li-ion, NiMH, NiCd, Lead-acid, Button cell (may contain mercury).',
    segregate: 'Separate by chemistry. Tape terminals on ALL batteries to prevent short circuits. Store in non-conductive container.',
    prepare: '1. Tape terminals (clear tape). 2. Sort by chemistry. 3. Place in plastic bag/container. 4. Keep away from heat/metal objects.',
    recycle: 'Li-ion: Cobalt, lithium, nickel recovery. Lead-acid: 99% recyclable. Button cells: Mercury/silver recovery. Drop at collection bins (electronics retailers, supermarkets).',
    dispose: 'Never in regular trash - fire risk in trucks/landfills. Lead-acid to battery retailers. Others to hazardous waste or collection programs.',
    safety: 'HIGH RISK - Fire, explosion, chemical burns. Li-ion thermal runaway. Tape terminals ALWAYS. Store cool, dry. Damaged batteries = immediate hazard.',
  },
};

const cities = ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'];

export const DisposalGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState('e-waste');
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [searchQuery, setSearchQuery] = useState('');

  const guide = guides[selectedCategory];
  const centers = mockDisposalCenters.filter(c => c.city === selectedCity && c.categories.includes(selectedCategory));

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900">Disposal Guide</h1>
          <p className="text-slate-600 mt-1">Identify → Segregate → Prepare → Dispose/Recycle</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <Card padding="lg">
              <h3 className="font-semibold text-slate-900 mb-4">Select Waste Category</h3>
              <div className="space-y-2">
                {Object.entries(guides).map(([key, g]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedCategory === key
                        ? `border-[${getCategoryColor(key)}] bg-[${getCategoryColor(key)}]10`
                        : 'border-slate-200 hover:border-forest-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{g.icon}</span>
                      <div>
                        <p className="font-medium text-slate-900">{g.title.replace(' Disposal Guide', '')}</p>
                        <p className="text-xs text-slate-500">{g.what.slice(0, 60)}...</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="font-semibold text-slate-900 mb-4">Find Disposal Centers</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 bg-white"
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                
                {centers.length > 0 ? (
                  <div className="space-y-3">
                    {centers.map((center) => (
                      <div key={center.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="font-medium text-slate-900">{center.name}</p>
                        <p className="text-sm text-slate-600 mt-1">{center.address}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {center.categories.map(cat => (
                            <CategoryBadge key={cat} category={cat} size="sm" />
                          ))}
                        </div>
                        <div className="flex gap-4 mt-2 text-sm text-slate-500">
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {center.contact}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {center.hours}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">No centers found for this category in {selectedCity}</p>
                )}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {guide && (
              <>
                <Card padding="lg">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{guide.icon}</span>
                      <div>
                        <CardTitle>{guide.title}</CardTitle>
                        <CategoryBadge category={selectedCategory} size="lg" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                        <span className="w-5 h-5 text-forest-600" role="img" aria-label="info">ℹ️</span>
                        What is it?
                      </h4>
                      <p className="text-slate-600">{guide.what}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                        <span className="w-5 h-5 text-forest-600" role="img" aria-label="search">🔍</span>
                        How to Identify
                      </h4>
                      <p className="text-slate-600">{guide.identify}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                        <span className="w-5 h-5 text-forest-600" role="img" aria-label="segregate">♻️</span>
                        How to Segregate
                      </h4>
                      <p className="text-slate-600">{guide.segregate}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                        <span className="w-5 h-5 text-forest-600" role="img" aria-label="prepare">⚙️</span>
                        How to Prepare
                      </h4>
                      <p className="text-slate-600">{guide.prepare}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                        <Recycle className="w-5 h-5 text-forest-600" />
                        How to Recycle
                      </h4>
                      <p className="text-slate-600">{guide.recycle}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                        <span className="w-5 h-5 text-forest-600" role="img" aria-label="dispose">🗑️</span>
                        How to Dispose
                      </h4>
                      <p className="text-slate-600">{guide.dispose}</p>
                    </div>
                    <div className={`p-4 rounded-xl border ${guide.safety.includes('CRITICAL') ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'}`}>
                      <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" style={{ color: guide.safety.includes('CRITICAL') ? '#ef4444' : '#f59e0b' }} />
                        Safety Warnings
                      </h4>
                      <p className="text-sm" style={{ color: guide.safety.includes('CRITICAL') ? '#dc2626' : '#b45309' }}>{guide.safety}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card padding="lg">
                  <CardHeader>
                    <CardTitle>Disposal Centers in {selectedCity}</CardTitle>
                    <CardDescription>Authorized facilities for {getCategoryLabel(selectedCategory).toLowerCase()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {centers.length > 0 ? (
                      <div className="space-y-4">
                        {centers.map((center) => (
                          <div key={center.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-semibold text-slate-900">{center.name}</p>
                                <p className="text-sm text-slate-600 mt-1">{center.address}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {center.categories.map(cat => (
                                    <CategoryBadge key={cat} category={cat} size="sm" />
                                  ))}
                                </div>
                              </div>
                              <div className="text-right text-sm text-slate-500">
                                <p className="flex items-center gap-1"><Phone className="w-3 h-3" /> {center.contact}</p>
                                <p className="flex items-center gap-1"><Clock className="w-3 h-3" /> {center.hours}</p>
                                {center.verified && (
                                  <Badge variant="success" size="sm" className="mt-2" dot>Verified</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <MapPin className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                        <p>No authorized centers found for this category in {selectedCity}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};