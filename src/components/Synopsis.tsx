import { useEffect, useState } from "react";
import { sitecopy } from "./sitecopy";

export default function Synopsis() {
  const { synopsis } = sitecopy;
  const [expandedImage, setExpandedImage] = useState<null | { src: string; alt: string }>(null);
  const [expandedStat, setExpandedStat] = useState<null | { value: string; label: string }>(null);
  const getSrcSet = (src: string) => {
    const base = src.replace(".webp", "");
    return `${base}-640w.webp 640w, ${base}-960w.webp 960w, ${base}-1280w.webp 1280w`;
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedImage(null);
        setExpandedStat(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const highlightNames = (text: string) => {
    return text
      .replace(/Joe Kirby/g, '<strong class="highlight">Joe Kirby</strong>')
      .replace(/Lexi Taylor/g, '<strong class="highlight">Lexi Taylor</strong>')
      .replace(/"Mr\. Shiny"/g, '<strong class="highlight">"Mr. Shiny"</strong>');
  };

  return (
    <article className="synopsis" id="about">
      <h2 className="synopsisTitle">{synopsis.title}</h2>
      
      <div className="synopsisContent">
        <div className="synopsisText">
          <p dangerouslySetInnerHTML={{ __html: highlightNames(synopsis.body[0]) }} />
          <p dangerouslySetInnerHTML={{ __html: highlightNames(synopsis.body[1]) }} />
        </div>
        
        <div className="synopsisText">
          <p dangerouslySetInnerHTML={{ __html: highlightNames(synopsis.body[2]) }} />
          {synopsis.quote && (
            <blockquote className="synopsisQuote">
              <p>{synopsis.quote.text}</p>
              <cite>— {synopsis.quote.attribution}</cite>
            </blockquote>
          )}
        </div>
      </div>

      {synopsis.images && (
        <div className="synopsisImages">
          {synopsis.images.map((img, idx) => (
            <button
              key={idx}
              className="synopsisMediaButton"
              type="button"
              onClick={() => setExpandedImage({ src: img.src, alt: img.alt })}
              aria-label={`Expand image: ${img.alt}`}
            >
              <img
                src={img.src}
                srcSet={getSrcSet(img.src)}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt={img.alt}
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}

      {synopsis.stats && (
        <div className="synopsisStats">
          {synopsis.stats.map((stat, idx) => (
            <button
              key={idx}
              className="synopsisStat synopsisStatButton"
              type="button"
              onClick={() => setExpandedStat({ value: stat.value, label: stat.label })}
              aria-label={`Expand stat: ${stat.label} ${stat.value}`}
            >
              <div className="statValue">{stat.value}</div>
              <div className="statLabel">{stat.label}</div>
            </button>
          ))}
        </div>
      )}

      {expandedImage && (
        <div className="synopsisLightbox" role="dialog" aria-modal="true" onClick={() => setExpandedImage(null)}>
          <button
            className="synopsisLightboxClose"
            type="button"
            onClick={() => setExpandedImage(null)}
            aria-label="Close expanded image"
          >
            ×
          </button>
          <img
            src={expandedImage.src}
            srcSet={getSrcSet(expandedImage.src)}
            sizes="100vw"
            alt={expandedImage.alt}
            className="synopsisLightboxImage"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {expandedStat && (
        <div className="synopsisLightbox" role="dialog" aria-modal="true" onClick={() => setExpandedStat(null)}>
          <button
            className="synopsisLightboxClose"
            type="button"
            onClick={() => setExpandedStat(null)}
            aria-label="Close expanded stat"
          >
            ×
          </button>
          <div className="synopsisStatExpanded" onClick={(e) => e.stopPropagation()}>
            <div className="statValue">{expandedStat.value}</div>
            <div className="statLabel">{expandedStat.label}</div>
          </div>
        </div>
      )}
    </article>
  );
}
