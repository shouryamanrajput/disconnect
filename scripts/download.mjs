// Downloads all Instagram media (profile pic, post posters, videos, carousel images)
// to public/photos and public/videos using curl (Node fetch is blocked in this env).
// Writes a clean manifest to data/media.json for the website to consume.
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PHOTOS = join(ROOT, "public", "photos");
const VIDEOS = join(ROOT, "public", "videos");
mkdirSync(PHOTOS, { recursive: true });
mkdirSync(VIDEOS, { recursive: true });

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const REFERER = "https://www.instagram.com/";

let ok = 0,
  fail = 0;

// Returns the public path (e.g. /photos/x.jpg) on success, null on failure.
function grab(url, destAbs, publicPath) {
  if (!url) return null;
  try {
    if (existsSync(destAbs) && statSync(destAbs).size > 1000) {
      ok++;
      return publicPath; // already have it
    }
    execFileSync(
      "curl",
      [
        "-sS",
        "-L",
        "--max-time",
        "90",
        "-A",
        UA,
        "-e",
        REFERER,
        "-o",
        destAbs,
        url,
      ],
      { stdio: ["ignore", "ignore", "ignore"] }
    );
    if (existsSync(destAbs) && statSync(destAbs).size > 1000) {
      console.log("OK   " + publicPath);
      ok++;
      return publicPath;
    }
    console.log("FAIL " + publicPath + " (empty/too small)");
    fail++;
    return null;
  } catch (e) {
    console.log("FAIL " + publicPath + " (" + (e?.message || "error").slice(0, 60) + ")");
    fail++;
    return null;
  }
}

// --- profile pic ---
const profile = JSON.parse(readFileSync(join(ROOT, "data/raw/profile.json"), "utf8"))[0] || {};
const profilePic = grab(
  profile.profilePicUrlHD || profile.profilePicUrl,
  join(PHOTOS, "profile.jpg"),
  "/photos/profile.jpg"
);

// --- posts ---
const posts = JSON.parse(readFileSync(join(ROOT, "data/raw/posts.json"), "utf8"));
const media = [];

posts.forEach((p, i) => {
  const isVideo = p.type === "Video" || !!p.videoUrl;
  const entry = {
    index: i,
    id: p.id,
    shortCode: p.shortCode,
    type: p.type,
    url: p.url,
    caption: p.caption || "",
    hashtags: p.hashtags || [],
    likesCount: p.likesCount ?? null,
    commentsCount: p.commentsCount ?? null,
    videoViewCount: p.videoViewCount ?? p.videoPlayCount ?? null,
    timestamp: p.timestamp || null,
    poster: null, // local poster image
    video: null, // local video file
    gallery: [], // local images for carousels / single
  };

  // poster image (works for every post type)
  entry.poster = grab(p.displayUrl, join(PHOTOS, `post-${i}.jpg`), `/photos/post-${i}.jpg`);

  // video file
  if (isVideo) {
    entry.video = grab(p.videoUrl, join(VIDEOS, `post-${i}.mp4`), `/videos/post-${i}.mp4`);
  }

  // carousel / single images
  const children = p.childPosts && p.childPosts.length ? p.childPosts : null;
  if (children) {
    children.forEach((c, j) => {
      const cu = c.displayUrl || (c.images && c.images[0]);
      const local = grab(cu, join(PHOTOS, `post-${i}-${j}.jpg`), `/photos/post-${i}-${j}.jpg`);
      if (local) entry.gallery.push(local);
      if (c.videoUrl) {
        const v = grab(c.videoUrl, join(VIDEOS, `post-${i}-${j}.mp4`), `/videos/post-${i}-${j}.mp4`);
        if (v) entry.gallery.push(v);
      }
    });
  } else if (p.images && p.images.length) {
    p.images.forEach((iu, j) => {
      const local = grab(iu, join(PHOTOS, `post-${i}-${j}.jpg`), `/photos/post-${i}-${j}.jpg`);
      if (local) entry.gallery.push(local);
    });
  }
  // make sure the poster is part of the gallery for single-image posts
  if (!entry.gallery.length && entry.poster) entry.gallery.push(entry.poster);

  media.push(entry);
});

const out = {
  profile: {
    username: profile.username,
    fullName: profile.fullName,
    biography: profile.biography,
    followersCount: profile.followersCount,
    postsCount: profile.postsCount,
    category: profile.businessCategoryName,
    externalUrl: profile.externalUrl,
    externalUrls: profile.externalUrls,
    profilePic: profilePic,
  },
  posts: media,
};
writeFileSync(join(ROOT, "data/media.json"), JSON.stringify(out, null, 2));
console.log(`\nDONE. ok=${ok} fail=${fail}. Manifest: data/media.json`);
