import { useEffect, useRef, useState } from "react";
import { sitecopy } from "./sitecopy";

type ThemeVariant = "red" | "blue";

const AB_VARIANT_KEY = "sh_ab_theme_variant_v1";
const AB_STATS_KEY = "sh_ab_theme_stats_v1";

function chooseInitialVariant(): ThemeVariant {
  if (typeof window === "undefined") return "red";
  const stored = window.localStorage.getItem(AB_VARIANT_KEY);
  if (stored === "red" || stored === "blue") return stored;

  const byte = window.crypto?.getRandomValues?.(new Uint8Array(1))?.[0];
  const variant: ThemeVariant = (byte ?? Math.floor(Math.random() * 255)) % 2 === 0 ? "red" : "blue";
  window.localStorage.setItem(AB_VARIANT_KEY, variant);
  return variant;
}

function emitAbEvent(eventName: string, payload: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  const data = { ...payload, event_category: "ab_theme", event_label: "poster_theme_test_v1" };
  const win = window as Window & { gtag?: (...args: unknown[]) => void };
  if (typeof win.gtag === "function") {
    win.gtag("event", eventName, data);
  }
  window.dispatchEvent(new CustomEvent("sh:ab-theme-event", { detail: { eventName, ...data } }));
}

function updateAbStats(mutator: (current: any) => any) {
  if (typeof window === "undefined") return;
  const fallback = {
    exposures: { red: 0, blue: 0 },
    ctaClicks: { red: 0, blue: 0 },
    posterDownloads: { red: 0, blue: 0 },
    toggleToRed: 0,
    toggleToBlue: 0,
    finalChoice: { red: 0, blue: 0 },
  };
  const parsed = (() => {
    try {
      return JSON.parse(window.localStorage.getItem(AB_STATS_KEY) ?? "null");
    } catch {
      return null;
    }
  })();
  const next = mutator(parsed ?? fallback);
  window.localStorage.setItem(AB_STATS_KEY, JSON.stringify(next));
}

