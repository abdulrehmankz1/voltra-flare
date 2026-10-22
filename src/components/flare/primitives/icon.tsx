import { ICON_ARTWORK, iconId, type IconArtwork, type IconName } from "../brand/icon-artwork";
import { symbolHref, viewBoxOf } from "../brand/mark-geometry";
import { cx } from "@/lib/cx";

type IconProps = {
  name: IconName;
  className?: string;
  // A size (px) set inline where the original sizes the icon itself rather than through the stylesheet, and the
  // occasional colour.
  size?: number;
  color?: string;
  // Set where the icon sits beside its own text label; inside hidden or role="img" containers it is left off, as in
  // the original.
  "aria-hidden"?: "true";
};

// An icon from the sprite (.ic). Size and colour otherwise come from the container's CSS.
export function Icon({ name, className, size, color, "aria-hidden": ariaHidden }: IconProps) {
  const style = size ? { width: `${size}px`, height: `${size}px`, color } : undefined;
  return (
    <svg className={cx("ic", className)} style={style} aria-hidden={ariaHidden}>
      <use href={symbolHref(iconId(name))} />
    </svg>
  );
}

// A sprite icon without the .ic class, sized by its container's CSS (the check in a plan's tick, the spark in the
// analytics insight). `framed` repeats the symbol's own viewBox on the <svg>, as the ticks do.
export function Glyph({ name, framed }: { name: IconName; framed?: boolean }) {
  const artwork: IconArtwork = ICON_ARTWORK[name];
  return (
    <svg viewBox={framed && artwork.box ? viewBoxOf(artwork.box) : undefined}>
      <use href={symbolHref(iconId(name))} />
    </svg>
  );
}
