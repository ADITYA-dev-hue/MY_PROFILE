import React from 'react';

interface SkillLogoProps {
  name: string;
  className?: string;
  size?: number;
}

export const SkillLogo: React.FC<SkillLogoProps> = ({ name, className = 'w-4 h-4', size = 16 }) => {
  const normalized = name.toLowerCase().trim();

  // Python: Official Blue & Yellow Snakes
  if (normalized.includes('python')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <path
          d="M11.87 2c-5.46 0-5.09 2.37-5.09 2.37l.01 2.45h5.18v.74H4.29S2 7.27 2 12.72c0 5.46 2 5.18 2 5.18h1.19v-2.45s-.06-2.91 2.87-2.91h4.94s2.75.05 2.75-2.68V4.68S16.14 2 11.87 2zm-2.8 1.48a.94.94 0 1 1 0 1.88.94.94 0 0 1 0-1.88z"
          fill="#3776AB"
        />
        <path
          d="M12.13 22c5.46 0 5.09-2.37 5.09-2.37l-.01-2.45h-5.18v-.74h7.68s2.29.29 2.29-5.16c0-5.46-2-5.18-2-5.18h-1.19v2.45s.06 2.91-2.87 2.91h-4.94s-2.75-.05-2.75 2.68v5.18S7.86 22 12.13 22zm2.8-1.48a.94.94 0 1 1 0-1.88.94.94 0 0 1 0 1.88z"
          fill="#FFD438"
        />
      </svg>
    );
  }

  // SQL / PostgreSQL / Database
  if (normalized === 'sql' || normalized.includes('database')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <ellipse cx="12" cy="6" rx="9" ry="3" fill="#0284C7" />
        <path d="M3 6v6c0 1.66 4.03 3 9 3s9-1.34 9-3V6" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
        <path d="M3 12v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="12" cy="6" rx="6" ry="1.8" fill="#38BDF8" />
      </svg>
    );
  }

  // C / C++
  if (normalized.includes('c++') || normalized.includes('c / c++') || normalized.includes('c/c++') || normalized === 'c') {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <path d="M12 2L2 7.5v11L12 24l10-5.5v-11L12 2z" fill="#00599C" />
        <path d="M12 4.2L4 8.6v8.8l8 4.4 8-4.4V8.6l-8-4.4z" fill="#004482" />
        <path d="M11 8.5a4.5 4.5 0 1 0 0 7 4.4 4.4 0 0 0 2.8-1l-1.3-1.3a2.6 2.6 0 1 1 0-3.4l1.3-1.3A4.4 4.4 0 0 0 11 8.5z" fill="#FFFFFF" />
        <path d="M15.5 11h1v-1.5h1V11h1.5v1h-1.5v1.5h-1V12h-1v-1zm4 0h1v-1.5h1V11H23v1h-1.5v1.5h-1V12h-1v-1z" fill="#659AD2" />
      </svg>
    );
  }

  // Java
  if (normalized.includes('java')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <path d="M9.5 18.5c2.5.2 5.5-.3 7.5-1.5-2.2-.4-4.8.2-7.5 1.5z" fill="#E76F00" />
        <path d="M8 20.5c3.2.3 7.2-.2 9.5-1.8-3.1-.3-6.5.2-9.5 1.8z" fill="#E76F00" />
        <path d="M14.5 13.8c1.3.8 2.5 1.8 1.8 3.2-.8 1.6-3.8 2.2-6.5 2.3 3.5-.6 6.3-1.8 6.8-3 .5-1.1-.5-1.8-2.1-2.5z" fill="#5382A1" />
        <path d="M13.2 8.5c1.2 1.3 1.8 2.7.5 4.2-1.2 1.4-3.5 1.8-5.7 2.2 2.8-.5 5.5-1.4 6-2.5.6-1.3-.2-2.7-.8-3.9z" fill="#5382A1" />
        <path d="M14.8 3c-1.2 1.6-1.5 3.2-.2 4.8 1 1.2 2.5 2.1 1.8 3.5-.8 1.4-3.4 1.8-5.8 2 3-.5 5.6-1.5 6-2.8.6-1.8-.8-3.2-1.8-4.5-1-1.3-.8-2.2 0-3z" fill="#E76F00" />
      </svg>
    );
  }

  // Pandas
  if (normalized.includes('pandas')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <rect x="3" y="3" width="7" height="8" rx="1.5" fill="#150458" />
        <rect x="14" y="3" width="7" height="8" rx="1.5" fill="#FFD43B" />
        <rect x="3" y="13" width="7" height="8" rx="1.5" fill="#E70488" />
        <rect x="14" y="13" width="7" height="8" rx="1.5" fill="#150458" />
      </svg>
    );
  }

  // NumPy
  if (normalized.includes('numpy')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="#013243" />
        <path d="M12 2.5l7.5 4.2v8.6L12 19.5 4.5 15.3V6.7L12 2.5z" fill="#4DABCF" />
        <path d="M8 8v8l3-3.5V8.5L8 8zm5 0v3.5l3 4.5V8l-3 0z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Matplotlib
  if (normalized.includes('matplotlib')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <circle cx="12" cy="12" r="10" fill="#11557C" />
        <path d="M4 14c2-4 5-8 8-2s5 6 8 0" stroke="#FF7F0E" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M4 10c3 3 5 5 8 1s5-5 8 3" stroke="#2CA02C" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Scikit-learn
  if (normalized.includes('scikit') || normalized.includes('sklearn')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5z" fill="#F09437" />
        <path d="M12 2a10 10 0 0 0-8.5 15.3l5-5A3.5 3.5 0 0 1 12 5.5V2z" fill="#3499CD" />
        <circle cx="15.5" cy="13" r="2" fill="#FFFFFF" />
      </svg>
    );
  }

  // Power BI
  if (normalized.includes('power bi') || normalized.includes('powerbi')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <rect x="3" y="11" width="4" height="10" rx="1.5" fill="#E6AD10" />
        <rect x="10" y="7" width="4" height="14" rx="1.5" fill="#F2C811" />
        <rect x="17" y="3" width="4" height="18" rx="1.5" fill="#F9E053" />
        <path d="M3 17h18" stroke="#D49B00" strokeWidth="1" opacity="0.4" />
      </svg>
    );
  }

  // Tableau
  if (normalized.includes('tableau')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        {/* Center Cross */}
        <path d="M11 8h2v8h-2z" fill="#E8762D" />
        <path d="M8 11h8v2H8z" fill="#E8762D" />
        {/* Top & Bottom Crosses */}
        <path d="M11.5 2h1v4h-1zM10 3.5h4v1h-4z" fill="#5B8FAF" />
        <path d="M11.5 18h1v4h-1zM10 19.5h4v1h-4z" fill="#5B8FAF" />
        {/* Left & Right Crosses */}
        <path d="M2 11.5h4v1H2zM3.5 10h1v4h-1z" fill="#5B8FAF" />
        <path d="M18 11.5h4v1h-4zM19.5 10h1v4h-1z" fill="#E8762D" />
        {/* Corner Accents */}
        <rect x="5.5" y="5.5" width="2" height="2" fill="#E8762D" />
        <rect x="16.5" y="5.5" width="2" height="2" fill="#5B8FAF" />
        <rect x="5.5" y="16.5" width="2" height="2" fill="#5B8FAF" />
        <rect x="16.5" y="16.5" width="2" height="2" fill="#E8762D" />
      </svg>
    );
  }

  // Microsoft Excel
  if (normalized.includes('excel')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <rect x="6" y="3" width="15" height="18" rx="2" fill="#107C41" />
        <path d="M10 6h8v2h-8zm0 3h8v2h-8zm0 3h8v2h-8zm0 3h8v2h-8z" fill="#33C481" opacity="0.6" />
        <rect x="3" y="6" width="9" height="12" rx="1.5" fill="#185C37" />
        <path d="M5.5 8.5l2 3.5-2 3.5h1.5l1.2-2.3 1.2 2.3h1.5l-2-3.5 2-3.5H9.4L8.2 11 7 8.5H5.5z" fill="#FFFFFF" />
      </svg>
    );
  }

  // MySQL
  if (normalized.includes('mysql')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <path d="M12 3C7 3 3 6.5 3 11c0 2.5 1.3 4.8 3.5 6.3L6 21l3.5-1.5c.8.3 1.6.5 2.5.5 5 0 9-3.5 9-8s-4-9-9-9z" fill="#00758F" />
        <path d="M13.5 8.5c-.8 0-1.5.7-1.5 1.5 0 .5.3 1 .7 1.3L11 13h2l.7-1.2c.8-.1 1.3-.8 1.3-1.6 0-.9-.7-1.7-1.5-1.7z" fill="#F29111" />
        <circle cx="8.5" cy="9.5" r="1" fill="#FFFFFF" />
      </svg>
    );
  }

  // Machine Learning
  if (normalized.includes('machine learning') || normalized === 'ml') {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="#6366F1" />
        <circle cx="8" cy="8" r="2" fill="#FFFFFF" />
        <circle cx="16" cy="8" r="2" fill="#FFFFFF" />
        <circle cx="12" cy="14" r="2.5" fill="#A5B4FC" />
        <circle cx="7" cy="18" r="1.5" fill="#E0E7FF" />
        <circle cx="17" cy="18" r="1.5" fill="#E0E7FF" />
        <path d="M8 8l4 6 4-6M12 14l-5 4M12 14l5 4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Deep Learning
  if (normalized.includes('deep learning')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="#8B5CF6" />
        <circle cx="6" cy="7" r="1.5" fill="#FFFFFF" />
        <circle cx="6" cy="12" r="1.5" fill="#FFFFFF" />
        <circle cx="6" cy="17" r="1.5" fill="#FFFFFF" />
        <circle cx="12" cy="5" r="1.5" fill="#DDD6FE" />
        <circle cx="12" cy="10" r="1.5" fill="#DDD6FE" />
        <circle cx="12" cy="15" r="1.5" fill="#DDD6FE" />
        <circle cx="12" cy="19" r="1.5" fill="#DDD6FE" />
        <circle cx="18" cy="9" r="1.5" fill="#FFFFFF" />
        <circle cx="18" cy="15" r="1.5" fill="#FFFFFF" />
        <path d="M6 7l6-2 6 4M6 12l6-2 6 5M6 17l6-2 6-5M6 7l6 3M6 12l6 3M6 17l6 2" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.7" />
      </svg>
    );
  }

  // Data Visualization
  if (normalized.includes('data visual')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="#0EA5E9" />
        <path d="M5 18V13M9 18V9M13 18V6M17 18V11M20 18H4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="13" cy="6" r="1.5" fill="#FEF08A" />
      </svg>
    );
  }

  // Data Cleaning
  if (normalized.includes('data clean') || normalized.includes('cleaning')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="#10B981" />
        <path d="M4 6h16M7 6v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 10l4 4M14 10l-4 4" stroke="#D1FAE5" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // Statistics
  if (normalized.includes('statistic')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="#EC4899" />
        {/* Gaussian Normal Distribution Curve */}
        <path d="M4 18c3 0 5-1 6-5 1-4 2-8 3-8s2 4 3 8c1 4 3 5 4 5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 18h16" stroke="#FCE7F3" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Git
  if (normalized === 'git') {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <path d="M21.7 10.7L13.3 2.3c-.4-.4-1-.4-1.4 0L9.5 4.7l2.8 2.8c.4-.1.8 0 1.1.3.4.4.5 1 .3 1.5l2.6 2.6c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.3-1.5L12.8 10v4.8c.2.1.4.3.5.5.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1.2-.2.4-.4.6-.5V9.9c-.2-.1-.4-.3-.6-.5-.4-.4-.5-1-.3-1.5L8.1 5.1 2.3 10.9c-.4.4-.4 1 0 1.4l8.4 8.4c.4.4 1 .4 1.4 0l9.6-9.6c.4-.4.4-1 0-1.4z" fill="#F05032" />
      </svg>
    );
  }

  // GitHub
  if (normalized.includes('github')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="currentColor" />
      </svg>
    );
  }

  // LeetCode
  if (normalized.includes('leetcode')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .666-1.607 2.645 2.645 0 0 1 .564-.472 2.76 2.76 0 0 1 .6-.279l3.854-4.126 5.405-5.788c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-.962-.438z" fill="#B3B1B0"/>
        <path d="M9.833 10.924a1.415 1.415 0 0 0-1.002.414l-2.396 2.392a1.38 1.38 0 0 0 0 1.955 1.38 1.38 0 0 0 1.952 0l2.396-2.392a1.38 1.38 0 0 0 0-1.955 1.378 1.378 0 0 0-.95-.414z" fill="#B3B1B0"/>
        <path d="M22.023 11.218h-11.8c-.76 0-1.375.615-1.375 1.375s.615 1.375 1.375 1.375h11.8c.76 0 1.375-.615 1.375-1.375s-.615-1.375-1.375-1.375z" fill="#FFA116"/>
      </svg>
    );
  }

  // Gemini API / AI / Generative AI
  if (normalized.includes('gemini') || normalized.includes('generative ai') || normalized.includes('prompt')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" fill="url(#gemini-grad)" />
        <defs>
          <linearGradient id="gemini-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1BA1E3" />
            <stop offset="0.5" stopColor="#5B5BD6" />
            <stop offset="1" stopColor="#D946EF" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // React
  if (normalized.includes('react')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      </svg>
    );
  }

  // HTML / CSS / JS
  if (normalized.includes('html') || normalized.includes('js') || normalized.includes('javascript')) {
    return (
      <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E" />
        <path d="M7 16.5c.5.8 1.2 1.3 2.2 1.3 1.1 0 1.8-.6 1.8-1.5 0-1-.7-1.4-1.9-1.8l-.6-.2c-1.8-.6-2.9-1.5-2.9-3.2 0-2 1.6-3.4 3.9-3.4 1.7 0 2.9.7 3.6 2l-1.6 1c-.4-.7-1-1.1-2-1.1-1 0-1.6.6-1.6 1.3 0 .8.6 1.2 1.7 1.6l.6.2c2 .7 3.1 1.6 3.1 3.4 0 2.2-1.7 3.6-4.2 3.6-2.2 0-3.6-1.1-4.3-2.6l1.9-1.2z" fill="#000000" />
      </svg>
    );
  }

  // Fallback Modern Technology Dot / Shield Badge
  return (
    <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none">
      <circle cx="12" cy="12" r="10" fill="#DC2626" opacity="0.15" />
      <circle cx="12" cy="12" r="4" fill="#DC2626" />
    </svg>
  );
};
