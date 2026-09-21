import type { Detection, WasteComposition, WasteCategoryInfo, ScanResult, GraniteResponse, RAGResponse, DisposalCenter, ImpactMetrics, UserScan, PipelineStep, ChatMessage } from '../types';

export const mockDetections: Detection[] = [
  {
    id: 'obj_001',
    object: 'Mobile Phone',
    category: 'e-waste',
    confidence: 0.94,
    material: ['glass', 'plastic', 'metal', 'electronics'],
    risk: 'high',
    bbox: { x: 15, y: 20, width: 18, height: 25 }
  },
  {
    id: 'obj_002',
    object: 'Plastic Bottle',
    category: 'plastic',
    confidence: 0.96,
    material: ['PET'],
    risk: 'low',
    bbox: { x: 40, y: 35, width: 12, height: 22 }
  },
  {
    id: 'obj_003',
    object: 'Glass Bottle',
    category: 'glass',
    confidence: 0.92,
    material: ['glass'],
    risk: 'medium',
    bbox: { x: 65, y: 15, width: 14, height: 28 }
  },
  {
    id: 'obj_004',
    object: 'Vegetable Waste',
    category: 'organic',
    confidence: 0.89,
    material: ['organic matter'],
    risk: 'low',
    bbox: { x: 25, y: 55, width: 20, height: 18 }
  },
  {
    id: 'obj_005',
    object: 'Syringe',
    category: 'biomedical',
    confidence: 0.97,
    material: ['plastic', 'metal needle'],
    risk: 'critical',
    bbox: { x: 75, y: 50, width: 8, height: 15 }
  },
  {
    id: 'obj_006',
    object: 'Battery',
    category: 'battery',
    confidence: 0.95,
    material: ['lithium-ion', 'metal casing'],
    risk: 'high',
    bbox: { x: 5, y: 60, width: 10, height: 12 }
  }
];

export const mockComposition: WasteComposition[] = [
  { category: 'plastic', percentage: 28, object_count: 2, confidence: 0.94, weight_estimate: 0.15 },
  { category: 'e-waste', percentage: 24, object_count: 2, confidence: 0.93, weight_estimate: 0.35 },
  { category: 'organic', percentage: 18, object_count: 1, confidence: 0.89, weight_estimate: 0.25 },
  { category: 'glass', percentage: 12, object_count: 1, confidence: 0.92, weight_estimate: 0.4 },
  { category: 'metal', percentage: 8, object_count: 1, confidence: 0.9, weight_estimate: 0.1 },
  { category: 'biomedical', percentage: 6, object_count: 1, confidence: 0.97, weight_estimate: 0.02 },
  { category: 'battery', percentage: 4, object_count: 1, confidence: 0.95, weight_estimate: 0.05 }
];

export const mockScanResult: ScanResult = {
  image_id: 'scan_001',
  detections: mockDetections,
  composition: mockComposition,
  timestamp: new Date().toISOString(),
  image_url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop'
};

