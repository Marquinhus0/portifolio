"use client";

import { Building2, CheckSquare, ShieldAlert, Square, Target, Users } from "lucide-react";
import type { Locale } from "@/context/LanguageContext";
import type { DecisionScenarioConfig, ScenarioCode } from "@/data/decisionLab/types";

interface StepScenarioAndContextProps {
  mode: "scenario" | "context";
  locale: Locale;
  scenarios: DecisionScenarioConfig[];
  selectedScenario: DecisionScenarioConfig;
  contextAcknowledged: boolean;
  onSelectScenario: (code: ScenarioCode) => void;
  onToggleContextAck: (checked: boolean) => void;
}

export default function StepScenarioAndContext({
  mode,
  locale,
  scenarios,
  selectedScenario,
  contextAcknowledged,
  onSelectScenario,
  onToggleContextAck,
}: StepScenarioAndContextProps) {
  const isEn = locale === "en";

  if (mode === "scenario") {
    return (
      <div className="space-y-6">
        <div className="space-y-2 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] block">
            {isEn ? "Stage 01 // Choose System Context" : "Etapa 01 // Seleção do Cenário"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
            {isEn
              ? "Which operational environment do you want to analyze?"
              : "Qual contexto operacional corporativo você deseja investigar?"}
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            {isEn
              ? "Each scenario simulates real tension between operator speed, business safeguards, and engineering effort across 5 documented symptoms."
              : "Cada cenário apresenta tensões reais entre agilidade operacional, integridade de dados e esforço técnico com 5 problemas e alternativas contextuais."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5" role="radiogroup" aria-label={isEn ? "Scenarios" : "Cenários"}>
          {scenarios.map((item) => {
            const active = item.code === selectedScenario.code;
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onSelectScenario(item.code)}
                className={`text-left p-6 border transition-all flex flex-col justify-between gap-5 ${
                  active
                    ? "border-[#13E1BC] bg-[#13E1BC]/[0.06] shadow-[0_0_24px_rgba(19,225,188,0.08)]"
                    : "border-surface-border bg-[#080808] hover:border-neutral-600"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                    <span className={active ? "text-[#13E1BC] font-bold" : "text-neutral-400"}>
                      {item.code} {"//"} {item.domain}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] border border-neutral-800 bg-neutral-950 text-neutral-300 rounded-sm">
                      {item.problems.length} {isEn ? "problems" : "problemas"}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-white leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {item.dilemma}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-borderSubtle flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">{item.originTag}</span>
                  <span className={active ? "text-[#13E1BC] font-semibold" : "text-neutral-400"}>
                    {active
                      ? isEn
                        ? "Selected ✓"
                        : "Selecionado ✓"
                      : isEn
                      ? "Select →"
                      : "Selecionar →"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] block">
          {isEn
            ? `Stage 02 // Business Context (${selectedScenario.code})`
            : `Etapa 02 // Contexto de Negócio (${selectedScenario.code})`}
        </span>
        <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
          {selectedScenario.name}
        </h2>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          {selectedScenario.businessContext.overview}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scale & Stakeholders */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 border border-surface-border bg-[#080808] space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#13E1BC] flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>{isEn ? "Operational Scale" : "Escala da Operação"}</span>
            </span>
            <p className="text-xs sm:text-sm text-neutral-200 font-mono leading-relaxed">
              {selectedScenario.businessContext.operationScale}
            </p>
          </div>

          <div className="p-5 border border-surface-border bg-[#080808] space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-[#13E1BC]" />
              <span>{isEn ? "Involved Actors" : "Atores Envolvidos"}</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedScenario.businessContext.stakeholders.map((actor) => (
                <span
                  key={actor}
                  className="px-2.5 py-1 text-xs font-mono text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-sm"
                >
                  {actor}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 border border-surface-border bg-[#080808] space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-[#13E1BC]" />
              <span>{isEn ? "Operational Signals to Watch" : "Indicadores Observados"}</span>
            </span>
            <ul className="space-y-1.5 text-xs text-neutral-300 font-mono">
              {selectedScenario.businessContext.keyMetricsWatch.map((m) => (
                <li key={m} className="flex items-start gap-2">
                  <span className="text-[#13E1BC]">›</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Constraints + Confirmation Gate */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-5">
          <div className="p-6 border border-surface-border bg-[#080808] space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              <span>{isEn ? "Non-Negotiable Business & Technical Constraints" : "Restrições de Negócio & Operação"}</span>
            </span>
            <ul className="space-y-3 text-sm text-neutral-200">
              {selectedScenario.businessContext.constraints.map((c, idx) => (
                <li key={c} className="flex items-start gap-3 leading-relaxed">
                  <span className="font-mono text-xs text-[#13E1BC] font-bold shrink-0 pt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => onToggleContextAck(!contextAcknowledged)}
            aria-pressed={contextAcknowledged}
            className={`w-full text-left p-5 border transition-colors flex items-start gap-3 ${
              contextAcknowledged
                ? "border-[#13E1BC] bg-[#13E1BC]/10 text-white"
                : "border-neutral-700 bg-neutral-950 text-neutral-300 hover:border-neutral-500"
            }`}
          >
            {contextAcknowledged ? (
              <CheckSquare className="w-5 h-5 text-[#13E1BC] shrink-0 mt-0.5" />
            ) : (
              <Square className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <span className="text-xs sm:text-sm font-medium block">
                {isEn
                  ? "I understand the operational constraints and business tension of this scenario"
                  : "Compreendi o contexto operacional, os atores e as restrições deste cenário"}
              </span>
              <span className="text-[11px] font-mono text-neutral-400 block">
                {isEn
                  ? "Required confirmation to start problem investigation"
                  : "Confirmação necessária para avançar à investigação dos problemas"}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
