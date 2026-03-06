import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; // Run at the edge for fastest geo header access

export async function GET(request: NextRequest) {
  const headers = request.headers;

  const country =
    headers.get("cf-ipcountry") ||         // Cloudflare
    headers.get("x-vercel-ip-country") ||  // Vercel
    headers.get("x-country-code") ||       // Netlify Edge
    headers.get("cloudfront-viewer-country") || // AWS CloudFront
    "XX";

  return NextResponse.json(
    { country: country.toUpperCase(), source: "edge-headers" },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
        Vary: "cf-ipcountry, x-vercel-ip-country, x-country-code, cloudfront-viewer-country",
      },
    }
  );
}
