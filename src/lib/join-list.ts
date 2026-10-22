// "A", "A and B", "A, B and C": the list style the site's copy uses (no serial comma).
export function joinList(items: readonly string[]): string {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}
