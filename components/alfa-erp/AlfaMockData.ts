// ============================================================================
// ALFA ERP — MOCK DATA DE AUTOPEÇAS (ESPECIALIZADO & OPERACIONAL)
// SPRINT 3: GESTÃO COMPLETA DE COMPRAS, SUGESTÃO, COTAÇÃO, OC, RECEBIMENTO & ESTOQUE
// ============================================================================

export interface AutoPartItem {
  id: number;
  codigo: string;
  item: string;
  tipo: string;
  marca: string;
  fabricante: string;
  oem: string;
  ncm: string;
  cest: string;
  gtin: string;
  codigoFabricante: string;
  estoque: number;
  estoqueMin: number;
  estoqueMax: number;
  pontoPedido: number;
  reservado: number;
  venda: number;
  vendaAtacado: number;
  custo: number;
  custoMedio: number;
  localizacao: string;
  status: "disponivel" | "baixo" | "negativo";
  aplicacao: string;
  curvaAbc: "A" | "B" | "C";
  mediaVendaMensal: number;
  unidade: string;
  equivalencias: Array<{ marca: string; codigo: string }>;
  filiais: Array<{ filial: string; saldo: number; reservado: number }>;
  recemRecebidoBadge?: string; // Para destacar visualmente pós-recebimento no Sprint 3
}

export interface PersonRecord {
  id: number;
  codigo: string;
  nome: string;
  nomeFantasia: string;
  documento: string;
  inscricaoEstadual: string;
  tipo: "PJ" | "PF";
  classificacao: "Oficina Mecânica" | "AutoPeças Revenda" | "Frotista" | "Fornecedor";
  cidade: string;
  uf: string;
  cep: string;
  endereco: string;
  telefone: string;
  whatsapp: string;
  email: string;
  contatoResponsavel: string;
  limiteCredito: number;
  saldoDevedor: number;
  tabelaPreco: string;
  condicaoPagamento: string;
  status: "Ativo" | "Bloqueado" | "Em Análise";
  ultimaCompraData: string;
  ultimaCompraValor: number;
  totalComprado: number;
}

export interface StockAlert {
  id: string;
  tipo: "negativo" | "baixo" | "inadimplencia" | "cotacao" | "recebimento";
  titulo: string;
  descricao: string;
  acaoTexto: string;
  acaoSecao: string;
  prioridade: "alta" | "media" | "baixa";
}

export interface KardexMovement {
  id: number;
  data: string;
  tipo: "ENTRADA" | "SAIDA" | "AJUSTE";
  documento: string;
  origemDestino: string;
  quantidade: number;
  saldoApos: number;
  custoUnitario: number;
  operador: string;
}

// ============================================================================
// SPRINT 3: GESTÃO DE COMPRAS ENTIDADES
// ============================================================================

export interface PurchaseSuggestionItem {
  id: number;
  codigo: string;
  produto: string;
  marca: string;
  categoria: string;
  estoqueAtual: number;
  estoqueMin: number;
  estoqueMax: number;
  mediaVendas: string;
  ultimaCompraData: string;
  ultimoCusto: number;
  fornecedorHabitual: string;
  quantidadeSugerida: number;
  motivo: string;
  status: "Crítico" | "Atenção" | "Normal";
  historicoCompras: Array<{
    numero: string;
    quantidade: number;
    valorUnitario: number;
    data: string;
  }>;
  justificativas: string[];
}

export interface QuotationSupplierOption {
  key: string;
  nome: string;
  cidade: string;
  precoUnitarioExemplo: number;
  precoTotal: number;
  prazo: string;
  prazoDias: number;
  frete: number;
  freteTexto: string;
  disponibilidade: number;
  badgeDestaque: string;
  isFreteGratis: boolean;
  isMenorPreco: boolean;
  isMenorPrazo: boolean;
  isMelhorDisponibilidade: boolean;
}

export interface QuotationData {
  id: string;
  status: "Em análise" | "Aprovada" | "Convertida em OC";
  produtosCount: number;
  valorEstimado: number;
  dataAbertura: string;
  validade: string;
  responsavel: string;
  fornecedores: QuotationSupplierOption[];
  itens: Array<{
    codigo: string;
    descricao: string;
    quantidade: number;
    precos: Record<string, { unit: number; subtotal: number; prazo: string; frete: string }>;
  }>;
}

export interface PurchaseOrderRecord {
  id: string; // "00183"
  status: "Aguardando recebimento" | "Recebido parcialmente" | "Concluído";
  fornecedor: string;
  fornecedorCidade: string;
  dataEmissao: string;
  previsaoEntrega: string;
  itens: Array<{
    id: number;
    codigo: string;
    produto: string;
    quantidade: number;
    valorUnitario: number;
    desconto: number;
    total: number;
  }>;
  subtotal: number;
  frete: number;
  desconto: number;
  total: number;
  condicaoPagamento: string;
}

