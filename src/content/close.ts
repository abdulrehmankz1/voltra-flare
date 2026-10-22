import type { IconName } from "@/components/flare/brand/icon-artwork";
import { getVoltraFree, seeHow, site } from "./site";
import type { Link, SectionIntro } from "./types";

export type Platform = { icon: IconName; label: string };

export const closeIntro = {
  bearing: site.name,
  title: { lines: ["Catch the", "next signal."], br: "m" },
  lede: "Free to start, on mobile and web.",
} satisfies SectionIntro;

export const closeCopy = {
  primary: { label: getVoltraFree, href: "#pricing" } satisfies Link,
  secondary: seeHow,
  platformsLabel: "Available on",
  platforms: [
    { icon: "phone", label: "For iPhone" },
    { icon: "phone", label: "For Android" },
    { icon: "globe", label: "On the web" },
  ] satisfies readonly Platform[],
} as const;
