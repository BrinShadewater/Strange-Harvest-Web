import { resolvePosterVariant } from "@/services/posterVariant";

/**
 * Server Component — preloads only the poster variant the user will actually see,
 * honouring an explicit toggle choice over the A/B assignment. Preloading the wrong
 * one costs ~200–350KB and leaves the real LCP image undiscovered until render.
 */
export async function PosterPreload() {
  const { variant } = await resolvePosterVariant();

  // camelCase, not lowercase. React 19 supports imageSrcSet/imageSizes as first-class
  // <link> props; the lowercase spellings are unrecognised, so React ignored them and
  // hoisted its OWN preload built from the props it did recognise — href/as/type — which
  // has no srcset and therefore fetched the full-size base poster. Measured on production
  // 2026-08-09: the page preloaded ...-poster.webp (259 KB) AND ...-poster-1280w.webp
  // (164 KB) while rendering the 640w (58 KB). 423 KB fetched, none of it used.
  //
  // href also points at the 640w rather than the full base. When imageSrcSet is honoured
  // the browser picks from the srcset and never fetches href, so this costs nothing in
  // practice — but it caps the damage to 58 KB instead of 259 KB in any path that falls
  // back to href, which is exactly the failure this comment exists because of.
  const SIZES = "(max-width: 768px) 88vw, (max-width: 1200px) 45vw, 600px";

  if (variant === "blue") {
    return (
      <link
        rel="preload"
        href="/images/strange-harvest-alternate-movie-poster-640w.webp"
        as="image"
        type="image/webp"
        imageSrcSet="/images/strange-harvest-alternate-movie-poster-640w.webp 640w, /images/strange-harvest-alternate-movie-poster-960w.webp 960w, /images/strange-harvest-alternate-movie-poster-1280w.webp 1280w"
        imageSizes={SIZES}
      />
    );
  }

  return (
    <link
      rel="preload"
      href="/images/strange-harvest-official-movie-poster-640w.webp"
      as="image"
      type="image/webp"
      imageSrcSet="/images/strange-harvest-official-movie-poster-640w.webp 640w, /images/strange-harvest-official-movie-poster-960w.webp 960w, /images/strange-harvest-official-movie-poster-1280w.webp 1280w"
      imageSizes={SIZES}
    />
  );
}
