import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ProcessAndEducation } from './components/ProcessAndEducation';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Standard Dark Mode presentation active by default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div id="portfolio-app-root" className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white flex flex-col antialiased">
      
      {/* Skip to main content for accessibility (WCAG AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-red-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Global Header & Navigation */}
      <Navbar
        onOpenResumeModal={() => setResumeModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        {/* Executive Crimson Hero with Background Typography & Portrait */}
        <Hero onOpenResumeModal={() => setResumeModalOpen(true)} />

        {/* Selected Engineering Projects Gallery */}
        <ProjectsSection />

        {/* Technical Arsenal with Verified Skill Logos & Categorized Filters */}
        <SkillsSection />

        {/* 3-Column Education, Work Process & Solid Crimson Quote Section */}
        <ProcessAndEducation />

        {/* Dedicated 1-Click ATS Resume Generator & Download Banner */}
        <ResumeSection onOpenResumeModal={() => setResumeModalOpen(true)} />

        {/* Let's Work Together & Fast-Loading Contact Hub */}
        <ContactSection />
      </main>

      {/* High-Contrast Editorial Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

    </div>
  );
}