export interface ReceivingItemCheck {
  id: number;
  codigo: string;
  produto: string;
  esperado: number;
  recebido: number;
  diferenca: number;
  status: "Conferido" | "Divergência";
}

export interface AttentionItem {
  id: string;
  texto: string;
  linkTexto: string;
  secaoDestino: "sugestao" | "cotacao" | "ordem_detalhe" | "recebimento" | "estoque";
  tipo: "critico" | "aviso" | "info";
  contador: string;
}

export interface RecentActivityItem {
  id: string;
  hora: string;
  texto: string;
  tipo: "ordem" | "cotacao" | "estoque" | "venda";
}

// ============================================================================
// BASE INICIAL DE ITENS (CATÁLOGO GERAL)
// ============================================================================

export const INITIAL_ITEMS: AutoPartItem[] = [
  {
    id: 45872,
    codigo: "45872",
    item: "Filtro de Óleo Tecfil",
    tipo: "FILTRO",
    marca: "Tecfil",
    fabricante: "Tecfil Indústria",
    oem: "04E-115-561-H",
    ncm: "8421.2300",
    cest: "01.002.00",
    gtin: "7891234045872",
    codigoFabricante: "PSL561",
    estoque: 4, // Estoque crítico para Sprint 3
    estoqueMin: 10,
    estoqueMax: 30,
    pontoPedido: 12,
    reservado: 0,
    venda: 32.5,
    vendaAtacado: 27.9,
    custo: 18.9,
    custoMedio: 18.5,
    localizacao: "Rua 02 • Prat. B1 • Gav. 01",
    status: "baixo",
    aplicacao: "VW Fox 1.0/1.6, Gol G4/G5, Polo 1.6, Audi A3 1.4 TSI",
    curvaAbc: "A",
    mediaVendaMensal: 8,
    unidade: "UN",
    equivalencias: [
      { marca: "Fram", codigo: "PH5548" },
      { marca: "Mahle", codigo: "OC 521" },
      { marca: "Mann", codigo: "W 712/94" },
    ],
    filiais: [
      { filial: "01 - Matriz Toledo", saldo: 4, reservado: 0 },
      { filial: "02 - Cascavel", saldo: 2, reservado: 0 },
      { filial: "03 - Maringá", saldo: 1, reservado: 0 },
    ],
  },
  {
    id: 3601,
    codigo: "3601",
    item: "Pastilha de Freio Dianteira Fras-le Cerâmica",
    tipo: "FREIOS",
    marca: "Fras-le",
    fabricante: "Fras-le S.A.",
    oem: "5U0 698 151",
    ncm: "8708.3090",
    cest: "01.011.00",
    gtin: "7893026036012",
    codigoFabricante: "PD/360-C",
    estoque: 2, // Crítico
    estoqueMin: 12,
    estoqueMax: 40,
    pontoPedido: 15,
    reservado: 1,
    venda: 115.0,
    vendaAtacado: 96.0,
    custo: 74.0,
    custoMedio: 73.2,
    localizacao: "Rua 03 • Prat. B3 • Gav. 02",
    status: "baixo",
    aplicacao: "VW Gol G5/G6/G7, Fox 1.6, Voyage 1.6 Sistema Teves",
    curvaAbc: "A",
    mediaVendaMensal: 16,
    unidade: "JG",
    equivalencias: [
      { marca: "Cobreq", codigo: "N-284" },
      { marca: "Syl", codigo: "SYL 1094" },
    ],
    filiais: [
      { filial: "01 - Matriz Toledo", saldo: 2, reservado: 1 },
      { filial: "02 - Cascavel", saldo: 1, reservado: 0 },
      { filial: "03 - Maringá", saldo: 0, reservado: 0 },
    ],
  },
  {
    id: 6033,
    codigo: "6033",
    item: "Jogo de Velas de Ignição Green Plug (4 un)",
    tipo: "IGNIÇÃO",
    marca: "NGK",
    fabricante: "Niterra / NGK do Brasil",
    oem: "101 000 033 AA",
    ncm: "8511.1000",
    cest: "01.008.00",
    gtin: "7897707500123",
    codigoFabricante: "BKR6E-11",
    estoque: 14,
    estoqueMin: 40,
    estoqueMax: 120,
    pontoPedido: 45,
    reservado: 2,
    venda: 98.0,
    vendaAtacado: 84.0,
    custo: 62.0,
    custoMedio: 61.5,
    localizacao: "Rua 01 • Prat. D1 • Gav. 08",
    status: "baixo",
    aplicacao: "VW EA111 1.0/1.6 Flex, Fiat Fire 1.0/1.3 8V, GM VHC 1.0",
    curvaAbc: "A",
    mediaVendaMensal: 35,
    unidade: "JG",
    equivalencias: [
      { marca: "Bosch", codigo: "FR7DC+" },
      { marca: "Magneti Marelli", codigo: "KJ6RTC" },
    ],
    filiais: [
      { filial: "01 - Matriz Toledo", saldo: 14, reservado: 2 },
      { filial: "02 - Cascavel", saldo: 6, reservado: 0 },
      { filial: "03 - Maringá", saldo: 4, reservado: 0 },
    ],
  },
  {
    id: 2620,
    codigo: "2620",
    item: "Filtro de ar motor Tecfil",
    tipo: "FILTRO",
    marca: "Tecfil",
    fabricante: "Tecfil Indústria",
    oem: "86AU-9601-A",
    ncm: "8421.3100",
    cest: "01.001.00",
    gtin: "7891234026201",
    codigoFabricante: "ARL6096",
    estoque: 8,
    estoqueMin: 20,
    estoqueMax: 80,
    pontoPedido: 25,
    reservado: 0,
    venda: 91.8,
    vendaAtacado: 78.5,
    custo: 52.4,
    custoMedio: 51.8,
    localizacao: "Rua 02 • Prat. A3 • Gav. 04",
    status: "baixo",
    aplicacao: "VW Gol G5/G6 1.0/1.6 08/16, Voyage 08/16, Fox 08/14",
    curvaAbc: "A",
    mediaVendaMensal: 22,
    unidade: "UN",
    equivalencias: [
      { marca: "Fram", codigo: "CA-5496" },
      { marca: "Mahle", codigo: "LX 998" },
      { marca: "Mann", codigo: "C 2998" },
    ],
    filiais: [
      { filial: "01 - Matriz Toledo", saldo: 8, reservado: 0 },
      { filial: "02 - Cascavel", saldo: 4, reservado: 0 },
      { filial: "03 - Maringá", saldo: 2, reservado: 0 },
    ],
  },
  {
    id: 786,
    codigo: "786",
    item: "Filtro ar condicionado (Cabine)",
    tipo: "FILTRO",
    marca: "Tecfil",
    fabricante: "Tecfil Indústria",
    oem: "6Q0-820-367-B",
    ncm: "8421.3990",
    cest: "01.003.00",
    gtin: "7891234007865",
    codigoFabricante: "ACP001",
    estoque: -1,
    estoqueMin: 15,
    estoqueMax: 50,
    pontoPedido: 18,
    reservado: 0,
    venda: 35.5,
    vendaAtacado: 29.9,
    custo: 19.2,
    custoMedio: 19.0,
    localizacao: "Rua 02 • Prat. A1 • Gav. 06",
    status: "negativo",
    aplicacao: "VW Polo, Fox, Gol G5/G6, Voyage, Saveiro",
    curvaAbc: "A",
    mediaVendaMensal: 18,
    unidade: "UN",
    equivalencias: [
      { marca: "Fram", codigo: "CF9408" },
      { marca: "Mahle", codigo: "LA 120" },
    ],
    filiais: [
      { filial: "01 - Matriz Toledo", saldo: -1, reservado: 0 },
      { filial: "02 - Cascavel", saldo: 0, reservado: 0 },
      { filial: "03 - Maringá", saldo: 0, reservado: 0 },
    ],
  },
  {
    id: 4210,
    codigo: "BD-4210",
    item: "Disco de Freio Dianteiro Ventilado 280mm",
    tipo: "FREIOS",
    marca: "Fremax",
    fabricante: "Fremax Freios",
    oem: "1K0 615 301 T",
    ncm: "8708.3090",
    cest: "01.012.00",
    gtin: "7892182042109",
    codigoFabricante: "BD4210",
    estoque: 3,
    estoqueMin: 8,
    estoqueMax: 25,
    pontoPedido: 10,
    reservado: 0,
    venda: 185.0,
    vendaAtacado: 156.0,
    custo: 124.0,
    custoMedio: 122.0,
    localizacao: "Rua 03 • Prat. C1 • Gav. 05",
    status: "baixo",
    aplicacao: "VW Golf 1.6/2.0, Audi A3 1.8T, Bora 2.0, New Beetle",
    curvaAbc: "B",
    mediaVendaMensal: 6,
    unidade: "PAR",
    equivalencias: [
      { marca: "Hipper Freios", codigo: "HF 28" },
      { marca: "TRW", codigo: "DF4310" },
    ],
    filiais: [
      { filial: "01 - Matriz Toledo", saldo: 3, reservado: 0 },
      { filial: "02 - Cascavel", saldo: 1, reservado: 0 },
      { filial: "03 - Maringá", saldo: 1, reservado: 0 },
    ],
  },
  {
    id: 2085,
    codigo: "FPR2085",
    item: "Farol Principal FO Escort/Verona 87/92 LD",
    tipo: "ILUMINAÇÃO",
    marca: "Arteb",
    fabricante: "Arteb Iluminação",
    oem: "86AU 13005 A",
    ncm: "8512.2022",
    cest: "01.015.00",
    gtin: "7891234020851",
    codigoFabricante: "0160171",
    estoque: 6,
    estoqueMin: 15,
    estoqueMax: 35,
    pontoPedido: 16,
    reservado: 1,
    venda: 94.9,
    vendaAtacado: 82.0,
    custo: 65.0,
    custoMedio: 64.5,
    localizacao: "Rua 04 • Prat. C2 • Gav. 01",
    status: "baixo",
    aplicacao: "Ford Escort 87/92, Verona 87/92, Apollo 90/92",
    curvaAbc: "B",
    mediaVendaMensal: 7,
    unidade: "UN",
    equivalencias: [{ marca: "Orgus", codigo: "FG-142LD" }],
    filiais: [
      { filial: "01 - Matriz Toledo", saldo: 6, reservado: 1 },
      { filial: "02 - Cascavel", saldo: 2, reservado: 0 },
      { filial: "03 - Maringá", saldo: 1, reservado: 0 },
    ],
  },
  {
    id: 5180,
    codigo: "AT5180027",
    item: "Farol Principal VW Gol/Voyage 91/95 Cromado",
    tipo: "ILUMINAÇÃO",
    marca: "Arteb",
    fabricante: "Arteb Iluminação",
    oem: "305 941 017 1",
    ncm: "8512.2022",
    cest: "01.015.00",
    gtin: "7891234051802",
    codigoFabricante: "0160271",
    estoque: 5,
    estoqueMin: 12,
    estoqueMax: 30,
    pontoPedido: 14,
    reservado: 0,
    venda: 148.0,
    vendaAtacado: 126.0,
    custo: 98.5,
    custoMedio: 97.2,
    localizacao: "Rua 04 • Prat. C1 • Gav. 03",
    status: "baixo",
    aplicacao: "VW Gol Quadrado 91/95, Parati 91/95, Saveiro 91/95",
    curvaAbc: "B",
    mediaVendaMensal: 5,
    unidade: "UN",
    equivalencias: [{ marca: "Orgus", codigo: "FG-091LD" }],
    filiais: [
      { filial: "01 - Matriz Toledo", saldo: 5, reservado: 0 },
      { filial: "02 - Cascavel", saldo: 2, reservado: 0 },
      { filial: "03 - Maringá", saldo: 1, reservado: 0 },
    ],
  },
];

