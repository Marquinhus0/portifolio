import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function DiferencialMatrix() {
  const nodes = [
    {
      role: "PRODUCT",
      title: "Visão de Produto",
      desc: "Entendimento do problema, priorização e foco no que gera mais resultado.",
      connects: "Alinha as necessidades de quem usa com as metas da empresa",
    },
    {
      role: "UX",
      title: "Experiência de Uso",
      desc: "Pesquisa com usuários, organização da informação e telas simples de navegar.",
      connects: "Transforma tarefas demoradas em fluxos rápidos e intuitivos",
    },
    {
      role: "BUSINESS",
      title: "Regras de Negócio",
      desc: "Processos da empresa, rotinas financeiras e requisitos de operação.",
      connects: "Garante soluções que funcionam de verdade na rotina da empresa",
    },
    {
      role: "TECH",
      title: "Viabilidade Técnica",
      desc: "Entendimento de desenvolvimento web, APIs e limites da engenharia.",
      connects: "Desenha telas viáveis de construir, facilitando o trabalho dos devs",
    },
    {
      role: "QA",
      title: "Qualidade & Testes",
      desc: "Cenários de erro, validação de dados e consistência entre design e código.",
      connects: "Evita retrabalho e garante que tudo funcione antes de ir pro ar",
    },
  ];

  return (
    <section className="py-24 border-b border-surface-borderSubtle bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="space-y-4 max-w-3xl pb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
            <span>[Visão Geral]</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
            Minha experiência conecta design, negócio e tecnologia.
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Em softwares de gestão e plataformas de trabalho, telas bonitas não são suficientes. É preciso entender as regras do negócio e como o sistema funciona por trás.
          </p>
        </div>

        {/* The 5 Intersecting Pillars Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {nodes.map((node, idx) => (
            <div
              key={node.role}
              className="p-6 border border-surface-border bg-neutral-950 flex flex-col justify-between space-y-6 hover:border-[#13E1BC]/50 hover:shadow-[0_0_20px_rgba(19,225,188,0.06)] transition-all group relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <span className="text-xs font-mono tracking-wider text-neutral-400 group-hover:text-[#13E1BC] transition-colors">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">
                    {node.role}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-white tracking-tight group-hover:text-[#13E1BC] transition-colors">
                  {node.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  {node.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-900 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                  Conexão:
                </span>
                <p className="text-[11px] text-neutral-300 font-mono leading-tight">
                  {node.connects}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with exact phrase */}
        <div className="mt-8 p-6 border-l-4 border-l-[#13E1BC] border-y border-r border-neutral-800 bg-neutral-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3 text-neutral-200">
            <CheckCircle2 className="w-4 h-4 text-[#13E1BC] shrink-0" />
            <span className="text-sm font-medium text-white tracking-tight">
              &ldquo;É conectando essas áreas que eu trabalho.&rdquo;
            </span>
          </div>
          <div className="text-neutral-400 uppercase tracking-wider text-[11px]">
            [Design • Negócio • Tecnologia • QA]
          </div>
        </div>
      </div>
    </section>
  );
}
