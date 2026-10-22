// A compass bearing as the page prints it: three digits and the degree sign, 24 -> "024°".
export function formatBearing(deg: number): string {
  return `${String(deg).padStart(3, "0")}°`;
}
