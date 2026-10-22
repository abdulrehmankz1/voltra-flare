import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Env, FaqState, Spec } from "./chapters";
import type { Run } from "./runtime";
import { arcD, arcs, blurEl, CI, gdot, type Layer, layer, lg, mkSVG, nextId, P, rayD, rays, rel, rg, S, secD, type Svg } from "./svg-kit";
import { $, $$, BLUE, isD, kD, kM, MIST, pt, R2, range, rgba, SOFT, V1, V3, V5, V7, V9, W } from "./utils";

/* ---------- 08 faq: the index dial ---------- */
export type Dial = {
  svg: Svg; DX: number; DY: number; R: number; IDX: number[]; start: number; k: number; D: boolean;
  glowP: SVGPathElement; glowEl: HTMLDivElement; pulses?: SVGPathElement[];
  rings: SVGPathElement[]; tickDim: SVGPathElement; clip: SVGPathElement; tickLit: SVGPathElement; idxT: SVGPathElement[];
  trail: SVGPathElement; hand: SVGGElement; labels: SVGTextElement[]; h: number;
};
type DialBase = Pick<Dial, 'svg' | 'DX' | 'DY' | 'R' | 'IDX' | 'start' | 'k' | 'D' | 'glowP' | 'glowEl' | 'pulses'>;

function buildDial(base: DialBase): Dial {
  const dl = base as Dial;
  const { svg, DX, DY, R, IDX, start, k, D } = dl;
  const a0 = D ? -180 : 0, a1 = D ? 0 : 180;
  dl.rings = arcs(svg, DX, DY, D ? [48, 96, 144].map(v => v * k) : [], a0, a1, rg(svg, DX, DY, R, [[0, W, .16], [1, W, .06]]));
  P(svg, arcD(DX, DY, R, a0, a1), { stroke: rgba(W, .3), fill: 'none' });
  const step = D ? 2 : 3, all = range(a0 + (D ? 0 : 3), a1 - (D ? 0 : 3), step).filter(a => !IDX.some(i => Math.abs(i - a) < 1e-6)), len = (a: number) => (Math.abs(a % 12) < 1e-6 ? (D ? 12 : 9) : (D ? 6 : 5)) * k;
  const td = all.map(a => rayD(DX, DY, R, R + len(a), a)).join('');
  dl.tickDim = P(svg, td, { stroke: rgba(W, .3), fill: 'none' });
  const clip = S('clipPath', { id: nextId() }, svg.defs); dl.clip = P(clip, 'M0 0Z');
  dl.tickLit = P(svg, td, { stroke: rgba(W, .9), fill: 'none', 'clip-path': `url(#${clip.id})` });
  dl.idxT = IDX.map(a => P(svg, rayD(DX, DY, R, R + (D ? 24 : 16) * k, a), { stroke: rgba(W, .5), 'stroke-width': 1.5, 'stroke-linecap': 'round', fill: 'none' }));
  dl.trail = P(svg, 'M0 0Z', { fill: lg(svg, DX - R, DY, DX, DY - R, [[0, MIST, 0], [1, V1, .2]]) });
  dl.hand = S('g', null, svg);
  const hr = D ? 30 * k : 14 * k;
  P(dl.hand, rayD(DX, DY, hr, R, 0), { stroke: rgba(V3, .4), 'stroke-width': 5, 'stroke-linecap': 'round', fill: 'none', opacity: .5 });
  P(dl.hand, rayD(DX, DY, hr, R, 0), { stroke: W, 'stroke-opacity': .95, 'stroke-width': 1.5, 'stroke-linecap': 'round', fill: 'none' });
  gdot(svg, dl.hand, DX + R, DY, 3 * k, W, V3, 12 * k);
  if (D) P(svg, arcD(DX, DY, 22 * k, -180, 0), { stroke: rgba(W, .45), fill: 'none' });
  gdot(svg, svg, DX, DY, 4 * k, W, V1, 16 * k);
  dl.labels = IDX.map((a, i) => { const p = pt(DX, DY, R + (D ? 44 : 28) * k, a), t = S('text', { x: R2(p[0]), y: R2(p[1]), 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: W, 'fill-opacity': .42, 'font-size': R2(D ? Math.max(11, 13 * k) : 11 * k), 'font-weight': 500, 'letter-spacing': '1.2' }, svg); t.textContent = '0' + (i + 1); return t; });
  dl.h = start; setDialH(dl, start);
  return dl;
}
function setDialH(dl: Dial, h: number) {
  const { DX, DY, R, start, k, D } = dl, lo = Math.min(start, h), hi = Math.max(start, h);
  dl.h = h; dl.hand.setAttribute('transform', `rotate(${R2(h)} ${R2(DX)} ${R2(DY)})`);
  const span = hi - lo;
  dl.trail.setAttribute('d', span > .2 ? secD(DX, DY, (D ? 30 : 14) * k, R, lo, hi) : 'M0 0Z');
  dl.clip.setAttribute('d', span > .2 ? secD(DX, DY, 0, R + 40 * k, lo - .5, hi + .5) : 'M0 0Z');
  dl.glowP.setAttribute('d', secD(DX, DY, (D ? 30 : 14) * k, R + (D ? 30 : 24) * k, D ? lo : Math.max(lo - 4, 0), D ? Math.min(hi + 4, 0) : hi));
  dl.hand.setAttribute('opacity', span < .5 ? '0' : '1');
  dl.labels.forEach((t, i) => t.setAttribute('fill-opacity', String(Math.abs(dl.IDX[i] - h) < 6 ? 1 : .42)));
  dl.idxT.forEach((t, i) => t.setAttribute('stroke', rgba(W, Math.abs(dl.IDX[i] - h) < 6 ? 1 : .5)));
}
function setDialIndex(run: Run, FAQ: FaqState, i: number, anim = true) {
  const dl = FAQ.dial; if (!dl) return; const to = i < 0 ? dl.start : dl.IDX[i];
  if (!anim || run.reduce) { setDialH(dl, to); return; }
  const o = { h: dl.h }; run.track(gsap.to(o, { h: to, duration: .55, ease: 'power4.inOut', overwrite: true, onUpdate: () => setDialH(dl, o.h) }));
}

