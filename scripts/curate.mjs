// Reads data/media.json, verifies real file sizes, and writes lib/curated.json.
// Uses a HAND-CHECKED whitelist of clean photos (no burned-in reel text or
// collage stickers), the same approach as the zuvaah project. Most of the
// clean, high-res candids come from the café paint session (post-6) plus the
// group dance shot (post-1); the reel covers carry text, so they're avoided
// except where the text is on-topic (the trampoline rave card).
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const m = JSON.parse(readFileSync(join(ROOT, "data/media.json"), "utf8"));

const sizeOf = (pub) => {
  if (!pub) return 0;
  try {
    return statSync(join(ROOT, "public", pub)).size;
  } catch {
    return 0;
  }
};
const ok = (p, min = 14000) => p && sizeOf(p) > min;

// Caption lookup so the gallery can keep the real words from the post.
const captionForSrc = {};
for (const p of m.posts) {
  for (const g of p.gallery || []) captionForSrc[g] = p.caption || "";
  if (p.poster) captionForSrc[p.poster] = p.caption || "";
}

// The single hero image — a joyful, high-res café-paint candid.
const hero = { video: null, poster: "/photos/post-6-11.jpg" };

// The immersive feature band — the "real people, real moments" wristband shot.
const feature = { video: null, image: "/photos/post-6-8.jpg" };

// One clean image per experience card (keys match lib/config.ts experiences).
const sectionImages = {
  paint: "/photos/post-6-2.jpg", // café sign + a freshly painted pot
  dance: "/photos/post-1.jpg", // the whole room, hands up after the workshop
  rave: "/photos/post-12.jpg", // trampoline rave (on-topic burned-in caption)
  collabs: "/photos/post-17-1.jpg", // "SEE YOU OFFLINE :)" studio/collab graphic
};
for (const k of Object.keys(sectionImages)) {
  if (!ok(sectionImages[k])) delete sectionImages[k];
}

// Hand-picked clean gallery, most striking first.
const galleryOrder = [
  "/photos/post-6-11.jpg",
  "/photos/post-1.jpg",
  "/photos/post-6-2.jpg",
  "/photos/post-6-8.jpg",
  "/photos/post-6-5.jpg",
  "/photos/post-6-14.jpg",
  "/photos/post-6-16.jpg",
  "/photos/post-6-0.jpg",
  "/photos/post-6-4.jpg",
  "/photos/post-6-6.jpg",
  "/photos/post-6-9.jpg",
  "/photos/post-6-13.jpg",
  "/photos/post-6-17.jpg",
  "/photos/post-6-7.jpg",
];

const gallery = galleryOrder
  .filter((src) => ok(src))
  .map((src) => ({ src, caption: captionForSrc[src] || "" }));

const curated = {
  hero,
  feature,
  sectionImages,
  bio: m.profile?.biography || "",
  gallery,
  profilePic: ok(m.profile?.profilePic, 5000) ? m.profile.profilePic : null,
};

writeFileSync(join(ROOT, "lib/curated.json"), JSON.stringify(curated, null, 2));
console.log("Wrote lib/curated.json");
console.log("hero:", curated.hero.poster, "| feature:", curated.feature.image);
console.log("sections:", JSON.stringify(curated.sectionImages));
console.log("gallery:", curated.gallery.length, "clean photos");
