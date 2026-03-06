"use client";

import { sitecopy } from "./sitecopy";
import LazyYoutube from "./LazyYoutube";

export default function Trailer() {
  const { trailer } = sitecopy;

  return (
    <section className="trailer" id="trailer">
      <div className="sectionHead">
        <h2>{trailer.title}</h2>
      </div>

      <div style={{ marginTop: '48px' }} className="videoWrapper">
        <LazyYoutube videoId="tYyTpuk8Zuk" title={trailer.iframeTitle} />
      </div>
    </section>
  );
}