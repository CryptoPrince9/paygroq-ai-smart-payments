export interface BillingPlan {
  id: "retainer" | "omni_launch";
  name: string;
  priceUsdt: number;
  description: string;
  cadence: "monthly" | "per_launch";
  features: string[];
}

export interface UserCredits {
  walletAddress: string;
  hasActiveRetainer: boolean;
  retainerExpiry: number; // UNIX epoch ms
  omniLaunchCredits: number; // Omni-Launchpad 360° executions
  outreachCredits: number;
  assetCredits: number;
  totalSpentUsd: number;
  lastUpdated: string;
  isAdmin?: boolean;
  bypassLimits?: boolean;
}

export interface AutonomousTreasuryMetrics {
  totalRevenueGainedUsd: number;
  reinvestmentFundUsd: number;
  totalAiUpgradesPaidUsd: number;
  reinvestmentRatePercent: number;
  activeAiSubscriptions: Array<{
    id: string;
    name: string;
    monthlyCostUsd: number;
    status: string;
    provider: string;
    lastRenewed: string;
  }>;
}

export interface AutonomousLaunchResult {
  id: string;
  productUrl: string;
  productDescription: string;
  analyzedAt: string;
  valueProposition: string;
  targetIcp: string;
  competitorTeardown: {
    rivalName: string;
    vulnerability: string;
    counterAngle: string;
  };
  b2bOutreachSequence: {
    subject: string;
    step1Hook: string;
    step2Value: string;
    step3Close: string;
    prospectBatchCount: number;
  };
  launchVideo: {
    headline: string;
    scenes: Array<{
      sceneNumber: number;
      visual: string;
      narration: string;
    }>;
    voiceoverScript: string;
  };
  metricProjection: {
    cacTarget: string;
    projectedArr: string;
    roiPercentage: string;
  };
  treasuryContributionUsd: number;
  status: "COMPLETE" | "IN_PROGRESS" | "ERROR";
}

export interface OnChainTransaction {
  txHash: string;
  sender: string;
  recipient: string;
  network: "polygon" | "ethereum" | "amoy";
  amountWei: string;
  amountUsd: number;
  planId: string;
  blockNumber: number;
  verifiedAt: string;
  status: "CONFIRMED" | "REVERTED";
}

export interface AgentTaskLog {
  id: string;
  timestamp: string;
  category: "GTM_OUTREACH" | "STRATEGY" | "COMPETITOR_RADAR" | "MEDIA_ASSET" | "BILLING_WEB3" | "DATAWRAPPER_VIZ";
  headline: string;
  detail: string;
  status: "EXECUTED" | "IN_FLIGHT" | "VERIFIED_ON_CHAIN" | "APPROVAL_PENDING";
  costUsd: number;
  model: string;
  txHash?: string;
  metadata?: Record<string, any>;
}

export interface CompetitorProfile {
  id: string;
  name: string;
  domain: string;
  tier: "Primary" | "Secondary" | "Emerging";
  pricingSummary: string;
  featureMatrix: { feature: string; competitorHas: boolean; mainsaneSuperior: boolean }[];
  keyWeakness: string;
  cmoCounterStrategy: string;
  trafficRankEstimate: string;
  lastScraped: string;
}

export interface OutreachCampaign {
  id: string;
  title: string;
  targetIcp: string;
  status: "ACTIVE" | "PAUSED" | "COMPLETED";
  totalLeads: number;
  verifiedLeads: number;
  dispatchedActions: number;
  replyRatePercent: number;
  channel: "Email" | "LinkedIn" | "Omnichannel";
}

export interface OutreachLead {
  id: string;
  campaignId: string;
  fullName: string;
  jobTitle: string;
  companyName: string;
  email: string;
  linkedInUrl?: string;
  verificationStatus: "VALID" | "RISKY" | "INVALID";
  personalizedPitch: string;
  status: "READY" | "SENT" | "CONVERTED";
}

export interface LaunchVideoScene {
  sceneNumber: number;
  timestamp: string;
  visualDirective: string;
  kineticTypography: string;
  narrationScript: string;
  soundDesignCue: string;
}

export interface MediaAssetOutput {
  id: string;
  title: string;
  assetType: "BRAG_LAUNCH_VIDEO" | "VOICESTUDIO_AUDIO" | "PHOTON_IMAGE_BANNER";
  brief: string;
  scenes?: LaunchVideoScene[];
  audioVoiceoverText?: string;
  visualFilterPreset?: string;
  durationSeconds?: number;
  costDeductedUsd: number;
  generatedAt: string;
}

export interface CmoMessage {
  id: string;
  sender: "user" | "cmo" | "system";
  content: string;
  timestamp: string;
  modelProvider: "Gemini 2.5 Flash" | "Strata Qwen-MoE" | "Local Sovereign Node";
  actionPayload?: {
    type: "GTM_PLAN" | "COMPETITOR_CHART" | "OUTREACH_BATCH" | "ASSET_PREVIEW";
    data: any;
  };
}
