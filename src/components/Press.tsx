"use client";

import { useSitecopy } from "./LanguageProvider";
import { useState, useEffect, useRef, useMemo } from "react";

export default function Press() {
  const { press } = useSitecopy();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useRef(false);

  const quotesLength = useMemo(() => press.quotes.length, [press.quotes.length]);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // If user prefers reduced motion, start paused
    if (prefersReducedMotion.current) setIsPaused(true);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotesLength);
    }, 8000);
    return () => clearInterval(interval);
  }, [quotesLength, isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + quotesLength) % quotesLength);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % quotesLength);
  };

  const position = press.aria.position
    .replace("{current}", String(currentIndex + 1))
    .replace("{total}", String(quotesLength));

  return (
    <section className="press" id="press">
      <h2>{press.title}</h2>
      
      {press.icons && (
        <div className="pressIcons">
          {press.icons.map((icon) => (
            <a
              key={icon.name}
              href={icon.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={icon.name}
            >
              <img src={icon.icon} alt={icon.name} className="pressIcon" loading={"lazy"} decoding={"async"} width={icon.iconWidth} height={icon.iconHeight} />
            </a>
          ))}
        </div>
      )}
      
      {/* No aria-live on the track itself. It used to announce on every 8s
          auto-advance, interrupting screen-reader users indefinitely. The
          position counter below announces instead, and only when the visitor
          has taken control by pausing. */}
      <div className="pressCarousel" role="group" aria-roledescription="carousel" aria-label={press.aria.carousel}>
        <button
          className="carouselButton carouselButtonPrev"
          onClick={goToPrevious}
          aria-label={press.aria.previous}
        >
          ‹
        </button>

        <div className="carouselTrack">
          {press.quotes.map((review, idx) => (
            <a
              key={idx}
              href={review.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`pressCard ${idx === currentIndex ? 'active' : ''}`}
              /* Inactive cards are opacity:0 and off to the side but were still
                 in the tab order — keyboard users tabbed through 27 invisible
                 links. inert removes them from focus and from the a11y tree. */
              inert={idx !== currentIndex}
              style={{
                transform: `translateX(${(idx - currentIndex) * 100}%)`,
              }}
            >
              <svg
                className="quoteDecoration"
                aria-hidden="true"
                width="100"
                height="80"
                viewBox="0 0 100 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 0C8.954 0 0 8.954 0 20v15c0 11.046 8.954 20 20 20h5c2.761 0 5-2.239 5-5V30c0-2.761-2.239-5-5-5h-5c-5.523 0-10-4.477-10-10s4.477-10 10-10c2.761 0 5-2.239 5-5S22.761 0 20 0zm50 0c-11.046 0-20 8.954-20 20v15c0 11.046 8.954 20 20 20h5c2.761 0 5-2.239 5-5V30c0-2.761-2.239-5-5-5h-5c-5.523 0-10-4.477-10-10s4.477-10 10-10c2.761 0 5-2.239 5-5S72.761 0 70 0z" fill="currentColor" />
              </svg>
              <blockquote className="pressQuote">&ldquo;{review.quote}&rdquo;</blockquote>
              <p className="pressSource">— {review.source}</p>
            </a>
          ))}
        </div>

        <button
          className="carouselButton carouselButtonNext"
          onClick={goToNext}
          aria-label={press.aria.next}
        >
          ›
        </button>
      </div>

      <div className="carouselControls">
        <button
          className="carouselButton carouselButtonPause"
          onClick={() => setIsPaused((p) => !p)}
          aria-label={isPaused ? press.aria.resume : press.aria.pause}
          aria-pressed={isPaused}
        >
          {isPaused ? "▶" : "⏸"}
        </button>
        <div className="carouselDots">
          {press.quotes.map((review, idx) => (
            <button
              key={idx}
              className={`carouselDot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`${press.aria.goTo} ${review.source.split('/')[0].trim()}`}
              aria-current={idx === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
        {/* Orientation among 28 quotes, and the one thing that speaks — but only
            once the visitor has paused, so autoplay never interrupts. */}
        <p className="carouselPosition" aria-live={isPaused ? "polite" : "off"}>
          {position}
        </p>
      </div>

      {/* The press kit was reachable only by knowing the URL. Press and
          programmers are a named audience; this is their route in. */}
      <p className="pressKitLink">
        <a href={press.kitLink.href}>{press.kitLink.label}</a>
      </p>
    </section>
  );
}
