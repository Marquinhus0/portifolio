"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  Keyboard,
  Layers,
  SlidersHorizontal,
  ShieldAlert,
  FormInput,
  AlertCircle,
  Loader2,
  Inbox,
  CheckCircle2,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type DensityMode = "compact" | "comfortable";
type SpecimenTab = "table" | "inputs" | "states";
type SystemViewState = "ready" | "loading" | "empty" | "error";

interface TokenItem {
  name: string;
  token: string;
  hex: string;
  rolePt: string;
  roleEn: string;
  swatchClass: string;
}

const TOKENS: TokenItem[] = [
  {
    name: "bg-canvas",
    token: "--surface-base",
    hex: "#080808",
    rolePt: "Base escura de baixa fadiga visual",
    roleEn: "Low-glare dark canvas base",
    swatchClass: "bg-[#080808] border border-neutral-700",
  },
  {
    name: "bg-panel",
    token: "--surface-elevated",
    hex: "#111111",
    rolePt: "Cartões, painéis laterais e cabeçalhos",
    roleEn: "Cards, drawers, and panel surfaces",
    swatchClass: "bg-[#111111] border border-neutral-700",
  },
  {
    name: "brand-accent",
    token: "--accent-primary",
    hex: "#13E1BC",
    rolePt: "Ação principal, foco ativo e telemetria",
    roleEn: "Primary CTA, focus ring, and telemetry",
    swatchClass: "bg-[#13E1BC]",
  },
  {
    name: "status-ok",
    token: "--semantic-success",
    hex: "#10B981",
    rolePt: "NF-e autorizada e estoque disponível",
    roleEn: "Authorized invoice and stock OK",
    swatchClass: "bg-emerald-500",
  },
  {
    name: "status-warn",
    token: "--semantic-warning",
    hex: "#F59E0B",
    rolePt: "Alerta de margem ou divergência NCM",
    roleEn: "Margin alert or tax code mismatch",
    swatchClass: "bg-amber-500",
  },
  {
    name: "status-crit",
    token: "--semantic-danger",
    hex: "#EF4444",
    rolePt: "Bloqueio fiscal ou limite de crédito",
    roleEn: "Fiscal block or credit limit reached",
    swatchClass: "bg-red-500",
  },
];

const SAMPLE_ROWS = [
  {
    sku: "HZ-4420-D",
    descPt: "Kit Embreagem Reforçada Heavy-Duty",
    descEn: "Heavy-Duty Reinforced Clutch Kit",
    qty: "12 un",
    status: "ok" as const,
    statusPt: "Faturado",
    statusEn: "Authorized",
  },
  {
    sku: "HZ-8812-K",
    descPt: "Conjunto Óptico LED Bifocal",
    descEn: "LED Bifocal Headlamp Assembly",
    qty: "04 un",
    status: "warn" as const,
    statusPt: "Revisar NCM",
    statusEn: "Check Tax Code",
  },
  {
    sku: "HZ-2190-F",
    descPt: "Jogo de Pastilhas Cerâmicas",
    descEn: "Ceramic Brake Pad Set",
    qty: "02 un",
    status: "crit" as const,
    statusPt: "Alçada Gerencial",
    statusEn: "Manager Approval",
  },
];

const SHORTCUTS = [
  { key: "F2", pt: "Buscar SKU / Cliente", en: "Search SKU / Account" },
  { key: "F4", pt: "Alternar Densidade", en: "Toggle Grid Density" },
  { key: "Ctrl + Enter", pt: "Avançar Fechamento", en: "Submit Checkout" },
  { key: "Esc", pt: "Cancelar Modal / Voltar", en: "Dismiss Drawer / Back" },
];

