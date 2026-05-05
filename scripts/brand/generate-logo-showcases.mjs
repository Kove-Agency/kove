#!/usr/bin/env node
/**
 * Generate atmospheric showcase PNGs for the 4 logo variants.
 * Inspired by Kinect / Radiant / Stomic / Momentum reference screens.
 *
 * Run: cd Kove && node scripts/brand/generate-logo-showcases.mjs
 */

import { chromium } from "playwright";
import { mkdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

const C = {
  dark: "#0a0a0a",
  deep: "#000000",
  accent: "#3b82f6",
  cyan: "#22d3ee",
  white: "#ffffff",
};

// ===== Background atmospheres (inspired by user's reference screens) =====

// V1 — Kinect-style: mineral landscape with light line carving across
const bgKinect = `
<div style="position:absolute;inset:0;background:linear-gradient(180deg, #060810 0%, #0a0d18 60%, #0e1320 100%);"></div>
<svg style="position:absolute;inset:0;width:100%;height:100%;" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a2238" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#0a0d18" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#1a2238" stop-opacity="0.7"/>
    </linearGradient>
    <filter id="blur1"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>
  <!-- Soft mountain on the right -->
  <path d="M 900 1080 Q 1100 600 1300 720 Q 1500 800 1700 540 Q 1850 380 1920 480 L 1920 1080 Z" fill="url(#hill1)"/>
  <!-- Cyan ridge highlight following the curve -->
  <path d="M 900 1080 Q 1100 600 1300 720 Q 1500 800 1700 540 Q 1850 380 1920 480"
        fill="none" stroke="#22d3ee" stroke-width="3" stroke-opacity="0.7" filter="url(#blur1)"/>
  <path d="M 900 1080 Q 1100 600 1300 720 Q 1500 800 1700 540 Q 1850 380 1920 480"
        fill="none" stroke="#3b82f6" stroke-width="2" stroke-opacity="0.9"/>
  <!-- Soft hill on the left -->
  <path d="M 0 1080 Q 200 800 400 850 Q 600 900 800 1080 Z" fill="url(#hill1)"/>
  <!-- Cyan wave coming from bottom-left -->
  <path d="M 0 1000 Q 300 850 600 920 Q 900 970 1100 900"
        fill="none" stroke="#22d3ee" stroke-width="6" stroke-opacity="0.5" filter="url(#blur1)"/>
  <path d="M 0 1000 Q 300 850 600 920 Q 900 970 1100 900"
        fill="none" stroke="#3b82f6" stroke-width="2" stroke-opacity="0.9"/>
  <!-- Background diffuse glow -->
  <ellipse cx="500" cy="500" rx="600" ry="200" fill="#3b82f6" fill-opacity="0.06" filter="url(#blur1)"/>
</svg>
`;

// V2 — Stomic-style: vibrant aurora with soft blur in corner
const bgStomic = `
<div style="position:absolute;inset:0;background:#050810;"></div>
<svg style="position:absolute;inset:0;width:100%;height:100%;" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1920 1080">
  <defs>
    <radialGradient id="aurora1" cx="0.2" cy="0.4" r="0.6">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.85"/>
      <stop offset="40%" stop-color="#22d3ee" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#050810" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="aurora2" cx="0.4" cy="0.25" r="0.35">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="aurora3" cx="0.15" cy="0.65" r="0.45">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#050810" stop-opacity="0"/>
    </radialGradient>
    <filter id="blob"><feGaussianBlur stdDeviation="40"/></filter>
  </defs>
  <rect width="1920" height="1080" fill="url(#aurora1)" filter="url(#blob)"/>
  <rect width="1920" height="1080" fill="url(#aurora2)" filter="url(#blob)"/>
  <rect width="1920" height="1080" fill="url(#aurora3)" filter="url(#blob)"/>
</svg>
`;

// V3 — Radiant-style: dark with audio-wave / sound-frequency visualization
const bgRadiant = `
<div style="position:absolute;inset:0;background:linear-gradient(135deg, #0a1525 0%, #061018 100%);"></div>
<svg style="position:absolute;inset:0;width:100%;height:100%;" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="wave1" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0"/>
      <stop offset="40%" stop-color="#3b82f6" stop-opacity="0.6"/>
      <stop offset="60%" stop-color="#22d3ee" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </linearGradient>
    <filter id="wblur"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>
  ${Array.from({ length: 50 }, (_, i) => {
    const x = 200 + i * 30;
    const phase = i * 0.18;
    const baseAmp = 200;
    const amp = baseAmp * Math.exp(-Math.pow((i - 25) / 12, 2)) + 50;
    const top = 540 - amp;
    const bottom = 540 + amp;
    return `<line x1="${x}" y1="${top}" x2="${x}" y2="${bottom}" stroke="url(#wave1)" stroke-width="3" filter="url(#wblur)"/>`;
  }).join("")}
  <!-- second wave layer for depth -->
  ${Array.from({ length: 50 }, (_, i) => {
    const x = 220 + i * 30;
    const baseAmp = 130;
    const amp = baseAmp * Math.exp(-Math.pow((i - 28) / 14, 2)) + 30;
    const top = 540 - amp;
    const bottom = 540 + amp;
    return `<line x1="${x}" y1="${top}" x2="${x}" y2="${bottom}" stroke="#3b82f6" stroke-width="1.5" stroke-opacity="0.45"/>`;
  }).join("")}
</svg>
`;

// V4 — Momentum-style: deep blue with single elegant light arc
const bgMomentum = `
<div style="position:absolute;inset:0;background:linear-gradient(135deg, #050a1a 0%, #0b1530 60%, #050a1a 100%);"></div>
<svg style="position:absolute;inset:0;width:100%;height:100%;" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1920 1080">
  <defs>
    <radialGradient id="globe" cx="0.5" cy="0.5" r="0.4">
      <stop offset="0%" stop-color="#1a2a55" stop-opacity="1"/>
      <stop offset="100%" stop-color="#050a1a" stop-opacity="0"/>
    </radialGradient>
    <filter id="arcblur"><feGaussianBlur stdDeviation="12"/></filter>
    <filter id="arcglow"><feGaussianBlur stdDeviation="4"/></filter>
  </defs>
  <ellipse cx="960" cy="540" rx="900" ry="500" fill="url(#globe)"/>
  <!-- Wide soft arc behind -->
  <path d="M 200 700 Q 700 200 1300 600 Q 1700 850 1900 700"
        fill="none" stroke="#ffffff" stroke-width="40" stroke-opacity="0.2" filter="url(#arcblur)"/>
  <!-- Sharp arc on top -->
  <path d="M 200 700 Q 700 200 1300 600 Q 1700 850 1900 700"
        fill="none" stroke="#ffffff" stroke-width="3" stroke-opacity="0.95" filter="url(#arcglow)"/>
  <!-- Lower curve -->
  <path d="M 100 950 Q 500 1080 1200 880 Q 1600 760 1920 880"
        fill="none" stroke="#3b82f6" stroke-width="2" stroke-opacity="0.6" filter="url(#arcglow)"/>
</svg>
`;

const showcases = [
  { id: "v1-slice", name: "Slice", inspiration: "Kinect", bg: bgKinect },
  { id: "v2-spark", name: "Spark", inspiration: "Stomic", bg: bgStomic },
  { id: "v3-block", name: "Block", inspiration: "Radiant", bg: bgRadiant },
  { id: "v4-orbit", name: "Orbit", inspiration: "Momentum", bg: bgMomentum },
];

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Inter:wght@400;500&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', system-ui, sans-serif; background: #000; }
.stage { position: relative; width: 1920px; height: 1080px; overflow: hidden; }
`;

const buildHtml = async (showcase) => {
  const lockupSvg = await readFile(
    join(ROOT, `brand/logo-options/${showcase.id}/lockup.svg`),
    "utf-8"
  );
  // Strip the XML declaration if any, scale up for showcase
  const cleanedSvg = lockupSvg.replace(/<\?xml[^?]*\?>/, "").trim();
  // Override the size via wrapper
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}</style></head>
<body><div class="stage">
  ${showcase.bg}
  <!-- Logo lockup centered -->
  <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">
    <div style="width:760px;">
      ${cleanedSvg.replace('width="480"', 'width="760"').replace('height="100"', 'height="158"')}
    </div>
  </div>
  <!-- Subtle bottom label (variant + inspiration) -->
  <div style="position:absolute;bottom:48px;left:0;right:0;text-align:center;
              font-family:'Space Grotesk', sans-serif; font-weight:500; font-size:13px;
              letter-spacing:0.32em; text-transform:uppercase; color:rgba(255,255,255,0.32);">
    ${showcase.id.toUpperCase()} · ${showcase.name} · inspired by ${showcase.inspiration}
  </div>
</div></body></html>`;
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 1 });