export const wasteCategories: WasteCategoryInfo[] = [
  {
    id: 'organic',
    name: 'Organic / Bio Waste',
    icon: 'leaf',
    description: 'Biodegradable waste from plants, animals, and food',
    risk: 'low',
    typical_items: ['Food scraps', 'Vegetable peels', 'Fruit waste', 'Garden waste', 'Coffee grounds'],
    materials: ['organic matter', 'cellulose'],
    segregation: 'Separate in green bin for composting',
    recycling: 'Compost to create nutrient-rich soil',
    disposal: 'Municipal organic waste collection or home composting',
    safety: 'Low risk. Handle with basic hygiene.',
    color: '#16a34a'
  },
  {
    id: 'plastic',
    name: 'Plastic Waste',
    icon: 'recycle',
    description: 'Synthetic polymer materials',
    risk: 'low',
    typical_items: ['Bottles', 'Containers', 'Bags', 'Packaging', 'Straws'],
    materials: ['PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS'],
    segregation: 'Rinse and separate in blue/recycling bin',
    recycling: 'Recyclable - check local codes (1-7)',
    disposal: 'Recycling center or municipal plastic collection',
    safety: 'Low risk. Avoid burning - releases toxins.',
    color: '#3b82f6'
  },
  {
    id: 'paper',
    name: 'Paper & Cardboard',
    icon: 'file-text',
    description: 'Cellulose-based recyclable materials',
    risk: 'low',
    typical_items: ['Newspapers', 'Cardboard boxes', 'Office paper', 'Magazines', 'Egg cartons'],
    materials: ['cellulose', 'wood pulp'],
    segregation: 'Keep dry and separate in recycling bin',
    recycling: 'Highly recyclable - up to 7 cycles',
    disposal: 'Paper recycling collection',
    safety: 'Low risk. Keep dry to maintain recyclability.',
    color: '#8b5cf6'
  },
  {
    id: 'glass',
    name: 'Glass Waste',
    icon: 'wine',
    description: 'Silica-based transparent materials',
    risk: 'medium',
    typical_items: ['Bottles', 'Jars', 'Windows', 'Drinking glasses', 'Light bulbs'],
    materials: ['silica', 'soda ash', 'limestone'],
    segregation: 'Separate by color (clear, green, brown)',
    recycling: 'Infinitely recyclable without quality loss',
    disposal: 'Glass recycling bins or bottle banks',
    safety: 'Medium risk - sharp edges. Handle carefully.',
    color: '#f59e0b'
  },
  {
    id: 'metal',
    name: 'Metal Waste',
    icon: 'cog',
    description: 'Ferrous and non-ferrous metals',
    risk: 'low',
    typical_items: ['Cans', 'Foil', 'Scrap metal', 'Wire', 'Appliances'],
    materials: ['aluminum', 'steel', 'copper', 'iron'],
    segregation: 'Separate ferrous (magnetic) from non-ferrous',
    recycling: 'Highly valuable - infinitely recyclable',
    disposal: 'Scrap metal dealer or recycling center',
    safety: 'Low risk. Watch for sharp edges.',
    color: '#64748b'
  },
  {
    id: 'e-waste',
    name: 'E-Waste',
    icon: 'cpu',
    description: 'Electronic and electrical equipment',
    risk: 'high',
    typical_items: ['Phones', 'Computers', 'TVs', 'Cables', 'Circuit boards', 'Chargers'],
    materials: ['gold', 'silver', 'copper', 'rare earths', 'plastics', 'glass'],
    segregation: 'Keep separate from all other waste',
    recycling: 'Authorized e-waste recyclers only',
    disposal: 'E-waste collection centers or manufacturer take-back',
    safety: 'High risk - contains heavy metals, flame retardants. Never burn.',
    color: '#ec4899'
  },
  {
    id: 'biomedical',
    name: 'Biomedical / Medical Waste',
    icon: 'syringe',
    description: 'Waste from healthcare activities',
    risk: 'critical',
    typical_items: ['Syringes', 'Needles', 'Bandages', 'Gloves', 'Medicines', 'Samples'],
    materials: ['plastic', 'metal', 'biological matter', 'chemicals'],
    segregation: 'Immediate segregation in yellow/red containers',
    recycling: 'Not recyclable - requires treatment',
    disposal: 'Authorized biomedical waste treatment facility only',
    safety: 'CRITICAL RISK - Infection, sharps injury. Professional handling only.',
    color: '#ef4444'
  },
  {
    id: 'hazardous',
    name: 'Hazardous Waste',
    icon: 'skull',
    description: 'Dangerous chemicals and materials',
    risk: 'critical',
    typical_items: ['Paint', 'Solvents', 'Pesticides', 'Cleaners', 'Oils', 'Acids'],
    materials: ['various chemicals'],
    segregation: 'Original containers, tightly sealed, separate storage',
    recycling: 'Specialized hazardous waste facilities',
    disposal: 'Authorized hazardous waste collector',
    safety: 'CRITICAL RISK - Toxic, flammable, corrosive. PPE required.',
    color: '#dc2626'
  },
  {
    id: 'battery',
    name: 'Battery Waste',
    icon: 'battery',
    description: 'All types of batteries',
    risk: 'high',
    typical_items: ['AA/AAA', 'Lithium-ion', 'Lead-acid', 'Button cells', 'Power banks'],
    materials: ['lithium', 'lead', 'cadmium', 'nickel', 'acid'],
    segregation: 'Tape terminals, separate by chemistry',
    recycling: 'Battery recycling programs only',
    disposal: 'Battery collection bins or hazardous waste facility',
    safety: 'High risk - fire, explosion, chemical burns. Tape terminals.',
    color: '#f97316'
  },
  {
    id: 'textile',
    name: 'Textile Waste',
    icon: 'shirt',
    description: 'Clothing and fabric materials',
    risk: 'low',
    typical_items: ['Clothes', 'Shoes', 'Bags', 'Curtains', 'Bedding'],
    materials: ['cotton', 'polyester', 'wool', 'synthetic blends'],
    segregation: 'Clean, dry, bagged separately',
    recycling: 'Donation, textile recycling, upcycling',
    disposal: 'Textile banks or charity collection',
    safety: 'Low risk. Ensure clean and dry.',
    color: '#06b6d4'
  }
];

