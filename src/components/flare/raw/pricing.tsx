// 072 Pricing
export function Pricing() {
  return (
    <section className="ch ch--light pricing" id="pricing" data-deg="72" aria-labelledby="price-t">
      <div className="art" aria-hidden="true" />
      {" "}
      <div className="wrap price__in">
        <div className="hrow">
          <div className="head">
            <p className="brg" data-deg="72">
              <svg className="brg__dial" viewBox="0 0 18 18" aria-hidden="true">
                <circle cx="9" cy="9" r="8.25" fill="none" stroke="currentColor" strokeOpacity=".45" />
                <path className="brg__hand" d="M9 9V1.9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="rotate(72 9 9)" />
                <circle cx="9" cy="9" r="1.5" fill="currentColor" />
              </svg>
              <span className="brg__deg" aria-hidden="true">072°</span>
              <span className="brg__dot" aria-hidden="true">·</span>
              <span className="brg__txt">Pricing</span>
            </p>
            {" "}
            <h2 className="h2 split" id="price-t">Pick your pace.</h2>
            {" "}
            <p className="lede m-only">Start free. Switch up a gear when you need to.</p>
          </div>
          {" "}
          <div className="hrow__aside">
            <p className="lede d-only">Start free. Switch up a gear when you need to.</p>
            {" "}
            <div className="bill-row">
              <div className="bill" role="group" aria-label="Billing period">
                <button type="button" aria-pressed="true" data-bill="m">
                  <span className="bill__bg" aria-hidden="true" />
                  <span className="bill__t">Monthly</span>
                </button>
                {" "}
                <button type="button" aria-pressed="false" data-bill="y">
                  <span className="bill__bg" aria-hidden="true" />
                  <span className="bill__t">Yearly</span>
                </button>
              </div>
              {" "}
              <p className="bill__note">
                <i aria-hidden="true" />
                <span data-m="Pay yearly and get two months free." data-y="Two months free on Plus and Pro." aria-live="polite">Pay yearly and get two months free.</span>
              </p>
            </div>
          </div>
        </div>
        {" "}
        <ul className="plans" id="plans">
          <li className="plan" data-pace="1">
            <div className="plan__top">
              <div className="plan__name">
                <div className="plan__nm">
                  <h3>Free</h3>
                </div>
                <p className="plan__for m-only">For getting started</p>
              </div>
              <svg className="gauge" viewBox="0 0 96 56" aria-hidden="true" />
            </div>
            {" "}
            <div className="price">
              <span className="price__amt" data-m="$0" data-y="$0">
                <span>$0</span>
              </span>
              <span className="price__per">per month</span>
            </div>
            {" "}
            <p className="plan__for d-only">For getting started</p>
            {" "}
            <div className="rule" aria-hidden="true">
              <svg preserveAspectRatio="none" />
            </div>
            {" "}
            <ul className="feats">
              <li>
                <span className="chk" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <use href="#i-check" />
                  </svg>
                </span>
                Wallet for 43 networks
              </li>
              <li>
                <span className="chk" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <use href="#i-check" />
                  </svg>
                </span>
                Five price alerts
              </li>
              <li>
                <span className="chk" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <use href="#i-check" />
                  </svg>
                </span>
                Weekly AI summary
              </li>
            </ul>
            {" "}
            <a className="btn btn--line" href="#get">
              <span className="btn__t">
                Get Voltra free
                <svg className="ic" aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </a>
          </li>
          {" "}
          <li className="plan plan--hot" data-pace="2">
            <div className="plan__heat" aria-hidden="true" />
            {" "}
            <div className="plan__top">
              <div className="plan__name">
                <div className="plan__nm">
                  <h3>Plus</h3>
                  <span className="badge">
                    <i />
                    Most chosen
                  </span>
                </div>
                <p className="plan__for m-only">For active investors</p>
              </div>
              <svg className="gauge" viewBox="0 0 96 56" aria-hidden="true" />
            </div>
            {" "}
            <div className="price">
              <span className="price__amt" data-m="$6" data-y="$5">
                <span>$6</span>
              </span>
              <span className="price__per" data-m="per month" data-y="per month, billed yearly">per month</span>
            </div>
            {" "}
            <p className="plan__for d-only">For active investors</p>
            {" "}
            <div className="rule" aria-hidden="true">
              <svg preserveAspectRatio="none" />
            </div>
            {" "}
            <ul className="feats">
              <li>
                <span className="chk" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <use href="#i-check" />
                  </svg>
                </span>
                Daily AI insights and nudges
              </li>
              <li>
                <span className="chk" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <use href="#i-check" />
                  </svg>
                </span>
                Unlimited alerts
              </li>
              <li>
                <span className="chk" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <use href="#i-check" />
                  </svg>
                </span>
                Swap fees from 0.25%
              </li>
            </ul>
            {" "}
            <a className="btn btn--white" href="#get">
              <span className="btn__t">
                Try Plus free for 30 days
                <svg className="ic" aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </a>
          </li>
          {" "}
          <li className="plan" data-pace="3">
            <div className="plan__top">
              <div className="plan__name">
                <div className="plan__nm">
                  <h3>Pro</h3>
                </div>
                <p className="plan__for m-only">For serious portfolios</p>
              </div>
              <svg className="gauge" viewBox="0 0 96 56" aria-hidden="true" />
            </div>
            {" "}
            <div className="price">
              <span className="price__amt" data-m="$18" data-y="$15">
                <span>$18</span>
              </span>
              <span className="price__per" data-m="per month" data-y="per month, billed yearly">per month</span>
            </div>
            {" "}
            <p className="plan__for d-only">For serious portfolios</p>
            {" "}
            <div className="rule" aria-hidden="true">
              <svg preserveAspectRatio="none" />
            </div>
            {" "}
            <ul className="feats">
              <li>
                <span className="chk" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <use href="#i-check" />
                  </svg>
                </span>
                Tax reports in one click
              </li>
              <li>
                <span className="chk" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <use href="#i-check" />
                  </svg>
                </span>
                Risk score and stress tests
              </li>
              <li>
                <span className="chk" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <use href="#i-check" />
                  </svg>
                </span>
                Priority human support
              </li>
            </ul>
            {" "}
            <a className="btn btn--ink" href="#get">
              <span className="btn__t">
                Choose Pro
                <svg className="ic" aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </a>
          </li>
        </ul>
        {" "}
        <div className="price__foot">
          <a className="tlink" href="#faq">
            Compare plans
            <svg className="ic" aria-hidden="true">
              <use href="#i-arrow" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
