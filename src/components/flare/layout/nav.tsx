import { chapterHref, getVoltra, getVoltraFree, navCopy, primaryNav, signIn, site } from "@/content/site";
import { spaced } from "@/lib/spaced";
import { Lockup } from "../brand/mark";
import { ButtonLink } from "../primitives/button";

// Fixed header (#nav). The menu button opens #menu on mobile; the motion layer runs it and tones the bar on scroll.
export function Nav() {
  return (
    <header className="nav" id="nav">
      <div className="wrap nav__in">
        <MenuButton />{" "}
        <a className="nav__logo" href={site.homeHref} aria-label={site.homeLabel}>
          <Lockup />
        </a>{" "}
        <nav className="nav__links" aria-label={navCopy.label}>
          {spaced(
            primaryNav,
            (link) => link.chapter,
            (link) => (
              <a className="nav-link" href={chapterHref(link.chapter)}>
                {link.label}
              </a>
            ),
          )}
        </nav>{" "}
        <div className="nav__act">
          <a className="nav-link nav__signin" href={signIn.href}>
            {signIn.label}
          </a>{" "}
          <ButtonLink href={getVoltra.href} variant="white" size="sm" className="nav__cta">
            <span className="m-only">{getVoltra.label}</span>
            <span className="d-only">{getVoltraFree}</span>
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

// The two-line burger; the motion layer reports the menu's state on it.
function MenuButton() {
  return (
    <button
      className="nav__menu"
      id="menuBtn"
      type="button"
      aria-expanded="false"
      aria-controls="menu"
      aria-label={navCopy.openMenu}
    >
      <span className="nav__burger" aria-hidden="true">
        <i />
        <i />
      </span>
    </button>
  );
}
