"use client";

import { useState, useEffect, useCallback } from "react";
import type { Locale } from "@/context/LanguageContext";
import {
  DECISION_SIMULATOR_SCENARIOS,
  SIMULATOR_STEPS,
} from "@/data/decisionLab/scenarios";
import { buildEvaluationReport } from "@/data/decisionLab/evaluationRules";
import type {
  DecisionScenarioConfig,
  ScenarioCode,
  SimulationState,
} from "@/data/decisionLab/types";

function createInitialState(code: ScenarioCode = "DL-01"): SimulationState {
  return {
    selectedScenarioCode: code,
    currentStepIndex: 0,
    maxReachedStepIndex: 0,
    contextAcknowledged: false,
    inspectedProblemIds: [],
    compareProblemIds: [null, null],
    prioritizedProblemIds: [],
    selectedSolutionsByProblem: {},
    tradeOffAcknowledged: false,
    selectedQaIds: [],
    strategyNotes: "",
    validationError: null,
  };
}

export function useDecisionSimulator(locale: Locale) {
  const scenarios = DECISION_SIMULATOR_SCENARIOS[locale];
  const steps = SIMULATOR_STEPS[locale];

  const [state, setState] = useState<SimulationState>(() =>
    createInitialState("DL-01")
  );

  // Sync optional ?scenario=DL-01..03 query parameter cleanly on initial mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const param = params.get("scenario")?.toUpperCase();
    if (param === "DL-01" || param === "DL-02" || param === "DL-03") {
      setState((prev) =>
        prev.selectedScenarioCode === param
          ? prev
          : { ...createInitialState(param), currentStepIndex: 1, maxReachedStepIndex: 1 }
      );
    }
  }, []);

  const currentScenario: DecisionScenarioConfig =
    scenarios.find((s) => s.code === state.selectedScenarioCode) || scenarios[0];

  const selectScenario = useCallback((code: ScenarioCode) => {
    setState((prev) => {
      if (prev.selectedScenarioCode === code) {
        return { ...prev, validationError: null };
      }
      return createInitialState(code);
    });
  }, []);

  const toggleContextAcknowledged = useCallback((checked: boolean) => {
    setState((prev) => ({
      ...prev,
      contextAcknowledged: checked,
      validationError: null,
    }));
  }, []);

  const markProblemInspected = useCallback((problemId: string) => {
    setState((prev) => {
      if (prev.inspectedProblemIds.includes(problemId)) {
        return { ...prev, validationError: null };
      }
      return {
        ...prev,
        inspectedProblemIds: [...prev.inspectedProblemIds, problemId],
        validationError: null,
      };
    });
  }, []);

  const toggleCompareProblem = useCallback((problemId: string) => {
    setState((prev) => {
      const [first, second] = prev.compareProblemIds;
      if (first === problemId) return { ...prev, compareProblemIds: [second, null] };
      if (second === problemId) return { ...prev, compareProblemIds: [first, null] };
      if (!first) return { ...prev, compareProblemIds: [problemId, second] };
      if (!second) return { ...prev, compareProblemIds: [first, problemId] };
      return { ...prev, compareProblemIds: [second, problemId] };
    });
  }, []);

  const togglePrioritizedProblem = useCallback((problemId: string) => {
    setState((prev) => {
      const exists = prev.prioritizedProblemIds.includes(problemId);
      if (exists) {
        const nextIds = prev.prioritizedProblemIds.filter((id) => id !== problemId);
        const nextSolutions = { ...prev.selectedSolutionsByProblem };
        delete nextSolutions[problemId];
        return {
          ...prev,
          prioritizedProblemIds: nextIds,
          selectedSolutionsByProblem: nextSolutions,
          validationError: null,
        };
      }
      if (prev.prioritizedProblemIds.length >= 3) {
        return {
          ...prev,
          validationError:
            locale === "en"
              ? "Select up to 3 top priority problems to focus the cycle cleanly."
              : "Selecione no máximo 3 problemas prioritários para manter o foco deste ciclo.",
        };
      }
      return {
        ...prev,
        prioritizedProblemIds: [...prev.prioritizedProblemIds, problemId],
        validationError: null,
      };
    });
  }, [locale]);

  const selectSolutionForProblem = useCallback(
    (problemId: string, alternativeId: string) => {
      setState((prev) => ({
        ...prev,
        selectedSolutionsByProblem: {
          ...prev.selectedSolutionsByProblem,
          [problemId]: alternativeId,
        },
        tradeOffAcknowledged: false,
        validationError: null,
      }));
    },
    []
  );

  const toggleTradeOffAcknowledged = useCallback((checked: boolean) => {
    setState((prev) => ({
      ...prev,
      tradeOffAcknowledged: checked,
      validationError: null,
    }));
  }, []);

  const toggleQaScenario = useCallback((qaId: string) => {
    setState((prev) => {
      const exists = prev.selectedQaIds.includes(qaId);
      return {
        ...prev,
        selectedQaIds: exists
          ? prev.selectedQaIds.filter((id) => id !== qaId)
          : [...prev.selectedQaIds, qaId],
        validationError: null,
      };
    });
  }, []);

  const setStrategyNotes = useCallback((notes: string) => {
    setState((prev) => ({
      ...prev,
      strategyNotes: notes,
    }));
  }, []);

  const validateStep = useCallback(
    (stepIdx: number): string | null => {
      switch (stepIdx) {
        case 0:
          return state.selectedScenarioCode
            ? null
            : locale === "en"
            ? "Pick a scenario before continuing."
            : "Escolha um cenário antes de avançar.";
        case 1:
          return state.contextAcknowledged
            ? null
            : locale === "en"
            ? "Confirm you have reviewed the business constraints before moving to problem investigation."
            : "Confirme a leitura das restrições operacionais antes de iniciar a investigação.";
        case 2:
          return state.inspectedProblemIds.length >= 2
            ? null
            : locale === "en"
            ? "Inspect at least 2 problems in detail before moving to prioritization."
            : "Investigue ao menos 2 problemas em detalhes antes de avançar para a priorização.";
        case 3:
          if (state.prioritizedProblemIds.length < 2) {
            return locale === "en"
              ? "Select at least 2 priority problems (up to 3) to define solutions."
              : "Selecione ao menos 2 problemas prioritários (até 3) para avançar às decisões de solução.";
          }
          return null;
        case 4: {
          const missing = state.prioritizedProblemIds.filter(
            (id) => !state.selectedSolutionsByProblem[id]
          );
          if (missing.length > 0) {
            return locale === "en"
              ? `Choose a solution alternative for every prioritized problem (${missing.length} remaining).`
              : `Selecione uma alternativa de solução para todos os problemas priorizados (falta definir ${missing.length}).`;
          }
          return null;
        }
        case 5:
          return state.tradeOffAcknowledged
            ? null
            : locale === "en"
            ? "Review the trade-off conflicts and confirm awareness before defining acceptance criteria."
            : "Revise os conflitos de trade-off e confirme ciência antes de seguir para Critérios de Aceite & QA.";
        case 6:
          return state.selectedQaIds.length >= 2
            ? null
            : locale === "en"
            ? "Select at least 2 QA test scenarios to include in your coverage proposal."
            : "Selecione ao menos 2 cenários de QA para compor sua proposta de cobertura de testes.";
        default:
          return null;
      }
    },
    [locale, state]
  );

  const nextStep = useCallback(() => {
    setState((prev) => {
      const error = validateStep(prev.currentStepIndex);
      if (error) {
        return { ...prev, validationError: error };
      }
      const nextIdx = Math.min(steps.length - 1, prev.currentStepIndex + 1);
      return {
        ...prev,
        currentStepIndex: nextIdx,
        maxReachedStepIndex: Math.max(prev.maxReachedStepIndex, nextIdx),
        validationError: null,
      };
    });
  }, [steps.length, validateStep]);

  const prevStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStepIndex: Math.max(0, prev.currentStepIndex - 1),
      validationError: null,
    }));
  }, []);

  const goToStep = useCallback((idx: number) => {
    setState((prev) => {
      if (idx < 0 || idx > prev.maxReachedStepIndex) return prev;
      return {
        ...prev,
        currentStepIndex: idx,
        validationError: null,
      };
    });
  }, []);

  const restartSimulation = useCallback((code?: ScenarioCode) => {
    setState((prev) => createInitialState(code || prev.selectedScenarioCode));
  }, []);

  const evaluationReport = buildEvaluationReport(currentScenario, state, locale);

  return {
    scenarios,
    steps,
    state,
    currentScenario,
    currentStep: steps[state.currentStepIndex],
    evaluationReport,
    selectScenario,
    toggleContextAcknowledged,
    markProblemInspected,
    toggleCompareProblem,
    togglePrioritizedProblem,
    selectSolutionForProblem,
    toggleTradeOffAcknowledged,
    toggleQaScenario,
    setStrategyNotes,
    nextStep,
    prevStep,
    goToStep,
    restartSimulation,
  };
}
