import { keyShares, keysCopy, type KeyShare } from "@/content/security";
import { cx } from "@/lib/cx";
import { fanAngle } from "@/lib/fan";
import { ordinal } from "@/lib/ordinal";
import { spaced } from "@/lib/spaced";
import { MarkGlyph } from "../../brand/mark";
import { Icon } from "../../primitives/icon";

// The key shares, each on its ray of the fan (data-a). The column header is decorative.
export function Keys() {
  const [shareHeader, statusHeader] = keysCopy.header;
  return (
    <div className="keys">
      <div className="keys__h" aria-hidden="true">
        <span>{shareHeader}</span>
        <span>{statusHeader}</span>
      </div>{" "}
      <ul>
        {spaced(
          keyShares,
          (share) => share.title,
          (share, index) => (
            <KeyRow share={share} index={index} />
          ),
        )}
      </ul>
    </div>
  );
}

// A share: its chip (lit when signed), name, state and what it does. A signed share also ships its standby state,
// hidden, for the motion layer to swap to.
function KeyRow({ share, index }: { share: KeyShare; index: number }) {
  return (
    <li className={cx("key", !share.signed && "key--off")} data-a={fanAngle(index)}>
      <span className={`key__chip key__chip--${share.signed ? "lit" : "off"}`} aria-hidden="true">
        {share.glyph === "mark" ? <MarkGlyph className="mk" /> : <Icon name={share.glyph} />}
      </span>
      <div className="key__b">
        <div className="key__t">
          <h3 className="key__nm">
            <small aria-hidden="true">{ordinal(index)}</small>
            <b>{share.title}</b>
          </h3>
          <span className="key__st">
            {share.signed ? (
              <>
                <span className="st-on">
                  <i />
                  {keysCopy.signed}
                </span>
                <span className="st-wait st-off" aria-hidden="true">
                  <i />
                  {keysCopy.standby}
                </span>
              </>
            ) : (
              <span className="st-off">
                <i />
                {keysCopy.standby}
              </span>
            )}
          </span>
        </div>
        <p className="key__d">{share.body}</p>
      </div>
    </li>
  );
}
