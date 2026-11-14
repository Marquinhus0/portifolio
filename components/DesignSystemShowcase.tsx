"use client";

import { useState } from "react";
import { Check, Copy, Keyboard, Layers, SlidersHorizontal, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type DensityMode = "compact" | "comfortable";

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

  const copyToken = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <section className="py-20 border-b border-surface-borderSubtle bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-surface-borderSubtle">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>{isEn ? "[Design System & Tokens]" : "[Design System & Tokens B2B]"}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              {isEn
                ? "Architectural Tokens & Operational Density"
                : "Tokens Semânticos & Densidade Operacional"}
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-400 max-w-md leading-relaxed">
            {isEn
              ? "Interactive specimen demonstrating color tokens, semantic alerts, keyboard navigation, and table density used across ERP workflows."
              : "Demonstração interativa de tokens cromáticos, estados fiscais semânticos, atalhos de teclado e densidade tabular aplicados em ERPs."}
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
                  <span>{isEn ? "Zero-Mouse ERP Contract" : "Contrato Zero-Mouse (ERP)"}</span>
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

          {/* Right: Live Operational Density & Semantic Validation Specimen */}
          <div className="lg:col-span-7 border border-surface-border bg-neutral-950 overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-800 bg-neutral-900/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-white">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#13E1BC]" />
                <span>
                  {isEn ? "Live Data-Table Density Specimen" : "Simulador de Densidade Tabular B2B"}
                </span>
              </div>
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
            </div>

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
          </div>
        </div>
      </div>
    </section>
  );
}
