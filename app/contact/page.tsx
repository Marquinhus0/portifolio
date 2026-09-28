"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Check, Mail } from "lucide-react";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const email = "marcuszhrt@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-surface-borderSubtle pb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
            <span>[Fale Comigo]</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-white uppercase leading-none">
            Contato
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed pt-2">
            Disponível para oportunidades como Product Designer, projetos de UX para softwares de gestão, plataformas B2B e ferramentas corporativas.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Direct Channels */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 border border-surface-border bg-neutral-950 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Canal Primário
                </span>
                <span className="text-xs font-mono text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#13E1BC] animate-pulse shadow-[0_0_8px_#13E1BC]" />
                  <span>Resposta rápida</span>
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block">
                  Endereço de E-mail:
                </span>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-neutral-900 border border-neutral-800 text-sm font-mono text-white">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#13E1BC] shrink-0" />
                    <span>{email}</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-mono uppercase tracking-wider text-white transition-colors rounded"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#13E1BC]" />
                        <span className="text-[#13E1BC] font-semibold">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-medium text-xs font-mono uppercase tracking-widest hover:bg-[#13E1BC] hover:text-black transition-colors"
              >
                <span>Abrir no seu cliente de e-mail</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Availability Notice */}
            <div className="p-6 border border-neutral-800 bg-neutral-950/60 font-mono text-xs text-neutral-400 space-y-2">
              <span className="text-white uppercase tracking-wider block">
                [Status de Contratação]
              </span>
              <p className="leading-relaxed">
                Aberto a propostas CLT ou PJ (remoto ou híbrido) para empresas de tecnologia, startups e produtos corporativos.
              </p>
            </div>
          </div>

          {/* Professional Profiles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 border border-surface-border bg-neutral-950 space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block border-b border-neutral-800 pb-4">
                Redes & Perfis Profissionais
              </span>

              <div className="space-y-4">
                <a
                  href="https://linkedin.com/in/marcusritta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-neutral-900 border border-neutral-800 hover:border-[#13E1BC]/50 hover:shadow-[0_0_20px_rgba(19,225,188,0.06)] transition-all group"
                >
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-white block group-hover:text-[#13E1BC] transition-colors">
                      LinkedIn
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      /in/marcusritta
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#13E1BC] transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
