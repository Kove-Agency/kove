# Kove — Agence web premium

> Sites web premium livrés en 48-72h. Pas de templates. Pas de compromis.

**Live :** https://web-production-996275.up.railway.app
**Stack :** Next.js 16 · React 19 · Tailwind v4 · Framer Motion · Three.js
**Hébergement :** Railway (auto-deploy depuis `main`)

---

## 📚 Lis-moi en premier

| Doc | Pour qui | Quand |
|-----|----------|-------|
| [`ONBOARDING.md`](ONBOARDING.md) | **Nouveau collaborateur** | Premier contact avec le projet (15 min) |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Tous | Avant ton premier commit (Git workflow + PR) |
| [`SKILLS_BUNDLE.md`](SKILLS_BUNDLE.md) | Tous | Setup Claude Code identique (30 min) |
| [`brand/BRAND_BIBLE.md`](brand/BRAND_BIBLE.md) | Designer / dev | Avant tout travail visuel |
| [`brand/MOODBOARD.md`](brand/MOODBOARD.md) | Designer | Pour comprendre l'atmosphère |

---

## 🚀 Setup local (5 min)

```bash
git clone https://github.com/Maximgeb/kove.git
cd kove

nvm use                       # Node 20+
npm install
cp .env.example .env.local    # remplir les valeurs réelles
npm run dev                   # http://localhost:3000
```

Detail complet : voir [`ONBOARDING.md`](ONBOARDING.md).

---

## 🌿 Workflow Git (TL;DR)

**Jamais de push direct sur `main`.** Toujours via PR.

```bash
git checkout main && git pull
git checkout -b feature/ma-feature
# ... commits ...
git push origin feature/ma-feature
# Open PR → review → merge
```

Détail complet : voir [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## 🎨 Brand identity (TL;DR)

- **Couleurs** : Bleu `#3b82f6` + Cyan `#22d3ee` + Dark `#0f0f0f`
- **Fonts** : Space Grotesk (heading) + Inter (body) + Instrument Serif (italic emphasis)
- **Logo** : "Sliced K with cyan" — voir `brand/assets/`
- **Tone** : Direct + Premium + Rassurant. Sans hype.
- **❌ Jamais d'orange** (réservé écosystème Maxime Gebhart / Orbit Labs)

Détail complet : voir [`brand/BRAND_BIBLE.md`](brand/BRAND_BIBLE.md).

---

## 🛠️ Scripts utiles

```bash
# Dev
npm run dev                                              # serveur local
npm run build                                            # build prod
npm run lint                                             # ESLint

# Brand assets
node scripts/brand/generate-assets.mjs                   # favicon, OG, IG templates, moodboard
node scripts/brand/generate-triptychs.mjs                # triptyques Insta (3 posts = 1 image)
node --env-file=.env.local scripts/brand/generate-ai-logos-v2.mjs   # logos via Kie.ai
```

---

## 📂 Arborescence rapide

```
src/
├── app/        # Next.js app router (layout, page, globals.css)
└── components/ # navbar, hero, process, portfolio, pricing, faq, footer + ui/

public/         # assets servis directement (favicon, OG, logos, portfolio)
brand/          # source de vérité brand (BIBLE + MOODBOARD + assets + IG templates)
scripts/brand/  # génération automatisée des brand assets
```

---

## 🔗 Liens

- Repo : https://github.com/Maximgeb/kove
- Site live : https://web-production-996275.up.railway.app
- Domaine custom : `kove.fr` (configuration DNS en cours)
