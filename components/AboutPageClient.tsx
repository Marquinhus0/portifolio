"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Layers, ShieldCheck, Wrench } from "lucide-react";
import DesignSystemShowcase from "@/components/DesignSystemShowcase";
import PhilosophyBlock from "@/components/PhilosophyBlock";
import { useLanguage } from "@/context/LanguageContext";
import { ALFA_NARRATIVE } from "@/data/careerProfile";

const TRANSITION_STAGES = {
  pt: [
    {
      period: "2020 (6 meses)",
      org: "ISBET",
      role: "Auxiliar Administrativo & Suporte a Sistemas",
      shift: "Disciplina com governança cadastral, sistemas operacionais e rotina de suporte técnico.",
    },
    {
      period: "2020 — 2023",
      org: "ALFA Software",
      role: "Analista de Negócios ERP",
      shift: "15+ implantações B2B completas em campo (Compras, Vendas, Financeiro, Estoque), método oficial de feedbacks e documentação ilustrada.",
    },
    {
      period: "2023 — Presente",
      org: "ALFA Software",
      role: "Product Designer",
      shift: "Transição estruturada da análise de regras de negócio para discovery contínuo, UX/IA, padronização Figma, critérios de aceite e QA.",
    },
  ],
  en: [
    {
      period: "2020 (6 mos)",
      org: "ISBET",
      role: "Administrative & Systems Support Assistant",
      shift: "Discipline in registration data governance, operational routines, and technical support.",
    },
    {
      period: "2020 — 2023",
      org: "ALFA Software",
      role: "ERP Business Analyst",
      shift: "15+ full-cycle B2B ERP implementations (Purchasing, Sales, Finance, Inventory), internal feedback method, and illustrated specs.",
    },
    {
      period: "2023 — Present",
      org: "ALFA Software",
      role: "Product Designer",
      shift: "Structured transition from ERP business rules into ongoing user discovery, UX/IA, Figma component systems, acceptance criteria, and QA.",
    },
  ],
};

const COLLABORATION_PRACTICES = {
  pt: [
    {
      code: "DISCOVERY → BUSINESS",
      title: "Levantamento & Regras Fiscais/Comerciais",
      items: [
        "Entrevistas e observação presencial em clientes durante go-live e rotina de balcão",
        "Tradução de restrições tributárias e operacionais em requisitos funcionais claros",
      ],
    },
    {
      code: "DESIGN → ENGINEERING",
      title: "Critérios de Aceite, QA & Handoff",
      items: [
        "Especificação explícita de estados vazios, carregamentos e erros antes do sprint",
        "Testes funcionais com perspectiva de QA e documentação visual para reduzir dúvidas pós-deploy",
      ],
    },
  ],
  en: [
    {
      code: "DISCOVERY → BUSINESS",
      title: "Field Research & Commercial/Tax Rules",
      items: [
        "User interviews and onsite observation during live go-live operations and counter routines",
        "Translating fiscal and inventory constraints into actionable functional requirements",
      ],
    },
    {
      code: "DESIGN → ENGINEERING",
      title: "Acceptance Criteria, QA & Handoff",
      items: [
        "Explicit specification of empty, loading, and error states prior to sprint implementation",
        "QA-minded functional reviews and visual operational guides reducing post-release ambiguity",
      ],
    },
  ],
};

