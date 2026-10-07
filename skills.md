# MaInsane Skills & Capability Registry
*Autonomous AI Chief Marketing Officer (CMO) System Architecture*

## 1. Overview & Capability Matrix
MaInsane integrates cutting-edge open-source agent infrastructure, high-throughput model inference, memory graphs, and media generation pipelines to deliver an enterprise-grade AI CMO.

---

## 2. Open-Source Agent & AI Infrastructure

### 2.1 Anil-matcha/Open-Dots
- **Core Role:** Self-hosted AI workspace, tool approvals, and action gateways.
- **Architecture:** Decouples agent decision-making from tool execution using an explicit Approval Gateway. Prevents unauthorized spend or uncontrolled external actions.
- **Key Modules:**
  - `ActionGateway`: Intercepts high-risk external API requests (e.g. sending bulk emails, publishing social posts, debiting on-chain escrow).
  - `WorkspaceSession`: Manages stateful agent threads, persistent run logs, and user approval callbacks.
  - `ToolExecutor`: Sandboxed execution environment for custom scripts, browser tasks, and API connectors.
- **Integration in MaInsane:**
  - Used in the **Outreach Engine** and **Content Publishing** modules. Any campaign action above a safety threshold requires interactive operator confirmation or pre-funded cryptographic allowance.

### 2.2 Niko1221/Strata
- **Core Role:** High-capacity local inference engine (Qwen3.8-Flash-Next 125B MoE) adapted for consumer hardware and hybrid cloud deployment.
- **Architecture:** 
  - Dynamic MoE Expert Offloading: Splits 125B MoE weights across system RAM and single NVIDIA GPU VRAM (>=8GB), executing only active experts per token.
  - Generation Throughput: Delivers 55–120 tokens/sec on consumer workstations.
  - Interface: Exposes standard OpenAI-compatible endpoints (`/v1/chat/completions`, `/v1/models`).
- **Hybrid Vercel Adaptation:**
  - When deployed on Vercel Serverless, MaInsane utilizes an adaptive tiered model router:
    1. **Primary Tier:** High-throughput Google Gemini 2.5 Flash / 1.5 Pro via direct API (`AIzaSyBX7rP4SlLvXlwPogNbZrI97xFoeuH7Cig`).
    2. **Local Workstation / Sovereign Node Tier:** Strata / Ollama local MoE endpoint (`http://127.0.0.1:11434` / `http://127.0.0.1:8000/v1`) for zero-cost offline execution.
    3. **Automated Fallback:** Seamless circuit-breaker failover if local inference is unreachable.

### 2.3 DeusData/codebase-memory-mcp
- **Core Role:** Persistent codebase and document memory protocol via Tree-sitter and Hybrid LSP.
- **Architecture:**
  - Eliminates repetitive token-heavy file reads by parsing marketing collateral, strategy docs, and brand repos into a deterministic AST Knowledge Graph.
  - Sub-millisecond (<1ms) graph queries for semantic symbols, campaign definitions, ICP guidelines, and brand voice tokens.
  - Model Context Protocol (MCP) Server: Exposes tools `search_graph`, `get_symbol_references`, `query_document_hierarchy`.
- **Integration in MaInsane:**
  - Powers the **Document Ingestion & Strategic Memory** module. Ingests pitch decks, whitepapers, brand guides, and competitor teardowns into memory graphs without burning context tokens on every prompt.

### 2.4 trailhq/Graft
- **Core Role:** Markdown knowledge-graph generator and agent context cache.
- **Architecture:**
  - Analyzes markdown documentation, customer interview notes, and campaign briefs to build bi-directional reference graphs (`[[WikiLink]]` network).
  - Generates unified indices (`INDEX.md`, `CLAUDE.md`, `KNOWLEDGE_GRAPH.json`) allowing agents to traverse relationships between marketing goals, target personas, and collateral.
- **Integration in MaInsane:**
  - Structures the persistent CMO brain inside `/knowledge/` and `/vault/`, providing instant context retrieval across multi-agent workflows.

### 2.5 CopilotKit
- **Core Role:** Embedded contextual AI interaction framework for Next.js.
- **Components:**
  - `<CopilotProvider>`: Wraps the application to synchronize frontend state with agent context.
  - `useCopilotChat`: Binds the AI CMO conversation directly to live UI widgets (charts, lead tables, campaign wizards).
  - `useCopilotAction`: Allows the CMO agent to trigger UI updates directly (e.g. "Generate Q4 GTM Funnel", "Filter High-Intent Leads", "Launch Outreach Blast").

---

## 3. Media & Data Output Tools

### 3.1 latent-spaces/brag
- **Core Role:** Automated product launch video generator.
- **Pipeline:**
  1. **Story Extraction:** Analyzes product commits, changelogs, feature specs, and GTM briefs to formulate a 30-to-60-second narrative arc.
  2. **Creative Brief Generation:** Synthesizes scenes, typography cues, layout transitions, and visual accents.
  3. **Hyperframes Video Rendering:** Emits declarative animation frames, synchronized background audio, kinetic text, and exportable MP4 clips.
- **MaInsane Pricing Execution:** Billed at $5.00 flat per generated video asset.

### 3.2 debpalash/VoiceStudio
- **Core Role:** Open-source, zero-cost AI voice synthesis and audio production suite.
- **Capabilities:**
  - Multi-speaker neural TTS across 600+ languages.
  - Voice cloning and timbre adaptation for executive brand voice matching.
  - High-fidelity voiceover synthesis for ad spots, podcast trailers, and product walkthroughs.
- **Integration:** Provides the audio pipeline for video campaigns and outbound voice memo sequences.

### 3.3 Photon Studio (photon-rs)
- **Core Role:** High-performance Rust WebAssembly image processing and graphic production engine.
- **Capabilities:**
  - Client-side and server-side WASM execution with near-native latency.
  - 90+ image transformation algorithms: dynamic color grading, duotone brand filters, convolution sharpening, dynamic watermarking, banner composition.
- **Integration:** Automated social card generation, ad creative variations, and campaign thumbnail processing.

### 3.4 Datawrapper
- **Core Role:** Automated live chart and visualization publishing.
- **API Specification (v3):**
  - `POST /v3/charts`: Creates charts (bar, line, scatter, locator map, table).
  - `PUT /v3/charts/{id}/data`: Injects raw CSV/JSON metric streams.
  - `POST /v3/charts/{id}/publish`: Compiles and publishes interactive responsive iframes.
  - `GET /v3/charts/{id}/embed-codes`: Retrieves responsive embed snippets.
- **Integration in MaInsane:** Dynamically generates live interactive visual charts for CMO CAC/LTV funnels, competitor market share, outreach conversion rates, and ROI analysis.

---

## 4. Reusable Agent Skills & Action Registry
The MaInsane CMO system exposes the following deterministic tool actions:
1. `cmo_strategy_plan`: Formulates full GTM launch playbooks, ICP definitions, and messaging matrices.
2. `competitor_audit_crawl`: Analyzes competitor pricing, landing pages, feature velocity, and traffic.
3. `b2b_outreach_sequence`: Verifies lead emails, formats personalized multi-touch cadence, and triggers dispatch.
4. `generate_media_asset`: Synthesizes launch video scripts, voiceovers, and graphic assets.
5. `datawrapper_render_metric`: Injects live metric datasets and returns interactive visual chart embeds.
6. `web3_verify_settlement`: Verifies on-chain payment transactions on Polygon/Ethereum to unlock credits.
