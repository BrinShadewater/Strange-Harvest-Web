import { SpeedInsights } from "@vercel/speed-insights/react";
import Page from "./Page";
import CookieConsent from "./components/CookieConsent";

export default function App() {
  return (
    <>
      <Page />
      <CookieConsent />
      <SpeedInsights />
    </>
  );
}
