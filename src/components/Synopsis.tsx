import { sitecopy } from "./sitecopy";

export default function Synopsis() {
  const { synopsis } = sitecopy;

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
              src={img} 
              alt={`Crime scene evidence ${idx + 1}`} 
              loading="lazy"
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
