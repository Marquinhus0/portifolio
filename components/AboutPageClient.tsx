"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import DesignSystemShowcase from "@/components/DesignSystemShowcase";
import PhilosophyBlock from "@/components/PhilosophyBlock";
import ContactBlock from "@/components/ContactBlock";
import { useLanguage } from "@/context/LanguageContext";

const SPECIALTIES = {
  pt: [
    {
      code: "ERP // PDV",
      title: "ERPs & Operações de Alta Densidade",
      desc: "Especialista em fluxos de balcão de vendas, estoque, compras e emissão fiscal. Foco em interfaces velozes, tabelas com milhares de itens e usabilidade zero-mouse para quem trabalha sob pressão operacional.",
    },
    {
      code: "B2B // SAAS",
      title: "CRM Comercial & Funis B2B",
      desc: "Estruturação de pipelines Kanban, canais de comunicação integrados (WhatsApp, e-mail, ligações), alçadas de desconto por margem e métricas comerciais claras.",
    },
    {
      code: "DESIGN SYSTEM",
      title: "Design Systems Corporativos",
      desc: "Arquitetura de componentes densos, tokens semânticos, estados de erro rigorosos e acessibilidade via teclado, conectando Figma diretamente a bibliotecas React.",
    },
    {
      code: "REACT // CODE",
      title: "Prototipação Interativa em Código",
      desc: "Construção de sandboxes funcionais em React e TypeScript para validar performance, layout e fluxos reais antes do handoff, eliminando atrito com times de engenharia.",
    },
  ],
  en: [
    {
      code: "ERP // POS",
      title: "High-Density ERPs & Operations",
      desc: "Specialist in point-of-sale counters, warehouse inventory, purchasing, and tax invoicing—designing fast data tables and keyboard-first ergonomics for daily operators.",
    },
    {
      code: "B2B // SAAS",
      title: "Commercial CRM & B2B Funnels",
      desc: "Structuring Kanban sales pipelines, omnichannel workflows, margin-based discount approval tiers, and actionable revenue telemetry.",
    },
    {
      code: "DESIGN SYSTEM",
      title: "Enterprise Design Systems",
      desc: "High-density component architecture, semantic status tokens, thorough error handling, and keyboard accessibility linking Figma directly to React.",
    },
    {
      code: "REACT // CODE",
      title: "Live Code Prototyping",
      desc: "Building interactive React and TypeScript sandboxes to validate density, keyboard contracts, and edge cases ahead of engineering handoff.",
    },
  ],
};

