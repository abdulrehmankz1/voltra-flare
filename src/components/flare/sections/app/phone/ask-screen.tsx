import { askScreen, holdings } from "@/content/app";
import { cx } from "@/lib/cx";
import { MarkGlyph } from "../../../brand/mark";
import { Icon } from "../../../primitives/icon";
import { IconButton } from "./parts";
import { Phone } from "./phone";

const GLOW = "radial-gradient(110% 55% at 10% 0%,rgba(47,107,255,.26),rgba(15,35,143,0) 60%),#07080D";

// The allocation today, rounded: "BTC 73 · ETH 21 · SOL 6".
const allocationNow = holdings.map((holding) => `${holding.ticker} ${Math.round(holding.share)}`).join(" · ");

// Ask Voltra: a question, the assistant's answer and the rebalance it proposes, with the allocation chart
// (.alloc__g) the motion layer draws. The composer takes the tab bar's place.
export function AskPhone() {
  const { label, title, subtitle, day, question, answer, allocation, chips, composer } = askScreen;
  return (
    <Phone id="ask" label={label} glow={GLOW}>
      <div className="scr__pad" style={{ gap: "16px" }}>
        <div className="ask-h">
          <IconButton icon="back" />
          <div className="ask-h__t">
            <b>{title}</b>
            <small>{subtitle}</small>
          </div>
          <IconButton icon="sliders" />
        </div>{" "}
        <span className="day">{day}</span> <div className="bub bub--me">{question}</div>{" "}
        <div className="bub-row">
          <span className="ai-av">
            <MarkGlyph />
          </span>
          <div className="bub bub--ai">{answer}</div>
        </div>{" "}
        <div className="u-card alloc">
          <div className="alloc__h">
            <span>{allocation.label}</span>
            <small>{allocationNow}</small>
          </div>{" "}
          <svg className="alloc__g" viewBox="0 0 310 136" />{" "}
          <div className="alloc__s">
            {[allocation.move, allocation.after].map((figure) => (
              <div key={figure.label}>
                <b>{figure.value}</b>
                <span className="u-lab">{figure.label}</span>
              </div>
            ))}
          </div>
        </div>{" "}
        <div className="chips">
          {chips.map((chip, index) => (
            <span key={chip} className={cx("chip", index === 0 && "chip--on")}>
              {chip}
            </span>
          ))}
        </div>
      </div>{" "}
      <div className="askbar">
        <span>{composer}</span>
        <i>
          <Icon name="arrow" size={18} />
        </i>
      </div>
    </Phone>
  );
}
