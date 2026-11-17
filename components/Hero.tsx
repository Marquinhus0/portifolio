"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Layers, ShieldCheck, Briefcase } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { HERO_TRANSLATIONS } from "@/data/translations";

export default function Hero() {
  const { locale } = useLanguage();
  const t = HERO_TRANSLATIONS[locale];
  const tags = t.tags;
  const credentials = t.credentials;

  return (
    <section className="relative pt-10 pb-14 md:pt-16 md:pb-20 border-b border-surface-borderSubtle overflow-hidden">
      {/* Subtle focused ambient depth */}
      <div className="absolute top-1/4 -right-24 w-[26rem] h-[26rem] bg-[#13E1BC]/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main 12-Col Editorial Asymmetric Split */}
        <div className="pt-2 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          {/* Left: Positioning & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#13E1BC]">
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
                <span>{t.eyebrow}</span>
              </span>
              <span className="text-neutral-600 hidden sm:inline">•</span>
              <span className="text-neutral-400 text-[11px] hidden sm:inline">
                {locale === "en" ? "Brazil • Remote / Hybrid" : "Brasil • Remoto / Híbrido"}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-white leading-[1.02]">
              Product Designer
              <span className="text-neutral-300 font-light text-2xl sm:text-4xl md:text-[2.6rem] block pt-2.5 tracking-tight leading-[1.12]">
                {t.subtitleHero}
              </span>
            </h1>

            <div className="space-y-3 pt-1 max-w-2xl">
              <p className="text-lg sm:text-xl font-light text-neutral-100 leading-snug tracking-tight">
                {t.quote}
              </p>
              <p className="text-sm sm:text-[15px] text-neutral-400 font-normal leading-relaxed">
                {t.bio}
              </p>
            </div>

            {/* Primary CTA -> Featured Real Case; Secondary -> Browse Portfolio */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/work/erp-enterprise-redesign"
                className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider px-5 py-3.5 bg-[#13E1BC] text-[#080808] font-semibold hover:bg-white transition-colors duration-200 shadow-[0_0_24px_rgba(19,225,188,0.16)]"
              >
                <span>{t.exploreProjects}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="#selected-work"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-[#13E1BC] transition-colors duration-200 px-5 py-3.5 border border-surface-border bg-neutral-950 hover:border-[#13E1BC]/60"
              >
                <span>{t.contactMe}</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/resume"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors px-2 py-2"
              >
                <span>{t.resumeCta}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#13E1BC]" />
              </Link>
            </div>
          </div>

          {/* Right: Editorial Executive Snapshot Dossier */}
          <div className="lg:col-span-5">
            <div className="border border-surface-border bg-neutral-950/90 p-6 sm:p-7 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#13E1BC] via-[#13E1BC]/40 to-transparent" />

              <div className="flex items-center justify-between gap-3 border-b border-surface-borderSubtle pb-3.5 text-[11px] font-mono">
                <span className="text-[#13E1BC] uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
                  <Briefcase className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.dossierLabel}</span>
                </span>
                <span className="text-neutral-400 whitespace-nowrap shrink-0">
                  {t.dossierYears}
                </span>
              </div>

              <div className="divide-y divide-surface-borderSubtle/80">
                {credentials.map((item) => (
                  <div key={item.label} className="py-3.5 first:pt-0 last:pb-0 space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      {item.label}
                    </span>
                    <p className="text-sm font-medium text-white tracking-tight">
                      {item.value}
                    </p>
                    <p className="text-xs font-mono text-neutral-400">
                      {item.meta}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-surface-borderSubtle flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
                <span className="text-neutral-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#13E1BC] shrink-0" />
                  <span>
                    {locale === "en"
                      ? "1 Real ERP Case + 4 Authorial Studies"
                      : "1 Case Real ERP + 4 Estudos Autorais"}
                  </span>
                </span>
                <Link
                  href="/about"
                  className="text-white hover:text-[#13E1BC] transition-colors inline-flex items-center gap-1 shrink-0"
                >
                  <span>{locale === "en" ? "About" : "Sobre"}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Core Specialties Bar */}
        <div className="pt-6 border-t border-surface-borderSubtle/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-mono text-neutral-300 bg-neutral-900/80 border border-surface-border rounded-sm tracking-tight hover:border-[#13E1BC]/50 hover:text-[#13E1BC] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
            <Layers className="w-3.5 h-3.5 text-[#13E1BC]" />
            <span>{t.topDomain}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
