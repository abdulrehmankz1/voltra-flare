/* ===================== grain ===================== */
export function grain(root: HTMLElement): void {
  try {
    const c = document.createElement('canvas'); c.width = c.height = 180; const x = c.getContext('2d'); if (!x) return; const im = x.createImageData(180, 180), a = im.data;
    for (let i = 0; i < a.length; i += 4) { const r = Math.random(); if (r < .5) { a[i] = a[i + 1] = a[i + 2] = 0; a[i + 3] = r * 2 * 30; } else { a[i] = a[i + 1] = a[i + 2] = 255; a[i + 3] = (r - .5) * 2 * 18; } }
    x.putImageData(im, 0, 0); root.style.setProperty('--grain', `url(${c.toDataURL('image/png')})`);
  } catch { /* grain is decorative */ }
}
