import { clamp, MARK_D, MIST, NS, type Pt, pt, R2, range, rgba, type Stop, V1, V3, W } from "./utils";

/* ===================== SVG kit ===================== */
// 1:1 port of the original's path builders and art primitives.

/** an svg with its <defs> (the original kept it as `svg.defs`) */
export type Svg = SVGSVGElement & { defs: SVGDefsElement };
/** a chapter art layer: a div holding one full-size svg */
export type Layer = HTMLDivElement & { svg: Svg };
export type Boxed = { div: HTMLDivElement; svg: Svg; g: SVGGElement };
export type Sprite = Boxed & { R: number };
export type Sweep = Sprite & { trail: SVGGElement; hand: SVGGElement };

type Attrs = Record<string, string | number>;

export function S<K extends keyof SVGElementTagNameMap>(tag: K, at?: Attrs | null, parent?: Element | null): SVGElementTagNameMap[K] {
  const e = document.createElementNS(NS, tag);
  if (at) for (const k in at) e.setAttribute(k, String(at[k]));
  if (parent) parent.appendChild(e);
  return e;
}

export const rayD = (cx: number, cy: number, r0: number, r1: number, a: number): string => { const p = pt(cx, cy, r0, a), q = pt(cx, cy, r1, a); return `M${R2(p[0])} ${R2(p[1])}L${R2(q[0])} ${R2(q[1])}`; };
export const circD = (cx: number, cy: number, r: number): string => `M${R2(cx - r)} ${R2(cy)}a${R2(r)} ${R2(r)} 0 1 0 ${R2(2 * r)} 0a${R2(r)} ${R2(r)} 0 1 0 ${R2(-2 * r)} 0`;
export const arcD = (cx: number, cy: number, r: number, a0: number, a1: number): string => { if (a1 - a0 >= 359.9) return circD(cx, cy, r); const p = pt(cx, cy, r, a0), q = pt(cx, cy, r, a1); return `M${R2(p[0])} ${R2(p[1])}A${R2(r)} ${R2(r)} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${R2(q[0])} ${R2(q[1])}`; };
export function secD(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number): string {
  const lg = (a1 - a0) > 180 ? 1 : 0, p0 = pt(cx, cy, r1, a0), p1 = pt(cx, cy, r1, a1);
  if (r0 <= 0) return `M${R2(cx)} ${R2(cy)}L${R2(p0[0])} ${R2(p0[1])}A${R2(r1)} ${R2(r1)} 0 ${lg} 1 ${R2(p1[0])} ${R2(p1[1])}Z`;
  const q1 = pt(cx, cy, r0, a1), q0 = pt(cx, cy, r0, a0);
  return `M${R2(q0[0])} ${R2(q0[1])}L${R2(p0[0])} ${R2(p0[1])}A${R2(r1)} ${R2(r1)} 0 ${lg} 1 ${R2(p1[0])} ${R2(p1[1])}L${R2(q1[0])} ${R2(q1[1])}A${R2(r0)} ${R2(r0)} 0 ${lg} 0 ${R2(q0[0])} ${R2(q0[1])}Z`;
}
/** [x, y, w, h] of a ring sector */
export function secBox(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number): [number, number, number, number] { const ps: Pt[] = [pt(cx, cy, r0, a0), pt(cx, cy, r0, a1), pt(cx, cy, r1, a1)]; for (let a = a0; a <= a1; a += 2) ps.push(pt(cx, cy, r1, a)); const xs = ps.map(p => p[0]), ys = ps.map(p => p[1]); const x0 = Math.min(...xs), y0 = Math.min(...ys); return [x0, y0, Math.max(...xs) - x0, Math.max(...ys) - y0]; }
export type Rel = { x: number; y: number; w: number; h: number; r: number; b: number };
export function rel(el: Element, host: Element): Rel { const a = el.getBoundingClientRect(), b = host.getBoundingClientRect(); return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height, r: a.right - b.left, b: a.bottom - b.top }; }

/*
 * Gradient ids count up from q1 per page load in the original; `resetGid()` restarts the count per mount, so a
 * Strict Mode remount (whose first run's art was removed by the cleanup) draws the same ids as a single mount.
 */
let GID = 0;
export const resetGid = (): void => { GID = 0; };
export const nextId = (): string => 'q' + (++GID);

