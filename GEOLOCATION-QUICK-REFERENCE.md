# Geographic Content Delivery - Quick Reference

## 🌍 Detection Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    VISITOR LOADS PAGE                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Watch Component Mounts                         │
│              detectRegion() called                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
                  ┌─────────────────┐
                  │ Check Cache?    │
                  └─────────────────┘
                      ↓            ↓
                  YES (cached)   NO
                      ↓            ↓
              ┌──────────┐    ┌──────────────────┐
              │ Return   │    │ Try Edge Headers │
              │ Cached   │    │ /api/geo         │
              │ Region   │    └──────────────────┘
              └──────────┘           ↓
                      ↑        ┌──────────┐
                      │        │ Success? │
                      │        └──────────┘
                      │           ↓     ↓
                      │         YES    NO
                      │           ↓     ↓
                      │      ┌────────┐ │
                      │      │ Cache  │ │
                      │      │ Return │ │
                      │      └────────┘ │
                      │                 ↓
                      │        ┌────────────────┐
                      │        │ Try ipapi.co   │
                      │        │ Fallback API   │
                      │        └────────────────┘
                      │                 ↓
                      │           ┌──────────┐
                      │           │ Success? │
                      │           └──────────┘
                      │              ↓     ↓
                      │            YES    NO
                      │              ↓     ↓
                      │         ┌────────┐ │
                      └─────────│ Cache  │ │
                                │ Return │ │
                                └────────┘ │
                                           ↓
                                  ┌──────────────┐
                                  │ Default to   │
                                  │ US Region    │
                                  └──────────────┘
                                           ↓
┌─────────────────────────────────────────────────────────────┐
│              FILTER PLATFORMS BY REGION                     │
│                                                             │
│  US/CA     → Show Hulu + US/CA platforms                   │
│  UK/EU     → Show UK/Intl platforms                        │
│  OTHER     → Show ALL platforms                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              RENDER FILTERED PLATFORMS                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Region Mapping

```
Country Code → Region → Platforms Shown
──────────────────────────────────────

US          → US      → ✅ Hulu, ✅ US/CA (Apple, Amazon, etc.)
CA          → CA      → ✅ Hulu, ✅ US/CA (Apple, Amazon, etc.)
GB / UK     → UK      → ✅ UK/Intl (Sky Store, Rakuten)
DE / FR / IT → EU     → ✅ UK/Intl (Sky Store, Rakuten)
JP / AU / BR → OTHER  → ✅ ALL (Hulu + US/CA + UK/Intl)
```

---

## 🗂️ File Structure

```
Strange Harvest Web/
│
├── src/
│   ├── components/
│   │   └── Watch.tsx ················· ✏️ MODIFIED - Region detection + filtering
│   └── services/
│       └── geolocation.ts ············· ✨ NEW - Detection logic
│
├── netlify/
│   └── functions/
│       └── geo.ts ····················· ✨ NEW - Netlify edge function
│
├── api/
│   └── geo.ts ························· ✨ NEW - Vercel serverless function
│
├── netlify.toml ······················· ✨ NEW - Netlify config
├── vercel.json ························ ✨ NEW - Vercel config
└── GEOLOCATION-IMPLEMENTATION.md ······ ✨ NEW - Full documentation
```

---

## ⚡ Detection Methods (Priority Order)

| Priority | Method | Speed | Requires |
|----------|--------|-------|----------|
| 1 | **Cloudflare Header** (`CF-IPCountry`) | <10ms | Cloudflare CDN |
| 2 | **Vercel Header** (`X-Vercel-IP-Country`) | <10ms | Vercel hosting |
| 3 | **Netlify Header** (`X-Country-Code`) | <10ms | Netlify Edge |
| 4 | **ipapi.co API** | ~200ms | Internet connection |
| 5 | **Default Fallback** | Instant | Nothing |

---

## 🎯 Platform Visibility Rules

```typescript
// US & Canada
if (region === 'US' || region === 'CA') {
  showStreaming: true   // Hulu
  showUSCA: true        // Apple TV, Amazon, Fandango, YouTube, etc.
  showIntl: false       // Hide Sky Store, Rakuten
}

// UK & EU
if (region === 'UK' || region === 'EU') {
  showStreaming: false  // Hide Hulu
  showUSCA: false       // Hide US platforms
  showIntl: true        // Sky Store, Rakuten
}

// Other regions (Asia, Australia, Latin America, etc.)
if (region === 'OTHER') {
  showStreaming: true   // Show ALL
  showUSCA: true        // Show ALL
  showIntl: true        // Show ALL
}
```

---

## 🧪 Testing Commands

### Clear Cache and Re-detect
```javascript
sessionStorage.removeItem('sh_geo_region');
location.reload();
```

### Check Current Detection
```javascript
console.log(JSON.parse(sessionStorage.getItem('sh_geo_region')));
```

### Simulate UK Visitor
```javascript
const ukRegion = {
  geo: { country: 'GB', region: 'UK', detected: true },
  timestamp: Date.now()
};
sessionStorage.setItem('sh_geo_region', JSON.stringify(ukRegion));
location.reload();
```

### Simulate US Visitor
```javascript
const usRegion = {
  geo: { country: 'US', region: 'US', detected: true },
  timestamp: Date.now()
};
sessionStorage.setItem('sh_geo_region', JSON.stringify(usRegion));
location.reload();
```

