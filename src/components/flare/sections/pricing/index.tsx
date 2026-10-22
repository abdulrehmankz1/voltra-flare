import { comparePlans, plans, pricingIntro } from "@/content/pricing";
import { spaced } from "@/lib/spaced";
import { TextLink } from "../../primitives/button";
import { SectionHead } from "../../primitives/heading";
import { Art, Chapter } from "../../primitives/layout";
import { Billing } from "./billing";
import { PlanCard } from "./plan-card";

// 072° Pricing, the second paper chapter: three plans, each a step further along the gauge. The lede sits under
// the heading on mobile and over the billing toggle in the aside from desktop up.
export function Pricing() {
  return (
    <Chapter id="pricing" className="pricing" light labelledBy="price-t">
      <Art />{" "}
      <div className="wrap price__in">
        <div className="hrow">
          <SectionHead chapter="pricing" id="price-t" intro={pricingIntro} ledeClassName="m-only" />{" "}
          <div className="hrow__aside">
            <p className="lede d-only">{pricingIntro.lede}</p> <Billing />
          </div>
        </div>{" "}
        <ul className="plans" id="plans">
          {spaced(
            plans,
            (plan) => plan.id,
            (plan, index) => (
              <PlanCard plan={plan} pace={index + 1} />
            ),
          )}
        </ul>{" "}
        <div className="price__foot">
          <TextLink href={comparePlans.href}>{comparePlans.label}</TextLink>
        </div>
      </div>
    </Chapter>
  );
}
