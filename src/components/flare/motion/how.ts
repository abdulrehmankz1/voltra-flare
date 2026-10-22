import { gsap } from "gsap";
import type { Env, Spec } from "./chapters";
import { arcD, arcs, blurEl, CI, gdot, half, type Layer, layer, lg, P, rayD, rays, rel, rg, S, secBox, secD, tickSegs } from "./svg-kit";
import { $, $$, BLUE, INK, isD, kD, kM, MIST, pt, R2, range, rgba, SOFT, type Stop, V1, V3, V5, V7, V9, W } from "./utils";

/* ---------- 06 how it works ---------- */
type Refs = {
  o: [number, number]; k: number; D: boolean; base: Element;
  rays: SVGPathElement[]; waves: SVGPathElement[]; heat: SVGElement; aglow: HTMLDivElement | null;
  blades: SVGGElement[]; speed: SVGPathElement[]; hub: SVGPathElement[]; ring: SVGPathElement | null; ticks: SVGPathElement[];
  pr: SVGCircleElement[]; prC: [number, number]; dots: SVGGElement[]; origin: SVGGElement; seam: SVGGElement;
  steps: HTMLElement[]; L: { far: Layer; glow: Layer; mid: Layer; near: Layer };
};

export function how(env: Env): Spec<Refs> {
  const { ch } = env;
  return {
    build(c) {
      const el = c.el, art = $(':scope > .art', el), W0 = el.offsetWidth, H0 = el.offsetHeight, D = isD(), k = D ? kD() : kM();
      const steps = $$('.step', el), inner = $('.how__in', el), ir = rel(inner, el);
      let O: [number, number], ang: number[], RB: number, R1: number, RD: number, HW: number;
      if (D) { O = [0, 520 * k]; ang = [-12, 0, 12]; RB = 64 * k; R1 = 760 * k; RD = 836 * k; HW = 4; }
      else { const sl = rel($('.steps', el), el); O = [rel($('.head', el), el).x, sl.y + 175 * k]; ang = [-48, 0, 48]; RB = 24 * k; R1 = 96 * k; RD = 120 * k; HW = 12; }
      const [ox, oy] = O; const r = { o: O, k, D } as Refs;
      const base = layer(art, 'base', W0, H0).svg;
      if (D) { S('rect', { width: W0, height: H0, fill: rg(base, ox, oy, 820 * k, [[0, '#D6E2FF', 1], [.45, '#E4EBFF', .6], [1, '#E4EBFF', 0]], 352 * k) }, base); S('rect', { width: W0, height: H0, fill: rg(base, W0 / 2, 0, W0 * .26, [[0, '#DCE6FF', .7], [1, '#DCE6FF', 0]], H0 * .3) }, base); }
      else { S('rect', { width: W0, height: H0, fill: rg(base, W0 * .06, oy, W0 * .95, [[0, '#DCE6FF', .95], [.5, V1, .4], [1, V1, 0]], H0 * .4) }, base); S('rect', { width: W0, height: H0, fill: rg(base, W0 / 2, 0, W0 * .5, [[0, '#DCE6FF', .9], [1, '#DCE6FF', 0]], H0 * .2) }, base); }
      r.base = base.parentNode as Element;
      const far = layer(art, 'far', W0, H0), fs = far.svg;
      if (D) {
        r.rays = rays(fs, ox, oy, 152 * k, 1600 * k, [...range(-84, -24, 12), ...range(24, 84, 12)], rg(fs, ox, oy, 1500 * k, [[0, V5, .22], [.35, V5, .08], [1, V5, .02]]));
        r.waves = arcs(fs, ox, oy, [304, 456, 608, 760].map(v => v * k), -84, 84, rg(fs, ox, oy, 1000 * k, [[.1, V5, .2], [.6, V5, .08], [1, V5, .03]]));
      } else {
        r.rays = rays(fs, ox, oy, 18 * k, 560 * k, range(-84, 84, 12), rg(fs, ox, oy, 560 * k, [[0, V5, .28], [.3, V5, .1], [1, V5, .02]]));
        r.waves = arcs(fs, ox, oy, [48, 168, 216, 264, 312, 360, 408, 456].map(v => v * k), -90, 90, rg(fs, ox, oy, 460 * k, [[0, V5, .24], [.5, V5, .08], [1, V5, .02]]));
      }
      const glow = layer(art, 'glow', W0, H0), gs = glow.svg;
      if (D) {
        r.heat = P(gs, `M${R2(ox)} ${R2(oy - 352 * k)}A${R2(440 * k)} ${R2(352 * k)} 0 0 1 ${R2(ox)} ${R2(oy + 352 * k)}Z`, { fill: rg(gs, ox, oy, 440 * k, [[0, V5, .42], [.25, BLUE, .2], [.6, V3, .06], [1, V3, 0]], 352 * k) });
        const [bx, by, bw, bh] = secBox(ox, oy, RB, R1 + 40 * k, 6, 18), b = blurEl(glow, bx, by, bw, bh, 22 * k); P(b.g, secD(ox, oy, RB, R1 + 40 * k, 6, 18), { fill: rgba(V5, .42) }); r.aglow = b.div;
      } else { r.heat = CI(gs, ox, oy, 180 * k, { fill: rg(gs, ox, oy, 180 * k, [[0, V3, .55], [.4, MIST, .22], [1, V1, 0]]) }); r.aglow = null; }
      half(gs, W0 / 2, 0, (D ? 200 : 120) * k, (D ? 72 : 46) * k, rg(gs, W0 / 2, 0, (D ? 200 : 120) * k, [[0, V3, .55], [.4, MIST, .22], [1, MIST, 0]], (D ? 72 : 46) * k), false);
      const mid = layer(art, 'mid', W0, H0), ms = mid.svg;
      const BF: Stop[][] = D ? [[[.1, V1], [.6, '#CBD9FF'], [1, '#A9C2FF']], [[.2, MIST], [.6, V3], [1, BLUE]], [[.2, '#A9C2FF'], [.42, BLUE], [.75, V5], [1, V7]]] : [[[0, V1], [1, MIST]], [[0, MIST], [1, BLUE]], [[0, BLUE], [1, V7]]];
      r.blades = ang.map((a, i) => { const g = S('g', null, ms); P(g, secD(ox, oy, RB, R1, a - HW, a + HW), { fill: rg(ms, ox, oy, R1, BF[i]), stroke: rgba(V5, D ? [.45, .6, .75][i] : (i < 2 ? .3 : 0)) }); if (D) P(g, arcD(ox, oy, R1 - .75, a - HW, a + HW), { stroke: i === 2 ? rgba(V9, .8) : rgba(V5, [.75, .9][i]), 'stroke-width': 1.5, fill: 'none' }); return g; });
      r.speed = [];
      if (D) for (const a of [-6, 6]) for (const [q0, q1] of [[372, 384], [480, 500], [604, 636]]) r.speed.push(P(ms, rayD(ox, oy, q0 * k, q1 * k, a), { stroke: rgba(V5, .42), 'stroke-width': 1.5, 'stroke-linecap': 'round', fill: 'none' }));
      const near = layer(art, 'near', W0, H0), ns = near.svg;
      if (D) {
        P(ns, arcD(ox, oy, 56 * k, -90, 90), { stroke: rgba(V5, .6), fill: 'none' });
        r.hub = tickSegs(ns, ox, oy, 48 * k, -84, 84, 12, 6 * k, 12, 6 * k, rgba(V5, .55), { inward: true, seg: 400 });
        P(ns, `M${R2(ox)} ${R2(oy - 16 * k)}A${R2(16 * k)} ${R2(16 * k)} 0 0 1 ${R2(ox)} ${R2(oy + 16 * k)}Z`, { fill: rg(ns, ox, oy, 16 * k, [[0, '#F4F7FF'], [.45, V3], [1, V5]]) });
        const p0 = pt(ox, oy, RD, -22), p1 = pt(ox, oy, RD, -6);
        r.ring = P(ns, arcD(ox, oy, RD, -22, 34), { stroke: lg(ns, p0[0], p0[1], p1[0], p1[1], [[0, V5, 0], [.55, V5, .4], [1, V5, .55]]), fill: 'none' });
        r.ticks = tickSegs(ns, ox, oy, RD, -22, 34, 2, 6 * k, 12, 14 * k, lg(ns, p0[0], p0[1], p1[0], p1[1], [[0, V5, 0], [.55, V5, .36], [1, V5, .5]]), { inward: true, seg: 8 });
        r.pr = [32, 44].map((q, i) => { const p = pt(ox, oy, RD, 12); return CI(ns, p[0], p[1], q * k, { fill: 'none', stroke: rgba(V5, i ? .14 : .35) }); }); r.prC = pt(ox, oy, RD, 12);
        r.dots = ([[-12, 600, V5], [0, 660, V5], [12, 712, W]] as const).map(([a, q, col]) => { const p = pt(ox, oy, q * k, a); return gdot(ns, ns, p[0], p[1], 3 * k, col, col === W ? V1 : BLUE, 10 * k); });
        S('rect', { x: 0, y: 0, width: W0, height: 1, fill: lg(ns, 0, 0, W0, 0, [[0, V5, 0], [.5, V5, .6], [1, V5, 0]]) }, ns);
        rays(ns, W0 / 2, 0, 10 * k, 132 * k, range(54, 126, 12), rg(ns, W0 / 2, 0, 132 * k, [[0, V5, .38], [.5, V5, .1], [1, V5, 0]]));
      } else {
        P(ns, arcD(ox, oy, RD, -72, 72), { stroke: rgba(V5, .5), fill: 'none' });
        r.ring = null;
        r.ticks = tickSegs(ns, ox, oy, RD + 2 * k, -72, 72, 3, 4 * k, 12, 8 * k, rgba(INK, .3), { seg: 24 });
        ang.forEach(a => P(ns, rayD(ox, oy, 98 * k, RD - 17 * k, a), { stroke: rgba(V5, .6), 'stroke-width': 1.5, 'stroke-linecap': 'round', fill: 'none' }));
        CI(ns, ox, oy, 12 * k, { fill: '#F3F4F7', stroke: rgba(V5, .5) });
        r.hub = []; r.dots = []; const prC = r.prC = pt(ox, oy, RD, 48);
        r.pr = [16, 24].map((q, i) => CI(ns, prC[0], prC[1], q * k, { fill: 'none', stroke: rgba(V5, i ? .14 : .35) }));
      }
      r.origin = gdot(ns, ns, ox, oy, 4 * k, V5, BLUE, 12 * k);
      r.seam = gdot(ns, ns, W0 / 2, 0, (D ? 4.5 : 4) * k, V5, BLUE, 16 * k);
      // place the step markers on the dial and the captions beside them
      steps.forEach(s => { s.style.left = ''; s.style.top = ''; });
      const marks = ang.map(a => pt(ox, oy, RD, a));
      if (D) {
        steps.forEach((s, i) => { const [mx, my] = marks[i], sx = mx + (i === 1 ? 60 : 58) * k, sy = my - 16 * k; s.style.left = R2(sx - ir.x) + 'px'; s.style.top = R2(sy - ir.y) + 'px'; const n = $('.step__n', s); n.style.left = R2(mx - sx) + 'px'; n.style.top = R2(my - sy + 16 * k * 0) + 'px'; n.style.top = R2(16 * k) + 'px'; });
      } else {
        steps.forEach((s, i) => { const sr = rel(s, el), n = $('.step__n', s); n.style.left = R2(marks[i][0] - sr.x) + 'px'; n.style.top = R2(marks[i][1] - sr.y) + 'px'; });
      }
      r.steps = steps; r.L = { far, glow, mid, near };
      return r;
    },
    parallax(c) { const r = c.refs; ch.radialPar(c, [[r.L.far, .02, 14, r.o[0], r.o[1]], [r.L.glow, .02, 8, r.o[0], r.o[1]]]); },
    intro(c) {
      const r = c.refs, el = c.el, tl = gsap.timeline(), [ox, oy] = r.o, O = `${ox} ${oy}`;
      tl.from(r.base, { opacity: 0, duration: 1.2, ease: SOFT }, 0);
      ch.headIn(tl, $('.head', el), .1);
      tl.from(r.rays, { opacity: 0, scale: .5, svgOrigin: O, duration: 1, ease: 'expo.out', stagger: .03 }, 0);
      tl.from(r.waves, { opacity: 0, scale: .8, svgOrigin: O, duration: 1, ease: SOFT, stagger: .06 }, .1);
      tl.from(r.heat, { opacity: 0, duration: .8, ease: SOFT }, .2);
      r.blades.forEach((b, i) => tl.from(b, { scale: .08, opacity: 0, svgOrigin: O, duration: .8, ease: 'expo.out' }, .4 + i * .3));
      if (r.speed.length) tl.from(r.speed, { opacity: 0, x: -24 * r.k, duration: .6, ease: 'expo.out', stagger: .04 }, 1.1);
      if (r.aglow) tl.from(r.aglow, { opacity: 0, duration: .8, ease: SOFT }, 1.4);
      tl.from([...r.hub, ...r.ticks, ...(r.ring ? [r.ring] : [])], { opacity: 0, duration: .6, ease: SOFT, stagger: .02 }, .6);
      r.steps.forEach((s, i) => { tl.from($('.step__n', s), { scale: .3, opacity: 0, duration: .6, ease: 'back.out(2.2)' }, .75 + i * .3); tl.from($$('.step__h, .step__d', s), { x: -16, opacity: 0, duration: .7, ease: 'expo.out', stagger: .06, clearProps: 'transform,opacity' }, .8 + i * .3); });
      if (r.dots.length) tl.from(r.dots, { opacity: 0, duration: .5, stagger: .2 }, .9);
      return tl;
    },
    loops(c) { const r = c.refs, tl = gsap.timeline({ repeat: -1, repeatDelay: .4 }); r.pr.forEach((p, i) => tl.fromTo(p, { scale: .7, opacity: 0, svgOrigin: `${R2(r.prC[0])} ${R2(r.prC[1])}` }, { scale: 1.25, opacity: 1, duration: 1, ease: SOFT, yoyo: true, repeat: 1 }, i * .25)); ch.onScreen(c, tl); }
  };
}
