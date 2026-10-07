"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Terminal, Shield, ArrowRight, Loader2 } from "lucide-react";
import { CmoMessage } from "@/types";

interface CmoChatProps {
  walletAddress: string;
}

export const CmoChat: React.FC<CmoChatProps> = ({ walletAddress }) => {
  const [messages, setMessages] = useState<CmoMessage[]>([
    {
      id: "msg_welcome",
      sender: "cmo",
      content: `Welcome. I am **MaInsane**, your autonomous AI Chief Marketing Officer.\n\nI operate 24/7 with zero human overhead. I specialize in:\n- **GTM Strategy & ICP Definition**\n- **Automated B2B Cold Outreach Cadences ($0.05/action)**\n- **Live Competitor Intelligence & Teardowns (Okara.ai, Explee, Apollo)**\n- **Product Launch Video Scripts & VoiceStudio Syntheses ($5.00/asset)**\n\nHow should we accelerate your pipeline today?`,
      timestamp: new Date().toLocaleTimeString(),
      modelProvider: "Gemini 2.5 Flash",
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Formulate Q4 B2B SaaS GTM Playbook ($2M ARR target)",
    "Audit Okara.ai weaknesses & write counter-battlecard",
    "Generate 3-touch high-converting cold email cadence",
    "Calculate optimal CAC payback for $12k ACV enterprise tier",
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isSubmitting) return;

    const userMsg: CmoMessage = {
      id: `usr_${Date.now()}`,
      sender: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString(),
      modelProvider: "Local Sovereign Node",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");
    setIsSubmitting(true);

    try {
      // Build history array for multi-turn context (exclude welcome and system messages)
      const historyForApi = messages
        .filter((m) => m.sender === "user" || m.sender === "cmo")
        .map((m) => ({
          role: m.sender === "user" ? "user" : "cmo",
          content: m.content,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: text,
          history: historyForApi,
          userAddress: walletAddress,
        }),
      });

      const data = await res.json();

      if (data.success) {
        const cmoMsg: CmoMessage = {
          id: `cmo_${Date.now()}`,
          sender: "cmo",
          content: data.response,
          timestamp: new Date().toLocaleTimeString(),
          modelProvider: data.modelUsed || "Gemini 2.5 Flash",
        };
        setMessages((prev) => [...prev, cmoMsg]);
      } else {
        throw new Error(data.error || "Chat failed");
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: "system",
          content: `Error: ${err.message || "Unable to reach reasoning engine."}`,
          timestamp: new Date().toLocaleTimeString(),
          modelProvider: "Local Sovereign Node",
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-[720px] flex-col rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/80 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">MaInsane Autonomous CMO</span>
              <span className="rounded bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                LIVE COPILOT
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Retaining long-term context via Graft Knowledge Graph & Tree-Sitter AST Memory
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-zinc-400">
          <Shield className="h-4 w-4 text-emerald-400" />
          <span>Strict Zero Mock Data Policy</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.sender !== "user" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-emerald-400 border border-zinc-700">
                <Bot className="h-4 w-4" />
              </div>
            )}

            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                m.sender === "user"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                  : m.sender === "system"
                  ? "border border-rose-800/50 bg-rose-950/40 text-rose-300"
                  : "border border-zinc-800 bg-zinc-950 text-zinc-200"
              }`}
            >
              {/* Message Header */}
              <div className="flex items-center justify-between gap-4 border-b border-zinc-800/60 pb-1.5 mb-2 font-mono text-[10px] text-zinc-400">
                <span className="font-bold text-zinc-300">
                  {m.sender === "user" ? "Operator" : "MaInsane AI CMO"}
                </span>
                <span>{m.modelProvider} • {m.timestamp}</span>
              </div>

              {/* Message Body (Markdown rendered) */}
              <div className="whitespace-pre-wrap space-y-2">{m.content}</div>
            </div>

            {m.sender === "user" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
        {isSubmitting && (
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono pl-11">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>MaInsane synthesizing strategy via high-token MoE engine...</span>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="border-t border-zinc-800/60 bg-zinc-950/40 px-6 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <Sparkles className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
        <span className="text-[11px] text-zinc-400 shrink-0 font-medium">Quick Directives:</span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp)}
            className="whitespace-nowrap rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-[11px] text-zinc-300 hover:border-emerald-500/50 hover:text-white transition-all"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="border-t border-zinc-800 bg-zinc-950 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Instruct your AI CMO (e.g. 'Write a Series-A cold outreach sequence for FinTech')..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={isSubmitting}
            className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isSubmitting || !inputPrompt.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 shadow-md shadow-emerald-500/20 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
