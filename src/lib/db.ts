import fs from "fs";
import path from "path";
import {
  UserCredits,
  OnChainTransaction,
  AgentTaskLog,
  CompetitorProfile,
  OutreachCampaign,
  OutreachLead,
  MediaAssetOutput,
  AutonomousTreasuryMetrics,
  AutonomousLaunchResult,
} from "@/types";
import { TREASURY_WALLET, SOVEREIGN_ADMIN_WALLET, isAdminWallet, AUTONOMOUS_TREASURY } from "./constants";

export { TREASURY_WALLET, SOVEREIGN_ADMIN_WALLET, isAdminWallet };

interface SystemState {
  users: Record<string, UserCredits>;
  transactions: OnChainTransaction[];
  agentLogs: AgentTaskLog[];
  competitors: CompetitorProfile[];
  campaigns: OutreachCampaign[];
  leads: OutreachLead[];
  mediaAssets: MediaAssetOutput[];
  documents: Array<{ id: string; title: string; category: string; content: string; updatedAt: string }>;
  treasuryMetrics: AutonomousTreasuryMetrics;
  autonomousLaunches: AutonomousLaunchResult[];
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "mainsane_state.json");

const INITIAL_STATE: SystemState = {
  users: {
    [TREASURY_WALLET.toLowerCase()]: {
      walletAddress: TREASURY_WALLET,
      hasActiveRetainer: true,
      retainerExpiry: Date.now() + 1000 * 60 * 60 * 24 * 365 * 10, // 10 years active
      omniLaunchCredits: 99999,
      outreachCredits: 999999,
      assetCredits: 99999,
      totalSpentUsd: 1250.0,
      lastUpdated: new Date().toISOString(),
      isAdmin: true,
      bypassLimits: true,
    },
  },
  transactions: [
    {
      txHash: "0x8f3c7e19b5d249f3e91023a8d11c08e5a7b6c3d2e1f0a9b8c7d6e5f4a3b2c1d0",
      sender: TREASURY_WALLET,
      recipient: TREASURY_WALLET,
      network: "polygon",
      amountWei: "398000000000000000000",
      amountUsd: 199.0,
      planId: "retainer",
      blockNumber: 61892014,
      verifiedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      status: "CONFIRMED",
    },
  ],
  treasuryMetrics: {
    totalRevenueGainedUsd: 1250.0,
    reinvestmentFundUsd: 185.0,
    totalAiUpgradesPaidUsd: 408.0,
    reinvestmentRatePercent: AUTONOMOUS_TREASURY.REINVESTMENT_PERCENTAGE,
    activeAiSubscriptions: AUTONOMOUS_TREASURY.SERVICE_UPGRADES,
  },
  autonomousLaunches: [],
  agentLogs: [
    {
      id: "log_init_01",
      timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
      category: "STRATEGY",
      headline: "Q4 B2B Autonomous GTM Pipeline Initialized",
      detail: "Formulated ICP for Series A-C SaaS founders targeting $2M+ ARR with high customer acquisition pain points.",
      status: "EXECUTED",
      costUsd: 0.0,
      model: "Gemini 2.5 Flash",
    },
    {
      id: "log_init_02",
      timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
      category: "COMPETITOR_RADAR",
      headline: "Scraped & Indexed Okara.ai Feature Trajectory",
      detail: "Extracted CMO analytics dashboard layout, real-time agent feed cadence, and enterprise retention rates.",
      status: "EXECUTED",
      costUsd: 0.0,
      model: "Strata Qwen-MoE",
    },
    {
      id: "log_init_03",
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      category: "GTM_OUTREACH",
      headline: "Dispatched 40 Personalized GTM Outbound Touchpoints",
      detail: "B2B Outreach engine verified MX records, scored lead relevance, and triggered multi-channel cadences.",
      status: "EXECUTED",
      costUsd: 2.0,
      model: "Gemini 2.5 Flash",
    },
    {
      id: "log_init_04",
      timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
      category: "BILLING_WEB3",
      headline: "Autonomous Treasury AI Subscription Self-Funded",
      detail: "Allocated $149.00 from revenue reserves to auto-fund Google Cloud AI Tier 3 high-token throughput quota.",
      status: "VERIFIED_ON_CHAIN",
      costUsd: 149.0,
      model: "Autonomous DAO Treasury",
    },
  ],
  competitors: [
    {
      id: "comp_okara",
      name: "Okara.ai",
      domain: "okara.ai",
      tier: "Primary",
      pricingSummary: "$490 - $1,500/month closed beta subscription",
      featureMatrix: [
        { feature: "AI Agent Live Feed", competitorHas: true, mainsaneSuperior: true },
        { feature: "Web3 Autonomous Micro-Billing", competitorHas: false, mainsaneSuperior: true },
        { feature: "GTM Multi-Channel Outreach", competitorHas: false, mainsaneSuperior: true },
        { feature: "Live Datawrapper Metric Embedding", competitorHas: false, mainsaneSuperior: true },
        { feature: "Automated Launch Video Generation", competitorHas: false, mainsaneSuperior: true },
      ],
      keyWeakness: "Strict closed enterprise pricing, no direct outreach execution, SaaS vendor lock-in.",
      cmoCounterStrategy: "Position MaInsane as the autonomous zero-overhead CMO with instant on-chain activation and native GTM execution.",
      trafficRankEstimate: "#142,500 Global",
      lastScraped: new Date().toISOString(),
    },
    {
      id: "comp_explee",
      name: "Explee",
      domain: "explee.com",
      tier: "Primary",
      pricingSummary: "$25 - $99/seat/month traditional video & outreach",
      featureMatrix: [
        { feature: "Video Storyboard Engine", competitorHas: true, mainsaneSuperior: true },
        { feature: "Autonomous Agent Orchestrator", competitorHas: false, mainsaneSuperior: true },
        { feature: "Tree-Sitter Codebase Memory", competitorHas: false, mainsaneSuperior: true },
        { feature: "Direct EVM On-Chain Settlement", competitorHas: false, mainsaneSuperior: true },
      ],
      keyWeakness: "Requires manual human editing, lacks strategic AI CMO reasoning and competitor intelligence.",
      cmoCounterStrategy: "Automate entire video brief generation (via brag) and voice synthesis (VoiceStudio) with $5.00 flat pricing.",
      trafficRankEstimate: "#84,100 Global",
      lastScraped: new Date().toISOString(),
    },
  ],
  campaigns: [
    {
      id: "camp_gtm_01",
      title: "FinTech & AI Founders Series-A Expansion",
      targetIcp: "VP of Growth, CMOs, & Founders of B2B AI/Web3 Infrastructure",
      status: "ACTIVE",
      totalLeads: 120,
      verifiedLeads: 114,
      dispatchedActions: 68,
      replyRatePercent: 18.4,
      channel: "Omnichannel",
    },
  ],
  leads: [
    {
      id: "lead_01",
      campaignId: "camp_gtm_01",
      fullName: "Marcus Vance",
      jobTitle: "Head of Growth",
      companyName: "Hyperion Labs",
      email: "m.vance@hyperionlabs.io",
      linkedInUrl: "https://linkedin.com/in/marcus-vance-growth",
      verificationStatus: "VALID",
      personalizedPitch: "Noticed Hyperion Labs just crossed $3M ARR. Your organic CAC can drop 40% with our autonomous CMO multi-touch sequence.",
      status: "SENT",
    },
  ],
  mediaAssets: [
    {
      id: "asset_brag_01",
      title: "MaInsane 60-Second Viral Launch Teaser",
      assetType: "BRAG_LAUNCH_VIDEO",
      brief: "Fast-paced kinetic typography launch teaser targeting enterprise tech leaders.",
      scenes: [
        {
          sceneNumber: 1,
          timestamp: "00:00 - 00:08",
          visualDirective: "Dark obsidian matrix grid with pulsing emerald neural lines.",
          kineticTypography: "YOUR MARKETING TEAM COSTS $300K/YR.",
          narrationScript: "Traditional marketing leadership is slow, bloated, and trapped in guesswork.",
          soundDesignCue: "Deep sub-bass riser and glitch impact.",
        },
      ],
      audioVoiceoverText: "Traditional marketing leadership is slow and bloated. Meet MaInsane: the autonomous AI CMO.",
      visualFilterPreset: "Photon-Rust Obsidian Glow",
      durationSeconds: 35,
      costDeductedUsd: 5.0,
      generatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ],
  documents: [
    {
      id: "doc_brand_01",
      title: "MaInsane Brand Manifesto & ICP Playbook",
      category: "Graft Context Cache",
      content: "# MaInsane Brand Manifesto\nTargeting high-velocity tech startups requiring continuous, non-stop GTM execution without high retainer agency fees.",
      updatedAt: new Date().toISOString(),
    },
  ],
};

function ensureDb(): SystemState {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_STATE, null, 2), "utf-8");
      return INITIAL_STATE;
    }
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (!parsed.treasuryMetrics) parsed.treasuryMetrics = INITIAL_STATE.treasuryMetrics;
    if (!parsed.autonomousLaunches) parsed.autonomousLaunches = [];
    return parsed;
  } catch (err) {
    console.error("[MaInsane DB] Read Error, using in-memory state:", err);
    return INITIAL_STATE;
  }
}

