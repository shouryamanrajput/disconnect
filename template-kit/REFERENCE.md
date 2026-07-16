# Instagram → Website — Build Reference

The shared blueprint behind the sites in `~/Sidehustle projects/`
(**zuvaah**, **The Bend Club** / Homestay, **Habidade** / Project 1,
**Disconnect** / Disconnectfr). Each one is the *same template*, re-themed and
re-scoped for one business or community, built from that account's real
Instagram content, with a single conversion goal.

Use this doc to understand the pattern; use `PROMPT.md` to actually spin up a new
one.

---

## 1. What every site is

- **One scroll-driven landing page.** No routing, no CMS.
- **Built from the account's real Instagram** photos/videos (pulled via Apify),
  not stock imagery.
- **One job.** Every site drives a single action — reserve / book / call /
  WhatsApp / join. That CTA repeats in the header, hero, a final band, and a
  sticky mobile bar.
- **Themed to the brand.** Same structure, brand-specific palette + fonts so no
  two look alike.

## 2. Stack (identical across all projects)

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** (config-driven palette)
- **Framer Motion** — gentle scroll reveals
- **Lenis** — smooth momentum scrolling
- Media served locally from `public/photos` and `public/videos`
- Dev tooling: **puppeteer-core** for screenshot QA (`scripts/shot.mjs`)

`package.json` dependencies are always: `framer-motion, lenis, next, react,
react-dom` (+ `puppeteer-core` dev). Scripts: `dev, build, start, lint` plus
`scrape, download, curate` when the site is built from Instagram.

## 3. File structure

```
app/
  layout.tsx        # fonts (Manrope body + brand display font), metadata, <SmoothScroll/>
  page.tsx          # assembles the sections in order
  globals.css       # Tailwind layers + .container-px, .eyebrow, .btn-primary, .btn-outline, helpers
  icon.(svg|jpg)    # favicon (brand logo)
components/
  SiteHeader.tsx    # fixed, solidifies on scroll; logo + nav + CTA
  Hero.tsx          # full-bleed video/photo, headline, CTA, stat row
  IntroStrip.tsx    # the idea + 2–3 values
  PhotoMarquee.tsx  # auto-scrolling real photos
  <Domain>.tsx      # Rooms / Signatures / Experiences / Menu … (swap per business)
  FeatureVideo.tsx  # one immersive full-bleed reel/photo band
  Reviews.tsx       # social proof (optional)
  GalleryGrid.tsx   # masonry of clean photos
  <CTA>.tsx         # VisitReserve / VisitBook / Join — the conversion section
  SiteFooter.tsx
  Mobile<Action>Bar.tsx  # sticky bottom CTA on phones
  Reveal.tsx        # shared scroll-reveal wrapper (Framer Motion)
  SmoothScroll.tsx  # Lenis init, respects prefers-reduced-motion
lib/
  config.ts         # THE edit-me file: name, links, hours, copy (see §5)
  content.ts        # longer content (menu, reviews, FAQ) — optional
  curated.json      # image paths chosen by scripts/curate.mjs
scripts/
  scrape.mjs        # Apify → data/raw/*.json
  download.mjs      # media → public/, writes data/media.json
  curate.mjs        # hand-checked whitelist → lib/curated.json
  shot.mjs          # puppeteer screenshots (SHOT_DEVICE=mobile|desktop)
data/               # raw scrape json, media manifest, screenshots (gitignored)
public/photos, public/videos
.env.local          # APIFY_TOKEN, NEXT_PUBLIC_INSTAGRAM_URL  (gitignored)
```

## 4. Media pipeline (when building from Instagram)

```bash
npm run scrape     # Apify actors instagram-profile-scraper + instagram-scraper → data/raw
npm run download   # curl every photo/video → public/, writes data/media.json
npm run curate     # hand-picked clean whitelist → lib/curated.json
```

- **Token**: `APIFY_TOKEN` lives in `.env.local`. The user's token can be
  reused across projects — pipe it into the new `.env.local`, **never print it**
  (the sandbox blocks materializing secrets to the transcript).
