import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { SkillsSection } from './components/SkillsSection';
import { ProcessAndEducation } from './components/ProcessAndEducation';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ScrollReveal } from './components/ScrollReveal';

function PortfolioContent() {
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);

  return (
    <div 
      id="portfolio-app-root" 
      className="min-h-screen bg-[#FAF7F0] text-[#2B211B] flex flex-col antialiased"
    >
      {/* Skip to main content for accessibility (WCAG AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
        style={{ backgroundColor: 'var(--theme-primary)' }}
      >
        Skip to main content
      </a>

      {/* Global Header & Navigation */}
      <Navbar
        onOpenResumeModal={() => setResumeModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        {/* Executive Hero with Background Typography & Portrait */}
        <Hero onOpenResumeModal={() => setResumeModalOpen(true)} />

        {/* Selected Engineering Projects Gallery */}
        <ScrollReveal viewportAmount={0.08} duration={0.7} distance={36}>
          <ProjectsSection />
        </ScrollReveal>

        {/* Technical Arsenal with Verified Skill Logos & Categorized Filters */}
        <ScrollReveal viewportAmount={0.08} duration={0.7} distance={36}>
          <SkillsSection />
        </ScrollReveal>

        {/* Verified Professional Accreditations & Credentials */}
        <ScrollReveal viewportAmount={0.08} duration={0.7} distance={36}>
          <CertificatesSection />
        </ScrollReveal>

        {/* 3-Column Education, Work Process & Theme Editorial Quote Section */}
        <ScrollReveal viewportAmount={0.08} duration={0.7} distance={36}>
          <ProcessAndEducation />
        </ScrollReveal>

        {/* Let's Work Together & Fast-Loading Contact Hub */}
        <ScrollReveal viewportAmount={0.08} duration={0.7} distance={36}>
          <ContactSection />
        </ScrollReveal>
      </main>

      {/* Simple Minimalist Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
