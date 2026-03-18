import { cookies } from "next/headers";

/**
 * Server Component — reads the A/B cookie and preloads only the poster variant
 * the user will actually see. Avoids fetching ~200–350KB of the wrong image.
 */
export async function PosterPreload() {
  const cookieStore = await cookies();
  const variant = (cookieStore.get("sh_ab_theme_v1")?.value ?? "red") as "red" | "blue";

  if (variant === "blue") {
    return (
      <link
        rel="preload"
        href="/images/strange-harvest-alternate-movie-poster.webp"
        as="image"
        type="image/webp"
        // @ts-expect-error imagesrcset is valid HTML but not in React types
        imagesrcset="/images/strange-harvest-alternate-movie-poster-640w.webp 640w, /images/strange-harvest-alternate-movie-poster-960w.webp 960w, /images/strange-harvest-alternate-movie-poster-1280w.webp 1280w"
        imagesizes="(max-width: 768px) 88vw, (max-width: 1200px) 45vw, 600px"
      />
    );
  }

  return (
    <link
      rel="preload"
      href="/images/strange-harvest-official-movie-poster.webp"
      as="image"
      type="image/webp"
      // @ts-expect-error imagesrcset is valid HTML but not in React types
      imagesrcset="/images/strange-harvest-official-movie-poster-640w.webp 640w, /images/strange-harvest-official-movie-poster-960w.webp 960w, /images/strange-harvest-official-movie-poster-1280w.webp 1280w"
      imagesizes="(max-width: 768px) 88vw, (max-width: 1200px) 45vw, 600px"
    />
  );
}
