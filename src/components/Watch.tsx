import { useState, useEffect } from "react";
import { sitecopy } from "./sitecopy";
import { detectRegion, getPlatformsForRegion, type Region } from "../services/geolocation";

export default function Watch() {
  const { watch } = sitecopy;
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initRegion() {
      try {
        const geo = await detectRegion();
        setRegion(geo.region);
        
        // Log for debugging (remove in production if desired)
        if (geo.detected) {
          console.log(`Region detected: ${geo.region} (${geo.country})`);
        }
      } catch (error) {
        console.warn('Failed to detect region:', error);
        setRegion('OTHER'); // Show all options on error
      } finally {
        setLoading(false);
      }
    }

    initRegion();
  }, []);

  // Show loading or all options while detecting
  if (loading || !region) {
    // Show all options while loading
    return (
      <section className="watch" id="watch">
        <div className="sectionHead">
          <h2>{watch.title}</h2>
        </div>

        <div className="sectionHead" style={{ marginTop: 24 }}>
          <p className="subhead">{watch.streaming}</p>
        </div>

        <div className="watchGrid" style={{ gridTemplateColumns: '1fr', maxWidth: '300px' }}>
          {watch.streamingPlatforms.map((p) => (
            <a
              key={p.name}
              className="watchCard featured"
              href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel={p.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={`Watch on ${p.name}`}
            >
              <img src={p.icon} alt="" className="watchIcon" />
              <div className="watchName">{p.name}</div>
            </a>
          ))}
        </div>

        <div className="sectionHead" style={{ marginTop: 32 }}>
          <p className="subhead">{watch.rentOwnUSCA}</p>
        </div>

        <div className="watchGrid">
          {watch.usca.map((p) => (
            <a
              key={p.name}
              className="watchCard"
              href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel={p.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={`Rent or buy on ${p.name}`}
            >
              <img src={p.icon} alt="" className="watchIcon" />
              <div className="watchName">{p.name}</div>
            </a>
          ))}
        </div>
      </section>
    );
  }

  // Get region-specific platform visibility
  const { showStreaming, showUSCA, showIntl } = getPlatformsForRegion(region);

  return (
    <section className="watch" id="watch">
      <div className="sectionHead">
        <h2>{watch.title}</h2>
      </div>

      {showStreaming && watch.streamingPlatforms.length > 0 && (
        <>
          <div className="sectionHead" style={{ marginTop: 24 }}>
            <p className="subhead">{watch.streaming}</p>
          </div>

          <div className="watchGrid" style={{ gridTemplateColumns: '1fr', maxWidth: '300px' }}>
            {watch.streamingPlatforms.map((p) => (
              <a
                key={p.name}
                className="watchCard featured"
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={`Watch on ${p.name}`}
              >
                <img src={p.icon} alt="" className="watchIcon" />
                <div className="watchName">{p.name}</div>
              </a>
            ))}
          </div>
        </>
      )}

      {showUSCA && watch.usca.length > 0 && (
        <>
          <div className="sectionHead" style={{ marginTop: 32 }}>
            <p className="subhead">{watch.rentOwnUSCA}</p>
          </div>

          <div className="watchGrid">
            {watch.usca.map((p) => (
              <a
                key={p.name}
                className="watchCard"
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={`Rent or buy on ${p.name}`}
              >
                <img src={p.icon} alt="" className="watchIcon" />
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

          <div className="watchGrid">
            {watch.intl.map((p) => (
              <a
                key={p.name}
                className="watchCard"
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={`Rent or buy on ${p.name}`}
              >
                <img src={p.icon} alt="" className="watchIcon" />
                <div className="watchName">{p.name}</div>
              </a>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
