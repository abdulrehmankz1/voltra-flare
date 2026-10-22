// Order-preserving class join. Unlike `cn` (tailwind-merge), it never drops or reorders classes,
// so the original class strings, which the stylesheet and motion code depend on, survive verbatim.
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
