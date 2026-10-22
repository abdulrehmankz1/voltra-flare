import type { IconName } from "@/components/flare/brand/icon-artwork";
import type { Pair, Quad, SectionIntro, Triple } from "./types";

export const appIntro = {
  bearing: "The app",
  title: { lines: ["Your portfolio,", "at a glance."], br: "m" },
  lede: "Live balances, gauges and the next move, the moment you open the app.",
} satisfies SectionIntro;

// ---------- shared by the screens ----------

export const statusTime = "9:41";

export const assistantName = "Voltra AI";

// `count` is the figure the motion layer counts up to (data-money).
export const totalBalance = { label: "Total balance", value: "$24,860.42", count: "24860.42" } as const;

export type Trend = "up" | "down";

export type Holding = {
  name: string;
  ticker: string;
  amount: string;
  value: string;
  change: string;
  trend: Trend;
  // Share of the portfolio, in %.
  share: number;
  // Coins with sprite artwork show their icon; the rest show a letter.
  badge: { icon: IconName } | { letter: string };
};

export const holdings: Triple<Holding> = [
  {
    name: "Bitcoin",
    ticker: "BTC",
    amount: "0.2841",
    value: "$18,204.10",
    change: "+1.8%",
    trend: "up",
    share: 73.2,
    badge: { icon: "bitcoin" },
  },
  {
    name: "Ethereum",
    ticker: "ETH",
    amount: "1.62",
    value: "$5,120.66",
    change: "-0.6%",
    trend: "down",
    share: 20.6,
    badge: { icon: "ethereum" },
  },
  {
    name: "Solana",
    ticker: "SOL",
    amount: "12.4",
    value: "$1,535.66",
    change: "+3.1%",
    trend: "up",
    share: 6.2,
    badge: { letter: "S" },
  },
];

// Voltra AI's read of the market, on the home and analytics screens.
export const feesInsight = "ETH fees are 38% below average. A good window to rebalance.";

// The tab bar: two tabs either side of the centre mark; the screen's own tab is lit.
export type TabId = "home" | "trend" | "card" | "apps";

export const tabs: Pair<Pair<{ id: TabId; label: string }>> = [
  [
    { id: "home", label: "Home" },
    { id: "trend", label: "Trend" },
  ],
  [
    { id: "card", label: "Card" },
    { id: "apps", label: "Apps" },
  ],
];

// ---------- Home ----------

export type QuickAction = { icon: IconName; label: string };

export const homeScreen = {
  label:
    "Voltra home screen: total balance $24,860.42, up $582.10 today, health score 82, and holdings in Bitcoin, Ethereum and Solana.",
  greeting: { initials: "AM", text: "Good evening, Alex" },
  change: "+$582.10 (2.4%) today",
  actions: [
    { icon: "send", label: "Send" },
    { icon: "receive", label: "Receive" },
    { icon: "swap", label: "Swap" },
    { icon: "plus", label: "Buy" },
  ] satisfies Quad<QuickAction>,
  assets: { title: "Assets", more: "See all" },
  tab: "home" satisfies TabId,
} as const;

// ---------- Ask Voltra ----------

export const askScreen = {
  label:
    "Ask Voltra screen: the assistant suggests moving $1,480 from ETH to BTC to bring the portfolio back on plan.",
  title: "Ask Voltra",
  subtitle: "Your portfolio assistant",
  day: "Today",
  question: "Should I rebalance this week?",
  answer: "Your ETH share is 21%, above your 15% target. Moving $1,480 to BTC brings you back on plan.",
  allocation: {
    label: "Allocation",
    // The rebalance: the amount and the trade, then the shares it leaves (BTC · ETH · SOL, in %).
    move: { value: "$1,480", label: "ETH to BTC" },
    after: { value: "79 · 15 · 6", label: "After, %" },
  },
  // The first is the primary action.
  chips: ["Rebalance now", "Explain", "Remind me Friday"],
  composer: "Ask Voltra anything",
} as const;

// ---------- Analytics ----------

export const analyticsScreen = {
  label:
    "Analytics screen: total balance $24,860.42, up $1,906.21 or 8.3% over 30 days, health score 82 out of 100, allocation 73.2% Bitcoin, 20.6% Ethereum and 6.2% Solana.",
  title: "Analytics",
  live: "Live",
  change: { amount: "+$1,906.21 (+8.3%)", period: "30 days" },
  ranges: ["1D", "1W", "1M", "1Y", "All"],
  currentRange: "1M",
  health: { label: "Health", score: "82", outOf: "/ 100", verdict: "Strong" },
  allocationLabel: "Allocation",
  tab: "trend" satisfies TabId,
} as const;
