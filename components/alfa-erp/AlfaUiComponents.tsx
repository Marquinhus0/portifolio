"use client";

import React, { useState } from "react";
import {
  Search,
  Check,
  AlertTriangle,
  X,
  Loader2,
  ChevronDown,
  Calendar,
  DollarSign,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Circle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { ALFA_TOKENS } from "./AlfaDesignSystemTokens";

// ============================================================================
// 1. BUTTONS DESIGN SYSTEM
// Primary | Secondary | Tertiary | Danger | Icon Button | With Loading | Disabled
// ============================================================================

export interface AlfaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "icon";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  shortcut?: string;
}

export function AlfaButton({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  iconPosition = "left",
  shortcut,
  className = "",
  ...props
}: AlfaButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1683E8] focus-visible:ring-offset-1 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "h-8 px-2.5 text-xs rounded-md gap-1.5",
    md: "h-9 px-3.5 text-xs rounded-lg gap-2",
    lg: "h-11 px-5 text-sm rounded-lg gap-2.5",
  }[size];

  const variantStyles = {
    primary:
      "bg-[#1683E8] hover:bg-[#0F73D2] active:bg-[#123B63] text-white shadow-sm disabled:bg-[#B3D9FA] disabled:text-white",
    secondary:
      "bg-white hover:bg-[#F5F7FA] active:bg-[#EAF4FF] text-[#172033] border border-[#E4E7EC] hover:border-[#D0D5DD] shadow-xs disabled:bg-[#F5F7FA] disabled:text-[#98A2B3] disabled:border-[#E4E7EC]",
    tertiary:
      "bg-transparent hover:bg-[#F5F7FA] active:bg-[#EAF4FF] text-[#475467] hover:text-[#172033] disabled:text-[#98A2B3] disabled:bg-transparent",
    danger:
      "bg-[#DC2626] hover:bg-[#B91C1C] active:bg-[#991B1B] text-white shadow-sm disabled:bg-[#FCA5A5] disabled:text-white",
    icon:
      "p-2 bg-transparent hover:bg-[#F5F7FA] active:bg-[#EAF4FF] text-[#667085] hover:text-[#172033] rounded-lg border border-transparent hover:border-[#E4E7EC] disabled:text-[#D0D5DD]",
  }[variant];

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : icon && iconPosition === "left" ? (
        <span className="shrink-0">{icon}</span>
      ) : null}

      {children}

      {!loading && icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}

      {shortcut && !loading && (
        <kbd className="ml-1.5 px-1.5 py-0.5 text-[10px] font-mono rounded bg-black/10 dark:bg-white/15 text-inherit border border-black/10">
          {shortcut}
        </kbd>
      )}
    </button>
  );
}

// ============================================================================
// 2. INPUTS DESIGN SYSTEM
// Text, Number, Currency, Search, Select, Multi-select, Date, Textarea
// States: Default, Hover, Focus, Filled, Error, Disabled, Readonly
// ============================================================================

export interface AlfaInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  stateModifier?: "default" | "error" | "readonly" | "disabled";
}

export function AlfaInput({
  label,
  error,
  hint,
  prefixIcon,
  suffixIcon,
  stateModifier,
  disabled,
  readOnly,
  className = "",
  id,
  ...props
}: AlfaInputProps) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
  const isError = Boolean(error) || stateModifier === "error";
  const isDisabled = disabled || stateModifier === "disabled";
  const isReadOnly = readOnly || stateModifier === "readonly";

  return (
    <div className="w-full text-left space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-[#344054] select-none"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {prefixIcon && (
          <div className="absolute left-3 text-[#667085] pointer-events-none flex items-center">
            {prefixIcon}
          </div>
        )}

        <input
          id={inputId}
          disabled={isDisabled}
          readOnly={isReadOnly}
          className={`w-full h-9 rounded-lg text-xs font-normal transition-colors text-[#172033] bg-white border ${
            prefixIcon ? "pl-9" : "pl-3"
          } ${suffixIcon ? "pr-9" : "pr-3"} ${
            isError
              ? "border-[#DC2626] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 bg-[#FEF3F2]/30"
              : isReadOnly
              ? "bg-[#F5F7FA] border-[#E4E7EC] text-[#667085] cursor-default"
              : isDisabled
              ? "bg-[#F5F7FA] border-[#E4E7EC] text-[#98A2B3] cursor-not-allowed"
              : "border-[#E4E7EC] hover:border-[#D0D5DD] focus:border-[#1683E8] focus:ring-2 focus:ring-[#1683E8]/20 focus:outline-none"
          } ${className}`}
          {...props}
        />

        {suffixIcon && (
          <div className="absolute right-3 text-[#667085] pointer-events-none flex items-center">
            {suffixIcon}
          </div>
        )}
      </div>

      {isError && error && (
        <p className="text-[11px] text-[#DC2626] font-medium flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          {error}
        </p>
      )}

      {!isError && hint && (
        <p className="text-[11px] text-[#667085]">{hint}</p>
      )}
    </div>
  );
}

