"use client";

import { useState } from "react";

interface LazyYoutubeProps {
  videoId: string;
  title: string;
}

export default function LazyYoutube({ videoId, title }: LazyYoutubeProps) {
  const [loaded, setLoaded] = useState(false);
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  if (loaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&cc_load_policy=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="youtubeIframe"
      />
    );
  }

  return (
    <button
      type="button"
      className="youtubeFacade"
      onClick={() => setLoaded(true)}
      aria-label={`Play video: ${title}`}
    >
      <img
        src={thumbnailUrl}
        alt={title}
        className="youtubeThumbnail"
        loading="lazy"
        decoding="async"
      />
      <div className="youtubePlayBtn" aria-hidden="true">
        {/* YouTube play button SVG */}
        <svg viewBox="0 0 68 48" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
            fill="red"
            opacity="0.88"
          />
          <path d="M45 24L27 14v20" fill="white" />
        </svg>
      </div>
    </button>
  );
}
