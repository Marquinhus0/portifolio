"use client";

import { useState } from "react";
import CaseCard from "@/components/CaseCard";
import { casesData } from "@/data/cases";

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const realProjects = casesData.filter((c) => !c.isConcept);
  const conceptualProjects = casesData.filter((c) => c.isConcept);

  const categories = ["Todos", "Real Products", "Conceptual Products"];

  const showReal = selectedCategory === "Todos" || selectedCategory === "Real Products";
  const showConceptual = selectedCategory === "Todos" || selectedCategory === "Conceptual Products";

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-surface-borderSubtle pb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
            <span>[Índice de Projetos]</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-white uppercase leading-none">
            Projetos selecionados
          </h1>
          <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed pt-2">
            Estudos de caso de Product Design e UX para softwares de gestão, ERPs e ferramentas de trabalho, divididos entre atuação profissional e projetos autorais.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-surface-borderSubtle">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest mr-2">
            Visualizar:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-mono transition-all rounded-sm ${
                selectedCategory === cat
                  ? "bg-[#13E1BC] text-black font-semibold shadow-[0_0_15px_rgba(19,225,188,0.25)]"
                  : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Real Products Section */}
        {showReal && (
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-850">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#13E1BC] shadow-[0_0_8px_#13E1BC]" />
                <h2 className="text-xl sm:text-2xl font-medium text-white tracking-tight uppercase">
                  Real Products
                </h2>
                <span className="text-xs font-mono px-2 py-0.5 bg-[#13E1BC]/15 border border-[#13E1BC]/30 text-[#13E1BC] rounded font-medium">
                  Experiência Profissional
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400">
                Atuação corporativa com requisitos reais, regras de negócio e validação contínua
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {realProjects.map((cs) => (
                <CaseCard key={cs.id} caseStudy={cs} priority />
              ))}
            </div>
          </section>
        )}

        {/* Conceptual Products Section */}
        {showConceptual && (
          <section className="space-y-8 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-850">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
                <h2 className="text-xl sm:text-2xl font-medium text-white tracking-tight uppercase">
                  Conceptual Products
                </h2>
                <span className="text-xs font-mono px-2 py-0.5 bg-white text-black font-semibold rounded">
                  CONCEPT
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400">
                Estudos autorais de exploração de produto, UX e sistemas digitais
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {conceptualProjects.map((cs) => (
                <CaseCard key={cs.id} caseStudy={cs} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
