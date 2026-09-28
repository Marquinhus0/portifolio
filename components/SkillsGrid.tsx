import { skillsData } from "@/data/skills";

export default function SkillsGrid() {
  return (
    <section className="py-24 border-b border-surface-borderSubtle bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-surface-borderSubtle">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              [Domínio & Ferramentas]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
              Competências
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 font-normal leading-relaxed">
            Habilidades e ferramentas organizadas por área, com foco em softwares de gestão, plataformas B2B e rotinas de trabalho.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {skillsData.map((category) => (
            <div
              key={category.category}
              className="p-8 border border-surface-border bg-neutral-950/60 hover:border-neutral-500 transition-colors flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="text-lg font-medium text-white tracking-tight">
                    {category.category}
                  </h3>
                  <span className="text-xs font-mono text-neutral-400">
                    [{category.skills.length}]
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
                    className="px-2.5 py-1 text-xs font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-colors rounded-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
