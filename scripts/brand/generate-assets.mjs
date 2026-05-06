#!/usr/bin/env node
/**
 * Generate all Kove brand PNG assets via headless Chromium.
 *
 * Run: cd Kove && node scripts/brand/generate-assets.mjs
 *
 * Outputs:
 *   - brand/assets/apple-touch-icon.png        (180×180)
 *   - brand/assets/og-image.png                (1200×630)
 *   - brand/assets/og-image-square.png         (1200×1200)
 *   - brand/instagram/post-*.png               (1080×1080)
 *   - brand/instagram/story-*.png              (1080×1920)
 *   - brand/moodboard/*.png                    (varied)
 */

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

// ===== Shared design tokens =====
const C = {
  dark: "#0f0f0f",
  deep: "#000000",
  alt: "#131316",
  accent: "#3b82f6",
  cyan: "#22d3ee",
  cyanSoft: "rgba(34,211,238,0.18)",
  white: "#ffffff",
  dim: "#abaaa8",
  light: "#f7f7f8",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', system-ui, sans-serif; background: ${C.dark}; color: ${C.white}; -webkit-font-smoothing: antialiased; }
.heading { font-family: 'Space Grotesk', sans-serif; font-weight: 500; letter-spacing: -0.035em; line-height: 1.02; }
.serif { font-family: 'Instrument Serif', serif; font-style: italic; color: ${C.accent}; font-weight: 400; }
.mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
.uppercase { text-transform: uppercase; letter-spacing: 0.22em; }
`;

// Reusable techlines (2 thin vertical cyan rails)
const techlines = (margin = 60) => `
<div class="techlines">
  <span style="position:absolute;top:0;bottom:0;left:${margin}px;width:1px;background:linear-gradient(180deg,transparent 0%,${C.cyanSoft} 8%,${C.cyanSoft} 92%,transparent 100%);"></span>
  <span style="position:absolute;top:0;bottom:0;right:${margin}px;width:1px;background:linear-gradient(180deg,transparent 0%,${C.cyanSoft} 8%,${C.cyanSoft} 92%,transparent 100%);"></span>
</div>
`;

// ===== Locked logo: Sliced K with cyan signature =====
//
// The icon is composed of:
//  - White vertical stem
//  - White upper arm (parallelogram going up-right from stem mid)
//  - CYAN lower arm (parallelogram going down-right from stem mid) — signature
//
// Stand-alone icon (square viewBox 100×100), sized via `size` param.
const iconK = (size = 64, kColor = C.white) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}" style="display:block;">
  <rect x="20" y="18" width="22" height="64" fill="${kColor}"/>
  <polygon points="42,50 62,50 82,18 62,18" fill="${kColor}"/>
  <polygon points="42,50 62,50 82,82 62,82" fill="${C.cyan}"/>
</svg>
`;

// Lockup wordmark: icon + "Kove" text. fontSize controls overall scale.
const wordmark = (color = C.white, fontSize = 32) => {
  // viewBox 520×100. Scale to fontSize (default base 56).
  const scale = fontSize / 56;
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 100" width="${520 * scale}" height="${100 * scale}" style="display:inline-block;vertical-align:middle;">
  <g transform="translate(0, 8)">
    <rect x="0" y="0" width="20" height="84" fill="${color}"/>
    <polygon points="20,42 38,42 58,0 40,0" fill="${color}"/>
    <polygon points="20,42 38,42 58,84 40,84" fill="${C.cyan}"/>
  </g>
  <text x="86" y="68" font-family="Space Grotesk, sans-serif" font-weight="500" font-size="62" letter-spacing="-2.5" fill="${color}">Kove</text>
</svg>
`;
};

// Atmospheric glow background
const auroraBackground = `
<div style="position:absolute;inset:0;overflow:hidden;pointer-events:none;">
  <div style="position:absolute;top:-30%;right:-20%;width:80%;height:80%;background:radial-gradient(closest-side, rgba(59,130,246,0.20) 0%, rgba(59,130,246,0.08) 40%, transparent 70%);filter:blur(40px);"></div>
  <div style="position:absolute;bottom:-30%;left:-20%;width:70%;height:70%;background:radial-gradient(closest-side, rgba(34,211,238,0.12) 0%, rgba(34,211,238,0.04) 40%, transparent 70%);filter:blur(40px);"></div>
</div>
`;

// Grain overlay
const grain = `
<svg style="position:absolute;inset:0;width:100%;height:100%;mix-blend-mode:overlay;opacity:0.04;pointer-events:none;" xmlns="http://www.w3.org/2000/svg">
  <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/></filter>
  <rect width="100%" height="100%" filter="url(#n)"/>
</svg>
`;

// ===== Template builder =====
const html = (body, w, h) => `<!doctype html>
<html><head><meta charset="utf-8"><style>${FONTS}
html, body, .stage { width: ${w}px; height: ${h}px; }
.stage { position: relative; overflow: hidden; background: ${C.dark}; display: flex; flex-direction: column; align-items: center; justify-content: center; }
</style></head><body><div class="stage">${body}</div></body></html>`;

// ===== TEMPLATES =====

const T = {
  // ---------- Apple touch icon (180×180) ----------
  "apple-touch-icon": {
    output: "brand/assets/apple-touch-icon.png",
    w: 180, h: 180,
    body: `
      <div style="position:absolute;inset:0;background:${C.dark};border-radius:36px;"></div>
      ${auroraBackground}
      <div style="position:relative;z-index:1;">${iconK(112, C.white)}</div>
    `,
  },

  // ---------- OG image 1200×630 ----------
  "og-image": {
    output: "brand/assets/og-image.png",
    w: 1200, h: 630,
    body: `
      ${auroraBackground}
      ${techlines(80)}
      ${grain}
      <div style="position:relative;z-index:2;text-align:center;padding:0 120px;">
        <div class="uppercase" style="font-size:14px;color:${C.cyan};margin-bottom:32px;">Kove · Agence web premium</div>
        <h1 class="heading" style="font-size:96px;color:${C.white};line-height:1.05;letter-spacing:-3px;">
          Votre site premium,<br><span class="serif" style="font-size:104px;">livré en 48–72h</span>.
        </h1>
        <div style="margin-top:48px;font-size:20px;color:${C.dim};">
          Pas de templates. Pas de compromis.
        </div>
      </div>
      <div style="position:absolute;bottom:36px;left:0;right:0;text-align:center;z-index:2;">
        ${wordmark(C.white, 22)}
      </div>
    `,
  },

  // ---------- OG square 1200×1200 ----------
  "og-image-square": {
    output: "brand/assets/og-image-square.png",
    w: 1200, h: 1200,
    body: `
      ${auroraBackground}
      ${techlines(100)}
      ${grain}
      <div style="position:relative;z-index:2;text-align:center;padding:0 140px;">
        <div class="uppercase" style="font-size:16px;color:${C.cyan};margin-bottom:48px;">Kove</div>
        <h1 class="heading" style="font-size:120px;color:${C.white};line-height:1.0;letter-spacing:-4px;">
          Sites<br>premium,<br><span class="serif" style="font-size:130px;">livrés vite</span>.
        </h1>
        <div style="margin-top:64px;font-size:22px;color:${C.dim};max-width:600px;margin-left:auto;margin-right:auto;">
          48h pour la maquette · 7j max pour le live · 95+ PageSpeed
        </div>
      </div>
      <div style="position:absolute;bottom:80px;left:0;right:0;text-align:center;z-index:2;">
        ${wordmark(C.white, 26)}
      </div>
    `,
  },

  // ---------- Instagram POST: quote (1080×1080) ----------
  "post-quote": {
    output: "brand/instagram/post-quote.png",
    w: 1080, h: 1080,
    body: `
      ${auroraBackground}
      ${techlines(60)}
      ${grain}
      <div style="position:relative;z-index:2;text-align:center;padding:0 120px;">
        <div class="uppercase" style="font-size:13px;color:${C.cyan};margin-bottom:60px;">Kove · Manifesto</div>
        <h1 class="heading" style="font-size:88px;color:${C.white};line-height:1.05;letter-spacing:-3px;">
          Pas de templates.<br><span class="serif" style="font-size:96px;">Pas de compromis.</span>
        </h1>
      </div>
      <div style="position:absolute;bottom:80px;left:0;right:0;text-align:center;z-index:2;opacity:0.6;">
        ${wordmark(C.white, 22)}
      </div>
    `,
  },

  // ---------- Instagram POST: stat (1080×1080) ----------
  "post-stat-highlight": {
    output: "brand/instagram/post-stat-highlight.png",
    w: 1080, h: 1080,
    body: `
      ${auroraBackground}
      ${techlines(60)}
      ${grain}
      <div style="position:relative;z-index:2;text-align:center;">
        <div class="uppercase" style="font-size:13px;color:${C.cyan};margin-bottom:48px;">Statistique</div>
        <div class="heading" style="font-size:340px;color:${C.white};line-height:1;letter-spacing:-12px;">
          48<span class="serif" style="font-size:200px;">h</span>
        </div>
        <div style="margin-top:24px;font-size:28px;color:${C.dim};letter-spacing:-0.5px;">
          Pour la première maquette
        </div>
      </div>
      <div style="position:absolute;bottom:80px;left:0;right:0;text-align:center;z-index:2;opacity:0.6;">
        ${wordmark(C.white, 22)}
      </div>
    `,
  },

  // ---------- Instagram POST: project showcase (1080×1080) ----------
  "post-project-showcase": {
    output: "brand/instagram/post-project-showcase.png",
    w: 1080, h: 1080,
    body: `
      ${auroraBackground}
      ${techlines(60)}
      ${grain}
      <div style="position:relative;z-index:2;width:100%;padding:0 120px;text-align:center;">
        <div class="uppercase" style="font-size:13px;color:${C.cyan};margin-bottom:36px;">Nouveau projet livré</div>
        <h1 class="heading" style="font-size:60px;color:${C.white};line-height:1.05;letter-spacing:-2px;margin-bottom:48px;">
          [NOM&nbsp;DU&nbsp;PROJET]
        </h1>
        <!-- Browser mockup placeholder -->
        <div style="background:${C.alt};border:1px solid rgba(255,255,255,0.08);border-radius:14px;overflow:hidden;box-shadow:0 30px 80px -20px rgba(0,0,0,0.6);">
          <div style="display:flex;align-items:center;gap:6px;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.06);">
            <span style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,0.1);"></span>
            <span style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,0.1);"></span>
            <span style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,0.1);"></span>
            <span style="margin-left:14px;font-family:JetBrains Mono,ui-monospace,monospace;font-size:11px;color:rgba(255,255,255,0.4);">[domaine-projet.fr]</span>
          </div>
          <div style="aspect-ratio:16/9;background:linear-gradient(135deg, ${C.alt} 0%, #1a1a1f 100%);display:flex;align-items:center;justify-content:center;">
            <span style="color:rgba(255,255,255,0.25);font-family:JetBrains Mono,monospace;font-size:14px;">[ Insérer screenshot du site ici ]</span>
          </div>
        </div>
        <div style="margin-top:40px;display:flex;justify-content:center;gap:14px;flex-wrap:wrap;">
          <span style="padding:8px 18px;border-radius:999px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.03);font-size:14px;color:${C.white};">Next.js</span>
          <span style="padding:8px 18px;border-radius:999px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.03);font-size:14px;color:${C.white};">95+ PageSpeed</span>
          <span style="padding:8px 18px;border-radius:999px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.03);font-size:14px;color:${C.white};">Livré en 7j</span>
        </div>
      </div>
      <div style="position:absolute;bottom:60px;left:0;right:0;text-align:center;z-index:2;opacity:0.6;">
        ${wordmark(C.white, 22)}
      </div>
    `,
  },

  // ---------- Instagram POST: before/after (1080×1080) ----------
  "post-before-after": {
    output: "brand/instagram/post-before-after.png",
    w: 1080, h: 1080,
    body: `
      ${techlines(60)}
      ${grain}
      <div style="position:relative;z-index:2;width:100%;padding:0 120px;">
        <div class="uppercase" style="font-size:13px;color:${C.cyan};margin-bottom:48px;text-align:center;">Avant · Après Kove</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;">
          <div>
            <div class="uppercase" style="font-size:11px;color:${C.dim};margin-bottom:14px;">Avant</div>
            <div style="aspect-ratio:1;background:#2a2a2a;border:1px solid #333;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#666;font-family:JetBrains Mono,monospace;font-size:13px;">
              [Site générique]
            </div>
            <div style="margin-top:16px;font-family:Inter;color:${C.dim};font-size:14px;line-height:1.5;">
              Template Wix · 65 PageSpeed · Lent · Générique
            </div>
          </div>
          <div>
            <div class="uppercase" style="font-size:11px;color:${C.cyan};margin-bottom:14px;">Après</div>
            <div style="aspect-ratio:1;background:linear-gradient(135deg, ${C.alt} 0%, #1a1a1f 100%);border:1px solid rgba(59,130,246,0.3);border-radius:14px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.4);font-family:JetBrains Mono,monospace;font-size:13px;">
              [Site Kove]
            </div>
            <div style="margin-top:16px;font-family:Inter;color:${C.white};font-size:14px;line-height:1.5;">
              Next.js · <span style="color:${C.cyan};">95+</span> PageSpeed · Pixel-perfect · <span class="serif" style="font-size:18px;">Premium</span>
            </div>
          </div>
        </div>
        <div style="margin-top:48px;text-align:center;">
          <h2 class="heading" style="font-size:48px;color:${C.white};letter-spacing:-1.5px;">
            <span class="serif" style="font-size:54px;">Refonte</span> en 5 jours.
          </h2>
        </div>
      </div>
      <div style="position:absolute;bottom:60px;left:0;right:0;text-align:center;z-index:2;opacity:0.6;">
        ${wordmark(C.white, 22)}
      </div>
    `,
  },

  // ---------- Instagram POST: process step (1080×1080) ----------
  "post-process-step": {
    output: "brand/instagram/post-process-step.png",
    w: 1080, h: 1080,
    body: `
      ${auroraBackground}
      ${techlines(60)}
      ${grain}
      <div style="position:relative;z-index:2;text-align:center;padding:0 120px;">
        <div class="mono" style="font-size:14px;color:${C.cyan};margin-bottom:24px;letter-spacing:2px;">[ ÉTAPE&nbsp;01&nbsp;/&nbsp;04 ]</div>
        <h1 class="heading" style="font-size:84px;color:${C.white};line-height:1.05;letter-spacing:-3px;margin-bottom:36px;">
          Brief
        </h1>
        <div style="font-family:Inter;font-size:22px;color:${C.dim};line-height:1.5;max-width:680px;margin:0 auto;">
          Tu m'envoies vocal ou Notion. Je te réponds en 24h avec un plan précis et un devis fixe.
        </div>
        <div style="margin-top:56px;display:flex;gap:8px;justify-content:center;">
          <span style="width:32px;height:3px;border-radius:2px;background:${C.accent};"></span>
          <span style="width:8px;height:3px;border-radius:2px;background:rgba(255,255,255,0.2);"></span>
          <span style="width:8px;height:3px;border-radius:2px;background:rgba(255,255,255,0.2);"></span>
          <span style="width:8px;height:3px;border-radius:2px;background:rgba(255,255,255,0.2);"></span>
        </div>
      </div>
      <div style="position:absolute;bottom:80px;left:0;right:0;text-align:center;z-index:2;opacity:0.6;">
        ${wordmark(C.white, 22)}
      </div>
    `,
  },

  // ---------- Instagram STORY: default (1080×1920) ----------
  "story-default": {
    output: "brand/instagram/story-default.png",
    w: 1080, h: 1920,
    body: `
      ${auroraBackground}
      ${techlines(80)}
      ${grain}
      <div style="position:relative;z-index:2;text-align:center;padding:0 100px;width:100%;">
        <div class="uppercase" style="font-size:13px;color:${C.cyan};margin-bottom:48px;">Kove</div>
        <h1 class="heading" style="font-size:104px;color:${C.white};line-height:1.05;letter-spacing:-3.5px;">
          [Titre<br><span class="serif" style="font-size:112px;">principal</span>]
        </h1>
        <div style="margin-top:56px;font-size:22px;color:${C.dim};line-height:1.5;max-width:700px;margin-left:auto;margin-right:auto;">
          [Description courte ou contexte de l'image. Garde court : 1-2 lignes max pour rester lisible en story.]
        </div>
      </div>
      <div style="position:absolute;bottom:240px;left:0;right:0;text-align:center;z-index:2;opacity:0.6;">
        ${wordmark(C.white, 24)}
      </div>
    `,
  },

  // ---------- Instagram STORY: quote (1080×1920) ----------
  "story-quote": {
    output: "brand/instagram/story-quote.png",
    w: 1080, h: 1920,
    body: `
      ${auroraBackground}
      ${techlines(80)}
      ${grain}
      <div style="position:relative;z-index:2;text-align:center;padding:0 90px;width:100%;">
        <div class="serif" style="font-size:200px;color:${C.accent};line-height:0.5;margin-bottom:60px;opacity:0.4;">"</div>
        <h1 class="heading" style="font-size:80px;color:${C.white};line-height:1.15;letter-spacing:-2.5px;">
          Des résultats,<br>pas des <span class="serif" style="font-size:88px;">promesses</span>.
        </h1>
        <div style="margin-top:80px;display:flex;justify-content:center;align-items:center;gap:14px;">
          <span style="width:24px;height:1px;background:${C.cyan};opacity:0.6;"></span>
          <div class="uppercase" style="font-size:13px;color:${C.dim};letter-spacing:0.18em;">Kove · Manifesto</div>
          <span style="width:24px;height:1px;background:${C.cyan};opacity:0.6;"></span>
        </div>
      </div>
      <div style="position:absolute;bottom:240px;left:0;right:0;text-align:center;z-index:2;opacity:0.6;">
        ${wordmark(C.white, 24)}
      </div>
    `,
  },

  // ---------- Instagram STORY: CTA link (1080×1920) ----------
  "story-cta-link": {
    output: "brand/instagram/story-cta-link.png",
    w: 1080, h: 1920,
    body: `
      ${auroraBackground}
      ${techlines(80)}
      ${grain}
      <div style="position:relative;z-index:2;text-align:center;padding:0 100px;width:100%;">
        <div class="uppercase" style="font-size:13px;color:${C.cyan};margin-bottom:48px;">Disponibilités</div>
        <h1 class="heading" style="font-size:96px;color:${C.white};line-height:1.05;letter-spacing:-3px;">
          3 places<br>restantes<br><span class="serif" style="font-size:104px;">ce mois-ci</span>.
        </h1>
        <div style="margin-top:80px;display:inline-block;padding:24px 56px;border-radius:999px;background:${C.accent};color:${C.white};font-family:Space Grotesk;font-weight:500;font-size:32px;letter-spacing:-0.5px;box-shadow:0 12px 40px -8px rgba(59,130,246,0.45);">
          → Réserver un appel
        </div>
        <div style="margin-top:32px;font-family:JetBrains Mono,monospace;font-size:18px;color:${C.dim};">
          Lien en bio · kove.fr
        </div>
      </div>
      <div style="position:absolute;bottom:240px;left:0;right:0;text-align:center;z-index:2;opacity:0.6;">
        ${wordmark(C.white, 24)}
      </div>
    `,
  },

  // ---------- MOODBOARD: Palette ----------
  "moodboard-palette": {
    output: "brand/moodboard/palette.png",
    w: 1200, h: 800,
    body: `
      <div style="position:relative;z-index:2;width:100%;padding:80px;">
        <div class="uppercase" style="font-size:13px;color:${C.cyan};margin-bottom:16px;">Brand Kove · Palette</div>
        <h2 class="heading" style="font-size:48px;color:${C.white};letter-spacing:-1.5px;margin-bottom:60px;">
          Couleurs <span class="serif" style="font-size:54px;">verrouillées</span>.
        </h2>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:20px;">
          ${[
            ["Accent", "#3b82f6", "Brand primary"],
            ["Cyan", "#22d3ee", "Signal / techlines"],
            ["Dark", "#0f0f0f", "Background"],
            ["Deep", "#000000", "Footer / null"],
            ["White", "#ffffff", "Foreground"],
          ].map(([n, hex, role]) => `
            <div>
              <div style="aspect-ratio:1;background:${hex};border-radius:14px;border:1px solid rgba(255,255,255,0.08);box-shadow:0 8px 24px -8px rgba(0,0,0,0.6);"></div>
              <div style="margin-top:14px;font-family:Space Grotesk;font-weight:500;font-size:18px;color:${C.white};">${n}</div>
              <div style="margin-top:4px;font-family:JetBrains Mono,monospace;font-size:13px;color:${C.cyan};">${hex}</div>
              <div style="margin-top:6px;font-family:Inter;font-size:13px;color:${C.dim};">${role}</div>
            </div>
          `).join("")}
        </div>
      </div>
      <div style="position:absolute;bottom:32px;right:80px;z-index:2;opacity:0.6;">
        ${wordmark(C.white, 18)}
      </div>
      ${grain}
    `,
  },

  // ---------- MOODBOARD: Typography ----------
  "moodboard-typography": {
    output: "brand/moodboard/typography.png",
    w: 1200, h: 800,
    body: `
      <div style="position:relative;z-index:2;width:100%;padding:80px;">
        <div class="uppercase" style="font-size:13px;color:${C.cyan};margin-bottom:16px;">Brand Kove · Typographie</div>
        <h2 class="heading" style="font-size:48px;color:${C.white};letter-spacing:-1.5px;margin-bottom:60px;">
          3 fontes, <span class="serif" style="font-size:54px;">3 rôles</span>.
        </h2>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:48px;">
          <div>
            <div class="uppercase" style="font-size:11px;color:${C.dim};margin-bottom:16px;">Heading</div>
            <div class="heading" style="font-size:64px;color:${C.white};line-height:1;">Kove</div>
            <div style="margin-top:16px;font-family:Inter;font-size:14px;color:${C.dim};">Space Grotesk Medium · -0.035em</div>
          </div>
          <div>
            <div class="uppercase" style="font-size:11px;color:${C.dim};margin-bottom:16px;">Italic</div>
            <div class="serif" style="font-size:72px;color:${C.accent};line-height:1;">vite</div>
            <div style="margin-top:16px;font-family:Inter;font-size:14px;color:${C.dim};">Instrument Serif Italic · #3b82f6</div>
          </div>
          <div>
            <div class="uppercase" style="font-size:11px;color:${C.dim};margin-bottom:16px;">Body</div>
            <div style="font-family:Inter;font-size:36px;color:${C.white};line-height:1.2;">Premium</div>
            <div style="margin-top:16px;font-family:Inter;font-size:14px;color:${C.dim};">Inter Regular · 16-19px</div>
          </div>
        </div>
        <div style="margin-top:80px;padding-top:40px;border-top:1px solid rgba(255,255,255,0.08);">
          <h1 class="heading" style="font-size:60px;color:${C.white};letter-spacing:-2px;line-height:1.05;">
            Votre site premium,<br>livré <span class="serif" style="font-size:66px;">avant dimanche</span>.
          </h1>
        </div>
      </div>
      <div style="position:absolute;bottom:32px;right:80px;z-index:2;opacity:0.6;">
        ${wordmark(C.white, 18)}
      </div>
      ${grain}
    `,
  },

  // ---------- MOODBOARD: Atmosphere ----------
  "moodboard-atmosphere": {
    output: "brand/moodboard/atmosphere.png",
    w: 1200, h: 1200,
    body: `
      ${auroraBackground}
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 70% 30%, rgba(59,130,246,0.18) 0%, transparent 55%);"></div>
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 20% 80%, rgba(34,211,238,0.10) 0%, transparent 50%);"></div>
      ${techlines(100)}
      ${grain}
      <div style="position:relative;z-index:2;text-align:center;padding:0 140px;">
        <div class="uppercase" style="font-size:13px;color:${C.cyan};margin-bottom:60px;letter-spacing:0.4em;">Atmosphère</div>
        <h1 class="heading" style="font-size:120px;color:${C.white};letter-spacing:-4px;line-height:1;">
          Quiet<br><span class="serif" style="font-size:128px;">luxury</span>.
        </h1>
        <div style="margin-top:80px;display:flex;justify-content:center;gap:24px;flex-wrap:wrap;">
          ${["Midnight studio", "Tech-craft", "Pixel precision", "Nordic minimal", "Signal cyan"].map(t => `
            <span style="padding:10px 20px;border-radius:999px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.02);font-family:Inter;font-size:14px;color:${C.dim};">${t}</span>
          `).join("")}
        </div>
      </div>
    `,
  },

  // ---------- MOODBOARD: Components ----------
  "moodboard-components": {
    output: "brand/moodboard/components.png",
    w: 1200, h: 1200,
    body: `
      <div style="position:relative;z-index:2;width:100%;padding:80px;">
        <div class="uppercase" style="font-size:13px;color:${C.cyan};margin-bottom:16px;">Brand Kove · Components</div>
        <h2 class="heading" style="font-size:48px;color:${C.white};letter-spacing:-1.5px;margin-bottom:60px;">
          Signatures <span class="serif" style="font-size:54px;">visuelles</span>.
        </h2>

        <!-- Buttons row -->
        <div style="margin-bottom:60px;">
          <div class="uppercase" style="font-size:11px;color:${C.dim};margin-bottom:20px;">Buttons</div>
          <div style="display:flex;gap:14px;flex-wrap:wrap;">
            <span style="display:inline-flex;align-items:center;gap:8px;padding:14px 26px;border-radius:999px;background:${C.accent};color:${C.white};font-family:Space Grotesk;font-weight:500;font-size:16px;box-shadow:0 8px 24px -6px rgba(59,130,246,0.45);">Réserver un appel →</span>
            <span style="display:inline-flex;align-items:center;gap:8px;padding:14px 26px;border-radius:999px;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.03);color:${C.white};font-family:Space Grotesk;font-weight:500;font-size:16px;">Voir nos réalisations</span>
            <span style="display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:999px;border:1px solid rgba(34,211,238,0.3);background:rgba(34,211,238,0.05);color:${C.white};font-family:Inter;font-size:13px;">
              <span style="width:8px;height:8px;border-radius:50%;background:${C.cyan};box-shadow:0 0 8px ${C.cyan};"></span>
              3 places restantes
            </span>
          </div>
        </div>

        <!-- Cards row -->
        <div style="margin-bottom:60px;">
          <div class="uppercase" style="font-size:11px;color:${C.dim};margin-bottom:20px;">Glass Cards</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;">
            ${[
              ["48h", "Première maquette"],
              ["95+", "Score PageSpeed"],
              ["7j", "Livraison max"],
            ].map(([n, l]) => `
              <div style="padding:36px;border-radius:16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);backdrop-filter:blur(12px);">
                <div class="heading" style="font-size:64px;color:${C.white};letter-spacing:-2px;line-height:1;">${n}</div>
                <div style="margin-top:14px;font-family:Inter;font-size:13px;color:${C.dim};text-transform:uppercase;letter-spacing:0.14em;">${l}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Italic emphasis -->
        <div>
          <div class="uppercase" style="font-size:11px;color:${C.dim};margin-bottom:20px;">Italic emphasis (signature)</div>
          <h3 class="heading" style="font-size:56px;color:${C.white};letter-spacing:-2px;line-height:1.1;">
            Du brief au live, <span class="serif" style="font-size:62px;">en temps réel</span>.
          </h3>
        </div>
      </div>
      <div style="position:absolute;bottom:32px;right:80px;z-index:2;opacity:0.6;">
        ${wordmark(C.white, 18)}
      </div>
      ${grain}
    `,
  },
};

// ===== Generator =====
const ensureDir = async (file) => mkdir(dirname(join(ROOT, file)), { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 2 }); // 2x for retina

let count = 0;
for (const [name, t] of Object.entries(T)) {
  await ensureDir(t.output);
  const page = await ctx.newPage();
  await page.setViewportSize({ width: t.w, height: t.h });
  await page.setContent(html(t.body, t.w, t.h), { waitUntil: "networkidle" });
  // Wait a bit for fonts to fully load
  await page.waitForTimeout(800);
  await page.screenshot({
    path: join(ROOT, t.output),
    omitBackground: false,
    clip: { x: 0, y: 0, width: t.w, height: t.h },
  });
  await page.close();
  console.log(`  ✓ ${t.output}  (${t.w}×${t.h})`);
  count++;
}

await browser.close();
console.log(`\n✅ Generated ${count} brand assets.`);
