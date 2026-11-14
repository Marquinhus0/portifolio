"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Copy, Check, Mail, FileText, Briefcase, Sparkles } from "lucide-react";

const TOPICS = [
  "Oportunidade CLT / PJ",
  "Projeto B2B / ERP",
  "Consultoria UX / Design System",
  "Outro Assunto",
] as const;

const WORK_MODELS = ["Remoto", "Híbrido", "Escopo Fechado"] as const;

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [workModel, setWorkModel] = useState<string>(WORK_MODELS[0]);
  const [senderName, setSenderName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const email = "marcuszhrt@gmail.com";

  const compiledSubject = useMemo(() => {
    const companyPart = company.trim() ? ` — ${company.trim()}` : "";
    return `[Portfólio] ${topic} (${workModel})${companyPart}`;
  }, [topic, workModel, company]);

  const compiledBody = useMemo(() => {
    const lines = [
      `Olá Marcus,`,
      ``,
      `Motivo do contato: ${topic}`,
      `Formato: ${workModel}`,
    ];
    if (senderName.trim()) lines.push(`Nome: ${senderName.trim()}`);
    if (company.trim()) lines.push(`Empresa / Time: ${company.trim()}`);
    lines.push(``);
    lines.push(
      message.trim()
        ? message.trim()
        : `Gostaria de conversar sobre ${topic.toLowerCase()} em formato ${workModel.toLowerCase()}.`
    );
    return lines.join("\n");
  }, [topic, workModel, senderName, company, message]);

  const mailtoHref = useMemo(() => {
    return `mailto:${email}?subject=${encodeURIComponent(compiledSubject)}&body=${encodeURIComponent(compiledBody)}`;
  }, [email, compiledSubject, compiledBody]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyBrief = () => {
    navigator.clipboard.writeText(`Assunto: ${compiledSubject}\n\n${compiledBody}`);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
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
            Disponível para oportunidades como Product Designer, projetos de UX para softwares de gestão, plataformas B2B e sistemas corporativos complexos.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Interactive Briefing Composer */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 border border-surface-border bg-neutral-950 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#13E1BC]" />
                  <span>Briefing Rápido &amp; Envio Direto</span>
                </span>
                <span className="text-xs font-mono text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#13E1BC] animate-pulse shadow-[0_0_8px_#13E1BC]" />
                  <span>Resposta rápida</span>
                </span>
              </div>

              {/* Topic Selector */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block">
                  01. Objetivo do contato
                </span>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((item) => {
                    const active = topic === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTopic(item)}
                        className={`px-3 py-2 text-xs font-mono transition-colors border ${
                          active
                            ? "bg-[#13E1BC]/10 border-[#13E1BC] text-[#13E1BC] font-semibold"
                            : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:text-white"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Work Model Selector */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block">
                  02. Modelo / Disponibilidade
                </span>
                <div className="flex flex-wrap gap-2">
                  {WORK_MODELS.map((model) => {
                    const active = workModel === model;
                    return (
                      <button
                        key={model}
                        type="button"
                        onClick={() => setWorkModel(model)}
                        className={`px-3 py-1.5 text-xs font-mono transition-colors border ${
                          active
                            ? "bg-white text-black border-white font-semibold"
                            : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white"
                        }`}
                      >
                        {model}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Context Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                    Seu Nome (Opcional)
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Ex: Ana Paula"
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-[#13E1BC] text-sm text-white placeholder:text-neutral-600 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-company" className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                    Empresa ou Time (Opcional)
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ex: Product Design Team"
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-[#13E1BC] text-sm text-white placeholder:text-neutral-600 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                  03. Contexto rápido
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Compartilhe brevemente a vaga, escopo do produto ou melhor horário para conversarmos..."
                  className="w-full px-3.5 py-3 bg-neutral-900 border border-neutral-800 focus:border-[#13E1BC] text-sm text-white placeholder:text-neutral-600 outline-none transition-colors resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={mailtoHref}
                  className="inline-flex items-center justify-center gap-2 py-4 px-5 bg-white text-black font-medium text-xs font-mono uppercase tracking-widest hover:bg-[#13E1BC] hover:text-black transition-colors"
                >
                  <span>Enviar por E-mail</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="inline-flex items-center justify-center gap-2 py-4 px-5 bg-neutral-900 border border-neutral-700 hover:border-[#13E1BC] text-white font-mono text-xs uppercase tracking-widest transition-colors"
                >
                  {copiedBrief ? (
                    <>
                      <Check className="w-4 h-4 text-[#13E1BC]" />
                      <span className="text-[#13E1BC]">Briefing Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Briefing</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Direct Channels & Quick Shortcuts */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className="p-6 sm:p-8 border border-surface-border bg-neutral-950 space-y-5">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block border-b border-neutral-800 pb-4">
                Canal Direto
              </span>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-neutral-900 border border-neutral-800 text-sm font-mono text-white">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail className="w-5 h-5 text-[#13E1BC] shrink-0" />
                  <span className="truncate">{email}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-mono uppercase tracking-wider text-white transition-colors rounded shrink-0"
                >
                  {copiedEmail ? (
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

              <div className="space-y-3 pt-1">
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

                <Link
                  href="/resume"
                  className="flex items-center justify-between p-4 bg-neutral-900 border border-neutral-800 hover:border-[#13E1BC]/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#13E1BC]" />
                    <div className="space-y-0.5">
                      <span className="text-sm font-medium text-white block group-hover:text-[#13E1BC] transition-colors">
                        Currículo Completo &amp; PDF
                      </span>
                      <span className="text-xs font-mono text-neutral-500">
                        Experiência, formação e versão para impressão
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#13E1BC] transition-colors" />
                </Link>

                <Link
                  href="/work"
                  className="flex items-center justify-between p-4 bg-neutral-900 border border-neutral-800 hover:border-[#13E1BC]/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-[#13E1BC]" />
                    <div className="space-y-0.5">
                      <span className="text-sm font-medium text-white block group-hover:text-[#13E1BC] transition-colors">
                        Estudos de Caso Interativos
                      </span>
                      <span className="text-xs font-mono text-neutral-500">
                        PULSE, FRAME, Flow CRM &amp; SupplyHub
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#13E1BC] transition-colors" />
                </Link>
              </div>
            </div>

            {/* Availability Notice */}
            <div className="p-6 border border-neutral-800 bg-neutral-950/60 font-mono text-xs text-neutral-400 space-y-2">
              <span className="text-white uppercase tracking-wider block">
                [Status de Contratação]
              </span>
              <p className="leading-relaxed">
                Aberto a propostas CLT ou PJ (remoto ou híbrido) para empresas de tecnologia, startups e produtos corporativos B2B.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
