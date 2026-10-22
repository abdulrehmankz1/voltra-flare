import type { Quad, SectionIntro } from "./types";

// `body` breaks after its first line on the fan; the list on mobile runs it on.
export type Feature = { title: string; body: readonly [string, string] };

export const featuresIntro = {
  bearing: "Voltra AI",
  title: { lines: ["Every signal,", "one origin."] },
  lede: "Voltra AI scans prices, fees and on-chain activity around the clock and surfaces only what moves you.",
} satisfies SectionIntro;

export const features: Quad<Feature> = [
  { title: "Insight", body: ["Alerts that", "explain themselves."] },
  { title: "Security", body: ["Three key shares.", "Any two can sign."] },
  { title: "Every chain", body: ["43 networks,", "one balance."] },
  { title: "Fast swaps", body: ["The best route", "in a single tap."] },
];
