// Scrolls through the running site and captures each viewport, so scroll-reveal
// sections are actually triggered and visible. Reports console errors too.
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = process.env.SHOT_URL || "http://localhost:3000";
const DEVICE = process.env.SHOT_DEVICE || "mobile"; // mobile | desktop
mkdirSync("data/shots", { recursive: true });

const errors = [];
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required", "--hide-scrollbars"],
});

const page = await browser.newPage();
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push("PAGEERROR " + e.message));

const isMobile = DEVICE === "mobile";
const W = isMobile ? 390 : 1440;
const H = isMobile ? 844 : 900;
await page.setViewport({ width: W, height: H, deviceScaleFactor: 2, isMobile, hasTouch: isMobile });
await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });

const total = await page.evaluate(() => document.body.scrollHeight);
const step = Math.round(H * 0.9);
let i = 0;
for (let y = 0; y < total; y += step) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, 700)); // let reveals + lazy imgs settle
  await page.screenshot({ path: `data/shots/${DEVICE}-${String(i).padStart(2, "0")}.png` });
  i++;
}
console.log(`${DEVICE}: captured ${i} frames, page height ${total}px`);

await browser.close();
console.log("Console errors:", errors.length);
[...new Set(errors)].slice(0, 20).forEach((e) => console.log(" -", e));
