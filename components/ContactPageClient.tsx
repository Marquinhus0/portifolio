"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Copy,
  Check,
  Mail,
  FileText,
  Briefcase,
  Sparkles,
  Send,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const TOPICS = {
  pt: [
    "Oportunidade CLT / PJ",
    "Projeto B2B / ERP",
    "Consultoria UX / Design System",
    "Outro Assunto",
  ],
  en: [
    "Full-Time / Contract Role",
    "B2B / ERP Product Project",
    "UX / Design System Advisory",
    "Other Inquiry",
  ],
};

const WORK_MODELS = {
  pt: ["Remoto", "Híbrido", "Escopo Fechado"],
  en: ["Remote", "Hybrid", "Fixed Scope"],
};

export default function ContactPageClient() {
  const { locale } = useLanguage();
  const isEn = locale === "en";

  const topics = TOPICS[locale];
  const models = WORK_MODELS[locale];

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [topicIdx, setTopicIdx] = useState(0);
  const [modelIdx, setModelIdx] = useState(0);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<
    | { status: "idle" }
    | { status: "sending" }
    | { status: "sent" }
    | { status: "fallback"; note: string }
    | { status: "error"; note: string }
  >({ status: "idle" });

  const topic = topics[topicIdx] || topics[0];
  const workModel = models[modelIdx] || models[0];
  const email = "marcuszhrt@gmail.com";

  const compiledSubject = useMemo(() => {
    const companyPart = company.trim() ? ` — ${company.trim()}` : "";
    return `[Portfólio] ${topic} (${workModel})${companyPart}`;
  }, [topic, workModel, company]);

  const compiledBody = useMemo(() => {
    const lines = [
      isEn ? `Hi Marcus,` : `Olá Marcus,`,
      ``,
      `${isEn ? "Topic" : "Motivo do contato"}: ${topic}`,
      `${isEn ? "Format" : "Formato"}: ${workModel}`,
    ];
    if (senderName.trim()) lines.push(`${isEn ? "Name" : "Nome"}: ${senderName.trim()}`);
    if (senderEmail.trim()) lines.push(`${isEn ? "Reply email" : "E-mail"}: ${senderEmail.trim()}`);
    if (company.trim()) lines.push(`${isEn ? "Company / Team" : "Empresa / Time"}: ${company.trim()}`);
    lines.push(``);
    lines.push(
      message.trim()
        ? message.trim()
        : isEn
        ? `I'd like to discuss ${topic.toLowerCase()} (${workModel.toLowerCase()}).`
        : `Gostaria de conversar sobre ${topic.toLowerCase()} em formato ${workModel.toLowerCase()}.`
    );
    return lines.join("\n");
  }, [isEn, topic, workModel, senderName, senderEmail, company, message]);

  const mailtoHref = useMemo(() => {
    return `mailto:${email}?subject=${encodeURIComponent(compiledSubject)}&body=${encodeURIComponent(compiledBody)}`;
  }, [email, compiledSubject, compiledBody]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyBrief = () => {
    navigator.clipboard.writeText(`${isEn ? "Subject" : "Assunto"}: ${compiledSubject}\n\n${compiledBody}`);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  const handleDirectSend = async () => {
    if (!senderEmail.trim() && !message.trim() && !senderName.trim()) {
      setSubmitState({
        status: "error",
        note: isEn
          ? "Add your reply email or a short message before sending directly."
          : "Informe seu e-mail de retorno ou escreva um contexto rápido antes de enviar.",
      });
      return;
    }

    setSubmitState({ status: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          workModel,
          senderName,
          senderEmail,
          company,
          message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setSubmitState({ status: "sent" });
        return;
      }
      if (data.fallbackRequired) {
        setSubmitState({
          status: "fallback",
          note: isEn
            ? "Direct server relay is not configured yet—use “Open Email App” or “Copy Brief” right below."
            : "O envio direto pelo servidor ainda não está ativo com chave Resend — use “Abrir no App de E-mail” ou “Copiar Briefing” logo abaixo.",
        });
        return;
      }
      setSubmitState({
        status: "error",
        note:
          data.message ||
          (isEn ? "Could not validate the form fields." : "Verifique os campos preenchidos e tente novamente."),
      });
    } catch {
      setSubmitState({
        status: "fallback",
        note: isEn
          ? "Network unavailable—use “Open Email App” or “Copy Brief” below."
          : "Sem resposta da API—use “Abrir no App de E-mail” ou “Copiar Briefing” abaixo.",
      });
    }
  };

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-surface-borderSubtle pb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
            <span>{isEn ? "[Get in Touch]" : "[Fale Comigo]"}</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-white uppercase leading-none">
            {isEn ? "Contact" : "Contato"}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed pt-2">
            {isEn
              ? "Available for Product Designer roles, B2B SaaS UX engagements, and complex enterprise management systems."
              : "Disponível para oportunidades como Product Designer, projetos de UX para softwares de gestão, plataformas B2B e sistemas corporativos complexos."}
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
                  <span>{isEn ? "Quick Brief & Direct Send" : "Briefing Rápido & Envio Direto"}</span>
                </span>
                <span className="text-xs font-mono text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#13E1BC] animate-pulse shadow-[0_0_8px_#13E1BC]" />
                  <span>{isEn ? "Fast response" : "Resposta rápida"}</span>
                </span>
              </div>

              {/* Topic Selector */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block">
                  {isEn ? "01. Inquiry Goal" : "01. Objetivo do contato"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {topics.map((item, idx) => {
                    const active = topicIdx === idx;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTopicIdx(idx)}
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
                  {isEn ? "02. Work Model" : "02. Modelo / Disponibilidade"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {models.map((model, idx) => {
                    const active = modelIdx === idx;
                    return (
                      <button
                        key={model}
                        type="button"
                        onClick={() => setModelIdx(idx)}
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                    {isEn ? "Your Name" : "Seu Nome"}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder={isEn ? "e.g. Alex Morgan" : "Ex: Ana Paula"}
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-[#13E1BC] text-sm text-white placeholder:text-neutral-600 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-reply-email" className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                    {isEn ? "Your Email" : "Seu E-mail"}
                  </label>
                  <input
                    id="contact-reply-email"
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder={isEn ? "alex@company.com" : "ana@empresa.com"}
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-[#13E1BC] text-sm text-white placeholder:text-neutral-600 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-company" className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                    {isEn ? "Company / Team" : "Empresa / Time"}
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={isEn ? "Product Team" : "Time de Produto"}
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-[#13E1BC] text-sm text-white placeholder:text-neutral-600 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                  {isEn ? "03. Quick Context" : "03. Contexto rápido"}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    isEn
                      ? "Share the role, product scope, or best time for a quick chat..."
                      : "Compartilhe brevemente a vaga, escopo do produto ou melhor horário para conversarmos..."
                  }
                  className="w-full px-3.5 py-3 bg-neutral-900 border border-neutral-800 focus:border-[#13E1BC] text-sm text-white placeholder:text-neutral-600 outline-none transition-colors resize-none"
                />
              </div>

              {/* Status Feedback Banner */}
              {submitState.status === "sent" && (
                <div className="p-3.5 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>
                    {isEn
                      ? "Message delivered directly! I'll reply shortly."
                      : "Mensagem enviada diretamente! Retorno em breve."}
                  </span>
                </div>
              )}
              {(submitState.status === "fallback" || submitState.status === "error") && (
                <div className="p-3.5 border border-amber-500/40 bg-amber-950/20 text-amber-200 text-xs font-mono flex items-start gap-2 leading-relaxed">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                  <span>{submitState.note}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDirectSend}
                  disabled={submitState.status === "sending"}
                  className="inline-flex items-center justify-center gap-2 py-4 px-4 bg-[#13E1BC] text-[#080808] font-semibold text-xs font-mono uppercase tracking-wider hover:bg-[#0db899] disabled:opacity-60 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {submitState.status === "sending"
                      ? isEn
                        ? "Sending..."
                        : "Enviando..."
                      : isEn
                      ? "Send Directly"
                      : "Enviar Direto"}
                  </span>
                </button>
                <a
                  href={mailtoHref}
                  className="inline-flex items-center justify-center gap-2 py-4 px-4 bg-white text-black font-medium text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                >
                  <span>{isEn ? "Email App" : "App de E-mail"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="inline-flex items-center justify-center gap-2 py-4 px-4 bg-neutral-900 border border-neutral-700 hover:border-[#13E1BC] text-white font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  {copiedBrief ? (
                    <>
                      <Check className="w-4 h-4 text-[#13E1BC]" />
                      <span className="text-[#13E1BC]">{isEn ? "Copied!" : "Copiado!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{isEn ? "Copy Brief" : "Copiar Briefing"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Direct Channels & Quick Shortcuts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 border border-surface-border bg-neutral-950 space-y-5">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block border-b border-neutral-800 pb-4">
                {isEn ? "Direct Channel" : "Canal Direto"}
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
                      <span className="text-[#13E1BC] font-semibold">
                        {isEn ? "Copied!" : "Copiado!"}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isEn ? "Copy" : "Copiar"}</span>
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
                    <span className="text-xs font-mono text-neutral-500">/in/marcusritta</span>
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
                        {isEn ? "Full Resume & PDF" : "Currículo Completo & PDF"}
                      </span>
                      <span className="text-xs font-mono text-neutral-500">
                        {isEn
                          ? "Experience, education, and print-ready sheet"
                          : "Experiência, formação e versão para impressão"}
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
                        {isEn ? "Interactive Case Studies" : "Estudos de Caso Interativos"}
                      </span>
                      <span className="text-xs font-mono text-neutral-500">
                        ERP Case 01 (NDA-Safe), SupplyHub, Flow CRM, FRAME &amp; PULSE
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#13E1BC] transition-colors" />
                </Link>
              </div>
            </div>

            <div className="p-6 border border-neutral-800 bg-neutral-950/60 font-mono text-xs text-neutral-400 space-y-2">
              <span className="text-white uppercase tracking-wider block">
                {isEn ? "[Availability Status]" : "[Status de Contratação]"}
              </span>
              <p className="leading-relaxed">
                {isEn
                  ? "Open to full-time or contract roles (remote or hybrid) for B2B SaaS, ERP, and enterprise software teams."
                  : "Aberto a propostas CLT ou PJ (remoto ou híbrido) para empresas de tecnologia, startups e produtos corporativos B2B."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
