import { hero } from "@/content/hero";
import { bearingOf } from "@/content/site";
import { spaced } from "@/lib/spaced";
import { Bearing } from "../../primitives/bearing";
import { ButtonLink } from "../../primitives/button";
import { BrokenLines } from "../../primitives/heading";
import { Chapter } from "../../primitives/layout";

// The entrance order (.hi--1 to --7): the bearing, the title's lines, the lede, then the two calls to action.
const step = (n: number) => `hi hi--${n}`;

// 000° Hero. The motion layer paints the signal (.hero__art) and the fall into the next chapter (.hero__fall); the
// copy enters in order through the .hi--n classes.
export function Hero() {
  const lines = hero.title.length;
  return (
    <Chapter id="top" className="hero" labelledBy="hero-t">
      <div className="hero__art" aria-hidden="true" /> <div className="hero__fall" aria-hidden="true" />{" "}
      <div className="wrap hero__in">
        <div className="hero__head">
          <Bearing deg={bearingOf("top")} className={step(1)}>
            {hero.bearing}
          </Bearing>{" "}
          <h1 className="h1 hero__h1" id="hero-t">
            {spaced(
              hero.title,
              (line) => line,
              (line, index) => (
                <span className={`ln ${step(index + 2)}`}>{line}</span>
              ),
            )}
          </h1>
        </div>{" "}
        <div className="hero__side">
          <p className={`lede hero__lede ${step(lines + 2)}`}>
            <BrokenLines text={hero.lede} />
          </p>{" "}
          <div className="hero__cta">
            <ButtonLink href={hero.primary.href} variant="white" className={step(lines + 3)}>
              {hero.primary.label}
            </ButtonLink>{" "}
            <ButtonLink href={hero.secondary.href} variant="ghost" className={step(lines + 4)}>
              {hero.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
