import type { IconName } from "@/components/flare/brand/icon-artwork";
import type { SectionIntro, Triple } from "./types";

export const securityIntro = {
  bearing: "Security",
  title: { lines: ["Signed by two.", "Safe from one."] },
  lede: "Your phone, a recovery kit and the Voltra guardian each hold a share. Any two can sign; none can act alone.",
} satisfies SectionIntro;

// A key share. `signed` shares are lit and can fall back to standby (the motion layer swaps their state); the other
// waits on standby. Its chip shows an icon or the mark.
export type KeyShare = { title: string; body: string; glyph: IconName | "mark"; signed: boolean };

export const keyShares: Triple<KeyShare> = [
  { title: "Your phone", body: "Share one, in your pocket. Signs with a tap.", glyph: "phone", signed: true },
  { title: "Voltra guardian", body: "Share two. Checks each request, then co-signs.", glyph: "mark", signed: true },
  { title: "Recovery kit", body: "Share three, in your own cloud. On standby.", glyph: "lock", signed: false },
];

export const keysCopy = {
  header: ["Key shares", "Status"],
  signed: "Signed",
  standby: "Standby",
  // The readout beside the shares: "2 of 3".
  readout: "Shares signed",
  chip: "signed",
} as const;
