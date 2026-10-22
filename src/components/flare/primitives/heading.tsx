import { Fragment } from "react";
import { bearingOf, type ChapterId } from "@/content/site";
import type { Broken, SectionIntro } from "@/content/types";
import { cx } from "@/lib/cx";
import { Bearing } from "./bearing";

// Copy set on several lines: a <br> (with its class) and a space before each line after the first.
export function BrokenLines({ text }: { text: Broken }) {
  return text.lines.map((line, index) =>
    index === 0 ? (
      line
    ) : (
      <Fragment key={index}>
        <br className={text.br} />
        {` ${line}`}
      </Fragment>
    ),
  );
}

type SectionHeadProps = {
  chapter: ChapterId;
  // The heading's id, which names the chapter.
  id: string;
  intro: SectionIntro;
  // Set flush left on desktop too (.head--left).
  left?: boolean;
  // The close sets its h2 at the display size.
  size?: "h1" | "h2";
  // Where the lede shows: only on mobile when the aside repeats it from desktop up.
  ledeClassName?: string;
};

// A chapter's head (.head): its bearing, the heading (split into lines by the motion layer) and the optional lede.
export function SectionHead({ chapter, id, intro, left, size = "h2", ledeClassName }: SectionHeadProps) {
  return (
    <div className={cx("head", left && "head--left")}>
      <Bearing deg={bearingOf(chapter)}>{intro.bearing}</Bearing>{" "}
      <h2 className={`${size} split`} id={id}>
        <BrokenLines text={intro.title} />
      </h2>
      {intro.lede && (
        <>
          {" "}
          <p className={cx("lede", ledeClassName)}>{intro.lede}</p>
        </>
      )}
    </div>
  );
}
