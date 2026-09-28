// ============================================================================
// ALFA ERP DESIGN SYSTEM — TOKENS & CONSTANTS
// Baseado estritamente nas especificações de Design System da 2ª e 3ª Etapa
// ============================================================================

export const ALFA_TOKENS = {
  colors: {
    primary: "#1683E8",
    primaryDark: "#123B63",
    primaryLight: "#EAF4FF",
    background: "#F5F7FA",
    surface: "#FFFFFF",
    text: "#172033",
    textSecondary: "#667085",
    border: "#E4E7EC",
    success: "#16A34A",
    warning: "#F59E0B",
    danger: "#DC2626",
  },
  typography: {
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    headings: {
      h1: "32px",
      h2: "28px",
      h3: "24px",
    },
    body: {
      lg: "16px",
      md: "14px",
      sm: "13px",
    },
    caption: {
      md: "12px",
      sm: "11px",
    },
  },
  radius: {
    sm: "6px",
    md: "8px",
    lg: "10px",
    xl: "12px",
  },
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

export type AlfaNavSection =
  | "inicio"
  | "itens"
  | "item_cadastro"
  | "pessoas"
  | "pessoa_cadastro"
  | "empresas"
  | "marcas"
  | "estoque"
  | "compras"
  | "cotacao"
  | "sugestao"
  | "ordem_detalhe"
  | "recebimento"
  | "vendas"
  | "financeiro"
  | "fiscal"
  | "crm"
  | "relatorios"
  | "configuracoes";
