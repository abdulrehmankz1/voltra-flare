import type { Quad } from "./types";

// A counted figure: the motion layer counts up to `count` (with `decimals` places) between prefix and suffix. A
// `late` figure starts counting after the others.
export type Stat = { count: string; decimals: number; prefix?: string; suffix?: string; late?: true; label: string };

export const proofCopy = { title: "Voltra in numbers", bearing: "Live right now" } as const;

export const stats: Quad<Stat> = [
  { count: "1.8", decimals: 1, suffix: "M", label: "Wallets" },
  { count: "6.2", decimals: 1, prefix: "$", suffix: "B", label: "Secured" },
  { count: "43", decimals: 0, label: "Networks" },
  { count: "24", decimals: 0, suffix: "/7", late: true, label: "AI watch" },
];

// The figure as it reads once counted: "1.8M", "$6.2B", "43", "24/7".
export const statText = (stat: Stat) => `${stat.prefix ?? ""}${stat.count}${stat.suffix ?? ""}`;
