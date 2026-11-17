"use client";

import { CheckCircle2, RotateCcw } from "lucide-react";
import type { Locale } from "@/context/LanguageContext";
import type { DecisionScenarioConfig, StepDefinition } from "@/data/decisionLab/types";

interface LabStepperHeaderProps {
  locale: Locale;
  steps: StepDefinition[];
  currentStepIndex: number;
  maxReachedStepIndex: number;
  scenario: DecisionScenarioConfig;
  onGoToStep: (idx: number) => void;
  onRestart: () => void;
}

export default function LabStepperHeader({
  locale,
  steps,
  currentStepIndex,
  maxReachedStepIndex,
  scenario,
  onGoToStep,
  onRestart,
}: LabStepperHeaderProps) {
  const isEn = locale === "en";
  const progressPercent = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="border border-surface-border bg-neutral-950 p-5 sm:p-6 space-y-5">
      {/* Top Bar: Active Scenario + Overall Progress + Restart */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-borderSubtle pb-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <span className="px-2 py-0.5 bg-[#13E1BC]/15 border border-[#13E1BC]/40 text-[#13E1BC] font-semibold">
              {scenario.code}
            </span>
            <span className="text-neutral-300 uppercase tracking-wider">
              {scenario.name}
            </span>
          </div>
          <p className="text-xs font-mono text-neutral-400">
            {isEn
              ? `Step ${currentStepIndex + 1} of ${steps.length} — ${steps[currentStepIndex].title}`
              : `Etapa ${currentStepIndex + 1} de ${steps.length} — ${steps[currentStepIndex].title}`}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right font-mono">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
              {isEn ? "Simulation Progress" : "Progresso Geral"}
            </span>
            <span className="text-sm font-bold text-[#13E1BC]">{progressPercent}%</span>
          </div>

          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider border border-neutral-800 bg-[#080808] text-neutral-300 hover:border-[#13E1BC]/60 hover:text-white transition-colors"
            title={isEn ? "Restart current simulation" : "Reiniciar simulação atual"}
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#13E1BC]" />
            <span>{isEn ? "Restart" : "Reiniciar"}</span>
          </button>
        </div>
      </div>

      {/* Linear Progress Track */}
      <div
        className="h-1.5 w-full bg-neutral-900 overflow-hidden"
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={isEn ? "Simulation progress" : "Progresso da simulação"}
      >
        <div
          className="h-full bg-[#13E1BC] transition-all duration-300 motion-reduce:transition-none"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 8-Step Pill Navigation Grid */}
      <nav aria-label={isEn ? "Simulation steps" : "Etapas da simulação"}>
        <ol className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {steps.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex || (idx <= maxReachedStepIndex && idx !== currentStepIndex);
            const isUnlocked = idx <= maxReachedStepIndex;

            return (
              <li key={step.id}>
                <button
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => onGoToStep(idx)}
                  aria-current={isCurrent ? "step" : undefined}
                  className={`w-full text-left p-2.5 border transition-colors text-[11px] font-mono flex flex-col justify-between gap-1 h-full ${
                    isCurrent
                      ? "border-[#13E1BC] bg-[#13E1BC]/10 text-white font-semibold"
                      : isUnlocked
                      ? "border-neutral-800 bg-[#080808] text-neutral-300 hover:border-neutral-600 hover:text-white cursor-pointer"
                      : "border-neutral-900 bg-[#080808]/60 text-neutral-600 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 w-full">
                    <span className={isCurrent ? "text-[#13E1BC]" : "text-neutral-500"}>
                      {step.number}
                    </span>
                    {isCompleted && (
                      <CheckCircle2 className="w-3 h-3 text-[#13E1BC] shrink-0" aria-hidden="true" />
                    )}
                  </div>
                  <span className="truncate block w-full">{step.shortTitle}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