// ============================================================================
// SUGESTÕES DE COMPRA ESTRUTURADAS (SPRINT 3 ITEM 4 & 5)
// ============================================================================

export const PURCHASE_SUGGESTIONS: PurchaseSuggestionItem[] = [
  {
    id: 45872,
    codigo: "45872",
    produto: "Filtro de Óleo Tecfil",
    marca: "Tecfil",
    categoria: "Filtros Automotivos",
    estoqueAtual: 4,
    estoqueMin: 10,
    estoqueMax: 30,
    mediaVendas: "8/mês",
    ultimaCompraData: "12/08/2026",
    ultimoCusto: 18.9,
    fornecedorHabitual: "Distribuidora DPK",
    quantidadeSugerida: 15,
    motivo: "Estoque abaixo do mínimo",
    status: "Crítico",
    historicoCompras: [
      { numero: "#1827", quantidade: 32, valorUnitario: 18.9, data: "12/08/2026" },
      { numero: "#1741", quantidade: 20, valorUnitario: 19.4, data: "21/07/2026" },
      { numero: "#1605", quantidade: 25, valorUnitario: 18.5, data: "15/06/2026" },
    ],
    justificativas: [
      "✓ Estoque abaixo do mínimo (4 de 10 un)",
      "✓ Média de vendas elevada (8 un/mês no balcão)",
      "✓ Última compra há mais de 30 dias (12/08/2026)",
      "✓ Fornecedor habitual disponível para envio em 24h",
    ],
  },
  {
    id: 3601,
    codigo: "3601",
    produto: "Pastilha de Freio Dianteira Fras-le Cerâmica",
    marca: "Fras-le",
    categoria: "Sistemas de Freio",
    estoqueAtual: 2,
    estoqueMin: 12,
    estoqueMax: 40,
    mediaVendas: "16/mês",
    ultimaCompraData: "04/08/2026",
    ultimoCusto: 74.0,
    fornecedorHabitual: "AutoMax Distribuidora",
    quantidadeSugerida: 20,
    motivo: "Estoque abaixo do mínimo",
    status: "Crítico",
    historicoCompras: [
      { numero: "#1810", quantidade: 15, valorUnitario: 74.0, data: "04/08/2026" },
      { numero: "#1690", quantidade: 20, valorUnitario: 72.8, data: "10/07/2026" },
    ],
    justificativas: [
      "✓ Estoque abaixo do mínimo (2 de 12 un)",
      "✓ Giro acelerado por oficinas parceiras (16 un/mês)",
      "✓ Ponto de pedido ultrapassado",
      "✓ Preço estável com distribuidor local",
    ],
  },
  {
    id: 6033,
    codigo: "6033",
    produto: "Jogo de Velas de Ignição Green Plug (4 un)",
    marca: "NGK",
    categoria: "Ignição & Velas",
    estoqueAtual: 14,
    estoqueMin: 40,
    estoqueMax: 120,
    mediaVendas: "35/mês",
    ultimaCompraData: "20/07/2026",
    ultimoCusto: 62.0,
    fornecedorHabitual: "Pellegrino Distribuidora",
    quantidadeSugerida: 40,
    motivo: "Ponto de pedido atingido",
    status: "Crítico",
    historicoCompras: [
      { numero: "#1745", quantidade: 40, valorUnitario: 62.0, data: "20/07/2026" },
      { numero: "#1590", quantidade: 50, valorUnitario: 61.5, data: "05/06/2026" },
    ],
    justificativas: [
      "✓ Estoque abaixo do ponto de pedido (14 de 40 un)",
      "✓ Curva A com alto volume de vendas diárias",
      "✓ Risco de ruptura em 5 dias úteis",
    ],
  },
  {
    id: 2620,
    codigo: "2620",
    produto: "Filtro de ar motor Tecfil",
    marca: "Tecfil",
    categoria: "Filtros Automotivos",
    estoqueAtual: 8,
    estoqueMin: 20,
    estoqueMax: 80,
    mediaVendas: "22/mês",
    ultimaCompraData: "15/08/2026",
    ultimoCusto: 52.4,
    fornecedorHabitual: "Tecfil Indústria",
    quantidadeSugerida: 30,
    motivo: "Estoque abaixo do mínimo",
    status: "Crítico",
    historicoCompras: [
      { numero: "#1832", quantidade: 40, valorUnitario: 52.4, data: "15/08/2026" },
    ],
    justificativas: [
      "✓ Estoque em 8 un (mínimo exigido: 20 un)",
      "✓ Aplicação em frotas VW EA111 de alto volume",
      "✓ Reposição programada quinzenal",
    ],
  },
  {
    id: 786,
    codigo: "786",
    produto: "Filtro ar condicionado (Cabine)",
    marca: "Tecfil",
    categoria: "Filtros Automotivos",
    estoqueAtual: -1,
    estoqueMin: 15,
    estoqueMax: 50,
    mediaVendas: "18/mês",
    ultimaCompraData: "10/08/2026",
    ultimoCusto: 19.2,
    fornecedorHabitual: "Distribuidora DPK",
    quantidadeSugerida: 25,
    motivo: "Estoque negativo (-1)",
    status: "Crítico",
    historicoCompras: [
      { numero: "#1820", quantidade: 25, valorUnitario: 19.2, data: "10/08/2026" },
    ],
    justificativas: [
      "✓ Estoque negativo: venda balcão sem entrada prévia",
      "✓ Demanda de verão em alta para sistemas de climatização",
      "✓ Necessita regularização de saldo imediata",
    ],
  },
];

