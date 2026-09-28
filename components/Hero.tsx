import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function Hero() {
  const tags = [
    "Product Design",
    "UX/UI",
    "B2B SaaS",
    "Gestão & ERP",
    "Discovery",
    "Design System",
  ];

  return (
    <section className="relative pt-20 pb-20 md:pt-28 md:pb-28 border-b border-surface-borderSubtle overflow-hidden">
      {/* Subtle brand ambient glow */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[#13E1BC]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Context Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-10 border-b border-surface-borderSubtle/60 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#13E1BC] shadow-[0_0_8px_#13E1BC]" />
            <span>Marcus Ritta</span>
            <span className="text-neutral-600">—</span>
            <span>Product Designer</span>
          </div>
          <div className="text-neutral-500 uppercase tracking-wider text-[11px]">
            Sistemas de Gestão • B2B SaaS • ERP
          </div>
        </div>

        {/* Big Typography Display */}
        <div className="pt-10 pb-8 space-y-6">
          <div className="space-y-3">
            <p className="text-xs sm:text-sm font-mono tracking-widest text-[#13E1BC] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
              <span>Marcus Ritta // Portfolio</span>
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white uppercase leading-[0.95]">
              Product Designer
              <br />
              <span className="text-neutral-400 font-light text-3xl sm:text-5xl md:text-6xl lg:text-7xl block pt-2">
                for Complex Digital Products
              </span>
            </h1>
          </div>

          {/* Primary & Supporting Positioning Statements */}
          <div className="max-w-3xl pt-2 space-y-3">
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-200 leading-snug tracking-tight">
              &ldquo;Simplifico ferramentas de trabalho e softwares de gestão para quem usa no dia a dia.&rdquo;
            </p>
            <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-2xl">
              Product Design, UX e Discovery com foco em plataformas B2B, SaaS e rotinas com grande volume de dados.
            </p>
          </div>
        </div>

        {/* Tags bar & Actions */}
        <div className="pt-8 border-t border-surface-borderSubtle/60 flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-mono text-neutral-300 bg-neutral-900 border border-surface-border rounded-sm tracking-tight hover:border-[#13E1BC]/50 hover:text-[#13E1BC] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Primary and Secondary CTAs */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="#selected-work"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-[#13E1BC] transition-colors group px-4 py-2.5 border border-surface-border bg-neutral-950 hover:border-[#13E1BC]/60"
            >
              <span>Ver Projetos</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-5 py-2.5 bg-white text-black font-medium hover:bg-[#13E1BC] hover:text-black transition-colors"
            >
              <span>Entrar em Contato</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
