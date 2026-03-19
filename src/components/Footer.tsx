"use client";

import { sitecopy } from "./sitecopy";
import { HERO_LOGO_SRC_OPTIMISED, HERO_LOGO_SRCSET } from "../constants/assets";

export default function Footer() {
  const { footer } = sitecopy;

  const handleCookieSettings = () => {
    window.dispatchEvent(new Event("openCookieSettings"));
  };

  return (
    <footer className="siteFooter">
      <div className="footerContent">
        <img src={HERO_LOGO_SRC_OPTIMISED} srcSet={HERO_LOGO_SRCSET} sizes="120px" alt="" className="footerSymbol" aria-hidden="true" loading={"lazy"} decoding={"async"} width={512} height={512} />
        <h2 className="footerTitle">{footer.title}</h2>
        <p className="footerTagline">{footer.tagline}</p>
        
        <div className="footerSocials">
          <a href="https://www.rottentomatoes.com/m/strange_harvest" target="_blank" rel="noopener noreferrer" aria-label="Rotten Tomatoes">
            <img src="/images/strange-harvest-rotten-tomatoes-icon.webp" alt="Rotten Tomatoes" className="socialIcon" width={512} height={512} loading={"lazy"} decoding={"async"} />
          </a>
          <a href="https://www.instagram.com/strangeharvestmovie/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="/images/strange-harvest-social-instagram-icon.webp" alt="Instagram" className="socialIcon" width={512} height={512} loading={"lazy"} decoding={"async"} />
          </a>
          <a href="https://www.facebook.com/Strangeharvestmovie/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src="/images/strange-harvest-social-facebook-icon.webp" alt="Facebook" className="socialIcon" width={512} height={512} loading={"lazy"} decoding={"async"} />
          </a>
          <a href="https://x.com/Strange_Harvest" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <img src="/images/strange-harvest-social-twitter-x-icon.webp" alt="X (Twitter)" className="socialIcon noFilter" width={512} height={512} loading={"lazy"} decoding={"async"} />
          </a>
        </div>

        <div className="footerBottom">
          <p className="footerOfficial">{footer.officialNotice}</p>
          <p className="footerCopyright">{footer.copyright}</p>
          <p className="footerMusic">{footer.musicCredit}</p>
          <p className="footerDisclaimer">{footer.disclaimer}</p>
          <a href="/privacy.html" className="footerPrivacyLink">Privacy Policy</a>
          <button
            onClick={handleCookieSettings}
            className="footerCookieSettings"
            aria-label="Manage cookie preferences"
          >
            {footer.cookieSettingsLabel}
          </button>
        </div>
      </div>
    </footer>
  );
}
