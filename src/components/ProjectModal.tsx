import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Copy, 
  Check,
  Star,
  ArrowLeft
} from 'lucide-react';
import { Project } from '../types';
import { SkillLogo } from './SkillLogo';
import { useTheme } from '../context/ThemeContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { theme } = useTheme();
  const [copiedLink, setCopiedLink] = React.useState(false);

  // Close on Escape key press and manage body scroll
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    onClose();
  };

  const copyGithubLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(project.githubUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const modalContent = (
    <div 
      id="project-detail-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={handleClose}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-[#2B211B]/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150 cursor-pointer"
    >
      <div 
        className="relative w-full max-w-3xl bg-[#FFFCF7] rounded-xl border border-[#EADBCE] shadow-[0_20px_50px_rgba(43,33,27,0.18)] overflow-hidden my-auto max-h-[88vh] flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar - Sticky Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-[#EADBCE] bg-[#FAF7F0] shrink-0 z-20">
          <div className="flex items-center gap-2">
            <span 
              className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border bg-[#FFFCF7] border-[#EADBCE] text-[#6B3F25]"
            >
              {project.category.toUpperCase()}
            </span>
            {project.stars && (
              <span className="flex items-center gap-1 text-xs font-semibold text-[#6B3F25] bg-[#FAF7F0] px-2 py-0.5 rounded border border-[#EADBCE]">
                <Star className="w-3 h-3 fill-[#E87524] text-[#E87524]" />
                {project.stars} stars
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              id="close-project-modal-btn"
              type="button"
              onClick={handleClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold transition-all cursor-pointer shadow-xs hover:bg-[#D06316] bg-[#E87524]"
              aria-label="Close modal and return to portfolio"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Projects</span>
              <X className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-left flex-1 bg-[#FFFCF7]">
          
          <div>
            <h2 id="modal-project-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#2B211B]">
              {project.title}
            </h2>
            <p 
              className="text-sm font-semibold mt-1 text-[#E87524]"
            >
              {project.subtitle}
            </p>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-[#FAF7F0] border border-[#EADBCE] text-center">
                <div className="text-xs font-semibold text-[#746A61] uppercase tracking-wider">Benchmark</div>
                <div className="font-serif text-base font-bold text-[#2B211B] mt-0.5">{metric}</div>
              </div>
            ))}
          </div>

          {/* In-depth description */}
          <div className="space-y-2">
            <h3 className="eyebrow-label text-[#6B3F25]">
              System Overview &amp; Engineering Scope
            </h3>
            <p className="body-editorial text-sm">
              {project.fullDescription}
            </p>
          </div>

          {/* Architecture Summary */}
          <div 
            className="p-4 rounded-lg border space-y-2 bg-[#FAF7F0] border-[#EADBCE]"
          >
            <div 
              className="flex items-center gap-2 text-xs font-bold text-[#E87524]"
            >
              <Layers className="w-4 h-4" />
              <span>Architectural Design &amp; Data Pipeline</span>
            </div>
            <p className="text-xs text-[#2B211B] leading-relaxed font-mono">
              {project.architectureSummary}
            </p>
          </div>

          {/* Key Features & Highlights */}
          <div className="space-y-2.5">
            <h3 className="eyebrow-label text-[#6B3F25]">
              Key Engineering Features
            </h3>
            <ul className="space-y-2">
              {project.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#2B211B]">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#E87524]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div className="space-y-2">
            <h3 className="eyebrow-label text-[#6B3F25]">
              Technologies &amp; Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#FAF7F0] text-[#2B211B] rounded-lg border border-[#EADBCE]"
                >
                  <SkillLogo name={tech} className="w-3.5 h-3.5 shrink-0" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#FAF7F0] border-t border-[#EADBCE] shrink-0">
          <button
            onClick={copyGithubLink}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B3F25] hover:text-[#2B211B] cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Repository Link Copied!' : 'Copy Repo URL'}</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-lg bg-[#FFFCF7] hover:bg-[#F3EDE2] text-[#2B211B] text-xs font-semibold transition-colors cursor-pointer border border-[#EADBCE]"
            >
              Close
            </button>
            <a
              id="modal-github-btn"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-xs font-semibold transition-all shadow-xs bg-[#E87524] hover:bg-[#D06316]"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
};
