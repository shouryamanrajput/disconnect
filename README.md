# Disconnect

A photo-driven single-page site for **Disconnect — Fun Offline Experiences**
([@disconnectfr](https://www.instagram.com/disconnectfr)), an offline social
club in Rohtak. *Log off. Touch some grass.*

Built with Next.js 15, React 19, Tailwind CSS, Framer Motion and Lenis,
mirroring the structure of the `zuvaah` project. The photos and captions come
straight from the community's Instagram, pulled via Apify.

## Sections

1. **Hero** — the pitch, live community stats, and a Join CTA.
2. **Intro** — the idea, and the three things the club stands for.
3. **Photo marquee** — a scrolling strip of real moments.
4. **Experiences** — Paint & create · Dance workshops · Trampoline raves · Collabs.
5. **Feature band** — "from strangers to a crew in two hours."
6. **Gallery** — a masonry album of clean, real photos.
7. **Join** — WhatsApp community · Host/Partner · Creators' Club (real bio links).

Plus a sticky header, a footer, and a mobile "Join" bar.

## Editing text & links

Everything you'll want to change lives in **`lib/config.ts`** — the name, the
wording, the experiences, the stats and the links (WhatsApp community, the Google
Forms, Instagram). Lines marked `// CONFIRM` are worth a quick check.

## Refreshing the photos from Instagram

Media is pulled via [Apify](https://apify.com) and stored under `public/`.
The token lives in `.env.local` (`APIFY_TOKEN`, `NEXT_PUBLIC_INSTAGRAM_URL`).

```bash
npm run scrape     # Apify → data/raw/*.json  (profile + posts)
npm run download   # media → public/photos, public/videos + data/media.json
npm run curate     # hand-picked clean set → lib/curated.json
```

`scripts/curate.mjs` holds a hand-checked whitelist of clean photos (no burned-in
reel text). Edit the `hero`, `feature`, `sectionImages` and `galleryOrder` there
to change which images appear where, then re-run `npm run curate`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm start        # serve the production build
```
