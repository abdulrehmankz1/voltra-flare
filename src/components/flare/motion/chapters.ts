import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Choreo } from "./choreo";
import type { Run } from "./runtime";
import { $$ } from "./utils";

/* ===================== chapters ===================== */

/** what every chapter module is handed: the run, the shared helpers and the state chapters share */
export type Env = {
  run: Run;
  ch: Choreo;
  /** the .an-chart clip rects drawn by phoneUI() */
  clips: WeakMap<SVGSVGElement, SVGRectElement>;
  faq: FaqState;
};

/** the original's FAQ object: the index dial, and the accordion's open() once faq() has run */
export type FaqState = { dial: import("./faq").Dial | null; open?: (qa: HTMLElement) => void };

export type Chapter<R> = {
  el: HTMLElement;
  spec: Spec<R>;
  revealed: boolean;
  ctx: gsap.Context | null;
  refs: R;
  tl: gsap.core.Timeline | null;
  st: ScrollTrigger | null;
  /** the original's `c._counted` (the app chapter's counters ran) */
  counted?: boolean;
};

export type Spec<R> = {
  clean?(c: Chapter<R>): void;
  build(c: Chapter<R>): R;
  parallax?(c: Chapter<R>): void;
  intro?(c: Chapter<R>): gsap.core.Timeline | null;
  after?(c: Chapter<R>, already?: boolean): void;
  always?(c: Chapter<R>): void;
  loops?(c: Chapter<R>): void;
  start?: string;
  /** the chapter's art is its ground: reduced motion shows it at once */
  still?: boolean;
};

/** a registered chapter, its refs type hidden */
export type ChapterHandle = { el: HTMLElement; setup(): void; finishReveal(): void; ctx(): gsap.Context | null };

export function createChapters(run: Run) {
  const { reduce: RM } = run;
  const chapters: ChapterHandle[] = [];

  function addChapter<R>(sel: string, spec: Spec<R>): ChapterHandle | null {
    const el = document.querySelector<HTMLElement>(sel); if (!el) return null;
    const c: Chapter<R> = { el, spec, revealed: false, ctx: null, refs: {} as R, tl: null, st: null };
    const h: ChapterHandle = { el, setup: () => setup(c), finishReveal: () => finishReveal(c), ctx: () => c.ctx };
    chapters.push(h); return h;
  }
  function clearArt<R>(c: Chapter<R>) { $$('.art', c.el).forEach(a => { a.innerHTML = ''; }); if (c.spec.clean) c.spec.clean(c); }
  function setup<R>(c: Chapter<R>) {
    if (c.ctx) { c.ctx.revert(); c.ctx = null; }
    c.tl = c.st = null;
    clearArt(c);
    const spec = c.spec;
    const ctx = c.ctx = gsap.context(() => {
      c.refs = spec.build(c) || ({} as R);
      if (!RM && spec.parallax) spec.parallax(c);
      if (!c.revealed) {
        const tl = RM ? rmFade(c) : (spec.intro ? spec.intro(c) : null);
        if (tl) { tl.pause(); c.tl = tl; c.st = ScrollTrigger.create({ trigger: c.el, start: spec.start || 'top 78%', once: true, onEnter: () => { c.revealed = true; tl.play(0); if (!RM && spec.after) { const after = spec.after; ctx.add(() => after(c)); } } }); }
        else { c.revealed = true; }
      } else if (!RM && spec.after) spec.after(c, true);
      if (!RM && spec.loops) spec.loops(c);
      if (spec.always) spec.always(c);
    }, c.el);
  }
  // reduced motion: the copy fades in over 0.4 s; a chapter whose art is its ground (the close) shows its still frame at once, as the hero does
  function rmFade<R>(c: Chapter<R>) { const tl = gsap.timeline(); tl.from($$('.wrap > *', c.el).concat(c.spec.still ? [] : $$('.art', c.el)), { opacity: 0, duration: .4, ease: 'none' }); return tl; }
  // keyboard focus never lands on something still waiting for its reveal: the chapter's entrance completes at once (as on Facet and Petals)
  function finishReveal<R>(c: Chapter<R>) {
    const tl = c.tl; if (!tl || tl.progress() >= 1) return;
    if (c.st) { c.st.kill(); c.st = null; }
    const fresh = !c.revealed; c.revealed = true;
    tl.progress(1);
    if (fresh && !RM && c.spec.after && c.ctx) { const after = c.spec.after; c.ctx.add(() => after(c)); }
  }
  document.addEventListener('focusin', e => { const c = chapters.find(x => x.el.contains(e.target as Node)); if (c) c.finishReveal(); }, { signal: run.signal });

  return { chapters, addChapter };
}
