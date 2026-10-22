// 024 Features
export function Features() {
  return (
    <section className="ch feat-ch" id="product" data-deg="24" aria-labelledby="feat-t">
      <div className="art" aria-hidden="true" />
      {" "}
      <div className="wrap feat-ch__in">
        <div className="hrow">
          <div className="head">
            <p className="brg" data-deg="24">
              <svg className="brg__dial" viewBox="0 0 18 18" aria-hidden="true">
                <circle cx="9" cy="9" r="8.25" fill="none" stroke="currentColor" strokeOpacity=".45" />
                <path className="brg__hand" d="M9 9V1.9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="rotate(24 9 9)" />
                <circle cx="9" cy="9" r="1.5" fill="currentColor" />
              </svg>
              <span className="brg__deg" aria-hidden="true">024°</span>
              <span className="brg__dot" aria-hidden="true">·</span>
              <span className="brg__txt">Voltra AI</span>
            </p>
            {" "}
            <h2 className="h2 split" id="feat-t">
              Every signal,
              <br />
              {" one origin."}
            </h2>
            {" "}
            <p className="lede">Voltra AI scans prices, fees and on-chain activity around the clock and surfaces only what moves you.</p>
          </div>
          {" "}
          <p className="lede hrow__aside">Voltra AI scans prices, fees and on-chain activity around the clock and surfaces only what moves you.</p>
        </div>
        {" "}
        <div className="fan">
          <ul className="fan__caps">
            <li className="cap cap--r" data-a="-144">
              <span className="cap__n" aria-hidden="true">01</span>
              <h3 className="cap__h">Insight</h3>
              <p className="cap__d">
                Alerts that
                <br />
                {" explain themselves."}
              </p>
            </li>
            {" "}
            <li className="cap cap--r" data-a="-108">
              <span className="cap__n" aria-hidden="true">02</span>
              <h3 className="cap__h">Security</h3>
              <p className="cap__d">
                Three key shares.
                <br />
                {" Any two can sign."}
              </p>
            </li>
            {" "}
            <li className="cap" data-a="-72">
              <span className="cap__n" aria-hidden="true">03</span>
              <h3 className="cap__h">Every chain</h3>
              <p className="cap__d">
                43 networks,
                <br />
                {" one balance."}
              </p>
            </li>
            {" "}
            <li className="cap" data-a="-36">
              <span className="cap__n" aria-hidden="true">04</span>
              <h3 className="cap__h">Fast swaps</h3>
              <p className="cap__d">
                The best route
                <br />
                {" in a single tap."}
              </p>
            </li>
          </ul>
        </div>
        {" "}
        <ul className="flist">
          <li className="frow" data-a="-144">
            <svg className="frow__g" viewBox="0 0 48 32" aria-hidden="true" />
            <div>
              <div className="frow__t">
                <span className="frow__n" aria-hidden="true">01</span>
                <h3 className="frow__h">Insight</h3>
              </div>
              <p className="frow__d">Alerts that explain themselves.</p>
            </div>
          </li>
          {" "}
          <li className="frow" data-a="-108">
            <svg className="frow__g" viewBox="0 0 48 32" aria-hidden="true" />
            <div>
              <div className="frow__t">
                <span className="frow__n" aria-hidden="true">02</span>
                <h3 className="frow__h">Security</h3>
              </div>
              <p className="frow__d">Three key shares. Any two can sign.</p>
            </div>
          </li>
          {" "}
          <li className="frow" data-a="-72">
            <svg className="frow__g" viewBox="0 0 48 32" aria-hidden="true" />
            <div>
              <div className="frow__t">
                <span className="frow__n" aria-hidden="true">03</span>
                <h3 className="frow__h">Every chain</h3>
              </div>
              <p className="frow__d">43 networks, one balance.</p>
            </div>
          </li>
          {" "}
          <li className="frow" data-a="-36">
            <svg className="frow__g" viewBox="0 0 48 32" aria-hidden="true" />
            <div>
              <div className="frow__t">
                <span className="frow__n" aria-hidden="true">04</span>
                <h3 className="frow__h">Fast swaps</h3>
              </div>
              <p className="frow__d">The best route in a single tap.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
