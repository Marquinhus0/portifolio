"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  CheckCircle2,
  AlertTriangle,
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
  Sparkles,
  Eye,
  Sliders,
  Check,
  ChevronDown,
  Plus,
  ShoppingCart,
  Package,
  Settings,
  BarChart3,
  ExternalLink,
  ThumbsUp,
  Info,
  Maximize2,
  Minimize2,
  LayoutGrid,
  Columns,
  Table,
  ArrowRight,
  ArrowLeft,
  X,
  Menu,
  Car,
  Tag,
  Hash,
  MapPin,
  Calendar,
  Bell,
  Trash2,
  Printer,
  FileCheck,
  Percent,
  Download,
  MoreVertical,
  HelpCircle,
  Database,
  ArrowUpRight,
  Wrench,
  Boxes,
  Copy,
  History,
  QrCode,
  CreditCard,
  Banknote,
  Receipt,
  FileSpreadsheet,
  AlertCircle,
  ArrowUpDown,
  CheckSquare,
  Square,
  SlidersVertical,
  Inbox,
  ClipboardList,
  AlertOctagon,
  ArrowDownRight,
  BadgeAlert,
} from "lucide-react";

import { ALFA_TOKENS, AlfaNavSection } from "./alfa-erp/AlfaDesignSystemTokens";
import {
  AlfaButton,
  AlfaInput,
  AlfaSelect,
  AlfaBadge,
  AlfaToastContainer,
  AlfaModal,
  AlfaDrawer,
  AlfaTableSkeleton,
  AlfaEmptyState,
  AlfaErrorState,
  ProcessTimeline,
  ProcessTimelineStep,
  ToastMessage,
} from "./alfa-erp/AlfaUiComponents";
import {
  AutoPartItem,
  PersonRecord,
  StockAlert,
  KardexMovement,
  PurchaseSuggestionItem,
  QuotationData,
  PurchaseOrderRecord,
  ReceivingItemCheck,
  AttentionItem,
  RecentActivityItem,
  INITIAL_ITEMS,
  INITIAL_PERSONS,
  INITIAL_ALERTS,
  PURCHASE_SUGGESTIONS,
  QUOTATION_00091,
  INITIAL_PURCHASE_ORDER_00183,
  INITIAL_RECEIVING_CHECKS,
  ATTENTION_CARDS,
  RECENT_ACTIVITIES,
  MOCK_KARDEX,
  MOCK_REPORTS_DATA,
} from "./alfa-erp/AlfaMockData";

