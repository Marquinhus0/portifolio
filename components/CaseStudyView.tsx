import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Compass,
  Cpu,
  Target,
  Sparkles,
  HelpCircle,
  Lightbulb,
  ShieldAlert,
  BarChart3,
  Layers,
} from "lucide-react";
import { CaseStudy } from "@/types";
import CasePlaceholderMedia from "./CasePlaceholderMedia";
import PulseMobileShowcase from "./PulseMobileShowcase";
import FramePlayerShowcase from "./FramePlayerShowcase";
import FlowCrmShowcase from "./FlowCrmShowcase";
import SupplyHubShowcase from "./SupplyHubShowcase";
import FlowInternalCrmCaseStudy from "./FlowInternalCrmCaseStudy";
import FrameInteractiveVideoCaseStudy from "./FrameInteractiveVideoCaseStudy";
import SupplyHubCaseStudy from "./SupplyHubCaseStudy";

interface CaseStudyViewProps {
  caseStudy: CaseStudy;
  nextCase: CaseStudy;
  prevCase: CaseStudy;
}

export default function CaseStudyView({
  caseStudy,
  nextCase,
  prevCase,
}: CaseStudyViewProps) {
  const isPulseCase = caseStudy.slug === "pulse-social-network";
  const isFrameCase = caseStudy.slug === "frame-interactive-video";
  const isFlowCrmCase = caseStudy.slug === "flow-crm-b2b";
  const isSupplyHubCase = caseStudy.slug === "supplyhub-procurement-b2b";

  if (isFlowCrmCase) {
    return (
      <FlowInternalCrmCaseStudy
        caseStudy={caseStudy}
        nextCase={nextCase}
        prevCase={prevCase}
      />
    );
  }

  if (isFrameCase) {
    return (
      <FrameInteractiveVideoCaseStudy
        caseStudy={caseStudy}
        nextCase={nextCase}
        prevCase={prevCase}
      />
    );
  }

  if (isSupplyHubCase) {
    return (
      <SupplyHubCaseStudy
        caseStudy={caseStudy}
        nextCase={nextCase}
        prevCase={prevCase}
      />
    );
  }

  return (
    <article className="min-h-screen bg-background">
      {/* 01. Hero do Projeto */}
      <section className="pt-16 pb-20 border-b border-surface-borderSubtle bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-10 text-xs font-mono text-neutral-400 border-b border-surface-borderSubtle">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para todos os cases</span>
            </Link>
            <div className="flex items-center gap-2.5">
              {caseStudy.isConcept ? (
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-white text-black font-semibold rounded-sm">
                  {caseStudy.conceptBadge || "CONCEPT"}
                </span>
              ) : (
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold rounded-sm">
                  REAL PRODUCT
                </span>
              )}
              <span className="text-white font-medium">[{caseStudy.number}]</span>
              <span>/</span>
              <span className="uppercase tracking-widest text-neutral-400">
                {caseStudy.category}
              </span>
            </div>
          </div>

          {/* Project Title & Overview */}
          <div className="pt-12 space-y-6 max-w-4xl">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  Case Study // {caseStudy.category}
                </span>
                {caseStudy.isConcept ? (
                  <span className="text-xs font-mono text-neutral-400">
                    — [Estudo Autoral Não-Comercial]
                  </span>
                ) : (
                  <span className="text-xs font-mono text-emerald-400">
                    — [Experiência Profissional Comprovada]
                  </span>
                )}
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-white leading-tight">
                {caseStudy.title}
              </h1>
            </div>
            <p className="text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed">
              {caseStudy.subtitle}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-surface-borderSubtle text-xs font-mono">
            <div className="space-y-1">
              <span className="text-neutral-400 block uppercase tracking-wider">
                Papel & Atuação:
              </span>
              <p className="text-neutral-200">{caseStudy.role}</p>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-400 block uppercase tracking-wider">
                Período / Contexto:
              </span>
              <p className="text-neutral-200">{caseStudy.year}</p>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-400 block uppercase tracking-wider">
                Natureza do Projeto:
              </span>
              <p className="text-neutral-200">{caseStudy.company}</p>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-400 block uppercase tracking-wider">
                Duração do Estudo:
              </span>
              <p className="text-neutral-200">{caseStudy.duration}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-6">
            {caseStudy.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Hero Media: Interactive Showcases for Pulse/Frame/FlowCRM, or Blueprint for others */}
          <div className="mt-14">
            {isPulseCase ? (
              <PulseMobileShowcase />
            ) : isFrameCase ? (
              <FramePlayerShowcase />
            ) : isFlowCrmCase ? (
              <FlowCrmShowcase />
            ) : isSupplyHubCase ? (
              <SupplyHubShowcase />
            ) : (
              <CasePlaceholderMedia
                type="interface"
                title={`${caseStudy.title} — Visão Geral do Sistema`}
                category={caseStudy.category}
                aspect="wide"
              />
            )}
          </div>
        </div>
      </section>

      {/* 02. Contexto & 03. Problema */}
      <section className="py-20 border-b border-surface-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
                <Compass className="w-4 h-4" />
                <span>02 — Contexto</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                Cenário & Ponto de Partida
              </h2>
              <div className="p-6 border border-surface-border bg-neutral-950 text-sm text-neutral-300 leading-relaxed font-normal">
                {caseStudy.context}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
                <AlertCircle className="w-4 h-4" />
                <span>03 — O Problema Central</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                Declaração do Desafio de Design
              </h2>
              <div className="p-6 border border-neutral-700 bg-neutral-900/60 text-base sm:text-lg text-white leading-relaxed font-light">
                &ldquo;{caseStudy.problem}&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. Objetivos & Restrições */}
      <section className="py-20 border-b border-surface-borderSubtle bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
                <Target className="w-4 h-4" />
                <span>04 — Objetivos da Iniciativa</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                Critérios de Sucesso de Produto
              </h2>
              <ul className="space-y-3 pt-2">
                {caseStudy.goals.map((goal, i) => (
                  <li
                    key={i}
                    className="p-4 border border-surface-border bg-neutral-950 text-xs sm:text-sm text-neutral-300 font-mono flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
                <Cpu className="w-4 h-4" />
                <span>Restrições & Complexidade</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                Limitações de Atenção e Usabilidade
              </h2>
              <ul className="space-y-3 pt-2">
                {caseStudy.constraints.map((constraint, i) => (
                  <li
                    key={i}
                    className="p-4 border border-surface-border bg-neutral-950 text-xs sm:text-sm text-neutral-400 font-mono flex items-start gap-3"
                  >
                    <span className="text-neutral-500 font-bold shrink-0">!</span>
                    <span>{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 05. Usuários (Personas Conceituais) & 06. Pesquisa */}
      <section className="py-20 border-b border-surface-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              05 & 06 — Usuários & Pesquisa Conceitual
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              Personas Conceituais & Investigação de Modelos
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-3xl">
              {caseStudy.research.approach}
            </p>
          </div>

          {/* User profiles / Personas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudy.users.map((user, idx) => (
              <div
                key={idx}
                className="p-6 border border-surface-border bg-neutral-950 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                      Persona Conceitual 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 border border-neutral-800 text-neutral-500 rounded">
                      ESTUDO
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-white tracking-tight">
                    {user.target}
                  </h3>
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Necessidades Centrais:
                    </span>
                    <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                      {user.needs}
                    </p>
                  </div>
                </div>

                {user.behaviors && (
                  <div className="pt-3 border-t border-neutral-900 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Comportamento & Dores:
                    </span>
                    <p className="text-[11px] text-neutral-400 font-mono leading-relaxed">
                      {user.behaviors}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Benchmarking & Key Research Questions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            <div className="lg:col-span-6 p-8 border border-neutral-800 bg-neutral-950 space-y-4">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">
                Questões Centrais da Investigação:
              </span>
              <div className="space-y-3">
                {caseStudy.research.keyQuestions.map((q, i) => (
                  <div
                    key={i}
                    className="p-3 bg-neutral-900/60 border border-neutral-850 text-xs font-mono text-neutral-300 flex items-start gap-2"
                  >
                    <span className="text-neutral-500 font-bold block">
                      Q0{i + 1}
                    </span>
                    <p>{q}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 p-8 border border-neutral-800 bg-neutral-950 space-y-4">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">
                Benchmarking Crítico de Plataformas:
              </span>
              <div className="space-y-3">
                {(caseStudy.research.benchmarkingNotes || [
                  "Análise comparativa de modelos de feed e descoberta",
                ]).map((note, i) => (
                  <div
                    key={i}
                    className="p-3 bg-neutral-900/60 border border-neutral-850 text-xs font-mono text-neutral-300 flex items-start gap-2"
                  >
                    <span className="text-neutral-500 font-bold block">
                      B0{i + 1}
                    </span>
                    <p>{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hipóteses do Projeto (quando presentes) */}
      {caseStudy.hypotheses && (
        <section className="py-20 border-b border-surface-borderSubtle bg-[#080808]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                Enquadramento Científico // Hipóteses
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
                Hipóteses Formuladas para Testar no Design
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {caseStudy.hypotheses.map((hypo, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-surface-border bg-neutral-950 space-y-3"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <Lightbulb className="w-3.5 h-3.5 text-white" />
                    <span className="uppercase tracking-wider">
                      Hipótese 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-white tracking-tight">
                    {hypo.hypothesis}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                    {hypo.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regras de Negócio Estruturadas (quando presentes) */}
      {caseStudy.businessRules && (
        <section className="py-20 border-b border-surface-borderSubtle bg-background">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                Lógica de Produto // Business Rules
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
                Regras de Negócio Estruturadas
              </h2>
              <p className="text-sm text-neutral-400 max-w-2xl">
                O produto foi modelado com salvaguardas explícitas de fluxo para garantir a integridade dos dados sem sobrecarregar o usuário na ponta.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {caseStudy.businessRules.map((br, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-surface-border bg-neutral-950 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono border-b border-neutral-900 pb-2">
                      <span className="text-white font-medium">0{idx + 1}. {br.rule}</span>
                      <span className="text-[10px] text-neutral-500 uppercase">RULE_ENFORCED</span>
                    </div>
                    <p className="text-[11px] font-mono text-neutral-400 leading-relaxed">
                      <strong>Gatilho:</strong> {br.trigger}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-neutral-900">
                    <p className="text-[11px] font-mono text-neutral-300 leading-relaxed">
                      <strong>Efeito no Sistema:</strong> {br.impact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 07. Insights & 08. Oportunidade */}
      <section className="py-20 border-b border-surface-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              07 & 08 — Síntese & Oportunidade
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              O que a análise de produto revelou
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudy.insights.map((insight, idx) => (
              <div
                key={idx}
                className="p-6 border border-surface-border bg-neutral-950 space-y-3"
              >
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Insight 0{idx + 1}
                </span>
                <h3 className="text-base font-medium text-white tracking-tight">
                  {insight.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>

          {/* Opportunity callout */}
          <div className="p-8 border border-neutral-700 bg-neutral-900/60 space-y-2">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">
              Enquadramento da Oportunidade Estratégica:
            </span>
            <p className="text-base sm:text-lg text-white font-light leading-relaxed">
              {caseStudy.opportunity}
            </p>
          </div>
        </div>
      </section>

      {/* 09. Fluxos & Arquitetura de Informação */}
      <section className="py-20 border-b border-surface-borderSubtle bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                09 — Arquitetura de Informação
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
                {caseStudy.flows.title}
              </h2>
            </div>
            <p className="max-w-md text-sm text-neutral-400">
              {caseStudy.flows.description}
            </p>
          </div>

          {/* Diagram schematic */}
          <CasePlaceholderMedia
            type="flow"
            title={`${caseStudy.title} — Fluxo Sistêmico As-Is vs To-Be`}
            category="System Flow & Architecture"
            aspect="wide"
          />

          {/* Flow steps */}
          {caseStudy.flows.diagramSteps && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {caseStudy.flows.diagramSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-neutral-800 bg-neutral-950 font-mono text-xs text-neutral-300 space-y-1"
                >
                  <span className="text-neutral-500 block">Etapa 0{idx + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 10. Wireframes & 11. Exploração Visual / UI */}
      <section className="py-20 border-b border-surface-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  10 — Estrutura de Baixa Fidelidade
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                  {caseStudy.wireframes.title}
                </h2>
                <p className="text-sm text-neutral-400">
                  {caseStudy.wireframes.description}
                </p>
              </div>

              <CasePlaceholderMedia
                type="wireframe"
                title={`${caseStudy.title} — Wireframes Estruturais`}
                category="Low-Fidelity Architecture"
                aspect="video"
              />

              <ul className="space-y-2 font-mono text-xs text-neutral-300">
                {caseStudy.wireframes.focusPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-neutral-500">›</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  11 — UI & Design System
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                  {caseStudy.ui.title}
                </h2>
                <p className="text-sm text-neutral-400">
                  {caseStudy.ui.description}
                </p>
              </div>

              <CasePlaceholderMedia
                type="interface"
                title={`${caseStudy.title} — Componentes & Tokens`}
                category="Design System & High-Fi UI"
                aspect="video"
              />

              <ul className="space-y-2 font-mono text-xs text-neutral-300">
                {caseStudy.ui.systemHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-neutral-500">›</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Estados do Sistema (System States) */}
      {caseStudy.systemStates && (
        <section className="py-20 border-b border-surface-borderSubtle bg-[#080808]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                Resiliência de Interface // Estados do Sistema
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
                Tratamento dos 4 Estados Fundamentais de UI
              </h2>
              <p className="text-sm text-neutral-400 max-w-2xl">
                Um bom Product Designer antecipa a experiência fora do &ldquo;happy path&rdquo;. Abaixo está a especificação dos estados de borda do produto.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {caseStudy.systemStates.map((st, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-surface-border bg-neutral-950 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                      Estado 0{idx + 1}
                    </span>
                    <h3 className="text-sm font-medium text-white">
                      {st.state}
                    </h3>
                    <p className="text-[11px] font-mono text-neutral-400 leading-relaxed">
                      <strong>Cenário:</strong> {st.scenario}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-neutral-900">
                    <p className="text-[11px] font-mono text-neutral-300 leading-relaxed">
                      <strong>Solução de Design:</strong> {st.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. Solução & 13. Validação Planejada */}
      <section className="py-20 border-b border-surface-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              12 & 13 — Solução & Validação Planejada
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              A Solução & Estratégia de Teste
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 max-w-3xl leading-relaxed">
              {caseStudy.solution.summary}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudy.solution.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 border border-surface-border bg-neutral-950 space-y-3"
              >
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Funcionalidade Chave 0{idx + 1}
                </span>
                <h3 className="text-lg font-medium text-white tracking-tight">
                  {feat.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Validation method & questions */}
          <div className="p-8 border border-surface-border bg-neutral-950 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">
                Método de Validação & Critérios de Teste:
              </span>
              <h3 className="text-xl font-medium text-white">
                {caseStudy.validation.method}
              </h3>
              <p className="text-xs text-neutral-400">
                {caseStudy.validation.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {caseStudy.validation.findings.map((finding, i) => (
                <div
                  key={i}
                  className="p-4 bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 flex items-start gap-2"
                >
                  <span className="text-white font-bold select-none">✓</span>
                  <span>{finding}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 14 & 15. "Como Eu Mediria o Sucesso" */}
      <section className="py-20 border-b border-surface-borderSubtle bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              14 & 15 — Framework de Métricas de Produto
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              Como Eu Mediria o Sucesso
            </h2>
            <p className="text-sm text-neutral-400 max-w-2xl">
              {caseStudy.results.summary}
            </p>
          </div>

          {/* Top Indicators Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {caseStudy.results.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-8 border border-surface-border bg-neutral-950 flex flex-col justify-between space-y-4"
              >
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  {metric.label}
                </span>
                <p className="text-xl sm:text-2xl font-mono text-white font-medium">
                  {metric.value}
                </p>
                <span className="text-[11px] font-mono text-neutral-400">
                  [Indicador Estratégico de Validação]
                </span>
              </div>
            ))}
          </div>

          {/* Detailed Metric Framework Breakdown (when present) */}
          {caseStudy.results.metricsFramework && (
            <div className="space-y-4 pt-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
                Framework de Acompanhamento (Dimensões HEART / AARRR Adaptadas):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseStudy.results.metricsFramework.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-6 border border-neutral-850 bg-neutral-950 space-y-2 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-900 pb-2">
                      <span className="text-white font-medium uppercase">
                        {m.pillar}
                      </span>
                      <span>DIMENSÃO 0{idx + 1}</span>
                    </div>
                    <p className="text-neutral-200 pt-1">
                      <strong>Indicador:</strong> {m.indicator}
                    </p>
                    <p className="text-neutral-400 text-[11px]">
                      <strong>Por que importa:</strong> {m.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 16. Aprendizados & Próximo Projeto */}
      <section className="py-20 border-b border-surface-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              16 — Reflexão de Produto
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              Principais Aprendizados
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudy.learnings.map((learning, idx) => (
              <div
                key={idx}
                className="p-6 border border-surface-border bg-neutral-950 font-mono text-xs text-neutral-300 leading-relaxed space-y-2"
              >
                <span className="text-neutral-500 block">0{idx + 1}.</span>
                <p>{learning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Navigation: Prev / Next Case */}
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
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-neutral-300 transition-colors"
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
