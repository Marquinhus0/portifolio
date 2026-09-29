export default function ProcessFlow() {
  const steps = [
    {
      number: "01",
      name: "Discovery & Regras de Negócio B2B",
      focus: "Imersão & Operação Real",
      description:
        "Mergulho profundo na rotina de quem opera o sistema na ponta: operadores de sistemas corporativos, compradores e equipes comerciais. Mapeamento de regras fiscais, alçadas de desconto e gargalos antes de rabiscar qualquer tela.",
      deliverables:
        "Mapeamento de jornada de alta complexidade, matriz de regras de negócio, fluxogramas de aprovação e requisitos técnicos.",
      methods: "Entrevistas em ambiente operacional • Shadowing de usuários • Matriz de Regras & Alçadas",
    },
    {
      number: "02",
      name: "Prototipação em Código & Design System",
      focus: "Arquitetura & Densidade",
      description:
        "Construção de interfaces densas e ergonômicas preparadas para velocidade extrema. Desenvolvimento de Design System em tokens reutilizáveis e protótipos funcionais em React para validação real de performance e atalhos de teclado.",
      deliverables:
        "Telas em alta fidelidade no Figma, sandbox navegável em código (React/TS), catálogo de componentes e navegação zero-mouse.",
      methods: "Design System Tokens • Densidade de Informação • Navegação por Teclado • Protótipos Funcionais",
    },
    {
      number: "03",
      name: "Engenharia Front-End, QA & Entrega",
      focus: "Viabilidade & Zero Retrabalho",
      description:
        "Parceria diária com o time de engenharia. Validação de contratos de API, documentação minuciosa de cenários de erro, estados de loading, feedback de rede e acompanhamento das métricas de adoção no pós-lançamento.",
      deliverables:
        "Handoff detalhado com tokens e contratos de API, especificação de edge cases, QA de fidelidade visual e análise de tickets de suporte.",
      methods: "Alinhamento com APIs • QA de Interface • Tratamento de Edge Cases • Métricas de Retenção",
    },
  ];

  return (
    <section className="py-24 border-b border-surface-borderSubtle bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-surface-borderSubtle">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              [Processo Pragmático de Produto]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
              Como conduzo projetos complexos
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 font-normal leading-relaxed">
            Menos burocracia teórica, mais velocidade de validação e alinhamento com engenharia e resultados de negócio.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-neutral-950 p-8 border border-surface-border flex flex-col justify-between space-y-8 hover:border-neutral-500 transition-colors group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <span className="font-mono text-xs text-neutral-400 group-hover:text-white transition-colors">
                    FASE // {step.number}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
                    {step.focus}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-white tracking-tight leading-snug">
                  {step.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-900 space-y-3 text-[11px] font-mono">
                <div>
                  <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">
                    Entregáveis-Chave:
                  </span>
                  <p className="text-neutral-300 font-normal leading-relaxed pt-0.5">
                    {step.deliverables}
                  </p>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">
                    Abordagem:
                  </span>
                  <span className="text-neutral-400 font-normal">
                    {step.methods}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
