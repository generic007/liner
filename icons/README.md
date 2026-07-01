# Liner Icons

Liner uses inline SVG data-URL icons by default. If you want traditional PNG icons:

1. Create `icon-192.png` (192x192) and `icon-512.png` (512x512)
2. Update `manifest.json` to point to these files instead of the data-URL
3. Add `<link rel="apple-touch-icon">` pointing to the PNG in `index.html`

The SVG data-URL icon works with all modern browsers and PWA requirements.
