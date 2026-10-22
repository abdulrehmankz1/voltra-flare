import type { ReactNode } from "react";
import type { Href } from "@/content/types";
import { cx } from "@/lib/cx";
import { Icon } from "./icon";

export type ButtonVariant = "white" | "ghost" | "line" | "ink";

type ButtonLinkProps = {
  href: Href;
  variant: ButtonVariant;
  // The compact nav size.
  size?: "sm";
  className?: string;
  // The trailing arrow; only the menu's "Sign in" goes without.
  arrow?: boolean;
  children: ReactNode;
};

// The .btn call to action: a link styled as a button, its label and the arrow.
export function ButtonLink({ href, variant, size, className, arrow = true, children }: ButtonLinkProps) {
  return (
    <a className={cx("btn", `btn--${variant}`, size && `btn--${size}`, className)} href={href}>
      <span className="btn__t">
        {children}
        {arrow && <Icon name="arrow" aria-hidden="true" />}
      </span>
    </a>
  );
}

// The quiet text link with an arrow (.tlink).
export function TextLink({ href, children }: { href: Href; children: ReactNode }) {
  return (
    <a className="tlink" href={href}>
      {children}
      <Icon name="arrow" aria-hidden="true" />
    </a>
  );
}
