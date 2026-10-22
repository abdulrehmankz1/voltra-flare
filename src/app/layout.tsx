import type { Metadata, Viewport } from "next";
import "./globals.css";

// The original ships no favicon, so none is declared here either.
export const metadata: Metadata = {
  title: "Voltra Flare",
  description:
    "Voltra is the AI-powered crypto wallet that reads the market in real time and tells you the moment it matters.",
  // The artifact host's hint to cover the side safe areas, as in the original <head>.
  other: { "claude:viewport-fit-sides": "cover" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050608",
};

// The original script adds js to the root once it runs, and the CSS lays the page out for the script from then on
// (html:not(.js) is the no-JavaScript layout: steps in a grid, the phones in flow, no menu button or billing toggle).
// This adds it before first paint, before the motion bundle arrives, so the layout does not jump. If the bundle never
// reports in ("flare:motion", sent by components/flare/motion/boot.ts) within 10 s, js is taken off again and the
// page shows as without JavaScript (the original does the same when its script fails); a late boot adds it back.
// Any future CSP must allow this script by its hash.
const rootScript = `(function(){var r=document.documentElement,ok=false;r.classList.add('js');addEventListener('flare:motion',function(){ok=true;});setTimeout(function(){if(!ok)r.classList.remove('js');},10000);})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: rootScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Loaded exactly as the original: the canvas and SVG artwork reference the "Urbanist" family by name */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
