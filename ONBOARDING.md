# Kove — Onboarding Partenaire

> Bienvenue. Tu rejoins **Kove**, l'agence web premium qui livre des sites en 48-72h.
> Ce doc te donne tout ce qu'il faut savoir en 15 min de lecture.

**Ton rôle :** Designer / Brand & Frontend.
**Source de vérité brand :** [`brand/BRAND_BIBLE.md`](brand/BRAND_BIBLE.md) · [`brand/MOODBOARD.md`](brand/MOODBOARD.md)
**Site live :** https://web-production-996275.up.railway.app

---

## 1. Le projet en 30 secondes

**Kove** est une agence web qui construit des sites premium pour les fondateurs FR (SaaS, agence, e-commerce premium) qui n'ont pas le temps d'attendre 6 semaines une agence classique.

- **Promesse principale** : "Votre site premium, livré avant {jour}."
- **Différenciateur** : 48h pour la première maquette, 7j max pour le live, design pixel-perfect, 95+ PageSpeed.
- **Anti-positioning** : pas une agence corporate, pas un freelance générique, pas de templates, pas de WordPress recyclé.

**Le pitch en 1 phrase à connaître par cœur :**
> *"Pas de templates. Pas de compromis."*

---

## 2. L'écosystème (important pour la cohérence)

Kove fait partie d'un écosystème de 3 produits sous la marque **Maxime Gebhart** (le founder) :

| Brand | Couleur | Vibe | Cible |
|-------|---------|------|-------|
| **Kove** (web) | Bleu `#3b82f6` + Cyan `#22d3ee` | Tech, Premium, Rapide | Fondateurs SaaS / Agence / E-com FR |
| **Savi** (SAV IA) | Vert `#25D366` | Calme, Rassurant | Shopify FR |
| **Orbit Labs** (UGC) | Orange `#FF5A1F` | Énergie, Sharp | Marques e-com |
| **Maxime Gebhart** (hub) | Orange `#FF6B35` | Builder, Direct | Hub personnel |

**Règle d'or :** Kove n'utilise **JAMAIS** d'orange. Cette couleur est réservée aux autres brands.

---

## 3. Brand Identity — Règles non-négociables

> Lecture obligatoire avant tout commit visuel : [`brand/BRAND_BIBLE.md`](brand/BRAND_BIBLE.md) (12 sections complètes).

**TL;DR couleurs :**
- ✅ Bleu Kove `#3b82f6` (CTA, italics emphasis, glows)
- ✅ Cyan signal `#22d3ee` (techlines, live dots, micro-accents)
- ✅ Dark `#0f0f0f` / `#000000` (backgrounds)
- ✅ Blanc `#ffffff` (foreground)
- ❌ JAMAIS orange / vert / violet / rose / jaune

**TL;DR typographie :**
- **Heading** : Space Grotesk Medium (`-0.035em`)
- **Body** : Inter Regular
- **Italic emphasis** (un mot par titre maximum) : Instrument Serif italic, couleur `#3b82f6`

**TL;DR logo :**
- Le logo **"Sliced K with cyan"** est verrouillé : stem + bras supérieur en blanc, **bras inférieur en cyan** (signature). Voir `brand/assets/monogram-K.svg`.
- ❌ Ne JAMAIS inverser les couleurs des bras du K.

**TL;DR tone of voice :**
- Direct + Premium + Rassurant. Sans hype.
- ✅ "Premium", "livré", "stack IA", "48h", "pas de templates"
- ❌ "Solutions sur mesure", "boostez votre visibilité", "révolutionnaire", emojis colorés

---

## 4. Stack technique

