import type { Link } from "./types";

// The chapters in page order (their section ids). Every chapter radiates from one origin and its bearing steps 12°
// from the one before: #top is 000°, #proof 012° … #get 096°. The motion layer reads it from data-deg.
export const CHAPTERS = ["top", "proof", "product", "app", "security", "how", "pricing", "faq", "get"] as const;

export type ChapterId = (typeof CHAPTERS)[number];

// A link to a chapter, by its id.
export type ChapterLink = { label: string; chapter: ChapterId };

export const chapterHref = (chapter: ChapterId) => `#${chapter}` as const;

export const bearingOf = (chapter: ChapterId) => CHAPTERS.indexOf(chapter) * 12;

export const site = {
  name: "Voltra",
  // The hero's title, and the line under the lockup in the footer.
  slogan: ["Move at", "the speed", "of signal."],
  // Accessible name of the lockup link in the nav.
  homeLabel: "Voltra, back to the top",
  homeHref: chapterHref("top"),
  skipLabel: "Skip to content",
} as const;

// The main call to action. In the nav it shortens to "Get Voltra" on mobile.
export const getVoltra = { label: "Get Voltra", free: " free", href: "#get" } as const;

export const getVoltraFree = `${getVoltra.label}${getVoltra.free}`;

export const signIn = { label: "Sign in", href: "#get" } as const satisfies Link;

export const seeHow = { label: "See how it works", href: "#how" } as const satisfies Link;

export const navCopy = { label: "Primary", openMenu: "Open menu", menuLabel: "Menu" } as const;

export const primaryNav: readonly ChapterLink[] = [
  { label: "Product", chapter: "product" },
  { label: "Security", chapter: "security" },
  { label: "Pricing", chapter: "pricing" },
  { label: "Learn", chapter: "how" },
];

// The menu lists each chapter under its bearing.
export const menuNav: readonly ChapterLink[] = [
  { label: "Product", chapter: "product" },
  { label: "Security", chapter: "security" },
  { label: "How it works", chapter: "how" },
  { label: "Pricing", chapter: "pricing" },
  { label: "Questions", chapter: "faq" },
];

export const footerCopy = {
  label: "Footer",
  links: [
    { label: "Product", href: "#product" },
    { label: "Security", href: "#security" },
    { label: "Pricing", href: "#pricing" },
    { label: "Help", href: "#faq" },
  ] satisfies readonly Link[],
  // On mobile they close the footer links; from desktop up they sit in their own nav beside the small print.
  legalLabel: "Legal",
  legal: [
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#pricing" },
  ] satisfies readonly Link[],
  smallPrint: "© 2026 Voltra Ltd. Crypto assets are volatile and their value can go down as well as up.",
} as const;