export default function AboutPageClient() {
  const { locale } = useLanguage();
  const isEn = locale === "en";
  const coreSpecialties = SPECIALTIES[locale];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-20 border-b border-surface-borderSubtle bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
            <span>{isEn ? "[About Marcus Ritta]" : "[Sobre Marcus Ritta]"}</span>
          </span>
          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-white uppercase leading-none">
              Marcus Ritta
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 font-light leading-relaxed">
              {isEn
                ? "Product Designer with hands-on experience across transactional systems, dense information architecture, and enterprise B2B software—bridging operational reality, business strategy, and front-end execution."
                : "Product Designer com sólida experiência em sistemas transacionais, arquitetura de informação complexa e produtos enterprise. Conecto a realidade operacional de quem usa o software à estratégia de negócio e à viabilidade técnica da engenharia."}
            </p>
          </div>

          {/* Verifiable LinkedIn & Credentials Callout (No fabricated testimonials) */}
          <div className="pt-4">
            <div className="p-5 sm:p-6 border border-surface-border bg-neutral-950/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3 text-xs font-mono text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-[#13E1BC] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-white uppercase tracking-wider font-medium block">
                    {isEn
                      ? "Verifiable Track Record & Recommendations"
                      : "Trajetória & Referências Verificáveis"}
                  </span>
                  <p className="text-neutral-400 leading-relaxed">
                    {isEn
                      ? "Full career timeline, 15+ ERP rollouts at ALFA Software, and verified peer recommendations are available directly on LinkedIn and on the PDF Resume."
                      : "Histórico completo, 15+ implantações de ERP na ALFA Software e referências verificáveis diretamente no LinkedIn e no Currículo PDF."}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono text-xs">
                <a
                  href="https://linkedin.com/in/marcusritta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#13E1BC] text-[#080808] font-semibold uppercase tracking-wider hover:bg-[#0db899] transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-800 bg-neutral-900 text-white hover:border-[#13E1BC] hover:text-[#13E1BC] uppercase tracking-wider transition-colors"
                >
                  <span>{isEn ? "View Resume" : "Ver Currículo"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-20 border-b border-surface-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] block">
                {isEn ? "[My Approach]" : "[Minha Abordagem]"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
                {isEn
                  ? "Design forged in daily operational reality."
                  : "Design forjado na realidade da operação."}
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6 text-neutral-300 leading-relaxed text-base sm:text-lg font-light">
              <p>
                {isEn
                  ? "My product career did not start by drawing isolated Dribbble concepts—it started inside real operations: busy distribution centers, tight purchasing desks, fiscal reconciliations, and sales teams who cannot afford slow or confusing software."
                  : "Minha experiência em produtos não nasceu desenhando telas conceituais isoladas, mas sim entendendo o cotidiano de operações complexas: centros de distribuição dinâmicos, rotinas de compras sob pressão de prazos, conciliações fiscais e equipes comerciais que não podem perder tempo com burocracia ou interfaces confusas."}
              </p>
              <p>
                {isEn
                  ? "In mission-critical software, the best interface gets out of the user's way: instant keyboard ergonomics, explicit error prevention, clear visual hierarchy across dense records, and strict alignment with business rules."
                  : "Acredito que em software de missão crítica, a melhor interface é aquela que quase desaparece: responde instantaneamente a atalhos de teclado, antecipa erros com clareza, organiza milhares de registros sem poluição visual e respeita as regras de negócio sem engessar a operação."}
              </p>
              <p className="text-sm font-mono text-neutral-400 border-l-2 border-[#13E1BC] pl-4 py-1">
                &ldquo;
                {isEn
                  ? "I connect real user discovery, fiscal and commercial constraints, and React front-end collaboration."
                  : "Trabalho conectando discovery com usuários de verdade, especificações tributárias e comerciais com engenharia front-end em React."}
                &rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Focus Areas */}
      <section className="py-20 border-b border-surface-borderSubtle bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-surface-borderSubtle">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
                <span>{isEn ? "[Core Specialties]" : "[Especialidades Principais]"}</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
                {isEn ? "Where I drive the most impact" : "Onde gero maior impacto"}
              </h2>
            </div>
            <p className="text-xs font-mono text-neutral-400 max-w-sm">
              {isEn
                ? "Mature practice across mission-critical B2B and enterprise applications"
                : "Competências maduras em softwares de missão crítica e produtos corporativos"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreSpecialties.map((spec) => (
              <div
                key={spec.code}
                className="p-8 border border-surface-border bg-neutral-950 flex flex-col justify-between space-y-6 hover:border-[#13E1BC]/50 hover:shadow-[0_0_20px_rgba(19,225,188,0.06)] transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
                    <span className="font-mono text-xs text-neutral-400 group-hover:text-[#13E1BC] transition-colors">
                      [{spec.code}]
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC] shadow-[0_0_6px_#13E1BC]" />
                  </div>
                  <h3 className="text-xl font-medium text-white tracking-tight">
                    {spec.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                    {spec.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive B2B Design System & Tokens Specimen */}
      <DesignSystemShowcase />

      {/* Experience Timeline */}
      <ExperienceTimeline />

      {/* Philosophy */}
      <PhilosophyBlock />

      {/* Contact */}
      <ContactBlock />
    </div>
  );
}
