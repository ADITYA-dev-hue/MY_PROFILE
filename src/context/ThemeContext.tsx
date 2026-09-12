import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeId = 'terracotta' | 'amber' | 'sienna' | 'olive' | 'espresso' | 'taupe';
export type ThemeMode = 'light';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  category: string;
  primary: string;
  primaryHover: string;
  primaryDark: string;
  secondary: string;
  rgb: string;
  lightText: string;
  darkText: string;
  bgSubtle: string;
  borderSubtle: string;
  particleColors: string[];
  gradient: string;
  quoteGradient: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  terracotta: {
    id: 'terracotta',
    name: 'Warm Terracotta',
    category: 'Design Studio Accent',
    primary: '#E87524',
    primaryHover: '#D06316',
    primaryDark: '#B3530F',
    secondary: '#6B3F25',
    rgb: '232, 117, 36',
    lightText: '#6B3F25',
    darkText: '#E87524',
    bgSubtle: 'rgba(232, 117, 36, 0.08)',
    borderSubtle: 'rgba(232, 117, 36, 0.24)',
    particleColors: ['#E87524', '#6B3F25', '#746A61', '#EADBCE', '#2B211B'],
    gradient: 'from-[#E87524] to-[#B3530F]',
    quoteGradient: 'from-[#38261C] via-[#2B211B] to-[#452817]',
  },
  amber: {
    id: 'amber',
    name: 'Golden Ochre',
    category: 'Warm Autumn',
    primary: '#D97706',
    primaryHover: '#B45309',
    primaryDark: '#92400E',
    secondary: '#6B3F25',
    rgb: '217, 119, 6',
    lightText: '#6B3F25',
    darkText: '#D97706',
    bgSubtle: 'rgba(217, 119, 6, 0.08)',
    borderSubtle: 'rgba(217, 119, 6, 0.24)',
    particleColors: ['#D97706', '#B45309', '#746A61', '#EADBCE', '#2B211B'],
    gradient: 'from-[#D97706] to-[#92400E]',
    quoteGradient: 'from-[#38261C] via-[#2B211B] to-[#452817]',
  },
  sienna: {
    id: 'sienna',
    name: 'Rustic Sienna',
    category: 'Editorial Earth',
    primary: '#C25E2E',
    primaryHover: '#A84C21',
    primaryDark: '#8A3B16',
    secondary: '#6B3F25',
    rgb: '194, 94, 46',
    lightText: '#6B3F25',
    darkText: '#C25E2E',
    bgSubtle: 'rgba(194, 94, 46, 0.08)',
    borderSubtle: 'rgba(194, 94, 46, 0.24)',
    particleColors: ['#C25E2E', '#6B3F25', '#746A61', '#EADBCE', '#2B211B'],
    gradient: 'from-[#C25E2E] to-[#8A3B16]',
    quoteGradient: 'from-[#38261C] via-[#2B211B] to-[#452817]',
  },
  olive: {
    id: 'olive',
    name: 'Artisan Olive',
    category: 'Botanical Warm',
    primary: '#5F6F52',
    primaryHover: '#48553D',
    primaryDark: '#36402E',
    secondary: '#6B3F25',
    rgb: '95, 111, 82',
    lightText: '#36402E',
    darkText: '#5F6F52',
    bgSubtle: 'rgba(95, 111, 82, 0.09)',
    borderSubtle: 'rgba(95, 111, 82, 0.24)',
    particleColors: ['#5F6F52', '#6B3F25', '#746A61', '#EADBCE', '#2B211B'],
    gradient: 'from-[#5F6F52] to-[#36402E]',
    quoteGradient: 'from-[#282F24] via-[#2B211B] to-[#36402E]',
  },
  espresso: {
    id: 'espresso',
    name: 'Deep Chestnut',
    category: 'Minimal Luxury',
    primary: '#6B3F25',
    primaryHover: '#522F1B',
    primaryDark: '#3E2213',
    secondary: '#E87524',
    rgb: '107, 63, 37',
    lightText: '#2B211B',
    darkText: '#6B3F25',
    bgSubtle: 'rgba(107, 63, 37, 0.08)',
    borderSubtle: 'rgba(107, 63, 37, 0.24)',
    particleColors: ['#6B3F25', '#E87524', '#746A61', '#EADBCE', '#2B211B'],
    gradient: 'from-[#6B3F25] to-[#3E2213]',
    quoteGradient: 'from-[#301D13] via-[#2B211B] to-[#3E2213]',
  },
  taupe: {
    id: 'taupe',
    name: 'Warm Slate',
    category: 'Monochrome Editorial',
    primary: '#746A61',
    primaryHover: '#5C534B',
    primaryDark: '#453E37',
    secondary: '#E87524',
    rgb: '116, 106, 97',
    lightText: '#2B211B',
    darkText: '#746A61',
    bgSubtle: 'rgba(116, 106, 97, 0.08)',
    borderSubtle: 'rgba(116, 106, 97, 0.24)',
    particleColors: ['#746A61', '#E87524', '#6B3F25', '#EADBCE', '#2B211B'],
    gradient: 'from-[#746A61] to-[#453E37]',
    quoteGradient: 'from-[#332E2A] via-[#2B211B] to-[#453E37]',
  },
};

interface ThemeContextType {
  theme: ThemeConfig;
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('portfolio_warm_theme_id');
    if (saved && saved in THEMES) return saved as ThemeId;
    return 'terracotta';
  });

  const mode: ThemeMode = 'light';

  const theme = THEMES[themeId] || THEMES.terracotta;

  // Apply clean light mode to document root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    root.style.backgroundColor = '#FAF7F0';
    root.style.color = '#2B211B';
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-primary-hover', theme.primaryHover);
    root.style.setProperty('--theme-primary-rgb', theme.rgb);
    root.style.setProperty('--theme-primary-dark', theme.primaryDark);
    root.style.setProperty('--theme-secondary', theme.secondary);
    root.style.setProperty('--theme-light-text', theme.lightText);
    root.style.setProperty('--theme-dark-text', theme.darkText);
    root.style.setProperty('--theme-subtle-bg', theme.bgSubtle);
    root.style.setProperty('--theme-subtle-border', theme.borderSubtle);

    localStorage.setItem('portfolio_warm_theme_id', themeId);
  }, [theme, themeId]);

  const setThemeId = (id: ThemeId) => {
    if (id in THEMES) {
      setThemeIdState(id);
    }
  };

  const toggleMode = () => {};
  const setMode = () => {};

  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId, mode, toggleMode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
