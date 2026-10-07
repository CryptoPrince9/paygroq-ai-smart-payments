"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe, FileText, CheckCircle2, Film, Send, Target, TrendingUp, Loader2 } from "lucide-react";
import { isAdminWallet } from "@/lib/constants";
import { AutonomousLaunchResult } from "@/types";

interface AutonomousLaunchpadProps {
  walletAddress: string;
  onExecutionComplete: () => void;
  onOpenPaymentModal?: (plan?: "retainer" | "omni_launch") => void;
}

export const AutonomousLaunchpad: React.FC<AutonomousLaunchpadProps> = ({
  walletAddress,
  onExecutionComplete,
  onOpenPaymentModal,
}) => {
  const [productUrl, setProductUrl] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [result, setResult] = useState<AutonomousLaunchResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const isBypass = isAdminWallet(walletAddress);

  const steps = [
    "Analyzing Product Value Proposition & Ingesting Link",
    "Running Real-Time Competitor Surveillance (Okara/Explee)",
    "Synthesizing 3-Touch B2B Cold Outreach Cadence",
    "Generating 30s Viral Launch Video Brief & VoiceStudio Audio",
    "Calculating CAC vs LTV Cohort Projections & Datawrapper Embeds",
    "Allocating 35% of Revenue to Autonomous AI Infrastructure Subscriptions",
  ];

  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productUrl.trim() || !productDescription.trim()) return;

    setIsExecuting(true);
    setErrorMsg("");
    setResult(null);
    setCurrentStep(0);

    // Visual step progression
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);

    try {
      const res = await fetch("/api/autonomous-launch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: productUrl.trim(),
          description: productDescription.trim(),
          userAddress: walletAddress,
        }),
      });

      const data = await res.json();
      clearInterval(interval);

      if (data.success) {
        setResult(data.launch);
        setCurrentStep(steps.length - 1);
        onExecutionComplete();
      } else {
        setErrorMsg(data.error || "Autonomous launch encountered an error.");
      }
    } catch (err: any) {
      clearInterval(interval);
      setErrorMsg(err.message || "Network error executing autonomous launch.");
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-zinc-950 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                Autonomous One-Prompt CMO Engine
              </span>
            </div>

            {isBypass ? (
              <div className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-3 py-1 text-xs font-mono font-bold text-emerald-300 shadow-sm shadow-emerald-500/20">
                <Zap className="h-3.5 w-3.5 text-emerald-400" />
                <span>⚡ SOVEREIGN OWNER: LIMITS BYPASSED (UNLIMITED)</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs font-mono text-zinc-400">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                <span>Auto-Funded AI Treasury Active</span>
              </div>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Drop Your Link. MaInsane Executes Everything.
          </h1>
          <p className="max-w-2xl text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Input your website URL and product description. MaInsane autonomously formulates your GTM strategy, conducts competitive surveillance, crafts personalized B2B outreach cadences, and synthesizes 30-second viral product launch videos.
          </p>

          {/* Omni Single-Prompt Form */}
          <form onSubmit={handleLaunch} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-1">
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1.5 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Website or Product Link</span>
                </label>
                <input
                  type="text"
                  placeholder="https://yourproduct.io"
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  disabled={isExecuting}
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/90 px-4 py-3 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none transition-all disabled:opacity-50"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1.5 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Product Description & Value Proposition</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Next-gen developer infrastructure for automated zero-cost deployment..."
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    disabled={isExecuting}
                    className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900/90 px-4 py-3 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isExecuting || !productUrl.trim() || !productDescription.trim()}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-3 text-xs font-bold text-zinc-950 shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 transition-all shrink-0"
                  >
                    {isExecuting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Orchestrating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Launch 360° CMO</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-zinc-400 pt-1">
            <span className="font-mono text-zinc-500">
              ⚡ Pricing: <strong className="text-zinc-300">15 USDT</strong> per Omni-Launchpad Package or included in <strong className="text-emerald-400">199 USDT/mo Retainer</strong>
            </span>
            {onOpenPaymentModal && (
              <button
                type="button"
                onClick={() => onOpenPaymentModal("omni_launch")}
                className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 flex items-center gap-1 w-fit"
              >
                <span>Unlock for 15 USDT</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>

          {errorMsg && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-950/40 p-4 text-xs text-rose-300 space-y-2.5">
              <div className="font-medium">{errorMsg}</div>
              {onOpenPaymentModal && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => onOpenPaymentModal("omni_launch")}
                    className="rounded-lg bg-cyan-500 px-3 py-1.5 font-bold text-zinc-950 hover:bg-cyan-400 transition-all text-xs"
                  >
                    Pay 15 USDT for Omni-Launchpad
                  </button>
                  <button
                    onClick={() => onOpenPaymentModal("retainer")}
                    className="rounded-lg bg-emerald-500 px-3 py-1.5 font-bold text-zinc-950 hover:bg-emerald-400 transition-all text-xs"
                  >
                    Subscribe to Retainer (199 USDT/mo)
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Stepper Status When Executing */}
          {isExecuting && (
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-zinc-300 font-mono">
                <span>Autonomous CMO Swarm Progress:</span>
                <span className="text-emerald-400 font-bold">Step {currentStep + 1} of {steps.length}</span>
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                />
              </div>
              <p className="text-xs text-cyan-300 font-medium animate-pulse">
                {steps[currentStep]}...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Complete Autonomous Marketing Rollout Package */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-bold text-white">
                Autonomous 360° Campaign Synthesized & Dispatched
              </span>
            </div>
            <span className="font-mono text-xs text-emerald-400">
              {isBypass ? "Limit Bypass (Zero Cost)" : "Billed from Credits ($15.00) • 35% Reinvested"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Value Prop & Target ICP */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wide">
                <Target className="h-4 w-4" />
                <span>Value Proposition & ICP Target</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                {result.valueProposition}
              </p>
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-400">
                <span className="font-bold text-zinc-300 block mb-1">Target ICP:</span>
                {result.targetIcp}
              </div>
            </div>

            {/* Competitor Teardown */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wide">
                <ShieldCheck className="h-4 w-4" />
                <span>Competitor Vulnerability & Counter-Angle</span>
              </div>
              <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-3 text-xs text-rose-200">
                <span className="font-bold text-rose-300 block mb-1">
                  Rival Target: {result.competitorTeardown.rivalName}
                </span>
                {result.competitorTeardown.vulnerability}
              </div>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3 text-xs text-emerald-200">
                <span className="font-bold text-emerald-300 block mb-1">MaInsane Positioning Move:</span>
                {result.competitorTeardown.counterAngle}
              </div>
            </div>

            {/* 3-Touch B2B Outreach Cadence */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wide">
                  <Send className="h-4 w-4" />
                  <span>3-Touch B2B Outbound Cadence</span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400">
                  {result.b2bOutreachSequence.prospectBatchCount} Prospects Queued
                </span>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 space-y-2">
                <div className="text-xs font-bold text-white border-b border-zinc-800 pb-1">
                  Subject: {result.b2bOutreachSequence.subject}
                </div>
                <div className="text-xs text-zinc-300">
                  <span className="font-bold text-cyan-400">Touch 1 (Hook):</span> "{result.b2bOutreachSequence.step1Hook}"
                </div>
                <div className="text-xs text-zinc-300">
                  <span className="font-bold text-cyan-400">Touch 2 (Value):</span> "{result.b2bOutreachSequence.step2Value}"
                </div>
                <div className="text-xs text-zinc-300">
                  <span className="font-bold text-cyan-400">Touch 3 (Call-to-Action):</span> "{result.b2bOutreachSequence.step3Close}"
                </div>
              </div>
            </div>

            {/* 30s Launch Video & Narration */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wide">
                  <Film className="h-4 w-4" />
                  <span>30-Second Launch Video & Audio</span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400">brag & VoiceStudio</span>
              </div>
              <h4 className="text-xs font-bold text-white">{result.launchVideo.headline}</h4>
              <div className="grid grid-cols-3 gap-2">
                {result.launchVideo.scenes.map((scene) => (
                  <div key={scene.sceneNumber} className="rounded-lg bg-zinc-950 p-2 text-[10px] space-y-1 border border-zinc-800">
                    <span className="font-bold text-emerald-400 block">Scene 0{scene.sceneNumber}</span>
                    <p className="text-zinc-400">{scene.visual}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-2.5 text-xs text-zinc-300 italic">
                Voiceover: "{result.launchVideo.voiceoverScript}"
              </div>
            </div>
          </div>

          {/* Financial & Pipeline Projections */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
            <div className="text-center p-2">
              <div className="text-[10px] uppercase font-bold text-zinc-400">Projected CAC</div>
              <div className="text-lg font-extrabold text-emerald-400 mt-0.5">{result.metricProjection.cacTarget}</div>
            </div>
            <div className="text-center p-2 border-y sm:border-y-0 sm:border-x border-zinc-800">
              <div className="text-[10px] uppercase font-bold text-zinc-400">New Influenced Pipeline</div>
              <div className="text-lg font-extrabold text-white mt-0.5">{result.metricProjection.projectedArr}</div>
            </div>
            <div className="text-center p-2">
              <div className="text-[10px] uppercase font-bold text-zinc-400">Blended Marketing ROI</div>
              <div className="text-lg font-extrabold text-cyan-400 mt-0.5">{result.metricProjection.roiPercentage}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
