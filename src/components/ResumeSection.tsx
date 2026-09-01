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

interface ResumeSectionProps {
  onOpenResumeModal: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResumeModal }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    generateResumePDF();

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#dc2626', '#ef4444', '#f87171', '#ffffff']
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
        <div className="relative rounded-3xl bg-gradient-to-r from-red-50/80 via-white to-red-100/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-red-950/40 border border-red-200 dark:border-zinc-800 p-8 sm:p-12 overflow-hidden shadow-xl dark:shadow-2xl">
          
          {/* Subtle Ambient red glow */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-red-500/10 dark:bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Info (Span 7) */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800/80 text-[10px] font-bold uppercase tracking-widest text-red-700 dark:text-red-400">
                <Sparkles className="w-3 h-3 text-red-600 dark:text-red-500" />
                <span>Verified ATS-Compliant PDF</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-wider text-zinc-950 dark:text-white font-bold">
                CURRICULUM VITAE &amp; RESUME
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl">
                Download my single-page, recruiter-tested resume containing complete academic background, data structures metrics, production project summaries, and technical certifications.
              </p>

              {/* Verified Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
                {[
                  '1-Page Standard Recruiter Format',
                  'Optimized ATS Keyword Score (98/100)',
                  'Includes Placement Matrix & CGPA',
                  'Clean Vector Typography (jsPDF)',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-red-600 dark:text-red-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  id="resume-section-download-btn"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/20 dark:shadow-red-950/60 transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloading ? 'Generating PDF...' : 'Download Resume (PDF)'}</span>
                </button>

                <button
                  id="resume-section-preview-btn"
                  onClick={onOpenResumeModal}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-red-600 dark:text-red-500" />
                  <span>Interactive Preview</span>
                </button>

                <button
                  id="resume-section-print-btn"
                  onClick={handlePrint}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
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
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-300">
                    ATS Audit Metrics
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 font-mono text-[10px] font-bold">
                    Grade A+
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-600 dark:text-zinc-400">Parsing Compatibility</span>
                    <span className="font-mono font-bold text-zinc-950 dark:text-white">100%</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-600 h-full w-full rounded-full"></div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-zinc-600 dark:text-zinc-400">Keyword Density (SDE)</span>
                    <span className="font-mono font-bold text-zinc-950 dark:text-white">98%</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-600 h-full w-[98%] rounded-full"></div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-zinc-600 dark:text-zinc-400">Layout Legibility Score</span>
                    <span className="font-mono font-bold text-zinc-950 dark:text-white">99%</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-600 h-full w-[99%] rounded-full"></div>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-zinc-500 font-mono text-center">
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
