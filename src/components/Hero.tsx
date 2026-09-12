import React, { useState, useRef } from 'react';
import { 
  Download, 
  Globe, 
  FileText, 
  Sparkles,
  Camera,
  Upload,
  User
} from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { generateResumePDF } from '../utils/pdfGenerator';
import { NeuralParticleCanvas } from './NeuralParticleCanvas';
import { HoloCard } from './HoloCard';
import { SpatialGrid3D } from './SpatialGrid3D';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 24, y: y * 24 });
  };
  
  const fallbackList = [
    '/profile.jpg',
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
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={() => setMouseOffset({ x: 0, y: 0 })}
      className="relative min-h-[90vh] bg-[#FAF7F0] text-[#2B211B] pt-24 sm:pt-28 pb-14 overflow-hidden flex flex-col justify-between border-b border-[#EADBCE] transition-colors duration-300"
    >
      {/* Interactive Neural Particle Field */}
      <NeuralParticleCanvas />

      {/* 3D Horizon Spatial Grid Floor */}
      <SpatialGrid3D />

      {/* 
        EDITORIAL ARCHITECTURAL WATERMARK "PORTFOLIO"
      */}
      <div 
        aria-hidden="true" 
        className="absolute top-14 sm:top-10 left-0 right-0 select-none pointer-events-none w-full text-center z-0 overflow-hidden flex justify-center transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translate3d(${-mouseOffset.x * 0.5}px, ${-mouseOffset.y * 0.3}px, 0px)`,
        }}
      >
        <span 
          className="font-serif text-[22vw] sm:text-[19vw] leading-none uppercase font-bold tracking-tight whitespace-nowrap block"
          style={{ 
            color: '#6B3F25',
            opacity: 0.045,
          }}
        >
          PORTFOLIO
        </span>
      </div>

      {/* Subtle Warm Ambient Highlights */}
      <div 
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[130px] pointer-events-none -z-0 opacity-40"
        style={{ backgroundColor: 'rgba(232, 117, 36, 0.04)' }}
      />
      <div 
        className="absolute bottom-10 right-10 w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none -z-0 opacity-30"
        style={{ backgroundColor: 'rgba(107, 63, 37, 0.04)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">
        
        {/* Main 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center pt-4 sm:pt-8">
          
          {/* LEFT COLUMN: Name, Subtitle & Bio (Span 4) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 space-y-5 text-left z-20"
          >
            
            {/* Script Greeting */}
            <div>
              <span 
                className="font-script text-3xl sm:text-4xl lg:text-5xl font-normal block leading-tight text-[#E87524]"
              >
                Hello, I'm
              </span>
              
              {/* Giant Stacked Fraunces Display Name (Mobile: 44px, Desktop: 68px, 700 weight, line-height 1.05) */}
              <h1 className="hero-h1 mt-1 text-[#2B211B]">
                ADITYA<br />
                PRAKASH
              </h1>
            </div>

            {/* Subtitle in Terracotta Accent */}
            <div className="space-y-2">
              <h2 
                className="eyebrow-label text-[#E87524]"
              >
                AI-ACCELERATED FULL-STACK DATA DEVELOPER
              </h2>
              
              <p className="body-editorial max-w-sm">
                Computer Science undergraduate at Lovely Professional University (2024–2028). Specialized in Python, SQL, C/C++, Java, Power BI analytics, and Gemini AI platform engineering.
              </p>
            </div>

            {/* University Location Tag */}
            <div className="flex items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFCF7] border border-[#EADBCE] text-[11px] font-semibold text-[#2B211B] shadow-xs">
                <Globe className="w-3.5 h-3.5 text-[#E87524]" />
                <span className="font-mono text-[10px] tracking-wider text-[#6B3F25]">LPU PUNJAB • B.TECH CSE (2024–2028)</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-download-resume-btn"
                onClick={() => generateResumePDF()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer hover:bg-[#D06316] active:scale-95 bg-[#E87524] shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </button>

              <button
                id="hero-preview-resume-btn"
                onClick={onOpenResumeModal}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#FFFCF7] hover:bg-[#F3EDE2] border border-[#EADBCE] text-[#2B211B] text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#E87524]" />
                <span>View Resume</span>
              </button>
            </div>

          </motion.div>

          {/* CENTER COLUMN: Hero Portrait Cutout standing in front of PORTFOLIO (Span 5) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center relative z-10 pt-4 lg:pt-0"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Refined Portrait Container */}
              <HoloCard maxTilt={6} depthPop={true} className="w-full">
                <div className="group relative rounded-xl overflow-hidden shadow-[0_10px_35px_-5px_rgba(43,33,27,0.12)] bg-[#FFFCF7] border border-[#EADBCE] w-full h-[400px] sm:h-[460px] flex items-center justify-center">
                  {!hasImageFailedCompletely ? (
                    <img
                      src={avatarSrc}
                      alt="Aditya Prakash - Data Science & AI Developer"
                      className="w-full h-full object-cover object-top filter contrast-[1.03] transition-transform duration-500 group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#FAF7F0] p-6 text-center">
                      <div 
                        className="w-24 h-24 rounded-xl flex items-center justify-center mb-4 shadow-sm border"
                        style={{
                          backgroundColor: '#FFFCF7',
                          borderColor: '#EADBCE',
                          color: '#E87524',
                        }}
                      >
                        <span className="font-serif font-bold text-3xl">AP</span>
                      </div>
                      <h3 className="card-h3 text-base text-[#2B211B]">Aditya Prakash</h3>
                      <p className="text-xs text-[#746A61] mt-1 max-w-[200px]">Data Science &amp; AI Developer</p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors bg-[#E87524] hover:bg-[#D06316]"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Profile Photo</span>
                      </button>
                    </div>
                  )}

                  {/* Soft bottom gradient fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B211B]/80 via-transparent to-transparent pointer-events-none"></div>

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
                    className="absolute top-3 right-3 p-2 rounded-lg bg-[#2B211B]/70 hover:bg-[#2B211B]/90 text-white backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Change Photo</span>
                  </button>

                  {/* Clean bottom nameplate */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-xs font-bold text-white uppercase tracking-wider block font-serif">
                        Aditya Prakash
                      </span>
                      <span className="text-[10px] text-[#FAF7F0]/80 font-mono">
                        B.Tech CSE • LPU Punjab (2024–2028)
                      </span>
                    </div>
                    <span 
                      className="px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider shadow-xs bg-[#E87524]"
                    >
                      AI &amp; DATA
                    </span>
                  </div>
                </div>
              </HoloCard>

              {/* Floating Quote Tag on Right Side with 3D Depth Parallax */}
              <div 
                className="absolute -right-2 sm:-right-6 top-1/3 max-w-[180px] p-3.5 rounded-xl bg-[#FFFCF7] border border-[#EADBCE] shadow-[0_6px_20px_rgba(43,33,27,0.08)] hidden sm:flex items-start gap-2.5 z-30 text-left transition-transform duration-200 ease-out will-change-transform"
                style={{
                  transform: `translate3d(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px, 30px)`,
                }}
              >
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-[#E87524]" />
                <p className="small-editorial text-xs leading-snug">
                  Turning data &amp; AI models into impactful insights.
                </p>
              </div>

            </div>
          </motion.div>

          {/* RIGHT COLUMN: Key Metrics & Skill Stats (Span 3) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 space-y-6 text-left z-20 pt-4 lg:pt-0 pl-0 lg:pl-4"
          >
            
            {/* Certifications Count */}
            <div className="space-y-1">
              <div 
                className="stats-number text-[#E87524]"
              >
                5+
              </div>
              <div className="eyebrow-label text-[#2B211B]">
                PROFESSIONAL CERTS
              </div>
              <div className="text-[11px] text-[#746A61] font-mono">
                Google, NIIT, Coursera, Udemy
              </div>
            </div>

            {/* Core Toolkits */}
            <div className="space-y-1">
              <div 
                className="stats-number text-[#E87524]"
              >
                7+
              </div>
              <div className="eyebrow-label text-[#2B211B]">
                DATA &amp; BI TOOLSETS
              </div>
              <div className="text-[11px] text-[#746A61] font-mono">
                Pandas, Power BI, Tableau, MySQL
              </div>
            </div>

            {/* Production Projects */}
            <div className="space-y-1">
              <div 
                className="stats-number text-[#E87524]"
              >
                3+
              </div>
              <div className="eyebrow-label text-[#2B211B]">
                DEPLOYED PROJECTS
              </div>
              <div className="text-[11px] text-[#746A61] font-mono">
                IPL, Energy Grid &amp; EduPrep AI
              </div>
            </div>

            {/* Languages Known */}
            <div className="space-y-1">
              <div 
                className="stats-number text-[#E87524]"
              >
                4+
              </div>
              <div className="eyebrow-label text-[#2B211B]">
                PROGRAMMING LANGUAGES
              </div>
              <div className="text-[11px] text-[#746A61] font-mono">
                Python, SQL, C/C++, Java
              </div>
            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
};
