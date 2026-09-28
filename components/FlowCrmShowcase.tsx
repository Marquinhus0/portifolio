"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Building2,
  Users,
  Calendar,
  DollarSign,
  Clock,
  ArrowRight,
  Search,
  Plus,
  FileText,
  AlertTriangle,
  Sparkles,
  Phone,
  Mail,
  Activity,
  TrendingUp,
  BarChart3,
  Filter,
  Check,
  ExternalLink,
  ChevronRight,
  MoreHorizontal,
  ChevronDown,
  Target,
  FileCheck,
  Download,
  Layers,
  Award,
  MessageSquare,
  Send,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Settings,
  Bell,
  SlidersHorizontal,
  Kanban as KanbanIcon,
  Briefcase,
  Store,
  MapPin,
  RefreshCw,
  Copy,
  ChevronLeft,
  X,
  UserCheck,
  Smartphone,
  Shield,
  FileSpreadsheet,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Bot,
  Flame,
  Truck,
  Wrench,
  Package,
} from "lucide-react";

import {
  CrmLead,
  CrmDeal,
  CrmTask,
  CrmActivity,
  CrmCompany,
  CrmProposal,
  CrmAutomationRule,
  CrmStageId,
  AutomotiveSegment,
  LeadSource,
  AlfaErpModule,
  INITIAL_LEADS,
  INITIAL_DEALS,
  INITIAL_TASKS,
  INITIAL_ACTIVITIES,
  INITIAL_COMPANIES,
  INITIAL_PROPOSALS,
  INITIAL_AUTOMATIONS,
  LOSS_REASONS,
  WHATSAPP_TEMPLATES,
} from "@/data/alfaFlowCrmData";

// ============================================================================
// STAGE CONFIGURATION (7 core stages from brief)
// ============================================================================
interface StageConfig {
  id: CrmStageId;
  name: string;
  shortName: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  convRate: string;
}

const STAGES: StageConfig[] = [
  {
    id: "novo_lead",
    name: "Novo Lead",
    shortName: "Novo",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    badgeText: "text-blue-700",
    borderColor: "border-blue-400",
    convRate: "66%",
  },
  {
    id: "qualificacao",
    name: "Qualificação",
    shortName: "Qualif.",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    badgeText: "text-indigo-700",
    borderColor: "border-indigo-400",
    convRate: "64%",
  },
  {
    id: "contato",
    name: "Contato Realizado",
    shortName: "Contato",
    badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
    badgeText: "text-sky-700",
    borderColor: "border-sky-400",
    convRate: "81%",
  },
  {
    id: "oportunidade",
    name: "Oportunidade",
    shortName: "Oportun.",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    badgeText: "text-amber-700",
    borderColor: "border-amber-400",
    convRate: "66%",
  },
  {
    id: "proposta",
    name: "Proposta",
    shortName: "Proposta",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    badgeText: "text-purple-700",
    borderColor: "border-purple-400",
    convRate: "66%",
  },
  {
    id: "negociacao",
    name: "Negociação",
    shortName: "Negoc.",
    badgeBg: "bg-orange-50 text-orange-700 border-orange-200",
    badgeText: "text-orange-700",
    borderColor: "border-orange-400",
    convRate: "62%",
  },
  {
    id: "ganho",
    name: "Fechamento (Ganho)",
    shortName: "Ganho",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badgeText: "text-emerald-700",
    borderColor: "border-emerald-500",
    convRate: "100%",
  },
];

const ALL_ALFA_MODULES: AlfaErpModule[] = [
  "ERP AutoPeças (Core)",
  "Balcão PDV Rápido",
  "Estoque & Curva ABC",
  "Compras Inteligentes",
  "Financeiro Avançado",
  "B2B E-commerce de Peças",
  "BI & Métricas Gerenciais",
  "Fiscal & SPED Automotivo",
  "CRM Flow Integrado",
];

