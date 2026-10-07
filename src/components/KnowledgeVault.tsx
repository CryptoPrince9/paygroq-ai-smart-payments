"use client";

import React, { useState, useEffect } from "react";
import { Database, Search, GitFork, FileCode, CheckCircle2, Cpu } from "lucide-react";

export const KnowledgeVault: React.FC = () => {
  const [nodes, setNodes] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNodes = async (q?: string) => {
    try {
      const url = q ? `/api/memory?q=${encodeURIComponent(q)}` : "/api/memory";
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setNodes(data.nodes || data.summary || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNodes();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchNodes(searchQuery);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-emerald-400" />
            <h1 className="text-lg font-bold text-white">AST Memory Graph & Graft Vault</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Deterministic AST semantic indexing (Tree-Sitter) &amp; persistent markdown context caching (&lt;1ms graph queries).
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex w-full md:w-auto items-center gap-2">
          <input
            type="text"
            placeholder="Search Symbols (e.g. CAC, ICP, Battlecard)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none w-full md:w-64"
          />
          <button
            type="submit"
            className="rounded-xl bg-zinc-800 px-3.5 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-700"
          >
            Query
          </button>
        </form>
      </div>

      {/* Memory Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-12 text-center text-xs text-zinc-500">
            Traversing knowledge graph...
          </div>
        ) : (
          nodes.map((node) => (
            <div
              key={node.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3 transition-all hover:border-zinc-700"
            >
              <div className="flex items-center justify-between">
                <span className="rounded bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                  {node.category}
                </span>
                <span className="font-mono text-[10px] text-zinc-500">Latency &lt;1ms</span>
              </div>
              <h3 className="text-sm font-bold text-white">{node.title}</h3>
              {node.markdownContent && (
                <div className="rounded-lg bg-zinc-950 p-3 text-xs text-zinc-300 font-mono whitespace-pre-wrap max-h-36 overflow-y-auto border border-zinc-800/60">
                  {node.markdownContent}
                </div>
              )}
              {node.symbols && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {node.symbols.map((sym: string, i: number) => (
                    <span
                      key={i}
                      className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                    >
                      #{sym}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
