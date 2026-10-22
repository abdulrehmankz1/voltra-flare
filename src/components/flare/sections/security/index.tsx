import { keyShares, keysCopy, securityIntro } from "@/content/security";
import { SectionHead } from "../../primitives/heading";
import { Art, Chapter } from "../../primitives/layout";
import { Keys } from "./keys";

// 048° Security: three key shares on the fan, two signed. The stage beside them reads out how many have signed
// (.sec__n, counted by the motion layer). The anchor is the footer's Privacy target (#privacy).
export function Security() {
  const signed = keyShares.filter((share) => share.signed).length;
  const total = keyShares.length;
  return (
    <Chapter id="security" className="sec" labelledBy="sec-t">
      <span className="anchor" id="privacy" /> <Art />{" "}
      <div className="wrap sec__in">
        <div className="sec__copy">
          <SectionHead chapter="security" id="sec-t" intro={securityIntro} /> <Keys />
        </div>{" "}
        <div className="sec__stage">
          <div className="sec__readout" aria-hidden="true">
            <b>
              <i className="sec__n" style={{ fontStyle: "normal" }}>
                {signed}
              </i>{" "}
              <span>{`of ${total}`}</span>
            </b>
            <small>{keysCopy.readout}</small>
          </div>{" "}
          <span className="sec__chip" aria-hidden="true">
            <i />
            {`${signed} of ${total} ${keysCopy.chip}`}
          </span>
        </div>
      </div>
    </Chapter>
  );
}
