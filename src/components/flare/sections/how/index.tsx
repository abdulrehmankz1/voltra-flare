import { howIntro, steps, type Step as StepContent } from "@/content/how";
import { cx } from "@/lib/cx";
import { ordinal } from "@/lib/ordinal";
import { spaced } from "@/lib/spaced";
import { SectionHead } from "../../primitives/heading";
import { Art, Chapter } from "../../primitives/layout";

// 060° How it works, the first paper chapter. The motion layer walks the three steps in turn.
export function How() {
  return (
    <Chapter id="how" className="how" light labelledBy="how-t">
      <Art />{" "}
      <div className="wrap how__in">
        <SectionHead chapter="how" id="how-t" intro={howIntro} left />{" "}
        <ol className="steps">
          {spaced(
            steps,
            (step) => step.title,
            (step, index) => (
              <Step step={step} index={index} />
            ),
          )}
        </ol>
      </div>
    </Chapter>
  );
}

// One step: its number (the last ships lit), heading and body.
function Step({ step, index }: { step: StepContent; index: number }) {
  return (
    <li className="step">
      <span className={cx("step__n", index === steps.length - 1 && "step__n--on")} aria-hidden="true">
        {ordinal(index)}
      </span>
      <h3 className="step__h">{step.title}</h3>
      <p className="step__d">{step.body}</p>
    </li>
  );
}
