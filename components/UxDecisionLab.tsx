"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Scale,
  GitBranch,
  Layers,
  ShieldCheck,
  Cpu,
  ChevronRight,
  Sparkles,
  ListChecks,
  AlertOctagon,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  DECISION_LAB_COPY,
  DECISION_SCENARIOS,
  type AxisLevel,
  type DecisionOption,
} from "@/data/decisionLabData";

type LabMode = "diagnosis" | "lab" | "thinking";
type PriorityFilter = "ALL" | "P0" | "P1" | "P2";

function AxisMeter({
  label,
  level,
  levelLabel,
  invertGood = false,
}: {
  label: string;
  level: AxisLevel;
  levelLabel: string;
  invertGood?: boolean;
}) {
  const segments = level === "high" ? 3 : level === "medium" ? 2 : 1;

  const toneClass = (() => {
    if (invertGood) {
      return level === "low"
        ? "bg-[#13E1BC]"
        : level === "medium"
        ? "bg-amber-400"
        : "bg-rose-400";
    }
    return level === "high"
      ? "bg-[#13E1BC]"
      : level === "medium"
      ? "bg-amber-400"
      : "bg-rose-400";
  })();

  const textToneClass = (() => {
    if (invertGood) {
      return level === "low"
        ? "text-[#13E1BC]"
        : level === "medium"
        ? "text-amber-300"
        : "text-rose-300";
    }
    return level === "high"
      ? "text-[#13E1BC]"
      : level === "medium"
      ? "text-amber-300"
      : "text-rose-300";
  })();

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11px] font-mono">
        <span className="text-neutral-400">{label}</span>
        <span className={`uppercase tracking-wider font-semibold ${textToneClass}`}>
          {levelLabel}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
        {[1, 2, 3].map((idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-sm transition-colors ${
              idx <= segments ? toneClass : "bg-neutral-850"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function UxDecisionLab() {
  const { locale } = useLanguage();
  const copy = DECISION_LAB_COPY[locale];
  const scenarios = DECISION_SCENARIOS[locale];

  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<DecisionOption["id"]>("A");
  const [mode, setMode] = useState<LabMode>("diagnosis");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("ALL");
  const [activeExtremeIdx, setActiveExtremeIdx] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  // Sync optional ?scenario=DL-01..03 parameter cleanly on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const code = params.get("scenario");
    if (!code) return;
    const matchIdx = scenarios.findIndex(
      (s) => s.code.toLowerCase() === code.toLowerCase() || s.id === code
    );
    if (matchIdx >= 0) {
      setActiveScenarioIdx(matchIdx);
    }
  }, [scenarios]);

  const scenario = scenarios[activeScenarioIdx] || scenarios[0];
  const selectedOption =
    scenario.options.find((opt) => opt.id === selectedOptionId) || scenario.options[0];
  const recommendedOption =
    scenario.options.find((opt) => opt.isRecommended) || scenario.options[2];
  const activeThinkingStep =
    scenario.thinkingFlow[activeStepIdx] || scenario.thinkingFlow[0];
  const activeExtremeState =
    scenario.extremeStates[activeExtremeIdx] || scenario.extremeStates[0];
  const visiblePriorities =
    priorityFilter === "ALL"
      ? scenario.prioritizationItems
      : scenario.prioritizationItems.filter((item) => item.priority === priorityFilter);

  const handleSelectScenario = (idx: number) => {
    setActiveScenarioIdx(idx);
    setSelectedOptionId("A");
    setPriorityFilter("ALL");
    setActiveExtremeIdx(0);
    setActiveStepIdx(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="pt-16 pb-12 border-b border-surface-borderSubtle bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono text-[#13E1BC] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
              <span>{copy.eyebrow}</span>
            </span>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-neutral-400">
              <span className="px-2 py-0.5 border border-neutral-800 bg-neutral-950 rounded-sm">
                {copy.pillarsLabel.business}
              </span>
              <span className="px-2 py-0.5 border border-neutral-800 bg-neutral-950 rounded-sm">
                {copy.pillarsLabel.design}
              </span>
              <span className="px-2 py-0.5 border border-neutral-800 bg-neutral-950 rounded-sm">
                {copy.pillarsLabel.engineering}
              </span>
            </div>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
              {copy.pageTitle}
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-3xl">
              {copy.pageSubtitle}
            </p>
          </div>

          <p className="text-xs font-mono text-neutral-400 border-l-2 border-[#13E1BC]/60 pl-3 py-0.5">
            {copy.ndaNotice}
          </p>
        </div>
      </section>

      {/* Main Interactive Workspace */}
      <section className="py-12 md:py-16 border-b border-surface-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
          {/* Scenario Selector Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            role="tablist"
            aria-label={copy.scenarioLabel}
          >
            {scenarios.map((item, idx) => {
              const active = idx === activeScenarioIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSelectScenario(idx)}
                  className={`text-left p-5 border transition-all flex flex-col justify-between gap-3 ${
                    active
                      ? "border-[#13E1BC] bg-neutral-900/70 shadow-[0_0_24px_rgba(19,225,188,0.08)]"
                      : "border-surface-border bg-neutral-950 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                    <span
                      className={`font-semibold tracking-wider ${
                        active ? "text-[#13E1BC]" : "text-neutral-400"
                      }`}
                    >
                      {item.code} {"//"} {item.domain}
                    </span>
                    <span className="px-1.5 py-0.5 text-[10px] border border-neutral-800 bg-neutral-900 text-neutral-300 rounded-sm shrink-0">
                      {item.originTag}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm sm:text-base font-medium text-white leading-snug">
                      {item.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Scenario Header + Mode Switch */}
          <div className="border border-surface-border bg-neutral-950 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-surface-borderSubtle">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#13E1BC]">
                  <span>{scenario.code}</span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-neutral-300">{scenario.domain}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                  {scenario.dilemma}
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {scenario.context}
                </p>
              </div>

              <div className="lg:w-80 shrink-0 space-y-3 p-4 border border-neutral-850 bg-[#080808]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                  {copy.constraintsHeading}
                </span>
                <ul className="space-y-2 text-xs text-neutral-300">
                  {scenario.constraints.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-[#13E1BC] font-mono font-bold shrink-0">
                        0{idx + 1}
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mode Switcher Tabs + Cross-link */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div
                className="inline-flex flex-wrap gap-2"
                role="tablist"
                aria-label={locale === "en" ? "Exploration mode" : "Modo de exploração"}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "diagnosis"}
                  onClick={() => setMode("diagnosis")}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider border transition-colors ${
                    mode === "diagnosis"
                      ? "border-[#13E1BC] bg-[#13E1BC]/10 text-[#13E1BC] font-semibold"
                      : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white"
                  }`}
                >
                  <ListChecks className="w-3.5 h-3.5" />
                  <span>{copy.modeTabs.diagnosis}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "lab"}
                  onClick={() => setMode("lab")}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider border transition-colors ${
                    mode === "lab"
                      ? "border-[#13E1BC] bg-[#13E1BC]/10 text-[#13E1BC] font-semibold"
                      : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white"
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{copy.modeTabs.lab}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "thinking"}
                  onClick={() => setMode("thinking")}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider border transition-colors ${
                    mode === "thinking"
                      ? "border-[#13E1BC] bg-[#13E1BC]/10 text-[#13E1BC] font-semibold"
                      : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white"
                  }`}
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>{copy.modeTabs.thinking}</span>
                </button>
              </div>

              <Link
                href={`/work/${scenario.relatedCaseSlug}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-[#13E1BC] transition-colors shrink-0"
              >
                <span>{scenario.relatedCaseLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* MODE 1: DIAGNOSIS & P0/P1/P2 PRIORITIZATION */}
            {mode === "diagnosis" && (
              <div className="space-y-6 pt-2">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-white">
                      {copy.diagnosisHeading}
                    </h3>
                    <p className="text-xs text-neutral-400 max-w-2xl">
                      {copy.diagnosisSubtitle}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {(["ALL", "P0", "P1", "P2"] as PriorityFilter[]).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        aria-pressed={priorityFilter === lvl}
                        onClick={() => setPriorityFilter(lvl)}
                        className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
                          priorityFilter === lvl
                            ? "border-[#13E1BC] bg-[#13E1BC] text-[#080808] font-bold"
                            : "border-neutral-800 bg-[#080808] text-neutral-400 hover:text-white"
                        }`}
                      >
                        {lvl === "ALL" ? (locale === "en" ? "All" : "Todos") : lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {visiblePriorities.map((item) => {
                    const badgeStyle =
                      item.priority === "P0"
                        ? "border-rose-500/40 bg-rose-950/30 text-rose-300"
                        : item.priority === "P1"
                        ? "border-amber-500/40 bg-amber-950/30 text-amber-300"
                        : "border-neutral-700 bg-neutral-900 text-neutral-300";

                    return (
                      <div
                        key={item.id}
                        className="p-5 border border-surface-border bg-[#080808] space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                            <span className={`px-2 py-0.5 border font-semibold ${badgeStyle}`}>
                              {item.priority}
                            </span>
                            <span className="text-neutral-400">
                              {locale === "en" ? "Frequency:" : "Frequência:"}{" "}
                              <strong className="text-white">{item.frequency}</strong>
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-medium text-white leading-snug">
                            {item.issue}
                          </h4>
                          <p className="text-xs text-neutral-300 leading-relaxed">
                            <span className="text-amber-300 font-mono">
                              {locale === "en" ? "Risk: " : "Risco: "}
                            </span>
                            {item.businessRisk}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-surface-borderSubtle text-xs text-neutral-400 leading-relaxed">
                          <span className="text-[#13E1BC] font-mono">
                            {locale === "en" ? "Rationale: " : "Critério: "}
                          </span>
                          {item.rationale}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MODE 2: AS-IS -> TO-BE ARCHITECTURE & TRADE-OFFS */}
            {mode === "lab" && (
              <div className="space-y-6 pt-2">
                {/* As-Is vs To-Be Architectural Strip */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="p-5 border border-amber-500/25 bg-amber-950/10 space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono text-amber-300 uppercase tracking-wider">
                      <span>{copy.asIsHeading}</span>
                      <span className="text-[10px] text-neutral-400">{scenario.asIsToBe.asIsTitle}</span>
                    </div>
                    <ol className="space-y-2 text-xs text-neutral-300">
                      {scenario.asIsToBe.asIsSteps.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2.5">
                          <span className="font-mono text-amber-300/80 shrink-0">0{sIdx + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="p-5 border border-[#13E1BC]/30 bg-[#13E1BC]/[0.04] space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#13E1BC] uppercase tracking-wider">
                      <span>{copy.toBeHeading}</span>
                      <span className="text-[10px] text-neutral-300">{scenario.asIsToBe.toBeTitle}</span>
                    </div>
                    <ol className="space-y-2 text-xs text-neutral-200">
                      {scenario.asIsToBe.toBeSteps.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2.5">
                          <span className="font-mono text-[#13E1BC] shrink-0">0{sIdx + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: 3 Selectable Alternatives */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="space-y-1 pb-1">
                    <h3 className="text-sm font-mono uppercase tracking-wider text-white">
                      {copy.optionsHeading}
                    </h3>
                    <p className="text-xs text-neutral-400">{copy.optionsHint}</p>
                  </div>

                  {scenario.options.map((opt) => {
                    const isSelected = opt.id === selectedOption.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedOptionId(opt.id)}
                        aria-pressed={isSelected}
                        className={`w-full text-left p-5 border transition-all space-y-2.5 ${
                          isSelected
                            ? opt.isRecommended
                              ? "border-[#13E1BC] bg-[#13E1BC]/[0.06]"
                              : "border-white bg-neutral-900"
                            : "border-surface-border bg-[#080808] hover:border-neutral-700"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                          <span
                            className={`font-bold uppercase tracking-wider ${
                              isSelected ? "text-white" : "text-neutral-400"
                            }`}
                          >
                            [{opt.id}] {opt.badge}
                          </span>
                          {opt.isRecommended && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#13E1BC]/15 border border-[#13E1BC]/40 text-[#13E1BC] rounded-sm text-[10px]">
                              <Sparkles className="w-3 h-3" />
                              <span>{copy.recommendedTag}</span>
                            </span>
                          )}
                        </div>
                        <div className="text-base font-medium text-white">
                          {opt.title}
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          {opt.summary}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Right Column: Live Impact & Trade-off Analysis */}
                <div className="lg:col-span-7 border border-surface-border bg-[#080808] p-6 space-y-6 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-borderSubtle pb-4">
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block">
                          {copy.analysisHeading}
                        </span>
                        <h3 className="text-xl font-medium text-white">
                          [{selectedOption.id}] {selectedOption.title}
                        </h3>
                      </div>

                      {!selectedOption.isRecommended && (
                        <button
                          type="button"
                          onClick={() => setSelectedOptionId(recommendedOption.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[#13E1BC]/50 text-[#13E1BC] hover:bg-[#13E1BC] hover:text-[#080808] transition-colors"
                        >
                          <span>{copy.compareCta}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* 3 Qualitative Axis Bars */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border border-neutral-850 bg-neutral-950">
                      <AxisMeter
                        label={copy.scoreLabels.operationalSpeed}
                        level={selectedOption.scores.operationalSpeed}
                        levelLabel={copy.levelLabels[selectedOption.scores.operationalSpeed]}
                      />
                      <AxisMeter
                        label={copy.scoreLabels.businessSafety}
                        level={selectedOption.scores.businessSafety}
                        levelLabel={copy.levelLabels[selectedOption.scores.businessSafety]}
                      />
                      <AxisMeter
                        label={copy.scoreLabels.engineeringComplexity}
                        level={selectedOption.scores.engineeringComplexity}
                        levelLabel={
                          copy.levelLabels[selectedOption.scores.engineeringComplexity]
                        }
                        invertGood
                      />
                    </div>

                    {/* Gains vs Sacrifices */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-emerald-500/25 bg-emerald-950/10 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#13E1BC]">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>{copy.gainsHeading}</span>
                        </div>
                        <ul className="space-y-2 text-xs text-neutral-200 leading-relaxed">
                          {selectedOption.gains.map((g, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#13E1BC] font-mono">+</span>
                              <span>{g}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 border border-amber-500/25 bg-amber-950/10 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>{copy.sacrificesHeading}</span>
                        </div>
                        <ul className="space-y-2 text-xs text-neutral-200 leading-relaxed">
                          {selectedOption.sacrifices.map((s, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-amber-300 font-mono">!</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* System Effect Footer */}
                  <div className="p-4 border border-neutral-800 bg-neutral-950 space-y-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      {copy.systemConsequenceHeading}
                    </span>
                    <p className="text-sm text-neutral-200 leading-relaxed">
                      {selectedOption.systemConsequence}
                    </p>
                  </div>
                </div>
                </div>
              </div>
            )}

            {/* MODE 3: EXTREME STATES (UX + QA) & PRODUCT THINKING FLOW */}
            {mode === "thinking" && (
              <div className="space-y-8 pt-2">
                {/* Extreme States Matrix */}
                <div className="p-5 sm:p-6 border border-surface-border bg-[#080808] space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300">
                      <AlertOctagon className="w-4 h-4 shrink-0" />
                      <span>{copy.extremeStatesHeading}</span>
                    </div>
                    <p className="text-xs text-neutral-400">{copy.extremeStatesSubtitle}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {scenario.extremeStates.map((ext, eIdx) => {
                      const active = eIdx === activeExtremeIdx;
                      return (
                        <button
                          key={ext.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setActiveExtremeIdx(eIdx)}
                          className={`text-left p-3.5 border transition-colors ${
                            active
                              ? "border-amber-400 bg-amber-950/20 text-white"
                              : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                          }`}
                        >
                          <span className="text-[10px] font-mono text-amber-300 block mb-1">
                            EDGE-0{eIdx + 1}
                          </span>
                          <span className="text-xs font-medium block leading-snug">
                            {ext.state}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2 border-t border-surface-borderSubtle text-xs">
                    <div className="p-4 border border-neutral-850 bg-neutral-950 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                        {locale === "en" ? "Trigger" : "Gatilho"}
                      </span>
                      <p className="text-neutral-200 leading-relaxed">{activeExtremeState.trigger}</p>
                    </div>
                    <div className="p-4 border border-neutral-850 bg-neutral-950 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#13E1BC] block">
                        {locale === "en" ? "Expected UI Behavior" : "Comportamento de UI Esperado"}
                      </span>
                      <p className="text-neutral-200 leading-relaxed">{activeExtremeState.uiBehavior}</p>
                    </div>
                    <div className="p-4 border border-[#13E1BC]/25 bg-[#13E1BC]/[0.03] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#13E1BC] block">
                        {locale === "en" ? "QA Acceptance Contract" : "Critério de Aceite QA"}
                      </span>
                      <p className="text-neutral-200 leading-relaxed font-mono text-[11px]">
                        {activeExtremeState.qaContract}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium text-white">
                        {copy.thinkingHeading}
                      </h3>
                      <p className="text-xs text-neutral-400 max-w-2xl">
                        {copy.thinkingSubtitle}
                      </p>
                    </div>
                  </div>

                {/* 5-Stage Interactive Stepper */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {scenario.thinkingFlow.map((step, idx) => {
                    const isCurrent = idx === activeStepIdx;
                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => setActiveStepIdx(idx)}
                        aria-pressed={isCurrent}
                        className={`p-3.5 border text-left transition-all space-y-1 ${
                          isCurrent
                            ? "border-[#13E1BC] bg-[#13E1BC]/10"
                            : "border-surface-border bg-[#080808] hover:border-neutral-700"
                        }`}
                      >
                        <span
                          className={`text-[10px] font-mono block ${
                            isCurrent ? "text-[#13E1BC]" : "text-neutral-500"
                          }`}
                        >
                          STEP {step.stepNumber}
                        </span>
                        <span className="text-xs font-medium text-white block leading-snug">
                          {step.title.split(":")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Step Details Card */}
                <div className="border border-surface-border bg-[#080808] p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-borderSubtle pb-4">
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-[#13E1BC] uppercase tracking-wider block">
                        Stage {activeThinkingStep.stepNumber} {"//"} {activeThinkingStep.subtitle}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-medium text-white">
                        {activeThinkingStep.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <Layers className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-400">
                        {activeStepIdx + 1} / {scenario.thinkingFlow.length}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeThinkingStep.bullets.map((b, i) => (
                      <div
                        key={i}
                        className="p-5 border border-neutral-850 bg-neutral-950 space-y-2"
                      >
                        <span className="text-xs font-mono uppercase tracking-wider text-[#13E1BC] block">
                          {b.label}
                        </span>
                        <p className="text-sm text-neutral-200 leading-relaxed">
                          {b.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border border-neutral-800 bg-neutral-900/50 flex items-start gap-3">
                    <Cpu className="w-4 h-4 text-[#13E1BC] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                        {copy.engineeringNoteHeading}
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                        {activeThinkingStep.engineeringNote}
                      </p>
                    </div>
                  </div>

                  {/* Next / Prev Stage Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-surface-borderSubtle">
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                      <ShieldCheck className="w-4 h-4 text-[#13E1BC]" />
                      <span>
                        {scenario.stakeholders.join(" • ")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={activeStepIdx === 0}
                        onClick={() => setActiveStepIdx((p) => Math.max(0, p - 1))}
                        className="px-3 py-1.5 text-xs font-mono border border-neutral-800 text-neutral-300 hover:border-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
                      >
                        {locale === "en" ? "← Previous" : "← Anterior"}
                      </button>
                      <button
                        type="button"
                        disabled={activeStepIdx === scenario.thinkingFlow.length - 1}
                        onClick={() =>
                          setActiveStepIdx((p) =>
                            Math.min(scenario.thinkingFlow.length - 1, p + 1)
                          )
                        }
                        className="px-3 py-1.5 text-xs font-mono border border-[#13E1BC]/60 text-[#13E1BC] hover:bg-[#13E1BC] hover:text-[#080808] disabled:opacity-40 disabled:pointer-events-none transition-colors"
                      >
                        {locale === "en" ? "Next Stage →" : "Próxima Etapa →"}
                      </button>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
