import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { CaseStudy } from "@/types";
import CaseCardVisual from "./CaseCardVisual";

interface CaseCardProps {
  caseStudy: CaseStudy;
  priority?: boolean;
}

export default function CaseCard({ caseStudy }: CaseCardProps) {
  const isReal = !caseStudy.isConcept;
  const hasInteractiveApp = [
    "alfa-erp-automotive-redesign",
    "supplyhub-procurement-b2b",
    "flow-crm-b2b",
    "frame-interactive-video",
  ].includes(caseStudy.slug);

  return (
    <article className="group relative border border-surface-border bg-neutral-950/80 hover:border-[#13E1BC]/60 hover:shadow-[0_0_25px_rgba(19,225,188,0.07)] hover:bg-neutral-950 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* 01. Top Header: Number, Type, Category */}
      <div className="p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between font-mono text-xs border-b border-surface-borderSubtle pb-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium tracking-wider">
              [{caseStudy.number}]
            </span>
            {isReal ? (
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-[#13E1BC]/15 text-[#13E1BC] border border-[#13E1BC]/30 font-semibold rounded-sm">
                REAL PRODUCT
              </span>
            ) : (
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-white text-black font-semibold rounded-sm">
                CONCEPT
              </span>
            )}
            {hasInteractiveApp && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-neutral-900 border border-[#13E1BC]/30 text-[#13E1BC] rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC] animate-pulse shadow-[0_0_6px_#13E1BC]" />
                <span className="font-semibold">App Live</span>
              </span>
            )}
          </div>
          <span className="uppercase tracking-widest text-[11px] text-neutral-400 font-mono">
            {caseStudy.category.split("/")[0].trim()}
          </span>
        </div>

        {/* Title & Short Problem / Description */}
        <div className="space-y-2 pt-1">
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white group-hover:text-[#13E1BC] transition-colors">
            <Link
              href={`/work/${caseStudy.slug}`}
              className="focus:outline-none after:absolute after:inset-0"
            >
              {caseStudy.title}
            </Link>
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-2">
            {caseStudy.subtitle}
          </p>
        </div>
      </div>

      {/* 02. Large Project Visual */}
      <div className="px-6 sm:px-7 pb-6">
        <div className="overflow-hidden border border-neutral-800 rounded-sm transition-transform duration-500 group-hover:scale-[1.01] shadow-lg">
          <CaseCardVisual
            slug={caseStudy.slug}
            title={caseStudy.title}
            category={caseStudy.category}
            coverImage={caseStudy.coverImage}
          />
        </div>
      </div>

      {/* 03. Disciplines / Tags Bar */}
      <div className="px-6 sm:px-7 pb-5 flex flex-wrap gap-1.5">
        {caseStudy.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[10px] sm:text-[11px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 rounded-sm group-hover:border-neutral-700 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 04. Bottom Action Footer */}
      <div className="px-6 sm:px-7 py-3.5 border-t border-surface-borderSubtle flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white transition-colors bg-neutral-900/40">
        <span className="uppercase tracking-wider font-medium text-white group-hover:text-[#13E1BC] transition-colors flex items-center gap-1.5">
          <span>Ver Case {hasInteractiveApp && "& Sandbox Live"}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#13E1BC] transition-transform duration-200 group-hover:translate-x-1" />
        </span>
        <div className="flex items-center gap-1.5 text-neutral-500 group-hover:text-neutral-300">
          <span className="text-[11px]">
            {isReal ? "[Experiência Profissional]" : "[Estudo Autoral]"}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#13E1BC] transition-colors" />
        </div>
      </div>
    </article>
  );
}
