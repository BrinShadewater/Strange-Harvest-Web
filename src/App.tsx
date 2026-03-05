import { useEffect } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Page from "./Page";
import CookieConsent from "./components/CookieConsent";
import ParticleBackground from "./components/ParticleBackground";
import { siteLanguage } from "./components/sitecopy";

export default function App() {
  useEffect(() => {
    const isEs = siteLanguage === "es";
    const title = isEs
      ? "Strange Harvest (2025) | Sitio Oficial de la Pelicula"
      : "Strange Harvest (2025) | Official Movie Website";
    const description = isEs
      ? "Sitio oficial de Strange Harvest (2025), mockumentary de terror. Mira el trailer, lee resenas y consulta donde ver la pelicula."
      : "Strange Harvest (2025) is the official website for the horror mockumentary film. Watch trailers, read reviews, explore the story, and access streaming and theatrical information.";

    document.documentElement.lang = isEs ? "es" : "en";
    document.title = title;

    const setMetaContent = (selector: string, value: string) => {
      const node = document.querySelector<HTMLMetaElement>(selector);
      if (node) node.setAttribute("content", value);
    };

    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:locale"]', isEs ? "es_ES" : "en_US");
    setMetaContent('meta[property="og:url"]', isEs ? "https://strangeharvestmovie.com/?lang=es" : "https://strangeharvestmovie.com/");
    setMetaContent('meta[property="twitter:title"]', title);
    setMetaContent('meta[property="twitter:description"]', description);
    setMetaContent('meta[property="twitter:url"]', isEs ? "https://strangeharvestmovie.com/?lang=es" : "https://strangeharvestmovie.com/");

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.href = isEs ? "https://strangeharvestmovie.com/?lang=es" : "https://strangeharvestmovie.com/";
    }
  }, []);

  return (
    <>
      <ParticleBackground />
      <Page />
      <CookieConsent />
      <SpeedInsights />
    </>
  );
}
