// Phase 1: Reconnaissance of 8lab-ecosystem.com
// Captures screenshots, HTML, design tokens, topology, behaviors
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const TARGET_URL = 'https://www.8lab-ecosystem.com/';
const ROOT = '/Users/maximegebhart/Documents/Claude Code/Kove';
const REF_DIR = join(ROOT, 'docs/design-references/8lab');
const RES_DIR = join(ROOT, 'docs/research');

mkdirSync(REF_DIR, { recursive: true });
mkdirSync(RES_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });

// ---- Desktop 1440 ----
const ctxDesktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const pageDesktop = await ctxDesktop.newPage();
console.log('→ Loading 8lab desktop...');
await pageDesktop.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
await pageDesktop.waitForLoadState('load', { timeout: 30000 }).catch(() => console.log('  ! load state not reached, continuing'));
await pageDesktop.waitForTimeout(4000);

// Full-page screenshot desktop
await pageDesktop.screenshot({ path: join(REF_DIR, 'desktop-fullpage.png'), fullPage: true });
console.log('✓ desktop-fullpage.png');

// Above-the-fold screenshot
await pageDesktop.screenshot({ path: join(REF_DIR, 'desktop-hero.png'), fullPage: false });
console.log('✓ desktop-hero.png');

// Raw HTML dump
const html = await pageDesktop.content();
writeFileSync(join(RES_DIR, '8lab-raw.html'), html);
console.log(`✓ 8lab-raw.html (${(html.length / 1024).toFixed(1)} KB)`);

// ---- Design tokens extraction ----
console.log('→ Extracting design tokens...');
const tokens = await pageDesktop.evaluate(() => {
  const colors = new Map();
  const fonts = new Map();
  const bgImages = new Set();
  const fontSizes = new Map();
  const fontWeights = new Map();
  const radii = new Map();

  function bump(map, key) { map.set(key, (map.get(key) || 0) + 1); }

  const all = document.querySelectorAll('*');
  for (const el of all) {
    const cs = getComputedStyle(el);
    if (cs.color && cs.color !== 'rgba(0, 0, 0, 0)') bump(colors, cs.color);
    if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') bump(colors, cs.backgroundColor);
    if (cs.borderColor && cs.borderColor !== 'rgba(0, 0, 0, 0)') bump(colors, cs.borderColor);
    if (cs.fontFamily) bump(fonts, cs.fontFamily);
    if (cs.fontSize) bump(fontSizes, cs.fontSize);
    if (cs.fontWeight) bump(fontWeights, cs.fontWeight);
    if (cs.borderRadius && cs.borderRadius !== '0px') bump(radii, cs.borderRadius);
    if (cs.backgroundImage && cs.backgroundImage !== 'none') bgImages.add(cs.backgroundImage);
  }

  // Top entries
  const top = (m, n = 20) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);

  // Images
  const imgs = [...document.querySelectorAll('img')].map(img => ({
    src: img.currentSrc || img.src,
    alt: img.alt,
    width: img.naturalWidth,
    height: img.naturalHeight,
    display: getComputedStyle(img).display,
    position: getComputedStyle(img).position,
  }));
  const videos = [...document.querySelectorAll('video')].map(v => ({
    src: v.src || v.querySelector('source')?.src,
    poster: v.poster,
    autoplay: v.autoplay,
    loop: v.loop,
  }));
  const links = [...document.querySelectorAll('link[rel*="icon"], link[rel="manifest"]')].map(l => ({
    rel: l.rel, href: l.href, sizes: l.sizes?.toString(),
  }));
  const fontLinks = [...document.querySelectorAll('link[rel="stylesheet"], link[rel="preconnect"]')].map(l => ({
    rel: l.rel, href: l.href,
  })).filter(l => /fonts|googleapis|gstatic/i.test(l.href));

  // SVG count
  const svgCount = document.querySelectorAll('svg').length;

  // Body / html computed
  const body = getComputedStyle(document.body);
  const htmlEl = getComputedStyle(document.documentElement);

  return {
    colors: top(colors, 30),
    fonts: top(fonts, 10),
    fontSizes: top(fontSizes, 20),
    fontWeights: top(fontWeights, 10),
    radii: top(radii, 15),
    bgImages: [...bgImages].slice(0, 30),
    images: imgs,
    videos,
    iconLinks: links,
    fontLinks,
    svgCount,
    bodyBackground: body.backgroundColor,
    bodyColor: body.color,
    bodyFontFamily: body.fontFamily,
    htmlFontSize: htmlEl.fontSize,
    title: document.title,
    lang: document.documentElement.lang,
    scrollHeight: document.documentElement.scrollHeight,
    viewportHeight: window.innerHeight,
  };
});