for (const showcase of showcases) {
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.setContent(await buildHtml(showcase), { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const out = `brand/logo-options/${showcase.id}/showcase.png`;
  await page.screenshot({
    path: join(ROOT, out),
    omitBackground: false,
    clip: { x: 0, y: 0, width: 1920, height: 1080 },
  });
  await page.close();
  console.log(`  ✓ ${out}`);
}

// Build a comparison HTML preview (4-up grid)
const comparisonHtml = `<!doctype html><html><head><meta charset="utf-8">
<title>Kove — Logo Options</title>
<style>${FONTS}
body { background: #050505; color: #fff; padding: 40px; min-height: 100vh; }
h1 { font-family: 'Space Grotesk', sans-serif; font-weight: 500; font-size: 32px; letter-spacing: -1px; margin-bottom: 8px; }
.subtitle { color: rgba(255,255,255,0.5); font-size: 14px; margin-bottom: 40px; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 1800px; }
.card { background: #0a0a0a; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; overflow: hidden; }
.card .label { padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
.card .label .name { font-family: 'Space Grotesk', sans-serif; font-weight: 500; font-size: 18px; letter-spacing: -0.5px; }
.card .label .insp { color: #22d3ee; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em; }
.card img { width: 100%; display: block; }
.code { font-family: ui-monospace, monospace; font-size: 12px; color: rgba(255,255,255,0.4); padding: 12px 24px; }
</style></head>
<body>
<h1>Kove — Logo Options</h1>
<div class="subtitle">4 directions inspirées de tes refs. Choisis une à valider, et je remplace les fichiers principaux.</div>
<div class="grid">
${showcases.map((s, i) => `
  <div class="card">
    <div class="label">
      <div>
        <div class="name">v${i + 1} — ${s.name}</div>
        <div class="code">brand/logo-options/${s.id}/</div>
      </div>
      <div class="insp">${s.inspiration}</div>
    </div>
    <img src="${s.id}/showcase.png" alt="${s.name}"/>
  </div>
`).join("")}
</div>
<div style="margin-top: 60px; padding: 24px; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; max-width: 800px;">
  <h3 style="font-family: 'Space Grotesk'; font-weight: 500; font-size: 16px; margin-bottom: 12px;">Décisions à prendre</h3>
  <ul style="font-size: 14px; line-height: 1.8; color: rgba(255,255,255,0.7); padding-left: 20px;">
    <li>Quelle variante valides-tu ? (v1 / v2 / v3 / v4)</li>
    <li>Tu veux ajuster la couleur cyan (signature) ou garder telle quelle ?</li>
    <li>Tu veux que le wordmark "Kove" soit plus épais (Bold) ou rester Medium ?</li>
  </ul>
</div>
</body></html>`;

const fs = await import("node:fs/promises");
await fs.writeFile(join(ROOT, "brand/logo-options/COMPARE.html"), comparisonHtml);
console.log(`  ✓ brand/logo-options/COMPARE.html`);

await browser.close();
console.log(`\n✅ 4 showcases generated. Open: open brand/logo-options/COMPARE.html`);
