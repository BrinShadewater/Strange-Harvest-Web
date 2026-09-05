"use client";

import { useEffect, useState } from "react";
import { useSitecopy } from "./LanguageProvider";
import { detectRegion, geoFromCountry } from "../services/geolocation";

function getAmazonHomeVideoLink(countryCode: string, fallbackHref: string): string {
  const query = encodeURIComponent("Strange Harvest Stuart Ortiz DVD");
  const code = countryCode.toUpperCase();

  // Deep links only where the ASIN is VERIFIED in that marketplace (fetched, HTTP 200,
  // film title present on the page — checked 2026-08-15). UK/DE/FR/ES/IT 404 on this
  // ASIN, and JP/MX return 200 *without* the film title (possibly a different product),
  // so those territories keep honest search links. A search result beats a wrong or
  // dead product page; re-verify before promoting any territory to a deep link.
  switch (code) {
    case "US":
      return "https://www.amazon.com/dp/B0FSMGS86V";
    case "CA":
      return "https://www.amazon.ca/dp/B0FSMGS86V";
    case "GB":
    case "UK":
      return `https://www.amazon.co.uk/s?k=${query}`;
    case "AU":
      return "https://www.amazon.com.au/dp/B0FSMGS86V";
    case "DE":
      return `https://www.amazon.de/s?k=${query}`;
    case "FR":
      return `https://www.amazon.fr/s?k=${query}`;
    case "ES":
      return `https://www.amazon.es/s?k=${query}`;
    case "IT":
      return `https://www.amazon.it/s?k=${query}`;
    case "JP":
      return `https://www.amazon.co.jp/s?k=${query}`;
    case "MX":
      return `https://www.amazon.com.mx/s?k=${query}`;
    default:
      return fallbackHref;
  }
}

export default function HomeVideo({ initialCountry = "XX" }: { initialCountry?: string }) {
  const { homeVideo } = useSitecopy();
  // Same contract as Watch: the server already resolved the country from the edge
  // headers, so render the right marketplace link immediately and skip the client
  // round trip (sessionStorage, /api/geo, then ipapi.co) that ran on every visit.
  const serverGeo = geoFromCountry(initialCountry);
  const [homeVideoHref, setHomeVideoHref] = useState(
    serverGeo.detected ? getAmazonHomeVideoLink(serverGeo.country, homeVideo.cta.href) : homeVideo.cta.href
  );

  useEffect(() => {
    if (serverGeo.detected) return;
    let isMounted = true;

    async function setGeoLink() {
      try {
        const geo = await detectRegion();
        if (isMounted) {
          setHomeVideoHref(getAmazonHomeVideoLink(geo.country, homeVideo.cta.href));
        }
      } catch {
        if (isMounted) {
          setHomeVideoHref(homeVideo.cta.href);
        }
      }
    }

    setGeoLink();

    return () => {
      isMounted = false;
    };
  }, [homeVideo.cta.href, serverGeo.detected]);

  return (
    <section className="homeVideo" id="home-video">
      <h2>{homeVideo.title}</h2>

      <div className="homeVideoCard">
        <div className="homeVideoImageWrapper">
          {/* This was the one image the overhaul missed: the full 1368×1824 poster
              (198 KB) served into a 300px box. The 640w/960w derivatives already
              existed and were only wired up on the hero. */}
          <img
            src={homeVideo.image}
            srcSet="/images/strange-harvest-official-movie-poster-640w.webp 640w, /images/strange-harvest-official-movie-poster-960w.webp 960w"
            sizes="300px"
            alt={homeVideo.productTitle}
            className="homeVideoImage"
            width="300"
            height="450"
            loading="lazy"
            decoding={"async"}
          />
        </div>
        
        <div className="homeVideoContent">
          <h3 className="homeVideoProductTitle">{homeVideo.productTitle}</h3>
          <p className="homeVideoDescription">{homeVideo.description}</p>
          
          <a 
            href={homeVideoHref} 
            target={homeVideo.cta.target}
            rel="noopener noreferrer"
            className="homeVideoCta"
          >
            {homeVideo.cta.label}
          </a>
          
          <p className="homeVideoDisclaimer">{homeVideo.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
