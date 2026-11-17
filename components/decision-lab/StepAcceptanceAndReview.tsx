"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CheckSquare,
  ClipboardCheck,
  RotateCcw,
  ShieldCheck,
  Square,
} from "lucide-react";
import type { Locale } from "@/context/LanguageContext";
import type { EvaluationReport } from "@/data/decisionLab/evaluationRules";
import type { DecisionScenarioConfig, ScenarioCode } from "@/data/decisionLab/types";

interface StepAcceptanceAndReviewProps {
  mode: "acceptance" | "review";
  locale: Locale;
  scenarios: DecisionScenarioConfig[];
  scenario: DecisionScenarioConfig;
  selectedQaIds: string[];
  strategyNotes: string;
  report: EvaluationReport;
  onToggleQa: (qaId: string) => void;
  onChangeNotes: (notes: string) => void;
  onRestart: (code?: ScenarioCode) => void;
}

export default function StepAcceptanceAndReview({
  mode,
  locale,
  scenarios,
  scenario,
  selectedQaIds,
  strategyNotes,
  report,
  onToggleQa,
  onChangeNotes,
  onRestart,
}: StepAcceptanceAndReviewProps) {
  const isEn = locale === "en";

  if (mode === "acceptance") {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] block">
              {isEn
                ? `Stage 07 // Acceptance Criteria & QA Coverage (${scenario.code})`
                : `Etapa 07 // Critérios de Aceite & Cobertura QA (${scenario.code})`}
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
              {isEn
                ? "Select scenarios for the proposed QA test coverage"
                : "Selecione os cenários que devem compor a proposta de testes"}
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {isEn
                ? "Pick at least 2 demonstrative scenarios (normal flow, missing field, communication drop, unauthorized role, inconsistent state, or duplicate submit)."
                : "Marque ao menos 2 cenários demonstrativos para definir os critérios de aceite antes do relatório final."}
            </p>
          </div>

          <div className="px-4 py-2 border border-neutral-800 bg-[#080808] font-mono text-xs shrink-0">
            <span className="text-neutral-400">{isEn ? "Covered:" : "Selecionados:"} </span>
            <span
              className={
                selectedQaIds.length >= 2
                  ? "text-[#13E1BC] font-bold"
                  : "text-amber-300 font-bold"
              }
            >
              {selectedQaIds.length}/{scenario.qaScenarios.length}
            </span>
          </div>
        </div>

        {/* Explicit Test Proposal Framing Notice */}
        <div className="p-4 border border-neutral-800 bg-neutral-950 text-xs font-mono text-neutral-300 flex items-start gap-2.5">
          <ClipboardCheck className="w-4 h-4 text-[#13E1BC] shrink-0 mt-0.5" />
          <span>
            {isEn
              ? "Test Coverage Proposal: this selection defines expected UI & API acceptance behavior for QA — no automated test suite is executed inside this simulator."
              : "Proposta de Cobertura de Testes: esta seleção especifica o comportamento esperado para validação com QA — testes automatizados não são executados nesta demonstração."}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenario.qaScenarios.map((qa) => {
            const selected = selectedQaIds.includes(qa.id);
            return (
              <button
                key={qa.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onToggleQa(qa.id)}
                className={`text-left p-5 border transition-colors flex flex-col justify-between gap-4 ${
                  selected
                    ? "border-[#13E1BC] bg-[#13E1BC]/[0.06]"
                    : "border-surface-border bg-[#080808] hover:border-neutral-600"
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                    <span
                      className={`px-2 py-0.5 border uppercase tracking-wider ${
                        qa.recommendedCriticality === "essential"
                          ? "border-rose-500/40 bg-rose-950/30 text-rose-300"
                          : "border-neutral-700 bg-neutral-900 text-neutral-300"
                      }`}
                    >
                      {qa.recommendedCriticality === "essential"
                        ? isEn
                          ? "Essential Risk Case"
                          : "Risco Crítico"
                        : isEn
                        ? "Recommended"
                        : "Recomendado"}
                    </span>
                    {selected ? (
                      <CheckSquare className="w-4 h-4 text-[#13E1BC]" />
                    ) : (
                      <Square className="w-4 h-4 text-neutral-500" />
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-medium text-white leading-snug">
                    {qa.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {qa.scenarioDescription}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-surface-borderSubtle text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#13E1BC] block">
                      {isEn ? "Expected UI Behavior:" : "Estado Esperado na UI:"}
                    </span>
                    <p className="text-neutral-200 leading-snug">{qa.expectedUiState}</p>
                  </div>
                  <div className="p-2.5 bg-neutral-950 border border-neutral-850 font-mono text-[11px] text-neutral-300">
                    {qa.givenWhenThen}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // STAGE 08: DECISION REVIEW REPORT
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-surface-borderSubtle pb-6">
        <div className="space-y-2 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] block">
            {isEn
              ? `Stage 08 // Final Strategy Report (${scenario.code})`
              : `Etapa 08 // Relatório Visual da Decisão (${scenario.code})`}
          </span>
          <h2 className="text-2xl sm:text-4xl font-medium text-white tracking-tight">
            {scenario.name}
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            {report.alignmentSummary}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRestart()}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#13E1BC] text-[#080808] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors shrink-0 self-start lg:self-end"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isEn ? "Restart This Scenario" : "Reiniciar Simulação"}</span>
        </button>
      </div>

      {/* 1. Visitor Chosen Priorities & Solutions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#13E1BC]">
            {isEn
              ? "Prioritized Problems & Chosen Solutions"
              : "Problemas Priorizados & Soluções Escolhidas"}
          </h3>

          <div className="space-y-3">
            {report.decisions.map(({ problem, chosenAlternative }) => (
              <div
                key={problem.id}
                className="p-5 border border-surface-border bg-[#080808] space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                  <span className="text-white font-semibold">
                    {problem.code} — {problem.title}
                  </span>
                  <span className="px-2 py-0.5 border border-[#13E1BC]/40 bg-[#13E1BC]/10 text-[#13E1BC]">
                    {isEn ? `Option ${chosenAlternative.label}` : `Alternativa ${chosenAlternative.label}`}
                  </span>
                </div>
                <p className="text-sm text-white font-medium">{chosenAlternative.title}</p>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {chosenAlternative.consequenceAnalysis}
                </p>
              </div>
            ))}
          </div>

          {/* Optional Strategy Justification Note */}
          <div className="p-5 border border-surface-border bg-[#080808] space-y-2">
            <label
              htmlFor="strategy-notes"
              className="text-xs font-mono uppercase tracking-wider text-neutral-300 block"
            >
              {isEn
                ? "Your Strategy Rationale (Optional Note)"
                : "Justificativa da Estratégia (Nota Opcional)"}
            </label>
            <textarea
              id="strategy-notes"
              rows={3}
              value={strategyNotes}
              onChange={(e) => onChangeNotes(e.target.value)}
              placeholder={
                isEn
                  ? "Summarize why you favored speed, control, or incremental rollout..."
                  : "Registre brevemente por que priorizou agilidade, controle ou mitigação de risco..."
              }
              className="w-full p-3 bg-neutral-950 border border-neutral-800 text-xs text-white placeholder:text-neutral-600 focus:border-[#13E1BC] focus:outline-none"
            />
          </div>
        </div>

        {/* 2. Trade-offs & QA Coverage Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 border border-surface-border bg-[#080808] space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#13E1BC]">
              {isEn ? "Trade-offs Assumed" : "Trade-offs Considerados"}
            </h3>
            <ul className="space-y-2 text-xs text-neutral-300 leading-relaxed">
              {report.tradeOffObservations.map((obs) => (
                <li key={obs} className="flex items-start gap-2">
                  <span className="text-[#13E1BC] font-mono">›</span>
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 border border-surface-border bg-[#080808] space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#13E1BC]">
              {isEn ? "Proposed QA Test Coverage" : "Proposta de Cobertura QA"}
            </h3>
            <ul className="space-y-2 text-xs text-neutral-200">
              {report.selectedQaScenarios.map((qa) => (
                <li key={qa.id} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#13E1BC] shrink-0 mt-0.5" />
                  <span>{qa.title}</span>
                </li>
              ))}
            </ul>

            {report.unselectedEssentialQa.length > 0 && (
              <div className="pt-3 border-t border-neutral-850 space-y-1.5 text-[11px] font-mono text-amber-300">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {isEn
                      ? "Critical risk scenarios left outside this proposal:"
                      : "Cenários críticos não incluídos nesta proposta:"}
                  </span>
                </div>
                <ul className="space-y-1 text-neutral-400 pl-5 list-disc">
                  {report.unselectedEssentialQa.map((q) => (
                    <li key={q.id}>{q.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Comparative Reference Strategy (Non-judgmental & Educational) */}
      <div className="p-6 sm:p-8 border border-[#13E1BC]/35 bg-[#13E1BC]/[0.04] space-y-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#13E1BC]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              {isEn
                ? "Comparative Reference Strategy (Educational Benchmark)"
                : "Comparação com Estratégia de Referência (Análise Educacional)"}
            </span>
          </div>
          <h3 className="text-xl font-medium text-white">{scenario.referenceStrategy.title}</h3>
          <p className="text-sm text-neutral-200 leading-relaxed">
            {scenario.referenceStrategy.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-surface-borderSubtle">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 block">
              {isEn ? "Reasoning Differences vs Your Path" : "Diferenças de Raciocínio"}
            </span>
            <ul className="space-y-2 text-xs text-neutral-200 leading-relaxed">
              {report.reasoningDifferences.map((diff, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#13E1BC] font-mono">0{i + 1}</span>
                  <span>{diff}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 block">
              {isEn ? "Reference Rationale" : "Fundamentos da Trilha de Referência"}
            </span>
            <ul className="space-y-2 text-xs text-neutral-300 leading-relaxed">
              {scenario.referenceStrategy.reasoning.map((reason) => (
                <li key={reason} className="flex items-start gap-2">
                  <span className="text-[#13E1BC] font-mono">›</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Explore Another Scenario or Related Case Study */}
      <div className="p-6 border border-surface-border bg-[#080808] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-neutral-400 mr-2">
            {isEn ? "Test another scenario:" : "Explorar outro cenário:"}
          </span>
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => onRestart(sc.code)}
              className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
                sc.code === scenario.code
                  ? "border-[#13E1BC] text-[#13E1BC] bg-[#13E1BC]/10"
                  : "border-neutral-800 text-neutral-300 hover:border-white"
              }`}
            >
              {sc.code} {"//"} {sc.domain}
            </button>
          ))}
        </div>

        <Link
          href={`/work/${scenario.relatedCaseSlug}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#13E1BC] hover:text-white transition-colors shrink-0"
        >
          <span>{scenario.relatedCaseLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
