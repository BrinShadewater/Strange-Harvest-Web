import { HERO_LOGO_SRC } from "../constants/assets";

export default function Header() {
  return (
    <header className="siteHeader">
      <a href="#main" className="skip-link">Skip to main content</a>
      <div className="siteHeaderInner">
        <a className="brand" href="#top" aria-label="Strange Harvest home">
          <img src={HERO_LOGO_SRC} alt="" className="brandSymbol" loading="eager" />
          Strange Harvest
        </a>

        <nav className="nav">
          <a href="#top">Home</a>
          <a href="#about">About</a>
          <a href="#watch">Watch</a>
          <a href="#shop">Merch</a>
        </nav>

        <a href="#shop" className="cartIcon" aria-label="Shop">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </a>
      </div>
    </header>
  );
}