export default function AboutPageClient() {
  const { locale } = useLanguage();
  const isEn = locale === "en";
  const narrative = ALFA_NARRATIVE[locale];
  const stages = TRANSITION_STAGES[locale];
  const collab = COLLABORATION_PRACTICES[locale];

  return (
    <div className="bg-background min-h-screen">
      {/* 01. About Hero */}
      <section className="pt-16 pb-16 border-b border-surface-borderSubtle bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
            <span>{isEn ? "[About Marcus Ritta]" : "[Sobre Marcus Ritta]"}</span>
          </span>
          <div className="max-w-4xl space-y-5">
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tighter text-white uppercase leading-none">
              Marcus Ritta
            </h1>
            <p className="text-lg sm:text-2xl text-neutral-200 font-light leading-relaxed">
              {isEn
                ? "Product Designer specialized in ERP, enterprise SaaS, and transactional systems—combining 15+ field rollouts with UX architecture, Figma systems, and engineering QA."
                : "Product Designer especializado em ERP, SaaS B2B e sistemas transacionais — unindo vivência em 15+ implantações em campo à arquitetura de informação, Figma e validação com engenharia."}
            </p>
          </div>

          <div className="pt-2">
            <div className="p-5 sm:p-6 border border-surface-border bg-neutral-950/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3 text-xs font-mono text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-[#13E1BC] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-white uppercase tracking-wider font-medium block">
                    {isEn
                      ? "Verifiable Career & LinkedIn Profile"
                      : "Trajetória & Referências Verificáveis"}
                  </span>
                  <p className="text-neutral-400 leading-relaxed">
                    {isEn
                      ? "Full timeline at ALFA Software, enterprise ERP rollout background, and peer recommendations."
                      : "Histórico completo na ALFA Software, vivência em implantações ERP e recomendações verificáveis no LinkedIn."}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono text-xs">
                <a
                  href="https://linkedin.com/in/marcusritta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#13E1BC] text-[#080808] font-semibold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-neutral-800 bg-neutral-900 text-white hover:border-[#13E1BC] hover:text-[#13E1BC] uppercase tracking-wider transition-colors"
                >
                  <span>{isEn ? "View Resume" : "Ver Currículo"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Unified Detailed ALFA Narrative */}
      <section className="py-20 border-b border-surface-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] block">
                {narrative.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
                {narrative.heading}
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6 text-neutral-300 leading-relaxed text-base sm:text-lg font-light">
              {narrative.paragraphs.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
              <p className="text-sm font-mono text-neutral-300 border-l-2 border-[#13E1BC] pl-4 py-1">
                &ldquo;{narrative.quote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Career Progression: From Field ERP Analyst to Product Designer */}
      <section className="py-20 border-b border-surface-borderSubtle bg-[#090909]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>
                {isEn
                  ? "[Career Transition & Evolution]"
                  : "[Evolução & Transição de Papel]"}
              </span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              {isEn
                ? "How field ERP analysis shaped my Product Design practice"
                : "Como a análise de negócios em campo moldou meu Product Design"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stages.map((stage, idx) => (
              <div
                key={stage.period}
                className="p-6 sm:p-7 border border-surface-border bg-neutral-950 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-surface-borderSubtle pb-3">
                    <span className="text-[#13E1BC] font-semibold">0{idx + 1}</span>
                    <span className="text-neutral-400">{stage.period}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      {stage.org}
                    </span>
                    <h3 className="text-lg font-medium text-white tracking-tight pt-0.5">
                      {stage.role}
                    </h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {stage.shift}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. Engineering Collaboration, QA & Implementation Bridge */}
      <section className="py-20 border-b border-surface-borderSubtle bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              <span>
                {isEn
                  ? "[Engineering Collaboration & Validation]"
                  : "[Colaboração com Engenharia & Validação]"}
              </span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              {isEn
                ? "From Go-Live constraints to testable handoffs"
                : "Das restrições de implantação ao handoff testável"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collab.map((block) => (
              <div
                key={block.code}
                className="p-7 border border-surface-border bg-neutral-950/90 space-y-4"
              >
                <span className="text-xs font-mono text-[#13E1BC] uppercase tracking-widest block">
                  [{block.code}]
                </span>
                <h3 className="text-xl font-medium text-white tracking-tight">
                  {block.title}
                </h3>
                <ul className="space-y-2.5 text-sm text-neutral-300">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#13E1BC] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05. Interactive B2B Design System & Tokens Specimen (Unique to /about) */}
      <DesignSystemShowcase />

      {/* 06. Operating Philosophy */}
      <PhilosophyBlock />

      {/* 07. Concise Next-Step Routing (No duplicated Homepage Timeline/Contact Grid) */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="p-8 border border-surface-border border-l-2 border-l-[#13E1BC] bg-neutral-950 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono text-[#13E1BC] uppercase tracking-widest block">
                {isEn ? "[Explore Evidence & Contact]" : "[Evidências & Contato Direto]"}
              </span>
              <h2 className="text-2xl font-medium text-white tracking-tight">
                {isEn
                  ? "See this experience applied in the ERP case or open a conversation"
                  : "Veja essa trajetória aplicada no case real de ERP ou inicie uma conversa"}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono text-xs uppercase tracking-wider">
              <Link
                href="/work/erp-enterprise-redesign"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#13E1BC] text-[#080808] font-semibold hover:bg-white transition-colors"
              >
                <span>{isEn ? "ERP Case [01]" : "Case Real ERP [01]"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 border border-neutral-800 bg-neutral-900 text-white hover:border-[#13E1BC] hover:text-[#13E1BC] transition-colors"
              >
                <span>{isEn ? "Contact" : "Contato"}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
