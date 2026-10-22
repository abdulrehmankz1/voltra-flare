// The ray an item takes on its chapter's fan (data-a, in degrees): rays 36° apart, the first at -144°, so the
// capabilities and the key shares spread left of the vertical (-90°) and round to the right of it.
export function fanAngle(index: number): number {
  return -144 + 36 * index;
}
