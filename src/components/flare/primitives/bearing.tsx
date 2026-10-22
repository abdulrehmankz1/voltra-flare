import type { ReactNode } from "react";
import { formatBearing } from "@/lib/bearing";
import { cx } from "@/lib/cx";

type BearingProps = {
  // The chapter's bearing in degrees; the dial's hand points along it.
  deg: number;
  className?: string;
  children: ReactNode;
};

// The bearing label that opens a chapter (.brg): a small dial, the bearing ("024°"), a dot and the label. The dial
// and the figures are decorative; the label reads on its own. At 0° the hand needs no rotation, so it has none.
export function Bearing({ deg, className, children }: BearingProps) {
  return (
    <p className={cx("brg", className)} data-deg={deg}>
      <svg className="brg__dial" viewBox="0 0 18 18" aria-hidden="true">
        <circle cx="9" cy="9" r="8.25" fill="none" stroke="currentColor" strokeOpacity=".45" />
        <path
          className="brg__hand"
          d="M9 9V1.9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={deg ? `rotate(${deg} 9 9)` : undefined}
        />
        <circle cx="9" cy="9" r="1.5" fill="currentColor" />
      </svg>
      <span className="brg__deg" aria-hidden="true">
        {formatBearing(deg)}
      </span>
      <span className="brg__dot" aria-hidden="true">
        ·
      </span>
      <span className="brg__txt">{children}</span>
    </p>
  );
}