export default function FlowCrmShowcase() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "kanban"
    | "leads"
    | "oportunidades"
    | "tarefas"
    | "atividades"
    | "agenda"
    | "empresas"
    | "contatos"
    | "propostas"
    | "clientes"
    | "relatorios"
    | "automacao"
  >("dashboard");

  // Core Data State
  const [leads, setLeads] = useState<CrmLead[]>(INITIAL_LEADS);
  const [deals, setDeals] = useState<CrmDeal[]>(INITIAL_DEALS);
  const [tasks, setTasks] = useState<CrmTask[]>(INITIAL_TASKS);
  const [activities, setActivities] = useState<CrmActivity[]>(INITIAL_ACTIVITIES);
  const [companies] = useState<CrmCompany[]>(INITIAL_COMPANIES);
  const [proposals] = useState<CrmProposal[]>(INITIAL_PROPOSALS);
  const [automations, setAutomations] = useState<CrmAutomationRule[]>(INITIAL_AUTOMATIONS);

  // Global Filters
  const [filterPeriod, setFilterPeriod] = useState<string>("Este mês");
  const [filterRep, setFilterRep] = useState<string>("Todos os vendedores");
  const [filterSource, setFilterSource] = useState<string>("Todas as origens");
  const [filterPipeline, setFilterPipeline] = useState<string>("Pipeline Comercial ERP");

  // Leads Screen Filters
  const [leadSearchQuery, setLeadSearchQuery] = useState<string>("");
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>("all");
  const [leadSegmentFilter, setLeadSegmentFilter] = useState<string>("all");

  // Selected Entities & Drawers
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(null);
  const [activeLeadDrawer, setActiveLeadDrawer] = useState<boolean>(false);
  const [drawerTab, setDrawerTab] = useState<"timeline" | "empresa" | "modulos">("timeline");
  const [newNoteText, setNewNoteText] = useState<string>("");

  // Modals
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState<boolean>(false);
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState<boolean>(false);
  const [isLossReasonModalOpen, setIsLossReasonModalOpen] = useState<boolean>(false);
  const [dealToMarkLost, setDealToMarkLost] = useState<CrmDeal | null>(null);
  const [selectedLossReason, setSelectedLossReason] = useState<string>("preco");
  const [lossObservation, setLossObservation] = useState<string>("");

  // Communication Simulation Modals
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState<boolean>(false);
  const [activeWhatsAppLead, setActiveWhatsAppLead] = useState<CrmLead | null>(null);
  const [selectedWaTemplate, setSelectedWaTemplate] = useState<string>("apresentacao");
  const [callModalOpen, setCallModalOpen] = useState<boolean>(false);
  const [activeCallLead, setActiveCallLead] = useState<CrmLead | null>(null);
  const [callOutcome, setCallOutcome] = useState<string>("reuniao");
  const [callNotes, setCallNotes] = useState<string>("");

  // Quick Action Dropdown & Notification Popover
  const [isQuickAddOpen, setIsQuickAddOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  // Global Search (Ctrl + K)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>("");

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Keyboard shortcut for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsSearchModalOpen(false);
        setActiveLeadDrawer(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Format currency in BRL
  const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Calculated Pipeline Metrics
  const pipelineMetrics = useMemo(() => {
    const openDeals = deals.filter((d) => d.stageId !== "ganho" && d.stageId !== "perdido");
    const wonDeals = deals.filter((d) => d.stageId === "ganho");
    const totalPipelineValue = openDeals.reduce((sum, d) => sum + d.value, 0);
    const wonValue = wonDeals.reduce((sum, d) => sum + d.value, 0);
    const avgTicket = openDeals.length > 0 ? totalPipelineValue / openDeals.length : 11900;
    const leadsReceived = leads.length + 238; // 248 benchmark
    const qualifiedLeads = leads.filter((l) => l.status === "Oportunidade" || l.status === "Qualificação").length + 78;
    const conversionRate = 18.4;

    return {
      totalPipelineValue,
      openDealsCount: openDeals.length + 30, // 36 benchmark
      wonValue: wonValue + 72000,
      wonCount: wonDeals.length + 4,
      avgTicket,
      leadsReceived,
      qualifiedLeads,
      conversionRate,
      pendingTasksToday: tasks.filter((t) => !t.completed).length,
    };
  }, [deals, leads, tasks]);

  // Drag and Drop for Kanban
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    e.dataTransfer.setData("text/plain", dealId);
    setDraggedDealId(dealId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStageId: CrmStageId) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData("text/plain") || draggedDealId;
    if (!dealId) return;

    if (targetStageId === "perdido") {
      const deal = deals.find((d) => d.id === dealId);
      if (deal) {
        setDealToMarkLost(deal);
        setIsLossReasonModalOpen(true);
      }
      return;
    }

    setDeals((prev) =>
      prev.map((d) => {
        if (d.id === dealId) {
          const updated: CrmDeal = {
            ...d,
            stageId: targetStageId,
            daysInStage: 0,
            lastActivity: "Agora há pouco",
          };
          // add activity
          const stageName = STAGES.find((s) => s.id === targetStageId)?.name || targetStageId;
          const newAct: CrmActivity = {
            id: `act-${Date.now()}`,
            type: "stage_change",
            title: `Estágio alterado para ${stageName}`,
            description: `Marcus Henrique moveu a oportunidade ${d.company} para o estágio ${stageName}.`,
            company: d.company,
            author: "Marcus Henrique",
            timestamp: "Agora",
            timeAgo: "há instantes",
            badge: stageName,
          };
          setActivities((a) => [newAct, ...a]);
          return updated;
        }
        return d;
      })
    );

    showToast("Oportunidade movida de estágio com sucesso!");
    setDraggedDealId(null);
  };

  // Toggle task completion
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextState = !t.completed;
          if (nextState) {
            showToast(`Follow-up concluído: "${t.title}"`);
          }
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  // Handle Loss Reason Submission
  const handleConfirmLoss = () => {
    if (!dealToMarkLost) return;
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id === dealToMarkLost.id) {
          return {
            ...d,
            stageId: "perdido",
            lossReason: selectedLossReason,
            lossObservation,
            closedAt: new Date().toISOString(),
          };
        }
        return d;
      })
    );

    const reasonLabel = LOSS_REASONS.find((r) => r.id === selectedLossReason)?.label || selectedLossReason;
    const newAct: CrmActivity = {
      id: `act-${Date.now()}`,
      type: "stage_change",
      title: "Oportunidade marcada como Perdida",
      description: `Motivo: ${reasonLabel}. Obs: ${lossObservation || "Sem observações adicionais"}`,
      company: dealToMarkLost.company,
      author: "Marcus Henrique",
      timestamp: "Agora",
      timeAgo: "há instantes",
      badge: "Perdido",
    };
    setActivities((a) => [newAct, ...a]);

    showToast("Motivo de perda registrado no relatório comercial.");
    setIsLossReasonModalOpen(false);
    setDealToMarkLost(null);
    setLossObservation("");
  };

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    company: "",
    phone: "",
    whatsapp: "",
    email: "",
    city: "",
    state: "SP",
    segment: "Varejo de Autopeças" as AutomotiveSegment,
    storesCount: 1,
    source: "Google Ads" as LeadSource,
    campaign: "Campanha Balcão Rápido ERP",
    owner: "João Silva",
    dealValue: 15000,
    interestModules: ["ERP AutoPeças (Core)", "Balcão PDV Rápido"] as AlfaErpModule[],
    notes: "",
  });

  const handleSaveNewLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.company) {
      alert("Por favor preencha o Nome e a Empresa.");
      return;
    }

    const createdLead: CrmLead = {
      id: `lead-${Date.now()}`,
      name: newLeadForm.name,
      role: "Decisor / Gerente",
      company: newLeadForm.company,
      cnpj: "00.000.000/0001-00",
      phone: newLeadForm.phone || "(11) 3300-0000",
      whatsapp: newLeadForm.whatsapp || "(11) 99000-0000",
      email: newLeadForm.email || "contato@" + newLeadForm.company.toLowerCase().replace(/\s+/g, "") + ".com.br",
      city: newLeadForm.city || "São Paulo",
      state: newLeadForm.state,
      segment: newLeadForm.segment,
      storesCount: Number(newLeadForm.storesCount) || 1,
      source: newLeadForm.source,
      campaign: newLeadForm.campaign,
      owner: newLeadForm.owner,
      ownerAvatar: newLeadForm.owner
        .split(" ")
        .map((n) => n[0])
        .join(""),
      status: "Novo",
      interestModules: newLeadForm.interestModules,
      dealValue: Number(newLeadForm.dealValue) || 12000,
      lastContact: "Hoje, agora",
      nextAction: "Realizar primeiro contato de qualificação",
      nextActionDate: "Hoje, em 15 min",
      priority: "Alta",
      notes: newLeadForm.notes || "Lead cadastrado via formulário de entrada.",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setLeads((prev) => [createdLead, ...prev]);

    // Also create corresponding deal in pipeline
    const createdDeal: CrmDeal = {
      id: `deal-${Date.now()}`,
      title: `Implantação ALFA ERP — ${createdLead.company}`,
      company: createdLead.company,
      contactName: createdLead.name,
      contactRole: createdLead.role,
      contactPhone: createdLead.whatsapp,
      contactEmail: createdLead.email,
      segment: createdLead.segment,
      storesCount: createdLead.storesCount,
      city: createdLead.city,
      state: createdLead.state,
      value: createdLead.dealValue,
      probability: 40,
      weightedValue: createdLead.dealValue * 0.4,
      stageId: "novo_lead",
      owner: createdLead.owner,
      ownerAvatar: createdLead.ownerAvatar,
      source: createdLead.source,
      campaign: createdLead.campaign,
      daysInStage: 0,
      lastActivity: "Cadastrado agora",
      nextAction: createdLead.nextAction,
      nextActionDate: createdLead.nextActionDate,
      health: "on-track",
      interestModules: createdLead.interestModules,
    };
    setDeals((prev) => [createdDeal, ...prev]);

    // Add activity
    const newAct: CrmActivity = {
      id: `act-${Date.now()}`,
      type: "note",
      title: "Novo Lead Cadastrado no Flow CRM",
      description: `${createdLead.name} (${createdLead.company}, ${createdLead.storesCount} loja(s)) cadastrado por Marcus Henrique.`,
      company: createdLead.company,
      contact: createdLead.name,
      author: "Marcus Henrique",
      timestamp: "Agora",
      timeAgo: "há instantes",
      badge: "Novo Lead",
    };
    setActivities((prev) => [newAct, ...prev]);

    setIsNewLeadModalOpen(false);
    showToast(`Lead "${createdLead.name}" salvo com sucesso!`);

    // Rule: "Após salvar: abrir automaticamente o perfil do lead"
    setSelectedLead(createdLead);
    setActiveLeadDrawer(true);
  };

  // Add note to lead timeline
  const handleAddNoteToLead = () => {
    if (!newNoteText.trim() || !selectedLead) return;
    const newAct: CrmActivity = {
      id: `act-${Date.now()}`,
      type: "note",
      title: "Nota interna adicionada",
      description: newNoteText,
      company: selectedLead.company,
      contact: selectedLead.name,
      author: "Marcus Henrique",
      timestamp: "Hoje, " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      timeAgo: "há instantes",
      badge: "Nota",
    };
    setActivities((prev) => [newAct, ...prev]);
    setNewNoteText("");
    showToast("Nota adicionada ao histórico do lead!");
  };

  // Register Call simulation
  const handleSaveCallLog = () => {
    if (!activeCallLead) return;
    const newAct: CrmActivity = {
      id: `act-${Date.now()}`,
      type: "call",
      title: "Ligação comercial registrada",
      description: `Resultado: ${callOutcome === "reuniao" ? "Demonstração agendada com sucesso" : callOutcome === "atendido" ? "Contato produtivo realizado" : "Tentativa sem resposta"}. Detalhes: ${callNotes || "Alinhamento com decisor da loja de autopeças."}`,
      company: activeCallLead.company,
      contact: activeCallLead.name,
      author: "Marcus Henrique",
      timestamp: "Hoje, " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      timeAgo: "há instantes",
      badge: "Ligação",
    };
    setActivities((prev) => [newAct, ...prev]);
    setCallModalOpen(false);
    setCallNotes("");
    showToast(`Ligação registrada para ${activeCallLead.name}`);
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchSearch =
        l.name.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        l.company.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        l.city.toLowerCase().includes(leadSearchQuery.toLowerCase());
      const matchStatus = leadStatusFilter === "all" || l.status === leadStatusFilter;
      const matchSegment = leadSegmentFilter === "all" || l.segment === leadSegmentFilter;
      const matchRep = filterRep === "Todos os vendedores" || l.owner === filterRep;
      const matchSource = filterSource === "Todas as origens" || l.source === filterSource;
      return matchSearch && matchStatus && matchSegment && matchRep && matchSource;
    });
  }, [leads, leadSearchQuery, leadStatusFilter, leadSegmentFilter, filterRep, filterSource]);

  // Global Search Results
  const globalSearchResults = useMemo(() => {
    if (!globalSearchQuery.trim()) return [];
    const query = globalSearchQuery.toLowerCase();
    const resLeads = leads
      .filter((l) => l.name.toLowerCase().includes(query) || l.company.toLowerCase().includes(query))
      .map((l) => ({ type: "Lead", title: l.name, subtitle: `${l.company} · ${l.city}/${l.state}`, raw: l }));
    const resCompanies = companies
      .filter((c) => c.name.toLowerCase().includes(query))
      .map((c) => ({ type: "Empresa", title: c.name, subtitle: `${c.segment} · ${c.storesCount} loja(s)`, raw: c }));
    const resDeals = deals
      .filter((d) => d.company.toLowerCase().includes(query) || d.title.toLowerCase().includes(query))
      .map((d) => ({ type: "Oportunidade", title: d.company, subtitle: `${formatBRL(d.value)} · ${d.stageId}`, raw: d }));
    return [...resLeads, ...resCompanies, ...resDeals].slice(0, 8);
  }, [globalSearchQuery, leads, companies, deals]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#172033] font-sans antialiased flex flex-col selection:bg-[#1683E8]/20 selection:text-[#123B63]">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#123B63] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-200 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-[#1683E8]" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Container Layout */}
      <div className="flex flex-1 min-h-screen">
        {/* ==================================================================== */}
        {/* SIDEBAR                                                              */}
        {/* ==================================================================== */}
        <aside className="w-64 bg-white border-r border-[#E4E7EC] flex flex-col shrink-0 sticky top-0 h-screen z-30 select-none shadow-sm">
          {/* Logo / Brand Header */}
          <div className="p-5 border-b border-[#E4E7EC] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1683E8] to-[#123B63] flex items-center justify-center text-white font-black text-sm tracking-wider shadow-md shadow-[#1683E8]/25">
                AF
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[15px] tracking-tight text-[#172033]">
                    FLOW CRM
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#EAF4FF] text-[#1683E8] border border-[#1683E8]/20">
                    B2B
                  </span>
                </div>
                <p className="text-[11px] text-[#667085] font-medium leading-none mt-0.5">
                  ALFA ERP AutoPeças
                </p>
              </div>
            </div>
          </div>

          {/* Quick Module Status Banner */}
          <div className="px-4 py-2 bg-[#F8FAFC] border-b border-[#E4E7EC] flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2 text-[#667085]">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
              <span className="font-medium">ALFA ERP Conectado</span>
            </div>
            <span className="text-[10px] font-mono text-[#1683E8] font-semibold bg-[#EAF4FF] px-1.5 py-0.5 rounded">
              v3.4
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto text-xs font-medium">
            <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
              Comercial & Funil
            </div>

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                activeTab === "dashboard"
                  ? "bg-[#EAF4FF] text-[#1683E8] font-semibold shadow-xs"
                  : "text-[#667085] hover:bg-[#F5F7FA] hover:text-[#172033]"
              }`}
            >
              <BarChart3 className={`w-4 h-4 ${activeTab === "dashboard" ? "text-[#1683E8]" : "text-[#98A2B3]"}`} />
              <span className="flex-1">Dashboard</span>
              {activeTab === "dashboard" && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#1683E8]"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("kanban")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                activeTab === "kanban"
                  ? "bg-[#EAF4FF] text-[#1683E8] font-semibold shadow-xs"
                  : "text-[#667085] hover:bg-[#F5F7FA] hover:text-[#172033]"
              }`}
            >
              <KanbanIcon className={`w-4 h-4 ${activeTab === "kanban" ? "text-[#1683E8]" : "text-[#98A2B3]"}`} />
              <span className="flex-1">Funil Comercial</span>
              <span className="text-[10px] bg-slate-100 text-[#667085] px-1.5 py-0.5 rounded font-mono font-bold">
                {deals.filter((d) => d.stageId !== "perdido").length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                activeTab === "leads"
                  ? "bg-[#EAF4FF] text-[#1683E8] font-semibold shadow-xs"
                  : "text-[#667085] hover:bg-[#F5F7FA] hover:text-[#172033]"
              }`}
            >
              <Users className={`w-4 h-4 ${activeTab === "leads" ? "text-[#1683E8]" : "text-[#98A2B3]"}`} />
              <span className="flex-1">Leads</span>
              <span className="text-[10px] bg-blue-100 text-[#1683E8] px-1.5 py-0.5 rounded font-bold">
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("oportunidades")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                activeTab === "oportunidades"
                  ? "bg-[#EAF4FF] text-[#1683E8] font-semibold shadow-xs"
                  : "text-[#667085] hover:bg-[#F5F7FA] hover:text-[#172033]"
              }`}
            >
              <Target className={`w-4 h-4 ${activeTab === "oportunidades" ? "text-[#1683E8]" : "text-[#98A2B3]"}`} />
              <span className="flex-1">Oportunidades</span>
            </button>

            <div className="pt-3 px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
              Rotina do Vendedor
            </div>

            <button
              onClick={() => setActiveTab("tarefas")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                activeTab === "tarefas"
                  ? "bg-[#EAF4FF] text-[#1683E8] font-semibold shadow-xs"
                  : "text-[#667085] hover:bg-[#F5F7FA] hover:text-[#172033]"
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${activeTab === "tarefas" ? "text-[#1683E8]" : "text-[#98A2B3]"}`} />
              <span className="flex-1">Tarefas & Follow-up</span>
              {tasks.filter((t) => !t.completed).length > 0 && (
                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
                  {tasks.filter((t) => !t.completed).length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("atividades")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                activeTab === "atividades"
                  ? "bg-[#EAF4FF] text-[#1683E8] font-semibold shadow-xs"
                  : "text-[#667085] hover:bg-[#F5F7FA] hover:text-[#172033]"
              }`}
            >
              <Activity className={`w-4 h-4 ${activeTab === "atividades" ? "text-[#1683E8]" : "text-[#98A2B3]"}`} />
              <span className="flex-1">Atividades</span>
            </button>

            <button
              onClick={() => setActiveTab("agenda")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                activeTab === "agenda"
                  ? "bg-[#EAF4FF] text-[#1683E8] font-semibold shadow-xs"
                  : "text-[#667085] hover:bg-[#F5F7FA] hover:text-[#172033]"
              }`}
            >
              <Calendar className={`w-4 h-4 ${activeTab === "agenda" ? "text-[#1683E8]" : "text-[#98A2B3]"}`} />
              <span className="flex-1">Agenda Comercial</span>
            </button>

            <button
              onClick={() => setActiveTab("propostas")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                activeTab === "propostas"
                  ? "bg-[#EAF4FF] text-[#1683E8] font-semibold shadow-xs"
                  : "text-[#667085] hover:bg-[#F5F7FA] hover:text-[#172033]"
              }`}
            >
              <FileText className={`w-4 h-4 ${activeTab === "propostas" ? "text-[#1683E8]" : "text-[#98A2B3]"}`} />
              <span className="flex-1">Propostas ALFA ERP</span>
            </button>

            <div className="pt-3 px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
              Cadastros & Clientes
            </div>

            <button
              onClick={() => setActiveTab("empresas")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                activeTab === "empresas"
                  ? "bg-[#EAF4FF] text-[#1683E8] font-semibold shadow-xs"
                  : "text-[#667085] hover:bg-[#F5F7FA] hover:text-[#172033]"
              }`}
            >
              <Store className={`w-4 h-4 ${activeTab === "empresas" ? "text-[#1683E8]" : "text-[#98A2B3]"}`} />
              <span className="flex-1">Empresas (Lojas/CDs)</span>
            </button>

            <button
              onClick={() => setActiveTab("contatos")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                activeTab === "contatos"
                  ? "bg-[#EAF4FF] text-[#1683E8] font-semibold shadow-xs"
                  : "text-[#667085] hover:bg-[#F5F7FA] hover:text-[#172033]"
              }`}
            >
              <UserCheck className={`w-4 h-4 ${activeTab === "contatos" ? "text-[#1683E8]" : "text-[#98A2B3]"}`} />
              <span className="flex-1">Contatos & Compradores</span>
            </button>

            <button
              onClick={() => setActiveTab("clientes")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                activeTab === "clientes"
                  ? "bg-[#EAF4FF] text-[#1683E8] font-semibold shadow-xs"
                  : "text-[#667085] hover:bg-[#F5F7FA] hover:text-[#172033]"
              }`}
            >
              <Award className={`w-4 h-4 ${activeTab === "clientes" ? "text-[#1683E8]" : "text-[#98A2B3]"}`} />
              <span className="flex-1">Clientes Convertidos</span>
            </button>

            <div className="pt-3 px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
              Gestão & Escala
            </div>

            <button
              onClick={() => setActiveTab("relatorios")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                activeTab === "relatorios"
                  ? "bg-[#EAF4FF] text-[#1683E8] font-semibold shadow-xs"
                  : "text-[#667085] hover:bg-[#F5F7FA] hover:text-[#172033]"
              }`}
            >
              <PieChart className={`w-4 h-4 ${activeTab === "relatorios" ? "text-[#1683E8]" : "text-[#98A2B3]"}`} />
              <span className="flex-1">Relatórios & Conversão</span>
            </button>

            <button
              onClick={() => setActiveTab("automacao")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                activeTab === "automacao"
                  ? "bg-[#EAF4FF] text-[#1683E8] font-semibold shadow-xs"
                  : "text-[#667085] hover:bg-[#F5F7FA] hover:text-[#172033]"
              }`}
            >
              <Bot className={`w-4 h-4 ${activeTab === "automacao" ? "text-[#1683E8]" : "text-[#98A2B3]"}`} />
              <span className="flex-1">Automação de Vendas</span>
            </button>
          </nav>

          {/* Sidebar Footer User Info */}
          <div className="p-3 border-t border-[#E4E7EC] bg-white">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F5F7FA] transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-[#123B63] text-white flex items-center justify-center font-bold text-xs">
                MH
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#172033] truncate">Marcus Henrique</p>
                <p className="text-[10px] text-[#667085] truncate">Product Designer & CRM</p>
              </div>
              <Settings className="w-3.5 h-3.5 text-[#98A2B3] hover:text-[#172033]" />
            </div>
          </div>
        </aside>

        {/* ==================================================================== */}
        {/* MAIN APPLICATION AREA                                                */}
        {/* ==================================================================== */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* ================================================================== */}
          {/* TOP APP HEADER                                                     */}
          {/* ================================================================== */}
          <header className="h-16 bg-white/95 backdrop-blur-md border-b border-[#E4E7EC] px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
            {/* Global Search Bar (Ctrl + K) */}
            <div className="flex items-center gap-4 flex-1 max-w-xl">
              <div
                onClick={() => setIsSearchModalOpen(true)}
                className="w-full flex items-center justify-between px-3.5 py-2 bg-[#F5F7FA] hover:bg-[#EAF4FF]/40 border border-[#E4E7EC] hover:border-[#1683E8]/40 rounded-xl text-xs text-[#667085] cursor-pointer transition-all shadow-2xs group"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-[#98A2B3] group-hover:text-[#1683E8]" />
                  <span>Buscar lead, empresa de autopeças ou oportunidade...</span>
                </div>
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold bg-white text-[#667085] border border-[#E4E7EC] rounded-md shadow-2xs">
                  ⌘ K
                </kbd>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              {/* Quick Add Button with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsQuickAddOpen(!isQuickAddOpen)}
                  className="h-9 px-3.5 bg-[#1683E8] hover:bg-[#123B63] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-[#1683E8]/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo</span>
                  <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
                </button>

                {isQuickAddOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#E4E7EC] py-1.5 z-40 animate-in fade-in duration-150 text-xs">
                    <button
                      onClick={() => {
                        setIsQuickAddOpen(false);
                        setIsNewLeadModalOpen(true);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-[#EAF4FF] text-[#172033] hover:text-[#1683E8] flex items-center gap-2 font-medium"
                    >
                      <Users className="w-3.5 h-3.5 text-[#1683E8]" />
                      <span>+ Novo Lead</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsQuickAddOpen(false);
                        setIsNewDealModalOpen(true);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-[#EAF4FF] text-[#172033] hover:text-[#1683E8] flex items-center gap-2 font-medium"
                    >
                      <Target className="w-3.5 h-3.5 text-[#1683E8]" />
                      <span>+ Nova Oportunidade</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsQuickAddOpen(false);
                        setActiveTab("tarefas");
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-[#EAF4FF] text-[#172033] hover:text-[#1683E8] flex items-center gap-2 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1683E8]" />
                      <span>+ Novo Follow-up</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsQuickAddOpen(false);
                        setActiveTab("propostas");
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-[#EAF4FF] text-[#172033] hover:text-[#1683E8] flex items-center gap-2 font-medium"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#1683E8]" />
                      <span>+ Nova Proposta ERP</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Notification Popover */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="w-9 h-9 border border-[#E4E7EC] hover:bg-[#F5F7FA] bg-white rounded-xl flex items-center justify-center text-[#667085] hover:text-[#172033] transition-colors relative"
                  title="Notificações Comerciais"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#DC2626] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    3
                  </span>
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#E4E7EC] p-3 z-40 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E4E7EC]">
                      <span className="text-xs font-bold text-[#172033]">Alertas do Time</span>
                      <span className="text-[10px] text-[#1683E8] cursor-pointer hover:underline">Marcar lidas</span>
                    </div>
                    <div className="py-2 space-y-2 text-xs">
                      <div className="p-2 bg-amber-50/70 border border-amber-200/60 rounded-lg">
                        <p className="font-semibold text-amber-900 text-[11px]">Follow-up Urgente</p>
                        <p className="text-[11px] text-amber-800">Auto Peças Silva aguarda retorno da proposta de curva ABC.</p>
                      </div>
                      <div className="p-2 bg-emerald-50/70 border border-emerald-200/60 rounded-lg">
                        <p className="font-semibold text-emerald-900 text-[11px]">Proposta Aprovada</p>
                        <p className="text-[11px] text-emerald-800">Distribuidora Real Autopeças aprovou setup de R$ 72.000!</p>
                      </div>
                      <div className="p-2 bg-blue-50/70 border border-blue-200/60 rounded-lg">
                        <p className="font-semibold text-blue-900 text-[11px]">Novo Lead Qualificado</p>
                        <p className="text-[11px] text-blue-800">Auto Center Brasil preencheu formulário de 6 lojas.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Help Button */}
              <button
                onClick={() => showToast("Central de Suporte & Treinamento ALFA ERP: 0800 400 9000")}
                className="w-9 h-9 border border-[#E4E7EC] hover:bg-[#F5F7FA] bg-white rounded-xl flex items-center justify-center text-[#667085] hover:text-[#172033] transition-colors"
                title="Ajuda & Base de Conhecimento"
              >
                <HelpCircle className="w-4 h-4" />
              </button>

              <div className="h-5 w-[1px] bg-[#E4E7EC] mx-1"></div>

              {/* User Avatar Mini */}
              <div className="flex items-center gap-2.5 pl-1">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#123B63] to-[#1683E8] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  MH
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-[#172033] leading-none">Marcus H.</div>
                  <div className="text-[10px] text-[#667085] mt-1 font-medium">Head Comercial</div>
                </div>
              </div>
            </div>
          </header>

          {/* ================================================================== */}
          {/* DYNAMIC VIEW ROUTING                                               */}
          {/* ================================================================== */}

          {/* VIEW 1: DASHBOARD (VISÃO COMERCIAL) */}
          {activeTab === "dashboard" && (
            <div className="p-8 max-w-[1720px] mx-auto w-full space-y-7 animate-in fade-in duration-200">
              {/* Page Title & Control Bar */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold text-[#1683E8] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span>FLOW CRM</span>
                    <span>•</span>
                    <span className="text-[#667085]">ECOSSISTEMA AUTOPEÇAS</span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-[#172033] tracking-tight">
                    Visão comercial
                  </h1>
                  <p className="text-xs text-[#667085] mt-1">
                    Acompanhe o desempenho do seu funil e da equipe comercial em tempo real.
                  </p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <select
                    value={filterPeriod}
                    onChange={(e) => setFilterPeriod(e.target.value)}
                    className="px-3 py-2 bg-white border border-[#E4E7EC] rounded-xl text-[#172033] font-medium hover:border-[#1683E8] transition-colors shadow-2xs outline-none cursor-pointer"
                  >
                    <option value="Hoje">Hoje</option>
                    <option value="Esta semana">Esta semana</option>
                    <option value="Este mês">Este mês</option>
                    <option value="Últimos 30 dias">Últimos 30 dias</option>
                    <option value="Este trimestre">Este trimestre</option>
                  </select>

                  <select
                    value={filterRep}
                    onChange={(e) => setFilterRep(e.target.value)}
                    className="px-3 py-2 bg-white border border-[#E4E7EC] rounded-xl text-[#172033] font-medium hover:border-[#1683E8] transition-colors shadow-2xs outline-none cursor-pointer"
                  >
                    <option value="Todos os vendedores">Todos os vendedores</option>
                    <option value="João Silva">João Silva</option>
                    <option value="Ana Souza">Ana Souza</option>
                    <option value="Carlos Ferreira">Carlos Ferreira</option>
                    <option value="Mariana Lima">Mariana Lima</option>
                  </select>

                  <select
                    value={filterSource}
                    onChange={(e) => setFilterSource(e.target.value)}
                    className="px-3 py-2 bg-white border border-[#E4E7EC] rounded-xl text-[#172033] font-medium hover:border-[#1683E8] transition-colors shadow-2xs outline-none cursor-pointer"
                  >
                    <option value="Todas as origens">Todas as origens</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="WhatsApp Balcão">WhatsApp Balcão</option>
                    <option value="Indicação de Loja">Indicação de Loja</option>
                    <option value="Evento / Automec">Evento / Automec</option>
                    <option value="Outbound / Balconista">Outbound / Balconista</option>
                  </select>

                  <button
                    onClick={() => setIsNewLeadModalOpen(true)}
                    className="px-4 py-2 bg-[#1683E8] hover:bg-[#123B63] text-white font-semibold rounded-xl shadow-sm shadow-[#1683E8]/25 flex items-center gap-1.5 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Novo Lead</span>
                  </button>
                </div>
              </div>

              {/* 8 Primary KPIs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* KPI 1: Pipeline em Negociação (Highlight) */}
                <div className="bg-gradient-to-br from-white via-white to-[#EAF4FF]/50 border border-[#1683E8]/30 rounded-2xl p-5 shadow-xs relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#1683E8] uppercase tracking-wider">
                      Pipeline Atual
                    </span>
                    <span className="p-1.5 rounded-lg bg-[#EAF4FF] text-[#1683E8]">
                      <DollarSign className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl font-black text-[#172033] mt-2 tracking-tight">
                    {formatBRL(pipelineMetrics.totalPipelineValue)}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[11px]">
                    <span className="text-[#16A34A] font-bold flex items-center">
                      <ArrowUpRight className="w-3 h-3" /> +18,2%
                    </span>
                    <span className="text-[#667085]">vs. mês anterior</span>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-[#1683E8]/10 pointer-events-none"></div>
                </div>

                {/* KPI 2: Leads Recebidos */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
                      Leads Recebidos
                    </span>
                    <span className="p-1.5 rounded-lg bg-slate-100 text-[#667085]">
                      <Users className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl font-black text-[#172033] mt-2 tracking-tight">
                    {pipelineMetrics.leadsReceived}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[11px]">
                    <span className="text-[#16A34A] font-bold flex items-center">
                      <ArrowUpRight className="w-3 h-3" /> +12,4%
                    </span>
                    <span className="text-[#667085]">27 esta semana</span>
                  </div>
                </div>

                {/* KPI 3: Leads Qualificados */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
                      Qualificados
                    </span>
                    <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                      <Target className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl font-black text-[#172033] mt-2 tracking-tight">
                    {pipelineMetrics.qualifiedLeads}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[11px]">
                    <span className="text-[#1683E8] font-bold">33,8%</span>
                    <span className="text-[#667085]">taxa de qualificação</span>
                  </div>
                </div>

                {/* KPI 4: Oportunidades Abertas */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
                      Oportunidades
                    </span>
                    <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                      <Briefcase className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl font-black text-[#172033] mt-2 tracking-tight">
                    {pipelineMetrics.openDealsCount}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[11px]">
                    <span className="text-amber-600 font-bold">R$ 11.900</span>
                    <span className="text-[#667085]">ticket médio</span>
                  </div>
                </div>

                {/* KPI 5: Conversão Comercial */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
                      Conversão Geral
                    </span>
                    <span className="p-1.5 rounded-lg bg-emerald-50 text-[#16A34A]">
                      <TrendingUp className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl font-black text-[#172033] mt-2 tracking-tight">
                    18,4%
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[11px]">
                    <span className="text-[#16A34A] font-bold flex items-center">
                      <ArrowUpRight className="w-3 h-3" /> +2,8 p.p.
                    </span>
                    <span className="text-[#667085]">neste período</span>
                  </div>
                </div>

                {/* KPI 6: Tempo Médio de Fechamento */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
                      Ciclo de Fechamento
                    </span>
                    <span className="p-1.5 rounded-lg bg-sky-50 text-sky-600">
                      <Clock className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl font-black text-[#172033] mt-2 tracking-tight">
                    16 dias
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[11px]">
                    <span className="text-[#16A34A] font-bold flex items-center">
                      <ArrowDownRight className="w-3 h-3" /> -3 dias
                    </span>
                    <span className="text-[#667085]">agilidade na decisão</span>
                  </div>
                </div>

                {/* KPI 7: Negócios Ganhos */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
                      Negócios Ganhos
                    </span>
                    <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                      <Award className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl font-black text-[#16A34A] mt-2 tracking-tight">
                    5 fechados
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[11px]">
                    <span className="text-[#16A34A] font-bold">R$ 72.000</span>
                    <span className="text-[#667085]">faturados este mês</span>
                  </div>
                </div>

                {/* KPI 8: Follow-ups Hoje */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">
                      Follow-ups Hoje
                    </span>
                    <span className="p-1.5 rounded-lg bg-orange-50 text-orange-600">
                      <Calendar className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl font-black text-[#172033] mt-2 tracking-tight">
                    12 ações
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[11px]">
                    <span className="text-[#F59E0B] font-bold">4 prioritários</span>
                    <span className="text-[#667085]">precisam de atenção</span>
                  </div>
                </div>
              </div>

              {/* Main Dashboard Two-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
                {/* Left 8 Columns: Pipeline & Recent Activities */}
                <div className="lg:col-span-8 space-y-7">
                  {/* Funnel Visual Overview */}
                  <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-sm font-bold text-[#172033]">
                          Funil de Conversão Comercial
                        </h2>
                        <p className="text-xs text-[#667085]">
                          Volume de negócios e taxas de conversão entre etapas
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("kanban")}
                        className="text-xs text-[#1683E8] hover:underline font-semibold flex items-center gap-1"
                      >
                        <span>Abrir Kanban</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Funnel Stage Steps */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2">
                      {STAGES.filter((s) => s.id !== "ganho").map((stg, i) => {
                        const countInStage = deals.filter((d) => d.stageId === stg.id).length;
                        const valueInStage = deals
                          .filter((d) => d.stageId === stg.id)
                          .reduce((sum, d) => sum + d.value, 0);

                        return (
                          <div
                            key={stg.id}
                            className="bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-3 hover:border-[#1683E8] transition-all cursor-pointer group"
                            onClick={() => setActiveTab("kanban")}
                          >
                            <div className="text-[10px] font-bold uppercase tracking-wider text-[#667085] flex items-center justify-between">
                              <span>{stg.shortName}</span>
                              <span className="text-[9px] text-[#1683E8] font-mono">{stg.convRate}</span>
                            </div>
                            <div className="text-lg font-black text-[#172033] mt-1.5 group-hover:text-[#1683E8] transition-colors">
                              {countInStage}
                            </div>
                            <div className="text-[11px] font-semibold text-[#667085] mt-0.5">
                              {formatBRL(valueInStage)}
                            </div>
                            <div className="w-full bg-[#E4E7EC] h-1.5 rounded-full mt-2 overflow-hidden">
                              <div
                                className="bg-[#1683E8] h-full rounded-full transition-all"
                                style={{ width: `${Math.max(15, (6 - i) * 16)}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pipeline Kanban Preview */}
                  <div className="bg-white border border-[#E4E7EC] rounded-2xl shadow-xs overflow-hidden">
                    <div className="p-5 border-b border-[#E4E7EC] flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-bold text-[#172033]">
                          Destaques do Pipeline
                        </h2>
                        <p className="text-xs text-[#667085]">
                          Oportunidades ativas com foco em fechamento neste mês
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveTab("kanban")}
                          className="px-3 py-1.5 border border-[#E4E7EC] hover:bg-[#F5F7FA] rounded-lg text-xs font-semibold text-[#667085]"
                        >
                          Ver todas as colunas
                        </button>
                      </div>
                    </div>

                    <div className="p-5 overflow-x-auto">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {deals.slice(0, 3).map((deal) => (
                          <div
                            key={deal.id}
                            onClick={() => {
                              const foundLead = leads.find((l) => l.company === deal.company);
                              if (foundLead) {
                                setSelectedLead(foundLead);
                                setActiveLeadDrawer(true);
                              }
                            }}
                            className="bg-white border border-[#E4E7EC] hover:border-[#1683E8] rounded-xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="w-8 h-8 rounded-lg bg-[#EAF4FF] text-[#1683E8] font-bold text-xs flex items-center justify-center">
                                {deal.company.substring(0, 2).toUpperCase()}
                              </div>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-[#667085]">
                                {deal.daysInStage}d no estágio
                              </span>
                            </div>

                            <h3 className="text-xs font-bold text-[#172033] mt-3 group-hover:text-[#1683E8] transition-colors">
                              {deal.company}
                            </h3>
                            <p className="text-[11px] text-[#667085]">{deal.contactName}</p>

                            <div className="text-sm font-extrabold text-[#172033] mt-2">
                              {formatBRL(deal.value)}
                            </div>

                            {/* Automotive Specific Next Action */}
                            <div className="mt-3 pt-2.5 border-t border-[#F2F4F7] text-[11px] text-[#123B63] bg-[#F8FAFC] p-2 rounded-lg">
                              <div className="text-[9px] uppercase font-bold text-[#667085] flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5 text-[#1683E8]" />
                                <span>Próxima Ação:</span>
                              </div>
                              <p className="font-semibold truncate mt-0.5">{deal.nextAction}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity Feed */}
                  <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-sm font-bold text-[#172033]">
                          Atividade Comercial Recente
                        </h2>
                        <p className="text-xs text-[#667085]">
                          Últimas movimentações e interações registradas pelo time
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("atividades")}
                        className="text-xs text-[#1683E8] hover:underline font-semibold"
                      >
                        Ver histórico completo
                      </button>
                    </div>

                    <div className="divide-y divide-[#F2F4F7]">
                      {activities.slice(0, 4).map((act) => (
                        <div key={act.id} className="py-3 flex items-start gap-3 text-xs">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#1683E8] mt-1.5 shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[#172033] leading-relaxed">
                              <strong className="font-bold text-[#172033]">{act.author}</strong>{" "}
                              {act.description}
                            </p>
                            <span className="text-[10px] text-[#98A2B3] mt-0.5 block">
                              {act.timeAgo}
                            </span>
                          </div>
                          {act.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#EAF4FF] text-[#1683E8] rounded-md shrink-0">
                              {act.badge}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right 4 Columns: Next Actions (Follow-ups) & Lead Sources */}
                <div className="lg:col-span-4 space-y-7">
                  {/* Next Actions Checklist Panel */}
                  <div className="bg-white border border-[#E4E7EC] rounded-2xl shadow-xs overflow-hidden">
                    <div className="p-5 border-b border-[#E4E7EC] flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-bold text-[#172033]">
                          Próximas ações
                        </h2>
                        <p className="text-xs text-[#667085]">
                          O que precisa da sua atenção hoje
                        </p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        {tasks.filter((t) => !t.completed).length} pendentes
                      </span>
                    </div>

                    <div className="p-4 space-y-3">
                      {tasks.slice(0, 5).map((task) => (
                        <div
                          key={task.id}
                          className={`p-3.5 rounded-xl border transition-all ${
                            task.completed
                              ? "bg-slate-50 border-slate-200 opacity-60"
                              : task.priority === "Alta"
                              ? "bg-amber-50/50 border-amber-200/80"
                              : "bg-white border-[#E4E7EC]"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => handleToggleTask(task.id)}
                              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 mt-0.5 ${
                                task.completed
                                  ? "bg-[#16A34A] border-[#16A34A] text-white"
                                  : "border-[#D0D5DD] bg-white hover:border-[#1683E8]"
                              }`}
                            >
                              {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </button>

                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-xs font-bold leading-snug ${
                                  task.completed ? "line-through text-[#667085]" : "text-[#172033]"
                                }`}
                              >
                                {task.title}
                              </p>
                              <p className="text-[11px] text-[#667085] mt-1">
                                {task.company} · {task.dueTime}
                              </p>

                              <div className="flex items-center gap-2 mt-2">
                                <span
                                  className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                                    task.priority === "Alta"
                                      ? "bg-[#FFF4E5] text-[#B54708]"
                                      : "bg-slate-100 text-[#667085]"
                                  }`}
                                >
                                  {task.priority === "Alta" ? "PRIORIDADE ALTA" : "NORMAL"}
                                </span>

                                <button
                                  onClick={() => {
                                    const lead = leads.find((l) => l.company === task.company);
                                    if (lead) {
                                      setActiveWhatsAppLead(lead);
                                      setWhatsAppModalOpen(true);
                                    } else {
                                      showToast("Abrindo WhatsApp...");
                                    }
                                  }}
                                  className="text-[10px] text-[#1683E8] hover:underline font-semibold flex items-center gap-1 ml-auto"
                                >
                                  <MessageSquare className="w-3 h-3" />
                                  <span>WhatsApp</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lead Sources Analytics Panel */}
                  <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-xs">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h2 className="text-sm font-bold text-[#172033]">
                          Origem dos Leads
                        </h2>
                        <p className="text-xs text-[#667085]">
                          Canais que mais geram clientes de autopeças
                        </p>
                      </div>
                      <span className="text-[10px] bg-blue-50 text-[#1683E8] px-2 py-0.5 rounded font-bold">
                        Este mês
                      </span>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div>
                        <div className="flex justify-between font-medium mb-1.5">
                          <span className="text-[#172033] font-semibold">Google Ads (Campanha ERP)</span>
                          <strong className="text-[#1683E8] font-bold">42% (104)</strong>
                        </div>
                        <div className="h-2 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
                          <div className="h-full bg-[#1683E8] rounded-full" style={{ width: "42%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-medium mb-1.5">
                          <span className="text-[#172033] font-semibold">WhatsApp Balcão & Catálogo</span>
                          <strong className="text-[#16A34A] font-bold">28% (69)</strong>
                        </div>
                        <div className="h-2 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
                          <div className="h-full bg-[#16A34A] rounded-full" style={{ width: "28%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-medium mb-1.5">
                          <span className="text-[#172033] font-semibold">Indicação de Lojas Parceiras</span>
                          <strong className="text-[#7C3AED] font-bold">18% (45)</strong>
                        </div>
                        <div className="h-2 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
                          <div className="h-full bg-[#7C3AED] rounded-full" style={{ width: "18%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-medium mb-1.5">
                          <span className="text-[#172033] font-semibold">Eventos / Feiras (Automec)</span>
                          <strong className="text-[#F59E0B] font-bold">12% (30)</strong>
                        </div>
                        <div className="h-2 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
                          <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: "12%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#F2F4F7] text-[11px] text-[#667085] flex items-center justify-between">
                      <span>Custo por Lead Qualificado:</span>
                      <strong className="text-[#172033] font-bold">R$ 142,50</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: PIPELINE KANBAN (O CORAÇÃO DO CRM) */}
          {activeTab === "kanban" && (
            <div className="p-8 max-w-[1720px] mx-auto w-full space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold text-[#1683E8] uppercase tracking-wider mb-1">
                    PIPELINE COMERCIAL AUTOPEÇAS
                  </div>
                  <h1 className="text-2xl font-extrabold text-[#172033] tracking-tight">
                    Funil de Vendas (Kanban)
                  </h1>
                  <p className="text-xs text-[#667085] mt-1">
                    Arraste cards entre estágios ou clique para gerenciar negociações e registrar atividades.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs font-semibold px-3 py-1.5 bg-white border border-[#E4E7EC] rounded-xl text-[#172033]">
                    Total em Negociação:{" "}
                    <span className="text-[#1683E8] font-bold">
                      {formatBRL(pipelineMetrics.totalPipelineValue)}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsNewDealModalOpen(true)}
                    className="px-4 py-2 bg-[#1683E8] hover:bg-[#123B63] text-white text-xs font-semibold rounded-xl shadow-sm shadow-[#1683E8]/25 flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Nova Oportunidade</span>
                  </button>
                </div>
              </div>

              {/* Kanban Columns Grid */}
              <div className="flex gap-4 overflow-x-auto pb-6 pt-1 select-none min-h-[650px]">
                {STAGES.map((stage) => {
                  const stageDeals = deals.filter((d) => d.stageId === stage.id);
                  const stageTotalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

                  return (
                    <div
                      key={stage.id}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, stage.id)}
                      className="w-[280px] shrink-0 bg-[#F8FAFC] border border-[#E4E7EC] rounded-2xl flex flex-col max-h-[750px] shadow-2xs"
                    >
                      {/* Column Header */}
                      <div className="p-3.5 border-b border-[#E4E7EC] bg-white rounded-t-2xl">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold uppercase tracking-wide text-[#172033]">
                            {stage.name}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF4FF] text-[#1683E8]">
                            {stageDeals.length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1 text-[11px] text-[#667085]">
                          <span>Volume:</span>
                          <strong className="text-[#172033] font-semibold">
                            {formatBRL(stageTotalValue)}
                          </strong>
                        </div>
                      </div>

                      {/* Cards Container */}
                      <div className="p-3 flex-1 overflow-y-auto space-y-3">
                        {stageDeals.length === 0 ? (
                          <div className="h-32 border-2 border-dashed border-[#E4E7EC] rounded-xl flex items-center justify-center text-[11px] text-[#98A2B3]">
                            Solte uma oportunidade aqui
                          </div>
                        ) : (
                          stageDeals.map((deal) => (
                            <div
                              key={deal.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, deal.id)}
                              className="bg-white border border-[#E4E7EC] hover:border-[#1683E8] rounded-xl p-3.5 shadow-2xs hover:shadow-md transition-all cursor-grab active:cursor-grabbing group relative"
                            >
                              {/* Top row */}
                              <div className="flex items-start justify-between">
                                <div className="w-7 h-7 rounded-lg bg-[#EAF4FF] text-[#1683E8] font-bold text-xs flex items-center justify-center">
                                  {deal.company.substring(0, 2).toUpperCase()}
                                </div>
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-[#667085]">
                                  {deal.daysInStage}d no estágio
                                </span>
                              </div>

                              {/* Company and Contact */}
                              <h4 className="text-xs font-bold text-[#172033] mt-2.5 group-hover:text-[#1683E8] transition-colors">
                                {deal.company}
                              </h4>
                              <p className="text-[11px] text-[#667085] truncate">{deal.contactName}</p>

                              {/* Value & Probability */}
                              <div className="flex items-baseline justify-between mt-2.5">
                                <span className="text-sm font-extrabold text-[#172033]">
                                  {formatBRL(deal.value)}
                                </span>
                                <span className="text-[10px] text-[#667085] font-mono">
                                  {deal.probability}% prob.
                                </span>
                              </div>

                              {/* Origin Tag */}
                              <div className="flex items-center gap-1.5 mt-2">
                                <span className="text-[9px] font-semibold px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded">
                                  {deal.source}
                                </span>
                                <span className="text-[9px] text-[#98A2B3] ml-auto">
                                  👤 {deal.owner.split(" ")[0]}
                                </span>
                              </div>

                              {/* Próxima Ação Highlight */}
                              <div className="mt-2.5 pt-2 border-t border-[#F2F4F7] text-[10px] text-[#123B63] bg-[#F8FAFC] p-2 rounded-lg">
                                <span className="text-[8px] uppercase font-bold text-[#667085] block">
                                  Próxima Ação:
                                </span>
                                <p className="font-semibold truncate">{deal.nextAction}</p>
                              </div>

                              {/* Card Action Menu */}
                              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#F2F4F7] text-[10px]">
                                <button
                                  onClick={() => {
                                    const foundLead = leads.find((l) => l.company === deal.company);
                                    if (foundLead) {
                                      setSelectedLead(foundLead);
                                      setActiveLeadDrawer(true);
                                    }
                                  }}
                                  className="text-[#1683E8] hover:underline font-bold"
                                >
                                  Ver 360°
                                </button>

                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => {
                                      const foundLead = leads.find((l) => l.company === deal.company);
                                      if (foundLead) {
                                        setActiveWhatsAppLead(foundLead);
                                        setWhatsAppModalOpen(true);
                                      }
                                    }}
                                    className="p-1 hover:bg-[#EAF4FF] rounded text-[#1683E8]"
                                    title="WhatsApp"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setDealToMarkLost(deal);
                                      setIsLossReasonModalOpen(true);
                                    }}
                                    className="p-1 hover:bg-rose-50 rounded text-rose-500"
                                    title="Marcar como Perdido"
                                  >
                                    <XCircle className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 3: LEADS (GESTÃO DE LEADS) */}
          {activeTab === "leads" && (
            <div className="p-8 max-w-[1720px] mx-auto w-full space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold text-[#1683E8] uppercase tracking-wider mb-1">
                    BASE DE PROSPECÇÃO B2B
                  </div>
                  <h1 className="text-2xl font-extrabold text-[#172033] tracking-tight">
                    Leads de Autopeças
                  </h1>
                  <p className="text-xs text-[#667085] mt-1">
                    Gerencie entradas de campanhas, WhatsApp, balcão e indicações de mercado.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => showToast("Exportando base de leads para CSV/Excel...")}
                    className="px-3 py-2 border border-[#E4E7EC] hover:bg-[#F5F7FA] bg-white rounded-xl text-xs font-semibold text-[#667085] flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar</span>
                  </button>

                  <button
                    onClick={() => setIsNewLeadModalOpen(true)}
                    className="px-4 py-2 bg-[#1683E8] hover:bg-[#123B63] text-white text-xs font-semibold rounded-xl shadow-sm shadow-[#1683E8]/25 flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Novo Lead</span>
                  </button>
                </div>
              </div>

              {/* Filters Toolbar */}
              <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <Search className="w-4 h-4 text-[#98A2B3]" />
                  <input
                    type="text"
                    placeholder="Pesquisar por lead, empresa ou cidade..."
                    value={leadSearchQuery}
                    onChange={(e) => setLeadSearchQuery(e.target.value)}
                    className="w-full bg-transparent outline-none text-[#172033] placeholder:text-[#98A2B3]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value)}
                    className="px-3 py-1.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-xl text-[#172033] font-medium outline-none cursor-pointer"
                  >
                    <option value="all">Todos os Status</option>
                    <option value="Novo">Novo Lead</option>
                    <option value="Qualificação">Em Qualificação</option>
                    <option value="Contato Realizado">Contato Realizado</option>
                    <option value="Oportunidade">Oportunidade</option>
                  </select>

                  <select
                    value={leadSegmentFilter}
                    onChange={(e) => setLeadSegmentFilter(e.target.value)}
                    className="px-3 py-1.5 bg-[#F5F7FA] border border-[#E4E7EC] rounded-xl text-[#172033] font-medium outline-none cursor-pointer"
                  >
                    <option value="all">Todos os Segmentos</option>
                    <option value="Varejo de Autopeças">Varejo de Autopeças</option>
                    <option value="Distribuidora Atacadista">Distribuidora Atacadista</option>
                    <option value="Rede de Auto Center">Rede de Auto Center</option>
                    <option value="Motopeças & Acessórios">Motopeças & Acessórios</option>
                    <option value="Linha Pesada & Diesel">Linha Pesada & Diesel</option>
                  </select>
                </div>
              </div>

              {/* Leads Data Table */}
              <div className="bg-white border border-[#E4E7EC] rounded-2xl shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] border-b border-[#E4E7EC] text-[#667085] font-semibold text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Lead / Decisor</th>
                        <th className="py-3 px-4">Empresa / Cidade</th>
                        <th className="py-3 px-4">Segmento & Lojas</th>
                        <th className="py-3 px-4">Origem</th>
                        <th className="py-3 px-4">Responsável</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Próxima Ação</th>
                        <th className="py-3 px-4 text-right">Ações Rápidas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E7EC]">
                      {filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                          onClick={() => {
                            setSelectedLead(lead);
                            setActiveLeadDrawer(true);
                          }}
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#172033] group-hover:text-[#1683E8] transition-colors">
                              {lead.name}
                            </div>
                            <div className="text-[11px] text-[#667085]">{lead.role}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-[#172033]">{lead.company}</div>
                            <div className="text-[11px] text-[#667085]">
                              {lead.city}/{lead.state}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-medium text-[#172033]">{lead.segment}</span>
                            <div className="text-[10px] text-[#1683E8] font-bold">
                              {lead.storesCount} loja(s)
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">
                              {lead.source}
                            </span>
                            {lead.campaign && (
                              <div className="text-[9px] text-[#98A2B3] truncate max-w-[140px] mt-0.5">
                                {lead.campaign}
                              </div>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-[#123B63] text-white text-[9px] flex items-center justify-center font-bold">
                                {lead.ownerAvatar}
                              </span>
                              <span className="font-medium text-[#172033]">{lead.owner}</span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                lead.status === "Oportunidade"
                                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                                  : lead.status === "Qualificação"
                                  ? "bg-indigo-50 text-indigo-800 border border-indigo-200"
                                  : "bg-blue-50 text-blue-800 border border-blue-200"
                              }`}
                            >
                              {lead.status}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 max-w-[200px]">
                            <div className="font-semibold text-[#123B63] truncate">
                              {lead.nextAction}
                            </div>
                            <div className="text-[10px] text-[#98A2B3]">{lead.nextActionDate}</div>
                          </td>

                          <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => {
                                  setActiveWhatsAppLead(lead);
                                  setWhatsAppModalOpen(true);
                                }}
                                className="p-1.5 bg-[#EAF4FF] hover:bg-[#1683E8] text-[#1683E8] hover:text-white rounded-lg transition-colors"
                                title="Enviar WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setActiveCallLead(lead);
                                  setCallModalOpen(true);
                                }}
                                className="p-1.5 bg-[#F5F7FA] hover:bg-[#123B63] text-[#667085] hover:text-white rounded-lg transition-colors"
                                title="Registrar Ligação"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedLead(lead);
                                  setActiveLeadDrawer(true);
                                }}
                                className="p-1.5 bg-[#F5F7FA] hover:bg-[#E4E7EC] text-[#172033] rounded-lg"
                                title="Ver Perfil 360°"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 4: OPORTUNIDADES */}
          {activeTab === "oportunidades" && (
            <div className="p-8 max-w-[1720px] mx-auto w-full space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#172033] tracking-tight">
                    Oportunidades em Aberto
                  </h1>
                  <p className="text-xs text-[#667085] mt-1">
                    Cálculo de probabilidade e valor ponderado para projeção de receita do ERP.
                  </p>
                </div>
                <button
                  onClick={() => setIsNewDealModalOpen(true)}
                  className="px-4 py-2 bg-[#1683E8] text-white text-xs font-semibold rounded-xl shadow-sm"
                >
                  + Nova Oportunidade
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {deals.map((deal) => (
                  <div
                    key={deal.id}
                    className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1683E8]">
                        {deal.stageId.toUpperCase()}
                      </span>
                      <span className="text-xs font-extrabold text-[#172033]">
                        {formatBRL(deal.value)}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#172033]">{deal.company}</h3>
                      <p className="text-xs text-[#667085]">{deal.title}</p>
                    </div>

                    <div className="bg-[#F8FAFC] p-3 rounded-xl space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#667085]">Probabilidade:</span>
                        <strong className="text-[#172033]">{deal.probability}%</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#667085]">Valor Ponderado:</span>
                        <strong className="text-[#1683E8] font-bold">
                          {formatBRL(deal.weightedValue)}
                        </strong>
                      </div>
                    </div>

                    <div className="text-[11px] text-[#667085] flex flex-wrap gap-1">
                      {deal.interestModules.slice(0, 3).map((m) => (
                        <span key={m} className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-medium">
                          {m}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#F2F4F7] flex items-center justify-between text-xs">
                      <span className="text-[10px] text-[#667085]">👤 {deal.owner}</span>
                      <button
                        onClick={() => {
                          const foundLead = leads.find((l) => l.company === deal.company);
                          if (foundLead) {
                            setSelectedLead(foundLead);
                            setActiveLeadDrawer(true);
                          }
                        }}
                        className="text-[#1683E8] font-bold text-xs hover:underline"
                      >
                        Abrir Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 5: TAREFAS & FOLLOW-UP */}
          {activeTab === "tarefas" && (
            <div className="p-8 max-w-[1720px] mx-auto w-full space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#172033] tracking-tight">
                    Central de Follow-ups & Tarefas
                  </h1>
                  <p className="text-xs text-[#667085] mt-1">
                    Garantia de que nenhum lead ou negociação de autopeças fique sem próximo contato.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Cadastre uma nova tarefa diretamente no perfil do Lead.")}
                  className="px-4 py-2 bg-[#1683E8] text-white text-xs font-semibold rounded-xl shadow-sm"
                >
                  + Nova Tarefa
                </button>
              </div>

              <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                      task.completed ? "bg-slate-50 opacity-60" : "bg-white border-[#E4E7EC]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          task.completed
                            ? "bg-[#16A34A] border-[#16A34A] text-white"
                            : "border-[#D0D5DD] bg-white hover:border-[#1683E8]"
                        }`}
                      >
                        {task.completed && <Check className="w-3.5 h-3.5" />}
                      </button>
                      <div>
                        <p
                          className={`text-xs font-bold ${
                            task.completed ? "line-through text-[#667085]" : "text-[#172033]"
                          }`}
                        >
                          {task.title}
                        </p>
                        <p className="text-[11px] text-[#667085]">
                          {task.company} · {task.contact} · {task.dueTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          task.priority === "Alta"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-[#667085]"
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span className="text-[11px] text-[#667085]">👤 {task.owner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 6: ATIVIDADES */}
          {activeTab === "atividades" && (
            <div className="p-8 max-w-[1720px] mx-auto w-full space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="text-2xl font-extrabold text-[#172033] tracking-tight">
                  Central de Atividades
                </h1>
                <p className="text-xs text-[#667085] mt-1">
                  Histórico de ligações, mensagens de WhatsApp, demonstrações do ERP e propostas.
                </p>
              </div>

              <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-xs divide-y divide-[#E4E7EC]">
                {activities.map((act) => (
                  <div key={act.id} className="py-4 flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF4FF] text-[#1683E8] flex items-center justify-center shrink-0">
                      {act.type === "whatsapp" ? (
                        <MessageSquare className="w-4 h-4" />
                      ) : act.type === "call" ? (
                        <Phone className="w-4 h-4" />
                      ) : act.type === "proposal" ? (
                        <FileText className="w-4 h-4" />
                      ) : (
                        <Activity className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-[#172033]">{act.title}</h4>
                        <span className="text-[10px] text-[#98A2B3]">{act.timeAgo}</span>
                      </div>
                      <p className="text-xs text-[#667085] mt-1">{act.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-[10px] text-[#98A2B3]">
                        <span>🏢 {act.company}</span>
                        <span>👤 {act.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 7: AGENDA */}
          {activeTab === "agenda" && (
            <div className="p-8 max-w-[1720px] mx-auto w-full space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#172033] tracking-tight">
                    Agenda Comercial
                  </h1>
                  <p className="text-xs text-[#667085] mt-1">
                    Demonstrações agendadas do ALFA ERP, reuniões presenciais e visitas técnicas.
                  </p>
                </div>
                <div className="flex gap-2 text-xs">
                  <button className="px-3 py-1.5 bg-[#EAF4FF] text-[#1683E8] font-bold rounded-lg">
                    Semana
                  </button>
                  <button className="px-3 py-1.5 border border-[#E4E7EC] text-[#667085] rounded-lg">
                    Mês
                  </button>
                  <button className="px-3 py-1.5 border border-[#E4E7EC] text-[#667085] rounded-lg">
                    Dia
                  </button>
                </div>
              </div>

              <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-xs grid grid-cols-1 md:grid-cols-5 gap-4">
                {["Segunda (25/03)", "Terça (26/03)", "Quarta (Hoje 27/03)", "Quinta (28/03)", "Sexta (29/03)"].map(
                  (day, i) => (
                    <div key={day} className="space-y-3">
                      <div
                        className={`p-2 rounded-lg text-xs font-bold text-center ${
                          i === 2 ? "bg-[#1683E8] text-white" : "bg-[#F8FAFC] text-[#667085]"
                        }`}
                      >
                        {day}
                      </div>

                      {i === 2 ? (
                        <div className="space-y-2">
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-1">
                            <span className="text-[10px] font-bold text-blue-800">14:30 - Ligação</span>
                            <p className="font-bold text-[#172033]">Auto Peças Silva</p>
                            <p className="text-[10px] text-[#667085]">Alinhar Curva ABC</p>
                          </div>
                          <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs space-y-1">
                            <span className="text-[10px] font-bold text-purple-800">15:00 - Demonstração</span>
                            <p className="font-bold text-[#172033]">Auto Center Brasil</p>
                            <p className="text-[10px] text-[#667085]">Demo Balcão PDV</p>
                          </div>
                        </div>
                      ) : i === 3 ? (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1">
                          <span className="text-[10px] font-bold text-amber-800">11:30 - Reunião</span>
                          <p className="font-bold text-[#172033]">Master Auto Peças</p>
                          <p className="text-[10px] text-[#667085]">Alinhamento Fiscal</p>
                        </div>
                      ) : (
                        <div className="h-28 border border-dashed border-[#E4E7EC] rounded-xl flex items-center justify-center text-[10px] text-[#98A2B3]">
                          Disponível
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* VIEW 8: EMPRESAS */}
          {activeTab === "empresas" && (
            <div className="p-8 max-w-[1720px] mx-auto w-full space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="text-2xl font-extrabold text-[#172033] tracking-tight">
                  Empresas de Autopeças Cadastradas
                </h1>
                <p className="text-xs text-[#667085] mt-1">
                  Redes de lojas, distribuidores e centros automotivos integrados à base comercial.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companies.map((comp) => (
                  <div key={comp.id} className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#172033]">{comp.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                        {comp.status}
                      </span>
                    </div>
                    <div className="text-xs text-[#667085] space-y-1">
                      <p>CNPJ: {comp.cnpj}</p>
                      <p>Localização: {comp.city}/{comp.state}</p>
                      <p>Segmento: {comp.segment} ({comp.storesCount} filiais)</p>
                      <p>Contato Principal: {comp.mainContact} ({comp.contactPhone})</p>
                    </div>
                    <div className="pt-2 border-t border-[#F2F4F7] flex items-center justify-between text-xs">
                      <span className="text-[#1683E8] font-bold">
                        Valor Total: {formatBRL(comp.totalDealsValue)}
                      </span>
                      <span className="text-[10px] text-[#667085]">Resp: {comp.owner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 9: PROPOSTAS */}
          {activeTab === "propostas" && (
            <div className="p-8 max-w-[1720px] mx-auto w-full space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="text-2xl font-extrabold text-[#172033] tracking-tight">
                  Propostas Comerciais ALFA ERP
                </h1>
                <p className="text-xs text-[#667085] mt-1">
                  Orçamentos de implantação, licenças por filial e contratos de software.
                </p>
              </div>

              <div className="space-y-4">
                {proposals.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#1683E8]">{prop.proposalNumber}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800">
                          {prop.status}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[#172033] mt-1">{prop.company}</h3>
                      <p className="text-xs text-[#667085] mt-0.5">
                        Contato: {prop.contact} · {prop.storesCovered} loja(s) inclusa(s)
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-[10px] text-[#667085] block">Setup Implantação</span>
                        <strong className="text-xs text-[#172033]">{formatBRL(prop.setupValue)}</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#667085] block">Mensalidade SaaS</span>
                        <strong className="text-sm text-[#1683E8] font-black">{formatBRL(prop.monthlyValue)}/mês</strong>
                      </div>
                      <button
                        onClick={() => showToast(`Visualizando proposta ${prop.proposalNumber}`)}
                        className="px-3 py-2 bg-[#F8FAFC] hover:bg-[#EAF4FF] text-[#1683E8] border border-[#E4E7EC] rounded-xl text-xs font-semibold"
                      >
                        Visualizar PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 10: CLIENTES CONVERTIDOS */}
          {activeTab === "clientes" && (
            <div className="p-8 max-w-[1720px] mx-auto w-full space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="text-2xl font-extrabold text-[#172033] tracking-tight">
                  Clientes Convertidos (Pós-Fechamento)
                </h1>
                <p className="text-xs text-[#667085] mt-1">
                  Empresas de autopeças ganhas que migraram do CRM para a base ativa do ALFA ERP.
                </p>
              </div>

              <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-emerald-950">Distribuidora Real Autopeças S.A.</h4>
                      <p className="text-[11px] text-emerald-800">
                        Fechamento: 24/03/2024 · Contrato R$ 72.000 (Setup) + R$ 4.800/mês
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold">
                    Onboarding Ativo
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 11: RELATÓRIOS & CONVERSÃO */}
          {activeTab === "relatorios" && (
            <div className="p-8 max-w-[1720px] mx-auto w-full space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="text-2xl font-extrabold text-[#172033] tracking-tight">
                  Relatórios Comerciais & Motivos de Perda
                </h1>
                <p className="text-xs text-[#667085] mt-1">
                  Métricas de conversão por etapa, performance por vendedor e análise de perdas de autopeças.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-[#172033]">Motivos de Perda de Negócios</h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Preço / Custo de Implantação</span>
                        <strong className="text-rose-600">35%</strong>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full" style={{ width: "35%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Optou por Concorrente (Linx/Totvs)</span>
                        <strong className="text-amber-600">25%</strong>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Sem Orçamento / Congelado</span>
                        <strong className="text-slate-600">20%</strong>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-500 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Timing / Adiou Decisão</span>
                        <strong className="text-blue-600">15%</strong>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-[#172033]">Ranking de Vendedores</h3>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-[#F8FAFC] rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#172033]">1º João Silva</span>
                      </div>
                      <span className="font-extrabold text-[#16A34A]">R$ 184.200 (Conversão: 22%)</span>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#172033]">2º Ana Souza</span>
                      </div>
                      <span className="font-extrabold text-[#1683E8]">R$ 126.800 (Conversão: 19%)</span>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#172033]">3º Carlos Ferreira</span>
                      </div>
                      <span className="font-extrabold text-[#667085]">R$ 98.400 (Conversão: 16%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 12: AUTOMAÇÃO */}
          {activeTab === "automacao" && (
            <div className="p-8 max-w-[1720px] mx-auto w-full space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#172033] tracking-tight">
                    Automações Comerciais B2B
                  </h1>
                  <p className="text-xs text-[#667085] mt-1">
                    Workflows para distribuição de leads, follow-ups de SLA e sincronização com o ALFA ERP.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Regra criada com sucesso!")}
                  className="px-4 py-2 bg-[#1683E8] text-white text-xs font-semibold rounded-xl shadow-sm"
                >
                  + Nova Automação
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {automations.map((rule) => (
                  <div
                    key={rule.id}
                    className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#172033]">{rule.title}</span>
                      <button
                        onClick={() => {
                          setAutomations((prev) =>
                            prev.map((r) => (r.id === rule.id ? { ...r, active: !r.active } : r))
                          );
                          showToast(`Automação ${rule.active ? "desativada" : "ativada"}!`);
                        }}
                        className={`w-10 h-5 rounded-full transition-colors flex items-center px-0.5 ${
                          rule.active ? "bg-[#1683E8] justify-end" : "bg-[#D0D5DD] justify-start"
                        }`}
                      >
                        <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                      </button>
                    </div>

                    <div className="bg-[#F8FAFC] p-3 rounded-xl space-y-1.5 text-xs text-[#667085]">
                      <p>
                        <strong className="text-[#172033]">Gatilho:</strong> {rule.trigger}
                      </p>
                      <p>
                        <strong className="text-[#172033]">Condição:</strong> {rule.conditions}
                      </p>
                      <div className="pt-1">
                        <strong className="text-[#172033] block mb-1">Ações disparadas:</strong>
                        <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                          {rule.actions.map((act, i) => (
                            <li key={i}>{act}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fallback for other routes */}
          {activeTab === "contatos" && (
            <div className="p-8 max-w-[1720px] mx-auto w-full space-y-6">
              <h1 className="text-2xl font-bold text-[#172033]">Contatos & Compradores</h1>
              <div className="bg-white p-6 rounded-2xl border border-[#E4E7EC]">
                <p className="text-xs text-[#667085]">Base de compradores de autopeças e contatos operacionais.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* LEAD PROFILE DRAWER (360° VIEW)                                      */}
      {/* ==================================================================== */}
      {activeLeadDrawer && selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setActiveLeadDrawer(false)}
          ></div>

          {/* Drawer Window */}
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl z-10 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#E4E7EC] bg-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#123B63] to-[#1683E8] text-white flex items-center justify-center font-bold text-base shadow-sm">
                    {selectedLead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-[#172033] leading-tight">
                      {selectedLead.name}
                    </h2>
                    <p className="text-xs text-[#667085]">
                      {selectedLead.role} · <strong className="text-[#172033]">{selectedLead.company}</strong>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1683E8]">
                        {selectedLead.segment} ({selectedLead.storesCount} lojas)
                      </span>
                      <span className="text-[10px] text-[#667085]">
                        📍 {selectedLead.city}/{selectedLead.state}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveLeadDrawer(false)}
                  className="p-2 hover:bg-[#F5F7FA] rounded-xl text-[#667085] hover:text-[#172033]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Fast Action Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-5">
                <button
                  onClick={() => {
                    setActiveCallLead(selectedLead);
                    setCallModalOpen(true);
                  }}
                  className="py-2.5 px-3 bg-[#F8FAFC] hover:bg-[#EAF4FF] text-[#1683E8] border border-[#E4E7EC] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Ligar</span>
                </button>

                <button
                  onClick={() => {
                    setActiveWhatsAppLead(selectedLead);
                    setWhatsAppModalOpen(true);
                  }}
                  className="py-2.5 px-3 bg-[#ECFDF3] hover:bg-emerald-100 text-[#16A34A] border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={() => showToast(`Enviando e-mail para ${selectedLead.email}`)}
                  className="py-2.5 px-3 bg-[#F8FAFC] hover:bg-[#F5F7FA] text-[#172033] border border-[#E4E7EC] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>E-mail</span>
                </button>

                <button
                  onClick={() => {
                    showToast(`Convertendo ${selectedLead.company} em Oportunidade no Funil...`);
                    setActiveTab("kanban");
                    setActiveLeadDrawer(false);
                  }}
                  className="py-2.5 px-3 bg-[#1683E8] hover:bg-[#123B63] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>+ Oportunidade</span>
                </button>
              </div>
            </div>

            {/* Sub-tabs in Drawer */}
            <div className="flex border-b border-[#E4E7EC] px-6 text-xs font-semibold">
              <button
                onClick={() => setDrawerTab("timeline")}
                className={`py-3 border-b-2 mr-6 transition-colors ${
                  drawerTab === "timeline"
                    ? "border-[#1683E8] text-[#1683E8]"
                    : "border-transparent text-[#667085] hover:text-[#172033]"
                }`}
              >
                Linha do Tempo (Atividades)
              </button>
              <button
                onClick={() => setDrawerTab("empresa")}
                className={`py-3 border-b-2 mr-6 transition-colors ${
                  drawerTab === "empresa"
                    ? "border-[#1683E8] text-[#1683E8]"
                    : "border-transparent text-[#667085] hover:text-[#172033]"
                }`}
              >
                Ficha da Loja / CNPJ
              </button>
              <button
                onClick={() => setDrawerTab("modulos")}
                className={`py-3 border-b-2 transition-colors ${
                  drawerTab === "modulos"
                    ? "border-[#1683E8] text-[#1683E8]"
                    : "border-transparent text-[#667085] hover:text-[#172033]"
                }`}
              >
                Módulos ALFA ERP
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {drawerTab === "timeline" && (
                <div className="space-y-5">
                  {/* Quick Note Composer */}
                  <div className="bg-[#F8FAFC] border border-[#E4E7EC] rounded-2xl p-4 space-y-2">
                    <span className="text-xs font-bold text-[#172033]">Registrar Nova Nota ou Follow-up</span>
                    <textarea
                      rows={2}
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Ex: Cliente pediu para retornar após reunião de sócios na quinta..."
                      className="w-full bg-white border border-[#E4E7EC] rounded-xl p-2.5 text-xs text-[#172033] outline-none focus:border-[#1683E8]"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={handleAddNoteToLead}
                        className="px-3.5 py-1.5 bg-[#1683E8] text-white text-xs font-bold rounded-lg shadow-sm"
                      >
                        Salvar Nota
                      </button>
                    </div>
                  </div>

                  {/* Timeline Feed */}
                  <div className="space-y-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#98A2B3]">
                      Histórico Cronológico
                    </span>

                    <div className="space-y-3 text-xs">
                      {activities
                        .filter((a) => a.company === selectedLead.company || a.contact === selectedLead.name)
                        .map((act) => (
                          <div key={act.id} className="p-3.5 bg-white border border-[#E4E7EC] rounded-xl space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#172033]">{act.title}</span>
                              <span className="text-[10px] text-[#98A2B3]">{act.timeAgo}</span>
                            </div>
                            <p className="text-[#667085] text-xs">{act.description}</p>
                            <span className="text-[10px] text-[#1683E8] font-semibold block pt-1">
                              Registrado por {act.author}
                            </span>
                          </div>
                        ))}

                      {/* Default milestone entry */}
                      <div className="p-3.5 bg-blue-50/50 border border-blue-200/60 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-blue-950">Lead Criado no Sistema</span>
                          <span className="text-[10px] text-blue-600">{selectedLead.createdAt}</span>
                        </div>
                        <p className="text-xs text-blue-900">
                          Origem: {selectedLead.source} {selectedLead.campaign && `(${selectedLead.campaign})`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === "empresa" && (
                <div className="space-y-4 text-xs">
                  <div className="bg-[#F8FAFC] border border-[#E4E7EC] rounded-2xl p-4 space-y-2">
                    <h3 className="font-bold text-[#172033] text-sm">Dados Cadastrais da Empresa</h3>
                    <p className="text-[#667085]">Razão Social: {selectedLead.company} Ltda.</p>
                    <p className="text-[#667085]">CNPJ: {selectedLead.cnpj}</p>
                    <p className="text-[#667085]">Segmento: {selectedLead.segment}</p>
                    <p className="text-[#667085]">Quantidade de Lojas / Filiais: {selectedLead.storesCount}</p>
                    <p className="text-[#667085]">Localização: {selectedLead.city}/{selectedLead.state}</p>
                  </div>
                </div>
              )}

              {drawerTab === "modulos" && (
                <div className="space-y-4 text-xs">
                  <h3 className="font-bold text-[#172033] text-sm">Módulos de Interesse ALFA ERP</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {ALL_ALFA_MODULES.map((mod) => {
                      const isSelected = selectedLead.interestModules.includes(mod);
                      return (
                        <div
                          key={mod}
                          className={`p-3 rounded-xl border flex items-center justify-between ${
                            isSelected ? "bg-blue-50 border-blue-200" : "bg-white border-[#E4E7EC]"
                          }`}
                        >
                          <span className="font-semibold text-[#172033]">{mod}</span>
                          <span className="text-[10px] font-bold text-[#1683E8]">
                            {isSelected ? "Selecionado" : "Disponível"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL: NOVO LEAD (CADASTRO COMPLETO)                                 */}
      {/* ==================================================================== */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setIsNewLeadModalOpen(false)}></div>
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#E4E7EC] overflow-hidden z-10 animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-[#E4E7EC] flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#172033]">Cadastrar Novo Lead</h3>
                <p className="text-xs text-[#667085]">Insira os dados da empresa de autopeças e do contato principal.</p>
              </div>
              <button onClick={() => setIsNewLeadModalOpen(false)} className="p-1.5 text-[#667085] hover:text-[#172033]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewLead} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#172033] block mb-1">Nome do Contato *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Silva"
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 outline-none focus:border-[#1683E8]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#172033] block mb-1">Nome da Empresa / Loja *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Auto Peças Silva"
                    value={newLeadForm.company}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 outline-none focus:border-[#1683E8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#172033] block mb-1">WhatsApp Comercial</label>
                  <input
                    type="text"
                    placeholder="(11) 98412-3344"
                    value={newLeadForm.whatsapp}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, whatsapp: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 outline-none focus:border-[#1683E8]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#172033] block mb-1">E-mail</label>
                  <input
                    type="email"
                    placeholder="carlos@empresa.com.br"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 outline-none focus:border-[#1683E8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="font-bold text-[#172033] block mb-1">Cidade</label>
                  <input
                    type="text"
                    placeholder="São Paulo"
                    value={newLeadForm.city}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, city: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 outline-none focus:border-[#1683E8]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#172033] block mb-1">Estado</label>
                  <select
                    value={newLeadForm.state}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, state: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 outline-none"
                  >
                    {["SP", "PR", "SC", "RS", "MG", "RJ", "GO", "BA", "PE"].map((uf) => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#172033] block mb-1">Segmento</label>
                  <select
                    value={newLeadForm.segment}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, segment: e.target.value as AutomotiveSegment })}
                    className="w-full bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 outline-none"
                  >
                    <option value="Varejo de Autopeças">Varejo de Autopeças</option>
                    <option value="Distribuidora Atacadista">Distribuidora Atacadista</option>
                    <option value="Rede de Auto Center">Rede de Auto Center</option>
                    <option value="Motopeças & Acessórios">Motopeças & Acessórios</option>
                    <option value="Linha Pesada & Diesel">Linha Pesada & Diesel</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#172033] block mb-1">Quantidade de Lojas</label>
                  <input
                    type="number"
                    min="1"
                    value={newLeadForm.storesCount}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, storesCount: Number(e.target.value) })}
                    className="w-full bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#172033] block mb-1">Origem do Lead</label>
                  <select
                    value={newLeadForm.source}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value as LeadSource })}
                    className="w-full bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 outline-none"
                  >
                    <option value="Google Ads">Google Ads</option>
                    <option value="WhatsApp Balcão">WhatsApp Balcão</option>
                    <option value="Indicação de Loja">Indicação de Loja</option>
                    <option value="Evento / Automec">Evento / Automec</option>
                    <option value="Outbound / Balconista">Outbound / Balconista</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#172033] block mb-1">Vendedor Responsável</label>
                  <select
                    value={newLeadForm.owner}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, owner: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 outline-none"
                  >
                    <option value="João Silva">João Silva</option>
                    <option value="Ana Souza">Ana Souza</option>
                    <option value="Carlos Ferreira">Carlos Ferreira</option>
                    <option value="Mariana Lima">Mariana Lima</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#172033] block mb-1">Observações da Operação de Autopeças</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Possui furos de estoque em pastilhas e software atual é muito lento no balcão..."
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#E4E7EC] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(false)}
                  className="px-4 py-2 border border-[#E4E7EC] rounded-xl text-xs font-semibold text-[#667085]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1683E8] hover:bg-[#123B63] text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Salvar Lead & Abrir Perfil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL: MOTIVO DE PERDA                                               */}
      {/* ==================================================================== */}
      {isLossReasonModalOpen && dealToMarkLost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setIsLossReasonModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E4E7EC] overflow-hidden z-10 animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-[#E4E7EC] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-[#172033]">Registrar Motivo de Perda</h3>
                <p className="text-xs text-[#667085]">Oportunidade: {dealToMarkLost.company}</p>
              </div>
              <button onClick={() => setIsLossReasonModalOpen(false)} className="text-[#667085]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <span className="font-bold text-[#172033] block">Selecione o motivo principal:</span>
              <div className="space-y-2">
                {LOSS_REASONS.map((r) => (
                  <label
                    key={r.id}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                      selectedLossReason === r.id ? "bg-blue-50 border-[#1683E8]" : "bg-white border-[#E4E7EC]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="loss_reason"
                      value={r.id}
                      checked={selectedLossReason === r.id}
                      onChange={(e) => setSelectedLossReason(e.target.value)}
                      className="mt-0.5"
                    />
                    <span className="text-xs text-[#172033] font-medium">{r.label}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="font-bold text-[#172033] block mb-1">Observações do Vendedor</label>
                <textarea
                  rows={2}
                  placeholder="Ex: O concorrente ofereceu desconto agressivo na anuidade..."
                  value={lossObservation}
                  onChange={(e) => setLossObservation(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 outline-none text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setIsLossReasonModalOpen(false)}
                  className="px-4 py-2 border border-[#E4E7EC] rounded-xl text-xs font-semibold text-[#667085]"
                >
                  Voltar
                </button>
                <button
                  onClick={handleConfirmLoss}
                  className="px-4 py-2 bg-[#DC2626] text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Confirmar Perda
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL: WHATSAPP TEMPLATES SIMULATOR                                  */}
      {/* ==================================================================== */}
      {whatsAppModalOpen && activeWhatsAppLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setWhatsAppModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E4E7EC] overflow-hidden z-10 animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-[#E4E7EC] flex items-center justify-between bg-emerald-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#172033]">WhatsApp Comercial B2B</h3>
                  <p className="text-xs text-[#667085]">Para: {activeWhatsAppLead.name} ({activeWhatsAppLead.company})</p>
                </div>
              </div>
              <button onClick={() => setWhatsAppModalOpen(false)} className="text-[#667085]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#172033] block mb-1">Selecione o Modelo de Mensagem:</label>
                <select
                  value={selectedWaTemplate}
                  onChange={(e) => setSelectedWaTemplate(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 outline-none font-medium"
                >
                  {WHATSAPP_TEMPLATES.map((t) => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#172033] block mb-1">Pré-visualização da Mensagem:</label>
                <div className="bg-[#EFEAE2] p-4 rounded-xl border border-emerald-200/50 text-xs text-[#172033] font-mono leading-relaxed relative">
                  {WHATSAPP_TEMPLATES.find((t) => t.id === selectedWaTemplate)
                    ?.text.replace("{nome}", activeWhatsAppLead.name)
                    .replace("{empresa}", activeWhatsAppLead.company)
                    .replace("{vendedor}", "Marcus Henrique")
                    .replace("{horario}", "15:00")
                    .replace("{lojas}", String(activeWhatsAppLead.storesCount))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => {
                    showToast("Texto copiado para a área de transferência!");
                  }}
                  className="px-3.5 py-2 border border-[#E4E7EC] rounded-xl text-xs font-semibold text-[#667085] flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </button>
                <button
                  onClick={() => {
                    const newAct: CrmActivity = {
                      id: `act-${Date.now()}`,
                      type: "whatsapp",
                      title: "Mensagem de WhatsApp enviada",
                      description: `Enviado modelo "${selectedWaTemplate}" para ${activeWhatsAppLead.name}.`,
                      company: activeWhatsAppLead.company,
                      contact: activeWhatsAppLead.name,
                      author: "Marcus Henrique",
                      timestamp: "Agora",
                      timeAgo: "há instantes",
                      badge: "WhatsApp",
                    };
                    setActivities((prev) => [newAct, ...prev]);
                    setWhatsAppModalOpen(false);
                    showToast("Mensagem enviada e registrada no histórico!");
                  }}
                  className="px-4 py-2 bg-[#16A34A] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Disparar WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL: LIGAÇÃO TELEFÔNICA (CALL LOGGER)                              */}
      {/* ==================================================================== */}
      {callModalOpen && activeCallLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setCallModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E4E7EC] overflow-hidden z-10 animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-[#E4E7EC] flex items-center justify-between bg-blue-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#1683E8] text-white flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#172033]">Registrar Ligação Comercial</h3>
                  <p className="text-xs text-[#667085]">{activeCallLead.name} ({activeCallLead.phone})</p>
                </div>
              </div>
              <button onClick={() => setCallModalOpen(false)} className="text-[#667085]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#172033] block mb-1">Resultado do Contato:</label>
                <select
                  value={callOutcome}
                  onChange={(e) => setCallOutcome(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 outline-none font-medium"
                >
                  <option value="reuniao">Demonstração / Reunião Agendada</option>
                  <option value="atendido">Contato Realizado / Em Avaliação</option>
                  <option value="caixa_postal">Caixa Postal / Não Atendeu</option>
                  <option value="ocupado">Ocupado / Ligar Mais Tarde</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#172033] block mb-1">Anotações da Conversa:</label>
                <textarea
                  rows={3}
                  value={callNotes}
                  onChange={(e) => setCallNotes(e.target.value)}
                  placeholder="Ex: Conversou sobre a necessidade de emissão rápida no balcão e curva ABC para frotas..."
                  className="w-full bg-[#F8FAFC] border border-[#E4E7EC] rounded-xl p-2.5 outline-none text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setCallModalOpen(false)}
                  className="px-4 py-2 border border-[#E4E7EC] rounded-xl text-xs font-semibold text-[#667085]"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveCallLog}
                  className="px-4 py-2 bg-[#1683E8] text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Salvar Ligação
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL: BUSCA GLOBAL (CTRL + K)                                       */}
      {/* ==================================================================== */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setIsSearchModalOpen(false)}></div>
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#E4E7EC] overflow-hidden z-10 animate-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-[#E4E7EC] flex items-center gap-3">
              <Search className="w-5 h-5 text-[#1683E8]" />
              <input
                type="text"
                autoFocus
                placeholder="Pesquise por empresa de autopeças, lead, contato ou oportunidade..."
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-sm font-medium text-[#172033] placeholder:text-[#98A2B3]"
              />
              <kbd className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#F5F7FA] border border-[#E4E7EC] rounded text-[#667085]">
                ESC
              </kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {globalSearchQuery.trim() === "" ? (
                <div className="p-6 text-center text-xs text-[#98A2B3]">
                  Digite o nome de uma autopeça (ex: &quot;Silva&quot;, &quot;Motor Sul&quot;, &quot;Paulista&quot;)
                </div>
              ) : globalSearchResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#98A2B3]">
                  Nenhum resultado encontrado para &quot;{globalSearchQuery}&quot;
                </div>
              ) : (
                globalSearchResults.map((res, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setIsSearchModalOpen(false);
                      if (res.type === "Lead") {
                        setSelectedLead(res.raw as CrmLead);
                        setActiveLeadDrawer(true);
                      } else if (res.type === "Oportunidade") {
                        setActiveTab("kanban");
                      } else {
                        setActiveTab("empresas");
                      }
                    }}
                    className="p-3 hover:bg-[#EAF4FF]/50 rounded-xl cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#172033] flex items-center gap-2">
                        <span>{res.title}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-[#667085]">
                          {res.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#667085] mt-0.5">{res.subtitle}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#1683E8]" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