export const mockGraniteResponse: GraniteResponse = {
  recommendation: {
    summary: 'Your scan contains electronic waste including a mobile phone and battery. These items contain valuable recoverable materials (gold, silver, copper, lithium) but also hazardous substances (lead, mercury, flame retardants). Keep all e-waste and batteries completely separate from regular household waste.',
    why_it_matters: 'E-waste is the fastest-growing waste stream globally. When improperly disposed, toxic materials leach into soil and groundwater. A single phone contains ~0.034g gold, 0.34g silver, and 15g copper. Batteries pose fire risks in waste trucks and landfills. The biomedical waste (syringe) requires immediate specialized handling to prevent needlestick injuries and disease transmission.',
    segregation: '1. IMMEDIATE: Place syringe in rigid sharps container (puncture-proof). 2. Separate phone, battery, and any cables/chargers into e-waste bag. 3. Rinse plastic and glass bottles. 4. Place vegetable waste in compost/organic bin. 5. Keep all streams physically separated until disposal.',
    disposal: 'E-waste: Authorized e-waste recycler (check CPCB list). Battery: Battery collection bin (often at electronics retailers). Biomedical: Authorized CBWTF (Common Biomedical Waste Treatment Facility). Glass/Plastic: Municipal recycling. Organic: Composting or green bin.',
    safety: 'CRITICAL: Do NOT handle syringe with bare hands. Use tongs or thick gloves. Place in rigid container immediately. Tape battery terminals to prevent short circuits. Do not dismantle phone - lithium battery fire risk. Wash hands thoroughly after handling any waste.',
    recovery: 'Phone: ~95% material recovery possible at certified recycler. Battery: Lithium, cobalt, nickel recovery. Glass: 100% recyclable infinitely. Plastic: Downcycled to fibers/pellets. Organic: Compost for soil amendment. Total estimated recovery value: ₹200-500 depending on local rates.'
  },
  grounded_in: [
    'E-Waste (Management) Rules, 2022',
    'Battery Waste Management Rules, 2022',
    'Biomedical Waste Management Rules, 2016',
    'Plastic Waste Management Rules, 2016',
    'CPCB Guidelines for E-Waste Recycling'
  ]
};

export const mockRAGResponse: RAGResponse = {
  query: 'How should I dispose of this mobile phone and battery?',
  sources: [
    { title: 'E-Waste (Management) Rules, 2022', category: 'regulation', relevance: 0.96 },
    { title: 'Battery Waste Management Rules, 2022', category: 'regulation', relevance: 0.94 },
    { title: 'CPCB Authorized Recycler List', category: 'directory', relevance: 0.91 },
    { title: 'Extended Producer Responsibility Guidelines', category: 'guideline', relevance: 0.88 }
  ],
  context: 'Under the E-Waste (Management) Rules 2022, producers are responsible for collection and recycling. Consumers must handover e-waste only to authorized recyclers. Battery rules mandate separate collection. Biomedical waste requires CBWTF disposal.'
};

