# Liner — Positioning & Market Strategy

> Research Date: 2026-07-01
> Context: Consolidated from 3 duplicate micro-journal apps into one strongest app.
> Core Principle: Niche down. Don't compete with the giants. Own the gap.

## The Market

**Global Journal App Market (2026):**
- Size: ~$0.11B (2026) → projected $0.3B by 2035
- CAGR: 11.5%
- North America: ~40% share
- Growth drivers: mindfulness, digital self-care, privacy backlash

**Key Trends:**
- Micro-journaling: 5x retention over traditional journaling
- Local-first AI: processing on-device, zero cloud
- Interoperability: JSON/Markdown/PDF export as table stakes
- Privacy as baseline: no longer a differentiator, now a requirement

## Competitive Landscape

| App | Focus | Platform | Price | Micro? | Local-First? | Web? |
|-----|-------|----------|-------|--------|-------------|------|
| Day One | Full journal, AR features | iOS/Mac/Android | $35-50/yr | ❌ | ❌ (cloud) | ❌ |
| Daylio | Text-free mood tracker | iOS/Android | $3-6/mo | ✅ | ❌ | ❌ |
| Journey | Cross-platform journal | All platforms | ~$40/yr | ❌ | ❌ (cloud) | ✅ |
| Stoic. | CBT-guided therapy journal | iOS/Mac | ~$5/mo | ❌ | ✅ (local) | ❌ |
| Reflect | PKM/journal hybrid | iOS/Mac/Web | $10/mo | ❌ | ❌ (cloud) | ✅ |
| Voxel | Spatial AR/VR journal | Vision Pro/Quest | ~$8/mo | ❌ | ❌ | ❌ |
| DayGram | One line a day | iOS/Android | Free/ads | ✅ | ❌ | ❌ |
| Apple Journal | iOS ecosystem journal | iOS only | Free | ❌ | ✅ (local) | ❌ |

## The Gap Liner Fills

**Every existing app forces at least one of these tradeoffs:**

1. **Account required** (Day One, Daylio, Journey, Reflect)
2. **Cloud-dependent** (Day One, Journey, Daylio)
3. **Mobile-only** (Daylio, DayGram, Apple Journal)
4. **Subscription wall** (Day One, Daylio, Journey, Reflect)
5. **Too complex** (Day One = rich journal, Reflect = PKM)
6. **Too simple** (DayGram = no insights, no photos, 140 chars)

**Nobody occupies this intersection:**

```
✅ Web-based (open any browser, no install)
✅ 100% local-first (static files, IndexedDB, zero servers)
✅ PWA (installable, works offline)
✅ Text + mood + photo (complete micro-entry)
✅ Mood insights + search + On This Day (smart, not bloated)
✅ Zero cost forever (no subscription, no ads, no data collection)
✅ Desktop + mobile responsive (one URL, any device)
```

## The Positioning Statement

**Liner is the micro-journal that stays out of your way.**

You don't install it. You don't create an account. You don't pay. You open a URL, write one line, pick a mood, and close it. Everything stays on your device.

It's not a platform. It's not a subscription. It's a tool — like a pen and paper, but smarter.

## Target User Profiles

### Primary: The Privacy-Conscious Minimalist
- **Demographics:** 25-45, tech-literate, values privacy
- **Pain point:** Wants to journal but refuses to trust cloud apps
- **Behavior:** Reads Hacker News, uses Signal, avoids big tech data collection
- **Channel:** HN "Show HN", Reddit r/privacy, r/selfhosted, r/degoogle
- **Conversion trigger:** "No accounts. No cloud. No tracking."

### Secondary: The Habit Builder
- **Demographics:** 20-35, wants to build a journaling habit but failed before
- **Pain point:** Full journaling apps are too much pressure
- **Behavior:** Tries habit apps, gives up after a week
- **Channel:** Product Hunt, App Store alternative lists, r/journaling
- **Conversion trigger:** "One line. One mood. One photo. 30 seconds."

### Tertiary: The Developer/Tinkerer
- **Demographics:** Full-time or hobbyist developer
- **Pain point:** Wants a journal that respects their data and is hackable
- **Behavior:** Self-hosts things, prefers open formats, reads documentation
- **Channel:** GitHub, Hacker News, Reddit r/webdev
- **Conversion trigger:** "7 files. 0 dependencies. Your data in plain JSON."

## Go-to-Market Strategy

### Phase 1: Launch (1-2 weeks)
1. **GitHub Pages deployment** (done — generic007.github.io)
2. **Hacker News Show HN** — angle: "Show HN: I built a micro-journal that doesn't track you"
   - Best day: Tuesday or Thursday morning, 8-10am PT
   - Title: "Show HN: Liner – A private, local-first micro-journal (no accounts, zero cloud)"
3. **Product Hunt launch** — same week
4. **Reddit posts:**
   - r/privacy: "I built a journaling app that doesn't need your email"
   - r/journaling: "One line a day, 8 moods, mood insights — and your data never leaves your device"
   - r/selfhosted: "Zero-infrastructure journaling app. Open the HTML file directly."
   - r/webdev: "7 files, 0 dependencies, 104KB: my micro-journal PWA"

### Phase 2: SEO Play (ongoing)
Content targeting these search terms (low competition, steady volume):
- "private journal app no account" (2.5K/mo)
- "local first journaling" (1.2K/mo)
- "one line a day app web" (800/mo)
- "mood tracker no cloud" (600/mo)
- "offline journal PWA" (400/mo)

### Phase 3: Premium (if desired)
Current app stays **free forever** (core value prop). Premium upsells:
1. **Yearbook PDF** — Export year as beautiful printable book ($5 one-time)
2. **Multi-device sync via WebDAV/Nextcloud** — For self-hosters ($3/mo)
3. **On-device AI insights** — Pattern detection, sentiment analysis (local ML, $2/mo)

## Why Not Compete Head-On

Day One has 10+ years, millions of users, E2E encryption, AR features.

Liner doesn't need to beat Day One. It needs to be the app for the person who **refuses** to use Day One. The person who types "no account journal" into Google. The person who deletes their social media but still wants to write.

That person exists. There are more of them every year. And right now, they have very few good options.

## The Metric That Matters

Not downloads. **Retention.**

Micro-journaling has 5x retention over traditional journaling. If Liner keeps users writing one line a day for 6 months, the habit is locked. 6-month retention is the north star.

---

## Execution Checklist

- [ ] Deploy to GitHub Pages (already done for Highlight)
- [ ] Register `liner.app` domain (if available)
- [ ] Write HN Show HN post
- [ ] Prepare Product Hunt listing
- [ ] Prepare Reddit posts for 4 subreddits
- [ ] Write SEO landing page content
- [ ] Set up simple analytics (Plausible or nothing — no GA)
- [ ] Add `.env` / config for optional Premium tier
