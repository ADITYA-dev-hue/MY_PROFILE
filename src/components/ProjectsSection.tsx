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

export const ProjectsSection: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Project visual icons for cards
  const projectIcons = [
    <BarChart3 className="w-5 h-5 text-red-500" />,
    <Zap className="w-5 h-5 text-amber-500" />,
    <Bot className="w-5 h-5 text-blue-500" />,
  ];

  return (
    <section 
      id="projects"
      className="py-16 sm:py-20 bg-white dark:bg-black text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching inspiration */}
        <div className="flex items-center justify-between pb-8 border-b border-zinc-200 dark:border-zinc-900">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-wider text-zinc-900 dark:text-white font-bold">
              FEATURED PROJECTS
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Data visualization dashboards, power grid analytics, and AI applications
            </p>
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white transition-colors group"
          >
            <span>VIEW ON GITHUB</span>
            <ArrowRight className="w-4 h-4 text-red-600 dark:text-[#dc2626] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 3 Horizontal Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8">
          {PROJECTS.map((project, idx) => {
            const num = `0${idx + 1}`;
            return (
              <div 
                key={project.id}
                className="group flex flex-col space-y-4 text-left cursor-pointer"
                onClick={() => setActiveModalProject(project)}
              >
                {/* Mockup Card Header Box with Tech Badges */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 group-hover:border-red-400 dark:group-hover:border-red-800/80 transition-all shadow-md dark:shadow-lg p-5 flex flex-col justify-between">
                  
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between z-10">
                    <div className="p-2 rounded-lg bg-black/60 border border-zinc-800">
                      {projectIcons[idx] || <BarChart3 className="w-5 h-5 text-red-500" />}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 bg-black/60 px-2 py-1 rounded border border-zinc-800">
                      {project.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Center Key Feature Summary */}
                  <div className="z-10 space-y-1">
                    <span className="font-display text-xl sm:text-2xl text-white font-bold leading-tight line-clamp-1">
                      {project.title}
                    </span>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-snug">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Tech Pills inside card */}
                  <div className="z-10 flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-red-950/80 border border-red-800/60 text-red-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-zinc-400 bg-black/60">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Gradient Background & Glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-zinc-950/90 to-red-950/30 group-hover:to-red-900/40 transition-colors pointer-events-none"></div>

                  {/* Expand inspect icon */}
                  <div className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-white/90 dark:bg-black/80 text-zinc-800 dark:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-20">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Project Info Row */}
                <div className="flex items-start justify-between gap-3 pt-1">
                  
                  <div className="flex items-start gap-3">
                    {/* Big Bold Crimson Red Number */}
                    <span className="font-display text-3xl sm:text-4xl text-red-600 dark:text-[#dc2626] font-bold leading-none shrink-0">
                      {num}
                    </span>

                    {/* Project Title & Category */}
                    <div className="space-y-0.5">
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider group-hover:text-red-600 dark:group-hover:text-[#ef4444] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest">
                        {project.technologies.slice(0, 3).join(' • ')}
                      </p>
                    </div>
                  </div>

                  {/* Right Arrow */}
                  <div className="text-zinc-400 dark:text-zinc-600 group-hover:text-red-600 dark:group-hover:text-[#dc2626] transition-colors pt-1">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>

                </div>

              </div>
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
