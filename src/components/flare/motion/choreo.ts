import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Run } from "./runtime";
import { $, $$, deg3, R2 } from "./utils";

/* ===================== small helpers: what every chapter shares ===================== */

/** the part of a chapter the helpers need (its section element) */
export type ChapterEl = { el: HTMLElement };
/** [layer, scale gain, y travel, origin x, origin y] */
export type ParItem = [Element | null | undefined, number, number, number, number];

export type CountOpts = { dec?: number; pre?: string; suf?: string; from?: number; dur?: number; delay?: number; ease?: string };

export type Choreo = {
  run: Run;
  words(el: HTMLElement): HTMLSpanElement[];
  lineRise(tl: gsap.core.Timeline, el: HTMLElement, at: number, dy?: number, dur?: number): void;
  brgTween(tl: gsap.core.Timeline, el: HTMLElement | null, at: number): void;
  headIn(tl: gsap.core.Timeline, scope: HTMLElement, at?: number): void;
  countTo(el: HTMLElement, to: number, o?: CountOpts): gsap.core.Tween;
  /** a looping timeline plays only while its chapter is on screen */
  onScreen(c: ChapterEl, tl: gsap.core.Timeline): ScrollTrigger;
  /** CSS loops run only while their chapter is on screen */
  onScreenCls(c: ChapterEl, els: Element[]): void;
  radialPar(c: ChapterEl, items: ParItem[]): void;
};

export const fmtN = (v: number, dec: number): string => v.toLocaleString('en-GB', { minimumFractionDigits: dec, maximumFractionDigits: dec });

export function createChoreo(run: Run): Choreo {
  const { doc, reduce: RM } = run;
  // what the original kept as `el._w`: the split words per heading, for this run only (a cleanup restores the text)
  const split = new WeakMap<HTMLElement, HTMLSpanElement[]>();

  function words(el: HTMLElement): HTMLSpanElement[] {
    const had = split.get(el); if (had) return had; const out: HTMLSpanElement[] = [];
    const walk = (n: Node) => { Array.from(n.childNodes).forEach(c => {
      if (c.nodeType === 3) { const parts = (c.textContent ?? '').split(/(\s+)/), f = doc.createDocumentFragment(); parts.forEach(p => { if (!p) return; if (/^\s+$/.test(p)) f.appendChild(doc.createTextNode(p)); else { const s = doc.createElement('span'); s.className = 'w'; s.textContent = p; f.appendChild(s); out.push(s); } }); (c as ChildNode).replaceWith(f); }
      else if (c.nodeType === 1 && (c as Element).tagName !== 'BR') walk(c);
    }); };
    walk(el); split.set(el, out); return out;
  }
  function lineGroups(el: HTMLElement): HTMLSpanElement[][] { const ws = words(el), ls: HTMLSpanElement[][] = []; let top: number | null = null, cur: HTMLSpanElement[] = []; ws.forEach(w => { const t = w.offsetTop; if (top === null || Math.abs(t - top) > 3) { cur = []; ls.push(cur); top = t; } cur.push(w); }); return ls; }
  function lineRise(tl: gsap.core.Timeline, el: HTMLElement, at: number, dy = 32, dur = .7) { lineGroups(el).forEach((ln, i) => tl.from(ln, { y: dy, opacity: 0, duration: dur, ease: 'expo.out', clearProps: 'transform,opacity' }, at + i * .08)); }
  function brgTween(tl: gsap.core.Timeline, el: HTMLElement | null, at: number) {
    if (!el) return; const deg = +(el.dataset.deg ?? '') || 0, hand = $('.brg__hand', el), num = $('.brg__deg', el), o = { v: deg - 72 };
    tl.from(el, { y: 12, opacity: 0, duration: .7, ease: 'expo.out', clearProps: 'transform,opacity' }, at);
    tl.to(o, { v: deg, duration: 1.1, ease: 'power4.inOut', onUpdate: () => { hand.setAttribute('transform', `rotate(${R2(o.v)} 9 9)`); num.textContent = deg3(o.v); }, onComplete: () => { hand.setAttribute('transform', `rotate(${deg} 9 9)`); num.textContent = deg3(deg); } }, at);
  }
  function headIn(tl: gsap.core.Timeline, scope: HTMLElement, at = 0) {
    brgTween(tl, scope.querySelector<HTMLElement>('.brg'), at);
    $$('.split', scope).forEach(h => lineRise(tl, h, at + .1, 28));
    $$('.lede', scope).filter(x => x.offsetParent !== null).forEach((x, i) => tl.from(x, { y: 16, opacity: 0, duration: .8, ease: 'expo.out', clearProps: 'transform,opacity' }, at + .32 + i * .06));
  }
  function countTo(el: HTMLElement, to: number, o: CountOpts = {}): gsap.core.Tween {
    const dec = o.dec || 0, pre = o.pre || '', suf = o.suf || '', s = { v: o.from || 0 };
    const w = el.getBoundingClientRect().width; if (w) el.style.minWidth = Math.ceil(w) + 'px';
    return gsap.to(s, { v: to, duration: o.dur || 1.2, delay: o.delay || 0, ease: o.ease || 'expo.out', onUpdate: () => { el.textContent = pre + fmtN(s.v, dec) + suf; }, onComplete: () => { el.textContent = pre + fmtN(to, dec) + suf; } });
  }
  function onScreen(c: ChapterEl, tl: gsap.core.Timeline): ScrollTrigger {
    tl.pause();
    const st = ScrollTrigger.create({ trigger: c.el, start: 'top bottom', end: 'bottom top', onToggle: s => { if (s.isActive) tl.resume(); else tl.pause(); } });
    if (st.isActive) tl.resume();
    return st;
  }
  function onScreenCls(c: ChapterEl, els: Element[]) { const set = (on: boolean) => els.forEach(e => e.classList.toggle('is-on', on)); const st = ScrollTrigger.create({ trigger: c.el, start: 'top bottom', end: 'bottom top', onToggle: s => set(s.isActive) }); set(st.isActive); }
  function radialPar(c: ChapterEl, items: ParItem[]) {
    if (RM) return;
    items.forEach(([el, s, y, ox, oy]) => {
      if (!el) return;
      gsap.set(el, { transformOrigin: `${R2(ox)}px ${R2(oy)}px` }); (el as HTMLElement).style.willChange = 'transform';
      gsap.fromTo(el, { scale: 1, y: -y }, { scale: 1 + s, y, ease: 'none', scrollTrigger: { trigger: c.el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }
  return { run, words, lineRise, brgTween, headIn, countTo, onScreen, onScreenCls, radialPar };
}
