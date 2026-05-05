# Kove — Brand Bible

> Source de vérité unique. Toute communication Kove (site, Instagram, DM, devis, factures) doit s'aligner sur ce document.

**Dernière mise à jour :** 2026-05-05
**Verrouillé par :** Maxime Gebhart

---

## 1. Mission & Positionnement

### Mission
Construire des sites web premium pour les fondateurs qui n'ont pas le temps d'attendre et n'acceptent pas le générique.

### Positionnement
Kove est l'agence web qui livre en **48-72h ce que les autres mettent 6 semaines à faire**, grâce à une stack IA propriétaire et une exécution sans compromis design.

### Promesse principale
> *"Votre site premium, livré avant {jour}."*

### Différenciateurs
- ⚡ **Vélocité** : 48h pour la première maquette, 7 jours max pour la livraison
- 🎯 **Qualité** : 95+ score PageSpeed, design pixel-perfect, code optimisé
- 🚫 **Anti-template** : aucun WordPress recyclé, aucun thème acheté
- 🔒 **Discret** : pas de "agence", pas d'équipe en marbre — un builder, des résultats

### Anti-positioning (ce que Kove n'est PAS)
- ❌ Pas une agence corporate (pas de "nous", pas d'équipe)
- ❌ Pas un freelance générique (pas de Fiverr, pas de templates)
- ❌ Pas une plateforme no-code (pas de Webflow templates, pas de Wix)
- ❌ Pas de SaaS (pas de produit récurrent — c'est une prestation)

### ICP (Ideal Customer Profile)
- Fondateur SaaS / agence / e-commerce premium FR
- 100K-2M€ CA annuel
- A déjà essayé une agence ou un freelance et a été déçu (lent, générique, mal géré)
- Veut un site qui **représente** sa boîte au niveau premium, pas juste "un site qui marche"

---

## 2. Story du nom Kove

> **Kove** vient de l'anglais *cove* — la crique. Un refuge. Un endroit à l'abri du bruit et des templates génériques. Votre site Kove est un cove dans un océan de bruit web : court, précis, mémorable, premium.

**Alternative narrative** (si l'angle "refuge" ne sonne pas) : *kov* signifie **métal** en tchèque/slovaque. Kove = un site forgé, pas moulé. Solide, durable, taillé sur mesure.

**À utiliser dans les pitchs** : choisir UNE des deux narratives et s'y tenir. Ne jamais hésiter en pitch.

---

## 3. Palette Couleurs (VERROUILLÉE)

### Couleurs primaires

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **accent-brand** | `#3b82f6` | `59, 130, 246` | CTA, accents, italics emphasis, glows |
| **accent-brand-hover** | `#2563eb` | `37, 99, 235` | Hover state CTA |
| **accent-cyan** | `#22d3ee` | `34, 211, 238` | TechLines, micro-accents, live dots |
| **accent-cyan-soft** | `rgba(34, 211, 238, 0.14)` | — | TechLines fade, soft halos |
| **accent-ring** | `rgba(59, 130, 246, 0.35)` | — | Focus rings, button glows |

### Couleurs neutres (dark mode = mode principal)

| Token | Hex | Usage |
|-------|-----|-------|
| **background** | `#0f0f0f` | Background principal du site |
| **background-alt** | `#131316` | Cards, sections alternées |
| **background-deep** | `#000000` | Footer, sections deep |
| **foreground** | `#ffffff` | Texte principal sur dark |
| **foreground-dim** | `#abaaa8` | Texte secondaire, captions |

### Couleurs neutres (sections light, exception)

| Token | Hex | Usage |
|-------|-----|-------|
| **surface-light** | `#f7f7f8` | Sections light (Process, Pricing alt) |
| **surface-light-text** | `#0f0f0f` | Texte sur surface light |
| **surface-light-muted** | `#5e5f6e` | Texte muted sur surface light |

### Règles d'usage

✅ **À FAIRE**
- Bleu `#3b82f6` = couleur DOMINANTE des CTA et emphasis (italics)
- Cyan `#22d3ee` = accent SECONDAIRE (techlines, live dots, micro-glows)
- Ratio bleu/cyan dans un visuel : **80/20** (cyan est ponctuel, jamais dominant)
- Toujours sur fond sombre `#0f0f0f` ou `#000000` — jamais blanc pur

❌ **À NE PAS FAIRE**
- ❌ JAMAIS d'orange (réservé écosystème Maxime Gebhart + Orbit Labs)
- ❌ JAMAIS de vert (réservé Savi)
- ❌ Pas de violet, rose, jaune
- ❌ Pas de gradients arc-en-ciel
- ❌ Pas de bleu + cyan en blocs égaux côte à côte

---

## 4. Typographie

### Stack (déjà en prod via `Kove/src/app/layout.tsx`)

| Rôle | Font | Source | Usage |
|------|------|--------|-------|
| **Headings** | **Space Grotesk** | Google Fonts | H1-H6, statistiques, labels nav |
| **Body** | **Inter** | Google Fonts | Paragraphes, descriptions, UI |
| **Emphasis italic** | **Instrument Serif** | Google Fonts | Italics dans headings (`.heading-italic`) |
| **Mono / labels** | Mono système | — | Timestamps, code, captions techniques |

### Hiérarchie (déjà appliquée dans le site)

```
H1 (hero)        Space Grotesk Medium  clamp(2.5rem, 7vw, 5.75rem)  letter-spacing: -0.035em  line-height: 1.02
H2 (sections)    Space Grotesk Medium  clamp(1.75rem, 3.8vw, 2.5rem)  letter-spacing: -0.03em
H3 (cards)       Space Grotesk Medium  22-26px  letter-spacing: -0.02em
Body L           Inter Regular         16-19px  line-height: 1.6
Body S / caption Inter Regular         11-13px  letter-spacing: 0.14em uppercase
Italic emphasis  Instrument Serif      hérite taille parent  italic style
```

### Règle d'or
**1 italic par titre maximum.** Toujours un mot-clé, jamais une phrase entière. Couleur de l'italic = `#3b82f6` (accent-brand).

Exemples corrects :
- "Votre site premium, livré *avant dimanche*."
- "Du brief au live, *en temps réel*."
- "Des résultats, pas des *promesses*."

---

## 5. Tone of Voice

### Vibe globale
**Direct + Premium + Rassurant**.
Comme un menuisier expert qui te montre le bois plutôt que de te vendre un rêve. Chiffres précis, pas de bullshit, confiance silencieuse.

### Caractéristiques
- **Direct** : phrases courtes, verbes d'action, pas de circonlocutions
- **Premium** : vocabulaire métier ("brief", "maquette", "stack"), pas de jargon corporate
- **Rassurant** : chiffres précis, jamais de "à peu près", deadlines explicites
- **Sans hype** : pas de "révolutionnaire", "incroyable", "boostez votre business"
- **Confiance silencieuse** : on affirme sans crier (pas de CAPS LOCK, pas de !!!)

### Mots à UTILISER

**Vocabulaire signature :**
- Premium, livré, optimisé, pixel-perfect
- Stack IA, score PageSpeed, responsive
- 48h, 72h, 7j (chiffres précis)
- Brief, maquette, live, déployé
- Votre site, votre brand, votre projet

**Tournures préférées :**
- "Votre site premium, livré avant X."
- "Pas de templates. Pas de compromis."
- "Des résultats, pas des promesses."
- "Du brief au live, en temps réel."

### Mots à BANNIR

❌ "Solutions sur mesure" → **dire** "Votre site, taillé sur mesure"
❌ "Boostez votre visibilité" → **dire** "95+ PageSpeed"
❌ "Notre équipe d'experts passionnés" → **dire** "Je"
❌ "Révolutionnaire", "innovant", "disruptif" → **dire** rien, montrer le résultat
❌ "Le meilleur de…" → **dire** "Premium"
❌ "Votre partenaire de confiance" → **dire** rien, le client s'en rend compte
❌ "Augmentez vos conversions de 300%" → **dire** des cas réels avec chiffres réels

### Émojis
**Quasi-bannis.** Si nécessaire :
- ✓ (validation, checkmark)
- ⚡ (vitesse — usage rare)
- → (flèche, navigation)

JAMAIS : 🔥, 🚀, 💎, 💯, 🎯, 🤩, ✨ (génériques tech-bro/marketing).

---

## 6. Signatures Visuelles

Ces éléments sont propres à Kove. Ils doivent apparaître dans 80% des assets.

### TechLines (signature #1)
- 2 lignes verticales **cyan #22d3ee** sur les bords du contenu
- Gradient fade en haut/bas
- Live dot animé qui voyage haut → bas en boucle (7s)
- Présentes dans hero, portfolio, process
- **Sur Instagram** : reproduire en 2 traits cyan sur les bords des templates

### Glass Cards
- Fond `rgba(255, 255, 255, 0.02)` + border `rgba(255, 255, 255, 0.08)`
- `backdrop-blur-md` (jamais xl, jamais 2xl)
- Hover : background → 0.04, border → 0.15
- Utilisé pour : project mockups, pricing cards, CTA cards

### Aurora Shader (hero only)
- WebGL aurora full-bleed en background du hero
- Tons bleu/cyan/dark, low opacity overlay
- Pause auto si tab caché ou offscreen (perf)
- **Pour assets statiques** : reproduire via gradient radial bleu+cyan flou sur fond noir

### Italic emphasis (signature #2)
- 1 mot dans chaque titre H1/H2 en `Instrument Serif italic` couleur `#3b82f6`
- Utilisé partout : hero, sections, captions

### Section Curves
- Border-radius 56px en bas de chaque section
- Subtle highlight stroke avec gradient cyan
- Effet "cups qui s'emboîtent"

### Live Dot
- Cercle 8px cyan `#22d3ee`
- Pulse animation 2s
- Outer ring glow
- Utilisé dans badge "3 places restantes"

### Grain Overlay
- SVG noise fractal
- Opacity 0.035, mix-blend-mode overlay
- Sur tout le site, subtil, jamais visible directement

---

## 7. Direction Photo / Mockups

### Style des screenshots projets
- Toujours présentés dans un **frame navigateur dark** (3 dots gris + URL bar)
- Ratio 16:9 ou 4:5
- `object-cover object-top` pour montrer le hero
- Border `rgba(255, 255, 255, 0.08)`, shadow `0 20px 50px -20px rgba(0,0,0,0.6)`

### Photo direction Instagram
- ✅ **Mockups de sites Kove** dans des frames laptop / iPhone
- ✅ **Captures du process** (Figma, code editor, terminal)
- ✅ **Before/after** (template générique → site Kove)
- ✅ **Stats overlay** sur fond dark (95+, 48h, etc.)

### Anti-photo (à bannir)
- ❌ Stock photos handshake, businessman, lightbulb
- ❌ Photos de "team d'agence" (faux)
- ❌ Photos de bureaux design qui ne sont pas les nôtres
- ❌ Selfies professionnels en costume cravate
- ❌ Mockups génériques d'iPhone vide / placeholder

---

## 8. Logo & Assets — VERROUILLÉ (2026-05-05)

### 🔒 Identité visuelle officielle : "Sliced K with cyan"

Le logo Kove est composé d'un **K géométrique en 3 parties** :
1. **Stem** (barre verticale) — blanc `#ffffff`
2. **Bras supérieur** (parallélogramme oblique vers haut-droite) — blanc `#ffffff`
3. **Bras inférieur** (parallélogramme oblique vers bas-droite) — **CYAN `#22d3ee`** ← signature

> Le bras cyan en bas-droite est la signature de Kove. Il représente le "signal" — la patte qui se distingue, le détail qui rend le K reconnaissable. **Ne jamais inverser** (cyan en haut, blanc en bas).

### Géométrie (viewBox 100×100)
- Stem : `x=22, y=22, width=13, height=56`
- Bras haut : `polygon 35,50 → 49,50 → 76,22 → 62,22` (white)
- Bras bas : `polygon 35,50 → 49,50 → 76,78 → 62,78` (cyan)

### Wordmark
- Texte "Kove" en **Space Grotesk Medium**, font-size 62, letter-spacing -2.5
- Version dark : K (blanc + cyan) + texte blanc sur fond `#0f0f0f`
- Version light : K (dark + cyan) + texte `#0f0f0f` sur fond blanc

### Espace de protection
Autour du logo, garder une marge équivalente à la **largeur du stem** (≈9.5px sur lockup), minimum.

### Tailles minimum
- Favicon (32px) : OK
- Touch icon (180px) : OK
- Lockup wordmark : ne jamais descendre sous 32px de hauteur sinon le K perd sa lisibilité

### Fichiers source

| Asset | Path | Format |
|-------|------|--------|
| Monogram (avec fond dark) | `brand/assets/monogram-K.svg` | SVG |
| Monogram (transparent) | `brand/assets/monogram-K-transparent.svg` | SVG |
| Wordmark (dark bg) | `brand/assets/logo-wordmark.svg` | SVG |
| Wordmark (light bg) | `brand/assets/logo-wordmark-on-light.svg` | SVG |
| Lockup avec tagline | `brand/assets/logo-lockup.svg` | SVG |
| Favicon site | `brand/assets/favicon.svg` | SVG |
| Apple touch icon | `brand/assets/apple-touch-icon.png` | PNG 180×180 |
| Open Graph | `brand/assets/og-image.png` | PNG 1200×630 |
| OG square | `brand/assets/og-image-square.png` | PNG 1200×1200 |

### Origine
Logo généré via Kie.ai (Flux Kontext Pro) puis vectorisé en SVG manuel pour précision géométrique. Référence du concept original : `brand/logo-options/ai-generated/02-sliced-K-cyan.png`.

### À ne JAMAIS faire
- ❌ Inverser les couleurs des bras (cyan en haut, blanc en bas)
- ❌ Mettre les 2 bras en cyan
- ❌ Mettre les 2 bras en blanc (perd la signature)
- ❌ Ajouter un dégradé (rester en aplat solide)
- ❌ Tilter le K (rester droit, vertical)
- ❌ Mettre le logo sur fond saturé (bleu clair, vert, orange) — toujours dark `#0f0f0f`/`#000000` ou blanc

---

## 9. Application Instagram (specs templates)

### Posts (1080×1080)

**Composition standard :**
- Fond : `#0f0f0f` ou `#000000`
- Marges externes : 80px (safe zone)
- TechLines verticales cyan sur bords gauche/droite, marge 60px du bord
- Logo wordmark Kove en bas-centre, blanc, opacity 0.6, 24px de hauteur
- Contenu principal centré verticalement

**Templates fournis :**
1. **post-quote** : citation/value prop, type Space Grotesk 64-80px, italic accent #3b82f6
2. **post-project-showcase** : mockup site dans frame navigateur, titre + tags
3. **post-before-after** : split horizontal, "Avant" gauche / "Après Kove" droite
4. **post-stat-highlight** : gros chiffre central (200-300px), description en dessous
5. **post-process-step** : numéro étape + titre + description courte

### Stories (1080×1920)

**Composition standard :**
- Fond : `#0f0f0f` ou `#000000`
- Safe zone Instagram : 250px en haut, 250px en bas (UI Instagram)
- TechLines verticales pleine hauteur
- Logo wordmark en bas, marge 200px du bord bas
- Contenu principal centré dans la safe zone

**Templates fournis :**
1. **story-default** : template vide, layout cohérent
2. **story-quote** : citation grand format vertical
3. **story-cta-link** : "Lien en bio" / swipe up CTA

---

## 10. Checklist avant de publier

Avant chaque post Instagram, vérifier :

- [ ] Aucune trace d'orange dans l'image
- [ ] Bleu `#3b82f6` ou cyan `#22d3ee` présent (pas de noir et blanc pur)
- [ ] Police = Space Grotesk (titre) + Inter (body)
- [ ] Logo wordmark Kove visible (en bas, discret)
- [ ] TechLines présentes sur les bords
- [ ] Tonalité : direct + premium + sans hype
- [ ] Aucun mot banni (cf. section 5)
- [ ] Aucun emoji coloré (✓ uniquement OK)
- [ ] Si chiffre : précis (pas "+50%", mais "95+ PageSpeed")
- [ ] Lecture : message clair en moins de 3 secondes

---

## 11. Cohérence écosystème

Kove fait partie de l'écosystème **Maxime Gebhart** :

| Brand | Couleur | Vibe | Cible |
|-------|---------|------|-------|
| **Kove** | Bleu #3b82f6 + Cyan | Tech, Premium, Rapide | Fondateurs SaaS/Agence/E-com FR |
| **Savi** | Vert #25D366 | Calme, Rassurant | Shopify FR (SAV IA SaaS) |
| **Orbit Labs** | Orange #FF5A1F | Énergie, Sharp | Marques e-com (UGC factory) |
| **Maxime Gebhart** | Orange #FF6B35 | Builder, Direct | Hub personnel |

**Règle écosystème :** Chaque brand est autonome. Kove ne mentionne pas Savi/Orbit dans ses comms (sauf cas très spécifique de portfolio/cross-sell). Le fil rouge n'est pas la couleur — c'est la qualité d'exécution.

---

## 12. Évolution du document

Ce document est **vivant**. Update à chaque :
- Décision design majeure
- Test marketing avec retour client significatif
- Ajout de section/page sur le site
- Lancement nouveau format Instagram

**Prochain check :** après les 5 premiers posts Instagram → ajuster ce qui marche/ne marche pas.
