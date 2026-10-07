# MaInsane System Design & Technical Specification
*Enterprise AI Chief Marketing Officer (CMO) Autonomous Platform*

---

## 1. Architectural Architecture Overview
MaInsane is designed for ultra-high reliability, autonomous task execution, and zero mock data. It combines a Next.js App Router frontend deployed on Vercel with a hybrid AI reasoning engine and on-chain EVM cryptographic settlement.

```
+---------------------------------------------------------------------------------------+
|                                    MaInsane UI / UX                                   |
|                     (Next.js 14+ App Router, Tailwind CSS, Dark Theme)               |
+---------------------------------------------------------------------------------------+
|  CMO Dashboard  |  Agent Feed  |  CMO Chat  |  Competitors  |  GTM Outreach  | Assets |
+---------------------------------------------------------------------------------------+
                                           |
                                [Next.js API Gateway]
                                           |
           +-------------------------------+-------------------------------+
           |                               |                               |
    [Web3 Gateway]                  [AI Reasoning Core]            [Outreach Engine]
  - Ethers.js v6                  - Gemini 2.5 Flash / Pro        - Lead Validator
  - Polygon / EVM RPC             - Strata / Ollama MoE           - LinkedIn API
  - Contract Verification         - Graft Context Engine          - SMTP / Resend
  - Address: 0x32C2c...8F8        - Codebase Memory Graph         - Open-Dots Gateway
           |                               |                               |
           +-------------------------------+-------------------------------+
                                           |
                          [Data & Visualization Engine]
                          - Datawrapper v3 API (Live Charts)
                          - Photon Studio (photon-rs WASM processing)
                          - Persistent Storage (SQLite / PostgreSQL)
```

---

## 2. Zero Mock Data Policy Enforcement
1. **Live Model Execution:** All agent reasoning calls Google Gemini API (`AIzaSyBX7rP4SlLvXlwPogNbZrI97xFoeuH7Cig`) or local Ollama Qwen MoE (`http://127.0.0.1:11434`). No dummy responses.
2. **Live On-Chain Cryptographic Verification:** Billing requires real blockchain transactions verified via Polygon / Ethereum JSON-RPC nodes against the hardcoded recipient wallet:
   `0x32C2c16b8821dE40F1d71FB67b050542F87f58F8`.
3. **Live Datawrapper Visualization:** Interactive charts are compiled and rendered using live datasets and embed endpoints.
4. **Live Database State:** Persistent account credits, campaign metrics, task logs, and competitor records are maintained in a structured database engine.

---

## 3. Web3 Payment & Settlement Specification

### 3.1 Hardcoded Destination Address
**`0x32C2c16b8821dE40F1d71FB67b050542F87f58F8`**
Every single on-chain deposit, retainer renewal, and credit top-up must transfer native tokens (MATIC / ETH) or approved stablecoins (USDC / USDT) directly to this address.

### 3.2 Focused Pricing Matrix & Product Packages in USDT
1. **Strategic CMO Retainer: 199 USDT / month**
   - 24/7 access to the core AI CMO Strategy Agent & Copilot
   - Real-time competitor tracking radar (Okara.ai / Explee parity & superior counter-positioning)
   - High-context document ingestion and Graft knowledge graph memory
   - Unlimited strategic directives, marketing audits, and campaign blueprints
   - Backed by the 35% autonomous AI treasury self-funding loop

2. **Omni-Launchpad 360° Package: 15 USDT / launch**
   - Single-prompt end-to-end autonomous go-to-market rollout
   - In-depth ICP analysis, target audience personas, and value proposition framing
   - Direct competitor vulnerability teardown & counter-positioning angles
   - 3-touch high-converting multi-channel outbound cadence copy (Hook, Value Proof, Low-friction Close)
   - 30-second viral product launch video storyboard, motion directives, and VoiceStudio narration script
   - Unit economics, CAC payback targets, and projected ARR models

### 3.3 On-Chain Verification Workflow
1. Client connects Web3 wallet (MetaMask, Coinbase Wallet, Rabby) via Ethers.js v6.
2. User selects between the two focused offerings:
   - **Strategic CMO Retainer (199 USDT / month)**
   - **Omni-Launchpad 360° Package (15 USDT / launch)**
3. Client signs ERC-20 transfer of USDT on Polygon PoS to the hardcoded treasury:
   `0x32C2c16b8821dE40F1d71FB67b050542F87f58F8` (or native fallback).
4. Client sends transaction hash (`txHash`) to `/api/billing/verify`.
5. Server queries Polygon Bor JSON-RPC node (`eth_getTransactionReceipt`):
   - Confirms block confirmations >= 1.
   - Verifies `status === 1` (success).
   - Verifies `Transfer` event to padded treasury wallet `0x32c2c16b8821de40f1d71fb67b050542f87f58f8`.
   - Verifies transferred USDT meets or exceeds required package cost (199 USDT or 15 USDT).
6. Server records transaction and unlocks user account / allocates credits in persistent state.
7. **Sovereign Admin Bypass:** Wallet `0x32C2c16b8821dE40F1d71FB67b050542F87f58F8` permanently bypasses all payment paywalls with infinite credits and permanent retainer.

---

## 4. Design System & UI/UX Standards
- **Theme:** Exclusively Obsidian Dark.
- **Color Palette:**
  - Background Base: `#09090b` (Zinc 950)
  - Surface Card: `#121217` (Deep Slate Glass)
  - Borders: `#27272a` (Zinc 800)
  - Brand Primary / Glow: `#10b981` (Emerald Accent) & `#6366f1` (Electric Indigo)
  - Warning / Alert: `#f59e0b` (Amber)
  - Negative: `#f43f5e` (Rose)
  - Text Primary: `#f8fafc` (Slate 50)
  - Text Muted: `#94a3b8` (Slate 400)
- **Typography:** Inter, JetBrains Mono for code / addresses / execution logs.
- **Branding:** "MaInsane" high-impact geometric logo with glowing neural core.

---

## 5. Modules & Functional Requirements

### 5.1 Analytics Dashboard (Okara.ai + Datawrapper)
- High-level KPIs: MRR, Active Pipeline Value, CAC, LTV:CAC Ratio, Outbound Open Rate, Conversion Rate.
- Live interactive charts powered by Datawrapper / SVG dynamic charts.
- Competitor benchmark overlay.

### 5.2 Agent Feed (Real-Time Autonomous Operation)
- Live scrolling feed of actions executed by the CMO agent.
- Status badges: `EXECUTED`, `IN_FLIGHT`, `APPROVED`, `VERIFIED_ON_CHAIN`.
- Token consumption metrics, latency, and model source tag (Gemini Flash / Strata MoE).

### 5.3 Interactive CMO Chat
- Direct conversation with MaInsane CMO.
- Copilot actions: generates GTM playbooks, email copy, PR releases, and campaign timelines directly into UI cards.
- Memory integration with uploaded brand assets.

### 5.4 Competitor Tracking Radar
- Monitors competitor URLs, feature announcements, pricing shifts, and marketing angles.
- Generates differentiation battlecards for sales and marketing outreach.

### 5.5 GTM B2B Outreach Engine (Explee Parity)
- Lead scraper and verification pipeline.
- Multi-step email and LinkedIn cadence generator.
- Action-by-action credit decrement ($0.05 / action).

### 5.6 Media & Launch Video Studio (brag & VoiceStudio)
- Generates 30s product launch scripts with scene-by-scene animation directives.
- Audio synthesis engine for brand voiceovers.
- Graphic design banner styling via Photon Studio WASM presets.
