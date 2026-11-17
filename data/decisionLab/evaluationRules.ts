import type { Locale } from "@/context/LanguageContext";
import type {
  DecisionScenarioConfig,
  QaTestScenarioItem,
  ScenarioProblem,
  SimulationState,
  SolutionAlternative,
  TradeOffDelta,
} from "./types";

export interface SelectedDecisionSummary {
  problem: ScenarioProblem;
  chosenAlternative: SolutionAlternative;
}

export interface EvaluationReport {
  scenario: DecisionScenarioConfig;
  prioritizedProblems: ScenarioProblem[];
  decisions: SelectedDecisionSummary[];
  aggregateTradeOffs: TradeOffDelta;
  selectedQaScenarios: QaTestScenarioItem[];
  unselectedEssentialQa: QaTestScenarioItem[];
  overlapCount: number;
  alignmentSummary: string;
  reasoningDifferences: string[];
  tradeOffObservations: string[];
}

function clampAxis(val: number): number {
  return Math.max(-2, Math.min(2, val));
}

export function computeAggregateTradeOffs(
  decisions: SelectedDecisionSummary[]
): TradeOffDelta {
  const sums: TradeOffDelta = {
    speedVsValidation: 0,
    flexibilityVsControl: 0,
    simplicityVsDensity: 0,
    autonomyVsGovernance: 0,
    easeVsTraceability: 0,
  };

  if (decisions.length === 0) return sums;

  for (const d of decisions) {
    const s = d.chosenAlternative.tradeOffShift;
    sums.speedVsValidation += s.speedVsValidation;
    sums.flexibilityVsControl += s.flexibilityVsControl;
    sums.simplicityVsDensity += s.simplicityVsDensity;
    sums.autonomyVsGovernance += s.autonomyVsGovernance;
    sums.easeVsTraceability += s.easeVsTraceability;
  }

  return {
    speedVsValidation: clampAxis(Math.round(sums.speedVsValidation / decisions.length)),
    flexibilityVsControl: clampAxis(Math.round(sums.flexibilityVsControl / decisions.length)),
    simplicityVsDensity: clampAxis(Math.round(sums.simplicityVsDensity / decisions.length)),
    autonomyVsGovernance: clampAxis(Math.round(sums.autonomyVsGovernance / decisions.length)),
    easeVsTraceability: clampAxis(Math.round(sums.easeVsTraceability / decisions.length)),
  };
}

export function describeTradeOffBias(
  axis: keyof TradeOffDelta,
  score: number,
  leftPole: string,
  rightPole: string,
  locale: Locale
): string {
  if (score === 0) {
    return locale === "en"
      ? `Balanced stance between ${leftPole} and ${rightPole}.`
      : `Postura equilibrada entre ${leftPole} e ${rightPole}.`;
  }
  const leanPole = score > 0 ? rightPole : leftPole;
  const magnitude =
    Math.abs(score) >= 2
      ? locale === "en"
        ? "Strong bias toward"
        : "Forte inclinação para"
      : locale === "en"
      ? "Leans toward"
      : "Tendência moderada para";

  return `${magnitude} ${leanPole} (${score > 0 ? `+${score}` : score}).`;
}

