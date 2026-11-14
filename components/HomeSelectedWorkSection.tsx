"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import CaseCard from "@/components/CaseCard";
import { casesData } from "@/data/cases";
import { useLanguage } from "@/context/LanguageContext";
import { HOME_TRANSLATIONS } from "@/data/translations";

export default function HomeSelectedWorkSection() {
  const { locale } = useLanguage();
  const t = HOME_TRANSLATIONS[locale];

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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {casesData.map((cs, idx) => (
            <CaseCard
              key={cs.id}
              caseStudy={cs}
              priority={idx < 2}
              horizontal={casesData.length % 2 === 1 && idx === casesData.length - 1}
            />
          ))}
        </div>

        {/* Transparency & NDA Notice linking to Experience */}
        <div className="p-6 border border-neutral-800 border-l-2 border-l-[#13E1BC] bg-neutral-950/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#13E1BC] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-white block uppercase tracking-wider font-medium">
                {t.ndaTitle}
              </span>
              <p className="leading-relaxed">{t.ndaDesc}</p>
            </div>
          </div>
          <a
            href="#experiencia"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-800 bg-neutral-900 text-white hover:border-[#13E1BC] hover:text-[#13E1BC] transition-colors uppercase tracking-wider shrink-0"
          >
            <span>{t.ndaCta}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
