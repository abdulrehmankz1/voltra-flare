import { proofCopy, statText, stats, type Stat } from "@/content/proof";
import { bearingOf } from "@/content/site";
import { spaced } from "@/lib/spaced";
import { Bearing } from "../../primitives/bearing";
import { Art, Chapter } from "../../primitives/layout";

// 012° Proof: four live figures around the radar the motion layer sweeps (.radar). The heading is for assistive
// tech only.
export function Proof() {
  return (
    <Chapter id="proof" className="proof" labelledBy="proof-t">
      <Art />{" "}
      <div className="wrap proof__in">
        <h2 className="sr-only" id="proof-t">
          {proofCopy.title}
        </h2>{" "}
        <Bearing deg={bearingOf("proof")}>{proofCopy.bearing}</Bearing>{" "}
        <div className="proof__radar">
          <Art className="radar" />{" "}
          <ul className="stats">
            {spaced(
              stats,
              (stat) => stat.label,
              (stat) => (
                <ProofStat stat={stat} />
              ),
            )}
          </ul>
        </div>
      </div>
    </Chapter>
  );
}

// One figure; the motion layer counts it up from its data-* hooks and ships it at its final value.
function ProofStat({ stat }: { stat: Stat }) {
  return (
    <li className="stat">
      <span
        className="stat__v"
        data-num={stat.count}
        data-dec={stat.decimals}
        data-pre={stat.prefix}
        data-suf={stat.suffix}
        data-late={stat.late ? "1" : undefined}
      >
        {statText(stat)}
      </span>
      <span className="stat__l">{stat.label}</span>
    </li>
  );
}
