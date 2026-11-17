import type { Locale } from "@/context/LanguageContext";
import type { ScaleLevel, ScenarioProblem } from "./types";

export interface PriorityBreakdown {
  problemId: string;
  compositeScore: number; // Transparent range out of 100
  valueScore: number;
  effortPenalty: number;
  band: "critical" | "high" | "moderate";
  bandLabel: string;
  explanation: string;
}

export interface DimensionRubricItem {
  key: keyof ScenarioProblem["scores"];
  label: string;
  scaleMeaning: string;
  weightNote: string;
}

export const DIMENSION_RUBRIC: Record<Locale, DimensionRubricItem[]> = {
  pt: [
    {
      key: "userImpact",
      label: "Impacto para o Usuário",
      scaleMeaning: "1 = atrito pontual • 5 = bloqueio severo no fluxo diário",
      weightNote: "Peso 25% — reduz carga cognitiva e erro operacional na ponta",
    },
    {
      key: "operationalImpact",
      label: "Impacto Operacional",
      scaleMeaning: "1 = rotina isolada • 5 = paralisa equipe ou caixa inteiro",
      weightNote: "Peso 25% — mede efeito no throughput e filas de atendimento",
    },
    {
      key: "frequency",
      label: "Frequência",
      scaleMeaning: "1 = exceção rara • 5 = ocorre múltiplas vezes por turno",
      weightNote: "Peso 20% — dor recorrente acumula tempo perdido rapidamente",
    },
    {
      key: "businessRisk",
      label: "Risco ao Negócio",
      scaleMeaning: "1 = baixo risco • 5 = risco fiscal, financeiro ou de margem",
      weightNote: "Peso 20% — protege compliance, receita e consistência",
    },
    {
      key: "implementationEffort",
      label: "Esforço Estimado",
      scaleMeaning: "1 = ajuste simples de UI • 5 = refatoração profunda de back-end",
      weightNote: "Fator moderador (-10%) — equilibra valor rápido vs. débito técnico",
    },
  ],
  en: [
    {
      key: "userImpact",
      label: "User Impact",
      scaleMeaning: "1 = minor friction • 5 = severe daily workflow block",
      weightNote: "25% weight — reduces cognitive strain and frontline error",
    },
    {
      key: "operationalImpact",
      label: "Operational Impact",
      scaleMeaning: "1 = isolated task • 5 = stalls full lane or shift",
      weightNote: "25% weight — captures throughput and queue bottlenecks",
    },
    {
      key: "frequency",
      label: "Frequency",
      scaleMeaning: "1 = rare exception • 5 = recurs multiple times per shift",
      weightNote: "20% weight — recurring friction compounds quickly",
    },
    {
      key: "businessRisk",
      label: "Business Risk",
      scaleMeaning: "1 = low exposure • 5 = tax, compliance, or revenue risk",
      weightNote: "20% weight — safeguards auditability and revenue",
    },
    {
      key: "implementationEffort",
      label: "Implementation Effort",
      scaleMeaning: "1 = simple UI adjustment • 5 = deep backend refactor",
      weightNote: "Moderating factor (-10%) — weighs value vs delivery complexity",
    },
  ],
};

/**
 * Deterministic, fully explainable prioritization formula (max = 100):
 * Value component (max 90): userImpact*5 + operationalImpact*5 + frequency*4 + businessRisk*4
 * Effort adjustment (+2 to +10): (6 - implementationEffort) * 2
 * Exposed cleanly so visitors inspect how each criterion shapes the support score.
 */
export function evaluateProblemPriority(
  problem: ScenarioProblem,
  locale: Locale
): PriorityBreakdown {
  const s = problem.scores;
  const valueScore =
    s.userImpact * 5 +
    s.operationalImpact * 5 +
    s.frequency * 4 +
    s.businessRisk * 4;
  const effortBonus = (6 - s.implementationEffort) * 2;
  const compositeScore = Math.min(100, Math.max(10, valueScore + effortBonus));

  let band: PriorityBreakdown["band"] = "moderate";
  if (compositeScore >= 82 || s.businessRisk === 5) band = "critical";
  else if (compositeScore >= 68) band = "high";

  const bandLabels = {
    pt: {
      critical: "Prioridade Crítica (P0)",
      high: "Alta Prioridade (P1)",
      moderate: "Avaliação Secundária (P2)",
    },
    en: {
      critical: "Critical Priority (P0)",
      high: "High Priority (P1)",
      moderate: "Secondary Backlog (P2)",
    },
  };

  const explanation =
    locale === "en"
      ? `Value drivers contribute ${valueScore}/90 pts (User ${s.userImpact}/5, Ops ${s.operationalImpact}/5, Freq ${s.frequency}/5, Risk ${s.businessRisk}/5) plus +${effortBonus}/10 feasibility points for effort ${s.implementationEffort}/5.`
      : `Fatores de valor somam ${valueScore}/90 pts (Usuário ${s.userImpact}/5, Operação ${s.operationalImpact}/5, Freq. ${s.frequency}/5, Risco ${s.businessRisk}/5) e +${effortBonus}/10 pts de viabilidade frente ao esforço ${s.implementationEffort}/5.`;

  return {
    problemId: problem.id,
    compositeScore,
    valueScore,
    effortPenalty: s.implementationEffort * 2,
    band,
    bandLabel: bandLabels[locale][band],
    explanation,
  };
}

export function rankScenarioProblems(
  problems: ScenarioProblem[],
  locale: Locale
): PriorityBreakdown[] {
  return problems
    .map((p) => evaluateProblemPriority(p, locale))
    .sort((a, b) => b.compositeScore - a.compositeScore);
}

export function formatScaleLevel(level: ScaleLevel, locale: Locale): string {
  const labels = {
    pt: { 1: "1 · Muito Baixo", 2: "2 · Baixo", 3: "3 · Médio", 4: "4 · Alto", 5: "5 · Crítico" },
    en: { 1: "1 · Very Low", 2: "2 · Low", 3: "3 · Medium", 4: "4 · High", 5: "5 · Critical" },
  };
  return labels[locale][level];
}
