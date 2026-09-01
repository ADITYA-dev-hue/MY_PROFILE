import React, { useState, useRef } from 'react';
import { 
  Download, 
  Linkedin, 
  Github, 
  Globe, 
  FileText, 
  Sparkles,
  Camera,
  Upload,
  User
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { generateResumePDF } from '../utils/pdfGenerator';
import { SkillLogo } from './SkillLogo';
import defaultPortrait from '../assets/images/aditya_sunglasses_portrait_1787200831564.jpg';
import secondaryPortrait from '../assets/images/aditya_profile_bg_1787578881519.jpg';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const fallbackList = [
    '/profile.jpg',
    defaultPortrait,
    secondaryPortrait,
    '/profile.png',
    '/aditya.jpg'
  ];

  const [avatarIndex, setAvatarIndex] = useState(0);
  const [avatarSrc, setAvatarSrc] = useState<string>(() => {
    const saved = localStorage.getItem('aditya_custom_avatar');
    if (saved) return saved;
    return '/profile.jpg';
  });
  const [hasImageFailedCompletely, setHasImageFailedCompletely] = useState(false);

  const handleImageError = () => {
    const nextIdx = avatarIndex + 1;
    if (nextIdx < fallbackList.length) {
      setAvatarIndex(nextIdx);
      setAvatarSrc(fallbackList[nextIdx]);
    } else {
      setHasImageFailedCompletely(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setAvatarSrc(result);
        setHasImageFailedCompletely(false);
        localStorage.setItem('aditya_custom_avatar', result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <section 
      id="hero"
      className="relative min-h-[92vh] bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pt-24 sm:pt-28 pb-12 overflow-hidden flex flex-col justify-between border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300"
    >
      {/* 
        MASSIVE VIBRANT CRIMSON "PORTFOLIO" TYPOGRAPHY 
      */}
      <div 
        aria-hidden="true" 
        className="absolute top-16 sm:top-12 left-0 right-0 select-none pointer-events-none w-full text-center z-0 overflow-hidden flex justify-center"
      >
        <span 
          className="font-display text-[22vw] sm:text-[20vw] leading-none uppercase font-black tracking-tight text-red-600/15 dark:text-[#b91c1c] dark:opacity-90 whitespace-nowrap block drop-shadow-sm dark:drop-shadow-[0_10px_30px_rgba(185,28,28,0.25)] transition-colors"
          style={{ letterSpacing: '0.04em' }}
        >
          PORTFOLIO
        </span>
      </div>

      {/* Ambient Red Glows */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-red-500/10 dark:bg-red-600/15 rounded-full blur-[120px] pointer-events-none -z-0"></div>
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-rose-500/10 dark:bg-red-700/10 rounded-full blur-[100px] pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">
        
        {/* Main 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center pt-4 sm:pt-8">
          
          {/* LEFT COLUMN: Name, Subtitle & Bio (Span 4) */}
          <div className="lg:col-span-4 space-y-5 text-left z-20">
            
            {/* Script Greeting */}
            <div>
              <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-red-600 dark:text-[#f87171] font-normal block leading-tight">
                Hello, I'm
              </span>
              
              {/* Giant Stacked Display Name */}
              <h1 className="font-display text-6xl sm:text-7xl xl:text-8xl tracking-tight leading-[0.88] text-zinc-950 dark:text-white uppercase font-black mt-1">
                ADITYA<br />
                PRAKASH
              </h1>
            </div>

            {/* Subtitle in Vibrant Crimson Red */}
            <div className="space-y-2">
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-red-600 dark:text-[#ef4444]">
                DATA SCIENCE, AI &amp; SOFTWARE DEVELOPMENT
              </h2>
              
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-sm">
                Computer Science undergraduate at Lovely Professional University (2024–2028). Specialized in Python, SQL, C/C++, Java, Power BI analytics, and Gemini AI platform engineering.
              </p>
            </div>

            {/* University Location Tag */}
            <div className="flex items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 text-[11px] font-semibold text-zinc-800 dark:text-zinc-300 shadow-sm">
                <Globe className="w-3.5 h-3.5 text-red-600 dark:text-[#ef4444]" />
                <span className="tracking-wide">LPU PUNJAB • B.TECH CSE (2024–2028)</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-download-resume-btn"
                onClick={() => generateResumePDF()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/20 dark:shadow-red-950/70 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </button>

              <button
                id="hero-preview-resume-btn"
                onClick={onOpenResumeModal}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white dark:bg-zinc-900/90 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-red-600 dark:text-[#ef4444]" />
                <span>View Resume</span>
              </button>
            </div>

            {/* Social Connects */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <a
                href={PERSONAL_INFO.vercel}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors font-semibold"
              >
                <svg className="w-3.5 h-3.5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M12 1L24 22H0L12 1Z" />
                </svg>
                <span>Vercel</span>
              </a>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white transition-colors font-semibold"
              >
                <Linkedin className="w-3.5 h-3.5 text-red-600 dark:text-[#ef4444]" />
                <span>LinkedIn</span>
              </a>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-amber-400 dark:hover:text-amber-300 transition-colors font-semibold"
              >
                <SkillLogo name="leetcode" className="w-3.5 h-3.5" />
                <span>LeetCode (94 Solved)</span>
              </a>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors font-semibold"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub ({PERSONAL_INFO.githubUsername})</span>
              </a>
            </div>

          </div>

          {/* CENTER COLUMN: Hero Portrait Cutout standing in front of PORTFOLIO (Span 5) */}
          <div className="lg:col-span-5 flex justify-center relative z-10 pt-4 lg:pt-0">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Portrait Container */}
              <div className="group relative rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 w-full h-[400px] sm:h-[460px] flex items-center justify-center">
                {!hasImageFailedCompletely ? (
                  <img
                    src={avatarSrc}
                    alt="Aditya Prakash - Data Science & AI Developer"
                    className="w-full h-full object-cover object-top filter contrast-105 transition-transform duration-500 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-red-950 p-6 text-center">
                    <div className="w-24 h-24 rounded-full bg-red-600/20 border-2 border-red-500/40 flex items-center justify-center text-red-500 mb-4 shadow-xl">
                      <span className="font-display font-black text-3xl tracking-wider">AP</span>
                    </div>
                    <h3 className="font-bold text-white text-base">Aditya Prakash</h3>
                    <p className="text-xs text-zinc-400 mt-1 max-w-[200px]">Data Science &amp; AI Developer</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer shadow-md transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Profile Photo</span>
                    </button>
                  </div>
                )}

                {/* Bottom gradient fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none"></div>

                {/* Direct photo upload button overlay */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload / Change with your exact unedited photo"
                  className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black/85 text-white/80 hover:text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 text-xs font-semibold shadow-lg cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Change Photo</span>
                </button>

                {/* Small bottom nameplate */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block drop-shadow-sm">
                      Aditya Prakash
                    </span>
                    <span className="text-[10px] text-zinc-300 font-mono">
                      B.Tech CSE • LPU Punjab (2024–2028)
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-red-600 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                    AI &amp; DATA
                  </span>
                </div>
              </div>

              {/* Floating Quote Tag on Right Side */}
              <div className="absolute -right-2 sm:-right-6 top-1/3 max-w-[170px] p-3 rounded-xl bg-white/95 dark:bg-black/90 border border-red-200 dark:border-red-900/80 shadow-xl backdrop-blur-md hidden sm:flex items-start gap-2 z-30 text-left">
                <Sparkles className="w-4 h-4 text-red-600 dark:text-[#ef4444] shrink-0 mt-0.5" />
                <p className="text-[10px] text-zinc-800 dark:text-zinc-300 font-semibold leading-snug">
                  Turning data &amp; AI models into impactful insights.
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Key Metrics & Skill Stats (Span 3) */}
          <div className="lg:col-span-3 space-y-6 text-left z-20 pt-4 lg:pt-0 pl-0 lg:pl-4">
            
            {/* Certifications Count */}
            <div className="space-y-0.5">
              <div className="font-display text-5xl sm:text-6xl text-red-600 dark:text-[#dc2626] font-black tracking-tight leading-none">
                5+
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                PROFESSIONAL CERTS
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-500 font-mono">
                Google, NIIT, Coursera, Udemy
              </div>
            </div>

            {/* Core Toolkits */}
            <div className="space-y-0.5">
              <div className="font-display text-5xl sm:text-6xl text-red-600 dark:text-[#dc2626] font-black tracking-tight leading-none">
                7+
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                DATA &amp; BI TOOLSETS
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-500 font-mono">
                Pandas, Power BI, Tableau, MySQL
              </div>
            </div>

            {/* Production Projects */}
            <div className="space-y-0.5">
              <div className="font-display text-5xl sm:text-6xl text-red-600 dark:text-[#dc2626] font-black tracking-tight leading-none">
                3+
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                DEPLOYED PROJECTS
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-500 font-mono">
                IPL, Energy Grid &amp; EduPrep AI
              </div>
            </div>

            {/* Languages Known */}
            <div className="space-y-0.5">
              <div className="font-display text-5xl sm:text-6xl text-red-600 dark:text-[#dc2626] font-black tracking-tight leading-none">
                4+
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                PROGRAMMING LANGUAGES
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-500 font-mono">
                Python, SQL, C/C++, Java
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
