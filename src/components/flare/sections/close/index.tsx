import { closeCopy, closeIntro } from "@/content/close";
import { spaced } from "@/lib/spaced";
import { ButtonLink } from "../../primitives/button";
import { SectionHead } from "../../primitives/heading";
import { Icon } from "../../primitives/icon";
import { Art, Chapter } from "../../primitives/layout";

// 096° Close: the last signal, its heading at the display size.
export function Close() {
  const { primary, secondary, platformsLabel, platforms } = closeCopy;
  return (
    <Chapter id="get" className="close" labelledBy="close-t">
      <Art />{" "}
      <div className="wrap close__in">
        <SectionHead chapter="get" id="close-t" intro={closeIntro} size="h1" />{" "}
        <div className="close__acts">
          <div className="close__cta">
            <ButtonLink href={primary.href} variant="white">
              {primary.label}
            </ButtonLink>{" "}
            <ButtonLink href={secondary.href} variant="ghost">
              {secondary.label}
            </ButtonLink>
          </div>{" "}
          <ul className="plats" aria-label={platformsLabel}>
            {spaced(
              platforms,
              (platform) => platform.label,
              (platform) => (
                <li className="plat">
                  <Icon name={platform.icon} aria-hidden="true" />
                  {platform.label}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </Chapter>
  );
}
