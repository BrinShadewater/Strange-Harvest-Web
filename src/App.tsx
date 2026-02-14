import { SpeedInsights } from "@vercel/speed-insights/react";
import Page from "./Page";
import CookieConsent from "./components/CookieConsent";
import ParticleBackground from "./components/ParticleBackground";

export default function App() {
  return (
    <>
      <ParticleBackground />
      <Page />
      <CookieConsent />
      <SpeedInsights />
    </>
  );
}
