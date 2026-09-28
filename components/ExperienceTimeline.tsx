import { experienceData } from "@/data/experience";

export default function ExperienceTimeline() {
  return (
    <section className="py-24 border-b border-surface-borderSubtle bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-surface-borderSubtle">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
              <span>[Trajetória Profissional]</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
              Experiência
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 font-normal leading-relaxed">
            Vivência sólida no desenvolvimento de sistemas complexos, da análise
            de regras de negócio de ERP ao design de produto de ponta a ponta.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="divide-y divide-surface-borderSubtle mt-8">
          {experienceData.map((item) => (
            <div
              key={`${item.company}-${item.period}`}
              className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group"
            >
              {/* Period & Domain */}
              <div className="lg:col-span-3 space-y-1">
                <span className="text-xs font-mono text-neutral-400 block uppercase tracking-wider">
                  {item.period}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {item.domain}
                </span>
              </div>

              {/* Role & Company */}
              <div className="lg:col-span-4 space-y-2">
                <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight group-hover:text-[#13E1BC] transition-colors">
                  {item.role}
                </h3>
                <p className="text-sm font-mono text-neutral-300">
                  {item.company}
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed pt-2">
                  {item.description}
                </p>
              </div>

              {/* Responsibilities & Impacts */}
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block">
                    Responsabilidades:
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {item.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-neutral-600 select-none">—</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impacts slot */}
                <div className="space-y-1 pt-2 border-t border-neutral-900">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block">
                    Resultados & Impacto:
                  </span>
                  <ul className="space-y-1 text-xs text-neutral-400 font-mono">
                    {item.impacts.map((imp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#13E1BC] select-none font-bold">›</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
