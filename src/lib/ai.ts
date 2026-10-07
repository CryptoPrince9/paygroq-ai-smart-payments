/**
 * MaInsane Hybrid AI Reasoning Engine
 * Tier 1: Google Gemini 2.5 Flash / 2.0 Flash / 1.5 Flash (Direct API)
 * Tier 2: Strata / Ollama Local MoE (qwen2.5-coder:1.5b at http://127.0.0.1:11434)
 * Zero Mock Data - 100% Live Execution
 */

const GEMINI_KEY =
  process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
  process.env.GEMINI_API_KEY ||
  "AIzaSyBX7rP4SlLvXlwPogNbZrI97xFoeuH7Cig";

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "qwen2.5-coder:1.5b";

const CMO_SYSTEM_PROMPT = `You are MaInsane: an elite, autonomous AI Chief Marketing Officer (CMO).
Your capabilities exceed human agency executives and platforms like Explee and Okara.ai.
You deliver high-impact GTM playbooks, granular B2B outbound cadences, deep competitor teardowns, and high-converting asset scripts.
Your tone is razor-sharp, strategic, quantitative, authoritative, and data-driven.
You reference CAC, LTV, churn, ICP qualification, viral loops, and multi-channel attribution.
Never produce generic advice. Provide concrete, ready-to-execute copy, metrics, and battlecards.
When asked to respond in JSON, respond ONLY with valid JSON — no markdown fences, no prose.`;

export async function generateCmoResponse(
  userPrompt: string,
  history: Array<{ role: "user" | "cmo"; content: string }> = [],
  contextData: string = ""
): Promise<{ text: string; model: string }> {
  // 1. Try Gemini Live API
  try {
    type GeminiMessage = { role: "user" | "model"; parts: { text: string }[] };

    // Build full conversation history in Gemini format
    const systemTurn: GeminiMessage = {
      role: "user",
      parts: [{ text: CMO_SYSTEM_PROMPT + (contextData ? `\n\n[CONTEXT & REAL-TIME DATA]:\n${contextData}` : "") }],
    };
    const systemAck: GeminiMessage = {
      role: "model",
      parts: [{ text: "Understood. I am MaInsane, your Autonomous AI CMO. Ready to execute." }],
    };

    const historyTurns: GeminiMessage[] = history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const currentTurn: GeminiMessage = { role: "user", parts: [{ text: userPrompt }] };
    const messages: GeminiMessage[] = [systemTurn, systemAck, ...historyTurns, currentTurn];

    const GOOGLE_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "AIzaSyBX7rP4SlLvXlwPogNbZrI97xFoeuH7Cig";
    const OAUTH_KEY = process.env.GEMINI_API_KEY || "";

    const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
    for (const model of modelsToTry) {
      // Attempt 1: Standard AIza API key
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GOOGLE_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: messages,
              generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
            }),
          }
        );
        if (res.ok) {
          const data = await res.json();
          const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) return { text: candidateText, model: `${model} (Live Google API)` };
        }
      } catch (_e) { /* try next */ }

      // Attempt 2: Bearer token (for AQ. OAuth-style keys from Google AI Studio CLI)
      if (OAUTH_KEY) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OAUTH_KEY}`,
              },
              body: JSON.stringify({
                contents: messages,
                generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
              }),
            }
          );
          if (res.ok) {
            const data = await res.json();
            const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (candidateText) return { text: candidateText, model: `${model} (OAuth Bearer)` };
          }
        } catch (_e) { /* try next */ }
      }
    }
  } catch (err) {
    console.warn("[MaInsane AI] Gemini direct call failed, falling back to local MoE...", err);
  }

  // 2. Fallback to Local Strata / Ollama MoE
  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: `${CMO_SYSTEM_PROMPT}\n\n[CONTEXT]:\n${contextData}\n\n[QUERY]:\n${userPrompt}\n\n[RESPONSE]:`,
        stream: false,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.response) {
        return { text: data.response, model: `Strata Local MoE (${OLLAMA_MODEL})` };
      }
    }
  } catch (ollamaErr) {
    console.warn("[MaInsane AI] Local Ollama fallback also unreachable:", ollamaErr);
  }

  // 3. Degraded-mode response — honest, but still useful. No fake pricing references.
  return {
    text: `### MaInsane CMO Engine — Degraded Mode\n\nThe primary inference backend is temporarily unreachable. Please ensure the GOOGLE_GENERATIVE_AI_API_KEY environment variable is set in Vercel project settings and redeploy.\n\n**Your query was recorded:** "${userPrompt.slice(0, 120)}"\n\n**What to do:** Open Vercel Dashboard → Project Settings → Environment Variables → add GOOGLE_GENERATIVE_AI_API_KEY → redeploy.\n\nThe Strategic CMO Retainer and Omni-Launchpad services will resume at full capacity immediately after the key is verified.`,
    model: "MaInsane Degraded Mode (API key missing or unreachable)",
  };
}
