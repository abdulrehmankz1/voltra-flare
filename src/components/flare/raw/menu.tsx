// Full-screen menu
export function Menu() {
  return (
    <div className="menu" id="menu" role="dialog" aria-label="Menu" hidden>
      <div className="menu__art" aria-hidden="true" />
      {" "}
      <div className="wrap">
        <nav aria-label="Menu">
          <ul className="menu__list">
            <li>
              <a href="#product">
                <span aria-hidden="true">024°</span>
                Product
              </a>
            </li>
            {" "}
            <li>
              <a href="#security">
                <span aria-hidden="true">048°</span>
                Security
              </a>
            </li>
            {" "}
            <li>
              <a href="#how">
                <span aria-hidden="true">060°</span>
                How it works
              </a>
            </li>
            {" "}
            <li>
              <a href="#pricing">
                <span aria-hidden="true">072°</span>
                Pricing
              </a>
            </li>
            {" "}
            <li>
              <a href="#faq">
                <span aria-hidden="true">084°</span>
                Questions
              </a>
            </li>
          </ul>
        </nav>
        {" "}
        <div className="menu__foot">
          <a className="btn btn--white" href="#get">
            <span className="btn__t">
              Get Voltra free
              <svg className="ic" aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </span>
          </a>
          {" "}
          <a className="btn btn--ghost" href="#get">
            <span className="btn__t">Sign in</span>
          </a>
        </div>
      </div>
    </div>
  );
}