export default function AlfaErpWorkspace() {
  // =========================================================================
  // 1. SHELL & NAVIGATION STATE
  // =========================================================================
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<AlfaNavSection>("inicio");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeBranch, setActiveBranch] = useState("01 - Matriz Toledo / PR");

  // Global Search
  const [globalSearch, setGlobalSearch] = useState("");
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);

  // Operational Notifications
  const [showNotifications, setShowNotifications] = useState(false);
  const [alerts, setAlerts] = useState<StockAlert[]>(INITIAL_ALERTS);

  // Modals & Drawers
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const [designSystemModalOpen, setDesignSystemModalOpen] = useState(false);
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<AutoPartItem | null>(null);

  // SPRINT 3: Drawer de Detalhe da Sugestão de Compra
  const [selectedSuggestionDetail, setSelectedSuggestionDetail] = useState<PurchaseSuggestionItem | null>(null);

  // Drawers
  const [quickViewItem, setQuickViewItem] = useState<AutoPartItem | null>(null);
  const [kardexItem, setKardexItem] = useState<AutoPartItem | null>(null);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // UI State Simulator (Normal | Skeleton | Empty | Error | NoPermission)
  const [uiState, setUiState] = useState<"normal" | "skeleton" | "empty" | "error" | "no_permission">("normal");

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "warning" | "error" | "info", message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // =========================================================================
  // 2. DATA STORES (OPERATIONAL & MUTABLE IN-MEMORY FOR SPRINT 3)
  // =========================================================================
  const [itemsDatabase, setItemsDatabase] = useState<AutoPartItem[]>(INITIAL_ITEMS);
  const [personsDatabase, setPersonsDatabase] = useState<PersonRecord[]>(INITIAL_PERSONS);
  const [kardexMovements, setKardexMovements] = useState<KardexMovement[]>(MOCK_KARDEX);

  // SPRINT 3: GESTÃO DE COMPRAS FLOW STATE
  // 1. Sugestões de Compra
  const [suggestions, setSuggestions] = useState<PurchaseSuggestionItem[]>(PURCHASE_SUGGESTIONS);
  const [selectedSuggestionIds, setSelectedSuggestionIds] = useState<number[]>([45872, 3601, 6033, 2620]);
  const [suggestionQuantities, setSuggestionQuantities] = useState<Record<number, number>>({
    45872: 15,
    3601: 20,
    6033: 40,
    2620: 30,
    786: 25,
  });

  // 2. Cotação #00091
  const [quotation, setQuotation] = useState<QuotationData>(QUOTATION_00091);
  const [chosenSupplierKey, setChosenSupplierKey] = useState<string>("fornecedor_b"); // Padrão: DPK
  const [createPoModalOpen, setCreatePoModalOpen] = useState(false);

  // 3. Ordem de Compra #00183
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrderRecord>(INITIAL_PURCHASE_ORDER_00183);
  const [isPoCreated, setIsPoCreated] = useState(true);

  // 4. Recebimento & Conferência
  const [receivingChecks, setReceivingChecks] = useState<ReceivingItemCheck[]>(INITIAL_RECEIVING_CHECKS);
  const [isConfirmingEntry, setIsConfirmingEntry] = useState(false);
  const [entryConfirmed, setEntryConfirmed] = useState(false);

  // Selected Items for Bulk Operations in Listagem de Itens
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  // Item List Filters & Table Options
  const [searchTableQuery, setSearchTableQuery] = useState("");
  const [filterTipo, setFilterTipo] = useState("TODOS");
  const [filterMarca, setFilterMarca] = useState("TODAS");
  const [filterEstoque, setFilterEstoque] = useState("TODOS");
  const [filterCurva, setFilterCurva] = useState("TODAS");
  const [sortField, setSortField] = useState<"codigo" | "item" | "estoque" | "venda">("codigo");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Current Item Being Edited in "item_cadastro"
  const [editingItem, setEditingItem] = useState<AutoPartItem>(INITIAL_ITEMS[0]);
  const [activeItemTab, setActiveItemTab] = useState<
    "geral" | "codigos" | "estoque" | "precos" | "fiscal" | "aplicacoes" | "fornecedores" | "historico"
  >("geral");
  const [isSavingItem, setIsSavingItem] = useState(false);

  // Current Person Being Viewed in "pessoa_cadastro"
  const [viewingPerson, setViewingPerson] = useState<PersonRecord>(INITIAL_PERSONS[1]);
  const [activePersonTab, setActivePersonTab] = useState<
    "resumo" | "cadastrais" | "enderecos" | "contatos" | "financeiro" | "historico"
  >("resumo");

  // Vendas Balcão Rápido (PDV)
  const [selectedClientSale, setSelectedClientSale] = useState<PersonRecord>(INITIAL_PERSONS[1]);
  const [vehiclePlateSearch, setVehiclePlateSearch] = useState("BRA-2E19");
  const [identifiedVehicle, setIdentifiedVehicle] = useState("VW Gol G6 1.6 MSI Flex 2015");
  const [vendasSearchQuery, setVendasSearchQuery] = useState("");
  const [vendasCart, setVendasCart] = useState<
    Array<{ id: number; codigo: string; item: string; qtd: number; precoUnit: number; desconto: number; estoqueDisponivel: number }>
  >([
    { id: 45872, codigo: "45872", item: "Filtro de Óleo Tecfil", qtd: 1, precoUnit: 32.5, desconto: 0, estoqueDisponivel: 4 },
    { id: 6033, codigo: "6033", item: "Jogo de Velas Ignição Green Plug", qtd: 1, precoUnit: 98.0, desconto: 5, estoqueDisponivel: 14 },
  ]);
  const [vendasPaymentMethod, setVendasPaymentMethod] = useState<"PIX" | "DINHEIRO" | "CARTAO" | "BOLETO">("PIX");
  const [saleFinishedModalOpen, setSaleFinishedModalOpen] = useState(false);

  // Relatórios
  const [reportType, setReportType] = useState<"faturamento" | "curva_abc" | "giro_ruptura">("faturamento");
  const [reportPeriod, setReportPeriod] = useState("30dias");

  // =========================================================================
  // 3. KEYBOARD SHORTCUTS UX (Ctrl+K, Ctrl+N, Esc, F2)
  // =========================================================================
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + K or Cmd + K: Open global search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setGlobalSearchOpen((prev) => !prev);
      }
      // Ctrl + N or Cmd + N: New Record / Item
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        handleNewItem();
      }
      // Esc: Close any active modal, drawer, or search palette
      if (e.key === "Escape") {
        setGlobalSearchOpen(false);
        setQuickViewItem(null);
        setKardexItem(null);
        setSelectedSuggestionDetail(null);
        setFilterDrawerOpen(false);
        setShortcutsModalOpen(false);
        setDesignSystemModalOpen(false);
        setDeleteConfirmModalOpen(false);
        setCreatePoModalOpen(false);
        setShowNotifications(false);
      }
      // F2: Quick Save / Action
      if (e.key === "F2") {
        e.preventDefault();
        if (activeSection === "item_cadastro") {
          handleSaveItem();
        } else if (activeSection === "vendas") {
          handleFinishSale();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, editingItem, vendasCart]);

  // =========================================================================
  // 4. SPRINT 3: GESTÃO DE COMPRAS TIMELINE STEPS COMPUTATION
  // =========================================================================
  const procurementTimelineSteps: ProcessTimelineStep[] = useMemo(() => {
    const isSugestaoDone = activeSection !== "sugestao";
    const isCotacaoDone = activeSection === "ordem_detalhe" || activeSection === "recebimento" || entryConfirmed;
    const isOrdemDone = activeSection === "recebimento" || entryConfirmed;
    const isRecebimentoDone = entryConfirmed;

    return [
      {
        id: "sugestao",
        label: "Sugestão",
        status: isSugestaoDone ? "completed" : "current",
      },
      {
        id: "cotacao",
        label: "Cotação #00091",
        status: activeSection === "cotacao" ? "current" : isCotacaoDone ? "completed" : "pending",
      },
      {
        id: "ordem",
        label: "Ordem #00183",
        status: activeSection === "ordem_detalhe" ? "current" : isOrdemDone ? "completed" : "pending",
      },
      {
        id: "recebimento",
        label: "Recebimento",
        status: activeSection === "recebimento" ? "current" : isRecebimentoDone ? "completed" : "pending",
      },
      {
        id: "entrada",
        label: "Entrada #00072",
        status: entryConfirmed ? "completed" : activeSection === "recebimento" ? "current" : "pending",
      },
      {
        id: "estoque",
        label: "Estoque Atualizado",
        status: entryConfirmed ? "completed" : "pending",
      },
    ];
  }, [activeSection, entryConfirmed]);

  const handleTimelineStepClick = (stepId: ProcessTimelineStep["id"]) => {
    if (stepId === "sugestao") setActiveSection("sugestao");
    else if (stepId === "cotacao") setActiveSection("cotacao");
    else if (stepId === "ordem") setActiveSection("ordem_detalhe");
    else if (stepId === "recebimento") setActiveSection("recebimento");
    else if (stepId === "entrada" || stepId === "estoque") setActiveSection("estoque");
  };

  // =========================================================================
  // 5. COMPUTED DATA & FILTER LOGIC
  // =========================================================================
  const filteredItems = useMemo(() => {
    let result = itemsDatabase.filter((item) => {
      const q = searchTableQuery.toLowerCase();
      const matchesSearch =
        q === "" ||
        item.codigo.toLowerCase().includes(q) ||
        item.item.toLowerCase().includes(q) ||
        item.marca.toLowerCase().includes(q) ||
        item.oem.toLowerCase().includes(q) ||
        item.aplicacao.toLowerCase().includes(q);

      const matchesTipo = filterTipo === "TODOS" || item.tipo === filterTipo;
      const matchesMarca = filterMarca === "TODAS" || item.marca === filterMarca;
      const matchesCurva = filterCurva === "TODAS" || item.curvaAbc === filterCurva;
      const matchesEstoque =
        filterEstoque === "TODOS" ||
        (filterEstoque === "DISPONIVEL" && item.status === "disponivel") ||
        (filterEstoque === "BAIXO" && item.status === "baixo") ||
        (filterEstoque === "NEGATIVO" && item.status === "negativo");

      return matchesSearch && matchesTipo && matchesMarca && matchesCurva && matchesEstoque;
    });

    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === "string") {
        return sortDirection === "asc"
          ? (valA as string).localeCompare(valB as string)
          : (valB as string).localeCompare(valA as string);
      }
      return sortDirection === "asc" ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });

    return result;
  }, [itemsDatabase, searchTableQuery, filterTipo, filterMarca, filterCurva, filterEstoque, sortField, sortDirection]);

  // Global Search Aggregator (Produtos, Pessoas, Pedidos, Cotações, Sugestões)
  const searchResults = useMemo(() => {
    if (!globalSearch.trim()) return null;
    const q = globalSearch.toLowerCase();

    const matchingItems = itemsDatabase.filter(
      (it) =>
        it.codigo.toLowerCase().includes(q) ||
        it.item.toLowerCase().includes(q) ||
        it.marca.toLowerCase().includes(q) ||
        it.oem.toLowerCase().includes(q)
    );

    const matchingPersons = personsDatabase.filter(
      (p) =>
        p.nome.toLowerCase().includes(q) ||
        p.documento.includes(q) ||
        p.cidade.toLowerCase().includes(q)
    );

    const matchingSuggestions = suggestions.filter(
      (sug) =>
        sug.codigo.toLowerCase().includes(q) ||
        sug.produto.toLowerCase().includes(q) ||
        sug.marca.toLowerCase().includes(q) ||
        "sugestao".includes(q)
    );

    const matchingOrders = [
      { id: "OC #00183", fornecedor: purchaseOrder.fornecedor, valor: `R$ ${purchaseOrder.total.toFixed(2)}`, tipo: "Ordem de Compra" },
      { id: "COT #00091", fornecedor: "AutoMax / DPK / Pellegrino", valor: "R$ 8.452,00", tipo: "Cotação Multilateral" },
      { id: "ENT #00072", fornecedor: "Distribuidora DPK", valor: "R$ 8.217,00", tipo: "Entrada de Estoque" },
    ].filter(
      (doc) =>
        doc.id.toLowerCase().includes(q) ||
        doc.fornecedor.toLowerCase().includes(q) ||
        doc.tipo.toLowerCase().includes(q)
    );

    return {
      items: matchingItems,
      persons: matchingPersons,
      suggestions: matchingSuggestions,
      orders: matchingOrders,
    };
  }, [globalSearch, itemsDatabase, personsDatabase, suggestions, purchaseOrder]);

  // =========================================================================
  // 6. ACTION HANDLERS (SPRINT 3 INTERACTIVE FLOW)
  // =========================================================================
  const handleSort = (field: "codigo" | "item" | "estoque" | "venda") => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectAllSuggestions = (checked: boolean) => {
    if (checked) {
      setSelectedSuggestionIds(suggestions.map((s) => s.id));
    } else {
      setSelectedSuggestionIds([]);
    }
  };

  const handleToggleSelectSuggestion = (id: number) => {
    setSelectedSuggestionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleIgnoreSuggestion = (id: number) => {
    const item = suggestions.find((s) => s.id === id);
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
    addToast("info", `Sugestão para ${item ? item.produto : "o item"} ignorada.`);
  };

  // Flow Step 1 -> Step 2: Gerar Cotação
  const handleGenerateQuotation = () => {
    if (selectedSuggestionIds.length === 0) {
      addToast("warning", "Selecione ao menos um produto para gerar a cotação.");
      return;
    }
    setActiveSection("cotacao");
    addToast("success", `✓ Cotação #00091 gerada com ${selectedSuggestionIds.length} produtos!`);
  };

  // Flow Step 2 -> Step 3: Gerar Ordem de Compra
  const handleOpenCreatePoModal = () => {
    const selectedSupplier = quotation.fornecedores.find((f) => f.key === chosenSupplierKey) || quotation.fornecedores[1];
    setCreatePoModalOpen(true);
  };

  const handleConfirmCreatePo = () => {
    const supplier = quotation.fornecedores.find((f) => f.key === chosenSupplierKey) || quotation.fornecedores[1];
    setPurchaseOrder({
      ...purchaseOrder,
      id: "00183",
      status: "Aguardando recebimento",
      fornecedor: supplier.nome,
      fornecedorCidade: `${supplier.cidade} • CNPJ Homologado`,
      total: supplier.precoTotal,
      frete: supplier.frete,
    });
    setCreatePoModalOpen(false);
    setActiveSection("ordem_detalhe");
    addToast("success", "✓ Ordem de compra criada com sucesso. Gerado número: OC #00183");
  };

  // Flow Step 4 -> Step 5: Recebimento e Conferência
  const handleUpdateReceivingQty = (id: number, newQty: number) => {
    setReceivingChecks((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          const diferenca = newQty - it.esperado;
          return {
            ...it,
            recebido: newQty,
            diferenca,
            status: diferenca === 0 ? "Conferido" : "Divergência",
          };
        }
        return it;
      })
    );
  };

  // Flow Step 5 -> Step 6: Confirmar Entrada de Estoque
  const handleConfirmStockEntry = () => {
    setIsConfirmingEntry(true);

    setTimeout(() => {
      setIsConfirmingEntry(false);
      setEntryConfirmed(true);

      // SPRINT 3 ITEM 11: Atualizar estoque visualmente com indicador +X unidades!
      setItemsDatabase((prev) =>
        prev.map((item) => {
          if (item.codigo === "45872") {
            // Filtro de óleo: antes 4, agora 19 (+15 un)
            return {
              ...item,
              estoque: 19,
              status: "disponivel",
              recemRecebidoBadge: "+15 unidades (Entrada #00072)",
            };
          }
          if (item.codigo === "3601") {
            // Pastilha: antes 2, recebeu 18 -> agora 20 (+18 un)
            return {
              ...item,
              estoque: 20,
              status: "disponivel",
              recemRecebidoBadge: "+18 unidades (Entrada #00072)",
            };
          }
          if (item.codigo === "6033") {
            return {
              ...item,
              estoque: item.estoque + 40,
              status: "disponivel",
              recemRecebidoBadge: "+40 unidades (Entrada #00072)",
            };
          }
          if (item.codigo === "2620") {
            return {
              ...item,
              estoque: item.estoque + 30,
              status: "disponivel",
              recemRecebidoBadge: "+30 unidades (Entrada #00072)",
            };
          }
          return item;
        })
      );

      // Adicionar novo movimento no Kardex
      const newKardexEntry: KardexMovement = {
        id: Date.now(),
        data: "25/09/2026 10:15",
        tipo: "ENTRADA",
        documento: "Entrada #00072 (OC #00183)",
        origemDestino: `Recebimento DPK • Conferido com 1 divergência`,
        quantidade: 103,
        saldoApos: 122,
        custoUnitario: 17.8,
        operador: "Marcus Ritta",
      };
      setKardexMovements((prev) => [newKardexEntry, ...prev]);

      addToast("success", "✓ Entrada #00072 registrada com sucesso.");
      setActiveSection("estoque");
    }, 600);
  };

  const handleNewItem = () => {
    const nextCode = (Math.floor(Math.random() * 8000) + 1000).toString();
    const newItem: AutoPartItem = {
      id: Date.now(),
      codigo: nextCode,
      item: "Novo Item de Autopeça",
      tipo: "FILTRO",
      marca: "Tecfil",
      fabricante: "Tecfil Indústria",
      oem: "",
      ncm: "8421.3100",
      cest: "01.001.00",
      gtin: "7890000000000",
      codigoFabricante: "",
      estoque: 0,
      estoqueMin: 10,
      estoqueMax: 50,
      pontoPedido: 15,
      reservado: 0,
      venda: 0,
      vendaAtacado: 0,
      custo: 0,
      custoMedio: 0,
      localizacao: "Rua 01 • Prat. A1",
      status: "baixo",
      aplicacao: "",
      curvaAbc: "B",
      mediaVendaMensal: 0,
      unidade: "UN",
      equivalencias: [],
      filiais: [{ filial: "01 - Matriz Toledo", saldo: 0, reservado: 0 }],
    };
    setEditingItem(newItem);
    setActiveItemTab("geral");
    setActiveSection("item_cadastro");
    addToast("info", "Novo formulário de item aberto.");
  };

  const handleSaveItem = () => {
    setIsSavingItem(true);
    setTimeout(() => {
      setIsSavingItem(false);
      setItemsDatabase((prev) => {
        const index = prev.findIndex((i) => i.id === editingItem.id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = editingItem;
          return updated;
        }
        return [editingItem, ...prev];
      });
      addToast("success", `✓ Item ${editingItem.codigo} salvo com sucesso no ALFA ERP!`);
    }, 400);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setItemsDatabase((prev) => prev.filter((i) => i.id !== itemToDelete.id));
      addToast("success", `Item ${itemToDelete.codigo} excluído do catálogo.`);
      setItemToDelete(null);
      setDeleteConfirmModalOpen(false);
    }
  };

  const handleFinishSale = () => {
    if (vendasCart.length === 0) {
      addToast("warning", "O carrinho está vazio. Adicione itens para concluir.");
      return;
    }
    setSaleFinishedModalOpen(true);
    addToast("success", "✓ Venda concluída e cupom fiscal NFC-e autorizado!");
  };

  // Subtotals for Vendas Balcão
  const vendasSubtotal = vendasCart.reduce((acc, it) => acc + it.qtd * it.precoUnit, 0);
  const vendasDescontoTotal = vendasCart.reduce((acc, it) => acc + it.qtd * it.precoUnit * (it.desconto / 100), 0);
  const vendasTotal = vendasSubtotal - vendasDescontoTotal;

  // Selected supplier in Quotation
  const activeQuotationSupplier = quotation.fornecedores.find((f) => f.key === chosenSupplierKey) || quotation.fornecedores[1];

  // Has receiving divergence
  const hasDivergence = receivingChecks.some((it) => it.diferenca !== 0);

  return (
    <div
      className={`w-full rounded-xl border border-[#1e2230] bg-[#0d0f16] text-[#e2e8f0] font-sans overflow-hidden shadow-2xl transition-all duration-300 select-none ${
        isFullscreen ? "fixed inset-2 z-50 rounded-xl shadow-2xl max-h-[98vh]" : "relative min-h-[840px]"
      }`}
    >
      {/* ===================================================================== */}
      {/* 1. TOP WINDOW BAR (OS STYLE CLOUD HEADER)                             */}
      {/* ===================================================================== */}
      <div className="bg-[#080b12] text-white px-4 py-2 flex items-center justify-between text-xs font-mono border-b border-[#1e2230]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#13E1BC] animate-pulse" />
          <strong className="text-white font-black tracking-wider font-mono">ALFA ERP</strong>
          <span className="text-[#13E1BC] font-mono text-[10px] bg-[#13E1BC]/10 px-1.5 py-0.5 rounded border border-[#13E1BC]/30">v8.4 CLOUD</span>
          <span className="text-neutral-600 hidden sm:inline">•</span>
          <span className="text-neutral-400 text-[11px] hidden sm:inline">
            Sprint 3 — Protótipo Funcional de Alta Fidelidade (Gestão de Compras)
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* UI State Selector for UX Testing / QA */}
          <div className="hidden md:flex items-center gap-1.5 bg-[#13151e] border border-[#1e2230] px-2 py-0.5 rounded text-[11px]">
            <span className="text-neutral-500">Estado UI:</span>
            <select
              value={uiState}
              onChange={(e) => setUiState(e.target.value as any)}
              className="bg-transparent text-white font-bold text-[11px] outline-none cursor-pointer"
              title="Alternar estado de interface para auditoria de UX"
            >
              <option value="normal" className="bg-[#13151e] text-white">Normal</option>
              <option value="skeleton" className="bg-[#13151e] text-white">Skeleton (Loading)</option>
              <option value="empty" className="bg-[#13151e] text-white">Empty State</option>
              <option value="error" className="bg-[#13151e] text-white">Error State</option>
              <option value="no_permission" className="bg-[#13151e] text-white">Sem Permissão</option>
            </select>
          </div>

          <span className="text-neutral-400 text-[11px] hidden lg:inline">
            Filial: <strong className="text-white">{activeBranch}</strong> • Operador: <strong className="text-white">Marcus Ritta (MH)</strong>
          </span>

          <button
            onClick={() => setShortcutsModalOpen(true)}
            className="p-1 hover:bg-white/10 rounded text-neutral-400 hover:text-white transition-colors"
            title="Atalhos do Teclado (F1 / ?)"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 hover:bg-white/10 rounded text-white transition-colors"
            title={isFullscreen ? "Restaurar" : "Maximizar"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <div className="flex min-h-[760px]">
        {/* =================================================================== */}
        {/* 2. SIDEBAR — DARK MODERN                                            */}
        {/* =================================================================== */}
        <aside
          style={{ width: sidebarCollapsed ? "60px" : "220px" }}
          className="bg-[#090c14] border-r border-[#1a1f2e] flex flex-col justify-between shrink-0 transition-all duration-200"
        >
          <div>
          {/* Brand Logo Header */}
          <div className="h-[56px] border-b border-[#1a1f2e] px-3 flex items-center justify-between">
            <div
              onClick={() => setActiveSection("inicio")}
              className="flex items-center gap-2.5 cursor-pointer overflow-hidden"
            >
              <div className="w-8 h-8 rounded-lg bg-[#13E1BC]/15 border border-[#13E1BC]/40 text-[#13E1BC] font-black text-sm flex items-center justify-center shrink-0">
                A
              </div>
              {!sidebarCollapsed && (
                <div className="min-w-0">
                  <span className="font-black text-sm text-white block tracking-tight leading-none font-mono">
                    ALFA
                  </span>
                  <span className="text-[10px] text-neutral-500 font-semibold block tracking-tight uppercase mt-0.5">
                    Software AutoPeças
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-6 h-6 rounded hover:bg-white/10 text-neutral-500 hover:text-white flex items-center justify-center text-xs transition-colors"
              title={sidebarCollapsed ? "Expandir Menu" : "Recolher Menu"}
            >
              {sidebarCollapsed ? "→" : "←"}
            </button>
          </div>

            {/* Navigation Groups */}
            <nav className="p-2 space-y-4 text-xs overflow-y-auto max-h-[calc(100vh-200px)]">
              {/* Grupo: Principal */}
              <div>
                {!sidebarCollapsed && (
                  <span className="px-2 text-[9px] uppercase font-bold text-neutral-600 tracking-widest block mb-1">
                    Principal
                  </span>
                )}
                <button
                  onClick={() => setActiveSection("inicio")}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                    activeSection === "inicio"
                      ? "bg-[#13E1BC]/15 text-[#13E1BC] font-bold border border-[#13E1BC]/30"
                      : "text-neutral-400 hover:bg-white/5 hover:text-white"
                  }`}
                  title="Visão Geral / Dashboard"
                >
                  <BarChart3 className="w-3.5 h-3.5 shrink-0" />
                  {!sidebarCollapsed && <span>Command Center</span>}
                </button>
              </div>

              {/* Grupo: Cadastros */}
              <div>
                {!sidebarCollapsed && (
                  <span className="px-2 text-[9px] uppercase font-bold text-neutral-600 tracking-widest block mb-1">
                    Cadastros
                  </span>
                )}
                <div className="space-y-0.5">
                  <button
                    onClick={() => setActiveSection("itens")}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors ${
                      activeSection === "itens" || activeSection === "item_cadastro"
                        ? "bg-[#13E1BC]/15 text-[#13E1BC] font-bold border border-[#13E1BC]/30"
                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                    }`}
                    title="Itens de Estoque & Peças"
                  >
                    <div className="flex items-center gap-2.5">
                      <Package className="w-3.5 h-3.5 shrink-0" />
                      {!sidebarCollapsed && <span>Itens</span>}
                    </div>
                    {!sidebarCollapsed && (
                      <span className="text-[10px] px-1.5 rounded bg-white/10 text-neutral-400 font-mono">
                        {itemsDatabase.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveSection("pessoas")}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors ${
                      activeSection === "pessoas" || activeSection === "pessoa_cadastro"
                        ? "bg-[#13E1BC]/15 text-[#13E1BC] font-bold border border-[#13E1BC]/30"
                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                    }`}
                    title="Clientes, Fornecedores & Mecânicas"
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="w-3.5 h-3.5 shrink-0" />
                      {!sidebarCollapsed && <span>Pessoas</span>}
                    </div>
                    {!sidebarCollapsed && (
                      <span className="text-[10px] px-1.5 rounded bg-white/10 text-neutral-400 font-mono">
                        {personsDatabase.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Grupo: Operações & Gestão de Compras */}
              <div>
                {!sidebarCollapsed && (
                  <span className="px-2 text-[9px] uppercase font-bold text-neutral-600 tracking-widest block mb-1">
                    Operações
                  </span>
                )}
                <div className="space-y-0.5">
                  {/* Compras Submenu */}
                  <div className="space-y-0.5">
                    <button
                      onClick={() => setActiveSection("sugestao")}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors ${
                        activeSection === "sugestao" ||
                        activeSection === "cotacao" ||
                        activeSection === "ordem_detalhe" ||
                        activeSection === "recebimento" ||
                        activeSection === "compras"
                          ? "bg-[#13E1BC]/15 text-[#13E1BC] font-bold border border-[#13E1BC]/30"
                          : "text-neutral-400 hover:bg-white/5 hover:text-white"
                      }`}
                      title="Gestão de Compras (Fluxo Principal)"
                    >
                      <div className="flex items-center gap-2.5">
                        <Truck className="w-3.5 h-3.5 shrink-0" />
                        {!sidebarCollapsed && <span>Gestão de Compras</span>}
                      </div>
                      {!sidebarCollapsed && <ChevronDown className="w-3 h-3 text-neutral-500" />}
                    </button>

                    {!sidebarCollapsed && (
                      <div className="pl-6 pr-1 space-y-0.5 border-l border-[#13E1BC]/20 ml-3.5 my-1">
                        <button
                          onClick={() => setActiveSection("sugestao")}
                          className={`w-full text-left py-1.5 px-2 text-[11px] flex justify-between items-center rounded transition-colors ${
                            activeSection === "sugestao" ? "font-bold text-[#13E1BC]" : "text-neutral-500 hover:text-white"
                          }`}
                        >
                          <span>1. Sugestões de Compra</span>
                          <span className="text-[9px] px-1 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/30">Crítico</span>
                        </button>

                        <button
                          onClick={() => setActiveSection("cotacao")}
                          className={`w-full text-left py-1.5 px-2 text-[11px] flex justify-between items-center rounded transition-colors ${
                            activeSection === "cotacao" ? "font-bold text-[#13E1BC]" : "text-neutral-500 hover:text-white"
                          }`}
                        >
                          <span>2. Cotação #00091</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
                        </button>

                        <button
                          onClick={() => setActiveSection("ordem_detalhe")}
                          className={`w-full text-left py-1.5 px-2 text-[11px] flex justify-between items-center rounded transition-colors ${
                            activeSection === "ordem_detalhe" ? "font-bold text-[#13E1BC]" : "text-neutral-500 hover:text-white"
                          }`}
                        >
                          <span>3. Ordem OC #00183</span>
                        </button>

                        <button
                          onClick={() => setActiveSection("recebimento")}
                          className={`w-full text-left py-1.5 px-2 text-[11px] flex justify-between items-center rounded transition-colors ${
                            activeSection === "recebimento" ? "font-bold text-[#13E1BC]" : "text-neutral-500 hover:text-white"
                          }`}
                        >
                          <span>4. Receber Mercadoria</span>
                          <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">Divergência</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Estoque */}
                  <button
                    onClick={() => setActiveSection("estoque")}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors ${
                      activeSection === "estoque"
                        ? "bg-[#13E1BC]/15 text-[#13E1BC] font-bold border border-[#13E1BC]/30"
                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                    }`}
                    title="Controle Físico, Mínimo & Kardex"
                  >
                    <div className="flex items-center gap-2.5">
                      <Boxes className="w-3.5 h-3.5 shrink-0" />
                      {!sidebarCollapsed && <span>Estoque</span>}
                    </div>
                    {!sidebarCollapsed && entryConfirmed && (
                      <span className="text-[9px] px-1.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                        Atualizado!
                      </span>
                    )}
                  </button>

                  {/* Vendas (Balcão Rápido) */}
                  <button
                    onClick={() => setActiveSection("vendas")}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors ${
                      activeSection === "vendas"
                        ? "bg-[#13E1BC]/15 text-[#13E1BC] font-bold border border-[#13E1BC]/30"
                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                    }`}
                    title="Balcão Rápido & PDV Autopeças"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                      {!sidebarCollapsed && <span>Vendas Balcão</span>}
                    </div>
                    {!sidebarCollapsed && (
                      <kbd className="text-[10px] px-1 py-0.5 rounded bg-white/10 text-neutral-500 font-mono">
                        F2
                      </kbd>
                    )}
                  </button>

                  {/* Financeiro */}
                  <button
                    onClick={() => setActiveSection("financeiro")}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                      activeSection === "financeiro"
                        ? "bg-[#13E1BC]/15 text-[#13E1BC] font-bold border border-[#13E1BC]/30"
                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                    }`}
                    title="Contas a Pagar / Receber"
                  >
                    <DollarSign className="w-3.5 h-3.5 shrink-0" />
                    {!sidebarCollapsed && <span>Financeiro</span>}
                  </button>

                  {/* Fiscal */}
                  <button
                    onClick={() => setActiveSection("fiscal")}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                      activeSection === "fiscal"
                        ? "bg-[#13E1BC]/15 text-[#13E1BC] font-bold border border-[#13E1BC]/30"
                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                    }`}
                    title="NF-e, NFC-e & Entrada XML"
                  >
                    <FileCheck className="w-3.5 h-3.5 shrink-0" />
                    {!sidebarCollapsed && <span>Fiscal / XML</span>}
                  </button>
                </div>
              </div>

              {/* Grupo: Análise */}
              <div>
                {!sidebarCollapsed && (
                  <span className="px-2 text-[9px] uppercase font-bold text-neutral-600 tracking-widest block mb-1">
                    Análise & Ajustes
                  </span>
                )}
                <div className="space-y-0.5">
                  <button
                    onClick={() => setActiveSection("relatorios")}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                      activeSection === "relatorios"
                        ? "bg-[#13E1BC]/15 text-[#13E1BC] font-bold border border-[#13E1BC]/30"
                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                    }`}
                    title="Relatórios de Faturamento e Estoque"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" />
                    {!sidebarCollapsed && <span>Relatórios</span>}
                  </button>

                  <button
                    onClick={() => setDesignSystemModalOpen(true)}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-[#13E1BC]/70 hover:text-[#13E1BC] hover:bg-[#13E1BC]/10 transition-colors"
                    title="Inspecionar tokens e componentes do Design System"
                  >
                    <Layers className="w-3.5 h-3.5 shrink-0" />
                    {!sidebarCollapsed && <span className="font-semibold">Design System</span>}
                  </button>
                </div>
              </div>
            </nav>
          </div>

          {/* User Profile in Sidebar Footer */}
          <div className="p-3 border-t border-[#1a1f2e] flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#13E1BC]/20 border border-[#13E1BC]/40 text-[#13E1BC] font-bold text-[10px] flex items-center justify-center shrink-0">
                MR
              </div>
              {!sidebarCollapsed && (
                <div className="min-w-0">
                  <span className="font-bold text-xs text-white block truncate">Marcus Ritta</span>
                  <span className="text-[10px] text-neutral-500 block truncate">Administrador ERP</span>
                </div>
              )}
            </div>
            {!sidebarCollapsed && (
              <button
                onClick={() => setDesignSystemModalOpen(true)}
                className="text-neutral-600 hover:text-[#13E1BC] p-1 transition-colors"
                title="Tokens do Sistema"
              >
                <SlidersVertical className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </aside>

        {/* =================================================================== */}
        {/* 3. MAIN APPLICATION VIEWPORT                                        */}
        {/* =================================================================== */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0d1017]">
          {/* HEADER (~56px) */}
          <header className="h-[56px] bg-[#090c14] border-b border-[#1a1f2e] px-5 flex items-center justify-between gap-4 sticky top-0 z-20">
            {/* Global Search Input with Shortcut Ctrl+K */}
            <div className="flex-1 max-w-[460px] relative">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-neutral-600" />
              <input
                type="text"
                value={globalSearch}
                onFocus={() => setGlobalSearchOpen(true)}
                onChange={(e) => {
                  setGlobalSearch(e.target.value);
                  setGlobalSearchOpen(true);
                }}
                placeholder="Buscar no ALFA... (peças, OEM, clientes, OC #00183) [Ctrl + K]"
                className="w-full h-[34px] bg-[#13151e] border border-[#1e2230] focus:border-[#13E1BC]/60 rounded-lg pl-9 pr-12 text-xs text-neutral-200 placeholder:text-neutral-600 outline-none transition-colors"
              />
              <kbd className="absolute right-3 top-2 text-[10px] font-mono text-neutral-600 border border-[#1e2230] rounded px-1.5 py-0.5">
                Ctrl K
              </kbd>

              {/* Global Search Results Dropdown */}
              {globalSearchOpen && searchResults && (
                <div className="absolute left-0 right-0 top-11 bg-white border border-[#E4E7EC] rounded-xl shadow-2xl p-3 z-50 max-h-[400px] overflow-y-auto space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-[#E4E7EC] text-xs">
                    <span className="font-bold text-[#172033]">
                      Resultados para "{globalSearch}"
                    </span>
                    <button
                      onClick={() => setGlobalSearchOpen(false)}
                      className="text-[#98A2B3] hover:text-[#172033] text-xs"
                    >
                      Fechar (Esc)
                    </button>
                  </div>

                  {/* Categoria: Gestão de Compras (OC, Cotações, Sugestões) */}
                  {searchResults.orders.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#1683E8] tracking-wider block mb-1">
                        Gestão de Compras & Ordens ({searchResults.orders.length})
                      </span>
                      <div className="space-y-1">
                        {searchResults.orders.map((ord, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              if (ord.id.includes("00183")) setActiveSection("ordem_detalhe");
                              else if (ord.id.includes("00091")) setActiveSection("cotacao");
                              else if (ord.id.includes("00072")) setActiveSection("recebimento");
                              setGlobalSearchOpen(false);
                            }}
                            className="p-2 rounded-lg hover:bg-[#EAF4FF] cursor-pointer flex justify-between items-center text-xs"
                          >
                            <div>
                              <strong className="font-mono text-[#1683E8] mr-2">{ord.id}</strong>
                              <span className="font-medium text-[#172033]">{ord.fornecedor}</span>
                              <span className="text-[10px] text-[#667085] ml-2">• {ord.tipo}</span>
                            </div>
                            <span className="font-mono font-bold text-xs text-[#16A34A]">{ord.valor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categoria: Peças & Itens */}
                  {searchResults.items.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#98A2B3] tracking-wider block mb-1">
                        Peças & Itens ({searchResults.items.length})
                      </span>
                      <div className="space-y-1">
                        {searchResults.items.slice(0, 3).map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              setEditingItem(item);
                              setActiveSection("item_cadastro");
                              setGlobalSearchOpen(false);
                            }}
                            className="p-2 rounded-lg hover:bg-[#F5F7FA] cursor-pointer flex justify-between items-center text-xs"
                          >
                            <div>
                              <strong className="text-[#1683E8] mr-2 font-mono">{item.codigo}</strong>
                              <span className="font-medium text-[#172033]">{item.item}</span>
                              <span className="text-[11px] text-[#667085] ml-2">• {item.marca}</span>
                            </div>
                            <span className="font-mono text-xs font-bold text-[#172033]">
                              Estoque: {item.estoque} un
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categoria: Pessoas */}
                  {searchResults.persons.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#98A2B3] tracking-wider block mb-1">
                        Clientes & Oficinas ({searchResults.persons.length})
                      </span>
                      <div className="space-y-1">
                        {searchResults.persons.slice(0, 2).map((person) => (
                          <div
                            key={person.id}
                            onClick={() => {
                              setViewingPerson(person);
                              setActiveSection("pessoa_cadastro");
                              setGlobalSearchOpen(false);
                            }}
                            className="p-2 rounded-lg hover:bg-[#F5F7FA] cursor-pointer flex justify-between items-center text-xs"
                          >
                            <div>
                              <strong className="text-[#172033]">{person.nome}</strong>
                              <span className="text-[11px] text-[#667085] ml-2">• {person.classificacao}</span>
                            </div>
                            <span className="text-[11px] text-[#1683E8]">{person.cidade}/{person.uf}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2">
              {/* Quick Flow Direct Shortcut (Sprint 3) */}
              <div className="hidden xl:flex items-center gap-1 bg-[#EAF4FF] px-2.5 py-1 rounded-lg border border-[#B2D7FF] text-xs">
                <span className="text-[11px] text-[#123B63] font-medium">Fluxo Ativo:</span>
                <button
                  onClick={() => setActiveSection("sugestao")}
                  className="font-bold text-[#1683E8] hover:underline"
                >
                  Sugestão
                </button>
                <span className="text-[#98A2B3]">→</span>
                <button
                  onClick={() => setActiveSection("cotacao")}
                  className="font-bold text-[#1683E8] hover:underline"
                >
                  Cotação #00091
                </button>
                <span className="text-[#98A2B3]">→</span>
                <button
                  onClick={() => setActiveSection("ordem_detalhe")}
                  className="font-bold text-[#1683E8] hover:underline"
                >
                  OC #00183
                </button>
                <span className="text-[#98A2B3]">→</span>
                <button
                  onClick={() => setActiveSection("recebimento")}
                  className="font-bold text-[#1683E8] hover:underline"
                >
                  Receber
                </button>
              </div>

              {/* Notifications Button */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-9 h-9 rounded-lg border border-[#E4E7EC] hover:bg-[#F2F4F7] flex items-center justify-center text-xs text-[#475467] relative transition-colors"
                  title="Alertas e Notificações Operacionais"
                >
                  <Bell className="w-4 h-4 text-[#667085]" />
                  {alerts.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC2626]" />
                  )}
                </button>

                {/* Notifications Panel */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-84 bg-white border border-[#E4E7EC] rounded-xl shadow-2xl p-4 z-40 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-[#E4E7EC]">
                      <span className="font-bold text-xs text-[#172033]">
                        Alertas Operacionais ({alerts.length})
                      </span>
                      <button
                        onClick={() => {
                          setAlerts([]);
                          addToast("info", "Todas as notificações foram marcadas como lidas.");
                        }}
                        className="text-[11px] text-[#1683E8] hover:underline"
                      >
                        Limpar todas
                      </button>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {alerts.map((al) => (
                        <div
                          key={al.id}
                          className="p-2.5 rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] hover:bg-white transition-colors space-y-1 text-xs"
                        >
                          <div className="flex justify-between items-center">
                            <strong className="text-[#172033] font-semibold text-[11px]">
                              {al.titulo}
                            </strong>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                al.prioridade === "alta"
                                  ? "bg-[#FEF3F2] text-[#B42318]"
                                  : "bg-[#FEF7E6] text-[#B54708]"
                              }`}
                            >
                              {al.prioridade}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#667085]">{al.descricao}</p>
                          <button
                            onClick={() => {
                              setActiveSection(al.acaoSecao as any);
                              setShowNotifications(false);
                            }}
                            className="text-[11px] font-bold text-[#1683E8] hover:underline pt-1 block"
                          >
                            {al.acaoTexto} →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Keyboard Shortcuts Button */}
              <button
                onClick={() => setShortcutsModalOpen(true)}
                className="w-9 h-9 rounded-lg border border-[#E4E7EC] hover:bg-[#F2F4F7] flex items-center justify-center text-xs text-[#475467] transition-colors"
                title="Atalhos do Teclado (F1 / ?)"
              >
                <HelpCircle className="w-4 h-4 text-[#667085]" />
              </button>

              {/* Branch Switcher */}
              <select
                value={activeBranch}
                onChange={(e) => {
                  setActiveBranch(e.target.value);
                  addToast("info", `Filial alterada para: ${e.target.value}`);
                }}
                className="h-9 px-2 bg-white border border-[#E4E7EC] rounded-lg text-xs font-medium text-[#344054] outline-none hidden md:block"
              >
                <option value="01 - Matriz Toledo / PR">Filial 01 — Toledo / PR</option>
                <option value="02 - Cascavel / PR">Filial 02 — Cascavel / PR</option>
                <option value="03 - Maringá / PR">Filial 03 — Maringá / PR</option>
              </select>
            </div>
          </header>

          {/* ================================================================= */}
          {/* 4. MAIN CONTENT AREA & UI STATES SWITCHER                         */}
          {/* ================================================================= */}
          <div className="p-5 flex-1 space-y-5 overflow-y-auto">
            {/* UI State: Skeleton Loading */}
            {uiState === "skeleton" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="h-6 w-48 bg-neutral-200 rounded animate-pulse" />
                    <div className="h-3 w-64 bg-neutral-100 rounded animate-pulse" />
                  </div>
                  <div className="h-9 w-32 bg-neutral-200 rounded animate-pulse" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 bg-white border border-[#E4E7EC] rounded-xl p-4 animate-pulse space-y-2">
                      <div className="h-3 w-16 bg-neutral-200 rounded" />
                      <div className="h-6 w-28 bg-neutral-300 rounded" />
                    </div>
                  ))}
                </div>
                <AlfaTableSkeleton rows={6} cols={6} />
              </div>
            )}

            {/* UI State: Error */}
            {uiState === "error" && (
              <AlfaErrorState
                message="Falha de comunicação com o cluster da Filial Toledo"
                detail="ERR_SOCKET_TIMEOUT: A requisição ao gateway local excedeu 3000ms. Status code 504."
                onRetry={() => {
                  setUiState("normal");
                  addToast("success", "Sincronização restaurada com sucesso.");
                }}
              />
            )}

            {/* UI State: No Permission */}
            {uiState === "no_permission" && (
              <div className="w-full py-16 px-4 bg-white border border-[#E4E7EC] rounded-xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FEF7E6] text-[#B54708] flex items-center justify-center mx-auto">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[#172033]">Alçada Operacional Restrita</h3>
                <p className="text-xs text-[#667085] max-w-md mx-auto">
                  Seu usuário possui perfil de Balconista. Apenas Gerentes de Suprimentos possuem alçada para autorizar compras diretas e descontos acima de 15%.
                </p>
                <AlfaButton variant="secondary" size="sm" onClick={() => setUiState("normal")}>
                  Retornar ao Modo Normal
                </AlfaButton>
              </div>
            )}

            {/* =============================================================== */}
            {/* TELA 1: COMMAND CENTER / DASHBOARD COM ATENÇÃO & ATIVIDADE      */}
            {/* =============================================================== */}
            {uiState === "normal" && activeSection === "inicio" && (
              <div className="space-y-5">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <div className="text-[10px] text-neutral-600 mb-1 font-mono uppercase tracking-widest">Início / Monitor</div>
                    <h1 className="text-xl font-black text-white tracking-tight font-mono">Command Center Operacional</h1>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Monitoramento em tempo real de suprimentos, faturamento e pendências de armazém.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSection("sugestao")}
                      className="flex items-center gap-2 px-4 py-2 bg-[#13E1BC] text-[#080808] font-bold text-xs rounded-lg hover:bg-[#13E1BC]/90 transition-colors font-mono"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      Abrir Gestão de Compras →
                    </button>
                  </div>
                </div>

                {/* Attention Cards */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC] animate-pulse" />
                    <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-widest font-mono">O que precisa da sua atenção?</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {ATTENTION_CARDS.map((card) => (
                      <div
                        key={card.id}
                        onClick={() => {
                          setActiveSection(card.secaoDestino as any);
                          addToast("info", `Navegando para: ${card.texto}`);
                        }}
                        className={`p-3.5 bg-[#13151e] border cursor-pointer hover:shadow-lg transition-all flex flex-col justify-between space-y-2.5 group rounded-lg ${
                          card.tipo === "critico"
                            ? "border-l-2 border-l-red-500 border-[#1e2230] hover:border-l-red-400"
                            : card.tipo === "aviso"
                            ? "border-l-2 border-l-amber-500 border-[#1e2230] hover:border-l-amber-400"
                            : "border-l-2 border-l-[#13E1BC] border-[#1e2230] hover:border-l-[#13E1BC]"
                        }`}
                      >
                        <div className="space-y-1">
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono uppercase inline-block ${
                              card.tipo === "critico"
                                ? "bg-red-500/15 text-red-400 border border-red-500/30"
                                : card.tipo === "aviso"
                                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                : "bg-[#13E1BC]/10 text-[#13E1BC] border border-[#13E1BC]/30"
                            }`}
                          >
                            {card.contador}
                          </span>
                          <strong className="block text-xs text-neutral-200 font-semibold leading-tight pt-1 group-hover:text-white">
                            {card.texto}
                          </strong>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-[#13E1BC]/70 font-bold pt-2 border-t border-[#1e2230] group-hover:text-[#13E1BC]">
                          <span>{card.linkTexto}</span>
                          <span>→</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4 KPIs Cards Principais */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                  <div className="bg-[#13151e] border border-[#1e2230] rounded-lg p-4 space-y-2 hover:border-[#13E1BC]/30 transition-colors group">
                    <span className="text-[10px] text-neutral-500 block font-mono uppercase tracking-widest">Faturamento / Vendas</span>
                    <div className="text-xl font-black text-white tracking-tight tabular-nums font-mono group-hover:text-[#13E1BC] transition-colors">
                      R$ 284.086,88
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 block">↑ 12,4% no período</span>
                  </div>

                  <div className="bg-[#13151e] border border-[#1e2230] rounded-lg p-4 space-y-2 hover:border-[#13E1BC]/30 transition-colors group">
                    <span className="text-[10px] text-neutral-500 block font-mono uppercase tracking-widest">Compras / Aquisições</span>
                    <div className="text-xl font-black text-white tracking-tight tabular-nums font-mono group-hover:text-[#13E1BC] transition-colors">
                      R$ 145.315,98
                    </div>
                    <span className="text-[11px] font-bold text-red-400 block">↓ 3,2% no período</span>
                  </div>

                  <div className="bg-[#13151e] border border-[#1e2230] rounded-lg p-4 space-y-2 hover:border-[#13E1BC]/30 transition-colors group">
                    <span className="text-[10px] text-neutral-500 block font-mono uppercase tracking-widest">Ticket Médio Balcão</span>
                    <div className="text-xl font-black text-white tracking-tight tabular-nums font-mono group-hover:text-[#13E1BC] transition-colors">
                      R$ 211,37
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 block">↑ 5,7% vs. média anual</span>
                  </div>

                  <div className="bg-[#13151e] border border-[#1e2230] rounded-lg p-4 space-y-2 hover:border-[#13E1BC]/30 transition-colors group">
                    <span className="text-[10px] text-neutral-500 block font-mono uppercase tracking-widest">Devoluções / Garantias</span>
                    <div className="text-xl font-black text-white tracking-tight tabular-nums font-mono group-hover:text-[#13E1BC] transition-colors">
                      7,73%
                    </div>
                    <span className="text-[11px] text-neutral-500 block">18 ocorrências no mês</span>
                  </div>
                </div>

                {/* Gráfico de Vendas + Atividades Recentes */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  {/* Gráfico de Vendas */}
                  <div className="lg:col-span-2 bg-[#13151e] border border-[#1e2230] rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-sm text-white">Faturamento Diário Consolidado</h3>
                        <span className="text-[11px] text-neutral-500">Volume de vendas balcão e atacado</span>
                      </div>
                      <span className="text-xs font-mono text-[#13E1BC] font-bold">Média: R$ 9.460/dia</span>
                    </div>

                    <div className="h-[180px] flex items-end gap-2.5 pt-4 border-b border-[#1e2230] pb-2">
                      {[
                        { dia: "01", h: "40%", val: "R$ 6.2k" },
                        { dia: "05", h: "58%", val: "R$ 9.1k" },
                        { dia: "10", h: "48%", val: "R$ 7.5k" },
                        { dia: "15", h: "75%", val: "R$ 11.8k" },
                        { dia: "20", h: "62%", val: "R$ 9.7k" },
                        { dia: "25", h: "88%", val: "R$ 13.9k", active: true },
                        { dia: "30", h: "72%", val: "R$ 11.3k" },
                      ].map((bar, idx) => (
                        <div key={idx} className="flex-1 flex flex-col justify-end items-center h-full group">
                          <span className="text-[9px] text-[#13E1BC] opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-mono">
                            {bar.val}
                          </span>
                          <div
                            style={{ height: bar.h }}
                            className={`w-full max-w-[36px] rounded-t transition-all cursor-pointer ${
                              bar.active ? "bg-[#13E1BC]" : "bg-[#1e2a1f] hover:bg-[#13E1BC]/60"
                            }`}
                          />
                          <span className="text-[10px] text-neutral-600 mt-1.5 font-mono">{bar.dia}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Atividade Recente */}
                  <div className="bg-[#13151e] border border-[#1e2230] rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-sm text-white">Atividade Recente</h3>
                      <Clock className="w-3.5 h-3.5 text-neutral-600" />
                    </div>

                    <div className="space-y-2.5">
                      {RECENT_ACTIVITIES.map((act) => (
                        <div key={act.id} className="flex items-start gap-2 text-xs">
                          <span className="font-mono text-[10px] font-bold text-[#13E1BC] bg-[#13E1BC]/10 px-1.5 py-0.5 rounded border border-[#13E1BC]/20 shrink-0">
                            {act.hora}
                          </span>
                          <div className="min-w-0">
                            <span className="text-neutral-400 block leading-snug text-[11px]">{act.texto}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* SPRINT 3: ETAPA 1 — SUGESTÃO DE COMPRA (/compras/sugestoes)      */}
            {/* =============================================================== */}
            {uiState === "normal" && activeSection === "sugestao" && (
              <div className="space-y-4">
                {/* Process Timeline */}
                <ProcessTimeline
                  steps={procurementTimelineSteps}
                  onStepClick={handleTimelineStepClick}
                />

                {/* Contextual Breadcrumbs + Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-[#667085] mb-1 font-mono">
                      Compras / Sugestões de Compra
                    </div>
                    <h1 className="text-2xl font-bold text-[#172033]">Sugestões de Compra</h1>
                    <p className="text-xs text-[#667085]">
                      Produtos que precisam ser repostos com base no estoque e histórico de vendas.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <AlfaButton
                      variant="secondary"
                      size="md"
                      onClick={() => addToast("info", "Cálculo de reposição recalculado com base no giro histórico.")}
                    >
                      Recalcular Giro
                    </AlfaButton>

                    <AlfaButton
                      variant="primary"
                      size="md"
                      onClick={handleGenerateQuotation}
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Gerar Cotação ({selectedSuggestionIds.length} itens)
                    </AlfaButton>
                  </div>
                </div>

                {/* Barra de Resumo de Seleção */}
                <div className="bg-[#EAF4FF] border border-[#B2D7FF] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#123B63]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1683E8] text-white flex items-center justify-center font-bold">
                      {selectedSuggestionIds.length}
                    </div>
                    <div>
                      <strong className="block text-sm">
                        {selectedSuggestionIds.length} de {suggestions.length} produtos sugeridos selecionados
                      </strong>
                      <span className="text-[#667085]">
                        Estimativa de investimento de reposição:{" "}
                        <strong className="text-[#172033] font-mono">
                          R${" "}
                          {selectedSuggestionIds
                            .reduce((acc, id) => {
                              const sug = suggestions.find((s) => s.id === id);
                              const qtd = suggestionQuantities[id] || (sug ? sug.quantidadeSugerida : 20);
                              return acc + (sug ? sug.ultimoCusto * qtd : 0);
                            }, 0)
                            .toFixed(2)
                            .replace(".", ",")}
                        </strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <AlfaButton
                      variant="primary"
                      size="sm"
                      onClick={handleGenerateQuotation}
                    >
                      Avançar para Cotação →
                    </AlfaButton>
                  </div>
                </div>

                {/* Tabela de Sugestões de Compra (Fiel ao item 4 do prompt) */}
                <div className="bg-white border border-[#E4E7EC] rounded-xl shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-[#F9FAFB] border-b border-[#E4E7EC] text-[#667085] font-semibold">
                        <tr>
                          <th className="py-2.5 px-3 w-8 text-center">
                            <input
                              type="checkbox"
                              checked={selectedSuggestionIds.length === suggestions.length && suggestions.length > 0}
                              onChange={(e) => handleSelectAllSuggestions(e.target.checked)}
                              className="rounded text-[#1683E8] focus:ring-[#1683E8]"
                            />
                          </th>
                          <th className="py-2.5 px-4">Produto</th>
                          <th className="py-2.5 px-4">Código</th>
                          <th className="py-2.5 px-4">Marca</th>
                          <th className="py-2.5 px-4 text-center">Estoque Atual</th>
                          <th className="py-2.5 px-4 text-center">Estoque Mínimo</th>
                          <th className="py-2.5 px-4 text-center">Média de Vendas</th>
                          <th className="py-2.5 px-4 text-right">Último Custo</th>
                          <th className="py-2.5 px-4">Fornecedor</th>
                          <th className="py-2.5 px-4 text-center">Qtd Sugerida</th>
                          <th className="py-2.5 px-4">Motivo</th>
                          <th className="py-2.5 px-4 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2F4F7]">
                        {suggestions.map((sug) => {
                          const isSelected = selectedSuggestionIds.includes(sug.id);
                          const qtd = suggestionQuantities[sug.id] || sug.quantidadeSugerida;

                          return (
                            <tr
                              key={sug.id}
                              className={`hover:bg-[#F9FAFB] transition-colors ${
                                isSelected ? "bg-[#F5F9FF]" : ""
                              }`}
                            >
                              <td className="py-2.5 px-3 text-center">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleToggleSelectSuggestion(sug.id)}
                                  className="rounded text-[#1683E8] focus:ring-[#1683E8]"
                                />
                              </td>
                              <td
                                onClick={() => setSelectedSuggestionDetail(sug)}
                                className="py-2.5 px-4 cursor-pointer group"
                              >
                                <strong className="font-semibold text-[#172033] group-hover:text-[#1683E8] transition-colors">
                                  {sug.produto}
                                </strong>
                                <span className="block text-[10px] text-[#667085]">
                                  {sug.categoria}
                                </span>
                              </td>
                              <td className="py-2.5 px-4 font-mono font-bold text-[#1683E8]">
                                {sug.codigo}
                              </td>
                              <td className="py-2.5 px-4 text-[#344054]">{sug.marca}</td>
                              <td className="py-2.5 px-4 text-center font-mono font-bold">
                                <span className={sug.estoqueAtual <= 0 ? "text-[#DC2626]" : "text-[#B54708]"}>
                                  {sug.estoqueAtual} un
                                </span>
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono text-[#667085]">
                                {sug.estoqueMin} un
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-bold text-[#172033]">
                                {sug.mediaVendas}
                              </td>
                              <td className="py-2.5 px-4 text-right font-mono tabular-nums text-[#667085]">
                                R$ {sug.ultimoCusto.toFixed(2).replace(".", ",")}
                              </td>
                              <td className="py-2.5 px-4 text-[#344054] truncate max-w-[120px]">
                                {sug.fornecedorHabitual}
                              </td>
                              <td className="py-2.5 px-4 text-center">
                                <div className="inline-flex items-center border border-[#E4E7EC] rounded-lg overflow-hidden bg-white">
                                  <button
                                    onClick={() => {
                                      setSuggestionQuantities({
                                        ...suggestionQuantities,
                                        [sug.id]: Math.max(1, qtd - 5),
                                      });
                                    }}
                                    className="px-2 py-0.5 text-xs hover:bg-[#F2F4F7]"
                                  >
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    value={qtd}
                                    onChange={(e) => {
                                      setSuggestionQuantities({
                                        ...suggestionQuantities,
                                        [sug.id]: Number(e.target.value),
                                      });
                                    }}
                                    className="w-10 text-center text-xs font-mono font-bold outline-none"
                                  />
                                  <button
                                    onClick={() => {
                                      setSuggestionQuantities({
                                        ...suggestionQuantities,
                                        [sug.id]: qtd + 5,
                                      });
                                    }}
                                    className="px-2 py-0.5 text-xs hover:bg-[#F2F4F7]"
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="py-2.5 px-4">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF3F2] text-[#B42318]">
                                  {sug.motivo}
                                </span>
                              </td>
                              <td className="py-2.5 px-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    onClick={() => setSelectedSuggestionDetail(sug)}
                                    className="p-1 hover:bg-[#EAF4FF] text-[#1683E8] rounded"
                                    title="Visualizar Detalhes & Justificativas"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleIgnoreSuggestion(sug.id)}
                                    className="p-1 hover:bg-[#FEF3F2] text-[#DC2626] rounded"
                                    title="Ignorar Sugestão"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* SPRINT 3: ETAPA 2 — COTAÇÃO MULTILATERAL (/compras/cotacoes)    */}
            {/* =============================================================== */}
            {uiState === "normal" && activeSection === "cotacao" && (
              <div className="space-y-4">
                {/* Process Timeline */}
                <ProcessTimeline
                  steps={procurementTimelineSteps}
                  onStepClick={handleTimelineStepClick}
                />

                {/* Contextual Breadcrumbs + Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-[#667085] mb-1 font-mono">
                      Compras / Sugestões / Cotação #{quotation.id}
                    </div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl font-bold text-[#172033]">
                        Cotação #{quotation.id}
                      </h1>
                      <AlfaBadge variant="warning">{quotation.status}</AlfaBadge>
                    </div>
                    <p className="text-xs text-[#667085] mt-0.5">
                      Produtos: <strong>{quotation.produtosCount} itens</strong> • Valor estimado:{" "}
                      <strong className="text-[#172033] font-mono">R$ {quotation.valorEstimado.toFixed(2).replace(".", ",")}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <AlfaButton
                      variant="secondary"
                      size="md"
                      onClick={() => setActiveSection("sugestao")}
                    >
                      ← Voltar para Sugestões
                    </AlfaButton>

                    <AlfaButton
                      variant="primary"
                      size="md"
                      onClick={handleOpenCreatePoModal}
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Gerar Ordem de Compra ({activeQuotationSupplier.nome.split(" ")[2] || "Fornecedor"}) →
                    </AlfaButton>
                  </div>
                </div>

                {/* Comparativo Visual dos 3 Fornecedores (Fiel ao item 6 do prompt) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quotation.fornecedores.map((forn) => {
                    const isSelected = chosenSupplierKey === forn.key;

                    return (
                      <div
                        key={forn.key}
                        onClick={() => {
                          setChosenSupplierKey(forn.key);
                          addToast("info", `${forn.nome} selecionado para a ordem de compra.`);
                        }}
                        className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
                          isSelected
                            ? "border-[#1683E8] bg-[#F5F9FF] shadow-md ring-2 ring-[#1683E8]/20"
                            : "border-[#E4E7EC] bg-white hover:border-[#D0D5DD]"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <strong className="text-sm font-bold text-[#172033]">{forn.nome}</strong>
                            {isSelected && (
                              <span className="text-[10px] text-[#1683E8] font-bold bg-[#EAF4FF] px-2 py-0.5 rounded">
                                ✓ Selecionado
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#667085]">{forn.cidade}</span>
                        </div>

                        {/* Indicadores Chave de Comparação */}
                        <div className="space-y-2 border-y border-[#E4E7EC] py-3 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-[#667085]">Preço Unitário Médio:</span>
                            <div className="text-right">
                              <strong className="font-mono text-sm text-[#172033]">
                                R$ {forn.precoUnitarioExemplo.toFixed(2).replace(".", ",")}
                              </strong>
                              {forn.isMenorPreco && (
                                <span className="block text-[10px] text-[#16A34A] font-bold">
                                  ★ Menor Preço
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-[#667085]">Prazo de Entrega:</span>
                            <div className="text-right">
                              <strong className="text-[#172033]">{forn.prazo}</strong>
                              {forn.isMenorPrazo && (
                                <span className="block text-[10px] text-[#1683E8] font-bold">
                                  ★ Menor Prazo
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-[#667085]">Frete:</span>
                            <div className="text-right">
                              <strong className={forn.isFreteGratis ? "text-[#16A34A] font-bold" : "text-[#172033]"}>
                                {forn.freteTexto}
                              </strong>
                              {forn.isFreteGratis && (
                                <span className="block text-[10px] text-[#16A34A] font-bold">
                                  ★ Frete Grátis
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-[#667085]">Disponibilidade:</span>
                            <div className="text-right">
                              <strong className="font-mono text-[#172033]">{forn.disponibilidade}%</strong>
                              {forn.isMelhorDisponibilidade && (
                                <span className="block text-[10px] text-[#1683E8] font-bold">
                                  ★ 100% Em Estoque
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Valor Total + Destaque */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs text-[#667085]">Total Estimado:</span>
                            <span className="text-xl font-bold font-mono text-[#172033] tabular-nums">
                              R$ {forn.precoTotal.toFixed(2).replace(".", ",")}
                            </span>
                          </div>
                          <AlfaBadge
                            variant={
                              forn.isMenorPreco ? "success" : forn.isMenorPrazo ? "primary" : "neutral"
                            }
                          >
                            {forn.badgeDestaque}
                          </AlfaBadge>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Grade de Itens Cotados */}
                <div className="bg-white border border-[#E4E7EC] rounded-xl shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-[#E4E7EC]">
                    <h3 className="font-bold text-sm text-[#172033]">Itens da Cotação</h3>
                    <p className="text-[11px] text-[#667085]">
                      Comparativo de valores unitários por fornecedor selecionado.
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-[#F9FAFB] border-b border-[#E4E7EC] text-[#667085] font-semibold">
                        <tr>
                          <th className="py-2.5 px-4">Item Cotado</th>
                          <th className="py-2.5 px-4 text-center">Quantidade</th>
                          <th className="py-2.5 px-4 text-center bg-[#EAF4FF]/40 border-l border-[#E4E7EC]">
                            Fornecedor A (AutoMax)
                          </th>
                          <th className="py-2.5 px-4 text-center bg-[#FEF7E6]/30 border-l border-[#E4E7EC]">
                            Fornecedor B (DPK Peças)
                          </th>
                          <th className="py-2.5 px-4 text-center bg-[#F2F4F7]/40 border-l border-[#E4E7EC]">
                            Fornecedor C (Pellegrino)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2F4F7]">
                        {quotation.itens.map((it, idx) => (
                          <tr key={idx} className="hover:bg-[#F9FAFB]">
                            <td className="py-3 px-4">
                              <span className="font-mono font-bold text-[#1683E8] mr-2">{it.codigo}</span>
                              <strong className="text-[#172033]">{it.descricao}</strong>
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold">{it.quantidade} un</td>
                            <td className="py-3 px-4 text-center border-l border-[#E4E7EC] font-mono">
                              R$ {it.precos.fornecedor_a.unit.toFixed(2).replace(".", ",")}
                            </td>
                            <td className="py-3 px-4 text-center border-l border-[#E4E7EC] font-mono text-[#16A34A] font-bold bg-[#EAF7EE]/10">
                              R$ {it.precos.fornecedor_b.unit.toFixed(2).replace(".", ",")} (Menor)
                            </td>
                            <td className="py-3 px-4 text-center border-l border-[#E4E7EC] font-mono">
                              R$ {it.precos.fornecedor_c.unit.toFixed(2).replace(".", ",")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* SPRINT 3: ETAPA 3 — ORDEM DE COMPRA (/compras/pedidos/00183)     */}
            {/* =============================================================== */}
            {uiState === "normal" && (activeSection === "ordem_detalhe" || activeSection === "compras") && (
              <div className="space-y-4">
                {/* Process Timeline */}
                <ProcessTimeline
                  steps={procurementTimelineSteps}
                  onStepClick={handleTimelineStepClick}
                />

                {/* Contextual Breadcrumbs + Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-[#667085] mb-1 font-mono">
                      Compras / Sugestões / Cotação #00091 / Ordem #{purchaseOrder.id}
                    </div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl font-bold text-[#172033]">
                        ORDEM DE COMPRA #{purchaseOrder.id}
                      </h1>
                      <AlfaBadge variant="warning">{purchaseOrder.status}</AlfaBadge>
                    </div>
                    <p className="text-xs text-[#667085] mt-0.5">
                      Fornecedor: <strong>{purchaseOrder.fornecedor}</strong> • Previsão de Entrega: <strong>{purchaseOrder.previsaoEntrega}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <AlfaButton
                      variant="secondary"
                      size="md"
                      onClick={() => setActiveSection("cotacao")}
                    >
                      ← Ver Cotação #00091
                    </AlfaButton>

                    <AlfaButton
                      variant="primary"
                      size="md"
                      onClick={() => {
                        setActiveSection("recebimento");
                        addToast("info", "Módulo de conferência de carga aberto.");
                      }}
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Registrar Recebimento →
                    </AlfaButton>
                  </div>
                </div>

                {/* Informações da OC */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-[#E4E7EC] rounded-xl p-4 shadow-xs space-y-1">
                    <span className="text-xs text-[#667085]">Distribuidor / Fornecedor</span>
                    <strong className="block text-sm text-[#172033]">{purchaseOrder.fornecedor}</strong>
                    <span className="text-[11px] text-[#667085]">{purchaseOrder.fornecedorCidade}</span>
                  </div>

                  <div className="bg-white border border-[#E4E7EC] rounded-xl p-4 shadow-xs space-y-1">
                    <span className="text-xs text-[#667085]">Condição Comercial</span>
                    <strong className="block text-sm text-[#172033]">{purchaseOrder.condicaoPagamento}</strong>
                    <span className="text-[11px] text-[#16A34A] font-bold">Frete Grátis Incluso</span>
                  </div>

                  <div className="bg-white border border-[#E4E7EC] rounded-xl p-4 shadow-xs space-y-1">
                    <span className="text-xs text-[#667085]">Valor Total do Pedido</span>
                    <div className="text-xl font-bold text-[#1683E8] font-mono tabular-nums">
                      R$ {purchaseOrder.total.toFixed(2).replace(".", ",")}
                    </div>
                    <span className="text-[11px] text-[#667085]">4 itens homologados</span>
                  </div>
                </div>

                {/* Tabela de Produtos da Ordem */}
                <div className="bg-white border border-[#E4E7EC] rounded-xl shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-[#E4E7EC]">
                    <h3 className="font-bold text-sm text-[#172033]">Produtos Homologados na Ordem de Compra</h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-[#F9FAFB] border-b border-[#E4E7EC] text-[#667085] font-semibold">
                        <tr>
                          <th className="py-2.5 px-4">Código</th>
                          <th className="py-2.5 px-4">Produto</th>
                          <th className="py-2.5 px-4 text-center">Quantidade</th>
                          <th className="py-2.5 px-4 text-right">Valor Unitário</th>
                          <th className="py-2.5 px-4 text-center">Desconto</th>
                          <th className="py-2.5 px-4 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2F4F7]">
                        {purchaseOrder.itens.map((it) => (
                          <tr key={it.id} className="hover:bg-[#F9FAFB]">
                            <td className="py-3 px-4 font-mono font-bold text-[#1683E8]">{it.codigo}</td>
                            <td className="py-3 px-4 font-semibold text-[#172033]">{it.produto}</td>
                            <td className="py-3 px-4 text-center font-mono font-bold">{it.quantidade} un</td>
                            <td className="py-3 px-4 text-right font-mono tabular-nums">
                              R$ {it.valorUnitario.toFixed(2).replace(".", ",")}
                            </td>
                            <td className="py-3 px-4 text-center text-[#667085]">{it.desconto}%</td>
                            <td className="py-3 px-4 text-right font-mono font-bold text-[#172033] tabular-nums">
                              R$ {it.total.toFixed(2).replace(".", ",")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer Totais */}
                  <div className="p-4 bg-[#F9FAFB] border-t border-[#E4E7EC] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                    <div className="flex items-center gap-4 text-[#667085]">
                      <span>Subtotal: <strong>R$ {purchaseOrder.subtotal.toFixed(2).replace(".", ",")}</strong></span>
                      <span>Frete: <strong className="text-[#16A34A]">Grátis (R$ 0,00)</strong></span>
                      <span>Desconto: <strong>R$ 0,00</strong></span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[11px] text-[#667085] block">Total Líquido da OC:</span>
                        <strong className="text-base font-bold text-[#1683E8] font-mono tabular-nums">
                          R$ {purchaseOrder.total.toFixed(2).replace(".", ",")}
                        </strong>
                      </div>

                      <AlfaButton
                        variant="primary"
                        size="md"
                        onClick={() => setActiveSection("recebimento")}
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Registrar Recebimento
                      </AlfaButton>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* SPRINT 3: ETAPA 4 — RECEBIMENTO & CONFERÊNCIA DE CARGA          */}
            {/* =============================================================== */}
            {uiState === "normal" && activeSection === "recebimento" && (
              <div className="space-y-4">
                {/* Process Timeline */}
                <ProcessTimeline
                  steps={procurementTimelineSteps}
                  onStepClick={handleTimelineStepClick}
                />

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-[#667085] mb-1 font-mono">
                      Compras / Ordem #{purchaseOrder.id} / Recebimento & Conferência
                    </div>
                    <h1 className="text-2xl font-bold text-[#172033]">Receber Mercadoria</h1>
                    <p className="text-xs text-[#667085]">
                      Conferência física na doca • Ordem de compra #{purchaseOrder.id} • Fornecedor: {purchaseOrder.fornecedor}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <AlfaButton
                      variant="secondary"
                      size="md"
                      onClick={() => setActiveSection("ordem_detalhe")}
                    >
                      ← Ver Ordem #{purchaseOrder.id}
                    </AlfaButton>

                    <AlfaButton
                      variant="primary"
                      size="md"
                      loading={isConfirmingEntry}
                      onClick={handleConfirmStockEntry}
                      icon={<Check className="w-4 h-4" />}
                    >
                      Confirmar Entrada de Estoque
                    </AlfaButton>
                  </div>
                </div>

                {/* SPRINT 3 ITEM 9: Alerta de Divergência não bloqueante */}
                {hasDivergence && (
                  <div className="p-4 bg-[#FEF7E6] border border-[#FEDF89] rounded-xl flex items-center justify-between gap-3 text-xs text-[#B54708]">
                    <div className="flex items-center gap-2.5">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <div>
                        <strong className="block font-bold">
                          Existem produtos com quantidade diferente da ordem de compra.
                        </strong>
                        <span>
                          Pastilha de Freio Fras-le: 18 recebidas de 20 esperadas (-2 unidades).
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <AlfaButton
                        variant="secondary"
                        size="sm"
                        onClick={() => addToast("info", "Divergência anotada para crédito com o distribuidor.")}
                      >
                        Continuar conferência
                      </AlfaButton>
                    </div>
                  </div>
                )}

                {/* Tabela de Conferência (Esperado vs Recebido vs Diferença) */}
                <div className="bg-white border border-[#E4E7EC] rounded-xl shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-[#E4E7EC] flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-sm text-[#172033]">Produtos Esperados na Carga</h3>
                      <span className="text-[11px] text-[#667085]">Altere as quantidades recebidas conforme contagem física.</span>
                    </div>
                    <span className="text-xs font-mono text-[#667085]">Doca 02 • Conferente: Carlos Almoxarife</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-[#F9FAFB] border-b border-[#E4E7EC] text-[#667085] font-semibold">
                        <tr>
                          <th className="py-2.5 px-4">Código</th>
                          <th className="py-2.5 px-4">Produto</th>
                          <th className="py-2.5 px-4 text-center">Esperado</th>
                          <th className="py-2.5 px-4 text-center">Recebido Físico</th>
                          <th className="py-2.5 px-4 text-center">Diferença</th>
                          <th className="py-2.5 px-4 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2F4F7]">
                        {receivingChecks.map((it) => (
                          <tr key={it.id} className="hover:bg-[#F9FAFB]">
                            <td className="py-3 px-4 font-mono font-bold text-[#1683E8]">{it.codigo}</td>
                            <td className="py-3 px-4 font-semibold text-[#172033]">{it.produto}</td>
                            <td className="py-3 px-4 text-center font-mono font-bold text-[#667085]">{it.esperado} un</td>
                            <td className="py-3 px-4 text-center">
                              <div className="inline-flex items-center border border-[#E4E7EC] rounded-lg overflow-hidden bg-white">
                                <button
                                  onClick={() => handleUpdateReceivingQty(it.id, Math.max(0, it.recebido - 1))}
                                  className="px-2.5 py-1 text-xs hover:bg-[#F2F4F7]"
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  value={it.recebido}
                                  onChange={(e) => handleUpdateReceivingQty(it.id, Number(e.target.value))}
                                  className="w-12 text-center text-xs font-mono font-bold outline-none"
                                />
                                <button
                                  onClick={() => handleUpdateReceivingQty(it.id, it.recebido + 1)}
                                  className="px-2.5 py-1 text-xs hover:bg-[#F2F4F7]"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold">
                              {it.diferenca === 0 ? (
                                <span className="text-[#16A34A]">0 un</span>
                              ) : (
                                <span className="text-[#DC2626]">{it.diferenca} un</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {it.status === "Conferido" ? (
                                <AlfaBadge variant="success">Conferido</AlfaBadge>
                              ) : (
                                <AlfaBadge variant="danger">Divergência</AlfaBadge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* SPRINT 3 ITEM 10: Resumo da Entrada de Estoque */}
                  <div className="p-4 bg-[#F9FAFB] border-t border-[#E4E7EC] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <span className="text-[#667085] block">Entrada Gerada:</span>
                        <strong className="text-sm font-bold text-[#172033] font-mono">Entrada #00072</strong>
                      </div>
                      <div>
                        <span className="text-[#667085] block">Produtos:</span>
                        <strong className="text-sm font-bold text-[#172033]">4 tipos (12 SKUs)</strong>
                      </div>
                      <div>
                        <span className="text-[#667085] block">Itens Recebidos:</span>
                        <strong className="text-sm font-bold text-[#16A34A] font-mono">103 peças</strong>
                      </div>
                      <div>
                        <span className="text-[#667085] block">Divergências:</span>
                        <strong className="text-sm font-bold text-[#DC2626]">1 item (-2 un)</strong>
                      </div>
                    </div>

                    <AlfaButton
                      variant="primary"
                      size="md"
                      loading={isConfirmingEntry}
                      onClick={handleConfirmStockEntry}
                      icon={<Check className="w-4 h-4" />}
                    >
                      Confirmar Entrada no Estoque
                    </AlfaButton>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* SPRINT 3: ETAPA 5 — ESTOQUE COM VALORES ATUALIZADOS             */}
            {/* =============================================================== */}
            {uiState === "normal" && activeSection === "estoque" && (
              <div className="space-y-4">
                {/* Banner de Sucesso de Entrada se recém-confirmado */}
                {entryConfirmed && (
                  <div className="p-4 bg-[#EAF7EE] border border-[#A8E6BE] rounded-xl flex items-center justify-between gap-3 text-xs text-[#027A48]">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-[#16A34A]" />
                      <div>
                        <strong className="block font-bold">
                          ✓ Entrada #00072 registrada com sucesso!
                        </strong>
                        <span>
                          O saldo físico de estoque dos 4 itens recebidos foi atualizado no almoxarifado da Filial Toledo.
                        </span>
                      </div>
                    </div>
                    <AlfaBadge variant="success">Estoque Sincronizado</AlfaBadge>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-[#667085] mb-1 font-mono">Operações / Estoque Físico</div>
                    <h1 className="text-2xl font-bold text-[#172033]">Painel Analítico de Estoque</h1>
                    <p className="text-xs text-[#667085]">
                      Controle físico, níveis de segurança, curva ABC e valor imobilizado.
                    </p>
                  </div>
                  <AlfaButton
                    variant="primary"
                    size="md"
                    onClick={() => setActiveSection("sugestao")}
                  >
                    Abrir Sugestões de Reposição →
                  </AlfaButton>
                </div>

                {/* Cards Analíticos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white border border-[#E4E7EC] rounded-xl p-4 shadow-xs space-y-1">
                    <span className="text-xs text-[#667085]">Valor em Custo Total</span>
                    <div className="text-xl font-bold text-[#172033] tabular-nums">
                      R$ 388.091,00
                    </div>
                    <span className="text-[11px] text-[#1683E8]">4.923 peças físicas (+103 un)</span>
                  </div>

                  <div className="bg-white border border-[#E4E7EC] rounded-xl p-4 shadow-xs space-y-1">
                    <span className="text-xs text-[#667085]">Abaixo do Estoque Mínimo</span>
                    <div className="text-xl font-bold text-[#B54708] tabular-nums">
                      {entryConfirmed ? "19 itens" : "23 itens"}
                    </div>
                    <span className="text-[11px] text-[#16A34A]">4 itens repostos na entrada #00072</span>
                  </div>

                  <div className="bg-white border border-[#E4E7EC] rounded-xl p-4 shadow-xs space-y-1">
                    <span className="text-xs text-[#667085]">Estoque Negativo (Inconsistência)</span>
                    <div className="text-xl font-bold text-[#DC2626] tabular-nums">
                      1 item (-1 un)
                    </div>
                    <span className="text-[11px] text-[#DC2626]">Filtro ar cabine (786)</span>
                  </div>

                  <div className="bg-white border border-[#E4E7EC] rounded-xl p-4 shadow-xs space-y-1">
                    <span className="text-xs text-[#667085]">Sem Giro Há Mais de 90 Dias</span>
                    <div className="text-xl font-bold text-[#667085] tabular-nums">
                      R$ 14.820,00
                    </div>
                    <span className="text-[11px] text-[#667085]">Capital parado em prateleira</span>
                  </div>
                </div>

                {/* Tabela de Posição de Estoque com Indicadores de Recém-Recebidos (Item 11 do prompt) */}
                <div className="bg-white border border-[#E4E7EC] rounded-xl shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-[#E4E7EC] flex justify-between items-center">
                    <h3 className="font-bold text-sm text-[#172033]">Posição Físico-Financeira do Almoxarifado</h3>
                    <span className="text-xs text-[#667085]">Filial: 01 Toledo / PR</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-[#F9FAFB] border-b border-[#E4E7EC] text-[#667085] font-semibold">
                        <tr>
                          <th className="py-2.5 px-4">Código</th>
                          <th className="py-2.5 px-4">Descrição da Peça</th>
                          <th className="py-2.5 px-4 text-center">Curva</th>
                          <th className="py-2.5 px-4 text-center">Saldo Físico Atual</th>
                          <th className="py-2.5 px-4 text-center">Mínimo</th>
                          <th className="py-2.5 px-4 text-center">Status</th>
                          <th className="py-2.5 px-4 text-center">Movimentações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2F4F7]">
                        {itemsDatabase.map((it) => (
                          <tr
                            key={it.id}
                            className={`hover:bg-[#F9FAFB] transition-colors ${
                              it.recemRecebidoBadge ? "bg-[#F4FBF6]" : ""
                            }`}
                          >
                            <td className="py-3 px-4 font-mono font-bold text-[#1683E8]">{it.codigo}</td>
                            <td className="py-3 px-4">
                              <div className="font-semibold text-[#172033]">{it.item}</div>
                              {it.recemRecebidoBadge && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16A34A] mt-0.5">
                                  <Check className="w-3.5 h-3.5" />
                                  {it.recemRecebidoBadge}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="px-1.5 py-0.5 rounded font-mono font-bold text-[10px] bg-neutral-100 text-neutral-600">
                                {it.curvaAbc}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-bold text-sm text-[#172033]">
                              {it.estoque} un
                            </td>
                            <td className="py-3 px-4 text-center font-mono text-[#667085]">{it.estoqueMin} un</td>
                            <td className="py-3 px-4 text-center">
                              {it.status === "disponivel" ? (
                                <AlfaBadge variant="success">Disponível</AlfaBadge>
                              ) : it.status === "baixo" ? (
                                <AlfaBadge variant="warning">Abaixo Mín</AlfaBadge>
                              ) : (
                                <AlfaBadge variant="danger">Negativo</AlfaBadge>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => setKardexItem(it)}
                                className="text-xs text-[#1683E8] hover:underline font-semibold"
                              >
                                Ver Kardex →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Telas complementares de Cadastros e Vendas */}
            {uiState === "normal" && activeSection === "itens" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-[#667085] mb-1 font-mono">Cadastros / Itens de Estoque</div>
                    <h1 className="text-2xl font-bold text-[#172033]">Catálogo Geral de Autopeças</h1>
                  </div>
                  <AlfaButton variant="primary" size="md" onClick={handleNewItem}>
                    + Novo Item (Ctrl+N)
                  </AlfaButton>
                </div>
                {/* Tabela de Itens Geral */}
                <div className="bg-white border border-[#E4E7EC] rounded-xl shadow-xs overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F9FAFB] border-b border-[#E4E7EC] text-[#667085] font-semibold">
                      <tr>
                        <th className="py-2.5 px-4">Código</th>
                        <th className="py-2.5 px-4">Descrição</th>
                        <th className="py-2.5 px-4 text-center">Estoque</th>
                        <th className="py-2.5 px-4 text-right">Preço Venda</th>
                        <th className="py-2.5 px-4 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F4F7]">
                      {filteredItems.map((item) => (
                        <tr key={item.id} className="hover:bg-[#F9FAFB]">
                          <td className="py-2.5 px-4 font-mono font-bold text-[#1683E8]">{item.codigo}</td>
                          <td className="py-2.5 px-4 font-semibold text-[#172033]">{item.item}</td>
                          <td className="py-2.5 px-4 text-center font-bold font-mono">{item.estoque} un</td>
                          <td className="py-2.5 px-4 text-right font-mono font-bold">R$ {item.venda.toFixed(2).replace(".", ",")}</td>
                          <td className="py-2.5 px-4 text-center">
                            <button
                              onClick={() => {
                                setEditingItem(item);
                                setActiveSection("item_cadastro");
                              }}
                              className="text-xs text-[#1683E8] hover:underline"
                            >
                              Editar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {uiState === "normal" && activeSection === "pessoas" && (
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-[#172033]">Cadastro de Pessoas & Oficinas</h1>
                <div className="bg-white border border-[#E4E7EC] rounded-xl shadow-xs overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F9FAFB] border-b border-[#E4E7EC] text-[#667085]">
                      <tr>
                        <th className="py-2.5 px-4">Código</th>
                        <th className="py-2.5 px-4">Nome / Razão</th>
                        <th className="py-2.5 px-4">Cidade/UF</th>
                        <th className="py-2.5 px-4 text-right">Limite de Crédito</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F4F7]">
                      {personsDatabase.map((p) => (
                        <tr key={p.id} className="hover:bg-[#F9FAFB]">
                          <td className="py-2.5 px-4 font-mono font-bold text-[#1683E8]">{p.codigo}</td>
                          <td className="py-2.5 px-4 font-semibold text-[#172033]">{p.nome}</td>
                          <td className="py-2.5 px-4">{p.cidade}/{p.uf}</td>
                          <td className="py-2.5 px-4 text-right font-mono font-bold">R$ {p.limiteCredito.toFixed(2).replace(".", ",")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {uiState === "normal" && activeSection === "vendas" && (
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-[#172033]">Balcão Rápido de Vendas</h1>
                <div className="bg-white border border-[#E4E7EC] rounded-xl p-4 space-y-3">
                  <span className="text-xs text-[#667085]">Terminal PDV #01 • Atendente: Marcus Ritta</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Pesquisar por placa ou código..."
                      value={vehiclePlateSearch}
                      onChange={(e) => setVehiclePlateSearch(e.target.value)}
                      className="border p-2 rounded text-xs w-64"
                    />
                    <AlfaButton variant="primary" size="sm" onClick={() => addToast("info", "Peças compatíveis filtradas.")}>
                      Filtrar por Placa
                    </AlfaButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 5. SPRINT 3 ITEM 5: DRAWER DE DETALHE DA SUGESTÃO DE COMPRA           */}
      {/* ===================================================================== */}
      <AlfaDrawer
        isOpen={Boolean(selectedSuggestionDetail)}
        title={selectedSuggestionDetail ? `${selectedSuggestionDetail.codigo} — Detalhe da Sugestão` : ""}
        subtitle="Análise preditiva de giro e justificativa técnica do ALFA"
        onClose={() => setSelectedSuggestionDetail(null)}
        width="w-[480px]"
      >
        {selectedSuggestionDetail && (
          <div className="space-y-5 text-xs">
            {/* Informações Básicas do Produto */}
            <div className="space-y-1">
              <span className="text-[10px] text-[#667085] font-bold uppercase">Produto</span>
              <h4 className="text-base font-bold text-[#172033]">{selectedSuggestionDetail.produto}</h4>
              <p className="text-[#667085]">
                Marca: <strong>{selectedSuggestionDetail.marca}</strong> • Categoria: {selectedSuggestionDetail.categoria}
              </p>
            </div>

            {/* Parâmetros de Estoque */}
            <div className="grid grid-cols-3 gap-2.5 p-3 bg-[#F9FAFB] rounded-xl border border-[#E4E7EC]">
              <div>
                <span className="text-[10px] text-[#667085] block">Estoque Atual</span>
                <strong className={`text-sm font-bold font-mono ${selectedSuggestionDetail.estoqueAtual <= 0 ? "text-[#DC2626]" : "text-[#B54708]"}`}>
                  {selectedSuggestionDetail.estoqueAtual} un
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-[#667085] block">Estoque Mínimo</span>
                <strong className="text-sm font-bold font-mono text-[#172033]">
                  {selectedSuggestionDetail.estoqueMin} un
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-[#667085] block">Estoque Máximo</span>
                <strong className="text-sm font-bold font-mono text-[#172033]">
                  {selectedSuggestionDetail.estoqueMax} un
                </strong>
              </div>
            </div>

            {/* Vendas & Custo */}
            <div className="grid grid-cols-3 gap-2.5 p-3 bg-[#F9FAFB] rounded-xl border border-[#E4E7EC]">
              <div>
                <span className="text-[10px] text-[#667085] block">Média de Vendas</span>
                <strong className="text-sm font-bold text-[#172033]">
                  {selectedSuggestionDetail.mediaVendas}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-[#667085] block">Última Compra</span>
                <strong className="text-xs text-[#172033]">
                  {selectedSuggestionDetail.ultimaCompraData}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-[#667085] block">Último Custo</span>
                <strong className="text-sm font-bold font-mono text-[#1683E8]">
                  R$ {selectedSuggestionDetail.ultimoCusto.toFixed(2).replace(".", ",")}
                </strong>
              </div>
            </div>

            {/* Fornecedor Habitual */}
            <div className="flex justify-between items-center p-3 bg-white border border-[#E4E7EC] rounded-xl">
              <div>
                <span className="text-[10px] text-[#667085] block">Fornecedor Habitual</span>
                <strong className="text-xs text-[#172033]">{selectedSuggestionDetail.fornecedorHabitual}</strong>
              </div>
              <AlfaBadge variant="primary">Disponível</AlfaBadge>
            </div>

            {/* Histórico Simplificado de Compras */}
            <div className="space-y-2">
              <span className="text-[10px] text-[#667085] font-bold uppercase block">
                Histórico Simplificado de Compras Anteriores
              </span>
              <div className="border border-[#E4E7EC] rounded-lg overflow-hidden divide-y divide-[#F2F4F7]">
                {selectedSuggestionDetail.historicoCompras.map((h, i) => (
                  <div key={i} className="p-2.5 flex justify-between items-center">
                    <div>
                      <strong className="text-[#172033] font-mono mr-2">Compra {h.numero}</strong>
                      <span className="text-[#667085]">{h.quantidade} unidades</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-[#172033]">
                        R$ {h.valorUnitario.toFixed(2).replace(".", ",")}
                      </span>
                      <span className="block text-[10px] text-[#98A2B3]">{h.data}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SPRINT 3 ITEM 5: Seção "POR QUE O SISTEMA SUGERIU ESTA COMPRA?" */}
            <div className="p-4 bg-[#EAF7EE] border border-[#A8E6BE] rounded-xl space-y-2 text-[#027A48]">
              <strong className="block text-xs uppercase font-bold tracking-wider">
                POR QUE O SISTEMA SUGERIU ESTA COMPRA?
              </strong>
              <div className="space-y-1 text-xs">
                {selectedSuggestionDetail.justificativas.map((j, i) => (
                  <div key={i} className="flex items-center gap-1.5 font-medium">
                    <span>{j}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Botões do Drawer */}
            <div className="flex gap-2 pt-2 border-t border-[#E4E7EC]">
              <AlfaButton
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => setSelectedSuggestionDetail(null)}
              >
                Fechar
              </AlfaButton>
              <AlfaButton
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={() => {
                  if (!selectedSuggestionIds.includes(selectedSuggestionDetail.id)) {
                    setSelectedSuggestionIds((prev) => [...prev, selectedSuggestionDetail.id]);
                  }
                  setSelectedSuggestionDetail(null);
                  setActiveSection("cotacao");
                  addToast("success", `✓ ${selectedSuggestionDetail.produto} adicionado à cotação!`);
                }}
              >
                Adicionar à Cotação →
              </AlfaButton>
            </div>
          </div>
        )}
      </AlfaDrawer>

      {/* ===================================================================== */}
      {/* 6. MODAL DE CONFIRMAÇÃO DE GERAÇÃO DA ORDEM DE COMPRA (ITEM 7)       */}
      {/* ===================================================================== */}
      <AlfaModal
        isOpen={createPoModalOpen}
        title="Confirmar Criação da Ordem de Compra"
        subtitle="Os produtos serão vinculados à proposta homologada do fornecedor"
        onClose={() => setCreatePoModalOpen(false)}
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-[#F9FAFB] rounded-lg border border-[#E4E7EC] space-y-2">
            <div className="flex justify-between">
              <span className="text-[#667085]">Fornecedor Selecionado:</span>
              <strong className="text-[#172033]">{activeQuotationSupplier.nome}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#667085]">Prazo de Entrega:</span>
              <strong className="text-[#172033]">{activeQuotationSupplier.prazo}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#667085]">Frete:</span>
              <strong className="text-[#16A34A]">{activeQuotationSupplier.freteTexto}</strong>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-[#E4E7EC]">
              <span className="font-bold text-[#172033]">Valor Total da Ordem:</span>
              <strong className="text-[#1683E8] font-mono tabular-nums text-base">
                R$ {activeQuotationSupplier.precoTotal.toFixed(2).replace(".", ",")}
              </strong>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#E4E7EC]">
            <AlfaButton variant="secondary" size="sm" onClick={() => setCreatePoModalOpen(false)}>
              Cancelar
            </AlfaButton>
            <AlfaButton variant="primary" size="sm" onClick={handleConfirmCreatePo}>
              Confirmar Ordem (OC #00183)
            </AlfaButton>
          </div>
        </div>
      </AlfaModal>

      {/* ===================================================================== */}
      {/* 7. MODAL DE ATALHOS DO TECLADO                                        */}
      {/* ===================================================================== */}
      <AlfaModal
        isOpen={shortcutsModalOpen}
        title="Atalhos do Teclado — ALFA ERP"
        subtitle="Agilidade operacional para atendimento rápido e rotinas de balcão"
        onClose={() => setShortcutsModalOpen(false)}
      >
        <div className="space-y-2.5 text-xs">
          {[
            { key: "Ctrl + K", desc: "Abrir Busca Global de Peças, Cotações e Ordens" },
            { key: "Ctrl + N", desc: "Cadastrar Novo Item de Estoque" },
            { key: "F2", desc: "Ação Rápida (Salvar Item / Concluir Venda Balcão)" },
            { key: "Esc", desc: "Fechar Modais, Drawers e Menus Abertos" },
            { key: "Enter", desc: "Confirmar Ação / Selecionar Produto" },
          ].map((sc, i) => (
            <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-[#F9FAFB] border border-[#E4E7EC]">
              <span className="text-[#344054] font-medium">{sc.desc}</span>
              <kbd className="px-2 py-0.5 rounded font-mono font-bold bg-white text-[#1683E8] border border-[#E4E7EC] shadow-xs">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>
      </AlfaModal>

      {/* ===================================================================== */}
      {/* 8. MODAL DO DESIGN SYSTEM AUDIT & TOKENS                              */}
      {/* ===================================================================== */}
      <AlfaModal
        isOpen={designSystemModalOpen}
        title="Design System & Tokens — ALFA ERP"
        subtitle="Especificações formais de tokens, componentes e estados de interface"
        onClose={() => setDesignSystemModalOpen(false)}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-5 text-xs max-h-[70vh] overflow-y-auto pr-1">
          {/* Paleta de Cores */}
          <div>
            <h4 className="font-bold text-xs uppercase text-[#98A2B3] tracking-wider mb-2">
              Paleta de Tokens Oficiais
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { name: "Primary", hex: ALFA_TOKENS.colors.primary, bg: "bg-[#1683E8] text-white" },
                { name: "Primary Dark", hex: ALFA_TOKENS.colors.primaryDark, bg: "bg-[#123B63] text-white" },
                { name: "Primary Light", hex: ALFA_TOKENS.colors.primaryLight, bg: "bg-[#EAF4FF] text-[#1683E8]" },
                { name: "Background", hex: ALFA_TOKENS.colors.background, bg: "bg-[#F5F7FA] text-[#172033]" },
                { name: "Surface", hex: ALFA_TOKENS.colors.surface, bg: "bg-white text-[#172033] border" },
                { name: "Text", hex: ALFA_TOKENS.colors.text, bg: "bg-[#172033] text-white" },
                { name: "Text Secondary", hex: ALFA_TOKENS.colors.textSecondary, bg: "bg-[#667085] text-white" },
                { name: "Border", hex: ALFA_TOKENS.colors.border, bg: "bg-[#E4E7EC] text-[#172033]" },
                { name: "Success", hex: ALFA_TOKENS.colors.success, bg: "bg-[#16A34A] text-white" },
                { name: "Warning", hex: ALFA_TOKENS.colors.warning, bg: "bg-[#F59E0B] text-white" },
                { name: "Danger", hex: ALFA_TOKENS.colors.danger, bg: "bg-[#DC2626] text-white" },
              ].map((c) => (
                <div key={c.name} className={`p-2.5 rounded-lg font-mono text-[11px] ${c.bg}`}>
                  <strong className="block font-sans text-xs">{c.name}</strong>
                  <span>{c.hex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AlfaModal>

      {/* ===================================================================== */}
      {/* 9. DRAWER DE EXTRATO KARDEX DE ESTOQUE                                */}
      {/* ===================================================================== */}
      <AlfaDrawer
        isOpen={Boolean(kardexItem)}
        title={kardexItem ? `Extrato Kardex • ${kardexItem.codigo}` : ""}
        subtitle="Movimentações físicas e contábeis registradas pelo sistema"
        onClose={() => setKardexItem(null)}
        width="w-[500px]"
      >
        {kardexItem && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-[#EAF4FF] rounded-lg border border-[#B2D7FF]">
              <strong className="block text-[#123B63] font-bold">{kardexItem.item}</strong>
              <span className="text-[11px] text-[#667085]">
                Saldo Atual: <strong>{kardexItem.estoque} un</strong> • Custo Médio: <strong>R$ {kardexItem.custoMedio.toFixed(2).replace(".", ",")}</strong>
              </span>
            </div>

            <div className="space-y-2">
              {kardexMovements.map((k) => (
                <div key={k.id} className="p-3 bg-white border border-[#E4E7EC] rounded-lg space-y-1">
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                        k.tipo === "ENTRADA"
                          ? "bg-[#EAF7EE] text-[#16A34A]"
                          : k.tipo === "SAIDA"
                          ? "bg-[#FEF3F2] text-[#B42318]"
                          : "bg-[#FEF7E6] text-[#B54708]"
                      }`}
                    >
                      {k.tipo}: {k.quantidade > 0 ? `+${k.quantidade}` : k.quantidade} un
                    </span>
                    <span className="text-[10px] text-[#667085] font-mono">{k.data}</span>
                  </div>
                  <div className="font-semibold text-[#172033]">{k.origemDestino}</div>
                  <div className="flex justify-between text-[11px] text-[#667085] pt-1 border-t border-[#F2F4F7]">
                    <span>Doc: {k.documento}</span>
                    <span>Saldo Após: <strong className="text-[#172033]">{k.saldoApos} un</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </AlfaDrawer>

      {/* ===================================================================== */}
      {/* 10. FLOATING TOASTS NOTIFICATIONS CONTAINER                           */}
      {/* ===================================================================== */}
      <AlfaToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
