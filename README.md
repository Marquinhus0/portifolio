# Portfólio de Product Designer — Marcus Ritta

Este projeto é um portfólio profissional de alto padrão projetado especificamente para **Marcus Ritta**, Product Designer especializado em **ERP, SaaS B2B, Discovery & Product Strategy e Sistemas Complexos**.

---

## 1. Princípios e Sistema Visual

- **Direção Visual**: Estritamente em preto, branco e tons de cinza (`#000000` a `#FFFFFF`).
- **Estética**: Swiss Design editorial, minimalista, refinada, com grid rigoroso e foco absoluto em tipografia e hierarquia de informação.
- **Tipografia**: Inter & Geist com forte contraste de escala (Display, H1, H2, H3, Body e Metadata Monospaced).
- **Sem Falsos Dados**: Nenhum dado, métrica ou cliente fictício foi inventado. Toda a estrutura e layout estão prontos com placeholders arquiteturais.

---

## 2. Estrutura de Diretórios & Arquitetura

```text
Port/
├── app/
│   ├── layout.tsx              # Root layout, metadados SEO e fontes
│   ├── globals.css             # Estilos monocromáticos, scrollbar customizada e print CSS
│   ├── page.tsx                # Home (Hero, Intro, Work, Process, Diferencial, Skills, Contato)
│   ├── work/
│   │   ├── page.tsx            # Galeria e filtros de todos os cases
│   │   └── [slug]/
│   │       └── page.tsx        # Página de Case Study (16 etapas de Product Design)
│   ├── about/
│   │   └── page.tsx            # Sobre, histórico multidisciplinar e pilares
│   ├── contact/
│   │   └── page.tsx            # Canal direto de contato e links
│   ├── resume/
│   │   └── page.tsx            # Currículo editorial com suporte nativo a impressão PDF
│   └── not-found.tsx           # Página 404 personalizada
├── components/
│   ├── Navbar.tsx              # Navbar minimalista sticky com badge 'Open to work'
│   ├── Footer.tsx              # Rodapé com redes e posicionamento
│   ├── Hero.tsx                # Hero com tipografia grande e declaração de posicionamento
│   ├── IntroStatement.tsx      # Bloco dos 4 pilares: UX, Business, Tech, Product
│   ├── CaseCard.tsx            # Card de case com microinterações em hover
│   ├── CasePlaceholderMedia.tsx# Renderizador de esquemáticos visuais / wireframes em B&W
│   ├── CaseStudyView.tsx       # As 16 seções completas de cada case study
│   ├── ProcessFlow.tsx         # 'Como eu trabalho' em 6 etapas de Product Thinking
│   ├── DiferencialMatrix.tsx   # Matriz conectando Product, UX, Business, Tech e QA
│   ├── ExperienceTimeline.tsx  # Linha do tempo profissional (ALFA Software AutoPeças, etc.)
│   ├── SkillsGrid.tsx          # Habilidades organizadas por categorias (sem % artificiais)
│   ├── PhilosophyBlock.tsx     # Citação 'Design is not decoration'
│   └── ContactBlock.tsx        # Chamada para contato com cópia de e-mail em 1 clique
├── data/
│   ├── cases.ts                # Modelo e dados desacoplados de todos os cases
│   ├── experience.ts           # Histórico profissional
│   └── skills.ts               # Categorias e tags de competências
├── types/
│   └── index.ts                # Tipagem TypeScript
└── public/
    └── favicon.svg             # Favicon minimalista monocromático
```

---

## 3. Como Adicionar ou Atualizar Cases

Todo o conteúdo dos cases está **100% desacoplado da camada visual**.

Para preencher ou adicionar um novo case:
1. Abra o arquivo [`data/cases.ts`](./data/cases.ts).
2. Cada objeto segue a interface `CaseStudy` em [`types/index.ts`](./types/index.ts), contendo todos os 25+ atributos:
   - `title`, `slug`, `category`, `year`, `company`, `role`, `duration`, `tags`
   - `overview`, `context`, `problem`, `users`, `research`, `insights`
   - `opportunity`, `goals`, `constraints`, `process`, `flows`
   - `wireframes`, `ui`, `prototype`, `validation`, `solution`
   - `results`, `metrics`, `learnings`, `galleryPlaceholders`
3. Ao salvar, a página individual do case é gerada automaticamente na rota:
   `/work/[seu-slug]`

---

## 4. Comandos de Desenvolvimento

```bash
# Executar em modo de desenvolvimento local
npm run dev

# Gerar build de produção
npm run build

# Iniciar servidor de produção
npm run start
```
