"use client";

import React, { useState, useEffect } from "react";
import { CompetitorProfile } from "@/types";
import { Radar, Plus, Globe, ShieldAlert, Award, Loader2, ArrowRight } from "lucide-react";

interface CompetitorRadarProps {
  walletAddress: string;
  onOpenPaymentModal?: (plan?: "retainer" | "omni_launch") => void;
}

export const CompetitorRadar: React.FC<CompetitorRadarProps> = ({ walletAddress, onOpenPaymentModal }) => {
  const [competitors, setCompetitors] = useState<CompetitorProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [domainInput, setDomainInput] = useState<string>("");
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchCompetitors = async () => {
    try {
      const res = await fetch("/api/competitors");
      const data = await res.json();
      if (data.success) {
        setCompetitors(data.competitors);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitors();
  }, []);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainInput.trim()) return;

    setIsAuditing(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/competitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Pass walletAddress so the server can validate the user's subscription
        body: JSON.stringify({ domain: domainInput.trim(), userAddress: walletAddress }),
      });
      const data = await res.json();
      if (data.success) {
        setCompetitors((prev) => [data.competitor, ...prev]);
        setDomainInput("");
      } else {
        setErrorMsg(data.error || "Failed to audit competitor");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network error");
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Audit Form */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <div>
          <div className="flex items-center gap-2">
            <Radar className="h-5 w-5 text-rose-400" />
            <h1 className="text-lg font-bold text-white">Competitor Intelligence Radar</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time automated surveillance on rival SaaS, pricing updates, and automated counter-battlecards.
            {" "}<span className="text-rose-400 font-semibold">Requires Strategic Retainer (199 USDT/mo)</span>
          </p>
        </div>

        <form onSubmit={handleAudit} className="flex w-full md:w-auto items-center gap-2">
          <input
            type="text"
            placeholder="Audit Competitor (e.g. okara.ai, explee.com)..."
            value={domainInput}
            onChange={(e) => setDomainInput(e.target.value)}
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-rose-500 focus:outline-none w-full md:w-64"
          />
          <button
            type="submit"
            disabled={isAuditing || !domainInput.trim()}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-rose-500/20 hover:brightness-110 disabled:opacity-50 transition-all shrink-0"
          >
            {isAuditing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            <span>Audit</span>
          </button>
        </form>
      </div>

      {errorMsg && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-950/40 p-4 text-xs text-rose-300 space-y-2">
          <div className="font-medium">{errorMsg}</div>
          {onOpenPaymentModal && (errorMsg.includes("PAYMENT") || errorMsg.includes("402") || errorMsg.includes("Authentication")) && (
            <button
              onClick={() => onOpenPaymentModal("retainer")}
              className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 font-bold text-zinc-950 hover:bg-emerald-400 transition-all text-xs"
            >
              Subscribe to Retainer (199 USDT/mo)
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      )}

      {/* Competitor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-12 text-center text-xs text-zinc-500">
            Analyzing competitor intelligence feed...
          </div>
        ) : (
          competitors.map((comp) => (
            <div
              key={comp.id}
              className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all hover:border-zinc-700"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{comp.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                      <Globe className="h-3 w-3 text-zinc-500" />
                      <span>{comp.domain}</span>
                    </div>
                  </div>
                  <span className="rounded-md bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-300">
                    {comp.trafficRankEstimate}
                  </span>
                </div>

                {/* Pricing Teardown */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                  <div className="text-[10px] uppercase font-bold text-zinc-400 mb-1">
                    Pricing Model Analysis
                  </div>
                  <p className="text-xs text-zinc-300">{comp.pricingSummary}</p>
                </div>

                {/* Feature Comparison Matrix */}
                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-zinc-400 mb-1">
                    Competitive Advantage Matrix
                  </div>
                  {comp.featureMatrix?.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-zinc-800/40">
                      <span className="text-zinc-300">{f.feature}</span>
                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        <span className={f.competitorHas ? "text-zinc-400" : "text-zinc-600"}>
                          Rival: {f.competitorHas ? "Yes" : "No"}
                        </span>
                        <span className="rounded bg-emerald-950 border border-emerald-500/30 px-1.5 py-0.5 font-bold text-emerald-400">
                          MaInsane: Superior
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Vulnerability Vector */}
                <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-3">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-rose-400 mb-1">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>Identified Vulnerability</span>
                  </div>
                  <p className="text-xs text-rose-200/90 leading-relaxed">{comp.keyWeakness}</p>
                </div>
              </div>

              {/* CMO Counter-Strategy */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80">
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-emerald-400 mb-1">
                  <Award className="h-3.5 w-3.5" />
                  <span>MaInsane Positioning Move</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{comp.cmoCounterStrategy}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