export const mockDisposalCenters: DisposalCenter[] = [
  // Bangalore
  {
    id: 'dc_001',
    name: 'GreenTech E-Waste Recycling',
    address: 'Sector 18, Electronic City',
    city: 'Bangalore',
    categories: ['e-waste', 'battery'],
    contact: '+91-80-2345-6789',
    hours: 'Mon-Sat 9AM-6PM',
    lat: 12.8456,
    lng: 77.6603,
    verified: true
  },
  {
    id: 'dc_002',
    name: 'EcoCycle Plastic Recovery',
    address: 'Industrial Area, Phase 2',
    city: 'Bangalore',
    categories: ['plastic', 'paper', 'metal'],
    contact: '+91-80-3456-7890',
    hours: 'Mon-Fri 8AM-5PM',
    lat: 12.9716,
    lng: 77.5946,
    verified: true
  },
  {
    id: 'dc_003',
    name: 'MediSafe Biomedical Waste Facility',
    address: 'Hosur Road, Biomedical Park',
    city: 'Bangalore',
    categories: ['biomedical', 'hazardous'],
    contact: '+91-80-4567-8901',
    hours: '24/7 Emergency',
    lat: 12.9081,
    lng: 77.5982,
    verified: true
  },
  {
    id: 'dc_004',
    name: 'GlassLoop Recycling Center',
    address: 'Peenya Industrial Estate',
    city: 'Bangalore',
    categories: ['glass'],
    contact: '+91-80-5678-9012',
    hours: 'Mon-Sat 9AM-7PM',
    lat: 13.0358,
    lng: 77.5149,
    verified: true
  },
  // Mumbai
  {
    id: 'dc_005',
    name: 'Mumbai E-Waste Solutions',
    address: 'TTC Industrial Area, MIDC',
    city: 'Mumbai',
    categories: ['e-waste', 'battery'],
    contact: '+91-22-2345-6789',
    hours: 'Mon-Sat 9AM-6PM',
    lat: 19.1176,
    lng: 72.9060,
    verified: true
  },
  {
    id: 'dc_006',
    name: 'Green Mumbai Plastic Recycling',
    address: 'Bhandup Industrial Estate',
    city: 'Mumbai',
    categories: ['plastic', 'paper', 'metal'],
    contact: '+91-22-3456-7890',
    hours: 'Mon-Fri 8AM-5PM',
    lat: 19.1500,
    lng: 72.9500,
    verified: true
  },
  {
    id: 'dc_007',
    name: 'MediCare Biomedical Facility',
    address: 'Govandi, Deonar',
    city: 'Mumbai',
    categories: ['biomedical', 'hazardous'],
    contact: '+91-22-4567-8901',
    hours: '24/7 Emergency',
    lat: 19.0500,
    lng: 72.9200,
    verified: true
  },
  {
    id: 'dc_008',
    name: 'GlassRecycle Mumbai',
    address: 'Kurla Industrial Area',
    city: 'Mumbai',
    categories: ['glass'],
    contact: '+91-22-5678-9012',
    hours: 'Mon-Sat 9AM-7PM',
    lat: 19.0700,
    lng: 72.8800,
    verified: true
  },
  // Delhi
  {
    id: 'dc_009',
    name: 'Delhi E-Waste Management',
    address: 'Mayapuri Industrial Area, Phase 2',
    city: 'Delhi',
    categories: ['e-waste', 'battery'],
    contact: '+91-11-2345-6789',
    hours: 'Mon-Sat 9AM-6PM',
    lat: 28.6400,
    lng: 77.1000,
    verified: true
  },
  {
    id: 'dc_010',
    name: 'Capital Plastic Recovery',
    address: 'Narela Industrial Area',
    city: 'Delhi',
    categories: ['plastic', 'paper', 'metal'],
    contact: '+91-11-3456-7890',
    hours: 'Mon-Fri 8AM-5PM',
    lat: 28.8500,
    lng: 77.1000,
    verified: true
  },
  {
    id: 'dc_011',
    name: 'Safdarjung Biomedical Center',
    address: 'Safdarjung Hospital Complex',
    city: 'Delhi',
    categories: ['biomedical', 'hazardous'],
    contact: '+91-11-4567-8901',
    hours: '24/7 Emergency',
    lat: 28.5600,
    lng: 77.2000,
    verified: true
  },
  {
    id: 'dc_012',
    name: 'Delhi Glass Recyclers',
    address: 'Wazirpur Industrial Area',
    city: 'Delhi',
    categories: ['glass'],
    contact: '+91-11-5678-9012',
    hours: 'Mon-Sat 9AM-7PM',
    lat: 28.6800,
    lng: 77.1500,
    verified: true
  },
  // Chennai
  {
    id: 'dc_013',
    name: 'Chennai E-Waste Recyclers',
    address: 'Ambattur Industrial Estate',
    city: 'Chennai',
    categories: ['e-waste', 'battery'],
    contact: '+91-44-2345-6789',
    hours: 'Mon-Sat 9AM-6PM',
    lat: 13.1100,
    lng: 80.1600,
    verified: true
  },
  {
    id: 'dc_014',
    name: 'South India Plastic Recovery',
    address: 'Guindy Industrial Estate',
    city: 'Chennai',
    categories: ['plastic', 'paper', 'metal'],
    contact: '+91-44-3456-7890',
    hours: 'Mon-Fri 8AM-5PM',
    lat: 13.0100,
    lng: 80.2200,
    verified: true
  },
  {
    id: 'dc_015',
    name: 'Chennai Medical Waste Facility',
    address: 'Perungudi, Near MRTS',
    city: 'Chennai',
    categories: ['biomedical', 'hazardous'],
    contact: '+91-44-4567-8901',
    hours: '24/7 Emergency',
    lat: 12.9600,
    lng: 80.2400,
    verified: true
  },
  {
    id: 'dc_016',
    name: 'Chennai Glass Loop',
    address: 'Maraimalai Nagar',
    city: 'Chennai',
    categories: ['glass'],
    contact: '+91-44-5678-9012',
    hours: 'Mon-Sat 9AM-7PM',
    lat: 12.8200,
    lng: 79.9900,
    verified: true
  },
  // Hyderabad
  {
    id: 'dc_017',
    name: 'Hyderabad E-Waste Solutions',
    address: 'Patancheru Industrial Area',
    city: 'Hyderabad',
    categories: ['e-waste', 'battery'],
    contact: '+91-40-2345-6789',
    hours: 'Mon-Sat 9AM-6PM',
    lat: 17.5200,
    lng: 78.2800,
    verified: true
  },
  {
    id: 'dc_018',
    name: 'Deccan Plastic Recycling',
    address: 'Jeedimetla Industrial Area',
    city: 'Hyderabad',
    categories: ['plastic', 'paper', 'metal'],
    contact: '+91-40-3456-7890',
    hours: 'Mon-Fri 8AM-5PM',
    lat: 17.5300,
    lng: 78.3400,
    verified: true
  },
  {
    id: 'dc_019',
    name: 'Hyderabad Biomedical Center',
    address: 'Gandhi Hospital Campus',
    city: 'Hyderabad',
    categories: ['biomedical', 'hazardous'],
    contact: '+91-40-4567-8901',
    hours: '24/7 Emergency',
    lat: 17.4100,
    lng: 78.4700,
    verified: true
  },
  {
    id: 'dc_020',
    name: 'Telangana Glass Recyclers',
    address: 'Kukatpally Industrial Estate',
    city: 'Hyderabad',
    categories: ['glass'],
    contact: '+91-40-5678-9012',
    hours: 'Mon-Sat 9AM-7PM',
    lat: 17.4800,
    lng: 78.4000,
    verified: true
  },
  // Pune
  {
    id: 'dc_021',
    name: 'Pune E-Waste Management',
    address: 'Chakan MIDC Industrial Area',
    city: 'Pune',
    categories: ['e-waste', 'battery'],
    contact: '+91-20-2345-6789',
    hours: 'Mon-Sat 9AM-6PM',
    lat: 18.7600,
    lng: 73.8600,
    verified: true
  },
  {
    id: 'dc_022',
    name: 'Pune Plastic Recovery',
    address: 'Bhosari Industrial Area',
    city: 'Pune',
    categories: ['plastic', 'paper', 'metal'],
    contact: '+91-20-3456-7890',
    hours: 'Mon-Fri 8AM-5PM',
    lat: 18.6300,
    lng: 73.8500,
    verified: true
  },
  {
    id: 'dc_023',
    name: 'Sassoon Biomedical Facility',
    address: 'Sassoon Hospital Campus',
    city: 'Pune',
    categories: ['biomedical', 'hazardous'],
    contact: '+91-20-4567-8901',
    hours: '24/7 Emergency',
    lat: 18.5300,
    lng: 73.8800,
    verified: true
  },
  {
    id: 'dc_024',
    name: 'Pune Glass Recycling',
    address: 'Hinjewadi Phase 3',
    city: 'Pune',
    categories: ['glass'],
    contact: '+91-20-5678-9012',
    hours: 'Mon-Sat 9AM-7PM',
    lat: 18.5900,
    lng: 73.7400,
    verified: true
  },
  // Kolkata
  {
    id: 'dc_025',
    name: 'Kolkata E-Waste Recyclers',
    address: 'Kasba Industrial Estate',
    city: 'Kolkata',
    categories: ['e-waste', 'battery'],
    contact: '+91-33-2345-6789',
    hours: 'Mon-Sat 9AM-6PM',
    lat: 22.5000,
    lng: 88.3900,
    verified: true
  },
  {
    id: 'dc_026',
    name: 'Bengal Plastic Recovery',
    address: 'Howrah Industrial Belt',
    city: 'Kolkata',
    categories: ['plastic', 'paper', 'metal'],
    contact: '+91-33-3456-7890',
    hours: 'Mon-Fri 8AM-5PM',
    lat: 22.5900,
    lng: 88.2600,
    verified: true
  },
  {
    id: 'dc_027',
    name: 'Kolkata Medical Waste Center',
    address: 'Medical College Campus',
    city: 'Kolkata',
    categories: ['biomedical', 'hazardous'],
    contact: '+91-33-4567-8901',
    hours: '24/7 Emergency',
    lat: 22.5700,
    lng: 88.3600,
    verified: true
  },
  {
    id: 'dc_028',
    name: 'Kolkata Glass Loop',
    address: 'Dankuni Industrial Area',
    city: 'Kolkata',
    categories: ['glass'],
    contact: '+91-33-5678-9012',
    hours: 'Mon-Sat 9AM-7PM',
    lat: 22.6800,
    lng: 88.2900,
    verified: true
  },
  // Ahmedabad
  {
    id: 'dc_029',
    name: 'Ahmedabad E-Waste Solutions',
    address: 'Naroda GIDC Industrial Estate',
    city: 'Ahmedabad',
    categories: ['e-waste', 'battery'],
    contact: '+91-79-2345-6789',
    hours: 'Mon-Sat 9AM-6PM',
    lat: 23.0600,
    lng: 72.6600,
    verified: true
  },
  {
    id: 'dc_030',
    name: 'Gujarat Plastic Recycling',
    address: 'Vatva GIDC Industrial Estate',
    city: 'Ahmedabad',
    categories: ['plastic', 'paper', 'metal'],
    contact: '+91-79-3456-7890',
    hours: 'Mon-Fri 8AM-5PM',
    lat: 22.9500,
    lng: 72.6200,
    verified: true
  },
  {
    id: 'dc_031',
    name: 'Civil Hospital Biomedical Facility',
    address: 'Civil Hospital Campus, Asarwa',
    city: 'Ahmedabad',
    categories: ['biomedical', 'hazardous'],
    contact: '+91-79-4567-8901',
    hours: '24/7 Emergency',
    lat: 23.0400,
    lng: 72.5900,
    verified: true
  },
  {
    id: 'dc_032',
    name: 'Ahmedabad Glass Recyclers',
    address: 'Sanand Industrial Area',
    city: 'Ahmedabad',
    categories: ['glass'],
    contact: '+91-79-5678-9012',
    hours: 'Mon-Sat 9AM-7PM',
    lat: 22.9800,
    lng: 72.4000,
    verified: true
  }
];

