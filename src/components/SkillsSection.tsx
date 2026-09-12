import React, { useState, useMemo } from 'react';
import { 
  Code, 
  BarChart3, 
  Database, 
  GitBranch, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  CheckCircle2
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { SkillCategory } from '../types';
import { SkillLogo } from './SkillLogo';
import { HoloCard } from './HoloCard';
import { ScrollReveal } from './ScrollReveal';
import { TechSphere3D } from './TechSphere3D';
import { LayoutGrid, Orbit } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const SkillsSection: React.FC = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'3d-sphere' | 'grid'>('3d-sphere');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Programming': <Code className="w-5 h-5 text-[#E87524]" />,
    'Data Analysis & BI': <BarChart3 className="w-5 h-5 text-[#6B3F25]" />,
    'Machine Learning & Concepts': <Database className="w-5 h-5 text-[#E87524]" />,
    'Web Development': <Code className="w-5 h-5 text-[#E87524]" />,
    'Soft Skills': <Sparkles className="w-5 h-5 text-[#E87524]" />,
  };

  const allCategories = useMemo(() => {
    return ['All', ...SKILL_CATEGORIES.map((c) => c.title)];
  }, []);

  const filteredCategories = useMemo(() => {
    return SKILL_CATEGORIES.map((category) => {
      if (selectedCategory !== 'All' && category.title !== selectedCategory) {
        return null;
      }

      const filteredSkills = category.skills.filter((skill) => {
        const matchesName = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTags = skill.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesLevel = skill.level.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesName || matchesTags || matchesLevel;
      });

      if (filteredSkills.length === 0) return null;

      return {
        ...category,
        skills: filteredSkills,
      };
    }).filter(Boolean) as SkillCategory[];
  }, [selectedCategory, searchQuery]);

  return (
    <section 
      id="skills-arsenal" 
      aria-label="Technical Skills and Competencies"
      className="py-16 sm:py-24 bg-[#FAF7F0] text-[#2B211B] border-b border-[#EADBCE] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2 max-w-2xl text-left">
            <span className="eyebrow-label text-[#E87524] block mb-1">
              TECHNICAL ARSENAL &amp; LOGOS
            </span>
            <h2 className="section-h2 text-[#2B211B]">
              SKILLS &amp; FRAMEWORKS
            </h2>
            <p className="body-editorial text-base leading-relaxed text-[#52463C]">
              Complete technical capabilities across Data Science, Machine Learning, Core CS, and Full-Stack development verified with industry standard toolsets.
            </p>
          </div>

          {/* Quick Search Bar (shown only in grid mode) */}
          {viewMode === 'grid' && (
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#746A61]" />
              <input
                id="skill-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills (e.g. Python, SQL, Power BI)..."
                className="w-full pl-10 pr-12 py-2.5 rounded-lg text-sm bg-[#FFFCF7] border border-[#EADBCE] text-[#2B211B] placeholder-[#746A61] focus:outline-none focus:border-[#E87524] transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#746A61] hover:text-[#2B211B]"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>

        {/* View Mode Toggle & Category Pill Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Category Pill Filters (only in grid mode) */}
          {viewMode === 'grid' ? (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {allCategories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    id={`skill-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#E87524] text-white shadow-xs font-bold'
                        : 'bg-[#FFFCF7] text-[#6B3F25] border border-[#EADBCE] hover:bg-[#F3EDE2]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-sm font-medium text-[#52463C] flex items-center gap-2">
              <span 
                className="w-2.5 h-2.5 rounded-full animate-pulse bg-[#E87524]" 
              />
              <span>Interactive 3D Technology Sphere • Drag or rotate in 3D space</span>
            </div>
          )}

          {/* 3D Sphere vs Grid Toggle */}
          <div className="inline-flex items-center p-1 rounded-lg bg-[#FFFCF7] border border-[#EADBCE] text-xs sm:text-sm shrink-0 shadow-xs">
            <button
              onClick={() => setViewMode('3d-sphere')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                viewMode === '3d-sphere'
                  ? 'bg-[#E87524] text-white shadow-xs'
                  : 'text-[#6B3F25] hover:text-[#2B211B]'
              }`}
            >
              <Orbit className="w-4 h-4" />
              <span>3D Data Sphere</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#E87524] text-white shadow-xs'
                  : 'text-[#6B3F25] hover:text-[#2B211B]'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Categorized Grid</span>
            </button>
          </div>
        </div>

        {/* 3D Orbiting Sphere Display */}
        {viewMode === '3d-sphere' ? (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <TechSphere3D />
          </div>
        ) : (
          /* Skill Category Cards Grid - only shown in Categorized Grid mode */
          filteredCategories.length === 0 ? (
            <div className="text-center py-16 bg-[#FFFCF7] rounded-xl border border-dashed border-[#EADBCE]">
              <p className="text-sm font-medium text-[#746A61]">
                No skills found matching "{searchQuery}".
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-3 text-xs font-bold underline cursor-pointer text-[#E87524]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            (() => {
              const webDevCat = filteredCategories.find((c) => c.title === 'Web Development');
              const softSkillsCat = filteredCategories.find((c) => c.title === 'Soft Skills');
              const standardCats = filteredCategories.filter(
                (c) => c.title !== 'Web Development' && c.title !== 'Soft Skills'
              );
              const hasSplitStack = Boolean(webDevCat && softSkillsCat);

              const renderCard = (
                category: SkillCategory,
                cardIdPrefix: string,
                isSubCard = false
              ) => (
                <HoloCard
                  maxTilt={5}
                  depthPop={true}
                  className="h-full"
                  id={`skill-card-${cardIdPrefix}-${category.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  <div
                    className={`warm-card p-5 flex flex-col justify-between h-full group/card ${
                      isSubCard ? 'shadow-xs border border-[#EADBCE]' : ''
                    }`}
                  >
                    <div>
                      {/* Category Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-lg bg-[#FAF7F0] border border-[#EADBCE] shadow-2xs shrink-0">
                          {categoryIcons[category.title] || <Code className="w-5 h-5 text-[#E87524]" />}
                        </div>
                        <div className="text-left min-w-0">
                          <h3 className="card-h3 text-base text-[#2B211B] uppercase tracking-wide">
                            {category.title}
                          </h3>
                          <p className="text-xs text-[#52463C] line-clamp-1">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Skills List with Logos */}
                      <div className="space-y-2 mt-3">
                        {category.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="bg-[#FAF7F0] rounded-lg p-2.5 border border-[#EADBCE] transition-all group/item shadow-2xs"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5 text-left min-w-0">
                                <div className="w-6 h-6 rounded bg-[#FFFCF7] flex items-center justify-center p-1 border border-[#EADBCE] shrink-0 group-hover/item:scale-105 transition-transform">
                                  <SkillLogo name={skill.name} className="w-4 h-4" />
                                </div>
                                <span className="font-semibold text-xs sm:text-sm text-[#2B211B] truncate">
                                  {skill.name}
                                </span>
                              </div>

                              <span
                                className={`text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded shrink-0 ${
                                  skill.level === 'Advanced'
                                    ? 'bg-[#FFFCF7] text-[#E87524] border border-[#EADBCE] font-bold'
                                    : skill.level === 'Proficient'
                                    ? 'bg-[#FFFCF7] text-[#6B3F25] border border-[#EADBCE] font-medium'
                                    : 'bg-[#FFFCF7] text-[#52463C] border border-[#EADBCE]'
                                }`}
                              >
                                {skill.level}
                              </span>
                            </div>

                            {/* Skill Tags */}
                            {skill.tags && skill.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2 pl-8">
                                {skill.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[10px] sm:text-xs font-mono px-1.5 py-0.5 rounded bg-[#FFFCF7] text-[#52463C] border border-[#EADBCE]"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-4 pt-3 border-t border-[#EADBCE] flex items-center justify-between text-xs text-[#52463C]">
                      <span className="font-medium">{category.skills.length} skills</span>
                      <span className="font-semibold flex items-center gap-1 text-[#E87524]">
                        <CheckCircle2 className="w-3 h-3" />
                        Recruiter Ready
                      </span>
                    </div>
                  </div>
                </HoloCard>
              );

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                  {/* Standard Category Cards */}
                  {standardCats.map((category, idx) => (
                    <ScrollReveal
                      key={category.title}
                      delay={idx * 0.08}
                      distance={24}
                      className="h-full"
                    >
                      {renderCard(category, 'main')}
                    </ScrollReveal>
                  ))}

                  {/* If both Web Dev and Soft Skills are active, stack them vertically: Top = Web Dev, Below = Soft Skills */}
                  {hasSplitStack ? (
                    <ScrollReveal
                      delay={standardCats.length * 0.08}
                      distance={24}
                      className="h-full flex flex-col gap-6"
                    >
                      {/* Top: Web Development Card */}
                      <div className="flex-1">
                        {renderCard(webDevCat!, 'top', true)}
                      </div>

                      {/* Below that: Soft Skills Card */}
                      <div className="flex-1">
                        {renderCard(softSkillsCat!, 'below', true)}
                      </div>
                    </ScrollReveal>
                  ) : (
                    /* If only one of Web Dev or Soft Skills is filtered/present, render it as its own regular card */
                    [webDevCat, softSkillsCat]
                      .filter(Boolean)
                      .map((category) => (
                        <ScrollReveal
                          key={category!.title}
                          delay={standardCats.length * 0.08}
                          distance={24}
                          className="h-full"
                        >
                          {renderCard(category!, 'isolated')}
                        </ScrollReveal>
                      ))
                  )}
                </div>
              );
            })()
          )
        )}

      </div>
    </section>
  );
};