export default function DesignSystemShowcase() {
  const { locale } = useLanguage();
  const isEn = locale === "en";

  const [density, setDensity] = useState<DensityMode>("compact");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<string>("HZ-4420-D");
  const [activeTab, setActiveTab] = useState<SpecimenTab>("table");

  // Specimen 02: Interactive Form Validation State
  const [ncmInput, setNcmInput] = useState("87083090");
  const [discountInput, setDiscountInput] = useState("8");

  // Specimen 03: Interactive Modal & Edge States
  const [viewState, setViewState] = useState<SystemViewState>("ready");
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [approvalReason, setApprovalReason] = useState("");
  const [approvalConfirmed, setApprovalConfirmed] = useState(false);

  const copyToken = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const ncmClean = ncmInput.replace(/\D/g, "");
  const isNcmValid = ncmClean.length === 8;
  const discountNum = Number(discountInput) || 0;
  const isMarginBlocked = discountNum > 20;
  const needsApproval = discountNum > 10 && !isMarginBlocked;

  const applyFormPreset = (preset: "valid" | "warning" | "error") => {
    if (preset === "valid") {
      setNcmInput("87083090");
      setDiscountInput("8");
    } else if (preset === "warning") {
      setNcmInput("87083090");
      setDiscountInput("14");
    } else {
      setNcmInput("8708");
      setDiscountInput("24");
    }
  };

  return (
    <section
      id="design-system"
      className="scroll-mt-20 py-20 border-b border-surface-borderSubtle bg-background"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-surface-borderSubtle">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>
                {isEn
                  ? "[Design System Playground & Tokens]"
                  : "[Design System Playground & Tokens B2B]"}
              </span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              {isEn
                ? "Architectural Tokens & Corporate Component States"
                : "Tokens Semânticos & Playground Corporativo"}
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-400 max-w-md leading-relaxed">
            {isEn
              ? "Interactive playground covering semantic tokens, keyboard contracts, table density, validation rules, modals, and resilient system states."
              : "Laboratório interativo com tokens semânticos, contrato de teclado, densidade tabular, regras de validação, modal de alçada e estados de borda."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Click-to-copy Tokens & Keyboard Contract */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-surface-border bg-neutral-950 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300">
                  {isEn ? "Core Tokens (Click to copy hex)" : "Tokens Base (Clique para copiar)"}
                </span>
                <span className="text-[10px] font-mono text-neutral-500">FIGMA ↔ CSS</span>
              </div>

              <div className="space-y-2.5">
                {TOKENS.map((t) => {
                  const isCopied = copiedHex === t.hex;
                  return (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => copyToken(t.hex)}
                      className="w-full text-left p-2.5 border border-neutral-900 hover:border-[#13E1BC]/40 bg-neutral-900/40 hover:bg-neutral-900 transition-colors flex items-center justify-between gap-3 rounded-sm group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`w-6 h-6 rounded-sm shrink-0 ${t.swatchClass}`} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-white font-medium">
                              {t.name}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-500 truncate">
                              {t.token}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 truncate">
                            {isEn ? t.roleEn : t.rolePt}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400 group-hover:text-[#13E1BC] flex items-center gap-1 shrink-0">
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-[#13E1BC]" />
                            <span className="text-[#13E1BC]">{isEn ? "Copied" : "Copiado"}</span>
                          </>
                        ) : (
                          <>
                            <span>{t.hex}</span>
                            <Copy className="w-3 h-3 opacity-60" />
                          </>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border border-surface-border bg-neutral-950 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <Keyboard className="w-3.5 h-3.5 text-[#13E1BC]" />
                  <span>{isEn ? "Keyboard-First ERP Contract" : "Contrato Orientado a Teclado (ERP)"}</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-500">WCAG AA FOCUS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SHORTCUTS.map((s) => (
                  <div
                    key={s.key}
                    className="flex items-center justify-between gap-2 p-2.5 bg-neutral-900/50 border border-neutral-800 rounded-sm text-xs"
                  >
                    <span className="text-neutral-300 text-[11px]">{isEn ? s.en : s.pt}</span>
                    <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-neutral-950 border border-neutral-700 text-[#13E1BC] rounded-sm shrink-0">
                      {s.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Multi-Specimen Interactive Playground */}
          <div className="lg:col-span-7 border border-surface-border bg-neutral-950 overflow-hidden">
            {/* Top Specimen Navigation Tabs */}
            <div className="px-4 sm:px-5 py-3 border-b border-neutral-800 bg-neutral-900/60 flex flex-wrap items-center justify-between gap-3">
              <div
                className="flex flex-wrap gap-1.5 font-mono text-[11px]"
                role="tablist"
                aria-label={isEn ? "Design System specimens" : "Experimentos do Design System"}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "table"}
                  onClick={() => setActiveTab("table")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border transition-colors ${
                    activeTab === "table"
                      ? "bg-[#13E1BC] text-[#080808] border-[#13E1BC] font-semibold"
                      : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{isEn ? "01. Table" : "01. Tabela"}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "inputs"}
                  onClick={() => setActiveTab("inputs")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border transition-colors ${
                    activeTab === "inputs"
                      ? "bg-[#13E1BC] text-[#080808] border-[#13E1BC] font-semibold"
                      : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
                  }`}
                >
                  <FormInput className="w-3.5 h-3.5" />
                  <span>{isEn ? "02. Inputs & Validation" : "02. Inputs & Validação"}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "states"}
                  onClick={() => setActiveTab("states")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border transition-colors ${
                    activeTab === "states"
                      ? "bg-[#13E1BC] text-[#080808] border-[#13E1BC] font-semibold"
                      : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white"
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{isEn ? "03. Modals & States" : "03. Modal & Estados"}</span>
                </button>
              </div>

              {activeTab === "table" && (
                <div className="inline-flex border border-neutral-800 bg-neutral-950 p-0.5 rounded-sm font-mono text-[11px]">
                  <button
                    type="button"
                    onClick={() => setDensity("compact")}
                    className={`px-2.5 py-1 rounded-sm transition-colors ${
                      density === "compact"
                        ? "bg-[#13E1BC] text-[#080808] font-semibold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {isEn ? "Compact (36px)" : "Compacto (36px)"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDensity("comfortable")}
                    className={`px-2.5 py-1 rounded-sm transition-colors ${
                      density === "comfortable"
                        ? "bg-[#13E1BC] text-[#080808] font-semibold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {isEn ? "Comfortable (52px)" : "Confortável (52px)"}
                  </button>
                </div>
              )}
            </div>

            {/* SPECIMEN 01: TABLE & DENSITY */}
            {activeTab === "table" && (
              <div className="p-5 space-y-5">
                <div className="overflow-x-auto border border-neutral-800 rounded-sm">
                  <table className="w-full text-left border-collapse font-mono text-xs">
                    <thead>
                      <tr className="bg-neutral-900 text-neutral-400 border-b border-neutral-800 text-[10px] uppercase tracking-wider">
                        <th className="px-3.5 py-2.5">SKU</th>
                        <th className="px-3.5 py-2.5">{isEn ? "Item" : "Descrição"}</th>
                        <th className="px-3.5 py-2.5">{isEn ? "Qty" : "Qtd"}</th>
                        <th className="px-3.5 py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900">
                      {SAMPLE_ROWS.map((row) => {
                        const isSelected = selectedRow === row.sku;
                        const padClass = density === "compact" ? "py-2" : "py-4";
                        const badgeStyle =
                          row.status === "ok"
                            ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                            : row.status === "warn"
                            ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                            : "bg-red-500/15 text-red-300 border-red-500/30";
                        return (
                          <tr
                            key={row.sku}
                            onClick={() => setSelectedRow(row.sku)}
                            className={`cursor-pointer transition-colors ${
                              isSelected ? "bg-[#13E1BC]/10" : "hover:bg-neutral-900/50"
                            }`}
                          >
                            <td className={`px-3.5 ${padClass} text-[#13E1BC] font-semibold whitespace-nowrap`}>
                              {row.sku}
                            </td>
                            <td className={`px-3.5 ${padClass} text-neutral-200 font-sans`}>
                              {isEn ? row.descEn : row.descPt}
                            </td>
                            <td className={`px-3.5 ${padClass} text-neutral-400 whitespace-nowrap`}>
                              {row.qty}
                            </td>
                            <td className={`px-3.5 ${padClass} whitespace-nowrap`}>
                              <span
                                className={`inline-block px-2 py-0.5 text-[10px] border rounded-sm font-semibold ${badgeStyle}`}
                              >
                                {isEn ? row.statusEn : row.statusPt}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border border-neutral-800 bg-neutral-900/40 flex items-start gap-3 text-xs text-neutral-400 leading-relaxed">
                  <ShieldAlert className="w-4 h-4 text-[#13E1BC] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-white block text-[11px] uppercase tracking-wider pb-1">
                      {isEn
                        ? `Active Row Focus: ${selectedRow} • Mode: ${density}`
                        : `Linha Focada: ${selectedRow} • Densidade: ${density === "compact" ? "Compacta" : "Confortável"}`}
                    </span>
                    <span>
                      {isEn
                        ? "Compact rows preserve high viewport density for power operators at counters, while Comfortable mode boosts touch targets and scan breathing room during review."
                        : "O modo Compacto maximiza itens visíveis na tela para operadores de balcão e compradores; o modo Confortável amplia alvos de clique em conferências e telas touch."}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* SPECIMEN 02: INPUTS & BUSINESS RULE VALIDATION */}
            {activeTab === "inputs" && (
              <div className="p-5 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-neutral-850">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    {isEn ? "Quick Rule Presets:" : "Testar Estados de Validação:"}
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    <button
                      type="button"
                      onClick={() => applyFormPreset("valid")}
                      className="px-2.5 py-1 border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 rounded-sm"
                    >
                      {isEn ? "Valid" : "Válido"}
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormPreset("warning")}
                      className="px-2.5 py-1 border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 rounded-sm"
                    >
                      {isEn ? "Approval Tier" : "Alçada (Aviso)"}
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormPreset("error")}
                      className="px-2.5 py-1 border border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20 rounded-sm"
                    >
                      {isEn ? "Fiscal Block" : "Bloqueio (Erro)"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* NCM Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="ds-ncm-input"
                      className="text-xs font-mono text-neutral-300 flex items-center justify-between"
                    >
                      <span>{isEn ? "Fiscal Tax Code (NCM 8 digits)" : "Código Fiscal (NCM 8 dígitos)"}</span>
                      <span className={isNcmValid ? "text-emerald-400" : "text-red-400"}>
                        {isNcmValid ? "OK" : "ERR_NCM"}
                      </span>
                    </label>
                    <input
                      id="ds-ncm-input"
                      type="text"
                      value={ncmInput}
                      onChange={(e) => setNcmInput(e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-[#080808] border font-mono text-sm text-white focus:outline-none rounded-sm ${
                        isNcmValid
                          ? "border-neutral-700 focus:border-[#13E1BC]"
                          : "border-red-500 focus:border-red-400"
                      }`}
                    />
                    <p
                      className={`text-[11px] font-mono ${
                        isNcmValid ? "text-neutral-500" : "text-red-300"
                      }`}
                    >
                      {isNcmValid
                        ? isEn
                          ? "Valid 8-digit structure ready for invoice check."
                          : "Estrutura de 8 dígitos pronta para pré-checagem fiscal."
                        : isEn
                        ? "Required: NCM must contain 8 numeric digits before transmission."
                        : "Obrigatório: informe 8 dígitos numéricos antes de transmitir NF-e."}
                    </p>
                  </div>

                  {/* Commercial Discount Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="ds-discount-input"
                      className="text-xs font-mono text-neutral-300 flex items-center justify-between"
                    >
                      <span>{isEn ? "Order Discount (%)" : "Desconto Comercial (%)"}</span>
                      <span
                        className={
                          isMarginBlocked
                            ? "text-red-400"
                            : needsApproval
                            ? "text-amber-300"
                            : "text-emerald-400"
                        }
                      >
                        {isMarginBlocked
                          ? "BLOCKED >20%"
                          : needsApproval
                          ? "TIER_WARN >10%"
                          : "AUTO_OK"}
                      </span>
                    </label>
                    <input
                      id="ds-discount-input"
                      type="number"
                      min={0}
                      max={40}
                      value={discountInput}
                      onChange={(e) => setDiscountInput(e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-[#080808] border font-mono text-sm text-white focus:outline-none rounded-sm ${
                        isMarginBlocked
                          ? "border-red-500"
                          : needsApproval
                          ? "border-amber-500"
                          : "border-neutral-700 focus:border-[#13E1BC]"
                      }`}
                    />
                    <p
                      className={`text-[11px] font-mono ${
                        isMarginBlocked
                          ? "text-red-300"
                          : needsApproval
                          ? "text-amber-300"
                          : "text-neutral-500"
                      }`}
                    >
                      {isMarginBlocked
                        ? isEn
                          ? "Exceeds max 20% commercial policy margin."
                          : "Ultrapassa o teto máximo de 20% permitido na política."
                        : needsApproval
                        ? isEn
                          ? "Between 10% and 20%: routes order to supervisor approval."
                          : "Entre 10% e 20%: requer justificativa e alçada gerencial."
                        : isEn
                        ? "Within autonomous commercial margin limit."
                        : "Dentro da autonomia direta do vendedor."}
                    </p>
                  </div>
                </div>

                {/* Live Button Hierarchy Reaction */}
                <div className="p-4 border border-neutral-800 bg-[#080808] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-neutral-400">
                    {isEn
                      ? "Button state adapts dynamically to business rules:"
                      : "Hierarquia do botão reage diretamente às regras:"}
                  </span>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <button
                      type="button"
                      disabled={!isNcmValid || isMarginBlocked}
                      onClick={() => {
                        setActiveTab("states");
                        setIsApprovalModalOpen(needsApproval);
                      }}
                      className={`px-4 py-2 font-semibold uppercase tracking-wider transition-colors rounded-sm ${
                        !isNcmValid || isMarginBlocked
                          ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                          : needsApproval
                          ? "bg-amber-400 text-[#080808] hover:bg-amber-300"
                          : "bg-[#13E1BC] text-[#080808] hover:bg-white"
                      }`}
                    >
                      {!isNcmValid || isMarginBlocked
                        ? isEn
                          ? "Submit Blocked"
                          : "Emissão Bloqueada"
                        : needsApproval
                        ? isEn
                          ? "Request Manager Approval"
                          : "Solicitar Alçada"
                        : isEn
                        ? "Authorize Order"
                        : "Autorizar Pedido"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SPECIMEN 03: BUTTONS, MODAL & RESILIENT EDGE STATES */}
            {activeTab === "states" && (
              <div className="p-5 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-neutral-850">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    {isEn ? "System View State:" : "Estado do Painel:"}
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {(["ready", "loading", "empty", "error"] as SystemViewState[]).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setViewState(st)}
                        className={`px-2.5 py-1 border rounded-sm uppercase ${
                          viewState === st
                            ? "border-[#13E1BC] bg-[#13E1BC]/15 text-[#13E1BC]"
                            : "border-neutral-800 bg-[#080808] text-neutral-400 hover:text-white"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* State Canvas */}
                <div className="border border-neutral-800 bg-[#080808] p-6 min-h-[190px] flex flex-col justify-center">
                  {viewState === "ready" && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span className="text-[11px] font-mono text-[#13E1BC] uppercase block">
                            {isEn ? "Ready • Corporate Action Bar" : "Ready • Barra de Ações & Modal"}
                          </span>
                          <p className="text-sm text-neutral-200 mt-1">
                            {isEn
                              ? "Explicit primary, secondary, and gated approval flows."
                              : "Hierarquia clara entre ação principal, secundária e fluxo de alçada."}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setApprovalConfirmed(false);
                            setIsApprovalModalOpen(true);
                          }}
                          className="px-4 py-2 bg-[#13E1BC] text-[#080808] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors rounded-sm"
                        >
                          {isEn ? "Open Approval Modal" : "Abrir Modal de Alçada"}
                        </button>
                      </div>

                      {isApprovalModalOpen && (
                        <div
                          role="region"
                          aria-label={isEn ? "Manager approval preview" : "Preview de modal de alçada"}
                          className="p-4 border border-[#13E1BC]/50 bg-neutral-950 space-y-3"
                        >
                          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                            <span className="text-xs font-mono text-white font-semibold">
                              {isEn
                                ? "EXCEPTION // Margin Approval Required"
                                : "EXCEÇÃO // Justificativa Obrigatória para Alçada"}
                            </span>
                            <button
                              type="button"
                              aria-label={isEn ? "Close modal preview" : "Fechar preview do modal"}
                              onClick={() => setIsApprovalModalOpen(false)}
                              className="text-neutral-400 hover:text-white p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={approvalReason}
                            onChange={(e) => setApprovalReason(e.target.value)}
                            placeholder={
                              isEn
                                ? "Reason code (e.g., Volume contract match)..."
                                : "Motivo auditável (ex: Cobertura de contrato anual)..."
                            }
                            aria-label={isEn ? "Audit reason" : "Motivo auditável"}
                            className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 text-xs font-mono text-white focus:border-[#13E1BC] focus:outline-none rounded-sm"
                          />
                          <div className="flex items-center justify-between gap-2">
                            {approvalConfirmed ? (
                              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                {isEn ? "Logged & sent to supervisor." : "Registrado e enviado à alçada."}
                              </span>
                            ) : (
                              <span className="text-[11px] font-mono text-neutral-500">
                                {isEn ? "Audit trail enforced" : "Trilha de auditoria obrigatória"}
                              </span>
                            )}
                            <button
                              type="button"
                              disabled={!approvalReason.trim()}
                              onClick={() => setApprovalConfirmed(true)}
                              className="px-3 py-1.5 bg-[#13E1BC] text-[#080808] font-mono text-xs font-bold uppercase disabled:opacity-40 disabled:pointer-events-none rounded-sm"
                            >
                              {isEn ? "Confirm Audit" : "Confirmar Envio"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {viewState === "loading" && (
                    <div className="space-y-3" aria-busy="true">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#13E1BC]">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>
                          {isEn
                            ? "Validating tax rules & warehouse balance..."
                            : "Validando matriz tributária e saldo de estoque..."}
                        </span>
                      </div>
                      <div className="space-y-2 animate-pulse">
                        <div className="h-4 bg-neutral-900 rounded-sm w-3/4" />
                        <div className="h-4 bg-neutral-900 rounded-sm w-1/2" />
                      </div>
                    </div>
                  )}

                  {viewState === "empty" && (
                    <div className="text-center space-y-2 py-2">
                      <Inbox className="w-6 h-6 text-neutral-500 mx-auto" />
                      <div className="text-sm font-medium text-white">
                        {isEn
                          ? "No pending approval exceptions"
                          : "Nenhuma exceção aguardando alçada"}
                      </div>
                      <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                        {isEn
                          ? "Orders within configured commercial policy auto-release without blocking queue."
                          : "Pedidos dentro da política padrão seguem automaticamente para faturamento."}
                      </p>
                    </div>
                  )}

                  {viewState === "error" && (
                    <div className="flex items-start justify-between gap-4 p-4 border border-red-500/40 bg-red-950/20">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <span className="text-xs font-mono text-red-300 font-semibold block">
                            {isEn
                              ? "ERR_SEFAZ_TIMEOUT • Safe Recovery Available"
                              : "ERR_SEFAZ_TIMEOUT • Recuperação Segura Ativa"}
                          </span>
                          <p className="text-xs text-neutral-300 leading-relaxed">
                            {isEn
                              ? "Authorizer timed out after 4s. Order draft stayed preserved with idempotent queue fallback."
                              : "Autorizador fiscal excedeu 4s. Rascunho preservado localmente com opção de reenvio ou contingência."}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setViewState("ready")}
                        className="px-3 py-1.5 border border-neutral-700 text-xs font-mono text-white hover:border-[#13E1BC] shrink-0"
                      >
                        {isEn ? "Retry" : "Tentar novamente"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
