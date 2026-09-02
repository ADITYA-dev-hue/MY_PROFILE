import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, PROJECTS, RESUME_CERTIFICATES, EDUCATION_LIST, TRAINING_EXPERIENCE } from '../data/portfolioData';
import { generateResumePDF } from '../utils/pdfGenerator';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copiedText, setCopiedText] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#dc2626', '#ef4444', '#f87171', '#ffffff']
      });
    } catch {}

    setTimeout(() => {
      generateResumePDF();
      setDownloading(false);
    }, 200);
  };

  const handlePrint = () => {
    window.print();
  };

  const copyPlainTextResume = () => {
    const text = `
Aditya Prakash
LinkedIn: ${PERSONAL_INFO.linkedin}  |  Email: ${PERSONAL_INFO.email}
Github: ${PERSONAL_INFO.github}  |  Mobile: ${PERSONAL_INFO.phone}

SKILLS:
- Languages: C++, Python, C, Java, SQL
- Tools/Platforms: Pandas, NumPy, Matplotlib, Scikit-learn, Tableau, Power BI, Excel
- Concepts: Machine Learning, Data Visualisation, Data Cleaning, Statistics
- Soft Skills: Adaptability, Time Management

PROJECTS:
1. IPL Player Analysis | React, TypeScript, TanStack, Vite, Tailwind CSS, Chart.js, Recharts, Three.js (Aug' 26)
- Analyzed IPL data covering 760+ players across 10 franchises to provide insights into batting, bowling, rankings, and overall player performance.
- Integrated CSV-based IPL data and created interactive KPIs, charts, player ratings, and performance comparisons for easier player evaluation.
- Built and deployed a responsive analytics application using React, TypeScript, TanStack, Vite, and Tailwind CSS, with Lovable-assisted development, GitHub, and Vercel.

2. Power Generation Dashboard (2011-2017) | Power BI, Excel, NDAP Dataset (May' 26)
- Analyzed India’s power generation data from 2011–2017, covering 624M total energy generated units and 62M total installed capacity, with year-wise and energy-source-wise analysis.
- Visualized power generation across multiple states, regions, sectors, and energy sources, including rankings of the Top 5 states and Top 5 power stations using interactive charts, maps, KPIs, and filters.
- Applied Power Query, DAX, Excel, data cleaning, and data analysis to transform the dataset into an interactive Power BI dashboard, including region-wise capacity analysis across five regions and sector-wise generation insights.

3. EduPrep AI Learning Platform | HTML, CSS, JavaScript, Gemini API (Jun' 26)
- Created an AI-powered learning platform using HTML, CSS, JavaScript, and Gemini API.
- Implemented user authentication with Local Storage, responsive learning modules, and AI-powered features.
- Integrated the Gemini API to gain practical experience in API integration, JavaScript, frontend development, and AI applications.

TRAINING:
Uplyx Solution | Full Stack Web Development Intern (Aug' 26 – Present)
Data Science using Python
- Worked on industry-oriented projects as part of a structured Full Stack Web Development internship, applying concepts through practical assignments and project-based tasks.
- Gained hands-on experience with frontend and web development workflows while working with professional tools, methodologies, and problem-solving approaches.
- Applied technical concepts to practical projects, strengthening skills in web development and gaining exposure to real-world industry practices.

CERTIFICATES:
- Introduction to Front-End Development — Meta & Coursera (Aug' 2026)
- Google AI Professional Certificate — Coursera & Google (Aug' 2026)
- Database Management System — Infosys (July' 2026)
- Programming in Java — NIIT × LPU (May' 2026)
- Professional Course in C/C++ — BG TechVista (July' 2025)

EDUCATION:
- Lovely Professional University (Phagwara, Punjab) — Bachelor of Technology, Computer Science and Engineering; CGPA: 8.53 (Aug' 24 – Present)
- Kendriya Vidyalaya Bathinda Cantt (Bathinda Cantt, Punjab) — Class XII – Science | Percentage: 71.5% (Mar' 23 – May' 24)
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div 
      id="ats-resume-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-600 dark:text-red-500" />
            <h2 id="modal-resume-title" className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
              Official Resume Preview
            </h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              ATS Score: 99%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyPlainTextResume}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              title="Copy plain text for placement portals"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedText ? 'Copied Text!' : 'Copy Plain Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              id="resume-modal-download-pdf-btn"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold shadow-sm cursor-pointer"
            >
              <Download className={`w-3.5 h-3.5 ${downloading ? 'animate-bounce' : ''}`} />
              <span>{downloading ? 'Exporting...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ml-1"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Resume View matching exact new template */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white text-black font-sans space-y-4 text-left">
          
          {/* Header */}
          <div className="text-center space-y-1 pb-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black">
              {PERSONAL_INFO.name}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-1 text-xs text-zinc-800 pt-0.5">
              <span>
                <strong>LinkedIn:</strong>{' '}
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                  {PERSONAL_INFO.linkedin}
                </a>
              </span>
              <span>
                <strong>Email:</strong> {PERSONAL_INFO.email}
              </span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-1 text-xs text-zinc-800">
              <span>
                <strong>Github:</strong>{' '}
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                  {PERSONAL_INFO.github}
                </a>
              </span>
              <span>
                <strong>Mobile:</strong> {PERSONAL_INFO.phone}
              </span>
            </div>
          </div>

          {/* Section: SKILLS */}
          <div className="space-y-1.5 pt-1">
            <h3 className="text-xs font-bold text-black border-b border-black pb-0.5 tracking-wider uppercase">
              Skills
            </h3>
            <div className="space-y-0.5 text-xs text-zinc-800">
              <div><strong>Languages:</strong> C++, Python, C, Java, SQL</div>
              <div><strong>Tools/Platforms:</strong> Pandas, NumPy, Matplotlib, Scikit-learn, Tableau, Power BI, Excel</div>
              <div><strong>Concepts:</strong> Machine Learning, Data Visualisation, Data Cleaning, Statistics</div>
              <div><strong>Soft Skills:</strong> Adaptability, Time Management</div>
            </div>
          </div>

          {/* Section: PROJECTS */}
          <div className="space-y-2.5 pt-1">
            <h3 className="text-xs font-bold text-black border-b border-black pb-0.5 tracking-wider uppercase">
              Projects
            </h3>
            
            {PROJECTS.map((proj) => (
              <div key={proj.id} className="space-y-0.5 text-xs">
                <div className="flex justify-between items-baseline font-bold text-black">
                  <span>
                    {proj.title} <span className="font-normal text-zinc-700">| {proj.technologies.join(', ')}</span>
                  </span>
                  <span className="font-normal text-zinc-600 shrink-0 ml-2">
                    {proj.id === 'ipl-player-analysis' ? "Aug' 26" : proj.id === 'power-generation-dashboard' ? "May' 26" : "Jun' 26"}
                  </span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-[11px] text-zinc-800">
                  {proj.keyFeatures.map((feat, fIdx) => (
                    <li key={fIdx}>{feat}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section: TRAINING */}
          <div className="space-y-1.5 pt-1">
            <h3 className="text-xs font-bold text-black border-b border-black pb-0.5 tracking-wider uppercase">
              Training
            </h3>
            {TRAINING_EXPERIENCE.map((train, idx) => (
              <div key={idx} className="space-y-0.5 text-xs">
                <div className="flex justify-between items-baseline font-bold text-black">
                  <span>{train.company} | {train.role}</span>
                  <span className="font-normal text-zinc-600">{train.period}</span>
                </div>
                <div className="text-[11px] italic text-zinc-700">
                  {train.domain}
                </div>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-[11px] text-zinc-800">
                  {train.highlights.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section: CERTIFICATES */}
          <div className="space-y-1 pt-1">
            <h3 className="text-xs font-bold text-black border-b border-black pb-0.5 tracking-wider uppercase">
              Certificates
            </h3>
            <div className="space-y-0.5 text-xs text-zinc-800">
              {RESUME_CERTIFICATES.map((cert, idx) => (
                <div key={idx} className="flex justify-between items-baseline">
                  <span>•  {cert.title} — {cert.issuer}</span>
                  <span className="text-[11px] text-zinc-600">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: EDUCATION */}
          <div className="space-y-1.5 pt-1">
            <h3 className="text-xs font-bold text-black border-b border-black pb-0.5 tracking-wider uppercase">
              Education
            </h3>
            
            <div className="space-y-1.5 text-xs text-zinc-800">
              {EDUCATION_LIST.map((edu, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline font-bold text-black">
                    <span>{edu.institution}</span>
                    <span className="font-normal text-zinc-600">{edu.location}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-[11px] text-zinc-700">
                    <span>
                      {edu.degree} {edu.major ? `— ${edu.major}` : ''} {edu.grade ? `— ${edu.grade}` : ''}
                    </span>
                    <span className="text-zinc-600">{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Exported as standard 1-Page ATS-compliant vector PDF (Aditya_Prakash_Resume.pdf)
          </span>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};
