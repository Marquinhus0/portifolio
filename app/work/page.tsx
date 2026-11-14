"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import CaseCard from "@/components/CaseCard";
import { casesData } from "@/data/cases";

type FilterOption = "Todos" | "B2B & Enterprise" | "Consumer & Mídia" | "Sandbox Live";

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

export default function WorkPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("Todos");

  const filteredCases = casesData.filter((cs) => {
    if (selectedFilter === "B2B & Enterprise") return B2B_SLUGS.has(cs.slug);
    if (selectedFilter === "Consumer & Mídia") return !B2B_SLUGS.has(cs.slug);
    if (selectedFilter === "Sandbox Live") return INTERACTIVE_SLUGS.has(cs.slug);
    return true;
  });

  const filters: { label: FilterOption; count: number }[] = [
    { label: "Todos", count: casesData.length },
    {
      label: "B2B & Enterprise",
      count: casesData.filter((c) => B2B_SLUGS.has(c.slug)).length,
    },
    {
      label: "Consumer & Mídia",
      count: casesData.filter((c) => !B2B_SLUGS.has(c.slug)).length,
    },
    {
      label: "Sandbox Live",
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
            <span>[Índice de Projetos]</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-white uppercase leading-none">
            Projetos selecionados
          </h1>
          <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed pt-2">
            Estudos de caso de Product Design e UX para softwares de gestão, plataformas B2B e mídia interativa, com documentação de arquitetura e protótipos funcionais.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-surface-borderSubtle">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest mr-2">
              Filtrar por:
            </span>
            {filters.map((f) => (
              <button
                key={f.label}
                type="button"
                onClick={() => setSelectedFilter(f.label)}
                className={`px-3.5 py-1.5 text-xs font-mono transition-all rounded-sm flex items-center gap-2 ${
                  selectedFilter === f.label
                    ? "bg-[#13E1BC] text-[#080808] font-semibold shadow-[0_0_15px_rgba(19,225,188,0.25)]"
                    : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
                }`}
              >
                <span>{f.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-sm ${
                    selectedFilter === f.label
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
            Exibindo {filteredCases.length} de {casesData.length} cases
          </span>
        </div>

        {/* Cases Grid */}
        <section className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCases.map((cs, idx) => (
              <CaseCard
                key={cs.id}
                caseStudy={cs}
                priority={idx < 2}
                horizontal={filteredCases.length % 2 === 1 && idx === filteredCases.length - 1}
              />
            ))}
          </div>
        </section>

        {/* Corporate ERP Experience Callout */}
        <section className="pt-4">
          <div className="p-8 border border-surface-border border-l-2 border-l-[#13E1BC] bg-neutral-950/90 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#13E1BC] uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                <span>Experiência Profissional em Produção • ALFA Software</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                Sistemas ERP, Compras, Vendas, Financeiro &amp; Estoque (2020 — Presente)
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Por questões de confidencialidade corporativa (NDA), telas internas de produção com dados reais não são expostas diretamente — o Case [05] demonstra a arquitetura Antes/Depois com dados anonimizados, além das 15+ implantações B2B detalhadas em Sobre e no Currículo.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-neutral-800 bg-neutral-900 text-white hover:border-[#13E1BC] hover:text-[#13E1BC] text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <span>Ver Trajetória</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-black hover:bg-[#13E1BC] text-xs font-mono font-semibold uppercase tracking-wider transition-colors"
              >
                <span>Currículo / CV</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
