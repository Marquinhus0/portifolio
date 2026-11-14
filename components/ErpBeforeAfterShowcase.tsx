"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ShoppingCart,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  PackageCheck,
  CreditCard,
  Truck,
  FileCheck2,
  Sparkles,
  Plus,
  Minus,
  Trash2,
  Eye,
  ShieldCheck,
} from "lucide-react";

type ErpModuleTab = "balcao" | "fechamento" | "compras";
type ViewVariant = "depois" | "antes";

interface MockSku {
  id: string;
  code: string;
  name: string;
  brand: string;
  application: string;
  warehouse: string;
  stock: number;
  reserved: number;
  price: number;
  coverageDays: number;
  suggestedQty: number;
  unitCost: number;
}

const SYNTHETIC_SKUS: MockSku[] = [
  {
    id: "sku-101",
    code: "HZ-4420-D",
    name: "Kit Embreagem Reforçada Heavy-Duty",
    brand: "SACHS / LINHA B2B",
    application: "Utilitários Diesel 2.8 • 2018–2024",
    warehouse: "CD-01 Matriz",
    stock: 18,
    reserved: 3,
    price: 1240.0,
    coverageDays: 4,
    suggestedQty: 24,
    unitCost: 890.0,
  },
  {
    id: "sku-102",
    code: "HZ-8812-K",
    name: "Conjunto Óptico LED Bifocal Lado Direito",
    brand: "HELLA TECH",
    application: "Frota Leve Série F • 2020–2025",
    warehouse: "CD-01 Matriz",
    stock: 42,
    reserved: 6,
    price: 685.5,
    coverageDays: 19,
    suggestedQty: 8,
    unitCost: 470.0,
  },
  {
    id: "sku-103",
    code: "HZ-2190-F",
    name: "Jogo de Pastilhas Cerâmicas Dianteiras",
    brand: "FRAS-LE PRO",
    application: "Vans e Furgões 3.5T • Linha Comercial",
    warehouse: "CD-02 Filial Sul",
    stock: 5,
    reserved: 2,
    price: 318.9,
    coverageDays: 3,
    suggestedQty: 40,
    unitCost: 205.0,
  },
  {
    id: "sku-104",
    code: "HZ-6075-A",
    name: "Amortecedor Hidráulico Eixo Traseiro",
    brand: "NAKATA IND.",
    application: "Caminhões Leves 6T–9T",
    warehouse: "CD-01 Matriz",
    stock: 29,
    reserved: 0,
    price: 540.0,
    coverageDays: 11,
    suggestedQty: 12,
    unitCost: 375.0,
  },
];

const DIAGNOSTIC_POINTS: Record<
  ErpModuleTab,
  { title: string; legacyIssues: string[]; redesignDecisions: string[] }
> = {
  balcao: {
    title: "Balcão & Pesquisa de Itens",
    legacyIssues: [
      "10+ campos horizontais com mesmo peso visual exigem preenchimento fragmentado do operador.",
      "12+ micro-ícones sem rótulo abaixo do preço geram insegurança e memorização forçada em novos vendedores.",
      "Saldo disponível, reservado e multi-depósito aparecem soltos sem contexto de clique ou status cromático.",
    ],
    redesignDecisions: [
      "Campo de busca unificada (código, referência ou aplicação) com filtros avançados recolhidos por padrão.",
      "Hierarquia limpa do SKU: disponibilidade clara, preço unitário, ações secundárias agrupadas e CTA único (+ Adicionar).",
      "Carrinho lateral persistente para fechar pedidos sem perder contexto da pesquisa.",
    ],
  },
  fechamento: {
    title: "Fechamento de Pedido & Faturamento",
    legacyIssues: [
      "Modal único empilha série, desconto, multi-forma de pagamento, frete, observações fiscais, transporte e parceiro simultaneamente.",
      "Campos opcionais raros (ex.: placa/tara de transportadora) disputam espaço nobre com o total e forma de pagamento.",
      "Alto risco de emissão fiscal com dado incompleto ou esquecimento de validação de crédito.",
    ],
    redesignDecisions: [
      "Fluxo linear em 3 blocos claros: 1. Cliente & Limite → 2. Pagamento & Frete → 3. Revisão Fiscal & Emissão.",
      "Progressive Disclosure: blocos extras (Transporte, Observações NF-e) abrem somente quando habilitados.",
      "Resumo financeiro fixo na lateral direita acompanha cada alteração em tempo real.",
    ],
  },
  compras: {
    title: "Sugestão de Compra & Reposição",
    legacyIssues: [
      "Painel superior com mais de 22 parâmetros técnicos e checkboxes empilhados intimida compradores em treinamento.",
      "Siglas de colunas sem legenda (LD, PO, EX, US, VDA, MC, MA, MV) exigem leitura manual linha a linha.",
      "Histórico de notas anteriores expande no meio da tabela quebrando o alinhamento de leitura rápida.",
    ],
    redesignDecisions: [
      "Predefinições de análise (Críticos < 7 dias, Alto Giro) substituem metade dos filtros manuais no primeiro olhar.",
      "Badges semânticos de cobertura de estoque indicam imediatamente o que precisa de reposição urgente.",
      "Edição inline da quantidade sugerida com consolidação automática da Ordem de Compra.",
    ],
  },
};