/** gives an existing svg a fresh <defs> */
export function withDefs(sv: SVGSVGElement): Svg { const s = sv as Svg; s.defs = S('defs', null, s); return s; }
export function mkSVG(host: Element, w: number, h: number): Svg { const s = S('svg', { width: R2(w), height: R2(h), viewBox: `0 0 ${R2(w)} ${R2(h)}`, 'aria-hidden': 'true', focusable: 'false' }) as Svg; s.defs = S('defs', null, s); host.appendChild(s); return s; }
export function layer(host: Element, name: string, w: number, h: number, z?: number | null): Layer { const div = document.createElement('div') as Layer; div.className = 'lay lay--' + name; if (z != null) div.style.zIndex = String(z); host.appendChild(div); div.svg = mkSVG(div, w, h); return div; }
export function rg(svg: Svg, cx: number, cy: number, r: number, stops: Stop[], ry?: number): string {
  const id = nextId(), at: Attrs = { id, gradientUnits: 'userSpaceOnUse' };
  if (ry && Math.abs(ry - r) > .01) Object.assign(at, { cx: 0, cy: 0, r: 1, gradientTransform: `translate(${R2(cx)} ${R2(cy)}) scale(${R2(r)} ${R2(ry)})` });
  else Object.assign(at, { cx: R2(cx), cy: R2(cy), r: R2(Math.max(r, .01)) });
  const g = S('radialGradient', at, svg.defs);
  stops.forEach(s => S('stop', { offset: s[0], 'stop-color': s[1], 'stop-opacity': s[2] == null ? 1 : s[2] }, g));
  return `url(#${id})`;
}
export function lg(svg: Svg, x1: number, y1: number, x2: number, y2: number, stops: Stop[]): string {
  const id = nextId(), g = S('linearGradient', { id, gradientUnits: 'userSpaceOnUse', x1: R2(x1), y1: R2(y1), x2: R2(x2), y2: R2(y2) }, svg.defs);
  stops.forEach(s => S('stop', { offset: s[0], 'stop-color': s[1], 'stop-opacity': s[2] == null ? 1 : s[2] }, g));
  return `url(#${id})`;
}
export const P = (par: Element, dd: string, at?: Attrs): SVGPathElement => S('path', Object.assign({ d: dd }, at || {}), par);
export const CI = (par: Element, cx: number, cy: number, r: number, at?: Attrs): SVGCircleElement => S('circle', Object.assign({ cx: R2(cx), cy: R2(cy), r: R2(r) }, at || {}), par);
export const rays = (par: Element, cx: number, cy: number, r0: number, r1: number, angs: number[], stroke: string, sw = 1): SVGPathElement[] => angs.map(a => P(par, rayD(cx, cy, r0, r1, a), { stroke, 'stroke-width': sw, fill: 'none' }));
export const arcs = (par: Element, cx: number, cy: number, radii: number[], a0: number, a1: number, stroke: string, sw = 1): SVGPathElement[] => radii.map(r => P(par, arcD(cx, cy, r, a0, a1), { stroke, 'stroke-width': sw, fill: 'none' }));
type TickOpts = { seg?: number; skip?: number[]; inward?: boolean; sw?: number };
export function tickSegs(par: Element, cx: number, cy: number, r: number, a0: number, a1: number, step: number, len: number, major: number, mlen: number, stroke: string, o: TickOpts = {}): SVGPathElement[] {
  const segs: { d: string }[] = []; let cur: { d: string } = { d: '' }, ck: number | null = null; const seg = o.seg || 12;
  for (const a of range(a0, a1, step)) {
    if (o.skip && o.skip.some(s => Math.abs(s - a) < 1e-6)) continue;
    const m = Math.abs(Math.round(a / major) * major - a) < 1e-6, L = m ? mlen : len;
    const dd = o.inward ? rayD(cx, cy, r - L, r, a) : rayD(cx, cy, r, r + L, a);
    const key = Math.floor((a - a0) / seg + 1e-6);
    if (key !== ck) { cur = { d: '' }; segs.push(cur); ck = key; }
    cur.d += dd;
  }
  return segs.map(s => P(par, s.d, { stroke, 'stroke-width': o.sw || 1, fill: 'none' }));
}
export function half(par: Element, cx: number, cy: number, rx: number, ry: number, fill: string, up = true): SVGPathElement { const dd = `M${R2(cx - rx)} ${R2(cy)}A${R2(rx)} ${R2(ry)} 0 0 ${up ? 1 : 0} ${R2(cx + rx)} ${R2(cy)}Z`; return P(par, dd, { fill }); }
export function gdot(svg: Svg, par: Element, cx: number, cy: number, r: number, col = W, glow = V3, gr = 12, op = 1): SVGGElement {
  const g = S('g', { opacity: op }, par);
  CI(g, cx, cy, r + gr, { fill: rg(svg, cx, cy, r + gr, [[0, glow, .9], [clamp(r / (r + gr) * 1.3, .05, .8), glow, .4], [1, glow, 0]]) });
  CI(g, cx, cy, r, { fill: col });
  return g;
}
export function markEl(par: Element, ox: number, oy: number, R: number, at?: Attrs): SVGPathElement { const s = R / 96; return P(par, MARK_D, Object.assign({ transform: `translate(${R2(ox - 48 * s)} ${R2(oy - 95.475 * s)}) scale(${s.toFixed(5)})` }, at || {})); }
export function blurEl(host: Element, x0: number, y0: number, w: number, h: number, blur: number, z?: number | null, under?: boolean): Boxed {
  const m = blur * 2.6, div = document.createElement('div'); div.className = 'blurglow';
  Object.assign(div.style, { left: R2(x0 - m) + 'px', top: R2(y0 - m) + 'px', width: R2(w + 2 * m) + 'px', height: R2(h + 2 * m) + 'px', filter: `blur(${blur}px)` });
  if (z != null) div.style.zIndex = String(z); if (under && host.firstChild) host.insertBefore(div, host.firstChild); else host.appendChild(div);
  const svg = mkSVG(div, w + 2 * m, h + 2 * m), g = S('g', { transform: `translate(${R2(m - x0)} ${R2(m - y0)})` }, svg);
  return { div, svg, g };
}
export function boxEl(host: Element, x0: number, y0: number, w: number, h: number): Boxed {
  const div = document.createElement('div'); div.className = 'boxel';
  Object.assign(div.style, { left: R2(x0) + 'px', top: R2(y0) + 'px', width: R2(w) + 'px', height: R2(h) + 'px' }); host.appendChild(div);
  const svg = mkSVG(div, w, h), g = S('g', { transform: `translate(${R2(-x0)} ${R2(-y0)})` }, svg);
  return { div, svg, g };
}
export function sprite(host: Element, cx: number, cy: number, R: number, z?: number | null): Sprite {
  const div = document.createElement('div'); div.className = 'sprite';
  Object.assign(div.style, { left: R2(cx - R) + 'px', top: R2(cy - R) + 'px', width: R2(2 * R) + 'px', height: R2(2 * R) + 'px' });
  if (z != null) div.style.zIndex = String(z); host.appendChild(div);
  const svg = mkSVG(div, 2 * R, 2 * R), g = S('g', { transform: `translate(${R2(R)} ${R2(R)})` }, svg);
  return { div, svg, g, R };
}
/* radar sweep sprite: trail of wedges behind a hand that points at 0 degrees, rotated as a composited layer */
type SweepOpts = { z?: number; n?: number; alpha?: number; glowW?: number; w?: number };
export function sweepSprite(host: Element, cx: number, cy: number, r0: number, r1: number, span: number, o: SweepOpts = {}): Sweep {
  const base = sprite(host, cx, cy, r1 + 6, o.z), g = base.g, n = o.n || 12, A = o.alpha == null ? .18 : o.alpha;
  const fill = rg(base.svg, 0, 0, r1, [[0, V1, .55], [.4, MIST, 1], [1, MIST, 0]]);
  const trail = S('g', null, g);
  for (let i = 0; i < n; i++) { const a0 = -span + span * i / n, a1 = Math.min(0, -span + span * (i + 1) / n + .35); P(trail, secD(0, 0, r0, r1, a0, a1), { fill, opacity: R2(Math.pow((i + 1) / n, 1.7) * A * 100) / 100 }); }
  const hand = S('g', null, g);
  P(hand, rayD(0, 0, r0, r1, 0), { stroke: rgba(V3, .5), 'stroke-width': o.glowW || 5, 'stroke-linecap': 'round', opacity: .35, fill: 'none' });
  P(hand, rayD(0, 0, r0, r1, 0), { stroke: lg(base.svg, r0, 0, r1, 0, [[0, W, .25], [.45, W, .75], [1, W, .95]]), 'stroke-width': o.w || 1.5, 'stroke-linecap': 'round', fill: 'none' });
  return { ...base, trail, hand };
}

