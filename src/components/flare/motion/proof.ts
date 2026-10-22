import { gsap } from "gsap";
import type { Env, Spec } from "./chapters";
import { arcs, CI, gdot, type Layer, layer, lg, P, rayD, rays, rel, rg, S, type Sweep, sweepSprite } from "./svg-kit";
import { $, $$, BLUE, clamp, INK, isD, kD, kM, MIST, pt, R2, range, rgba, SOFT, V3, V5, V7, V9, W } from "./utils";

/* ---------- 02 proof ---------- */
type Refs = {
  o: [number, number];
  rays: SVGPathElement[];
  bloom?: SVGEllipseElement; pulse?: SVGGElement;
  rings?: SVGPathElement[]; sweep?: Sweep;
  blips?: { g: SVGGElement; a: number; s: number }[];
  L: { far: Layer; glow?: Layer; near: Layer };
};

export function proof(env: Env): Spec<Refs> {
  const { ch } = env;
  return {
    clean() { },
    build(c) {
      const el = c.el, art = $(':scope > .art', el);
      const W0 = el.offsetWidth, H0 = el.offsetHeight;
      if (isD()) {
        const k = kD(), ox = W0 / 2, oy = -48 * k;
        const base = layer(art, 'base', W0, H0).svg;
        S('rect', { width: W0, height: H0, fill: rg(base, ox, oy, 700 * k, [[0, BLUE, .42], [.5, V7, .14], [1, V9, 0]], 160 * k) }, base);
        const far = layer(art, 'far', W0, H0), fs = far.svg;
        const gR = rg(fs, ox, oy, 500 * k, [[0, W, .16], [.4, W, .05], [1, W, 0]]), gDv = rg(fs, ox, oy, 420 * k, [[0, W, .34], [.5, W, .1], [1, W, .02]]);
        const raysE = range(12, 168, 12).map(a => P(fs, rayD(ox, oy, 36 * k, 900 * k, a), { stroke: [36, 90, 144].includes(a) ? gDv : gR, fill: 'none' }));
        const glow = layer(art, 'glow', W0, H0);
        const bloom = S('ellipse', { cx: R2(ox), cy: R2(oy), rx: R2(260 * k), ry: R2(90 * k), fill: rg(glow.svg, ox, oy, 260 * k, [[0, MIST, .4], [.5, BLUE, .14], [1, V5, 0]], 90 * k) }, glow.svg);
        const near = layer(art, 'near', W0, H0), p = pt(ox, oy, 330 * k, 90);
        const pulse = gdot(near.svg, near.svg, p[0], p[1], 2.5 * k, W, V3, 10 * k, .5);
        return { o: [ox, oy], rays: raysE, bloom, pulse, L: { far, glow, near } };
      }
      const box = $('.proof__radar .art', el), rb = rel($('.proof__radar', el), el), m = kM();
      Object.assign(box.style, { left: R2(-rb.x) + 'px', top: R2(-rb.y) + 'px', width: W0 + 'px', height: H0 + 'px', right: 'auto', bottom: 'auto' }); box.classList.add('art--fade');
      const w = W0, h = H0, cx = rb.x + rb.w / 2, cy = rb.y + rb.h / 2;
      const base = layer(box, 'base', w, h).svg;
      CI(base, cx, cy, 130 * m, { fill: rg(base, cx, cy, 130 * m, [[0, V5, .5], [.5, V7, .16], [1, V7, 0]]) });
      const far = layer(box, 'far', w, h), fs = far.svg;
      const rings = arcs(fs, cx, cy, range(40 * m, 240 * m, 40 * m), -180, 180, rg(fs, cx, cy, 240 * m, [[0, W, .24], [1, W, .05]]));
      const raysE = rays(fs, cx, cy, 40 * m, 250 * m, range(0, 348, 12), rg(fs, cx, cy, 250 * m, [[0, W, .12], [1, W, .02]]));
      S('rect', { x: 0, y: R2(cy - .5), width: w, height: 1, fill: lg(fs, 0, 0, w, 0, [[0, W, 0], [.5, W, .28], [1, W, 0]]) }, fs);
      S('rect', { x: R2(cx - .5), y: 0, width: 1, height: h, fill: lg(fs, 0, 0, 0, h, [[0, W, 0], [.5, W, .28], [1, W, 0]]) }, fs);
      const sweep = sweepSprite(box, cx, cy, 0, 240 * m, 72, { alpha: .5, n: 12, z: 1 });
      sweep.trail.querySelectorAll('path').forEach(p => p.setAttribute('fill', rg(sweep.svg, 0, 0, 236 * m, [[0, BLUE, 1], [1, V5, .5]])));
      const near = layer(box, 'near', w, h, 2);
      const blips = ([[200, -30, 1], [132, -112, .55], [212, 154, .4], [86, 70, .35]] as const).map(([rr, a, s]) => { const p = pt(cx, cy, rr * m, a), g = S('g', null, near.svg); CI(g, p[0], p[1], 9 * m, { fill: 'none', stroke: rgba(W, s * .45) }); gdot(near.svg, g, p[0], p[1], 3 * m, W, V3, 8 * m, s); return { g, a, s }; });
      CI(near.svg, cx, cy, 12 * m, { fill: rgba(INK, .6), stroke: rgba(W, .5) }); gdot(near.svg, near.svg, cx, cy, 3.5 * m, W, MIST, 10 * m);
      return { o: [cx, cy], rings, rays: raysE, sweep, blips, L: { far, near } };
    },
    parallax(c) { const r = c.refs; if (!isD()) return; ch.radialPar(c, [[r.L.far, .02, 14, r.o[0], r.o[1]], [r.L.glow, .04, 10, r.o[0], r.o[1]], [r.L.near, .1, 6, r.o[0], r.o[1]]]); },
    intro(c) {
      const r = c.refs, el = c.el, tl = gsap.timeline(), [ox, oy] = r.o;
      ch.brgTween(tl, el.querySelector<HTMLElement>('.brg'), 0);
      if (isD()) {
        r.rays.forEach((ry, i) => tl.from(ry, { opacity: 0, scale: .3, svgOrigin: `${ox} ${oy}`, duration: .8, ease: SOFT }, .05 + i * .035));
        tl.from(r.bloom ?? null, { opacity: 0, scale: .5, svgOrigin: `${ox} ${oy}`, duration: 1, ease: SOFT }, .1);
        tl.from(r.pulse ?? null, { opacity: 0, duration: .5 }, 1.2);
      } else {
        tl.from(r.rings ?? [], { opacity: 0, scale: .6, svgOrigin: `${ox} ${oy}`, duration: 1, ease: 'expo.out', stagger: .06 }, .1);
        tl.from(r.rays, { opacity: 0, duration: .8, ease: SOFT, stagger: .015 }, .2);
        tl.from(r.sweep ? r.sweep.div : null, { opacity: 0, duration: .6 }, .3);
      }
      const stats = $$('.stat', el);
      tl.from(stats, { y: 16, opacity: 0, duration: .8, ease: 'expo.out', stagger: .08, clearProps: 'transform,opacity' }, .2);
      stats.forEach((s, i) => { const v = $('.stat__v', s), late = v.dataset.late; tl.add(ch.countTo(v, +(v.dataset.num ?? ''), { dec: +(v.dataset.dec ?? ''), pre: v.dataset.pre || '', suf: v.dataset.suf || '', dur: late ? 1.0 : 1.2 }), .2 + (late ? .35 : i * .06)); });
      return tl;
    },
    loops(c) {
      const r = c.refs;
      if (isD()) { const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 }); tl.to(r.pulse ?? null, { opacity: 1, duration: .2 }).to(r.pulse ?? null, { opacity: .5, duration: .7, ease: SOFT }); ch.onScreen(c, tl); }
      else {
        const sweep = r.sweep, blips = r.blips ?? [];
        const o = { a: -30 }, tl = gsap.timeline({ repeat: -1 });
        tl.fromTo(o, { a: -30 }, { a: 330, duration: 6, ease: 'none', onUpdate: () => { gsap.set(sweep ? sweep.div : null, { rotation: o.a }); blips.forEach(b => { const dlt = (((o.a - b.a) % 360) + 360) % 360; b.g.setAttribute('opacity', String(R2(clamp(1 - dlt / 200, .25, 1)))); }); } });
        ch.onScreen(c, tl);
      }
    }
  };
}

