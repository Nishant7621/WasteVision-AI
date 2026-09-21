import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scan, Bot, Database, Zap, ArrowRight, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const howItWorksSteps = [
  {
    number: '01',
    title: 'Upload',
    description: 'Upload a mixed waste image from your device or camera',
    icon: 'upload',
  },
  {
    number: '02',
    title: 'Detect',
    description: 'Computer Vision identifies individual objects in the image',
    icon: 'scan-eye',
  },
  {
    number: '03',
    title: 'Classify',
    description: 'AI determines waste category and material composition',
    icon: 'tag',
  },
  {
    number: '04',
    title: 'Verify',
    description: 'Low-confidence detections are flagged for human verification',
    icon: 'shield',
  },
  {
    number: '05',
    title: 'Plan',
    description: 'An agentic planner turns verified detections into safe next actions',
    icon: 'brain',
  },
  {
    number: '06',
    title: 'Act',
    description: 'Receive segregation, disposal, and safety instructions',
    icon: 'check-circle',
  },
];

const innovationFlow = [
  { label: 'ONE IMAGE', icon: 'image' },
  { label: 'MANY OBJECTS', icon: 'scan-eye' },
  { label: 'MANY CATEGORIES', icon: 'tag' },
  { label: 'WASTE COMPOSITION', icon: 'pie-chart' },
  { label: 'VERIFY', icon: 'shield' },
  { label: 'AGENTIC PLAN', icon: 'brain' },
  { label: 'ACTIONABLE GUIDANCE', icon: 'check-circle' },
];

const stats = [
  { value: '15+', label: 'Waste Categories' },
  { value: '95%+', label: 'Detection Accuracy' },
  { value: '<2s', label: 'Analysis Time' },
  { value: '100%', label: 'Privacy First' },
];

