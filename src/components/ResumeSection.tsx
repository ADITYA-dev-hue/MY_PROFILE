import React, { useState } from 'react';
import { 
  Download, 
  Printer, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateResumePDF } from '../utils/pdfGenerator';
import { useTheme } from '../context/ThemeContext';

interface ResumeSectionProps {
  onOpenResumeModal: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResumeModal }) => {
  const { theme } = useTheme();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    generateResumePDF();

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: [theme.primary, theme.secondary, '#ffffff']
      });
    } catch (e) {
      // Safe fallback
    }

    setTimeout(() => setDownloading(false), 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section 
      id="resume"
      className="py-16 sm:py-20 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-900 relative transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Container */}
        <div 
          className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 overflow-hidden shadow-xl dark:shadow-2xl"
          style={{
            background: `linear-gradient(120deg, rgba(var(--theme-primary-rgb), 0.05) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(var(--theme-primary-rgb), 0.08) 100%)`,
          }}
        >
          
          {/* Subtle Ambient theme glow */}
          <div 
            className="absolute right-0 top-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ backgroundColor: 'var(--theme-primary)' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Info (Span 7) */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div 
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-colors"
                style={{
                  backgroundColor: 'var(--theme-subtle-bg)',
                  borderColor: 'var(--theme-subtle-border)',
                  color: 'var(--theme-primary)',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--theme-primary)' }} />
                <span>Verified ATS-Compliant PDF</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-wider text-zinc-950 dark:text-white font-bold">
                CURRICULUM VITAE &amp; RESUME
              </h2>

              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-xl">
                Download my single-page, recruiter-tested resume containing complete academic background, data structures metrics, production project summaries, and technical certifications.
              </p>

              {/* Verified Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                {[
                  '1-Page Standard Recruiter Format',
                  'Optimized ATS Keyword Score (98/100)',
                  'Includes Placement Matrix & CGPA',
                  'Clean Vector Typography (jsPDF)',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--theme-primary)' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-4">
                <button
                  id="resume-section-download-btn"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white text-sm font-bold uppercase tracking-wider transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                  style={{
                    backgroundColor: 'var(--theme-primary)',
                    boxShadow: '0 10px 25px -5px rgba(var(--theme-primary-rgb), 0.35)',
                  }}
                >
                  <Download className="w-4 h-4" />
                  <span>{downloading ? 'Generating PDF...' : 'Download Resume (PDF)'}</span>
                </button>

                <button
                  id="resume-section-preview-btn"
                  onClick={onOpenResumeModal}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  <Eye className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
                  <span>Interactive Preview</span>
                </button>

                <button
                  id="resume-section-print-btn"
                  onClick={handlePrint}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white text-sm font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  title="Print Resume"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Right Card / ATS Score Visual (Span 5) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm p-6 rounded-2xl bg-white/90 dark:bg-black/80 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md space-y-4 text-left shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="text-sm font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-300">
                    ATS Audit Metrics
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 font-mono text-xs font-bold">
                    Grade A+
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">Parsing Compatibility</span>
                    <span className="font-mono font-bold text-zinc-950 dark:text-white">100%</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-2 rounded-full overflow-hidden">
                    <div className="h-full w-full rounded-full" style={{ backgroundColor: 'var(--theme-primary)' }}></div>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">Keyword Density (AI &amp; Full-Stack Data)</span>
                    <span className="font-mono font-bold text-zinc-950 dark:text-white">98%</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-2 rounded-full overflow-hidden">
                    <div className="h-full w-[98%] rounded-full" style={{ backgroundColor: 'var(--theme-primary)' }}></div>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">Layout Legibility Score</span>
                    <span className="font-mono font-bold text-zinc-950 dark:text-white">99%</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-2 rounded-full overflow-hidden">
                    <div className="h-full w-[99%] rounded-full" style={{ backgroundColor: 'var(--theme-primary)' }}></div>
                  </div>
                </div>

                <div className="pt-2 text-xs text-zinc-600 dark:text-zinc-400 font-mono text-center">
                  Engineered for Workday, Greenhouse &amp; Lever parsers
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