export default function Hero() {
  const { hero } = sitecopy;
  const [assignedVariant] = useState<ThemeVariant>(() => chooseInitialVariant());
  const [isFestivalPoster, setIsFestivalPoster] = useState(assignedVariant === "blue");
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const flickerTimeoutRef = useRef<number | null>(null);
  const currentVariantRef = useRef<ThemeVariant>(assignedVariant === "blue" ? "blue" : "red");
  const finalChoiceSavedRef = useRef(false);

  useEffect(() => {
    document.body.classList.toggle("festival-theme", isFestivalPoster);
    currentVariantRef.current = isFestivalPoster ? "blue" : "red";
    return () => {
      document.body.classList.remove("festival-theme");
    };
  }, [isFestivalPoster]);

  useEffect(() => {
    updateAbStats((stats) => ({
      ...stats,
      exposures: {
        ...stats.exposures,
        [assignedVariant]: (stats.exposures[assignedVariant] ?? 0) + 1,
      },
    }));
    emitAbEvent("ab_theme_exposure", { assigned_variant: assignedVariant });
  }, [assignedVariant]);

  useEffect(() => {
    const node = titleRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setTitleVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setTitleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (flickerTimeoutRef.current) {
        window.clearTimeout(flickerTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const saveFinalChoice = () => {
      if (finalChoiceSavedRef.current) return;
      finalChoiceSavedRef.current = true;
      const variant = currentVariantRef.current;
      updateAbStats((stats) => ({
        ...stats,
        finalChoice: {
          ...stats.finalChoice,
          [variant]: (stats.finalChoice[variant] ?? 0) + 1,
        },
      }));
      emitAbEvent("ab_theme_final_choice", { final_variant: variant, assigned_variant: assignedVariant });
    };

    window.addEventListener("pagehide", saveFinalChoice);
    return () => {
      saveFinalChoice();
      window.removeEventListener("pagehide", saveFinalChoice);
    };
  }, [assignedVariant]);

  const handlePosterToggle = (festivalMode: boolean) => {
    const nextVariant: ThemeVariant = festivalMode ? "blue" : "red";
    const previousVariant: ThemeVariant = currentVariantRef.current;
    setIsFestivalPoster(festivalMode);
    updateAbStats((stats) => ({
      ...stats,
      toggleToRed: stats.toggleToRed + (nextVariant === "red" ? 1 : 0),
      toggleToBlue: stats.toggleToBlue + (nextVariant === "blue" ? 1 : 0),
    }));
    emitAbEvent("ab_theme_toggle", {
      assigned_variant: assignedVariant,
      from_variant: previousVariant,
      to_variant: nextVariant,
    });
    setTitleVisible(false);
    if (flickerTimeoutRef.current) {
      window.clearTimeout(flickerTimeoutRef.current);
    }
    flickerTimeoutRef.current = window.setTimeout(() => {
      setTitleVisible(true);
    }, 40);
  };

  const handleCtaClick = (label: string) => {
    const variant = currentVariantRef.current;
    updateAbStats((stats) => ({
      ...stats,
      ctaClicks: {
        ...stats.ctaClicks,
        [variant]: (stats.ctaClicks[variant] ?? 0) + 1,
      },
    }));
    emitAbEvent("ab_theme_cta_click", {
      assigned_variant: assignedVariant,
      active_variant: variant,
      cta_label: label,
    });
  };

  const handlePosterDownload = () => {
    const variant = currentVariantRef.current;
    updateAbStats((stats) => ({
      ...stats,
      posterDownloads: {
        ...stats.posterDownloads,
        [variant]: (stats.posterDownloads[variant] ?? 0) + 1,
      },
    }));
    emitAbEvent("ab_theme_poster_download", {
      assigned_variant: assignedVariant,
      active_variant: variant,
    });
  };

  const poster = isFestivalPoster
    ? {
        src: "/images/strange-harvest-alternate-movie-poster.webp",
        downloadSrc: "/images/strange-harvest-alternate-movie-poster.jpg",
        alt: "Alternate Festival Run Poster featuring the masked killer from the horror mockumentary Strange Harvest",
      }
    : {
        src: "/images/strange-harvest-official-movie-poster.webp",
        downloadSrc: "/images/strange-harvest-official-movie-poster-1280w.jpg",
        srcSet:
          "/images/strange-harvest-official-movie-poster-640w.webp 640w, /images/strange-harvest-official-movie-poster-960w.webp 960w, /images/strange-harvest-official-movie-poster-1280w.webp 1280w",
        alt: "Official poster for the horror mockumentary Strange Harvest Occult Murder in the Inland Empire",
      };

  return (
    <section className="hero" id="top">
      <div className="heroGrid">
        <div className="heroPoster">
          <div className="posterFrame">
            <img
              src={poster.src}
              srcSet={poster.srcSet}
              sizes="(max-width: 768px) 88vw, (max-width: 1200px) 45vw, 600px"
              alt={poster.alt}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="600"
              height="900"
            />
            <a
              className="posterDownloadIcon"
              href={poster.downloadSrc}
              download=""
              target="_blank"
              rel="noopener noreferrer"
              onClick={handlePosterDownload}
              aria-label={isFestivalPoster ? "Download festival poster JPG" : "Download official poster JPG"}
              title={isFestivalPoster ? "Download festival poster (JPG)" : "Download official poster (JPG)"}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.29a1 1 0 1 1 1.4 1.42l-4 3.98a1 1 0 0 1-1.4 0l-4-3.98a1 1 0 0 1 1.4-1.42l2.3 2.29V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z"/>
              </svg>
            </a>
          </div>
          <div className="posterToggle" role="group" aria-label="Choose poster version">
            <button
              type="button"
              className={`posterToggleBtn ${!isFestivalPoster ? "active" : ""}`}
              onClick={() => handlePosterToggle(false)}
              aria-pressed={!isFestivalPoster}
            >
              {hero.posterToggle.official}
            </button>
            <button
              type="button"
              className={`posterToggleBtn ${isFestivalPoster ? "active" : ""}`}
              onClick={() => handlePosterToggle(true)}
              aria-pressed={isFestivalPoster}
            >
              {hero.posterToggle.festival}
            </button>
          </div>
        </div>

        <div className="heroCopy">
          <div className="heroKicker">{hero.tagline}</div>
          <div className="heroSubtitle">{hero.subtitle}</div>
          <h1 ref={titleRef} className={`heroTitle ${titleVisible ? "is-visible" : ""}`}>{hero.title}</h1>

          <p>{hero.blurb}</p>

          <div className="ctaRow">
            <a className="cta primary" href={hero.ctas.primary.href} onClick={() => handleCtaClick(hero.ctas.primary.label)}>
              {hero.ctas.primary.label}
            </a>
            <a className="cta" href={hero.ctas.secondary.href} onClick={() => handleCtaClick(hero.ctas.secondary.label)}>
              {hero.ctas.secondary.label}
            </a>
            <a className="cta" href={hero.ctas.tertiary.href} onClick={() => handleCtaClick(hero.ctas.tertiary.label)}>
              {hero.ctas.tertiary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
