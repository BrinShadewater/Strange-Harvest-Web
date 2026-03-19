// Full-res fallback (98KB) — used where srcSet is not available (canvas, OG tags)
export const HERO_LOGO_SRC = "/images/strange-harvest-occult-symbol-horror-icon.webp";

// Optimised src for rendered <img> elements — 512w is plenty for 2× 144px display
export const HERO_LOGO_SRC_OPTIMISED = "/images/strange-harvest-occult-symbol-horror-icon-512w.webp";

// srcSet covers all responsive breakpoints; 256w covers divider/footer usage
export const HERO_LOGO_SRCSET =
  "/images/strange-harvest-occult-symbol-horror-icon-256w.webp 256w, " +
  "/images/strange-harvest-occult-symbol-horror-icon-512w.webp 512w, " +
  "/images/strange-harvest-occult-symbol-horror-icon-768w.webp 768w, " +
  "/images/strange-harvest-occult-symbol-horror-icon-1200w.webp 1200w";
