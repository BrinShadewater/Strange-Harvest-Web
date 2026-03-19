"use client";

import { useEffect, useRef } from "react";
import { useState } from "react";
import { HERO_LOGO_SRC } from "../constants/assets";
import { sitecopy, siteLanguage } from "./sitecopy";

export default function Header() {
  const { merch, header } = sitecopy;
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const buildLangHref = (lang: "en" | "es") => {
    return lang === "es" ? "/es" : "/";
  };

  const btsHref = siteLanguage === "es" ? "/bts.html?lang=es" : "/bts.html";

  // Close on Escape
  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setNavOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [navOpen]);

  // Close on outside click
  useEffect(() => {
    if (!navOpen) return;
    const onClick = (e: MouseEvent) => {
      if (
        navRef.current && !navRef.current.contains(e.target as Node) &&
        toggleRef.current && !toggleRef.current.contains(e.target as Node)
      ) {
        setNavOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [navOpen]);

  // Prevent body scroll when nav is open on mobile
  useEffect(() => {
    document.body.classList.toggle("nav-open", navOpen);
    return () => document.body.classList.remove("nav-open");
  }, [navOpen]);

  const handleNavLinkClick = () => setNavOpen(false);

  return (
    <header className="siteHeader">
      <a href="#main" className="skip-link">{header.skipToContent}</a>
      <div className="siteHeaderInner">
        <a className="brand" href="#top" aria-label={header.aria.home}>
          <img src={HERO_LOGO_SRC} alt="" aria-hidden="true" className="brandSymbol" loading="eager" decoding={"async"} width={3000} height={3000} />
          Strange Harvest
        </a>

        <nav
          ref={navRef}
          className={`nav${navOpen ? " is-open" : ""}`}
          id="main-nav"
          aria-label="Site navigation"
        >
          <a href="#top" onClick={handleNavLinkClick}>{header.nav.home}</a>
          <a href="#about" onClick={handleNavLinkClick}>{header.nav.about}</a>
          <a href="#watch" onClick={handleNavLinkClick}>{header.nav.watch}</a>
          <a href="#press" onClick={handleNavLinkClick}>{header.nav.press}</a>
          <a href={btsHref} onClick={handleNavLinkClick}>{header.nav.bts}</a>
          <a href="#shop" onClick={handleNavLinkClick}>{header.nav.merch}</a>
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

          {/* Hamburger toggle — hidden on desktop via CSS */}
          <button
            ref={toggleRef}
            className={`navToggle${navOpen ? " is-open" : ""}`}
            aria-expanded={navOpen}
            aria-controls="main-nav"
            aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setNavOpen((v) => !v)}
            type="button"
          >
            <span className="navToggleBar" />
            <span className="navToggleBar" />
            <span className="navToggleBar" />
          </button>
        </div>
      </div>
    </header>
  );
}
