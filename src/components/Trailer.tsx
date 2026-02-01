export default function Trailer() {
  return (
    <section className="trailer" id="trailer">
      <div className="sectionHead">
        <h2>Official Trailer</h2>
      </div>

      <div style={{ marginTop: '48px' }} className="videoWrapper">
        <iframe
          src="https://www.youtube.com/embed/tYyTpuk8Zuk"
          title="Strange Harvest Official Trailer"
          frameBorder="0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}
