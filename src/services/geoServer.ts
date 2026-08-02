import { headers } from "next/headers";

/**
 * Read the visitor's country from edge headers during server rendering.
 *
 * The same headers /api/geo returns are already on the incoming request, so the
 * page can resolve the region before the first byte instead of shipping a
 * spinner and waiting on a client fetch. That matters because Watch is the
 * conversion surface: a visitor who arrives from a trailer and sees "Checking
 * platform availability…" has been handed nothing to click.
 *
 * Returns "XX" when no edge header is present (local dev, unknown host), which
 * is the signal for the client to attempt detection instead.
 */
export async function getCountryFromHeaders(): Promise<string> {
  const h = await headers();

  const country =
    h.get("cf-ipcountry") ||                    // Cloudflare
    h.get("x-vercel-ip-country") ||             // Vercel
    h.get("x-country-code") ||                  // Netlify Edge
    h.get("cloudfront-viewer-country") ||       // AWS CloudFront
    "XX";

  return country.toUpperCase();
}
