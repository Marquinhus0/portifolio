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
  priorityOrder: number;
  chosenAlternative: SolutionAlternative;
  discardedAlternatives: SolutionAlternative[];
}

export interface EvaluationReport {
  scenario: DecisionScenarioConfig;
  prioritizedProblems: ScenarioProblem[];
  decisions: SelectedDecisionSummary[];
  aggregateTradeOffs: TradeOffDelta;
  selectedQaScenarios: QaTestScenarioItem[];
  relevantQaForDecisions: QaTestScenarioItem[];
  unselectedEssentialQa: QaTestScenarioItem[];
  decisionLinkedCriteria: string[];
  overlapCount: number;
  alignmentSummary: string;
  synthesizedStrategySummary: string;
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
        ? "Strong emphasis on"
        : "Ênfase forte em"
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
  // Preserve visitor's exact priority ranking order!
  const prioritizedProblems = state.prioritizedProblemIds
    .map((id) => scenario.problems.find((p) => p.id === id))
    .filter((p): p is ScenarioProblem => Boolean(p));

  const decisions: SelectedDecisionSummary[] = prioritizedProblems
    .map((problem, idx) => {
      const chosenId = state.selectedSolutionsByProblem[problem.id];
      const chosenAlternative = problem.alternatives.find((a) => a.id === chosenId);
      if (!chosenAlternative) return null;
      const discardedAlternatives = problem.alternatives.filter(
        (a) => a.id !== chosenAlternative.id
      );
      return {
        problem,
        priorityOrder: idx + 1,
        chosenAlternative,
        discardedAlternatives,
      };
    })
    .filter((d): d is SelectedDecisionSummary => d !== null);

  const aggregateTradeOffs = computeAggregateTradeOffs(decisions);

  const selectedProblemCodes = new Set(prioritizedProblems.map((p) => p.code));
  const relevantQaForDecisions = scenario.qaScenarios.filter((qa) =>
    qa.linkedProblemCodes.some((code) => selectedProblemCodes.has(code))
  );

  const selectedQaScenarios = scenario.qaScenarios.filter((q) =>
    state.selectedQaIds.includes(q.id)
  );

  const unselectedEssentialQa = scenario.qaScenarios.filter(
    (q) =>
      q.recommendedCriticality === "essential" &&
      !state.selectedQaIds.includes(q.id)
  );

  const decisionLinkedCriteria = decisions.map((d) => {
    const label = d.problem.code;
    const alt = d.chosenAlternative;
    return locale === "en"
      ? `[${label} -> Option ${alt.label}] Verify that "${alt.expectedBenefit}" holds under "${alt.dependencies[0] || "standard conditions"}" while mitigating: ${alt.risks[0] || alt.limitation}.`
      : `[${label} -> Alternativa ${alt.label}] Validar na entrega que "${alt.expectedBenefit}" funciona com "${alt.dependencies[0] || "fluxo padrão"}", mitigando o risco: ${alt.risks[0] || alt.limitation}.`;
  });

  const refSet = new Set(scenario.referenceStrategy.recommendedProblemIds);
  const overlapCount = prioritizedProblems.filter((p) => refSet.has(p.id)).length;
  const referenceMatchesCount = decisions.filter(
    (d) => d.chosenAlternative.isReferenceChoice
  ).length;

  const reasoningDifferences: string[] = [];

  if (overlapCount === refSet.size && prioritizedProblems.length === refSet.size) {
    const exactOrderMatches = prioritizedProblems.every(
      (p, idx) => p.id === scenario.referenceStrategy.recommendedProblemIds[idx]
    );
    reasoningDifferences.push(
      exactOrderMatches
        ? locale === "en"
          ? "Your prioritized problems and sequence order match the scenario's baseline reference strategy."
          : "Sua seleção e ordem de prioridade coincidiram exatamente com a trilha de referência deste cenário."
        : locale === "en"
        ? "You selected the same core problems as the reference strategy, shifting only the execution sequence."
        : "Você selecionou os mesmos problemas centrais da estratégia de referência, variando apenas a ordem de execução."
    );
  } else {
    const visitorOnly = prioritizedProblems
      .filter((p) => !refSet.has(p.id))
      .map((p) => `${p.code} (${p.title})`);
    const refOnly = scenario.problems
      .filter((p) => refSet.has(p.id) && !state.prioritizedProblemIds.includes(p.id))
      .map((p) => `${p.code} (${p.title})`);

    if (visitorOnly.length > 0) {
      reasoningDifferences.push(
        locale === "en"
          ? `Your triage prioritized: ${visitorOnly.join("; ")}. This favors solving those operational or structural gaps first.`
          : `Sua triagem deu foco inicial a: ${visitorOnly.join("; ")}. Isso antecipa a resolução dessas frentes antes da trilha de referência.`
      );
    }
    if (refOnly.length > 0) {
      reasoningDifferences.push(
        locale === "en"
          ? `The reference strategy prioritized: ${refOnly.join("; ")} earlier to protect downstream flow stability.`
          : `A trilha de referência priorizava antes: ${refOnly.join("; ")} para estabilizar integridade antes de otimizações secundárias.`
      );
    }
  }

  if (decisions.length > 0 && referenceMatchesCount < decisions.length) {
    const alternativeChoices = decisions
      .filter((d) => !d.chosenAlternative.isReferenceChoice)
      .map(
        (d) =>
          `${d.problem.code} [Opt ${d.chosenAlternative.label}]: ${d.chosenAlternative.limitation}`
      );
    reasoningDifferences.push(
      locale === "en"
        ? `Different solution trade-offs selected: ${alternativeChoices.join(" | ")}`
        : `Alternativas distintas adotadas e suas concessões: ${alternativeChoices.join(" | ")}`
    );
  } else if (decisions.length > 0) {
    reasoningDifferences.push(
      locale === "en"
        ? "Your selected solutions converged with balanced trade-offs between frontline flow, rule safety, and technical scope."
        : "As soluções selecionadas convergiram com escolhas equilibradas entre fluidez de uso, proteção da regra e esforço técnico."
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

  const synthesizedStrategySummary =
    state.strategyNotes.trim().length > 0
      ? state.strategyNotes.trim()
      : locale === "en"
      ? `Strategy focused first on ${prioritizedProblems.map((p) => `${p.code} (${p.title})`).join(", ")}, balancing operational continuity against assumed implementation constraints.`
      : `Estratégia direcionada primeiro para ${prioritizedProblems.map((p) => `${p.code} (${p.title})`).join(", ")}, assumindo os trade-offs e critérios de cobertura QA selecionados acima.`;

  const alignmentSummary =
    locale === "en"
      ? `You ranked ${prioritizedProblems.length} prioritized problems, evaluated ${decisions.length} solution sets (plus discarded alternatives), and mapped ${selectedQaScenarios.length}/${scenario.qaScenarios.length} QA coverage scenarios.`
      : `Você ordenou ${prioritizedProblems.length} problemas prioritários, definiu ${decisions.length} soluções (registrando alternativas descartadas) e selecionou ${selectedQaScenarios.length}/${scenario.qaScenarios.length} cenários de QA.`;

  return {
    scenario,
    prioritizedProblems,
    decisions,
    aggregateTradeOffs,
    selectedQaScenarios,
    relevantQaForDecisions,
    unselectedEssentialQa,
    decisionLinkedCriteria,
    overlapCount,
    alignmentSummary,
    synthesizedStrategySummary,
    reasoningDifferences,
    tradeOffObservations,
  };
}
