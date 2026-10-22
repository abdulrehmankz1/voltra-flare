import { appIntro } from "@/content/app";
import { SectionHead } from "../../primitives/heading";
import { Art, Chapter } from "../../primitives/layout";
import { AnalyticsPhone } from "./phone/analytics-screen";
import { AskPhone } from "./phone/ask-screen";
import { HomePhone } from "./phone/home-screen";

// 036° App. The motion layer stages the phones on the parallax stage (.app__stage, two depth clips) and brings the
// screens alive; without it they stand in a row (.app__phones), home alone on mobile.
export function App() {
  return (
    <Chapter id="app" className="app" labelledBy="app-t">
      <Art />{" "}
      <div className="wrap app__in">
        <SectionHead chapter="app" id="app-t" intro={appIntro} />
      </div>{" "}
      <div className="app__stage">
        <div className="app__clip app__clip--mid">
          <div className="app__par" />
        </div>{" "}
        <div className="app__clip app__clip--near">
          <div className="app__par" />
        </div>
      </div>{" "}
      <div className="app__phones">
        <HomePhone /> <AskPhone /> <AnalyticsPhone />
      </div>
    </Chapter>
  );
}
