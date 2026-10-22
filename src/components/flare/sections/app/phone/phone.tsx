import type { ReactNode } from "react";
import { statusTime } from "@/content/app";
import { iconId } from "../../../brand/icon-artwork";
import { symbolHref } from "../../../brand/mark-geometry";

type PhoneProps = {
  // Which screen (data-phone); the motion layer stages each phone on its own path.
  id: "home" | "ask" | "ana";
  // The phone is one image to assistive tech; this describes the screen.
  label: string;
  // The screen's backdrop: radial washes of volt over the near-black glass.
  glow: string;
  children: ReactNode;
};

// A phone: its frame, the screen (backdrop, status bar, then the screen's content) and the dynamic island.
export function Phone({ id, label, glow, children }: PhoneProps) {
  return (
    <div className="phone" data-phone={id} role="img" aria-label={label}>
      <div className="phone__frame" />{" "}
      <div className="phone__screen" aria-hidden="true">
        <div className="scr">
          <div className="scr__bg" style={{ background: glow }} /> <StatusBar /> {children}
        </div>
      </div>{" "}
      <div className="phone__island" />
    </div>
  );
}

// iOS status bar: the clock, then signal, wifi and battery in one sprite glyph.
function StatusBar() {
  return (
    <div className="phone__sb">
      <span>{statusTime}</span>
      <svg viewBox="0 0 70 12">
        <use href={symbolHref(iconId("sys"))} />
      </svg>
    </div>
  );
}
