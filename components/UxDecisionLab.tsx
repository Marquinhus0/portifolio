"use client";

import { AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { DECISION_LAB_COPY } from "@/data/decisionLabData";
import { useDecisionSimulator } from "@/components/decision-lab/useDecisionSimulator";
import LabStepperHeader from "@/components/decision-lab/LabStepperHeader";
import StepScenarioAndContext from "@/components/decision-lab/StepScenarioAndContext";
import StepInvestigationAndPrioritization from "@/components/decision-lab/StepInvestigationAndPrioritization";
import StepSolutionAndTradeOffs from "@/components/decision-lab/StepSolutionAndTradeOffs";
import StepAcceptanceAndReview from "@/components/decision-lab/StepAcceptanceAndReview";

export default function UxDecisionLab() {
  const { locale } = useLanguage();
  const isEn = locale === "en";
  const copy = DECISION_LAB_COPY[locale];

  const {
    scenarios,
    steps,
    state,
    currentScenario,
    currentStep,
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
  } = useDecisionSimulator(locale);

  const isFirstStep = state.currentStepIndex === 0;
  const isLastStep = state.currentStepIndex === steps.length - 1;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="pt-14 pb-10 border-b border-surface-borderSubtle bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono text-[#13E1BC] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
              <span>{copy.eyebrow}</span>
            </span>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-neutral-300">
              <span className="px-2 py-0.5 border border-neutral-800 bg-neutral-950 rounded-sm">
                {isEn ? "Discovery & Prioritization" : "Discovery & Priorização"}
              </span>
              <span className="px-2 py-0.5 border border-neutral-800 bg-neutral-950 rounded-sm">
                {isEn ? "Trade-off Matrix" : "Matriz de Trade-offs"}
              </span>
              <span className="px-2 py-0.5 border border-neutral-800 bg-neutral-950 rounded-sm">
                {isEn ? "QA Acceptance Coverage" : "Critérios de Aceite QA"}
              </span>
            </div>
          </div>

          <div className="max-w-4xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.08]">
              {copy.pageTitle}
            </h1>
            <p className="text-sm sm:text-lg text-neutral-300 font-light leading-relaxed max-w-3xl">
              {copy.pageSubtitle}
            </p>
          </div>

          <p className="text-xs font-mono text-neutral-400 border-l-2 border-[#13E1BC]/60 pl-3 py-0.5">
            {copy.ndaNotice}
          </p>
        </div>
      </section>

      {/* Main 8-Step Interactive Simulator Workspace */}
      <section className="py-10 md:py-14 border-b border-surface-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-6">
          <LabStepperHeader
            locale={locale}
            steps={steps}
            currentStepIndex={state.currentStepIndex}
            maxReachedStepIndex={state.maxReachedStepIndex}
            scenario={currentScenario}
            onGoToStep={goToStep}
            onRestart={() => restartSimulation()}
          />

          {/* Main Active Step Canvas */}
          <div className="border border-surface-border bg-neutral-950 p-6 sm:p-8 lg:p-10 space-y-8">
            {currentStep.id === "scenario" && (
              <StepScenarioAndContext
                mode="scenario"
                locale={locale}
                scenarios={scenarios}
                selectedScenario={currentScenario}
                contextAcknowledged={state.contextAcknowledged}
                onSelectScenario={selectScenario}
                onToggleContextAck={toggleContextAcknowledged}
              />
            )}

            {currentStep.id === "context" && (
              <StepScenarioAndContext
                mode="context"
                locale={locale}
                scenarios={scenarios}
                selectedScenario={currentScenario}
                contextAcknowledged={state.contextAcknowledged}
                onSelectScenario={selectScenario}
                onToggleContextAck={toggleContextAcknowledged}
              />
            )}

            {currentStep.id === "investigation" && (
              <StepInvestigationAndPrioritization
                mode="investigation"
                locale={locale}
                scenario={currentScenario}
                inspectedProblemIds={state.inspectedProblemIds}
                compareProblemIds={state.compareProblemIds}
                prioritizedProblemIds={state.prioritizedProblemIds}
                onInspectProblem={markProblemInspected}
                onToggleCompare={toggleCompareProblem}
                onTogglePrioritize={togglePrioritizedProblem}
              />
            )}

            {currentStep.id === "prioritization" && (
              <StepInvestigationAndPrioritization
                mode="prioritization"
                locale={locale}
                scenario={currentScenario}
                inspectedProblemIds={state.inspectedProblemIds}
                compareProblemIds={state.compareProblemIds}
                prioritizedProblemIds={state.prioritizedProblemIds}
                onInspectProblem={markProblemInspected}
                onToggleCompare={toggleCompareProblem}
                onTogglePrioritize={togglePrioritizedProblem}
              />
            )}

            {currentStep.id === "solution" && (
              <StepSolutionAndTradeOffs
                mode="solution"
                locale={locale}
                scenario={currentScenario}
                prioritizedProblemIds={state.prioritizedProblemIds}
                selectedSolutionsByProblem={state.selectedSolutionsByProblem}
                tradeOffAcknowledged={state.tradeOffAcknowledged}
                onSelectSolution={selectSolutionForProblem}
                onToggleTradeOffAck={toggleTradeOffAcknowledged}
              />
            )}

            {currentStep.id === "tradeoffs" && (
              <StepSolutionAndTradeOffs
                mode="tradeoffs"
                locale={locale}
                scenario={currentScenario}
                prioritizedProblemIds={state.prioritizedProblemIds}
                selectedSolutionsByProblem={state.selectedSolutionsByProblem}
                tradeOffAcknowledged={state.tradeOffAcknowledged}
                onSelectSolution={selectSolutionForProblem}
                onToggleTradeOffAck={toggleTradeOffAcknowledged}
              />
            )}

            {currentStep.id === "acceptance" && (
              <StepAcceptanceAndReview
                mode="acceptance"
                locale={locale}
                scenarios={scenarios}
                scenario={currentScenario}
                selectedQaIds={state.selectedQaIds}
                strategyNotes={state.strategyNotes}
                report={evaluationReport}
                onToggleQa={toggleQaScenario}
                onChangeNotes={setStrategyNotes}
                onRestart={restartSimulation}
              />
            )}

            {currentStep.id === "review" && (
              <StepAcceptanceAndReview
                mode="review"
                locale={locale}
                scenarios={scenarios}
                scenario={currentScenario}
                selectedQaIds={state.selectedQaIds}
                strategyNotes={state.strategyNotes}
                report={evaluationReport}
                onToggleQa={toggleQaScenario}
                onChangeNotes={setStrategyNotes}
                onRestart={restartSimulation}
              />
            )}

            {/* Explicit Step Validation Feedback */}
            {state.validationError && (
              <div
                role="alert"
                className="p-4 border border-amber-500/40 bg-amber-950/20 text-amber-200 text-xs font-mono flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>{state.validationError}</span>
              </div>
            )}

            {/* Step Footer Controls */}
            <div className="pt-6 border-t border-surface-borderSubtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs font-mono text-neutral-400">
                {currentStep.purpose}
              </div>

              <div className="flex items-center gap-3 shrink-0 font-mono text-xs uppercase tracking-wider">
                <button
                  type="button"
                  disabled={isFirstStep}
                  onClick={prevStep}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-neutral-800 bg-[#080808] text-neutral-300 hover:border-white hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{isEn ? "Previous Step" : "Etapa Anterior"}</span>
                </button>

                {!isLastStep && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#13E1BC] text-[#080808] font-semibold hover:bg-white transition-colors"
                  >
                    <span>
                      {state.currentStepIndex === steps.length - 2
                        ? isEn
                          ? "Generate Decision Report"
                          : "Gerar Relatório de Decisão"
                        : isEn
                        ? "Continue"
                        : "Avançar Etapa"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
