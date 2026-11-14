"use client";

import { useLanguage } from "@/context/LanguageContext";
import { PHILOSOPHY_TRANSLATIONS } from "@/data/translations";

export default function PhilosophyBlock() {
  const { locale } = useLanguage();
  const t = PHILOSOPHY_TRANSLATIONS[locale];

  return (
    <section className="py-24 border-b border-surface-borderSubtle bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="border border-surface-border p-8 sm:p-14 lg:p-20 relative overflow-hidden bg-gradient-to-b from-neutral-900/30 to-transparent">
          {/* Subtle top accent bar */}
          <div className="absolute top-0 left-0 w-32 h-[2px] bg-[#13E1BC]" />

          {/* Accent coordinate */}
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-8 border-b border-surface-borderSubtle">
            <span className="uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
              <span>{t.eyebrow}</span>
            </span>
            <span>PHILOSOPHY // 01</span>
          </div>

          <div className="pt-10 max-w-4xl space-y-6">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tighter text-white uppercase leading-none">
              Design is not decoration.
            </h2>
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-300 leading-relaxed tracking-tight">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
          </div>

          <div className="pt-10 mt-8 border-t border-surface-borderSubtle/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <span>CLARITY OVER NOVELTY</span>
            <span>SYSTEMIC THINKING OVER ISOLATED SCREENS</span>
            <span>MEASURABLE OUTCOMES OVER SUBJECTIVE GUESSWORK</span>
          </div>
        </div>
      </div>
    </section>
  );
}
