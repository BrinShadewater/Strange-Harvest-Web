import { sitecopy } from "./sitecopy";

export default function Hero() {
  const { hero } = sitecopy;

  return (
    <section className="hero" id="top">
      <div className="heroGrid">
        <div className="heroPoster">
          <img
            src="/images/strange-harvest-official-movie-poster.webp"
            srcSet="/images/strange-harvest-official-movie-poster-640w.webp 640w, /images/strange-harvest-official-movie-poster-960w.webp 960w, /images/strange-harvest-official-movie-poster-1280w.webp 1280w"
            sizes="(max-width: 768px) 88vw, (max-width: 1200px) 45vw, 600px"
            alt="Official poster for the horror mockumentary Strange Harvest Occult Murder in the Inland Empire"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="600"
            height="900"
          />
        </div>

        <div className="heroCopy">
          <div className="heroKicker">{hero.tagline}</div>
          <div className="heroSubtitle">{hero.subtitle}</div>
          <h1>{hero.title}</h1>

          <p>
            A routine welfare check leads to a gruesome discovery — and the return of a killer
            thought gone forever.
          </p>

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
