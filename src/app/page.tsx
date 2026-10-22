import { Sprite } from "@/components/flare/brand/sprite";
import { Hud, SkipLink } from "@/components/flare/layout/chrome";
import { Footer } from "@/components/flare/layout/footer";
import { Menu } from "@/components/flare/layout/menu";
import { Nav } from "@/components/flare/layout/nav";
import { FlareMotion } from "@/components/flare/motion/flare-motion";
import { App } from "@/components/flare/sections/app";
import { Close } from "@/components/flare/sections/close";
import { Faq } from "@/components/flare/sections/faq";
import { Features } from "@/components/flare/sections/features";
import { Hero } from "@/components/flare/sections/hero";
import { How } from "@/components/flare/sections/how";
import { Pricing } from "@/components/flare/sections/pricing";
import { Proof } from "@/components/flare/sections/proof";
import { Security } from "@/components/flare/sections/security";

export default function Home() {
  return (
    <>
      <SkipLink />
      <Sprite />
      <Nav />
      <Menu />
      <Hud />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Proof />
        <Features />
        <App />
        <Security />
        <How />
        <Pricing />
        <Faq />
        <Close />
      </main>
      <Footer />
      <FlareMotion />
    </>
  );
}
