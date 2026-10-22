import { FlareMotion } from "@/components/flare/motion/flare-motion";
import { App } from "@/components/flare/raw/app";
import { Close } from "@/components/flare/raw/close";
import { Faq } from "@/components/flare/raw/faq";
import { Features } from "@/components/flare/raw/features";
import { Footer } from "@/components/flare/raw/footer";
import { Hero } from "@/components/flare/raw/hero";
import { How } from "@/components/flare/raw/how";
import { Hud } from "@/components/flare/raw/hud";
import { Menu } from "@/components/flare/raw/menu";
import { Nav } from "@/components/flare/raw/nav";
import { Pricing } from "@/components/flare/raw/pricing";
import { Proof } from "@/components/flare/raw/proof";
import { Security } from "@/components/flare/raw/security";
import { SkipLink } from "@/components/flare/raw/skip-link";
import { Sprite } from "@/components/flare/raw/sprite";

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
