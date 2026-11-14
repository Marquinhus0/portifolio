"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Compass,
  Users,
  Layers,
  CheckCircle2,
  ClipboardList,
  Figma,
  FileCheck2,
  BookOpen,
} from "lucide-react";
import { CaseStudy } from "@/types";
import ErpBeforeAfterShowcase from "./ErpBeforeAfterShowcase";
import { useLanguage } from "@/context/LanguageContext";

interface ErpEnterpriseCaseStudyProps {
  caseStudy: CaseStudy;
  nextCase: CaseStudy;
  prevCase: CaseStudy;
}

export default function ErpEnterpriseCaseStudy({
  caseStudy,
  nextCase,
  prevCase,
}: ErpEnterpriseCaseStudyProps) {
  const [activeNav, setActiveNav] = useState("overview");
  const { locale } = useLanguage();
  const isEn = locale === "en";

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -124;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "overview", label: "01. Overview" },
    { id: "sandbox", label: isEn ? "02. Before & After (NDA-Safe)" : "02. Antes & Depois (NDA-Safe)" },
    { id: "contexto", label: isEn ? "03. Field & Problem" : "03. Campo & Problema" },
    { id: "metodo", label: isEn ? "04. Feedback → Figma Method" : "04. Método Feedback → Figma" },
    { id: "resultados", label: isEn ? "05. Outcomes & Impact" : "05. Entregas & Impacto" },
  ];

  const workflowSteps = isEn
    ? [
        {
          step: "01",
          title: "Field & Go-Live Observation",
          icon: Users,
          detail:
            "Direct discovery across 15+ B2B ERP implementations covering Purchasing, Sales, Inventory, and Finance with real counter and billing operators.",
        },
        {
          step: "02",
          title: "Official Feedback Framework",
          icon: ClipboardList,
          detail:
            "Built a structured framework to log production usability friction and business rules—later adopted as the company's official standard.",
        },
        {
          step: "03",
          title: "Figma Componentization & Docs",
          icon: Figma,
          detail:
            "Navigable interactive prototypes, illustrated specs, and standardized Figma component libraries to speed up consistent screen delivery.",
        },
        {
          step: "04",
          title: "Acceptance Criteria, QA & Training",
          icon: FileCheck2,
          detail:
            "Ongoing alignment with PMs and engineers, functional QA reviews pre-release, and visual user guides reducing team learning curves.",
        },
      ]
    : [
        {
          step: "01",
          title: "Observação em Go-Live & Campo",
          icon: Users,
          detail:
            "Levantamento direto durante 15+ implantações de ERP B2B nos módulos de Compras, Vendas, Estoque e Financeiro, observando operadores reais sob pressão de balcão e faturamento.",
        },
        {
          step: "02",
          title: "Método Oficial de Coleta de Feedbacks",
          icon: ClipboardList,
          detail:
            "Estruturação de método proprietário para registrar fricções de usabilidade e regras de negócio em produção — modelo posteriormente adotado como padrão oficial da empresa.",
        },
        {
          step: "03",
          title: "Componentização Figma & Documentação",
          icon: Figma,
          detail:
            "Wireframes, protótipos interativos navegáveis e bibliotecas de componentes padronizadas para acelerar a criação de novas telas com consistência visual.",
        },
        {
          step: "04",
          title: "Critérios de Aceite, QA & Base Visual",
          icon: FileCheck2,
          detail:
            "Validação contínua junto a PMs e engenharia, testes funcionais com perspectiva de QA antes da entrega e publicação de guias visuais e treinamentos para reduzir a curva de aprendizado.",
        },
      ];

  return (
    <article className="bg-[#080808] text-white min-h-screen font-sans antialiased">
      {/* Top Breadcrumb */}
      <div className="border-b border-surface-borderSubtle bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-12 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isEn ? "Back to all cases" : "Voltar para todos os cases"}</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-[#13E1BC]/15 text-[#13E1BC] border border-[#13E1BC]/30 font-semibold rounded-sm">
              REAL PRODUCT
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-neutral-900 text-neutral-300 border border-neutral-700 font-semibold rounded-sm">
              NDA-SAFE
            </span>
            <span className="text-white font-medium">[{caseStudy.number}]</span>
          </div>
        </div>
      </div>

      {/* Sticky Subnav */}
      <nav
        aria-label="Seções do estudo de caso ERP"
        className="sticky top-16 z-30 bg-[#080808]/95 backdrop-blur-md border-b border-surface-borderSubtle py-2.5 px-6 sm:px-8 overflow-x-auto scrollbar-none"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-mono min-w-max">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-1.5 rounded-sm transition-colors ${
                activeNav === item.id
                  ? "bg-[#13E1BC] text-[#080808] font-semibold"
                  : "text-neutral-400 hover:text-[#13E1BC] hover:bg-neutral-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 01. Hero */}
      <section id="overview" className="pt-14 pb-16 border-b border-surface-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          <div className="space-y-5 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-[#13E1BC] uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {isEn
                    ? "Real Production Track Record // ALFA Software (NDA-Safe)"
                    : "Atuação Profissional Real // ALFA Software (NDA-Safe)"}
                </span>
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-white leading-tight">
              {isEn
                ? "Enterprise B2B ERP — Architecture & Before/After (NDA-Safe)"
                : caseStudy.title}
            </h1>
            <p className="text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed">
              {isEn
                ? "Evolution of mission-critical Purchasing, Sales, Inventory, and Billing workflows combining 15+ field rollouts and standardized Product Design."
                : caseStudy.subtitle}
            </p>
          </div>

          {/* NDA Transparency Box */}
          <div className="p-5 border border-[#13E1BC]/30 bg-[#13E1BC]/[0.04] flex items-start gap-3 text-xs font-mono text-neutral-300">
            <ShieldCheck className="w-4 h-4 text-[#13E1BC] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-white uppercase tracking-wider">
                {isEn
                  ? "Transparency & Confidentiality (NDA):"
                  : "Transparência & Confidencialidade (NDA):"}
              </strong>{" "}
              {isEn ? (
                <>
                  Out of commercial confidentiality, internal screens containing real customer data or proprietary infrastructure are never exposed verbatim. The sandbox below presents an{" "}
                  <span className="text-[#13E1BC]">anonymized structural reconstruction</span>{" "}
                  based on real friction patterns and architecture decisions applied across Purchasing, Sales, and Inventory.
                </>
              ) : (
                <>
                  Por sigilo comercial, telas internas com dados de clientes reais e infraestrutura proprietária não são publicadas literalmente. O comparador abaixo apresenta uma{" "}
                  <span className="text-[#13E1BC]">reconstrução estrutural anonimizada</span>{" "}
                  baseada nos padrões reais de atrito e soluções de arquitetura aplicadas em Compras, Vendas e Estoque.
                </>
              )}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-surface-borderSubtle text-xs font-mono">
            <div className="space-y-1">
              <span className="text-neutral-400 block uppercase tracking-wider">Papel &amp; Atuação</span>
              <p className="text-neutral-200">{caseStudy.role}</p>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-400 block uppercase tracking-wider">Período</span>
              <p className="text-neutral-200">{caseStudy.year}</p>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-400 block uppercase tracking-wider">Contexto</span>
              <p className="text-neutral-200">{caseStudy.company}</p>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-400 block uppercase tracking-wider">Escopo</span>
              <p className="text-neutral-200">{caseStudy.duration}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {caseStudy.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 02. Interactive NDA-Safe Before/After Sandbox */}
      <section id="sandbox" className="py-16 border-b border-surface-borderSubtle bg-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-6">
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-mono text-[#13E1BC] uppercase tracking-widest block">
              {isEn ? "02 — Anonymized Before/After Prototype" : "02 — Protótipo Comparativo Anonimizado"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-medium text-white tracking-tight">
              {isEn
                ? "Dense Legacy UI vs. Interactive Modular Architecture"
                : "Legado Denso vs. Arquitetura Modular Interativa"}
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {isEn
                ? 'Switch between "Antes (Legado)" and "Depois (Redesign)" across the 3 core ERP modules to test how visual hierarchy and Progressive Disclosure streamline daily operations.'
                : 'Alterne entre "Antes (Legado)" e "Depois (Redesign)" nos 3 módulos vitais para testar como a hierarquia visual e o Progressive Disclosure transformam fluxos operacionais diários.'}
            </p>
          </div>

          <ErpBeforeAfterShowcase />
        </div>
      </section>

      {/* 03. Contexto & Problema */}
      <section id="contexto" className="py-20 border-b border-surface-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono text-[#13E1BC] uppercase tracking-widest">
              <Compass className="w-4 h-4" />
              <span>03 — Contexto de Campo (2020 — Presente)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
              A ponte entre 15+ implantações B2B e o Product Design
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {caseStudy.context}
            </p>
          </div>

          <div className="lg:col-span-6 p-8 border border-surface-border bg-neutral-950 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
              Desafio Estrutural Identificado
            </span>
            <p className="text-base sm:text-lg text-white font-light leading-relaxed">
              &ldquo;{caseStudy.problem}&rdquo;
            </p>
            <div className="pt-4 border-t border-neutral-800 space-y-2 text-xs font-mono text-neutral-400">
              {caseStudy.goals.map((g, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#13E1BC]">›</span>
                  <span>{g}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04. Método Proprietário Feedback -> Figma -> QA */}
      <section id="metodo" className="py-20 border-b border-surface-borderSubtle bg-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-mono text-[#13E1BC] uppercase tracking-widest block">
              04 — Processo Contínuo na Rotina Ágil
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              Da Observação em Go-Live ao Design System &amp; QA
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Em sistemas de gestão corporativos, desenhar telas isoladas não basta. A evolução contínua do ERP conecta regras fiscais/comerciais, feedback estruturado em campo e critérios objetivos de aceite junto à engenharia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-6 border border-surface-border bg-neutral-950 flex flex-col justify-between space-y-4 hover:border-[#13E1BC]/50 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                      <span>ETAPA {item.step}</span>
                      <Icon className="w-4 h-4 text-[#13E1BC]" />
                    </div>
                    <h3 className="text-base font-medium text-white">{item.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 05. Entregas & Impacto Comprovado */}
      <section id="resultados" className="py-20 border-b border-surface-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-mono text-[#13E1BC] uppercase tracking-widest block">
              05 — Entregas &amp; Impacto Documentado
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              Resultados Operacionais e Legado de Produto
            </h2>
            <p className="text-sm text-neutral-400">{caseStudy.results.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudy.results.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-6 border border-surface-border bg-neutral-950 space-y-2"
              >
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  {m.label}
                </span>
                <p className="text-xl font-medium text-[#13E1BC]">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudy.solution.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 border border-surface-border bg-neutral-950 space-y-2"
              >
                <div className="flex items-center gap-2 text-white font-medium text-base">
                  <CheckCircle2 className="w-4 h-4 text-[#13E1BC] shrink-0" />
                  <span>{feat.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Learnings */}
          <div className="p-6 border border-neutral-800 bg-neutral-950/60 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-white uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-[#13E1BC]" />
              <span>Principais Aprendizados</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
              {caseStudy.learnings.map((l, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#13E1BC] shrink-0 mt-1" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <section className="py-16 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border border-surface-border p-8">
            <Link
              href={`/work/${prevCase.slug}`}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                Case Anterior: [{prevCase.number}] {prevCase.category}
              </span>
            </Link>

            <Link
              href="/work"
              className="text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              [Ver Todos os Cases]
            </Link>

            <Link
              href={`/work/${nextCase.slug}`}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-[#13E1BC] transition-colors"
            >
              <span>
                Próximo Case: [{nextCase.number}] {nextCase.category}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
