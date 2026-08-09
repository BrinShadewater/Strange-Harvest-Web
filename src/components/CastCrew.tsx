"use client";

import { useLanguageContext, useSitecopy } from "./LanguageProvider";
import type { SiteLanguage } from "./sitecopy";

function localizeCrewRole(role: string, lang: SiteLanguage): string {
  if (lang !== "es") return role;
  const map: Record<string, string> = {
    "Director & Writer": "Director y guionista",
    Producers: "Productores",
    "Executive Producers": "Productores ejecutivos",
    "Associate Producers": "Productores asociados",
  };
  return map[role] ?? role;
}

export default function CastCrew() {
  const { castCrew } = useSitecopy();
  const lang = useLanguageContext();

  return (
    <section className="castCrew" id="cast">
      <h2>{castCrew.title}</h2>

      <div className="castCrewContent">
        {/* Lead Detectives */}
        <div className="leadDetectives">
          <h3 className="subsectionTitle">{castCrew.leadDetectives.title}</h3>
          <div className="detectivesGrid">
            {castCrew.leadDetectives.members.map((member, idx) => (
              <a 
                key={idx} 
                href={member.imdb} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="detectiveCard"
                aria-label={`View ${member.name} on IMDB`}
              >
                <img src={member.image} alt={member.imageAlt} className="detectiveImage" loading="lazy" decoding={"async"} width={400} height={300} />
                <h4 className="detectiveName">{member.name}</h4>
                <p className="detectiveRole">{member.role}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Cast */}
        <div className="castSection">
          <h3 className="subsectionTitle">{castCrew.cast.title}</h3>
          <div className="castGrid">
            {castCrew.cast.members.map((member, idx) => (
              <a 
                key={idx} 
                href={member.imdb} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="castName"
                aria-label={`View ${member.name} on IMDB`}
              >
                <span className="castPersonName">{member.name}</span>
                <span className="castCharacterName">{member.character}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Crew */}
        <div className="crewSection">
          <h3 className="subsectionTitle">{castCrew.crew.title}</h3>
          <div className="crewGrid">
            {castCrew.crew.sections.map((section, idx) => (
              <div key={idx} className="crewCard">
                <h4 className="crewRole">{localizeCrewRole(section.role, lang)}</h4>
                {/* Not everyone has an IMDb page. An empty `imdb` renders the name
                    as plain text rather than a link to imdb.com's front page, which
                    is what a placeholder URL produced. */}
                {section.members.map((member, mIdx) =>
                  member.imdb ? (
                    <a
                      key={mIdx}
                      href={member.imdb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="crewMember"
                      aria-label={`View ${member.name} on IMDB`}
                    >
                      {member.name}
                    </a>
                  ) : (
                    <span key={mIdx} className="crewMember">
                      {member.name}
                    </span>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
