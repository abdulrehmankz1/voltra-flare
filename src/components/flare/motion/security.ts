import { gsap } from "gsap";
import type { Env, Spec } from "./chapters";
import { arcD, arcs, blurEl, boxEl, CI, circD, gdot, type Layer, layer, lg, markEl, P, rayD, rays, rel, rg, S, secBox, secD, type Sweep, sweepSprite, tickSegs } from "./svg-kit";
import { $, $$, BLUE, INK, isD, kD, kM, MIST, pt, R2, range, rgba, SOFT, V1, V3, V5, V7, V9, W } from "./utils";

/* ---------- 05 security ---------- */
type Blade = { g: SVGGElement; litG: SVGGElement | null; a: number; lit: number; iconOff: SVGElement; off: SVGPathElement };
type Refs = {
  blades: Blade[]; o: [number, number]; k: number; SH: [number, string, number][]; D: boolean;
  rays: SVGPathElement[]; waves: SVGPathElement[]; bloom: SVGCircleElement; sglow: HTMLDivElement;
  hub?: SVGPathElement[]; ring: SVGPathElement; ticks: SVGPathElement[]; swept?: SVGPathElement[];
  arc: SVGGElement; sigs: SVGGElement[]; standby?: SVGCircleElement; sbRing: SVGCircleElement; sbC: [number, number];
  sweep: Sweep; origin: SVGGElement; seam: SVGGElement; ripple: HTMLDivElement;
  L: { far: Layer; glow: Layer; mid: Layer; near: Layer }; keys: HTMLElement[];
};

