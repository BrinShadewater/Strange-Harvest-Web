/**
 * Serverless Function
 * Detects visitor country from request headers.
 */

type HeaderValue = string | string[] | undefined;
interface GeoRequest {
  headers: Record<string, HeaderValue>;
}
interface GeoResponse {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => { json: (payload: unknown) => void };
}

export default function handler(req: GeoRequest, res: GeoResponse) {
  // Try various header sources
  const country = 
    req.headers['x-vercel-ip-country'] ||
    req.headers['cf-ipcountry'] ||
    req.headers['x-country-code'] ||
    'XX';

  res.setHeader('Content-Type', 'application/json');
  // Country detection should never be shared across users by CDN caches.
  res.setHeader('Cache-Control', 'private, no-store, max-age=0');
  res.setHeader(
    'Vary',
    'x-vercel-ip-country, cf-ipcountry, x-country-code'
  );
  
  res.status(200).json({
    country: String(country).toUpperCase(),
    source: 'edge-headers',
  });
}
