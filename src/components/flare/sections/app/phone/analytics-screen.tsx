import { analyticsScreen, feesInsight, holdings, totalBalance } from "@/content/app";
import { cx } from "@/lib/cx";
import { Glyph } from "../../../primitives/icon";
import { IconButton, TabBar } from "./parts";
import { Phone } from "./phone";

const GLOW =
  "radial-gradient(100% 50% at 100% 30%,rgba(47,107,255,.28),rgba(15,35,143,0) 60%),radial-gradient(80% 40% at 0% 100%,rgba(28,64,218,.2),rgba(15,35,143,0) 70%),#07080D";

// Analytics: the balance over the chosen range, the 30 day chart (.an-chart), the health and allocation gauges
// (.an-health, .an-alloc) the motion layer draws, and Voltra AI's read.
export function AnalyticsPhone() {
  const { label, title, live, change, ranges, currentRange, health, allocationLabel, tab } = analyticsScreen;
  return (
    <Phone id="ana" label={label} glow={GLOW}>
      <div className="scr__pad" style={{ gap: "16px" }}>
        <div className="an-h">
          <b>{title}</b>
          <div>
            <span className="live">
              <i />
              {live}
            </span>
            <IconButton icon="sliders" />
          </div>
        </div>{" "}
        <div className="an-v">
          <span className="u-lab">{totalBalance.label}</span>
          <b data-money={totalBalance.count}>{totalBalance.value}</b>
          <span className="u-up" style={{ fontWeight: "500" }}>
            {change.amount}
            <em>{change.period}</em>
          </span>
        </div>{" "}
        <div className="pills">
          {ranges.map((range) => (
            <span key={range} className={cx("pill", range === currentRange && "pill--on")}>
              {range}
            </span>
          ))}
        </div>{" "}
        <div className="chart">
          <svg className="an-chart" viewBox="0 0 390 150" />
        </div>{" "}
        <div className="an-cards">
          <div className="u-card an-card">
            <span className="u-lab">{health.label}</span>
            <svg className="an-health" viewBox="0 0 140 72" />
            <b>
              {health.score}
              <small>{health.outOf}</small>
            </b>
            <span className="u-up" style={{ fontWeight: "500", fontSize: "12px" }}>
              {health.verdict}
            </span>
          </div>{" "}
          <div className="u-card an-card">
            <span className="u-lab">{allocationLabel}</span>
            <svg className="an-alloc" viewBox="0 0 140 72" />
            <div className="an-leg">
              {holdings.map((holding) => (
                <span key={holding.ticker}>
                  {holding.ticker}
                  <em>{`${holding.share}%`}</em>
                </span>
              ))}
            </div>
          </div>
        </div>{" "}
        <div className="an-ai">
          <Glyph name="spark" />
          <p>{feesInsight}</p>
        </div>
      </div>{" "}
      <TabBar current={tab} />
    </Phone>
  );
}
