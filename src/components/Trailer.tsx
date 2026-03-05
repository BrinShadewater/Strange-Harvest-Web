import { sitecopy } from "./sitecopy";

export default function Trailer() {
  const { trailer } = sitecopy;

  return (
    <section className="trailer" id="trailer">
      <div className="sectionHead">
        <h2>{trailer.title}</h2>
      </div>

      <div style={{ marginTop: '48px' }} className="videoWrapper">
        <iframe
          src="https://www.youtube.com/embed/tYyTpuk8Zuk?cc_load_policy=1"
          title={trailer.iframeTitle}
          frameBorder="0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}
