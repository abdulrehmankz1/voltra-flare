// 084 FAQ
export function Faq() {
  return (
    <section className="ch faq" id="faq" data-deg="84" aria-labelledby="faq-t">
      <div className="art" aria-hidden="true" />
      {" "}
      <div className="wrap faq__in">
        <div className="faq__left">
          <div className="head">
            <p className="brg" data-deg="84">
              <svg className="brg__dial" viewBox="0 0 18 18" aria-hidden="true">
                <circle cx="9" cy="9" r="8.25" fill="none" stroke="currentColor" strokeOpacity=".45" />
                <path className="brg__hand" d="M9 9V1.9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="rotate(84 9 9)" />
                <circle cx="9" cy="9" r="1.5" fill="currentColor" />
              </svg>
              <span className="brg__deg" aria-hidden="true">084°</span>
              <span className="brg__dot" aria-hidden="true">·</span>
              <span className="brg__txt">Questions</span>
            </p>
            {" "}
            <h2 className="h2 split" id="faq-t">
              Questions,
              <br />
              {" answered."}
            </h2>
          </div>
          {" "}
          <div className="faq__dial" aria-hidden="true" />
        </div>
        {" "}
        <div className="qas">
          <div className="qa is-open">
            <div className="qa__bg" aria-hidden="true" />
            {" "}
            <h3>
              <button className="qa__q" type="button" id="qa-q0" aria-expanded="true" aria-controls="qa-a0">
                <span className="qa__n" aria-hidden="true">01</span>
                <span className="qa__t">Is Voltra a custodial wallet?</span>
                <span className="qa__tg" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M5 12h14" />
                    <path className="v" d="M12 5v14" style={{ transformOrigin: "12px 12px" }} />
                  </svg>
                </span>
              </button>
            </h3>
            {" "}
            <div className="qa__a" id="qa-a0" role="region" aria-labelledby="qa-q0">
              <p>No. You hold your keys. Voltra splits them into three shares so you can recover your wallet if you lose your phone, and it can never move funds on its own.</p>
            </div>
          </div>
          {" "}
          <div className="qa">
            <div className="qa__bg" aria-hidden="true" />
            {" "}
            <h3>
              <button className="qa__q" type="button" id="qa-q1" aria-expanded="false" aria-controls="qa-a1">
                <span className="qa__n" aria-hidden="true">02</span>
                <span className="qa__t">Which networks does Voltra support?</span>
                <span className="qa__tg" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M5 12h14" />
                    <path className="v" d="M12 5v14" style={{ transformOrigin: "12px 12px" }} />
                  </svg>
                </span>
              </button>
            </h3>
            {" "}
            <div className="qa__a" id="qa-a1" role="region" aria-labelledby="qa-q1">
              <p>43 networks today, including Bitcoin, Ethereum, Solana, Base and Arbitrum, with more every month.</p>
            </div>
          </div>
          {" "}
          <div className="qa">
            <div className="qa__bg" aria-hidden="true" />
            {" "}
            <h3>
              <button className="qa__q" type="button" id="qa-q2" aria-expanded="false" aria-controls="qa-a2">
                <span className="qa__n" aria-hidden="true">03</span>
                <span className="qa__t">How does Voltra AI use my data?</span>
                <span className="qa__tg" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M5 12h14" />
                    <path className="v" d="M12 5v14" style={{ transformOrigin: "12px 12px" }} />
                  </svg>
                </span>
              </button>
            </h3>
            {" "}
            <div className="qa__a" id="qa-a2" role="region" aria-labelledby="qa-q2">
              <p>Voltra AI reads public market data and your on-device portfolio. Your keys and personal data never train a model.</p>
            </div>
          </div>
          {" "}
          <div className="qa">
            <div className="qa__bg" aria-hidden="true" />
            {" "}
            <h3>
              <button className="qa__q" type="button" id="qa-q3" aria-expanded="false" aria-controls="qa-a3">
                <span className="qa__n" aria-hidden="true">04</span>
                <span className="qa__t">What does Voltra cost?</span>
                <span className="qa__tg" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M5 12h14" />
                    <path className="v" d="M12 5v14" style={{ transformOrigin: "12px 12px" }} />
                  </svg>
                </span>
              </button>
            </h3>
            {" "}
            <div className="qa__a" id="qa-a3" role="region" aria-labelledby="qa-q3">
              <p>Voltra is free to start. Plus is $6 a month and Pro is $18 a month.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
