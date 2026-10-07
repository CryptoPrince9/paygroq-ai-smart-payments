"use client";

import React, { useState } from "react";
import { X, CheckCircle2, AlertCircle, Copy, Check, ExternalLink, Loader2, Sparkles, Rocket, Crown, DollarSign, ShieldCheck } from "lucide-react";
import {
  TREASURY_WALLET,
  PRICING_CONFIG,
  POLYGON_USDT_CONTRACT,
  USDT_DECIMALS,
  ERC20_ABI,
} from "@/lib/constants";
import { ethers } from "ethers";

interface Web3PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
  onSuccess: () => void;
  defaultPlan?: "retainer" | "omni_launch";
}

export const Web3PaymentModal: React.FC<Web3PaymentModalProps> = ({
  isOpen,
  onClose,
  walletAddress,
  onSuccess,
  defaultPlan = "retainer",
}) => {
  const [selectedPlan, setSelectedPlan] = useState<"retainer" | "omni_launch">(defaultPlan);
  const [quantity, setQuantity] = useState<number>(1);
  const [txHashInput, setTxHashInput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  if (!isOpen) return null;

  // Calculate pricing strictly for the two focused plans in USDT
  const unitPrice = selectedPlan === "retainer" ? PRICING_CONFIG.RETAINER_MONTHLY_USDT : PRICING_CONFIG.OMNI_LAUNCH_PACKAGE_USDT;
  const usdtTotal = unitPrice * quantity;

  const copyAddress = () => {
    navigator.clipboard.writeText(TREASURY_WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUsdtPayment = async () => {
    setIsProcessing(true);
    setStatusMessage(null);

    try {
      if (typeof window === "undefined" || !(window as any).ethereum) {
        throw new Error(
          "No EVM wallet (MetaMask, Rabby, Coinbase Wallet) detected. Please transfer USDT directly to the treasury address below."
        );
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const userAddr = walletAddress || (await signer.getAddress());

      let txHash = "";

      try {
        // 1. Attempt ERC-20 USDT transfer on Polygon
        const usdtContract = new ethers.Contract(POLYGON_USDT_CONTRACT, ERC20_ABI, signer);
        const usdtAmountUnits = ethers.parseUnits(usdtTotal.toString(), USDT_DECIMALS);

        setStatusMessage({
          type: "success",
          text: `Awaiting wallet signature for ${usdtTotal} USDT transfer to treasury...`,
        });

        const tx = await usdtContract.transfer(TREASURY_WALLET, usdtAmountUnits);
        txHash = tx.hash;
      } catch (erc20Err: any) {
        console.warn("Direct ERC-20 transfer rejected or network mismatch, attempting native fallback:", erc20Err);

        // Native fallback if user has native gas tokens
        const maticEquivalent = ethers.parseEther((usdtTotal / 0.5).toFixed(4));
        const nativeTx = await signer.sendTransaction({
          to: TREASURY_WALLET,
          value: maticEquivalent,
        });
        txHash = nativeTx.hash;
      }

      setStatusMessage({
        type: "success",
        text: `Transaction broadcasted! Tx Hash: ${txHash.slice(0, 14)}... Verifying on Polygon node...`,
      });

      // Submit to backend verification route
      const verifyRes = await fetch("/api/billing/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txHash,
          userAddress: userAddr,
          planId: selectedPlan,
          units: quantity,
        }),
      });

      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        setStatusMessage({
          type: "success",
          text: `USDT Payment Confirmed On-Chain! Services have been unlocked immediately.`,
        });
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1800);
      } else {
        setStatusMessage({
          type: "error",
          text: verifyData.error || "On-chain verification pending. Please verify below with your Tx hash.",
        });
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        type: "error",
        text: err.message || "Transaction was rejected or failed.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManualVerify = async () => {
    if (!txHashInput.trim()) {
      setStatusMessage({ type: "error", text: "Please provide a valid transaction hash." });
      return;
    }

    setIsProcessing(true);
    setStatusMessage(null);

    try {
      const verifyRes = await fetch("/api/billing/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txHash: txHashInput.trim(),
          userAddress: walletAddress || TREASURY_WALLET,
          planId: selectedPlan,
          units: quantity,
        }),
      });

      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        setStatusMessage({
          type: "success",
          text: `USDT Payment Confirmed On-Chain! Services activated.`,
        });
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500);
      } else {
        setStatusMessage({
          type: "error",
          text: verifyData.error || "Verification failed. Confirm funds were transferred in USDT.",
        });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Network error querying RPC." });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-7 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">
              Web3 USDT Payment Gateway
            </h2>
            <span className="font-mono text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
              Polygon PoS Network • USDT Settlement
            </span>
          </div>
        </div>

        <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
          <strong className="text-white">Strict Paywall Active:</strong> Non-admin users strictly receive zero access until payment confirms in USDT on Polygon PoS.
        </p>

        {/* Mandatory Treasury Address */}
        <div className="mb-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              TREASURY RECIPIENT WALLET
            </span>
            <span className="font-mono text-[10px]">USDT (Polygon Bor)</span>
          </div>
          <div className="flex items-center justify-between gap-2 rounded-xl bg-zinc-900/90 px-3 py-2 border border-zinc-800">
            <span className="font-mono text-xs text-zinc-200 select-all truncate">
              {TREASURY_WALLET}
            </span>
            <button
              onClick={copyAddress}
              className="flex items-center gap-1 rounded-lg bg-zinc-800 px-2.5 py-1 text-[11px] font-medium text-zinc-300 hover:text-white transition-all"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Focused 2-Tier Pricing Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {/* Option 1: Strategic CMO Retainer */}
          <button
            onClick={() => {
              setSelectedPlan("retainer");
              setQuantity(1);
            }}
            className={`relative rounded-2xl border p-4 text-left transition-all flex flex-col justify-between ${
              selectedPlan === "retainer"
                ? "border-emerald-500 bg-emerald-950/30 ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-950/50"
                : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <Crown className="h-3.5 w-3.5" />
                  Strategic CMO Retainer
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-300 border border-emerald-500/30">
                  24/7 Retainer
                </span>
              </div>
              <div className="text-2xl font-black text-white mt-2">
                199 <span className="text-xs font-normal text-zinc-400">USDT / month</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                Full 24/7 autonomous CMO strategy, real-time competitor tracking, and persistent document memory.
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-zinc-800/80 space-y-1">
              <div className="text-[10px] text-zinc-300 flex items-center gap-1.5">
                <Check className="h-3 w-3 text-emerald-400 shrink-0" />
                <span>24/7 AI CMO Strategy Agent & Copilot</span>
              </div>
              <div className="text-[10px] text-zinc-300 flex items-center gap-1.5">
                <Check className="h-3 w-3 text-emerald-400 shrink-0" />
                <span>Competitor Tracking & Market Intel Radar</span>
              </div>
              <div className="text-[10px] text-zinc-300 flex items-center gap-1.5">
                <Check className="h-3 w-3 text-emerald-400 shrink-0" />
                <span>High-Context Document Ingestion & Memory</span>
              </div>
            </div>
          </button>

          {/* Option 2: Omni-Launchpad 360° Package */}
          <button
            onClick={() => {
              setSelectedPlan("omni_launch");
              setQuantity(1);
            }}
            className={`relative rounded-2xl border p-4 text-left transition-all flex flex-col justify-between ${
              selectedPlan === "omni_launch"
                ? "border-cyan-500 bg-cyan-950/30 ring-2 ring-cyan-500/50 shadow-lg shadow-cyan-950/50"
                : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
                  <Rocket className="h-3.5 w-3.5" />
                  Omni-Launchpad 360°
                </span>
                <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[9px] font-bold text-cyan-300 border border-cyan-500/30">
                  Per Launch
                </span>
              </div>
              <div className="text-2xl font-black text-white mt-2">
                15 <span className="text-xs font-normal text-zinc-400">USDT / package</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                One-click 360° product marketing rollout from a single prompt.
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-zinc-800/80 space-y-1">
              <div className="text-[10px] text-zinc-300 flex items-center gap-1.5">
                <Check className="h-3 w-3 text-cyan-400 shrink-0" />
                <span>ICP Analysis & Positioning</span>
              </div>
              <div className="text-[10px] text-zinc-300 flex items-center gap-1.5">
                <Check className="h-3 w-3 text-cyan-400 shrink-0" />
                <span>Competitor Teardown & Counter-Angle</span>
              </div>
              <div className="text-[10px] text-zinc-300 flex items-center gap-1.5">
                <Check className="h-3 w-3 text-cyan-400 shrink-0" />
                <span>3-Touch Outbound Copy & Video Script</span>
              </div>
            </div>
          </button>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 mb-5">
          <span className="text-xs text-zinc-300 font-medium">
            {selectedPlan === "retainer"
              ? "Retainer Duration (Months):"
              : "Number of Omni-Launchpad Packages:"}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-7 w-7 rounded-lg bg-zinc-800 text-sm font-bold text-zinc-300 hover:text-white transition-all"
            >
              -
            </button>
            <span className="font-mono text-sm font-bold text-white">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="h-7 w-7 rounded-lg bg-zinc-800 text-sm font-bold text-zinc-300 hover:text-white transition-all"
            >
              +
            </button>
          </div>
        </div>

        {/* Total Price Summary in USDT */}
        <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3.5 mb-5">
          <div>
            <div className="text-xs text-zinc-400">Total Settlement Due:</div>
            <div className="text-2xl font-mono font-extrabold text-emerald-400">
              {usdtTotal} USDT
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-zinc-400">Network:</div>
            <div className="text-xs font-mono font-bold text-zinc-200">
              Polygon PoS (EVM)
            </div>
          </div>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`mb-4 flex items-center gap-2 rounded-xl p-3 text-xs ${
              statusMessage.type === "success"
                ? "border border-emerald-500/30 bg-emerald-950/40 text-emerald-300"
                : "border border-rose-500/30 bg-rose-950/40 text-rose-300"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Web3 Send Action */}
        <button
          onClick={handleUsdtPayment}
          disabled={isProcessing}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-[0.99] disabled:opacity-50 transition-all mb-4"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Confirming On-Chain USDT Settlement...</span>
            </>
          ) : (
            <span>Pay {usdtTotal} USDT via Web3 Wallet</span>
          )}
        </button>

        {/* Manual Tx Verification */}
        <div className="border-t border-zinc-900 pt-3.5">
          <div className="text-xs text-zinc-400 mb-2">Transferred USDT externally? Verify Tx Hash:</div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="0x... (USDT Transaction Hash)"
              value={txHashInput}
              onChange={(e) => setTxHashInput(e.target.value)}
              className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs font-mono text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
            />
            <button
              onClick={handleManualVerify}
              disabled={isProcessing}
              className="rounded-xl bg-zinc-800 px-4 py-2.5 text-xs font-semibold text-zinc-200 hover:bg-zinc-700 disabled:opacity-50 transition-all"
            >
              Verify On-Chain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
