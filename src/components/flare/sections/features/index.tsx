import { features, featuresIntro, type Feature } from "@/content/features";
import { fanAngle } from "@/lib/fan";
import { cx } from "@/lib/cx";
import { ordinal } from "@/lib/ordinal";
import { spaced } from "@/lib/spaced";
import { BrokenLines, SectionHead } from "../../primitives/heading";
import { Art, Chapter } from "../../primitives/layout";

// 024° Features: the four capabilities ride the rays of a fan (.fan, desktop) or stack as a list with a glyph the
// motion layer draws for each (.flist, mobile). Each item carries its ray (data-a). The lede repeats in the aside
// from desktop up.
export function Features() {
  return (
    <Chapter id="product" className="feat-ch" labelledBy="feat-t">
      <Art />{" "}
      <div className="wrap feat-ch__in">
        <div className="hrow">
          <SectionHead chapter="product" id="feat-t" intro={featuresIntro} />{" "}
          <p className="lede hrow__aside">{featuresIntro.lede}</p>
        </div>{" "}
        <div className="fan">
          <ul className="fan__caps">
            {spaced(
              features,
              (feature) => feature.title,
              (feature, index) => (
                <FanCap feature={feature} index={index} />
              ),
            )}
          </ul>
        </div>{" "}
        <ul className="flist">
          {spaced(
            features,
            (feature) => feature.title,
            (feature, index) => (
              <FeatureRow feature={feature} index={index} />
            ),
          )}
        </ul>
      </div>
    </Chapter>
  );
}

// A capability on its ray. Rays left of the vertical (-90°) set their caption right-aligned (.cap--r).
function FanCap({ feature, index }: { feature: Feature; index: number }) {
  const angle = fanAngle(index);
  return (
    <li className={cx("cap", angle < -90 && "cap--r")} data-a={angle}>
      <span className="cap__n" aria-hidden="true">
        {ordinal(index)}
      </span>
      <h3 className="cap__h">{feature.title}</h3>
      <p className="cap__d">
        <BrokenLines text={{ lines: feature.body }} />
      </p>
    </li>
  );
}

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  return (
    <li className="frow" data-a={fanAngle(index)}>
      <svg className="frow__g" viewBox="0 0 48 32" aria-hidden="true" />
      <div>
        <div className="frow__t">
          <span className="frow__n" aria-hidden="true">
            {ordinal(index)}
          </span>
          <h3 className="frow__h">{feature.title}</h3>
        </div>
        <p className="frow__d">{feature.body.join(" ")}</p>
      </div>
    </li>
  );
}
