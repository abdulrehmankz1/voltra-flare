import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Chapter, Env, Spec } from "./chapters";
import { arcD, arcs, blurEl, boxEl, CI, gdot, half, type Layer, layer, lg, nextId, P, rayD, rays, rel, rg, S, secBox, secD, type Sweep, sweepSprite, tickSegs, withDefs } from "./svg-kit";
import { $, $$, BLUE, INK, isD, kD, kM, MIST, pt, R2, range, rgba, SOFT, sstep, V1, V3, V5, V7, V9, W } from "./utils";

/* ---------- 03 features ---------- */
const FEAT_A = [-144, -108, -72, -36], FEAT_I = ['i-spark', 'i-lock', 'i-apps', 'i-swap'];

type Blade = { g: SVGGElement; lit: HTMLDivElement; wi: SVGUseElement; a: number };
type Refs = {
  blades: Blade[]; scanDone: boolean; o: [number, number]; k: number;
  rays: SVGPathElement[]; refl: SVGPathElement[]; waves: SVGPathElement[]; bloom: SVGPathElement;
  glows: HTMLDivElement[]; litWrap: HTMLDivElement;
  ring: SVGPathElement; ticks: SVGPathElement[]; hub: SVGPathElement[]; tips: SVGGElement[]; idx?: SVGTextElement[];
  origin: SVGGElement; sweep: Sweep; L: { far: Layer; glow: Layer; mid: Layer; near: Layer };
  caps?: HTMLElement[]; rows?: HTMLElement[]; pin: boolean;
};

function featApply(c: Chapter<Refs>, h: number, kk = 1) {
  const r = c.refs; gsap.set(r.sweep.div, { rotation: h });
  r.blades.forEach((b, i) => {
    const on = sstep((h - (b.a - 12)) / 10), nx = r.blades[i + 1], off = nx ? sstep((h - (nx.a - 12)) / 10) : 0, f = on * (1 - off) * kk;
    b.lit.style.opacity = String(R2(f)); b.wi.setAttribute('opacity', String(R2(1 - f))); r.glows[i].style.opacity = String(R2(f * .9));
    if (r.caps) r.caps[i].classList.toggle('is-dim', !(r.scanDone || h >= b.a - 12));
    if (r.rows) r.rows[i].classList.toggle('is-lit', f > .5);
  });
}
function featSweep(c: Chapter<Refs>, dur: number) {
  const r = c.refs, o = { h: -170, k: 1 }, fl = c.el.querySelector('.flist'), tl = gsap.timeline();
  tl.add(() => { o.h = -170; o.k = 1; featApply(c, -170); if (fl) fl.classList.add('is-scan'); });
  tl.fromTo(r.sweep.div, { opacity: 0 }, { opacity: 1, duration: .3, ease: SOFT });
  tl.to(o, { h: -6, duration: dur, ease: 'power2.inOut', onUpdate: () => featApply(c, o.h, o.k) }, '<');
  tl.add(() => { r.scanDone = true; if (r.caps) r.caps.forEach(cp => cp.classList.remove('is-dim')); });
  tl.to(o, { k: 0, duration: 1.2, ease: SOFT, delay: 1.2, onUpdate: () => featApply(c, o.h, o.k), onComplete: () => { if (fl) fl.classList.remove('is-scan'); } });
  tl.to(r.sweep.div, { opacity: 0, duration: .8, ease: SOFT }, '<');
  return tl;
}