writeFileSync(join(RES_DIR, '8lab-tokens.json'), JSON.stringify(tokens, null, 2));
console.log('✓ 8lab-tokens.json');

// ---- Page topology ----
console.log('→ Extracting topology...');
const topology = await pageDesktop.evaluate(() => {
  // Find major section elements
  const sectionEls = [
    ...document.querySelectorAll('section, main > div, header, footer, nav'),
  ];
  return sectionEls.slice(0, 40).map((el, i) => {
    const rect = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      i,
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      classes: (el.className?.toString() || '').split(' ').filter(Boolean).slice(0, 8).join(' '),
      top: Math.round(rect.top + window.scrollY),
      height: Math.round(rect.height),
      background: cs.backgroundColor,
      backgroundImage: cs.backgroundImage !== 'none' ? cs.backgroundImage.slice(0, 120) : null,
      textPreview: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 220),
      childSectionCount: el.querySelectorAll('section').length,
      hasVideo: !!el.querySelector('video'),
      hasImage: !!el.querySelector('img'),
      hasSvg: !!el.querySelector('svg'),
    };
  });
});
writeFileSync(join(RES_DIR, '8lab-topology.json'), JSON.stringify(topology, null, 2));
console.log(`✓ 8lab-topology.json (${topology.length} sections)`);

// ---- Interaction sweep: scroll + capture header state change ----
console.log('→ Scroll sweep...');
const scrollStates = [];
for (const y of [0, 300, 800, 1500, 2500, 4000]) {
  await pageDesktop.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y);
  await pageDesktop.waitForTimeout(400);
  const state = await pageDesktop.evaluate(() => {
    const nav = document.querySelector('header, nav');
    if (!nav) return null;
    const cs = getComputedStyle(nav);
    const rect = nav.getBoundingClientRect();
    return {
      scrollY: window.scrollY,
      navBg: cs.backgroundColor,
      navBackdrop: cs.backdropFilter,
      navBorder: cs.borderBottomColor,
      navShadow: cs.boxShadow,
      navPosition: cs.position,
      navHeight: Math.round(rect.height),
    };
  });
  scrollStates.push({ y, state });
}
writeFileSync(join(RES_DIR, '8lab-scroll-states.json'), JSON.stringify(scrollStates, null, 2));
console.log('✓ 8lab-scroll-states.json');

// Reset scroll
await pageDesktop.evaluate(() => window.scrollTo(0, 0));
await pageDesktop.waitForTimeout(500);

// Section-by-section screenshots (for each topology entry)
console.log('→ Section screenshots...');
for (let i = 0; i < Math.min(topology.length, 20); i++) {
  const s = topology[i];
  if (s.height < 100) continue;
  try {
    await pageDesktop.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), Math.max(0, s.top - 20));
    await pageDesktop.waitForTimeout(350);
    await pageDesktop.screenshot({ path: join(REF_DIR, `section-${String(i).padStart(2, '0')}-${s.tag}.png`), fullPage: false });
  } catch (e) {
    console.log(`  ! section ${i} failed: ${e.message}`);
  }
}
console.log('✓ section screenshots');

// ---- Mobile 390 ----
console.log('→ Loading 8lab mobile...');
const ctxMobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
const pageMobile = await ctxMobile.newPage();
await pageMobile.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
await pageMobile.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
await pageMobile.waitForTimeout(3500);
await pageMobile.screenshot({ path: join(REF_DIR, 'mobile-fullpage.png'), fullPage: true });
console.log('✓ mobile-fullpage.png');

// ---- Tablet 768 ----
console.log('→ Loading 8lab tablet...');
const ctxTablet = await browser.newContext({ viewport: { width: 768, height: 1024 }, deviceScaleFactor: 2 });
const pageTablet = await ctxTablet.newPage();
await pageTablet.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
await pageTablet.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
await pageTablet.waitForTimeout(3500);
await pageTablet.screenshot({ path: join(REF_DIR, 'tablet-fullpage.png'), fullPage: true });
console.log('✓ tablet-fullpage.png');

await browser.close();
console.log('\n✓ Reconnaissance complete');
