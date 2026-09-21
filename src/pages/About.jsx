import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Database, 
  Brain, 
  ScanEye, 
  Tag, 
  Box, 
  PieChart, 
  CheckCircle,
  Shield,
  Recycle,
  ExternalLink,
  Mail,
  AlertCircle,
  Leaf,
  Award
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const pillars = [
  {
    icon: ScanEye,
    title: 'Computer Vision',
    description: 'State-of-the-art object detection and segmentation identifies individual waste items in mixed scenes.',
    features: ['YOLOv8 multi-object detection', 'Instance segmentation', 'Confidence scoring', 'Real-time inference'],
    color: 'blue',
  },
  {
    icon: Tag,
    title: 'Waste Classification',
    description: 'Fine-grained classification maps detected objects to 15+ waste categories with material identification.',
    features: ['15+ waste categories', 'Material composition analysis', 'Risk level assessment', 'Regulatory compliance mapping'],
    color: 'forest',
  },
  {
    icon: Box,
    title: 'Material Intelligence',
    description: 'Deep material analysis identifies constituent materials for each detected object.',
    features: ['Polymer identification', 'Metal alloy detection', 'Composite material analysis', 'Hazardous substance flagging'],
    color: 'purple',
  },
  {
    icon: PieChart,
    title: 'Composition Analysis',
    description: 'Aggregates individual detections into comprehensive waste composition profiles with weight estimates.',
    features: ['Category percentages', 'Object counts', 'Weight estimation', 'Confidence intervals'],
    color: 'amber',
  },
  {
    icon: Database,
    title: 'RAG Knowledge Base',
    description: 'Retrieval-Augmented Generation fetches trusted waste management guidelines and regulations.',
    features: ['E-Waste Rules 2022', 'Biomedical Waste Rules 2016', 'CPCB Guidelines', 'Local disposal directories'],
    color: 'cyan',
  },
  {
    icon: Brain,
    title: 'IBM Granite LLM',
    description: 'Generates grounded, structured recommendations with source attribution and safety-first reasoning.',
    features: ['Grounded generation', 'Structured output', 'Safety prioritization', 'Source citation'],
    color: 'pink',
  },
];

const pipelineSteps = [
  { step: 1, title: 'Image Upload', description: 'User uploads mixed waste image via web or mobile', icon: '📤' },
  { step: 2, title: 'Object Detection', description: 'YOLOv8 detects and localizes individual objects', icon: '👁️' },
  { step: 3, title: 'Classification', description: 'ResNet classifies each object into waste categories', icon: '🏷️' },
  { step: 4, title: 'Material ID', description: 'Material composition identified per object', icon: '🔬' },
  { step: 5, title: 'Composition', description: 'Waste composition profile generated', icon: '📊' },
  { step: 6, title: 'RAG Retrieval', description: 'Relevant waste guidelines fetched from knowledge base', icon: '🗄️' },
  { step: 7, title: 'Granite Reasoning', description: 'IBM Granite generates grounded recommendations', icon: '🧠' },
  { step: 8, title: 'Actionable Output', description: 'Segregation plan, disposal guidance, safety alerts', icon: '✅' },
];

const achievements = [
  { icon: Shield, label: 'Responsible AI', value: 'Human-in-the-loop feedback' },
  { icon: Leaf, label: 'Eco-First', value: 'Privacy-preserving design' },
  { icon: Recycle, label: 'Circular Economy', value: 'Material recovery focus' },
  { icon: Award, label: 'Innovation', value: 'AI-powered waste intelligence' },
];

const team = [
  { name: 'AI/ML Engineers', role: 'Computer Vision, NLP, LLM Integration' },
  { name: 'Frontend Developers', role: 'React, TypeScript, Tailwind, Framer Motion' },
  { name: 'Backend Engineers', role: 'API Design, Vector DB, RAG Pipeline' },
  { name: 'Domain Experts', role: 'Waste Management, Regulatory Compliance' },
  { name: 'UX Researchers', role: 'User Testing, Accessibility, Safety UX' },
];

