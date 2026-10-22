import type { SectionIntro } from "./types";

export type FaqEntry = { question: string; answer: string };

export const faqIntro = {
  bearing: "Questions",
  title: { lines: ["Questions,", "answered."] },
} satisfies SectionIntro;

// The first answer ships open; the accordion in the motion layer hides the others and takes over from there.
export const faqs: readonly FaqEntry[] = [
  {
    question: "Is Voltra a custodial wallet?",
    answer:
      "No. You hold your keys. Voltra splits them into three shares so you can recover your wallet if you lose your phone, and it can never move funds on its own.",
  },
  {
    question: "Which networks does Voltra support?",
    answer: "43 networks today, including Bitcoin, Ethereum, Solana, Base and Arbitrum, with more every month.",
  },
  {
    question: "How does Voltra AI use my data?",
    answer:
      "Voltra AI reads public market data and your on-device portfolio. Your keys and personal data never train a model.",
  },
  {
    question: "What does Voltra cost?",
    answer: "Voltra is free to start. Plus is $6 a month and Pro is $18 a month.",
  },
];
