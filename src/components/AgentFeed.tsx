"use client";

import React, { useState, useEffect } from "react";
import { AgentTaskLog } from "@/types";
import { Activity, CheckCircle2, Clock, ShieldCheck, Zap, RefreshCw, Layers } from "lucide-react";

export const AgentFeed: React.FC = () => {
  const [logs, setLogs] = useState<AgentTaskLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/agent-feed");
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      }
    } catch (err) {
      console.error("Failed to load agent feed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 8000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "STRATEGY":
        return <span className="rounded bg-indigo-950/80 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-bold text-indigo-400">STRATEGY</span>;
      case "GTM_OUTREACH":
        return <span className="rounded bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-bold text-cyan-400">GTM OUTREACH</span>;
      case "COMPETITOR_RADAR":
        return <span className="rounded bg-rose-950/80 border border-rose-500/30 px-2 py-0.5 text-[10px] font-bold text-rose-400">COMPETITOR RADAR</span>;
      case "MEDIA_ASSET":
        return <span className="rounded bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-400">MEDIA ASSET</span>;
      case "BILLING_WEB3":
        return <span className="rounded bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">WEB3 ON-CHAIN</span>;
      default:
        return <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-bold text-zinc-300">DATAWRAPPER</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-emerald-400" />
            <h1 className="text-lg font-bold text-white">Live Autonomous Agent Feed</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time execution log of AI CMO background swarms, lead dispatches, and cryptographic audits.
          </p>
        </div>
        <button
          onClick={fetchLogs}
          className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:border-zinc-700 hover:text-white"
        >
          <RefreshCw className="h-3.5 w-3.5 text-emerald-400" />
          <span>Sync Feed</span>
        </button>
      </div>

      {/* Log Feed List */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
        {loading ? (
          <div className="py-12 text-center text-xs text-zinc-500">Connecting to agent streaming socket...</div>
        ) : logs.length === 0 ? (
          <div className="py-12 text-center text-xs text-zinc-500">No agent actions recorded yet.</div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-4 transition-all hover:border-zinc-700"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {getCategoryBadge(log.category)}
                  <span className="text-xs font-bold text-white">{log.headline}</span>
                  <span className="font-mono text-[10px] text-zinc-500">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{log.detail}</p>
              </div>

              {/* Badges / Model & Cost */}
              <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-1.5 shrink-0 border-t sm:border-t-0 border-zinc-800/50 pt-2 sm:pt-0 w-full sm:w-auto">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-[11px] font-mono font-semibold text-emerald-400">
                    {log.status}
                  </span>
                </div>
                <div className="font-mono text-[10px] text-zinc-400">
                  {log.model} {log.costUsd > 0 && <span className="text-amber-400">(-${log.costUsd.toFixed(2)})</span>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
