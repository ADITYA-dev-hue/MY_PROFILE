import React from 'react';
import { 
  Award, 
  BookOpen, 
  Code2, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { EDUCATION_LIST, CERTIFICATIONS, SKILL_CATEGORIES, LANGUAGES_KNOWN } from '../data/portfolioData';
import { SkillLogo } from './SkillLogo';

export const ProcessAndEducation: React.FC = () => {
  return (
    <section 
      id="education-skills"
      className="py-16 sm:py-20 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-stretch">
          
          {/* COLUMN 1: EDUCATION & SKILLS (Span 5) */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-950/80 p-6 sm:p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-6 text-left shadow-sm">
            
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wider text-zinc-900 dark:text-white font-bold pb-2 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span>EDUCATION &amp; SKILLS</span>
              <GraduationCap className="w-5 h-5 text-red-600 dark:text-red-500" />
            </h3>

            {/* Education History List */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-[#dc2626]">
                ACADEMIC BACKGROUND
              </div>

              {EDUCATION_LIST.map((edu, idx) => (
                <div key={idx} className="space-y-0.5 border-l-2 border-red-500/80 pl-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                      {edu.institution}
                    </h4>
                    <span className="text-[10px] font-mono text-red-600 dark:text-[#ef4444] font-bold shrink-0">
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
                    {edu.degree} {edu.major ? `• ${edu.major}` : ''}
                  </div>
                  {edu.grade && (
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                      {edu.grade}
                    </div>
                  )}
                  <div className="text-[10px] text-zinc-500">
                    {edu.location}
                  </div>
                </div>
              ))}
            </div>

            {/* Categorized Skills */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-[#dc2626]">
                TECHNICAL SKILLS &amp; STACK
              </div>

              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block">
                    {cat.title}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span
                        key={s.name}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold text-zinc-800 dark:text-zinc-200 hover:border-red-600 dark:hover:border-red-500 hover:bg-white dark:hover:bg-zinc-800/80 transition-all shadow-xs group"
                      >
                        <SkillLogo name={s.name} className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:scale-110" />
                        <span>{s.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Languages Known */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2 text-xs">
                <span className="font-bold text-zinc-700 dark:text-zinc-300">Languages:</span>
                {LANGUAGES_KNOWN.map((lang) => (
                  <span key={lang.name} className="text-zinc-600 dark:text-zinc-400 text-[11px]">
                    {lang.name} ({lang.proficiency})
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* COLUMN 2: VERIFIED CERTIFICATIONS (Span 4) */}
          <div id="certifications" className="lg:col-span-4 bg-white dark:bg-zinc-950/80 p-6 sm:p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-6 text-left shadow-sm flex flex-col justify-between">
            
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wider text-zinc-900 dark:text-white font-bold">
                  <span>CERTIFICATIONS</span>
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 font-bold">
                  5 Credentials
                </span>
              </div>

              {/* Certifications Cards */}
              <div className="space-y-3 pt-3">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-1.5 transition-all shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                          <span>{cert.title}</span>
                        </h4>
                        <div className="text-[11px] font-semibold text-red-700 dark:text-[#f87171]">
                          {cert.issuer}
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-red-600 dark:text-red-400 font-bold px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950/60 shrink-0">
                        {cert.date}
                      </span>
                    </div>

                    {cert.skills && (
                      <div className="flex flex-wrap gap-1 pt-1 border-t border-zinc-200/60 dark:border-zinc-800/60">
                        {cert.skills.slice(0, 3).map((sk) => (
                          <span key={sk} className="text-[9px] font-medium text-zinc-600 dark:text-zinc-400">
                            • {sk}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="text-[9px] font-bold text-red-600 dark:text-red-400">
                            +{cert.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-[11px] text-zinc-700 dark:text-zinc-300 space-y-1.5 mt-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-red-700 dark:text-red-400 block uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Credentials
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">5 Certificates</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
                Recognized accreditations across Artificial Intelligence, Web Development, Relational Databases, and Core Software Engineering.
              </p>
            </div>

          </div>

          {/* COLUMN 3: SOLID CRIMSON RED EDITORIAL QUOTE BLOCK (Span 3) */}
          <div className="lg:col-span-3 bg-[#8b1523] dark:bg-[#7a0c16] text-white p-7 sm:p-8 rounded-2xl flex flex-col justify-between relative shadow-xl dark:shadow-2xl overflow-hidden text-left border border-red-800 dark:border-red-900/60">
            
            {/* Top Quote Icon */}
            <div className="space-y-4">
              <div className="text-4xl text-rose-200 font-serif leading-none">
                “
              </div>

              <blockquote className="text-sm sm:text-base font-medium leading-relaxed text-white">
                Data is the fuel, algorithms are the engine, and clean code is the steering wheel for modern AI solutions.
              </blockquote>
            </div>

            {/* Signature & Callout at bottom */}
            <div className="space-y-6 pt-8">
              <div className="font-script text-4xl sm:text-5xl text-rose-100 select-none">
                Aditya
              </div>

              <div className="space-y-1 pt-4 border-t border-rose-800/60 dark:border-rose-900/50">
                <div className="text-xs font-black uppercase tracking-wider text-white">
                  LET'S CREATE IMPACT TOGETHER.
                </div>
                <div className="text-[11px] text-rose-100 font-medium">
                  ✦ Open for SDE &amp; AI / Data Roles
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
