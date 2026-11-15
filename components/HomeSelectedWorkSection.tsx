"use client";

import Link from "next/link";
import { ArrowRight, Layers, ShieldCheck } from "lucide-react";
import CaseCard from "@/components/CaseCard";
import { casesData } from "@/data/cases";
import { useLanguage } from "@/context/LanguageContext";
import { HOME_TRANSLATIONS } from "@/data/translations";

export default function HomeSelectedWorkSection() {
  const { locale } = useLanguage();
  const t = HOME_TRANSLATIONS[locale];

  const featuredRealCase =
    casesData.find((c) => c.category === "real_product") || casesData[0];
  const authorialCases = casesData.filter((c) => c.id !== featuredRealCase.id);

  return (
    <section
      id="selected-work"
      className="py-20 md:py-24 border-b border-surface-borderSubtle bg-background"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-surface-borderSubtle">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
              <span>{t.workEyebrow}</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
              {t.workTitle}
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-mono text-neutral-400">
            <span>{t.workCountNote}</span>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-white hover:text-[#13E1BC] transition-colors uppercase tracking-wider shrink-0"
            >
              <span>{t.workAllLink}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 1. Featured Real Production Case (NDA-Safe) */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#13E1BC]">
              <ShieldCheck className="w-4 h-4" />
              <span>
                {locale === "en"
                  ? "01. Featured Real Production Experience • ALFA Software (NDA-Safe)"
                  : "01. Experiência Profissional Real em Destaque • ALFA Software (NDA-Safe)"}
              </span>
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              {locale === "en"
                ? "Architectural reconstruction with sanitized synthetic data"
                : "Reconstrução arquitetural com dados sintéticos sanitizados"}
            </span>
          </div>

          <CaseCard
            caseStudy={featuredRealCase}
            priority={true}
            horizontal={true}
          />
        </div>

        {/* 2. Authorial Case Studies & Interactive Prototypes (2x2 Grid) */}
        <div className="space-y-5 pt-6 border-t border-surface-borderSubtle">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-300">
              <Layers className="w-4 h-4 text-[#13E1BC]" />
              <span>
                {locale === "en"
                  ? "02–05. Authorial Case Studies & Interactive Prototypes"
                  : "02–05. Estudos Autorais & Protótipos Interativos"}
              </span>
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              {locale === "en"
                ? "Independent explorations with synthetic data & conceptual hypotheses"
                : "Explorações independentes com dados sintéticos e hipóteses conceituais"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {authorialCases.map((cs, idx) => (
              <CaseCard
                key={cs.id}
                caseStudy={cs}
                priority={idx < 2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
