/**
 * Geolocation Service
 * Detects visitor country for region-specific content
 */

export type Region = 'US' | 'CA' | 'UK' | 'EU' | 'OTHER';

export interface GeoLocation {
  country: string;
  region: Region;
  detected: boolean;
}

export interface WatchPlatform {
  name: string;
  href: string;
  icon: string;
  iconWidth?: number;
  iconHeight?: number;
}

const CACHE_KEY = 'sh_geo_region';
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours
const isDev = process.env.NODE_ENV === 'development';

// Without these, a hanging request left the Watch section showing
// "Checking platform availability…" forever — no links at the moment of
// conversion. Both calls now fail fast into the fallback chain.
const EDGE_TIMEOUT_MS = 2000;
const API_TIMEOUT_MS = 3000;

/** fetch with a hard deadline; rejects rather than hanging. */
async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Detect visitor region using multiple methods
 * Priority: 1. Cloudflare header, 2. API fallback, 3. Default
 */
export async function detectRegion(): Promise<GeoLocation> {
  // Check cache first
  const cached = getCachedRegion();
  if (cached) {
    return cached;
  }

  try {
    // Try Cloudflare-style edge detection first (if available)
    const cfRegion = await tryCloudflareDetection();
    if (cfRegion) {
      cacheRegion(cfRegion);
      return cfRegion;
    }

    // Fallback to IP geolocation API
    const apiRegion = await tryAPIDetection();
    if (apiRegion) {
      cacheRegion(apiRegion);
      return apiRegion;
    }
  } catch (error) {
    if (isDev) {
      console.warn('Region detection failed, using default:', error);
    }
  }

  // Default fallback
  const defaultRegion: GeoLocation = {
    country: 'XX',
    region: 'OTHER',
    detected: false,
  };
  
  return defaultRegion;
}

/**
 * Try to detect region from Cloudflare/Vercel/Netlify headers
 * This requires a serverless function or edge function
 */
async function tryCloudflareDetection(): Promise<GeoLocation | null> {
  try {
    // Call our serverless function endpoint
    const response = await fetchWithTimeout('/api/geo', EDGE_TIMEOUT_MS);

    if (response.ok) {
      const data = await response.json();
      // "XX" is the endpoint's "no edge header present" sentinel, not a country.
      // Treating it as a hit marked the visitor as detected and suppressed the
      // "we couldn't confirm your region" note. Fall through to the API instead.
      if (data.country && data.country !== 'XX') {
        return {
          country: data.country,
          region: mapCountryToRegion(data.country),
          detected: true,
        };
      }
    }
  } catch (error) {
    // Serverless function not available, will fallback.
  }

  return null;
}

/**
 * Fallback to public IP geolocation API
 * Using ipapi.co free tier (no API key required, 1000 requests/day)
 */
async function tryAPIDetection(): Promise<GeoLocation | null> {
  try {
    const response = await fetchWithTimeout('https://ipapi.co/json/', API_TIMEOUT_MS);

    if (response.ok) {
      const data = await response.json();
      if (data.country_code && data.country_code !== 'XX') {
        return {
          country: data.country_code,
          region: mapCountryToRegion(data.country_code),
          detected: true,
        };
      }
    }
  } catch (error) {
    if (isDev) {
      console.warn('API geolocation failed:', error);
    }
  }

  return null;
}

/**
 * Build a GeoLocation from a country code already resolved elsewhere —
 * specifically the edge header read during server rendering. "XX" or empty
 * means unresolved, which is the signal for the client to try detection.
 */
export function geoFromCountry(countryCode: string): GeoLocation {
  const code = (countryCode || '').toUpperCase();
  if (!code || code === 'XX') {
    return { country: 'XX', region: 'OTHER', detected: false };
  }
  return { country: code, region: mapCountryToRegion(code), detected: true };
}

/**
 * Map country code to region
 */
function mapCountryToRegion(countryCode: string): Region {
  const code = countryCode.toUpperCase();

  // US
  if (code === 'US') return 'US';

  // Canada
  if (code === 'CA') return 'CA';

  // UK
  if (code === 'GB' || code === 'UK') return 'UK';

  // EU countries
  const euCountries = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
    'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
    'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  ];
  
  if (euCountries.includes(code)) return 'EU';

  return 'OTHER';
}

/**
 * Cache region in sessionStorage
 */
function cacheRegion(geo: GeoLocation): void {
  try {
    const cacheData = {
      geo,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    // SessionStorage not available or full
    if (isDev) {
      console.warn('Failed to cache region:', error);
    }
  }
}

/**
 * Get cached region if valid
 */
function getCachedRegion(): GeoLocation | null {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data = JSON.parse(cached);
    const age = Date.now() - data.timestamp;

    if (age < CACHE_DURATION) {
      return data.geo;
    }

    // Cache expired
    sessionStorage.removeItem(CACHE_KEY);
  } catch (error) {
    // Invalid cache or sessionStorage unavailable
    if (isDev) {
      console.warn('Failed to read cached region:', error);
    }
  }

  return null;
}

/**
 * Get platforms for a specific region
 */
export function getPlatformsForRegion(region: Region): {
  showStreaming: boolean;
  showUSCA: boolean;
  showIntl: boolean;
} {
  switch (region) {
    case 'US':
    case 'CA':
      return {
        showStreaming: true,  // Hulu available in US
        showUSCA: true,
        showIntl: false,
      };
    
    case 'UK':
    case 'EU':
      return {
        // Some EU countries have region-specific streaming options (e.g. Filmin in ES).
        showStreaming: true,
        showUSCA: false,
        showIntl: true,
      };
    
    case 'OTHER':
    default:
      // Conservative fallback for unknown regions.
      return {
        showStreaming: true,
        showUSCA: false,
        showIntl: true,
      };
  }
}

/**
 * Filter US/CA platform list with country-specific availability rules.
 */
export function filterUSCAPlatformsByCountry(
  platforms: WatchPlatform[],
  countryCode: string
): WatchPlatform[] {
  const code = countryCode.toUpperCase();

  return platforms.filter((platform) => {
    const name = platform.name.toLowerCase();

    // Fandango At Home is US-only.
    if (name.includes('fandango')) {
      return code === 'US';
    }

    // Cosmo Go is Canada-only.
    if (name.includes('cosmo')) {
      return code === 'CA';
    }

    return true;
  });
}

/**
 * Filter streaming platform list with country-specific availability rules.
 */
export function filterStreamingPlatformsByCountry(
  platforms: WatchPlatform[],
  countryCode: string
): WatchPlatform[] {
  const code = countryCode.toUpperCase();

  return platforms.filter((platform) => {
    const name = platform.name.toLowerCase();

    // Hulu is US-only.
    if (name.includes('hulu')) {
      return code === 'US';
    }

    // Paramount+ link provided is Canada-only.
    if (name.includes('paramount+')) {
      return code === 'CA';
    }

    // Filmin is Spain-only for this title.
    if (name.includes('filmin')) {
      return code === 'ES';
    }

    return true;
  });
}
