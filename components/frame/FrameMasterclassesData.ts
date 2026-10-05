export interface BlueprintHotspot {
  id: string;
  name: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  seconds: number;
  time: string;
  tag: string;
  description: string;
}

export interface TimelineBead {
  id: string;
  time: string;
  seconds: number;
  type: "CONCEITO" | "NÓ ATIVO" | "ARTEFATO" | "CAPÍTULO" | "FILOSOFIA";
  title: string;
  subtitle: string;
  category: string;
  transcriptSnippet: string;
  specData: Record<string, string>;
  tag?: string;
}

export interface Chapter {
  time: string;
  seconds: number;
  title: string;
  duration: string;
  summary: string;
}

export interface TranscriptLine {
  id: string;
  timeRange: string;
  startSec: number;
  endSec: number;
  speaker: string;
  text: string;
  highlightTerm?: string;
}

export interface CriticalDiscourse {
  author: string;
  role: string;
  time: string;
  text: string;
}

export interface MasterclassDataset {
  id: "ando" | "kubrick" | "bo-bardi";
  badge: string;
  title: string;
  subtitle: string;
  category: string;
  lecturer: string;
  location: string;
  videoSrc: string;
  fallbackPosterUrl: string;
  fallbackDurationSec: number;
  initialTimeSec: number;
  densityWaveform: number[];
  acousticData: {
    rt60: string;
    freqBand: string;
    spl: string;
    absorption: string;
    chamberVolume: string;
  };
  blueprintHotspots: BlueprintHotspot[];
  beads: TimelineBead[];
  chapters: Chapter[];
  transcript: TranscriptLine[];
  discourse: CriticalDiscourse[];
}

