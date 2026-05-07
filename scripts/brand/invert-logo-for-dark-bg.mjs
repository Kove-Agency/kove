#!/usr/bin/env node
/**
 * Convert the light-background wordmark logo (Logos 92 — Kove on white)
 * into a dark-background variant suitable for the navbar:
 *
 *   white pixels (background)  → transparent
 *   black pixels (K-o-v letters) → white
 *   cyan pixels (K signature arm) → cyan (PRESERVED)
 *
 * Output: public/logo-navbar.png (PNG with alpha channel)
 *
 * Run: cd Kove && node scripts/brand/invert-logo-for-dark-bg.mjs
 */

import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

const INPUT = join(ROOT, "brand/logo-options/Logos 92.png");
const OUTPUT = join(ROOT, "public/logo-navbar.png");

// Color thresholds (RGB 0-255)
const WHITE_THRESHOLD = 230; // any channel above this on light pixels
const BLACK_THRESHOLD = 60;  // all channels below this on dark pixels

async function processLogo() {
  const img = sharp(INPUT);
  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Input: ${width}×${height}, ${channels} channels, ${data.length} bytes`);

  const out = Buffer.alloc(data.length);
  let whiteCount = 0;
  let blackCount = 0;
  let cyanCount = 0;
  let otherCount = 0;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = channels === 4 ? data[i + 3] : 255;

    const isWhite = r > WHITE_THRESHOLD && g > WHITE_THRESHOLD && b > WHITE_THRESHOLD;
    const isBlack = r < BLACK_THRESHOLD && g < BLACK_THRESHOLD && b < BLACK_THRESHOLD;
    // Cyan #22d3ee is roughly R=34 G=211 B=238 — green and blue are high, red is low
    const isCyan = r < 100 && g > 150 && b > 180;

    if (isWhite) {
      // Background → transparent
      out[i] = 0;
      out[i + 1] = 0;
      out[i + 2] = 0;
      if (channels === 4) out[i + 3] = 0;
      whiteCount++;
    } else if (isCyan) {
      // Cyan signature → preserved as-is
      out[i] = r;
      out[i + 1] = g;
      out[i + 2] = b;
      if (channels === 4) out[i + 3] = a;
      cyanCount++;
    } else if (isBlack) {
      // Black letters → white
      out[i] = 255;
      out[i + 1] = 255;
      out[i + 2] = 255;
      if (channels === 4) out[i + 3] = a;
      blackCount++;
    } else {
      // Anti-aliased edges between letters and background — interpolate.
      // The pixel is grey-ish, meaning it's a transition.
      // Strategy: pick the closer end and weight alpha proportionally.
      const luminance = (r + g + b) / 3;
      if (luminance > 128) {
        // Closer to white → more transparent, edges fading
        const alpha = Math.round((255 - luminance) * 2.55);
        out[i] = 255;
        out[i + 1] = 255;
        out[i + 2] = 255;
        if (channels === 4) out[i + 3] = Math.min(255, alpha);
      } else {
        // Closer to black → letter edge, white pixel
        out[i] = 255;
        out[i + 1] = 255;
        out[i + 2] = 255;
        if (channels === 4) out[i + 3] = a;
      }
      otherCount++;
    }
  }

  console.log(`Pixel breakdown:`);
  console.log(`  white→transparent: ${whiteCount.toLocaleString()}`);
  console.log(`  black→white      : ${blackCount.toLocaleString()}`);
  console.log(`  cyan→cyan        : ${cyanCount.toLocaleString()}`);
  console.log(`  edges (AA)       : ${otherCount.toLocaleString()}`);

  await sharp(out, {
    raw: { width, height, channels },
  })
    .png()
    .toFile(OUTPUT);

  console.log(`\n✅ Saved → public/logo-navbar.png (${width}×${height}, transparent bg)`);
}

processLogo().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
