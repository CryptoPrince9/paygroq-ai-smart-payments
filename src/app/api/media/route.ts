import { NextRequest, NextResponse } from "next/server";
import { db, isAdminWallet } from "@/lib/db";
import { generateProductLaunchVideo } from "@/lib/brag-media";

export async function GET() {
  const state = db.getState();
  return NextResponse.json({
    success: true,
    assets: state.mediaAssets,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productName, features = [], targetAudience = "Tech Founders & Growth Leaders", userAddress } = body;

    if (!productName) {
      return NextResponse.json({ success: false, error: "Product name required" }, { status: 400 });
    }

    // STRICT PAYWALL: Zero service until payment confirmed in USDT
    // Media generation is included in BOTH Retainer (199 USDT/mo) AND Omni-Launchpad (15 USDT)
    if (!isAdminWallet(userAddress)) {
      if (!userAddress) {
        return NextResponse.json(
          {
            success: false,
            error: "Authentication Required: Please connect your Web3 wallet and pay in USDT to generate launch videos.",
          },
          { status: 401 }
        );
      }
      const user = db.getUser(userAddress);
      // Grant access if user has active retainer OR has omni-launch credits
      const hasAccess = user.hasActiveRetainer || (user.omniLaunchCredits || 0) > 0;
      if (!hasAccess) {
        return NextResponse.json(
          {
            success: false,
            error: "PAYMENT REQUIRED IN USDT: Launch video generation requires an active Strategic Retainer (199 USDT/mo) or Omni-Launchpad Package (15 USDT). Please pay via Web3 Gateway.",
          },
          { status: 402 }
        );
      }
    }

    const asset = await generateProductLaunchVideo(productName, features, targetAudience);
    db.addMediaAsset(asset);

    // Record agent task log
    db.addAgentLog({
      category: "MEDIA_ASSET",
      headline: `Generated Launch Video & VoiceStudio Audio: ${productName}`,
      detail: `Synthesized 3-scene kinetic video brief, neural voiceover, and Photon WASM color profile.`,
      status: "EXECUTED",
      costUsd: 0.0,
      model: "brag-engine & VoiceStudio",
    });

    return NextResponse.json({
      success: true,
      message: `Asset generated for ${productName}`,
      asset,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
