import React from 'react';
import { 
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Award,
  ArrowRight
} from 'lucide-react';
import { EDUCATION_LIST, CERTIFICATIONS, LANGUAGES_KNOWN, TRAINING_EXPERIENCE } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

export const ProcessAndEducation: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section 
      id="education-skills"
      className="py-16 sm:py-24 bg-[#FAF7F0] text-[#2B211B] border-b border-[#EADBCE] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-stretch">
          
          {/* COLUMN 1: EDUCATION (Span 5) */}
          <ScrollReveal delay={0.05} distance={28} className="lg:col-span-5 h-full">
            <div className="warm-card p-6 sm:p-7 space-y-6 text-left flex flex-col justify-between h-full">
            
            <div className="space-y-6">
              <h3 className="card-h3 text-xl uppercase tracking-wider text-[#2B211B] pb-2 border-b border-[#EADBCE] flex items-center justify-between">
                <span>EDUCATION</span>
                <GraduationCap className="w-5 h-5 text-[#E87524]" />
              </h3>

              {/* Education History List */}
              <div className="space-y-6">
                <div 
                  className="text-xs font-bold uppercase tracking-wider text-[#E87524]"
                >
                  ACADEMIC BACKGROUND
                </div>

                {EDUCATION_LIST.map((edu, idx) => (
                  <div 
                    key={idx} 
                    className="space-y-2 border-l-2 pl-4 py-1.5 border-[#E87524]"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-[#2B211B]">
                        {edu.institution}
                      </h4>
                      <span 
                        className="text-xs sm:text-sm font-mono font-bold shrink-0 text-[#E87524]"
                      >
                        {edu.period}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-[#3D3028] font-medium">
                      {edu.degree} {edu.major ? `• ${edu.major}` : ''}
                    </div>
                    {edu.grade && (
                      <div className="text-xs sm:text-sm text-emerald-800 font-mono font-semibold">
                        {edu.grade}
                      </div>
                    )}
                    {edu.highlights && edu.highlights.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        {edu.highlights.map((hl, hIdx) => (
                          <p key={hIdx} className="text-xs sm:text-sm text-[#3D3028] leading-relaxed">
                            • {hl}
                          </p>
                        ))}
                      </div>
                    )}
                    <div className="text-xs sm:text-sm text-[#6B3F25] font-medium pt-0.5">
                      {edu.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages Known */}
            <div className="pt-4 border-t border-[#EADBCE] flex flex-wrap items-center gap-3 text-sm">
              <span className="font-bold text-[#2B211B]">Languages:</span>
              {LANGUAGES_KNOWN.map((lang) => (
                <span key={lang.name} className="text-[#3D3028] text-xs sm:text-sm">
                  {lang.name} ({lang.proficiency})
                </span>
              ))}
            </div>

            </div>
          </ScrollReveal>

          {/* COLUMN 2: EXPERIENCE & TRAINING (Span 4) */}
          <ScrollReveal delay={0.15} distance={28} className="lg:col-span-4 h-full">
            <div id="experience" className="warm-card p-6 sm:p-7 space-y-6 text-left flex flex-col justify-between h-full">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#EADBCE]">
                <h3 className="card-h3 text-xl uppercase tracking-wider text-[#2B211B] flex items-center gap-2">
                  <span>EXPERIENCE</span>
                </h3>
                <Briefcase className="w-5 h-5 text-[#E87524]" />
              </div>

              {/* Training / Work Experience Cards */}
              <div className="space-y-5">
                <div 
                  className="text-xs font-bold uppercase tracking-wider text-[#E87524]"
                >
                  INDUSTRY INTERNSHIP
                </div>

                {TRAINING_EXPERIENCE.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-[#FAF7F0] border border-[#EADBCE] space-y-3 transition-all shadow-xs text-left"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h4 className="text-sm sm:text-base font-bold text-[#2B211B]">
                        {exp.role}
                      </h4>
                      <span 
                        className="text-xs font-mono font-bold text-[#E87524]"
                      >
                        {exp.period}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-semibold text-[#6B3F25]">
                      {exp.company} • <span className="font-normal text-[#52463C]">{exp.location}</span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {exp.highlights.map((hl, hIdx) => (
                        <p key={hIdx} className="text-xs sm:text-sm text-[#3D3028] leading-relaxed">
                          • {hl}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accreditations Spotlight Banner */}
            <div 
              className="p-4 rounded-lg border text-xs sm:text-sm space-y-2.5 mt-4 bg-[#FAF7F0] border-[#EADBCE]"
            >
              <div className="flex items-center justify-between">
                <span 
                  className="font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 text-[#E87524]"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Verified Accreditations
                </span>
                <span className="text-xs text-[#52463C] font-mono">{CERTIFICATIONS.length} Certificates</span>
              </div>
              <p className="text-[#3D3028] text-xs leading-relaxed">
                Official Google AI, Meta Front-End, Infosys DBMS, NIIT Java, and C++ credentials.
              </p>
              <a
                href="#certificates"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E87524] hover:text-[#6B3F25] transition-colors pt-1"
              >
                <span>View All Certificates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            </div>
          </ScrollReveal>

          {/* COLUMN 3: SOLID ACCENT EDITORIAL QUOTE BLOCK (Span 3) */}
          <ScrollReveal delay={0.25} distance={28} className="lg:col-span-3 h-full">
            <div 
              className="bg-[#6B3F25] text-[#FFFCF7] p-7 sm:p-8 rounded-xl flex flex-col justify-between relative shadow-[0_10px_30px_rgba(107,63,37,0.15)] overflow-hidden text-left border border-[#54311C] h-full transition-all"
            >
              
              {/* Top Quote Icon */}
              <div className="space-y-4 relative z-10">
                <div className="text-5xl text-[#FFFCF7]/80 font-serif leading-none">
                  “
                </div>

                <blockquote className="font-serif text-lg sm:text-xl font-medium leading-relaxed text-[#FFFCF7]">
                  Data is the fuel, algorithms are the engine, and clean code is the steering wheel for modern AI solutions.
                </blockquote>
              </div>

              {/* Signature & Callout at bottom */}
              <div className="space-y-6 pt-8 relative z-10">
                <div className="font-script text-5xl sm:text-6xl text-[#FFFCF7]/95 select-none">
                  Aditya
                </div>

                <div className="space-y-1.5 pt-4 border-t border-white/20">
                  <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FFFCF7]">
                    LET'S CREATE IMPACT TOGETHER.
                  </div>
                  <div className="text-xs sm:text-sm text-[#FFFCF7]/90 font-medium">
                    ✦ Open for AI &amp; Full-Stack Data Roles
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