export function features(env: Env): Spec<Refs> {
  const { run, ch } = env, RM = run.reduce;
  return {
    build(c) {
      const el = c.el, art = $(':scope > .art', el), W0 = el.offsetWidth, H0 = el.offsetHeight, fan = $('.fan', el), fr = rel(fan, el), blades: Blade[] = [];
      const D = isD(), k = D ? kD() : kM();
      const ox = W0 / 2, oy = D ? fr.y + 532 * k : fr.y + 262 * k;
      const R0 = (D ? 88 : 44) * k, R1 = (D ? 340 : 170) * k, RD = (D ? 372 : 186) * k;
      const base = layer(art, 'base', W0, H0).svg;
      S('rect', { width: W0, height: H0, fill: rg(base, ox, oy, (D ? 900 : 380) * k, [[0, V5, .5], [.3, V7, .28], [.7, V9, .08], [1, V9, 0]], (D ? 760 : 420) * k) }, base);
      S('rect', { width: W0, height: H0, fill: rg(base, W0 * .92, D ? H0 * .32 : H0 * .24, W0 * (D ? .36 : .55), [[0, V5, .12], [1, V5, 0]], D ? H0 * .42 : H0 * .2) }, base);
      S('rect', { width: W0, height: R2(110 * k), fill: lg(base, 0, 0, 0, 110 * k, [[0, INK, 1], [1, INK, 0]]) }, base);
      S('rect', { x: 0, y: R2(oy), width: W0, height: R2(H0 - oy + 2), fill: INK }, base);
      S('rect', { x: 0, y: R2(oy), width: W0, height: R2(H0 - oy + 2), fill: rg(base, ox, oy, (D ? 600 : 340) * k, [[0, BLUE, D ? .32 : .36], [.5, V7, .12], [1, V9, 0]], (D ? 140 : 260) * k) }, base);
      const far = layer(art, 'far', W0, H0), fs = far.svg;
      const raysE = rays(fs, ox, oy, (D ? 60 : 30) * k, (D ? 1400 : 760) * k, D ? range(-180, 0, 12) : range(-168, -12, 12), rg(fs, ox, oy, (D ? 1100 : 580) * k, [[0, W, .22], [.35, W, .07], [1, W, .01]]));
      const refl = rays(fs, ox, oy, (D ? 30 : 16) * k, (D ? 400 : 230) * k, range(12, 168, 12), rg(fs, ox, oy, (D ? 300 : 200) * k, [[0, W, .14], [.5, W, .04], [1, W, 0]]));
      const waves = arcs(fs, ox, oy, range((D ? 136 : 68) * k, (D ? 952 : 544) * k, (D ? 136 : 68) * k), -180, 0, rg(fs, ox, oy, (D ? 1000 : 580) * k, [[.1, W, .18], [.6, W, .06], [1, W, .02]]));
      if (!D) arcs(fs, ox, oy, range(68 * k, 408 * k, 68 * k), 0, 180, rg(fs, ox, oy, 420 * k, [[.1, W, .12], [.6, W, .03], [1, W, 0]]));
      const glow = layer(art, 'glow', W0, H0), gs = glow.svg;
      const bloom = half(gs, ox, oy, (D ? 300 : 150) * k, (D ? 300 : 150) * k, rg(gs, ox, oy, (D ? 300 : 150) * k, [[0, V1, .9], [.15, V3, .55], [.5, V5, .18], [1, V5, 0]]));
      half(gs, ox, oy, (D ? 220 : 120) * k, (D ? 70 : 36) * k, rg(gs, ox, oy, (D ? 220 : 120) * k, [[0, MIST, .35], [.5, BLUE, .12], [1, V5, 0]], (D ? 70 : 36) * k), false);
      const glows = FEAT_A.map(a => { const [bx, by, bw, bh] = secBox(ox, oy, R0, R1 + 40 * k, a - 14, a + 14), b = blurEl(glow, bx, by, bw, bh, (D ? 24 : 14) * k); P(b.g, secD(ox, oy, R0, R1 + 40 * k, a - 14, a + 14), { fill: rgba(BLUE, .7) }); b.div.style.opacity = '0'; b.div.style.willChange = 'opacity'; return b.div; });
      const mid = layer(art, 'mid', W0, H0), ms = mid.svg;
      const fB = rg(ms, ox, oy, R1, [[.2, MIST, .62], [.6, BLUE, .42], [1, V5, .3]]), sB = rg(ms, ox, oy, R1, [[.2, W, .6], [1, W, .2]]);
      const fL = rg(ms, ox, oy, R1, [[.2, W, 1], [.55, '#DCE6FF', 1], [1, V3, 1]]), sL = rg(ms, ox, oy, R1, [[.2, W, .9], [1, W, .2]]);
      const icR = (D ? 214 : 108) * k, icS = (D ? 24 : 18) * k;
      const litWrap = document.createElement('div'); litWrap.className = 'lay'; mid.appendChild(litWrap);
      FEAT_A.forEach((a, i) => {
        const g = S('g', null, ms);
        P(g, secD(ox, oy, R0, R1, a - 12, a + 12), { fill: fB, stroke: sB });
        P(g, arcD(ox, oy, R1 - .5, a - 12, a + 12), { stroke: rgba(W, .55), 'stroke-width': 1.5, fill: 'none' });
        const ip = pt(ox, oy, icR, a);
        const wi = S('use', { href: '#' + FEAT_I[i], x: R2(ip[0] - icS / 2), y: R2(ip[1] - icS / 2), width: R2(icS), height: R2(icS), style: 'color:#fff' }, g);
        const lq = secBox(ox, oy, R0, R1, a - 12, a + 12), lb = boxEl(litWrap, lq[0] - 3, lq[1] - 3, lq[2] + 6, lq[3] + 6), lit = lb.div;
        lit.style.opacity = '0'; lit.style.willChange = 'opacity';
        P(lb.g, secD(ox, oy, R0, R1, a - 12, a + 12), { fill: fL, stroke: sL });
        P(lb.g, arcD(ox, oy, R1 - .5, a - 12, a + 12), { stroke: rgba(W, .95), 'stroke-width': 1.5, fill: 'none' });
        S('use', { href: '#' + FEAT_I[i], x: R2(ip[0] - icS / 2), y: R2(ip[1] - icS / 2), width: R2(icS), height: R2(icS), style: 'color:#0F238F' }, lb.g);
        blades.push({ g, lit, wi, a });
      });
      const near = layer(art, 'near', W0, H0), ns = near.svg;
      S('rect', { x: 0, y: R2(oy - .5), width: W0, height: 1, fill: lg(ns, 0, 0, W0, 0, [[0, W, 0], [.5, W, .6], [1, W, 0]]) }, ns);
      const ring = P(ns, arcD(ox, oy, RD, -168, -12), { stroke: rgba(W, .22), fill: 'none' });
      const ticks = tickSegs(ns, ox, oy, RD, -168, -12, D ? 2 : 3, (D ? 6 : 4) * k, 12, (D ? 14 : 8) * k, rgba(W, .3));
      P(ns, arcD(ox, oy, (D ? 56 : 28) * k, -180, 0), { stroke: rgba(W, .4), fill: 'none' });
      const hub = tickSegs(ns, ox, oy, (D ? 44 : 20) * k, -168, -12, 12, (D ? 6 : 4) * k, 12, (D ? 6 : 4) * k, rgba(W, .5), { seg: 200 });
      const tips = FEAT_A.map(a => { const p = pt(ox, oy, R1 + (D ? 12 : 8) * k, a), g = gdot(ns, ns, p[0], p[1], (D ? 3 : 2.5) * k, W, V3, (D ? 12 : 9) * k); if (D) P(g, rayD(ox, oy, R1 + 20 * k, 392 * k, a), { stroke: rgba(W, .5), fill: 'none' }); return g; });
      const idx = !D ? FEAT_A.map((a, i) => { const p = pt(ox, oy, RD + 22 * k, a), t = S('text', { x: R2(p[0]), y: R2(p[1]), 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: i === 0 ? W : V3, 'font-size': R2(11 * k), 'font-weight': 500, 'letter-spacing': '1.1' }, ns); t.textContent = '0' + (i + 1); return t; }) : undefined;
      CI(ns, ox, oy, 9 * k, { fill: 'none', stroke: rgba(W, .5) });
      CI(ns, ox, oy, 30 * k, { fill: rg(ns, ox, oy, 30 * k, [[0, W, .55], [.35, V1, .22], [1, V1, 0]]) });
      const origin = gdot(ns, ns, ox, oy, (D ? 5 : 3.5) * k, W, V1, 18 * k);
      const sweep = sweepSprite(near, ox, oy, (D ? 64 : 32) * k, RD, 42, { alpha: .22, z: 1 });
      const r: Refs = { blades, scanDone: false, o: [ox, oy], k, rays: raysE, refl, waves, bloom, glows, litWrap, ring, ticks, hub, tips, idx, origin, sweep, L: { far, glow, mid, near }, pin: false };
      // captions around the fan (desktop) and the list glyphs (mobile)
      if (D) {
        const caps = $$('.cap', el);
        caps.forEach(cp => { cp.style.left = '0px'; cp.style.top = '0px'; });
        const hs = caps.map(cp => cp.offsetHeight);
        caps.forEach((cp, i) => {
          const a = +(cp.dataset.a ?? ''), an = pt(ox, oy, 400 * k, a), left = a < -90, outer = Math.abs(a + 90) > 36, cw = cp.offsetWidth;
          const x = left ? (outer ? an[0] - 8 * k - cw : ox - 24 * k - cw) : (outer ? an[0] + 8 * k : ox + 24 * k);
          cp.style.left = R2(x - fr.x) + 'px'; cp.style.top = R2(an[1] - 16 * k - hs[i] - fr.y) + 'px';
        });
        r.caps = caps;
      } else {
        $$('.frow', el).forEach((row, i) => {
          const s0 = $<SVGSVGElement>('.frow__g', row); s0.innerHTML = ''; const sv = withDefs(s0);
          FEAT_A.forEach(a => P(sv, secD(24, 30, 5, 24, a - 12, a + 12), { fill: rgba(W, .2) }));
          const fid = nextId(), fl = S('filter', { id: fid, x: '-50%', y: '-50%', width: '200%', height: '200%' }, sv.defs); S('feGaussianBlur', { stdDeviation: 3 }, fl);
          P(sv, secD(24, 30, 5, 24, FEAT_A[i] - 12, FEAT_A[i] + 12), { fill: BLUE, filter: `url(#${fid})`, class: 'blade-glow' });
          P(sv, secD(24, 30, 5, 24, FEAT_A[i] - 12, FEAT_A[i] + 12), { fill: rg(sv, 24, 30, 24, [[.2, W], [.6, '#DCE6FF'], [1, V3]]) });
          CI(sv, 24, 30, 1.5, { fill: W });
        });
        r.rows = $$('.frow', el);
      }
      r.pin = D && innerHeight >= 600;
      return r;
    },
    parallax(c) { const r = c.refs; ch.radialPar(c, [[r.L.far, .02, 16, r.o[0], r.o[1]], [r.L.glow, .02, 10, r.o[0], r.o[1]]]); },
    intro(c) {
      const r = c.refs, el = c.el, tl = gsap.timeline(), [ox, oy] = r.o, O = `${ox} ${oy}`;
      ch.headIn(tl, $('.hrow', el), 0);
      r.rays.forEach((ry, i) => tl.from(ry, { opacity: 0, scale: .35, svgOrigin: O, duration: .9, ease: 'expo.out' }, i * .035));
      tl.from(r.refl, { opacity: 0, duration: .9, ease: SOFT, stagger: .02 }, .2);
      tl.from(r.waves, { opacity: 0, scale: .9, svgOrigin: O, duration: 1, ease: SOFT, stagger: .05 }, .1);
      tl.from(r.bloom, { opacity: 0, scale: .6, svgOrigin: O, duration: .9, ease: SOFT }, .3);
      r.blades.forEach((b, i) => tl.from(b.g, { opacity: 0, scale: .25, svgOrigin: O, duration: .9, ease: 'expo.out' }, .4 + i * .1));
      tl.from(r.litWrap, { opacity: 0, scale: .25, transformOrigin: `${R2(ox)}px ${R2(oy)}px`, duration: .9, ease: 'expo.out', clearProps: 'transform,opacity' }, .4);
      tl.from(r.ticks, { opacity: 0, duration: .5, ease: SOFT, stagger: .05 }, .6);
      tl.from([r.ring, ...r.hub], { opacity: 0, duration: .8, ease: SOFT }, .6);
      tl.from(r.tips, { opacity: 0, scale: 0, transformOrigin: '50% 50%', duration: .6, ease: 'back.out(2)', stagger: .08 }, 1.0);
      if (r.idx) tl.from(r.idx, { opacity: 0, duration: .5, stagger: .08 }, 1.0);
      tl.from(r.sweep.div, { opacity: 0, duration: .6 }, .8);
      if (r.caps) tl.from(r.caps, { y: 12, opacity: 0, duration: .7, ease: 'expo.out', stagger: .1, clearProps: 'transform,opacity' }, .9);
      if (r.rows) tl.from(r.rows, { y: 16, opacity: 0, duration: .7, ease: 'expo.out', stagger: .08, clearProps: 'transform,opacity' }, .5);
      if (r.pin) featApply(c, -128); else { featApply(c, -170); gsap.set(r.sweep.div, { opacity: 0 }); tl.add(featSweep(c, 4.8), 1.3); }
      return tl;
    },
    after(c, already) { if (already && !c.refs.pin) { c.refs.scanDone = true; featApply(c, -6, 0); gsap.set(c.refs.sweep.div, { opacity: 0 }); } },
    // (the original also took this path without GSAP; the bundled GSAP is always present)
    always(c) { if (RM) { c.refs.scanDone = true; featApply(c, -128); } },
    loops(c) {
      const r = c.refs;
      if (r.pin) {
        const o = { h: -128 }; featApply(c, -128);
        ScrollTrigger.create({ trigger: c.el, pin: true, start: () => (c.el.offsetHeight > innerHeight ? 'bottom bottom' : 'top top'), end: () => '+=' + Math.round(innerHeight * .95), scrub: .7, invalidateOnRefresh: true, animation: gsap.fromTo(o, { h: -128 }, { h: 2, ease: 'none', onUpdate: () => featApply(c, o.h) }) });
      } else {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2, delay: 8.6 }); tl.add(featSweep(c, 4.8)); ch.onScreen(c, tl);
      }
      const pl = gsap.timeline({ repeat: -1, repeatDelay: .6 }); pl.fromTo(r.origin, { opacity: 1 }, { opacity: .55, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: 1 }); ch.onScreen(c, pl);
    }
  };
}