| Couche | Tech | Notes |
|--------|------|-------|
| Framework | **Next.js 16.2.3** | ⚠️ **Breaking changes vs Next 14/15** — voir `AGENTS.md` |
| React | **19.2.4** | Server components par défaut |
| Styling | **Tailwind CSS v4** | Via `@theme inline` dans `globals.css`, pas de `tailwind.config.js` |
| Animations | **Framer Motion 12.38** | `motion`, `AnimatePresence`, `layoutId` |
| WebGL | **Three.js 0.183** | Aurora shader dans `components/ui/animated-shader-background.tsx` |
| Components | **shadcn/ui** + **Radix UI** | Voir `components.json` |
| Icons | **Lucide React 1.8** | |
| Number animations | **@number-flow/react** | Pour les stats animés |
| Tests E2E | **Playwright 1.59** | Aussi utilisé pour générer les brand assets |
| Hosting | **Railway** | Auto-deploy depuis `main` |
| TypeScript | **strict mode** | Pas de `any` toléré |

⚠️ **Important** : avant d'écrire du code Next.js, lire `node_modules/next/dist/docs/` (la doc bundlée). La version 16 a des conventions différentes des versions précédentes.

---

## 5. Arborescence du repo

```
Kove/
├── ONBOARDING.md              ← Tu es ici
├── CONTRIBUTING.md            ← Git workflow (LIS-MOI EN 2EME)
├── SKILLS_BUNDLE.md           ← Setup Claude Code identique au mien
├── README.md                  ← Pointeurs rapides
├── CLAUDE.md / AGENTS.md      ← Notes Next 16 (chargé auto par Claude Code)
├── .env.example               ← Template vars d'env (copy → .env.local)
├── .gitignore
├── package.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── railway.json + Procfile + .nvmrc  ← Configs Railway (DO NOT TOUCH)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx         ← Metadata, fonts (Space Grotesk + Inter + Instrument Serif)
│   │   ├── page.tsx           ← Page principale (compose toutes les sections)
│   │   └── globals.css        ← TOUTES LES CSS VARS + classes utilitaires (palette ici)
│   ├── components/
│   │   ├── navbar.tsx         ← Logo SVG inline + nav links
│   │   ├── hero.tsx           ← Hero avec aurora shader + stats
│   │   ├── process.tsx        ← Process Brief→Maquette→Live
│   │   ├── portfolio.tsx      ← Projets clients (carousel)
│   │   ├── pricing.tsx        ← Tarifs
│   │   ├── faq.tsx
│   │   ├── footer.tsx         ← Logo SVG inline + liens
│   │   ├── tech-lines.tsx     ← Signature : 2 rails verticaux cyan
│   │   ├── hero-reviews.tsx   ← Avis clients qui défilent
│   │   ├── clients-marquee.tsx
│   │   └── ui/
│   │       ├── animated-cta.tsx       ← Boutons style Pulsor
│   │       └── animated-shader-background.tsx  ← Aurora WebGL
│   └── lib/                   ← Utilitaires (cn, etc.)
│
├── public/
│   ├── favicon.svg + apple-touch-icon.png + og-image.png
│   ├── logo-wordmark.svg
│   ├── logos/                 ← kove-monogram.svg, kove-wordmark.svg, kove-orbit.svg
│   ├── logos/trust/           ← Logos clients (client-1.png à client-4.png)
│   ├── portfolio/             ← Screenshots projets clients
│   └── 8lab/                  ← Références
│
├── brand/                     ← LECTURE OBLIGATOIRE
│   ├── BRAND_BIBLE.md         ← Source de vérité brand (12 sections)
│   ├── MOODBOARD.md           ← Atmosphère, références, anti-références
│   ├── assets/                ← 6 SVG masters (logos, favicon, OG, monogram)
│   ├── instagram/
│   │   ├── post-*.png         ← 5 templates posts 1080×1080
│   │   ├── story-*.png        ← 3 templates stories 1080×1920
│   │   └── triptychs/         ← 6 triptyques (3 posts = 1 image)
│   │       ├── PUBLISH_ORDER.md  ← Comment poster pour aligner le grid
│   │       └── 01-manifesto/, 02-process/, 03-stats/, ...
│   ├── moodboard/             ← 4 visuels d'atmosphère
│   └── logo-options/          ← Itérations historiques (Kie.ai)
│
└── scripts/
    └── brand/
        ├── generate-assets.mjs       ← Régénère favicon, OG, IG templates
        ├── generate-triptychs.mjs    ← Régénère les triptyques
        ├── generate-ai-logos.mjs     ← Génération via Kie.ai (Flux Pro)
        └── generate-ai-logos-v2.mjs  ← Génération via Kie.ai (Flux Max + GPT-4o)
```

