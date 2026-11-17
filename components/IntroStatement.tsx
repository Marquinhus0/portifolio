"use client";

import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { INTRO_TRANSLATIONS } from "@/data/translations";

export default function IntroStatement() {
  const { locale } = useLanguage();
  const isEn = locale === "en";
  const t = INTRO_TRANSLATIONS[locale];

  return (
    <section className="py-20 md:py-24 border-b border-surface-borderSubtle bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Headline Column */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
              <span>{t.eyebrow}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
              {t.titleLine1}
              <span className="block text-neutral-400 font-light">{t.titleLine2}</span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              {t.body}
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-neutral-300">
              <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-sm">
                B2B &amp; Enterprise
              </span>
              <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-sm">
                {isEn ? "ERP Systems" : "Sistemas ERP"}
              </span>
              <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-sm">
                Figma &amp; React Prototyping
              </span>
            </div>
          </div>

          {/* 4 Pillars Matrix */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.pillars.map((item, idx) => (
              <div
                key={item.code}
                className="p-6 border border-surface-border bg-neutral-950/80 hover:border-[#13E1BC]/50 transition-colors flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-850 pb-2.5">
                    <span className="text-xs font-mono tracking-widest text-neutral-400 group-hover:text-[#13E1BC] transition-colors">
                      0{idx + 1} {"//"} [{item.code}]
                    </span>
                    <span className="w-1.5 h-1.5 bg-neutral-600 group-hover:bg-[#13E1BC] rounded-full transition-colors" />
                  </div>
                  <h3 className="text-base font-medium text-white tracking-tight">
                    {item.label}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-900">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                    {t.impactLabel}
                  </span>
                  <p className="text-[11px] text-neutral-300 font-mono pt-0.5 leading-snug">
                    {item.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Connective Summary Strip */}
        <div className="p-4 sm:p-5 border border-neutral-800 border-l-2 border-l-[#13E1BC] bg-neutral-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3 text-neutral-200">
            <CheckCircle2 className="w-4 h-4 text-[#13E1BC] shrink-0" />
            <span className="text-sm font-medium text-white tracking-tight">
              &ldquo;{isEn
                ? "Connecting these four pillars keeps product decisions aligned across business rules, design, and engineering."
                : "É conectando essas frentes que reduzo ruídos entre regras de negócio, design, engenharia e QA."}&rdquo;
            </span>
          </div>
          <span className="text-[11px] text-neutral-400 uppercase tracking-wider shrink-0">
            {isEn ? "[Design ↔ Engineering Alignment]" : "[Alinhamento Design ↔ Engenharia]"}
          </span>
        </div>
      </div>
    </section>
  );
}
