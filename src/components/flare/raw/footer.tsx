// Footer
export function Footer() {
  return (
    <footer className="ch foot" id="footer">
      <div className="art" aria-hidden="true" />
      {" "}
      <div className="wrap foot__in">
        <div className="foot__brand">
          <svg viewBox="0 0 244.3914 56.64" role="img" aria-label="Voltra">
            <use href="#s-lockup" />
          </svg>
          <p>Move at the speed of signal.</p>
        </div>
        {" "}
        <nav className="foot__links" aria-label="Footer">
          <a href="#product">Product</a>
          <a href="#security">Security</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">Help</a>
          <a className="m-only" href="#privacy">Privacy</a>
          <a className="m-only" href="#pricing">Terms</a>
        </nav>
        {" "}
        <div className="foot__bot">
          <div className="foot__small">
            <p>© 2026 Voltra Ltd. Crypto assets are volatile and their value can go down as well as up.</p>
          </div>
          {" "}
          <nav className="foot__legal" aria-label="Legal">
            <a href="#privacy">Privacy</a>
            <a href="#pricing">Terms</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
