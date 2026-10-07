"use client";

import React, { useState } from "react";
import { TrendingUp, DollarSign, Users, Target, Activity, Zap, ExternalLink, BarChart3, RefreshCw, Crown, Rocket, Check } from "lucide-react";
import { CMO_METRIC_SERIES } from "@/lib/datawrapper";

export const Dashboard: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState<keyof typeof CMO_METRIC_SERIES>("cacLtv");
  const chartData = CMO_METRIC_SERIES[selectedChart];

  const kpis = [
    {
      title: "Influenced Pipeline ARR",
      value: "$410,000",
      change: "+34.2% MoM",
      isPositive: true,
      icon: DollarSign,
      color: "emerald",
    },
    {
      title: "Blended Customer Acquisition Cost (CAC)",
      value: "$420",
      change: "-18.5% (Savings)",
      isPositive: true,
      icon: Target,
      color: "cyan",
    },
    {
      title: "LTV : CAC Velocity Ratio",
      value: "12.3x",
      change: "Target >3.0x",
      isPositive: true,
      icon: TrendingUp,
      color: "indigo",
    },
    {
      title: "B2B Outbound Reply Rate",
      value: "18.4%",
      change: "Industry avg: 3.1%",
      isPositive: true,
      icon: Users,
      color: "emerald",
    },
    {
      title: "Omni-Launchpad Deployments",
      value: "48 Rollouts",
      change: "15 USDT / launch",
      isPositive: true,
      icon: Zap,
      color: "amber",
    },
    {
      title: "Agent Execution Uptime",
      value: "99.98%",
      change: "24/7 Multi-MoE",
      isPositive: true,
      icon: Activity,
      color: "cyan",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / System Telemetry */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-xl font-bold text-white tracking-tight">CMO Executive Control Panel</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time telemetry, Datawrapper chart engine, and continuous GTM attribution.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 px-3.5 py-1.5 font-mono text-xs text-zinc-300">
            Model: <span className="text-emerald-400 font-bold">Gemini 2.5 Flash / Strata MoE</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 transition-all hover:border-zinc-700 hover:bg-zinc-900/80"
            >
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-[11px] font-medium leading-tight truncate">{kpi.title}</span>
                <Icon className="h-4 w-4 shrink-0 text-zinc-400" />
              </div>
              <div className="text-xl font-extrabold text-white tracking-tight">{kpi.value}</div>
              <div className="text-[10px] font-semibold text-emerald-400 mt-1">{kpi.change}</div>
            </div>
          );
        })}
      </div>

      {/* Focused Core Offerings: Retainer & Omni-Launchpad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tier 1: Strategic CMO Retainer */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-zinc-900/80 to-zinc-950 p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Crown className="h-4 w-4" />
              Strategic CMO Retainer
            </span>
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
              Active Tier • 199 USDT / mo
            </span>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-white">
              199 <span className="text-sm font-normal text-zinc-400">USDT / month</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              24/7 dedicated AI CMO strategy agent, real-time competitor tracking, and persistent high-context document memory.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="text-[11px] text-zinc-300 flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>24/7 Strategy Copilot</span>
            </div>
            <div className="text-[11px] text-zinc-300 flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>Competitor Intel Radar</span>
            </div>
            <div className="text-[11px] text-zinc-300 flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>Document Memory Vault</span>
            </div>
            <div className="text-[11px] text-zinc-300 flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>Unlimited GTM Directives</span>
            </div>
          </div>
        </div>

        {/* Tier 2: Omni-Launchpad 360° Package */}
        <div className="relative overflow-hidden rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-cyan-950/40 via-zinc-900/80 to-zinc-950 p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Rocket className="h-4 w-4" />
              Omni-Launchpad 360° Package
            </span>
            <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
              Single-Prompt • 15 USDT
            </span>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-white">
              15 <span className="text-sm font-normal text-zinc-400">USDT / launch</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              One-click 360° product marketing rollout from a single product link and description.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="text-[11px] text-zinc-300 flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span>ICP Analysis & Value Prop</span>
            </div>
            <div className="text-[11px] text-zinc-300 flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span>Competitor Teardown</span>
            </div>
            <div className="text-[11px] text-zinc-300 flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span>3-Touch Outbound Copy</span>
            </div>
            <div className="text-[11px] text-zinc-300 flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span>30s Video Launch Script</span>
            </div>
          </div>
        </div>
      </div>

      {/* Autonomous Treasury & AI Self-Funding HUD */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-zinc-900/60 to-cyan-950/30 p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Autonomous AI Treasury & Self-Funding Loop
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Protocol revenue automatically funds model upgrades, high-capacity MoE inference, and dedicated RPC bandwidth.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 rounded-xl px-3 py-1 font-bold">
            <span>35% Revenue Reinvestment Rate</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Total Client Revenue Gained</span>
            <span className="text-lg font-extrabold text-white font-mono">$1,250.00 USD</span>
            <span className="text-[10px] text-emerald-400 block mt-1">100% on-chain verified</span>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">AI Reinvestment Reserve Fund</span>
            <span className="text-lg font-extrabold text-cyan-400 font-mono">$185.00 USD</span>
            <span className="text-[10px] text-zinc-400 block mt-1">Available for auto-renewals</span>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">AI Subscriptions Self-Funded</span>
            <span className="text-lg font-extrabold text-emerald-400 font-mono">$408.00 USD</span>
            <span className="text-[10px] text-zinc-400 block mt-1">Paid directly from earnings</span>
          </div>
        </div>

        {/* Active Self-Funded Subscriptions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-2.5 text-xs">
            <div>
              <span className="font-bold text-zinc-200 block">Google Gemini 2.5 High-Throughput</span>
              <span className="text-[10px] text-zinc-400">$149/mo • Google Cloud AI</span>
            </div>
            <span className="rounded bg-emerald-950 border border-emerald-500/40 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
              AUTO-FUNDED
            </span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-2.5 text-xs">
            <div>
              <span className="font-bold text-zinc-200 block">Strata 125B MoE Distributed GPU Node</span>
              <span className="text-[10px] text-zinc-400">$210/mo • Decentralized Edge Mesh</span>
            </div>
            <span className="rounded bg-emerald-950 border border-emerald-500/40 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
              AUTO-FUNDED
            </span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-2.5 text-xs">
            <div>
              <span className="font-bold text-zinc-200 block">Polygon Dedicated Bor RPC Node</span>
              <span className="text-[10px] text-zinc-400">$49/mo • Alchemy / PublicNode</span>
            </div>
            <span className="rounded bg-emerald-950 border border-emerald-500/40 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
              AUTO-FUNDED
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">Live Datawrapper Visualization Engine</h2>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Interactive charts powered by live metric pipelines.
            </p>
          </div>

          {/* Chart Series Switcher */}
          <div className="flex flex-wrap gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950/80 p-1">
            <button
              onClick={() => setSelectedChart("cacLtv")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedChart === "cacLtv"
                  ? "bg-emerald-500 text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              CAC vs LTV Curve
            </button>
            <button
              onClick={() => setSelectedChart("gtmFunnel")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedChart === "gtmFunnel"
                  ? "bg-cyan-500 text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Outreach Funnel
            </button>
            <button
              onClick={() => setSelectedChart("marketShare")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedChart === "marketShare"
                  ? "bg-indigo-500 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Market Share
            </button>
            <button
              onClick={() => setSelectedChart("pipelineVelocity")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedChart === "pipelineVelocity"
                  ? "bg-purple-500 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Pipeline Velocity
            </button>
          </div>
        </div>

        {/* Dynamic Chart Display (High-Def Vector SVG Visualizer) */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-zinc-200">{chartData.title}</span>
            <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-300">
              Unit: {chartData.unit}
            </span>
          </div>

          {/* Interactive Chart Visual */}
          {chartData.type === "line" && (
            <div className="h-64 w-full flex items-end gap-2 pt-6 pb-2">
              {chartData.values.map((val, i) => {
                const max = Math.max(...chartData.values);
                const heightPercent = Math.max(12, Math.round((val / max) * 100));
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <span className="text-[10px] font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      ${val}
                    </span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full rounded-t-md bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:brightness-125 transition-all"
                    />
                    <span className="text-[10px] font-mono text-zinc-500">{chartData.labels[i]}</span>
                  </div>
                );
              })}
            </div>
          )}

          {chartData.type === "funnel" && (
            <div className="space-y-3 py-4">
              {chartData.values.map((val, i) => {
                const max = chartData.values[0];
                const widthPercent = Math.max(15, Math.round((val / max) * 100));
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-300 font-medium">{chartData.labels[i]}</span>
                      <span className="font-mono text-cyan-400 font-bold">{val} {chartData.unit} ({widthPercent}%)</span>
                    </div>
                    <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                      <div
                        style={{ width: `${widthPercent}%` }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {chartData.type === "donut" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-4">
              <div className="flex justify-center">
                <div className="relative h-44 w-44 rounded-full border-8 border-indigo-500 flex items-center justify-center bg-zinc-900/60 shadow-lg shadow-indigo-500/10">
                  <div className="text-center">
                    <div className="text-2xl font-extrabold text-white">34%</div>
                    <div className="text-[10px] text-zinc-400 font-mono">MaInsane Lead</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5">
                {chartData.labels.map((lbl, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 p-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          i === 0 ? "bg-indigo-400" : i === 1 ? "bg-cyan-400" : i === 2 ? "bg-amber-400" : "bg-rose-400"
                        }`}
                      />
                      <span className="text-zinc-200">{lbl}</span>
                    </div>
                    <span className="font-mono font-bold text-white">{chartData.values[i]}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {chartData.type === "bar" && (
            <div className="h-64 w-full flex items-end gap-4 pt-6 pb-2">
              {chartData.values.map((val, i) => {
                const max = Math.max(...chartData.values);
                const heightPercent = Math.max(10, Math.round((val / max) * 100));
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <span className="text-[10px] font-mono text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      ${(val / 1000).toFixed(0)}k
                    </span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full rounded-t-md bg-gradient-to-t from-purple-600 via-indigo-500 to-indigo-400 group-hover:brightness-125 transition-all"
                    />
                    <span className="text-[10px] font-mono text-zinc-500">{chartData.labels[i]}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
