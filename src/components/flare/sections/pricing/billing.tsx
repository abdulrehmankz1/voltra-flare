import { billing } from "@/content/pricing";
import { spaced } from "@/lib/spaced";

// Monthly / yearly toggle and its note. Ships in the initial period; the motion layer slides the pressed
// background, swaps the note between its data-m / data-y and every price's data-m / data-y.
export function Billing() {
  return (
    <div className="bill-row">
      <div className="bill" role="group" aria-label={billing.label}>
        {spaced(
          billing.periods,
          (period) => period.id,
          (period) => (
            <button type="button" aria-pressed={period.id === billing.initial} data-bill={period.id}>
              <span className="bill__bg" aria-hidden="true" />
              <span className="bill__t">{period.label}</span>
            </button>
          ),
        )}
      </div>{" "}
      <p className="bill__note">
        <i aria-hidden="true" />
        <span data-m={billing.note.m} data-y={billing.note.y} aria-live="polite">
          {billing.note[billing.initial]}
        </span>
      </p>
    </div>
  );
}
