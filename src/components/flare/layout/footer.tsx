import type { Link } from "@/content/types";
import { footerCopy, site } from "@/content/site";
import { Lockup } from "../brand/mark";
import { Art } from "../primitives/layout";

// The last chapter (.ch.foot), without a bearing of its own. The legal links close the footer links on mobile and
// move to their own nav beside the small print from desktop up.
export function Footer() {
  const { label, links, legal, legalLabel, smallPrint } = footerCopy;
  return (
    <footer className="ch foot" id="footer">
      <Art />{" "}
      <div className="wrap foot__in">
        <div className="foot__brand">
          <Lockup label={site.name} />
          <p>{site.slogan.join(" ")}</p>
        </div>{" "}
        <nav className="foot__links" aria-label={label}>
          <Links links={links} />
          <Links links={legal} className="m-only" />
        </nav>{" "}
        <div className="foot__bot">
          <div className="foot__small">
            <p>{smallPrint}</p>
          </div>{" "}
          <nav className="foot__legal" aria-label={legalLabel}>
            <Links links={legal} />
          </nav>
        </div>
      </div>
    </footer>
  );
}

// Footer links run together, with no space between them.
function Links({ links, className }: { links: readonly Link[]; className?: string }) {
  return links.map((link) => (
    <a key={link.label} className={className} href={link.href}>
      {link.label}
    </a>
  ));
}
