import { sitecopy } from "./sitecopy";

export default function CastCrew() {
  const { castCrew } = sitecopy;

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
                <img src={member.image} alt={member.name} className="detectiveImage" loading="lazy" />
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
                <h4 className="crewRole">{section.role}</h4>
                {section.members.map((member, mIdx) => (
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
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
