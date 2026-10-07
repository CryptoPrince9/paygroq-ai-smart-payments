"use client";

import React from "react";
import { Logo } from "./Logo";
import { UserCredits } from "@/types";
import { Wallet, ShieldCheck, Zap, Sparkles, ExternalLink } from "lucide-react";
import { TREASURY_WALLET } from "@/lib/constants";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userCredits: UserCredits | null;
  walletAddress: string;
  onConnectWallet: () => void;
  onOpenPaymentModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userCredits,
  walletAddress,
  onConnectWallet,
  onOpenPaymentModal,
}) => {
  const tabs = [
    { id: "launchpad", label: "⚡ Omni Launchpad" },
    { id: "dashboard", label: "Analytics" },
    { id: "feed", label: "Agent Feed" },
    { id: "chat", label: "CMO Copilot" },
    { id: "competitors", label: "Competitor Radar" },
    { id: "outreach", label: "B2B Outreach" },
    { id: "assets", label: "Asset Studio" },
    { id: "vault", label: "Memory Graph" },
  ];

  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : "Connect Wallet";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Logo size="md" />

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-900/60 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-zinc-800 text-emerald-400 shadow-sm shadow-emerald-500/10"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Action Hub: Web3 Wallet & Credit Status */}
        <div className="flex items-center gap-3">
          {/* Sovereign Admin Bypass Badge */}
          {userCredits?.bypassLimits ? (
            <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/60 px-3 py-1.5 text-xs font-mono font-bold text-emerald-300 shadow-sm shadow-emerald-500/20">
              <Zap className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              <span>SOVEREIGN ADMIN: BYPASS ACTIVE</span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-xs">
              <span
                className={`h-2 w-2 rounded-full ${
                  userCredits?.hasActiveRetainer
                    ? "bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400"
                    : "bg-amber-400"
                }`}
              />
              <span className="font-mono text-zinc-300">
                {userCredits?.hasActiveRetainer ? "Retainer: Active (199 USDT)" : "Unpaid (Paywall Active)"}
              </span>
            </div>
          )}

          {/* Omni Launchpad Packages Counter */}
          <div className="hidden md:flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1.5 text-xs font-mono">
            <Zap className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-zinc-400">Launchpad:</span>
            <span className="font-bold text-cyan-300">
              {userCredits?.bypassLimits ? "∞" : userCredits?.hasActiveRetainer ? "Unlimited" : (userCredits?.omniLaunchCredits ?? 0)}
            </span>
          </div>

          {/* Deposit / Upgrade Button */}
          <button
            onClick={onOpenPaymentModal}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1.5 text-xs font-bold text-zinc-950 shadow-md shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>USDT Billing</span>
          </button>

          {/* Web3 Wallet Trigger */}
          <button
            onClick={onConnectWallet}
            className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-mono font-medium text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800 transition-all"
            title={`Treasury Wallet: ${TREASURY_WALLET}`}
          >
            <Wallet className="h-3.5 w-3.5 text-indigo-400" />
            <span>{shortAddress}</span>
          </button>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="flex lg:hidden overflow-x-auto border-t border-zinc-800/60 px-4 py-2 gap-2 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap rounded-md px-3 py-1 text-xs font-semibold ${
              activeTab === tab.id
                ? "bg-zinc-800 text-emerald-400"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
