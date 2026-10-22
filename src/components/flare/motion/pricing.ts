import { gsap } from "gsap";
import type { Env, Spec } from "./chapters";
import type { Run } from "./runtime";
import { arcD, arcs, blurEl, CI, gdot, half, type Layer, layer, mkSVG, P, rayD, rays, rel, rg, S, secD, withDefs } from "./svg-kit";
import { $, $$, BLUE, INK, isD, kD, kM, pt, R2, range, rgba, SOFT, V1, V3, V5, V7, W } from "./utils";

/* ---------- 07 pricing ---------- */
const BL3 = [[-174, -126], [-114, -66], [-54, -6]], NA3 = [-150, -90, -30];
/** what the original kept on each gauge svg (`sv._blades`, `sv._needle`) */
type Gauge = { blades: SVGPathElement[]; needle: SVGPathElement };

function gaugeSVG(s0: SVGSVGElement, n: number, hot: boolean): Gauge {
  s0.innerHTML = ''; const sv = withDefs(s0); const ox = 48, oy = 50, col = hot ? W : INK;
  const tk: string[] = []; for (const a of range(-174, -6, 6)) tk.push(rayD(ox, oy, 42, 42 + (Math.abs(a % 12) < 1e-6 ? 5 : 3), a)); P(sv, tk.join(''), { stroke: rgba(col, hot ? .5 : .28), fill: 'none' });
  const blades = BL3.map(([a0, a1], i) => { const lit = i < n; return P(sv, secD(ox, oy, 26, 38, a0, a1), { fill: lit ? rg(sv, ox, oy, 38, hot ? [[.5, W], [1, '#C9D8FF']] : [[.5, V7], [1, BLUE]]) : rgba(col, hot ? .2 : .08), class: lit ? 'g-lit' : '' }); });
  const ng = S('g', { class: 'ndl' }, sv), nd = P(ng, rayD(ox, oy, 0, 20, NA3[n - 1]), { stroke: col, 'stroke-width': 2, 'stroke-linecap': 'round', fill: 'none' });
  CI(sv, ox, oy, 3.5, { fill: col });
  return { blades, needle: nd };
}
function ruleSVG(rule: HTMLElement, hot: boolean) {
  const sv = $<SVGSVGElement>('svg', rule), w = Math.max(10, Math.round(rule.getBoundingClientRect().width)); sv.innerHTML = ''; sv.setAttribute('viewBox', `0 0 ${w} 7`); sv.setAttribute('width', String(w)); sv.setAttribute('height', '7');
  const col = hot ? W : INK; S('rect', { x: 0, y: 6, width: w, height: 1, fill: rgba(col, hot ? .26 : .1) }, sv);
  const ds: string[] = []; for (let x = 0; x <= w; x += 12) ds.push(`M${x + .5} ${x % 48 === 0 ? 0 : 3}V6`); P(sv, ds.join(''), { stroke: rgba(col, hot ? .36 : .18), fill: 'none' });
}

type Refs = {
  o: [number, number]; k: number; D: boolean;
  rays: SVGPathElement[]; waves: SVGPathElement[]; halo: HTMLDivElement | null;
  dial?: SVGGElement; dialBlades?: SVGPathElement[]; needle?: SVGPathElement; tip?: SVGGElement;
  pts: SVGGElement[]; origin: SVGGElement; heat: HTMLElement; cards: HTMLElement[]; gauges: Gauge[];
  L: { far: Layer; glow: Layer; mid: Layer; near: Layer };
};

