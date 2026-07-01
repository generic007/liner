# 📝 Liner — Private Daily Micro-Journal

**Zero accounts. Zero cloud. Zero tracking. One line a day — yours only.**

Liner is a local-first micro-journaling PWA. Open a URL, write one line, pick a mood, optionally add a photo, close it. Everything stays on your device. No install, no signup, no subscription, no data collection.

## Why This Exists

Existing journaling apps force tradeoffs nobody should have to make:

| App | Problem |
|-----|---------|
| **Day One** ($35-50/yr) | Subscription-walled, Apple-centric, complex |
| **Daylio** ($3-6/mo) | Text-free only, mobile-only, no real writing |
| **Journey** ($40/yr) | Cloud-dependent, account required |
| **Apple Journal** | iOS only, ecosystem lock-in |
| **DayGram** | No insights, no photos, 140 char limit, ads |

Liner fills the gap no one else occupies:

> ✅ **Web-based** — open any browser, no install  
> ✅ **100% local-first** — IndexedDB, zero servers, zero exfiltration  
> ✅ **PWA** — installable on any device, works offline  
> ✅ **Text + mood + photo** — complete micro-entry  
> ✅ **Mood insights + search + On This Day** — smart, not bloated  
> ✅ **Zero cost forever** — no subscription, no ads, no accounts  
> ✅ **Desktop + mobile responsive** — one URL, any device  

## Features

### ✏️ Today
- Write one line up to 500 characters
- 8 mood emoji options (😄🙂😐😕😢😤🤩🥱)
- Optional photo upload with automatic compression
- Auto-saves on page close
- Recent entries sidebar

### 📅 Calendar
- Full month view with mood-colored heat map
- Click any day to read the entry
- Navigate between months

### 📊 Mood Insights
- Most common mood across all entries
- Current week's mood average
- Longest writing streak (current + all-time)
- Mood distribution bar chart
- 30-day mood timeline visualization

### 🔍 Search
- Full-text search through your entire journal
- Results sorted chronologically
- Matches highlighted

### 📜 On This Day
- Shows entries from past years on the same date
- A quiet reminder of where you were

### ⚙️ Settings
- Light / Dark / System theme
- JSON export & import (full data portability)
- Markdown export
- Clear all data

### 🛡️ Privacy
Your data lives in your browser. That's it. No servers, no sync, no accounts, no analytics, no cookies, no tracking. You own it completely. Export anytime. Verify in DevTools.

## Quick Start

**Option A — Open directly:**
```bash
open index.html
```

**Option B — Serve locally:**
```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

**Option C — Deploy anywhere:**
Static files. Drop `liner/` on GitHub Pages, Netlify, a USB stick, or email it to yourself.

## Usage

1. Write one thing worth remembering
2. Tap a mood emoji
3. Optionally add a photo
4. Click Save — 5 seconds total

That's it. Come back tomorrow. Over time, see your patterns emerge in the insights dashboard.

## Technical

| Aspect | Detail |
|--------|--------|
| **Stack** | Vanilla HTML/CSS/JS — 0 dependencies, 0 build step |
| **Storage** | IndexedDB (50%+ of disk available, no practical limit) |
| **Size** | ~112KB, 10 files |
| **Format** | Each entry = date + text + mood + optional photo |
| **Security** | CSP headers, no external requests, no cookies |
| **Compatibility** | All modern browsers, PWA-installable |

```
liner/
├── index.html
├── manifest.json        # PWA manifest
├── sw.js                # Service worker (offline support)
├── css/app.css
├── js/
│   ├── app.js           # Main controller
│   ├── db.js            # IndexedDB document store
│   ├── ui.js            # DOM rendering
│   └── utils.js         # Date, mood, string helpers
├── icons/
│   ├── icon-192.svg
│   ├── icon-512.svg
│   └── README.md
├── POSITIONING.md       # Market research & strategy
└── README.md
```

## Data Portability

- **Export JSON** — full backup, machine-readable
- **Export Markdown** — human-readable, importable anywhere
- **Import JSON** — restore from backup or migrate from another app

Your data is yours. No lock-in, no proprietary format.

---

## The Mission

Journaling shouldn't require trust. You shouldn't have to hand over your thoughts to a company that monetizes attention. You shouldn't need a subscription to remember your own life.

Liner is the quiet alternative. Write. Save. Move on. The insights come later — and they stay on your device.

*Built for peace of mind. July 2026.*
