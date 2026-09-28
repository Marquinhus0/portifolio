"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Check, Mail } from "lucide-react";

export default function ContactBlock() {
  const [copied, setCopied] = useState(false);
  const email = "marcuszhrt@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Headline Column */}
          <div className="lg:col-span-8 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
              <span>[Contato Direto]</span>
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-white uppercase leading-[0.98]">
              Tem um desafio no seu produto?
              <br />
              <span className="text-neutral-400 font-light text-2xl sm:text-4xl md:text-5xl block pt-2">
                Vamos torná-lo mais simples de usar.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-light max-w-2xl leading-relaxed pt-2">
              Ajudo times e empresas a desenharem interfaces claras para sistemas de gestão, plataformas B2B e ferramentas de trabalho.
            </p>
          </div>

          {/* Action Box Column */}
          <div className="lg:col-span-4 p-8 border border-surface-border bg-neutral-950 space-y-8 hover:border-[#13E1BC]/40 transition-colors">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                Canal Principal:
              </span>
              <div className="flex items-center justify-between gap-2 p-3 bg-neutral-900 border border-neutral-800 text-xs font-mono text-white">
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-4 h-4 text-[#13E1BC] shrink-0" />
                  <span className="truncate">{email}</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-1.5 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors shrink-0 rounded"
                  title="Copiar e-mail"
                  aria-label="Copiar endereço de e-mail"
                >
                  {copied ? (
                    <span className="flex items-center gap-1 text-[10px] text-[#13E1BC] font-semibold">
                      <Check className="w-3.5 h-3.5 text-[#13E1BC]" />
                      <span>Copiado</span>
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Direct Email Action Button */}
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-white text-black font-medium text-xs font-mono uppercase tracking-widest hover:bg-[#13E1BC] hover:text-black transition-colors"
            >
              <span>Entrar em Contato</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Social & Direct Links */}
            <div className="space-y-3 pt-4 border-t border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block">
                Redes & Canais:
              </span>
              <div className="flex flex-col space-y-2">
                <a
                  href="https://linkedin.com/in/marcusritta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 text-xs font-mono text-neutral-300 hover:text-white border-b border-neutral-900 group"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#13E1BC] transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
