# Cookie Consent Implementation Guide

## Overview
The site now has a fully GDPR-compliant cookie consent system with granular controls and conditional script loading.

## Features Implemented

### ✅ Cookie Banner
- **Three Buttons:**
  - "Accept All" - Enables all cookie categories
  - "Only Essential Cookies" - Disables all non-essential tracking
  - "Manage Preferences" - Opens detailed preference modal

### ✅ Consent State Model
Stored in `localStorage` as `sh_consent`:
```json
{
  "essential": true,
  "analytics": false,
  "marketing": false,
  "preferences": false
}
```

### ✅ Preferences Modal
- Toggle switches for each cookie category
- Essential cookies locked ON (cannot be disabled)
- Analytics, Marketing, and Preferences toggles
- Save button to persist choices
- Close button (X) to cancel

### ✅ Footer Link
- "Cookie Settings" button in footer
- Reopens cookie consent banner
- Accessible via keyboard navigation

### ✅ Default Behavior
- **Before consent:** Only essential cookies allowed
- **No tracking scripts** load until explicit consent
- Banner shows on first visit
- Consent persists across sessions

## How to Add Analytics/Tracking Scripts

### Google Analytics Example

Edit `src/components/CookieConsent.tsx` and update the `loadAnalytics()` function:

```typescript
const loadAnalytics = () => {
  // Google Analytics 4
  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  script.async = true;
  document.head.appendChild(script);

  const inlineScript = document.createElement('script');
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `;
  document.head.appendChild(inlineScript);
  
  console.log("Google Analytics loaded");
};
```

### Meta Pixel Example

Update the `loadMarketingScripts()` function:

```typescript
const loadMarketingScripts = () => {
  // Meta Pixel
  const script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);
  
  console.log("Meta Pixel loaded");
};
```

### Custom Preferences Scripts

Update the `loadPreferenceScripts()` function for preference-based features:

```typescript
const loadPreferenceScripts = () => {
  // Example: Third-party chat widget
  // or user preference tracking
  console.log("Preference scripts loaded");
};
```

## Verification Steps

### 1. Clear Existing Consent
Open browser console:
```javascript
localStorage.removeItem('sh_consent');
location.reload();
```

### 2. Check Network Tab Before Consent
1. Open DevTools → Network tab
2. Reload page
3. **Verify:** No analytics requests (GA, Meta Pixel, etc.)
4. **Should see:** Only essential resources (HTML, CSS, JS, images)

### 3. Test "Accept All"
1. Click "Accept All" button
2. **Verify in Network tab:** Analytics scripts now load
3. **Verify in Console:** "Analytics scripts loaded" message
4. **Verify in localStorage:**
   ```javascript
   JSON.parse(localStorage.getItem('sh_consent'))
   // Should return: {essential: true, analytics: true, marketing: true, preferences: true}
   ```

### 4. Test "Only Essential Cookies"
1. Clear consent and reload
2. Click "Only Essential Cookies"
3. **Verify:** No analytics network requests
4. **Verify in localStorage:**
   ```javascript
   JSON.parse(localStorage.getItem('sh_consent'))
   // Should return: {essential: true, analytics: false, marketing: false, preferences: false}
   ```

### 5. Test "Manage Preferences"
1. Click "Manage Preferences"
2. **Verify:** Modal opens with toggles
3. Toggle "Analytics Cookies" ON
4. Toggle "Marketing Cookies" OFF
5. Click "Save Preferences"
6. **Verify in localStorage:** Only analytics should be true

### 6. Test Footer "Cookie Settings" Link
1. After setting preferences, scroll to footer
2. Click "Cookie Settings" button
3. **Verify:** Cookie banner reopens
4. Can modify choices again

### 7. Test Persistence
1. Set preferences
2. Reload page
3. **Verify:** Banner doesn't show (consent remembered)
4. **Verify:** Scripts load according to saved preferences

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all buttons (Accept All, Essential Only, Manage)
- [ ] Enter key activates buttons
- [ ] Tab through modal toggles
- [ ] Space key toggles checkboxes
- [ ] Escape key closes modal (if implemented)
- [ ] Focus visible on all interactive elements

### Screen Reader Testing
- [ ] Banner announces as "dialog"
- [ ] Title is read correctly
- [ ] Buttons have proper ARIA labels
- [ ] Toggle states announced correctly
- [ ] Modal has proper ARIA attributes

## File Changes Made

### Modified Files
1. **src/components/sitecopy.ts**
   - Added new button labels
   - Added preference categories with descriptions

2. **src/components/CookieConsent.tsx**
   - Complete rewrite with consent state model
   - Three-button interface
   - Preferences modal with toggles
   - Conditional script loading
   - Event listener for footer link

3. **src/components/Footer.tsx**
   - Added "Cookie Settings" button
   - Dispatches custom event to reopen consent

4. **src/main.css**
   - Added modal styles (.cookiePreferencesOverlay, .cookiePreferencesModal)
   - Added toggle switch styles (.cookieToggle, .cookieToggleSlider)
   - Added footer button style (.footerCookieSettings)
   - Updated banner button styles for three buttons

### Data Structure

**LocalStorage Key:** `sh_consent`

**Value Format:**
```json
{
  "essential": true,
  "analytics": boolean,
  "marketing": boolean,
  "preferences": boolean
}
```

## Development Notes

### Adding New Cookie Categories
To add a new category (e.g., "social"):

1. Update `ConsentState` interface in CookieConsent.tsx:
```typescript
interface ConsentState {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  social: boolean; // Add new category
}
```

2. Update sitecopy.ts with new category info

3. Add toggle in modal JSX

4. Create load function (e.g., `loadSocialScripts()`)

### Customization Tips

**Button Order:** Change order in JSX (Essential → Manage → Accept)

**Default State:** Modify initial state in `useState`:
```typescript
const [consent, setConsent] = useState<ConsentState>({
  essential: true,
  analytics: false, // Change defaults here
  marketing: false,
  preferences: false,
});
```

**Styling:** All CSS classes follow `.cookie*` naming convention

**Animation:** Modify keyframes in main.css (slideUp, fadeIn, slideDown)

## Production Checklist

Before deploying:
- [ ] Add real Google Analytics ID
- [ ] Add real Meta Pixel ID
- [ ] Test all tracking scripts fire correctly
- [ ] Verify GDPR compliance for your region
- [ ] Test on mobile devices
- [ ] Run accessibility audit
- [ ] Clear test data from localStorage
- [ ] Verify analytics dashboard receives data
- [ ] Test cookie banner in incognito mode
- [ ] Review privacy policy page matches implementation

## Legal Compliance Notes

This implementation provides the technical framework for GDPR compliance. You should:

1. **Update Privacy Policy:** Document what cookies are used and why
2. **Cookie Duration:** Implement expiration for consent (currently persists indefinitely)
3. **Consent Record:** Consider logging consent for audit trails
4. **Geographic Targeting:** May need to show different banners based on user location
5. **Legal Review:** Have your privacy policy reviewed by legal counsel

## Troubleshooting

**Banner doesn't appear:**
- Check localStorage: `localStorage.getItem('sh_consent')`
- Clear it: `localStorage.removeItem('sh_consent')`
- Hard reload: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

**Scripts load before consent:**
- Check Network tab before clicking any buttons
- Verify no scripts in index.html `<head>` or `<body>`
- Check console for premature script initialization

**Preferences don't save:**
- Check for localStorage errors in console
- Verify browser doesn't block localStorage
- Test in normal (non-incognito) mode

**Modal doesn't open:**
- Check console for React errors
- Verify `showPreferences` state updates
- Check z-index conflicts in CSS

## Support

For questions or issues:
1. Check browser console for errors
2. Verify localStorage is accessible
3. Test in different browsers
4. Review React DevTools component state
