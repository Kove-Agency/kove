#!/usr/bin/env node
/**
 * Generate Instagram triptychs (3 posts = 1 continuous image of 3240×1080).
 *
 * Each triptych is rendered as ONE big image, then sliced into 3 separate
 * 1080×1080 PNGs. When published to Instagram in the right order, they
 * realign on the profile grid as a continuous panoramic image.
 *
 * Run: cd Kove && node scripts/brand/generate-triptychs.mjs
 *
 * Output: brand/instagram/triptychs/{slug}/{1,2,3}.png + preview.png
 */

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

const C = {
  dark: "#0f0f0f",
  deep: "#000000",
  accent: "#3b82f6",
  cyan: "#22d3ee",
  cyanSoft: "rgba(34,211,238,0.20)",
  white: "#ffffff",
  dim: "#abaaa8",
  muted: "rgba(255,255,255,0.4)",
};

// 1080×1080 per slot, 3 slots = 3240 total
const W = 3240;
const H = 1080;
const SLOT = 1080;

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: ${C.dark}; }
.heading { font-family: 'Space Grotesk', sans-serif; font-weight: 500; letter-spacing: -0.035em; line-height: 1; color: ${C.white}; }
.serif { font-family: 'Instrument Serif', serif; font-style: italic; color: ${C.accent}; font-weight: 400; }
.body { font-family: 'Inter', system-ui, sans-serif; font-weight: 400; color: ${C.dim}; }
.mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
.uppercase { text-transform: uppercase; letter-spacing: 0.22em; }
`;

// Sliced K logo SVG (re-usable, scalable via size prop)
const slicedK = (size = 80, color = C.white) => `
<svg viewBox="0 0 100 100" width="${size}" height="${size}" style="display:inline-block;vertical-align:middle;">
  <rect x="20" y="18" width="22" height="64" fill="${color}"/>
  <polygon points="42,50 62,50 82,18 62,18" fill="${color}"/>
  <polygon points="42,50 62,50 82,82 62,82" fill="${C.cyan}"/>
</svg>
`;

const wordmark = (size = 32, color = C.white) => {
  const scale = size / 56;
  return `
<svg viewBox="0 0 520 100" width="${520 * scale}" height="${100 * scale}" style="display:inline-block;vertical-align:middle;">
  <g transform="translate(0, 8)">
    <rect x="0" y="0" width="20" height="84" fill="${color}"/>
    <polygon points="20,42 38,42 58,0 40,0" fill="${color}"/>
    <polygon points="20,42 38,42 58,84 40,84" fill="${C.cyan}"/>
  </g>
  <text x="86" y="68" font-family="Space Grotesk, sans-serif" font-weight="500" font-size="62" letter-spacing="-2.5" fill="${color}">Kove</text>
</svg>
`;
};

// Visual elements that span the full 3240px canvas
const techlinesFull = `
<span style="position:absolute;top:0;bottom:0;left:120px;width:1px;background:linear-gradient(180deg,transparent 0%,${C.cyanSoft} 8%,${C.cyanSoft} 92%,transparent 100%);"></span>
<span style="position:absolute;top:0;bottom:0;right:120px;width:1px;background:linear-gradient(180deg,transparent 0%,${C.cyanSoft} 8%,${C.cyanSoft} 92%,transparent 100%);"></span>
`;

const grain = `
<svg style="position:absolute;inset:0;width:100%;height:100%;mix-blend-mode:overlay;opacity:0.04;pointer-events:none;" xmlns="http://www.w3.org/2000/svg">
  <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/></filter>
  <rect width="100%" height="100%" filter="url(#n)"/>
</svg>
`;

const aurora = `
<div style="position:absolute;inset:0;overflow:hidden;pointer-events:none;">
  <div style="position:absolute;top:-30%;left:25%;width:50%;height:90%;background:radial-gradient(closest-side, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.06) 40%, transparent 70%);filter:blur(80px);"></div>
  <div style="position:absolute;bottom:-30%;right:10%;width:35%;height:80%;background:radial-gradient(closest-side, rgba(34,211,238,0.10) 0%, rgba(34,211,238,0.03) 40%, transparent 70%);filter:blur(80px);"></div>