export const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-forest-50 via-white to-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest-100/50 via-transparent to-transparent" aria-hidden="true" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center justify-center gap-2"
            >
              <Badge variant="forest" dot>WasteVision AI</Badge>
              <Badge variant="purple" dot>"See Waste. Understand It. Segregate It."</Badge>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-slate-950 leading-tight text-balance mb-6"
            >
              About WasteVision AI
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              AI-powered waste intelligence platform combining computer vision, RAG, and IBM Granite 
              to transform mixed waste into intelligent segregation and disposal plans.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="gap-2" onClick={() => window.scrollTo({ top: document.getElementById('problem')?.offsetTop || 0, behavior: 'smooth' })}>
                <Zap className="w-5 h-5" />
                The Problem
              </Button>
              <Button variant="secondary" size="lg" className="gap-2" onClick={() => window.scrollTo({ top: document.getElementById('solution')?.offsetTop || 0, behavior: 'smooth' })}>
                Our Solution
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="problem" className="page-section bg-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="forest" size="lg" className="mb-4" dot>
              The Problem
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 mb-4">
              Waste Segregation is Broken
            </h2>
            <p className="text-lg text-slate-600">
              Current solutions treat waste as a single category. But real garbage is mixed, complex, and dangerous.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: AlertCircle, title: 'Mixed Waste', desc: 'Single images contain multiple waste types requiring different handling' },
              { icon: Shield, title: 'Safety Risks', desc: 'Biomedical, hazardous, and e-waste pose serious health risks if mishandled' },
              { icon: Zap, title: 'No Intelligence', desc: 'Basic classifiers miss context, regulations, and recovery opportunities' },
              { icon: Database, title: 'Knowledge Gap', desc: 'Disposal rules vary by location, category, and regulation — hard to access' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card variant="elevated" padding="lg" className="h-full">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="solution" className="page-section bg-slate-950 text-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="purple" size="lg" className="mb-4" dot>
              Our Solution
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              One Image. Complete Waste Intelligence.
            </h2>
            <p className="text-lg text-slate-300">
              End-to-end AI pipeline from pixels to actionable guidance.
            </p>
          </motion.div>

          <div className="space-y-4">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                className="flex items-center gap-6 p-6 bg-slate-900/50 rounded-2xl border border-slate-800"
              >
                <div className="w-16 h-16 rounded-xl bg-forest-900/50 border border-forest-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-100 mb-1">Step {step.step}: {step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-forest-900/50 border border-forest-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-forest-400">{step.step}</span>
                </div>
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
              Six pillars working in harmony — from perception to reasoning.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card variant="elevated" padding="lg" className="h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `var(--color-${pillar.color}-100)` }}>
                    <pillar.icon className="w-6 h-6" style={{ color: `var(--color-${pillar.color}-600)` }} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{pillar.title}</h3>
                  <p className="text-slate-600 mb-4">{pillar.description}</p>
                  <ul className="space-y-2">
                    {pillar.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4" style={{ color: `var(--color-${pillar.color}-500)` }} />
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

      <section className="page-section bg-slate-50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 mb-4">
              Key Achievements
            </h2>
            <p className="text-lg text-slate-600">
              Built for impact, designed for trust.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card padding="lg" className="text-center h-full">
                  <div className="w-14 h-14 rounded-xl bg-forest-100 flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="w-7 h-7 text-forest-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">{achievement.label}</h3>
                  <p className="text-forest-700 font-medium">{achievement.value}</p>
                </Card>
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
              Built by a Multidisciplinary Team
            </h2>
            <p className="text-lg text-slate-600">
              Diverse expertise united by a common mission.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card padding="lg" className="h-full">
                  <div className="w-12 h-12 rounded-xl bg-forest-100 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-forest-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-slate-600">{member.role}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-forest-700 text-white">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
              Join the Waste Intelligence Revolution
            </h2>
            <p className="text-lg text-forest-100 mb-10 max-w-2xl mx-auto">
              Transform how the world understands and manages waste. From households to municipalities, 
              WasteVision AI brings intelligent waste analysis to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-forest-100 hover:text-white transition-colors">
                <ExternalLink className="w-5 h-5" />
                Open Source
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-forest-100 hover:text-white transition-colors">
                <ExternalLink className="w-5 h-5" />
                Follow Us
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-forest-100 hover:text-white transition-colors">
                <ExternalLink className="w-5 h-5" />
                Connect
              </a>
              <a href="mailto:hello@wastevision.ai" className="flex items-center gap-2 text-forest-100 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                Contact
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="page-section bg-slate-950 text-white">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
              Responsible AI Commitment
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              We believe AI should be transparent, accountable, and safe — especially when it guides environmental and health decisions.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Shield, title: 'Uncertainty Acknowledged', desc: 'Low-confidence detections flagged for human verification' },
                { icon: Database, title: 'Grounded Responses', desc: 'All recommendations sourced from retrieved knowledge, not hallucinated' },
                { icon: CheckCircle, title: 'Human-in-the-Loop', desc: 'User feedback continuously improves model accuracy' },
                { icon: AlertCircle, title: 'Safety First', desc: 'Critical waste triggers immediate professional handling alerts' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800"
                >
                  <div className="w-12 h-12 rounded-xl bg-forest-900/50 border border-forest-800 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-forest-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
