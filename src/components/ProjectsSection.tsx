import React, { useState } from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  Github, 
  Maximize2,
  BarChart3,
  Zap,
  Bot
} from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { HoloCard } from './HoloCard';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

export const ProjectsSection: React.FC = () => {
  const { theme } = useTheme();
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Project visual icons for cards
  const projectIcons = [
    <BarChart3 className="w-5 h-5 text-[#E87524]" />,
    <Zap className="w-5 h-5 text-[#6B3F25]" />,
    <Bot className="w-5 h-5 text-[#E87524]" />,
  ];

  return (
    <section 
      id="projects"
      className="py-16 sm:py-24 bg-[#FAF7F0] text-[#2B211B] border-b border-[#EADBCE] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching editorial layout */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#EADBCE] gap-4">
          <div>
            <span className="eyebrow-label text-[#E87524] block mb-1">
              PORTFOLIO SHOWCASE
            </span>
            <h2 className="section-h2 text-[#2B211B]">
              FEATURED PROJECTS
            </h2>
            <p className="body-editorial text-sm mt-1 max-w-xl">
              Data visualization dashboards, power grid analytics, and Gemini AI platforms
            </p>
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B3F25] hover:text-[#E87524] transition-colors group self-start sm:self-auto"
          >
            <span>VIEW ON GITHUB</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#E87524]" />
          </a>
        </div>

        {/* 3 Horizontal Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8">
          {PROJECTS.map((project, idx) => {
            const num = `0${idx + 1}`;
            return (
              <ScrollReveal
                key={project.id}
                delay={idx * 0.12}
                distance={28}
                className="h-full"
              >
                <HoloCard 
                  maxTilt={6}
                  depthPop={true}
                  className="w-full h-full cursor-pointer"
                  onClick={() => setActiveModalProject(project)}
                >
                  <div 
                    className="warm-card p-5 group flex flex-col justify-between h-full"
                  >
                    {/* Mockup Card Header Box with Tech Badges */}
                    <div 
                      className="relative aspect-video w-full rounded-lg overflow-hidden bg-[#F4EEE4] border border-[#EADBCE] transition-all p-5 flex flex-col justify-between mb-4"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Top Bar inside Card with 3D Depth */}
                      <div className="flex items-center justify-between z-10 transition-transform duration-300" style={{ transform: 'translateZ(14px)' }}>
                        <div className="p-2 rounded-lg bg-[#FFFCF7] border border-[#EADBCE] shadow-xs">
                          {projectIcons[idx] || <BarChart3 className="w-5 h-5 text-[#E87524]" />}
                        </div>
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#6B3F25] bg-[#FFFCF7] px-2 py-1 rounded border border-[#EADBCE]">
                          {project.category.toUpperCase()}
                        </span>
                      </div>

                      {/* Center Key Feature Summary with 3D Depth */}
                      <div className="z-10 space-y-1 transition-transform duration-300" style={{ transform: 'translateZ(20px)' }}>
                        <span className="card-h3 text-xl text-[#2B211B] leading-tight line-clamp-1 block">
                          {project.title}
                        </span>
                        <p className="text-xs text-[#746A61] line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Bottom Tech Pills inside card with 3D Depth */}
                      <div className="z-10 flex flex-wrap gap-1.5 pt-1 transition-transform duration-300" style={{ transform: 'translateZ(16px)' }}>
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[10px] font-mono font-medium border shadow-xs bg-[#FFFCF7] border-[#EADBCE] text-[#6B3F25]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-[#746A61] bg-[#FFFCF7] border border-[#EADBCE]">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Expand inspect icon */}
                      <div className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-[#FFFCF7] text-[#2B211B] border border-[#EADBCE] opacity-0 group-hover:opacity-100 transition-opacity shadow-xs z-20">
                        <Maximize2 className="w-3.5 h-3.5 text-[#E87524]" />
                      </div>
                    </div>

                    {/* Project Info Row */}
                    <div className="flex items-start justify-between gap-3 pt-1">
                      <div className="flex items-start gap-3">
                        {/* Big Bold Index Number */}
                        <span 
                          className="font-serif text-3xl sm:text-4xl font-bold leading-none shrink-0 text-[#E87524]"
                        >
                          {num}
                        </span>

                        {/* Project Title & Category */}
                        <div className="space-y-0.5">
                          <h3 className="card-h3 text-sm text-[#2B211B] uppercase tracking-wide">
                            {project.title}
                          </h3>
                          <p className="text-[11px] text-[#746A61] font-mono">
                            {project.technologies.slice(0, 3).join(' • ')}
                          </p>
                        </div>
                      </div>

                      {/* Right Arrow */}
                      <div className="text-[#6B3F25] group-hover:text-[#E87524] transition-colors pt-1">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#E87524]" />
                      </div>
                    </div>

                  </div>
                </HoloCard>
              </ScrollReveal>
            );
          })}
        </div>

      </div>

      {/* Project Specs Inspection Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
