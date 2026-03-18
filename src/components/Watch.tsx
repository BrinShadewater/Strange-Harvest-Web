"use client";

import { useState, useEffect } from "react";
import { sitecopy } from "./sitecopy";
import {
  detectRegion,
  filterStreamingPlatformsByCountry,
  filterUSCAPlatformsByCountry,
  getPlatformsForRegion,
  type GeoLocation,
} from "../services/geolocation";

export default function Watch() {
  const { watch } = sitecopy;
  const isDev = process.env.NODE_ENV === 'development';
  const [geo, setGeo] = useState<GeoLocation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initRegion() {
      try {
        const detectedGeo = await detectRegion();
        setGeo(detectedGeo);
      } catch (error) {
        if (isDev) {
          console.warn('Failed to detect region:', error);
        }
        setGeo({ country: 'XX', region: 'OTHER', detected: false });
      } finally {
        setLoading(false);
      }
    }

    initRegion();
  }, []);

  // Hide platform links until region detection completes to avoid incorrect links.
  if (loading || !geo) {
    return (
      <section className="watch" id="watch">
        <div className="sectionHead">
          <h2>{watch.title}</h2>
        </div>

        <p className="watchNote" style={{ marginTop: 24 }}>
          {watch.loadingMessage}
        </p>
      </section>
    );
  }

  // Get region-specific platform visibility
  const { showStreaming, showUSCA, showIntl } = getPlatformsForRegion(geo.region);
  const streamingPlatforms = filterStreamingPlatformsByCountry(watch.streamingPlatforms, geo.country);
  const uscaPlatforms = filterUSCAPlatformsByCountry(watch.usca, geo.country);

  return (
    <section className="watch" id="watch">
      <div className="sectionHead">
        <h2>{watch.title}</h2>
      </div>

      {showStreaming && streamingPlatforms.length > 0 && (
        <>
          <div className="sectionHead" style={{ marginTop: 24 }}>
            <p className="subhead">{watch.streaming}</p>
          </div>

          <div className="watchGrid" style={{ gridTemplateColumns: '1fr', maxWidth: '210px' }}>
            {streamingPlatforms.map((p) => (
              <a
                key={p.name}
                className="watchCard featured"
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={`${watch.ariaWatchOn} ${p.name}`}
              >
                <img src={p.icon} alt="" className="watchIcon" loading={"lazy"} decoding={"async"} width={p.iconWidth} height={p.iconHeight} />
                <div className="watchName">{p.name}</div>
              </a>
            ))}
          </div>
        </>
      )}

      {showUSCA && uscaPlatforms.length > 0 && (
        <>
          <div className="sectionHead" style={{ marginTop: 32 }}>
            <p className="subhead">{watch.rentOwnUSCA}</p>
          </div>

          <div className="watchGrid watchGridRent">
            {uscaPlatforms.map((p) => (
              <a
                key={p.name}
                className="watchCard"
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={`${watch.ariaRentBuyOn} ${p.name}`}
              >
                <img src={p.icon} alt="" className="watchIcon" loading={"lazy"} decoding={"async"} width={p.iconWidth} height={p.iconHeight} />
                <div className="watchName">{p.name}</div>
              </a>
            ))}
          </div>
        </>
      )}

      {showIntl && watch.intl.length > 0 && (
        <>
          <div className="sectionHead" style={{ marginTop: 32 }}>
            <p className="subhead">{watch.rentOwnIntl}</p>
          </div>

          <div className="watchGrid watchGridRent">
            {watch.intl.map((p) => (
              <a
                key={p.name}
                className="watchCard"
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={`${watch.ariaRentBuyOn} ${p.name}`}
              >
                <img src={p.icon} alt="" className="watchIcon" loading={"lazy"} decoding={"async"} width={p.iconWidth} height={p.iconHeight} />
                <div className="watchName">{p.name}</div>
              </a>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
