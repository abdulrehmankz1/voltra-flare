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

// MOTION-DEV OWNS THIS STRING: the pre-paint root script (the js class and the fallback if the motion bundle never
// boots, as on Petals). Left empty until the motion port fills it in; any future CSP must allow it by its hash.
const rootScript = "";

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