---

## 6. Setup local — 5 minutes

```bash
# 1. Cloner le repo (après que Maxime t'ait ajouté comme collaborateur)
git clone https://github.com/Maximgeb/kove.git
cd kove

# 2. Activer la bonne version de Node (20+)
nvm use            # lit .nvmrc — ou installe Node 20.9+ via brew/nvm

# 3. Installer les deps
npm install

# 4. Copier le template d'env (et remplir avec les valeurs que Maxime te partage en privé)
cp .env.example .env.local
# Édite .env.local et colle KIE_API_KEY (Maxime te l'envoie via 1Password / iMessage privé)

# 5. Lancer le serveur de dev
npm run dev
# → http://localhost:3000
```

**Si tu veux régénérer les brand assets :**
```bash
node scripts/brand/generate-assets.mjs       # favicon, OG, IG templates, moodboard
node scripts/brand/generate-triptychs.mjs    # triptyques Instagram
```

---

## 7. Conventions de code (à respecter strictement)

- **TypeScript strict** : pas de `any`, pas de `@ts-ignore` sans commentaire `// reason: ...`
- **Components naming** : kebab-case fichier (`hero-reviews.tsx`), PascalCase export (`HeroReviews`)
- **Imports** : alias `@/` pour `src/` (configuré dans `tsconfig.json`)
- **Animations** : Framer Motion uniquement (pas de CSS keyframes manuelles sauf perf-critical)
- **Classes Tailwind** : préférer composer dans le JSX, pas extraire en `clsx` sauf si conditionnel complexe
- **Styles inline** : interdit sauf dimensions dynamiques calculées (`style={{ height: dynamicH }}`)
- **CSS variables** : centralisées dans `src/app/globals.css` — touche jamais aux valeurs sans en parler à Maxime
- **Pas de console.log en commit** — utilise un logger ou supprime avant de push
- **Imports next/font uniquement dans `layout.tsx`** (perf)

### Performance guardrails (leçons accumulées)
- `backdrop-blur-md` MAX (jamais `xl` / `2xl`) — kills perf sur mobile
- Animations transform-only (`x`, `scaleX`) — pas `left` / `width`
- `willChange: "transform"` sur éléments animés en boucle
- `min-h-[100dvh]` au lieu de `h-screen` (mobile)
- IntersectionObserver + `visibilitychange` pour pauser les boucles infinies offscreen / tab masqué
- `next/font` avec `display: "swap"` + `preload: true` sur les fonts critiques uniquement

---

## 8. Brand checklist avant chaque commit visuel

Avant de push une nouvelle section, asset, ou modification de design, valide :

- [ ] **Aucun orange** dans l'output (CSS, SVG, image)
- [ ] Couleur primary = `#3b82f6`, signal = `#22d3ee`, pas autre chose
- [ ] Police titres = Space Grotesk Medium, pas Bold (sauf cas spécifique validé)
- [ ] Italic = Instrument Serif uniquement, jamais Inter italic
- [ ] 1 italic max par titre H1/H2
- [ ] Tone : pas de "boostez", "révolutionnaire", emojis colorés
- [ ] Chiffres précis (48h, 95+, 7j) — pas de "à peu près"
- [ ] TechLines présentes sur les sections principales (signature visuelle Kove)
- [ ] `npm run build` passe sans warning TS

---

## 9. État actuel du site (au 2026-05-06)

