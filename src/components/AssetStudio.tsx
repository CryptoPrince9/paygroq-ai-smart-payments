"use client";

import React, { useState, useEffect } from "react";
import { MediaAssetOutput } from "@/types";
import { Film, Volume2, Image as ImageIcon, Sparkles, Play, Download, Loader2 } from "lucide-react";
import { PHOTON_FILTER_PRESETS } from "@/lib/brag-media";

interface AssetStudioProps {
  walletAddress: string;
  onAssetGenerated: () => void;
}

export const AssetStudio: React.FC<AssetStudioProps> = ({ walletAddress, onAssetGenerated }) => {
  const [assets, setAssets] = useState<MediaAssetOutput[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>("");
  const [features, setFeatures] = useState<string>("Autonomous GTM outreach, On-Chain Web3 billing, Competitor tracking");
  const [audience, setAudience] = useState<string>("B2B SaaS Founders & Growth Directors");
  const [statusMsg, setStatusMsg] = useState<string>("");

  const fetchAssets = async () => {
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      if (data.success) {
        setAssets(data.assets);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return;

    setIsGenerating(true);
    setStatusMsg("");

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          features: features.split(",").map((s) => s.trim()),
          targetAudience: audience,
          userAddress: walletAddress,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAssets((prev) => [data.asset, ...prev]);
        setStatusMsg(`Asset Generated! Deducted $5.00 USD. Storyboard and VoiceStudio audio ready.`);
        setProductName("");
        onAssetGenerated();
      } else {
        setStatusMsg(`Generation Error: ${data.error}`);
      }
    } catch (err: any) {
      setStatusMsg(`Error: ${err.message || "Failed to generate video asset."}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <div>
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5 text-indigo-400" />
            <h1 className="text-lg font-bold text-white">Media & Launch Video Studio</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Integrated latent-spaces/brag video engine, debpalash/VoiceStudio audio synthesizer, and Photon Rust WASM filters.
          </p>
        </div>
        <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 px-3 py-1.5 font-mono text-xs text-indigo-400 font-bold">
          Rate: $5.00 / video asset
        </div>
      </div>

      {/* Generator Form */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <span>Synthesize 30-to-45s Viral Product Launch Video ($5.00 USD)</span>
        </h3>

        <form onSubmit={handleGenerate} className="space-y-3 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1 font-medium">Product / Feature Name</label>
              <input
                type="text"
                placeholder="e.g. MaInsane Autonomous CMO"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1 font-medium">Target Audience / Persona</label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1 font-medium">Core Value Propositions</label>
              <input
                type="text"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="text-[11px] text-zinc-400 font-mono">
              WASM Preset: <span className="text-emerald-400">{PHOTON_FILTER_PRESETS[0]}</span>
            </div>
            <button
              type="submit"
              disabled={isGenerating || !productName.trim()}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all w-full sm:w-auto"
            >
              {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Film className="h-4 w-4" />}
              <span>Render Launch Video ($5.00)</span>
            </button>
          </div>
        </form>

        {statusMsg && (
          <div className="mt-3 rounded-lg border border-indigo-500/30 bg-indigo-950/30 p-2.5 text-xs text-indigo-300">
            {statusMsg}
          </div>
        )}
      </div>

      {/* Generated Assets Display */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white">Generated Video Briefs & Audio Syntheses</h3>
        {loading ? (
          <div className="py-8 text-center text-xs text-zinc-500">Loading media library...</div>
        ) : (
          assets.map((asset) => (
            <div
              key={asset.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4 transition-all hover:border-zinc-700"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                <div>
                  <h4 className="text-base font-bold text-white">{asset.title}</h4>
                  <span className="text-xs text-zinc-400">{asset.durationSeconds}s Duration • Billed ${asset.costDeductedUsd.toFixed(2)}</span>
                </div>
                <span className="rounded-lg bg-indigo-950 border border-indigo-500/30 px-3 py-1 font-mono text-xs font-bold text-indigo-400">
                  {asset.assetType}
                </span>
              </div>

              {/* Kinetic Scenes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {asset.scenes?.map((scene) => (
                  <div key={scene.sceneNumber} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 border-b border-zinc-800/60 pb-1.5">
                      <span className="font-bold text-emerald-400">Scene 0{scene.sceneNumber}</span>
                      <span>{scene.timestamp}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-500 block">Kinetic Text</span>
                      <p className="text-xs font-bold text-white tracking-wide">{scene.kineticTypography}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-500 block">Visual Prompt</span>
                      <p className="text-[11px] text-zinc-400">{scene.visualDirective}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-500 block">Sound Cue</span>
                      <p className="text-[11px] text-cyan-400/90 font-mono">{scene.soundDesignCue}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* VoiceStudio Narration */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                  <Volume2 className="h-4 w-4" />
                  <span>VoiceStudio Multi-Speaker Neural TTS Audio Narration</span>
                </div>
                <p className="text-xs text-zinc-300 italic leading-relaxed">
                  "{asset.audioVoiceoverText}"
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
