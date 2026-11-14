"use client";

import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PILLARS = {
  pt: [
    {
      label: "UX & Arquitetura",
      code: "UX/IA",
      desc: "Pesquisa prática, fluxos sem atrito, hierarquia visual densa e usabilidade zero-mouse para tarefas operacionais diárias.",
      detail: "Otimização de tempo de tela e redução de carga cognitiva",
    },
    {
      label: "Regras de Negócio",
      code: "BUSINESS",
      desc: "Mapeamento minucioso de fluxos de ERP, alçadas de aprovação, cálculo tributário, margens comerciais e estoque.",
      detail: "Alinhamento com metas da empresa e rotinas operacionais",
    },
    {
      label: "Engenharia & Tech",
      code: "FRONT-END",
      desc: "Diálogo de igual para igual com times técnicos. Protótipos funcionais em React/TypeScript, consumo de APIs e Design System em tokens.",
      detail: "Viabilidade real e handoff com zero retrabalho técnico",
    },
    {
      label: "Qualidade & Rigor",
      code: "QA & EDGE",
      desc: "Tratamento de cenários de erro, estados vazios, falhas de conexão, validação de formulários extensos e consistência entre design e código.",
      detail: "Prevenção de bugs e testes em cenários extremos",
    },
  ],
  en: [
    {
      label: "UX & Architecture",
      code: "UX/IA",
      desc: "Practical discovery, frictionless workflows, crisp visual hierarchy, and keyboard-first ergonomics for daily operational tasks.",
      detail: "Lower screen friction and lighter cognitive load",
    },
    {
      label: "Business Rules",
      code: "BUSINESS",
      desc: "Detailed mapping of ERP workflows, margin approval tiers, fiscal calculations, and multi-warehouse inventory.",
      detail: "Tight alignment between business policy and daily execution",
    },
    {
      label: "Engineering & Tech",
      code: "FRONT-END",
      desc: "Speaking the same language as engineers—live React/TypeScript prototypes, REST data contracts, and token-based Design Systems.",
      detail: "Real feasibility and zero handoff rework",
    },
    {
      label: "Quality & Rigor",
      code: "QA & EDGE",
      desc: "Designing error states, empty states, degraded connectivity, large form validation, and Figma-to-code parity.",
      detail: "Defect prevention and resilience across edge cases",
    },
  ],
};

export default function IntroStatement() {
  const { locale } = useLanguage();
  const isEn = locale === "en";
  const pillars = PILLARS[locale];

  return (
    <section className="py-20 md:py-24 border-b border-surface-borderSubtle bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Headline Column */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
              <span>{isEn ? "[Positioning & Edge]" : "[Posicionamento & Diferencial]"}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
              {isEn
                ? "I design high-density products, not just isolated screens."
                : "Eu desenho produtos de alta densidade, não apenas telas."}
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              {isEn
                ? "Specialized in management software, ERPs, and enterprise SaaS. I combine user research, business rules, and front-end engineering to build interfaces that hold up under daily operational pressure."
                : "Especializado em softwares de gestão, ERPs e ferramentas corporativas. Uno pesquisa com usuários, regras de negócio e engenharia front-end para criar interfaces que funcionam de verdade na pressão do dia a dia."}
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-neutral-300">
              <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-sm">
                B2B &amp; Enterprise
              </span>
              <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-sm">
                {isEn ? "ERP Systems" : "Sistemas ERP"}
              </span>
              <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-sm">
                React &amp; Design Systems
              </span>
            </div>
          </div>

          {/* 4 Pillars Matrix */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((item, idx) => (
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
                    {isEn ? "Practical Impact:" : "Impacto Prático:"}
                  </span>
                  <p className="text-[11px] text-neutral-300 font-mono pt-0.5 leading-snug">
                    {item.detail}
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
                ? "Connecting these four pillars is how I cut delivery cycles and rework between design and engineering."
                : "É conectando essas frentes que reduzo o ciclo de entrega e o retrabalho entre design e engenharia."}&rdquo;
            </span>
          </div>
          <span className="text-[11px] text-neutral-400 uppercase tracking-wider shrink-0">
            [Zero-Handover Friction]
          </span>
        </div>
      </div>
    </section>
  );
}
