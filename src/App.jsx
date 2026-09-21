import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import Scanner from './pages/Scanner';
import { WasteIntelligence } from './pages/WasteIntelligence';
import { DisposalGuide } from './pages/DisposalGuide';
import { Impact } from './pages/Impact';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Assistant } from './pages/Assistant';
import { About } from './pages/About';

const PageTransition = ({ location, children }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="min-h-screen bg-white"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

function Layout({ children }) {
  const location = useLocation();
  
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-0">
        <PageTransition location={location}>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/intelligence" element={<WasteIntelligence />} />
            <Route path="/disposal-guide" element={<DisposalGuide />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/about" element={<About />} />
            <Route path="/responsible-ai" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}