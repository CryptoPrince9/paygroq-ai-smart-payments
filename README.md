# PayGroq: Autonomous AI Chief Marketing Officer (CMO)
*Production Enterprise System Architecture*

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![Web3](https://img.shields.io/badge/Settlement-Polygon%20EVM-8247e5.svg?style=flat&logo=polygon)](https://polygon.technology/)
[![Zero Mock Data](https://img.shields.io/badge/Data%20Policy-100%25%20Live-10B981.svg)](#zero-mock-data-policy)
[![Licence](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Executive Overview
**PayGroq** is an open-source, fully autonomous AI Chief Marketing Officer (CMO) engineered to replace bloated marketing agencies and exceed the capabilities of platforms like **Explee** (automated GTM B2B outreach) and **Okara.ai** (real-time CMO dashboard, agent feed, and competitor intelligence radar).

### Core Differentiators
- **Zero Mock Data Policy:** Every query connects to real live inference (Google Gemini 2.5 Flash API with Strata local MoE fallback).
- **Web3 Direct Cryptographic Settlement:** Fully decentralized micro-billing via Ethers.js v6 with mandatory routing to:
  `0x32C2c16b8821dE40F1d71FB67b050542F87f58F8`.
- **Live Datawrapper Visualization:** Interactive D3 / responsive chart embeddings tracking pipeline velocity, CAC vs. LTV curves, and market share.
- **Tree-Sitter & Graft Memory Graph:** Sub-millisecond context recall for ICP matrices, brand guidelines, and competitor battlecards.

---

## Pricing Model & Unit Economics
The smart contract (`PayGroqBilling.sol`) and backend verification gate enforce the following monetization logic:

| Service Tier / Action | Price (USD) | Crypto Equivalent (approx) | Description |
| :--- | :--- | :--- | :--- |
| **Strategic CMO Retainer** | **$199.00 / month** | ~398 MATIC | 24/7 access to core CMO strategy agent, continuous competitor tracking, document ingestion |
| **B2B Outreach Action (GTM)** | **$0.05 / action** | ~0.10 MATIC | 1 action = 1 verified email prospect + AI personalized pitch + sequence trigger |
| **Content & Asset Generation** | **$5.00 / asset** | ~10.0 MATIC | Full 30-45s product launch video storyboard (brag) + VoiceStudio neural audio + Photon WASM profile |

*All incoming payments on Polygon / EVM networks are hardcoded to route directly to:*
`0x32C2c16b8821dE40F1d71FB67b050542F87f58F8`

---

## Architectural & Open-Source Infrastructure

### 1. Agent & AI Infrastructure
- **`Anil-matcha/Open-Dots`**: Self-hosted agent workspace, interactive approval gateways, and action execution sandboxes.
- **`Niko1221/Strata`**: High-capacity local inference architecture (Qwen3.8-Flash-Next 125B MoE) offloading experts across system RAM and GPU VRAM with OpenAI-compatible endpoint compatibility.
- **`DeusData/codebase-memory-mcp`**: Tree-sitter & Hybrid LSP deterministic AST indexing for document and codebase memory with sub-millisecond graph queries.
- **`trailhq/Graft`**: Persistent markdown context caching and bi-directional inter-document node linking.
- **CopilotKit**: Contextual AI interaction embedded directly into Next.js dashboard components.

### 2. Media & Data Output Tools
- **`latent-spaces/brag`**: Automated product launch video pipeline generating kinetic scene directives, typography prompts, and audio cues.
- **`debpalash/VoiceStudio`**: Multi-speaker zero-cost neural TTS audio narration.
- **Photon Studio (`photon-rs`)**: Rust WebAssembly image filter engine with 90+ algorithmic presets.
- **Datawrapper**: Automated v3 programmatic chart publishing and interactive responsive embeds.

---

## Local Development & Production Run

```bash
# 1. Clone & Enter Project
cd C:\Users\aakwa\.gemini\antigravity\scratch\PayGroq

# 2. Install Dependencies
npm install

# 3. Run Development Server
npm run dev

# 4. Build Production Bundle
npm run build
```

The application will be live at `http://localhost:3000`.

---

## Vercel Deployment

Deploy directly to Vercel using the verified production token:

```bash
npx vercel deploy --prod --yes --token vcp_***
```