// ============================================================================
// COTAÇÃO MULTILATERAL #00091 (SPRINT 3 ITEM 6)
// ============================================================================

export const QUOTATION_00091: QuotationData = {
  id: "00091",
  status: "Em análise",
  produtosCount: 12,
  valorEstimado: 8452.0,
  dataAbertura: "25/09/2026 09:30",
  validade: "28/09/2026",
  responsavel: "Marcus Ritta (Suprimentos)",
  fornecedores: [
    {
      key: "fornecedor_a",
      nome: "Fornecedor A (AutoMax Distribuidora)",
      cidade: "Maringá / PR",
      precoUnitarioExemplo: 18.9,
      precoTotal: 8452.0,
      prazo: "2 dias",
      prazoDias: 2,
      frete: 120.0,
      freteTexto: "R$ 120,00",
      disponibilidade: 100,
      badgeDestaque: "Disponibilidade 100%",
      isFreteGratis: false,
      isMenorPreco: false,
      isMenorPrazo: false,
      isMelhorDisponibilidade: true,
    },
    {
      key: "fornecedor_b",
      nome: "Fornecedor B (Distribuidora DPK)",
      cidade: "Campinas / SP",
      precoUnitarioExemplo: 17.8,
      precoTotal: 7980.0,
      prazo: "5 dias",
      prazoDias: 5,
      frete: 0.0,
      freteTexto: "Frete Grátis (R$ 0)",
      disponibilidade: 80,
      badgeDestaque: "Menor Preço & Frete Grátis",
      isFreteGratis: true,
      isMenorPreco: true,
      isMenorPrazo: false,
      isMelhorDisponibilidade: false,
    },
    {
      key: "fornecedor_c",
      nome: "Fornecedor C (Pellegrino Distribuidora)",
      cidade: "Curitiba / PR",
      precoUnitarioExemplo: 19.2,
      precoTotal: 8610.0,
      prazo: "1 dia",
      prazoDias: 1,
      frete: 180.0,
      freteTexto: "R$ 180,00",
      disponibilidade: 100,
      badgeDestaque: "Entrega Mais Rápida (24h)",
      isFreteGratis: false,
      isMenorPreco: false,
      isMenorPrazo: true,
      isMelhorDisponibilidade: true,
    },
  ],
  itens: [
    {
      codigo: "45872",
      descricao: "Filtro de Óleo Tecfil",
      quantidade: 15,
      precos: {
        fornecedor_a: { unit: 18.9, subtotal: 283.5, prazo: "2 dias", frete: "R$ 120" },
        fornecedor_b: { unit: 17.8, subtotal: 267.0, prazo: "5 dias", frete: "Grátis" },
        fornecedor_c: { unit: 19.2, subtotal: 288.0, prazo: "1 dia", frete: "R$ 180" },
      },
    },
    {
      codigo: "3601",
      descricao: "Pastilha de Freio Dianteira Fras-le",
      quantidade: 20,
      precos: {
        fornecedor_a: { unit: 74.0, subtotal: 1480.0, prazo: "2 dias", frete: "R$ 120" },
        fornecedor_b: { unit: 71.5, subtotal: 1430.0, prazo: "5 dias", frete: "Grátis" },
        fornecedor_c: { unit: 75.0, subtotal: 1500.0, prazo: "1 dia", frete: "R$ 180" },
      },
    },
    {
      codigo: "6033",
      descricao: "Jogo de Velas de Ignição NGK Green Plug",
      quantidade: 40,
      precos: {
        fornecedor_a: { unit: 62.0, subtotal: 2480.0, prazo: "2 dias", frete: "R$ 120" },
        fornecedor_b: { unit: 59.5, subtotal: 2380.0, prazo: "5 dias", frete: "Grátis" },
        fornecedor_c: { unit: 63.0, subtotal: 2520.0, prazo: "1 dia", frete: "R$ 180" },
      },
    },
    {
      codigo: "2620",
      descricao: "Filtro de ar motor Tecfil",
      quantidade: 30,
      precos: {
        fornecedor_a: { unit: 52.4, subtotal: 1572.0, prazo: "2 dias", frete: "R$ 120" },
        fornecedor_b: { unit: 50.8, subtotal: 1524.0, prazo: "5 dias", frete: "Grátis" },
        fornecedor_c: { unit: 53.5, subtotal: 1605.0, prazo: "1 dia", frete: "R$ 180" },
      },
    },
  ],
};