export function pricing(env: Env): Spec<Refs> {
  const { ch } = env;
  return {
    build(c) {
      const el = c.el, art = $(':scope > .art', el), W0 = el.offsetWidth, H0 = el.offsetHeight, D = isD(), k = D ? kD() : kM();
      const plans = $('#plans'), cards = $$('.plan', plans), plus = $('.plan--hot', plans), pr = rel(plans, el), pc = rel(plus, el);
      const gauges = cards.map(cd => { const gg = gaugeSVG($<SVGSVGElement>('.gauge', cd), +(cd.dataset.pace ?? ''), cd.classList.contains('plan--hot')); ruleSVG($('.rule', cd), cd.classList.contains('plan--hot')); return gg; });
      const ox = W0 / 2, oy = H0; const r = { o: [ox, oy], k, D, gauges } as Refs;
      const far = layer(art, 'far', W0, H0), fs = far.svg;
      if (D) {
        r.rays = rays(fs, ox, oy, 120 * k, 1300 * k, range(-168, -12, 12), rg(fs, ox, oy, 860 * k, [[0, V5, .34], [.42, V5, .1], [1, V5, 0]]));
        r.waves = arcs(fs, ox, oy, range(136 * k, 680 * k, 136 * k), -180, 0, rg(fs, ox, oy, 760 * k, [[.15, V7, .18], [.6, V7, .06], [1, V7, 0]]));
      } else {
        r.rays = rays(fs, ox, oy, 18 * k, 520 * k, range(-168, -12, 12), rg(fs, ox, oy, 520 * k, [[0, V5, .3], [.45, V5, .08], [1, V5, 0]]));
        r.waves = arcs(fs, ox, oy, range(48 * k, 288 * k, 48 * k), -180, 0, rg(fs, ox, oy, 300 * k, [[0, V5, .26], [1, V5, .02]]));
      }
      const glow = layer(art, 'glow', W0, H0), gs = glow.svg;
      if (D) {
        half(gs, ox, oy, 700 * k, 520 * k, rg(gs, ox, oy, 700 * k, [[0, V5, .2], [.45, BLUE, .07], [1, V3, 0]], 520 * k));
        half(gs, ox, oy, 150 * k, 150 * k, rg(gs, ox, oy, 150 * k, [[0, BLUE, .42], [.4, V5, .14], [1, V5, 0]]));
        const hb = blurEl(glow, pc.x + 36 * k, pc.y + 120 * k, pc.w - 72 * k, pc.h - 96 * k, 40 * k); S('rect', { x: R2(pc.x + 36 * k), y: R2(pc.y + 120 * k), width: R2(pc.w - 72 * k), height: R2(pc.h - 96 * k), rx: 28, fill: rgba(V5, .42) }, hb.g); r.halo = hb.div;
      } else {
        S('ellipse', { cx: R2(ox), cy: R2(pc.y + pc.h / 2), rx: R2(250 * k), ry: R2(300 * k), fill: rg(gs, ox, pc.y + pc.h / 2, 250 * k, [[0, V5, .3], [.5, BLUE, .12], [1, V3, 0]], 300 * k) }, gs);
        r.halo = null;
      }
      const mid = layer(art, 'mid', W0, H0), ms = mid.svg;
      if (D) {
        const dial = r.dial = S('g', null, ms);
        const tk: string[] = []; for (const a of range(-174, -6, 6)) tk.push(rayD(ox, oy, 96 * k, (96 + (Math.abs(a % 12) < 1e-6 ? 9 : 4)) * k, a)); P(dial, tk.join(''), { stroke: rgba(INK, .28), fill: 'none' });
        r.dialBlades = BL3.map(([a0, a1], i) => P(dial, secD(ox, oy, 70 * k, 86 * k, a0, a1), { fill: i < 2 ? rg(ms, ox, oy, 86 * k, [[.5, V7], [1, BLUE]]) : rgba(INK, .08) }));
        P(dial, arcD(ox, oy, 24 * k, -180, 0), { stroke: rgba(INK, .28), fill: 'none' });
      }
      const near = layer(art, 'near', W0, H0), ns = near.svg;
      if (D) {
        const top = pr.b + 12 * k;
        r.needle = P(ns, `M${R2(ox)} ${R2(oy - 6 * k)}L${R2(ox)} ${R2(top + 2 * k)}`, { stroke: rgba(INK, .9), 'stroke-width': 2, 'stroke-linecap': 'round', fill: 'none' });
        r.tip = gdot(ns, ns, ox, top, 4 * k, V5, BLUE, 14 * k);
        r.pts = [[-150, 136], [-30, 136], [-120, 272], [-60, 272]].map(([a, q]) => { const p = pt(ox, oy, q * k, a); return p[1] > pr.b + 6 ? gdot(ns, ns, p[0], p[1], 2.5 * k, V5, V3, 10 * k) : null; }).filter((g): g is SVGGElement => g !== null);
        r.origin = gdot(ns, ns, ox, oy, 6 * k, W, V5, 18 * k);
      } else { r.pts = []; r.origin = gdot(ns, ns, ox, oy, 4 * k, V5, BLUE, 16 * k); }
      // plus card heat, from the chapter origin
      const heat = $('.plan__heat', plus); heat.innerHTML = ''; const hs = mkSVG(heat, pc.w, pc.h);
      if (D) {
        const hx = ox - pc.x, hy = oy - pc.y;
        S('rect', { width: R2(pc.w), height: R2(pc.h), fill: '#0F2BD9' }, hs);
        S('rect', { width: R2(pc.w), height: R2(pc.h), fill: rg(hs, hx, hy, 460 * k, [[0, '#F4F7FF'], [.17, '#A9C2FF'], [.46, V5], [1, V5, 0]], 620 * k) }, hs);
        S('rect', { width: R2(pc.w), height: R2(pc.h), fill: rg(hs, pc.w * .02, -pc.h * .04, pc.w * .95, [[0, '#03040A', .66], [.55, '#03040A', .26], [1, '#03040A', 0]], pc.h * .62) }, hs);
        rays(hs, hx, hy, 96 * k, 900 * k, range(-168, -12, 12), rg(hs, hx, hy, 760 * k, [[0, W, .6], [.3, W, .22], [.7, W, .05], [1, W, 0]]));
        arcs(hs, hx, hy, [272, 408, 544, 680].map(v => v * k), -180, 0, rg(hs, hx, hy, 760 * k, [[.25, W, .34], [.6, W, .1], [1, W, .03]]));
        P(hs, secD(hx, hy, 136 * k, 760 * k, -102, -78), { fill: rg(hs, hx, hy, 760 * k, [[.18, W, .16], [.5, V1, .06], [1, V1, 0]]) });
      } else {
        const hx = pc.w - 64 * k, hy = 70 * k;
        S('rect', { width: R2(pc.w), height: R2(pc.h), fill: V7 }, hs);
        S('rect', { width: R2(pc.w), height: R2(pc.h), fill: rg(hs, hx, hy, pc.w * .9, [[0, V3, .9], [.3, V5, .7], [1, V5, 0]], pc.h * .6) }, hs);
        rays(hs, hx, hy, 46 * k, 520 * k, range(0, 348, 12), rg(hs, hx, hy, 520 * k, [[0, W, .3], [.35, W, .08], [1, W, .015]]));
        arcs(hs, hx, hy, range(64 * k, 288 * k, 32 * k), -180, 180, rg(hs, hx, hy, 300 * k, [[0, W, .24], [.6, W, .06], [1, W, .015]]));
      }
      r.heat = heat; r.cards = cards; r.L = { far, glow, mid, near };
      return r;
    },
    parallax(c) { const r = c.refs; ch.radialPar(c, [[r.L.far, .02, 14, r.o[0], r.o[1]], [r.L.glow, .02, 8, r.o[0], r.o[1]]]); },
    intro(c) {
      const r = c.refs, el = c.el, tl = gsap.timeline(), [ox, oy] = r.o, O = `${ox} ${oy}`, D = r.D;
      ch.headIn(tl, $('.hrow', el), 0);
      tl.from(el.querySelector('.bill-row'), { y: 12, opacity: 0, duration: .7, ease: 'expo.out', clearProps: 'transform,opacity' }, .4);
      tl.from(r.rays, { opacity: 0, scale: .5, svgOrigin: O, duration: 1, ease: 'expo.out', stagger: .03 }, 0);
      tl.from(r.waves, { opacity: 0, scale: .85, svgOrigin: O, duration: 1, ease: SOFT, stagger: .06 }, .1);
      const [fr, pl, pro] = r.cards;
      tl.from([fr, pro], { y: 32 * r.k, opacity: 0, duration: .8, ease: 'expo.out', stagger: .12, clearProps: 'transform,opacity' }, .2);
      tl.from(pl, { y: 32 * r.k, opacity: 0, duration: .8, ease: 'expo.out', clearProps: 'transform,opacity' }, .44);
      tl.from(r.heat, { opacity: 0, duration: 1, ease: SOFT }, .6);
      r.gauges.forEach((gg, i) => { tl.from(gg.blades, { opacity: 0, duration: .25, stagger: .12 }, 1.2 + i * .05); tl.from(gg.needle, { rotation: -60, svgOrigin: '48 50', duration: .8, ease: 'back.out(1.6)' }, 1.2 + i * .05); });
      if (D) {
        tl.from(r.dial ?? null, { y: 40 * r.k, opacity: 0, duration: .9, ease: 'expo.out' }, .3);
        tl.from(r.dialBlades ?? [], { opacity: 0, duration: .3, stagger: .15 }, .7);
        tl.from(r.needle ?? null, { scaleY: 0, svgOrigin: `${ox} ${oy}`, duration: .6, ease: 'power4.inOut' }, 1.0);
        tl.from(r.tip ?? null, { scale: 0, transformOrigin: '50% 50%', duration: .5, ease: 'back.out(3)' }, 1.5);
        if (r.halo) tl.from(r.halo, { opacity: 0, duration: .8, ease: SOFT }, 1.4);
        tl.from(r.origin, { opacity: 0, duration: .5 }, .3);
      }
      tl.from(el.querySelector('.price__foot'), { y: 12, opacity: 0, duration: .7, ease: 'expo.out', clearProps: 'transform,opacity' }, 1);
      return tl;
    },
    loops(c) { const r = c.refs; if (!r.pts.length) return; const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 }); r.pts.forEach((p, i) => tl.fromTo(p, { opacity: .3 }, { opacity: 1, duration: .4, yoyo: true, repeat: 1, ease: SOFT }, i * .3)); if (r.tip) tl.fromTo(r.tip, { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.6, duration: .4, yoyo: true, repeat: 1, ease: SOFT }, 0); ch.onScreen(c, tl); }
  };
}