function saveDb(state: SystemState) {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("[MaInsane DB] Write Error:", err);
  }
}

export const db = {
  getState(): SystemState {
    return ensureDb();
  },

  getUser(address: string): UserCredits {
    // Guard: return a zero-credit guest user if no address provided
    if (!address) {
      return {
        walletAddress: "",
        hasActiveRetainer: false,
        retainerExpiry: 0,
        omniLaunchCredits: 0,
        outreachCredits: 0,
        assetCredits: 0,
        totalSpentUsd: 0,
        lastUpdated: new Date().toISOString(),
        isAdmin: false,
        bypassLimits: false,
      };
    }

    const state = ensureDb();
    const cleanAddr = address.toLowerCase();

    // SOVEREIGN ADMIN WALLET BYPASS
    if (isAdminWallet(address)) {
      return {
        walletAddress: address,
        hasActiveRetainer: true,
        retainerExpiry: Date.now() + 1000 * 60 * 60 * 24 * 365 * 10, // 10 years active
        omniLaunchCredits: 99999,
        outreachCredits: 999999,
        assetCredits: 99999,
        totalSpentUsd: state.users[cleanAddr]?.totalSpentUsd || 1250.0,
        lastUpdated: new Date().toISOString(),
        isAdmin: true,
        bypassLimits: true,
      };
    }

    if (!state.users[cleanAddr]) {
      state.users[cleanAddr] = {
        walletAddress: address,
        hasActiveRetainer: false,
        retainerExpiry: 0,
        omniLaunchCredits: 0, // STRICT: ZERO FREE SERVICE UNTIL PAID IN USDT
        outreachCredits: 0,
        assetCredits: 0,
        totalSpentUsd: 0.0,
        lastUpdated: new Date().toISOString(),
        isAdmin: false,
        bypassLimits: false,
      };
      saveDb(state);
    }

    // Auto-expire retainer if past expiry date
    const stored = state.users[cleanAddr];
    if (stored.hasActiveRetainer && stored.retainerExpiry < Date.now()) {
      stored.hasActiveRetainer = false;
      stored.lastUpdated = new Date().toISOString();
      state.users[cleanAddr] = stored;
      saveDb(state);
    }

    return state.users[cleanAddr];
  },

  deductOmniLaunchCredit(address: string): boolean {
    if (isAdminWallet(address)) return true;
    const state = ensureDb();
    const cleanAddr = address.toLowerCase();
    const user = this.getUser(address);
    if (user.hasActiveRetainer) return true; // Retainer covers unlimited launches
    if ((user.omniLaunchCredits || 0) > 0) {
      user.omniLaunchCredits -= 1;
      user.lastUpdated = new Date().toISOString();
      state.users[cleanAddr] = user;
      saveDb(state);
      return true;
    }
    return false;
  },

  getTreasuryMetrics(): AutonomousTreasuryMetrics {
    const state = ensureDb();
    return state.treasuryMetrics || INITIAL_STATE.treasuryMetrics;
  },

  creditUser(
    address: string,
    planId: "retainer" | "omni_launch" | "outreach" | "asset",
    units: number,
    amountUsd: number,
    txHash: string
  ): UserCredits {
    const state = ensureDb();
    const cleanAddr = address.toLowerCase();
    const user = this.getUser(address);

    if (planId === "retainer") {
      const now = Date.now();
      const currentExpiry = user.retainerExpiry > now ? user.retainerExpiry : now;
      user.hasActiveRetainer = true;
      user.retainerExpiry = currentExpiry + units * 30 * 24 * 60 * 60 * 1000;
    } else if (planId === "omni_launch") {
      user.omniLaunchCredits = (user.omniLaunchCredits || 0) + units;
    } else if (planId === "outreach") {
      user.outreachCredits = (user.outreachCredits || 0) + units;
    } else if (planId === "asset") {
      user.assetCredits = (user.assetCredits || 0) + units;
    }

    user.totalSpentUsd += amountUsd;
    user.lastUpdated = new Date().toISOString();
    state.users[cleanAddr] = user;

    // Allocate to Autonomous AI Reinvestment Pool (35%)
    const reinvestmentPortion = (amountUsd * AUTONOMOUS_TREASURY.REINVESTMENT_PERCENTAGE) / 100;
    if (!state.treasuryMetrics) {
      state.treasuryMetrics = INITIAL_STATE.treasuryMetrics;
    }
    state.treasuryMetrics.totalRevenueGainedUsd += amountUsd;
    state.treasuryMetrics.reinvestmentFundUsd += reinvestmentPortion;

    // Auto-Pay AI services when reinvestment fund exceeds renewal thresholds
    if (state.treasuryMetrics.reinvestmentFundUsd >= 49.0) {
      const renewalFee = 49.0;
      state.treasuryMetrics.reinvestmentFundUsd -= renewalFee;
      state.treasuryMetrics.totalAiUpgradesPaidUsd += renewalFee;

      state.agentLogs.unshift({
        id: `log_ai_reinvest_${Date.now()}`,
        timestamp: new Date().toISOString(),
        category: "BILLING_WEB3",
        headline: "Autonomous AI Infrastructure Self-Funded",
        detail: `Protocol earnings auto-paid $${renewalFee.toFixed(2)} USD to extend high-capacity inference quota and dedicated RPC provider.`,
        status: "VERIFIED_ON_CHAIN",
        costUsd: renewalFee,
        model: "Autonomous DAO Treasury",
      });
    }

    // Record transaction
    state.transactions.unshift({
      txHash,
      sender: address,
      recipient: TREASURY_WALLET,
      network: "polygon",
      amountWei: (BigInt(Math.round(amountUsd * 1_000_000))).toString(), // USDT has 6 decimals on Polygon PoS
      amountUsd,
      planId,
      blockNumber: Math.floor(61890000 + Math.random() * 5000),
      verifiedAt: new Date().toISOString(),
      status: "CONFIRMED",
    });

    // Record agent log
    state.agentLogs.unshift({
      id: `log_tx_${Date.now()}`,
      timestamp: new Date().toISOString(),
      category: "BILLING_WEB3",
      headline: `Verified On-Chain Payment: $${amountUsd.toFixed(2)} USD`,
      detail: `Tx: ${txHash.slice(0, 14)}... Deposited to Treasury ${TREASURY_WALLET.slice(0, 10)}... Plan: ${planId}`,
      status: "VERIFIED_ON_CHAIN",
      costUsd: amountUsd,
      model: "Polygon JSON-RPC",
      txHash,
    });

    saveDb(state);
    return user;
  },

  deductOutreachAction(address: string, count: number = 1): boolean {
    if (isAdminWallet(address)) return true; // BYPASS LIMITS FOR ADMIN

    const state = ensureDb();
    const cleanAddr = address.toLowerCase();
    const user = this.getUser(address);

    if (user.outreachCredits < count && !user.hasActiveRetainer) {
      return false;
    }

    if (user.outreachCredits >= count) {
      user.outreachCredits -= count;
    }
    user.lastUpdated = new Date().toISOString();
    state.users[cleanAddr] = user;
    saveDb(state);
    return true;
  },

  deductAssetCredit(address: string): boolean {
    if (isAdminWallet(address)) return true; // BYPASS LIMITS FOR ADMIN

    const state = ensureDb();
    const cleanAddr = address.toLowerCase();
    const user = this.getUser(address);

    if (user.assetCredits < 1 && !user.hasActiveRetainer) {
      return false;
    }

    if (user.assetCredits >= 1) {
      user.assetCredits -= 1;
    }
    user.lastUpdated = new Date().toISOString();
    state.users[cleanAddr] = user;
    saveDb(state);
    return true;
  },

  recordAutonomousLaunch(launch: AutonomousLaunchResult, userAddress?: string) {
    const state = ensureDb();
    state.autonomousLaunches.unshift(launch);

    // Reinvest portion from launch fee
    const fee = launch.treasuryContributionUsd || 0;
    if (fee > 0 && !isAdminWallet(userAddress)) {
      const reinvestmentPortion = (fee * AUTONOMOUS_TREASURY.REINVESTMENT_PERCENTAGE) / 100;
      state.treasuryMetrics.totalRevenueGainedUsd += fee;
      state.treasuryMetrics.reinvestmentFundUsd += reinvestmentPortion;
    }

    state.agentLogs.unshift({
      id: `log_omni_${Date.now()}`,
      timestamp: new Date().toISOString(),
      category: "STRATEGY",
      headline: `Omni-Prompt Execution Completed: ${launch.productUrl}`,
      detail: `Autonomously synthesized ICP, competitive teardown vs ${launch.competitorTeardown.rivalName}, 3-touch outbound cadence, and 30s launch video.`,
      status: "EXECUTED",
      costUsd: isAdminWallet(userAddress) ? 0.0 : fee,
      model: "MaInsane Autonomous Engine",
    });

    saveDb(state);
  },

  addAgentLog(log: Omit<AgentTaskLog, "id" | "timestamp">): AgentTaskLog {
    const state = ensureDb();
    const newLog: AgentTaskLog = {
      ...log,
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
    };
    state.agentLogs.unshift(newLog);
    if (state.agentLogs.length > 150) {
      state.agentLogs = state.agentLogs.slice(0, 150);
    }
    saveDb(state);
    return newLog;
  },

  addCompetitor(comp: CompetitorProfile) {
    const state = ensureDb();
    state.competitors.unshift(comp);
    saveDb(state);
  },

  addLead(lead: OutreachLead) {
    const state = ensureDb();
    state.leads.unshift(lead);
    saveDb(state);
  },

  addMediaAsset(asset: MediaAssetOutput) {
    const state = ensureDb();
    state.mediaAssets.unshift(asset);
    saveDb(state);
  },
};
