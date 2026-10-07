import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AUTONOMOUS_TREASURY, TREASURY_WALLET } from "@/lib/constants";

export async function GET() {
  try {
    const metrics = db.getTreasuryMetrics();
    const state = db.getState();

    return NextResponse.json({
      success: true,
      treasuryWallet: TREASURY_WALLET,
      metrics,
      reinvestmentPolicy: {
        percentage: AUTONOMOUS_TREASURY.REINVESTMENT_PERCENTAGE,
        description: "35% of all client protocol revenue is automatically routed to pay AI service upgrades and infrastructure subscriptions.",
      },
      recentReinvestments: state.agentLogs.filter((l) => l.category === "BILLING_WEB3").slice(0, 5),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
