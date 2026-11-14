"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Scale, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { DECISION_LAB_COPY, DECISION_SCENARIOS } from "@/data/decisionLabData";

export default function DecisionLabPreviewSection() {
  const { locale } = useLanguage();
  const copy = DECISION_LAB_COPY[locale];
  const scenarios = DECISION_SCENARIOS[locale];
  const [activeIdx, setActiveIdx] = useState(0);

  const scenario = scenarios[activeIdx] || scenarios[0];
  const adoptedOption =
    scenario.options.find((opt) => opt.isRecommended) || scenario.options[2];

  return (
    <section className="py-20 md:py-24 border-b border-surface-borderSubtle bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="border border-surface-border bg-neutral-950 p-6 sm:p-10 lg:p-12 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-surface-borderSubtle">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
                <span>{copy.preview.eyebrow}</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
                {copy.preview.title}
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                {copy.preview.subtitle}
              </p>
            </div>

            <Link
              href={`/decision-lab?scenario=${scenario.code}`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#13E1BC] text-[#080808] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors shrink-0 self-start lg:self-end"
            >
              <Scale className="w-4 h-4" />
              <span>{copy.preview.cta}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Quick Scenario Picker */}
            <div className="lg:col-span-5 space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block pb-1">
                {copy.preview.promptLabel}
              </span>
              {scenarios.map((item, idx) => {
                const active = idx === activeIdx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-pressed={active}
                    className={`w-full text-left p-4 border transition-all flex items-start justify-between gap-3 ${
                      active
                        ? "border-[#13E1BC] bg-neutral-900"
                        : "border-neutral-850 bg-[#080808] hover:border-neutral-700"
                    }`}
                  >
                    <div className="space-y-1">
                      <span
                        className={`text-[11px] font-mono block ${
                          active ? "text-[#13E1BC]" : "text-neutral-500"
                        }`}
                      >
                        {item.code} {"//"} {item.domain}
                      </span>
                      <span className="text-sm font-medium text-white block leading-snug">
                        {item.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Selected Dilemma + Adopted Trade-off Snapshot */}
            <div className="lg:col-span-7 border border-neutral-850 bg-[#080808] p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                  <span className="text-neutral-400 uppercase tracking-wider">
                    {scenario.code} — {scenario.originTag}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#13E1BC]/15 border border-[#13E1BC]/40 text-[#13E1BC] rounded-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>{copy.preview.recommendedNote}</span>
                  </span>
                </div>

                <h3 className="text-xl font-medium text-white leading-snug">
                  {scenario.dilemma}
                </h3>

                <div className="p-4 border border-neutral-800 bg-neutral-950 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#13E1BC] block">
                    [{adoptedOption.id}] {adoptedOption.title}
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {adoptedOption.summary}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-borderSubtle flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <span className="text-neutral-400">
                  {scenario.options.length} alternativas • {scenario.thinkingFlow.length} etapas de raciocínio
                </span>
                <Link
                  href={`/decision-lab?scenario=${scenario.code}`}
                  className="inline-flex items-center gap-1 text-[#13E1BC] hover:underline"
                >
                  <span>
                    {locale === "en" ? "Simulate alternatives & QA criteria" : "Simular alternativas & critérios QA"}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
