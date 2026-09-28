"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Bookmark,
  Search,
  Box,
  Keyboard,
  Copy,
  SkipBack,
  SkipForward,
  MessageSquare,
  ListOrdered,
  Smartphone,
  Monitor,
  LayoutGrid,
  Film,
  Maximize2,
  Minimize2,
  FileText,
  HelpCircle,
  Send,
  Trash2,
  Eye,
  Check,
  X,
  Compass,
  Layers,
  ArrowRight,
  Tv,
  Subtitles,
  PictureInPicture2,
  Loader2,
  Sparkles,
} from "lucide-react";

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
  badge: string;
  title: string;
  subtitle: string;
  category: string;
  lecturer: string;
  location: string;
  videoSrc: string;
  fallbackDurationSec: number;
  initialTimeSec: number;
  densityWaveform: number[];
  beads: TimelineBead[];
  chapters: Chapter[];
  transcript: TranscriptLine[];
  discourse: CriticalDiscourse[];
}

// =========================================================================
// ENSAIO MONOGRÁFICO DEFINITIVO: TADAO ANDO (THE CHURCH OF THE LIGHT)
// Baseado no estudo detalhado da obra (Ibaraki, Osaka, 1989)
// =========================================================================
const MASTERCLASS_DATA: MasterclassDataset = {
  badge: "ARQUITETURA & CINEMA // ENSAIO MONOGRÁFICO",
  title: "TADAO ANDO: The Church of the Light (茨木春日丘教会)",
  subtitle: "A Tensão Sagrada entre o Concreto Monolítico, a Fenda Cruciforme e o Silêncio Tectônico",
  category: "Tectônica & Filosofia Zen",
  lecturer: "Tadao Ando (Pritzker Architecture Prize 1995)",
  location: "Ibaraki, Osaka, Japão • Inauguração: 1989",
  videoSrc: "/videos/CHURCH.mp4",
  fallbackDurationSec: 605, // 10:05
  initialTimeSec: 222, // 03:42 (Cruciform Slit)
  densityWaveform: [
    18, 26, 42, 68, 85, 52, 38, 48, 92, 88, 98, 72, 58, 42, 32, 48, 78, 90,
    95, 62, 48, 52, 74, 88, 62, 42, 52, 78, 82, 68, 42, 28,
  ],
  beads: [
    {
      id: "node-1",
      time: "01:45",
      seconds: 105,
      type: "CONCEITO" as const,
      title: "Tectônica Monolítica & Concreto Autoportante",
      subtitle: "Concreto moldado in-loco sem reboco decorativo e com modulação tatami",
      category: "Tectônica & Materialidade",
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
      type: "NÓ ATIVO" as const,
      title: "A Fenda Cruciforme & Anisotropia Solar",
      subtitle: "Abertura de 200mm que rasga a parede leste com luz zenital e azimute 94°",
      category: "Geometria Sagrada & Luz",
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
      type: "ARTEFATO" as const,
      title: "A Parede Oblíqua a 15 Graus (O Limiar Sagrado)",
      subtitle: "Muro diagonal autoportante que intersecta o volume e desacelera o visitante",
      category: "Espaço Fenomenológico",
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
      type: "CAPÍTULO" as const,
      title: "Topologia Acústica & Silêncio Mineral",
      subtitle: "Decaimento sonoro de 2.41s a 500 Hz transformando a nave em caixa de ressonância",
      category: "Acústica & Ressonância",
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
      type: "FILOSOFIA" as const,
      title: "O Vazio Fecundo: O Conceito Zen de 'Ma' (間)",
      subtitle: "Tensão insolúvel entre a imutabilidade do concreto bruto e a efemeridade da luz",
      category: "Filosofia Zen & Wabi-Sabi",
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
};

export default function FramePlayerShowcase() {
  // Device view: desktop cinema vs mobile bottom-sheet vs chapters grid
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile" | "catalog">("desktop");

  // Cinema Mode (Theater Mode) & Aspect Ratio
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [cinemaAspect, setCinemaAspect] = useState<"16:9" | "21:9">("16:9");
  const [isAmbientGlow, setIsAmbientGlow] = useState(true);

  // Video element ref & container ref
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(MASTERCLASS_DATA.initialTimeSec);
  const [totalDuration, setTotalDuration] = useState(MASTERCLASS_DATA.fallbackDurationSec);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState<number>(1.0);
  const [prevVolume, setPrevVolume] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCcActive, setIsCcActive] = useState(true);

  // Active knowledge bead & tabs
  const [activeBeadId, setActiveBeadId] = useState<string>("node-2");
  const [activeRailTab, setActiveRailTab] = useState<"nodes" | "chapters" | "transcript" | "discourse" | "notes">("nodes");
  const [isSavedDossier, setIsSavedDossier] = useState(false);

  // Modals & HUD
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportModalTab, setExportModalTab] = useState<"preview" | "markdown">("preview");
  const [keyboardToast, setKeyboardToast] = useState<string | null>(null);
  const [copiedNotes, setCopiedNotes] = useState(false);

  // Timeline Scrubber Hover Tooltip & Dragging state
  const [timelineHover, setTimelineHover] = useState<{
    pct: number;
    sec: number;
    x: number;
  } | null>(null);
  const [isDraggingScrubber, setIsDraggingScrubber] = useState(false);

  // User interactive notes
  const [userNotes, setUserNotes] = useState<Array<{ id: string; time: string; text: string }>>([
    {
      id: "note-1",
      time: "03:42",
      text: "Fenda cruciforme orientada a 94° leste: o feixe de luz matinal rasga o chão sem necessitar de luminárias artificiais no altar.",
    },
    {
      id: "note-2",
      time: "01:45",
      text: "Modulação tatami (180x90cm) nos painéis de cedro: o módulo residencial japonês traz intimidade humana para o concreto monumental.",
    },
  ]);
  const [newNoteText, setNewNoteText] = useState("");

  // Live search in drawer / transcript
  const [searchQuery, setSearchQuery] = useState("");

  // Trigger HUD toast
  const triggerHudToast = (msg: string) => {
    setKeyboardToast(msg);
    setTimeout(() => {
      setKeyboardToast((curr) => (curr === msg ? null : curr));
    }, 1600);
  };

  // Play / Pause unified handler
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play()
        .then(() => {
          setIsPlaying(true);
          triggerHudToast("▶ Reproduzindo");
        })
        .catch(() => {
          // Fallback to muted playback if browser policy blocks unmuted audio
          v.muted = true;
          setIsMuted(true);
          v.play()
            .then(() => {
              setIsPlaying(true);
              triggerHudToast("▶ Reproduzindo (Áudio mudo por política do navegador)");
            })
            .catch(() => {
              triggerHudToast("Aviso: Interação necessária para tocar");
            });
        });
    } else {
      v.pause();
      setIsPlaying(false);
      triggerHudToast("⏸ Pausado");
    }
  };

  // Seek handler
  const seekTo = (sec: number) => {
    const target = Math.max(0, Math.min(totalDuration, sec));
    setCurrentSeconds(target);
    if (videoRef.current) {
      videoRef.current.currentTime = target;
    }
  };

  // Mute toggle with volume memory
  const toggleMute = () => {
    if (isMuted) {
      const restored = prevVolume > 0 ? prevVolume : 0.8;
      setIsMuted(false);
      setVolume(restored);
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = restored;
      }
      triggerHudToast(`🔊 Áudio: ${Math.round(restored * 100)}%`);
    } else {
      setPrevVolume(volume > 0 ? volume : 0.8);
      setIsMuted(true);
      if (videoRef.current) {
        videoRef.current.muted = true;
      }
      triggerHudToast("🔇 Áudio Mudo");
    }
  };

  // Volume slider handler
  const handleVolumeChange = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    if (clamped > 0) {
      setPrevVolume(clamped);
    }
    if (videoRef.current) {
      videoRef.current.volume = clamped;
      videoRef.current.muted = clamped === 0;
    }
    setIsMuted(clamped === 0);
  };

  // Speed cycler: 1.0x -> 1.25x -> 1.5x -> 2.0x -> 0.75x
  const cycleSpeed = () => {
    const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
    triggerHudToast(`⚡ Velocidade: ${nextSpeed.toFixed(2)}x`);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
      triggerHudToast("⛶ Modo Cinema Tela Cheia");
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
      triggerHudToast("Visão Padrão");
    }
  };

  // Picture-in-Picture toggle
  const togglePip = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        triggerHudToast("PiP desativado");
      } else if (document.pictureInPictureEnabled && v !== document.pictureInPictureElement) {
        await v.requestPictureInPicture();
        triggerHudToast("🖼 Picture-in-Picture ativado");
      }
    } catch {
      triggerHudToast("PiP não suportado");
    }
  };

  // Synchronize on fullscreen change
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs) || !isFinite(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Listen to time updates from video element
  const handleTimeUpdate = () => {
    if (videoRef.current && !isDraggingScrubber) {
      const cur = videoRef.current.currentTime;
      setCurrentSeconds(cur);

      // Auto-identify nearest active bead
      let nearestBead = MASTERCLASS_DATA.beads[0];
      for (const bead of MASTERCLASS_DATA.beads) {
        if (cur >= bead.seconds - 15) {
          nearestBead = bead;
        }
      }
      if (nearestBead.id !== activeBeadId) {
        setActiveBeadId(nearestBead.id);
      }
    }
  };

  // Loaded metadata handler
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      if (dur && !isNaN(dur) && isFinite(dur)) {
        setTotalDuration(dur);
      }
      // Preserve current position if already navigated, or set initial
      if (videoRef.current.currentTime === 0) {
        videoRef.current.currentTime = currentSeconds;
      }
    }
  };

  // Seek to specific bead
  const handleSeekToBead = (bead: TimelineBead) => {
    setActiveBeadId(bead.id);
    seekTo(bead.seconds);
    triggerHudToast(`📍 Nó Selecionado: ${bead.title}`);
  };

  // Add user personal note
  const handleAddUserNote = () => {
    if (!newNoteText.trim()) return;
    const newNote = {
      id: `note-${Date.now()}`,
      time: formatTime(currentSeconds),
      text: newNoteText.trim(),
    };
    setUserNotes((prev) => [newNote, ...prev]);
    setNewNoteText("");
    triggerHudToast(`📝 Nota gravada em [${newNote.time}]`);
  };

  // Bookmark current position
  const handleBookmarkCurrentTime = () => {
    const timeStr = formatTime(currentSeconds);
    const chap = currentChapter.title;
    const existing = userNotes.find((n) => n.time === timeStr);
    if (existing) {
      triggerHudToast(`★ Marcador já existe em [${timeStr}]`);
      return;
    }
    const newNote = {
      id: `note-${Date.now()}`,
      time: timeStr,
      text: `Marcador de estudo: ${chap} (${activeBead.title})`,
    };
    setUserNotes((prev) => [newNote, ...prev]);
    setIsSavedDossier(true);
    triggerHudToast(`★ Marcador gravado em [${timeStr}] no Dossiê`);
  };

  // Delete user note
  const handleDeleteUserNote = (id: string) => {
    setUserNotes((prev) => prev.filter((n) => n.id !== id));
    triggerHudToast("Nota removida");
  };

  // Timeline drag handling
  const handleTimelineMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const sec = Math.floor(pct * totalDuration);
    seekTo(sec);
    setIsDraggingScrubber(true);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDraggingScrubber) return;
      const el = document.getElementById("frame-timeline-track");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      const sec = Math.floor(pct * totalDuration);
      seekTo(sec);
    };

    const handleGlobalMouseUp = () => {
      if (isDraggingScrubber) {
        setIsDraggingScrubber(false);
      }
    };

    if (isDraggingScrubber) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDraggingScrubber, totalDuration]);

  // Universal Keyboard Shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Space or 'k' = Play/Pause
      if (e.code === "Space" || e.key === "k" || e.key === "K") {
        e.preventDefault();
        togglePlay();
      }
      // 'c' or 'C' = Cinema Mode
      else if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        setIsCinemaMode((prev) => {
          const next = !prev;
          triggerHudToast(next ? "🎬 Modo Cinema Ativado [C]" : "Visão Dividida Padrão [C]");
          return next;
        });
      }
      // 'v' or 'V' = Subtitles / CC
      else if (e.key === "v" || e.key === "V") {
        e.preventDefault();
        setIsCcActive((prev) => {
          const next = !prev;
          triggerHudToast(next ? "💬 Legendas Ativadas" : "Legendas Ocultadas");
          return next;
        });
      }
      // 'p' or 'P' = Picture-in-Picture
      else if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        togglePip();
      }
      // 'b' or 'B' = Bookmark note
      else if (e.key === "b" || e.key === "B") {
        e.preventDefault();
        handleBookmarkCurrentTime();
      }
      // 'j' or LeftArrow = Scrub -10s
      else if (e.key === "j" || e.key === "J" || e.key === "ArrowLeft") {
        e.preventDefault();
        const nextSec = Math.max(0, currentSeconds - 10);
        seekTo(nextSec);
        triggerHudToast(`⏪ -10s (${formatTime(nextSec)})`);
      }
      // 'l' or RightArrow = Scrub +10s
      else if (e.key === "l" || e.key === "L" || e.key === "ArrowRight") {
        e.preventDefault();
        const nextSec = Math.min(totalDuration, currentSeconds + 10);
        seekTo(nextSec);
        triggerHudToast(`⏩ +10s (${formatTime(nextSec)})`);
      }
      // ArrowUp = Volume +5%
      else if (e.key === "ArrowUp") {
        e.preventDefault();
        const nextVol = Math.min(1, Math.round((volume + 0.05) * 100) / 100);
        handleVolumeChange(nextVol);
        triggerHudToast(`🔊 Volume: ${Math.round(nextVol * 100)}%`);
      }
      // ArrowDown = Volume -5%
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextVol = Math.max(0, Math.round((volume - 0.05) * 100) / 100);
        handleVolumeChange(nextVol);
        triggerHudToast(`🔉 Volume: ${Math.round(nextVol * 100)}%`);
      }
      // 'm' = Mute/Unmute
      else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        toggleMute();
      }
      // 'f' = Fullscreen
      else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      }
      // Escape = Exit cinema or close modals
      else if (e.key === "Escape") {
        if (showSpeedMenu) setShowSpeedMenu(false);
        if (showShortcutsModal) setShowShortcutsModal(false);
        if (showExportModal) setShowExportModal(false);
        if (isCinemaMode) {
          setIsCinemaMode(false);
          triggerHudToast("Visão Dividida Padrão");
        }
      }
      // '?' = Help Modal
      else if (e.key === "?") {
        e.preventDefault();
        setShowShortcutsModal((prev) => !prev);
      }
      // '[' = Previous Bead
      else if (e.key === "[") {
        e.preventDefault();
        const currentIndex = MASTERCLASS_DATA.beads.findIndex((b) => b.id === activeBeadId);
        if (currentIndex > 0) {
          handleSeekToBead(MASTERCLASS_DATA.beads[currentIndex - 1]);
        }
      }
      // ']' = Next Bead
      else if (e.key === "]") {
        e.preventDefault();
        const currentIndex = MASTERCLASS_DATA.beads.findIndex((b) => b.id === activeBeadId);
        if (currentIndex < MASTERCLASS_DATA.beads.length - 1) {
          handleSeekToBead(MASTERCLASS_DATA.beads[currentIndex + 1]);
        }
      }
      // Tabs numbers 1-5
      else if (e.key === "1") setActiveRailTab("nodes");
      else if (e.key === "2") setActiveRailTab("chapters");
      else if (e.key === "3") setActiveRailTab("transcript");
      else if (e.key === "4") setActiveRailTab("discourse");
      else if (e.key === "5") setActiveRailTab("notes");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSeconds, totalDuration, activeBeadId, isMuted, volume, isCinemaMode, showSpeedMenu, showShortcutsModal, showExportModal]);

  // Active bead finder
  const activeBead = useMemo(() => {
    return (
      MASTERCLASS_DATA.beads.find((b) => b.id === activeBeadId) ||
      MASTERCLASS_DATA.beads[0]
    );
  }, [activeBeadId]);

  // Current chapter calculation
  const currentChapter = useMemo(() => {
    for (let i = MASTERCLASS_DATA.chapters.length - 1; i >= 0; i--) {
      if (currentSeconds >= MASTERCLASS_DATA.chapters[i].seconds) {
        return MASTERCLASS_DATA.chapters[i];
      }
    }
    return MASTERCLASS_DATA.chapters[0];
  }, [currentSeconds]);

  // Active live transcript line at current second
  const activeTranscriptLine = useMemo(() => {
    return MASTERCLASS_DATA.transcript.find(
      (t) => currentSeconds >= t.startSec && currentSeconds <= t.endSec
    );
  }, [currentSeconds]);

  // Hover chapter and bead calculation
  const hoverChapter = useMemo(() => {
    if (!timelineHover) return null;
    for (let i = MASTERCLASS_DATA.chapters.length - 1; i >= 0; i--) {
      if (timelineHover.sec >= MASTERCLASS_DATA.chapters[i].seconds) {
        return MASTERCLASS_DATA.chapters[i];
      }
    }
    return MASTERCLASS_DATA.chapters[0];
  }, [timelineHover]);

  const hoverBead = useMemo(() => {
    if (!timelineHover) return null;
    return MASTERCLASS_DATA.beads.find((b) => Math.abs(b.seconds - timelineHover.sec) <= 15);
  }, [timelineHover]);

  // Progress percentage
  const currentPercent = totalDuration > 0 ? (currentSeconds / totalDuration) * 100 : 0;

  // Filtered transcript based on search query
  const filteredTranscript = useMemo(() => {
    if (!searchQuery.trim()) return MASTERCLASS_DATA.transcript;
    const q = searchQuery.toLowerCase();
    return MASTERCLASS_DATA.transcript.filter(
      (line) =>
        line.text.toLowerCase().includes(q) ||
        line.speaker.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Filtered beads based on search query
  const filteredBeads = useMemo(() => {
    if (!searchQuery.trim()) return MASTERCLASS_DATA.beads;
    const q = searchQuery.toLowerCase();
    return MASTERCLASS_DATA.beads.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.subtitle.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.transcriptSnippet.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Markdown Study Notes generation
  const markdownNotes = useMemo(() => {
    const userNotesSection =
      userNotes.length > 0
        ? `\n## 📝 Anotações Pessoais do Espectador:\n${userNotes
            .map((n) => `- **[${n.time}]** ${n.text}`)
            .join("\n")}\n`
        : "\n## 📝 Anotações Pessoais do Espectador:\n*(Nenhuma anotação gravada nesta sessão)*\n";

    return `# 🎬 FRAME // Dossiê de Estudo Monográfico: Igreja da Luz
**Obra:** ${MASTERCLASS_DATA.title}
**Arquiteto:** ${MASTERCLASS_DATA.lecturer}
**Localização:** ${MASTERCLASS_DATA.location}
**Timestamp da Sessão:** ${formatTime(currentSeconds)} / ${formatTime(totalDuration)}
**Data de Exportação:** ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}

---

## 📌 Capítulos Indexados (${MASTERCLASS_DATA.chapters.length}):
${MASTERCLASS_DATA.chapters.map((c) => `- **[${c.time}] ${c.title}** (${c.duration})\n  *${c.summary}*`).join("\n")}

${userNotesSection}

## 🔬 Nó Técnico Ativo no Momento da Gravação:
**[${activeBead.time}] ${activeBead.title}**
- *Tipo:* \`${activeBead.type}\`
- *Categoria:* ${activeBead.category}
- *Subtítulo:* ${activeBead.subtitle}

### Matriz Tectônica / Especificações:
${Object.entries(activeBead.specData).map(([k, v]) => `- **${k}:** \`${v}\``).join("\n")}

### Citação Transcrita no Nó:
> "${activeBead.transcriptSnippet}"

---

## 📜 Transcrição Curatorial Selecionada:
${MASTERCLASS_DATA.transcript.map((t) => `**[${t.timeRange}] ${t.speaker}:**\n> "${t.text}"\n`).join("\n")}

---

## 💬 Debate & Crítica Especializada:
${MASTERCLASS_DATA.discourse.map((d) => `**${d.author} (${d.role}) — [${d.time}]:**\n> "${d.text}"\n`).join("\n")}

--
*Exportado via FRAME Interactive Cinema Player // Marcus Ritta (Lead Product Designer)*
`;
  }, [currentSeconds, totalDuration, activeBead, userNotes]);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownNotes);
    setCopiedNotes(true);
    triggerHudToast("✓ Dossiê copiado em Markdown!");
    setTimeout(() => setCopiedNotes(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdownNotes], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `frame-dossie-tadao-ando-${formatTime(currentSeconds).replace(":", "-")}.md`;
    link.click();
    URL.revokeObjectURL(url);
    triggerHudToast("💾 Download do Dossiê iniciado!");
  };

  return (
    <div
      ref={containerRef}
      className="w-full border border-[#262626] bg-[#080808] text-[#e5e2e1] p-3 sm:p-6 md:p-8 space-y-6 font-sans selection:bg-[#ff5352] selection:text-white relative"
    >
      {/* ========================================================================= */}
      {/* 01. EXPANDED EDITORIAL HEADER (MONOGRAPHIC MASTERCLASS)                   */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#262626] pb-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5352] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#ffb3ae] font-semibold">
              FRAME // INTERACTIVE CINEMA &amp; KNOWLEDGE RAIL
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-[#1a1313] border border-[#ff5352]/40 text-[#ffb3ae] font-medium">
              REPRODUÇÃO REAL 4K • 24 FPS
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white font-mono">
            {MASTERCLASS_DATA.title}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-3xl leading-relaxed">
            {MASTERCLASS_DATA.subtitle}. A linha do tempo vincula a fenda cruciforme de 200mm, a dosagem de 4000 PSI e a reverberação acústica de 2.41s ao vídeo sem interrupção de reprodução.
          </p>
        </div>

        {/* View Switcher: Split Desktop vs Modo Cinema vs Mobile vs Bento Catalog */}
        <div className="flex items-center gap-1.5 bg-[#131313] p-1 border border-[#262626] rounded self-start lg:self-center shrink-0">
          <button
            onClick={() => {
              setDeviceView("desktop");
              setIsCinemaMode(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono transition-all ${
              deviceView === "desktop" && !isCinemaMode
                ? "bg-[#252528] text-white border border-[#ff5352] font-semibold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-[#ff5352]" />
            <span>Split Desktop</span>
          </button>

          <button
            onClick={() => {
              setDeviceView("desktop");
              setIsCinemaMode(true);
              triggerHudToast("🎬 Modo Cinema Ativado [C]");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono transition-all ${
              deviceView === "desktop" && isCinemaMode
                ? "bg-[#ff5352] text-white border border-[#ff5352] font-semibold shadow-[0_0_10px_rgba(255,83,82,0.4)]"
                : "text-neutral-400 hover:text-white"
            }`}
            title="Modo Cinema Expandido [C]"
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Modo Cinema</span>
          </button>

          <button
            onClick={() => {
              setDeviceView("mobile");
              setIsCinemaMode(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono transition-all ${
              deviceView === "mobile"
                ? "bg-[#252528] text-white border border-[#ff5352] font-semibold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>

          <button
            onClick={() => {
              setDeviceView("catalog");
              setIsCinemaMode(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono transition-all ${
              deviceView === "catalog"
                ? "bg-[#252528] text-white border border-[#ff5352] font-semibold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Capítulos</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VISTA 01: CINEMA DESKTOP (EXPANDED 16:9 VIDEO + SYNCHRONIZED RAIL)        */}
      {/* ========================================================================= */}
      {deviceView === "desktop" && (
        <div className="border border-[#262626] bg-[#0c0c0e] flex flex-col shadow-2xl overflow-hidden relative">
          {/* Keyboard Toast HUD Overlay */}
          {keyboardToast && (
            <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#ff5352] text-white font-mono text-xs font-bold shadow-2xl flex items-center gap-2 border border-white/40 animate-in fade-in slide-in-from-top-2 duration-150">
              <Keyboard className="w-3.5 h-3.5" />
              <span>{keyboardToast}</span>
            </div>
          )}

          {/* Top Operational Bar */}
          <header className="bg-[#09090b] border-b border-[#262626] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 select-none">
            <div className="flex items-center space-x-6">
              <span className="font-mono text-xs uppercase tracking-widest text-white font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ff5352] inline-block animate-pulse" />
                FRAME CINEMA PLAYER
              </span>

              {/* Live Search inside Knowledge Rail */}
              <div className="hidden md:flex items-center relative pl-4 border-l border-[#262626]">
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-6" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activeRailTab !== "transcript" && activeRailTab !== "nodes") {
                      setActiveRailTab("transcript");
                    }
                  }}
                  placeholder="Buscar termo na transcrição ou nós..."
                  className="bg-[#18181b] border border-[#262626] focus:border-[#ff5352] text-xs text-white placeholder:text-neutral-500 pl-8 pr-12 py-1 w-64 lg:w-80 outline-none font-mono"
                />
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 text-neutral-400 hover:text-white text-xs font-mono"
                  >
                    ×
                  </button>
                ) : (
                  <span className="absolute right-2 text-[9px] font-mono px-1 bg-[#201f1f] text-neutral-400 border border-[#262626]">
                    /
                  </span>
                )}
              </div>
            </div>

            {/* Quick Actions (Cinema Mode, Export Dossier, Shortcuts, Fullscreen) */}
            <div className="flex items-center space-x-2 text-xs font-mono">
              <button
                onClick={() => {
                  setIsCinemaMode((prev) => {
                    const next = !prev;
                    triggerHudToast(next ? "🎬 Modo Cinema Ativado [C]" : "Visão Dividida Padrão [C]");
                    return next;
                  });
                }}
                className={`px-3 py-1 border transition-all flex items-center gap-1.5 shadow-sm font-semibold cursor-pointer ${
                  isCinemaMode
                    ? "bg-[#ff5352] text-white border-[#ff5352] shadow-[0_0_12px_rgba(255,83,82,0.4)]"
                    : "bg-[#1c1b1b] hover:bg-[#252528] text-white border-[#262626] hover:border-[#ff5352]"
                }`}
                title="Alternar Modo Cinema Expandido [C]"
              >
                <Tv className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Modo Cinema</span>
              </button>

              <button
                onClick={() => setShowExportModal(true)}
                className="px-3 py-1 bg-[#1c1b1b] hover:bg-[#ff5352] text-white border border-[#262626] hover:border-[#ff5352] transition-colors flex items-center gap-1.5 shadow-sm font-semibold cursor-pointer"
                title="Exportar Dossiê Monográfico em Markdown"
              >
                <FileText className="w-3.5 h-3.5 text-[#ff5352] group-hover:text-white" />
                <span className="hidden md:inline">Exportar Dossiê .MD</span>
                <span className="md:hidden">.MD</span>
              </button>

              <button
                onClick={() => setShowShortcutsModal(true)}
                className="p-1.5 bg-[#1c1b1b] hover:bg-[#2c2b2b] text-white border border-[#262626] transition-colors cursor-pointer"
                title="Atalhos de Teclado [?]"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-1.5 bg-[#1c1b1b] hover:bg-[#2c2b2b] text-white border border-[#262626] transition-colors cursor-pointer"
                title="Alternar Tela Cheia [F]"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </header>

          {/* CINEMA MODE CONTROL SUB-BAR */}
          {isCinemaMode && (
            <div className="bg-[#121114] border-b border-[#262626] px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono select-none">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#ff5352] text-white font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-sm">
                  <Film className="w-3 h-3" />
                  MODO CINEMA ATIVO
                </span>
                <span className="text-neutral-400 text-[11px] hidden md:inline">
                  Experiência 100% de largura • Pressione <kbd className="px-1 bg-[#1f1e22] text-white border border-[#333]">C</kbd> ou <kbd className="px-1 bg-[#1f1e22] text-white border border-[#333]">Esc</kbd> para alternar
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Aspect Ratio Switcher */}
                <div className="flex items-center bg-[#18181b] border border-[#262626] rounded-sm p-0.5 text-[10px]">
                  <button
                    onClick={() => {
                      setCinemaAspect("16:9");
                      triggerHudToast("Proporção 16:9 DCI Padrão");
                    }}
                    className={`px-2 py-0.5 transition-colors cursor-pointer ${
                      cinemaAspect === "16:9" ? "bg-[#ff5352] text-white font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    16:9 DCI
                  </button>
                  <button
                    onClick={() => {
                      setCinemaAspect("21:9");
                      triggerHudToast("Proporção 2.39:1 CinemaScope Anamórfico");
                    }}
                    className={`px-2 py-0.5 transition-colors cursor-pointer ${
                      cinemaAspect === "21:9" ? "bg-[#ff5352] text-white font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    2.39:1 CinemaScope
                  </button>
                </div>

                {/* Ambilight Ambient Glow Toggle */}
                <button
                  onClick={() => {
                    setIsAmbientGlow(!isAmbientGlow);
                    triggerHudToast(!isAmbientGlow ? "Ambilight Ativado" : "Ambilight Desativado");
                  }}
                  className={`px-2.5 py-1 text-[10px] border flex items-center gap-1 transition-colors cursor-pointer ${
                    isAmbientGlow ? "border-[#ff5352] text-[#ffb3ae] bg-[#ff5352]/10" : "border-[#262626] text-neutral-400 hover:text-white"
                  }`}
                  title="Alternar iluminação ambiente Ambilight"
                >
                  <Sparkles className="w-3 h-3 text-[#ff5352]" />
                  <span className="hidden sm:inline">Ambilight</span>
                </button>

                {/* Exit Cinema Mode */}
                <button
                  onClick={() => {
                    setIsCinemaMode(false);
                    triggerHudToast("Visão Dividida Padrão");
                  }}
                  className="px-2.5 py-1 text-[10px] bg-[#1f1e22] hover:bg-[#ff5352] hover:text-white text-neutral-300 border border-[#262626] transition-colors cursor-pointer"
                >
                  ✕ Sair
                </button>
              </div>
            </div>
          )}

          {/* Main Stage: Expansive Cinema Video Stage + Knowledge Rail */}
          <div
            className={`relative transition-all duration-300 ${
              isCinemaMode
                ? "flex flex-col"
                : "grid grid-cols-1 lg:grid-cols-12 min-h-[580px]"
            }`}
          >
            {/* Ambient Ambilight Glow behind Cinema Mode */}
            {isCinemaMode && isAmbientGlow && (
              <div className="absolute -inset-6 bg-gradient-to-b from-[#ff5352]/20 via-[#ff5352]/5 to-transparent blur-3xl pointer-events-none -z-10" />
            )}

            {/* VIDEO COLUMN: ACTIVE VIEWPORT & SCRUBBER */}
            <div
              className={`${
                isCinemaMode
                  ? "w-full border-b border-[#262626]"
                  : "lg:col-span-8 border-b lg:border-b-0 lg:border-r border-[#262626]"
              } relative bg-black flex flex-col justify-between`}
            >
              {/* Active Video Player Viewport */}
              <div
                className={`relative w-full bg-black flex items-center justify-center overflow-hidden group select-none transition-all duration-300 ${
                  isCinemaMode
                    ? cinemaAspect === "21:9"
                      ? "aspect-[21/9] max-h-[75vh]"
                      : "aspect-video max-h-[80vh]"
                    : "aspect-video"
                }`}
              >
                {/* REAL HTML5 VIDEO ELEMENT */}
                <video
                  ref={videoRef}
                  src={MASTERCLASS_DATA.videoSrc}
                  playsInline
                  preload="metadata"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onWaiting={() => setIsBuffering(true)}
                  onPlaying={() => {
                    setIsBuffering(false);
                    setIsPlaying(true);
                  }}
                  onCanPlay={() => setIsBuffering(false)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  onClick={togglePlay}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {/* Ambient Film Grain & Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none" />

                {/* Buffering Indicator */}
                {isBuffering && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none">
                    <Loader2 className="w-10 h-10 text-[#ff5352] animate-spin mb-2" />
                    <span className="font-mono text-xs uppercase tracking-widest text-[#ffb3ae] font-bold">
                      Buffer Cinemático 4K...
                    </span>
                  </div>
                )}

                {/* Active Chapter Watermark on Top-Left */}
                <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 text-[10px] font-mono text-white/90 bg-black/75 backdrop-blur-md px-3 py-1.5 border border-white/10 shadow-lg">
                  <Film className="w-3.5 h-3.5 text-[#ff5352]" />
                  <span className="font-bold text-[#ffb3ae]">{currentChapter.time}</span>
                  <span className="truncate max-w-[200px] sm:max-w-xs">• {currentChapter.title}</span>
                </div>

                {/* Active Bead HUD Chip on Top-Right (No duplicate label!) */}
                <div className="absolute top-4 right-4 z-20 bg-black/75 border border-[#ff5352]/40 backdrop-blur-md px-3 py-1.5 text-right font-mono text-[10px] shadow-lg">
                  <span className="text-white block font-bold truncate max-w-[200px]">
                    {activeBead.title}
                  </span>
                  <span className="text-[#ffb3ae] block text-[9px] uppercase tracking-wider font-semibold">
                    {activeBead.type === "NÓ ATIVO" ? "NÓ TECTÔNICO ATIVO" : `NÓ • ${activeBead.type}`}
                  </span>
                </div>

                {/* Big Center Play/Pause HUD Button - ABSOLUTELY CENTERED! */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/75 border-2 border-white/60 text-white flex items-center justify-center hover:scale-110 hover:border-[#ff5352] hover:bg-[#ff5352] transition-all shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md cursor-pointer ${
                    isPlaying
                      ? "opacity-0 group-hover:opacity-90 scale-95 group-hover:scale-100"
                      : "opacity-95 scale-100 ring-4 ring-[#ff5352]/30 animate-pulse"
                  }`}
                  title="Reproduzir / Pausar [Espaço]"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  ) : (
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white ml-1" />
                  )}
                </button>

                {/* Live Synchronized Subtitle / Active Quote Box at Bottom of Video */}
                {isCcActive && (
                  <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 z-20 pointer-events-none flex justify-center">
                    <div className="bg-black/90 border border-white/20 px-4 py-2 sm:py-2.5 text-center max-w-2xl backdrop-blur-md shadow-2xl transition-all">
                      <span className="text-[10px] font-mono text-[#ffb3ae] block mb-0.5 uppercase tracking-wider font-semibold">
                        {activeTranscriptLine
                          ? `${activeTranscriptLine.timeRange} // ${activeTranscriptLine.speaker}`
                          : `${activeBead.time} // ${activeBead.category}`}
                      </span>
                      <p className="text-xs sm:text-sm font-sans text-neutral-100 italic leading-snug line-clamp-2">
                        &ldquo;{activeTranscriptLine ? activeTranscriptLine.text : activeBead.transcriptSnippet}&rdquo;
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* CINEMATIC TIMELINE & SCRUBBER BAR */}
              <div className="bg-[#0a0a0c] px-4 sm:px-6 py-3 border-t border-[#262626] flex flex-col gap-2 relative z-30 select-none">
                {/* Floating Scrubber Preview Tooltip on Hover */}
                {timelineHover && (
                  <div
                    className="absolute bottom-16 bg-[#161618] border border-[#ff5352] shadow-2xl p-2.5 w-60 pointer-events-none -translate-x-1/2 z-40 font-mono text-[10px] space-y-1.5 animate-in fade-in zoom-in-95 duration-100"
                    style={{ left: `${Math.max(12, Math.min(88, timelineHover.pct))}%` }}
                  >
                    <div className="aspect-[21/9] w-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      <Film className="w-4 h-4 text-[#ff5352] opacity-80" />
                      <span className="absolute bottom-1 right-1 text-[8px] bg-black/80 text-[#ffb3ae] px-1 font-bold">
                        {formatTime(timelineHover.sec)}
                      </span>
                      {hoverBead && (
                        <span className="absolute top-1 left-1 text-[8px] bg-[#ff5352] text-white px-1 font-bold">
                          {hoverBead.type}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[#ffb3ae] font-bold">
                      <span>{formatTime(timelineHover.sec)}</span>
                      <span className="text-[9px] text-neutral-400">/ {formatTime(totalDuration)}</span>
                    </div>
                    <span className="text-white block font-semibold truncate text-[10px]">
                      {hoverChapter ? hoverChapter.title : currentChapter.title}
                    </span>
                    {hoverBead && (
                      <span className="text-neutral-400 block text-[9px] truncate">
                        📍 {hoverBead.title}
                      </span>
                    )}
                  </div>
                )}

                {/* Interactive Timeline Track */}
                <div
                  id="frame-timeline-track"
                  onMouseDown={handleTimelineMouseDown}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const moveX = e.clientX - rect.left;
                    const pct = Math.max(0, Math.min(100, (moveX / rect.width) * 100));
                    const sec = Math.floor((pct / 100) * totalDuration);
                    setTimelineHover({ pct, sec, x: moveX });
                  }}
                  onMouseLeave={() => setTimelineHover(null)}
                  className="relative w-full h-8 flex items-center cursor-pointer group/timeline select-none"
                  title="Clique e arraste para navegar na linha do tempo"
                >
                  {/* Cognitive Density Waveform Track */}
                  <div className="absolute inset-x-0 bottom-1 h-3.5 flex items-end justify-between gap-[1px] opacity-45 pointer-events-none px-0.5">
                    {MASTERCLASS_DATA.densityWaveform.map((val, idx) => {
                      const isPast =
                        (idx / MASTERCLASS_DATA.densityWaveform.length) * 100 <= currentPercent;
                      return (
                        <div
                          key={idx}
                          className={`flex-1 rounded-t-[0.5px] transition-all ${
                            isPast ? "bg-[#ff5352]" : "bg-neutral-700"
                          }`}
                          style={{ height: `${val}%` }}
                        />
                      );
                    })}
                  </div>

                  {/* Hairline base rail */}
                  <div className="absolute inset-x-0 h-[2px] bg-[#262626]" />

                  {/* Progress fill */}
                  <div
                    className="absolute left-0 h-[2px] bg-[#ff5352] transition-all"
                    style={{ width: `${currentPercent}%` }}
                  />

                  {/* Playhead needle */}
                  <div
                    className="absolute w-[3px] h-5 bg-white -translate-x-1/2 shadow-lg z-30"
                    style={{ left: `${currentPercent}%` }}
                  />

                  {/* Timeline Beads - Positioned by exact second */}
                  {MASTERCLASS_DATA.beads.map((bead) => {
                    const isActive = bead.id === activeBeadId;
                    const beadPercent = (bead.seconds / totalDuration) * 100;
                    return (
                      <div
                        key={bead.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSeekToBead(bead);
                        }}
                        className="absolute -top-1.5 group/bead cursor-pointer -translate-x-1/2 z-20"
                        style={{ left: `${beadPercent}%` }}
                      >
                        <div
                          className={`transition-all ${
                            isActive
                              ? "w-4 h-4 bg-[#ff5352] border-2 border-white rotate-45 scale-125 shadow-[0_0_14px_#ff5352]"
                              : "w-2.5 h-2.5 rounded-full bg-[#201f1f] border border-[#ffb3ae] hover:scale-150 hover:bg-[#ff5352]"
                          }`}
                        />
                        {/* Hover Preview Card */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden group-hover/bead:flex flex-col bg-[#1c1b1b] border border-[#ff5352] p-2.5 w-60 shadow-2xl z-30 font-mono text-[10px]">
                          <span className="text-[#ffb3ae] font-semibold">
                            {bead.time} [{bead.type}]
                          </span>
                          <span className="text-white truncate font-medium">
                            {bead.title}
                          </span>
                          <span className="text-neutral-400 text-[9px] line-clamp-1">
                            {bead.subtitle}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Scrubber Controls Bar */}
                <div className="flex justify-between items-center text-neutral-400 font-mono text-xs pt-1 select-none flex-wrap gap-2">
                  {/* Left Controls */}
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 hover:text-white transition-colors cursor-pointer"
                      title={isPlaying ? "Pausar [Espaço]" : "Reproduzir [Espaço]"}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 text-[#ff5352]" />
                      ) : (
                        <Play className="w-4 h-4 fill-white text-white" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        const nextSec = Math.max(0, currentSeconds - 10);
                        seekTo(nextSec);
                        triggerHudToast(`⏪ -10s (${formatTime(nextSec)})`);
                      }}
                      className="p-1 hover:text-white transition-colors cursor-pointer"
                      title="Retroceder 10s [J ou ←]"
                    >
                      <SkipBack className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        const nextSec = Math.min(totalDuration, currentSeconds + 10);
                        seekTo(nextSec);
                        triggerHudToast(`⏩ +10s (${formatTime(nextSec)})`);
                      }}
                      className="p-1 hover:text-white transition-colors cursor-pointer"
                      title="Avançar 10s [L ou →]"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                    </button>

                    {/* Volume Slider with Mute Indicator */}
                    <div className="flex items-center space-x-1.5 pl-2 border-l border-[#262626]">
                      <button
                        onClick={toggleMute}
                        className="hover:text-white transition-colors cursor-pointer p-1"
                        title={isMuted ? "Ativar Áudio [M]" : "Mutar Áudio [M]"}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
                        ) : volume < 0.5 ? (
                          <Volume1 className="w-3.5 h-3.5 text-neutral-300" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-white" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.02"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                        className="w-14 sm:w-16 accent-[#ff5352] bg-neutral-800 h-1 cursor-pointer"
                        title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}% [↑/↓]`}
                      />
                    </div>

                    {/* Timecode Readout */}
                    <div className="flex items-baseline space-x-1 pl-2 border-l border-[#262626] text-[11px]">
                      <span className="font-semibold text-white">
                        {formatTime(currentSeconds)}
                      </span>
                      <span className="text-neutral-500">/</span>
                      <span className="text-neutral-500">
                        {formatTime(totalDuration)}
                      </span>
                    </div>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center space-x-1.5 sm:space-x-2 text-[10px]">
                    {/* Subtitles (CC) Toggle */}
                    <button
                      onClick={() => {
                        setIsCcActive((prev) => {
                          const next = !prev;
                          triggerHudToast(next ? "💬 Legendas Ativadas" : "Legendas Ocultadas");
                          return next;
                        });
                      }}
                      className={`px-2 py-1 border transition-colors flex items-center gap-1 cursor-pointer ${
                        isCcActive
                          ? "border-[#ff5352] text-[#ffb3ae] bg-[#ff5352]/10"
                          : "border-[#262626] text-neutral-400 hover:text-white"
                      }`}
                      title="Alternar Legendas / Transcrição [V]"
                    >
                      <Subtitles className="w-3 h-3" />
                      <span className="hidden sm:inline font-bold">CC</span>
                    </button>

                    {/* Picture-in-Picture */}
                    <button
                      onClick={togglePip}
                      className="p-1.5 border border-[#262626] hover:border-[#ff5352] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      title="Picture-in-Picture / Miniplayer [P]"
                    >
                      <PictureInPicture2 className="w-3 h-3" />
                    </button>

                    {/* Playback Speed Menu */}
                    <div className="relative">
                      <button
                        onClick={() => setShowSpeedMenu((prev) => !prev)}
                        className="px-2 py-1 border border-[#262626] hover:border-[#ff5352] text-neutral-300 hover:text-white flex items-center gap-0.5 cursor-pointer"
                        title="Velocidade de Reprodução"
                      >
                        <span>{playbackSpeed.toFixed(1)}x</span>
                      </button>

                      {showSpeedMenu && (
                        <div className="absolute bottom-full right-0 mb-2 bg-[#161618] border border-[#262626] shadow-2xl py-1 z-50 flex flex-col w-20 text-[10px]">
                          {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((sp) => (
                            <button
                              key={sp}
                              onClick={() => {
                                setPlaybackSpeed(sp);
                                if (videoRef.current) videoRef.current.playbackRate = sp;
                                setShowSpeedMenu(false);
                                triggerHudToast(`⚡ Velocidade: ${sp}x`);
                              }}
                              className={`px-2 py-1 text-left transition-colors flex items-center justify-between cursor-pointer ${
                                playbackSpeed === sp
                                  ? "bg-[#ff5352] text-white font-bold"
                                  : "text-neutral-300 hover:bg-[#201f1f]"
                              }`}
                            >
                              <span>{sp}x</span>
                              {playbackSpeed === sp && <span>✓</span>}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bookmark Quick Add */}
                    <button
                      onClick={handleBookmarkCurrentTime}
                      className={`p-1.5 border transition-colors cursor-pointer ${
                        isSavedDossier
                          ? "border-[#ff5352] text-[#ff5352] bg-[#ff5352]/10"
                          : "border-[#262626] text-neutral-400 hover:text-white hover:border-[#ff5352]"
                      }`}
                      title="Salvar Marcador neste Timecode no Dossiê [B]"
                    >
                      <Bookmark className="w-3 h-3" />
                    </button>

                    {/* MODO CINEMA TOGGLE */}
                    <button
                      onClick={() => {
                        setIsCinemaMode((prev) => {
                          const next = !prev;
                          triggerHudToast(next ? "🎬 Modo Cinema Ativado [C]" : "Visão Dividida Padrão [C]");
                          return next;
                        });
                      }}
                      className={`px-2 py-1 border transition-all flex items-center gap-1 font-semibold cursor-pointer ${
                        isCinemaMode
                          ? "bg-[#ff5352] text-white border-[#ff5352] shadow-[0_0_10px_rgba(255,83,82,0.4)]"
                          : "border-[#262626] text-neutral-300 hover:text-white hover:border-[#ff5352]"
                      }`}
                      title="Alternar Modo Cinema Expandido [C]"
                    >
                      <Tv className="w-3 h-3" />
                      <span className="hidden sm:inline">Cinema</span>
                    </button>

                    {/* Fullscreen Toggle */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 border border-[#262626] hover:border-[#ff5352] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      title="Tela Cheia [F]"
                    >
                      {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* KNOWLEDGE RAIL COLUMN / EXPANDED CONSOLE */}
            <div
              className={`${
                isCinemaMode
                  ? "w-full bg-[#0d0d0f] border-t border-[#262626]"
                  : "lg:col-span-4 bg-[#0d0d0f] border-t lg:border-t-0 border-[#262626]"
              } flex flex-col justify-between`}
            >
              {/* Knowledge Rail Tabs Header */}
              <div className="grid grid-cols-5 bg-[#09090b] border-b border-[#262626] text-[10px] sm:text-xs font-mono select-none">
                {[
                  { id: "nodes", label: "Nós", icon: Box },
                  { id: "chapters", label: "Capítulos", icon: ListOrdered },
                  { id: "transcript", label: "Texto", icon: Film },
                  { id: "discourse", label: "Debate", icon: MessageSquare },
                  { id: "notes", label: "Dossiê", icon: FileText },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeRailTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveRailTab(tab.id as any)}
                      className={`py-3 px-1 flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[#18181b] text-white border-b-2 border-[#ff5352] font-bold"
                          : "text-neutral-500 hover:text-neutral-300"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Body */}
              <div
                className={`p-4 sm:p-5 flex-1 overflow-y-auto space-y-4 font-mono text-xs ${
                  isCinemaMode ? "max-h-[600px]" : "max-h-[520px]"
                }`}
              >
                {/* TAB 1: ARCHITECTURAL NODES & SPEC MATRIX */}
                {activeRailTab === "nodes" && (
                  <div className={isCinemaMode ? "grid grid-cols-1 lg:grid-cols-12 gap-6" : "space-y-3"}>
                    <div className={isCinemaMode ? "lg:col-span-6 space-y-3" : "space-y-3"}>
                      <div className="p-3 bg-[#18181b] border-l-2 border-[#ff5352] border-y border-r border-[#262626] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#ffb3ae] font-bold uppercase">
                            {activeBead.time} // {activeBead.category}
                          </span>
                          <span className="text-[9px] bg-[#ff5352] text-white px-1.5 py-0.5 font-bold">
                            {activeBead.type}
                          </span>
                        </div>
                        <h4 className="text-white font-bold text-sm tracking-tight font-mono">
                          {activeBead.title}
                        </h4>
                        <p className="text-neutral-400 text-xs font-sans leading-relaxed">
                          {activeBead.subtitle}
                        </p>
                      </div>

                      {/* Technical Spec Matrix */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-neutral-500 uppercase text-[9px] tracking-wider block">
                          Matriz Tectônica do Nó Ativo:
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(activeBead.specData).map(([key, val]) => (
                            <div
                              key={key}
                              className="p-2 bg-[#18181b] border border-[#262626] flex flex-col justify-between"
                            >
                              <span className="text-[8px] text-neutral-500 uppercase">
                                {key}
                              </span>
                              <span className="text-white font-bold text-[11px] truncate">
                                {val}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Nodes Catalog List */}
                    <div className={isCinemaMode ? "lg:col-span-6 space-y-2" : "space-y-1.5 pt-2 border-t border-[#262626]"}>
                      <span className="text-neutral-500 uppercase text-[9px] tracking-wider block">
                        Todos os Nós Tectônicos ({filteredBeads.length}):
                      </span>
                      <div className={isCinemaMode ? "grid grid-cols-1 sm:grid-cols-2 gap-2" : "space-y-1.5"}>
                        {filteredBeads.map((b) => {
                          const isThisActive = b.id === activeBeadId;
                          return (
                            <div
                              key={b.id}
                              onClick={() => handleSeekToBead(b)}
                              className={`p-2.5 border transition-all flex items-center justify-between cursor-pointer ${
                                isThisActive
                                  ? "bg-[#252528] border-[#ff5352]"
                                  : "bg-[#161618] hover:bg-[#1c1b1b] border-[#262626] hover:border-[#ff5352]"
                              }`}
                            >
                              <div className="space-y-0.5 truncate pr-2">
                                <div className="flex items-center gap-1.5 text-[9px]">
                                  <span className="text-[#ffb3ae] font-bold">{b.time}</span>
                                  <span className="text-neutral-500">[{b.type}]</span>
                                </div>
                                <span className="text-white block text-[11px] truncate font-medium">
                                  {b.title}
                                </span>
                              </div>
                              <span className="text-[9px] text-[#ff5352] shrink-0 font-bold">
                                {isThisActive ? "ATIVO" : "IR →"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: INDEXED CHAPTERS */}
                {activeRailTab === "chapters" && (
                  <div className="space-y-2">
                    <span className="text-neutral-500 uppercase text-[9px] tracking-wider block">
                      Capítulos da Masterclass:
                    </span>
                    <div className={isCinemaMode ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" : "space-y-2"}>
                      {MASTERCLASS_DATA.chapters.map((chap, idx) => {
                        const isCurrent = currentChapter.time === chap.time;
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              seekTo(chap.seconds);
                              triggerHudToast(`Salto para Capítulo: ${chap.title}`);
                            }}
                            className={`p-3 border transition-all cursor-pointer space-y-1.5 ${
                              isCurrent
                                ? "bg-[#1f1e22] border-[#ff5352]"
                                : "bg-[#141416] hover:bg-[#18181b] border-[#262626]"
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-[#ffb3ae] font-bold">{chap.time}</span>
                              <span className="text-neutral-500 font-mono">{chap.duration}</span>
                            </div>
                            <h4 className="text-white font-bold text-xs leading-snug">
                              {chap.title}
                            </h4>
                            <p className="text-neutral-400 text-[10px] font-sans leading-relaxed">
                              {chap.summary}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 3: DYNAMIC SYNCHRONIZED TRANSCRIPT */}
                {activeRailTab === "transcript" && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[9px] text-neutral-500 pb-1 border-b border-[#262626]">
                      <span>TRANSCRIÇÃO AUDITADA AO VIVO</span>
                      <span>{filteredTranscript.length} TRECHOS</span>
                    </div>

                    <div className={isCinemaMode ? "grid grid-cols-1 lg:grid-cols-2 gap-3" : "space-y-2"}>
                      {filteredTranscript.map((line) => {
                        const isLineActive =
                          currentSeconds >= line.startSec && currentSeconds <= line.endSec;
                        return (
                          <div
                            key={line.id}
                            onClick={() => {
                              seekTo(line.startSec);
                              triggerHudToast(`Salto de transcrição: ${line.speaker}`);
                            }}
                            className={`p-2.5 border transition-all cursor-pointer space-y-1 ${
                              isLineActive
                                ? "bg-[#252528] border-[#ff5352] shadow-sm"
                                : "bg-[#141416] hover:bg-[#19191c] border-[#262626]"
                            }`}
                          >
                            <div className="flex items-center justify-between text-[9px]">
                              <span className="text-[#ffb3ae] font-bold">{line.speaker}</span>
                              <span className="text-neutral-500">{line.timeRange}</span>
                            </div>
                            <p className="text-neutral-300 text-xs font-sans leading-relaxed">
                              &ldquo;{line.text}&rdquo;
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 4: CRITICAL DISCOURSE */}
                {activeRailTab === "discourse" && (
                  <div className="space-y-3">
                    <span className="text-neutral-500 uppercase text-[9px] tracking-wider block">
                      Crítica & Debate Arquitetônico:
                    </span>
                    <div className={isCinemaMode ? "grid grid-cols-1 md:grid-cols-3 gap-3" : "space-y-3"}>
                      {MASTERCLASS_DATA.discourse.map((disc, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-[#141416] border border-[#262626] space-y-2"
                        >
                          <div className="flex items-center justify-between text-[9px]">
                            <div>
                              <span className="text-white font-bold block">{disc.author}</span>
                              <span className="text-neutral-500 text-[8px]">{disc.role}</span>
                            </div>
                            <button
                              onClick={() => {
                                const bead = MASTERCLASS_DATA.beads.find((b) => b.time === disc.time);
                                if (bead) seekTo(bead.seconds);
                              }}
                              className="text-[#ffb3ae] hover:underline font-bold cursor-pointer"
                            >
                              [{disc.time}]
                            </button>
                          </div>
                          <p className="text-neutral-300 text-xs font-sans italic leading-relaxed">
                            &ldquo;{disc.text}&rdquo;
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 5: STUDY DOSSIER & PERSONAL NOTES */}
                {activeRailTab === "notes" && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[9px] text-neutral-500 border-b border-[#262626] pb-2">
                      <span>CADERNO DE ESTUDOS MONOGRÁFICO</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopyMarkdown}
                          className="text-[#ffb3ae] hover:underline uppercase text-[9px] flex items-center gap-1 font-bold cursor-pointer"
                          title="Copiar Markdown para área de transferência"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedNotes ? "Copiado!" : "Copiar"}</span>
                        </button>
                        <span className="text-neutral-600">·</span>
                        <button
                          onClick={() => setShowExportModal(true)}
                          className="text-white hover:text-[#ff5352] uppercase text-[9px] flex items-center gap-1 font-bold cursor-pointer"
                          title="Visualizar Dossiê Completo"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Ver Dossiê</span>
                        </button>
                      </div>
                    </div>

                    {/* Live Annotation Input */}
                    <div className="p-2.5 bg-[#18181b] border border-[#262626] space-y-2">
                      <div className="flex items-center justify-between text-[9px]">
                        <span className="text-white font-medium">
                          Anotação no Timecode [{formatTime(currentSeconds)}]
                        </span>
                        <span className="text-[#ffb3ae] text-[8px] font-bold">NÓ: {activeBead.time}</span>
                      </div>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleAddUserNote();
                          }}
                          placeholder="Gravar nota técnica pessoal..."
                          className="flex-1 bg-[#09090b] border border-[#262626] focus:border-[#ff5352] text-xs text-white placeholder:text-neutral-500 px-2.5 py-1 outline-none font-mono"
                        />
                        <button
                          onClick={handleAddUserNote}
                          className="px-2.5 py-1 bg-[#ff5352] hover:bg-[#e04544] text-white text-[9px] uppercase font-bold shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Gravar</span>
                        </button>
                      </div>
                    </div>

                    {/* Notes Chronological Stream */}
                    <div className="space-y-2">
                      {userNotes.length === 0 ? (
                        <div className="p-4 text-center text-neutral-500 text-xs">
                          Nenhuma anotação gravada ainda. Digite acima ou pressione Enter.
                        </div>
                      ) : (
                        <div className={isCinemaMode ? "grid grid-cols-1 sm:grid-cols-2 gap-2" : "space-y-2"}>
                          {userNotes.map((note) => (
                            <div
                              key={note.id}
                              className="p-2.5 bg-[#141416] border border-[#262626] space-y-1 text-xs"
                            >
                              <div className="flex items-center justify-between font-mono text-[9px] text-[#ffb3ae]">
                                <span className="font-bold">[{note.time}]</span>
                                <button
                                  onClick={() => handleDeleteUserNote(note.id)}
                                  className="text-neutral-500 hover:text-red-400 p-0.5 cursor-pointer"
                                  title="Remover nota"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                              <p className="text-neutral-200 font-sans leading-relaxed">
                                {note.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Rail Footer */}
              <div className="p-3 bg-[#0a0a0c] border-t border-[#262626] flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  FRAME AUDIOVISUAL ENGINE V2.4
                </span>
                {isCinemaMode && (
                  <button
                    onClick={() => {
                      setIsCinemaMode(false);
                      triggerHudToast("Visão Dividida Padrão");
                    }}
                    className="text-white hover:text-[#ff5352] uppercase font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>← Voltar para Visão Dividida [C]</span>
                  </button>
                )}
                <span className="text-[#ffb3ae]">LATÊNCIA: 4ms</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 02: MOBILE VIEW SIMULATOR (Bottom-Sheet Gestual)                     */}
      {/* ========================================================================= */}
      {deviceView === "mobile" && (
        <div className="max-w-sm mx-auto border-4 border-[#262626] rounded-3xl bg-[#09090b] shadow-2xl overflow-hidden font-mono text-xs">
          {/* Mobile Notch & Status Bar */}
          <div className="h-6 bg-black flex items-center justify-between px-6 text-[10px] text-neutral-400">
            <span>9:41</span>
            <div className="w-16 h-3 bg-neutral-900 rounded-full" />
            <span>5G 100%</span>
          </div>

          {/* Mobile Video Area */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center">
            <video
              src={MASTERCLASS_DATA.videoSrc}
              playsInline
              preload="metadata"
              controls
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile Bottom-Sheet (Swipeable Knowledge Rail) */}
          <div className="p-4 space-y-3 bg-[#111114] border-t border-[#262626]">
            <div className="w-10 h-1 bg-neutral-700 rounded-full mx-auto" />
            <div className="flex items-center justify-between">
              <span className="text-[#ffb3ae] text-[10px] font-bold uppercase">
                {activeBead.time} // {activeBead.category}
              </span>
              <span className="text-[9px] bg-[#ff5352] text-white px-1.5 py-0.5 font-bold">
                {activeBead.type}
              </span>
            </div>
            <h4 className="text-white font-bold text-xs">{activeBead.title}</h4>
            <p className="text-neutral-400 text-[11px] font-sans leading-relaxed">
              {activeBead.subtitle}
            </p>

            <div className="p-2 bg-[#18181b] border border-[#262626] text-[10px] space-y-1">
              <span className="text-neutral-500 uppercase text-[8px] block">Especificação:</span>
              {Object.entries(activeBead.specData).slice(0, 2).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-neutral-400">{k}:</span>
                  <span className="text-white font-bold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 03: CATALOG BENTO GRID (Visão Geral de Capítulos)                   */}
      {/* ========================================================================= */}
      {deviceView === "catalog" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {MASTERCLASS_DATA.chapters.map((chap, idx) => {
            const isCurrent = currentSeconds >= chap.seconds;
            return (
              <div
                key={idx}
                onClick={() => {
                  seekTo(chap.seconds);
                  setDeviceView("desktop");
                  triggerHudToast(`Reproduzindo Capítulo: ${chap.title}`);
                }}
                className={`p-4 border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isCurrent
                    ? "bg-[#18181b] border-[#ff5352] shadow-lg shadow-[#ff5352]/10"
                    : "bg-[#121214] border-[#262626] hover:border-neutral-600"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[#ffb3ae] text-[10px] font-bold">
                    <span>{chap.time}</span>
                    <span>{chap.duration}</span>
                  </div>
                  <h4 className="text-white font-bold text-sm leading-snug">
                    {chap.title}
                  </h4>
                  <p className="text-neutral-400 text-xs font-sans leading-relaxed">
                    {chap.summary}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#262626] text-[10px]">
                  <span className="text-neutral-500">Capítulo #{idx + 1}</span>
                  <span className="text-[#ff5352] font-bold flex items-center gap-1">
                    Assistir →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 04. MODAL: EXPORTAR DOSSIÊ DE ESTUDO (.MD / NOTION)                       */}
      {/* ========================================================================= */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#111114] border border-[#ff5352]/50 p-6 rounded shadow-2xl space-y-4 font-mono text-xs max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <div className="flex items-center space-x-2 text-white">
                <FileText className="w-5 h-5 text-[#ff5352]" />
                <h3 className="font-bold text-sm">
                  Exportar Dossiê Monográfico (.MD)
                </h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-neutral-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs: Preview vs Raw Markdown */}
            <div className="flex space-x-2 border-b border-[#262626] pb-2 text-[10px]">
              <button
                onClick={() => setExportModalTab("preview")}
                className={`px-3 py-1 font-bold transition-colors ${
                  exportModalTab === "preview"
                    ? "bg-[#ff5352] text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Prévia Formatada
              </button>
              <button
                onClick={() => setExportModalTab("markdown")}
                className={`px-3 py-1 font-bold transition-colors ${
                  exportModalTab === "markdown"
                    ? "bg-[#ff5352] text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Código Markdown
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto bg-[#0a0a0c] p-4 border border-[#262626] space-y-3 text-neutral-300">
              {exportModalTab === "preview" ? (
                <div className="space-y-3 font-sans text-xs">
                  <div className="border-b border-neutral-800 pb-2">
                    <span className="text-[#ffb3ae] font-mono text-[10px] block font-bold">
                      {MASTERCLASS_DATA.badge}
                    </span>
                    <h4 className="text-white text-base font-bold font-mono">
                      {MASTERCLASS_DATA.title}
                    </h4>
                    <p className="text-neutral-400 text-xs">
                      {MASTERCLASS_DATA.subtitle}
                    </p>
                  </div>
                  <div className="text-[11px] space-y-1 font-mono">
                    <p>
                      <strong>Timestamp de Captura:</strong> {formatTime(currentSeconds)} / {formatTime(totalDuration)}
                    </p>
                    <p>
                      <strong>Nó Ativo:</strong> [{activeBead.time}] {activeBead.title}
                    </p>
                    <p>
                      <strong>Capítulos Indexados:</strong> {MASTERCLASS_DATA.chapters.length} seções
                    </p>
                    <p>
                      <strong>Anotações Pessoais:</strong> {userNotes.length} gravadas
                    </p>
                  </div>
                </div>
              ) : (
                <pre className="text-[10px] font-mono whitespace-pre-wrap text-neutral-300">
                  {markdownNotes}
                </pre>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#262626]">
              <span className="text-neutral-500 text-[10px]">
                Compatível com Obsidian, Notion, Bear e Logseq.
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyMarkdown}
                  className="px-3 py-1.5 bg-[#201f1f] hover:bg-[#2c2b2b] text-white border border-[#262626] transition-colors flex items-center gap-1.5 font-bold"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedNotes ? "Copiado!" : "Copiar Markdown"}</span>
                </button>
                <button
                  onClick={handleDownloadMarkdown}
                  className="px-3 py-1.5 bg-[#ff5352] hover:bg-[#e04544] text-white font-bold transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Baixar Arquivo .MD</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 05. MODAL: CHEAT SHEET DE ATALHOS DE TECLADO                              */}
      {/* ========================================================================= */}
      {showShortcutsModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111114] border border-[#ff5352]/50 p-6 rounded shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <div className="flex items-center space-x-2 text-white">
                <Keyboard className="w-5 h-5 text-[#ff5352]" />
                <h3 className="font-bold text-sm">Atalhos Zero-Mouse // FRAME</h3>
              </div>
              <button
                onClick={() => setShowShortcutsModal(false)}
                className="text-neutral-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 text-neutral-300 max-h-[60vh] overflow-y-auto pr-1">
              {[
                { key: "Espaço ou K", action: "Reproduzir / Pausar Vídeo" },
                { key: "C", action: "Alternar Modo Cinema (Teatro)" },
                { key: "F", action: "Modo Tela Cheia (Fullscreen)" },
                { key: "J ou ←", action: "Retroceder 10 segundos" },
                { key: "L ou →", action: "Avançar 10 segundos" },
                { key: "↑ e ↓", action: "Ajustar Volume (±5%)" },
                { key: "M", action: "Mutar / Desmutar Áudio" },
                { key: "V", action: "Ativar / Ocultar Legendas (CC)" },
                { key: "P", action: "Picture-in-Picture (Miniplayer)" },
                { key: "B", action: "Salvar Marcador no Dossiê" },
                { key: "[ e ]", action: "Pular para Nó Anterior / Próximo" },
                { key: "1 a 5", action: "Alternar Abas do Knowledge Rail" },
                { key: "Esc", action: "Sair do Modo Cinema / Fechar Modais" },
                { key: "?", action: "Abrir / Fechar Guia de Atalhos" },
              ].map((shortcut, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 bg-[#18181b] border border-[#262626] text-[11px]"
                >
                  <span className="text-neutral-400">{shortcut.action}</span>
                  <kbd className="px-2 py-0.5 bg-[#252528] text-white font-bold border border-neutral-700 font-mono text-[10px]">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center text-neutral-500 text-[10px]">
              Pressione qualquer tecla indicada para operar sem tirar as mãos do teclado.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
