# Liner — Go-to-Market Posts

## Hacker News "Show HN"

**Title:** Show HN: Liner – A private, local-first micro-journal (no accounts, zero cloud)

We built a micro-journaling PWA that's the opposite of everything Day One and Journey represent.

**No accounts.** No signup, no email, no password.
**No cloud.** IndexedDB in your browser. Nothing leaves your device.
**No subscription.** It costs $0. Forever.
**No install.** Open a URL, write one line, pick a mood, close it. 5 seconds.

But it's not *just* simple:

- Calendar heatmap with mood colors
- Mood insights dashboard (distribution, streaks, timeline, weekly average)
- Full-text search with highlighted results
- "On This Day" — shows entries from past years on this date
- Optional photo upload with canvas compression
- Light/dark/system themes
- JSON and Markdown export (full data portability)
- PWA: works offline, installable on any device
- 10 files, 112KB, zero dependencies

**Why this exists:** The journal app market is a mess of subscriptions, cloud dependency, and feature bloat. Day One charges $50/yr. Daylio is mood-only (no writing). Apple Journal is iOS-only. There's a growing group of users who want a journal that respects their privacy without a monthly bill.

Liner fills the gap: web-based, 100% local-first, text + mood + photo, mood insights, search — and zero cost.

**Tech:** Vanilla HTML/CSS/JS. IndexedDB. No frameworks, no build tools, no dependencies. The entire app is ~112KB.

**Privacy:** Verify it yourself. Open DevTools → Storage → IndexedDB. That's your entire journal. Nothing exists anywhere else.

GitHub: https://github.com/generic007/liner
Try it: https://generic007.github.io/liner/

---

**Comments to watch for / respond to:**
- "How is this different from Day One?" → No account, no sub, no cloud, web-based, mood insights built in
- "What about sync?" → Deliberately absent. Local-first by design. Sync would require a server = accounts = trust.
- "Is it open source?" → It lives on GitHub. Code is visible. No license yet, considering MIT.
- "What about data loss?" → Export JSON frequently. IndexedDB is persistent until user clears browser data. Browser storage is durable — more resilient than iCloud/Google Drive for most users.

---

## Product Hunt

**Title:** Liner — The private micro-journal that respects your privacy

**Tagline:** One line a day. Zero accounts. Zero cloud. Zero tracking. Yours only.

**Description:**
Liner is a local-first micro-journaling PWA that captures one meaningful line per day — with mood tracking, optional photos, and insights that stay on your device.

**Key features:**
- ✏️ Write one line + pick a mood (8 emoji options)
- 📸 Optional photo per entry (auto-compressed)
- 📅 Calendar heatmap with mood colors
- 📊 Mood insights: most common, weekly trends, streaks, distribution, timeline
- 🔍 Full-text search with highlighted matches
- 📜 On This Day — past entries resurface naturally
- 🎨 Light / Dark / System themes
- 📦 JSON + Markdown export/import

**The privacy difference:**
- 100% local-first — everything in IndexedDB
- No accounts — no signup, no email, no data harvesting
- No servers — nothing leaves your browser
- No tracking — no analytics, no cookies, no third-party scripts
- Cost: $0. Always.

**Tech:**
- Vanilla HTML/CSS/JS (zero dependencies, zero build tools)
- IndexedDB for storage
- PWA: works offline, installable on any device
- 10 files, ~112KB total
- Deploy anywhere: GitHub Pages, Netlify, USB stick

**Category:** Lifestyle > Journaling
**Made by:** Solo developer

---

## Reddit Posts

### r/privacy

**Title:** I built a micro-journal that doesn't need your email or trust your data to the cloud

Journaling apps are in a weird spot. The big ones (Day One, Journey, Daylio) all require accounts, send data to their servers, and charge subscriptions. For a practice that's supposed to be private.

So I built Liner — a micro-journaling PWA that lives entirely in your browser:

- IndexedDB storage (not localStorage — actual capacity)
- No servers. No cloud. No sync. No exfiltration.
- No accounts, no email, no password.
- No analytics, no cookies, no tracking.
- Open source on GitHub.
- Works offline. Installable as PWA.
- Full data export in JSON or Markdown.

Write one line per day. Pick a mood. Optionally add a photo. Close the tab.

The catch? No sync. Your data lives exactly where you put it. If that sounds like a feature (not a bug), this might be for you.

https://generic007.github.io/liner/

### r/journaling

**Title:** Looking for a simple daily journal without the subscription? I built one.

Every journaling app wants $30-50/yr. Daylio wants me to track my mood but won't let me write anything. Apple Journal is fine if you only use Apple devices.

I wanted something simpler: one line, one mood, optional photo. No setup, no account, no monthly bill.

Built it as a PWA — open the URL, write your line, close it. Five seconds. Everything's stored locally. Mood insights, calendar, search, "On This Day" all work.

It's free, it's private, and it'll be free forever because it doesn't need servers.

https://generic007.github.io/liner/

### r/selfhosted

**Title:** A micro-journal that runs on a single HTML file (no server, no build, no dependencies)

Not self-hosted in the traditional sense — more like "zero infrastructure required."

Liner is a micro-journaling PWA where you don't need anything:

1. Clone or download 10 files
2. Open index.html (or serve with any static server)
3. Write your line. Pick a mood. Done.

Everything is IndexedDB in the browser. No database to set up. No containers. No config. No authentication. It just works.

Why share here? Because this community values owning your data and running independent infrastructure. Liner is the journal for people who want off the SaaS treadmill.

https://generic007.github.io/liner/

---

## HN Show HN — Scheduled Post

**Best time:** Tuesday or Thursday morning, 8-10am PT
**Preparation:** Have replies ready for likely objections:
- "No sync?" → Feature, not bug. Local-first means private-first.
- "What if I lose my phone/laptop?" → Export JSON regularly. Import on new device.
- "IndexedDB can be cleared by the browser" → True, but it's durable under normal use and requires explicit user action to clear. Same as any other app's data.
- "Why not just use Apple Notes / Google Keep?" → Those are notes apps, not journals. No mood tracking, no insights, no calendar, no On This Day.
- "This is just a todo.txt" → Mood insights, photo support, streak tracking, and full-text search disagree.
- "How do you make money?" → I don't. Not everything needs a business model.
