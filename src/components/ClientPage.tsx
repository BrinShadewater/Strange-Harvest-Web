"use client";

import type { SiteLanguage } from "./sitecopy";
import { LanguageProvider } from "./LanguageProvider";
import Header from "./Header";
import Hero from "./Hero";
import Synopsis from "./Synopsis";
import Trailer from "./Trailer";
import Watch from "./Watch";
import HomeVideo from "./HomeVideo";
import Merch from "./Merch";
import Press from "./Press";
import CastCrew from "./CastCrew";
import Footer from "./Footer";
import SymbolDivider from "./SymbolDivider";
import CookieConsent from "./CookieConsent";
import ParticleBackground from "./ParticleBackground";

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
