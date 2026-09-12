import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';
import { useTheme, THEMES, ThemeId } from '../context/ThemeContext';

interface ThemeSwitcherProps {
  compact?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ compact = false }) => {
  const { theme, themeId, setThemeId } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-flex items-center gap-1.5" ref={dropdownRef}>
      {/* Theme Palette Picker Button */}
      <button
        type="button"
        id="theme-palette-button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#2B211B] bg-[#FFFCF7] hover:bg-[#F3EDE2] border border-[#EADBCE] transition-all cursor-pointer shadow-xs"
        aria-label="Change Accent Color"
        aria-expanded={isOpen}
      >
        <span
          className="w-3.5 h-3.5 rounded-full shadow-xs shrink-0 ring-2 ring-white transition-colors"
          style={{ backgroundColor: theme.primary }}
        />
        {!compact && (
          <span className="hidden sm:inline font-mono text-[11px] text-[#6B3F25]">
            {theme.name}
          </span>
        )}
        <Palette className="w-3.5 h-3.5 text-[#746A61] shrink-0" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id="theme-palette-dropdown"
          className="absolute right-0 top-full mt-2 w-64 p-3 rounded-xl bg-[#FFFCF7] border border-[#EADBCE] shadow-[0_10px_30px_-5px_rgba(43,33,27,0.1)] z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EADBCE]">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#746A61] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#E87524]" />
              Studio Accents
            </span>
            <span className="text-[10px] font-mono text-[#746A61]">
              {Object.keys(THEMES).length} Tones
            </span>
          </div>

          <div className="space-y-1">
            {(Object.keys(THEMES) as ThemeId[]).map((id) => {
              const item = THEMES[id];
              const isSelected = themeId === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setThemeId(id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#F4EEE4] border border-[#D4C5B3] shadow-xs'
                      : 'hover:bg-[#FAF7F0] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Multi-dot color preview */}
                    <div className="flex items-center -space-x-1">
                      <span
                        className="w-4 h-4 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: item.primary }}
                      />
                      <span
                        className="w-3 h-3 rounded-full border border-white shadow-xs opacity-80"
                        style={{ backgroundColor: item.secondary }}
                      />
                    </div>

                    <div>
                      <div className="text-xs font-bold text-[#2B211B] leading-tight font-serif">
                        {item.name}
                      </div>
                      <div className="text-[10px] font-mono text-[#746A61]">
                        {item.category}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check
                      className="w-4 h-4 text-[#E87524]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Tip */}
          <div className="pt-2 mt-2 border-t border-[#EADBCE] text-[10px] text-[#746A61] font-mono text-center">
            Warm Neutral Light Palette
          </div>
        </div>
      )}
    </div>
  );
};
