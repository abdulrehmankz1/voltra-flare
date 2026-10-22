// Artwork of the interface icons, verbatim from the original sprite, in sprite order. Each becomes symbol
// `#i-<name>`. Almost every icon is a 24px glyph drawn with one round pen on the symbol (no fill, currentColor
// stroke); the minus leaves its joins at the default, the check is a finer 20px glyph, and the status bar glyph (sys) is
// filled. Attribute values stay strings so they render exactly as the original wrote them (".5", not "0.5").

import type { Box } from "./mark-geometry";

export type Pen = "round" | "capped" | "fine" | "solid";

export type IconShape =
  // `opacity`: the battery's dimmed cap.
  | { d: string; opacity?: string }
  // `outline`: drawn as a stroke at that opacity instead of filled (the battery's body).
  | { rect: { x: string; y: string; width: string; height: string; rx: string }; outline?: string }
  | { circle: { cx: string; cy: string; r: string } }
  | { ellipse: { cx: string; cy: string; rx: string; ry: string } };

// `box` defaults to the 24px grid.
export type IconArtwork = { pen: Pen; box?: Box; shapes: readonly IconShape[] };

export const ICON_ARTWORK = {
  search: {
    pen: "round",
    shapes: [
      { d: "M11 18C14.87 18 18 14.87 18 11C18 7.13 14.87 4 11 4C7.13 4 4 7.13 4 11C4 14.87 7.13 18 11 18Z" },
      { d: "M20 20L15.8 15.8" },
    ],
  },
  bell: {
    pen: "round",
    shapes: [
      { d: "M6 9C6 7.41 6.63 5.88 7.76 4.76C8.88 3.63 10.41 3 12 3C13.59 3 15.12 3.63 16.24 4.76C17.37 5.88 18 7.41 18 9C18 15 20.5 17 20.5 17H3.5C3.5 17 6 15 6 9Z" },
      { d: "M10.2 20.5C10.36 20.84 10.62 21.12 10.94 21.32C11.26 21.52 11.62 21.63 12 21.63C12.38 21.63 12.74 21.52 13.06 21.32C13.38 21.12 13.64 20.84 13.8 20.5" },
    ],
  },
  home: {
    pen: "round",
    shapes: [
      { d: "M3.5 10.2L12 3.5L20.5 10.2V19C20.5 19.4 20.34 19.78 20.06 20.06C19.78 20.34 19.4 20.5 19 20.5H15V14.5H9V20.5H5C4.6 20.5 4.22 20.34 3.94 20.06C3.66 19.78 3.5 19.4 3.5 19V10.2Z" },
    ],
  },
  trend: { pen: "round", shapes: [{ d: "M3.5 16.5L9 11L13 15L20.5 7.5" }, { d: "M15 7.5H20.5V13" }] },
  scan: {
    pen: "round",
    shapes: [
      { d: "M3.5 8V6C3.5 5.34 3.76 4.7 4.23 4.23C4.7 3.76 5.34 3.5 6 3.5H8M16 3.5H18C18.33 3.5 18.65 3.56 18.96 3.69C19.26 3.82 19.54 4 19.77 4.23C20 4.46 20.18 4.74 20.31 5.04C20.44 5.35 20.5 5.67 20.5 6V8M20.5 16V18C20.5 18.33 20.44 18.65 20.31 18.96C20.18 19.26 20 19.54 19.77 19.77C19.54 20 19.26 20.18 18.96 20.31C18.65 20.44 18.33 20.5 18 20.5H16M8 20.5H6C5.67 20.5 5.35 20.44 5.04 20.31C4.74 20.18 4.46 20 4.23 19.77C4 19.54 3.82 19.26 3.69 18.96C3.56 18.65 3.5 18.33 3.5 18V16" },
      { d: "M7.5 12H16.5" },
    ],
  },
  card: {
    pen: "round",
    shapes: [
      { d: "M18.5 5.5H5.5C4.12 5.5 3 6.62 3 8V16C3 17.38 4.12 18.5 5.5 18.5H18.5C19.88 18.5 21 17.38 21 16V8C21 6.62 19.88 5.5 18.5 5.5Z" },
      { d: "M3 10H21M7 15H10" },
    ],
  },
  apps: {
    pen: "round",
    shapes: [
      { d: "M7.5 10.8C9.32 10.8 10.8 9.32 10.8 7.5C10.8 5.68 9.32 4.2 7.5 4.2C5.68 4.2 4.2 5.68 4.2 7.5C4.2 9.32 5.68 10.8 7.5 10.8Z" },
      { d: "M16.5 10.8C18.32 10.8 19.8 9.32 19.8 7.5C19.8 5.68 18.32 4.2 16.5 4.2C14.68 4.2 13.2 5.68 13.2 7.5C13.2 9.32 14.68 10.8 16.5 10.8Z" },
      { d: "M7.5 19.8C9.32 19.8 10.8 18.32 10.8 16.5C10.8 14.68 9.32 13.2 7.5 13.2C5.68 13.2 4.2 14.68 4.2 16.5C4.2 18.32 5.68 19.8 7.5 19.8Z" },
      { d: "M16.5 19.8C18.32 19.8 19.8 18.32 19.8 16.5C19.8 14.68 18.32 13.2 16.5 13.2C14.68 13.2 13.2 14.68 13.2 16.5C13.2 18.32 14.68 19.8 16.5 19.8Z" },
    ],
  },
  swap: { pen: "round", shapes: [{ d: "M7 4V18M10.5 7.5L7 4L3.5 7.5M17 20V6M13.5 16.5L17 20L20.5 16.5" }] },
  back: { pen: "round", shapes: [{ d: "M15 5.5L8.5 12L15 18.5" }] },
  arrow: { pen: "round", shapes: [{ d: "M4 12H20M14 18L20 12L14 6" }] },
  send: { pen: "round", shapes: [{ d: "M7 17L17 7M17 15.5V7H8.5" }] },
  receive: { pen: "round", shapes: [{ d: "M17 7L7 17M7 8.5V17H15.5" }] },
  plus: { pen: "round", shapes: [{ d: "M12 5V19M5 12H19" }] },
  spark: {
    pen: "round",
    shapes: [
      { d: "M12 3.5C12.6 7.7 14.4 9.5 18.5 10C14.4 10.5 12.6 12.3 12 16.5C11.4 12.3 9.6 10.5 5.5 10C9.6 9.5 11.4 7.7 12 3.5Z" },
    ],
  },
  lock: {
    pen: "round",
    shapes: [
      { d: "M16.5 10.5H7.5C6.12 10.5 5 11.62 5 13V18C5 19.38 6.12 20.5 7.5 20.5H16.5C17.88 20.5 19 19.38 19 18V13C19 11.62 17.88 10.5 16.5 10.5Z" },
      { d: "M8 10.5V8C8 6.94 8.42 5.92 9.17 5.17C9.92 4.42 10.94 4 12 4C13.06 4 14.08 4.42 14.83 5.17C15.58 5.92 16 6.94 16 8V10.5" },
    ],
  },
  bitcoin: {
    pen: "round",
    shapes: [
      { d: "M9 11.7H14C14.69 11.7 15.35 11.43 15.84 10.94C16.33 10.45 16.6 9.79 16.6 9.1C16.6 8.41 16.33 7.75 15.84 7.26C15.35 6.77 14.69 6.5 14 6.5H9V11.7ZM9 11.7H14.8C15.5 11.7 16.18 11.98 16.67 12.48C17.17 12.97 17.45 13.65 17.45 14.35C17.45 15.05 17.17 15.73 16.67 16.22C16.18 16.72 15.5 17 14.8 17H9V11.7ZM9 5V18.5M11 4V6.5M13.5 4V6.5M11 17V19.5M13.5 17V19.5" },
    ],
  },
  ethereum: {
    pen: "round",
    shapes: [
      { d: "M12 3L6.5 12L12 15.2L17.5 12L12 3ZM6.5 13.6L12 21L17.5 13.6L12 16.8L6.5 13.6Z" },
    ],
  },
  sliders: {
    pen: "round",
    shapes: [
      { d: "M4 7H14M18 7H20M4 17H8M12 17H20" },
      { d: "M16 9C17.1 9 18 8.1 18 7C18 5.9 17.1 5 16 5C14.9 5 14 5.9 14 7C14 8.1 14.9 9 16 9Z" },
      { d: "M10 19C11.1 19 12 18.1 12 17C12 15.9 11.1 15 10 15C8.9 15 8 15.9 8 17C8 18.1 8.9 19 10 19Z" },
    ],
  },
  chart: { pen: "round", shapes: [{ d: "M4 20H20" }, { d: "M7 16V11M12 16V7M17 16V8" }] },
  phone: {
    pen: "round",
    shapes: [
      { rect: { x: "7", y: "2.5", width: "10", height: "19", rx: "2.5" } },
      { d: "M10.5 17.5h3" },
    ],
  },
  globe: {
    pen: "round",
    shapes: [
      { circle: { cx: "12", cy: "12", r: "8.5" } },
      { ellipse: { cx: "12", cy: "12", rx: "3.8", ry: "8.5" } },
      { d: "M3.5 12h17" },
    ],
  },
  minus: { pen: "capped", shapes: [{ d: "M5 12h14" }] },
  check: { pen: "fine", box: { w: 20, h: 20 }, shapes: [{ d: "M6.2 10.3l2.7 2.7 5.1-5.4" }] },
  sys: {
    pen: "solid",
    box: { w: 70, h: 12 },
    shapes: [
      { rect: { x: "0", y: "8", width: "3", height: "4", rx: "1" } },
      { rect: { x: "5", y: "5.5", width: "3", height: "6.5", rx: "1" } },
      { rect: { x: "10", y: "3", width: "3", height: "9", rx: "1" } },
      { rect: { x: "15", y: ".5", width: "3", height: "11.5", rx: "1" } },
      { d: "M30 3.2a10 10 0 0 1 13 0l-1.4 1.5a8 8 0 0 0-10.2 0zM32.6 6a6.2 6.2 0 0 1 7.8 0l-1.5 1.5a4 4 0 0 0-4.8 0zM35.3 8.8a2.2 2.2 0 0 1 2.4 0L36.5 10z" },
      { rect: { x: "47.5", y: "1", width: "20", height: "10", rx: "3" }, outline: ".45" },
      { rect: { x: "49.5", y: "3", width: "15", height: "6", rx: "1.6" } },
      { d: "M68.6 4.5v3a1.5 1.5 0 0 0 0-3z", opacity: ".45" },
    ],
  },
} as const satisfies Record<string, IconArtwork>;

export type IconName = keyof typeof ICON_ARTWORK;

// Sprite order (object key order).
export const ICON_NAMES = Object.keys(ICON_ARTWORK) as IconName[];

export const iconId = (name: IconName) => `i-${name}`;
