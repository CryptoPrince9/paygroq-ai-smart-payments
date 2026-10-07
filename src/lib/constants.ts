/**
 * MaInsane Global System Constants
 * Safe for client-side and server-side usage
 */

// MANDATORY HARDCODED ON-CHAIN TREASURY WALLET DESTINATION & SOVEREIGN ADMIN
export const TREASURY_WALLET = "0x32C2c16b8821dE40F1d71FB67b050542F87f58F8";
export const SOVEREIGN_ADMIN_WALLET = "0x32C2c16b8821dE40F1d71FB67b050542F87f58F8";

// Polygon PoS USDT Contract Address (6 Decimals)
export const POLYGON_USDT_CONTRACT = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
export const USDT_DECIMALS = 6;

export function isAdminWallet(address?: string | null): boolean {
  if (!address) return false;
  return address.toLowerCase() === SOVEREIGN_ADMIN_WALLET.toLowerCase();
}

// Focused Monetization & Pricing Specifications in USDT
export const PRICING_CONFIG = {
  PAYMENT_CURRENCY: "USDT",
  RETAINER_MONTHLY_USDT: 199.0, // Strategic CMO Retainer: 199 USDT / month
  OMNI_LAUNCH_PACKAGE_USDT: 15.0, // Omni-Launchpad 360° Package: 15 USDT (ICP, competitor teardown, 3-touch outbound, video script)
  
  // Aliases for compatibility
  RETAINER_MONTHLY_USD: 199.0,
  OMNI_AUTONOMOUS_LAUNCH_USDT: 15.0,
  OMNI_AUTONOMOUS_LAUNCH_USD: 15.0,
  OUTREACH_ACTION_USDT: 0.05,
  ASSET_GENERATION_USDT: 5.0,
};

export const MAINSANE_OFFERINGS = [
  {
    id: "retainer" as const,
    name: "Strategic CMO Retainer",
    priceUsdt: 199.0,
    badge: "Most Popular / Enterprise",
    cadence: "monthly" as const,
    description: "24/7 dedicated AI CMO strategy agent, live competitor intelligence, and high-context document memory.",
    features: [
      "24/7 Access to Core AI CMO Strategy Copilot",
      "Real-Time Competitor Tracking & Market Intel Radar",
      "Document Ingestion & High-Context Memory Vault",
      "Unlimited Marketing Strategy & Autonomous Directive Execution",
      "Autonomous AI Self-Funding Reinvestment Backing"
    ],
  },
  {
    id: "omni_launch" as const,
    name: "Omni-Launchpad 360° Package",
    priceUsdt: 15.0,
    badge: "Instant Execution",
    cadence: "per_launch" as const,
    description: "Full end-to-end 360° product marketing rollout from a single prompt.",
    features: [
      "Detailed ICP Analysis & Value Proposition",
      "Competitor Vulnerability Teardown & Counter-Positioning",
      "3-Touch Multi-Channel Outbound Copy (Hook, Value Proof, Close)",
      "30-Second Launch Video Storyboard & Voiceover Script",
      "Financial ROI, CAC Targets & Payback Projections"
    ],
  },
];

// Autonomous AI Self-Funding & Reinvestment Configuration
export const AUTONOMOUS_TREASURY = {
  REINVESTMENT_PERCENTAGE: 35, // 35% of gross revenue routed to self-fund AI services
  SERVICE_UPGRADES: [
    {
      id: "srv_gemini_tier3",
      name: "Google Gemini 2.5 High-Throughput Tier",
      monthlyCostUsd: 149.0,
      status: "AUTO_FUNDED",
      provider: "Google Cloud AI",
      lastRenewed: "2026-09-28T00:00:00Z",
    },
    {
      id: "srv_strata_cluster",
      name: "Strata 125B MoE Distributed GPU Node",
      monthlyCostUsd: 210.0,
      status: "AUTO_FUNDED",
      provider: "Decentralized Edge Mesh",
      lastRenewed: "2026-09-25T00:00:00Z",
    },
    {
      id: "srv_polygon_rpc",
      name: "High-Availability Polygon Bor Dedicated RPC",
      monthlyCostUsd: 49.0,
      status: "AUTO_FUNDED",
      provider: "Alchemy / PublicNode",
      lastRenewed: "2026-09-29T00:00:00Z",
    },
  ],
};

export const ERC20_ABI = [
  "function transfer(address to, uint256 value) external returns (bool)",
  "function approve(address spender, uint256 value) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

export const CONTRACT_ABI = [
  "function payRetainerUSDT(uint256 months) external",
  "function buyOmniLaunchPackageUSDT(uint256 packageCount) external",
  "function buyOutreachCreditsUSDT(uint256 actionCount) external",
  "function buyAssetCreditsUSDT(uint256 assetCount) external",
  "function isRetainerActive(address subscriber) external view returns (bool, uint256)",
  "event RetainerSubscribedUSDT(address indexed subscriber, uint256 months, uint256 amountUSDT, uint256 validUntil)",
  "event OmniLaunchPackagePurchasedUSDT(address indexed subscriber, uint256 packageCount, uint256 amountUSDT, uint256 totalLaunchCredits)",
  "event OutreachCreditsPurchasedUSDT(address indexed subscriber, uint256 actionCount, uint256 amountUSDT, uint256 totalOutreachBalance)",
  "event AssetCreditsPurchasedUSDT(address indexed subscriber, uint256 assetCount, uint256 amountUSDT, uint256 totalAssetBalance)",
];
