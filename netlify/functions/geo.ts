/**
 * Netlify/Vercel Serverless Function
 * Detects visitor country from request headers
 * Works with Cloudflare, Netlify, and Vercel
 */

// Netlify Functions format
export async function handler(event: any) {
  const headers = event.headers || {};

  // Try various header sources in priority order
  const country = 
    headers['cf-ipcountry'] ||                    // Cloudflare
    headers['x-vercel-ip-country'] ||             // Vercel
    headers['x-country-code'] ||                  // Netlify Edge
    headers['cloudfront-viewer-country'] ||       // AWS CloudFront
    'US';                                          // Default fallback

  // Return country code
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
    body: JSON.stringify({
      country: country.toUpperCase(),
      source: 'edge-headers',
    }),
  };
}

// Vercel Serverless Functions format (also export as default)
export default handler;
