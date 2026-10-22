// The bearing dial that follows the chapters
export function Hud() {
  return (
    <div className="hud" id="hud" aria-hidden="true">
      <svg className="hud__dial" viewBox="-22 -22 44 44">
        <g className="hud__ticks" />
        <g className="hud__hand">
          <path d="M0 0V-17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <circle r="1.8" fill="currentColor" />
      </svg>
      {" "}
      <span className="hud__deg">000°</span>
    </div>
  );
}
