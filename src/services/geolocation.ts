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

const CACHE_KEY = 'sh_geo_region';
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

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
    console.warn('Region detection failed, using default:', error);
  }

  // Default fallback
  const defaultRegion: GeoLocation = {
    country: 'US',
    region: 'US',
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
    const response = await fetch('/api/geo', {
      method: 'GET',
      cache: 'no-cache',
    });

    if (response.ok) {
      const data = await response.json();
      if (data.country) {
        return {
          country: data.country,
          region: mapCountryToRegion(data.country),
          detected: true,
        };
      }
    }
  } catch (error) {
    // Serverless function not available, will fallback
    console.log('Serverless geo endpoint not available, using fallback');
  }

  return null;
}

/**
 * Fallback to public IP geolocation API
 * Using ipapi.co free tier (no API key required, 1000 requests/day)
 */
async function tryAPIDetection(): Promise<GeoLocation | null> {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      cache: 'no-cache',
    });

    if (response.ok) {
      const data = await response.json();
      if (data.country_code) {
        return {
          country: data.country_code,
          region: mapCountryToRegion(data.country_code),
          detected: true,
        };
      }
    }
  } catch (error) {
    console.warn('API geolocation failed:', error);
  }

  return null;
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
    console.warn('Failed to cache region:', error);
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
    console.warn('Failed to read cached region:', error);
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
        showStreaming: false, // Hulu not available
        showUSCA: false,
        showIntl: true,
      };
    
    case 'OTHER':
    default:
      // Show all options for other regions
      return {
        showStreaming: true,
        showUSCA: true,
        showIntl: true,
      };
  }
}
