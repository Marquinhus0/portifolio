"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { CaseStudy } from "@/types";
import CaseCardVisual from "./CaseCardVisual";
import { useLanguage } from "@/context/LanguageContext";
import { CASE_CARD_COPY } from "@/data/translations";

interface CaseCardProps {
  caseStudy: CaseStudy;
  priority?: boolean;
  horizontal?: boolean;
  className?: string;
}

const SLUG_META: Record<
  string,
  {
    domainLabel: string;
    accentClass: string;
    maturityPt: string;
    maturityEn: string;
    rolePt: string;
    roleEn: string;
    isInteractive: boolean;
  }
> = {
  "pulse-social-network": {
    domainLabel: "Consumer Social • Mobile App",
    accentClass: "text-neutral-200 border-neutral-600 bg-neutral-900",
    maturityPt: "Conceito de Produto",
    maturityEn: "Product Concept",
    rolePt: "Product Designer & Arquitetura Mobile",
    roleEn: "Product Designer & Mobile IA",
    isInteractive: false,
  },
  "frame-interactive-video": {
    domainLabel: "Cinema & Mídia Interativa",
    accentClass: "text-[#ff807e] border-[#ff5352]/40 bg-[#ff5352]/15",
    maturityPt: "Protótipo Funcional",
    maturityEn: "Functional Prototype",
    rolePt: "Product Designer & Prototipação UI",
    roleEn: "Product Designer & UI Prototyping",
    isInteractive: true,
  },
  "flow-crm-b2b": {
    domainLabel: "CRM Comercial B2B",
    accentClass: "text-[#60a5fa] border-[#1683E8]/40 bg-[#1683E8]/15",
    maturityPt: "Sandbox Interativo",
    maturityEn: "Interactive Sandbox",
    rolePt: "Product Designer & Front-End React",
    roleEn: "Product Designer & React Front-End",
    isInteractive: true,
  },
  "supplyhub-procurement-b2b": {
    domainLabel: "Compras & Suprimentos B2B",
    accentClass: "text-[#3cd68e] border-[#16845a]/40 bg-[#16845a]/15",
    maturityPt: "Sandbox Interativo",
    maturityEn: "Interactive Sandbox",
    rolePt: "Product Designer & Arquitetura B2B",
    roleEn: "Product Designer & B2B Architecture",
    isInteractive: true,
  },
  "erp-enterprise-redesign": {
    domainLabel: "ERP Corporativo • NDA-Safe",
    accentClass: "text-[#13E1BC] border-[#13E1BC]/40 bg-[#13E1BC]/15",
    maturityPt: "Protótipo Interativo",
    maturityEn: "Interactive Prototype",
    rolePt: "Product Designer & Ex-Analista ERP",
    roleEn: "Product Designer & Ex-ERP Analyst",
    isInteractive: true,
  },
};

