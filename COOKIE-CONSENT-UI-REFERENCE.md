# Cookie Consent UI Reference

## Banner Layout (Bottom of Page)

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  COOKIE NOTICE                                                         │
│  This website uses cookies to improve your browsing experience and    │
│  analyze site traffic. You can choose which cookies to accept.        │
│  Privacy Policy                                                        │
│                                                                        │
│  [Only Essential Cookies]  [Manage Preferences]  [Accept All]         │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Visual Characteristics:**
- Fixed position at bottom
- Dark translucent background with blur
- Red accent on "Accept All" button
- Responsive: Stacks vertically on mobile

---

## Preferences Modal (Center of Screen)

```
┌──────────────────────────────────────────────────────────┐
│  COOKIE PREFERENCES                                    × │
│──────────────────────────────────────────────────────────│
│  Choose which types of cookies you want to allow.        │
│  Essential cookies cannot be disabled as they are        │
│  necessary for the site to function.                     │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ ESSENTIAL COOKIES                      [●─────] ON │ │
│  │ Required for basic site functionality.             │ │
│  │ These cannot be disabled.                          │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ ANALYTICS COOKIES                     [─────○] OFF │ │
│  │ Help us understand how visitors interact with      │ │
│  │ our website.                                       │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ MARKETING COOKIES                     [─────○] OFF │ │
│  │ Used to track visitors across websites for        │ │
│  │ advertising purposes.                              │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ PREFERENCE COOKIES                    [─────○] OFF │ │
│  │ Remember your settings and preferences for         │ │
│  │ future visits.                                     │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│                                    [Save Preferences]    │
└──────────────────────────────────────────────────────────┘
```

**Visual Characteristics:**
- Centered overlay with dark backdrop
- Rounded corners, subtle border
- Toggle switches with ON/OFF states
- Essential toggle is ON and disabled (grey)
- Red accent on "Save Preferences" button
- Close button (×) in top right

---

## Footer Link

```
┌─────────────────────────────────────────────────────┐
│                 STRANGE HARVEST                     │
│         True Crime Found Footage Mockumentary       │
│                                                     │
│     [RT] [IG] [FB] [X] [YT]    (social icons)      │
│                                                     │
│  ─────────────────────────────────────────────────  │
│  Official Website of Strange Harvest (2025)         │
│  © 2024 Strange Harvest. All rights reserved.      │
│  Adorable Damage & Pathogen Pictures                │
│  Cookie Settings  ← Click to reopen consent         │
└─────────────────────────────────────────────────────┘
```

**Visual Characteristics:**
- "Cookie Settings" is underlined text link
- Small, subtle (11px font)
- Hover state changes to red
- Located below copyright/credit

---

## Toggle Switch States

### OFF State
```
┌──────────────┐
│ ○            │  ← Circle on left (white/grey)
└──────────────┘     Background: dark grey
```

### ON State
```
┌──────────────┐
│            ● │  ← Circle on right (white)
└──────────────┘     Background: blood red
```

### Disabled State (Essential Only)
```
┌──────────────┐
│            ● │  ← Circle on right (locked)
└──────────────┘     Background: red (50% opacity)
     Grayed out, no hover effect
```

---

## Color Palette

**Background Colors:**
- Banner: `rgba(14, 15, 16, 0.98)` with blur
- Modal: `hsl(var(--background))` - nearly black
- Modal backdrop: `rgba(0, 0, 0, 0.85)` with blur

**Accent Colors:**
- Primary (Red): `hsl(0, 65%, 45%)` - blood red
- Accent (Hover): `hsl(45, 70%, 50%)` - gold
- Text: White with varying opacity

**Borders:**
- Light borders: `rgba(255, 255, 255, 0.1)`
- Hover borders: `rgba(255, 255, 255, 0.4)`

---

## Button States

### "Accept All" Button
```
Normal:   Red background, white text
Hover:    Gold background, white text
Focus:    Red outline (2px)
```

### "Only Essential Cookies" Button
```
Normal:   Transparent, white border, white text
Hover:    Light grey background, stronger border
Focus:    Red outline (2px)
```

### "Manage Preferences" Button
```
Normal:   Transparent, white border, white text
Hover:    Light grey background, stronger border
Focus:    Red outline (2px)
```

---

## Animations

### Banner (slideUp)
```
From: translateY(100%)  - Off screen bottom
To:   translateY(0)     - Visible
Duration: 0.3s ease-out
```

### Modal Backdrop (fadeIn)
```
From: opacity: 0
To:   opacity: 1
Duration: 0.3s ease-out
```

### Modal Content (slideDown)
```
From: translateY(-20px), opacity: 0
To:   translateY(0), opacity: 1
Duration: 0.3s ease-out
```

---

## Responsive Breakpoints

### Desktop (> 768px)
- Banner: Horizontal layout
- Buttons: Side-by-side
- Modal: 600px max-width

### Mobile (≤ 768px)
- Banner: Vertical stack
- Buttons: Full width, stacked
- Modal: Full screen padding
- Toggle switches: Stack with labels

---

## Accessibility Features

### Keyboard Navigation
- `Tab` - Move between buttons/toggles
- `Space` - Activate toggle switches
- `Enter` - Activate buttons
- All elements have visible focus states

### ARIA Attributes
- Banner: `role="dialog"`
- Title: `aria-labelledby="cookie-title"`
- Description: `aria-describedby="cookie-message"`
- Buttons: `aria-label` for screen readers

### Focus Indicators
- Red outline (2px)
- Offset: 2px
- Visible on all interactive elements

---

## Typography

### Display Font (Cinzel)
- Banner title: 18px, uppercase, 2px letter-spacing
- Modal title: 24px, uppercase, 2px letter-spacing
- Category labels: 14px, uppercase, 1.5px letter-spacing

### Body Font (Crimson Text)
- Banner message: 14px
- Modal description: 14px
- Category descriptions: 13px
- Footer link: 11px

---

## Z-Index Layers

```
10000 - Modal backdrop
9999  - Cookie banner
Lower - Regular page content
```

This ensures:
1. Banner always visible above page
2. Modal always visible above banner
3. No conflicts with other site elements

---

## Test Checklist

Visual Tests:
- [ ] Banner appears at bottom (not covering content)
- [ ] Buttons are clearly readable
- [ ] Modal centers properly
- [ ] Toggle switches animate smoothly
- [ ] Close button is visible and clickable
- [ ] Footer link is visible
- [ ] Mobile layout stacks properly

Interaction Tests:
- [ ] All buttons respond to clicks
- [ ] Toggles switch on/off
- [ ] Essential toggle is disabled
- [ ] Modal opens/closes smoothly
- [ ] Footer link reopens banner
- [ ] Keyboard navigation works

State Tests:
- [ ] localStorage saves correctly
- [ ] Consent persists after reload
- [ ] Scripts load conditionally
- [ ] Network requests match consent

---

**Design matches Strange Harvest's dark horror aesthetic throughout.**
