import React from 'react';
import {
  Code,
  Database,
  BarChart2,
  Cpu,
  Globe,
  Sparkles,
  GitBranch,
  Terminal,
  Layers,
  FileSpreadsheet,
  BrainCircuit,
  Binary,
  Activity,
  CheckCircle,
  Zap,
  Clock,
  Lightbulb,
} from 'lucide-react';

interface SkillLogoProps {
  name: string;
  className?: string;
}

export const SkillLogo: React.FC<SkillLogoProps> = ({ name, className = 'w-4 h-4' }) => {
  const norm = (name || '').toLowerCase().trim();

  // Python
  if (norm.includes('python')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M11.9 2C6.7 2 7 4.2 7 4.2V6.5H12V7.2H5.2C2.8 7.2 2 9.5 2 11.8c0 2.3.8 4.7 3.2 4.7H7v-2.3c0-2.3 2-4.2 4.3-4.2h5.1c1.2 0 2.2-.9 2.2-2.2V4.2C18.6 2 14 2 11.9 2zm-2.2 2.2a1 1 0 110 2 1 1 0 010-2z"
          fill="#3776AB"
        />
        <path
          d="M12.1 22c5.2 0 4.9-2.2 4.9-2.2v-2.3H12v-.7h6.8c2.4 0 3.2-2.3 3.2-4.6 0-2.3-.8-4.7-3.2-4.7H17v2.3c0 2.3-2 4.2-4.3 4.2H7.6c-1.2 0-2.2.9-2.2 2.2v3.6C5.4 22 10 22 12.1 22zm2.2-2.2a1 1 0 110-2 1 1 0 010 2z"
          fill="#FFD43B"
        />
      </svg>
    );
  }

  // C++
  if (norm.includes('c++') || norm === 'cpp') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2z"
          fill="#00599C"
          opacity="0.15"
        />
        <path
          d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2z"
          stroke="#00599C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <text
          x="12"
          y="15.5"
          textAnchor="middle"
          fontSize="9"
          fontWeight="bold"
          fill="#00599C"
          fontFamily="monospace"
        >
          C++
        </text>
      </svg>
    );
  }

  // C language
  if (norm === 'c') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#A8B9CC" opacity="0.2" />
        <circle cx="12" cy="12" r="10" stroke="#00599C" strokeWidth="1.5" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="#00599C"
          fontFamily="monospace"
        >
          C
        </text>
      </svg>
    );
  }

  // Java
  if (norm.includes('java') && !norm.includes('script')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M7 16c2 1 6 1 8 0s3-3 1-4c-2-1-5 1-7 0s-2-2-1-3c1-1 3-1 4-1"
          stroke="#E76F00"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M5 20c4 1.5 10 1.5 14 0"
          stroke="#5382A1"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 18c3 1 8 1 11 0"
          stroke="#E76F00"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // SQL / MySQL / PostgreSQL / Database
  if (norm.includes('sql') || norm.includes('rdbms')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#0284C7" strokeWidth="1.75" />
        <path
          d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"
          stroke="#0284C7"
          strokeWidth="1.75"
        />
        <path
          d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"
          stroke="#0284C7"
          strokeWidth="1.75"
        />
      </svg>
    );
  }

  // React
  if (norm.includes('react')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00D8FF" strokeWidth="1.4" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          transform="rotate(60 12 12)"
          stroke="#00D8FF"
          strokeWidth="1.4"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          transform="rotate(120 12 12)"
          stroke="#00D8FF"
          strokeWidth="1.4"
        />
        <circle cx="12" cy="12" r="1.8" fill="#00D8FF" />
      </svg>
    );
  }

  // TypeScript
  if (norm.includes('typescript') || norm === 'ts') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path
          d="M5 9h8m-4 0v10M15 13.5c.8-.8 1.8-1.2 2.8-1.2 1.3 0 2.2.7 2.2 1.8 0 1.3-1.1 1.7-2.3 2.1-1.3.4-2.7 1-2.7 2.4 0 1.3 1.1 2.4 2.8 2.4 1.1 0 2.2-.4 3-1.2"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // JavaScript
  if (norm.includes('javascript') || norm === 'js') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path
          d="M8 12v5c0 1.2-.6 1.8-1.8 1.8-.8 0-1.5-.3-2-.7M14 13.5c.8-.8 1.7-1.2 2.7-1.2 1.3 0 2.1.7 2.1 1.7 0 1.2-1 1.6-2.2 2-1.2.4-2.5.9-2.5 2.2 0 1.3 1.1 2.3 2.6 2.3 1.1 0 2-.4 2.8-1.1"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // LeetCode
  if (norm.includes('leetcode')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M15.5 4.5l-6.8 6.8c-.8.8-.8 2 0 2.8l6.8 6.8"
          stroke="#FFA116"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 12h10"
          stroke="#8A8A8E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Power BI
  if (norm.includes('power bi') || norm.includes('powerbi')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect x="4" y="13" width="3.5" height="8" rx="1" fill="#E87524" />
        <rect x="10" y="8" width="3.5" height="13" rx="1" fill="#F2C811" />
        <rect x="16.5" y="3" width="3.5" height="18" rx="1" fill="#E87524" />
      </svg>
    );
  }

  // Tableau
  if (norm.includes('tableau')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect x="11" y="2" width="2" height="6" rx="0.8" fill="#E87524" />
        <rect x="9" y="4" width="6" height="2" rx="0.8" fill="#E87524" />
        <rect x="11" y="16" width="2" height="6" rx="0.8" fill="#2B211B" />
        <rect x="9" y="18" width="6" height="2" rx="0.8" fill="#2B211B" />
        <rect x="2" y="11" width="6" height="2" rx="0.8" fill="#6B3F25" />
        <rect x="4" y="9" width="2" height="6" rx="0.8" fill="#6B3F25" />
        <rect x="16" y="11" width="6" height="2" rx="0.8" fill="#E87524" />
        <rect x="18" y="9" width="2" height="6" rx="0.8" fill="#E87524" />
      </svg>
    );
  }

  // Pandas
  if (norm.includes('pandas')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="4" height="16" rx="1" fill="#150458" />
        <rect x="10" y="8" width="4" height="12" rx="1" fill="#FF4A00" />
        <rect x="17" y="3" width="4" height="17" rx="1" fill="#150458" />
      </svg>
    );
  }

  // NumPy
  if (norm.includes('numpy')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l8 4.6v9.2l-8 4.6-8-4.6V6.6L12 2z"
          stroke="#4DABCF"
          strokeWidth="1.5"
          fill="#4DABCF"
          fillOpacity="0.15"
        />
        <path d="M12 2v9.2M20 6.6l-8 4.6M4 6.6l8 4.6" stroke="#4DABCF" strokeWidth="1.5" />
        <text
          x="12"
          y="18"
          textAnchor="middle"
          fontSize="6"
          fontWeight="bold"
          fill="#013243"
          fontFamily="sans-serif"
        >
          NP
        </text>
      </svg>
    );
  }

  // Excel
  if (norm.includes('excel')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#107C41" />
        <path
          d="M7 6.5l4 5.5-4 5.5h2.5l2.5-3.8 2.5 3.8h2.5l-4-5.5 4-5.5h-2.5l-2.5 3.8-2.5-3.8H7z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // Power Query / DAX
  if (norm.includes('dax') || norm.includes('power query')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="#E87524" strokeWidth="1.75" />
        <path
          d="M8 15l3-6m0 0l3 6m-3-6v9"
          stroke="#6B3F25"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Scikit-learn
  if (norm.includes('scikit') || norm.includes('sklearn')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="8" r="4.5" fill="#F7931E" fillOpacity="0.75" />
        <circle cx="16" cy="12" r="5" fill="#3499CD" fillOpacity="0.75" />
        <circle cx="9" cy="16" r="4" fill="#6B3F25" fillOpacity="0.75" />
      </svg>
    );
  }

  // Machine Learning / AI
  if (norm.includes('machine learning') || norm.includes('ai') || norm.includes('model')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="6" r="2.5" fill="#E87524" />
        <circle cx="18" cy="6" r="2.5" fill="#E87524" />
        <circle cx="12" cy="18" r="2.5" fill="#E87524" />
        <circle cx="12" cy="10" r="2.5" fill="#6B3F25" />
        <line x1="6" y1="6" x2="12" y2="10" stroke="#EADBCE" strokeWidth="1.5" />
        <line x1="18" y1="6" x2="12" y2="10" stroke="#EADBCE" strokeWidth="1.5" />
        <line x1="12" y1="10" x2="12" y2="18" stroke="#EADBCE" strokeWidth="1.5" />
      </svg>
    );
  }

  // Git / GitHub
  if (norm.includes('git')) {
    return <GitBranch className={className} style={{ color: '#F05032' }} />;
  }

  // HTML / CSS
  if (norm.includes('html') || norm.includes('css')) {
    return <Globe className={className} style={{ color: '#E44D26' }} />;
  }

  // Matplotlib
  if (norm.includes('matplotlib') || norm.includes('plot') || norm.includes('visualis')) {
    return <BarChart2 className={className} style={{ color: '#11557C' }} />;
  }

  // Soft Skills
  if (norm.includes('adaptab') || norm.includes('agile')) {
    return <Zap className={className} style={{ color: '#E87524' }} />;
  }

  if (norm.includes('time') || norm.includes('sprint') || norm.includes('planning')) {
    return <Clock className={className} style={{ color: '#0284C7' }} />;
  }

  if (norm.includes('learn') || norm.includes('curiosity') || norm.includes('initiat')) {
    return <Lightbulb className={className} style={{ color: '#E87524' }} />;
  }

  // Default / Category icons
  if (norm.includes('clean') || norm.includes('kpi') || norm.includes('stat')) {
    return <Activity className={className} style={{ color: '#E87524' }} />;
  }

  return <Code className={className} style={{ color: '#6B3F25' }} />;
};
