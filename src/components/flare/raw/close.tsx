// 096 Close
export function Close() {
  return (
    <section className="ch close" id="get" data-deg="96" aria-labelledby="close-t">
      <div className="art" aria-hidden="true" />
      {" "}
      <div className="wrap close__in">
        <div className="head">
          <p className="brg" data-deg="96">
            <svg className="brg__dial" viewBox="0 0 18 18" aria-hidden="true">
              <circle cx="9" cy="9" r="8.25" fill="none" stroke="currentColor" strokeOpacity=".45" />
              <path className="brg__hand" d="M9 9V1.9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="rotate(96 9 9)" />
              <circle cx="9" cy="9" r="1.5" fill="currentColor" />
            </svg>
            <span className="brg__deg" aria-hidden="true">096°</span>
            <span className="brg__dot" aria-hidden="true">·</span>
            <span className="brg__txt">Voltra</span>
          </p>
          {" "}
          <h2 className="h1 split" id="close-t">
            Catch the
            <br className="m" />
            {" next signal."}
          </h2>
          {" "}
          <p className="lede">Free to start, on mobile and web.</p>
        </div>
        {" "}
        <div className="close__acts">
          <div className="close__cta">
            <a className="btn btn--white" href="#pricing">
              <span className="btn__t">
                Get Voltra free
                <svg className="ic" aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </a>
            {" "}
            <a className="btn btn--ghost" href="#how">
              <span className="btn__t">
                See how it works
                <svg className="ic" aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </a>
          </div>
          {" "}
          <ul className="plats" aria-label="Available on">
            <li className="plat">
              <svg className="ic" aria-hidden="true">
                <use href="#i-phone" />
              </svg>
              For iPhone
            </li>
            {" "}
            <li className="plat">
              <svg className="ic" aria-hidden="true">
                <use href="#i-phone" />
              </svg>
              For Android
            </li>
            {" "}
            <li className="plat">
              <svg className="ic" aria-hidden="true">
                <use href="#i-globe" />
              </svg>
              On the web
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