// ============================================================================
// ORDEM DE COMPRA INICIAL #00183 (SPRINT 3 ITEM 8)
// ============================================================================

export const INITIAL_PURCHASE_ORDER_00183: PurchaseOrderRecord = {
  id: "00183",
  status: "Aguardando recebimento",
  fornecedor: "Distribuidora DPK Peças Ltda",
  fornecedorCidade: "Campinas / SP • CNPJ: 14.892.109/0001-90",
  dataEmissao: "25/09/2026 09:42",
  previsaoEntrega: "27/09/2026",
  itens: [
    {
      id: 1,
      codigo: "45872",
      produto: "Filtro de Óleo Tecfil",
      quantidade: 15,
      valorUnitario: 17.8,
      desconto: 0,
      total: 267.0,
    },
    {
      id: 2,
      codigo: "3601",
      produto: "Pastilha de Freio Dianteira Fras-le",
      quantidade: 20,
      valorUnitario: 71.5,
      desconto: 0,
      total: 1430.0,
    },
    {
      id: 3,
      codigo: "6033",
      produto: "Jogo de Velas de Ignição NGK Green Plug",
      quantidade: 40,
      valorUnitario: 59.5,
      desconto: 0,
      total: 2380.0,
    },
    {
      id: 4,
      codigo: "2620",
      produto: "Filtro de ar motor Tecfil",
      quantidade: 30,
      valorUnitario: 50.8,
      desconto: 0,
      total: 1524.0,
    },
  ],
  subtotal: 5601.0,
  frete: 0.0, // Frete grátis negociado na DPK
  desconto: 0.0,
  total: 5601.0,
  condicaoPagamento: "Boleto Faturado 28 DDL",
};

