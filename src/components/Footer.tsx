import React from 'react';
import { 
  Github, 
  Linkedin, 
  ArrowUp, 
  Download, 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { generateResumePDF } from '../utils/pdfGenerator';
import { SkillLogo } from './SkillLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="main-footer"
      className="bg-zinc-900 dark:bg-black text-zinc-300 dark:text-zinc-400 py-14 border-t border-zinc-800 dark:border-zinc-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Summary (Span 5) */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-900 text-white flex items-center justify-center font-display text-xl tracking-wider shadow-md shadow-red-950/40">
                AP
              </div>
              <div>
                <span className="font-display text-2xl text-white uppercase tracking-wider block">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-[11px] text-red-500 font-bold uppercase tracking-widest">
                  {PERSONAL_INFO.targetRole}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Computer Science &amp; Engineering undergraduate at Lovely Professional University specialized in Data Analytics, Python, SQL, C/C++, Java, Power BI, and Gemini AI.
            </p>
          </div>

          {/* Quick Navigation Links (Span 3) */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'About Overview', href: '#hero' },
                { name: 'Selected Projects', href: '#projects' },
                { name: 'Skills Arsenal', href: '#skills-arsenal' },
                { name: 'Education & Process', href: '#education-skills' },
                { name: 'Official Resume', href: '#resume' },
                { name: 'Let\'s Work Together', href: '#contact' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-zinc-400 hover:text-red-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Resume Actions (Span 4) */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Connect &amp; Verify
            </h4>
            
            <div className="flex flex-col gap-2.5">
              <a
                id="footer-vercel-link"
                href={PERSONAL_INFO.vercel}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white border border-zinc-700 hover:border-red-900/60 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M12 1L24 22H0L12 1Z" />
                </svg>
                <span>Vercel / aditya-prakashs-projects</span>
              </a>

              <a
                id="footer-linkedin-link"
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white border border-zinc-700 hover:border-red-900/60 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-red-500" />
                <span>LinkedIn / {PERSONAL_INFO.linkedinDisplay}</span>
              </a>

              <a
                id="footer-leetcode-link"
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white border border-zinc-700 hover:border-amber-900/60 transition-colors"
              >
                <SkillLogo name="leetcode" className="w-4 h-4" />
                <span>LeetCode / x2gyI6JfIR (94 Solved)</span>
              </a>

              <a
                id="footer-github-link"
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white border border-zinc-700 hover:border-red-900/60 transition-colors"
              >
                <Github className="w-4 h-4 text-zinc-300" />
                <span>GitHub / ADITYA-dev-hue</span>
              </a>

              <button
                id="footer-download-resume-btn"
                onClick={() => generateResumePDF()}
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-red-950/50 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume (PDF)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © {new Date().getFullYear()} Aditya Prakash. All rights reserved. Lovely Professional University (2024–2028).
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
