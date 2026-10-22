import { Fragment, type ReactNode } from "react";

// Renders a list with one space between items, matching the whitespace the original markup had between
// inline siblings (it renders, so it is part of the design).
export function spaced<T>(
  items: readonly T[],
  keyOf: (item: T, index: number) => string | number,
  render: (item: T, index: number) => ReactNode,
): ReactNode[] {
  return items.map((item, index) => (
    <Fragment key={keyOf(item, index)}>
      {index > 0 && " "}
      {render(item, index)}
    </Fragment>
  ));
}
