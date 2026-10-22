import type { gsap } from "gsap";

/*
 * Per-run state shared by every module. The original script ran once per page load; here it runs once per mount,
 * so everything it schedules is registered with the run and torn down by `dispose()`:
 * - DOM listeners take `signal` (one AbortController),
 * - timeouts and animation frames go through `setTimeout` / `requestAnimationFrame`, which no-op after dispose,
 * - animations created outside any GSAP context (in event handlers, timeline callbacks and ScrollTrigger callbacks,
 *   where the original had no context either) are registered with `track` so they can be killed. Tracking does not
 *   change which GSAP context records an animation, so a chapter rebuild reverts exactly what it reverted originally,
 * - anything else (an observer, a ticker hook, a global) registers an undo with `defer`.
 */
export type Run = {
  readonly doc: Document;
  readonly root: HTMLElement;
  /** prefers-reduced-motion: reduce, read once like the original (RM) */
  readonly reduce: boolean;
  /** (hover: hover) and (pointer: fine), read once like the original (FINE) */
  readonly fine: boolean;
  readonly signal: AbortSignal;
  setTimeout(fn: () => void, ms?: number): number;
  clearTimeout(id: number | undefined): void;
  requestAnimationFrame(fn: FrameRequestCallback): number;
  cancelAnimationFrame(id: number): void;
  track<T extends gsap.core.Animation>(a: T): T;
  defer(undo: () => void): void;
  /** a promise cannot be cancelled: its continuation is dropped if this run was cleaned up meanwhile */
  then<T>(p: Promise<T>, fn: () => void): void;
  isDisposed(): boolean;
};

export type RunHandle = { run: Run; dispose(): void };

export function createRun(flags: { reduce: boolean; fine: boolean }): RunHandle {
  const ac = new AbortController();
  const timeouts = new Set<number>();
  const frames = new Set<number>();
  const tracked = new Set<gsap.core.Animation>();
  const undos: (() => void)[] = [];
  let disposed = false;
  const run: Run = {
    doc: document,
    root: document.documentElement,
    ...flags,
    signal: ac.signal,
    setTimeout(fn, ms) {
      if (disposed) return 0;
      const id = window.setTimeout(() => { timeouts.delete(id); fn(); }, ms);
      timeouts.add(id);
      return id;
    },
    clearTimeout(id) {
      if (id === undefined) return;
      timeouts.delete(id);
      window.clearTimeout(id);
    },
    requestAnimationFrame(fn) {
      if (disposed) return 0;
      const id = window.requestAnimationFrame(now => { frames.delete(id); fn(now); });
      frames.add(id);
      return id;
    },
    cancelAnimationFrame(id) {
      frames.delete(id);
      window.cancelAnimationFrame(id);
    },
    track(a) {
      if (disposed) { a.kill(); return a; }
      tracked.add(a);
      return a;
    },
    defer(undo) {
      if (disposed) { undo(); return; }
      undos.push(undo);
    },
    then(p, fn) { p.then(() => { if (!disposed) fn(); }); },
    isDisposed: () => disposed
  };
  return {
    run,
    dispose() {
      disposed = true;
      ac.abort();
      timeouts.forEach(id => window.clearTimeout(id)); timeouts.clear();
      frames.forEach(id => window.cancelAnimationFrame(id)); frames.clear();
      tracked.forEach(a => a.kill()); tracked.clear();
      for (let i = undos.length - 1; i >= 0; i--) undos[i]();
      undos.length = 0;
    }
  };
}
