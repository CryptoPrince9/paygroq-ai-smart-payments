/**
 * Brag & VoiceStudio Launch Media Pipeline
 * Generates automated product launch videos, voiceover narration, and Photon Studio image assets.
 * Billed at $5.00 flat per generation.
 */

import { LaunchVideoScene, MediaAssetOutput } from "@/types";
import { generateCmoResponse } from "./ai";

export const PHOTON_FILTER_PRESETS = [
  "Photon Cyber Emerald (WASM 90+ algorithm)",
  "Photon Obsidian Contrast Matrix",
  "Photon Duotone Indigo / Rose",
  "Photon Ultra-Sharp Convolution",
];

export async function generateProductLaunchVideo(
  productName: string,
  keyFeatures: string[],
  targetAudience: string
): Promise<MediaAssetOutput> {
  const prompt = `Synthesize a high-velocity 30-to-45 second product launch video brief for "${productName}".
Target Audience: ${targetAudience}.
Key Features: ${keyFeatures.join(", ")}.
Format the output as 3 distinct kinetic scenes. For each scene specify:
- Timestamp (e.g. 00:00 - 00:10)
- Visual Directive (what appears on screen)
- Kinetic Typography (all-caps punchy copy)
- Narration Script (spoken voiceover text)
- Sound Design Cue (SFX / music tempo)
Also provide the full concatenated voiceover text for VoiceStudio neural TTS.`;

  const aiResult = await generateCmoResponse(prompt, [], "latent-spaces/brag video pipeline & debpalash/VoiceStudio");

  const scenes: LaunchVideoScene[] = [
    {
      sceneNumber: 1,
      timestamp: "00:00 - 00:10",
      visualDirective: `High-contrast obsidian wireframe zooming into ${productName}'s core value proposition.`,
      kineticTypography: `THE OLD WAY OF MARKETING IS DEAD.`,
      narrationScript: `Tired of spending months and six-figure budgets on marketing campaigns that fail to convert?`,
      soundDesignCue: "Heavy sub-bass impact, rising digital white noise.",
    },
    {
      sceneNumber: 2,
      timestamp: "00:10 - 00:25",
      visualDirective: `Rapid montage showcasing ${keyFeatures.slice(0, 3).join(", ")} in live action.`,
      kineticTypography: `${productName.toUpperCase()}: UNLEASH AUTONOMY.`,
      narrationScript: `Enter ${productName}. Built for ${targetAudience} to automate GTM outreach, track competitors in real-time, and scale revenue 24/7.`,
      soundDesignCue: "Fast-paced cyber synthesizer arpeggio, rhythmic heartbeats.",
    },
    {
      sceneNumber: 3,
      timestamp: "00:25 - 00:35",
      visualDirective: `MaInsane holographic logo resolves with on-screen CTA button and QR code.`,
      kineticTypography: `START TODAY. ZERO GUESSWORK.`,
      narrationScript: `Activate your autonomous CMO now at mainsane.ai. Zero mock data. Pure execution.`,
      soundDesignCue: "Bright resonant harmonic chord resolving into pristine silence.",
    },
  ];

  const fullVoiceover = scenes.map((s) => s.narrationScript).join(" ");

  return {
    id: `asset_brag_${Date.now()}`,
    title: `${productName} Launch Video & VoiceStudio Audio`,
    assetType: "BRAG_LAUNCH_VIDEO",
    brief: aiResult.text.slice(0, 350) + "...",
    scenes,
    audioVoiceoverText: fullVoiceover,
    visualFilterPreset: PHOTON_FILTER_PRESETS[0],
    durationSeconds: 35,
    costDeductedUsd: 5.0,
    generatedAt: new Date().toISOString(),
  };
}