export const mockImpactMetrics: ImpactMetrics = {
  waste_analyzed: 2847.5,
  objects_detected: 15642,
  potentially_recoverable: 1234.8,
  landfill_diversion: 892.3,
  co2_avoidance: 2156.7,
  scans_completed: 3421
};

export const mockUserScans: UserScan[] = [
  {
    id: 'scan_001',
    image_url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
    timestamp: '2024-01-15T10:30:00Z',
    detections_count: 6,
    categories: ['e-waste', 'plastic', 'glass', 'organic', 'biomedical', 'battery'],
    composition: mockComposition,
    is_verified: true
  },
  {
    id: 'scan_002',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
    timestamp: '2024-01-12T14:22:00Z',
    detections_count: 4,
    categories: ['plastic', 'paper', 'glass', 'metal'],
    composition: [
      { category: 'plastic', percentage: 40, object_count: 3, confidence: 0.92 },
      { category: 'paper', percentage: 30, object_count: 2, confidence: 0.95 },
      { category: 'glass', percentage: 20, object_count: 1, confidence: 0.89 },
      { category: 'metal', percentage: 10, object_count: 1, confidence: 0.91 }
    ],
    is_verified: true
  }
];

export const pipelineSteps: PipelineStep[] = [
  { id: 'image', name: 'Image Received', description: 'Upload validated and preprocessed', icon: 'image', status: 'completed' },
  { id: 'detection', name: 'Object Detection', description: 'YOLOv8 identifies individual objects', icon: 'scan-eye', status: 'completed' },
  { id: 'classification', name: 'Waste Classification', description: 'ResNet classifies each object into waste categories', icon: 'tag', status: 'completed' },
  { id: 'material', name: 'Material Analysis', description: 'Material composition identified per object', icon: 'cube', status: 'completed' },
  { id: 'composition', name: 'Composition Calculation', description: 'Waste composition profile generated', icon: 'pie-chart', status: 'completed' },
  { id: 'rag', name: 'Knowledge Retrieval', description: 'RAG fetches relevant waste guidelines', icon: 'database', status: 'completed' },
  { id: 'granite', name: 'Granite AI Reasoning', description: 'IBM Granite generates grounded recommendations', icon: 'brain', status: 'completed' },
  { id: 'recommendation', name: 'Actionable Guidance', description: 'Segregation, disposal, and safety plan delivered', icon: 'check-circle', status: 'completed' }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg_001',
    role: 'assistant',
    content: 'Welcome to WasteVision AI Assistant! I can help you understand your waste scan results, provide disposal guidance, and answer questions about waste management. What would you like to know?',
    timestamp: new Date(Date.now() - 300000).toISOString()
  }
];

export const categoryColors: Record<string, string> = {
  organic: '#16a34a',
  plastic: '#3b82f6',
  paper: '#8b5cf6',
  glass: '#f59e0b',
  metal: '#64748b',
  'e-waste': '#ec4899',
  biomedical: '#ef4444',
  hazardous: '#dc2626',
  battery: '#f97316',
  textile: '#06b6d4',
  construction: '#78716c',
  rubber: '#525252',
  sanitary: '#f43f5e',
  chemical: '#7c2d12',
  mixed: '#94a3b8'
};