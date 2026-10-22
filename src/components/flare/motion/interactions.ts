import { gsap } from "gsap";
import type { Run } from "./runtime";
import { $$ } from "./utils";

/* ===================== interactions: magnetic, lit buttons ===================== */
// Each .btn gets a light (span.btn__lit) that follows the pointer, and the button leans toward it.
export function magnetic(run: Run): void {
  const { doc: d, reduce: RM, fine: FINE, signal } = run;
  if (!FINE || RM) return;
  $$('.btn').forEach(b => {
    const lit = d.createElement('span'); lit.className = 'btn__lit'; lit.setAttribute('aria-hidden', 'true'); b.prepend(lit);
    const xT = gsap.quickTo(b, 'x', { duration: .6, ease: 'power3' }), yT = gsap.quickTo(b, 'y', { duration: .6, ease: 'power3' }), lx = gsap.quickTo(lit, 'x', { duration: .3, ease: 'power3' }), ly = gsap.quickTo(lit, 'y', { duration: .3, ease: 'power3' });
    let r: DOMRect | null = null;
    b.addEventListener('pointerenter', () => { r = b.getBoundingClientRect(); }, { signal });
    b.addEventListener('pointermove', e => { if (!r) r = b.getBoundingClientRect(); const mx = e.clientX - r.left, my = e.clientY - r.top; xT((mx - r.width / 2) * .2); yT((my - r.height / 2) * .32); lx(mx); ly(my); }, { signal });
    b.addEventListener('pointerleave', () => { r = null; xT(0); yT(0); }, { signal });
  });
}
