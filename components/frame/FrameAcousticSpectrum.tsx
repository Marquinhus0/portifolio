"use client";

import { useEffect, useState } from "react";
import { Activity, Radio, Volume2, Waves } from "lucide-react";
import { MasterclassDataset } from "./FrameMasterclassesData";

interface FrameAcousticSpectrumProps {
  masterclass: MasterclassDataset;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
}

export default function FrameAcousticSpectrum({
  masterclass,
  isPlaying,
  isMuted,
  volume,
}: FrameAcousticSpectrumProps) {
  // 16 Frequency Bands Simulation
  const [bars, setBars] = useState<number[]>([
    15, 25, 45, 60, 80, 65, 50, 42, 35, 28, 20, 18, 14, 12, 10, 8,
  ]);
  const [currentDb, setCurrentDb] = useState(42);

  useEffect(() => {
    if (!isPlaying || isMuted || volume === 0) {
      setBars([8, 10, 12, 14, 16, 14, 12, 10, 8, 7, 6, 5, 4, 3, 2, 2]);
      setCurrentDb(24);
      return;
    }

    const interval = setInterval(() => {
      setBars((prev) =>
        prev.map(() => {
          const rand = Math.floor(Math.random() * 65) + 20;
          return Math.min(100, Math.max(10, Math.floor(rand * volume)));
        })
      );
      setCurrentDb(Math.floor(40 + Math.random() * 18 * volume));
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying, isMuted, volume]);

  return (
    <div className="p-3.5 bg-[#0a0a0c] border border-[#262626] font-mono text-xs space-y-3">
      {/* Header Bar */}
      <div className="flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-1.5 text-white">
          <Activity className="w-3.5 h-3.5 text-[#ff5352]" />
          <span className="font-bold uppercase tracking-wider">
            Monitor de Ressonância Acústica (RT60)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isPlaying && !isMuted ? "bg-emerald-400 animate-pulse" : "bg-neutral-600"
            }`}
          />
          <span className="text-neutral-400">
            {isPlaying && !isMuted ? "SINAL ATIVO" : "STANDBY"}
          </span>
        </div>
      </div>

      {/* 16-Band Waveform Equalizer Display */}
      <div className="h-14 bg-black/60 border border-neutral-800 p-2 flex items-end justify-between gap-1 relative overflow-hidden">
        {/* Subtle Horizontal Decibel Guides */}
        <div className="absolute inset-x-0 top-1/4 border-b border-neutral-800/80 pointer-events-none" />
        <div className="absolute inset-x-0 top-2/4 border-b border-neutral-800/80 pointer-events-none" />
        <div className="absolute inset-x-0 top-3/4 border-b border-neutral-800/80 pointer-events-none" />

        {bars.map((height, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end h-full">
            <div
              className={`w-full rounded-t-[1px] transition-all duration-100 ${
                height > 75
                  ? "bg-[#ff5352]"
                  : height > 45
                  ? "bg-[#ffb3ae]"
                  : "bg-neutral-600"
              }`}
              style={{ height: `${height}%` }}
            />
          </div>
        ))}
      </div>

      {/* Frequency Labels */}
      <div className="flex justify-between text-[8px] text-neutral-500 uppercase px-0.5">
        <span>60 Hz</span>
        <span>250 Hz</span>
        <span>1 kHz</span>
        <span>4 kHz</span>
        <span>16 kHz</span>
      </div>

      {/* Acoustic Properties Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-[#262626] text-[10px]">
        <div className="p-2 bg-[#121216] border border-[#262626]">
          <span className="text-neutral-500 uppercase text-[8px] block">Tempo RT60:</span>
          <span className="text-white font-bold text-xs">
            {masterclass.acousticData.rt60}
          </span>
        </div>
        <div className="p-2 bg-[#121216] border border-[#262626]">
          <span className="text-neutral-500 uppercase text-[8px] block">Pressão Sonora:</span>
          <span className="text-[#ffb3ae] font-bold text-xs">{currentDb} dBA</span>
        </div>
        <div className="p-2 bg-[#121216] border border-[#262626]">
          <span className="text-neutral-500 uppercase text-[8px] block">Absorção Alfa:</span>
          <span className="text-white font-bold text-xs truncate">
            {masterclass.acousticData.absorption}
          </span>
        </div>
        <div className="p-2 bg-[#121216] border border-[#262626]">
          <span className="text-neutral-500 uppercase text-[8px] block">Volume Espacial:</span>
          <span className="text-white font-bold text-xs truncate">
            {masterclass.acousticData.chamberVolume}
          </span>
        </div>
      </div>
    </div>
  );
}
