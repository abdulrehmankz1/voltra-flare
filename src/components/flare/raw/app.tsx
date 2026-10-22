// 036 App
export function App() {
  return (
    <section className="ch app" id="app" data-deg="36" aria-labelledby="app-t">
      <div className="art" aria-hidden="true" />
      {" "}
      <div className="wrap app__in">
        <div className="head">
          <p className="brg" data-deg="36">
            <svg className="brg__dial" viewBox="0 0 18 18" aria-hidden="true">
              <circle cx="9" cy="9" r="8.25" fill="none" stroke="currentColor" strokeOpacity=".45" />
              <path className="brg__hand" d="M9 9V1.9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="rotate(36 9 9)" />
              <circle cx="9" cy="9" r="1.5" fill="currentColor" />
            </svg>
            <span className="brg__deg" aria-hidden="true">036°</span>
            <span className="brg__dot" aria-hidden="true">·</span>
            <span className="brg__txt">The app</span>
          </p>
          {" "}
          <h2 className="h2 split" id="app-t">
            Your portfolio,
            <br className="m" />
            {" at a glance."}
          </h2>
          {" "}
          <p className="lede">Live balances, gauges and the next move, the moment you open the app.</p>
        </div>
      </div>
      {" "}
      <div className="app__stage">
        <div className="app__clip app__clip--mid">
          <div className="app__par" />
        </div>
        {" "}
        <div className="app__clip app__clip--near">
          <div className="app__par" />
        </div>
      </div>
      {" "}
      <div className="app__phones">
        <div className="phone" data-phone="home" role="img" aria-label="Voltra home screen: total balance $24,860.42, up $582.10 today, health score 82, and holdings in Bitcoin, Ethereum and Solana.">
          <div className="phone__frame" />
          {" "}
          <div className="phone__screen" aria-hidden="true">
            <div className="scr">
              <div className="scr__bg" style={{ background: "radial-gradient(120% 60% at 85% 0%,rgba(47,107,255,.32),rgba(15,35,143,0) 60%),radial-gradient(90% 50% at 0% 100%,rgba(28,64,218,.22),rgba(15,35,143,0) 70%),#07080D" }} />
              {" "}
              <div className="phone__sb">
                <span>9:41</span>
                <svg viewBox="0 0 70 12">
                  <use href="#i-sys" />
                </svg>
              </div>
              {" "}
              <div className="scr__pad">
                <div className="u-row">
                  <div className="u-row" style={{ gap: "12px" }}>
                    <span className="avatar">AM</span>
                    <span style={{ fontWeight: "500", fontSize: "17px" }}>Good evening, Alex</span>
                  </div>
                  <span className="u-ib">
                    <svg className="ic">
                      <use href="#i-bell" />
                    </svg>
                  </span>
                </div>
                {" "}
                <div className="u-card bal" style={{ background: "radial-gradient(70% 120% at 95% 0%,rgba(47,107,255,.42),rgba(47,107,255,0) 70%),rgba(255,255,255,.04)" }}>
                  <div className="bal__l">
                    <span className="bal__k">Total balance</span>
                    <span className="bal__v" data-money="24860.42">$24,860.42</span>
                    <span className="bal__d u-up">+$582.10 (2.4%) today</span>
                  </div>
                  {" "}
                  <svg className="hgauge" viewBox="0 0 92 64" width="92" height="64" />
                </div>
                {" "}
                <div className="acts">
                  <div className="act">
                    <span className="u-ib">
                      <svg className="ic" style={{ width: "22px", height: "22px" }}>
                        <use href="#i-send" />
                      </svg>
                    </span>
                    <span>Send</span>
                  </div>
                  {" "}
                  <div className="act">
                    <span className="u-ib">
                      <svg className="ic" style={{ width: "22px", height: "22px" }}>
                        <use href="#i-receive" />
                      </svg>
                    </span>
                    <span>Receive</span>
                  </div>
                  {" "}
                  <div className="act">
                    <span className="u-ib">
                      <svg className="ic" style={{ width: "22px", height: "22px" }}>
                        <use href="#i-swap" />
                      </svg>
                    </span>
                    <span>Swap</span>
                  </div>
                  {" "}
                  <div className="act">
                    <span className="u-ib">
                      <svg className="ic" style={{ width: "22px", height: "22px" }}>
                        <use href="#i-plus" />
                      </svg>
                    </span>
                    <span>Buy</span>
                  </div>
                </div>
                {" "}
                <div className="u-card ai" style={{ background: "radial-gradient(80% 140% at 0% 0%,rgba(47,107,255,.3),rgba(47,107,255,0) 70%),rgba(255,255,255,.04)" }}>
                  <div className="ai__h">
                    <svg className="ic" style={{ width: "16px", height: "16px" }}>
                      <use href="#i-spark" />
                    </svg>
                    <b>Voltra AI</b>
                    <svg className="ic" style={{ width: "18px", height: "18px", color: "#fff" }}>
                      <use href="#i-arrow" />
                    </svg>
                  </div>
                  {" "}
                  <p>ETH fees are 38% below average. A good window to rebalance.</p>
                </div>
                {" "}
                <div className="assets">
                  <div className="u-row" style={{ paddingBottom: "8px" }}>
                    <span style={{ fontWeight: "500", fontSize: "16px" }}>Assets</span>
                    <span style={{ fontWeight: "500", fontSize: "14px", color: "var(--v300)" }}>See all</span>
                  </div>
                  {" "}
                  <div className="asset">
                    <span className="asset__c">
                      <svg className="ic">
                        <use href="#i-bitcoin" />
                      </svg>
                    </span>
                    <span className="asset__n">
                      Bitcoin
                      <small>BTC 0.2841</small>
                    </span>
                    <span className="asset__v">
                      $18,204.10
                      <small className="u-up">+1.8%</small>
                    </span>
                  </div>
                  {" "}
                  <div className="asset">
                    <span className="asset__c">
                      <svg className="ic">
                        <use href="#i-ethereum" />
                      </svg>
                    </span>
                    <span className="asset__n">
                      Ethereum
                      <small>ETH 1.62</small>
                    </span>
                    <span className="asset__v">
                      $5,120.66
                      <small className="u-down">-0.6%</small>
                    </span>
                  </div>
                  {" "}
                  <div className="asset">
                    <span className="asset__c">S</span>
                    <span className="asset__n">
                      Solana
                      <small>SOL 12.4</small>
                    </span>
                    <span className="asset__v">
                      $1,535.66
                      <small className="u-up">+3.1%</small>
                    </span>
                  </div>
                </div>
              </div>
              {" "}
              <div className="tabbar">
                <span className="tab tab--on">
                  <svg className="ic">
                    <use href="#i-home" />
                  </svg>
                  Home
                </span>
                {" "}
                <span className="tab">
                  <svg className="ic">
                    <use href="#i-trend" />
                  </svg>
                  Trend
                </span>
                {" "}
                <span className="tab__v">
                  <svg viewBox="0 0 96 95.4751">
                    <use href="#s-mark" />
                  </svg>
                </span>
                {" "}
                <span className="tab">
                  <svg className="ic">
                    <use href="#i-card" />
                  </svg>
                  Card
                </span>
                {" "}
                <span className="tab">
                  <svg className="ic">
                    <use href="#i-apps" />
                  </svg>
                  Apps
                </span>
              </div>
            </div>
          </div>
          {" "}
          <div className="phone__island" />
        </div>
        {" "}
        <div className="phone" data-phone="ask" role="img" aria-label="Ask Voltra screen: the assistant suggests moving $1,480 from ETH to BTC to bring the portfolio back on plan.">
          <div className="phone__frame" />
          {" "}
          <div className="phone__screen" aria-hidden="true">
            <div className="scr">
              <div className="scr__bg" style={{ background: "radial-gradient(110% 55% at 10% 0%,rgba(47,107,255,.26),rgba(15,35,143,0) 60%),#07080D" }} />
              {" "}
              <div className="phone__sb">
                <span>9:41</span>
                <svg viewBox="0 0 70 12">
                  <use href="#i-sys" />
                </svg>
              </div>
              {" "}
              <div className="scr__pad" style={{ gap: "16px" }}>
                <div className="ask-h">
                  <span className="u-ib">
                    <svg className="ic">
                      <use href="#i-back" />
                    </svg>
                  </span>
                  <div className="ask-h__t">
                    <b>Ask Voltra</b>
                    <small>Your portfolio assistant</small>
                  </div>
                  <span className="u-ib">
                    <svg className="ic">
                      <use href="#i-sliders" />
                    </svg>
                  </span>
                </div>
                {" "}
                <span className="day">Today</span>
                {" "}
                <div className="bub bub--me">Should I rebalance this week?</div>
                {" "}
                <div className="bub-row">
                  <span className="ai-av">
                    <svg viewBox="0 0 96 95.4751">
                      <use href="#s-mark" />
                    </svg>
                  </span>
                  <div className="bub bub--ai">Your ETH share is 21%, above your 15% target. Moving $1,480 to BTC brings you back on plan.</div>
                </div>
                {" "}
                <div className="u-card alloc">
                  <div className="alloc__h">
                    <span>Allocation</span>
                    <small>BTC 73 · ETH 21 · SOL 6</small>
                  </div>
                  {" "}
                  <svg className="alloc__g" viewBox="0 0 310 136" />
                  {" "}
                  <div className="alloc__s">
                    <div>
                      <b>$1,480</b>
                      <span className="u-lab">ETH to BTC</span>
                    </div>
                    <div>
                      <b>79 · 15 · 6</b>
                      <span className="u-lab">After, %</span>
                    </div>
                  </div>
                </div>
                {" "}
                <div className="chips">
                  <span className="chip chip--on">Rebalance now</span>
                  <span className="chip">Explain</span>
                  <span className="chip">Remind me Friday</span>
                </div>
              </div>
              {" "}
              <div className="askbar">
                <span>Ask Voltra anything</span>
                <i>
                  <svg className="ic" style={{ width: "18px", height: "18px" }}>
                    <use href="#i-arrow" />
                  </svg>
                </i>
              </div>
            </div>
          </div>
          {" "}
          <div className="phone__island" />
        </div>
        {" "}
        <div className="phone" data-phone="ana" role="img" aria-label="Analytics screen: total balance $24,860.42, up $1,906.21 or 8.3% over 30 days, health score 82 out of 100, allocation 73.2% Bitcoin, 20.6% Ethereum and 6.2% Solana.">
          <div className="phone__frame" />
          {" "}
          <div className="phone__screen" aria-hidden="true">
            <div className="scr">
              <div className="scr__bg" style={{ background: "radial-gradient(100% 50% at 100% 30%,rgba(47,107,255,.28),rgba(15,35,143,0) 60%),radial-gradient(80% 40% at 0% 100%,rgba(28,64,218,.2),rgba(15,35,143,0) 70%),#07080D" }} />
              {" "}
              <div className="phone__sb">
                <span>9:41</span>
                <svg viewBox="0 0 70 12">
                  <use href="#i-sys" />
                </svg>
              </div>
              {" "}
              <div className="scr__pad" style={{ gap: "16px" }}>
                <div className="an-h">
                  <b>Analytics</b>
                  <div>
                    <span className="live">
                      <i />
                      Live
                    </span>
                    <span className="u-ib">
                      <svg className="ic">
                        <use href="#i-sliders" />
                      </svg>
                    </span>
                  </div>
                </div>
                {" "}
                <div className="an-v">
                  <span className="u-lab">Total balance</span>
                  <b data-money="24860.42">$24,860.42</b>
                  <span className="u-up" style={{ fontWeight: "500" }}>
                    +$1,906.21 (+8.3%)
                    <em>30 days</em>
                  </span>
                </div>
                {" "}
                <div className="pills">
                  <span className="pill">1D</span>
                  <span className="pill">1W</span>
                  <span className="pill pill--on">1M</span>
                  <span className="pill">1Y</span>
                  <span className="pill">All</span>
                </div>
                {" "}
                <div className="chart">
                  <svg className="an-chart" viewBox="0 0 390 150" />
                </div>
                {" "}
                <div className="an-cards">
                  <div className="u-card an-card">
                    <span className="u-lab">Health</span>
                    <svg className="an-health" viewBox="0 0 140 72" />
                    <b>
                      82
                      <small>/ 100</small>
                    </b>
                    <span className="u-up" style={{ fontWeight: "500", fontSize: "12px" }}>Strong</span>
                  </div>
                  {" "}
                  <div className="u-card an-card">
                    <span className="u-lab">Allocation</span>
                    <svg className="an-alloc" viewBox="0 0 140 72" />
                    <div className="an-leg">
                      <span>
                        BTC
                        <em>73.2%</em>
                      </span>
                      <span>
                        ETH
                        <em>20.6%</em>
                      </span>
                      <span>
                        SOL
                        <em>6.2%</em>
                      </span>
                    </div>
                  </div>
                </div>
                {" "}
                <div className="an-ai">
                  <svg>
                    <use href="#i-spark" />
                  </svg>
                  <p>ETH fees are 38% below average. A good window to rebalance.</p>
                </div>
              </div>
              {" "}
              <div className="tabbar">
                <span className="tab">
                  <svg className="ic">
                    <use href="#i-home" />
                  </svg>
                  Home
                </span>
                {" "}
                <span className="tab tab--on">
                  <svg className="ic">
                    <use href="#i-trend" />
                  </svg>
                  Trend
                </span>
                {" "}
                <span className="tab__v">
                  <svg viewBox="0 0 96 95.4751">
                    <use href="#s-mark" />
                  </svg>
                </span>
                {" "}
                <span className="tab">
                  <svg className="ic">
                    <use href="#i-card" />
                  </svg>
                  Card
                </span>
                {" "}
                <span className="tab">
                  <svg className="ic">
                    <use href="#i-apps" />
                  </svg>
                  Apps
                </span>
              </div>
            </div>
          </div>
          {" "}
          <div className="phone__island" />
        </div>
      </div>
    </section>
  );
}