// ============================================================================
// RECEBIMENTO E CONFERÊNCIA INICIAL (SPRINT 3 ITEM 9)
// ============================================================================

export const INITIAL_RECEIVING_CHECKS: ReceivingItemCheck[] = [
  {
    id: 1,
    codigo: "45872",
    produto: "Filtro de Óleo Tecfil",
    esperado: 15,
    recebido: 15,
    diferenca: 0,
    status: "Conferido",
  },
  {
    id: 2,
    codigo: "3601",
    produto: "Pastilha de Freio Dianteira Fras-le",
    esperado: 20,
    recebido: 18, // Simulação de divergência solicitada pelo Sprint 3!
    diferenca: -2,
    status: "Divergência",
  },
  {
    id: 3,
    codigo: "6033",
    produto: "Jogo de Velas de Ignição NGK Green Plug",
    esperado: 40,
    recebido: 40,
    diferenca: 0,
    status: "Conferido",
  },
  {
    id: 4,
    codigo: "2620",
    produto: "Filtro de ar motor Tecfil",
    esperado: 30,
    recebido: 30,
    diferenca: 0,
    status: "Conferido",
  },
];

// ============================================================================
// COMMAND CENTER: ATENÇÃO & ATIVIDADE RECENTE (SPRINT 3 ITEM 12)
// ============================================================================

