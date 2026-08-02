"use client";

import { useSitecopy } from "./LanguageProvider";
import LazyYoutube from "./LazyYoutube";

export default function Trailer() {
  const { trailer } = useSitecopy();

  return (
    <section className="trailer" id="trailer">
      <div className="sectionHead">
        <h2>{trailer.title}</h2>
      </div>

      <div className="videoWrapper">
        <LazyYoutube videoId="tYyTpuk8Zuk" title={trailer.iframeTitle} />
      </div>

      {/* /transcript.html had zero inbound links from anywhere on the site — a
          true orphan, reachable only by knowing the URL. It is this video's
          transcript, so this is where it belongs, and it doubles as the text
          alternative for the trailer. */}
      <p className="transcriptLink">
        <a href={trailer.transcriptLink.href}>{trailer.transcriptLink.label}</a>
      </p>
    </section>
  );
}