/* ===================== interactions: the billing toggle ===================== */
export function billing(run: Run): void {
  const { doc: d, reduce: RM, signal } = run;
  const bill = d.querySelector('.bill'); if (!bill) return; const btns = $$<HTMLButtonElement>('button', bill); let mode = 'm';
  const amt = $$('.price__amt'), per = $$('.price__per[data-m], .bill__note [data-m]'), note = d.querySelector('.bill__note');
  btns.forEach(b => b.addEventListener('click', () => {
    const m = b.dataset.bill as string; if (m === mode) return; const dir = m === 'y' ? 1 : -1; mode = m;
    btns.forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false')); if (note) note.classList.toggle('is-on', m === 'y');
    if (!RM) run.track(gsap.fromTo($('.bill__bg', b), { x: -dir * 18, opacity: 0 }, { x: 0, opacity: 1, duration: .5, ease: 'expo.out', clearProps: 'all' }));
    amt.forEach(a => {
      const nv = a.dataset[m] ?? '', old = a.firstElementChild; if (old && old.textContent === nv) return;
      const s = d.createElement('span'); s.textContent = nv;
      if (RM || !old) { a.innerHTML = ''; a.appendChild(s); return; }
      gsap.set(a, { width: a.offsetWidth }); a.appendChild(s); gsap.set(s, { position: 'absolute', left: 0, top: 0 });
      run.track(gsap.fromTo(s, { yPercent: 100 * dir, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .55, ease: 'expo.out' }));
      run.track(gsap.to(old, { yPercent: -100 * dir, opacity: 0, duration: .45, ease: 'expo.out', onComplete: () => { old.remove(); gsap.set(s, { clearProps: 'position,left,top' }); gsap.set(a, { clearProps: 'width' }); } }));
    });
    per.forEach(p => { const nv = p.dataset[m] ?? ''; if (p.textContent === nv) return; if (RM) { p.textContent = nv; return; } gsap.killTweensOf(p); p.style.opacity = ''; const to = +getComputedStyle(p).opacity; run.track(gsap.fromTo(p, { opacity: 0 }, { opacity: to, duration: .4, ease: SOFT, onStart: () => { p.textContent = nv; }, clearProps: 'opacity' })); });
  }, { signal }));
}