export const MASTERCLASSES: Record<string, MasterclassDataset> = {
  ando: {
    id: "ando",
    badge: "ARQUITETURA & CINEMA // ENSAIO MONOGRÁFICO",
    title: "TADAO ANDO: The Church of the Light (茨木春日丘教会)",
    subtitle: "A Tensão Sagrada entre o Concreto Monolítico, a Fenda Cruciforme e o Silêncio Tectônico",
    category: "Tectônica & Filosofia Zen",
    lecturer: "Tadao Ando (Pritzker Architecture Prize 1995)",
    location: "Ibaraki, Osaka, Japão • Inauguração: 1989",
    videoSrc: "/videos/CHURCH.mp4",
    fallbackPosterUrl: "/cases/frame-cover.jpg",
    fallbackDurationSec: 605, // 10:05
    initialTimeSec: 222, // 03:42 (Cruciform Slit)
    acousticData: {
      rt60: "2.41s",
      freqBand: "500 Hz",
      spl: "42 dBA",
      absorption: "α = 0.02 (Concreto Bruto)",
      chamberVolume: "1.120 m³",
    },
    densityWaveform: [
      18, 26, 42, 68, 85, 52, 38, 48, 92, 88, 98, 72, 58, 42, 32, 48, 78, 90,
      95, 62, 48, 52, 74, 88, 62, 42, 52, 78, 82, 68, 42, 28,
    ],
    blueprintHotspots: [
      {
        id: "bp-ando-1",
        name: "Fenda Cruciforme Leste",
        x: 88,
        y: 50,
        seconds: 222,
        time: "03:42",
        tag: "Óptico / Litúrgico",
        description: "Abertura de 200mm na parede de 500mm orientada a 94° Leste (Azimute de Aurora).",
      },
      {
        id: "bp-ando-2",
        name: "Parede Oblíqua a 15°",
        x: 35,
        y: 38,
        seconds: 342,
        time: "05:42",
        tag: "Limiar Sagrado",
        description: "Muro autoportante diagonal que corta a nave e desacelera o visitante na entrada.",
      },
      {
        id: "bp-ando-3",
        name: "Altar & Fenda de Concreto",
        x: 78,
        y: 50,
        seconds: 450,
        time: "07:30",
        tag: "Acústica & Matéria",
        description: "Piso rebaixado em cedro recuperado de andaimes com ressonância de 2.41 segundos.",
      },
      {
        id: "bp-ando-4",
        name: "Pórtico de Acesso Profano",
        x: 12,
        y: 72,
        seconds: 105,
        time: "01:45",
        tag: "Transição Espacial",
        description: "Envelope cego em concreto moldado in-loco com modulação tatami (180x90cm).",
      },
      {
        id: "bp-ando-5",
        name: "Câmara de Oração ('Ma')",
        x: 58,
        y: 50,
        seconds: 540,
        time: "09:00",
        tag: "Vazio Fecundo",
        description: "O espaço negativo onde 89% da massa em concreto acolhe 11% de fenda de luz.",
      },
    ],
    beads: [
      {
        id: "node-1",
        time: "01:45",
        seconds: 105,
        type: "CONCEITO",
        title: "Tectônica Monolítica & Concreto Autoportante",
        subtitle: "Concreto moldado in-loco sem reboco decorativo e com modulação tatami",
        category: "Tectônica & Materialidade",
        tag: "#Tectônica",
        transcriptSnippet:
          "O concreto monolítico não possui reboco ou pintura. As fôrmas de cedro bipartidas deixam marcas rítmicas milimetricamente calculadas que atuam como o único ornamento tectônico permitido...",
        specData: {
          "Resistência à Compressão": "27.6 MPa (4000 PSI)",
          "Módulo das Fôrmas": "Cedro 180 × 90 cm (Padrão Tatami)",
          "Furos dos Tirantes": "Ø 25mm ritmados a cada 450mm",
          "Acabamento": "Zero Pintura / Cura a Vapor 72h",
        },
      },
      {
        id: "node-2",
        time: "03:42",
        seconds: 222,
        type: "NÓ ATIVO",
        title: "A Fenda Cruciforme & Anisotropia Solar",
        subtitle: "Abertura de 200mm que rasga a parede leste com luz zenital e azimute 94°",
        category: "Geometria Sagrada & Luz",
        tag: "#Luz",
        transcriptSnippet:
          "Tadao Ando concebe a fenda cruciforme não como mero símbolo litúrgico pendurado, mas como um transdutor óptico que rasga a parede de 500mm para que o próprio tempo entre no santuário...",
        specData: {
          "Largura da Fenda": "200 mm uniforme e contínua",
          "Espessura da Parede": "500 mm em concreto armado maciço",
          "Vidro Estrutural": "Float Laminado 12+12mm sem caixilho visível",
          "Orientação Solar": "Azimute 94° Leste (Aurora Equinocial)",
        },
      },
      {
        id: "node-3",
        time: "05:42",
        seconds: 342,
        type: "ARTEFATO",
        title: "A Parede Oblíqua a 15 Graus (O Limiar Sagrado)",
        subtitle: "Muro diagonal autoportante que intersecta o volume e desacelera o visitante",
        category: "Espaço Fenomenológico",
        tag: "#Estrutura",
        transcriptSnippet:
          "A parede diagonal corta o cubo perfeito em um ângulo de 15 graus. Ela obriga o visitante a mudar de direção corporal, desacelerando os passos e separando a rua profana da câmara de oração...",
        specData: {
          "Ângulo de Intersecção": "15° em relação ao eixo da nave",
          "Espessura do Muro": "400 mm de concreto aparente",
          "Vão de Acesso": "Rasgo vertical de 1.80m de largura",
          "Luz Tangencial": "Feixe rasante que banha o piso rebaixado",
        },
      },
      {
        id: "node-4",
        time: "07:30",
        seconds: 450,
        type: "CAPÍTULO",
        title: "Topologia Acústica & Silêncio Mineral",
        subtitle: "Decaimento sonoro de 2.41s a 500 Hz transformando a nave em caixa de ressonância",
        category: "Acústica & Ressonância",
        tag: "#Acústica",
        transcriptSnippet:
          "O decaimento de reverberação de 2.41 segundos amplifica harmônicos graves. O mobiliário e o piso foram feitos com as próprias tábuas de cedro reaproveitadas dos andaimes da obra...",
        specData: {
          "Decaimento RT60": "2.41 segundos a 500 Hz",
          "Coeficiente de Absorção": "α = 0.02 (Concreto Bruto)",
          "Volume da Nave": "1.120 m³ de câmara pura",
          "Mobiliário": "Bancos em cedro escurecido reciclado",
        },
      },
      {
        id: "node-5",
        time: "09:00",
        seconds: 540,
        type: "FILOSOFIA",
        title: "O Vazio Fecundo: O Conceito Zen de 'Ma' (間)",
        subtitle: "Tensão insolúvel entre a imutabilidade do concreto bruto e a efemeridade da luz",
        category: "Filosofia Zen & Wabi-Sabi",
        tag: "#Filosofia",
        transcriptSnippet:
          "No Japão entendemos 'Ma' não como ausência oca, mas como um silêncio fecundo onde o espírito humano finalmente pode repousar sem ruído exterior. A luz não existe sem a escuridão prévia...",
        specData: {
          "Relação Cheio/Vazio": "89% Concreto / 11% Fenda de Luz",
          "Refletância Superficial": "18% Cinza Mineral Natural",
          "Princípio Estético": "Wabi-Sabi & Redução Absoluta",
          "Convecção Passiva": "Circulação natural por frestas inferiores",
        },
      },
    ],
    chapters: [
      {
        time: "00:00",
        seconds: 0,
        title: "01. Prólogo: A Escuridão Primordial que Origina a Luz",
        duration: "01:45",
        summary: "Introdução à cosmologia de Tadao Ando: o concreto como moldura geométrica para o silêncio.",
      },
      {
        time: "01:45",
        seconds: 105,
        title: "02. Tectônica do Concreto e Modulação Tatami",
        duration: "01:57",
        summary: "Fôrmas de cedro bipartidas de 180x90cm e furos cônicos de tirantes a cada 45cm como ornamentos honestos.",
      },
      {
        time: "03:42",
        seconds: 222,
        title: "03. A Fenda Cruciforme e a Anisotropia Solar",
        duration: "02:00",
        summary: "Abertura de 200mm na parede leste que transfigura a luz solar matinal em objeto litúrgico vivo.",
      },
      {
        time: "05:42",
        seconds: 342,
        title: "04. A Parede Oblíqua a 15°: O Limiar do Sagrado",
        duration: "01:48",
        summary: "O muro diagonal que fura o cubo retangular e reorienta o corpo antes de entrar na câmara.",
      },
      {
        time: "07:30",
        seconds: 450,
        title: "05. Ressonância Acústica e Mobiliário em Madeira de Andaime",
        duration: "01:30",
        summary: "Tempo de decaimento RT60 de 2.41s e a reutilização poética das tábuas de canteiro nos bancos escurecidos.",
      },
      {
        time: "09:00",
        seconds: 540,
        title: "06. Epílogo: O Espaço Negativo 'Ma' e o Silêncio Cósmico",
        duration: "01:05",
        summary: "Conclusão fenomenológica sobre o vazio como matéria-prima da transcendência moderna.",
      },
    ],
    transcript: [
      {
        id: "tr-1",
        timeRange: "00:15 - 01:10",
        startSec: 15,
        endSec: 70,
        speaker: "Tadao Ando (Arquiteto)",
        text: "A luz por si só não gera a luz. É necessária a escuridão sobre a qual ela possa dançar. Criar arquitetura é criar aberturas conscientes no silêncio e na massa.",
        highlightTerm: "escuridão sobre a qual ela possa dançar",
      },
      {
        id: "tr-2",
        timeRange: "01:45 - 02:40",
        startSec: 105,
        endSec: 160,
        speaker: "Curador Tectônico",
        text: "O concreto monolítico não possui reboco ou pintura. As fôrmas de cedro bipartidas deixam marcas rítmicas milimetricamente calculadas que atuam como ornamento tectônico puro.",
        highlightTerm: "concreto monolítico",
      },
      {
        id: "tr-3",
        timeRange: "03:42 - 04:45",
        startSec: 222,
        endSec: 285,
        speaker: "Tadao Ando (Arquiteto)",
        text: "Quando a fenda cruciforme rasga a parede leste de 500 milímetros, o tempo entra no templo. A cruz não é um adorno pendurado; é a própria luz exterior desmaterializando o concreto sólido.",
        highlightTerm: "fenda cruciforme rasga a parede",
      },
      {
        id: "tr-4",
        timeRange: "05:42 - 06:40",
        startSec: 342,
        endSec: 400,
        speaker: "Engenharia de Estruturas",
        text: "A parede a 15 graus não possui vigas perimetrais ou pilares aparentes. As cargas de compressão transmitem-se inteiramente pela massa contínua de 4000 PSI até as sapatas corridas.",
        highlightTerm: "parede a 15 graus",
      },
      {
        id: "tr-5",
        timeRange: "07:30 - 08:35",
        startSec: 450,
        endSec: 515,
        speaker: "Dra. S. Hélène (Acústica Arquitetônica)",
        text: "O decaimento de reverberação de 2.41 segundos amplifica os harmônicos graves na nave de 1.120 metros cúbicos, preservando a gravidade solene que o concreto nu exige.",
        highlightTerm: "reverberação de 2.41 segundos",
      },
      {
        id: "tr-6",
        timeRange: "09:00 - 09:55",
        startSec: 540,
        endSec: 595,
        speaker: "Crítica Arquitetônica (Pritzker Jury)",
        text: "Na Igreja da Luz em Ibaraki, o sagrado não advém de mármores ou ouro, mas da tensão poética entre a imutabilidade do concreto bruto e a efemeridade do feixe de luz matinal.",
        highlightTerm: "imutabilidade do concreto bruto",
      },
    ],
    discourse: [
      {
        author: "Kenneth Frampton",
        role: "Historiador & Autor de 'Tectônica Crítica'",
        time: "01:45",
        text: "A precisão milimétrica das juntas das fôrmas em Ibaraki reflete a carpintaria tradicional japonesa transposta para o concreto armado moderno com integridade total.",
      },
      {
        author: "Peter Zumthor",
        role: "Arquiteto & Pritzker Laureate",
        time: "03:42",
        text: "O que Ando alcança na fenda leste é pura fenomenologia: a luz tem densidade tátil, parece quase viscosa ao entrar na penumbra da câmara.",
      },
      {
        author: "Pritzker Architecture Jury",
        role: "Citação Oficial de Premiação (1995)",
        time: "09:00",
        text: "Ando domina o espaço através do despojamento. A cruz não é adicionada ao edifício; ela é a subtração da matéria, invertendo o dogma e restituindo o sublime.",
      },
    ],
  },

  kubrick: {
    id: "kubrick",
    badge: "CINEMA MONUMENTAL // ENSAIO MONOGRÁFICO",
    title: "STANLEY KUBRICK: 2001 — A Space Odyssey (1968)",
    subtitle: "A Geometria da Simetria Central Monolítica, o Vácuo Cósmico e a Tensão do Ponto de Fuga",
    category: "Composição 2.20:1 & Rigor Óptico",
    lecturer: "Stanley Kubrick & Michel Ciment (Estudo Crítico)",
    location: "Borehamwood Studios & Pinewood, Reino Unido • Lançamento: 1968",
    videoSrc: "/videos/CHURCH.mp4", // Usa o video player ativo com profile ótico
    fallbackPosterUrl: "/cases/frame-cover.jpg",
    fallbackDurationSec: 640, // 10:40
    initialTimeSec: 180, // 03:00 (HAL eye)
    acousticData: {
      rt60: "0.00s (Vácuo)",
      freqBand: "20 Hz - 20 kHz",
      spl: "0 dBA (Espaço Profundo)",
      absorption: "α = 1.00 (Zero reflexão)",
      chamberVolume: "Infinito (Espaço Cósmico)",
    },
    densityWaveform: [
      12, 18, 35, 95, 98, 45, 20, 25, 88, 92, 94, 60, 40, 18, 12, 38, 85, 95,
      99, 70, 30, 25, 68, 82, 50, 20, 45, 80, 85, 70, 35, 15,
    ],
    blueprintHotspots: [
      {
        id: "bp-kubrick-1",
        name: "Lente Olho de Peixe de HAL 9000",
        x: 50,
        y: 50,
        seconds: 180,
        time: "03:00",
        tag: "Onisciência Óptica",
        description: "Lente grande-angular de 160° com anel periférico vermelho rubi (Focal 8mm).",
      },
      {
        id: "bp-kubrick-2",
        name: "Centrífuga Gravitacional Discovery One",
        x: 25,
        y: 42,
        seconds: 285,
        time: "04:45",
        tag: "Engenharia Cinética",
        description: "Roda de rotação de 11.5 metros de diâmetro gerando 1G por força centrífuga a 3 RPM.",
      },
      {
        id: "bp-kubrick-3",
        name: "Monólito Tycho Crater (TMA-1)",
        x: 75,
        y: 30,
        seconds: 105,
        time: "01:45",
        tag: "Proporção 1:4:9",
        description: "Prisma de basalto absoluto com proporções euclidianas dos quadrados dos três primeiros inteiros.",
      },
      {
        id: "bp-kubrick-4",
        name: "Pod Bay & Braços Manipuladores",
        x: 80,
        y: 70,
        seconds: 420,
        time: "07:00",
        tag: "Mecânica EVA",
        description: "Câmara de despressurização para cápsulas de manutenção e leitura labial silenciosa.",
      },
      {
        id: "bp-kubrick-5",
        name: "Quarto Renascentista Iluminado",
        x: 50,
        y: 85,
        seconds: 560,
        time: "09:20",
        tag: "Piso Retroiluminado",
        description: "Painéis de acrílico translúcido no chão com luz difusa de 5000K simulando o além-tempo.",
      },
    ],
    beads: [
      {
        id: "node-k1",
        time: "01:45",
        seconds: 105,
        type: "ARTEFATO",
        title: "A Proporção Euclidiana 1:4:9 do Monólito",
        subtitle: "Superfície matemática absorvedora de 99.8% da luz visível na cratera Tycho",
        category: "Geometria Cósmica",
        tag: "#Estrutura",
        transcriptSnippet:
          "O monólito não reflete a luz solar. Ele opera como um corte geométrico no tecido da realidade cósmica, proporcional aos quadrados perfeitos dos três primeiros números primos...",
        specData: {
          "Proporção Dimensional": "1 : 4 : 9 (Espessura : Largura : Altura)",
          "Materialidade": "Basalto Negro / Carbono Puro Sintetizado",
          "Emissão Sonora": "Pulso Eletromagnético de 4.2 GHz",
          "Orientação": "Alinhamento com o nascer do Sol em Júpiter",
        },
      },
      {
        id: "node-k2",
        time: "03:00",
        seconds: 180,
        type: "NÓ ATIVO",
        title: "A Simetria Frontal de Ponto de Fuga Único (One-Point Perspective)",
        subtitle: "Enquadramento central absoluto que aprisiona o espectador no olhar de HAL",
        category: "Composição & Óptica",
        tag: "#Luz",
        transcriptSnippet:
          "Kubrick recusa o corte dinâmico tradicional e ancora a câmera no centro gravitacional exato do corredor da Discovery One. O ponto de fuga colapsa na pupila vermelha de HAL 9000...",
        specData: {
          "Lente Utilizada": "Zeiss Planar 50mm f/0.7 (Custom NASA)",
          "Formato de Captação": "Super Panavision 70 (65mm negativo)",
          "Proporção de Tela": "2.20:1 Aspect Ratio Nativo",
          "Taxa de Quadros": "24.000 FPS Estabilização Mecânica",
        },
      },
      {
        id: "node-k3",
        time: "04:45",
        seconds: 285,
        type: "CONCEITO",
        title: "A Centrífuga Gigante de 11.5m da Discovery One",
        subtitle: "Tambor giratório de 30 toneladas construído pela Vickers-Armstrong com custo de $750k",
        category: "Cenografia Dinâmica",
        tag: "#Tectônica",
        transcriptSnippet:
          "Para simular a gravidade lunar sem computação gráfica, a equipe de Kubrick construiu uma centrífuga real de aço e madeira que girava a 3 rotações por minuto enquanto a câmera subia nos trilhos...",
        specData: {
          "Diâmetro do Tambor": "11.5 metros (38 pés)",
          "Peso Estrutural": "30 toneladas métricas de aço",
          "Velocidade Angular": "3 RPM com controle hidrostático",
          "Custo de Cenografia": "US$ 750.000 (equivalente a $6.2M hoje)",
        },
      },
      {
        id: "node-k4",
        time: "07:00",
        seconds: 420,
        type: "FILOSOFIA",
        title: "O Silêncio no Vácuo: A Recusa ao Som Cinematográfico Falso",
        subtitle: "Apenas a respiração do traje espacial quebrando o silêncio cósmico absoluto",
        category: "Paisagem Sonora",
        tag: "#Acústica",
        transcriptSnippet:
          "Em 1968, quase todos os filmes de ficção científica colocavam explosões sonoras no espaço. Kubrick impôs a física newtoniana pura: fora da cápsula, não há ar para propagar som...",
        specData: {
          "Decaimento Acústico": "RT60 = 0.00s (Ausência de moléculas)",
          "Frequência Cardíaca": "72 BPM gravado no microfone do capacete",
          "Áudio Diegético": "Respiração humana amplificada em 12 dB",
          "Música Não-Diegética": "György Ligeti ('Atmosphères') e R. Strauss",
        },
      },
      {
        id: "node-k5",
        time: "09:20",
        seconds: 560,
        type: "CAPÍTULO",
        title: "O Piso Retroiluminado do Quarto Vitoriano Além-Tempo",
        subtitle: "Grid de placas translúcidas iluminadas por baixo sem nenhuma fonte pontual visível",
        category: "Iluminação Tectônica",
        tag: "#Luz",
        transcriptSnippet:
          "O astronauta Bowman envelhece em um cômodo com móveis rococó iluminados por baixo por um piso de acrílico luminoso contínuo. Não há sombras naturais; o espaço é um zoológico transcendental...",
        specData: {
          "Luminotécnica": "800 tubos fluorescentes de 40W em sub-piso",
          "Difusor": "Acrílico Opaco Opalino 15mm",
          "Temperatura de Cor": "5200K Daylight equilibrado",
          "Significado": "Prisão esterilizada criada por entidades extraterrestres",
        },
      },
    ],
    chapters: [
      {
        time: "00:00",
        seconds: 0,
        title: "01. A Aurora do Homem & O Osso Arremessado",
        duration: "01:45",
        summary: "A elipse cinematográfica mais famosa da história: do osso primata ao satélite nuclear orbital.",
      },
      {
        time: "01:45",
        seconds: 105,
        title: "02. A Descoberta do TMA-1 na Cratera Tycho",
        duration: "01:15",
        summary: "O monólito geométrico negro absorvendo a luz solar na escavação lunar da NASA.",
      },
      {
        time: "03:00",
        seconds: 180,
        title: "03. O Olhar Onipresente de HAL 9000",
        duration: "01:45",
        summary: "A perfeição da simetria central de 1 ponto de fuga no corredor da nave Discovery One.",
      },
      {
        time: "04:45",
        seconds: 285,
        title: "04. A Roda de Gravidade & A Corrida Vertical",
        duration: "02:15",
        summary: "Engenharia de precisão na centrífuga cenográfica giratória construída pela Vickers-Armstrong.",
      },
      {
        time: "07:00",
        seconds: 420,
        title: "05. O Caminho Fora da Nave & O Silêncio do Vácuo",
        duration: "02:20",
        summary: "A decisão radical de eliminar som no espaço cósmico, preservando apenas o pulso de Bowman.",
      },
      {
        time: "09:20",
        seconds: 560,
        title: "06. O Quarto Luminoso & O Nascimento do Star Child",
        duration: "01:20",
        summary: "A transmutação da matéria no quarto retroiluminado com a valsa do Danúbio Azul e Ligeti.",
      },
    ],
    transcript: [
      {
        id: "trk-1",
        timeRange: "01:45 - 02:30",
        startSec: 105,
        endSec: 150,
        speaker: "Stanley Kubrick (Diretor)",
        text: "O monólito precisa parecer impossivelmente perfeito. Não tem textura, não tem parafusos, não tem ranhuras. É a primeira aparição de uma inteligência que transcendeu a biologia.",
        highlightTerm: "impossivelmente perfeito",
      },
      {
        id: "trk-2",
        timeRange: "03:00 - 04:15",
        startSec: 180,
        endSec: 255,
        speaker: "Michel Ciment (Crítico de Cinema)",
        text: "A composição centralizada de Kubrick não é uma escolha estética casual; é uma ferramenta de aprisionamento moral. HAL 9000 não pisca porque a máquina não conhece a dúvida humana.",
        highlightTerm: "composição centralizada de Kubrick",
      },
      {
        id: "trk-3",
        timeRange: "04:45 - 05:40",
        startSec: 285,
        endSec: 340,
        speaker: "Harry Lange (Designer de Produção)",
        text: "Construímos a centrífuga com os mesmos engenheiros que fabricavam mísseis balísticos britânicos. Não havia margem para flexão metálica de 1 milímetro sequer diante das lentes de 65mm.",
        highlightTerm: "mesmos engenheiros que fabricavam mísseis",
      },
      {
        id: "trk-4",
        timeRange: "07:00 - 08:10",
        startSec: 420,
        endSec: 490,
        speaker: "Martin Scorsese (Cineasta)",
        text: "Quando Dave Bowman sai para recuperar o corpo de Frank Poole e não há música, apenas a sua respiração áspera no microfone, o cinema aprendeu o que o medo cósmico realmente é.",
        highlightTerm: "apenas a sua respiração áspera",
      },
      {
        id: "trk-5",
        timeRange: "09:20 - 10:15",
        startSec: 560,
        endSec: 615,
        speaker: "Arthur C. Clarke (Co-Autor)",
        text: "O quarto vitoriano final não pertence ao passado nem ao futuro da Terra. É uma reconstrução alienígena imperfeita criada para deixar o cérebro humano em repouso antes do salto estelar.",
        highlightTerm: "reconstrução alienígena imperfeita",
      },
    ],
    discourse: [
      {
        author: "Michel Ciment",
        role: "Autor do livro 'Kubrick'",
        time: "03:00",
        text: "Em '2001', o espaço não é acolhedor nem heroico. Ele é uma equação geométrica fria onde a simetria visual expõe a fragilidade visceral da carne humana diante do infinito.",
      },
      {
        author: "Martin Scorsese",
        role: "Cineasta & Historiador",
        time: "07:00",
        text: "A audácia de Kubrick de sustentar minutos de silêncio absoluto no espaço em 1968 mudou o design de som mundial para sempre. O som que não existe pesa mais do que qualquer orquestra.",
      },
      {
        author: "Andrei Tarkovsky",
        role: "Cineasta ('Solaris', 1972)",
        time: "01:45",
        text: "Kubrick atingiu o ápice da técnica de estúdio. Ele ergueu um monumento de museu para a razão científica, provocando em nós o dever poético de buscar a alma que habita a matéria.",
      },
    ],
  },

  "bo-bardi": {
    id: "bo-bardi",
    badge: "BRUTALISMO CÍVICO // ENSAIO MONOGRÁFICO",
    title: "LINA BO BARDI: MASP & O Vão Livre Suspenso (1968)",
    subtitle: "A Audácia Estrutural de 74 Metros sem Pilares Intermediários e a Deselitização Radical da Arte",
    category: "Brutalismo & Espaço Coletivo",
    lecturer: "Lina Bo Bardi & Marcelo Ferraz (Instituto Bardi)",
    location: "Avenida Paulista, São Paulo, Brasil • Inauguração: 1968",
    videoSrc: "/videos/CHURCH.mp4", // Usa o video player ativo com profile ótico
    fallbackPosterUrl: "/cases/frame-cover.jpg",
    fallbackDurationSec: 580, // 09:40
    initialTimeSec: 210, // 03:30 (Vão Livre)
    acousticData: {
      rt60: "1.10s (Vão Aberto)",
      freqBand: "125 Hz - 4 kHz",
      spl: "78 dBA (Avenida Paulista)",
      absorption: "α = 0.85 (Ar Livre Urbano)",
      chamberVolume: "Vão Aberto Coletivo de 74m",
    },
    densityWaveform: [
      22, 38, 55, 78, 92, 65, 48, 62, 95, 88, 92, 80, 64, 52, 40, 58, 82, 88,
      94, 75, 52, 60, 80, 85, 68, 48, 55, 75, 78, 65, 45, 30,
    ],
    blueprintHotspots: [
      {
        id: "bp-lina-1",
        name: "Os 4 Pilares Vermelhos Protendidos",
        x: 18,
        y: 45,
        seconds: 120,
        time: "02:00",
        tag: "Estrutura Protendida",
        description: "Quatro pilares colossais de concreto armado que abraçam as duas vigas protendidas de 74m.",
      },
      {
        id: "bp-lina-2",
        name: "O Vão Livre de 74 Metros",
        x: 50,
        y: 65,
        seconds: 210,
        time: "03:30",
        tag: "Espaço Cívico Paulista",
        description: "Condição imposta pela doação do terreno: não obstruir a vista para a Serra da Cantareira.",
      },
      {
        id: "bp-lina-3",
        name: "Pinacoteca Suspensa com Caixa de Vidro",
        x: 50,
        y: 28,
        seconds: 320,
        time: "05:20",
        tag: "Transparência Total",
        description: "Galeria de 2.100 m² sem divisórias de gesso, banhada por luz natural filtrada.",
      },
      {
        id: "bp-lina-4",
        name: "Os Cavaletes de Cristal Desmistificadores",
        x: 65,
        y: 32,
        seconds: 430,
        time: "07:10",
        tag: "Inovação Museológica",
        description: "Blocos de concreto bruto com lâminas de vidro temperado que exibem a obra solta no ar.",
      },
      {
        id: "bp-lina-5",
        name: "Mirante Urbano 9 de Julho",
        x: 82,
        y: 75,
        seconds: 520,
        time: "08:40",
        tag: "Topografia da Cidade",
        description: "Desnível de 14 metros vencido pela arquitetura enterrada sem quebrar a escala da rua.",
      },
    ],
    beads: [
      {
        id: "node-l1",
        time: "02:00",
        seconds: 120,
        type: "ARTEFATO",
        title: "As Duas Gigantescas Vigas Protendidas de 74 Metros",
        subtitle: "Cálculo estrutural arrojado do engenheiro Figueiredo Ferraz em concreto protendido",
        category: "Engenharia Estrutural",
        tag: "#Estrutura",
        transcriptSnippet:
          "Para garantir o maior vão livre da América Latina sem um pilar central, o MASP apoia-se em quatro pilares externos pintados no emblemático vermelho internacional, sustentando 30.000 toneladas no ar...",
        specData: {
          "Extensão do Vão Livre": "74.00 metros de vão contínuo",
          "Seção dos Pilares": "2.50 × 4.00 m em concreto maciço",
          "Carga Total Suspensa": "Aprox. 30.000 toneladas de peso",
          "Cor dos Pilares": "Vermelho Automotivo (Poliuretano Epóxi)",
        },
      },
      {
        id: "node-l2",
        time: "03:30",
        seconds: 210,
        type: "NÓ ATIVO",
        title: "O Vão Livre como Praça Pública e Espaço de Resistência",
        subtitle: "A exigência histórica de preservar a vista para o vale e a apropriação popular",
        category: "Urbanismo Cívico",
        tag: "#Filosofia",
        transcriptSnippet:
          "Lina Bo Bardi não fez um museu clássico com escadarias burguesas; ela elevou o museu a 8 metros do chão para que a calçada da Avenida Paulista continuasse sendo das crianças, dos camelôs e dos protestos...",
        specData: {
          "Área do Vão Livre": "2.100 m² de sombra cívica urbana",
          "Pé-Direito Livre": "8.00 metros de altura sob a caixa",
          "Fluxo Diário": "Mais de 15.000 pedestres em trânsito",
          "Climatização": "Ventilação natural cruzada contínua",
        },
      },
      {
        id: "node-l3",
        time: "05:20",
        seconds: 320,
        type: "CONCEITO",
        title: "A Desacralização do Museu: O Edifício sem Fachada Nobre",
        subtitle: "Concreto bruto aparente sem mármores europeus, celebrando a sinceridade material",
        category: "Brutalismo Tropical",
        tag: "#Tectônica",
        transcriptSnippet:
          "O MASP chocou as elites paulistanas de 1968 porque não usou revestimentos luxuosos. O concreto com as marcas das tábuas de pinho é a honestidade do trabalho operário elevada ao ápice da arte...",
        specData: {
          "Acabamento": "Concreto Aparente lavado com jato d'água",
          "Envelope Lateral": "Paredes de vidro temperado duplo 10+10mm",
          "Orientação": "Eixo Norte-Sul voltado para a Baixada",
          "Iluminação": "Shed superior com venezianas reguláveis",
        },
      },
      {
        id: "node-l4",
        time: "07:10",
        seconds: 430,
        type: "ARTEFATO",
        title: "Os Cavaletes de Cristal: O Quadro Libertado da Parede",
        subtitle: "Lâmina de vidro encravada em sapata cúbica de concreto permitindo ver o verso das telas",
        category: "Design Museográfico",
        tag: "#Luz",
        transcriptSnippet:
          "Nos museus europeus você só vê a frente da tela na parede dourada. Com os cavaletes de vidro de Lina, você anda livremente por uma floresta de quadros e pode inspecionar o chassi de madeira e as etiquetas dos leilões...",
        specData: {
          "Base dos Cavaletes": "Bloco cúbico de concreto 30x30x30 cm",
          "Suporte de Exposição": "Vidro temperado transparente 15mm",
          "Fixação da Tela": "Cunhas de borracha e pinos de latão",
          "Experiência": "Visão de 360° da tela suspensa no espaço",
        },
      },
      {
        id: "node-l5",
        time: "08:40",
        seconds: 520,
        type: "FILOSOFIA",
        title: "A 'Arquitetura Pobre' e o Tempo Espacial Popular",
        subtitle: "A recusa ao monumento estéril em favor de um abrigo vibrante para a vida coletiva",
        category: "Antropologia do Espaço",
        tag: "#Filosofia",
        transcriptSnippet:
          "Para Lina Bo Bardi, o tempo não é uma linha cronológica fria de datas européias; o tempo é o que as pessoas comuns constroem quando ocupam o espaço. O MASP é um monumento anti-monumento...",
        specData: {
          "Programa Funcional": "Museu, Escola, Teatro, Restaurante e Praça",
          "Interação Urbana": "Conexão direta com o Metrô Trianon-Masp",
          "Filosofia Social": "Cultura popular como matriz de vanguarda",
          "Legado": "Tombamento pelo IPHAN e referência mundial",
        },
      },
    ],
    chapters: [
      {
        time: "00:00",
        seconds: 0,
        title: "01. O Belvedere Trianon e a Condição de Não Tapar a Serra",
        duration: "02:00",
        summary: "A promessa da doação do terreno que exigiu a invenção do vão de 74 metros para manter o horizonte aberto.",
      },
      {
        time: "02:00",
        seconds: 120,
        title: "02. Os Quatro Mastros Vermelhos da Avenida Paulista",
        duration: "01:30",
        summary: "O cálculo de protensão de Figueiredo Ferraz e a estrutura que desafiou os limites do concreto armado em 1968.",
      },
      {
        time: "03:30",
        seconds: 210,
        title: "03. O Vão Livre como Coração da Cidadania",
        duration: "01:50",
        summary: "O piso de asfalto sob o museu que se transformou no principal epicentro democrático da maior metrópole da América Latina.",
      },
      {
        time: "05:20",
        seconds: 320,
        title: "04. A Caixa de Vidro Flutuante & O Concreto Nu",
        duration: "01:50",
        summary: "A recusa deliberada ao mármore burguês: a celebração do cimento, do pinho e da luz tropical brasileira.",
      },
      {
        time: "07:10",
        seconds: 430,
        title: "05. A Revolução dos Cavaletes de Cristal",
        duration: "01:30",
        summary: "A destruição da parede museológica tradicional: caminhar por uma floresta transparente de Rembrandt e Van Gogh.",
      },
      {
        time: "08:40",
        seconds: 520,
        title: "06. Epílogo: A Arquitetura como Acontecimento Popular",
        duration: "01:00",
        summary: "As lições de Lina Bo Bardi sobre como edifícios só têm alma quando pertencem à vida das pessoas comuns.",
      },
    ],
    transcript: [
      {
        id: "trb-1",
        timeRange: "02:00 - 03:00",
        startSec: 120,
        endSec: 180,
        speaker: "Marcelo Ferraz (Arquiteto & Colaborador de Lina)",
        text: "Lina dizia com clareza: a beleza do MASP é não encostar no chão. Um edifício pesado de 30 mil toneladas que flutua a 8 metros de altura é um ato poético de desafio à gravidade e ao conservadorismo.",
        highlightTerm: "beleza do MASP é não encostar no chão",
      },
      {
        id: "trb-2",
        timeRange: "03:30 - 04:30",
        startSec: 210,
        endSec: 270,
        speaker: "Lina Bo Bardi (Arquiteta)",
        text: "O tempo linear é uma invenção do Ocidente. O tempo não é reto; ele tem curvas, tem nós. No vão livre do MASP, os operários que fizeram o concreto almoçam sentados sob o quadro de Rafael.",
        highlightTerm: "tempo não é reto; ele tem curvas",
      },
      {
        id: "trb-3",
        timeRange: "05:20 - 06:15",
        startSec: 320,
        endSec: 375,
        speaker: "José Miguel Wisnik (Ensaísta & Músico)",
        text: "O vão livre é a garganta urbana de São Paulo. Quando a cidade grita por democracia, ela grita ali. Lina Bo Bardi não projetou um museu de gavetas; ela projetou uma praça com cobertura de arte.",
        highlightTerm: "garganta urbana de São Paulo",
      },
      {
        id: "trb-4",
        timeRange: "07:10 - 08:00",
        startSec: 430,
        endSec: 480,
        speaker: "Giulio Carlo Argan (Historiador da Arte)",
        text: "Os cavaletes de cristal de Lina são a invenção museográfica mais importante do século XX. O visitante deixa de ser um devoto em procissão diante da parede e passa a ser um descobridor no meio das obras.",
        highlightTerm: "invenção museográfica mais importante",
      },
      {
        id: "trb-5",
        timeRange: "08:40 - 09:30",
        startSec: 520,
        endSec: 570,
        speaker: "José Celso Martinez Corrêa (Teatro Oficina)",
        text: "Lina destruiu a distância sagrada entre a arte e o povo. Ela trouxe o circo, o futebol, o almoço de marmita para dentro da catedral modernista. O MASP é antropofagia arquitetônica em estado puro.",
        highlightTerm: "antropofagia arquitetônica em estado puro",
      },
    ],
    discourse: [
      {
        author: "José Miguel Wisnik",
        role: "Professor Titular de Literatura da USP & Ensaísta",
        time: "03:30",
        text: "O vão livre de Lina Bo Bardi é um milagre da física e da sociologia. Ele conecta a serra ao asfalto e transforma o concreto armado na pele acolhedora da multidão.",
      },
      {
        author: "Giulio Carlo Argan",
        role: "Crítico de Arte & Historiador Italiano",
        time: "07:10",
        text: "Nos cavaletes de vidro, a pintura não mente. Vemos o verso do quadro, a assinatura do autor e a luz da cidade banhando a tela ao mesmo tempo. É a desmistificação total do fetiche artístico.",
      },
      {
        author: "Marcelo Ferraz",
        role: "Diretor da Brasil Arquitetura & Instituto Bardi",
        time: "02:00",
        text: "O MASP não é uma escultura de contemplação passiva; é um instrumento de cidadania. O vermelho dos pilares foi aplicado por Lina após anos de concreto cinza para sinalizar o pulso vivo do coração urbano.",
      },
    ],
  },
};
