"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  GitCompare,
  Info,
  Scale,
  Search,
  SquareCheck,
} from "lucide-react";
import type { Locale } from "@/context/LanguageContext";
import {
  DIMENSION_RUBRIC,
  evaluateProblemPriority,
  formatScaleLevel,
  rankScenarioProblems,
} from "@/data/decisionLab/prioritizationRules";
import type { DecisionScenarioConfig, ScenarioProblem } from "@/data/decisionLab/types";

interface StepInvestigationAndPrioritizationProps {
  mode: "investigation" | "prioritization";
  locale: Locale;
  scenario: DecisionScenarioConfig;
  inspectedProblemIds: string[];
  compareProblemIds: [string | null, string | null];
  prioritizedProblemIds: string[];
  onInspectProblem: (problemId: string) => void;
  onToggleCompare: (problemId: string) => void;
  onTogglePrioritize: (problemId: string) => void;
  onMovePriorityOrder: (problemId: string, direction: "up" | "down") => void;
}

export default function StepInvestigationAndPrioritization({
  mode,
  locale,
  scenario,
  inspectedProblemIds,
  compareProblemIds,
  prioritizedProblemIds,
  onInspectProblem,
  onToggleCompare,
  onTogglePrioritize,
  onMovePriorityOrder,
}: StepInvestigationAndPrioritizationProps) {
  const isEn = locale === "en";
  const [activeProblemId, setActiveProblemId] = useState<string>(
    scenario.problems[0]?.id || ""
  );
  const [showRubric, setShowRubric] = useState(false);
  const [showRefComparison, setShowRefComparison] = useState(false);

  const activeProblem: ScenarioProblem =
    scenario.problems.find((p) => p.id === activeProblemId) ||
    scenario.problems[0];

  const handleSelectForInspection = (problemId: string) => {
    setActiveProblemId(problemId);
    onInspectProblem(problemId);
  };

  if (mode === "investigation") {
    const inspectedCount = inspectedProblemIds.length;
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] block">
              {isEn
                ? `Stage 03 // Problem Investigation (${scenario.code})`
                : `Etapa 03 // Investigação de Problemas (${scenario.code})`}
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
              {isEn
                ? "Investigate symptoms, frequency, risk, and justification"
                : "Investigue sintomas, frequência, impacto, risco e justificativa"}
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {isEn
                ? "Open at least 2 problems below to review user impact, operational risk, frequency, and prioritization rationale."
                : "Analise ao menos 2 problemas abaixo para consultar frequência, impacto ao usuário, risco operacional e justificativa antes de priorizar."}
            </p>
          </div>

          <div className="px-4 py-2 border border-neutral-800 bg-[#080808] font-mono text-xs shrink-0">
            <span className="text-neutral-400">
              {isEn ? "Investigated:" : "Investigados:"}{" "}
            </span>
            <span className={inspectedCount >= 2 ? "text-[#13E1BC] font-bold" : "text-amber-300 font-bold"}>
              {inspectedCount}/{scenario.problems.length}
            </span>
            <span className="text-neutral-500 ml-1">
              ({isEn ? "min 2" : "mín. 2"})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-2.5">
            {scenario.problems.map((p) => {
              const isSelected = p.id === activeProblem.id;
              const isInspected = inspectedProblemIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectForInspection(p.id)}
                  aria-pressed={isSelected}
                  className={`w-full text-left p-4 border transition-colors flex items-start justify-between gap-3 ${
                    isSelected
                      ? "border-[#13E1BC] bg-[#13E1BC]/[0.07]"
                      : "border-surface-border bg-[#080808] hover:border-neutral-600"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] font-mono">
                      <span className={isSelected ? "text-[#13E1BC] font-bold" : "text-neutral-400"}>
                        {p.code}
                      </span>
                      {isInspected && (
                        <span className="px-1.5 py-0.5 text-[10px] bg-neutral-900 border border-[#13E1BC]/40 text-[#13E1BC] rounded-sm">
                          {isEn ? "Inspected" : "Analisado"}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-white block leading-snug">
                      {p.title}
                    </span>
                  </div>
                  <Search className={`w-4 h-4 shrink-0 mt-1 ${isSelected ? "text-[#13E1BC]" : "text-neutral-500"}`} />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 border border-surface-border bg-[#080808] p-6 sm:p-7 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-borderSubtle pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#13E1BC] uppercase tracking-wider block">
                  {activeProblem.code} {"//"} {isEn ? "Problem Profile" : "Perfil do Problema"}
                </span>
                <h3 className="text-xl font-medium text-white">{activeProblem.title}</h3>
              </div>

              {!inspectedProblemIds.includes(activeProblem.id) && (
                <button
                  type="button"
                  onClick={() => onInspectProblem(activeProblem.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[#13E1BC]/60 text-[#13E1BC] hover:bg-[#13E1BC] hover:text-[#080808] transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isEn ? "Mark Investigated" : "Marcar Investigado"}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px] font-mono">
              <div className="p-2.5 border border-neutral-850 bg-neutral-950">
                <span className="text-neutral-400 block">{isEn ? "Frequency" : "Frequência"}</span>
                <strong className="text-white">{formatScaleLevel(activeProblem.scores.frequency, locale)}</strong>
              </div>
              <div className="p-2.5 border border-neutral-850 bg-neutral-950">
                <span className="text-neutral-400 block">{isEn ? "User Impact" : "Imp. Usuário"}</span>
                <strong className="text-[#13E1BC]">{formatScaleLevel(activeProblem.scores.userImpact, locale)}</strong>
              </div>
              <div className="p-2.5 border border-neutral-850 bg-neutral-950">
                <span className="text-neutral-400 block">{isEn ? "Ops Impact" : "Imp. Operacional"}</span>
                <strong className="text-white">{formatScaleLevel(activeProblem.scores.operationalImpact, locale)}</strong>
              </div>
              <div className="p-2.5 border border-neutral-850 bg-neutral-950">
                <span className="text-neutral-400 block">{isEn ? "Business Risk" : "Risco Negócio"}</span>
                <strong className="text-amber-300">{formatScaleLevel(activeProblem.scores.businessRisk, locale)}</strong>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 border border-neutral-850 bg-neutral-950 space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                  {isEn ? "Observed Symptom" : "Sintoma Relatado"}
                </span>
                <p className="text-sm text-neutral-200 leading-relaxed">
                  {activeProblem.symptom}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 border border-neutral-850 bg-neutral-950 space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#13E1BC] block">
                    {isEn ? "User Impact" : "Impacto para o Usuário"}
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {activeProblem.userImpactDetail}
                  </p>
                </div>

                <div className="p-4 border border-neutral-850 bg-neutral-950 space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 block">
                    {isEn ? "Operational Impact" : "Impacto Operacional"}
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {activeProblem.operationalImpactDetail}
                  </p>
                </div>
              </div>

              <div className="p-4 border border-neutral-800 bg-neutral-900/40 text-xs space-y-1.5">
                <span className="text-[11px] font-mono text-[#13E1BC] uppercase tracking-wider block">
                  {isEn ? "Domain Justification" : "Justificativa do Problema"}
                </span>
                <p className="text-neutral-200 leading-relaxed">{activeProblem.justification}</p>
                <p className="text-[11px] font-mono text-neutral-400 pt-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#13E1BC] shrink-0" />
                  <span>{activeProblem.evidenceCue}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STAGE 04: BUILD OWN PRIORITIZATION & COMPARE WITH REFERENCE
  const ranked = rankScenarioProblems(scenario.problems, locale);
  const rubric = DIMENSION_RUBRIC[locale];
  const comparedProblems = compareProblemIds
    .map((id) => scenario.problems.find((p) => p.id === id))
    .filter((p): p is ScenarioProblem => Boolean(p));

  const visitorOrderedProblems = prioritizedProblemIds
    .map((id) => scenario.problems.find((p) => p.id === id))
    .filter((p): p is ScenarioProblem => Boolean(p));

  const referenceOrderedProblems = scenario.referenceStrategy.recommendedProblemIds
    .map((id) => scenario.problems.find((p) => p.id === id))
    .filter((p): p is ScenarioProblem => Boolean(p));

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] block">
            {isEn
              ? `Stage 04 // Build Your Prioritization (${scenario.code})`
              : `Etapa 04 // Monte Sua Priorização (${scenario.code})`}
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
            {isEn
              ? "Select 2–3 priority problems, set rank order, and compare with reference"
              : "Escolha 2 a 3 problemas, ordene sua fila e compare com a referência"}
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            {isEn
              ? "Use the transparent rubric as decision support, reorder your own top sequence (1st/2nd/3rd), and optionally compare against the scenario reference triage."
              : "Utilize os pesos como apoio à decisão (não como verdade absoluta), ajuste sua própria ordem de ataque (1º/2º/3º) e compare com a priorização de referência."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 font-mono text-xs">
          <div className="px-3.5 py-2 border border-neutral-800 bg-[#080808]">
            <span className="text-neutral-400">{isEn ? "Prioritized:" : "Selecionados:"} </span>
            <span className={prioritizedProblemIds.length >= 2 ? "text-[#13E1BC] font-bold" : "text-amber-300 font-bold"}>
              {prioritizedProblemIds.length}/3
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowRubric((v) => !v)}
            aria-expanded={showRubric}
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-neutral-700 bg-neutral-900 text-white hover:border-[#13E1BC] transition-colors"
          >
            <span>{isEn ? "Rubric Weights" : "Critérios & Pesos"}</span>
            {showRubric ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => setShowRefComparison((v) => !v)}
            aria-expanded={showRefComparison}
            className={`inline-flex items-center gap-1.5 px-3 py-2 border transition-colors ${
              showRefComparison
                ? "border-[#13E1BC] bg-[#13E1BC]/15 text-[#13E1BC]"
                : "border-neutral-700 bg-neutral-900 text-neutral-200 hover:border-[#13E1BC]"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{isEn ? "Compare w/ Reference" : "Comparar Referência"}</span>
          </button>
        </div>
      </div>

      {/* Expandable Transparent Scoring Rubric */}
      {showRubric && (
        <div className="p-5 border border-[#13E1BC]/35 bg-[#13E1BC]/[0.03] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-[#13E1BC] font-semibold uppercase tracking-wider">
              {isEn
                ? "Decision Support Formula (Max 100 pts)"
                : "Regra Transparente de Apoio à Decisão (Máx. 100 pts)"}
            </span>
            <span className="text-neutral-400">
              {isEn
                ? "(User×5 + Ops×5 + Freq×4 + Risk×4) + (6 − Effort)×2"
                : "(Usuário×5 + Operação×5 + Freq×4 + Risco×4) + (6 − Esforço)×2"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
            {rubric.map((r) => (
              <div key={r.key} className="p-3 border border-neutral-800 bg-[#080808] space-y-1">
                <span className="font-mono text-[#13E1BC] font-semibold block">{r.label}</span>
                <p className="text-[11px] text-neutral-300 leading-snug">{r.scaleMeaning}</p>
                <span className="text-[10px] font-mono text-neutral-500 block pt-1">
                  {r.weightNote}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visitor Ordered Queue + Optional Comparison vs Reference Prioritization */}
      {(visitorOrderedProblems.length > 0 || showRefComparison) && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className={`${showRefComparison ? "lg:col-span-6" : "lg:col-span-12"} p-5 border border-[#13E1BC]/35 bg-[#080808] space-y-3`}>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#13E1BC] uppercase tracking-wider font-semibold">
                {isEn ? "Your Priority Order (1st → 3rd)" : "Sua Ordem de Prioridade (1º → 3º)"}
              </span>
              <span className="text-neutral-400">
                {isEn ? "Use arrows to rank" : "Ajuste a sequência com as setas"}
              </span>
            </div>

            {visitorOrderedProblems.length === 0 ? (
              <p className="text-xs text-neutral-400 font-mono">
                {isEn
                  ? "No problems prioritized yet — pick 2 or 3 below."
                  : "Nenhum problema selecionado ainda — escolha de 2 a 3 abaixo."}
              </p>
            ) : (
              <div className="space-y-2">
                {visitorOrderedProblems.map((prob, idx) => (
                  <div
                    key={prob.id}
                    className="p-3 border border-neutral-800 bg-neutral-950 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="px-2 py-0.5 font-mono font-bold bg-[#13E1BC] text-[#080808] shrink-0">
                        {idx + 1}º
                      </span>
                      <span className="font-mono text-[#13E1BC] shrink-0">{prob.code}</span>
                      <span className="text-white font-medium truncate">{prob.title}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => onMovePriorityOrder(prob.id, "up")}
                        aria-label={isEn ? `Move ${prob.code} up` : `Subir prioridade de ${prob.code}`}
                        className="p-1.5 border border-neutral-800 text-neutral-300 hover:border-white disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === visitorOrderedProblems.length - 1}
                        onClick={() => onMovePriorityOrder(prob.id, "down")}
                        aria-label={isEn ? `Move ${prob.code} down` : `Descer prioridade de ${prob.code}`}
                        className="p-1.5 border border-neutral-800 text-neutral-300 hover:border-white disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {showRefComparison && (
            <div className="lg:col-span-6 p-5 border border-neutral-700 bg-neutral-950 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white uppercase tracking-wider font-semibold">
                  {isEn ? "Reference Prioritization Benchmark" : "Priorização de Referência do Cenário"}
                </span>
                <span className="text-[10px] text-neutral-400">
                  {isEn ? "Context guide" : "Apoio didático"}
                </span>
              </div>
              <div className="space-y-2">
                {referenceOrderedProblems.map((prob, idx) => (
                  <div
                    key={prob.id}
                    className="p-2.5 border border-neutral-850 bg-[#080808] flex items-center gap-3 text-xs"
                  >
                    <span className="font-mono text-[#13E1BC] font-bold">#{idx + 1}</span>
                    <span className="font-mono text-neutral-400">{prob.code}</span>
                    <span className="text-neutral-200">{prob.title}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed pt-1">
                {scenario.referenceStrategy.summary}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Side-by-Side Comparison Panel when 2 problems are toggled */}
      {comparedProblems.length === 2 && (
        <div className="p-5 border border-neutral-700 bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between gap-2 text-xs font-mono">
            <span className="text-[#13E1BC] uppercase tracking-wider flex items-center gap-2">
              <GitCompare className="w-4 h-4" />
              <span>{isEn ? "Side-by-Side Problem Comparison" : "Comparação Direta Entre Problemas"}</span>
            </span>
            <span className="text-neutral-400">
              {comparedProblems[0].code} vs {comparedProblems[1].code}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400">
                  <th className="py-2 pr-4">{isEn ? "Criterion" : "Critério"}</th>
                  <th className="py-2 pr-4 text-white">
                    {comparedProblems[0].code} — {comparedProblems[0].title}
                  </th>
                  <th className="py-2 text-white">
                    {comparedProblems[1].code} — {comparedProblems[1].title}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {rubric.map((r) => (
                  <tr key={r.key}>
                    <td className="py-2 pr-4 text-neutral-400">{r.label}</td>
                    <td className="py-2 pr-4 text-neutral-200">
                      {formatScaleLevel(comparedProblems[0].scores[r.key], locale)}
                    </td>
                    <td className="py-2 text-neutral-200">
                      {formatScaleLevel(comparedProblems[1].scores[r.key], locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Prioritization Cards Grid */}
      <div className="space-y-3">
        {scenario.problems.map((problem) => {
          const breakdown = evaluateProblemPriority(problem, locale);
          const rankIndex = ranked.findIndex((r) => r.problemId === problem.id) + 1;
          const isPrioritized = prioritizedProblemIds.includes(problem.id);
          const isCompared = compareProblemIds.includes(problem.id);

          const bandTone =
            breakdown.band === "critical"
              ? "border-rose-500/40 bg-rose-950/30 text-rose-300"
              : breakdown.band === "high"
              ? "border-amber-500/40 bg-amber-950/30 text-amber-300"
              : "border-neutral-700 bg-neutral-900 text-neutral-300";

          return (
            <div
              key={problem.id}
              className={`p-5 border transition-colors space-y-4 ${
                isPrioritized
                  ? "border-[#13E1BC] bg-[#13E1BC]/[0.06]"
                  : "border-surface-border bg-[#080808]"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                    <span className="text-white font-bold">{problem.code}</span>
                    <span className={`px-2 py-0.5 border font-semibold ${bandTone}`}>
                      {breakdown.bandLabel}
                    </span>
                    <span className="px-2 py-0.5 border border-neutral-800 bg-neutral-950 text-[#13E1BC]">
                      {isEn ? "Support Index:" : "Índice de Apoio:"} {breakdown.compositeScore}/100 (#{rankIndex})
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-white">
                    {problem.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {problem.justification}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 font-mono text-xs">
                  <button
                    type="button"
                    aria-pressed={isCompared}
                    onClick={() => onToggleCompare(problem.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 border transition-colors ${
                      isCompared
                        ? "border-white bg-neutral-800 text-white"
                        : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <GitCompare className="w-3.5 h-3.5" />
                    <span>{isCompared ? (isEn ? "Comparing" : "Comparando") : isEn ? "Compare" : "Comparar"}</span>
                  </button>

                  <button
                    type="button"
                    aria-pressed={isPrioritized}
                    onClick={() => onTogglePrioritize(problem.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 border font-semibold transition-colors ${
                      isPrioritized
                        ? "border-[#13E1BC] bg-[#13E1BC] text-[#080808]"
                        : "border-[#13E1BC]/50 bg-[#080808] text-[#13E1BC] hover:bg-[#13E1BC]/15"
                    }`}
                  >
                    {isPrioritized ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isEn ? "Prioritized" : "Priorizado"}</span>
                      </>
                    ) : (
                      <>
                        <SquareCheck className="w-3.5 h-3.5" />
                        <span>{isEn ? "Select Priority" : "Priorizar Problema"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-3 border-t border-surface-borderSubtle text-[11px] font-mono">
                {rubric.map((r) => (
                  <div key={r.key} className="px-2.5 py-1.5 bg-neutral-950 border border-neutral-850 flex items-center justify-between gap-2">
                    <span className="text-neutral-400 truncate">{r.label}</span>
                    <span className="text-white font-semibold">{problem.scores[r.key]}/5</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
