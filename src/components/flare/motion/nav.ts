import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";
import type { FaqState } from "./chapters";
import type { Hero } from "./hero";
import type { Run } from "./runtime";
import { arcs, mkSVG, rays, rayD, rg, S } from "./svg-kit";
import { $, $$, deg3, R2, range, SOFT, V5, V7, V9, W } from "./utils";

/* ===================== nav, menu, HUD, anchors ===================== */
export type Nav = {
  navScroll(y: number): void;
  goTo(t: HTMLElement, instant?: boolean): void;
  setLenis(l: Lenis | null): void;
  hudInit(): void;
  navThemes(): void;
};

export function createNav(run: Run, Hero: Hero | null, FAQ: FaqState, uncull: (y: number) => void): Nav {
  const { doc: d, root, reduce: RM, signal } = run;
  const nav = $('#nav'), menuBtn = $('#menuBtn'), menu = $('#menu'), hud = d.querySelector<HTMLElement>('#hud');
  let lenis: Lenis | null = null, menuOpen = false, lastY = 0;
  function navScroll(y: number) {
    nav.classList.toggle('is-solid', y > 24);
    const dy = y - lastY; if (Math.abs(dy) > innerHeight * .8) uncull(y);
    if (!menuOpen && !nav.contains(d.activeElement)) { if (y > 200 && dy > 4) nav.classList.add('is-hidden'); else if (dy < -4 || y < 200) nav.classList.remove('is-hidden'); }
    lastY = y;
    if (Hero) Hero.setScroll(y);
    if (hud) hud.classList.toggle('is-on', y > (Hero ? Hero.el.offsetHeight * .55 : 400));
  }
  nav.addEventListener('focusin', () => nav.classList.remove('is-hidden'), { signal });
  function trapKeys(e: KeyboardEvent) {
    if (e.key === 'Escape') { closeMenu(true); return; }
    if (e.key !== 'Tab') return;
    const f = [...$$('a, button', nav), ...$$('a, button', menu)].filter(x => x.offsetParent !== null); const i = f.indexOf(d.activeElement as HTMLElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && (i === f.length - 1 || i < 0)) { e.preventDefault(); f[0].focus(); }
  }
  const behind = () => [d.querySelector<HTMLElement>('#main'), d.querySelector<HTMLElement>('#footer'), hud, d.querySelector<HTMLElement>('.skip')].filter((x): x is HTMLElement => x !== null);
  function menuArt() {
    const host = $('.menu__art', menu); host.innerHTML = ''; const w = menu.offsetWidth, h = menu.offsetHeight, sv = mkSVG(host, w, h), ox = 0, oy = h;
    S('rect', { width: w, height: h, fill: rg(sv, ox, oy, w * 1.2, [[0, V5, .35], [.4, V7, .14], [1, V9, 0]], h * .7) }, sv);
    rays(sv, ox, oy, 30, Math.max(w, h) * 1.4, range(-84, -6, 6), rg(sv, ox, oy, Math.max(w, h) * 1.2, [[0, W, .2], [.5, W, .06], [1, W, .01]]));
    arcs(sv, ox, oy, range(96, Math.max(w, h) * 1.3, 96), -90, 0, rg(sv, ox, oy, Math.max(w, h) * 1.2, [[0, W, .16], [1, W, .02]]));
    return host;
  }
  function openMenu() {
    if (menuOpen) return; menuOpen = true; menu.hidden = false; root.classList.add('menu-open'); menuBtn.setAttribute('aria-expanded', 'true'); menuBtn.setAttribute('aria-label', 'Close menu');
    nav.classList.remove('is-hidden'); if (lenis) lenis.stop(); d.addEventListener('keydown', trapKeys, { signal }); behind().forEach(x => { x.inert = true; });
    const host = menuArt();
    if (!RM) { run.track(gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: .35, ease: SOFT })); run.track(gsap.fromTo(host, { scale: .85, transformOrigin: '0% 100%', opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'expo.out' })); run.track(gsap.fromTo($$('.menu__list li, .menu__foot .btn', menu), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: 'expo.out', stagger: .05, delay: .08 })); }
    run.setTimeout(() => { const a = menu.querySelector<HTMLElement>('.menu__list a'); if (a) a.focus(); }, 60);
  }
  function closeMenu(focusBtn: boolean) {
    if (!menuOpen) return; menuOpen = false; root.classList.remove('menu-open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'Open menu'); d.removeEventListener('keydown', trapKeys); behind().forEach(x => { x.inert = false; });
    if (lenis) lenis.start();
    const done = () => { if (!menuOpen) menu.hidden = true; };
    if (!RM) run.track(gsap.to(menu, { opacity: 0, duration: .3, ease: SOFT, onComplete: done })); else done();
    if (focusBtn) menuBtn.focus();
  }
  menuBtn.addEventListener('click', () => (menuOpen ? closeMenu(true) : openMenu()), { signal });
  // layout position, unaffected by reveal or FLIP transforms in flight
  const absTop = (el: HTMLElement) => { let y = 0; for (let e: HTMLElement | null = el; e; e = e.offsetParent as HTMLElement | null) y += e.offsetTop; return y; };
  function goTo(t0: HTMLElement, instant?: boolean) {
    let t = t0;
    if (t.classList.contains('anchor')) t = t.closest<HTMLElement>('.ch') || t;
    if (t.classList.contains('qa') && FAQ.open) FAQ.open(t);
    const off = t.classList.contains('ch') ? 0 : -(nav.offsetHeight + 24), y = Math.max(0, absTop(t) + off);
    if (instant || RM || !lenis) uncull(y);
    if (lenis) { if (instant && lenis.resize) lenis.resize(); lenis.scrollTo(y, { duration: instant ? 0 : 1.4, immediate: !!instant, force: true }); }
    else window.scrollTo({ top: y, behavior: instant || RM ? 'auto' : 'smooth' });
    if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true });
  }
  d.addEventListener('click', e => {
    const a = (e.target as Element).closest('a[href^="#"]'); if (!a) return; const id = a.getAttribute('href') ?? ''; if (id.length < 2) return;
    const t = d.getElementById(id.slice(1)); if (!t) return; e.preventDefault();
    const was = menuOpen; if (menuOpen) closeMenu(false);
    if (was) run.requestAnimationFrame(() => goTo(t)); else goTo(t);
  }, { signal });
  function hudInit() {
    if (!hud) return; const tk = $('.hud__ticks', hud);
    for (let a = 0; a < 360; a += 12) S('path', { d: rayD(0, 0, a % 36 === 0 ? 15.5 : 17.5, 20, a - 90), stroke: 'currentColor', 'stroke-opacity': a % 36 === 0 ? .6 : .3, fill: 'none' }, tk);
    S('circle', { r: 20.5, fill: 'none', stroke: 'currentColor', 'stroke-opacity': .25 }, tk);
  }
  let hudDeg = 0;
  function hudSet(deg: number, light: boolean) {
    if (!hud) return; hud.classList.toggle('hud--light', !!light);
    const hand = $('.hud__hand', hud), num = $('.hud__deg', hud), o = { v: hudDeg }; hudDeg = deg;
    if (RM) { hand.setAttribute('transform', `rotate(${deg})`); num.textContent = deg3(deg); return; }
    run.track(gsap.to(o, { v: deg, duration: .9, ease: 'power4.inOut', overwrite: true, onUpdate: () => { hand.setAttribute('transform', `rotate(${R2(o.v)})`); num.textContent = deg3(o.v); } }));
  }
  function navThemes() {
    // what the original kept as `el._navOn`: which light chapters sit under the nav
    const on = new Map<HTMLElement, boolean>(), lights = $$('.ch--light');
    lights.forEach(el => ScrollTrigger.create({ trigger: el, start: () => 'top top+=' + Math.round(nav.offsetHeight / 2), end: () => 'bottom top+=' + Math.round(nav.offsetHeight / 2), onToggle: s => { on.set(el, s.isActive); const lt = $$('.ch--light').some(x => on.get(x)); nav.classList.toggle('nav--light', lt); root.classList.toggle('band-light', lt); } }));
    $$('[data-deg]').filter(el => el.classList.contains('ch')).forEach(el => ScrollTrigger.create({ trigger: el, start: 'top center', end: 'bottom center', onToggle: s => { if (s.isActive) hudSet(+(el.dataset.deg ?? ''), el.classList.contains('ch--light')); } }));
  }
  return { navScroll, goTo, setLenis: l => { lenis = l; }, hudInit, navThemes };
}
