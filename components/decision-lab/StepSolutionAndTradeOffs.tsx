"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CheckSquare,
  Cpu,
  Scale,
  Square,
} from "lucide-react";
import type { Locale } from "@/context/LanguageContext";
import {
  computeAggregateTradeOffs,
  describeTradeOffBias,
} from "@/data/decisionLab/evaluationRules";
import type { DecisionScenarioConfig, ScenarioProblem } from "@/data/decisionLab/types";

interface StepSolutionAndTradeOffsProps {
  mode: "solution" | "tradeoffs";
  locale: Locale;
  scenario: DecisionScenarioConfig;
  prioritizedProblemIds: string[];
  selectedSolutionsByProblem: Record<string, string>;
  tradeOffAcknowledged: boolean;
  onSelectSolution: (problemId: string, alternativeId: string) => void;
  onToggleTradeOffAck: (checked: boolean) => void;
}

export default function StepSolutionAndTradeOffs({
  mode,
  locale,
  scenario,
  prioritizedProblemIds,
  selectedSolutionsByProblem,
  tradeOffAcknowledged,
  onSelectSolution,
  onToggleTradeOffAck,
}: StepSolutionAndTradeOffsProps) {
  const isEn = locale === "en";
  const prioritizedProblems = scenario.problems.filter((p) =>
    prioritizedProblemIds.includes(p.id)
  );

  const [activeProbId, setActiveProbId] = useState<string>(
    prioritizedProblems[0]?.id || ""
  );

  const currentProblem: ScenarioProblem | undefined =
    prioritizedProblems.find((p) => p.id === activeProbId) || prioritizedProblems[0];

  if (mode === "solution") {
    if (!currentProblem) {
      return (
        <div className="p-8 border border-neutral-800 bg-[#080808] text-center text-sm text-neutral-400">
          {isEn
            ? "Select priority problems in Stage 04 first."
            : "Selecione problemas prioritários na Etapa 04 primeiro."}
        </div>
      );
    }

    const chosenId = selectedSolutionsByProblem[currentProblem.id];
    const chosenAlt = currentProblem.alternatives.find((a) => a.id === chosenId);
    const decidedCount = prioritizedProblems.filter(
      (p) => Boolean(selectedSolutionsByProblem[p.id])
    ).length;

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] block">
              {isEn
                ? `Stage 05 // Solution Decision (${scenario.code})`
                : `Etapa 05 // Decisão de Solução (${scenario.code})`}
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
              {isEn
                ? "Choose an approach for each prioritized problem"
                : "Escolha uma alternativa para cada problema priorizado"}
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {isEn
                ? "Every option carries benefits, technical dependencies, and specific system trade-offs. Inspect consequences immediately after picking."
                : "Cada alternativa traz ganhos, limitações e dependências técnicas específicas. Ao selecionar, veja a consequência concreta no contexto do sistema."}
            </p>
          </div>

          <div className="px-4 py-2 border border-neutral-800 bg-[#080808] font-mono text-xs shrink-0">
            <span className="text-neutral-400">{isEn ? "Resolved:" : "Definidos:"} </span>
            <span
              className={
                decidedCount === prioritizedProblems.length
                  ? "text-[#13E1BC] font-bold"
                  : "text-amber-300 font-bold"
              }
            >
              {decidedCount}/{prioritizedProblems.length}
            </span>
          </div>
        </div>

        {/* Prioritized Problem Tabs */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={isEn ? "Prioritized problems" : "Problemas priorizados"}>
          {prioritizedProblems.map((p) => {
            const active = p.id === currentProblem.id;
            const hasDecision = Boolean(selectedSolutionsByProblem[p.id]);
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveProbId(p.id)}
                className={`px-4 py-2.5 border text-left font-mono text-xs transition-colors flex items-center gap-2 ${
                  active
                    ? "border-[#13E1BC] bg-[#13E1BC]/10 text-white font-semibold"
                    : "border-neutral-800 bg-[#080808] text-neutral-400 hover:text-white"
                }`}
              >
                <span className={active ? "text-[#13E1BC]" : "text-neutral-500"}>{p.code}</span>
                <span>{p.title}</span>
                {hasDecision && <CheckCircle2 className="w-3.5 h-3.5 text-[#13E1BC] shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Solution Alternatives Cards */}
        <div className="grid grid-cols-1 gap-4">
          {currentProblem.alternatives.map((alt) => {
            const selected = chosenId === alt.id;
            return (
              <button
                key={alt.id}
                type="button"
                onClick={() => onSelectSolution(currentProblem.id, alt.id)}
                aria-pressed={selected}
                className={`w-full text-left p-6 border transition-all space-y-4 ${
                  selected
                    ? "border-[#13E1BC] bg-[#13E1BC]/[0.06]"
                    : "border-surface-border bg-[#080808] hover:border-neutral-600"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1 max-w-3xl">
                    <span className={`text-xs font-mono font-bold uppercase tracking-wider block ${selected ? "text-[#13E1BC]" : "text-neutral-400"}`}>
                      {isEn ? `Alternative ${alt.label}` : `Alternativa ${alt.label}`}
                    </span>
                    <h3 className="text-lg font-medium text-white">{alt.title}</h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-1">
                      {alt.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs shrink-0">
                    <span className="px-2.5 py-1 border border-neutral-800 bg-neutral-950 text-neutral-300">
                      {isEn ? "Complexity:" : "Complexidade:"}{" "}
                      <strong className="text-white">{alt.estimatedComplexity}</strong>
                    </span>
                    {selected && (
                      <span className="px-2.5 py-1 bg-[#13E1BC] text-[#080808] font-bold">
                        {isEn ? "Selected ✓" : "Escolhida ✓"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Metadata Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-surface-borderSubtle text-xs">
                  <div className="p-3 bg-neutral-950 border border-neutral-850 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#13E1BC] block">
                      {isEn ? "Expected Benefit" : "Benefício Esperado"}
                    </span>
                    <p className="text-neutral-200 leading-snug">{alt.expectedBenefit}</p>
                  </div>
                  <div className="p-3 bg-neutral-950 border border-neutral-850 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 block">
                      {isEn ? "Limitation / Risk" : "Limitação Assumida"}
                    </span>
                    <p className="text-neutral-300 leading-snug">{alt.limitation}</p>
                  </div>
                  <div className="p-3 bg-neutral-950 border border-neutral-850 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      {isEn ? "User & Ops Impact" : "Impacto Usuário & Operação"}
                    </span>
                    <p className="text-neutral-300 leading-snug">
                      {alt.userImpact} • {alt.operationalImpact}
                    </p>
                  </div>
                  <div className="p-3 bg-neutral-950 border border-neutral-850 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      {isEn ? "Dependencies" : "Dependências"}
                    </span>
                    <p className="text-neutral-300 font-mono text-[11px] leading-snug">
                      {alt.dependencies.join(", ")}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Specific Consequence Explanation After Selection */}
        {chosenAlt && (
          <div className="p-6 border border-[#13E1BC]/40 bg-[#13E1BC]/[0.04] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#13E1BC]">
              <Cpu className="w-4 h-4 shrink-0" />
              <span>
                {isEn
                  ? `Operational Consequence Analysis — Alternative ${chosenAlt.label}`
                  : `Consequência Específica no Cenário — Alternativa ${chosenAlt.label}`}
              </span>
            </div>
            <p className="text-sm text-white leading-relaxed">{chosenAlt.consequenceAnalysis}</p>
          </div>
        )}
      </div>
    );
  }

  // STAGE 06: TRADE-OFF ANALYSIS
  const decisions = prioritizedProblems
    .map((problem) => {
      const chosenAlternative = problem.alternatives.find(
        (a) => a.id === selectedSolutionsByProblem[problem.id]
      );
      return chosenAlternative ? { problem, chosenAlternative } : null;
    })
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  const profile = computeAggregateTradeOffs(decisions);

  return (
    <div className="space-y-6">
      <div className="space-y-2 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] block">
          {isEn
            ? `Stage 06 // Trade-off Conflict Analysis (${scenario.code})`
            : `Etapa 06 // Análise de Trade-offs & Conflitos (${scenario.code})`}
        </span>
        <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
          {isEn
            ? "How your chosen solutions shift system tensions"
            : "Como suas decisões deslocaram os objetivos concorrentes"}
        </h2>
        <p className="text-sm text-neutral-300 leading-relaxed">
          {isEn
            ? "Product choices never maximize every pole simultaneously. Inspect the resulting balance across all 5 evaluation criteria before writing QA acceptance tests."
            : "Decisões de produto envolvem restrições reais: acelerar uma ponta pode exigir controle ou esforço em outra. Analise o equilíbrio resultante."}
        </p>
      </div>

      {/* 5 Dynamic Conflict Meters */}
      <div className="space-y-4">
        {scenario.tradeOffAxes.map((axis) => {
          const val = profile[axis.id]; // -2 to +2
          const markerPosition = ((val + 2) / 4) * 100; // 0% to 100%
          const biasCopy = describeTradeOffBias(
            axis.id,
            val,
            axis.leftPole,
            axis.rightPole,
            locale
          );

          return (
            <div
              key={axis.id}
              className="p-5 border border-surface-border bg-[#080808] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <span className="text-white font-semibold">{axis.leftPole}</span>
                <span className="text-[#13E1BC] text-[11px] flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 shrink-0" />
                  <span>{biasCopy}</span>
                </span>
                <span className="text-white font-semibold sm:text-right">{axis.rightPole}</span>
              </div>

              {/* Balance Spectrum Track */}
              <div className="relative h-2 bg-neutral-900 rounded-sm border border-neutral-800" aria-hidden="true">
                <div className="absolute inset-y-0 left-1/2 w-[1px] bg-neutral-600" />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#13E1BC] shadow-[0_0_10px_#13E1BC] transition-all duration-300 motion-reduce:transition-none"
                  style={{ left: `${markerPosition}%` }}
                />
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed">
                <span className="font-mono text-neutral-300 uppercase tracking-wider mr-1.5 text-[10px]">
                  {isEn ? "Evaluation Criterion:" : "Critério de Avaliação:"}
                </span>
                {axis.criteriaNote}
              </p>
            </div>
          );
        })}
      </div>

      {/* Trade-off Confirmation Gate */}
      <button
        type="button"
        onClick={() => onToggleTradeOffAck(!tradeOffAcknowledged)}
        aria-pressed={tradeOffAcknowledged}
        className={`w-full text-left p-5 border transition-colors flex items-start gap-3 ${
          tradeOffAcknowledged
            ? "border-[#13E1BC] bg-[#13E1BC]/10 text-white"
            : "border-neutral-700 bg-neutral-950 text-neutral-300 hover:border-neutral-500"
        }`}
      >
        {tradeOffAcknowledged ? (
          <CheckSquare className="w-5 h-5 text-[#13E1BC] shrink-0 mt-0.5" />
        ) : (
          <Square className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
        )}
        <div className="space-y-1">
          <span className="text-xs sm:text-sm font-medium block">
            {isEn
              ? "I reviewed the trade-off concessions and constraints implied by my strategy"
              : "Revisei os trade-offs, riscos e concessões gerados pelas soluções escolhidas"}
          </span>
          <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>
              {isEn
                ? "Next stage: define QA acceptance test coverage for edge states"
                : "Próxima etapa: definir proposta de critérios de aceite e cobertura de QA"}
            </span>
          </span>
        </div>
      </button>
    </div>
  );
}
