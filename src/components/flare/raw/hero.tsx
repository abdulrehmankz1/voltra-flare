// 000 Hero
export function Hero() {
  return (
    <section className="ch hero" id="top" data-deg="0" aria-labelledby="hero-t">
      <div className="hero__art" aria-hidden="true" />
      {" "}
      <div className="hero__fall" aria-hidden="true" />
      {" "}
      <div className="wrap hero__in">
        <div className="hero__head">
          <p className="brg hi hi--1" data-deg="0">
            <svg className="brg__dial" viewBox="0 0 18 18" aria-hidden="true">
              <circle cx="9" cy="9" r="8.25" fill="none" stroke="currentColor" strokeOpacity=".45" />
              <path className="brg__hand" d="M9 9V1.9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="9" cy="9" r="1.5" fill="currentColor" />
            </svg>
            <span className="brg__deg" aria-hidden="true">000°</span>
            <span className="brg__dot" aria-hidden="true">·</span>
            <span className="brg__txt">Your AI-powered crypto wallet</span>
          </p>
          {" "}
          <h1 className="h1 hero__h1" id="hero-t">
            <span className="ln hi hi--2">Move at</span>
            {" "}
            <span className="ln hi hi--3">the speed</span>
            {" "}
            <span className="ln hi hi--4">of signal.</span>
          </h1>
        </div>
        {" "}
        <div className="hero__side">
          <p className="lede hero__lede hi hi--5">
            Voltra reads the market in real time
            <br className="w" />
            {" and tells you the moment it matters,"}
            <br className="w" />
            {" so you act on signal, not noise."}
          </p>
          {" "}
          <div className="hero__cta">
            <a className="btn btn--white hi hi--6" href="#get">
              <span className="btn__t">
                Get Voltra free
                <svg className="ic" aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </a>
            {" "}
            <a className="btn btn--ghost hi hi--7" href="#how">
              <span className="btn__t">
                See how it works
                <svg className="ic" aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