</div>
`;

// Slot guides (visible only in preview, not exported in slices)
const slotGuides = (showInPreview = false) => showInPreview ? `
<span style="position:absolute;top:0;bottom:0;left:1080px;width:1px;background:rgba(255,255,255,0.04);"></span>
<span style="position:absolute;top:0;bottom:0;left:2160px;width:1px;background:rgba(255,255,255,0.04);"></span>
` : "";

// ===== TRIPTYCHS =====

const TRIPTYCHS = {
  // ────────────── 1 ──────────────
  "01-manifesto": {
    label: "Manifesto",
    description: "Statement fort qui claque sur le grid",
    body: () => `
      ${aurora}
      ${techlinesFull}
      ${grain}
      <div style="position:absolute;inset:0;display:flex;align-items:center;">
        <!-- Slot 1 (left) -->
        <div style="width:${SLOT}px;height:${H}px;display:flex;align-items:center;justify-content:flex-end;padding-right:80px;">
          <div style="text-align:right;">
            <div class="uppercase" style="font-size:18px;color:${C.cyan};margin-bottom:32px;">Manifesto</div>
            <div class="heading" style="font-size:140px;color:${C.white};">Pas de</div>
          </div>
        </div>
        <!-- Slot 2 (center) -->
        <div style="width:${SLOT}px;height:${H}px;display:flex;align-items:center;justify-content:center;">
          <div class="serif" style="font-size:280px;color:${C.accent};line-height:1;">templates.</div>
        </div>
        <!-- Slot 3 (right) -->
        <div style="width:${SLOT}px;height:${H}px;display:flex;align-items:center;justify-content:flex-start;padding-left:80px;">
          <div style="text-align:left;">
            <div class="heading" style="font-size:140px;color:${C.white};">Pas de</div>
            <div class="serif" style="font-size:160px;color:${C.accent};line-height:1;margin-top:8px;">compromis.</div>
          </div>
        </div>
      </div>
    `,
  },

  // ────────────── 2 ──────────────
  "02-process": {
    label: "Process",
    description: "Brief → Maquette → Live · ligne cyan qui traverse",
    body: () => `
      ${aurora}
      ${techlinesFull}
      ${grain}
      <!-- Horizontal cyan line spanning the full panorama -->
      <div style="position:absolute;top:50%;left:280px;right:280px;height:1px;background:linear-gradient(90deg,transparent 0%,${C.cyan} 12%,${C.cyan} 88%,transparent 100%);"></div>
      <!-- Step dots -->
      ${[540, 1620, 2700].map(x => `
        <div style="position:absolute;top:calc(50% - 7px);left:${x - 7}px;width:14px;height:14px;border-radius:50%;background:${C.cyan};box-shadow:0 0 24px ${C.cyan};"></div>
      `).join("")}
      <!-- Step content -->
      ${[
        { x: 540, label: "01", title: "Brief", body: "Vocal ou Notion.\nRéponse en 24h." },
        { x: 1620, label: "02", title: "Maquette", body: "Premier draft en 48h.\nValidation directe." },
        { x: 2700, label: "03", title: "Live", body: "En ligne en 7j max.\nSur ton domaine." },
      ].map(s => `
        <div style="position:absolute;top:50%;left:${s.x}px;transform:translate(-50%, -50%);text-align:center;width:760px;">
          <div class="mono" style="font-size:18px;color:${C.cyan};letter-spacing:3px;margin-bottom:340px;">[ ${s.label} ]</div>
        </div>
        <div style="position:absolute;top:0;height:540px;left:${s.x}px;transform:translateX(-50%);text-align:center;width:600px;display:flex;flex-direction:column;justify-content:flex-end;padding-bottom:80px;">
          <div class="heading" style="font-size:128px;color:${C.white};">${s.title}</div>
        </div>
        <div style="position:absolute;bottom:0;height:540px;left:${s.x}px;transform:translateX(-50%);text-align:center;width:600px;padding-top:80px;">
          <div class="body" style="font-size:30px;color:${C.dim};line-height:1.4;white-space:pre-line;">${s.body}</div>
        </div>
      `).join("")}
    `,
  },

  // ────────────── 3 ──────────────
  "03-stats": {
    label: "Stats",
    description: "48h · 95+ · 7j · proof éclatée sur 3 posts",
    body: () => `
      ${aurora}
      ${techlinesFull}
      ${grain}
      <div style="position:absolute;inset:0;display:flex;">
        ${[
          { value: "48", suffix: "h", label: "Première maquette" },
          { value: "95", suffix: "+", label: "Score PageSpeed" },
          { value: "7", suffix: "j", label: "Livraison max" },
        ].map(s => `
          <div style="width:${SLOT}px;height:${H}px;display:flex;flex-direction:column;align-items:center;justify-content:center;">
            <div class="heading" style="font-size:480px;color:${C.white};line-height:0.9;">${s.value}<span class="serif" style="font-size:280px;color:${C.accent};">${s.suffix}</span></div>
            <div class="body" style="font-size:32px;color:${C.dim};margin-top:32px;text-transform:uppercase;letter-spacing:0.16em;">${s.label}</div>
          </div>
        `).join("")}
      </div>
    `,
  },

  // ────────────── 4 ──────────────
  "04-hero-brand": {
    label: "Hero brand",
    description: "Logo K monumental qui traverse les 3 posts + tagline",
    body: () => `
      ${aurora}
      ${techlinesFull}
      ${grain}
      <!-- Mega K spanning across slots — using 1 huge SVG -->
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">
        <svg viewBox="0 0 100 100" width="900" height="900" style="display:block;">
          <rect x="22" y="22" width="13" height="56" fill="${C.white}"/>
          <polygon points="35,50 49,50 76,22 62,22" fill="${C.white}"/>
          <polygon points="35,50 49,50 76,78 62,78" fill="${C.cyan}"/>
        </svg>
      </div>
      <!-- Tagline at bottom, distributed across slots -->
      <div style="position:absolute;bottom:120px;left:0;right:0;display:flex;align-items:center;justify-content:center;">
        <div class="heading" style="font-size:96px;color:${C.white};text-align:center;">
          Votre site premium, <span class="serif" style="font-size:108px;">livré en 48–72h</span>.
        </div>
      </div>
      <!-- Top label, distributed -->
      <div style="position:absolute;top:120px;left:0;right:0;display:flex;align-items:center;justify-content:center;">
        <div class="uppercase" style="font-size:22px;color:${C.cyan};letter-spacing:0.4em;">Kove · Agence Web Premium</div>
      </div>
    `,
  },

  // ────────────── 5 ──────────────
  "05-before-after": {
    label: "Before / After",
    description: "Avant générique → flèche cyan → Après Kove",
    body: () => `
      ${aurora}
      ${techlinesFull}
      ${grain}
      <div style="position:absolute;inset:0;display:flex;">
        <!-- Slot 1: AVANT -->
        <div style="width:${SLOT}px;height:${H}px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:120px;">
          <div class="uppercase" style="font-size:20px;color:${C.dim};margin-bottom:48px;">Avant</div>
          <div style="width:600px;height:380px;background:#2a2a2a;border:1px solid #3a3a3a;border-radius:12px;display:flex;align-items:center;justify-content:center;">
            <div class="mono" style="font-size:24px;color:#666;">[ template wix ]</div>
          </div>
          <div class="body" style="font-size:28px;color:${C.dim};margin-top:32px;text-align:center;line-height:1.4;">
            Lent · Générique<br>65 PageSpeed
          </div>
        </div>
        <!-- Slot 2: TRANSITION -->
        <div style="width:${SLOT}px;height:${H}px;display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <div class="uppercase" style="font-size:20px;color:${C.cyan};margin-bottom:48px;letter-spacing:0.4em;">5 jours</div>
          <svg width="560" height="120" viewBox="0 0 560 120" style="display:block;">
            <line x1="20" y1="60" x2="500" y2="60" stroke="${C.cyan}" stroke-width="3"/>
            <polyline points="460,30 500,60 460,90" fill="none" stroke="${C.cyan}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="serif" style="font-size:90px;color:${C.accent};margin-top:32px;text-align:center;line-height:1;">refonte</div>
        </div>
        <!-- Slot 3: APRES -->
        <div style="width:${SLOT}px;height:${H}px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:120px;">
          <div class="uppercase" style="font-size:20px;color:${C.cyan};margin-bottom:48px;">Après · Kove</div>
          <div style="width:600px;height:380px;background:linear-gradient(135deg, #131316 0%, #1a1a1f 100%);border:1px solid rgba(34,211,238,0.3);border-radius:12px;box-shadow:0 30px 80px -20px rgba(34,211,238,0.2);display:flex;align-items:center;justify-content:center;">
            ${slicedK(120, C.white)}
          </div>
          <div class="body" style="font-size:28px;color:${C.white};margin-top:32px;text-align:center;line-height:1.4;">
            Pixel-perfect · Premium<br><span style="color:${C.cyan};">95+</span> PageSpeed
          </div>
        </div>
      </div>
    `,
  },

  // ────────────── 6 ──────────────
  "06-disponibilites": {
    label: "Disponibilités",
    description: "Urgence/scarcity — 3 places restantes ce mois",
    body: () => `
      ${aurora}
      ${techlinesFull}
      ${grain}
      <div style="position:absolute;inset:0;display:flex;align-items:center;">
        <!-- Slot 1: status -->
        <div style="width:${SLOT}px;height:${H}px;display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:48px;">
            <div style="width:18px;height:18px;border-radius:50%;background:${C.cyan};box-shadow:0 0 24px ${C.cyan};animation:pulse 2s ease-in-out infinite;"></div>
            <div class="uppercase" style="font-size:22px;color:${C.cyan};letter-spacing:0.4em;">Disponible</div>
          </div>
          <div class="heading" style="font-size:120px;color:${C.white};text-align:center;line-height:1;">
            Ouvert<br><span class="serif" style="font-size:130px;">aux briefs</span>
          </div>
        </div>
        <!-- Slot 2: gros chiffre -->
        <div style="width:${SLOT}px;height:${H}px;display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <div class="heading" style="font-size:560px;color:${C.white};line-height:0.9;">3</div>
          <div class="body" style="font-size:32px;color:${C.dim};margin-top:32px;text-transform:uppercase;letter-spacing:0.16em;">places restantes</div>
        </div>
        <!-- Slot 3: CTA -->
        <div style="width:${SLOT}px;height:${H}px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:120px;">
          <div class="uppercase" style="font-size:18px;color:${C.cyan};margin-bottom:32px;letter-spacing:0.4em;">Ce mois-ci</div>
          <div class="heading" style="font-size:88px;color:${C.white};text-align:center;line-height:1.05;margin-bottom:48px;">
            Réserve<br><span class="serif" style="font-size:96px;">ton créneau</span>.
          </div>
          <div style="display:inline-block;padding:24px 56px;border-radius:999px;background:${C.accent};color:${C.white};font-family:Space Grotesk;font-weight:500;font-size:34px;letter-spacing:-0.5px;box-shadow:0 16px 48px -10px rgba(59,130,246,0.5);">
            → kove.fr
          </div>
        </div>
      </div>
    `,
  },
};

// ===== Generation =====

const buildPanoramaHtml = (body) => `<!doctype html>
<html><head><meta charset="utf-8"><style>${FONTS}
html, body { width: ${W}px; height: ${H}px; overflow: hidden; }
.stage { position: relative; width: ${W}px; height: ${H}px; background: ${C.dark}; overflow: hidden; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
</style></head><body><div class="stage">${body}</div></body></html>`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 1 });

let count = 0;
for (const [slug, t] of Object.entries(TRIPTYCHS)) {
  const outDir = join(ROOT, "brand/instagram/triptychs", slug);
  await mkdir(outDir, { recursive: true });

  const page = await ctx.newPage();
  await page.setViewportSize({ width: W, height: H });
  await page.setContent(buildPanoramaHtml(t.body()), { waitUntil: "networkidle" });
  await page.waitForTimeout(900);

  // 1. Save the full panorama as preview
  await page.screenshot({
    path: join(outDir, "preview-panorama.png"),
    clip: { x: 0, y: 0, width: W, height: H },
  });

  // 2. Slice into 3 separate posts
  for (let i = 0; i < 3; i++) {
    await page.screenshot({
      path: join(outDir, `${i + 1}.png`),
      clip: { x: i * SLOT, y: 0, width: SLOT, height: H },
    });
  }

  await page.close();
  console.log(`  ✓ ${slug} (${t.label}) → 3 slices + preview-panorama.png`);
  count++;
}

await browser.close();
console.log(`\n✅ Generated ${count} triptychs (${count * 3} Instagram posts).`);
console.log(`\nOpen the folder:\n  open brand/instagram/triptychs/`);
