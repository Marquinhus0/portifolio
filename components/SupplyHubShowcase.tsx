"use client";

import { useState } from "react";
import {
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Building2,
  FileText,
  DollarSign,
  TrendingUp,
  Truck,
  Users,
  Lock,
  ChevronRight,
  Filter,
  Layers,
  Send,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";

export default function SupplyHubShowcase() {
  const [activeTab, setActiveTab] = useState<
    "comparison" | "negotiation" | "rbac" | "orderLifecycle"
  >("comparison");

  // State for RBAC role simulation
  const [selectedRole, setSelectedRole] = useState<
    "buyer" | "approver" | "finance" | "admin"
  >("buyer");

  // State for supplier selection in comparison
  const [selectedSupplier, setSelectedSupplier] = useState<string>("techcorp");

  // State for negotiation counter-offer simulation
  const [discountValue, setDiscountValue] = useState<number>(10);
  const [paymentTerms, setPaymentTerms] = useState<string>("60 dias");
  const [counterOfferSent, setCounterOfferSent] = useState<boolean>(false);

  // Suppliers Data
  const suppliers = [
    {
      id: "techcorp",
      name: "TechCorp Hardware B2B",
      rating: "4.9/5.0",
      complianceStatus: "HOMOLOGADO",
      isoCert: "ISO 9001 / ISO 27001",
      unitPrice: "R$ 4.250",
      volumeDiscount: "-12% (>50 un)",
      slaDays: "3 dias úteis",
      freight: "CIF (Frete Incluso)",
      paymentConditions: "Faturamento 30/60 dias",
      moq: "10 unidades",
      stock: "140 disponíveis",
      isBestOverall: true,
    },
    {
      id: "alphadist",
      name: "Alpha Distribuidora Industrial",
      rating: "4.6/5.0",
      complianceStatus: "HOMOLOGADO",
      isoCert: "ISO 9001",
      unitPrice: "R$ 4.120",
      volumeDiscount: "-5% (>50 un)",
      slaDays: "7 dias úteis",
      freight: "FOB (Pago pelo Comprador)",
      paymentConditions: "Boleto 30 dias",
      moq: "20 unidades",
      stock: "85 disponíveis",
      isBestOverall: false,
    },
    {
      id: "primelog",
      name: "PrimeLog Suprimentos Enterprise",
      rating: "4.4/5.0",
      complianceStatus: "EM AUDITORIA",
      isoCert: "Em Certificação",
      unitPrice: "R$ 4.400",
      volumeDiscount: "-15% (>100 un)",
      slaDays: "2 dias úteis",
      freight: "CIF Express",
      paymentConditions: "À vista com 5% desc.",
      moq: "5 unidades",
      stock: "320 disponíveis",
      isBestOverall: false,
    },
  ];

  // RBAC Roles Definition
  const roles = [
    {
      id: "buyer",
      title: "Comprador",
      badge: "ROLE_BUYER",
      scope: "Operação de Compras & Cotação",
      autonomyLimit: "Até R$ 15.000 / compra",
      allowedActions: [
        "Navegação em catálogo e busca técnica avançada",
        "Disparo de RFQ para até 5 fornecedores simultâneos",
        "Negociação de contraproposta (prazo e volume)",
        "Montagem do carrinho corporativo e emissão da solicitação",
      ],
      restrictedActions: [
        "Não pode aprovar compras acima de R$ 15.000",
        "Não pode autorizar fornecedores não-homologados",
        "Não pode alterar parâmetros globais de centro de custo",
      ],
      currentViewNotice: "Visão focada em busca, comparação de preços, prazos e negociação comercial.",
    },
    {
      id: "approver",
      title: "Aprovador (Gestor)",
      badge: "ROLE_APPROVER",
      scope: "Centro de Custo Departamental (TI & Infra)",
      autonomyLimit: "Alçada de até R$ 80.000 / pedido",
      allowedActions: [
        "Revisão de comparativo de cotações anexadas à solicitação",
        "Verificação em tempo real do saldo orçamentário restante do mês",
        "Aprovação com 1 clique ou reprovação com justificativa formal",
        "Solicitação de renegociação de preço ao comprador",
      ],
      restrictedActions: [
        "Não pode alterar itens técnicos da ordem de compra",
        "Não pode aprovar compras fora do seu centro de custo",
        "Não pode liquidar financeiramente ou liberar pagamentos",
      ],
      currentViewNotice: "Visão executiva com foco em saldo orçamentário, aderência à política e aprovação de alçada.",
    },
    {
      id: "finance",
      title: "Financeiro / Controller",
      badge: "ROLE_FINANCE",
      scope: "Tesouraria, Fiscal & Compliance",
      autonomyLimit: "Validação Irrestrita de Crédito e Faturamento",
      allowedActions: [
        "Auditoria de certidões fiscais (Sintegra, CND, Receita)",
        "Validação de condições de pagamento e fluxo de caixa (D+30/60/90)",
        "Liberação de emissão de Purchase Order (PO) e aceite fiscal",
        "Confronto de NF-e com pedido físico entregue",
      ],
      restrictedActions: [
        "Não pode selecionar fornecedores ou alterar marcas aprovadas",
        "Não pode dispensar a regra corporativa de 3 cotações",
      ],
      currentViewNotice: "Visão focada em conciliação de fluxo de caixa, alíquotas fiscais e auditoria de crédito.",
    },
    {
      id: "admin",
      title: "Administrador",
      badge: "ROLE_ADMIN",
      scope: "Governança Corporativa & Parametrização",
      autonomyLimit: "Governança Global do Tenant",
      allowedActions: [
        "Definição da matriz de alçadas e thresholds de aprovação",
        "Homologação e bloqueio de fornecedores no catálogo",
        "Gestão de centros de custo e limites orçamentários anuais",
        "Visualização do Log de Auditoria Imutável (Audit Trail)",
      ],
      restrictedActions: [
        "Ações operacionais diretas de compra são registradas com tag de override",
      ],
      currentViewNotice: "Visão administrativa para definição de políticas, limites orçamentários e auditoria de conformidade.",
    },
  ];

  return (
    <div className="w-full bg-[#0a0f1d]/95 border border-neutral-800 rounded-sm overflow-hidden text-neutral-200 font-sans shadow-2xl">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0d1326]">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs rounded-sm shadow-md shadow-blue-500/20">
            SH
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold tracking-tight text-white">
                SUPPLYHUB Cockpit
              </span>
              <span className="text-[10px] font-mono uppercase bg-blue-500/10 border border-blue-500/30 text-blue-400 px-2 py-0.5 rounded-sm">
                B2B E-Procurement SaaS
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono">
              Solicitação #RFQ-4092: Servidores Rack 2U & Switches Enterprise (50 un)
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1.5 mt-3 sm:mt-0 font-mono text-xs">
          <button
            onClick={() => setActiveTab("comparison")}
            className={`px-3 py-1.5 transition-all rounded-sm ${
              activeTab === "comparison"
                ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30"
                : "text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800"
            }`}
          >
            01. Comparador & RFQ
          </button>
          <button
            onClick={() => setActiveTab("negotiation")}
            className={`px-3 py-1.5 transition-all rounded-sm ${
              activeTab === "negotiation"
                ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30"
                : "text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800"
            }`}
          >
            02. Negociação
          </button>
          <button
            onClick={() => setActiveTab("rbac")}
            className={`px-3 py-1.5 transition-all rounded-sm ${
              activeTab === "rbac"
                ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30"
                : "text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800"
            }`}
          >
            03. Permissões (RBAC)
          </button>
          <button
            onClick={() => setActiveTab("orderLifecycle")}
            className={`px-3 py-1.5 transition-all rounded-sm ${
              activeTab === "orderLifecycle"
                ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30"
                : "text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800"
            }`}
          >
            04. Ciclo da PO & SLA
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {/* ================= TAB 1: COMPARADOR & RFQ ================= */}
        {activeTab === "comparison" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
              <div>
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-semibold">
                  Regra Corporativa // 3 COTAÇÕES OBRIGATÓRIAS
                </span>
                <h3 className="text-lg font-medium text-white tracking-tight">
                  Matriz Comparativa de Fornecedores Homologados
                </h3>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-sm font-semibold">
                  Orçamento Alocado: R$ 250.000
                </span>
                <span className="px-2.5 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 font-medium rounded-sm">
                  Threshold: Alçada Gerencial
                </span>
              </div>
            </div>

            {/* Comparison Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suppliers.map((sup) => (
                <div
                  key={sup.id}
                  onClick={() => setSelectedSupplier(sup.id)}
                  className={`p-5 border transition-all cursor-pointer rounded-sm space-y-4 ${
                    selectedSupplier === sup.id
                      ? "border-blue-500 bg-blue-950/25 ring-1 ring-blue-500/50 shadow-lg shadow-blue-950/50"
                      : "border-neutral-800 bg-[#0d1326]/60 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 block">
                        FORNECEDOR
                      </span>
                      <h4 className="text-sm font-semibold text-white">
                        {sup.name}
                      </h4>
                    </div>
                    {sup.isBestOverall && (
                      <span className="text-[9px] font-mono uppercase bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold px-2 py-0.5 rounded-sm shadow-sm shadow-emerald-500/20">
                        Melhor TCO
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs font-mono border-y border-neutral-800/80 py-3">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Preço Unitário:</span>
                      <span className="text-emerald-400 font-bold">{sup.unitPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Faixa de Desconto:</span>
                      <span className="text-emerald-300 font-semibold">{sup.volumeDiscount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Prazo de Entrega:</span>
                      <span className="text-cyan-300">{sup.slaDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Modalidade Frete:</span>
                      <span className="text-neutral-200">{sup.freight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Condição Faturamento:</span>
                      <span className="text-neutral-200">{sup.paymentConditions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Certificações:</span>
                      <span className="text-neutral-300">{sup.isoCert}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm font-semibold ${
                        sup.complianceStatus === "HOMOLOGADO"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {sup.complianceStatus}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSupplier(sup.id);
                        setActiveTab("negotiation");
                      }}
                      className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center space-x-1 font-semibold"
                    >
                      <span>Negociar</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Supplier Summary Bar */}
            <div className="p-4 border border-blue-500/30 bg-blue-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-sm">
              <div className="space-y-1">
                <span className="text-xs font-mono text-blue-300">
                  Fornecedor Selecionado para Encaminhamento:
                </span>
                <p className="text-sm font-medium text-white">
                  {suppliers.find((s) => s.id === selectedSupplier)?.name} — Total estimado para 50 un:{" "}
                  <strong className="text-emerald-400">R$ 187.000 (com desconto de volume)</strong>
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveTab("negotiation")}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-mono rounded-sm transition-colors"
                >
                  Abrir Rodada de Negociação
                </button>
                <button
                  onClick={() => setActiveTab("rbac")}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-mono font-medium rounded-sm shadow-md shadow-blue-600/30 transition-colors"
                >
                  Enviar para Aprovação
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: NEGOCIAÇÃO ================= */}
        {activeTab === "negotiation" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-semibold">
                  Módulo de Contrapropostas // BIDDING ENGINE
                </span>
                <h3 className="text-lg font-medium text-white tracking-tight">
                  Painel de Negociação de Termos Comerciais
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 rounded-sm font-semibold">
                Status: Aguardando Retorno do Fornecedor
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Negotiation Thread / History */}
              <div className="lg:col-span-2 space-y-4">
                <div className="p-4 border border-neutral-800 bg-[#0d1326]/60 rounded-sm space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-neutral-800 pb-2">
                    <span className="text-white font-medium">Histórico de Rodadas (Audit Trail)</span>
                    <span className="text-neutral-500">2 rodadas registradas</span>
                  </div>

                  {/* Message 1: Fornecedor Proposta Inicial */}
                  <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-sm space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-[11px] text-neutral-400">
                      <span className="text-neutral-300 font-semibold">TechCorp Hardware B2B (Proposta Original)</span>
                      <span>Ontem às 14:20</span>
                    </div>
                    <p className="text-neutral-300">
                      &quot;Prezado comprador, enviamos a cotação padrão de R$ 4.250/unidade para o lote de 50 servidores, com faturamento em 30 dias líquidos e frete CIF incluso.&quot;
                    </p>
                    <div className="text-[11px] text-neutral-400 pt-1 font-mono">
                      Termos: Preço Unit: <span className="text-neutral-200">R$ 4.250</span> | Prazo: <span className="text-neutral-200">30 dias</span> | Frete: <span className="text-emerald-400">CIF</span>
                    </div>
                  </div>

                  {/* Message 2: Comprador Contraproposta */}
                  <div className="p-3 bg-blue-950/30 border border-blue-500/30 rounded-sm space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-[11px] text-blue-300">
                      <span className="font-semibold text-blue-300">Marcus Ritta (Comprador Corporativo)</span>
                      <span>Hoje às 09:15</span>
                    </div>
                    <p className="text-neutral-200">
                      &quot;Agradecemos o envio. Considerando nosso histórico anual de compras e volume garantido, solicitamos adequação para faturamento 30/60 dias e aplicação de desconto escalonado de 10% para fechamento imediato este mês.&quot;
                    </p>
                    <div className="text-[11px] text-blue-200 pt-1">
                      Contraproposta: Preço Unit: <span className="text-emerald-400 font-semibold">R$ 3.825 (-10%)</span> | Prazo: <span className="text-cyan-300">60 dias</span> | Frete: <span className="text-emerald-400">CIF</span>
                    </div>
                  </div>

                  {counterOfferSent && (
                    <div className="p-3.5 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/50 rounded-sm space-y-1 text-xs font-mono">
                      <div className="flex justify-between font-bold text-emerald-400">
                        <span className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Nova Contraproposta Registrada com Sucesso!</span>
                        </span>
                        <span>Agora</span>
                      </div>
                      <p className="text-emerald-200">
                        Termos submetidos: Desconto solicitado de <strong className="text-white">{discountValue}%</strong> | Prazo de Faturamento: <strong className="text-white">{paymentTerms}</strong>. Notificação enviada para a gerência de contas do fornecedor.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Counter-Offer Controls Simulator */}
              <div className="p-5 border border-neutral-800 bg-[#0d1326]/70 rounded-sm space-y-5">
                <span className="text-xs font-mono uppercase text-blue-400 block tracking-wider border-b border-neutral-800 pb-2 font-semibold">
                  Simular Contraproposta
                </span>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-400">Desconto Solicitado:</span>
                    <span className="text-emerald-400 font-bold">{discountValue}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="1"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full accent-blue-500 bg-neutral-800 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                    <span>5% (Mínimo)</span>
                    <span>20% (Agressivo)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-neutral-400 block">
                    Condição de Faturamento:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {["30 dias", "60 dias", "30/60/90d", "120 dias"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setPaymentTerms(term)}
                        className={`p-2 border text-center rounded-sm transition-all ${
                          paymentTerms === term
                            ? "bg-blue-600 text-white font-medium border-blue-500 shadow-sm shadow-blue-600/30"
                            : "bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white"
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-800 space-y-3">
                  <div className="text-xs font-mono space-y-1">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Economia Esperada:</span>
                      <span className="text-emerald-400 font-bold">
                        R$ {(4250 * 50 * (discountValue / 100)).toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Novo Valor Total:</span>
                      <span className="text-white font-bold">
                        R$ {(4250 * 50 * (1 - discountValue / 100)).toLocaleString("pt-BR")}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCounterOfferSent(true)}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-mono font-medium rounded-sm transition-all flex items-center justify-center space-x-2 shadow-md shadow-blue-600/30"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Contraproposta Formal</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: PERMISSÕES & RBAC ================= */}
        {activeTab === "rbac" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
              <div>
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-semibold">
                  Matriz de Acessos & Governança // RBAC SIMULATOR
                </span>
                <h3 className="text-lg font-medium text-white tracking-tight">
                  Simulação de Papéis e Alçadas de Decisão
                </h3>
              </div>
              <div className="text-xs font-mono text-neutral-400">
                Selecione um papel para visualizar a interface contextual
              </div>
            </div>

            {/* Role Switcher Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {roles.map((role) => {
                const isSelected = selectedRole === role.id;
                let activeStyle = "";
                if (role.id === "buyer") {
                  activeStyle = isSelected ? "border-blue-500 bg-blue-950/40 text-blue-300 shadow-md shadow-blue-950/50" : "";
                } else if (role.id === "approver") {
                  activeStyle = isSelected ? "border-purple-500 bg-purple-950/40 text-purple-300 shadow-md shadow-purple-950/50" : "";
                } else if (role.id === "finance") {
                  activeStyle = isSelected ? "border-emerald-500 bg-emerald-950/40 text-emerald-300 shadow-md shadow-emerald-950/50" : "";
                } else {
                  activeStyle = isSelected ? "border-amber-500 bg-amber-950/40 text-amber-300 shadow-md shadow-amber-950/50" : "";
                }

                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id as any)}
                    className={`p-3 text-left border rounded-sm transition-all font-mono ${
                      isSelected
                        ? activeStyle
                        : "border-neutral-800 bg-[#0d1326]/60 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <div className="text-[10px] text-neutral-500 uppercase">{role.badge}</div>
                    <div className="text-xs font-semibold mt-1">{role.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Role Detail Card */}
            {(() => {
              const currentRole = roles.find((r) => r.id === selectedRole)!;
              const roleBadgeColor =
                selectedRole === "buyer"
                  ? "bg-blue-500/15 border-blue-500/30 text-blue-300"
                  : selectedRole === "approver"
                  ? "bg-purple-500/15 border-purple-500/30 text-purple-300"
                  : selectedRole === "finance"
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                  : "bg-amber-500/15 border-amber-500/30 text-amber-300";

              return (
                <div className="p-6 border border-neutral-800 bg-[#0d1326]/70 rounded-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-base font-semibold text-white">
                          Visão do Perfil: {currentRole.title}
                        </h4>
                        <span className={`text-[10px] font-mono border px-2 py-0.5 rounded-sm font-semibold ${roleBadgeColor}`}>
                          {currentRole.badge}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 font-mono mt-1">
                        Escopo: {currentRole.scope} | Limite de Autonomia:{" "}
                        <strong className="text-emerald-400">{currentRole.autonomyLimit}</strong>
                      </p>
                    </div>

                    <div className="text-xs font-mono px-3 py-1.5 bg-neutral-950 border border-neutral-800 text-neutral-300 rounded-sm">
                      {currentRole.currentViewNotice}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Allowed Actions */}
                    <div className="p-4 border border-emerald-500/30 bg-emerald-950/15 rounded-sm space-y-3">
                      <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 border-b border-emerald-500/20 pb-2 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Ações Permitidas / Autonomia</span>
                      </div>
                      <ul className="space-y-2 text-xs font-mono text-neutral-200">
                        {currentRole.allowedActions.map((action, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-emerald-400">✓</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Restricted Actions & Governance Gates */}
                    <div className="p-4 border border-rose-500/30 bg-rose-950/15 rounded-sm space-y-3">
                      <div className="flex items-center space-x-2 text-xs font-mono text-rose-400 border-b border-rose-500/20 pb-2 font-semibold">
                        <Lock className="w-3.5 h-3.5 text-rose-400" />
                        <span>Bloqueios & Alçadas Superiores</span>
                      </div>
                      <ul className="space-y-2 text-xs font-mono text-neutral-300">
                        {currentRole.restrictedActions.map((rest, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-rose-400">✕</span>
                            <span>{rest}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Contextual Action Bar for Selected Role */}
                  <div className="p-4 border border-neutral-800 bg-neutral-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-sm">
                    <div className="text-xs font-mono text-neutral-300">
                      {selectedRole === "buyer" && "Ação do Comprador: Submeter carrinho estruturado para alçada de aprovação."}
                      {selectedRole === "approver" && "Ação do Aprovador: Pedido de R$ 187.000 exige parecer formal e validação de centro de custo."}
                      {selectedRole === "finance" && "Ação do Financeiro: Conciliação de fluxo de caixa em D+60 e auditoria fiscal de notas."}
                      {selectedRole === "admin" && "Ação do Administrador: Ajuste de limites orçamentários e auditoria contábil do processo."}
                    </div>

                    <div className="flex items-center space-x-2">
                      {selectedRole === "approver" ? (
                        <>
                          <button className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono rounded-sm font-semibold transition-colors">
                            Pedir Renegociação
                          </button>
                          <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-medium rounded-sm shadow-md shadow-emerald-600/30 transition-colors">
                            Aprovar Pedido (Alçada OK)
                          </button>
                        </>
                      ) : selectedRole === "finance" ? (
                        <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-medium rounded-sm shadow-md shadow-emerald-600/30 transition-colors">
                          Validar Crédito & Liberar PO
                        </button>
                      ) : (
                        <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-medium rounded-sm shadow-md shadow-blue-600/30 transition-colors">
                          Prosseguir Fluxo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ================= TAB 4: CICLO DA PO & SLA ================= */}
        {activeTab === "orderLifecycle" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-semibold">
                  Rastreamento Ponta a Ponta // PO #PO-8921
                </span>
                <h3 className="text-lg font-medium text-white tracking-tight">
                  Ciclo de Vida da Compra & Rastreabilidade de Entrega
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-semibold rounded-sm">
                Status: EM TRÂNSITO (SLA: 2 dias restantes)
              </span>
            </div>

            {/* Stepper of 7 Stages */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
              {[
                { step: "01. Pesquisa", state: "done", date: "15/Out" },
                { step: "02. Comparação", state: "done", date: "16/Out" },
                { step: "03. Cotação (RFQ)", state: "done", date: "17/Out" },
                { step: "04. Negociação", state: "done", date: "18/Out" },
                { step: "05. Aprovação", state: "done", date: "19/Out" },
                { step: "06. Emissão PO", state: "done", date: "20/Out" },
                { step: "07. Entrega / Aceite", state: "current", date: "Previsão: 23/Out" },
              ].map((st, i) => (
                <div
                  key={i}
                  className={`p-3 border rounded-sm text-center font-mono space-y-1 ${
                    st.state === "done"
                      ? "border-emerald-500/40 bg-emerald-950/25 text-emerald-300"
                      : "border-cyan-500 bg-cyan-950/40 text-cyan-300 ring-2 ring-cyan-500/40 shadow-md shadow-cyan-500/20"
                  }`}
                >
                  <div className="text-[10px] uppercase opacity-80">{st.date}</div>
                  <div className="text-xs font-semibold">{st.step}</div>
                  <div className="text-[9px] uppercase tracking-wider font-bold">
                    {st.state === "done" ? "✓ CONCLUÍDO" : "● EM ANDAMENTO"}
                  </div>
                </div>
              ))}
            </div>

            {/* PO & Logistics Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-blue-500/30 bg-[#0d1326]/70 rounded-sm space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="text-blue-300 font-semibold">Dados da Purchase Order (PO-8921)</span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-sm text-[10px]">
                    Imutável & Autenticado
                  </span>
                </div>
                <div className="space-y-1.5 text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Fornecedor:</span>
                    <span className="text-white">TechCorp Hardware B2B (CNPJ 18.234.901/0001-92)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Centro de Custo:</span>
                    <span className="text-neutral-200">CC-401 (Infraestrutura & Data Center)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Itens:</span>
                    <span className="text-neutral-200">50x Servidor Rack 2U Enterprise Xeon</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Valor Final Negociado:</span>
                    <span className="text-emerald-400 font-bold">R$ 187.000,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Condição Faturamento:</span>
                    <span className="text-cyan-300">Boleto 30/60 dias líquidos</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-cyan-500/30 bg-[#0d1326]/70 rounded-sm space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="text-cyan-300 font-semibold">Rastreamento Logístico & Recebimento</span>
                  <span className="text-cyan-400">Transportadora PrimeLog</span>
                </div>
                <div className="space-y-1.5 text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">NF-e Emitida:</span>
                    <span className="text-white">Danfe #004.912 (Chave validada na SEFAZ)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Rastreio:</span>
                    <span className="text-cyan-300">TRK-9812491BR (Despachado de Barueri/SP)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Previsão Entrega:</span>
                    <span className="text-emerald-400 font-bold">23/Outubro até 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Protocolo de Aceite:</span>
                    <span className="text-neutral-300">Exige conferência física de lacre e MAC addresses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info Strip */}
      <div className="px-6 py-3 border-t border-neutral-800 bg-[#0d1326] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-400">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-blue-300 font-medium">Cockpit de Compras B2B // Multi-Role RBAC & TCO Optimizer</span>
        </div>
        <div>
          <span className="text-neutral-400">SupplyHub Design System • Deep Navy, Emerald & Cyan Highlights</span>
        </div>
      </div>
    </div>
  );
}

