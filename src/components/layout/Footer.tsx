import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Mail, Leaf } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'AI Scanner', href: '/scanner' },
    { label: 'Waste Intelligence', href: '/intelligence' },
    { label: 'Disposal Guide', href: '/disposal-guide' },
    { label: 'Impact Dashboard', href: '/impact' },
    { label: 'API Documentation', href: '/docs' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Responsible AI', href: '/responsible-ai' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Waste Categories', href: '/categories' },
    { label: 'Recycling Guidelines', href: '/recycling' },
    { label: 'Safety Protocols', href: '/safety' },
    { label: 'Help Center', href: '/help' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  community: [
    { label: 'Smart India Hackathon', href: 'https://sih.gov.in' },
    { label: 'AICTE', href: 'https://aicte-india.org' },
    { label: 'Open Source', href: 'https://github.com' },
    { label: 'Discord Community', href: 'https://discord.gg' },
    { label: 'Report Issue', href: '/report' },
  ],
};

const socialLinks = [
  { icon: ExternalLink, href: 'https://github.com', label: 'GitHub' },
  { icon: ExternalLink, href: 'https://twitter.com', label: 'Twitter' },
  { icon: ExternalLink, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@wastevision.ai', label: 'Email' },
];

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6" aria-label="WasteVision AI Home">
              <span className="text-3xl" aria-hidden="true">♻</span>
              <span className="font-display font-bold text-2xl text-forest-300">
                WasteVision AI
              </span>
            </Link>
            <p className="text-slate-400 text-base leading-relaxed mb-6 max-w-xs">
              AI-powered waste intelligence for cleaner communities. 
              Turn mixed waste into intelligent segregation plans with computer vision, RAG, and IBM Granite.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-forest-400 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Product links">
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className="text-slate-400 hover:text-forest-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company links">
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className="text-slate-400 hover:text-forest-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resource links">
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className="text-slate-400 hover:text-forest-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Community links">
            <h3 className="font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-3">
              {footerLinks.community.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-forest-300 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} WasteVision AI. All rights reserved.
            </p>
            <span className="flex items-center gap-1 text-sm text-slate-500">
              <Leaf className="w-4 h-4 text-forest-400" aria-hidden="true" />
              See Waste. Understand It. Segregate It.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
