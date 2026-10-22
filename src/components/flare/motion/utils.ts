/* ===================== constants and geometry ===================== */
// 1:1 port of the original script's helpers (reference/Voltra_Flare_Website.html).

export const MARK_D = 'M 48 95.475 L 0 12.338 C 11.651 5.606 24.585 1.41 37.965 0 L 46.005 76.485 C 46.11 77.494 46.965 78.281 48 78.281 C 49.035 78.281 49.89 77.494 49.995 76.485 L 58.035 0 C 71.415 1.41 84.349 5.606 96 12.338 L 48 95.475Z';
export const W = '#FFFFFF', INK = '#050608', V1 = '#E3EBFF', V3 = '#8EAEFF', V5 = '#2F6BFF', V7 = '#1C40DA', V9 = '#0F238F', MIST = '#BCD0FF', BLUE = '#4F7DFF';
export const NS = 'http://www.w3.org/2000/svg', D2R = Math.PI / 180;

export type Pt = [number, number];
/** a gradient stop: [offset, colour, opacity (default 1)] */
export type Stop = [number, string, number?];

export const clamp = (v: number, a: number, b: number): number => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
export const R2 = (n: number): number => Math.round(n * 100) / 100;
export const pt = (cx: number, cy: number, r: number, a: number): Pt => [cx + r * Math.cos(a * D2R), cy + r * Math.sin(a * D2R)];
export const range = (a0: number, a1: number, st: number): number[] => { const o: number[] = []; for (let a = a0; a <= a1 + 1e-6; a += st) o.push(Math.round(a * 1000) / 1000); return o; };
export const rgba = (h: string, a = 1): string => { const n = parseInt(h.slice(1), 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; };
export const isD = (): boolean => innerWidth >= 1024;
export const kD = (): number => clamp(innerWidth / 1440, .7111, 1.2);
export const kM = (): number => clamp(innerWidth / 390, .9, 1.35);
export const deg3 = (v: number): string => String(((Math.round(v) % 360) + 360) % 360).padStart(3, '0') + '°';

export type Ease = (t: number) => number;
/** a CSS cubic-bezier as an easing function (Newton steps on x, then y) */
export function bez(x1: number, y1: number, x2: number, y2: number): Ease {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t, sy = (t: number) => ((ay * t + by) * t + cy) * t, dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return x => { if (x <= 0) return 0; if (x >= 1) return 1; let t = x; for (let i = 0; i < 8; i++) { const e = sx(t) - x; if (Math.abs(e) < 1e-5) break; const q = dx(t); if (Math.abs(q) < 1e-6) break; t -= e / q; } return sy(clamp(t, 0, 1)); };
}
export const EZ = { expo: bez(.16, 1, .3, 1), quint: bez(.83, 0, .17, 1), soft: bez(.33, 0, .2, 1) } satisfies Record<string, Ease>;
export const SOFT = EZ.soft;

/** smoothstep, as the features chapter uses it */
export const sstep = (x: number): number => { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };

/*
 * DOM queries. The original's `$` returns null for a missing element; where it then checks for null, `$maybe` is
 * used. Where it would go on and fail with a TypeError, `$` throws a clear error instead (each chapter build is
 * wrapped in try/catch and logged, as in the original).
 */
export function $maybe<T extends Element = HTMLElement>(s: string, c: ParentNode = document): T | null {
  return c.querySelector<T>(s);
}
export function $<T extends Element = HTMLElement>(s: string, c: ParentNode = document): T {
  const el = c.querySelector<T>(s);
  if (el === null) throw new Error('[flare-motion] required element not found: ' + s);
  return el;
}
export const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document): T[] =>
  Array.from(c.querySelectorAll<T>(s));

/** a 2d context; the original uses it directly, so a missing one throws where the original would */
export function context2d(cv: HTMLCanvasElement): CanvasRenderingContext2D {
  const c = cv.getContext('2d');
  if (c === null) throw new Error('[flare-motion] no 2d context');
  return c;
}
