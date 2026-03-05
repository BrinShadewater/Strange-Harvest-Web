import { sitecopy } from "./sitecopy";

export default function Synopsis() {
  const { synopsis } = sitecopy;
  const getSrcSet = (src: string) => {
    const base = src.replace(".webp", "");
    return `${base}-640w.webp 640w, ${base}-960w.webp 960w, ${base}-1280w.webp 1280w`;
  };

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
            <img 
              key={idx} 
              src={img.src}
              srcSet={getSrcSet(img.src)}
              sizes="(max-width: 768px) 100vw, 50vw"
              alt={img.alt}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      )}

      {synopsis.stats && (
        <div className="synopsisStats">
          {synopsis.stats.map((stat, idx) => (
            <div key={idx} className="synopsisStat">
              <div className="statValue">{stat.value}</div>
              <div className="statLabel">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
