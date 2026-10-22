import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { app } from "./app";
import { type ChapterHandle, createChapters, type Env, type FaqState } from "./chapters";
import { createChoreo } from "./choreo";
import { close, footer } from "./close";
import { restoreDom, snapshotDom } from "./dom-snapshot";
import { accordion, faq } from "./faq";
import { features } from "./features";
import { grain } from "./grain";
import { createHero, heroOut } from "./hero";
import { how } from "./how";
import { magnetic } from "./interactions";
import { createNav } from "./nav";
import { phoneUI } from "./phone-ui";
import { billing, pricing } from "./pricing";
import { proof } from "./proof";
import { createRun } from "./runtime";
import { security } from "./security";
import { type SmoothScroll, smoothScroll } from "./smooth-scroll";
import { resetGid } from "./svg-kit";
import { $$ } from "./utils";

/** dispatched once the script runs; layout.tsx's head script then keeps the js class (see there) */
export const MOTION_EVENT = 'flare:motion';

/**
 * The original page script (reference/Voltra_Flare_Website.html), run once per mount, statements in the original
 * order. Returns a cleanup that leaves the page exactly as React rendered it, so Strict Mode's mount, unmount, mount
 * gives the same page as a single production mount.
 *
 * The original also ran without GSAP (a CDN failure): a small set() shim placed the phones, sprites and dials in
 * their final state. GSAP is bundled here, so that path (`HAS` false) cannot occur and is not ported.
 */
export function startFlareMotion(): () => void {
  const d = document, root = d.documentElement;
  // pristine markup, taken before anything below touches the DOM
  const snapshot = snapshotDom(d);

  let RM = false, FINE = false;
  try { RM = matchMedia('(prefers-reduced-motion: reduce)').matches; FINE = matchMedia('(hover: hover) and (pointer: fine)').matches; } catch { /* no matchMedia: full motion, coarse pointer */ }
  root.classList.add('js');
  if (!root.lang) root.lang = 'en-GB'; // the artifact host supplies the root element without a language
  $$('.qa:not(.is-open) .qa__a').forEach(a => { a.hidden = true; });
  // gsap and ScrollTrigger are bundled from npm (3.12.5); from the CDN, ScrollTrigger registered itself on load
  gsap.registerPlugin(ScrollTrigger); ScrollTrigger.config({ ignoreMobileResize: true });
  resetGid();
  window.dispatchEvent(new Event(MOTION_EVENT));

  const { run, dispose: disposeRun } = createRun({ reduce: RM, fine: FINE });
  // every tween, timeline, quickTo and ScrollTrigger created at boot and in init() is recorded here; each chapter
  // keeps its own context (rebuilt on resize), and animations created later in handlers are tracked by the run
  const ctx = gsap.context(() => {});
  let smooth: SmoothScroll | null = null;
  let chapters: ChapterHandle[] = [];

  ctx.add(() => {
    const Hero = createHero(run);
    const FAQ: FaqState = { dial: null };
    const env: Env = { run, ch: createChoreo(run), clips: new WeakMap(), faq: FAQ };

    /* ===================== chapters ===================== */
    const reg = createChapters(run); chapters = reg.chapters;
    reg.addChapter('#proof', proof(env));
    reg.addChapter('#product', features(env));
    reg.addChapter('#app', app(env));
    reg.addChapter('#security', security(env));
    reg.addChapter('#how', how(env));
    reg.addChapter('#pricing', pricing(env));
    reg.addChapter('#faq', faq(env));
    reg.addChapter('#get', close(env));
    reg.addChapter('#footer', footer(env));

    /* ===================== culling ===================== */
    const farIO = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('ch--far', !e.isIntersecting)), { rootMargin: '110% 0px' }) : null;
    if (farIO) run.defer(() => farIO.disconnect());
    // under reduced motion nothing moves, so no chapter is culled: every still frame stays drawn (full-page captures and print included)
    function cull() { if (!farIO || RM) return; farIO.disconnect(); $$('.ch').forEach(el => farIO.observe(el)); }
    // a jump of more than a screen (End key, scrollbar drag, an instant anchor) restores the art in the same frame
    function uncull(y: number) { const vh = innerHeight, lo = y - vh * 1.1, hi = y + vh * 2.1; $$('.ch--far').forEach(el => { const r = el.getBoundingClientRect(), t = r.top + scrollY; if (t < hi && t + r.height > lo) el.classList.remove('ch--far'); }); }
    function buildAll() { $$('.ch--far').forEach(el => el.classList.remove('ch--far')); chapters.forEach(c => { try { c.setup(); } catch (e) { console.error('chapter ' + c.el.id, e); } }); cull(); }

    const nav = createNav(run, Hero, FAQ, uncull);

    /* ===================== boot ===================== */
    let lastW = innerWidth, rz: number | undefined;
    function init() {
      grain(root); env.clips = phoneUI(); nav.hudInit();
      const skip = scrollY > 200;
      const sm = smooth = smoothScroll(run, nav.navScroll); nav.setLenis(sm.lenis);
      nav.navScroll(scrollY);
      buildAll(); nav.navThemes(); magnetic(run); accordion(run, FAQ); billing(run);
      if (Hero) { Hero.start(skip); Hero.refit(); }
      heroOut(run);
      ScrollTrigger.refresh();
      if (sm.lenis && sm.lenis.resize) sm.lenis.resize();
      // a deep link lands on its target once the pinned chapter has added its scroll length
      if (location.hash.length > 1) { const t = d.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) nav.goTo(t, true); }
      addEventListener('resize', () => {
        run.clearTimeout(rz); rz = run.setTimeout(() => {
          if (Hero) Hero.resize();
          if (innerWidth === lastW) { ScrollTrigger.refresh(); return; }
          lastW = innerWidth; buildAll(); ScrollTrigger.refresh();
        }, 220);
      }, { signal: run.signal });
    }
    // the signal ignites straight away (the copy is already on screen); chapters build once the type has loaded
    if (Hero) Hero.start(scrollY > 200);
    const ready = d.fonts && d.fonts.ready ? Promise.race([d.fonts.ready, new Promise<void>(r => { run.setTimeout(r, 900); })]) : Promise.resolve();
    // init() runs in a later frame, outside this callback: ctx.add records what it creates in the same context
    run.then(ready, () => { run.requestAnimationFrame(() => ctx.add(init)); });
  });

  return () => {
    // listeners, timeouts, frames (the hero ignition and aim loops), observers and the animations created after boot
    disposeRun();
    // Lenis (its ticker hook, lag smoothing, listeners and html classes)
    if (smooth) smooth.dispose();
    // each chapter's context: its tweens, ScrollTriggers and the features pin (rebuilt on resize, outside ctx)
    chapters.forEach(c => { const cc = c.ctx(); if (cc) cc.revert(); });
    // the boot context: hero copy scroll-out, nav themes, HUD triggers, magnetic quickTos
    ctx.revert();
    // ScrollTrigger's own default (true on touch-only devices)
    ScrollTrigger.config({ ignoreMobileResize: ScrollTrigger.isTouch === 1 });
    // art, layers, canvases, moved phones, split words, text, inline styles, attributes and root classes back to the server markup
    restoreDom(snapshot);
  };
}
