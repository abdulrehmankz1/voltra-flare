import { gsap } from "gsap";
import type { Run } from "./runtime";
import { arcD, CI, lg, P, rayD, rg, S, secBox, secD, type Svg } from "./svg-kit";
import { $, BLUE, clamp, context2d, D2R, deg3, type Ease, EZ, INK, isD, kD, kM, MARK_D, MIST, pt, R2, range, rgba, SOFT, type Stop, V1, V3, V5, V7, V9, W } from "./utils";

/* ===================== hero: the signature signal ===================== */
// The art is painted into four group canvases (far, glow, mid, near) that carry the radial parallax as
// translate and scale only (rotating these full-bleed layers tripled the cost of every composited frame, so
// the pointer moves the sweep, not the scene). The canvases redraw only during the 1.6 s ignition; at rest the sweep,
// wavefront, pulses and blips are CSS-animated sprites, so an idle hero costs the main thread nothing.

export type Hero = {
  start(skip: boolean): void;
  resize(): void;
  layout(): void;
  refit(): void;
  setScroll(y: number): void;
  el: HTMLElement;
};

type Box = { x: number; y: number; w: number; h: number };
type SprBox = Box & { c: HTMLCanvasElement };
type Geo = {
  mob: boolean; nar?: boolean; ox: number; oy: number; R: number;
  hrx: number; hry: number; heat: Stop[];
  ray0: number; ray1: number; rayG: number; rayS: Stop[]; rayA: number[];
  waves: number[]; waveG: number; waveS: Stop[]; waveMax: number;
  bloomR: number; bloomS: Stop[];
  bl0: number; bl1: number; blG: number; blF: Stop[]; blS: Stop[];
  dR: number; dA0: number; dA1: number; dStep: number; dL: number; dM: number; dTick: number; dRing: number;
  sw0: number; sw1: number;
  pulse: [number, number]; pulseL: [number, number]; pulseW: number;
  pStatic: [number, number, number][];
  blips: [number, number, number][];
};
type Key = 'far' | 'glow' | 'beam' | 'mid' | 'near';
type Cv = { c: HTMLCanvasElement; x: CanvasRenderingContext2D; b: Box; dpr: number; done: boolean };
type X = CanvasRenderingContext2D;

