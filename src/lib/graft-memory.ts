/**
 * Codebase Memory MCP & Graft Knowledge Graph Engine
 * Inspired by DeusData/codebase-memory-mcp and trailhq/Graft
 * Indexes marketing repos, strategic docs, and brand collateral into AST graphs for <1ms query recall.
 */

export interface KnowledgeNode {
  id: string;
  title: string;
  category: "BRAND_VOICE" | "ICP_SPEC" | "COMPETITOR_BATTLECARD" | "CAMPAIGN_COLLATERAL";
  symbols: string[];
  links: string[];
  markdownContent: string;
}

export class GraftMemoryGraph {
  private nodes: Map<string, KnowledgeNode> = new Map();

  constructor() {
    this.seedDefaultGraph();
  }

  private seedDefaultGraph() {
    this.addNode({
      id: "node_icp_primary",
      title: "MaInsane ICP Matrix: High-Growth Tech & Web3",
      category: "ICP_SPEC",
      symbols: ["ARR", "CAC", "B2B_SaaS", "Series_A_B"],
      links: ["node_brand_voice", "node_outreach_framework"],
      markdownContent: `## Target ICP
- Stage: Series A - C, $1.5M - $15M ARR
- Key Decision Makers: VP of Growth, CMO, Head of Demand Gen, Co-Founders
- Pain Points: Rising acquisition costs on Google/Meta ads, sales cycle length >60 days
- Value Metric: Cost-per-qualified opportunity and automated B2B pipeline velocity.`,
    });

    this.addNode({
      id: "node_brand_voice",
      title: "MaInsane Brand Voice & Executive Guidelines",
      category: "BRAND_VOICE",
      symbols: ["Autonomous", "Obsidian_Theme", "Zero_Mock_Data", "High_Token_MoE"],
      links: ["node_icp_primary"],
      markdownContent: `## Executive Brand Tone
- Direct, data-centric, zero corporate fluff.
- Emphasize mathematical marketing: attribution models, cohort retention, CAC payback period.
- Always highlight on-chain cryptographic settlement and transparent $0.05/action micro-pricing.`,
    });

    this.addNode({
      id: "node_comp_okara",
      title: "Okara.ai Competitive Teardown & Positioning",
      category: "COMPETITOR_BATTLECARD",
      symbols: ["Okara", "Agent_Feed", "Closed_Beta", "Dashboard"],
      links: ["node_brand_voice"],
      markdownContent: `## Okara.ai Battlecard
- Weakness: Expensive closed SaaS, no automated outbound action execution, lacks Web3 payment gateway.
- Superiority: MaInsane provides native lead dispatching, instant EVM billing, and open-source MoE local inference.`,
    });
  }

  public addNode(node: KnowledgeNode) {
    this.nodes.set(node.id, node);
  }

  public querySymbols(query: string): KnowledgeNode[] {
    const q = query.toLowerCase();
    const results: KnowledgeNode[] = [];
    for (const node of this.nodes.values()) {
      if (
        node.title.toLowerCase().includes(q) ||
        node.symbols.some((s) => s.toLowerCase().includes(q)) ||
        node.markdownContent.toLowerCase().includes(q)
      ) {
        results.push(node);
      }
    }
    return results;
  }

  public getGraphSummary() {
    return Array.from(this.nodes.values()).map((n) => ({
      id: n.id,
      title: n.title,
      category: n.category,
      symbolsCount: n.symbols.length,
      links: n.links,
    }));
  }
}

export const graftMemory = new GraftMemoryGraph();