export function buildEvaluationReport(
  scenario: DecisionScenarioConfig,
  state: SimulationState,
  locale: Locale
): EvaluationReport {
  const prioritizedProblems = scenario.problems.filter((p) =>
    state.prioritizedProblemIds.includes(p.id)
  );

  const decisions: SelectedDecisionSummary[] = prioritizedProblems
    .map((problem) => {
      const chosenId = state.selectedSolutionsByProblem[problem.id];
      const chosenAlternative = problem.alternatives.find((a) => a.id === chosenId);
      if (!chosenAlternative) return null;
      return { problem, chosenAlternative };
    })
    .filter((d): d is SelectedDecisionSummary => d !== null);

  const aggregateTradeOffs = computeAggregateTradeOffs(decisions);

  const selectedQaScenarios = scenario.qaScenarios.filter((q) =>
    state.selectedQaIds.includes(q.id)
  );

  const unselectedEssentialQa = scenario.qaScenarios.filter(
    (q) =>
      q.recommendedCriticality === "essential" &&
      !state.selectedQaIds.includes(q.id)
  );

  const refSet = new Set(scenario.referenceStrategy.recommendedProblemIds);
  const overlapCount = prioritizedProblems.filter((p) => refSet.has(p.id)).length;

  const referenceMatchesCount = decisions.filter(
    (d) => d.chosenAlternative.isReferenceChoice
  ).length;

  const reasoningDifferences: string[] = [];

  if (overlapCount === refSet.size && prioritizedProblems.length === refSet.size) {
    reasoningDifferences.push(
      locale === "en"
        ? "Problem selection matches the scenario's core reference triage focus."
        : "Sua priorização coincidiu com o foco principal adotado na estratégia de referência."
    );
  } else {
    const visitorOnly = prioritizedProblems
      .filter((p) => !refSet.has(p.id))
      .map((p) => p.title);
    const refOnly = scenario.problems
      .filter((p) => refSet.has(p.id) && !state.prioritizedProblemIds.includes(p.id))
      .map((p) => p.title);

    if (visitorOnly.length > 0) {
      reasoningDifferences.push(
        locale === "en"
          ? `Your sequence emphasized: ${visitorOnly.join("; ")}. That shifts initial effort toward visible operator pain or governance areas ahead of the reference sequence.`
          : `Você priorizou primeiro: ${visitorOnly.join("; ")}. Isso desloca o ciclo inicial para alívio operacional imediato ou ajustes de governança distintos da trilha de referência.`
      );
    }
    if (refOnly.length > 0) {
      reasoningDifferences.push(
        locale === "en"
          ? `The reference strategy also prioritized: ${refOnly.join("; ")} to stabilize downstream integrity before expanding enhancements.`
          : `A estratégia de referência também priorizava: ${refOnly.join("; ")} para proteger integridade estrutural antes de evoluções complementares.`
      );
    }
  }

  if (decisions.length > 0 && referenceMatchesCount < decisions.length) {
    const alternativeChoices = decisions
      .filter((d) => !d.chosenAlternative.isReferenceChoice)
      .map(
        (d) =>
          `${d.problem.code}: [${d.chosenAlternative.label}] ${d.chosenAlternative.title} — ${d.chosenAlternative.limitation}`
      );
    reasoningDifferences.push(
      locale === "en"
        ? `Alternative architecture trade-offs chosen: ${alternativeChoices.join(" | ")}`
        : `Escolhas alternativas assumidas no desenho: ${alternativeChoices.join(" | ")}`
    );
  } else if (decisions.length > 0) {
    reasoningDifferences.push(
      locale === "en"
        ? "Solution paths aligned with balanced safeguards between speed, rule integrity, and engineering effort."
        : "Suas decisões de solução convergiram com alternativas equilibradas entre agilidade de uso, segurança de regra e esforço técnico."
    );
  }

  const tradeOffObservations = scenario.tradeOffAxes.map((axis) => {
    const val = aggregateTradeOffs[axis.id];
    return `${axis.leftPole} ↔ ${axis.rightPole}: ${describeTradeOffBias(
      axis.id,
      val,
      axis.leftPole,
      axis.rightPole,
      locale
    )}`;
  });

  const alignmentSummary =
    locale === "en"
      ? `You prioritized ${prioritizedProblems.length} critical problems, defined ${decisions.length} contextual solutions, and specified ${selectedQaScenarios.length}/${scenario.qaScenarios.length} QA test scenarios. Below is how your rationale compares with the baseline reference path.`
      : `Você priorizou ${prioritizedProblems.length} problemas, definiu ${decisions.length} soluções contextuais e selecionou ${selectedQaScenarios.length}/${scenario.qaScenarios.length} cenários na proposta de cobertura QA. Abaixo está o contraste objetivo com a estratégia de referência do cenário.`;

  return {
    scenario,
    prioritizedProblems,
    decisions,
    aggregateTradeOffs,
    selectedQaScenarios,
    unselectedEssentialQa,
    overlapCount,
    alignmentSummary,
    reasoningDifferences,
    tradeOffObservations,
  };
}
