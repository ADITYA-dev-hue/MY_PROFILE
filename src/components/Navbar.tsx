import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Github, 
  Linkedin, 
  Menu, 
  X, 
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { generateResumePDF } from '../utils/pdfGenerator';
import { SkillLogo } from './SkillLogo';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResumeModal,
}) => {
  const { theme } = useTheme();
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
    { name: 'Certificates', href: '#certificates' },
    { name: 'Education', href: '#education-skills' },
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
      <div className="bg-[#F4EEE4] text-[10px] sm:text-[11px] font-medium tracking-wider uppercase border-b border-[#EADBCE] text-[#6B3F25] py-1.5 px-4 sm:px-8 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-2">
          <span 
            className="font-bold tracking-widest text-[11px]"
            style={{ color: '#E87524' }}
          >
            AI-ACCELERATED FULL-STACK DATA DEVELOPER
          </span>
          <span className="text-[#C4B7A6] hidden sm:inline">•</span>
          <span className="hidden sm:inline text-[#746A61] font-mono text-[10px]">CS UNDERGRAD &amp; FULL-STACK CREATOR</span>
        </div>
        
        <div 
          className="flex items-center gap-2 font-semibold text-xs transition-colors"
          style={{ color: '#E87524' }}
        >
          <span 
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: '#E87524' }}
          />
          <span className="font-mono text-[11px] tracking-wider">AVAILABLE FOR PLACEMENTS 2026 ✦</span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#EADBCE] py-2.5 sm:py-3 shadow-[0_2px_12px_rgba(43,33,27,0.04)]' 
          : 'bg-[#FAF7F0]/85 backdrop-blur-sm py-3 sm:py-3.5 border-b border-[#EADBCE]/60'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a 
              href="#hero" 
              id="brand-logo"
              className="flex items-center gap-3 group focus:outline-none rounded-lg"
            >
              <div 
                className="w-9 h-9 rounded-lg bg-[#E87524] text-white flex items-center justify-center font-serif text-lg font-bold shadow-sm group-hover:scale-105 transition-all"
              >
                AP
              </div>
              <div className="flex flex-col text-left">
                <span 
                  className="font-serif text-lg font-bold tracking-tight text-[#2B211B] transition-colors leading-tight"
                >
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#746A61] uppercase">
                  Data Science &amp; AI Developer
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
                  className="px-3.5 py-1.5 text-[14px] font-semibold text-[#2B211B] hover:text-[#E87524] hover:bg-[#F3EDE2] rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Action CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Vercel Projects Space */}
              <a
                id="nav-vercel-link"
                href={PERSONAL_INFO.vercel}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#6B3F25] hover:text-[#2B211B] hover:bg-[#F3EDE2] border border-[#EADBCE] rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
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
                className="p-2 text-[#6B3F25] hover:text-[#2B211B] hover:bg-[#F3EDE2] border border-[#EADBCE] rounded-lg transition-colors"
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
                className="p-2 text-[#6B3F25] hover:text-[#2B211B] hover:bg-[#F3EDE2] border border-[#EADBCE] rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
                aria-label="Aditya Prakash LeetCode Profile"
                title="View LeetCode Profile"
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
                className="p-2 text-[#6B3F25] hover:text-[#2B211B] hover:bg-[#F3EDE2] border border-[#EADBCE] rounded-lg transition-colors"
                aria-label="Aditya Prakash GitHub Profile"
                title="View GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              {/* Resume Button */}
              <button
                id="nav-resume-btn"
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider text-white rounded-lg shadow-sm transition-all cursor-pointer hover:bg-[#D06316] active:scale-95 bg-[#E87524]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume PDF</span>
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#2B211B] hover:bg-[#F3EDE2] rounded-lg border border-[#EADBCE]"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#FAF7F0] border-b border-[#EADBCE] px-4 pt-3 pb-6 space-y-3 shadow-lg"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-[15px] font-semibold text-[#2B211B] hover:bg-[#F3EDE2] rounded-lg transition-colors text-left"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EADBCE] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDownloadPDF();
              }}
              className="w-full py-2.5 px-4 flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-white rounded-lg shadow-sm cursor-pointer bg-[#E87524] hover:bg-[#D06316]"
            >
              <Download className="w-4 h-4" />
              Download Resume (PDF)
            </button>

            <div className="grid grid-cols-4 gap-1.5 pt-1">
              <a
                href={PERSONAL_INFO.vercel}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-1.5 flex items-center justify-center gap-1 text-[11px] font-semibold text-[#2B211B] bg-[#FFFCF7] border border-[#EADBCE] hover:bg-[#F3EDE2] rounded-lg"
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
                className="py-2 px-1.5 flex items-center justify-center gap-1 text-[11px] font-semibold text-[#2B211B] bg-[#FFFCF7] border border-[#EADBCE] hover:bg-[#F3EDE2] rounded-lg"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#E87524]" />
                LinkedIn
              </a>
              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-1.5 flex items-center justify-center gap-1 text-[11px] font-semibold text-[#2B211B] bg-[#FFFCF7] border border-[#EADBCE] hover:bg-[#F3EDE2] rounded-lg"
              >
                <SkillLogo name="leetcode" className="w-3.5 h-3.5" />
                LeetCode
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-1.5 flex items-center justify-center gap-1 text-[11px] font-semibold text-[#2B211B] bg-[#FFFCF7] border border-[#EADBCE] hover:bg-[#F3EDE2] rounded-lg"
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
