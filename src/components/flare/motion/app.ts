import { gsap } from "gsap";
import type { Chapter, Env, Spec } from "./chapters";
import { fmtN } from "./choreo";
import { arcD, arcs, blurEl, boxEl, CI, gdot, half, type Layer, layer, lg, P, rayD, rays, rel, rg, S, secBox, secD, tickSegs } from "./svg-kit";
import { $, $$, BLUE, clamp, D2R, deg3, EZ, INK, isD, kD, kM, MIST, pt, R2, range, rgba, SOFT, V1, V3, V5, V7, V9, W } from "./utils";

/* ---------- 04 app ---------- */
type PhoneName = 'home' | 'ask' | 'ana';
type Refs = {
  o: [number, number]; HZ: number; S: number; k: number; list: [PhoneName, number, number][];
  DR: number; Dd: number; YC: number; lift: number;
  so: ReturnType<typeof rel>; place(name: PhoneName, b: number, Dd: number): void;
  base: Element; rays: SVGPathElement[]; waves: SVGPathElement[]; bloom: SVGPathElement; bglow: HTMLDivElement[];
  veil: SVGPathElement | null; ring?: SVGPathElement; ticks?: SVGPathElement[];
  tags: SVGGElement[]; speed: SVGPathElement[]; pts: SVGGElement[]; rings: { g: SVGGElement; c: [number, number] }[];
  pulses: HTMLDivElement[]; origin: SVGGElement; L: { far: Layer; glow: Layer; near: Layer };
};

