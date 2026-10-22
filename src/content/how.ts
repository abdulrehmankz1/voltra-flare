import type { SectionIntro, Triple } from "./types";

export type Step = { title: string; body: string };

export const howIntro = {
  bearing: "How it works",
  title: { lines: ["Live in", "three moves."], br: "d" },
} satisfies SectionIntro;

// The last step's number ships lit.
export const steps: Triple<Step> = [
  { title: "Create", body: "Your wallet in under two minutes." },
  { title: "Connect", body: "Bring the wallets you already use." },
  { title: "Act", body: "Set targets and alerts, then approve every move." },
];
