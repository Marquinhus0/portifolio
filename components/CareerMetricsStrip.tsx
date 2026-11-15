"use client";

import { useLanguage } from "@/context/LanguageContext";

const METRICS = {
  pt: [
    {
      value: "~6 Anos",
      label: "Vivência em ERP & Negócios",
      sub: "2020–Presente • Analista + Designer",
    },
    {
      value: "3+ Anos",
      label: "Product Design Dedicado",
      sub: "Fluxos complexos, IA e Design Systems",
    },
    {
      value: "15+",
      label: "Implantações B2B em Campo",
      sub: "Compras, Vendas, Estoque e Fiscal",
    },
    {
      value: "React / TS",
      label: "Prototipação & Critérios QA",
      sub: "Handoff técnico com zero ruído",
    },
  ],
  en: [
    {
      value: "~6 Years",
      label: "ERP & Business Rules",
      sub: "2020–Present • Analyst + Designer",
    },
    {
      value: "3+ Years",
      label: "Dedicated Product Design",
      sub: "Complex workflows, IA & Design Systems",
    },
    {
      value: "15+",
      label: "B2B Field Rollouts",
      sub: "Purchasing, Sales, Inventory & Tax",
    },
    {
      value: "React / TS",
      label: "Prototyping & QA Contracts",
      sub: "Low-friction engineering handoff",
    },
  ],
};

export default function CareerMetricsStrip() {
  const { locale } = useLanguage();
  const items = METRICS[locale];

  return (
    <section
      aria-label={locale === "en" ? "Career trajectory indicators" : "Indicadores de trajetória"}
      className="border-b border-surface-borderSubtle bg-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-surface-borderSubtle">
          {items.map((item) => (
            <div
              key={item.label}
              className="py-6 sm:py-7 px-3 sm:px-5 first:pl-0 last:pr-0 space-y-1"
            >
              <div className="text-xl sm:text-2xl font-mono font-bold text-[#13E1BC] tracking-tight">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-white">
                {item.label}
              </div>
              <div className="text-[11px] font-mono text-neutral-500">
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
