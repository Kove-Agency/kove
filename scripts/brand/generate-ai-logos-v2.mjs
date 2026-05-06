#!/usr/bin/env node
/**
 * Generate Kove logo v2 — using Kie.ai's TOP-tier image models:
 *   - GPT-4o Image (best for precise instructions)
 *   - Flux Kontext Max (best for clean vector-like results)
 *
 * Each prompt is run on BOTH models, so user can compare quality side-by-side.
 *
 * Run: cd Kove && node --env-file=.env.local scripts/brand/generate-ai-logos-v2.mjs
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Buffer } from "node:buffer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const OUT_DIR = join(ROOT, "brand/logo-options/ai-generated-v2");

const API_KEY = process.env.KIE_API_KEY;
if (!API_KEY) {
  console.error("❌ Missing KIE_API_KEY in Kove/.env.local");
  process.exit(1);
}

const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

// ===== Prompts ultra-précis =====

const PROMPTS = [
  {
    id: "P1-precise",
    name: "Precise 3-part",
    prompt:
      `minimalist tech logo, single letter "K" mark, three-part geometric construction: ` +
      `(1) thick vertical stem in solid pure white #FFFFFF, ` +
      `(2) upper-right diagonal arm parallelogram in solid pure white #FFFFFF, ` +
      `(3) lower-right diagonal arm parallelogram in solid cyan #22D3EE, ` +
      `sharp 45-degree angles, no curves, no rounded corners, ` +
      `the cyan lower arm is the only colored element — the rest is white, ` +
      `centered composition, isolated on pure solid black #000000 background, ` +
      `generous negative space, vector flat design, no gradients, no shadows, no 3D, ` +
      `no text, no decoration, 1:1 square, premium tech brand identity, monolithic confident form`,
  },
  {
    id: "P2-thick",
    name: "Extra Thick",
    prompt:
      `BOLD minimalist letter K logo, monolithic construction with EXTRA THICK proportions, ` +
      `the K occupies 45% of the canvas width, vertical stem is 1/3 of K width, ` +
      `upper diagonal arm and stem in solid white #FFFFFF, ` +
      `lower diagonal arm in solid cyan #22D3EE, ` +
      `sharp geometric edges, no curves, no rounded corners, ` +
      `isolated on pure black #000000 square background, ` +
      `vector flat design, no text, no shadows, no gradients, ` +
      `centered, generous negative space, premium tech aesthetic`,
  },
  {
    id: "P3-natural",
    name: "Natural language",
    prompt:
      `Create a minimalist logo for a premium tech brand. ` +
      `The logo is a stylized letter K composed of three flat geometric shapes: ` +
      `a thick vertical bar in pure white, an upper diagonal arm going up-right in pure white, ` +
      `and a lower diagonal arm going down-right in solid cyan #22D3EE. ` +
      `The K must be perfectly geometric with sharp angles, no curves, no rounded corners. ` +
      `Place it on a solid pure black background with generous space around. ` +
      `No text, no shadows, no gradients, no 3D effects. ` +
      `Vector flat style. Square 1:1 composition. Centered.`,
  },
  {
    id: "P4-signature",
    name: "Cyan signature emphasis",
    prompt:
      `Logo of letter K, minimalist and monumental. ` +
      `Stem and upper-right diagonal: pure WHITE. ` +
      `Lower-right diagonal: VIBRANT CYAN #22D3EE — this cyan element is the brand signature. ` +
      `Sharp geometric construction, NO curves, NO rounded corners, NO 3D. ` +
      `Pure BLACK #000000 background. ` +
      `Generous negative space. NO text. Square 1:1. Vector flat.`,
  },
];

// ===== Models =====

const MODELS = [
  {
    id: "flux-max",
    name: "Flux Kontext Max",
    submitUrl: "https://api.kie.ai/api/v1/flux/kontext/generate",
    pollUrl: "https://api.kie.ai/api/v1/flux/kontext/record-info",
    buildBody: (prompt) => ({
      prompt,
      model: "flux-kontext-max",
      aspectRatio: "1:1",
      outputFormat: "png",
      enableTranslation: false,
      promptUpsampling: true,
      safetyTolerance: 2,
    }),
    extractUrl: (data) => data?.response?.resultImageUrl,
  },
  {
    id: "gpt4o",
    name: "GPT-4o Image",
    submitUrl: "https://api.kie.ai/api/v1/gpt4o-image/generate",
    pollUrl: "https://api.kie.ai/api/v1/gpt4o-image/record-info",
    buildBody: (prompt) => ({
      prompt,
      size: "1:1",
      isEnhance: false,
    }),
    extractUrl: (data) =>
      data?.response?.resultUrls?.[0] || data?.response?.resultImageUrl,
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function submitJob(model, prompt, label) {
  const res = await fetch(model.submitUrl, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(model.buildBody(prompt)),
  });
  const json = await res.json();
  if (json.code !== 200 || !json.data?.taskId) {
    throw new Error(`${label} submit failed: ${JSON.stringify(json)}`);
  }
  return json.data.taskId;
}

async function pollJob(model, taskId, label, maxWaitMs = 8 * 60 * 1000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    const res = await fetch(
      `${model.pollUrl}?taskId=${encodeURIComponent(taskId)}`,
      { headers: HEADERS }
    );
    const json = await res.json();
    const data = json?.data;
    if (!data) {
      await sleep(5000);
      continue;
    }
    if (data.successFlag === 1) {
      const url = model.extractUrl(data);
      if (!url) throw new Error(`${label}: success but no URL — ${JSON.stringify(data)}`);
      return url;
    }
    if (data.successFlag === 2 || data.successFlag === 3) {
      throw new Error(
        `${label}: failed (flag=${data.successFlag}) — ${data.errorMessage || "?"}`
      );
    }
    process.stdout.write(`  ${label}: flag=${data.successFlag ?? "?"}…\r`);
    await sleep(7000);
  }
  throw new Error(`${label}: timeout after ${maxWaitMs / 1000}s`);
}

async function downloadTo(url, filepath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const ab = await res.arrayBuffer();
  await writeFile(filepath, Buffer.from(ab));
}

async function processOne(prompt, model) {
  const label = `[${prompt.id}/${model.id}]`;
  try {
    console.log(`${label} submitting…`);
    const taskId = await submitJob(model, prompt.prompt, label);
    console.log(`${label} taskId=${taskId} polling…`);
    const url = await pollJob(model, taskId, label);
    const file = `${prompt.id}_${model.id}.png`;
    await downloadTo(url, join(OUT_DIR, file));
    console.log(`${label} ✓ saved → ${file}`);
    return { ok: true, prompt: prompt.id, promptName: prompt.name, model: model.id, modelName: model.name, file, sourceUrl: url };
  } catch (err) {
    console.log(`${label} ✗ ${err.message}`);
    return { ok: false, prompt: prompt.id, model: model.id, error: err.message };
  }
}

// ===== Main =====

await mkdir(OUT_DIR, { recursive: true });

const jobs = [];
for (const prompt of PROMPTS) {
  for (const model of MODELS) {
    jobs.push({ prompt, model });
  }
}

console.log(`Launching ${jobs.length} jobs in parallel: ${PROMPTS.length} prompts × ${MODELS.length} models\n`);

const results = await Promise.all(jobs.map(({ prompt, model }) => processOne(prompt, model)));

const successes = results.filter((r) => r.ok);
const failures = results.filter((r) => !r.ok);

await writeFile(
  join(OUT_DIR, "manifest.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), prompts: PROMPTS, results }, null, 2)
);

// Comparison HTML grouped by prompt, with both models side-by-side
const compareHtml = `<!doctype html><html><head><meta charset="utf-8">
<title>Kove — AI Logos v2 (Top Models)</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Inter, sans-serif; background: #050505; color: #fff; padding: 40px; min-height: 100vh; }
h1 { font-family: 'Space Grotesk'; font-weight: 500; font-size: 32px; letter-spacing: -1px; margin-bottom: 8px; }
.sub { color: rgba(255,255,255,0.5); font-size: 14px; margin-bottom: 40px; }
.row { display: grid; grid-template-columns: 280px 1fr 1fr; gap: 20px; margin-bottom: 32px; padding: 20px; background: #0a0a0a; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; }
.row .info { padding: 12px; }
.row .info .id { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #22d3ee; margin-bottom: 8px; }
.row .info .name { font-family: 'Space Grotesk'; font-weight: 500; font-size: 18px; margin-bottom: 12px; }
.row .info .prompt { font-family: 'JetBrains Mono', monospace; font-size: 10px; line-height: 1.5; color: rgba(255,255,255,0.45); max-height: 280px; overflow: auto; }
.cell { background: #000; border: 1px solid rgba(255,255,255,0.04); border-radius: 10px; overflow: hidden; }
.cell .label { padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
.cell .label .model { font-family: 'Space Grotesk'; font-weight: 500; font-size: 13px; color: #fff; }
.cell .label .badge { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.4); }
.cell img { width: 100%; aspect-ratio: 1; display: block; }
.cell.failed { display: flex; align-items: center; justify-content: center; padding: 60px 20px; color: #ff6b6b; font-size: 12px; text-align: center; }
</style></head>
<body>
<h1>Kove — Logos AI v2 (Top Models)</h1>
<div class="sub">${successes.length}/${jobs.length} succès · GPT-4o Image + Flux Kontext Max · ${new Date().toLocaleString("fr-FR")}</div>
${PROMPTS.map((p) => {
  const fluxResult = results.find((r) => r.prompt === p.id && r.model === "flux-max");
  const gpt4oResult = results.find((r) => r.prompt === p.id && r.model === "gpt4o");
  const cell = (r, modelName) => r.ok
    ? `<div class="cell"><div class="label"><div class="model">${modelName}</div><div class="badge">${r.file}</div></div><img src="${r.file}" alt=""/></div>`
    : `<div class="cell failed">${modelName}<br><br>FAILED<br>${r.error || ""}</div>`;
  return `
    <div class="row">
      <div class="info">
        <div class="id">${p.id}</div>
        <div class="name">${p.name}</div>
        <div class="prompt">${p.prompt.replace(/</g, "&lt;")}</div>
      </div>
      ${cell(fluxResult, "Flux Kontext Max")}
      ${cell(gpt4oResult, "GPT-4o Image")}
    </div>
  `;
}).join("")}
</body></html>`;

await writeFile(join(OUT_DIR, "COMPARE.html"), compareHtml);

console.log(`\n✅ ${successes.length}/${jobs.length} succeeded.`);
if (failures.length) console.log(`⚠️  ${failures.length} failed.`);
console.log(`\nOpen comparison: open ${join(OUT_DIR, "COMPARE.html")}`);
