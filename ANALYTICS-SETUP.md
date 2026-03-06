# Google Analytics 4 Setup Guide

Google Analytics 4 has been integrated with full GDPR-compliant consent mode support.

## 1. Create Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon in bottom left)
3. In the Property column, click **Create Property**
4. Enter property details:
   - **Property name**: Strange Harvest Movie
   - **Reporting time zone**: Your timezone
   - **Currency**: USD
5. Click **Next** → **Create**

## 2. Get Your Measurement ID

1. In Admin → Property column → **Data Streams**
2. Click **Add stream** → **Web**
3. Enter website details:
   - **Website URL**: `https://strangeharvestmovie.com`
   - **Stream name**: Strange Harvest Website
4. Click **Create stream**
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

## 3. Update Environment Variables

### Local Development (.env)

1. Open `.env` file in project root
2. Replace the placeholder with your actual Measurement ID:
   ```env
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Replace with your actual ID
   ```

### Vercel Production

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your **Strange Harvest Web** project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `VITE_GA_MEASUREMENT_ID`
   - **Value**: `G-XXXXXXXXXX` (your actual ID)
   - **Environments**: Check all (Production, Preview, Development)
5. Click **Save**
6. Redeploy for changes to take effect

## 4. Verify Installation

1. Visit your website
2. Open browser DevTools (F12) → Console
3. Accept cookies when prompted
4. You should see: `"Google Analytics 4 loaded"`
5. Check **Network** tab for request to `googletagmanager.com`

**In Google Analytics:**
1. Admin → Property → **Data Streams** → Your stream
2. Click **View tag instructions** → **Tag Assistant**
3. Or use [Google Tag Assistant Chrome Extension](https://tagassistant.google.com/)

## 5. Features Included

✅ **Consent Mode v2** - GDPR compliant consent tracking
✅ **IP Anonymization** - User privacy protection
✅ **Secure Cookies** - SameSite=None;Secure flags
✅ **Cookie Consent Integration** - Respects user preferences:
  - **Essential**: Always allowed (no tracking)
  - **Analytics**: Loads GA4 when accepted
  - **Marketing**: Updates consent for advertising features
  - **Preferences**: Custom preference scripts

✅ **Conditional Loading** - Analytics only loads if:
  - User accepts Analytics cookies
  - Valid `VITE_GA_MEASUREMENT_ID` is configured
  - Not already loaded (prevents duplicates)

## 6. Testing Cookie Consent

1. Clear localStorage: Open DevTools Console and run:
   ```javascript
   localStorage.clear()
   ```
2. Refresh the page
3. Cookie consent banner appears
4. Test different consent combinations:
   - **Accept All** → GA4 loads immediately
   - **Only Essential** → No GA4
   - **Custom (Analytics only)** → GA4 loads, no marketing

## 7. Monitoring & Reports

**Real-time Reports:**
- Admin → **Reports** → **Realtime**
- See live visitors on your site

**Standard Reports:**
- **Acquisition** → Where users come from
- **Engagement** → What users do on site
- **Demographics** → User age, gender, location (when consented)

**Recommended Events to Track:**
- Watch trailer clicks
- Platform link clicks (Hulu, Apple TV, etc.)
- Merch shop visits
- Social media clicks

## 8. Optional: Custom Event Tracking

To track specific user actions, add this to your components:

```typescript
// Example: Track trailer watch
const handleTrailerClick = () => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'watch_trailer', {
      'event_category': 'engagement',
      'event_label': 'YouTube Trailer',
    });
  }
  // ... rest of your code
};
```

## Troubleshooting

**Issue**: Console shows "Google Analytics not configured"
- **Solution**: Set `VITE_GA_MEASUREMENT_ID` in `.env` file

**Issue**: GA4 not loading on Vercel
- **Solution**: Add environment variable in Vercel settings

**Issue**: No data in Google Analytics
- **Solution**: 
  1. Check Measurement ID is correct
  2. Verify you accepted Analytics cookies
  3. GA4 data can take 24-48 hours to appear initially

**Issue**: Ad blocker preventing tracking
- **Solution**: This is expected and normal - respect user's choice

## Privacy Compliance

This implementation is compliant with:
- ✅ GDPR (EU)
- ✅ CCPA (California)
- ✅ Cookie Directive
- ✅ ePrivacy Regulation

**Key Privacy Features:**
- Cookie consent required before tracking
- IP anonymization enabled
- No tracking without consent
- Clear privacy policy linked in banner
- User can withdraw consent anytime

---

**Questions?** Check [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
