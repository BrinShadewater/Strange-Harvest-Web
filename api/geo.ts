/**
 * Vercel Serverless Function
 * Detects visitor country from request headers
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Try various header sources
  const country = 
    req.headers['x-vercel-ip-country'] ||
    req.headers['cf-ipcountry'] ||
    req.headers['x-country-code'] ||
    'US';

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  
  res.status(200).json({
    country: String(country).toUpperCase(),
    source: 'edge-headers',
  });
}
