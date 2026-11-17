"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Layers, ShieldCheck } from "lucide-react";
import CaseCard from "@/components/CaseCard";
import CaseCardVisual from "@/components/CaseCardVisual";
import { casesData } from "@/data/cases";
import { useLanguage } from "@/context/LanguageContext";
import { HOME_TRANSLATIONS } from "@/data/translations";

export default function HomeSelectedWorkSection() {
  const { locale } = useLanguage();
  const isEn = locale === "en";
  const t = HOME_TRANSLATIONS[locale];

  const featuredRealCase =
    casesData.find((c) => c.category === "real_product") || casesData[0];
  const authorialCases = casesData.filter((c) => c.id !== featuredRealCase.id);

  const featuredMeta = isEn
    ? {
        context: "ALFA Software • Production Track Record (2020 — Present)",
        role: "Product Designer (2023–Present) & Former ERP Business Analyst (2020–2023)",
        domains: "Purchasing • Point of Sale (POS) • Inventory • Billing",
        problem:
          "How to simplify high-density ERP screens—fragmented search, overloaded closing modals, and stock restocking—without breaking strict fiscal and multi-branch business rules.",
        deliverables: [
          "15+ full-cycle ERP rollouts observed and supported from requirements to go-live",
          "Internal user feedback triage method adopted as company standard",
          "Figma component library, functional acceptance criteria, and QA checks prior to release",
        ],
        cta: "Explore Full Case & Anonymized Before/After",
        privacyNote:
          "Confidentiality Guarantee (NDA): screens reconstructed structurally using sanitized synthetic data.",
      }
    : {
        context: "ALFA Software • Atuação Profissional em Produção (2020 — Presente)",
        role: "Product Designer (2023–Presente) & Ex-Analista de Negócios ERP (2020–2023)",
        domains: "Compras • Balcão de Vendas • Estoque • Faturamento",
        problem:
          "Como simplificar fluxos densos de ERP — filtros fragmentados, fechamento de pedido sobrecarregado e sugestão de compra — preservando regras fiscais rígidas e reduzindo a curva de aprendizado.",
        deliverables: [
          "15+ implantações completas de ERP acompanhadas do levantamento ao go-live",
          "Método próprio de coleta e estruturação de feedbacks adotado como padrão da empresa",
          "Padronização de componentes no Figma, critérios de aceite e validação funcional QA",
        ],
        cta: "Explorar Case Completo & Comparador Antes/Depois",
        privacyNote:
          "Sigilo Comercial (NDA): reconstrução arquitetural com dados sintéticos sanitizados.",
      };

  return (
    <section
      id="selected-work"
      className="scroll-mt-20 py-20 md:py-24 border-b border-surface-borderSubtle bg-background"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-14">
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

        {/* 1. DEDICATED FEATURED REAL CASE SHOWCASE (ERP CORPORATIVO — NDA-SAFE) */}
        <article className="group relative border border-[#13E1BC]/35 bg-neutral-950/95 hover:border-[#13E1BC]/70 focus-within:ring-2 focus-within:ring-[#13E1BC] transition-all duration-200 overflow-hidden">
          <div className="h-[2px] w-full bg-gradient-to-r from-[#13E1BC] via-[#13E1BC]/50 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Architectural Summary (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-borderSubtle pb-4 text-xs font-mono">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-white font-semibold">[01]</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] uppercase tracking-widest bg-[#13E1BC]/15 text-[#13E1BC] border border-[#13E1BC]/35 font-semibold rounded-sm">
                      <ShieldCheck className="w-3 h-3" />
                      <span>
                        {isEn
                          ? "REAL PRODUCTION EXPERIENCE • NDA-SAFE"
                          : "EXPERIÊNCIA PROFISSIONAL REAL • NDA-SAFE"}
                      </span>
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider">
                    2020 — {isEn ? "Present" : "Presente"}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#13E1BC] block">
                    {featuredMeta.context}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white group-hover:text-[#13E1BC] transition-colors">
                    <Link
                      href={`/work/${featuredRealCase.slug}`}
                      className="focus:outline-none after:absolute after:inset-0"
                    >
                      {isEn
                        ? "Enterprise B2B ERP — Architecture & Before/After"
                        : "ERP Corporativo B2B — Arquitetura & Antes/Depois"}
                    </Link>
                  </h3>
                </div>

                {/* Role & Business Areas Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border border-neutral-850 bg-[#080808] text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                      {isEn ? "Role Played" : "Papel Desempenhado"}
                    </span>
                    <p className="text-neutral-200 leading-snug font-sans">
                      {featuredMeta.role}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                      {isEn ? "Modules & Areas" : "Áreas Envolvidas"}
                    </span>
                    <p className="text-[#13E1BC] leading-snug">{featuredMeta.domains}</p>
                  </div>
                </div>

                {/* Problem Addressed */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    {isEn ? "Core Problem Addressed" : "Problema Abordado"}
                  </span>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {featuredMeta.problem}
                  </p>
                </div>

                {/* Verified Deliverables */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                    {isEn ? "Documented Deliverables" : "Principais Entregas"}
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-200">
                    {featuredMeta.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#13E1BC] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 border-t border-surface-borderSubtle flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#13E1BC] group-hover:text-white transition-colors">
                  <span>{featuredMeta.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
                <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                  <span>NDA-Safe Showcase</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Right Visual Evidence Column (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-center gap-4 bg-[#070707] border-t lg:border-t-0 lg:border-l border-surface-borderSubtle">
              <div className="w-full overflow-hidden border border-neutral-800 group-hover:border-[#13E1BC]/40 rounded-sm transition-colors shadow-xl">
                <CaseCardVisual
                  slug={featuredRealCase.slug}
                  title={featuredRealCase.title}
                  category={featuredRealCase.category}
                  coverImage={featuredRealCase.coverImage}
                />
              </div>
              <p className="text-[11px] font-mono text-neutral-400 leading-relaxed flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#13E1BC] shrink-0 mt-0.5" />
                <span>{featuredMeta.privacyNote}</span>
              </p>
            </div>
          </div>
        </article>

        {/* 2. AUTHORIAL STUDIES & INTERACTIVE SANDBOXES (COHERENT EDITORIAL GRID) */}
        <div className="space-y-6 pt-6 border-t border-surface-borderSubtle">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-200">
              <Layers className="w-4 h-4 text-[#13E1BC]" />
              <span>
                {isEn
                  ? "02–05. Authorial Case Studies & Interactive Sandboxes"
                  : "02–05. Estudos Autorais & Sandboxes Interativos"}
              </span>
            </span>
            <span className="text-xs font-mono text-neutral-400">
              {isEn
                ? "Independent product explorations with synthetic data and conceptual hypotheses"
                : "Explorações independentes de produto com dados demonstrativos e hipóteses conceituais"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {authorialCases.map((cs, idx) => {
              // Vary editorial proportions intentionally: B2B Sandboxes (6+6), Media & Mobile Craft (7+5)
              const colSpan =
                idx < 2
                  ? "lg:col-span-6"
                  : idx === 2
                  ? "lg:col-span-7"
                  : "lg:col-span-5";
              return (
                <CaseCard
                  key={cs.id}
                  caseStudy={cs}
                  priority={idx < 2}
                  className={colSpan}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