type Refs = {
  rays: SVGPathElement[]; bloom: SVGEllipseElement; origin: SVGGElement; dial: Dial; seam2?: SVGGElement;
  L: { far: Layer; glow: Layer; near: Layer }; list: HTMLElement;
};

export function faq(env: Env): Spec<Refs> {
  const { run, ch } = env, FAQ = env.faq, RM = run.reduce;
  return {
    clean(c) { const dl = c.el.querySelector('.faq__dial'); if (dl) dl.innerHTML = ''; },
    build(c) {
      const el = c.el, art = $(':scope > .art', el), W0 = el.offsetWidth, H0 = el.offsetHeight, D = isD(), k = D ? kD() : kM();
      const base = layer(art, 'base', W0, H0).svg;
      S('rect', { width: W0, height: H0, fill: rg(base, W0 / 2, 0, W0 * (D ? .3 : .82), [[0, V5, .22], [.5, V7, .08], [1, V9, 0]], H0 * (D ? .5 : .3)) }, base);
      const far = layer(art, 'far', W0, H0), fs = far.svg;
      const raysE = rays(fs, W0 / 2, 0, (D ? 24 : 124) * k, (D ? 1000 : 760) * k, range(12, 168, 12), rg(fs, W0 / 2, 0, (D ? 520 : 560) * k, [[0, W, .16], [D ? .4 : .3, W, D ? .04 : .06], [1, W, 0]]));
      const glow = layer(art, 'glow', W0, H0), gs = glow.svg;
      const bloom = S('ellipse', { cx: R2(W0 / 2), cy: 0, rx: R2((D ? 340 : 230) * k), ry: R2((D ? 130 : 120) * k), fill: rg(gs, W0 / 2, 0, (D ? 340 : 230) * k, [[0, MIST, .42], [.45, BLUE, .14], [1, V5, 0]], (D ? 130 : 120) * k) }, gs);
      if (!D) S('ellipse', { cx: R2(W0 / 2), cy: R2(H0), rx: R2(210 * k), ry: R2(72 * k), fill: rg(gs, W0 / 2, H0, 210 * k, [[0, BLUE, .34], [.5, V5, .1], [1, V5, 0]], 72 * k) }, gs);
      const near = layer(art, 'near', W0, H0), ns = near.svg;
      S('rect', { x: 0, y: 0, width: W0, height: 1, fill: lg(ns, 0, 0, W0, 0, [[0, W, 0], [.5, W, .55], [1, W, 0]]) }, ns);
      CI(ns, W0 / 2, 0, (D ? 16 : 12) * k, { fill: 'none', stroke: rgba(W, .35) });
      const origin = gdot(ns, ns, W0 / 2, 0, 5 * k, W, V3, 16 * k);
      // the index dial
      const list = $('.qas', el); let dialBase: DialBase, seam2: SVGGElement | undefined;
      if (D) {
        const host = $('.faq__dial', el), hr = rel(host, el), lr = rel(list, el), svg = mkSVG(host, hr.w, hr.h);
        const DX = 320 * k, DY = hr.h - .5, R = 184 * k;
        S('rect', { x: R2(112 * k), y: R2(hr.h - 1), width: R2(lr.x - hr.x - 112 * k), height: 1, fill: rgba(W, .1) }, svg);
        const gl = blurEl(host, DX - R - 30 * k, DY - R - 30 * k, 2 * R + 60 * k, R + 30 * k, 20 * k); const glowP = P(gl.g, secD(DX, DY, 30 * k, R + 30 * k, -180, -140), { fill: rgba(BLUE, .5) }); host.appendChild(svg);
        dialBase = { svg, DX, DY, R, IDX: [-144, -108, -72, -36], start: -180, k, D, glowP, glowEl: gl.div };
      } else {
        const svg = ns, DX = W0 / 2, DY = 0, R = 80 * k;
        const gl = blurEl(glow, DX - R - 24 * k, 0, 2 * R + 48 * k, R + 24 * k, 12 * k); const glowP = P(gl.g, secD(DX, DY, 14 * k, R + 24 * k, 140, 180), { fill: rgba(BLUE, .5) });
        const pulses = [28, 52].map((q, i) => P(svg, arcD(DX, DY, q * k, 0, 180), { stroke: rgba(W, i ? .16 : .3), fill: 'none' }));
        seam2 = gdot(ns, ns, W0 / 2, H0, 4 * k, W, V3, 14 * k);
        dialBase = { svg, DX, DY, R, IDX: [144, 108, 72, 36], start: 180, k, D, glowP, glowEl: gl.div, pulses };
      }
      const dial = buildDial(dialBase);
      return { rays: raysE, bloom, origin, dial, seam2, L: { far, glow, near }, list };
    },
    parallax(c) { const r = c.refs; ch.radialPar(c, [[r.L.far, .02, 12, c.el.offsetWidth / 2, 0], [r.L.glow, .02, 8, c.el.offsetWidth / 2, 0]]); },
    intro(c) {
      const r = c.refs, el = c.el, tl = gsap.timeline(), dl = r.dial, O = `${R2(dl.DX)} ${R2(dl.DY)}`;
      ch.headIn(tl, $('.head', el), 0);
      tl.from(r.rays, { opacity: 0, duration: .8, ease: SOFT, stagger: .03 }, 0);
      tl.from(r.bloom, { opacity: 0, duration: 1, ease: SOFT }, .1);
      if (dl.rings.length) tl.from(dl.rings, { opacity: 0, scale: .6, svgOrigin: O, duration: .8, ease: 'expo.out', stagger: .08 }, .3);
      tl.from(dl.tickDim, { opacity: 0, duration: .8, ease: 'power4.inOut' }, .3);
      tl.from(dl.labels, { opacity: 0, duration: .5, stagger: .08 }, .5);
      const o = { h: dl.start }; tl.fromTo(o, { h: dl.start }, { h: dl.IDX[0], duration: .8, ease: 'power4.inOut', onUpdate: () => setDialH(dl, o.h) }, .6);
      tl.from($$('.qa', el), { y: 16, opacity: 0, duration: .6, ease: 'expo.out', stagger: .08, clearProps: 'transform,opacity' }, .2);
      return tl;
    },
    always(c) { FAQ.dial = c.refs.dial; const open = $$('.qa', c.el).findIndex(q => q.classList.contains('is-open')); if (c.revealed || RM) setDialIndex(run, FAQ, open, false); }
  };
}

