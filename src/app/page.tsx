"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Dashboard } from "@/components/Dashboard";
import { AgentFeed } from "@/components/AgentFeed";
import { CmoChat } from "@/components/CmoChat";
import { CompetitorRadar } from "@/components/CompetitorRadar";
import { OutreachEngine } from "@/components/OutreachEngine";
import { AssetStudio } from "@/components/AssetStudio";
import { KnowledgeVault } from "@/components/KnowledgeVault";
import { AutonomousLaunchpad } from "@/components/AutonomousLaunchpad";
import { Web3PaymentModal } from "@/components/Web3PaymentModal";
import { UserCredits } from "@/types";
import { ethers } from "ethers";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("launchpad");
  // walletAddress is EMPTY string until user explicitly connects their wallet.
  // Never default to treasury/admin wallet — that would bypass the paywall for everyone.
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [userCredits, setUserCredits] = useState<UserCredits | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [defaultPaymentPlan, setDefaultPaymentPlan] = useState<"retainer" | "omni_launch">("retainer");

  const openPaymentWithPlan = (plan: "retainer" | "omni_launch" = "retainer") => {
    setDefaultPaymentPlan(plan);
    setIsPaymentModalOpen(true);
  };

  const fetchUserStatus = async (address?: string) => {
    const targetAddr = address || walletAddress;
    // Only fetch if a wallet is actually connected
    if (!targetAddr) return;
    try {
      const res = await fetch(`/api/billing/status?address=${targetAddr}`);
      const data = await res.json();
      if (data.success) {
        setUserCredits(data.user);
      }
    } catch (err) {
      console.error("Failed to load user billing status:", err);
    }
  };

  useEffect(() => {
    fetchUserStatus();
  }, [walletAddress]);

  const handleConnectWallet = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          fetchUserStatus(accounts[0]);
        }
      } catch (err) {
        // User rejected — do NOT fall back to treasury wallet. Leave disconnected.
        console.warn("Wallet connect dismissed by user.");
      }
    } else {
      // No EVM wallet — show payment modal with manual tx hash entry
      // Still do NOT set wallet to treasury. User must use the manual verify form.
      openPaymentWithPlan("retainer");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-slate-100">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userCredits={userCredits}
        walletAddress={walletAddress}
        onConnectWallet={handleConnectWallet}
        onOpenPaymentModal={() => openPaymentWithPlan("retainer")}
      />

      {/* Main Interactive Work Area */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {activeTab === "launchpad" && (
          <AutonomousLaunchpad
            walletAddress={walletAddress}
            onExecutionComplete={() => fetchUserStatus()}
            onOpenPaymentModal={openPaymentWithPlan}
          />
        )}
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "feed" && <AgentFeed />}
        {activeTab === "chat" && <CmoChat walletAddress={walletAddress} />}
        {activeTab === "competitors" && (
          <CompetitorRadar walletAddress={walletAddress} onOpenPaymentModal={openPaymentWithPlan} />
        )}
        {activeTab === "outreach" && (
          <OutreachEngine
            walletAddress={walletAddress}
            onActionExecuted={() => fetchUserStatus()}
          />
        )}
        {activeTab === "assets" && (
          <AssetStudio
            walletAddress={walletAddress}
            onAssetGenerated={() => fetchUserStatus()}
          />
        )}
        {activeTab === "vault" && <KnowledgeVault />}
      </main>

      {/* Web3 Cryptographic Settlement Modal */}
      <Web3PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        walletAddress={walletAddress}
        defaultPlan={defaultPaymentPlan}
        onSuccess={() => fetchUserStatus()}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-4 text-center text-xs text-zinc-500">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between px-4 sm:px-6 gap-2">
          <span>MaInsane AI CMO • 100% Live Zero Mock Data Production Build</span>
          <span className="font-mono text-[11px] text-zinc-400">
            Network: Polygon PoS • USDT Settlement
          </span>
        </div>
      </footer>
    </div>
  );
}
