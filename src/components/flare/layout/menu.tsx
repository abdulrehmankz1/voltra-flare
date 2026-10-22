import { bearingOf, chapterHref, getVoltra, getVoltraFree, menuNav, navCopy, signIn } from "@/content/site";
import { formatBearing } from "@/lib/bearing";
import { spaced } from "@/lib/spaced";
import { ButtonLink } from "../primitives/button";

// Full-screen menu, hidden until the menu button opens it. Each chapter is listed under its bearing.
export function Menu() {
  return (
    <div className="menu" id="menu" role="dialog" aria-label={navCopy.menuLabel} hidden>
      <div className="menu__art" aria-hidden="true" />{" "}
      <div className="wrap">
        <nav aria-label={navCopy.menuLabel}>
          <ul className="menu__list">
            {spaced(
              menuNav,
              (link) => link.chapter,
              (link) => (
                <li>
                  <a href={chapterHref(link.chapter)}>
                    <span aria-hidden="true">{formatBearing(bearingOf(link.chapter))}</span>
                    {link.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>{" "}
        <div className="menu__foot">
          <ButtonLink href={getVoltra.href} variant="white">
            {getVoltraFree}
          </ButtonLink>{" "}
          <ButtonLink href={signIn.href} variant="ghost" arrow={false}>
            {signIn.label}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