- **Curation is the taste step.** Instagram reel covers usually have burned-in
  text / sticker collages — skip those. The clean, high-res candids are almost
  always the DSLR carousel photos. `curate.mjs` holds a hand-checked whitelist
  for `hero`, `feature`, `sectionImages`, and `galleryOrder`. Inspect the
  downloaded images before choosing.
- **Profile pic / logo**: `curl` `profilePicUrlHD` from `data/raw/profile.json`
  (Apify CDN URLs expire — re-scrape if the file is tiny/empty), then save to
  `public/logo.*` and `app/icon.*`.

## 5. `lib/config.ts` — the one file the owner edits

Holds everything non-visual: `name`, `tagline`, `description`, `city`,
`phone`/`phoneDisplay`, `whatsapp`, `address`, `hours`, and a `links` object
(reserve / book / menu / instagram / whatsapp / forms). Domain arrays live here
too (rooms, experiences, events, values, stats, joinCards). Anything unverified
is marked `// CONFIRM`.

## 6. Theming — how they stay distinct

- **Body font is always Manrope.** The **display font carries the brand voice**:
  - zuvaah → *Cormorant Garamond* (elegant serif, golden-luxe)
  - The Bend Club → *Fraunces* (editorial serif, calm)
  - Habidade → *Fraunces* (warm café)
  - Disconnect → *Fredoka* (chunky rounded, Gen-Z)
- **Palette lives in `tailwind.config.ts`.** Themes range from **dark-luxe**
  (zuvaah `#0C0907`+gold `#D8A23E`) to **light-editorial** (Bend Club paper
  `#F5F0E6`+ink) to **warm-coffee** (Habidade `#B4633C`) to **bold indigo+lime**
  (Disconnect `#7B61FF`/`#C8FF94`).
- **Trick to retheme fast:** keep semantic color names (`night/ink/coal/ember/
  line` + accent names) and just remap the hex values — components need no edits.
- Pull the palette + fonts from the brand's own assets (logo, brand guide, IG
  grid). If a **brand guidelines** doc exists, follow its exact hex + type.
- Dark base makes photos pop (zuvaah, Disconnect); light base reads calm/luxury
  (Bend Club, Habidade). Pick per brand mood.

## 7. Conventions worth keeping

- `Reveal.tsx` for all scroll-in animation; `SmoothScroll.tsx` for Lenis; both
  respect `prefers-reduced-motion`.
- Header is transparent at top, solid + blurred after scrolling ~24px.
- `.container-px` (max-width + responsive padding), `.eyebrow`, `.btn-primary`,
  `.btn-outline` in `globals.css` — reuse them.
- One conversion goal, repeated; sticky mobile action bar appears after scroll.
- Every section is responsive; wide content (marquee, gallery) scrolls inside
  its own container, never the page body.
- **Verify with screenshots** before declaring done: `SHOT_DEVICE=desktop node
  scripts/shot.mjs` (needs Chrome at `/Applications/Google Chrome.app`), then
  read the frames and check hero, sections, footer on desktop + mobile.

## 8. Per-project cheat sheet

| Project | Business | Goal | Font | Mood |
|---|---|---|---|---|
| zuvaah | Rooftop bar & kitchen, Gurgaon | Reserve a table | Cormorant Garamond | Dark golden-luxe |
| The Bend Club | Homestay, Srinagar | Book / call | Fraunces | Light pine-and-paper |
| Habidade | Café, Noida | Reserve / Zomato | Fraunces | Warm coffee |
| Disconnect | Offline social club, Rohtak | Join WhatsApp | Fredoka | Bold indigo + lime |

## 9. Build checklist

1. Scaffold from the template (or copy an existing project, strip content).
2. Set `.env.local` (Apify token + IG URL). Run scrape → download.
3. Inspect photos; write `curate.mjs` whitelist; run curate.
4. Fill `lib/config.ts` with real details from the scrape (bio, links, city).
5. Theme `tailwind.config.ts` + fonts to the brand; drop in the logo/favicon.
6. Assemble `page.tsx`; rename domain sections to fit the business.
7. `npm run build` (0 type errors) → run dev → screenshot QA desktop + mobile.
8. Mark every guessed detail `// CONFIRM` and list them for the owner.
