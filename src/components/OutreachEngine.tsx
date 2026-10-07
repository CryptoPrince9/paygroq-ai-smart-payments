"use client";

import React, { useState, useEffect } from "react";
import { OutreachCampaign, OutreachLead } from "@/types";
import { Send, CheckCircle2, UserCheck, Mail, Sparkles, Loader2, ArrowRight } from "lucide-react";

interface OutreachEngineProps {
  walletAddress: string;
  onActionExecuted: () => void;
}

export const OutreachEngine: React.FC<OutreachEngineProps> = ({ walletAddress, onActionExecuted }) => {
  const [campaigns, setCampaigns] = useState<OutreachCampaign[]>([]);
  const [leads, setLeads] = useState<OutreachLead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  // New lead form state
  const [prospectName, setProspectName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [prospectRole, setProspectRole] = useState<string>("");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/outreach");
      const data = await res.json();
      if (data.success) {
        setCampaigns(data.campaigns);
        setLeads(data.leads);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExecuteAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prospectName.trim() || !companyName.trim()) return;

    setIsExecuting(true);
    setStatusMessage("");

    try {
      const res = await fetch("/api/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "VERIFY_AND_DISPATCH",
          campaignId: "camp_gtm_01",
          userAddress: walletAddress,
          leadData: {
            fullName: prospectName,
            companyName: companyName,
            jobTitle: prospectRole || "Growth Executive",
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLeads((prev) => [data.lead, ...prev]);
        setStatusMessage(`Action Executed! Deducted $0.05. Personalized outbound dispatched to ${data.lead.fullName}`);
        setProspectName("");
        setCompanyName("");
        setProspectRole("");
        onActionExecuted();
      } else {
        setStatusMessage(`Execution Error: ${data.error}`);
      }
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message || "Failed to execute action."}`);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <div>
          <div className="flex items-center gap-2">
            <Send className="h-5 w-5 text-cyan-400" />
            <h1 className="text-lg font-bold text-white">Automated GTM B2B Outreach Engine</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Explee-grade outbound pipeline. High-precision email and LinkedIn cadences billed at exactly $0.05 per action.
          </p>
        </div>
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 px-3 py-1.5 font-mono text-xs text-cyan-400 font-bold">
          Rate: $0.05 / action
        </div>
      </div>

      {/* Active Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((camp) => (
          <div key={camp.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">{camp.channel} Campaign</span>
              <span className="rounded bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                {camp.status}
              </span>
            </div>
            <h3 className="text-base font-bold text-zinc-100">{camp.title}</h3>
            <p className="text-xs text-zinc-400">{camp.targetIcp}</p>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800">
              <div>
                <div className="text-[10px] text-zinc-500">Total Leads</div>
                <div className="text-sm font-bold text-white">{camp.totalLeads}</div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-500">Verified Dispatches</div>
                <div className="text-sm font-bold text-cyan-400">{camp.dispatchedActions}</div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-500">Reply Rate</div>
                <div className="text-sm font-bold text-emerald-400">{camp.replyRatePercent}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Prospect Dispatch Form */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span>Launch Autonomous Lead Action ($0.05 USD)</span>
        </h3>
        <p className="text-xs text-zinc-400 mb-4">
          MaInsane will verify the contact, generate a custom personalized pitch, and trigger the outreach sequence.
        </p>

        <form onSubmit={handleExecuteAction} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Prospect Name (e.g. Alex Mercer)"
            value={prospectName}
            onChange={(e) => setProspectName(e.target.value)}
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-cyan-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Company Name (e.g. Stripe, Linear)"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-cyan-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Job Title (e.g. VP Growth)"
            value={prospectRole}
            onChange={(e) => setProspectRole(e.target.value)}
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-cyan-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isExecuting || !prospectName || !companyName}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-4 py-2 text-xs font-bold text-zinc-950 shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all"
          >
            {isExecuting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            <span>Execute ($0.05)</span>
          </button>
        </form>

        {statusMessage && (
          <div className="mt-3 rounded-lg border border-cyan-500/30 bg-cyan-950/30 p-2.5 text-xs text-cyan-300">
            {statusMessage}
          </div>
        )}
      </div>

      {/* Dispatched Leads Log */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-3">
        <h3 className="text-sm font-bold text-white mb-2">Verified Outbound Queue & Pitch History</h3>
        {loading ? (
          <div className="py-8 text-center text-xs text-zinc-500">Loading prospects...</div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition-all hover:border-zinc-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/60 pb-2 mb-2">
                <div>
                  <span className="text-sm font-bold text-white">{lead.fullName}</span>
                  <span className="text-xs text-zinc-400"> — {lead.jobTitle} @ {lead.companyName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                    {lead.verificationStatus}
                  </span>
                  <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-300">
                    Status: {lead.status}
                  </span>
                </div>
              </div>
              <div className="text-xs text-zinc-300 bg-zinc-900/60 rounded-lg p-2.5 border border-zinc-800/80">
                <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">AI Personalized Pitch:</span>
                "{lead.personalizedPitch}"
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
