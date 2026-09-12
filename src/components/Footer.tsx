import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 bg-[#FAF7F0] border-t border-[#EADBCE] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#746A61] font-mono">
        <p>© 2024–2028 Aditya Prakash. All rights reserved.</p>
        <p className="text-[11px] text-[#746A61]">
          Editorial Portfolio • Crafted in React &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
};
