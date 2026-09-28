"use client";

import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { experienceData } from "@/data/experience";
import { skillsData } from "@/data/skills";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-10">
        {/* Controls Bar (hidden on print) */}
        <div className="no-print flex items-center justify-between border-b border-surface-borderSubtle pb-6 text-xs font-mono text-neutral-400">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao portfólio</span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white text-black font-medium hover:bg-[#13E1BC] hover:text-black transition-colors uppercase tracking-wider"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar PDF</span>
            </button>
          </div>
        </div>

        {/* Resume Sheet Content */}
        <div className="print-page border border-surface-border bg-neutral-950 p-8 sm:p-14 space-y-12">
          {/* Header */}
          <div className="border-b border-neutral-800 pb-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white uppercase flex items-center">
                  Marcus Ritta
                  <span className="w-2 h-2 rounded-full bg-[#13E1BC] inline-block ml-2 shadow-[0_0_8px_#13E1BC]" />
                </h1>
                <p className="text-sm font-mono text-neutral-400 pt-1 uppercase tracking-wider">
                  Product Designer | Discovery & Product Strategy | UX/UI | ERP &
                  SaaS B2B
                </p>
              </div>
              <div className="text-xs font-mono text-neutral-400 space-y-1 text-left sm:text-right">
                <p>Brasil • Remoto / Híbrido</p>
                <p>marcuszhrt@gmail.com</p>
                <p>linkedin.com/in/marcusritta</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed pt-2">
              Product Designer focado em softwares de gestão, ERPs e plataformas B2B. Atuo desde a pesquisa e descoberta de problemas até o alinhamento com regras de negócio e entrega com desenvolvedores.
            </p>
          </div>

          {/* Experience Section */}
          <div className="space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] border-b border-neutral-800 pb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
              <span>Experiência Profissional</span>
            </h2>

            <div className="space-y-8">
              {experienceData.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="text-base font-medium text-white tracking-tight">
                        {exp.role}
                      </span>
                      <span className="text-neutral-500 font-mono text-xs mx-2">
                        •
                      </span>
                      <span className="text-xs font-mono text-neutral-300">
                        {exp.company}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-neutral-500">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {exp.description}
                  </p>

                  <ul className="space-y-1 pt-2 text-xs text-neutral-300 font-mono">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-neutral-600">—</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 text-[10px] font-mono text-neutral-500 bg-neutral-900 border border-neutral-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Competencies */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] border-b border-neutral-800 pb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
              <span>Competências & Tecnologias</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              {skillsData.map((cat) => (
                <div key={cat.category} className="space-y-1">
                  <span className="text-white uppercase tracking-wider block">
                    {cat.category}:
                  </span>
                  <p className="text-neutral-400 leading-relaxed">
                    {cat.skills.join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Background */}
          <div className="space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] border-b border-neutral-800 pb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
              <span>Formação Acadêmica & Certificações</span>
            </h2>
            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex justify-between text-neutral-200">
                  <span className="font-medium text-white">Informatize</span>
                  <span className="text-neutral-500">2021</span>
                </div>
                <p className="text-neutral-400">
                  Curso Técnico, Tecnologia em Informática / Software
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-neutral-200">
                  <span className="font-medium text-white">UI Pro</span>
                  <span className="text-neutral-500">2022 — 2023</span>
                </div>
                <p className="text-neutral-400">
                  Curso Técnico, Interface & Design
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-900 space-y-1">
                <span className="text-neutral-400 uppercase text-[10px] tracking-widest block">
                  Certificações Relevantes:
                </span>
                <p className="text-neutral-300 leading-relaxed">
                  Acessibilidade com NVDA (HTML/CSS/JS) • Formação UX Design • APIs com Laravel • SEO & Otimização • Estratégias de Marketing Digital
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
