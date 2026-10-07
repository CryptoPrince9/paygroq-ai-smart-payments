import { NextRequest, NextResponse } from "next/server";
import { verifyOnChainPayment } from "@/lib/web3";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { txHash, userAddress, planId, units = 1 } = body;

    if (!txHash || !userAddress || !planId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: txHash, userAddress, planId" },
        { status: 400 }
      );
    }

    const verification = await verifyOnChainPayment(txHash, userAddress, planId, units);

    if (!verification.success) {
      return NextResponse.json(
        { success: false, error: verification.message },
        { status: 402 }
      );
    }

    return NextResponse.json({
      success: true,
      message: verification.message,
      txDetails: verification.txDetails,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error during verification" },
      { status: 500 }
    );
  }
}
