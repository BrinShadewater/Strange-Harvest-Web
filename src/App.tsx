import { Analytics } from "@vercel/analytics/react";
import Page from "./Page";
import CookieConsent from "./components/CookieConsent";

export default function App() {
  return (
    <>
      <Page />
      <CookieConsent />
      <Analytics />
    </>
  );
}
