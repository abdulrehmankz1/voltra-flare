import { site } from "@/content/site";
import { formatBearing } from "@/lib/bearing";

export function SkipLink() {
  return (
    <a className="skip" href="#main">
      {site.skipLabel}
    </a>
  );
}

// The fixed bearing dial (#hud). The motion layer draws its ticks, turns the hand and updates the bearing as the
// chapters pass; it ships at 000°, the hero's.
export function Hud() {
  return (
    <div className="hud" id="hud" aria-hidden="true">
      <svg className="hud__dial" viewBox="-22 -22 44 44">
        <g className="hud__ticks" />
        <g className="hud__hand">
          <path d="M0 0V-17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <circle r="1.8" fill="currentColor" />
      </svg>{" "}
      <span className="hud__deg">{formatBearing(0)}</span>
    </div>
  );
}