/* ===================== interactions: the accordion ===================== */
export function accordion(run: Run, FAQ: FaqState): void {
  const { reduce: RM, signal } = run;
  const items = $$('.qa'), dialHost = document.querySelector<HTMLElement>('.faq__dial');
  items.forEach((it, i) => $('.qa__q', it).addEventListener('click', () => toggle(i), { signal }));
  const setOpen = (x: HTMLElement, on: boolean) => { x.classList.toggle('is-open', on); $('.qa__q', x).setAttribute('aria-expanded', on ? 'true' : 'false'); $('.qa__a', x).hidden = !on; };
  let refreshT = 0;
  FAQ.open = qa => { const i = items.indexOf(qa); if (i >= 0 && !qa.classList.contains('is-open')) toggle(i); };
  function toggle(i: number) {
    const it = items[i], willOpen = !it.classList.contains('is-open'), others = items.filter(x => x !== it && x.classList.contains('is-open'));
    const watch = items.concat(dialHost && dialHost.offsetParent ? [dialHost] : []);
    const first = watch.map(el => el.getBoundingClientRect().top), h0 = items.map(x => x.offsetHeight);
    others.forEach(x => setOpen(x, false)); setOpen(it, willOpen);
    const last = watch.map(el => el.getBoundingClientRect().top), h1 = items.map(x => x.offsetHeight);
    setDialIndex(run, FAQ, willOpen ? i : -1);
    if (!RM) {
      watch.forEach((el, j) => { const dy = first[j] - last[j]; if (Math.abs(dy) > .5) run.track(gsap.fromTo(el, { y: dy }, { y: 0, duration: .55, ease: 'power4.inOut', overwrite: 'auto', clearProps: 'transform' })); });
      items.forEach((x, j) => { if (h0[j] !== h1[j] && x.classList.contains('is-open')) run.track(gsap.fromTo($('.qa__bg', x), { scaleY: h0[j] / Math.max(1, h1[j]) }, { scaleY: 1, duration: .55, ease: 'power4.inOut', clearProps: 'transform' })); });
      if (willOpen) run.track(gsap.fromTo(it.querySelector('.qa__a p'), { opacity: 0, y: 10 }, { opacity: .72, y: 0, duration: .6, ease: 'expo.out', delay: .12, clearProps: 'opacity,transform' }));
    }
    run.clearTimeout(refreshT); refreshT = run.setTimeout(() => { ScrollTrigger.refresh(); }, 650);
  }
}