**Sections live** :
- ✅ Navbar (logo Sliced K + nav + CTA)
- ✅ Hero (aurora WebGL + stats animés + CTAs Pulsor)
- ✅ Process (Brief → Maquette → Live, ligne progressive cyan)
- ✅ Portfolio (4 projets clients, carousel)
- ✅ Pricing (3 paliers)
- ✅ FAQ
- ✅ Footer (logo + liens + social + bottom bar)

**En cours / next** :
- 📅 Custom domain `koveagency.fr` (DNS à configurer)
- 📅 Compte Instagram `@koveagency.fr` + premiers triptyques publiés
- 📅 Section "Études de cas" détaillées (avant/après par client)
- 📅 Page legal mentions / politique de confidentialité

---

## 10. Roadmap proche

| Quand | Quoi |
|-------|------|
| Cette semaine | Compte Insta `@koveagency.fr` lancé + 2 triptyques publiés |
| Cette semaine | Domain `koveagency.fr` configuré sur Railway |
| +2 semaines | 3 nouveaux clients en pipeline (cold DM LinkedIn) |
| +1 mois | Section "Études de cas" en ligne |
| +2 mois | Refonte Pricing + FAQ basés sur retours clients |

---

## 11. Communication

**Comment me ping (Maxime)** :
- 🟢 Urgent (prod cassée, deploy bloqué) : iMessage / WhatsApp / appel direct
- 🟡 Question pendant que tu codes : commenter directement sur la PR (je notif)
- 🔵 Sync hebdo : à fixer ensemble (suggestion : visio 30 min lundi matin)
- 🟣 Idée brand / DA : Notion shared workspace (à créer)

**Tools (à confirmer ensemble)** :
- [ ] Figma partagé (pour les maquettes design avant code)
- [ ] Notion shared (briefs clients + roadmap)
- [ ] Slack / Discord ? (à décider — pour l'instant iMessage suffit)

---

## 12. Liens essentiels

| Ressource | URL |
|-----------|-----|
| Repo GitHub | https://github.com/Maximgeb/kove |
| Site live (Railway) | https://web-production-996275.up.railway.app |
| Brand Bible | [`brand/BRAND_BIBLE.md`](brand/BRAND_BIBLE.md) |
| Moodboard | [`brand/MOODBOARD.md`](brand/MOODBOARD.md) |
| Logo verrouillé (réf visuelle) | [`brand/logo-options/ai-generated-v2/COMPARE.html`](brand/logo-options/ai-generated-v2/) |
| Templates Insta | [`brand/instagram/`](brand/instagram/) |
| Workflow Git | [`CONTRIBUTING.md`](CONTRIBUTING.md) |
| Setup Claude Code | [`SKILLS_BUNDLE.md`](SKILLS_BUNDLE.md) |
| Doc Next.js bundlée | `node_modules/next/dist/docs/` |
| Doc Tailwind v4 | https://tailwindcss.com/docs |
| Doc Framer Motion | https://www.framer.com/motion/ |

---

## 13. Premiers pas concrets (jour 1)

1. ✅ Accepter l'invite GitHub envoyée par Maxime
2. ✅ Cloner le repo en local + setup (.env, npm install, npm run dev)
3. ✅ Lire ce fichier (ONBOARDING.md) en entier
4. ✅ Lire [`CONTRIBUTING.md`](CONTRIBUTING.md) (Git workflow — 5 min)
5. ✅ Lire [`brand/BRAND_BIBLE.md`](brand/BRAND_BIBLE.md) (15 min)
6. ✅ Setup Claude Code via [`SKILLS_BUNDLE.md`](SKILLS_BUNDLE.md) (30 min, optionnel mais recommandé)
7. ✅ Sync 30 min avec Maxime (visio) pour parcourir le repo ensemble + Q&A
8. ✅ Créer une première branche `chore/onboarding-tweaks` pour test du workflow Git (corrige une typo, ouvre une PR, fais-toi merge par Maxime)

**Welcome aboard. Ship clean.**