export function createHero(run: Run): Hero | null {
  const { doc: d, reduce: RM, fine: FINE, signal } = run;
  const secM = d.querySelector<HTMLElement>('.hero'); if (!secM) return null;
  const sec: HTMLElement = secM;
  const art = $('.hero__art', sec), fall = sec.querySelector<HTMLElement>('.hero__fall');
  const markP = typeof Path2D === 'function' ? new Path2D(MARK_D) : null;
  let Wd = 0, Ht = 0, DPR = 1, k = 1, g: Geo | null = null, spr: { mark?: SprBox; halo?: SprBox; beam?: SprBox } = {}, started = false, inView = true, pageVis = !d.hidden, sp = 0;
  let t0 = 0, introRAF = 0, introDone = false, aimRAF = 0, aiming = false, skipped = false;
  const ptr = { on: false, x: 0, y: 0, lx: 0, ly: 0, ang: -90, lock: 0, tapUntil: 0 };
  const aim = { a: -180, al: 0 };
  const L: Partial<Record<Key, Cv>> = {};
  const G: Partial<Record<'far' | 'glow' | 'mid' | 'near', HTMLDivElement>> = {};
  const S_: {
    ring?: HTMLDivElement; sweep?: HTMLDivElement; sweepO?: HTMLDivElement; hz?: HTMLElement;
    pulses?: HTMLElement[]; pulseWrap?: HTMLDivElement; blips?: HTMLElement[]; blipWrap?: HTMLDivElement;
    retDeg?: HTMLElement; ret?: HTMLDivElement;
  } = {};
  const iv = (t: number, s: number, du: number, e: Ease) => e(clamp((t - s) / du, 0, 1));
  const rad = (x: X, cx: number, cy: number, r: number, stops: Stop[]) => { const gr = x.createRadialGradient(cx, cy, 0, cx, cy, Math.max(r, .01)); stops.forEach(s => gr.addColorStop(s[0], rgba(s[1], s[2] == null ? 1 : s[2]))); return gr; };
  const el = <K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string | null, par?: Element | null): HTMLElementTagNameMap[K] => { const e = d.createElement(tag); if (cls) e.className = cls; if (par) par.appendChild(e); return e; };
  function off(w: number, h: number, dpr: number): [HTMLCanvasElement, X] { const c = d.createElement('canvas'); c.width = Math.max(1, Math.ceil(w * dpr)); c.height = Math.max(1, Math.ceil(h * dpr)); const x = context2d(c); x.setTransform(dpr, 0, 0, dpr, 0, 0); return [c, x]; }
  function secPath(x: X, cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) { x.beginPath(); x.arc(cx, cy, r1, a0 * D2R, a1 * D2R, false); if (r0 > 0) x.arc(cx, cy, r0, a1 * D2R, a0 * D2R, true); else x.lineTo(cx, cy); x.closePath(); }
  function markPath(x: X, ox: number, oy: number, R: number) { const s = R / 96; x.translate(ox - 48 * s, oy - 95.475 * s); x.scale(s, s); }
  const box = (x: number, y: number, w: number, h: number): Box => ({ x, y, w, h });
  const union = (bs: Box[]) => { const x0 = Math.min(...bs.map(b => b.x)), y0 = Math.min(...bs.map(b => b.y)), x1 = Math.max(...bs.map(b => b.x + b.w)), y1 = Math.max(...bs.map(b => b.y + b.h)); return box(x0, y0, x1 - x0, y1 - y0); };
  const fit = (b: Box, m = 2) => { const x0 = Math.max(0, Math.floor(b.x - m)), y0 = Math.max(0, Math.floor(b.y - m)), x1 = Math.min(Wd, Math.ceil(b.x + b.w + m)), y1 = Math.min(Ht, Math.ceil(b.y + b.h + m)); return box(x0, y0, Math.max(1, x1 - x0), Math.max(1, y1 - y0)); };
  const geo = (): Geo => g as Geo;
  const sb = (r0: number, r1: number, a0: number, a1: number) => { const q = secBox(geo().ox, geo().oy, r0, r1, a0, a1); return box(q[0], q[1], q[2], q[3]); };
  const scaled = (qs: number[][]): [number, number, number][] => qs.map(q => [q[0] * k, q[1] * k, q[2]]);

  /* ---------- geometry ---------- */
  function geometry() {
    const r = sec.getBoundingClientRect(); Wd = Math.round(r.width); Ht = Math.round(r.height);
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    if (!isD()) {
      k = kM();
      const side = $('.hero__side', sec).getBoundingClientRect(), head = $('.hero__head', sec).getBoundingClientRect();
      const oy = side.top - r.top - 28 * k, R = clamp(oy - (head.bottom - r.top) - 30 * k, 110 * k, 250 * k);
      g = { mob: true, ox: Wd / 2, oy, R,
        hrx: Wd * 1.15, hry: Ht * .64, heat: [[0, BLUE, .95], [.2, V5, .72], [.48, V7, .34], [.78, V9, .12], [1, V9, 0]],
        ray0: 0, ray1: 900 * k, rayG: 640 * k, rayS: [[0, W, .4], [.42, W, .13], [1, W, .03]], rayA: range(-180, 0, 12),
        waves: range(48 * k, 720 * k, 48 * k), waveG: 680 * k, waveS: [[0, W, .3], [.5, W, .1], [1, W, .02]], waveMax: 760 * k,
        bloomR: 240 * k, bloomS: [[0, W, .9], [.07, V1, .7], [.28, V3, .32], [.6, V5, .12], [1, V5, 0]],
        bl0: R + 14 * k, bl1: 960 * k, blG: 700 * k, blF: [[.36, W, .17], [.62, V1, .06], [1, MIST, .01]], blS: [[.36, W, .6], [.7, W, .12], [1, W, .02]],
        dR: 300 * k, dA0: -150, dA1: -30, dStep: 3, dL: 6 * k, dM: 14 * k, dTick: .5, dRing: .32,
        sw0: 30 * k, sw1: 420 * k,
        pulse: [R + 18 * k, R + 150 * k], pulseL: [24 * k, 6 * k], pulseW: 2.5 * k,
        pStatic: scaled([[268, 292, 1], [318, 334, .7], [356, 366, .45], [386, 392, .25]]),
        blips: [[R + 120 * k, -150, .7], [R + 70 * k, -38, .55], [R + 200 * k, -58, .4]] };
      if (fall) fall.style.setProperty('--fall-top', R2(oy + 6 * k) + 'px');
    } else {
      const nar = Wd < 1360; k = kD() * (nar ? .92 : 1);
      const oy = Ht - 48 * kD(), R = 400 * k;
      g = { mob: false, nar, ox: nar ? Wd * .64 : Wd / 2, oy, R,
        hrx: Wd * .86, hry: Ht * 1.18, heat: [[0, '#F4F7FF', 1], [.07, '#A9C2FF', 1], [.2, V5, 1], [.46, V7, .88], [.74, V9, .45], [1, V9, 0]],
        ray0: 36 * k, ray1: 1800 * k, rayG: 1500 * k, rayS: [[0, W, .34], [.3, W, .14], [1, W, .03]], rayA: range(-180, 0, 12),
        waves: range(160 * k, 1280 * k, 160 * k), waveG: 1300 * k, waveS: [[.1, W, .26], [.5, W, .1], [1, W, .03]], waveMax: 1400 * k,
        bloomR: 420 * k, bloomS: [[0, W, 1], [.08, V1, .9], [.28, V3, .5], [.6, V5, .16], [1, V5, 0]],
        bl0: R + 32 * k, bl1: 1500 * k, blG: 1000 * k, blF: [[.42, W, .2], [.62, V1, .07], [.85, MIST, .015], [1, MIST, 0]], blS: [[.42, W, .8], [.7, W, .2], [1, W, .03]],
        dR: 600 * k, dA0: -132, dA1: -48, dStep: 2, dL: 7 * k, dM: 16 * k, dTick: .32, dRing: .24,
        sw0: 24 * k, sw1: 640 * k,
        pulse: [R + 30 * k, R + 360 * k], pulseL: [60 * k, 10 * k], pulseW: 3 * k,
        pStatic: scaled([[440, 500, .95], [548, 584, .7], [640, 660, .45], [732, 742, .25]]),
        blips: [[560 * k, -108, .9], [720 * k, -72, .7], [800 * k, -40, .5], [880 * k, -130, .45]] };
    }
  }
  /* offscreen sprites: the lit mark, its Volt halo and the softened slot beam */
  function sprites() {
    spr = {}; if (!markP) return;
    const { ox, oy, R, mob } = geo(), pad = (mob ? 60 : 90) * k;
    { const b = box(ox - R / 2 - pad, oy - R - pad, R + 2 * pad, R + 2 * pad); const [c, x] = off(b.w, b.h, DPR);
      x.save(); x.translate(-b.x, -b.y); x.save(); markPath(x, ox, oy, R);
      x.shadowColor = mob ? rgba(BLUE, .55) : rgba(V3, .8); x.shadowBlur = (mob ? 48 : 40) * k * DPR;
      const gr = x.createRadialGradient(48, 95.475, 0, 48, 95.475, 96); gr.addColorStop(0, '#FFFFFF'); gr.addColorStop(.6, '#F4F7FF'); gr.addColorStop(1, mob ? '#D6E2FF' : '#C9D8FF');
      x.fillStyle = gr; x.fill(markP); x.restore(); x.restore(); spr.mark = { ...b, c }; }
    if (!mob) { const hp = 150 * k, b = box(ox - R / 2 - hp, oy - R - hp, R + 2 * hp, R + 2 * hp); const [c, x] = off(b.w, b.h, 1); const OFF = 20000;
      x.save(); x.translate(-b.x - OFF, -b.y); x.shadowColor = rgba(BLUE, .9); x.shadowBlur = 64 * k; x.shadowOffsetX = OFF; markPath(x, ox, oy, R); x.fillStyle = '#000'; x.fill(markP); x.restore(); spr.halo = { ...b, c }; }
    { const r0 = mob ? R + 8 * k : 0, r1 = mob ? 760 * k : 1100 * k, bl = (mob ? 8 : 14) * k, hw = r1 * Math.sin(6 * D2R) + 3 * bl, b = box(ox - hw, oy - r1 - 1.5 * bl, 2 * hw, r1 - r0 * .9 + 3 * bl);
      const [c, x] = off(b.w, b.h, 1); const OFF = 20000; x.save(); x.translate(-b.x - OFF, -b.y); x.shadowColor = rgba(V1, 1); x.shadowBlur = bl; x.shadowOffsetX = OFF;
      x.fillStyle = mob ? rad(x, ox, oy, 560 * k, [[.4, W, .5], [.7, W, .16], [1, W, 0]]) : rad(x, ox, oy, 1000 * k, [[0, W, .95], [.35, W, .42], [.7, W, .1], [1, W, 0]]);
      secPath(x, ox, oy, r0, r1, -96, -84); x.fill(); x.restore(); spr.beam = { ...b, c }; }
  }

  /* ---------- painters (hero coordinates; each canvas maps its own box) ---------- */
  function drawBase(x: X, t: number, fixed: boolean) {
    const g = geo(), { ox, oy, mob } = g, heat = fixed ? 1 : iv(t, 0, 1.2, EZ.expo);
    const X0 = -Wd * .15, Y0 = -Ht * .4, X1 = Wd * 1.15, Y1 = Ht * 1.2;
    x.fillStyle = mob ? '#04050A' : INK; x.fillRect(X0, Y0, X1 - X0, Y1 - Y0);
    x.save(); x.translate(ox, oy); const sx = g.hrx / g.hry; x.scale(sx, 1);
    x.globalAlpha = .3 + .7 * heat; x.fillStyle = rad(x, 0, 0, g.hry * (.6 + .4 * heat), g.heat);
    x.fillRect((X0 - ox) / sx, Y0 - oy, (X1 - X0) / sx, Y1 - Y0); x.restore(); x.globalAlpha = 1;
    if (mob) {
      x.save(); x.translate(Wd / 2, -Ht * .06); x.scale((Wd * .95) / (Ht * .3), 1); x.fillStyle = rad(x, 0, 0, Ht * .3, [[0, V7, .42], [1, V9, 0]]); x.fillRect(-Wd, -Ht, Wd * 2, Ht * 2); x.restore();
    } else {
      const lgd = x.createLinearGradient(0, 0, 0, Ht * .62); lgd.addColorStop(0, rgba(INK, .9)); lgd.addColorStop(1, rgba(INK, 0)); x.fillStyle = lgd; x.fillRect(X0, Y0, X1 - X0, Ht * .62 - Y0);
      x.fillStyle = INK; x.fillRect(X0, oy, X1 - X0, Y1 - oy);
      x.save(); x.translate(ox, oy); x.scale(700 / 160, 1); x.fillStyle = rad(x, 0, 0, 160 * k, [[0, BLUE, .42], [.5, V7, .14], [1, V9, 0]]); x.fillRect(-400 * k, 0, 800 * k, 200 * k); x.restore();
    }
  }
  function drawRays(x: X, t: number, fixed: boolean) {
    const g = geo(), { ox, oy } = g, a = fixed ? 0 : -180 + 180 * iv(t, 0, 1.2, EZ.expo);
    if (a > -179.5) {
      x.save();
      if (a < -.01) { x.beginPath(); x.moveTo(ox, oy); x.arc(ox, oy, 5000, -Math.PI, a * D2R); x.closePath(); x.clip(); }
      x.strokeStyle = rad(x, ox, oy, g.rayG, g.rayS); x.lineWidth = 1; x.beginPath();
      for (const r of g.rayA) { const p0 = pt(ox, oy, g.ray0, r), p1 = pt(ox, oy, g.ray1, r); x.moveTo(p0[0], p0[1]); x.lineTo(p1[0], p1[1]); }
      x.stroke(); x.restore();
    }
    if (!g.mob) {
      const al = fixed ? 1 : iv(t, .35, 1, SOFT); if (al <= 0) return; x.globalAlpha = al;
      x.strokeStyle = rad(x, ox, oy, 500 * k, [[0, W, .16], [.4, W, .05], [1, W, 0]]); x.beginPath();
      for (const r of range(12, 168, 12)) { if (r === 36 || r === 90 || r === 144) continue; const p0 = pt(ox, oy, 36 * k, r), p1 = pt(ox, oy, 900 * k, r); x.moveTo(p0[0], p0[1]); x.lineTo(p1[0], p1[1]); } x.stroke();
      x.strokeStyle = rad(x, ox, oy, 420 * k, [[0, W, .34], [.5, W, .1], [1, W, .02]]); x.beginPath();
      for (const r of [36, 90, 144]) { const p0 = pt(ox, oy, 36 * k, r), p1 = pt(ox, oy, 900 * k, r); x.moveTo(p0[0], p0[1]); x.lineTo(p1[0], p1[1]); } x.stroke(); x.globalAlpha = 1;
    }
  }
  function drawWaves(x: X, t: number, fixed: boolean) {
    const g = geo(), { ox, oy } = g; x.lineWidth = 1; x.strokeStyle = rad(x, ox, oy, g.waveG, g.waveS);
    g.waves.forEach((r, i) => { const a = fixed ? 1 : iv(t, .2 + i * .05, .7, SOFT); if (a <= 0) return; x.globalAlpha = a; x.beginPath(); x.arc(ox, oy, r * (.92 + .08 * a), Math.PI, 2 * Math.PI); x.stroke(); });
    x.globalAlpha = 1;
  }
  function drawGlow(x: X, t: number, fixed: boolean) {
    const g = geo(), { ox, oy, mob } = g, bl = fixed ? 1 : iv(t, .2, .8, SOFT);
    if (bl > 0) {
      x.globalAlpha = bl; x.fillStyle = rad(x, ox, oy, g.bloomR, g.bloomS); x.beginPath();
      if (mob) x.arc(ox, oy, g.bloomR, 0, Math.PI * 2); else { x.arc(ox, oy, g.bloomR, Math.PI, 2 * Math.PI); x.closePath(); } x.fill();
      if (!mob) { x.save(); x.translate(ox, oy); x.scale(260 / 90, 1); x.fillStyle = rad(x, 0, 0, 90 * k, [[0, MIST, .4], [.5, BLUE, .14], [1, V5, 0]]); x.beginPath(); x.arc(0, 0, 90 * k, 0, Math.PI); x.closePath(); x.fill(); x.restore(); }
      x.globalAlpha = 1;
    }
    if (spr.halo) { const hv = fixed ? 1 : iv(t, .5, .9, SOFT); if (hv > 0) { x.globalAlpha = hv * .9; x.drawImage(spr.halo.c, spr.halo.x, spr.halo.y, spr.halo.w, spr.halo.h); x.globalAlpha = 1; } }
    if (mob) { x.save(); x.translate(ox, oy); x.scale(320 / 9, 1); x.globalAlpha = bl; x.fillStyle = rad(x, 0, 0, 9 * k, [[0, W, .95], [.35, MIST, .4], [1, V3, 0]]); x.beginPath(); x.arc(0, 0, 9 * k, 0, Math.PI * 2); x.fill(); x.restore(); x.globalAlpha = 1; }
  }
  function drawBeam(x: X, t: number, fixed: boolean) {
    if (!spr.beam) return; const { ox, oy } = geo(), bv = fixed ? 1 : iv(t, .2, .6, EZ.expo); if (bv <= 0) return;
    x.save(); x.translate(ox, oy); x.scale(1, bv); x.translate(-ox, -oy); x.drawImage(spr.beam.c, spr.beam.x, spr.beam.y, spr.beam.w, spr.beam.h); x.restore();
  }
  function drawDial(x: X, t: number, fixed: boolean) {
    const g = geo(), { ox, oy } = g, lv = fixed ? 1 : iv(t, .6, .6, EZ.quint), ra = fixed ? 1 : iv(t, .5, .6, SOFT);
    if (ra <= 0) return; const lit = g.dA0 + (g.dA1 - g.dA0) * lv;
    x.lineWidth = 1; x.strokeStyle = rgba(W, g.dRing * ra); x.beginPath(); x.arc(ox, oy, g.dR, g.dA0 * D2R, g.dA1 * D2R); x.stroke();
    x.strokeStyle = rgba(W, g.dTick); x.beginPath();
    for (let a = g.dA0; a <= lit + 1e-6; a += g.dStep) { const m = Math.abs(Math.round(a / 12) * 12 - a) < 1e-6, p0 = pt(ox, oy, g.dR, a), p1 = pt(ox, oy, g.dR + (m ? g.dM : g.dL), a); x.moveTo(p0[0], p0[1]); x.lineTo(p1[0], p1[1]); }
    x.stroke();
  }
  function drawMid(x: X, t: number, fixed: boolean) {
    const g = geo(), { ox, oy, mob } = g, s = fixed ? 1 : iv(t, .4, 1, EZ.expo);
    if (s > 0) {
      const fill = rad(x, ox, oy, g.blG, g.blF), str = rad(x, ox, oy, g.blG, g.blS);
      for (const [a0, a1] of [[-120, -96], [-84, -60]]) {
        const bis = (a0 + a1) / 2, o = -48 * k * (1 - s);
        x.save(); x.translate(Math.cos(bis * D2R) * o, Math.sin(bis * D2R) * o); x.globalAlpha = s;
        secPath(x, ox, oy, g.bl0, g.bl1, a0, a1); x.fillStyle = fill; x.fill(); x.strokeStyle = str; x.lineWidth = 1; x.stroke(); x.restore();
      }
      x.globalAlpha = 1;
    }
    if (!mob) drawDial(x, t, fixed);
  }
  function drawNear(x: X, t: number, fixed: boolean) {
    const { ox, oy, mob, R } = geo();
    const mv = fixed ? 1 : iv(t, .5, .9, EZ.expo);
    if (mv > 0 && spr.mark) {
      const sc = .8 + .2 * mv; x.save(); x.translate(ox, oy); x.scale(sc, sc); x.translate(-ox, -oy); x.globalAlpha = mv; x.drawImage(spr.mark.c, spr.mark.x, spr.mark.y, spr.mark.w, spr.mark.h); x.restore(); x.globalAlpha = 1;
      const fl = fixed ? 0 : Math.max(0, 1 - Math.abs((t - .78) / .32));
      if (fl > 0) { x.globalAlpha = fl * .7; x.fillStyle = rad(x, ox, oy, R, [[0, W, 1], [.25, V1, .55], [1, V3, 0]]); x.beginPath(); x.arc(ox, oy, R, Math.PI, 2 * Math.PI); x.fill(); x.globalAlpha = 1; }
    }
    if (mob) drawDial(x, t, fixed);
    const ov = fixed ? 1 : iv(t, .3, .6, SOFT);
    if (ov > 0) { x.globalAlpha = ov; const or = (mob ? 4 : 6) * k; x.fillStyle = rad(x, ox, oy, or + 22 * k, [[0, V1, .9], [.3, V1, .4], [1, V1, 0]]); x.beginPath(); x.arc(ox, oy, or + 22 * k, 0, Math.PI * 2); x.fill(); if (mob) { x.strokeStyle = rgba(W, .5); x.lineWidth = 1; x.beginPath(); x.arc(ox, oy, 16 * k, 0, Math.PI * 2); x.stroke(); } x.fillStyle = W; x.beginPath(); x.arc(ox, oy, or, 0, Math.PI * 2); x.fill(); x.globalAlpha = 1; }
  }
  const PAINT: Record<Key, (x: X, t: number, f: boolean) => void> = {
    far: (x, t, f) => { drawBase(x, t, f); drawRays(x, t, f); drawWaves(x, t, f); },
    glow: drawGlow, beam: drawBeam, mid: drawMid, near: drawNear
  };
  const ENDS: Record<Key, number> = { far: 1.65, glow: 1.4, beam: .85, mid: 1.45, near: 1.45 };
  const keys = () => Object.keys(L) as Key[];
  function paint(key: Key, t: number, fixed: boolean) {
    const l = L[key]; if (!l) return; const x = l.x;
    x.setTransform(l.dpr, 0, 0, l.dpr, -l.b.x * l.dpr, -l.b.y * l.dpr); x.clearRect(l.b.x, l.b.y, l.b.w, l.b.h); x.globalAlpha = 1;
    PAINT[key](x, t, fixed);
  }

  /* ---------- DOM: groups, canvases and sprites ---------- */
  function canvas(key: Key, par: Element, b: Box, dpr: number, cls?: string) {
    const c = el('canvas', 'hcv ' + (cls || ''), par); c.width = Math.max(1, Math.round(b.w * dpr)); c.height = Math.max(1, Math.round(b.h * dpr));
    Object.assign(c.style, { left: b.x + 'px', top: b.y + 'px', width: b.w + 'px', height: b.h + 'px' });
    L[key] = { c, x: context2d(c), b, dpr, done: false };
  }
  function svgEl(par: Element, w: number, h: number): Svg { const s = S('svg', { width: R2(w), height: R2(h), viewBox: `0 0 ${R2(w)} ${R2(h)}`, 'aria-hidden': 'true', focusable: 'false' }) as Svg; s.defs = S('defs', null, s); par.appendChild(s); return s; }
  function build() {
    art.innerHTML = ''; for (const key of keys()) delete L[key];
    const g = geo(), { ox, oy, R, mob } = g, org = `${R2(ox)}px ${R2(oy)}px`;
    const grp = (n: 'far' | 'glow' | 'mid' | 'near') => { const e = el('div', 'hg hg--' + n, art); e.style.transformOrigin = org; G[n] = e; return e; };
    const Gfar = grp('far'), Gglow = grp('glow'), Gmid = grp('mid'), Gnear = grp('near');
    // far: heat, rays, wavefronts, plus the travelling wavefront
    canvas('far', Gfar, box(0, 0, Wd, Ht), Math.min(DPR, 1.5));
    { const M = g.waveMax, ring = el('div', 'hring', Gfar), o = ring;
      Object.assign(ring.style, { left: R2(ox - M) + 'px', top: R2(oy - M) + 'px', width: R2(2 * M) + 'px', height: R2(M + 2) + 'px', transformOrigin: `50% ${R2(M)}px` }); ring.style.setProperty('--s0', (g.R * 1.04 / M).toFixed(4));
      const sv = svgEl(o, 2 * M, M + 2); P(sv, `M${R2(1)} ${R2(M)}A${R2(M - 1)} ${R2(M - 1)} 0 0 1 ${R2(2 * M - 1)} ${R2(M)}`, { fill: 'none', stroke: MIST, 'stroke-width': mob ? 1.4 : 1.8 }); S_.ring = ring; }
    // glow: bloom and halo, the slot beam, and the radar sweep
    const gb = [mob ? box(ox - g.bloomR, oy - g.bloomR, 2 * g.bloomR, 2 * g.bloomR) : box(ox - g.bloomR, oy - g.bloomR, 2 * g.bloomR, g.bloomR + 90 * k)];
    if (!mob) gb.push(box(ox - 260 * k, oy, 520 * k, 90 * k)); else gb.push(box(ox - 320 * k, oy - 9 * k, 640 * k, 18 * k));
    if (spr.halo) gb.push(spr.halo);
    canvas('glow', Gglow, fit(union(gb)), 1, 'hcv--glow');
    if (spr.beam) canvas('beam', Gglow, fit(spr.beam), 1, 'hcv--beam');
    { const Sr = g.sw1 + 6, w = el('div', 'hsweep', Gglow), o = w, sv = svgEl(o, 2 * Sr, 2 * Sr), gg = S('g', { transform: `translate(${R2(Sr)} ${R2(Sr)})` }, sv), n = 14, span = 40;
      Object.assign(w.style, { left: R2(ox - Sr) + 'px', top: R2(oy - Sr) + 'px', width: R2(2 * Sr) + 'px', height: R2(2 * Sr) + 'px' });
      const fill = rg(sv, 0, 0, g.sw1, [[0, V1, .5], [.35, MIST, 1], [1, MIST, 0]]);
      for (let i = 0; i < n; i++) { const a0 = -span + span * i / n, a1 = Math.min(0, -span + span * (i + 1) / n + .4); P(gg, secD(0, 0, g.sw0, g.sw1, a0, a1), { fill, opacity: R2(Math.pow((i + 1) / n, 1.8) * .2 * 100) / 100 }); }
      P(gg, rayD(0, 0, g.sw0, g.sw1, 0), { stroke: rgba(V3, .2), 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none' });
      P(gg, rayD(0, 0, g.sw0, g.sw1, 0), { stroke: lg(sv, g.sw0, 0, g.sw1, 0, [[0, W, .15], [.5, W, .7], [1, W, .95]]), 'stroke-width': 1.5, 'stroke-linecap': 'round', fill: 'none' });
      S_.sweep = w; S_.sweepO = o; }
    // mid: glass blades and the bezel dial
    const mb = [[-120, -96], [-84, -60]].map(([a0, a1]) => sb(g.bl0 - 50 * k, g.bl1, a0, a1));
    if (!mob) mb.push(sb(g.dR - 2, g.dR + g.dM + 2, g.dA0, g.dA1));
    canvas('mid', Gmid, fit(union(mb)), DPR);
    // near: mark, origin and (mobile) dial; horizon, pulses and blips as sprites
    const nb: Box[] = [spr.mark || box(ox - R, oy - R, 2 * R, R), box(ox - R, oy - R, 2 * R, R), box(ox - 40 * k, oy - 40 * k, 80 * k, 80 * k)];
    if (mob) nb.push(sb(g.dR - 2, g.dR + g.dM + 2, g.dA0, g.dA1));
    canvas('near', Gnear, fit(union(nb)), DPR);
    { const hz = el('i', 'hhz', Gnear); hz.style.top = R2(oy - .5) + 'px'; hz.style.transformOrigin = `${R2(ox)}px 50%`; hz.style.background = mob ? `linear-gradient(90deg,${rgba(W, .04)},${rgba(W, .7)},${rgba(W, .04)})` : `linear-gradient(90deg,${rgba(W, 0)},${rgba(W, .9)},${rgba(W, 0)})`; if (!RM && !introDone && !skipped) hz.style.transform = 'scaleX(0)'; S_.hz = hz; }
    { const wrap = el('div', 'hpulses', Gnear), gw = g.pulseW * 3.4, L0 = g.pulseL[0];
      S_.pulses = [0, 1, 2, 3].map(i => { const p = el('i', 'hpulse', wrap); el('b', null, p);
        Object.assign(p.style, { left: R2(ox - gw / 2) + 'px', top: R2(oy - L0) + 'px', width: R2(gw) + 'px', height: R2(L0) + 'px' });
        p.style.setProperty('--r0', R2(g.pulse[0]) + 'px'); p.style.setProperty('--r1', R2(g.pulse[1]) + 'px'); p.style.setProperty('--ls', (g.pulseL[1] / L0).toFixed(4)); p.style.setProperty('--d', (-i * .4).toFixed(2) + 's'); p.style.setProperty('--cw', R2(g.pulseW) + 'px');
        return p; }); S_.pulseWrap = wrap; }
    { const wrap = el('div', 'hblips', Gnear);
      S_.blips = g.blips.map(([r, a, op], i) => { const p = pt(ox, oy, r, a), b = el('i', 'hblip', wrap); ['g', 'o'].forEach(c => el('b', c, b));
        Object.assign(b.style, { left: R2(p[0]) + 'px', top: R2(p[1]) + 'px' }); b.style.setProperty('--op', String(op)); b.style.setProperty('--d', (-(i * .29) / .41).toFixed(2) + 's');
        b.style.setProperty('--gs', R2(28 * k) + 'px'); b.style.setProperty('--ds', R2(6 * k) + 'px'); return b; }); S_.blipWrap = wrap; }
    // pointer lock reticle (hero coordinates, outside the parallax groups)
    { const ret = el('div', 'hret', art), rr = 22 * k, spin = el('div', 'hret__spin', ret), s1 = svgEl(spin, 2 * rr + 2, 2 * rr + 2), c = rr + 1;
      Object.assign(spin.style, { left: R2(-c) + 'px', top: R2(-c) + 'px', width: R2(2 * c) + 'px', height: R2(2 * c) + 'px' });
      for (let i = 0; i < 4; i++) { const a0 = i * 90 + 11.5, a1 = a0 + 67; P(s1, arcD(c, c, rr, a0, a1), { fill: 'none', stroke: rgba(W, .32) }); }
      const core = el('div', 'hret__core', ret), s2 = svgEl(core, 2 * c, 2 * c); Object.assign(core.style, { left: R2(-c) + 'px', top: R2(-c) + 'px' });
      CI(s2, c, c, 11 * k, { fill: 'none', stroke: rgba(W, .78) }); CI(s2, c, c, 3 * k, { fill: W });
      const tx = el('span', 'hret__t', ret); tx.style.left = R2(rr + 10 * k) + 'px'; tx.style.top = R2(-13 * k) + 'px'; tx.style.fontSize = Math.round(11 * Math.max(k, 1)) + 'px';
      S_.retDeg = el('b', null, tx); el('br', null, tx); el('span', null, tx).textContent = 'Lock';
      S_.ret = ret; }
    groups();
  }

  /* ---------- state ---------- */
  function groups() {
    if (!G.far) return; const p = sp;
    const set = (e: HTMLElement | undefined, s: number, ty: number) => { if (e) e.style.transform = `translate3d(0,${R2(ty)}px,0) scale(${s.toFixed(4)})`; };
    set(G.far, 1 + .02 * p, Ht * .2 * p); set(G.glow, 1 + .04 * p, Ht * .14 * p); set(G.mid, 1 + .06 * p, Ht * .09 * p); set(G.near, 1 + .1 * p, Ht * .04 * p);
  }
  function staticSprites() {
    // reduced motion: pulses and blips hold their final frame, nothing travels
    const g = geo();
    (S_.pulses ?? []).forEach((p, i) => { const q = g.pStatic[i]; p.style.transform = `translate3d(0,${R2(-q[0])}px,0) scaleY(${((q[1] - q[0]) / g.pulseL[0]).toFixed(3)})`; p.style.opacity = String(q[2]); });
    if (S_.pulseWrap) S_.pulseWrap.style.opacity = '1'; if (S_.blipWrap) S_.blipWrap.style.opacity = '1';
  }
  function paintAll(t: number, fixed: boolean) { (['far', 'glow', 'beam', 'mid', 'near'] as const).forEach(key => paint(key, t, fixed)); }
  function finishIntro() {
    if (introRAF) run.cancelAnimationFrame(introRAF); introRAF = 0; introDone = true;
    for (const key of keys()) { const l = L[key] as Cv; if (!l.done) { paint(key, 9, true); l.done = true; } }
    if (S_.hz) S_.hz.style.transform = '';
  }
  function introFrame(now: number) {
    introRAF = 0; const t = (now - t0) / 1000;
    if (!inView || !pageVis) { finishIntro(); return; }
    let left = 0;
    for (const key of keys()) { const l = L[key] as Cv; if (l.done) continue; if (t >= ENDS[key]) { paint(key, 9, true); l.done = true; } else { paint(key, t, false); left++; } }
    if (S_.hz) S_.hz.style.transform = `scaleX(${iv(t, .5, .9, EZ.expo).toFixed(4)})`;
    if (left) introRAF = run.requestAnimationFrame(introFrame); else finishIntro();
  }
  const allDone = () => { for (const key of keys()) (L[key] as Cv).done = true; };
  function setLive() { art.classList.toggle('is-paused', !(inView && pageVis)); }
  function layout() {
    geometry(); sprites(); build();
    if (RM) { paintAll(9, true); allDone(); staticSprites(); return; }
    if (!started) return;
    if (introDone || skipped) { paintAll(9, true); allDone(); }
    else { const t = (performance.now() - t0) / 1000; for (const key of keys()) { if (t >= ENDS[key]) { paint(key, 9, true); (L[key] as Cv).done = true; } else paint(key, t, false); } if (!introRAF) introRAF = run.requestAnimationFrame(introFrame); }
  }
  function start(skip: boolean) {
    if (started) return; started = true; skipped = !!skip; t0 = performance.now();
    if (RM) { layout(); return; }
    art.classList.add('is-live'); if (skip) art.classList.add('is-skip');
    if (skip) { paintAll(9, true); allDone(); introDone = true; }
    else { paintAll(0, false); introRAF = run.requestAnimationFrame(introFrame); }
    setLive();
  }
  function resize() { const w = Math.round(sec.getBoundingClientRect().width), h = Math.round(sec.getBoundingClientRect().height); if (g && w === Wd && h === Ht) return; layout(); }
  function setScroll(y: number) { if (RM) return; const v = clamp(y / Math.max(1, Ht), 0, 1); if (Math.abs(v - sp) > .0005) { sp = v; groups(); } }
  // on phones the origin sits under the copy, so it moves when the web font replaces the fallback
  function refit() { if (!g || !g.mob) return; const r = sec.getBoundingClientRect(), side = $('.hero__side', sec).getBoundingClientRect(); if (Math.abs(side.top - r.top - 28 * kM() - g.oy) > 1 || Math.round(r.height) !== Ht) layout(); }

  /* ---------- pointer: the sweep locks onto the cursor (or a tap) ---------- */
  function aimStart() {
    const sw = S_.sweep, swO = S_.sweepO; if (aiming || !sw || !swO) return; aiming = true;
    let a = -180; const m = getComputedStyle(sw).transform, v = m && m.match(/matrix\(([^)]+)\)/);
    if (v) { const q = v[1].split(',').map(parseFloat); a = Math.atan2(q[1], q[0]) / D2R; if (a > 0) a -= 360; }
    aim.a = a; aim.al = parseFloat(getComputedStyle(swO).opacity) || 0;
    sw.classList.add('is-aim'); applyAim();
  }
  function aimStop() { aiming = false; if (!S_.sweep || !S_.sweepO) return; S_.sweep.classList.remove('is-aim'); S_.sweep.style.transform = ''; S_.sweepO.style.opacity = ''; }
  function applyAim() { if (!S_.sweep || !S_.sweepO) return; S_.sweep.style.transform = `rotate(${R2(aim.a)}deg)`; S_.sweepO.style.opacity = String(R2(aim.al)); }
  function aimFrame(now: number) {
    aimRAF = 0; if (!g || !S_.sweep || !S_.ret || !S_.retDeg) return;
    const active = (ptr.on && ptr.y < g.oy - 10) || now < ptr.tapUntil;
    ptr.lock += ((active ? 1 : 0) - ptr.lock) * .12; if (ptr.lock < .01) ptr.lock = 0;
    ptr.lx += (ptr.x - ptr.lx) * .22; ptr.ly += (ptr.y - ptr.ly) * .22;
    if (active) { if (!aiming) aimStart(); aim.a += (clamp(ptr.ang, -178, -2) - aim.a) * .085; aim.al += (1 - aim.al) * .14; applyAim(); }
    else if (aiming) { aim.al += (0 - aim.al) * .14; applyAim(); if (aim.al < .02) aimStop(); }
    S_.ret.classList.toggle('is-on', ptr.lock > 0);
    if (ptr.lock > 0) { S_.ret.style.opacity = String(R2(ptr.lock)); S_.ret.style.transform = `translate3d(${R2(ptr.lx)}px,${R2(ptr.ly)}px,0)`; const dg = deg3(ptr.ang + 90); if (S_.retDeg.textContent !== dg) S_.retDeg.textContent = dg; }
    else S_.ret.style.opacity = '0';
    if ((active || aiming || ptr.lock > 0) && inView && pageVis) aimRAF = run.requestAnimationFrame(aimFrame);
  }
  const kickAim = () => { if (!aimRAF && g && !RM && started) aimRAF = run.requestAnimationFrame(aimFrame); };
  if ('IntersectionObserver' in window) { const io = new IntersectionObserver(es => { inView = es[0].isIntersecting; setLive(); if (inView) kickAim(); }, { rootMargin: '80px' }); io.observe(sec); run.defer(() => io.disconnect()); }
  d.addEventListener('visibilitychange', () => { pageVis = !d.hidden; setLive(); if (pageVis) kickAim(); }, { signal });
  if (!RM) {
    const at = (e: PointerEvent) => { const r = sec.getBoundingClientRect(), gg = geo(); ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.ang = Math.atan2(ptr.y - gg.oy, ptr.x - gg.ox) / D2R; };
    if (FINE) {
      sec.addEventListener('pointermove', e => {
        if (!g || (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen')) return;
        at(e); if (!ptr.on && ptr.lock < .02) { ptr.lx = ptr.x; ptr.ly = ptr.y; }
        ptr.on = true; kickAim();
      }, { passive: true, signal });
      sec.addEventListener('pointerleave', () => { ptr.on = false; kickAim(); }, { signal });
    }
    // touch: a tap pings the radar, which locks onto the touch point for a moment
    sec.addEventListener('pointerdown', e => {
      if (!g || e.pointerType !== 'touch' || (e.target as Element).closest('a, button')) return;
      at(e); if (ptr.y > g.oy - 10) return; ptr.lx = ptr.x; ptr.ly = ptr.y; ptr.tapUntil = performance.now() + 1500; kickAim();
    }, { passive: true, signal });
  }
  if (RM) layout(); else { geometry(); sprites(); build(); }
  return { start, resize, layout, refit, setScroll, el: sec };
}

/* the hero copy lifts and fades as the hero scrolls away */
export function heroOut(run: Run): void {
  if (run.reduce) return;
  const sec = $('.hero'), hin = $('.hero__in', sec), st = () => ({ trigger: sec, start: 'top top', end: 'bottom top', scrub: true });
  gsap.to(hin, { y: -70, ease: 'none', scrollTrigger: st() });
  gsap.to(hin, { opacity: 0, ease: 'power2.in', scrollTrigger: st() });
}