export function security(env: Env): Spec<Refs> {
  const { run, ch } = env;
  return {
    build(c) {
      const el = c.el, art = $(':scope > .art', el), W0 = el.offsetWidth, H0 = el.offsetHeight, D = isD(), blades: Blade[] = [], stage = $('.sec__stage', el), sr = rel(stage, el);
      const k = D ? kD() : kM();
      let O: [number, number], R0: number, R1: number, SA: number, RB: number, SH: [number, string, number][];
      if (D) { const cp = rel($('.sec__copy', el), el); O = [Math.max(cp.x + 896 * k, cp.r + 440 * k), H0 / 2]; R0 = 72 * k; R1 = 300 * k; SA = 330 * k; RB = 360 * k; SH = [[-144, 'phone', 1], [-108, 'mark', 1], [-72, 'lock', 0]]; }
      else { O = [W0 / 2, sr.y + 196 * k]; R0 = 40 * k; R1 = 132 * k; SA = 146 * k; RB = 156 * k; SH = [[-150, 'phone', 1], [-30, 'mark', 1], [90, 'lock', 0]]; }
      const [ox, oy] = O;
      const r = { blades, o: O, k, SH, D } as Refs;
      const base = layer(art, 'base', W0, H0).svg;
      if (D) {
        S('rect', { width: W0, height: H0, fill: rg(base, ox, oy, 760 * k, [[0, V5, .38], [.32, V7, .2], [.72, V9, .05], [1, V9, 0]], 700 * k) }, base);
        S('rect', { width: W0, height: H0, fill: rg(base, W0 * .04, H0, W0 * .42, [[0, V7, .12], [1, V7, 0]], H0 * .46) }, base);
      } else {
        S('rect', { width: W0, height: H0, fill: rg(base, W0 / 2, oy, W0 * .95, [[0, V5, .26], [.45, V7, .1], [1, V9, 0]], H0 * .4) }, base);
      }
      S('rect', { width: W0, height: H0, fill: rg(base, W0 / 2, H0, (D ? 320 : 180) * k, [[0, BLUE, .24], [1, V5, 0]], (D ? 110 : 70) * k) }, base);
      const far = layer(art, 'far', W0, H0), fs = far.svg;
      if (D) {
        r.rays = rays(fs, ox, oy, R0, 1700 * k, range(-180, 168, 12), rg(fs, ox, oy, 1100 * k, [[0, W, .2], [.3, W, .07], [1, W, .01]]));
        r.waves = arcs(fs, ox, oy, range(120 * k, 1440 * k, 120 * k), -180, 180, rg(fs, ox, oy, 1200 * k, [[.08, W, .16], [.4, W, .06], [1, W, .015]]));
        S('rect', { x: R2(ox - 408 * k), y: R2(oy - .5), width: R2(W0 - ox + 408 * k), height: 1, fill: lg(fs, ox - 408 * k, 0, W0, 0, [[0, W, 0], [.5, W, .4], [1, W, 0]]) }, fs);
      } else {
        r.rays = rays(fs, ox, oy, 24 * k, 560 * k, range(6, 354, 12), rg(fs, ox, oy, 560 * k, [[0, W, .16], [.3, W, .06], [1, W, .012]]));
        r.waves = arcs(fs, ox, oy, [48, 96, 192, 240, 288, 336, 384, 432, 480, 528].map(v => v * k), -180, 180, rg(fs, ox, oy, 540 * k, [[0, W, .2], [.4, W, .07], [1, W, .012]]));
      }
      const glow = layer(art, 'glow', W0, H0), gs = glow.svg;
      r.bloom = CI(gs, ox, oy, (D ? 240 : 230) * k, { fill: rg(gs, ox, oy, (D ? 240 : 230) * k, [[0, D ? V1 : BLUE, D ? .7 : .4], [.15, V3, D ? .42 : .2], [.5, V5, .14], [1, V5, 0]]) });
      { const a0 = -160, a1 = D ? -92 : -20, [bx, by, bw, bh] = secBox(ox, oy, R0, R1 + 40 * k, a0, a1), b = blurEl(glow, bx, by, bw, bh, (D ? 28 : 18) * k); P(b.g, secD(ox, oy, R0, R1 + 40 * k, a0, a1), { fill: rgba(BLUE, .6) }); r.sglow = b.div; }
      const mid = layer(art, 'mid', W0, H0), ms = mid.svg;
      const fL = rg(ms, ox, oy, R1, [[.24, W, 1], [.6, '#DCE6FF', 1], [1, V3, 1]]), sL = rg(ms, ox, oy, R1, [[.24, W, .9], [1, W, .3]]);
      SH.forEach(([a, ic, lit]) => {
        const g = S('g', null, ms);
        const off = P(g, secD(ox, oy, R0, R1, a - 12, a + 12), { fill: rg(ms, ox, oy, R1, [[.24, MIST, .1], [1, BLUE, .05]]), stroke: rgba(W, lit ? .3 : .5), 'stroke-dasharray': lit ? 'none' : '4 6' });
        const ip = pt(ox, oy, (D ? 186 : 88) * k, a), isz = (D ? 24 : 18) * k;
        const iconOff: SVGElement = ic === 'mark' ? markEl(g, ip[0], ip[1] + isz * .42, isz * .78, { fill: W, opacity: .55 }) : S('use', { href: ic === 'phone' ? '#i-phone' : '#i-lock', x: R2(ip[0] - isz / 2), y: R2(ip[1] - isz / 2), width: R2(isz), height: R2(isz), style: 'color:#fff', opacity: .55 }, g);
        let litG: SVGGElement | null = null;
        if (lit) {
          litG = S('g', null, g);
          P(litG, secD(ox, oy, R0, R1, a - 12, a + 12), { fill: fL, stroke: sL });
          P(litG, arcD(ox, oy, R1 - .5, a - 12, a + 12), { stroke: rgba(W, .95), 'stroke-width': 1.5, fill: 'none' });
          if (ic === 'mark') markEl(litG, ip[0], ip[1] + isz * .42, isz * .78, { fill: V9 }); else S('use', { href: '#i-phone', x: R2(ip[0] - isz / 2), y: R2(ip[1] - isz / 2), width: R2(isz), height: R2(isz), style: 'color:#0F238F' }, litG);
        }
        blades.push({ g, litG, a, lit, iconOff, off });
      });
      const near = layer(art, 'near', W0, H0), ns = near.svg;
      if (D) {
        P(ns, arcD(ox, oy, 48 * k, -180, 180), { stroke: rgba(W, .4), fill: 'none' });
        r.hub = tickSegs(ns, ox, oy, 34 * k, -180, 168, 12, 6 * k, 12, 6 * k, rgba(W, .5), { seg: 400 });
        r.ring = P(ns, arcD(ox, oy, RB, -180, 180), { stroke: rgba(W, .22), fill: 'none' });
        r.ticks = tickSegs(ns, ox, oy, RB, -180, 178, 2, 6 * k, 12, 14 * k, rgba(W, .28), { seg: 24 });
        r.swept = tickSegs(ns, ox, oy, RB, -156, -90, 2, 6 * k, 12, 14 * k, rgba(W, .62), { seg: 12 });
        P(ns, range(-144, 144, 12).map(a => { const p = pt(ox, oy, 440 * k, a); return circD(p[0], p[1], 1.25); }).join(''), { fill: rgba(W, .4) });
        r.arc = S('g', null, ns);
        P(r.arc, arcD(ox, oy, SA, -144, -108), { stroke: rgba(V3, .5), 'stroke-width': 7, 'stroke-linecap': 'round', fill: 'none', opacity: .45 });
        P(r.arc, arcD(ox, oy, SA, -144, -108), { stroke: W, 'stroke-opacity': .95, 'stroke-width': 2, 'stroke-linecap': 'round', fill: 'none' });
        P(ns, arcD(ox, oy, SA, -108, -72), { stroke: rgba(W, .42), 'stroke-dasharray': '3 5', fill: 'none' });
        r.sigs = [-144, -108].map(a => { const g = S('g', null, ns); P(g, rayD(ox, oy, R1 + 8 * k, SA, a), { stroke: rgba(W, .85), 'stroke-width': 1.5, fill: 'none' }); const p = pt(ox, oy, SA, a); gdot(ns, g, p[0], p[1], 4 * k, W, V3, 14 * k); return g; });
        P(ns, rayD(ox, oy, R1 + 8 * k, SA - 4 * k, -72), { stroke: rgba(W, .32), 'stroke-dasharray': '3 4', fill: 'none' });
        const sp = pt(ox, oy, SA, -72); r.standby = CI(ns, sp[0], sp[1], 4 * k, { fill: INK, stroke: rgba(W, .55) }); r.sbRing = CI(ns, sp[0], sp[1], 10 * k, { fill: 'none', stroke: rgba(W, .5), opacity: 0 }); r.sbC = sp;
        ([['01', -144, 1], ['02', -108, 1], ['03', -72, .55]] as const).forEach(([n, a, op]) => { const p = pt(ox, oy, 404 * k, a); S('text', { x: R2(p[0]), y: R2(p[1]), 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: V3, 'fill-opacity': op, 'font-size': R2(Math.max(11, 13 * k)), 'font-weight': 500, 'letter-spacing': '1.3' }, ns).textContent = n; });
        ([['000', -90], ['090', 0], ['180', 90], ['270', 180]] as const).forEach(([n, a]) => { const p = pt(ox, oy, 412 * k, a); if (p[0] > W0 - 24 || p[0] < 24) return; S('text', { x: R2(p[0]), y: R2(p[1]), 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: W, 'fill-opacity': .42, 'font-size': R2(Math.max(10, 11 * k)), 'font-weight': 500, 'letter-spacing': '1.1' }, ns).textContent = n; });
        r.sweep = sweepSprite(near, ox, oy, 56 * k, RB + 28 * k, 74, { alpha: .2, z: 1 });
        gsap.set(r.sweep.div, { rotation: -90 });
        const ro = $('.sec__readout', el); ro.style.left = R2(ox - sr.x) + 'px'; ro.style.top = R2(oy + 148 * k - sr.y - 28 * k) + 'px';
      } else {
        P(ns, circD(ox, oy, 26 * k), { stroke: rgba(W, .18), fill: 'none' });
        r.ring = P(ns, circD(ox, oy, RB), { stroke: rgba(W, .16), fill: 'none' });
        r.ticks = tickSegs(ns, ox, oy, RB, -90, 267, 3, 5 * k, 12, 10 * k, rgba(W, .4), { seg: 30 });
        r.arc = S('g', null, ns);
        P(r.arc, arcD(ox, oy, SA, -150, -30), { stroke: rgba(V3, .5), 'stroke-width': 7, 'stroke-linecap': 'round', fill: 'none', opacity: .45 });
        P(r.arc, arcD(ox, oy, SA, -150, -30), { stroke: W, 'stroke-opacity': .95, 'stroke-width': 2.5, 'stroke-linecap': 'round', fill: 'none' });
        r.sigs = [-150, -30].map(a => { const p = pt(ox, oy, SA, a), g = S('g', null, ns); CI(g, p[0], p[1], 9 * k, { fill: rgba(INK, .6), stroke: rgba(W, .5) }); gdot(ns, g, p[0], p[1], 4 * k, W, V3, 12 * k); return g; });
        ([['01', -150, .85], ['02', -30, .85], ['03', 90, .45]] as const).forEach(([n, a, op]) => { const p = pt(ox, oy, 184 * k, a); S('text', { x: R2(p[0]), y: R2(p[1]), 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: W, 'fill-opacity': op, 'font-size': R2(12 * k), 'font-weight': 500, 'letter-spacing': '1.2' }, ns).textContent = n; });
        const sweep = r.sweep = sweepSprite(near, ox, oy, 16 * k, RB, 144, { alpha: .34, n: 16, z: 1 });
        sweep.trail.querySelectorAll('path').forEach(p => p.setAttribute('fill', rg(sweep.svg, 0, 0, RB, [[0, V3, 1], [.6, BLUE, .8], [1, V5, .45]])));
        gsap.set(sweep.div, { rotation: -6 });
        const sp = pt(ox, oy, SA, 90); r.sbC = sp; r.sbRing = CI(ns, sp[0], sp[1], 10 * k, { fill: 'none', stroke: rgba(W, .5), opacity: 0 });
        const chip = $('.sec__chip', el); chip.style.top = R2(oy - sr.y - 108 * k - 12) + 'px';
      }
      CI(ns, ox, oy, 13 * k, { fill: 'none', stroke: rgba(W, .5) });
      CI(ns, ox, oy, 34 * k, { fill: rg(ns, ox, oy, 34 * k, [[0, W, .6], [.3, V1, .25], [1, V1, 0]]) });
      r.origin = gdot(ns, ns, ox, oy, (D ? 5 : 4) * k, W, MIST, 16 * k);
      // boundary into the paper chapter: upper half of the glowing seam dot
      r.seam = gdot(ns, ns, W0 / 2, H0, (D ? 4.5 : 4) * k, V5, BLUE, 16 * k);
      { const Sx = D ? 7 : 3.4, rr = 60 * k * Sx, b = boxEl(near, ox - rr - Sx, oy - rr - Sx, 2 * (rr + Sx), 2 * (rr + Sx)); CI(b.g, ox, oy, rr, { fill: 'none', stroke: rgba(MIST, .6), 'stroke-width': Sx }); b.div.classList.add('sripple'); b.div.style.setProperty('--s0', (.5 / Sx).toFixed(4)); r.ripple = b.div; }
      r.L = { far, glow, mid, near }; r.keys = $$('.key', el);
      return r;
    },
    parallax(c) { const r = c.refs; ch.radialPar(c, [[r.L.far, .02, 16, r.o[0], r.o[1]], [r.L.glow, .02, 8, r.o[0], r.o[1]]]); },
    intro(c) {
      const r = c.refs, el = c.el, tl = gsap.timeline(), [ox, oy] = r.o, O = `${ox} ${oy}`, D = r.D;
      const lit = r.blades.filter(b => b.lit);
      tl.add(() => { r.keys.forEach((k2, i) => { if (i < 2) k2.classList.add('is-wait'); }); }, 0);
      tl.set(lit.map(b => b.litG), { opacity: 0 }, 0); tl.set(r.sglow, { opacity: 0 }, 0); tl.set([r.arc, ...r.sigs], { opacity: 0 }, 0);
      ch.headIn(tl, $('.head', el), .1);
      tl.from(r.rays, { opacity: 0, duration: 1.2, ease: SOFT, stagger: .02 }, 0);
      tl.from(r.waves, { opacity: 0, scale: .85, svgOrigin: O, duration: 1.2, ease: SOFT, stagger: .05 }, 0);
      tl.from(r.bloom, { opacity: 0, scale: .6, svgOrigin: O, duration: 1.2, ease: SOFT }, 0);
      r.blades.forEach((b, i) => tl.from(b.g, { opacity: 0, scale: .3, svgOrigin: O, duration: .9, ease: 'expo.out' }, .3 + i * .12));
      tl.from(r.ticks, { opacity: 0, duration: .4, ease: SOFT, stagger: .03 }, .6);
      if (r.swept) tl.from(r.swept, { opacity: 0, duration: .4, stagger: .06 }, 1.2);
      tl.from(r.keys, { y: 16, opacity: 0, duration: .8, ease: 'expo.out', stagger: .1, clearProps: 'transform,opacity' }, .5);
      if (!D) tl.from($('.sec__chip', el), { opacity: 0, y: 8, duration: .6, ease: 'expo.out' }, 2.3);
      const from = D ? -164 : -170, to = D ? -90 : -6, o = { h: from }, signed = [false, false];
      tl.fromTo(o, { h: from }, { h: to, duration: D ? 1.4 : 1.8, ease: 'power2.inOut', onUpdate: () => {
        gsap.set(r.sweep.div, { rotation: o.h });
        lit.forEach((b, i) => { if (!signed[i] && o.h >= b.a) { signed[i] = true; run.track(gsap.to(b.litG, { opacity: 1, duration: .5, ease: SOFT })); r.keys[i].classList.remove('is-wait'); run.track(gsap.fromTo($('.key__chip', r.keys[i]), { scale: 1.18 }, { scale: 1, duration: .6, ease: 'expo.out' })); } });
      } }, .8);
      tl.to([r.arc, ...r.sigs], { opacity: 1, duration: .5, ease: SOFT, stagger: .05 }, D ? 2.2 : 2.6);
      tl.fromTo(r.sglow, { opacity: 0 }, { opacity: 1, duration: .3, ease: SOFT }, D ? 2.2 : 2.6).to(r.sglow, { opacity: .75, duration: .6, ease: SOFT });
      if (D) { const ro = $('.sec__readout', el), n = $('.sec__n', ro); tl.from(ro, { opacity: 0, y: 10, duration: .5, ease: 'expo.out' }, 2.2); const q = { v: 0 }; tl.fromTo(q, { v: 0 }, { v: 2, duration: .5, ease: 'expo.out', onUpdate: () => { n.textContent = String(Math.round(q.v)); } }, 2.2); }
      return tl;
    },
    loops(c) {
      const r = c.refs, sb = gsap.timeline({ repeat: -1, repeatDelay: .9 });
      sb.fromTo(r.sbRing, { opacity: .8, scale: .5, svgOrigin: `${R2(r.sbC[0])} ${R2(r.sbC[1])}` }, { opacity: 0, scale: 2.2, duration: 1.5, ease: SOFT });
      ch.onScreen(c, sb);
      ch.onScreenCls(c, [r.ripple]);
    }
  };
}
