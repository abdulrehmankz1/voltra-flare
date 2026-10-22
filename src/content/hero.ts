import { getVoltraFree, seeHow, site } from "./site";
import type { Broken, Link } from "./types";

export const hero = {
  bearing: "Your AI-powered crypto wallet",
  // Each line rises in on its own.
  title: site.slogan,
  lede: {
    lines: ["Voltra reads the market in real time", "and tells you the moment it matters,", "so you act on signal, not noise."],
    br: "w",
  } satisfies Broken,
  primary: { label: getVoltraFree, href: "#get" } satisfies Link,
  secondary: seeHow,
} as const;
