import { gsap } from "gsap";
import type { Env, Spec } from "./chapters";
import { arcD, arcs, blurEl, CI, gdot, half, type Layer, layer, lg, markEl, P, rayD, rays, rg, S, secBox, secD, type Sweep, sweepSprite, tickSegs } from "./svg-kit";
import { $, $$, BLUE, D2R, INK, isD, kD, kM, MIST, pt, R2, range, rgba, SOFT, V1, V3, V5, V7, V9, W } from "./utils";

/* ---------- 09 close ---------- */
type CloseRefs = {
  o: [number, number]; k: number; R: number; D: boolean; base: Layer;
  fan: SVGPathElement[]; waves: SVGPathElement[]; bloom: SVGPathElement; beam: HTMLDivElement; halo: HTMLDivElement;
  blades: { p: SVGPathElement; bis: number }[]; ring: SVGPathElement; ticks: SVGPathElement[];
  mglow: HTMLDivElement; mark: SVGPathElement; pulses: SVGGElement[]; lock: SVGGElement; lockC: [number, number];
  blips: SVGGElement[]; origin: SVGGElement; seam: SVGGElement; sweep?: Sweep;
  L: { far: Layer; glow: Layer; mid: Layer; near: Layer };
};

export function close(env: Env): Spec<CloseRefs> {
  const { run, ch } = env, RM = run.reduce;
  return {
    build(c) {
      const el = c.el, art = $(':scope > .art', el), W0 = el.offsetWidth, H0 = el.offsetHeight, D = isD(), k = D ? kD() : kM();
      const ox = W0 / 2, oy = H0 - 48 * k, R = (D ? 300 : 200) * k; const r = { o: [ox, oy], k, R, D } as CloseRefs;
      const base = layer(art, 'base', W0, H0), bs = base.svg;
      S('rect', { width: W0, height: H0, fill: '#0F2BD9' }, bs);
      S('rect', { width: W0, height: H0, fill: rg(bs, ox, oy, D ? W0 * .62 : 620 * k, [[0, '#F4F7FF'], [D ? .07 : .06, '#C9D8FF'], [D ? .18 : .16, '#7FA2FF'], [D ? .36 : .34, V5, .85], [D ? .7 : .68, V5, .25], [1, V5, 0]], D ? H0 * .98 : 640 * k) }, bs);
      S('rect', { width: W0, height: H0, fill: lg(bs, 0, 0, 0, H0 * (D ? .72 : .62), [[0, V9, D ? .85 : .82], [1, V9, 0]]) }, bs);
      S('rect', { width: W0, height: H0, fill: rg(bs, 0, H0, W0 * (D ? .42 : .62), [[0, '#03040A', .55], [1, '#03040A', 0]], H0 * (D ? .62 : .36)) }, bs);
      S('rect', { width: W0, height: H0, fill: rg(bs, W0, H0, W0 * (D ? .42 : .62), [[0, '#03040A', .55], [1, '#03040A', 0]], H0 * (D ? .62 : .36)) }, bs);
      S('rect', { x: 0, y: R2(oy), width: W0, height: R2(H0 - oy + 2), fill: INK }, bs);
      S('rect', { x: 0, y: R2(oy), width: W0, height: R2(H0 - oy + 2), fill: rg(bs, ox, oy, (D ? 700 : 260) * k, [[0, BLUE, .42], [.5, V7, .14], [1, V9, 0]], (D ? 160 : 120) * k) }, bs);
      r.base = base;
      const far = layer(art, 'far', W0, H0), fs = far.svg;
      const echo = [[-156, -132], [-48, -24]].map(([a0, a1]) => P(fs, secD(ox, oy, R + (D ? 32 : 24) * k, (D ? 1500 : 1100) * k, a0, a1), { fill: rg(fs, ox, oy, (D ? 1000 : 900) * k, [[D ? .33 : .25, W, .1], [.6, V1, .035], [1, MIST, 0]]), stroke: rg(fs, ox, oy, (D ? 1000 : 900) * k, [[D ? .33 : .25, W, .42], [.7, W, .1], [1, W, .02]]) }));
      const rayEls = rays(fs, ox, oy, 36 * k, (D ? 1800 : 1100) * k, D ? range(-180, 0, 12) : range(-168, -12, 12), rg(fs, ox, oy, (D ? 1500 : 900) * k, [[0, W, .34], [.3, W, .14], [1, W, .03]]));
      r.fan = [...rayEls.map((e, i): [SVGPathElement, number] => [e, (D ? -180 : -168) + i * 12]), [echo[0], -144] as [SVGPathElement, number], [echo[1], -36] as [SVGPathElement, number]].sort((a, b) => a[1] - b[1]).map(q => q[0]);
      r.waves = arcs(fs, ox, oy, D ? range(120 * k, 1200 * k, 120 * k) : range(48 * k, 912 * k, 48 * k), -180, 0, rg(fs, ox, oy, (D ? 1300 : 900) * k, [[D ? .1 : .05, W, .26], [.5, W, .1], [1, W, .03]]));
      rays(fs, ox, oy, 36 * k, (D ? 900 : 760) * k, range(12, 168, 12).filter(a => ![36, 90, 144].includes(a)), rg(fs, ox, oy, 500 * k, [[0, W, .16], [.4, W, .05], [1, W, 0]]));
      rays(fs, ox, oy, 36 * k, (D ? 900 : 760) * k, D ? [36, 90, 144] : [36, 144], rg(fs, ox, oy, 420 * k, [[0, W, .34], [.5, W, .1], [1, W, .02]]));
      if (!D) arcs(fs, ox, oy, range(96 * k, 720 * k, 48 * k), 0, 180, rg(fs, ox, oy, 720 * k, [[0, W, .09], [.45, W, .035], [1, W, 0]]));
      const glow = layer(art, 'glow', W0, H0), gs = glow.svg;
      r.bloom = half(gs, ox, oy, (D ? 520 : 320) * k, (D ? 520 : 320) * k, rg(gs, ox, oy, (D ? 520 : 320) * k, [[0, W, 1], [.08, V1, .9], [.28, V3, .5], [.6, V5, .16], [1, V5, 0]]));
      half(gs, ox, oy, (D ? 260 : 220) * k, (D ? 90 : 70) * k, rg(gs, ox, oy, (D ? 260 : 220) * k, [[0, MIST, .4], [.5, BLUE, .14], [1, V5, 0]], (D ? 90 : 70) * k), false);
      { const r1 = (D ? 1100 : 900) * k, [bx, by, bw, bh] = secBox(ox, oy, 0, r1, -96, -84), b = blurEl(glow, bx, by, bw, bh, (D ? 7 : 6) * k); P(b.g, secD(ox, oy, 0, r1, -96, -84), { fill: rg(b.svg, ox, oy, (D ? 1000 : 760) * k, [[0, W, .95], [.3, V1, .4], [.55, V3, .1], [.8, V3, 0]]) }); r.beam = b.div; gsap.set(r.beam, { transformOrigin: `50% ${R2(oy - by + 6.6 * (D ? 7 : 6) * k * 0 + (D ? 7 : 6) * k * 2.6)}px` }); }
      { const b = blurEl(glow, ox - R / 2, oy - R, R, R, (D ? 32 : 24) * k); markEl(b.g, ox, oy, R, { fill: rgba(BLUE, .9) }); r.halo = b.div; }
      if (!D) S('ellipse', { cx: R2(ox), cy: R2(oy), rx: R2(300 * k), ry: R2(8 * k), fill: rg(gs, ox, oy, 300 * k, [[0, W, .95], [.35, MIST, .4], [1, V3, 0]], 8 * k) }, gs);
      const mid = layer(art, 'mid', W0, H0), ms = mid.svg;
      r.blades = [[-120, -96], [-84, -60]].map(([a0, a1], i) => ({ p: P(ms, secD(ox, oy, R + (D ? 32 : 14) * k, (D ? 1500 : 1000) * k, a0, a1), { fill: rg(ms, ox, oy, (D ? 1000 : 900) * k, [[D ? .33 : .24, W, .24], [.55, V1, .09], [.8, MIST, .025], [1, MIST, 0]]), stroke: rg(ms, ox, oy, (D ? 1000 : 900) * k, [[D ? .33 : .24, W, .85], [D ? .42 : .36, W, .42], [.52, W, .15], [.75, W, .07], [1, W, .03]]) }), bis: i ? -72 : -108 }));
      const dR = (D ? 360 : 240) * k;
      r.ring = P(ms, arcD(ox, oy, dR, D ? -168 : -150, D ? -12 : -30), { stroke: rgba(W, .3), fill: 'none' });
      r.ticks = tickSegs(ms, ox, oy, dR, D ? -168 : -150, D ? -12 : -30, D ? 2 : 3, 6 * k, 12, 14 * k, rgba(W, D ? .36 : .5));
      const near = layer(art, 'near', W0, H0), ns = near.svg;
      { const mg = blurEl(near, ox - R / 2, oy - R, R, R, (D ? 20 : 24) * k, null, true); markEl(mg.g, ox, oy, R, { fill: D ? rgba(V3, .8) : rgba(BLUE, .55) }); r.mglow = mg.div; }
      r.mark = markEl(ns, ox, oy, R, { fill: rg(ns, 48, 95.475, 96, [[0, W], [.6, '#F4F7FF'], [1, D ? '#C9D8FF' : '#D6E2FF']]) });
      r.pulses = (D ? [[312, 334, .95], [372, 386, .6], [398, 404, .35]] : [[218, 236, 1], [252, 262, .7], [278, 284, .4]]).map(([a, z, al]) => { const g = S('g', null, ns); P(g, rayD(ox, oy, a * k, z * k, -90), { stroke: rgba(V3, .35 * al), 'stroke-width': (D ? 3 : 2.5) * 3.4, 'stroke-linecap': 'round', fill: 'none' }); P(g, rayD(ox, oy, a * k, z * k, -90), { stroke: rgba(W, al), 'stroke-width': D ? 3 : 2.5, 'stroke-linecap': 'round', fill: 'none' }); return g; });
      const lockR = (D ? 600 : 172) * k, lk = pt(ox, oy, lockR, -36);
      r.lock = S('g', null, ns); CI(r.lock, lk[0], lk[1], 22 * k, { fill: 'none', stroke: rgba(W, .3) }); CI(r.lock, lk[0], lk[1], 11 * k, { fill: 'none', stroke: rgba(W, .75) }); gdot(ns, r.lock, lk[0], lk[1], 4 * k, W, V1, 16 * k); r.lockC = lk;
      r.blips = (D ? [[480, -162, .9], [720, -140, .5], [480, -16, .6]] : [[250, -118, .85], [180, -152, .55], [300, -64, .5]]).map(([q, a, op]) => { const p = pt(ox, oy, q * k, a); return gdot(ns, ns, p[0], p[1], 3 * k, W, V3, 12 * k, op); });
      S('rect', { x: 0, y: R2(oy - .5), width: W0, height: 1, fill: lg(ns, 0, 0, W0, 0, [[0, W, 0], [.5, W, .9], [1, W, 0]]) }, ns);
      if (!D) CI(ns, ox, oy, 16 * k, { fill: 'none', stroke: rgba(W, .5) });
      r.origin = gdot(ns, ns, ox, oy, (D ? 6 : 5) * k, W, V1, 24 * k);
      r.seam = gdot(ns, ns, ox, 0, 3.5 * k, W, V3, 16 * k);
      // reduced motion draws the final still frame without the sweep, as the hero does
      if (!RM) { r.sweep = sweepSprite(near, ox, oy, (D ? 64 : 40) * k, (D ? 700 : 380) * k, 26, { alpha: .3, n: 7, z: 1 }); gsap.set(r.sweep.div, { rotation: -36 }); }
      r.L = { far, glow, mid, near };
      return r;
    },
    parallax(c) { const r = c.refs; ch.radialPar(c, [[r.L.far, .02, 16, r.o[0], r.o[1]], [r.L.glow, .04, 12, r.o[0], r.o[1]], [r.L.mid, .06, 8, r.o[0], r.o[1]]]); },
    start: 'top 70%',
    still: true,
    intro(c) {
      const r = c.refs, el = c.el, tl = gsap.timeline(), [ox, oy] = r.o, O = `${ox} ${oy}`, k = r.k, sw = r.sweep ? r.sweep.div : null;
      tl.from(r.base, { opacity: .45, duration: 1.2, ease: 'expo.out' }, 0);
      r.fan.forEach((f, i) => tl.from(f, { opacity: 0, scale: .6, svgOrigin: O, duration: .9, ease: 'expo.out' }, i * (1.1 / r.fan.length)));
      tl.from(r.waves, { opacity: 0, scale: .9, svgOrigin: O, duration: 1, ease: SOFT, stagger: .03 }, .1);
      tl.from(r.bloom, { opacity: 0, scale: .6, svgOrigin: O, duration: .8, ease: SOFT }, .2);
      tl.from(r.beam, { scaleY: 0, duration: .7, ease: 'expo.out' }, .25);
      tl.from(r.halo, { opacity: 0, duration: .8, ease: SOFT }, .4);
      r.blades.forEach(b => { const off = -48 * k; tl.from(b.p, { x: Math.cos(b.bis * D2R) * off, y: Math.sin(b.bis * D2R) * off, opacity: 0, duration: 1, ease: 'expo.out' }, .4); });
      tl.from(r.ticks, { opacity: 0, duration: .3, stagger: .05 }, .5);
      tl.from(r.ring, { opacity: 0, duration: .6 }, .45);
      tl.from(r.mark, { scale: .8, opacity: 0, svgOrigin: O, duration: .9, ease: 'expo.out' }, .5);
      tl.from(r.mglow, { opacity: 0, duration: .9, ease: SOFT }, .55);
      tl.fromTo(sw, { rotation: -180 }, { rotation: -36, duration: 1.4, ease: 'power4.inOut' }, .5);
      tl.from(sw, { opacity: 0, duration: .4 }, .5);
      tl.from(r.lock, { scale: 1.9, opacity: 0, svgOrigin: `${R2(r.lockC[0])} ${R2(r.lockC[1])}`, duration: .5, ease: 'expo.out' }, 1.9);
      tl.from(r.blips, { opacity: 0, duration: .4, stagger: .15 }, 1.1);
      ch.headIn(tl, $('.head', el), .6);
      tl.from($$('.close__cta .btn, .plat', el), { y: 14, opacity: 0, duration: .7, ease: 'expo.out', stagger: .08, clearProps: 'transform,opacity' }, 1.0);
      return tl;
    },
    loops(c) {
      const r = c.refs, k = r.k, sw = r.sweep ? r.sweep.div : null, lc = `${R2(r.lockC[0])} ${R2(r.lockC[1])}`;
      const pl = gsap.timeline({ repeat: -1 }); r.pulses.forEach((p, i) => pl.fromTo(p, { y: 0, opacity: 1 }, { y: -90 * k, opacity: 0, duration: 1.6, ease: 'none' }, i * .53)); ch.onScreen(c, pl);
      const lk = gsap.timeline({ repeat: -1, yoyo: true }); lk.to(r.lock, { scale: 1.08, svgOrigin: lc, duration: 1.2, ease: 'sine.inOut' }); ch.onScreen(c, lk);
      const st = gsap.timeline({ repeat: -1, repeatDelay: 6, delay: 5 }); st.to(sw, { opacity: 0, duration: .4 }).set(sw, { rotation: -180 }).to(sw, { opacity: 1, duration: .3 }).to(sw, { rotation: -36, duration: 1.6, ease: 'power4.inOut' }, '<').fromTo(r.lock, { scale: 1.7, opacity: 0, svgOrigin: lc }, { scale: 1, opacity: 1, duration: .5, ease: 'expo.out' }); ch.onScreen(c, st);
    }
  };
}

