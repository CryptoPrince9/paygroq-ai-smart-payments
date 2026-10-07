import { NextRequest, NextResponse } from "next/server";
import { generateCmoResponse } from "@/lib/ai";
import { graftMemory } from "@/lib/graft-memory";
import { db, isAdminWallet } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, history = [], userAddress } = body;

    if (!prompt) {
      return NextResponse.json({ success: false, error: "Prompt is required" }, { status: 400 });
    }

    // STRICT PAYWALL: Zero service until payment confirmed in USDT
    if (!isAdminWallet(userAddress)) {
      if (!userAddress) {
        return NextResponse.json(
          { success: false, error: "Authentication Required: Please connect your Web3 wallet and pay in USDT to access AI CMO services." },
          { status: 401 }
        );
      }
      const user = db.getUser(userAddress);
      if (!user.hasActiveRetainer) {
        return NextResponse.json(
          {
            success: false,
            error: "PAYMENT REQUIRED: AI CMO services are strictly paywalled. Please subscribe to the Strategic Retainer (199 USDT/mo) via Web3 Gateway to activate.",
          },
          { status: 402 }
        );
      }
    }

    // Retrieve context from Graft Knowledge Graph
    const relevantNodes = graftMemory.querySymbols(prompt);
    const contextString = relevantNodes
      .map((n) => `### ${n.title} (${n.category})\n${n.markdownContent}`)
      .join("\n\n");

    const result = await generateCmoResponse(prompt, history, contextString);

    // Record in real agent feed log
    db.addAgentLog({
      category: "STRATEGY",
      headline: `CMO Strategy Query Executed: "${prompt.slice(0, 45)}..."`,
      detail: `Model: ${result.model}. Retained context from ${relevantNodes.length} graph nodes.`,
      status: "EXECUTED",
      costUsd: 0.0,
      model: result.model,
    });

    return NextResponse.json({
      success: true,
      response: result.text,
      modelUsed: result.model,
      contextNodesUsed: relevantNodes.map((n) => n.title),
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