export default function CaseCard({
  caseStudy,
  horizontal = false,
  className = "",
}: CaseCardProps) {
  const { locale } = useLanguage();
  const isReal = !caseStudy.isConcept;
  const slugMeta = SLUG_META[caseStudy.slug];
  const hasInteractiveApp = Boolean(slugMeta?.isInteractive);
  const maturityLabel =
    locale === "en" ? slugMeta?.maturityEn : slugMeta?.maturityPt;
  const roleLabel =
    locale === "en" ? slugMeta?.roleEn : slugMeta?.rolePt;
  const cardCopy = CASE_CARD_COPY[locale]?.[caseStudy.slug];
  const displayTitle = cardCopy?.title || caseStudy.title;
  const displaySubtitle = cardCopy?.subtitle || caseStudy.subtitle;
  const displayDomain =
    cardCopy?.domainLabel || slugMeta?.domainLabel || caseStudy.category;
  const displayYear = cardCopy?.year || caseStudy.year;
  const displayCta =
    cardCopy?.cta ||
    (hasInteractiveApp
      ? locale === "en"
        ? "View Study & Prototype"
        : "Ver Estudo & Protótipo"
      : locale === "en"
      ? "Read Case Study"
      : "Ver Estudo de Caso");

  const renderBadges = () => (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-white font-medium tracking-wider">[{caseStudy.number}]</span>
      {isReal ? (
        <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-[#13E1BC]/15 text-[#13E1BC] border border-[#13E1BC]/30 font-semibold rounded-sm">
          {locale === "en"
            ? "REAL EXPERIENCE • ANONYMIZED"
            : "EXPERIÊNCIA REAL • ANONIMIZADA"}
        </span>
      ) : (
        <span
          className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest border font-semibold rounded-sm ${
            slugMeta?.accentClass || "bg-white text-black border-white"
          }`}
        >
          {locale === "en" ? "AUTHORIAL STUDY" : "ESTUDO AUTORAL"}
        </span>
      )}
      {maturityLabel && (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-sm">
          {hasInteractiveApp && <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />}
          <span className="font-semibold">{maturityLabel}</span>
        </span>
      )}
    </div>
  );

  if (horizontal) {
    return (
      <article
        className={`lg:col-span-2 group relative border border-surface-border bg-neutral-950/90 hover:border-[#13E1BC]/60 focus-within:ring-2 focus-within:ring-[#13E1BC] hover:bg-neutral-950 transition-all duration-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 ${className}`}
      >
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs border-b border-surface-borderSubtle pb-4">
              {renderBadges()}
              <span className="uppercase tracking-widest text-[10px] text-neutral-400 font-mono">
                {displayDomain}
              </span>
            </div>

            <div className="space-y-3 pt-1">
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white group-hover:text-[#13E1BC] transition-colors">
                <Link
                  href={`/work/${caseStudy.slug}`}
                  className="focus:outline-none after:absolute after:inset-0"
                >
                  {displayTitle}
                </Link>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {displaySubtitle}
              </p>
            </div>

            {roleLabel && (
              <div className="text-xs font-mono text-neutral-400">
                <span className="text-neutral-500 uppercase tracking-wider mr-2">
                  {locale === "en" ? "Role:" : "Papel:"}
                </span>
                <span className="text-neutral-200">{roleLabel}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 pt-1">
              {caseStudy.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] sm:text-[11px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="px-6 sm:px-8 py-4 border-t border-surface-borderSubtle flex items-center justify-between gap-4 text-xs font-mono text-neutral-400 bg-neutral-900/40">
            <span className="uppercase tracking-wider font-medium text-white group-hover:text-[#13E1BC] transition-colors flex items-center gap-1.5">
              <span>{displayCta}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#13E1BC] transition-transform duration-200 group-hover:translate-x-1" />
            </span>
            <div className="flex items-center gap-1.5 text-neutral-400 shrink-0">
              <span className="text-[11px]">{displayYear}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#13E1BC] transition-colors" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 p-6 sm:p-7 flex items-center bg-neutral-950/60 border-t lg:border-t-0 lg:border-l border-surface-borderSubtle">
          <div className="w-full overflow-hidden border border-neutral-800 group-hover:border-neutral-700 rounded-sm transition-colors shadow-lg">
            <CaseCardVisual
              slug={caseStudy.slug}
              title={displayTitle}
              category={caseStudy.category}
              coverImage={caseStudy.coverImage}
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group relative border border-surface-border bg-neutral-950/90 hover:border-[#13E1BC]/60 focus-within:ring-2 focus-within:ring-[#13E1BC] hover:bg-neutral-950 transition-all duration-200 flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* 01. Top Header: Number, Classification, Status, Domain */}
      <div className="p-6 sm:p-7 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs border-b border-surface-borderSubtle pb-4">
          {renderBadges()}
          <span className="uppercase tracking-widest text-[10px] text-neutral-400 font-mono">
            {displayDomain}
          </span>
        </div>

        {/* Title & Concise Summary */}
        <div className="space-y-2 pt-0.5">
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white group-hover:text-[#13E1BC] transition-colors">
            <Link
              href={`/work/${caseStudy.slug}`}
              className="focus:outline-none after:absolute after:inset-0"
            >
              {displayTitle}
            </Link>
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-2">
            {displaySubtitle}
          </p>
        </div>

        {roleLabel && (
          <div className="text-[11px] font-mono text-neutral-400 pt-1">
            <span className="uppercase tracking-wider mr-1.5 text-neutral-500">
              {locale === "en" ? "Role:" : "Papel:"}
            </span>
            <span className="text-neutral-200">{roleLabel}</span>
          </div>
        )}
      </div>

      {/* 02. Project Preview Visual */}
      <div className="px-6 sm:px-7 pb-5">
        <div className="overflow-hidden border border-neutral-800 group-hover:border-neutral-700 rounded-sm transition-colors shadow-lg">
          <CaseCardVisual
            slug={caseStudy.slug}
            title={displayTitle}
            category={caseStudy.category}
            coverImage={caseStudy.coverImage}
          />
        </div>
      </div>

      {/* 03. Disciplines / Tags Bar */}
      <div className="px-6 sm:px-7 pb-5 flex flex-wrap gap-1.5">
        {caseStudy.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[10px] sm:text-[11px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 rounded-sm group-hover:border-neutral-700 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 04. Bottom Action Footer */}
      <div className="px-6 sm:px-7 py-4 border-t border-surface-borderSubtle flex items-center justify-between gap-3 text-xs font-mono text-neutral-400 bg-neutral-900/40">
        <span className="uppercase tracking-wider font-medium text-white group-hover:text-[#13E1BC] transition-colors flex items-center gap-1.5">
          <span>{displayCta}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#13E1BC] transition-transform duration-200 group-hover:translate-x-1" />
        </span>
        <div className="flex items-center gap-1.5 text-neutral-400 shrink-0">
          <span className="text-[11px]">{displayYear}</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#13E1BC] transition-colors" />
        </div>
      </div>
    </article>
  );
}
