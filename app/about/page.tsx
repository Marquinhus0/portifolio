import ExperienceTimeline from "@/components/ExperienceTimeline";
import PhilosophyBlock from "@/components/PhilosophyBlock";
import ContactBlock from "@/components/ContactBlock";

export default function AboutPage() {
  const coreSpecialties = [
    {
      code: "ERP // PDV",
      title: "ERPs & Operações de Alta Densidade",
      desc: "Especialista em fluxos de balcão de vendas, estoque, compras e emissão fiscal. Foco em interfaces velozes, tabelas com milhares de itens e usabilidade zero-mouse para quem trabalha sob pressão operacional.",
    },
    {
      code: "B2B // SAAS",
      title: "CRM Comercial & Funis B2B",
      desc: "Estruturação de pipelines Kanban, canais de comunicação integrados (WhatsApp, e-mail, ligações), alçadas de desconto por margem e métricas comerciais claras.",
    },
    {
      code: "DESIGN SYSTEM",
      title: "Design Systems Corporativos",
      desc: "Arquitetura de componentes densos, tokens semânticos, estados de erro rigorosos e acessibilidade via teclado, conectando Figma diretamente a bibliotecas React.",
    },
    {
      code: "REACT // CODE",
      title: "Prototipação Interativa em Código",
      desc: "Construção de sandboxes funcionais em React e TypeScript para validar performance, layout e fluxos reais antes do handoff, eliminando atrito com times de engenharia.",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-20 border-b border-surface-borderSubtle bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
            <span>[Sobre Marcus Ritta]</span>
          </span>
          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-white uppercase leading-none">
              Marcus Ritta
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 font-light leading-relaxed">
              Product Designer focado em softwares de gestão, ERPs e plataformas B2B. Meu objetivo é transformar sistemas densos e processos burocráticos em ferramentas rápidas, intuitivas e eficientes para o dia a dia corporativo.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Section: My Approach & Grounding in B2B */}
      <section className="py-20 border-b border-surface-borderSubtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] block">
                [Minha Abordagem]
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
                Design forjado na realidade da operação.
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6 text-neutral-300 leading-relaxed text-base sm:text-lg font-light">
              <p>
                Minha experiência em produtos não nasceu desenhando telas conceituais isoladas, mas sim entendendo o cotidiano de empresas reais: balcões de autopeças movimentados, rotinas de compras sob pressão de prazos, conciliações financeiras e equipes de vendas que não têm tempo a perder com cliques desnecessários.
              </p>
              <p>
                Acredito que em software de missão crítica, a melhor interface é aquela que quase desaparece: responde instantaneamente a atalhos de teclado, antecipa erros com clareza, organiza milhares de registros sem poluição visual e respeita as regras de negócio sem engessar a operação.
              </p>
              <p className="text-sm font-mono text-neutral-400 border-l-2 border-[#13E1BC] pl-4 py-1">
                &ldquo;Trabalho conectando discovery com usuários de verdade, especificações tributárias e comerciais com engenharia front-end em React.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Focus Areas */}
      <section className="py-20 border-b border-surface-borderSubtle bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-surface-borderSubtle">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#13E1BC] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC]" />
                <span>[Especialidades Principais]</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
                Onde gero maior impacto
              </h2>
            </div>
            <p className="text-xs font-mono text-neutral-400 max-w-sm">
              Competências maduras em softwares de missão crítica e produtos corporativos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreSpecialties.map((spec) => (
              <div
                key={spec.code}
                className="p-8 border border-surface-border bg-neutral-950 flex flex-col justify-between space-y-6 hover:border-[#13E1BC]/50 hover:shadow-[0_0_20px_rgba(19,225,188,0.06)] transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
                    <span className="font-mono text-xs text-neutral-400 group-hover:text-[#13E1BC] transition-colors">
                      [{spec.code}]
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#13E1BC] shadow-[0_0_6px_#13E1BC]" />
                  </div>
                  <h3 className="text-xl font-medium text-white tracking-tight">
                    {spec.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                    {spec.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <ExperienceTimeline />

      {/* Philosophy */}
      <PhilosophyBlock />

      {/* Contact */}
      <ContactBlock />
    </div>
  );
}
