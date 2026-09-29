import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import IntroStatement from "@/components/IntroStatement";
import CaseCard from "@/components/CaseCard";
import SkillsGrid from "@/components/SkillsGrid";
import PhilosophyBlock from "@/components/PhilosophyBlock";
import ContactBlock from "@/components/ContactBlock";
import { casesData } from "@/data/cases";

export default function Home() {
  const realProjects = casesData.filter((c) => !c.isConcept);
  const conceptualProjects = casesData.filter((c) => c.isConcept);

  return (
    <div>
      {/* 01. Hero Section */}
      <Hero />

      {/* 02. Positioning Statement */}
      <IntroStatement />

      {/* 03 & 04. Selected Work: Real Products & Conceptual Products */}
      <section
        id="selected-work"
        className="py-24 border-b border-surface-borderSubtle bg-background"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20">
          {/* Main Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-surface-borderSubtle">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                [Casos de Estudo & Experiência]
              </span>
              <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
                Projetos selecionados
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-mono text-neutral-400">
              <span>Projetos reais de mercado e estudos autorais de produto</span>
              <Link
                href="/work"
                className="inline-flex items-center gap-1 text-white hover:text-neutral-300 transition-colors uppercase tracking-wider"
              >
                <span>Ver todos os cases</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* ============================================================= */}
          {/* REAL PRODUCTS SUBSECTION                                      */}
          {/* ============================================================= */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-850">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight uppercase">
                  Real Products
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded">
                  Experiência Profissional Real
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400">
                Soluções validadas com operadores, regras fiscais ativas e impacto direto no negócio
              </p>
            </div>

            {/* Real Projects Grid */}
            <div className="grid grid-cols-1 gap-8">
              {realProjects.map((cs) => (
                <CaseCard key={cs.id} caseStudy={cs} priority />
              ))}
            </div>
          </div>

          {/* ============================================================= */}
          {/* CONCEPTUAL PRODUCTS SUBSECTION                                */}
          {/* ============================================================= */}
          <div className="space-y-8 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-850">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
                <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight uppercase">
                  Conceptual Products
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 bg-white text-black font-semibold rounded">
                  CONCEPT
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400">
                Explorações aprofundadas em arquitetura de informação, interfaces contextuais e produtos escaláveis
              </p>
            </div>

            {/* Conceptual Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {conceptualProjects.map((cs) => (
                <CaseCard key={cs.id} caseStudy={cs} />
              ))}
            </div>
          </div>

          {/* Recruiter Transparency Notice */}
          <div className="p-6 border border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <div className="space-y-1">
              <span className="text-white block uppercase tracking-wider">
                Documentação Detalhada
              </span>
              <p>
                Cada projeto conta com documentação completa: do entendimento do problema aos testes de usabilidade e entrega técnica.
              </p>
            </div>
            <Link
              href="/work/alfa-erp-automotive-redesign"
              className="px-4 py-2 border border-neutral-700 bg-neutral-900 text-white hover:bg-white hover:text-black transition-colors uppercase tracking-wider shrink-0"
            >
              Explorar Case ALFA ERP →
            </Link>
          </div>
        </div>
      </section>

      {/* 06. Competências */}
      <SkillsGrid />

      {/* 08. Filosofia de Design */}
      <PhilosophyBlock />

      {/* 09. Contato */}
      <ContactBlock />
    </div>
  );
}
