"use client";

import { skillsData } from "@/data/skills";
import { useLanguage } from "@/context/LanguageContext";
import { SKILLS_TRANSLATIONS } from "@/data/translations";

export default function SkillsGrid() {
  const { locale } = useLanguage();
  const t = SKILLS_TRANSLATIONS[locale];
  const categories = t.itemsEn || skillsData;

  return (
    <section id="competencias" className="scroll-mt-20 py-24 border-b border-surface-borderSubtle bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-surface-borderSubtle">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
              <span>{t.eyebrow}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
              {t.title}
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 font-normal leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Balanced 6-Col Bento Grid (Top 3 = 2 cols each, Bottom 2 = 3 cols each -> zero orphan gap) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 pt-12">
          {categories.map((category, idx) => {
            const colSpanClass =
              idx < 3 ? "lg:col-span-2" : "lg:col-span-3";
            return (
              <div
                key={category.category}
                className={`${colSpanClass} p-7 sm:p-8 border border-surface-border bg-neutral-950/70 hover:border-[#13E1BC]/50 transition-colors flex flex-col justify-between space-y-6 group`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <h3 className="text-base sm:text-lg font-medium text-white tracking-tight group-hover:text-[#13E1BC] transition-colors">
                      {category.category}
                    </h3>
                    <span className="text-xs font-mono text-neutral-400">
                      [0{category.skills.length}]
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Skill items */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 group-hover:border-neutral-700 transition-colors rounded-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
