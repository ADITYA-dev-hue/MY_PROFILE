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
import { useTheme } from '../context/ThemeContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
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
        colors: [theme.primary, theme.secondary, '#ffffff']
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
LinkedIn: ${PERSONAL_INFO.linkedin}    Email: ${PERSONAL_INFO.email}
Github: ${PERSONAL_INFO.github}        Mobile: ${PERSONAL_INFO.phone}

SKILLS
Programming: Python, SQL, C++, C, Java
Data Analysis: Pandas, NumPy, Data Cleaning, Statistics
Data Visualisation: Power BI, Tableau, Matplotlib, Excel
BI & Analytics: Power Query, DAX, Dashboard Development, KPI Analysis
Machine Learning: Scikit-learn, Machine Learning
Web Development: HTML, CSS, JavaScript, React, TypeScript
Soft Skills: Adaptability, Time Management, Quick Learner

PROJECTS
IPL Player Analysis | GitHub | Live                                       Aug’ 26
• Examined IPL player performance data covering 760+ players across 10 franchises to identify trends in batting, bowling, rankings, and overall performance.
• Developed interactive KPIs, charts, player ratings, and performance comparisons from CSV-based IPL data to support player evaluation.
• Built and deployed a responsive analytics application using React, TypeScript, TanStack, Vite, and Tailwind CSS, with Lovable-assisted development, GitHub, and Vercel.
Tech Stack: React, TypeScript, TanStack, Vite, Tailwind CSS, Chart.js, Recharts, Three.js

Power Generation Dashboard (2011-2017) | GitHub                           May’ 26
• Analysed India’s power generation data from 2011–2017, covering 624M total energy generated units and 62M total installed capacity, with year-wise and energy-source-wise analysis.
• Visualised power generation across multiple states, regions, sectors, and energy sources, including rankings of the Top 5 states and Top 5 power stations using interactive charts, maps, KPIs, and filters.
• Applied Power Query, DAX, Excel, data cleaning, and data analysis to transform the dataset into an interactive Power BI dashboard, including region-wise capacity analysis across five regions and sector-wise generation insights.
Tech Stack: Power BI, Excel, NDAP Dataset

EduPrep AI Learning Platform | GitHub                                     Jun’ 26
• Designed and launched an AIpowered educational portal with Gemini API, achieving a 95% user satisfaction rate through tailored learning modules and interactive feedback.
• Implemented user authentication with Local Storage, responsive learning modules, and AI-powered features.
• Integrated the Gemini API to gain practical experience in API integration, JavaScript, frontend development, and AI applications.
Tech Stack: HTML, CSS, JavaScript, Gemini API

INTERNSHIP
Uplyx Solution | Full Stack Web Developer Intern                          Aug’ 26 – Present
• Working on full-stack web development projects through practical assignments and industry-oriented project tasks.
• Developing responsive web applications while applying frontend, backend, debugging, and problem-solving concepts.
• Applying technical concepts to practical projects, strengthening web development skills and gaining exposure to real-world industry practices.

CERTIFICATES
Introduction to Front-End Development || Meta & Coursera || Certificate   Aug’ 26
Google AI Professional Certificate || Coursera & Google || Certificate    Aug’ 26
Database Management System || Infosys || Certificate                      July’ 26
Programming in Java || NIIT & LPU || Certificate                          May’ 26
Professional Course in C/C++ || BG TechVista || Certificate               July’ 25

EDUCATION
Lovely Professional University                                            Phagwara, Punjab
Bachelor of Technology                                                    Aug’ 24 – Present
Computer Science and Engineering; CGPA: 8.53

Kendriya Vidyalaya Bathinda Cantt                                         Bathinda Cantt, Punjab
Intermediate                                                              Mar’ 23 – May’ 24
PCM; Percentage:71.5%

