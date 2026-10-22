import { arcD, CI, lg, nextId, P, rayD, rg, S, secD, withDefs } from "./svg-kit";
import { $$, BLUE, MIST, pt, R2, rgba, V1, V3, V5, V7, W } from "./utils";

/* ===================== phone UI (gauges, charts) ===================== */
/** returns the chart's clip rect per .an-chart svg (the original kept it as `sv._clip`) */
export function phoneUI(): WeakMap<SVGSVGElement, SVGRectElement> {
  const clips = new WeakMap<SVGSVGElement, SVGRectElement>();
  $$<SVGSVGElement>('.hgauge').forEach(s0 => {
    s0.innerHTML = ''; const sv = withDefs(s0);
    const lit: string[] = [], offs: string[] = [];
    for (let i = 0; i < 15; i++) (i < 12 ? lit : offs).push(secD(46, 54, 30, 44, -180 + i * 12 + 1.2, -180 + (i + 1) * 12 - 1.2));
    P(sv, lit.join(''), { fill: lg(sv, 2, 30, 90, 30, [[0, V7], [.6, BLUE], [1, MIST]]), class: 'hg-lit' });
    P(sv, offs.join(''), { fill: rgba(W, .1) });
    S('text', { x: 46, y: 47, 'text-anchor': 'middle', fill: W, 'font-size': 22, 'font-weight': 300, 'letter-spacing': '-.6' }, sv).textContent = '82';
    S('text', { x: 46, y: 62, 'text-anchor': 'middle', fill: W, 'fill-opacity': .6, 'font-size': 8, 'font-weight': 500, 'letter-spacing': '.8', style: 'text-transform:uppercase' }, sv).textContent = 'Health';
  });
  $$<SVGSVGElement>('.alloc__g').forEach(s0 => {
    s0.innerHTML = ''; const sv = withDefs(s0);
    const cx = 155, cy = 120, r0 = 78, r1 = 100, map = (v: number) => -180 + 180 * v / 40;
    P(sv, secD(cx, cy, r0, r1, -180, 0), { fill: rgba(W, .07) });
    const blades: [number, number][] = []; for (let a = -180; a < 0; a += 12) blades.push([a + 1, a + 11]);
    const now = map(21), tgt = map(15);
    P(sv, blades.filter(b => b[1] <= now + .01).map(b => secD(cx, cy, r0, r1, b[0], b[1])).join(''), { fill: lg(sv, cx - r1, cy, cx + r1, cy, [[0, W], [.5, MIST], [1, V5]]) });
    P(sv, rayD(cx, cy, r0 - 8, r1 + 8, tgt), { stroke: '#2BD47D', 'stroke-width': 2, 'stroke-linecap': 'round' });
    const tp = pt(cx, cy, r1 + 16, tgt); S('text', { x: R2(tp[0] - 4), y: R2(tp[1]), 'text-anchor': 'end', fill: '#2BD47D', 'font-size': 10, 'font-weight': 500, 'letter-spacing': '.8', style: 'text-transform:uppercase' }, sv).textContent = '15% target';
    S('text', { x: cx, y: cy - 22, 'text-anchor': 'middle', fill: W, 'font-size': 34, 'font-weight': 300, 'letter-spacing': '-1' }, sv).textContent = '21%';
    S('text', { x: cx, y: cy - 4, 'text-anchor': 'middle', fill: W, 'fill-opacity': .55, 'font-size': 10, 'font-weight': 500, 'letter-spacing': '1', style: 'text-transform:uppercase' }, sv).textContent = 'ETH now';
  });
  $$<SVGSVGElement>('.an-chart').forEach(s0 => {
    s0.innerHTML = ''; const sv = withDefs(s0);
    const n = 31, a0 = 22954.21, a1 = 24860.42, pts: number[] = []; let s = 7;
    const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    let v = a0; for (let i = 0; i < n; i++) { const tgt = a0 + (a1 - a0) * (i / (n - 1)); v = i === 0 ? a0 : i === n - 1 ? a1 : tgt + (rnd() - .5) * 520 + Math.sin(i * .7) * 180; pts.push(v); }
    const lo = Math.min(...pts) - 200, hi = Math.max(...pts) + 160, X = (i: number) => 20 + i * (330 / (n - 1)), Y = (v: number) => 118 - (v - lo) / (hi - lo) * 100;
    for (const gy of [26, 60, 94]) P(sv, `M20 ${gy}H370`, { stroke: rgba(W, .06), 'stroke-dasharray': '2 4' });
    let dd = `M${X(0)} ${R2(Y(pts[0]))}`; for (let i = 1; i < n; i++) { const xm = (X(i - 1) + X(i)) / 2; dd += `C${R2(xm)} ${R2(Y(pts[i - 1]))} ${R2(xm)} ${R2(Y(pts[i]))} ${R2(X(i))} ${R2(Y(pts[i]))}`; }
    const clip = S('clipPath', { id: nextId() }, sv.defs), cr = S('rect', { x: 0, y: -40, width: 390, height: 200, class: 'chart-clip' }, clip);
    const grp = S('g', { 'clip-path': `url(#${clip.id})` }, sv);
    P(grp, dd + `L${X(n - 1)} 122L${X(0)} 122Z`, { fill: lg(sv, 0, 10, 0, 122, [[0, V5, .38], [1, V5, 0]]) });
    P(grp, dd, { stroke: lg(sv, 20, 0, 350, 0, [[0, V3], [1, W]]), 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round' });
    const ex = X(n - 1), ey = Y(pts[n - 1]);
    const rad = S('g', { class: 'chart-end' }, sv);
    for (const [r, o] of [[26, .1], [16, .18]]) CI(rad, ex, ey, r, { fill: 'none', stroke: rgba(W, o) });
    P(rad, secD(ex, ey, 0, 26, -72, -30), { fill: rg(sv, ex, ey, 26, [[0, V1, .5], [1, V1, 0]]) });
    CI(rad, ex, ey, 9, { fill: rgba(V5, .35) }); CI(rad, ex, ey, 4, { fill: W });
    ([['21 Sep', X(0)], ['1 Oct', X(10)], ['11 Oct', X(20)], ['Today', X(30)]] as const).forEach(([t, x], i) => { S('text', { x: R2(x), y: 144, 'text-anchor': i === 0 ? 'start' : i === 3 ? 'end' : 'middle', fill: W, 'fill-opacity': .5, 'font-size': 10.5, 'font-weight': 500 }, sv).textContent = t; });
    clips.set(s0, cr);
  });
  $$<SVGSVGElement>('.an-health').forEach(s0 => {
    s0.innerHTML = ''; const sv = withDefs(s0);
    const lit: string[] = [], offs: string[] = []; for (let i = 0; i < 15; i++) (i < 12 ? lit : offs).push(secD(70, 66, 40, 58, -180 + i * 12 + 1.2, -180 + (i + 1) * 12 - 1.2));
    P(sv, lit.join(''), { fill: lg(sv, 12, 40, 128, 40, [[0, V7], [.6, BLUE], [1, MIST]]) }); P(sv, offs.join(''), { fill: rgba(W, .1) });
    for (let a = -180; a <= 0; a += 6) P(sv, rayD(70, 66, 61, a % 36 === 0 ? 67 : 64, a), { stroke: rgba(W, .3) });
  });
  $$<SVGSVGElement>('.an-alloc').forEach(s0 => {
    s0.innerHTML = ''; const sv = withDefs(s0);
    const ox = 10, oy = 68, R0 = 8, R1 = 62, parts: [number, string][] = [[73.2, lg(sv, 0, 0, 70, 0, [[0, V7], [1, BLUE]])], [20.6, MIST], [6.2, rgba(W, .7)]];
    let a = -90; parts.forEach(([v, f]) => { const sp = 90 * v / 100; P(sv, secD(ox, oy, R0, R1, a + .8, a + sp - .8), { fill: f }); a += sp; });
    P(sv, arcD(ox, oy, R1 + 5, -90, 0), { stroke: rgba(W, .25), fill: 'none' });
  });
  return clips;
}
