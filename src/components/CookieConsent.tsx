import { useState, useEffect } from "react";
import { sitecopy } from "./sitecopy";

interface ConsentState {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const CONSENT_KEY = "sh_consent";

// Google Analytics 4 Measurement ID from environment
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Declare gtag function for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Helper function to load Google Analytics 4
const loadAnalytics = () => {
  // Check if GA is configured
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn("Google Analytics not configured. Set VITE_GA_MEASUREMENT_ID in .env");
    return;
  }

  if (typeof window.gtag !== 'undefined') {
    console.log("Analytics already loaded");
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  
  // Set initial timestamp
  window.gtag('js', new Date());
  
  // Configure GA4 with consent mode
  window.gtag('consent', 'default', {
    'analytics_storage': 'granted',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
  });
  
  // Configure GA4
  window.gtag('config', GA_MEASUREMENT_ID, {
    'anonymize_ip': true,
    'cookie_flags': 'SameSite=None;Secure',
  });

  // Load the gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  
  console.log("Google Analytics 4 loaded");
};

const loadMarketingScripts = () => {
  // Update consent for marketing/advertising
  if (typeof window.gtag !== 'undefined') {
    window.gtag('consent', 'update', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
    });
  }
  
  // Add additional marketing scripts here (Meta Pixel, etc.)
  console.log("Marketing scripts loaded");
};

