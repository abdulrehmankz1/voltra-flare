import { billing, priceCopy, type Plan } from "@/content/pricing";
import { cx } from "@/lib/cx";
import { ButtonLink } from "../../primitives/button";
import { Glyph } from "../../primitives/icon";

// One plan. `pace` (data-pace) is how far its gauge reads; the motion layer draws the gauge and the rule. The
// audience line sits by the name on mobile and under the price from desktop up.
export function PlanCard({ plan, pace }: { plan: Plan; pace: number }) {
  return (
    <li className={cx("plan", plan.featured && "plan--hot")} data-pace={pace}>
      {plan.featured && (
        <>
          <div className="plan__heat" aria-hidden="true" />{" "}
        </>
      )}
      <div className="plan__top">
        <div className="plan__name">
          <div className="plan__nm">
            <h3>{plan.name}</h3>
            {plan.featured && (
              <span className="badge">
                <i />
                {plan.featured.badge}
              </span>
            )}
          </div>
          <p className="plan__for m-only">{plan.audience}</p>
        </div>
        <svg className="gauge" viewBox="0 0 96 56" aria-hidden="true" />
      </div>{" "}
      <PlanPrice price={plan.price} /> <p className="plan__for d-only">{plan.audience}</p>{" "}
      <div className="rule" aria-hidden="true">
        <svg preserveAspectRatio="none" />
      </div>{" "}
      <ul className="feats">
        {plan.features.map((feature) => (
          <li key={feature}>
            <span className="chk" aria-hidden="true">
              <Glyph name="check" framed />
            </span>
            {feature}
          </li>
        ))}
      </ul>{" "}
      <ButtonLink href={plan.cta.href} variant={plan.button}>
        {plan.cta.label}
      </ButtonLink>
    </li>
  );
}

// Ships the initial period's price; data-m / data-y hold both so the toggle can swap them. Paid plans add "billed
// yearly" to the yearly period text; the free plan's never changes, so it has no hooks.
function PlanPrice({ price }: { price: Plan["price"] }) {
  const amount = { m: `${priceCopy.currency}${price.m}`, y: `${priceCopy.currency}${price.y}` };
  const paid = price.m > 0;
  return (
    <div className="price">
      <span className="price__amt" data-m={amount.m} data-y={amount.y}>
        <span>{amount[billing.initial]}</span>
      </span>
      <span
        className="price__per"
        data-m={paid ? priceCopy.per : undefined}
        data-y={paid ? `${priceCopy.per}${priceCopy.billedYearly}` : undefined}
      >
        {priceCopy.per}
      </span>
    </div>
  );
}
