"use client";

import { HERO_LOGO_SRC } from "../constants/assets";
import { sitecopy, siteLanguage } from "./sitecopy";

export default function Header() {
  const { merch, header } = sitecopy;

  const buildLangHref = (lang: "en" | "es") => {
    return lang === "es" ? "/es" : "/";
  };

  const btsHref = siteLanguage === "es" ? "/bts.html?lang=es" : "/bts.html";

  return (
    <header className="siteHeader">
      <a href="#main" className="skip-link">{header.skipToContent}</a>
      <div className="siteHeaderInner">
        <a className="brand" href="#top" aria-label={header.aria.home}>
          <img src={HERO_LOGO_SRC} alt="" aria-hidden="true" className="brandSymbol" loading="eager" decoding={"async"} width={3000} height={3000} />
          Strange Harvest
        </a>

        <nav className="nav">
          <a href="#top">{header.nav.home}</a>
          <a href="#about">{header.nav.about}</a>
          <a href="#watch">{header.nav.watch}</a>
          <a href="#press">{header.nav.press}</a>
          <a href={btsHref}>{header.nav.bts}</a>
          <a href="#shop">{header.nav.merch}</a>
        </nav>

        <div className="headerActions">
          <div className="langToggle" aria-label={header.aria.language}>
            <a href={buildLangHref("en")} className={`langToggleBtn ${siteLanguage === "en" ? "active" : ""}`}>{header.languageToggle.en}</a>
            <a href={buildLangHref("es")} className={`langToggleBtn ${siteLanguage === "es" ? "active" : ""}`}>{header.languageToggle.es}</a>
          </div>
          <a
            href={merch.shopifyCartUrl}
            className="cartIcon"
            aria-label={header.aria.cart}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
