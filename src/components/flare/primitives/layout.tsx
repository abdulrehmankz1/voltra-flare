import type { ReactNode } from "react";
import { bearingOf, type ChapterId } from "@/content/site";
import { cx } from "@/lib/cx";

type ChapterProps = {
  id: ChapterId;
  className: string;
  // The two paper chapters (.ch--light); the rest sit on ink.
  light?: boolean;
  // Every chapter is named by its heading.
  labelledBy: string;
  children: ReactNode;
};

// A chapter of the page (.ch). Its bearing (data-deg) comes from its place in the page order.
export function Chapter({ id, className, light, labelledBy, children }: ChapterProps) {
  return (
    <section
      className={cx("ch", light && "ch--light", className)}
      id={id}
      data-deg={bearingOf(id)}
      aria-labelledby={labelledBy}
    >
      {children}
    </section>
  );
}

// The chapter's artwork layer, painted by the motion layer.
export function Art({ className }: { className?: string }) {
  return <div className={cx("art", className)} aria-hidden="true" />;
}

// The page's content column.
export function Wrap({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("wrap", className)}>{children}</div>;
}
