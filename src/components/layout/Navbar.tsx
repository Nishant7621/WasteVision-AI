import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, User, Scan, Settings, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/scanner', label: 'AI Scanner' },
  { path: '/intelligence', label: 'Waste Intelligence' },
  { path: '/disposal-guide', label: 'Disposal Guide' },
  { path: '/impact', label: 'Impact' },
  { path: '/about', label: 'About' },
];

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const [currentLang, setCurrentLang] = useState(languages[0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-transparent'}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            <Link to="/" className="flex items-center gap-2" aria-label="WasteVision AI Home">
              <span className="text-2xl sm:text-3xl" aria-hidden="true">♻</span>
              <span className="font-display font-bold text-xl sm:text-2xl text-forest-800">
                WasteVision AI
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive(item.path)
                      ? 'bg-forest-50 text-forest-700'
                      : 'text-slate-600 hover:text-forest-700 hover:bg-forest-50'
                    }
                  `}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-expanded={langOpen}
                  aria-haspopup="listbox"
                  aria-label="Select language"
                >
                  <Globe className="w-4 h-4" />
                  <span>{currentLang.native}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-200 py-1 overflow-hidden"
                      role="listbox"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => { setCurrentLang(lang); setLangOpen(false); }}
                          className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                            currentLang.code === lang.code
                              ? 'bg-forest-50 text-forest-700 font-medium'
                              : 'text-slate-600 hover:bg-forest-50 hover:text-forest-700'
                          }`}
                          role="option"
                          aria-selected={currentLang.code === lang.code}
                        >
                          {lang.native}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/scanner" className="relative">
                <Button variant="primary" size="sm" className="gap-2">
                  <Scan className="w-4 h-4" />
                  Scan Waste
                </Button>
              </Link>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-expanded={profileOpen}
                  aria-haspopup="listbox"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-forest-700" />
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 overflow-hidden"
                      role="menu"
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-forest-50 hover:text-forest-700"
                        role="menuitem"
                      >
                        <User className="w-4 h-4" />
                        My Dashboard
                      </Link>
                      <Link
                        to="/scanner"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-forest-50 hover:text-forest-700"
                        role="menuitem"
                      >
                        <Scan className="w-4 h-4" />
                        Scan History
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-forest-50 hover:text-forest-700"
                        role="menuitem"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-200 bg-white overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      block px-4 py-3 rounded-xl text-base font-medium transition-all
                      ${isActive(item.path)
                        ? 'bg-forest-50 text-forest-700'
                        : 'text-slate-600 hover:bg-forest-50 hover:text-forest-700'
                      }
                    `}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-slate-200">
                  <Link
                    to="/scanner"
                    className="w-full"
                  >
                    <Button variant="primary" fullWidth className="gap-2">
                      <Scan className="w-4 h-4" />
                      Scan Waste
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="h-16 lg:h-18" aria-hidden="true" />
    </>
  );
};