export function app(env: Env): Spec<Refs> {
  const { run, ch, clips } = env, RM = run.reduce;
  const phones: Partial<Record<PhoneName, HTMLElement>> = {};
  const ph = (n: PhoneName) => phones[n] as HTMLElement;

  function appFan(c: Chapter<Refs>, f: number) {
    const r = c.refs, t = f * 1.6, k = r.k;
    if (isD()) {
      const e = EZ.expo(clamp(t / 1.1, 0, 1)), fan = EZ.expo(clamp((t - .2) / 1.1, 0, 1));
      r.place('home', 0, r.Dd); gsap.set(ph('home'), { y: '+=' + R2(120 * k * (1 - e)) });
      r.place('ask', -12 * fan, r.Dd); r.place('ana', 12 * fan, r.Dd);
      gsap.set([ph('ask'), ph('ana')], { opacity: clamp(fan * 4, 0, 1) });
      r.bglow.forEach((g, i) => { g.style.opacity = String(R2(clamp((t - .15 - i * .08) / .6, 0, 1))); });
      r.tags.forEach((g, i) => g.setAttribute('opacity', String(R2(clamp((t - 1 - i * .1) / .3, 0, 1)))));
      r.speed.forEach((g, i) => g.setAttribute('opacity', String(R2(clamp((t - 1.05 - i * .06) / .25, 0, 1)))));
      if (r.veil) r.veil.setAttribute('opacity', String(R2(.3 + .7 * e)));
    } else {
      const e = EZ.expo(clamp(t / 1.1, 0, 1)), fan = EZ.expo(clamp((t - .15) / 1.1, 0, 1));
      r.place('ana', 0, r.lift); gsap.set(ph('ana'), { y: '+=' + R2(90 * k * (1 - e)) });
      r.place('home', -12 * fan, r.lift); gsap.set(ph('home'), { opacity: clamp(fan * 4, 0, 1) });
    }
  }
  function appCount(c: Chapter<Refs>, instant?: boolean) {
    if (c.counted) return; c.counted = true;
    $$('[data-money]', c.el).forEach(el => { const v = +(el.dataset.money ?? ''); if (instant || RM) { el.textContent = '$' + fmtN(v, 2); return; } run.track(ch.countTo(el, v, { dec: 2, pre: '$', dur: 1.1, from: v * .92 })); });
    $$<SVGSVGElement>('.an-chart', c.el).forEach(sv => { const clip = clips.get(sv); if (clip && !instant && !RM) run.track(gsap.fromTo(clip, { scaleX: 0, svgOrigin: '0 0' }, { scaleX: 1, duration: 1.4, ease: 'power2.inOut' })); });
    $$('.hg-lit', c.el).forEach(p => { if (!instant && !RM) run.track(gsap.fromTo(p, { opacity: .2 }, { opacity: 1, duration: .9, ease: SOFT })); });
  }

  return {
    clean(c) { const st = $('.app__stage', c.el); $$('.lay', st).forEach(n => n.remove()); },
    build(c) {
      const el = c.el, art = $(':scope > .art', el), W0 = el.offsetWidth, H0 = el.offsetHeight, D = isD();
      const r = {} as Refs;
      const stage = $('.app__stage', el), midC = $('.app__clip--mid', stage), nearC = $('.app__clip--near', stage), mid = $('.app__par', midC), near = $('.app__par', nearC);
      if (!phones.home) { $$('.app__phones .phone', el).forEach(p => { phones[p.dataset.phone as PhoneName] = p; }); }
      const k = D ? kD() : kM();
      let OX: number, OY: number, HZ: number, S1: number, list: [PhoneName, number, number][];
      if (D) {
        HZ = H0 - 48 * k; OX = W0 / 2; S1 = .86 * k;
        const hb = rel($('.head', el), el).b, YT = Math.max(424 * k, hb + 64 * k), YC = YT + 436 * S1, Dd = 1300 * k; OY = YC + Dd;
        const DR = Dd + 436 * S1 + 25 * k; r.DR = DR; r.Dd = Dd; r.YC = YC;
        midC.style.height = nearC.style.height = R2(HZ) + 'px'; midC.style.top = nearC.style.top = '0px';
        mid.appendChild(ph('ask')); mid.appendChild(ph('ana')); near.appendChild(ph('home'));
        ph('ask').hidden = ph('ana').hidden = false;
        list = [['ask', -12, Dd], ['ana', 12, Dd], ['home', 0, Dd]];
      } else {
        const sr = rel(stage, el); OX = W0 / 2 + 33 * k; S1 = .6 * k; OY = sr.y + 610 * k; HZ = OY;
        midC.style.top = nearC.style.top = '0px'; midC.style.height = nearC.style.height = R2(OY - sr.y) + 'px';
        near.appendChild(ph('ana')); mid.appendChild(ph('home')); ph('ask').hidden = true; ph('ana').hidden = ph('home').hidden = false;
        if (ph('ask').parentNode !== $('.app__phones', el)) $('.app__phones', el).appendChild(ph('ask'));
        const lift = 436 * S1 + 32 * k; r.lift = lift;
        list = [['home', -12, lift], ['ana', 0, lift]];
      }
      r.o = [OX, OY]; r.HZ = HZ; r.S = S1; r.k = k; r.list = list;
      // stage offset (mobile stage is in flow, desktop stage spans the chapter)
      const so = rel(stage, el); r.so = so;
      const place = (name: PhoneName, b: number, Dd: number) => { const cx = OX + Dd * Math.sin(b * D2R) - so.x, cy = OY - Dd * Math.cos(b * D2R) - so.y; gsap.set(ph(name), { x: R2(cx - 209), y: R2(cy - 436), rotation: b, scale: S1, transformOrigin: '50% 50%' }); };
      r.place = place; list.forEach(([n, b, Dd]) => place(n, b, Dd));
      const sa = (b: number) => b - 90;
      // base and far
      const base = layer(art, 'base', W0, H0).svg;
      if (D) {
        S('rect', { width: W0, height: H0, fill: rg(base, OX, HZ, 1180 * k, [[0, V1, .95], [.07, '#A9C2FF', .9], [.2, BLUE, .8], [.4, V5, .56], [.66, V7, .24], [.86, V9, .08], [1, V9, 0]], 900 * k) }, base);
        S('rect', { width: W0, height: H0, fill: rg(base, W0 / 2, H0 * 1.25, W0 * 1.2, [[0, V7, .5], [1, V9, 0]], H0 * .8) }, base);
        S('rect', { width: W0, height: H0, fill: rg(base, W0 * .06, H0 * .04, W0 * .4, [[0, V5, .1], [1, V5, 0]], H0 * .5) }, base);
      } else {
        S('rect', { width: W0, height: H0, fill: rg(base, OX, OY, 450 * k, [[0, '#F4F7FF', .95], [.08, '#A9C2FF', .85], [.22, V5, .85], [.45, '#0F2BD9', .55], [.7, V9, .2], [1, V9, 0]], 620 * k) }, base);
        S('rect', { width: W0, height: H0, fill: rg(base, W0 * .06, H0 * .02, W0 * .5, [[0, V7, .16], [1, V9, 0]], H0 * .22) }, base);
      }
      S('rect', { x: 0, y: R2(HZ), width: W0, height: R2(H0 - HZ + 2), fill: INK }, base);
      S('rect', { x: 0, y: R2(HZ), width: W0, height: R2(H0 - HZ + 2), fill: rg(base, OX, HZ, (D ? 700 : 300) * k, [[0, BLUE, .42], [.5, V7, .14], [1, V9, 0]], (D ? 160 : 70) * k) }, base);
      S('rect', { width: W0, height: R2(140 * k), fill: lg(base, 0, 0, 0, 140 * k, [[0, INK, 1], [1, INK, 0]]) }, base);
      if (H0 - HZ > 8) S('rect', { x: 0, y: R2(HZ + 6), width: W0, height: R2(H0 - HZ - 4), fill: lg(base, 0, HZ + 6, 0, H0, [[0, INK, 0], [1, INK, 1]]) }, base);
      r.base = base.parentNode as Element;
      const far = layer(art, 'far', W0, H0), fs = far.svg;
      if (D) {
        const st = rg(fs, OX, OY, 2300 * k, [[.44, W, .3], [.6, W, .1], [1, W, .02]]), st2 = rg(fs, OX, OY, 2300 * k, [[.44, W, .16], [.6, W, .05], [1, W, .01]]);
        r.rays = rays(fs, OX, OY, 1000 * k, 2600 * k, range(sa(-36), sa(36), 12), st).concat(rays(fs, OX, OY, 1000 * k, 2600 * k, range(sa(-30), sa(30), 12), st2));
        r.waves = arcs(fs, OX, OY, [1183, 1319, 1455, 1591, 1863, 1999, 2135].map(v => v * k), sa(-42), sa(42), rg(fs, OX, OY, 2300 * k, [[.44, W, .22], [.62, W, .08], [1, W, .02]]));
      } else {
        r.rays = rays(fs, OX, OY, 40 * k, 1000 * k, range(-168, -12, 12), rg(fs, OX, OY, 760 * k, [[0, W, .34], [.4, W, .1], [1, W, .02]]));
        r.waves = arcs(fs, OX, OY, range(96 * k, 960 * k, 96 * k), -180, 0, rg(fs, OX, OY, 900 * k, [[0, W, .26], [.5, W, .08], [1, W, .02]]));
      }
      rays(fs, OX, HZ, (D ? 30 : 12) * k, (D ? 400 : 120) * k, range(12, 168, 12), rg(fs, OX, HZ, (D ? 300 : 110) * k, [[0, W, .16], [.5, W, .05], [1, W, 0]]));
      // glow
      const glow = layer(art, 'glow', W0, H0), gs = glow.svg;
      r.bloom = half(gs, OX, HZ, (D ? 520 : 210) * k, (D ? 380 : 210) * k, rg(gs, OX, HZ, (D ? 520 : 210) * k, [[0, W, .95], [.08, V1, .85], [.26, V3, .5], [.58, V5, .16], [1, V5, 0]], (D ? 380 : 210) * k));
      if (D) {
        const clip = document.createElement('div'); Object.assign(clip.style, { position: 'absolute', left: 0, top: 0, width: '100%', height: R2(HZ) + 'px', overflow: 'hidden' }); glow.appendChild(clip);
        r.bglow = ([[-12, .85], [0, 1], [12, .85]] as const).map(([b, kk]) => { const [bx, by, bw, bh] = secBox(OX, OY, 1040 * k, r.DR + 40 * k, sa(b - 13), sa(b + 13)), e = blurEl(clip, bx, by, Math.max(bw, 1), Math.min(bh, HZ - by + 60), 32 * k); P(e.g, secD(OX, OY, 1040 * k, r.DR + 40 * k, sa(b - 13), sa(b + 13)), { fill: rg(e.svg, OX, OY, r.DR + 40 * k, [[.58, V1, .8 * kk], [.74, V3, .5 * kk], [.9, V5, .22 * kk], [1, V5, 0]]) }); return e.div; });
      } else {
        r.bglow = []; ([[18, .6], [34, .4], [54, .24], [78, .12]] as const).forEach(([rr, a]) => P(gs, arcD(OX, OY, rr * k, -180, 0), { stroke: rgba(W, a), 'stroke-width': 1.5, fill: 'none' }));
        S('ellipse', { cx: R2(OX), cy: R2(OY), rx: R2(300 * k), ry: R2(8 * k), fill: rg(gs, OX, OY, 300 * k, [[0, W, .95], [.35, MIST, .4], [1, V3, 0]], 8 * k) }, gs);
      }
      // near art above the phones
      const nl = layer(stage, 'near2', stage.offsetWidth || W0, stage.offsetHeight || H0, 3), ns = nl.svg, ox2 = OX - so.x, oy2 = OY - so.y, hz2 = HZ - so.y, fp2 = (rr: number, b: number): [number, number] => [ox2 + rr * Math.sin(b * D2R), oy2 - rr * Math.cos(b * D2R)];
      if (D) {
        r.veil = half(ns, ox2, hz2, 660 * k, 170 * k, rg(ns, ox2, hz2, 660 * k, [[0, W, .85], [.18, V1, .55], [.45, V3, .22], [.75, BLUE, .06], [1, BLUE, 0]], 170 * k));
        r.ring = P(ns, arcD(ox2, oy2, r.DR, sa(-40), sa(40)), { stroke: rgba(W, .3), fill: 'none' });
        r.ticks = tickSegs(ns, ox2, oy2, r.DR, sa(-40), sa(40), 2, 6 * k, 12, 12 * k, rgba(W, .36));
        r.tags = ([[-12, 'Next move'], [0, 'Live balances'], [12, 'Gauges']] as const).map(([b, txt]) => {
          const c2 = fp2(r.DR + 34 * k, b), p2 = fp2(r.DR, b), g = S('g', null, ns);
          const t = S('text', { x: R2(c2[0]), y: R2(c2[1]), 'text-anchor': 'middle', 'dominant-baseline': 'central', transform: `rotate(${b} ${R2(c2[0])} ${R2(c2[1])})`, 'font-size': R2(Math.max(11, 12 * k)), 'font-weight': 500, 'letter-spacing': '1.2', fill: W, 'fill-opacity': .72 }, g);
          S('tspan', { fill: V3, 'fill-opacity': 1 }, t).textContent = deg3(b) + ' ' /* an em space, as in the original */; S('tspan', null, t).textContent = txt.toUpperCase();
          gdot(ns, g, p2[0], p2[1], 3 * k, W, V3, 12 * k); return g;
        });
        r.speed = [[-24, 1240, 1420], [-24, 1560, 1640], [24, 1480, 1660]].map(([b, a, z]) => { const p0 = fp2(a * k, b), p1 = fp2(z * k, b); return P(ns, `M${R2(p0[0])} ${R2(p0[1])}L${R2(p1[0])} ${R2(p1[1])}`, { stroke: lg(ns, p0[0], p0[1], p1[0], p1[1], [[0, W, 0], [1, W, .8]]), 'stroke-width': 1.5, 'stroke-linecap': 'round', fill: 'none' }); });
        r.pts = [[-22, 1560, 2.5, .9], [-24, 1290, 2, .6], [22, 1420, 2.5, .8], [20, 1640, 2, .6], [-30, 1720, 2, .5], [30, 1250, 2, .5]].map(([b, rr, s, op]) => { const p = fp2(rr * k, b); if (p[0] < 8 || p[0] > W0 - 8 || p[1] > hz2) return null; return gdot(ns, ns, p[0], p[1], s * k, W, V3, 10 * k, op); }).filter((g): g is SVGGElement => g !== null);
        r.rings = [[-22, 1560], [22, 1420]].map(([b, rr]) => { const p = fp2(rr * k, b), g = S('g', null, ns); [[9, .4], [16, .18]].forEach(([q, op]) => CI(g, p[0], p[1], q * k, { fill: 'none', stroke: rgba(W, op) })); return { g, c: p }; });
      } else {
        r.veil = null; r.tags = []; r.speed = []; r.pts = []; r.rings = [];
        [[288, -60, 1], [480, -72, .6], [288, -132, .7], [192, -156, .5]].forEach(([rr, a, s]) => { const p = pt(ox2, oy2, rr * k, a); if (p[0] < 6 || p[0] > (stage.offsetWidth - 6)) return; CI(ns, p[0], p[1], 8 * k, { fill: 'none', stroke: rgba(W, .4 * s) }); r.pts.push(gdot(ns, ns, p[0], p[1], 2.5 * k, W, V3, 10 * k, s)); });
        [[304, 318, .8], [330, 340, .5], [352, 358, .3]].forEach(([a, z, al]) => P(ns, rayD(ox2, oy2, a * k, z * k, -60), { stroke: rgba(W, al), 'stroke-width': 2, 'stroke-linecap': 'round', fill: 'none' }));
      }
      S('rect', { x: 0, y: R2(hz2 - .5), width: R2(stage.offsetWidth || W0), height: 1, fill: lg(ns, 0, 0, stage.offsetWidth || W0, 0, [[0, W, 0], [clamp(ox2 / (stage.offsetWidth || W0), .1, .9), W, .9], [1, W, 0]]) }, ns);
      const K = .5523; r.pulses = (D ? [[96, 28, .55], [180, 52, .3], [276, 78, .14]] : [[40, 14, .5], [80, 26, .26], [124, 38, .12]]).map(([rx, ry, op], i) => {
        rx *= k * 1.25; ry *= k * 1.25; const bx = ox2 - rx - 3, by = hz2 - ry - 3, b = boxEl(nl, bx, by, 2 * rx + 6, ry + 6);
        P(b.g, `M${R2(ox2 - rx)} ${R2(hz2)}C${R2(ox2 - rx)} ${R2(hz2 - K * ry)} ${R2(ox2 - K * rx)} ${R2(hz2 - ry)} ${R2(ox2)} ${R2(hz2 - ry)}C${R2(ox2 + K * rx)} ${R2(hz2 - ry)} ${R2(ox2 + rx)} ${R2(hz2 - K * ry)} ${R2(ox2 + rx)} ${R2(hz2)}`, { stroke: rgba(W, op), 'stroke-width': 1.25, fill: 'none' });
        b.div.classList.add('apulse'); b.div.style.transformOrigin = `${R2(ox2 - bx)}px ${R2(hz2 - by)}px`; b.div.style.animationDelay = (i * .35).toFixed(2) + 's'; return b.div; });
      CI(ns, ox2, hz2, 9 * k, { fill: 'none', stroke: rgba(W, .5) });
      r.origin = gdot(ns, ns, ox2, hz2, (D ? 5 : 3.5) * k, W, V1, 18 * k);
      r.L = { far, glow, near: nl };
      c.refs = r; appFan(c, c.revealed || RM ? 1 : 0);
      return r;
    },
    parallax(c) { const r = c.refs; ch.radialPar(c, [[r.L.far, .02, 18, r.o[0], r.HZ], [r.L.glow, .04, 10, r.o[0], r.HZ]]); const st = $('.app__stage', c.el), k = r.k; ([[$('.app__clip--mid .app__par', st), 26], [$('.app__clip--near .app__par', st), 12]] as const).forEach(([el, y]) => gsap.fromTo(el, { y: y * k }, { y: -y * k, ease: 'none', scrollTrigger: { trigger: c.el, start: 'top bottom', end: 'bottom top', scrub: true } })); },
    intro(c) {
      const r = c.refs, el = c.el, D = isD(), tl = gsap.timeline(), hz = r.HZ, O = `${R2(r.o[0])} ${R2(hz)}`;
      ch.headIn(tl, $('.head', el), 0);
      tl.from(r.base, { opacity: .3, duration: 1.4, ease: SOFT }, 0);
      tl.from(r.bloom, { opacity: 0, scale: .5, svgOrigin: O, duration: 1.2, ease: SOFT }, .1);
      r.rays.forEach((ry, i) => tl.from(ry, { opacity: 0, duration: .8, ease: SOFT }, .1 + i * (D ? .02 : .03)));
      tl.from(r.waves, { opacity: 0, duration: .9, ease: SOFT, stagger: .05 }, .2);
      const o = { f: 0 };
      tl.fromTo(o, { f: 0 }, { f: 1, duration: 1.6, ease: 'none', immediateRender: false, onUpdate: () => appFan(c, o.f) }, .2);
      if (r.pts.length) tl.from(r.pts, { opacity: 0, duration: .5, stagger: .08 }, 1);
      tl.add(() => appCount(c), 1.3);
      return tl;
    },
    after(c, already) { if (already) appFan(c, 1); },
    always(c) { if (RM) { appFan(c, 1); appCount(c, true); } },
    loops(c) {
      const r = c.refs;
      ch.onScreenCls(c, r.pulses);
      if (r.rings.length) { const rl = gsap.timeline({ repeat: -1, repeatDelay: 1 }); r.rings.forEach(({ g, c: gc }, i) => rl.fromTo(g, { scale: .6, opacity: 0, svgOrigin: `${R2(gc[0])} ${R2(gc[1])}` }, { scale: 1.3, opacity: 1, duration: 1.2, ease: SOFT, yoyo: true, repeat: 1 }, i * .6)); ch.onScreen(c, rl); }
    }
  };
}
