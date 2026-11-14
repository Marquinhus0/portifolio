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
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-surface-borderSubtle overflow-hidden">
      {/* Subtle brand ambient glow */}
      <div className="absolute top-1/4 -right-24 w-[28rem] h-[28rem] bg-[#13E1BC]/[0.05] rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#13E1BC]/[0.03] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Context Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-surface-borderSubtle/60 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#13E1BC] shadow-[0_0_8px_#13E1BC]" />
            <span className="text-neutral-200">Marcus Ritta</span>
            <span className="text-neutral-600">—</span>
            <span>Product Designer</span>
          </div>
          <div className="text-neutral-400 uppercase tracking-wider text-[11px]">
            {t.topDomain}
          </div>
        </div>

        {/* Main 12-Col Asymmetric Split */}
        <div className="pt-10 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          {/* Left: Positioning & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs sm:text-sm font-mono tracking-widest text-[#13E1BC] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
              <span>{t.eyebrow}</span>
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-semibold tracking-tighter text-white leading-[0.98]">
              Product Designer
              <span className="text-neutral-400 font-light text-2xl sm:text-4xl md:text-5xl block pt-2.5 tracking-tight">
                {t.subtitleHero}
              </span>
            </h1>

            <div className="space-y-3 pt-1 max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl font-light text-neutral-200 leading-snug tracking-tight">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
                {t.bio}
              </p>
            </div>

            {/* Primary and Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#selected-work"
                className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider px-5 py-3 bg-[#13E1BC] text-[#080808] font-semibold hover:bg-[#0db899] transition-colors shadow-[0_0_24px_rgba(19,225,188,0.18)]"
              >
                <span>{t.exploreProjects}</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-[#13E1BC] transition-colors px-5 py-3 border border-surface-border bg-neutral-950 hover:border-[#13E1BC]/60"
              >
                <span>{t.contactMe}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors px-2 py-2"
              >
                <span>{t.resumeCta}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#13E1BC]" />
              </Link>
            </div>
          </div>

          {/* Right: Executive Snapshot Dossier */}
          <div className="lg:col-span-5">
            <div className="border border-surface-border bg-neutral-950/90 p-6 sm:p-7 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#13E1BC] via-[#13E1BC]/40 to-transparent" />

              <div className="flex items-center justify-between border-b border-surface-borderSubtle pb-3.5 text-[11px] font-mono">
                <span className="text-[#13E1BC] uppercase tracking-widest flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{t.dossierLabel}</span>
                </span>
                <span className="text-neutral-500">{t.dossierYears}</span>
              </div>

              <div className="divide-y divide-surface-borderSubtle/80">
                {credentials.map((item) => (
                  <div key={item.label} className="py-3.5 first:pt-0 last:pb-0 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
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

              <div className="pt-4 border-t border-surface-borderSubtle flex items-center justify-between text-[11px] font-mono">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#13E1BC]" />
                  <span>5 Case Studies + 4 Sandboxes Live</span>
                </span>
                <Link
                  href="/about"
                  className="text-white hover:text-[#13E1BC] transition-colors inline-flex items-center gap-1"
                >
                  <span>{locale === "en" ? "About" : "Sobre"}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tags Bar */}
        <div className="pt-6 border-t border-surface-borderSubtle/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-mono text-neutral-300 bg-neutral-900/90 border border-surface-border rounded-sm tracking-tight hover:border-[#13E1BC]/50 hover:text-[#13E1BC] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-500">
            <Layers className="w-3.5 h-3.5 text-neutral-500" />
            <span>{locale === "en" ? "Brazil • Remote / Hybrid" : "Brasil • Remoto / Híbrido"}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
