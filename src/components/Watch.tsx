import { sitecopy } from "./sitecopy";

export default function Watch() {
  const { watch } = sitecopy;

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
    </section>
  );
}
