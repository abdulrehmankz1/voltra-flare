// 060 How it works
export function How() {
  return (
    <section className="ch ch--light how" id="how" data-deg="60" aria-labelledby="how-t">
      <div className="art" aria-hidden="true" />
      {" "}
      <div className="wrap how__in">
        <div className="head head--left">
          <p className="brg" data-deg="60">
            <svg className="brg__dial" viewBox="0 0 18 18" aria-hidden="true">
              <circle cx="9" cy="9" r="8.25" fill="none" stroke="currentColor" strokeOpacity=".45" />
              <path className="brg__hand" d="M9 9V1.9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="rotate(60 9 9)" />
              <circle cx="9" cy="9" r="1.5" fill="currentColor" />
            </svg>
            <span className="brg__deg" aria-hidden="true">060°</span>
            <span className="brg__dot" aria-hidden="true">·</span>
            <span className="brg__txt">How it works</span>
          </p>
          {" "}
          <h2 className="h2 split" id="how-t">
            Live in
            <br className="d" />
            {" three moves."}
          </h2>
        </div>
        {" "}
        <ol className="steps">
          <li className="step">
            <span className="step__n" aria-hidden="true">01</span>
            <h3 className="step__h">Create</h3>
            <p className="step__d">Your wallet in under two minutes.</p>
          </li>
          {" "}
          <li className="step">
            <span className="step__n" aria-hidden="true">02</span>
            <h3 className="step__h">Connect</h3>
            <p className="step__d">Bring the wallets you already use.</p>
          </li>
          {" "}
          <li className="step">
            <span className="step__n step__n--on" aria-hidden="true">03</span>
            <h3 className="step__h">Act</h3>
            <p className="step__d">Set targets and alerts, then approve every move.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}
