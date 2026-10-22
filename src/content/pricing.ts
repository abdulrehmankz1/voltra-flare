import type { ButtonVariant } from "@/components/flare/primitives/button";
import { getVoltraFree } from "./site";
import type { Link, Pair, SectionIntro, Triple } from "./types";

export type PlanId = "free" | "plus" | "pro";

// Billing period ids are the toggle's data-bill values and the data-m / data-y hooks it swaps.
export type BillingPeriod = "m" | "y";

export type Plan = {
  id: PlanId;
  name: string;
  audience: string;
  // Monthly price in dollars when billed monthly / yearly.
  price: Record<BillingPeriod, number>;
  features: readonly string[];
  cta: Link;
  button: ButtonVariant;
  // The featured plan: the heat behind it and its badge.
  featured?: { badge: string };
};

// On mobile the lede sits under the heading; from desktop up it moves to the aside, over the billing toggle.
export const pricingIntro = {
  bearing: "Pricing",
  title: { lines: ["Pick your pace."] },
  lede: "Start free. Switch up a gear when you need to.",
} satisfies SectionIntro;

export const billing = {
  label: "Billing period",
  periods: [
    { id: "m", label: "Monthly" },
    { id: "y", label: "Yearly" },
  ] satisfies Pair<{ id: BillingPeriod; label: string }>,
  // Pressed on load; the toggle in the motion layer switches it.
  initial: "m" satisfies BillingPeriod,
  note: { m: "Pay yearly and get two months free.", y: "Two months free on Plus and Pro." } satisfies Record<BillingPeriod, string>,
} as const;

export const comparePlans = { label: "Compare plans", href: "#faq" } as const satisfies Link;

export const priceCopy = { currency: "$", per: "per month", billedYearly: ", billed yearly" } as const;

// In pace order: each plan's gauge reads one step further (data-pace).
export const plans: Triple<Plan> = [
  {
    id: "free",
    name: "Free",
    audience: "For getting started",
    price: { m: 0, y: 0 },
    features: ["Wallet for 43 networks", "Five price alerts", "Weekly AI summary"],
    cta: { label: getVoltraFree, href: "#get" },
    button: "line",
  },
  {
    id: "plus",
    name: "Plus",
    audience: "For active investors",
    price: { m: 6, y: 5 },
    features: ["Daily AI insights and nudges", "Unlimited alerts", "Swap fees from 0.25%"],
    cta: { label: "Try Plus free for 30 days", href: "#get" },
    button: "white",
    featured: { badge: "Most chosen" },
  },
  {
    id: "pro",
    name: "Pro",
    audience: "For serious portfolios",
    price: { m: 18, y: 15 },
    features: ["Tax reports in one click", "Risk score and stress tests", "Priority human support"],
    cta: { label: "Choose Pro", href: "#get" },
    button: "ink",
  },
];