export const ATTENTION_CARDS: AttentionItem[] = [
  {
    id: "att-1",
    texto: "8 produtos abaixo do estoque mínimo",
    linkTexto: "Ver sugestões",
    secaoDestino: "sugestao",
    tipo: "critico",
    contador: "8 itens",
  },
  {
    id: "att-2",
    texto: "3 cotações aguardando análise",
    linkTexto: "Ver cotações",
    secaoDestino: "cotacao",
    tipo: "aviso",
    contador: "3 cotações",
  },
  {
    id: "att-3",
    texto: "2 pedidos aguardando recebimento",
    linkTexto: "Ver pedidos",
    secaoDestino: "ordem_detalhe",
    tipo: "info",
    contador: "2 pedidos",
  },
  {
    id: "att-4",
    texto: "1 entrada com divergência de quantidade",
    linkTexto: "Ver recebimento",
    secaoDestino: "recebimento",
    tipo: "critico",
    contador: "1 divergência",
  },
];

export const RECENT_ACTIVITIES: RecentActivityItem[] = [
  {
    id: "act-1",
    hora: "09:42",
    texto: "Ordem #00183 criada para Distribuidora DPK",
    tipo: "ordem",
  },
  {
    id: "act-2",
    hora: "09:35",
    texto: "Cotação #00091 atualizada com propostas de 3 distribuidores",
    tipo: "cotacao",
  },
  {
    id: "act-3",
    hora: "09:21",
    texto: "Produto 45872 (Filtro de Óleo) atingiu nível crítico (4 un)",
    tipo: "estoque",
  },
  {
    id: "act-4",
    hora: "09:08",
    texto: "Nova venda balcão #12893 emitida com sucesso (NFC-e)",
    tipo: "venda",
  },
];

export const INITIAL_PERSONS: PersonRecord[] = [
  {
    id: 101,
    codigo: "CLI-0101",
    nome: "Auto Peças Maringá Distribuição Ltda",
    nomeFantasia: "Auto Peças Maringá",
    documento: "04.912.834/0001-92",
    inscricaoEstadual: "901.234.56-78",
    tipo: "PJ",
    classificacao: "AutoPeças Revenda",
    cidade: "Maringá",
    uf: "PR",
    cep: "87020-000",
    endereco: "Av. Brasil, 4520 • Zona 03",
    telefone: "(44) 3028-4400",
    whatsapp: "(44) 99881-2233",
    email: "compras@pecasmaringa.com.br",
    contatoResponsavel: "Marcos Paulo (Gerente de Compras)",
    limiteCredito: 45000,
    saldoDevedor: 8420,
    tabelaPreco: "Tabela Revenda Atacado (-15%)",
    condicaoPagamento: "Boleto 28/42/56 dias",
    status: "Ativo",
    ultimaCompraData: "18/09/2026",
    ultimaCompraValor: 6480.0,
    totalComprado: 92450.0,
  },
  {
    id: 102,
    codigo: "CLI-0102",
    nome: "Mecânica & Centro Automotivo Silva Ltda",
    nomeFantasia: "Silva Auto Center",
    documento: "18.291.049/0001-40",
    inscricaoEstadual: "904.551.20-11",
    tipo: "PJ",
    classificacao: "Oficina Mecânica",
    cidade: "Toledo",
    uf: "PR",
    cep: "85900-110",
    endereco: "Rua Santos Dumont, 1280 • Centro",
    telefone: "(45) 3277-8910",
    whatsapp: "(45) 99123-4567",
    email: "financeiro@silvaautocenter.com.br",
    contatoResponsavel: "Roberto Silva (Proprietário)",
    limiteCredito: 25000,
    saldoDevedor: 4850,
    tabelaPreco: "Tabela Oficina (-12%)",
    condicaoPagamento: "Boleto 14/28 dias",
    status: "Ativo",
    ultimaCompraData: "24/09/2026",
    ultimaCompraValor: 1420.5,
    totalComprado: 48720.0,
  },
  {
    id: 104,
    codigo: "FOR-0104",
    nome: "Tecfil Indústria e Comércio de Filtros Ltda",
    nomeFantasia: "Tecfil Filtros",
    documento: "61.123.456/0001-70",
    inscricaoEstadual: "336.104.990.112",
    tipo: "PJ",
    classificacao: "Fornecedor",
    cidade: "Guarulhos",
    uf: "SP",
    cep: "07250-130",
    endereco: "Via Dutra, Km 215 • Bonsucesso",
    telefone: "(11) 2462-8000",
    whatsapp: "(11) 98765-4321",
    email: "pedidos@tecfil.com.br",
    contatoResponsavel: "Luciana Prado (Representante PR)",
    limiteCredito: 0,
    saldoDevedor: 0,
    tabelaPreco: "Compra Direta Fábrica",
    condicaoPagamento: "Boleto 30/60/90 dias",
    status: "Ativo",
    ultimaCompraData: "05/09/2026",
    ultimaCompraValor: 24500.0,
    totalComprado: 185000.0,
  },
];

