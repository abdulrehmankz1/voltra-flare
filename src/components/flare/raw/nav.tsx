// Fixed header
export function Nav() {
  return (
    <header className="nav" id="nav">
      <div className="wrap nav__in">
        <button className="nav__menu" id="menuBtn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Open menu">
          <span className="nav__burger" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
        {" "}
        <a className="nav__logo" href="#top" aria-label="Voltra, back to the top">
          <svg viewBox="0 0 244.3914 56.64" aria-hidden="true" focusable="false">
            <use href="#s-lockup" />
          </svg>
        </a>
        {" "}
        <nav className="nav__links" aria-label="Primary">
          <a className="nav-link" href="#product">Product</a>
          {" "}
          <a className="nav-link" href="#security">Security</a>
          {" "}
          <a className="nav-link" href="#pricing">Pricing</a>
          {" "}
          <a className="nav-link" href="#how">Learn</a>
        </nav>
        {" "}
        <div className="nav__act">
          <a className="nav-link nav__signin" href="#get">Sign in</a>
          {" "}
          <a className="btn btn--white btn--sm nav__cta" href="#get">
            <span className="btn__t">
              <span className="m-only">Get Voltra</span>
              <span className="d-only">Get Voltra free</span>
              <svg className="ic" aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
