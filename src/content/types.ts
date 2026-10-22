export type Href = `#${string}`;

export type Link = { label: string; href: Href };

// Copy set on several lines: each line after the first follows a <br> and a space. `br` is the break's class, which
// decides where it applies (.m mobile only, .d desktop only, .w wide screens); without one it always breaks.
export type Broken = { lines: readonly string[]; br?: "m" | "d" | "w" };

// What opens a chapter: its bearing label, the heading and the optional lede under them.
export type SectionIntro = { bearing: string; title: Broken; lede?: string };

// Exactly three items: the phones, the key shares, the steps and the plans are each drawn for three, so a fourth or
// missing item would break the design rather than add a row.
export type Triple<T> = readonly [T, T, T];

// The four capabilities and the four stats: one per ray of the chapter's fan.
export type Quad<T> = readonly [T, T, T, T];

export type Pair<T> = readonly [T, T];