export const Home = () => {
  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-forest-50 via-white to-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest-100/50 via-transparent to-transparent" aria-hidden="true" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 flex items-center gap-2"
              >
                <Badge variant="forest" dot>WasteVision AI</Badge>
                <Badge variant="purple" dot>"See Waste. Understand It. Segregate It."</Badge>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-slate-950 leading-tight text-balance"
              >
                AI That Sees Every{' '}
                <span className="text-forest-700">Piece of Waste</span>
                .
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl"
              >
                Upload one image of mixed garbage and let AI identify individual waste objects, 
                understand their categories, and generate an intelligent segregation and disposal plan.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                <Link to="/scanner">
                  <Button size="lg" className="gap-2" aria-label="Start scanning waste">
                    <Scan className="w-5 h-5" />
                    Scan Waste
                  </Button>
                </Link>
                <Link to="/intelligence">
                  <Button variant="secondary" size="lg" className="gap-2">
                    Explore Waste Intelligence
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 flex flex-wrap gap-6 text-sm text-slate-500"
              >
                {stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <span className="font-bold text-2xl text-forest-700">{stat.value}</span>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] max-w-lg mx-auto">
                <div className="absolute inset-0 bg-slate-100 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex h-full flex-col items-center justify-center p-10 text-center">
                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-forest-100">
                      <Bot className="h-10 w-10 text-forest-700" aria-hidden="true" />
                    </div>
                    <p className="text-xl font-semibold text-slate-900">Agentic Waste Planner</p>
                    <p className="mt-3 max-w-sm text-slate-600">It verifies model confidence, groups waste categories, and prepares safe segregation actions.</p>
                    <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-medium text-forest-700">
                      <span className="rounded-full bg-forest-100 px-3 py-1">Detect</span>
                      <span className="rounded-full bg-forest-100 px-3 py-1">Verify</span>
                      <span className="rounded-full bg-forest-100 px-3 py-1">Act</span>
                    </div>
                  </div>
                  
                  <motion.div
                    className="absolute top-4 left-4"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur rounded-xl shadow-lg border border-slate-200">
                      <div className="w-2 h-2 bg-forest-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-slate-700">AI Vision Active</span>
                      <span className="text-xs text-forest-600 font-medium">6 objects detected</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-4 right-4"
                    animate={{ x: [0, -100, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="h-0.5 w-24 bg-gradient-to-r from-forest-500 to-transparent rounded" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="page-section bg-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600">
              Six stages from image to safe, actionable waste handling.
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-1/2 -translate-x-1/2 w-px h-[calc(100%-2.5rem)] bg-gradient-to-b from-forest-200 via-forest-300 to-forest-200" aria-hidden="true" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
              {howItWorksSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                  <div className="relative z-10 flex flex-col items-center lg:items-start gap-4 w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-forest-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-forest-700">{step.number}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                        <p className="text-slate-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {i < howItWorksSteps.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-forest-200 to-forest-300"
                      style={{ top: 'calc(100% + 1rem)' }}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest-900/30 via-transparent to-transparent" aria-hidden="true" />
        
        <div className="section-container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="purple" size="lg" className="mb-4" dot>
              Core Innovation
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
              One Image. Complete Waste Intelligence.
            </h2>
            <p className="text-lg text-slate-300">
              Not just classification. Full pipeline from pixels to actionable guidance.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-7 gap-4 lg:gap-6">
            {innovationFlow.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center text-center p-6 bg-slate-900/50 rounded-2xl border border-slate-800"
              >
                <div className="w-14 h-14 rounded-xl bg-forest-900/50 border border-forest-800 flex items-center justify-center mb-4">
                  <span className="text-2xl" aria-hidden="true">
                    {step.icon === 'image' && '🖼️'}
                    {step.icon === 'scan-eye' && '👁️'}
                    {step.icon === 'tag' && '🏷️'}
                    {step.icon === 'pie-chart' && '📊'}
                    {step.icon === 'database' && '🗄️'}
                    {step.icon === 'brain' && '🧠'}
                    {step.icon === 'check-circle' && '✅'}
                  </span>
                </div>
                <p className="font-medium text-sm sm:text-base text-slate-100">{step.label}</p>
                {i < innovationFlow.length - 1 && (
                  <div className="hidden lg:block w-px h-8 bg-gradient-to-b from-forest-800 to-transparent mx-auto mt-2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 mb-4">
              AI Architecture
            </h2>
            <p className="text-lg text-slate-600">
              Three pillars working together — detection, verification, and action planning.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Computer Vision',
                description: 'Object detection, segmentation, and waste classification using state-of-the-art models.',
                features: ['Multi-object detection', 'Bounding box localization', 'Confidence estimation', 'Material identification'],
              },
              {
                icon: Database,
                title: 'RAG Knowledge Base',
                description: 'Retrieves trusted waste-management guidelines, regulations, and safety protocols.',
                features: ['E-Waste Rules 2022', 'Biomedical Waste Rules', 'CPCB Guidelines', 'Local disposal directories'],
              },
              {
                icon: Bot,
                title: 'Agentic Waste Planner',
                description: 'Organizes verified detections into a safe, practical waste-handling plan.',
                features: ['Confidence-aware actions', 'Safety-first guidance', 'Segregation planning', 'Human verification prompts'],
              },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card variant="elevated" padding="lg">
                  <div className="w-12 h-12 rounded-xl bg-forest-100 flex items-center justify-center mb-4">
                    <pillar.icon className="w-6 h-6 text-forest-700" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{pillar.title}</h3>
                  <p className="text-slate-600 mb-6">{pillar.description}</p>
                  <ul className="space-y-2">
                    {pillar.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-forest-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-forest-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-forest-500/30 via-transparent to-transparent" aria-hidden="true" />
        
        <div className="section-container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to Understand Your Waste?
            </h2>
            <p className="text-lg text-forest-100 mb-10 max-w-2xl mx-auto">
              Turn a mixed pile of garbage into an intelligent segregation plan with AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/scanner">
                <Button size="lg" variant="secondary" className="bg-transparent border-white text-white hover:bg-white/10 gap-2 w-full sm:w-auto">
                  <Scan className="w-5 h-5" />
                  Scan Waste Now
                </Button>
              </Link>
              <Link to="/intelligence">
                <Button size="lg" variant="ghost" className="border-white text-white hover:bg-white/10 gap-2 w-full sm:w-auto">
                  Explore AI Intelligence
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