// Select Component
export interface AlfaSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export function AlfaSelect({
  label,
  error,
  options,
  className = "",
  disabled,
  ...props
}: AlfaSelectProps) {
  return (
    <div className="w-full text-left space-y-1">
      {label && (
        <label className="block text-xs font-semibold text-[#344054] select-none">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          disabled={disabled}
          className={`w-full h-9 rounded-lg text-xs font-normal transition-colors text-[#172033] bg-white border pr-8 pl-3 appearance-none ${
            error
              ? "border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20"
              : disabled
              ? "bg-[#F5F7FA] border-[#E4E7EC] text-[#98A2B3] cursor-not-allowed"
              : "border-[#E4E7EC] hover:border-[#D0D5DD] focus:border-[#1683E8] focus:ring-2 focus:ring-[#1683E8]/20 focus:outline-none"
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-[#667085] absolute right-2.5 top-2.5 pointer-events-none" />
      </div>
      {error && <p className="text-[11px] text-[#DC2626] font-medium">{error}</p>}
    </div>
  );
}

// ============================================================================
// 3. BADGES DESIGN SYSTEM
// ============================================================================

export function AlfaBadge({
  children,
  variant = "neutral",
  size = "sm",
}: {
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger" | "neutral" | "dark";
  size?: "sm" | "md";
}) {
  const styles = {
    primary: "bg-[#EAF4FF] text-[#1683E8] border-[#B2D7FF]",
    success: "bg-[#EAF7EE] text-[#16A34A] border-[#A8E6BE]",
    warning: "bg-[#FEF7E6] text-[#B54708] border-[#FCE2A6]",
    danger: "bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]",
    neutral: "bg-[#F2F4F7] text-[#475467] border-[#E4E7EC]",
    dark: "bg-[#123B63] text-white border-[#0F3255]",
  }[variant];

  const sizeStyle = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-md border font-sans tracking-tight ${styles} ${sizeStyle}`}
    >
      {children}
    </span>
  );
}

// ============================================================================
// 4. PROCESS TIMELINE COMPONENT (REUTILIZÁVEL SPRINT 3)
// ============================================================================

export interface ProcessTimelineStep {
  id: "sugestao" | "cotacao" | "ordem" | "recebimento" | "entrada" | "estoque";
  label: string;
  status: "completed" | "current" | "pending";
  dateOrInfo?: string;
}

export function ProcessTimeline({
  steps,
  onStepClick,
}: {
  steps: ProcessTimelineStep[];
  onStepClick?: (id: ProcessTimelineStep["id"]) => void;
}) {
  return (
    <div className="w-full bg-white border border-[#E4E7EC] rounded-xl p-4 shadow-xs">
      <div className="flex items-center justify-between overflow-x-auto gap-2 pb-1">
        {steps.map((step, idx) => {
          const isCompleted = step.status === "completed";
          const isCurrent = step.status === "current";
          const isPending = step.status === "pending";

          return (
            <React.Fragment key={step.id}>
              <div
                onClick={() => onStepClick && onStepClick(step.id)}
                className={`flex items-center gap-2.5 min-w-[130px] select-none ${
                  onStepClick ? "cursor-pointer group" : ""
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                    isCompleted
                      ? "bg-[#16A34A] text-white shadow-xs"
                      : isCurrent
                      ? "bg-[#1683E8] text-white ring-4 ring-[#EAF4FF]"
                      : "bg-[#F2F4F7] text-[#98A2B3] border border-[#E4E7EC]"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <div className="min-w-0">
                  <span
                    className={`block text-xs leading-tight font-semibold truncate ${
                      isCompleted
                        ? "text-[#16A34A] group-hover:underline"
                        : isCurrent
                        ? "text-[#1683E8] font-bold group-hover:underline"
                        : "text-[#667085]"
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="block text-[10px] text-[#98A2B3] font-mono leading-tight">
                    {isCompleted
                      ? "✓ Concluída"
                      : isCurrent
                      ? "● Em andamento"
                      : "○ Aguardando"}
                  </span>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 min-w-[20px] mx-1 transition-colors ${
                    isCompleted ? "bg-[#16A34A]" : "bg-[#E4E7EC]"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// 5. TOAST FEEDBACK NOTIFICATIONS
// ============================================================================

export interface ToastMessage {
  id: string;
  type: "success" | "warning" | "error" | "info";
  message: string;
}

export function AlfaToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isWarning = toast.type === "warning";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3 rounded-lg border shadow-lg flex items-center justify-between gap-3 text-xs transition-all transform animate-in slide-in-from-bottom-2 ${
              isSuccess
                ? "bg-white border-[#16A34A] text-[#172033]"
                : isWarning
                ? "bg-white border-[#F59E0B] text-[#172033]"
                : isError
                ? "bg-white border-[#DC2626] text-[#172033]"
                : "bg-white border-[#1683E8] text-[#172033]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isSuccess && (
                <div className="w-5 h-5 rounded-full bg-[#EAF7EE] text-[#16A34A] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
              {isWarning && (
                <div className="w-5 h-5 rounded-full bg-[#FEF7E6] text-[#B54708] flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
              )}
              {isError && (
                <div className="w-5 h-5 rounded-full bg-[#FEF3F2] text-[#B42318] flex items-center justify-center shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" />
                </div>
              )}
              <span className="font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-[#98A2B3] hover:text-[#172033] p-1 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// 6. CONFIRMATION MODAL & GENERIC MODAL
// ============================================================================

export function AlfaModal({
  isOpen,
  title,
  subtitle,
  children,
  onClose,
  maxWidth = "max-w-lg",
}: {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
  maxWidth?: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className={`bg-white rounded-xl shadow-2xl border border-[#E4E7EC] w-full ${maxWidth} overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150`}
      >
        <div className="p-4 sm:p-5 border-b border-[#E4E7EC] flex items-center justify-between bg-[#F9FAFB]">
          <div>
            <h3 className="text-sm font-bold text-[#172033]">{title}</h3>
            {subtitle && <p className="text-[11px] text-[#667085] mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-[#E4E7EC] text-[#667085] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

// ============================================================================
// 7. DRAWER (FILTROS AVANÇADOS, QUICK VIEW, KARDEX)
// ============================================================================

export function AlfaDrawer({
  isOpen,
  title,
  subtitle,
  children,
  onClose,
  width = "w-[440px]",
}: {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
  width?: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />
      <div className="absolute inset-y-0 right-0 flex pl-10 max-w-full">
        <aside
          className={`bg-white shadow-2xl border-l border-[#E4E7EC] flex flex-col ${width} max-w-full z-10 animate-in slide-in-from-right duration-200`}
        >
          {/* Drawer Header */}
          <div className="p-4 border-b border-[#E4E7EC] flex items-center justify-between bg-[#F9FAFB]">
            <div>
              <h3 className="text-sm font-bold text-[#172033]">{title}</h3>
              {subtitle && <p className="text-[11px] text-[#667085] mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg hover:bg-[#E4E7EC] text-[#667085] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">{children}</div>
        </aside>
      </div>
    </div>
  );
}

// ============================================================================
// 8. SKELETON / LOADING STATES
// ============================================================================

export function AlfaTableSkeleton({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="w-full bg-white border border-[#E4E7EC] rounded-xl overflow-hidden divide-y divide-[#E4E7EC] animate-pulse">
      <div className="p-3 bg-[#F9FAFB] flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-4 bg-[#E4E7EC] rounded flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="p-3.5 flex gap-4 items-center">
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className="h-3.5 bg-[#F2F4F7] rounded"
              style={{ width: `${Math.max(40, (c + 1) * 15)}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// 9. EMPTY & ERROR STATES
// ============================================================================

export function AlfaEmptyState({
  title = "Nenhum resultado encontrado",
  description = "Não encontramos itens para os filtros selecionados.",
  actionLabel = "Limpar filtros",
  onAction,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="w-full py-16 px-4 bg-white border border-[#E4E7EC] rounded-xl flex flex-col items-center justify-center text-center">
      <div className="w-12 h-12 rounded-full bg-[#F5F7FA] border border-[#E4E7EC] flex items-center justify-center text-[#667085] mb-3">
        <Search className="w-5 h-5 text-[#98A2B3]" />
      </div>
      <h4 className="text-sm font-bold text-[#172033]">{title}</h4>
      <p className="text-xs text-[#667085] max-w-sm mt-1 mb-4">{description}</p>
      {onAction && (
        <AlfaButton variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </AlfaButton>
      )}
    </div>
  );
}

export function AlfaErrorState({
  message = "Não foi possível concluir esta operação.",
  detail = "Timeout ao sincronizar base da filial 01 com o cluster central. Código de erro: SRV_SYNC_TIMEOUT_84",
  onRetry,
}: {
  message?: string;
  detail?: string;
  onRetry?: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="w-full p-8 bg-white border border-[#DC2626]/20 rounded-xl flex flex-col items-center justify-center text-center space-y-3">
      <div className="w-11 h-11 rounded-full bg-[#FEF3F2] border border-[#FECDCA] flex items-center justify-center text-[#B42318]">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-[#172033]">{message}</h4>
        <p className="text-xs text-[#667085] max-w-md mt-1">
          Verifique sua conexão com o servidor local ou contate o suporte interno do ALFA.
        </p>
      </div>

      <div className="flex items-center gap-2 pt-1">
        {onRetry && (
          <AlfaButton variant="primary" size="sm" onClick={onRetry}>
            Tentar novamente
          </AlfaButton>
        )}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-[#1683E8] hover:underline font-medium px-2 py-1"
        >
          {showDetails ? "Ocultar detalhes" : "Ver detalhes técnicos"}
        </button>
      </div>

      {showDetails && (
        <div className="mt-3 p-3 bg-[#F5F7FA] border border-[#E4E7EC] rounded-lg text-left max-w-lg w-full font-mono text-[11px] text-[#475467] overflow-x-auto">
          {detail}
        </div>
      )}
    </div>
  );
}
