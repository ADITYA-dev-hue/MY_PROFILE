import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Github, 
  Linkedin, 
  Menu, 
  X, 
  Globe,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { generateResumePDF } from '../utils/pdfGenerator';
import { SkillLogo } from './SkillLogo';

interface NavbarProps {
  onOpenResumeModal: () => void;
  onOpenDeployGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResumeModal,
  onOpenDeployGuide,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills-arsenal' },
    { name: 'Education', href: '#education-skills' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleDownloadPDF = () => {
    generateResumePDF();
  };

  return (
    <header 
      id="main-header"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      {/* Top Banner Ribbon */}
      <div className="bg-zinc-100 dark:bg-black/90 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase border-b border-red-200 dark:border-red-900/30 text-zinc-700 dark:text-zinc-400 py-1.5 px-4 sm:px-8 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-2">
          <span className="text-red-600 dark:text-red-500 font-bold">SOFTWARE DEVELOPMENT ENGINEER</span>
          <span className="text-zinc-400 dark:text-zinc-600 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-zinc-600 dark:text-zinc-400">CS UNDERGRAD &amp; FULL-STACK CREATOR</span>
        </div>
        
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 animate-pulse"></span>
          <span>AVAILABLE FOR PLACEMENTS 2026 ✦</span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80 py-3 shadow-md dark:shadow-lg dark:shadow-black/50' 
          : 'bg-white/80 dark:bg-transparent backdrop-blur-sm dark:backdrop-blur-none py-3.5 sm:py-4 border-b border-zinc-200/60 dark:border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a 
              href="#hero" 
              id="brand-logo"
              className="flex items-center gap-3 group focus:outline-none rounded-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-900 text-white flex items-center justify-center font-display text-xl tracking-wider shadow-md shadow-red-600/30 dark:shadow-red-950/40 group-hover:scale-105 transition-transform">
                AP
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display text-xl tracking-wider text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors uppercase">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                  SDE PORTFOLIO
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  id={`nav-link-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  href={link.href}
                  className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/80 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Action CTAs */}
            <div className="hidden lg:flex items-center gap-2.5">
              {/* Custom Domain Badge */}
              <button
                id="vercel-status-btn"
                onClick={onOpenDeployGuide}
                title="Vercel & Custom Domain Setup"
                className="px-2.5 py-1.5 text-[11px] font-mono font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center gap-1.5 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-red-600 dark:text-red-500" />
                <span>{PERSONAL_INFO.customDomain}</span>
              </button>

              {/* Vercel Projects Space */}
              <a
                id="nav-vercel-link"
                href={PERSONAL_INFO.vercel}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
                aria-label="Aditya Prakash Vercel Projects"
                title="View Vercel Deployments"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 1L24 22H0L12 1Z" />
                </svg>
                <span className="hidden xl:inline text-[11px]">Vercel</span>
              </a>

              {/* LinkedIn */}
              <a
                id="nav-linkedin-link"
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
                aria-label="Aditya Prakash LinkedIn Profile"
                title="View LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {/* LeetCode */}
              <a
                id="nav-leetcode-link"
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
                aria-label="Aditya Prakash LeetCode Profile"
                title="View LeetCode Profile (94 Solved)"
              >
                <SkillLogo name="leetcode" className="w-4 h-4" />
                <span className="hidden xl:inline text-[11px]">LeetCode</span>
              </a>

              {/* GitHub */}
              <a
                id="nav-github-link"
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
                aria-label="Aditya Prakash GitHub Profile"
                title="View GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              {/* Resume Button */}
              <button
                id="nav-resume-btn"
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-md shadow-red-600/20 dark:shadow-red-950/40 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume PDF</span>
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="lg:hidden bg-white/98 dark:bg-zinc-950/98 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors text-left"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDownloadPDF();
              }}
              className="w-full py-2.5 px-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download Resume (PDF)
            </button>

            <div className="grid grid-cols-4 gap-1.5 pt-1">
              <a
                href={PERSONAL_INFO.vercel}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-1.5 flex items-center justify-center gap-1 text-[11px] font-bold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 1L24 22H0L12 1Z" />
                </svg>
                Vercel
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-1.5 flex items-center justify-center gap-1 text-[11px] font-bold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg"
              >
                <Linkedin className="w-3.5 h-3.5 text-red-600 dark:text-red-500" />
                LinkedIn
              </a>
              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-1.5 flex items-center justify-center gap-1 text-[11px] font-bold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg"
              >
                <SkillLogo name="leetcode" className="w-3.5 h-3.5" />
                LeetCode
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-1.5 flex items-center justify-center gap-1 text-[11px] font-bold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
