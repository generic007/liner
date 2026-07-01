# 📝 Liner — Private Daily Micro-Journal

**One line a day. Zero cloud. Zero tracking. Yours only.**

Liner is a local-first micro-journaling app designed for one thing: capturing one meaningful line per day. It's the "less is more" alternative to bloated journaling apps.

## Why Liner Exists

The Reddit analysis of 9,300+ "I wish there was an app" posts revealed:

- **7% explicitly want local-first tools** (640+ requests for apps that don't use cloud storage)
- **Privacy is now a baseline requirement**, not a differentiator
- **People are tired of over-engineered apps** — they want one thing done well
- **Micro-journaling has 5x retention** over traditional journaling (write one line vs. write paragraphs)

Existing options are either too complex (Day One, Journey) or too basic with no insights. Liner fills the gap: beautiful, private, insightful, and stays on your device.

## Features

### ✏️ Daily Entry
- Write one line up to 500 characters
- Optional mood emoji per entry (😄🙂😐😕😢)
- Real-time character count
- Auto-saves on page close

### 📅 Calendar View
- Full month calendar with mood-colored heat map
- Click any day to view entry
- Track your writing consistency at a glance

### 📊 Mood Insights
- Most common mood
- Current week's mood average
- Longest writing streak
- Mood distribution bar chart
- 30-day mood timeline visualization

### 🔍 Search
- Full-text search through all entries
- Results with highlighted matches
- Chronological sorting

### 🛡️ Privacy & Data
- **100% local-first** — everything stays in your browser's localStorage
- **No accounts** — no signup, no email, no password
- **Zero tracking** — no analytics, no cookies, no data collection
- **No servers** — nothing leaves your device
- **Export/Import** — full JSON backup at any time

### 🎨 Design
- Clean, warm, minimal aesthetic
- Light, dark, and system-follow themes
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions

## Usage

### Quick Start
1. Open `index.html` in any modern browser
2. Write one thing worth remembering today
3. Tap a mood emoji
4. Click Save — done

### Keyboard-friendly
- Just start typing in the textarea
- Click the mood emoji that matches your vibe
- Save and move on with your day

## Privacy Guarantee

```
┌──────────────────────────────────────┐
│  YOUR DATA LIVES HERE → localStorage │
│                                      │
│  ● No cloud sync                     │
│  ● No analytics                      │
│  ● No cookies                        │
│  ● No servers                        │
│  ● No accounts                       │
│  ● No exfiltration                   │
│                                      │
│  You own it. You control it.         │
└──────────────────────────────────────┘
```

To verify: open DevTools → Application → Local Storage → `liner_entries`. That's your entire dataset. Nothing else exists.

## Technical Details

- **Stack:** Vanilla HTML/CSS/JS — zero dependencies, zero build step
- **Storage:** Browser localStorage (up to ~5MB, ~10,000 entries)
- **Compatibility:** All modern browsers (Chrome, Firefox, Safari, Edge)
- **Deploy:** Serve as static files anywhere (GitHub Pages, Netlify, local, USB stick)

### File Structure
```
liner/
├── index.html    # App shell
├── css/
│   └── app.css   # All styles
├── js/
│   ├── utils.js  # Date, mood, string utilities
│   ├── db.js     # localStorage document store
│   ├── ui.js     # DOM rendering helpers
│   └── app.js    # Main application controller
└── README.md     # This file
```

## Why "Liner"?

One line at a time. No pressure to write paragraphs. Just a single thought, observation, or memory per day. Over time, those lines become a quiet record of your life — without the noise.

---

*Built for peace of mind. June 2026.*
