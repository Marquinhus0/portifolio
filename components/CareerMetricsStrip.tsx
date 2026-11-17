"use client";

import { useLanguage } from "@/context/LanguageContext";
import { CAREER_METRICS } from "@/data/careerProfile";

export default function CareerMetricsStrip() {
  const { locale } = useLanguage();
  const items = CAREER_METRICS[locale];

  return (
    <section
      aria-label={locale === "en" ? "Career trajectory indicators" : "Indicadores de trajetória"}
      className="border-b border-surface-borderSubtle bg-[#090909]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 sm:py-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-surface-borderSubtle border border-surface-borderSubtle sm:border-y-0">
          {items.map((item, idx) => (
            <div
              key={item.label}
              className="bg-[#090909] p-5 sm:p-6 space-y-1.5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                <span>0{idx + 1}</span>
                <span className="w-6 h-[1px] bg-[#13E1BC]/50" />
              </div>
              <div className="space-y-1">
                <div className="text-lg sm:text-xl font-mono font-semibold text-[#13E1BC] tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-white">
                  {item.label}
                </div>
                <div className="text-xs font-mono text-neutral-400 leading-snug">
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