export const INITIAL_ALERTS: StockAlert[] = [
  {
    id: "alert-1",
    tipo: "baixo",
    titulo: "Filtro de Óleo 45872 em Nível Crítico",
    descricao: "Estoque em 4 unidades (mínimo de segurança: 10 un).",
    acaoTexto: "Abrir Sugestão",
    acaoSecao: "sugestao",
    prioridade: "alta",
  },
  {
    id: "alert-2",
    tipo: "cotacao",
    titulo: "Cotação #00091 Pronta para Análise",
    descricao: "3 distribuidores responderam propostas comerciais para 12 produtos.",
    acaoTexto: "Comparar Cotação",
    acaoSecao: "cotacao",
    prioridade: "alta",
  },
  {
    id: "alert-3",
    tipo: "recebimento",
    titulo: "Ordem #00183 Aguardando Recebimento",
    descricao: "Caminhão da distribuidora DPK entregou na doca de Toledo.",
    acaoTexto: "Conferir Carga",
    acaoSecao: "recebimento",
    prioridade: "alta",
  },
  {
    id: "alert-4",
    tipo: "negativo",
    titulo: "Filtro de Cabine 786 com Saldo Negativo",
    descricao: "Saldo atual em -1 unidade. Regularização necessária.",
    acaoTexto: "Ver no Estoque",
    acaoSecao: "estoque",
    prioridade: "media",
  },
];

export const MOCK_KARDEX: KardexMovement[] = [
  {
    id: 1,
    data: "25/09/2026 09:08",
    tipo: "SAIDA",
    documento: "NFC-e 12893",
    origemDestino: "Venda Balcão • Balcão Rápido",
    quantidade: -1,
    saldoApos: 4,
    custoUnitario: 18.9,
    operador: "Marcus Ritta",
  },
  {
    id: 2,
    data: "12/08/2026 14:15",
    tipo: "ENTRADA",
    documento: "NF-e 04812",
    origemDestino: "Compra DPK • Ordem #1827",
    quantidade: 32,
    saldoApos: 36,
    custoUnitario: 18.9,
    operador: "Carlos Almoxarife",
  },
  {
    id: 3,
    data: "21/07/2026 10:30",
    tipo: "ENTRADA",
    documento: "NF-e 03910",
    origemDestino: "Compra AutoMax • Ordem #1741",
    quantidade: 20,
    saldoApos: 24,
    custoUnitario: 19.4,
    operador: "Carlos Almoxarife",
  },
];

export const MOCK_REPORTS_DATA = [
  {
    codigo: "45872",
    descricao: "Filtro de Óleo Tecfil",
    marca: "Tecfil",
    curva: "A",
    qtdVendida: 96,
    faturamento: 3120.0,
    custoTotal: 1814.4,
    margemLucro: 1305.6,
    margemPercent: 41.8,
  },
  {
    codigo: "3601",
    descricao: "Pastilha Freio Fras-le",
    marca: "Fras-le",
    curva: "A",
    qtdVendida: 64,
    faturamento: 7360.0,
    custoTotal: 4736.0,
    margemLucro: 2624.0,
    margemPercent: 35.6,
  },
  {
    codigo: "6033",
    descricao: "Jogo Velas Ignição NGK",
    marca: "NGK",
    curva: "A",
    qtdVendida: 140,
    faturamento: 13720.0,
    custoTotal: 8680.0,
    margemLucro: 5040.0,
    margemPercent: 36.7,
  },
  {
    codigo: "2620",
    descricao: "Filtro de ar motor Tecfil",
    marca: "Tecfil",
    curva: "A",
    qtdVendida: 88,
    faturamento: 8078.4,
    custoTotal: 4611.2,
    margemLucro: 3467.2,
    margemPercent: 42.9,
  },
];

export const MOCK_QUOTATION = QUOTATION_00091;
