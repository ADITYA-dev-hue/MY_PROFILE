import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-500 font-mono">
        <p>© 2024–2028 Aditya Prakash. All rights reserved.</p>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-600">
          Built with React, TypeScript &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
};
