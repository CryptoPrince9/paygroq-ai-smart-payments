import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PRICING_CONFIG, TREASURY_WALLET } from "@/lib/constants";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");

    // Only look up user credits if a wallet address is provided
    // Never default to treasury — that would expose admin credits to unauthenticated users
    const user = address ? db.getUser(address) : null;
    const state = db.getState();

    return NextResponse.json({
      success: true,
      user,
      treasuryWallet: TREASURY_WALLET,
      pricing: {
        retainerMonthlyUsdt: PRICING_CONFIG.RETAINER_MONTHLY_USDT,
        omniLaunchPackageUsdt: PRICING_CONFIG.OMNI_LAUNCH_PACKAGE_USDT,
        currency: "USDT",
        network: "Polygon PoS",
      },
      recentTransactions: address ? state.transactions.filter((t) => t.sender.toLowerCase() === address.toLowerCase()).slice(0, 10) : [],
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
