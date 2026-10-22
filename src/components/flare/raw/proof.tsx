// 012 Proof
export function Proof() {
  return (
    <section className="ch proof" id="proof" data-deg="12" aria-labelledby="proof-t">
      <div className="art" aria-hidden="true" />
      {" "}
      <div className="wrap proof__in">
        <h2 className="sr-only" id="proof-t">Voltra in numbers</h2>
        {" "}
        <p className="brg" data-deg="12">
          <svg className="brg__dial" viewBox="0 0 18 18" aria-hidden="true">
            <circle cx="9" cy="9" r="8.25" fill="none" stroke="currentColor" strokeOpacity=".45" />
            <path className="brg__hand" d="M9 9V1.9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="rotate(12 9 9)" />
            <circle cx="9" cy="9" r="1.5" fill="currentColor" />
          </svg>
          <span className="brg__deg" aria-hidden="true">012°</span>
          <span className="brg__dot" aria-hidden="true">·</span>
          <span className="brg__txt">Live right now</span>
        </p>
        {" "}
        <div className="proof__radar">
          <div className="art radar" aria-hidden="true" />
          {" "}
          <ul className="stats">
            <li className="stat">
              <span className="stat__v" data-num="1.8" data-dec="1" data-suf="M">1.8M</span>
              <span className="stat__l">Wallets</span>
            </li>
            {" "}
            <li className="stat">
              <span className="stat__v" data-num="6.2" data-dec="1" data-pre="$" data-suf="B">$6.2B</span>
              <span className="stat__l">Secured</span>
            </li>
            {" "}
            <li className="stat">
              <span className="stat__v" data-num="43" data-dec="0">43</span>
              <span className="stat__l">Networks</span>
            </li>
            {" "}
            <li className="stat">
              <span className="stat__v" data-num="24" data-dec="0" data-suf="/7" data-late="1">24/7</span>
              <span className="stat__l">AI watch</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
