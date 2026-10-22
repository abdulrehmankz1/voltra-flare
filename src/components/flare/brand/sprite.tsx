import { ICON_ARTWORK, ICON_NAMES, iconId, type IconArtwork, type IconShape, type Pen } from "./icon-artwork";
import { LOCKUP, MARK, WORDMARK, viewBoxOf } from "./mark-geometry";

// The inline sprite every <use> on the page points at: the mark, the wordmark, the lockup that composes them and the
// icons (#i-*).
export function Sprite() {
  return (
    <svg className="defs" aria-hidden="true" focusable="false" width="0" height="0">
      <symbol id={MARK.id} viewBox={viewBoxOf(MARK.box)}>
        <path d={MARK.d} />
      </symbol>
      <symbol id={WORDMARK.id} viewBox={viewBoxOf(WORDMARK.box)}>
        <path d={WORDMARK.d} />
      </symbol>
      <symbol id={LOCKUP.id} viewBox={viewBoxOf(LOCKUP.box)}>
        <path transform={LOCKUP.markTransform} d={MARK.d} />
        <path transform={LOCKUP.wordmarkTransform} d={WORDMARK.d} />
      </symbol>
      {ICON_NAMES.map((name) => {
        const artwork: IconArtwork = ICON_ARTWORK[name];
        const { pen, box, shapes } = artwork;
        return (
          <symbol key={name} id={iconId(name)} viewBox={box ? viewBoxOf(box) : "0 0 24 24"} {...penProps(pen)}>
            {shapes.map((shape, i) => (
              <Shape key={i} shape={shape} />
            ))}
          </symbol>
        );
      })}
    </svg>
  );
}

// The pen as presentation attributes on the symbol, inherited by every shape.
function penProps(pen: Pen) {
  if (pen === "solid") return { fill: "currentColor" };
  return {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: pen === "fine" ? "1.6" : "1.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: pen === "capped" ? undefined : ("round" as const),
  };
}

function Shape({ shape }: { shape: IconShape }) {
  if ("d" in shape) return <path d={shape.d} opacity={shape.opacity} />;
  if ("rect" in shape)
    return shape.outline ? (
      <rect {...shape.rect} fill="none" stroke="currentColor" strokeOpacity={shape.outline} />
    ) : (
      <rect {...shape.rect} />
    );
  if ("circle" in shape) return <circle {...shape.circle} />;
  return <ellipse {...shape.ellipse} />;
}
