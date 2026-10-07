import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const state = db.getState();
  return NextResponse.json({
    success: true,
    logs: state.agentLogs,
    totalLogsCount: state.agentLogs.length,
    activeAgentsRunning: 4,
  });
}
