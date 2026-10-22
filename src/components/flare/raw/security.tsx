// 048 Security
export function Security() {
  return (
    <section className="ch sec" id="security" data-deg="48" aria-labelledby="sec-t">
      <span className="anchor" id="privacy" />
      {" "}
      <div className="art" aria-hidden="true" />
      {" "}
      <div className="wrap sec__in">
        <div className="sec__copy">
          <div className="head">
            <p className="brg" data-deg="48">
              <svg className="brg__dial" viewBox="0 0 18 18" aria-hidden="true">
                <circle cx="9" cy="9" r="8.25" fill="none" stroke="currentColor" strokeOpacity=".45" />
                <path className="brg__hand" d="M9 9V1.9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="rotate(48 9 9)" />
                <circle cx="9" cy="9" r="1.5" fill="currentColor" />
              </svg>
              <span className="brg__deg" aria-hidden="true">048°</span>
              <span className="brg__dot" aria-hidden="true">·</span>
              <span className="brg__txt">Security</span>
            </p>
            {" "}
            <h2 className="h2 split" id="sec-t">
              Signed by two.
              <br />
              {" Safe from one."}
            </h2>
            {" "}
            <p className="lede">Your phone, a recovery kit and the Voltra guardian each hold a share. Any two can sign; none can act alone.</p>
          </div>
          {" "}
          <div className="keys">
            <div className="keys__h" aria-hidden="true">
              <span>Key shares</span>
              <span>Status</span>
            </div>
            {" "}
            <ul>
              <li className="key" data-a="-144">
                <span className="key__chip key__chip--lit" aria-hidden="true">
                  <svg className="ic">
                    <use href="#i-phone" />
                  </svg>
                </span>
                <div className="key__b">
                  <div className="key__t">
                    <h3 className="key__nm">
                      <small aria-hidden="true">01</small>
                      <b>Your phone</b>
                    </h3>
                    <span className="key__st">
                      <span className="st-on">
                        <i />
                        Signed
                      </span>
                      <span className="st-wait st-off" aria-hidden="true">
                        <i />
                        Standby
                      </span>
                    </span>
                  </div>
                  <p className="key__d">Share one, in your pocket. Signs with a tap.</p>
                </div>
              </li>
              {" "}
              <li className="key" data-a="-108">
                <span className="key__chip key__chip--lit" aria-hidden="true">
                  <svg className="mk" viewBox="0 0 96 95.4751">
                    <use href="#s-mark" />
                  </svg>
                </span>
                <div className="key__b">
                  <div className="key__t">
                    <h3 className="key__nm">
                      <small aria-hidden="true">02</small>
                      <b>Voltra guardian</b>
                    </h3>
                    <span className="key__st">
                      <span className="st-on">
                        <i />
                        Signed
                      </span>
                      <span className="st-wait st-off" aria-hidden="true">
                        <i />
                        Standby
                      </span>
                    </span>
                  </div>
                  <p className="key__d">Share two. Checks each request, then co-signs.</p>
                </div>
              </li>
              {" "}
              <li className="key key--off" data-a="-72">
                <span className="key__chip key__chip--off" aria-hidden="true">
                  <svg className="ic">
                    <use href="#i-lock" />
                  </svg>
                </span>
                <div className="key__b">
                  <div className="key__t">
                    <h3 className="key__nm">
                      <small aria-hidden="true">03</small>
                      <b>Recovery kit</b>
                    </h3>
                    <span className="key__st">
                      <span className="st-off">
                        <i />
                        Standby
                      </span>
                    </span>
                  </div>
                  <p className="key__d">Share three, in your own cloud. On standby.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {" "}
        <div className="sec__stage">
          <div className="sec__readout" aria-hidden="true">
            <b>
              <i className="sec__n" style={{ fontStyle: "normal" }}>2</i>
              {" "}
              <span>of 3</span>
            </b>
            <small>Shares signed</small>
          </div>
          {" "}
          <span className="sec__chip" aria-hidden="true">
            <i />
            2 of 3 signed
          </span>
        </div>
      </div>
    </section>
  );
}
