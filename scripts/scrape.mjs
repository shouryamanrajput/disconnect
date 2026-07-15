// Scrapes the Instagram profile + recent posts via Apify and saves raw JSON.
// Reads APIFY_TOKEN and NEXT_PUBLIC_INSTAGRAM_URL from .env.local.
// Uses curl (Node fetch is blocked in this environment).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// --- tiny .env.local loader (no deps) ---
function loadEnv() {
  const p = join(ROOT, ".env.local");
  const txt = readFileSync(p, "utf8");
  const env = {};
  for (const line of txt.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m) env[m[1]] = m[2];
  }
  return env;
}

const env = loadEnv();
const TOKEN = env.APIFY_TOKEN;
const PROFILE_URL = env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/habidade";
const USERNAME = PROFILE_URL.replace(/\/+$/, "").split("/").pop().split("?")[0];

if (!TOKEN) {
  console.error("NO_TOKEN");
  process.exit(2);
}

const RAW = join(ROOT, "data", "raw");
mkdirSync(RAW, { recursive: true });

async function runActor(actor, body, label) {
  const url = `https://api.apify.com/v2/acts/${actor}/run-sync-get-dataset-items?token=${TOKEN}`;
  console.log(`\n[${label}] calling ${actor} ...`);
  let text = "";
  try {
    text = execFileSync(
      "curl",
      [
        "-sS",
        "--max-time",
        "240",
        "-X",
        "POST",
        "-H",
        "Content-Type: application/json",
        "-d",
        JSON.stringify(body),
        url,
      ],
      { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 }
    );
  } catch (e) {
    console.log(`[${label}] curl error: ${(e?.message || "").slice(0, 200)}`);
    return { ok: false, status: 0, items: [], rawText: e?.stdout || "" };
  }
  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    console.log(`[${label}] could not parse JSON (first 300): ${text.slice(0, 300)}`);
    return { ok: false, status: 0, items: [], rawText: text };
  }
  if (json && json.error) {
    console.log(`[${label}] API error: ${JSON.stringify(json.error).slice(0, 300)}`);
    return { ok: false, status: 0, items: [], rawText: text };
  }
  const items = Array.isArray(json) ? json : json.items || [];
  console.log(`[${label}] got ${items.length} items`);
  writeFileSync(join(RAW, `${label}.json`), JSON.stringify(items, null, 2));
  return { ok: true, status: 200, items };
}

(async () => {
  console.log(`Username: ${USERNAME}`);
  console.log(`Profile URL: ${PROFILE_URL}`);

  // 1) Profile details (bio, name, followers, category, pic, latest posts)
  const profile = await runActor(
    "apify~instagram-profile-scraper",
    { usernames: [USERNAME] },
    "profile"
  );

  // 2) Recent posts + reels (captions, media, likes, views)
  const posts = await runActor(
    "apify~instagram-scraper",
    { directUrls: [PROFILE_URL], resultsType: "posts", resultsLimit: 30 },
    "posts"
  );

  const summary = {
    username: USERNAME,
    profileOk: profile.ok,
    profileCount: profile.items.length,
    postsOk: posts.ok,
    postsCount: posts.items.length,
  };
  writeFileSync(join(RAW, "_summary.json"), JSON.stringify(summary, null, 2));
  console.log("\nDONE", JSON.stringify(summary));

  if (!profile.ok && !posts.ok) process.exit(3); // total failure
})().catch((e) => {
  console.error("FATAL", e?.message || e);
  process.exit(4);
});
