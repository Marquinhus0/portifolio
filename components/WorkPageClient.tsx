"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import CaseCard from "@/components/CaseCard";
import { casesData } from "@/data/cases";
import { useLanguage } from "@/context/LanguageContext";
import { WORK_PAGE_TRANSLATIONS } from "@/data/translations";

type FilterKey = "all" | "b2b" | "consumer" | "live";

const INTERACTIVE_SLUGS = new Set([
  "supplyhub-procurement-b2b",
  "flow-crm-b2b",
  "frame-interactive-video",
  "erp-enterprise-redesign",
]);

const B2B_SLUGS = new Set([
  "flow-crm-b2b",
  "supplyhub-procurement-b2b",
  "erp-enterprise-redesign",
]);

export default function WorkPageClient() {
  const [selectedFilter, setSelectedFilter] = useState<FilterKey>("all");
  const { locale } = useLanguage();
  const t = WORK_PAGE_TRANSLATIONS[locale];

  const filteredCases = casesData.filter((cs) => {
    if (selectedFilter === "b2b") return B2B_SLUGS.has(cs.slug);
    if (selectedFilter === "consumer") return !B2B_SLUGS.has(cs.slug);
    if (selectedFilter === "live") return INTERACTIVE_SLUGS.has(cs.slug);
    return true;
  });

  const filters: { key: FilterKey; label: string; count: number }[] = [
    { key: "all", label: t.filters.all, count: casesData.length },
    {
      key: "b2b",
      label: t.filters.b2b,
      count: casesData.filter((c) => B2B_SLUGS.has(c.slug)).length,
    },
    {
      key: "consumer",
      label: t.filters.consumer,
      count: casesData.filter((c) => !B2B_SLUGS.has(c.slug)).length,
    },
    {
      key: "live",
      label: t.filters.live,
      count: casesData.filter((c) => INTERACTIVE_SLUGS.has(c.slug)).length,
    },
  ];

  return (
    <div className="py-16 md:py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-surface-borderSubtle pb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
            <span>{t.eyebrow}</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-white uppercase leading-none">
            {t.title}
          </h1>
          <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed pt-2">
            {t.subtitle}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-surface-borderSubtle">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest mr-2">
              {t.filterLabel}
            </span>
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setSelectedFilter(f.key)}
                className={`px-3.5 py-1.5 text-xs font-mono transition-all rounded-sm flex items-center gap-2 ${
                  selectedFilter === f.key
                    ? "bg-[#13E1BC] text-[#080808] font-semibold shadow-[0_0_15px_rgba(19,225,188,0.25)]"
                    : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
                }`}
              >
                <span>{f.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-sm ${
                    selectedFilter === f.key
                      ? "bg-[#080808]/20 text-[#080808]"
                      : "bg-neutral-900 text-neutral-500"
                  }`}
                >
                  {f.count}
                </span>
              </button>
            ))}
          </div>
          <span className="text-xs font-mono text-neutral-500">
            {t.showing(filteredCases.length, casesData.length)}
          </span>
        </div>

        {/* Cases Separated by Real Product vs Authorial Studies */}
        {(() => {
          const realCases = filteredCases.filter((c) => c.category === "real_product");
          const authorialCases = filteredCases.filter((c) => c.category !== "real_product");
          return (
            <div className="space-y-12">
              {realCases.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#13E1BC]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      {locale === "en"
                        ? "Real Production Experience • ALFA Software (NDA-Safe)"
                        : "Experiência Profissional Real • ALFA Software (NDA-Safe)"}
                    </span>
                  </div>
                  <div className="space-y-6">
                    {realCases.map((cs) => (
                      <CaseCard key={cs.id} caseStudy={cs} priority={true} horizontal={true} />
                    ))}
                  </div>
                </section>
              )}

              {authorialCases.length > 0 && (
                <section className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">
                      {locale === "en"
                        ? "Authorial Case Studies & Interactive Prototypes (Synthetic Data)"
                        : "Estudos Autorais & Protótipos Interativos (Dados Sintéticos)"}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">
                      {locale === "en"
                        ? "Conceptual metrics highlighted separately from production evidence"
                        : "Metas conceituais separadas de evidências em produção"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {authorialCases.map((cs, idx) => (
                      <CaseCard
                        key={cs.id}
                        caseStudy={cs}
                        priority={idx < 2}
                        horizontal={authorialCases.length % 2 === 1 && idx === authorialCases.length - 1}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          );
        })()}

        {/* Next Step Callout: Decision Lab & Resume */}
        <section className="pt-4">
          <div className="p-8 border border-surface-border border-l-2 border-l-[#13E1BC] bg-neutral-950/90 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#13E1BC] uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {locale === "en" ? "Product Thinking & Career Track" : "Raciocínio de Produto & Trajetória"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                {locale === "en"
                  ? "Inspect Trade-offs in the Decision Lab or Download CV"
                  : "Explore Trade-offs no Decision Lab ou Acesse o Currículo"}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {locale === "en"
                  ? "Review interactive ERP diagnostic scenarios (diagnostic -> P0/P1/P2 -> QA contracts) or inspect the technical resume."
                  : "Explore cenários didáticos de diagnóstico ERP (priorização P0/P1/P2, fluxos As-Is/To-Be e contratos QA) ou consulte o histórico completo."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/decision-lab"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-black hover:bg-[#13E1BC] text-xs font-mono font-semibold uppercase tracking-wider transition-colors"
              >
                <span>{locale === "en" ? "Open Decision Lab" : "Abrir Decision Lab"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-neutral-800 bg-neutral-900 text-white hover:border-[#13E1BC] hover:text-[#13E1BC] text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <span>{locale === "en" ? "Resume / CV" : "Currículo / CV"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
