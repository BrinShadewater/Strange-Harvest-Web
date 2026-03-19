"use client";

import { useEffect } from "react";

/**
 * DeferredCSS — loads the full main.css stylesheet non-blocking after hydration.
 *
 * Strategy:
 *  - The layout imports critical.css (above-fold rules only, ~3KB compressed).
 *    That file is still render-blocking but tiny — it covers header, hero, CTAs.
 *  - This component appends a <link> to /styles/main.css on mount, after the
 *    browser has already painted the above-fold content. Below-fold sections
 *    (synopsis, press, trailer, etc.) get their styles moments after first paint,
 *    well before the user can scroll to them.
 *  - /styles/main.css is served from /public and never import()ed by Next.js,
 *    so it does NOT appear as a render-blocking resource in Lighthouse / PSI.
 */
export default function DeferredCSS() {
  useEffect(() => {
    // Only inject once per page load
    if (document.querySelector('link[data-deferred-css]')) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/styles/main.css";
    link.setAttribute("data-deferred-css", "1");
    document.head.appendChild(link);
  }, []);

  return null;
}