/* ---------- 10 footer ---------- */
type FootRefs = { o: [number, number]; rays: SVGPathElement[]; bloom: SVGEllipseElement; rings: SVGPathElement[]; pts: SVGGElement[]; L: { far: Layer; glow: Layer; mid: Layer; near: Layer } };

export function footer(env: Env): Spec<FootRefs> {
  const { ch } = env;
  return {
    build(c) {
      const el = c.el, art = $(':scope > .art', el), W0 = el.offsetWidth, H0 = el.offsetHeight, D = isD(), k = D ? kD() : kM();
      const ox = W0 / 2, oy = -48 * k;
      const base = layer(art, 'base', W0, H0).svg;
      S('rect', { width: W0, height: H0, fill: rg(base, ox, oy, (D ? 700 : 260) * k, [[0, BLUE, .42], [.5, V7, .14], [1, V9, 0]], (D ? 160 : 120) * k) }, base);
      const far = layer(art, 'far', W0, H0), fs = far.svg;
      const raysE = rays(fs, ox, oy, 36 * k, (D ? 900 : 760) * k, range(12, 168, 12).filter(a => ![36, 90, 144].includes(a)), rg(fs, ox, oy, 500 * k, [[0, W, .16], [.4, W, .05], [1, W, 0]])).concat(rays(fs, ox, oy, 36 * k, (D ? 900 : 760) * k, D ? [36, 90, 144] : [36, 144], rg(fs, ox, oy, 420 * k, [[0, W, .34], [.5, W, .1], [1, W, .02]])));
      const glow = layer(art, 'glow', W0, H0), gs = glow.svg;
      const bloom = S('ellipse', { cx: R2(ox), cy: R2(oy), rx: R2((D ? 260 : 220) * k), ry: R2((D ? 90 : 70) * k), fill: rg(gs, ox, oy, (D ? 260 : 220) * k, [[0, MIST, .4], [.5, BLUE, .14], [1, V5, 0]], (D ? 90 : 70) * k) }, gs);
      const mid = layer(art, 'mid', W0, H0), ms = mid.svg;
      const rings = arcs(ms, ox, oy, range(96 * k, (D ? 864 : 720) * k, 48 * k), 0, 180, rg(ms, ox, oy, (D ? 760 : 720) * k, [[0, W, .09], [.45, W, .035], [1, W, 0]]));
      const near = layer(art, 'near', W0, H0), ns = near.svg;
      const pts = (D ? [[192, 36, .75], [288, 144, .55]] : [[192, 36, .75], [144, 60, .5]]).map(([q, a, op]) => { const p = pt(ox, oy, q * k, a); return gdot(ns, ns, p[0], p[1], 2 * k, W, V3, 10 * k, op); });
      return { o: [ox, oy], rays: raysE, bloom, rings, pts, L: { far, glow, mid, near } };
    },
    parallax(c) { const r = c.refs; ch.radialPar(c, [[r.L.far, .02, 10, r.o[0], r.o[1]], [r.L.glow, .04, 8, r.o[0], r.o[1]], [r.L.mid, .06, 6, r.o[0], r.o[1]]]); },
    start: 'top 92%',
    intro(c) {
      const r = c.refs, el = c.el, tl = gsap.timeline(), [ox, oy] = r.o, O = `${R2(ox)} ${R2(oy)}`;
      tl.from(r.rays, { opacity: 0, scale: .5, svgOrigin: O, duration: .8, ease: SOFT, stagger: .03 }, 0);
      tl.from(r.rings, { opacity: 0, scale: .9, svgOrigin: O, duration: 1.6, ease: 'expo.out', stagger: .04 }, .2);
      tl.from(r.bloom, { opacity: 0, duration: 1.2, ease: SOFT }, 0);
      tl.from($$('.foot__brand, .foot__links, .foot__bot', el), { y: 16, opacity: 0, duration: .6, ease: 'expo.out', stagger: .08, clearProps: 'transform,opacity' }, .2);
      return tl;
    },
    loops(c) { const r = c.refs, tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 }); r.pts.forEach((p, i) => tl.fromTo(p, { opacity: .35 }, { opacity: 1, duration: .5, yoyo: true, repeat: 1, ease: SOFT }, i * 1.5)); ch.onScreen(c, tl); }
  };
}
