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

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Languages': <Code className="w-5 h-5 text-red-600 dark:text-red-500" />,
    'Tools & Libraries': <BarChart3 className="w-5 h-5 text-red-600 dark:text-red-500" />,
    'Databases & Core Concepts': <Database className="w-5 h-5 text-red-600 dark:text-red-500" />,
    'Version Control & Workflow': <GitBranch className="w-5 h-5 text-red-600 dark:text-red-500" />,
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
      className="py-16 sm:py-20 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/70 text-red-600 dark:text-red-400 text-[10px] font-bold tracking-widest uppercase">
              <Zap className="w-3 h-3 text-red-600 dark:text-red-500" />
              <span>Technical Arsenal &amp; Logos</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wider text-zinc-950 dark:text-white font-bold">
              Skills &amp; Framework Mastery
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Complete technical capabilities across Data Science, Machine Learning, Core CS, and Full-Stack development verified with industry standard toolsets.
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              id="skill-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills (e.g. Python, SQL, Power BI)..."
              className="w-full pl-10 pr-12 py-2.5 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {allCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`skill-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skill Category Cards Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              No skills found matching "{searchQuery}".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-3 text-xs font-bold text-red-600 dark:text-red-400 underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.title}
                id={`skill-card-${category.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="bg-zinc-50 dark:bg-zinc-950/70 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800/80 flex flex-col justify-between hover:border-red-300 dark:hover:border-red-900/60 transition-all shadow-sm group/card"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                      {categoryIcons[category.title] || <Code className="w-5 h-5 text-red-600 dark:text-red-500" />}
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                        {category.title}
                      </h3>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills List with Logos */}
                  <div className="space-y-2.5 mt-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="bg-white dark:bg-zinc-900/90 rounded-xl p-2.5 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-red-500 dark:hover:border-red-600/70 transition-all group/item shadow-2xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-left">
                            <div className="w-6 h-6 rounded-lg bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center p-1 border border-zinc-100 dark:border-zinc-700/60 shrink-0 group-hover/item:scale-110 transition-transform">
                              <SkillLogo name={skill.name} className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 group-hover/item:text-red-600 dark:group-hover/item:text-red-400 transition-colors">
                              {skill.name}
                            </span>
                          </div>

                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                              skill.level === 'Advanced'
                                ? 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900'
                                : skill.level === 'Proficient'
                                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                            }`}
                          >
                            {skill.level}
                          </span>
                        </div>

                        {/* Skill Tags */}
                        {skill.tags && skill.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2 pl-8">
                            {skill.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400"
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
                <div className="mt-4 pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500">
                  <span>{category.skills.length} skills</span>
                  <span className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Recruiter Ready
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
