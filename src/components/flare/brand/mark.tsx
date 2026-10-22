import { LOCKUP, MARK, symbolHref, viewBoxOf } from "./mark-geometry";

// The mark on its own, drawn from the sprite. Every use sits inside a hidden container, so it carries no
// accessibility attributes of its own.
export function MarkGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={viewBoxOf(MARK.box)}>
      <use href={symbolHref(MARK.id)} />
    </svg>
  );
}

// Mark plus wordmark. Decorative where the surrounding link carries the name (the nav); in the footer it names
// itself (`label`).
export function Lockup({ label }: { label?: string }) {
  return (
    <svg
      viewBox={viewBoxOf(LOCKUP.box)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      focusable={label ? undefined : "false"}
    >
      <use href={symbolHref(LOCKUP.id)} />
    </svg>
  );
}
