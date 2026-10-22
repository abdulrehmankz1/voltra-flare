# Visual parity test

`tests/visual-parity.mjs` compares the original `reference/Voltra_Flare_Website.html` (opened as `file:///`) with
the running Next.js port (default `http://localhost:3502`). It takes screenshots at the same scroll positions on both
pages and pixel-diffs them.

## What it checks
- Viewports 1440x900 (desktop) and 390x844 (phone, `isMobile` + `hasTouch`). DPR is 1, colour scheme dark, locale
  en-GB, timezone UTC. Motion is on by default; `--reduced-motion` runs the reduced-motion path.
- Shots, chapter by chapter: hero intro (800 ms after load, ignition mid-flight) and hero top (settled), hero at 50 %;
  proof entering and at top; product (#product) entering, then on desktop with motion the pinned scan at 0/33/66/100 %
  of the pin, otherwise product top, feature list and bottom; app top, stage parallax mid and end, bottom; security
  entering, top and keys; how entering, top and steps; pricing top and plan cards; FAQ top and list; close (#get)
  entering and top; footer; and on phone the menu opened (`#menuBtn`).
  Positions come from the **reference** layout (section offsets and the ScrollTrigger pin start/end). The same
  absolute `scrollY` is then used on both pages. Positions that coincide are merged.
- Document height: the test reports when it differs (pin spacer or layout).
- Load health: it detects a failed CDN script (gsap/ScrollTrigger/Lenis), Urbanist not loading, or `_next/static`
  failures. It then reports an error instead of comparing a broken page (exit 2). The reference needs network access.
- Boot: the original has no ready class (only `html.js`). A page counts as booted when `init()` has run: `.hud__ticks`
  has its paths, `.hero__art` has its canvases and at least 3 chapters have a non-empty `.ch > .art`. The notes list a
  missing boot, a different `--grain` tile hash, or different counts of hero canvases, built chapter arts or hud ticks.

## How it is deterministic
1. **Time.** `page.clock.install()` + `pauseAt()` run before navigation, so time only moves through `clock.runFor()`.
   An init script sets `performance.now` to the fake `Date.now` and replaces `requestAnimationFrame` with a fixed
   16 ms grid on fake `setTimeout` (Playwright's fake rAF carries a load-dependent real offset). The hero ignition
   (`t0 = performance.now()`, canvases painted per rAF until 1.65 s) and GSAP/Lenis all run off this.
2. **Randomness.** `Math.random` is seeded. Its only consumer is `grain()` (a 180x180 noise tile set as `--grain`).
   `createImageData(180, 180)` re-seeds it, so the tile does not depend on how many framework calls came first.
3. **Boot.** The test waits for `load`, network idle and `document.fonts.ready`, advances 100 ms steps to the boot
   signal, aligns both pages, shoots the intro at 800 ms, then runs 3000 ms more.
4. **Scroll.** `window.scrollTo({behavior:'instant'})` in steps of half the viewport height, waiting for the real
   `scroll` event, then 100 ms of virtual time. Lenis picks up native scroll and emits to ScrollTrigger, so "once"
   triggers, the nav hide/show, the hud and the light-band nav fire as for a user. Each position settles for 2500 ms.
5. **No pointer.** The mouse never moves, so the sweep runs its idle CSS loop and no magnetic button moves.
6. **CSS and raster.** Finite CSS animations/transitions are finished; infinite ones (sweep, pulses, blips, ...) are
   paused at 1500 ms. `will-change` layers are dropped and restored for a few real frames before each shot. Chromium
   runs with `--num-raster-threads=1`, which removes glyph anti-aliasing jitter.

Calibration (reference vs reference, `--self-check`, 2026-10-22): every shot 0.0000 % at both viewports with reduced
motion (1440: 25 shots, 390: 27); with motion every shot 0.0000 % except 1440 `security-in` at 0.0015 % (about 19 px; 1440: 27 shots, 390: 27).

## Run
```
yarn build && npx next start -p 3502          # in another terminal (never 3000 or 3501)
node tests/visual-parity.mjs --reduced-motion --out reports/visual-parity/rm
node tests/visual-parity.mjs --out reports/visual-parity/motion
node tests/visual-parity.mjs --self-check [--reduced-motion]   # harness sanity: reference vs itself
```
Options: `--base http://localhost:3502`, `--viewports 1440x900,390x844`, `--max-ratio 0.001` (fail above 0.1 % of
pixels), `--threshold 0.1` (pixelmatch colour threshold), `--settle 2500` (virtual ms), `--only hero-top,faq` (subset;
the scroll history then differs from a full walk). Debug: `VP_EVAL='<js>'` prints an expression on each page per shot;
`VP_ARGS` adds Chromium flags. A run takes about 60 s (both viewports in parallel).

## Reading results
- `<out>/summary.md` and `summary.json` hold the result (PASS/FAIL/ERROR), boot time, document heights, notes, and one row
  per shot with its mismatch % and pixel count. Default `<out>` is `tests/out/visual-parity/<self|port>-<rm|motion>`.
- `<out>/<viewport>[-rm]/<shot>-ref.png`, `-target.png` and `-diff.png` are the screenshots. Red pixels in the diff are mismatches.
- Exit codes: 0 means all shots are within `--max-ratio`, 1 means at least one shot is over it, 2 means a page failed to load.
- The noise floor is about 0 %, so any non-zero ratio above a few pixels is worth a look.

## Other scripts
- `tests/smoke.mjs [--base http://localhost:3502] [--routes /]`: status, console errors and horizontal overflow at 1440 and 390.
- `tests/a11y.mjs [--base http://localhost:3502] [--screens /]`: DOM label checks, Tab walk with focus ring, axe if installed.
