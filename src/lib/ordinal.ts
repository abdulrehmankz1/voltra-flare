// Zero-padded position label for a list index: 0 -> "01".
export function ordinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}
