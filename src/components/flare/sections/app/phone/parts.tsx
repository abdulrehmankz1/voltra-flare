import { tabs, type TabId } from "@/content/app";
import { cx } from "@/lib/cx";
import { spaced } from "@/lib/spaced";
import type { IconName } from "../../../brand/icon-artwork";
import { MarkGlyph } from "../../../brand/mark";
import { Icon } from "../../../primitives/icon";

// Pieces shared by the three screens. The screens sit inside the phone's hidden layer, so none of these carry
// accessibility attributes of their own.

// A round glass icon button (.u-ib); the quick actions size their icon up (`size`).
export function IconButton({ icon, size }: { icon: IconName; size?: number }) {
  return (
    <span className="u-ib">
      <Icon name={icon} size={size} />
    </span>
  );
}

// Bottom tab bar: two tabs, the mark in the centre, two tabs; the screen's own tab is lit.
export function TabBar({ current }: { current: TabId }) {
  const [left, right] = tabs;
  const side = (items: (typeof tabs)[number]) =>
    spaced(
      items,
      (tab) => tab.id,
      (tab) => (
        <span className={cx("tab", tab.id === current && "tab--on")}>
          <Icon name={tab.id} />
          {tab.label}
        </span>
      ),
    );
  return (
    <div className="tabbar">
      {side(left)}{" "}
      <span className="tab__v">
        <MarkGlyph />
      </span>{" "}
      {side(right)}
    </div>
  );
}
