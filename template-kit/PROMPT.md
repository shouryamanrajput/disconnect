# Build Prompt — Instagram → Website

Copy everything in the code block below into Claude Code, fill in the **INPUTS**,
and send. It reproduces the workflow used for zuvaah, The Bend Club, Habidade and
Disconnect. Pair it with `REFERENCE.md` (same folder) for the full spec.

> Tip: run it from inside `~/Sidehustle projects/`. Leave a field blank and I'll
> infer it from the Instagram account or ask if it's essential.

---

```
Build a one-page marketing website for the Instagram account below, following the
same template and workflow as my existing projects.

INPUTS
- Instagram: <@handle or full URL>
- Business / community type: <e.g. rooftop bar, homestay, café, offline club>
- City: <city, or "infer from the account">
- Primary goal (the ONE action the site drives): <reserve a table | book a stay | join WhatsApp | call | order>
- Reference project to copy the structure/stack from: /Users/shouryamansinghlangeh/Sidehustle projects/zuvaah
  (zuvaah = cleanest canonical template; use /Users/shouryamansinghlangeh/Sidehustle projects/Disconnectfr instead if you want the most complete example — logo in header/footer/favicon + brand-guideline theming)
- Size: <full site (8–10 sections) | small (2–3 sections)>
- Theme direction: <"match the brand — pull colors/fonts from their logo, IG grid, or brand guide" | or specify, e.g. dark-luxe / light-editorial / bold Gen-Z>
- Brand assets (optional): <path to a logo or brand-guidelines PDF, if I have one>
- Media: use Apify to pull their real photos/videos. Reuse the APIFY_TOKEN from
  /Users/shouryamansinghlangeh/Sidehustle projects/zuvaah/.env.local
  (pipe it into the new .env.local — never print the token).

STACK (match the reference exactly)
Next.js 15 App Router + TypeScript, Tailwind, Framer Motion (scroll reveals via a
shared Reveal.tsx), Lenis smooth scroll. Body font Manrope; pick a display font
that fits the brand voice. Media served locally from public/. Keep the semantic
Tailwind color names and just remap the hex so components need no edits.

STEPS
1. Scaffold the project (copy the reference's structure; fresh package.json,
   tsconfig, tailwind, next config, globals.css, Reveal, SmoothScroll).
2. Set .env.local (Apify token + IG URL). Run scrape → download. Also grab the
   profile pic as the logo/favicon (curl profilePicUrlHD; re-scrape if empty).
3. LOOK at the downloaded photos before choosing any. Skip reel covers with
   burned-in text / sticker collages; the clean high-res candids are the DSLR
   carousel shots. Hand-write curate.mjs (hero, feature, sectionImages,
   galleryOrder) and run it.
4. Put every real detail from the scrape (bio, links, city, hours) into
   lib/config.ts. Mark anything you guessed with // CONFIRM.
5. Theme tailwind.config.ts + fonts to the brand (from the logo / IG / brand
   guide if provided). Add the logo to header, footer, and favicon.
6. Assemble page.tsx with these sections, renamed to fit the business:
   Header → Hero → IntroStrip → PhotoMarquee → <Domain sections> →
   FeatureVideo → GalleryGrid → <Conversion CTA> → Footer → sticky mobile CTA bar.
   (For a "small" build, keep Hero + one content section + the CTA.)
7. npm run build (0 type errors) → run the dev server → take desktop AND mobile
   screenshots with scripts/shot.mjs and actually review them; fix layout issues.
8. Tell me: the dev URL, what you inferred, and every // CONFIRM item to check.

CONSTRAINTS
- One conversion goal, repeated in header + hero + a final band + the mobile bar.
- Real photos only (no stock). Everything responsive; the page body never scrolls
  sideways. Respect prefers-reduced-motion.
- Keep lib/config.ts the single "edit-me" file for the owner.
```

---

### Quick variations

- **No Apify / I'll supply photos:** replace the Media line with *"I'll drop
  images into public/photos — wire them in; no scraping."*
- **Rebuild the theme only:** *"Keep the structure; retheme to match <brand> —
  update tailwind palette + fonts + logo, then screenshot to verify."*
- **Refresh content later:** `npm run scrape && npm run download && npm run curate`.
