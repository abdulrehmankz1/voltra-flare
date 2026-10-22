import { assistantName, feesInsight, holdings, homeScreen, totalBalance, type Holding } from "@/content/app";
import { spaced } from "@/lib/spaced";
import { Icon } from "../../../primitives/icon";
import { IconButton, TabBar } from "./parts";
import { Phone } from "./phone";

// The screen's backdrop and the glow on its two cards.
const GLOW =
  "radial-gradient(120% 60% at 85% 0%,rgba(47,107,255,.32),rgba(15,35,143,0) 60%),radial-gradient(90% 50% at 0% 100%,rgba(28,64,218,.22),rgba(15,35,143,0) 70%),#07080D";
const BALANCE_GLOW = "radial-gradient(70% 120% at 95% 0%,rgba(47,107,255,.42),rgba(47,107,255,0) 70%),rgba(255,255,255,.04)";
const AI_GLOW = "radial-gradient(80% 140% at 0% 0%,rgba(47,107,255,.3),rgba(47,107,255,0) 70%),rgba(255,255,255,.04)";

// The home screen: greeting, the balance with its health gauge (.hgauge, drawn by the motion layer), the quick
// actions, Voltra AI's read and the assets.
export function HomePhone() {
  const { label, greeting, change, actions, assets, tab } = homeScreen;
  return (
    <Phone id="home" label={label} glow={GLOW}>
      <div className="scr__pad">
        <div className="u-row">
          <div className="u-row" style={{ gap: "12px" }}>
            <span className="avatar">{greeting.initials}</span>
            <span style={{ fontWeight: "500", fontSize: "17px" }}>{greeting.text}</span>
          </div>
          <IconButton icon="bell" />
        </div>{" "}
        <div className="u-card bal" style={{ background: BALANCE_GLOW }}>
          <div className="bal__l">
            <span className="bal__k">{totalBalance.label}</span>
            <span className="bal__v" data-money={totalBalance.count}>
              {totalBalance.value}
            </span>
            <span className="bal__d u-up">{change}</span>
          </div>{" "}
          <svg className="hgauge" viewBox="0 0 92 64" width="92" height="64" />
        </div>{" "}
        <div className="acts">
          {spaced(
            actions,
            (action) => action.label,
            (action) => (
              <div className="act">
                <IconButton icon={action.icon} size={22} />
                <span>{action.label}</span>
              </div>
            ),
          )}
        </div>{" "}
        <div className="u-card ai" style={{ background: AI_GLOW }}>
          <div className="ai__h">
            <Icon name="spark" size={16} />
            <b>{assistantName}</b>
            <Icon name="arrow" size={18} color="#fff" />
          </div>{" "}
          <p>{feesInsight}</p>
        </div>{" "}
        <div className="assets">
          <div className="u-row" style={{ paddingBottom: "8px" }}>
            <span style={{ fontWeight: "500", fontSize: "16px" }}>{assets.title}</span>
            <span style={{ fontWeight: "500", fontSize: "14px", color: "var(--v300)" }}>{assets.more}</span>
          </div>{" "}
          {spaced(
            holdings,
            (holding) => holding.ticker,
            (holding) => (
              <AssetRow holding={holding} />
            ),
          )}
        </div>
      </div>{" "}
      <TabBar current={tab} />
    </Phone>
  );
}

function AssetRow({ holding }: { holding: Holding }) {
  const { badge } = holding;
  return (
    <div className="asset">
      <span className="asset__c">{"icon" in badge ? <Icon name={badge.icon} /> : badge.letter}</span>
      <span className="asset__n">
        {holding.name}
        <small>{`${holding.ticker} ${holding.amount}`}</small>
      </span>
      <span className="asset__v">
        {holding.value}
        <small className={`u-${holding.trend}`}>{holding.change}</small>
      </span>
    </div>
  );
}