### Test Serverless Function
```bash
# Netlify
curl https://strangeharvestmovie.com/api/geo

# Local testing
netlify dev
# Then: http://localhost:8888/api/geo
```

---

## 🚀 Deployment Checklist

### Pre-Deploy
- [ ] Code compiles without errors (`npm run build`)
- [ ] TypeScript passes (`npm run type-check` if available)
- [ ] Test locally (`npm run dev`)

### Netlify Deployment
- [ ] `netlify.toml` exists in root
- [ ] `netlify/functions/geo.ts` exists
- [ ] Deploy: `netlify deploy --prod`
- [ ] Test: `https://yoursite.com/api/geo`
- [ ] Verify returns: `{"country":"US","source":"edge-headers"}`

### Vercel Deployment
- [ ] `vercel.json` exists in root
- [ ] `api/geo.ts` exists
- [ ] Deploy: `vercel --prod`
- [ ] Test: `https://yoursite.vercel.app/api/geo`
- [ ] Verify returns: `{"country":"US","source":"edge-headers"}`

### Post-Deploy
- [ ] Visit site normally (no cache clear)
- [ ] Check browser console for detection log
- [ ] Verify Watch section shows appropriate platforms
- [ ] Test with VPN from different country
- [ ] Confirm sessionStorage cache works

---

## 🔍 Debugging

### Console Logs to Check

```javascript
// Successful detection
"Region detected: US (US)"
"Region detected: UK (GB)"
"Region detected: EU (DE)"

// Fallback scenarios
"Serverless geo endpoint not available, using fallback"
"API geolocation failed: [error]"
"Region detection failed, using default: [error]"
```

### Network Requests to Check

**Best case (Edge headers):**
```
✓ GET /api/geo → 200 OK (fast)
```

**Fallback case (API):**
```
✗ GET /api/geo → Failed or 404
✓ GET https://ipapi.co/json/ → 200 OK (slower)
```

### SessionStorage to Check

```javascript
// Key: "sh_geo_region"
// Value:
{
  "geo": {
    "country": "US",
    "region": "US",
    "detected": true
  },
  "timestamp": 1707847200000
}
```

---

## ⚙️ Configuration

### Add New Region

1. **Update type** in `geolocation.ts`:
   ```typescript
   export type Region = 'US' | 'CA' | 'UK' | 'EU' | 'AU' | 'OTHER';
   ```

2. **Add mapping**:
   ```typescript
   if (code === 'AU') return 'AU';
   ```

3. **Add platform rules**:
   ```typescript
   case 'AU':
     return {
       showStreaming: false,
       showUSCA: false,
       showIntl: true,
     };
   ```

### Change Cache Duration

```typescript
// In geolocation.ts
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

// Change to:
const CACHE_DURATION = 1000 * 60 * 60 * 1;  // 1 hour
const CACHE_DURATION = 1000 * 60 * 30;      // 30 minutes
```

---

## 📊 Expected Behavior by Region

| Visitor Location | Sees Hulu? | Sees US Platforms? | Sees UK Platforms? |
|------------------|------------|-------------------|-------------------|
| **United States** | ✅ Yes | ✅ Yes | ❌ No |
| **Canada** | ✅ Yes | ✅ Yes | ❌ No |
| **United Kingdom** | ❌ No | ❌ No | ✅ Yes |
| **Germany** | ❌ No | ❌ No | ✅ Yes |
| **France** | ❌ No | ❌ No | ✅ Yes |
| **Japan** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Australia** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Brazil** | ✅ Yes | ✅ Yes | ✅ Yes |

---

## 🎨 User Experience

### US Visitor Sees:
```
WATCH NOW
─────────────

STREAMING
┌──────────┐
│  Hulu    │
└──────────┘

RENT / OWN (U.S & CANADA)
┌──────────┬──────────┬──────────┐
│ Apple TV │  Amazon  │ Fandango │
├──────────┼──────────┼──────────┤
│ YouTube  │  Cosmo   │   Sony   │
└──────────┴──────────┴──────────┘
```

### UK Visitor Sees:
```
WATCH NOW
─────────────

RENT / OWN (UK & INTERNATIONAL)
┌──────────┬──────────┐
│Sky Store │ Rakuten  │
└──────────┴──────────┘
```

---

## 🔒 Privacy & SEO

### Privacy
- ✅ Only country-level detection (not city/postal code)
- ✅ No personal data stored
- ✅ No tracking across sites
- ✅ Client-side cache only (sessionStorage)

### SEO
- ✅ No redirects (same URL for all users)
- ✅ No hidden content (bots see everything in HTML)
- ✅ No cloaking (same HTML rendered)
- ✅ Structured data unchanged
- ✅ All links crawlable

---

## 📞 Support

### Common Issues

| Issue | Solution |
|-------|----------|
| All platforms showing | Clear sessionStorage, check console logs |
| Function not working | Check deployment logs, verify function endpoint |
| Wrong region detected | Test with `/api/geo`, clear cache |
| Slow detection | Use edge headers, check network timing |

### Resources
- Full docs: `GEOLOCATION-IMPLEMENTATION.md`
- Netlify functions: https://docs.netlify.com/functions/
- Vercel functions: https://vercel.com/docs/functions

---

**Implementation Complete** ✅  
**Ready for Production** 🚀
