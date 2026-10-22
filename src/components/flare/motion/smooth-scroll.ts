import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type { Run } from "./runtime";

/* ---------- smooth scroll ---------- */
export type SmoothScroll = { lenis: Lenis | null; dispose(): void };

/**
 * Lenis drives the page (not under reduced motion); every scroll updates ScrollTrigger, then `onScroll`. Without
 * Lenis the window's own scroll event calls `onScroll`. (The original also checked for window.Lenis from the CDN;
 * the npm import is always present.)
 */
export function smoothScroll(run: Run, onScroll: (y: number) => void): SmoothScroll {
  let lenis: Lenis | null = null;
  let tick: gsap.TickerCallback | null = null;
  if (!run.reduce) {
    const l = lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    l.on('scroll', e => { ScrollTrigger.update(); onScroll(e.scroll != null ? e.scroll : scrollY); });
    tick = t => l.raf(t * 1000);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
  } else addEventListener('scroll', () => onScroll(scrollY), { passive: true, signal: run.signal });
  return {
    lenis,
    dispose() {
      if (tick) gsap.ticker.remove(tick);
      // back to GSAP's defaults (500, 33) so a remount starts from the same global ticker state
      if (lenis) { gsap.ticker.lagSmoothing(500, 33); lenis.destroy(); }
    }
  };
}