const loadPreferenceScripts = () => {
  // Add preference/personalization scripts here
  console.log("Preference scripts loaded");
};

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });
  
  const { cookieConsent } = sitecopy;

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    if (!savedConsent) {
      setIsVisible(true);
    } else {
      try {
        const parsed = JSON.parse(savedConsent);
        setConsent(parsed);
        loadConsentedScripts(parsed);
      } catch (error) {
        console.error("Error parsing consent:", error);
        setIsVisible(true);
      }
    }
  }, []);

  const loadConsentedScripts = (consentState: ConsentState) => {
    if (consentState.analytics) {
      loadAnalytics();
    }
    if (consentState.marketing) {
      loadMarketingScripts();
    }
    if (consentState.preferences) {
      loadPreferenceScripts();
    }
  };

  const saveConsent = (newConsent: ConsentState) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    setConsent(newConsent);
    setIsVisible(false);
    setShowPreferences(false);
    loadConsentedScripts(newConsent);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
  };

  const handleEssentialOnly = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  };

  const handleManagePreferences = () => {
    setShowPreferences(true);
  };

  const handleSavePreferences = () => {
    saveConsent(consent);
  };

  const handleClosePreferences = () => {
    setShowPreferences(false);
  };

  const toggleConsent = (key: keyof ConsentState) => {
    if (key === "essential") return; // Cannot disable essential
    setConsent((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Method to reopen consent from footer link
  useEffect(() => {
    const handleReopenConsent = () => {
      setIsVisible(true);
    };

    window.addEventListener("openCookieSettings", handleReopenConsent);
    return () => window.removeEventListener("openCookieSettings", handleReopenConsent);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Banner */}
      <div className="cookieConsentOverlay" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-message">
        <div className="cookieConsentBanner">
          <div className="cookieConsentContent">
            <h3 id="cookie-title" className="cookieConsentTitle">
              {cookieConsent.title}
            </h3>
            <p id="cookie-message" className="cookieConsentMessage">
              {cookieConsent.message}{" "}
              <a
                href={cookieConsent.privacyLink.href}
                className="cookieConsentPrivacyLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                {cookieConsent.privacyLink.label}
              </a>
            </p>
          </div>
          <div className="cookieConsentActions">
            <button
              onClick={handleEssentialOnly}
              className="cookieConsentButton cookieConsentEssential"
              aria-label="Only essential cookies"
            >
              {cookieConsent.essentialOnlyButton}
            </button>
            <button
              onClick={handleManagePreferences}
              className="cookieConsentButton cookieConsentManage"
              aria-label="Manage cookie preferences"
            >
              {cookieConsent.manageButton}
            </button>
            <button
              onClick={handleAcceptAll}
              className="cookieConsentButton cookieConsentAccept"
              aria-label="Accept all cookies"
            >
              {cookieConsent.acceptAllButton}
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="cookiePreferencesOverlay" role="dialog" aria-labelledby="preferences-title">
          <div className="cookiePreferencesModal">
            <div className="cookiePreferencesHeader">
              <h2 id="preferences-title" className="cookiePreferencesTitle">
                {cookieConsent.preferences.title}
              </h2>
              <button
                onClick={handleClosePreferences}
                className="cookiePreferencesClose"
                aria-label="Close preferences"
              >
                ×
              </button>
            </div>
            
            <p className="cookiePreferencesDescription">
              {cookieConsent.preferences.description}
            </p>

            <div className="cookiePreferencesList">
              {/* Essential */}
              <div className="cookiePreferenceItem">
                <div className="cookiePreferenceHeader">
                  <div className="cookiePreferenceInfo">
                    <h3 className="cookiePreferenceLabel">
                      {cookieConsent.preferences.categories.essential.label}
                    </h3>
                    <p className="cookiePreferenceDesc">
                      {cookieConsent.preferences.categories.essential.description}
                    </p>
                  </div>
                  <label className="cookieToggle cookieToggleDisabled">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      aria-label="Essential cookies (required)"
                    />
                    <span className="cookieToggleSlider"></span>
                  </label>
                </div>
              </div>

              {/* Analytics */}
              <div className="cookiePreferenceItem">
                <div className="cookiePreferenceHeader">
                  <div className="cookiePreferenceInfo">
                    <h3 className="cookiePreferenceLabel">
                      {cookieConsent.preferences.categories.analytics.label}
                    </h3>
                    <p className="cookiePreferenceDesc">
                      {cookieConsent.preferences.categories.analytics.description}
                    </p>
                  </div>
                  <label className="cookieToggle">
                    <input
                      type="checkbox"
                      checked={consent.analytics}
                      onChange={() => toggleConsent("analytics")}
                      aria-label="Analytics cookies"
                    />
                    <span className="cookieToggleSlider"></span>
                  </label>
                </div>
              </div>

              {/* Marketing */}
              <div className="cookiePreferenceItem">
                <div className="cookiePreferenceHeader">
                  <div className="cookiePreferenceInfo">
                    <h3 className="cookiePreferenceLabel">
                      {cookieConsent.preferences.categories.marketing.label}
                    </h3>
                    <p className="cookiePreferenceDesc">
                      {cookieConsent.preferences.categories.marketing.description}
                    </p>
                  </div>
                  <label className="cookieToggle">
                    <input
                      type="checkbox"
                      checked={consent.marketing}
                      onChange={() => toggleConsent("marketing")}
                      aria-label="Marketing cookies"
                    />
                    <span className="cookieToggleSlider"></span>
                  </label>
                </div>
              </div>

              {/* Preferences */}
              <div className="cookiePreferenceItem">
                <div className="cookiePreferenceHeader">
                  <div className="cookiePreferenceInfo">
                    <h3 className="cookiePreferenceLabel">
                      {cookieConsent.preferences.categories.preferences.label}
                    </h3>
                    <p className="cookiePreferenceDesc">
                      {cookieConsent.preferences.categories.preferences.description}
                    </p>
                  </div>
                  <label className="cookieToggle">
                    <input
                      type="checkbox"
                      checked={consent.preferences}
                      onChange={() => toggleConsent("preferences")}
                      aria-label="Preference cookies"
                    />
                    <span className="cookieToggleSlider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="cookiePreferencesActions">
              <button
                onClick={handleSavePreferences}
                className="cookieConsentButton cookieConsentAccept"
              >
                {cookieConsent.saveButton}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
