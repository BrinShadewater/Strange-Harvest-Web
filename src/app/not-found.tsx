/**
 * Global 404.
 *
 * Before this existed, an unmatched URL returned Next's stock page: 7,103 bytes,
 * system font on pure black, and ZERO links — a total dead end for every stale
 * press link, mistyped URL and dead social link pointing at this domain.
 *
 * Styling is inline and self-contained on purpose. This route group has two root
 * layouts — src/app/(en)/layout.tsx and src/app/(es)/layout.tsx, each emitting its
 * own <html>/<body> — so a global not-found has no root layout to inherit from and
 * therefore gets neither critical.css nor the deferred stylesheet nor the Assistant
 * next/font variable. The CSP (`default-src 'self'`) also rules out pulling a
 * webfont at runtime. Tokens below are hardcoded copies of the DESIGN.md palette;
 * if those change, change them here too.
 *
 * Copy is in-world but states no film facts — no festival, no release date, no
 * platform claim. Per AGENTS.md those must be sourced, and a 404 is not the place
 * to introduce one.
 */

import Link from "next/link";

export const metadata = {
  title: "Page not found | Strange Harvest",
  description:
    "This page could not be found on the official Strange Harvest website.",
  robots: { index: false, follow: true },
};

const VOID = "hsl(0 0% 4%)";
const BONE = "hsl(40 20% 90%)";
const BONE_MUTED = "hsl(40 10% 64%)";
const PRIMARY_TEXT = "hsl(0 65% 58%)";
const BORDER = "hsl(0 0% 18%)";

const link: React.CSSProperties = {
  display: "inline-block",
  padding: "12px 22px",
  border: `1px solid ${BORDER}`,
  borderRadius: "0.5rem",
  color: BONE,
  textDecoration: "none",
  fontSize: "15px",
  letterSpacing: "0.02em",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        background: VOID,
        color: BONE,
        fontFamily: "Assistant, system-ui, -apple-system, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <main style={{ maxWidth: "58ch" }}>
        <p
          style={{
            color: PRIMARY_TEXT,
            letterSpacing: "0.18em",
            fontSize: "13px",
            margin: "0 0 18px",
            textTransform: "uppercase",
          }}
        >
          404 — no record found
        </p>

        <h1
          style={{
            fontSize: "clamp(32px, 7vw, 56px)",
            letterSpacing: "0.02em",
            margin: "0 0 18px",
            lineHeight: 1.1,
          }}
        >
          This page isn&rsquo;t in the file
        </h1>

        <p
          style={{
            color: BONE_MUTED,
            fontSize: "17px",
            lineHeight: 1.6,
            margin: "0 0 32px",
          }}
        >
          Whatever was here has been moved, renamed, or never existed. The rest of
          the case is still where you left it.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link href="/" style={link}>
            Return to the beginning
          </Link>
          <Link href="/#watch" style={link}>
            Where to watch
          </Link>
          {/* press.html is a static file in /public, not an app route, so it stays
              a plain anchor — next/link would try to client-navigate it. */}
          <a href="/press.html" style={link}>
            Press &amp; media
          </a>
        </div>

        <p style={{ marginTop: "36px", fontSize: "14px" }}>
          <Link href="/es" style={{ color: BONE_MUTED }}>
            Ver esta p&aacute;gina en espa&ntilde;ol
          </Link>
        </p>
      </main>
    </div>
  );
}
