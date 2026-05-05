#!/usr/bin/env node
/**
 * Generate Kove logo concepts using Kie.ai Flux Kontext API.
 *
 * Run: cd Kove && node --env-file=.env.local scripts/brand/generate-ai-logos.mjs
 *
 * Requires: KIE_API_KEY in .env.local (gitignored).
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Buffer } from "node:buffer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const OUT_DIR = join(ROOT, "brand/logo-options/ai-generated");

const API_KEY = process.env.KIE_API_KEY;
if (!API_KEY) {
  console.error("❌ Missing KIE_API_KEY. Add it to Kove/.env.local then re-run.");
  process.exit(1);
}

const ENDPOINT_GEN = "https://api.kie.ai/api/v1/flux/kontext/generate";
const ENDPOINT_POLL = "https://api.kie.ai/api/v1/flux/kontext/record-info";
const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

// ===== Logo prompt design =====
//
// Common base prompt that enforces Kove's brand DNA. Each variant adds its own twist.
// Keep prompts in English (better Flux compliance).
const BASE = [
  "minimalist logo design",
  "single isolated mark on pure solid black background #000000",
  "premium tech brand, ultra clean",
  "vector style, sharp geometric shapes, no gradients, no 3d, no shadows",
  "professional, centered composition, generous negative space",
].join(", ");

const PROMPTS = [
  {
    id: "01-geometric-K",
    name: "Geometric K",
    prompt: `${BASE}, abstract letter K mark, monolithic single-piece geometry, sharp diagonal cuts, white only, no text, like Linear or Vercel logo`,
  },
  {
    id: "02-sliced-K-cyan",
    name: "Sliced K with cyan",
    prompt: `${BASE}, letter K mark with thin cyan #22d3ee slot/cut at intersection, mostly white K with one precise cyan accent, premium signature, no text`,
  },
  {
    id: "03-sparkle-mark",
    name: "Sparkle mark",
    prompt: `${BASE}, abstract 4-pointed sparkle/star mark, asymmetric elegant proportions, white shape only, single tiny cyan #22d3ee dot at center, no text, like Radiant or Linear icon`,
  },
  {
    id: "04-cove-symbol",
    name: "Cove symbol",
    prompt: `${BASE}, abstract symbol suggesting an enclosed bay or cove, semi-circular form opening upward with a thin beam line, white only with thin cyan #22d3ee accent, no text, premium maritime tech feel`,
  },
  {
    id: "05-block-architecture",
    name: "Architectural block",
    prompt: `${BASE}, isometric solid white block with sharp letter K cut into negative space, edge highlight in cyan #22d3ee, like Momentum or Stripe logos, no text`,
  },
  {
    id: "06-wordmark",
    name: "Wordmark Kove",
    prompt: `${BASE}, the word "Kove" as wordmark in custom geometric sans-serif typography, slight italic emphasis on the letter "o", letter spacing tight, white text only, premium tech wordmark like Vercel or Linear`,
  },
  {
    id: "07-arc-K",
    name: "Arc K",
    prompt: `${BASE}, letter K mark with a thin orbital arc or ring passing through it, white K with cyan #22d3ee orbital ring detail, like Stomic or Momentum, no text`,
  },
  {
    id: "08-monogram-thick",
    name: "Bold Monogram",
    prompt: `${BASE}, letter K monogram, very bold thick weight, single solid white shape, ultra confident, sharp 90-degree corners, like Klarna logo K, no text, no decoration`,
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function submitJob(prompt) {
  const res = await fetch(ENDPOINT_GEN, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      prompt,
      model: "flux-kontext-pro",
      aspectRatio: "1:1",
      outputFormat: "png",
      enableTranslation: false,
      promptUpsampling: true,
      safetyTolerance: 2,
    }),
  });
  const json = await res.json();
  if (json.code !== 200 || !json.data?.taskId) {
    throw new Error(`Submit failed: ${JSON.stringify(json)}`);
  }
  return json.data.taskId;
}

async function pollJob(taskId, label, maxWaitMs = 8 * 60 * 1000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    const url = `${ENDPOINT_POLL}?taskId=${encodeURIComponent(taskId)}`;
    const res = await fetch(url, { headers: HEADERS });
    const json = await res.json();
    const data = json?.data;
    if (!data) {
      await sleep(5000);
      continue;
    }
    // Flux Kontext uses successFlag (0 = generating, 1 = success, 2/3 = failed)
    const flag = data.successFlag;
    if (flag === 1) {
      const url = data.response?.resultImageUrl;
      if (!url) throw new Error(`${label}: success but no resultImageUrl`);
      return url;
    }
    if (flag === 2 || flag === 3) {
      throw new Error(`${label}: failed (flag=${flag}) — ${data.errorMessage || "unknown"}`);
    }
    process.stdout.write(`  ${label}: generating (flag=${flag ?? "?"})…\r`);
    await sleep(6000);
  }
  throw new Error(`${label}: timeout after ${maxWaitMs / 1000}s`);
}

async function downloadTo(url, filepath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const ab = await res.arrayBuffer();
  await writeFile(filepath, Buffer.from(ab));
}

async function processOne(p) {
  const label = `[${p.id}]`;
  try {
    console.log(`${label} submitting…`);
    const taskId = await submitJob(p.prompt);
    console.log(`${label} taskId=${taskId} — polling…`);
    const imageUrl = await pollJob(taskId, label);
    const out = join(OUT_DIR, `${p.id}.png`);
    await downloadTo(imageUrl, out);
    console.log(`${label} ✓ saved → brand/logo-options/ai-generated/${p.id}.png`);
    return { ok: true, id: p.id, name: p.name, prompt: p.prompt, file: `${p.id}.png`, sourceUrl: imageUrl };
  } catch (err) {
    console.log(`${label} ✗ ${err.message}`);
    return { ok: false, id: p.id, name: p.name, error: err.message };
  }
}

// ===== Main =====
await mkdir(OUT_DIR, { recursive: true });

console.log(`Submitting ${PROMPTS.length} jobs to Kie.ai (Flux Kontext Pro)…\n`);
// Run in parallel — Kie.ai supports concurrent jobs.
const results = await Promise.all(PROMPTS.map(processOne));

// Write a manifest + comparison HTML
const successes = results.filter((r) => r.ok);
const failures = results.filter((r) => !r.ok);

await writeFile(
  join(OUT_DIR, "manifest.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2)
);

const compareHtml = `<!doctype html><html><head><meta charset="utf-8">
<title>Kove — AI Generated Logos (Kie.ai)</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Inter, sans-serif; background: #050505; color: #fff; padding: 40px; min-height: 100vh; }
h1 { font-family: 'Space Grotesk', sans-serif; font-weight: 500; font-size: 32px; letter-spacing: -1px; margin-bottom: 8px; }
.sub { color: rgba(255,255,255,0.5); font-size: 14px; margin-bottom: 40px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px; max-width: 1800px; }
.card { background: #0a0a0a; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; overflow: hidden; }
.card .head { padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
.card .name { font-family: 'Space Grotesk', sans-serif; font-weight: 500; font-size: 16px; letter-spacing: -0.3px; }
.card .id { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #22d3ee; }
.card img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; background: #000; }
.card .prompt { padding: 14px 20px; font-family: 'JetBrains Mono', monospace; font-size: 11px; line-height: 1.5; color: rgba(255,255,255,0.5); border-top: 1px solid rgba(255,255,255,0.04); max-height: 120px; overflow: auto; }
.fails { margin-top: 60px; padding: 20px; border: 1px solid #6b1f1f; border-radius: 10px; background: rgba(255,75,75,0.06); color: #ff8a8a; font-size: 13px; }
.fails h3 { margin-bottom: 8px; }
</style></head>
<body>
<h1>Kove — Logos générés par IA</h1>
<div class="sub">${successes.length}/${PROMPTS.length} succès · Kie.ai · Flux Kontext Pro · ${new Date().toLocaleString("fr-FR")}</div>
<div class="grid">
  ${successes.map((r) => `
    <div class="card">
      <div class="head">
        <div class="name">${r.name}</div>
        <div class="id">${r.id}</div>
      </div>
      <img src="${r.file}" alt="${r.name}"/>
      <div class="prompt">${r.prompt.replace(/</g, "&lt;")}</div>
    </div>
  `).join("")}
</div>
${failures.length > 0 ? `
  <div class="fails">
    <h3>Échecs (${failures.length})</h3>
    <ul>${failures.map((f) => `<li>${f.id} (${f.name}): ${f.error}</li>`).join("")}</ul>
  </div>
` : ""}
</body></html>`;

await writeFile(join(OUT_DIR, "COMPARE.html"), compareHtml);

console.log(`\n✅ ${successes.length}/${PROMPTS.length} succeeded.`);
if (failures.length) console.log(`⚠️  ${failures.length} failed (see manifest.json).`);
console.log(`\nOpen comparison page: open ${join(OUT_DIR, "COMPARE.html")}`);
