import { useEffect, useRef, useState } from "react";
import { sitecopy } from "./sitecopy";

export default function Hero() {
  const { hero } = sitecopy;
  const [isFestivalPoster, setIsFestivalPoster] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const flickerTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    document.body.classList.toggle("festival-theme", isFestivalPoster);
    return () => {
      document.body.classList.remove("festival-theme");
    };
  }, [isFestivalPoster]);

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

  const handlePosterToggle = (festivalMode: boolean) => {
    setIsFestivalPoster(festivalMode);
    setTitleVisible(false);
    if (flickerTimeoutRef.current) {
      window.clearTimeout(flickerTimeoutRef.current);
    }
    flickerTimeoutRef.current = window.setTimeout(() => {
      setTitleVisible(true);
    }, 40);
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
            <a className="cta primary" href={hero.ctas.primary.href}>
              {hero.ctas.primary.label}
            </a>
            <a className="cta" href={hero.ctas.secondary.href}>
              {hero.ctas.secondary.label}
            </a>
            <a className="cta" href={hero.ctas.tertiary.href}>
              {hero.ctas.tertiary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
