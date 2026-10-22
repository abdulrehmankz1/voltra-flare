"use client";

import { useEffect } from "react";
import { startFlareMotion } from "./boot";

// The original page script, ported 1:1 (see ./boot.ts). Boots once per mount and fully reverts on unmount.
export function FlareMotion() {
  useEffect(() => startFlareMotion(), []);
  return null;
}
