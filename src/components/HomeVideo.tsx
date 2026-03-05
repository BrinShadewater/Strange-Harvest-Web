import { useEffect, useState } from "react";
import { sitecopy } from "./sitecopy";
import { detectRegion } from "../services/geolocation";

function getAmazonHomeVideoLink(countryCode: string, fallbackHref: string): string {
  const query = encodeURIComponent("Strange Harvest Stuart Ortiz DVD");
  const code = countryCode.toUpperCase();

  switch (code) {
    case "US":
      return "https://www.amazon.com/dp/B0FSMGS86V";
    case "CA":
      return `https://www.amazon.ca/s?k=${query}`;
    case "GB":
    case "UK":
      return `https://www.amazon.co.uk/s?k=${query}`;
    case "AU":
      return `https://www.amazon.com.au/s?k=${query}`;
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

export default function HomeVideo() {
  const { homeVideo } = sitecopy;
  const [homeVideoHref, setHomeVideoHref] = useState(homeVideo.cta.href);

  useEffect(() => {
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
  }, [homeVideo.cta.href]);

  return (
    <section className="homeVideo" id="home-video">
      <h2>{homeVideo.title}</h2>

      <div className="homeVideoCard">
        <div className="homeVideoImageWrapper">
          <img src={homeVideo.image} alt={homeVideo.productTitle} className="homeVideoImage" width="300" height="450" loading="lazy" />
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
