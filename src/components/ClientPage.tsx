"use client";

import dynamic from "next/dynamic";
import type { SiteLanguage } from "./sitecopy";
import { LanguageProvider } from "./LanguageProvider";
import Header from "./Header";
import Hero from "./Hero";

// Below-fold and non-critical components — code-split so their JS is NOT
// in the initial bundle, directly reducing the "unused JS" Lighthouse flag.
const ParticleBackground = dynamic(() => import("./ParticleBackground"), { ssr: false });
const Synopsis    = dynamic(() => import("./Synopsis"));
const Trailer     = dynamic(() => import("./Trailer"));
const Watch       = dynamic(() => import("./Watch"));
const HomeVideo   = dynamic(() => import("./HomeVideo"));
const Merch       = dynamic(() => import("./Merch"));
const Press       = dynamic(() => import("./Press"));
const CastCrew    = dynamic(() => import("./CastCrew"));
const Footer      = dynamic(() => import("./Footer"));
const SymbolDivider = dynamic(() => import("./SymbolDivider"));
const CookieConsent = dynamic(() => import("./CookieConsent"), { ssr: false });

type ThemeVariant = "red" | "blue";

export default function ClientPage({ lang, abVariant = "red" }: { lang: SiteLanguage; abVariant?: ThemeVariant }) {
  return (
    <LanguageProvider lang={lang}>
      <ParticleBackground />
      <Header />
      <main id="main">
        <Hero initialVariant={abVariant} />
        <SymbolDivider />
        <Synopsis />
        <SymbolDivider />
        <Trailer />
        <SymbolDivider />
        <Watch />
        <SymbolDivider />
        <HomeVideo />
        <SymbolDivider />
        <Merch />
        <SymbolDivider />
        <Press />
        <SymbolDivider />
        <CastCrew />
      </main>
      <Footer />
      <CookieConsent />
    </LanguageProvider>
  );
}
