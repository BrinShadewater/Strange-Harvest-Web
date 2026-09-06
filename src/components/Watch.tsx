"use client";

import { useState, useEffect } from "react";
import { useSitecopy } from "./LanguageProvider";
import {
  detectRegion,
  filterStreamingPlatformsByCountry,
  filterUSCAPlatformsByCountry,
  geoFromCountry,
  getPlatformsForRegion,
  type GeoLocation,
} from "../services/geolocation";

/**
 * Watch — the conversion surface.
 *
 * The region arrives from the edge header during server rendering, so the
 * common case paints real platform links in the first byte. When the header is
 * absent (local dev, unknown host) we fall back to client detection, but we
 * render the region-agnostic list while that runs instead of a spinner. There
 * is no state in which this section shows a visitor nothing to click.
 */
const isDev = process.env.NODE_ENV === "development";

export default function Watch({ initialCountry = "XX" }: { initialCountry?: string }) {
  const { watch } = useSitecopy();

  const serverGeo = geoFromCountry(initialCountry);
  const [geo, setGeo] = useState<GeoLocation>(serverGeo);

  useEffect(() => {
    // The server already knew the country — nothing to detect.
    if (serverGeo.detected) return;

    let cancelled = false;

    async function initRegion() {
      try {
        const detectedGeo = await detectRegion();
        if (!cancelled) setGeo(detectedGeo);
      } catch (error) {
        if (isDev) {
          console.warn("Failed to detect region:", error);
        }
        // Keep the region-agnostic list already on screen.
      }
    }

    initRegion();
    return () => {
      cancelled = true;
    };
  }, [serverGeo.detected]);

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
              >
                <img src={p.icon} alt="" className="watchIcon" loading={"lazy"} decoding={"async"} width={p.iconWidth} height={p.iconHeight} />
                <div className="watchName">{p.name}</div>
                <div className="watchIncluded">{watch.includedWithSubscription}</div>
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
              >
                <img src={p.icon} alt="" className="watchIcon" loading={"lazy"} decoding={"async"} width={p.iconWidth} height={p.iconHeight} />
                <div className="watchName">{p.name}</div>
              </a>
            ))}
          </div>
        </>
      )}

      {!geo.detected && (
        <p className="watchNote" style={{ marginTop: 24 }}>
          {watch.regionUnknownNote}
        </p>
      )}
    </section>
  );
}