Kendriya Vidyalaya Bathinda Cantt                                         Bathinda Cantt, Punjab
Matriculate                                                               Mar’ 21 – May’ 22
Percentage:76.7%
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2B211B]/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-4xl bg-[#FAF7F0] rounded-xl border border-[#EADBCE] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-[#EADBCE] bg-[#FFFCF7] shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#E87524]" />
            <h2 id="modal-resume-title" className="font-serif text-sm sm:text-base font-bold text-[#2B211B]">
              Official Resume Preview
            </h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF7F0] text-emerald-800 border border-[#EADBCE]">
              ATS Score: 99%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyPlainTextResume}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F0] border border-[#EADBCE] text-xs font-semibold text-[#6B3F25] hover:bg-[#F3EDE2] cursor-pointer transition-colors"
              title="Copy plain text for placement portals"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedText ? 'Copied Text!' : 'Copy Plain Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F0] border border-[#EADBCE] text-xs font-semibold text-[#6B3F25] hover:bg-[#F3EDE2] cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              id="resume-modal-download-pdf-btn"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-white text-xs font-semibold shadow-xs cursor-pointer transition-all bg-[#E87524] hover:bg-[#D06316]"
            >
              <Download className={`w-3.5 h-3.5 ${downloading ? 'animate-bounce' : ''}`} />
              <span>{downloading ? 'Exporting...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#746A61] hover:text-[#2B211B] rounded-lg hover:bg-[#FAF7F0] transition-colors ml-1 cursor-pointer"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Resume View matching exact new template */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white text-zinc-900 font-sans space-y-5 text-left border-y border-[#EADBCE]">
          
          {/* Header */}
          <div className="border-b-2 border-zinc-900 pb-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#003366]">
              {PERSONAL_INFO.name}
            </h1>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm pt-2 gap-y-1.5">
              <div className="space-y-1">
                <div>
                  <span className="font-bold text-zinc-900">LinkedIn:</span>{' '}
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 underline hover:text-blue-900 font-medium">
                    {PERSONAL_INFO.linkedin}
                  </a>
                </div>
                <div>
                  <span className="font-bold text-zinc-900">Github:</span>{' '}
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-blue-700 underline hover:text-blue-900 font-medium">
                    {PERSONAL_INFO.github}
                  </a>
                </div>
              </div>
              <div className="space-y-1 sm:text-right">
                <div>
                  <span className="font-bold text-zinc-900">Email:</span>{' '}
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-blue-700 underline hover:text-blue-900 font-medium">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <div>
                  <span className="font-bold text-zinc-900">Mobile:</span> {PERSONAL_INFO.phone}
                </div>
              </div>
            </div>
          </div>

          {/* Section: SKILLS */}
          <div className="space-y-2 pt-0.5">
            <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-900 pb-1 tracking-wider uppercase font-serif">
              Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] text-xs sm:text-sm gap-y-1.5 text-zinc-900">
              <div className="font-bold text-[#1E3A8A]">Programming:</div>
              <div>Python, SQL, C++, C, Java</div>
              <div className="font-bold text-[#1E3A8A]">Data Analysis:</div>
              <div>Pandas, NumPy, Data Cleaning, Statistics</div>
              <div className="font-bold text-[#1E3A8A]">Data Visualisation:</div>
              <div>Power BI, Tableau, Matplotlib, Excel</div>
              <div className="font-bold text-[#1E3A8A]">BI &amp; Analytics:</div>
              <div>Power Query, DAX, Dashboard Development, KPI Analysis</div>
              <div className="font-bold text-[#1E3A8A]">Machine Learning:</div>
              <div>Scikit-learn, Machine Learning</div>
              <div className="font-bold text-[#1E3A8A]">Web Development:</div>
              <div>HTML, CSS, JavaScript, React, TypeScript</div>
              <div className="font-bold text-[#1E3A8A]">Soft Skills:</div>
              <div>Adaptability, Time Management, Quick Learner</div>
            </div>
          </div>

          {/* Section: PROJECTS */}
          <div className="space-y-3.5 pt-1">
            <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-900 pb-1 tracking-wider uppercase font-serif">
              Projects
            </h3>
            
            {/* Project 1: IPL Player Analysis */}
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="flex justify-between items-baseline font-bold text-zinc-900">
                <span className="text-sm sm:text-base font-bold">
                  IPL Player Analysis |{' '}
                  <a href="https://github.com/ADITYA-prakash/Player-Analysis" target="_blank" rel="noreferrer" className="text-blue-700 underline font-normal">
                    GitHub
                  </a>
                  {' '}|{' '}
                  <a href="https://player-analysis.vercel.app" target="_blank" rel="noreferrer" className="text-blue-700 underline font-normal">
                    Live
                  </a>
                </span>
                <span className="font-normal text-zinc-700 shrink-0 ml-2 font-mono text-xs sm:text-sm">
                  Aug’ 26
                </span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs sm:text-sm text-zinc-900 leading-relaxed">
                <li>Examined IPL player performance data covering 760+ players across 10 franchises to identify trends in batting, bowling, rankings, and overall performance.</li>
                <li>Developed interactive KPIs, charts, player ratings, and performance comparisons from CSV-based IPL data to support player evaluation.</li>
                <li>Built and deployed a responsive analytics application using React, TypeScript, TanStack, Vite, and Tailwind CSS, with Lovable-assisted development, GitHub, and Vercel.</li>
              </ul>
              <div className="text-xs sm:text-sm text-zinc-900 pt-0.5">
                <span className="font-bold">Tech Stack:</span> React, TypeScript, TanStack, Vite, Tailwind CSS, Chart.js, Recharts, Three.js
              </div>
            </div>

            {/* Project 2: Power Generation Dashboard */}
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="flex justify-between items-baseline font-bold text-zinc-900">
                <span className="text-sm sm:text-base font-bold">
                  Power Generation Dashboard (2011-2017) |{' '}
                  <a href="https://github.com/ADITYA-prakash/POWER-BI-DASHBOARD" target="_blank" rel="noreferrer" className="text-blue-700 underline font-normal">
                    GitHub
                  </a>
                </span>
                <span className="font-normal text-zinc-700 shrink-0 ml-2 font-mono text-xs sm:text-sm">
                  May’ 26
                </span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs sm:text-sm text-zinc-900 leading-relaxed">
                <li>Analysed India’s power generation data from 2011–2017, covering 624M total energy generated units and 62M total installed capacity, with year-wise and energy-source-wise analysis.</li>
                <li>Visualised power generation across multiple states, regions, sectors, and energy sources, including rankings of the Top 5 states and Top 5 power stations using interactive charts, maps, KPIs, and filters.</li>
                <li>Applied Power Query, DAX, Excel, data cleaning, and data analysis to transform the dataset into an interactive Power BI dashboard, including region-wise capacity analysis across five regions and sector-wise generation insights.</li>
              </ul>
              <div className="text-xs sm:text-sm text-zinc-900 pt-0.5">
                <span className="font-bold">Tech Stack:</span> Power BI, Excel, NDAP Dataset
              </div>
            </div>

            {/* Project 3: EduPrep AI Learning Platform */}
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="flex justify-between items-baseline font-bold text-zinc-900">
                <span className="text-sm sm:text-base font-bold">
                  EduPrep AI Learning Platform |{' '}
                  <a href="https://github.com/ADITYA-prakash/AI-Edu-Prep-NEW-" target="_blank" rel="noreferrer" className="text-blue-700 underline font-normal">
                    GitHub
                  </a>
                </span>
                <span className="font-normal text-zinc-700 shrink-0 ml-2 font-mono text-xs sm:text-sm">
                  Jun’ 26
                </span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs sm:text-sm text-zinc-900 leading-relaxed">
                <li>Designed and launched an AIpowered educational portal with Gemini API, achieving a 95% user satisfaction rate through tailored learning modules and interactive feedback.</li>
                <li>Implemented user authentication with Local Storage, responsive learning modules, and AI-powered features.</li>
                <li>Integrated the Gemini API to gain practical experience in API integration, JavaScript, frontend development, and AI applications.</li>
              </ul>
              <div className="text-xs sm:text-sm text-zinc-900 pt-0.5">
                <span className="font-bold">Tech Stack:</span> HTML, CSS, JavaScript, Gemini API
              </div>
            </div>
          </div>

          {/* Section: INTERNSHIP */}
          <div className="space-y-2 pt-1">
            <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-900 pb-1 tracking-wider uppercase font-serif">
              Internship
            </h3>
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="flex justify-between items-baseline font-bold text-zinc-900">
                <span className="text-sm sm:text-base font-bold">Uplyx Solution | Full Stack Web Developer Intern</span>
                <span className="font-normal text-zinc-700 font-mono text-xs sm:text-sm">Aug’ 26 – Present</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs sm:text-sm text-zinc-900 leading-relaxed">
                <li>Working on full-stack web development projects through practical assignments and industry-oriented project tasks.</li>
                <li>Developing responsive web applications while applying frontend, backend, debugging, and problem-solving concepts.</li>
                <li>Applying technical concepts to practical projects, strengthening web development skills and gaining exposure to real-world industry practices.</li>
              </ul>
            </div>
          </div>

          {/* Section: CERTIFICATES */}
          <div className="space-y-1.5 pt-1">
            <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-900 pb-1 tracking-wider uppercase font-serif">
              Certificates
            </h3>
            <div className="space-y-1.5 text-xs sm:text-sm text-zinc-900">
              <div className="flex justify-between items-baseline">
                <span>
                  AI for Data Analysis || Google &amp; Coursera ||{' '}
                  <a href="/certificates/cert_google_ai_data_analysis.svg" target="_blank" rel="noreferrer" className="text-blue-700 underline font-medium">
                    Certificate
                  </a>
                </span>
                <span className="text-xs sm:text-sm text-zinc-700 font-mono">Jul’ 26</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span>
                  Introduction to Front-End Development || Meta &amp; Coursera ||{' '}
                  <a href="/certificates/cert_meta_frontend.svg" target="_blank" rel="noreferrer" className="text-blue-700 underline font-medium">
                    Certificate
                  </a>
                </span>
                <span className="text-xs sm:text-sm text-zinc-700 font-mono">Aug’ 26</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span>
                  Google AI Professional Certificate || Coursera &amp; Google ||{' '}
                  <a href="/certificates/cert_google_ai.svg" target="_blank" rel="noreferrer" className="text-blue-700 underline font-medium">
                    Certificate
                  </a>
                </span>
                <span className="text-xs sm:text-sm text-zinc-700 font-mono">Aug’ 26</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span>
                  Database Management System || Infosys ||{' '}
                  <a href="/certificates/cert_infosys_dbms.svg" target="_blank" rel="noreferrer" className="text-blue-700 underline font-medium">
                    Certificate
                  </a>
                </span>
                <span className="text-xs sm:text-sm text-zinc-700 font-mono">July’ 26</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span>
                  Programming in Java || NIIT &amp; LPU ||{' '}
                  <a href="/certificates/cert_java_niit.svg" target="_blank" rel="noreferrer" className="text-blue-700 underline font-medium">
                    Certificate
                  </a>
                </span>
                <span className="text-xs sm:text-sm text-zinc-700 font-mono">May’ 26</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span>
                  Professional Course in C/C++ || BG TechVista ||{' '}
                  <a href="/certificates/cert_cpp_bgtechvista.svg" target="_blank" rel="noreferrer" className="text-blue-700 underline font-medium">
                    Certificate
                  </a>
                </span>
                <span className="text-xs sm:text-sm text-zinc-700 font-mono">July’ 25</span>
              </div>
            </div>
          </div>

          {/* Section: EDUCATION */}
          <div className="space-y-2 pt-1">
            <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-900 pb-1 tracking-wider uppercase font-serif">
              Education
            </h3>
            
            <div className="space-y-3 text-xs sm:text-sm text-zinc-900">
              {EDUCATION_LIST.map((edu, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-baseline font-bold text-zinc-900">
                    <span className="text-sm sm:text-base font-bold">{edu.institution}</span>
                    <span className="font-normal text-zinc-700 text-xs sm:text-sm">{edu.location}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs sm:text-sm text-zinc-800 font-medium">
                    <span>{edu.degree}</span>
                    <span className="text-zinc-700 font-mono">{edu.period}</span>
                  </div>
                  {edu.major && (
                    <div className="text-xs sm:text-sm text-zinc-800">
                      {edu.major}
                    </div>
                  )}
                  {edu.grade && (
                    <div className="text-xs sm:text-sm text-zinc-800 font-medium">
                      {edu.grade}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FFFCF7] border-t border-[#EADBCE] flex items-center justify-between shrink-0">
          <span className="text-xs text-[#746A61]">
            Exported as standard 1-Page ATS-compliant vector PDF (Aditya_Prakash_Resume.pdf)
          </span>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-xs font-semibold shadow-xs cursor-pointer transition-all bg-[#E87524] hover:bg-[#D06316]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};