export default function ErpBeforeAfterShowcase() {
  const [variant, setVariant] = useState<ViewVariant>("depois");
  const [moduleTab, setModuleTab] = useState<ErpModuleTab>("balcao");

  // Balcao state
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [warehouseFilter, setWarehouseFilter] = useState("Todos");
  const [cart, setCart] = useState<{ sku: MockSku; qty: number }[]>([
    { sku: SYNTHETIC_SKUS[0], qty: 2 },
  ]);

  // Fechamento state
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(2);
  const [paymentMethod, setPaymentMethod] = useState<"30_60" | "pix" | "boleto_30">("30_60");
  const [freightMode, setFreightMode] = useState<"RETIRA" | "CIF" | "FOB">("CIF");
  const [showFiscalObs, setShowFiscalObs] = useState(false);
  const [orderEmitted, setOrderEmitted] = useState(false);

  // Compras state
  const [coverageFilter, setCoverageFilter] = useState<"all" | "critical">("all");
  const [orderQuantities, setOrderQuantities] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    SYNTHETIC_SKUS.forEach((s) => {
      init[s.id] = s.suggestedQty;
    });
    return init;
  });

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const formatBRL = (val: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);

  const filteredSkus = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SYNTHETIC_SKUS.filter((s) => {
      const matchQuery =
        !q ||
        s.code.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.brand.toLowerCase().includes(q) ||
        s.application.toLowerCase().includes(q);
      const matchWh = warehouseFilter === "Todos" || s.warehouse === warehouseFilter;
      return matchQuery && matchWh;
    });
  }, [searchQuery, warehouseFilter]);

  const cartTotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.sku.price * item.qty, 0),
    [cart]
  );

  const discountMultiplier = paymentMethod === "pix" ? 0.97 : 1;
  const freightFee = freightMode === "CIF" ? 85 : 0;
  const finalTotal = cartTotal * discountMultiplier + freightFee;

  const purchaseTotal = useMemo(() => {
    return SYNTHETIC_SKUS.reduce(
      (sum, s) => sum + (orderQuantities[s.id] || 0) * s.unitCost,
      0
    );
  }, [orderQuantities]);

  const handleAddToCart = (sku: MockSku) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.sku.id === sku.id);
      if (existing) {
        return prev.map((i) =>
          i.sku.id === sku.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { sku, qty: 1 }];
    });
    setOrderEmitted(false);
    notify(`Item ${sku.code} adicionado ao pedido.`);
  };

  const handleUpdateQty = (skuId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.sku.id === skuId ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
    setOrderEmitted(false);
  };

  const diag = DIAGNOSTIC_POINTS[moduleTab];

  return (
    <div className="border border-surface-border bg-neutral-950 overflow-hidden shadow-2xl">
      {/* Top Bar: NDA-Safe Banner & Before/After Switcher */}
      <div className="p-5 sm:p-6 border-b border-neutral-800 bg-[#0c0d10] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#13E1BC]/15 text-[#13E1BC] border border-[#13E1BC]/30 font-semibold rounded-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NDA-SAFE // DADOS ANONIMIZADOS</span>
            </span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-400">Empresa Fictícia: Horizonte Suprimentos B2B</span>
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-white tracking-tight">
            Comparador Interativo: Padrão Legado vs. Arquitetura Redesenhada
          </h3>
        </div>

        {/* Toggle Antes / Depois */}
        <div className="flex items-center gap-1.5 bg-neutral-900 p-1 border border-neutral-800 rounded-md self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setVariant("antes")}
            className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider rounded transition-all flex items-center gap-1.5 ${
              variant === "antes"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Antes (Legado)</span>
          </button>
          <button
            type="button"
            onClick={() => setVariant("depois")}
            className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider rounded transition-all flex items-center gap-1.5 ${
              variant === "depois"
                ? "bg-[#13E1BC] text-[#080808] font-bold shadow-[0_0_15px_rgba(19,225,188,0.25)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Depois (Redesign)</span>
          </button>
        </div>
      </div>

      {/* Module Selector Bar */}
      <div className="px-5 sm:px-6 py-3 border-b border-neutral-800 bg-neutral-950 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "balcao" as ErpModuleTab, label: "01. Balcão & Pesquisa de Vendas" },
            { id: "fechamento" as ErpModuleTab, label: "02. Fechamento de Pedido" },
            { id: "compras" as ErpModuleTab, label: "03. Sugestão de Compra" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setModuleTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm border transition-colors ${
                moduleTab === tab.id
                  ? "bg-neutral-800 text-white border-neutral-600 font-semibold"
                  : "bg-transparent text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {toast && (
          <div className="px-3 py-1 bg-[#13E1BC]/15 border border-[#13E1BC]/40 text-[#13E1BC] text-xs font-mono rounded-sm">
            {toast}
          </div>
        )}
      </div>

      {/* Interactive ERP Stage */}
      <div className="p-4 sm:p-6 bg-[#0f1115]">
        {/* ============================================================== */}
        {/* VARIANT: ANTES (LEGADO RECONSTRUÍDO SEM VAZAR NDA)             */}
        {/* ============================================================== */}
        {variant === "antes" && (
          <div className="bg-[#f1f3f6] text-[#1f2937] border border-slate-300 rounded overflow-hidden shadow-inner font-sans">
            {/* Legacy Header Mimicking Classic Dense Web ERP */}
            <div className="bg-[#1e4d7b] text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3 font-semibold">
                <span className="bg-[#0ea5e9] px-2 py-0.5 rounded text-[10px]">ERP LEGADO</span>
                <span className="opacity-85">INTRANET • CADASTRO • COMPRAS • ESTOQUE • VENDAS • FATURAMENTO • FISCAL</span>
              </div>
              <span className="text-[10px] font-mono opacity-80">Reconstrução Estrutural Anonimizada</span>
            </div>

            {moduleTab === "balcao" && (
              <div className="p-4 space-y-3 text-xs">
                <div className="bg-white border border-slate-300 p-2.5 space-y-2">
                  <div className="text-[11px] font-bold text-[#1e4d7b]">Busca Item (Todos os parâmetros simultâneos)</div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-9 gap-1.5 text-[10px]">
                    {["Cod/GTIN", "Tipo", "Sub Desc.", "Aplicação", "Cod. Fabr.", "Marca", "Cod. Antigo", "Conversão", "Ano"].map((lbl) => (
                      <div key={lbl}>
                        <label className="block text-slate-500">{lbl}:</label>
                        <input
                          readOnly
                          placeholder="..."
                          className="w-full border border-slate-300 bg-slate-50 px-1.5 py-1 text-[10px]"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-end gap-1.5 pt-1">
                    <span className="text-[10px] text-slate-600 mr-2">○ Sem Similar</span>
                    <button type="button" onClick={() => notify("Modo Legado: filtros fragmentados dificultam busca rápida.")} className="px-3 py-1 bg-[#2563eb] text-white text-[11px] rounded-sm">Buscar</button>
                    <button type="button" className="px-3 py-1 bg-slate-200 text-slate-700 text-[11px] rounded-sm">Limpar</button>
                  </div>
                </div>

                {/* Legacy Dense Rows */}
                <div className="bg-slate-200 px-3 py-1 text-[10px] font-semibold flex justify-between border border-slate-300">
                  <span>Filtros: Mostrar Zerado: SIM</span>
                  <span className="text-blue-700">Contestar Resultado</span>
                </div>
                {SYNTHETIC_SKUS.slice(0, 2).map((sku) => (
                  <div key={sku.id} className="bg-white border border-slate-300 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="font-bold text-slate-800">{sku.name} ({sku.code})</div>
                      <div className="flex flex-wrap items-center gap-2">
                        <input readOnly value={sku.price.toFixed(2)} className="w-20 border border-slate-300 px-1.5 py-0.5 text-right bg-slate-50" />
                        <input readOnly value="0,00" className="w-14 border border-slate-300 px-1.5 py-0.5 text-right bg-slate-50" />
                        <input readOnly value="1" className="w-10 border border-slate-300 px-1.5 py-0.5 text-center bg-slate-50" />
                        <button type="button" onClick={() => notify("No legado, 11 micro-ícones abaixo confundem operadores novos.")} className="px-2.5 py-1 bg-[#16a34a] text-white font-semibold rounded-sm">
                          Vender
                        </button>
                        <span className="text-[10px] text-blue-700 font-bold">Est {sku.stock} ({sku.reserved})</span>
                      </div>
                      <div className="flex items-center gap-1 pt-1 text-[10px] text-slate-400">
                        {Array.from({ length: 11 }).map((_, idx) => (
                          <span key={idx} title={`Ação oculta #${idx + 1}`} className="w-4 h-4 bg-slate-200 border border-slate-300 rounded-sm inline-flex items-center justify-center text-[9px] text-slate-600 cursor-help">
                            ?
                          </span>
                        ))}
                        <span className="ml-1 text-amber-700 font-medium">← 11 micro-ícones sem rótulo</span>
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 text-right">
                      <div>NCM: 8512.2022</div>
                      <div>Local: {sku.warehouse}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {moduleTab === "fechamento" && (
              <div className="p-4">
                <div className="border-2 border-[#1e4d7b] bg-white rounded-sm overflow-hidden">
                  <div className="bg-[#1e4d7b] text-white px-3 py-1.5 text-xs font-bold flex justify-between">
                    <span>Fechamento Pedido (Modal único sobrecarregado)</span>
                    <span>Total: R$ 2.480,00</span>
                  </div>
                  <div className="p-3 grid grid-cols-1 md:grid-cols-4 gap-2 text-[10px]">
                    {[
                      { box: "Série / Evento", fields: "Série: PADRAO-CON • Evento: VENDA" },
                      { box: "Desconto", fields: "Valor: 0,00 • %: 0 • Zerar • NF-e Destacar" },
                      { box: "Forma Pagamento", fields: "Aut. Venda • Forma: DINHEIRO • Vencimento" },
                      { box: "Multi Forma", fields: "Valor: 0,00 + Adicionar • Tabela" },
                      { box: "Frete", fields: "Transportadora • Tipo: SEM FRETE" },
                      { box: "Adicionais", fields: "Frete: 0,00 • Desp.: 0,00 • Rateio: 0,00" },
                      { box: "Obs Fiscal / Separação", fields: "Carimbo • Separação • Textarea NF-e • Pedido" },
                      { box: "Transporte / Parceiro", fields: "Placa • UF • Qtd Vol • Espécie • Peso • Parceiro" },
                    ].map((blk) => (
                      <div key={blk.box} className="border border-slate-300 p-2 bg-slate-50 space-y-1">
                        <div className="font-bold text-[#1e4d7b] border-b border-slate-200 pb-0.5">{blk.box}</div>
                        <div className="text-slate-600 leading-snug">{blk.fields}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {moduleTab === "compras" && (
              <div className="p-4 space-y-2 text-[10px]">
                <div className="bg-white border border-slate-300 p-2.5 space-y-2">
                  <div className="font-bold text-[#1e4d7b]">Sugestao Compra — 22+ parâmetros expostos de uma vez</div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-slate-600">
                    {["Item", "Tipo", "Sub Desc", "Marca", "Segmento", "Fornecedor Ref", "Local", "Meses Retro", "Sem. Fut.", "Múltiplo", "Similar", "Classe"].map((f) => (
                      <div key={f} className="border border-slate-300 bg-slate-50 px-1.5 py-1 truncate">{f}: [ ____ ]</div>
                    ))}
                  </div>
                </div>
                <div className="bg-white border border-slate-300 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-200 text-slate-700 font-mono">
                      <tr>
                        {["SEQ", "COD", "ITEM", "MARCA", "VDA", "MED", "EST", "SUG", "MC", "MA", "MV", "S", "SC", "PRECO"].map((col) => (
                          <th key={col} className="px-2 py-1.5 border-b border-slate-300">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SYNTHETIC_SKUS.slice(0, 2).map((s, idx) => (
                        <tr key={s.id} className="border-b border-slate-200">
                          <td className="px-2 py-1.5">{idx + 1}</td>
                          <td className="px-2 py-1.5 font-mono">{s.code}</td>
                          <td className="px-2 py-1.5">{s.name}</td>
                          <td className="px-2 py-1.5">{s.brand}</td>
                          <td className="px-2 py-1.5">14</td>
                          <td className="px-2 py-1.5">4,2</td>
                          <td className="px-2 py-1.5">{s.stock}</td>
                          <td className="px-2 py-1.5 font-bold">{s.suggestedQty}</td>
                          <td className="px-2 py-1.5">-</td>
                          <td className="px-2 py-1.5">-</td>
                          <td className="px-2 py-1.5">-</td>
                          <td className="px-2 py-1.5">0</td>
                          <td className="px-2 py-1.5">0</td>
                          <td className="px-2 py-1.5">{s.unitCost.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* VARIANT: DEPOIS (ARQUITETURA MODULAR INTERATIVA)               */}
        {/* ============================================================== */}
        {variant === "depois" && (
          <div className="bg-[#f8fafc] text-[#0f172a] rounded border border-slate-200 overflow-hidden shadow-lg">
            {/* Clean Modern App Shell Header */}
            <div className="bg-white border-b border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-[#0f172a] text-[#13E1BC] flex items-center justify-center font-mono text-xs font-bold">
                  HZ
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Horizonte ERP • Operação Integrada</div>
                  <div className="text-[10px] text-slate-500 font-mono">Design System Padronizado • Progressive Disclosure</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setModuleTab("fechamento")}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-md font-medium hover:bg-slate-800 transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-[#13E1BC]" />
                  <span>Pedido Atual ({cart.reduce((a, b) => a + b.qty, 0)} itens)</span>
                  <span className="font-mono text-[#13E1BC] font-bold">{formatBRL(cartTotal)}</span>
                </button>
              </div>
            </div>

            {/* MODULE 01: BALCÃO REDESENHADO */}
            {moduleTab === "balcao" && (
              <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                <div className="lg:col-span-8 space-y-4">
                  {/* Unified Search + Progressive Filters */}
                  <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-3 shadow-xs">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Busque por código, descrição, marca ou aplicação (ex: Embreagem, HZ-4420, Diesel)..."
                          className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md outline-none focus:border-blue-600 focus:bg-white transition-colors"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
                          showAdvancedFilters
                            ? "bg-blue-50 border-blue-200 text-blue-700"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>Filtros avançados</span>
                      </button>
                    </div>

                    {showAdvancedFilters && (
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-slate-500 font-medium">Depósito:</span>
                        {["Todos", "CD-01 Matriz", "CD-02 Filial Sul"].map((wh) => (
                          <button
                            key={wh}
                            type="button"
                            onClick={() => setWarehouseFilter(wh)}
                            className={`px-2.5 py-1 rounded text-[11px] font-medium ${
                              warehouseFilter === wh
                                ? "bg-slate-900 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {wh}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Clean SKU Cards */}
                  <div className="space-y-2.5">
                    {filteredSkus.map((sku) => {
                      const available = sku.stock - sku.reserved;
                      return (
                        <div
                          key={sku.id}
                          className="bg-white border border-slate-200 hover:border-blue-400 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors shadow-2xs"
                        >
                          <div className="space-y-1.5 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-800 rounded">
                                {sku.code}
                              </span>
                              <span className="text-[11px] font-semibold text-blue-700">{sku.brand}</span>
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                  available <= 5
                                    ? "bg-amber-50 text-amber-800 border border-amber-200"
                                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                }`}
                              >
                                {available} disp. • {sku.warehouse}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900">{sku.name}</h4>
                            <p className="text-xs text-slate-500">{sku.application}</p>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                            <div className="text-left sm:text-right">
                              <span className="text-[10px] text-slate-500 block">Preço Unitário</span>
                              <span className="text-base font-extrabold text-slate-900">{formatBRL(sku.price)}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleAddToCart(sku)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md transition-colors shadow-xs"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Adicionar</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Live Cart Sidebar */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-lg p-4 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Resumo do Pedido</span>
                    <span className="text-[11px] font-mono text-slate-500">{cart.length} SKU(s)</span>
                  </div>

                  {cart.length === 0 ? (
                    <p className="text-xs text-slate-500 py-6 text-center">
                      Adicione itens ao lado para simular o fechamento guiado.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.sku.id} className="p-2.5 bg-slate-50 rounded border border-slate-200 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="text-[11px] font-mono font-bold text-slate-700">{item.sku.code}</div>
                              <div className="text-xs font-semibold text-slate-900 truncate">{item.sku.name}</div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleUpdateQty(item.sku.id, -item.qty)}
                              className="text-slate-400 hover:text-rose-600 p-0.5"
                              aria-label={`Remover ${item.sku.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="inline-flex items-center border border-slate-200 bg-white rounded">
                              <button
                                type="button"
                                onClick={() => handleUpdateQty(item.sku.id, -1)}
                                className="p-1 text-slate-600 hover:bg-slate-100"
                                aria-label="Diminuir quantidade"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 text-xs font-mono font-bold">{item.qty}</span>
                              <button
                                type="button"
                                onClick={() => handleUpdateQty(item.sku.id, 1)}
                                className="p-1 text-slate-600 hover:bg-slate-100"
                                aria-label="Aumentar quantidade"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="text-xs font-bold text-slate-900">
                              {formatBRL(item.sku.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-200 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 font-medium">Subtotal</span>
                      <span className="font-extrabold text-slate-900">{formatBRL(cartTotal)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setModuleTab("fechamento")}
                      disabled={cart.length === 0}
                      className="w-full py-2.5 px-4 bg-slate-900 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold rounded-md flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>Ir para Fechamento Guiado</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 02: FECHAMENTO GUIADO EM 3 PASSOS */}
            {moduleTab === "fechamento" && (
              <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                <div className="lg:col-span-8 space-y-4">
                  {/* Guided Stepper */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { step: 1 as const, label: "1. Cliente & Crédito", icon: PackageCheck },
                      { step: 2 as const, label: "2. Pagamento & Frete", icon: CreditCard },
                      { step: 3 as const, label: "3. Fiscal & Emissão", icon: FileCheck2 },
                    ].map((s) => {
                      const Icon = s.icon;
                      const active = checkoutStep === s.step;
                      return (
                        <button
                          key={s.step}
                          type="button"
                          onClick={() => setCheckoutStep(s.step)}
                          className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-colors ${
                            active
                              ? "bg-blue-50 border-blue-500 text-blue-900 font-bold"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${active ? "text-blue-600" : "text-slate-400"}`} />
                          <span className="text-xs truncate">{s.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-5">
                    {checkoutStep === 1 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900">Cliente Faturamento &amp; Limite Pré-Aprovado</h4>
                          <span className="text-[11px] font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded">
                            Crédito Liberado
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                            <span className="text-slate-500 block">Razão Social (Fictícia)</span>
                            <strong className="text-slate-900">Transportadora Serra Azul Ltda.</strong>
                          </div>
                          <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                            <span className="text-slate-500 block">Limite Disponível</span>
                            <strong className="text-emerald-700">R$ 48.000,00 (Sem pendências)</strong>
                          </div>
                        </div>
                      </div>
                    )}

                    {checkoutStep === 2 && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-900 block">Condição de Pagamento</label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {[
                              { id: "30_60" as const, title: "Boleto 30 / 60 dias", sub: "Sem acréscimo" },
                              { id: "pix" as const, title: "PIX À Vista", sub: "3% desconto automático" },
                              { id: "boleto_30" as const, title: "Faturado 30 dias", sub: "Padrão carteira B2B" },
                            ].map((opt) => (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => setPaymentMethod(opt.id)}
                                className={`p-3 rounded-lg border text-left transition-colors ${
                                  paymentMethod === opt.id
                                    ? "bg-blue-50 border-blue-600"
                                    : "bg-slate-50 border-slate-200 hover:bg-white"
                                }`}
                              >
                                <div className="text-xs font-bold text-slate-900">{opt.title}</div>
                                <div className="text-[11px] text-slate-500">{opt.sub}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-900 block">Modalidade de Entrega</label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { id: "CIF" as const, label: "Entrega CIF (R$ 85,00)" },
                              { id: "FOB" as const, label: "Transportadora FOB (Cliente)" },
                              { id: "RETIRA" as const, label: "Retira Balcão (R$ 0,00)" },
                            ].map((f) => (
                              <button
                                key={f.id}
                                type="button"
                                onClick={() => setFreightMode(f.id)}
                                className={`px-3 py-2 text-xs rounded-md border flex items-center gap-1.5 ${
                                  freightMode === f.id
                                    ? "bg-slate-900 text-white border-slate-900 font-semibold"
                                    : "bg-white text-slate-700 border-slate-200"
                                }`}
                              >
                                <Truck className="w-3.5 h-3.5" />
                                <span>{f.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {checkoutStep === 3 && (
                      <div className="space-y-3 text-xs">
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Regras tributárias (CFOP 5.102 / ICMS) pré-validadas automaticamente.</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowFiscalObs(!showFiscalObs)}
                          className="text-blue-700 font-semibold hover:underline"
                        >
                          {showFiscalObs ? "− Ocultar dados opcionais de transporte / NF-e" : "+ Adicionar placa/transportadora ou observação NF-e (opcional)"}
                        </button>
                        {showFiscalObs && (
                          <textarea
                            rows={2}
                            placeholder="Observação complementar para impressão na DANFE..."
                            className="w-full p-2.5 border border-slate-200 rounded bg-slate-50 text-xs outline-none focus:border-blue-600"
                          />
                        )}
                      </div>
                    )}

                    <div className="flex justify-between pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3) : 1))}
                        className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded text-slate-600 hover:bg-slate-50"
                      >
                        Etapa anterior
                      </button>
                      {checkoutStep < 3 ? (
                        <button
                          type="button"
                          onClick={() => setCheckoutStep((prev) => ((prev + 1) as 1 | 2 | 3))}
                          className="px-4 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Avançar etapa →
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setOrderEmitted(true);
                            notify("Pedido simulado concluído com validação fiscal limpa!");
                          }}
                          className="px-4 py-1.5 text-xs font-semibold bg-emerald-600 text-white rounded hover:bg-emerald-700"
                        >
                          Emitir Pedido &amp; NF-e
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Live Summary Card */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-lg p-4 space-y-3 text-xs">
                  <span className="font-bold text-slate-900 uppercase tracking-wider block border-b border-slate-100 pb-2">
                    Totais do Fechamento
                  </span>
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal itens ({cart.reduce((a, b) => a + b.qty, 0)}):</span>
                    <span>{formatBRL(cartTotal)}</span>
                  </div>
                  {paymentMethod === "pix" && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Desconto PIX (3%):</span>
                      <span>− {formatBRL(cartTotal * 0.03)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Frete ({freightMode}):</span>
                    <span>{formatBRL(freightFee)}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total Final</span>
                    <span>{formatBRL(finalTotal)}</span>
                  </div>
                  {orderEmitted && (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded font-medium">
                      Pedido #HZ-2026-0918 pronto para faturamento!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* MODULE 03: SUGESTÃO DE COMPRA REDESENHADA */}
            {moduleTab === "compras" && (
              <div className="p-5 space-y-4">
                <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-slate-700">Prioridade de Reposição:</span>
                    <button
                      type="button"
                      onClick={() => setCoverageFilter("all")}
                      className={`px-3 py-1.5 rounded-md font-medium ${
                        coverageFilter === "all"
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      Todos os SKUs ({SYNTHETIC_SKUS.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setCoverageFilter("critical")}
                      className={`px-3 py-1.5 rounded-md font-medium ${
                        coverageFilter === "critical"
                          ? "bg-rose-600 text-white"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      Risco de Ruptura (&lt; 7 dias)
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">Investimento Estimado OC</span>
                      <span className="text-sm font-extrabold text-slate-900">{formatBRL(purchaseTotal)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => notify(`Ordem de Compra gerada (${formatBRL(purchaseTotal)})!`)}
                      className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md"
                    >
                      Gerar Cotação / OC
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                      <tr>
                        <th className="px-4 py-3">Item / SKU</th>
                        <th className="px-4 py-3">Saldo Atual</th>
                        <th className="px-4 py-3">Cobertura</th>
                        <th className="px-4 py-3">Custo Unitário</th>
                        <th className="px-4 py-3">Qtd. Comprar</th>
                        <th className="px-4 py-3 text-right">Subtotal OC</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {SYNTHETIC_SKUS.filter((s) => coverageFilter === "all" || s.coverageDays < 7).map((sku) => {
                        const qty = orderQuantities[sku.id] ?? 0;
                        const critical = sku.coverageDays < 7;
                        return (
                          <tr key={sku.id} className="hover:bg-slate-50/80">
                            <td className="px-4 py-3">
                              <div className="font-bold text-slate-900">{sku.name}</div>
                              <div className="text-[11px] font-mono text-slate-500">{sku.code} • {sku.brand}</div>
                            </td>
                            <td className="px-4 py-3 font-mono">{sku.stock} un.</td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                                  critical
                                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                }`}
                              >
                                {sku.coverageDays} dias {critical ? "• Crítico" : ""}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-mono">{formatBRL(sku.unitCost)}</td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                min={0}
                                value={qty}
                                onChange={(e) =>
                                  setOrderQuantities((prev) => ({
                                    ...prev,
                                    [sku.id]: Math.max(0, Number(e.target.value) || 0),
                                  }))
                                }
                                className="w-20 px-2 py-1 border border-slate-300 rounded font-mono text-xs bg-white focus:border-blue-600 outline-none"
                              />
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-slate-900">
                              {formatBRL(qty * sku.unitCost)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Diagnostic Footer Comparing Legacy Problems vs Redesign Decisions */}
      <div className="p-5 sm:p-6 border-t border-neutral-800 bg-neutral-950 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 border border-amber-500/20 bg-amber-500/[0.03] space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300">
            <Eye className="w-3.5 h-3.5" />
            <span>Diagnóstico em Campo // Antes ({diag.title})</span>
          </div>
          <ul className="space-y-1.5 text-xs text-neutral-300">
            {diag.legacyIssues.map((issue, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-mono">−</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border border-[#13E1BC]/25 bg-[#13E1BC]/[0.03] space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#13E1BC]">
            <Layers className="w-3.5 h-3.5" />
            <span>Decisões de Arquitetura // Depois ({diag.title})</span>
          </div>
          <ul className="space-y-1.5 text-xs text-neutral-200">
            {diag.redesignDecisions.map((dec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#13E1BC] font-mono">+</span>
                <span>{dec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
