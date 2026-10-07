import { NextRequest, NextResponse } from "next/server";
import { graftMemory } from "@/lib/graft-memory";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (query) {
    const nodes = graftMemory.querySymbols(query);
    return NextResponse.json({ success: true, nodes });
  }

  return NextResponse.json({
    success: true,
    summary: graftMemory.getGraphSummary(),
  });
}
