import { sitecopy } from "./sitecopy";
import { useState, useEffect, useMemo } from "react";

export default function Press() {
  const { press } = sitecopy;
  const [currentIndex, setCurrentIndex] = useState(0);

  const quotesLength = useMemo(() => press.quotes.length, [press.quotes.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotesLength);
    }, 8000);
    return () => clearInterval(interval);
  }, [quotesLength]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + quotesLength) % quotesLength);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % quotesLength);
  };

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
              rel="noreferrer"
              aria-label={icon.name}
            >
              <img src={icon.icon} alt={icon.name} className="pressIcon" />
            </a>
          ))}
        </div>
      )}
      
      <div className="pressCarousel" aria-label="Press reviews carousel" aria-live="polite">
        <button 
          className="carouselButton carouselButtonPrev" 
          onClick={goToPrevious}
          aria-label="Previous review"
        >
          ‹
        </button>

        <div className="carouselTrack">
          {press.quotes.map((review, idx) => (
            <a
              key={idx}
              href={review.href}
              target="_blank"
              rel="noreferrer"
              className={`pressCard ${idx === currentIndex ? 'active' : ''}`}
              style={{
                transform: `translateX(${(idx - currentIndex) * 100}%)`,
              }}
            >
              <img src="/images/quote-marks.svg" alt="" className="quoteDecoration" aria-hidden="true" />
              <blockquote className="pressQuote">"{review.quote}"</blockquote>
              <p className="pressSource">— {review.source}</p>
            </a>
          ))}
        </div>

        <button 
          className="carouselButton carouselButtonNext" 
          onClick={goToNext}
          aria-label="Next review"
        >
          ›
        </button>
      </div>

      <div className="carouselDots">
        {press.quotes.map((review, idx) => (
          <button
            key={idx}
            className={`carouselDot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to review from ${review.source.split('/')[0].trim()}`}
            aria-current={idx === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  );
}
