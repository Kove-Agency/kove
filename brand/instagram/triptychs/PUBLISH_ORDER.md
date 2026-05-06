# Triptychs Instagram — Ordre de Publication

> Chaque triptyque = **3 posts qui forment 1 image continue** sur le grid Instagram.

---

## ⚡ Comment ça marche

Sur le profil Instagram, les posts s'affichent du plus récent au plus ancien, par lignes de 3 colonnes :

```
[ Post le + récent ]   [ avant-dernier ]   [ 3e + récent ]
[ 4e ]                 [ 5e ]              [ 6e ]
...
```

Pour qu'un triptyque s'aligne sur une ligne du grid, il faut publier les 3 posts **dans l'ordre inverse** (3 → 2 → 1) pour que le post #1 atterisse à gauche.

---

## 📋 Ordre de publication par triptyque

Pour chaque dossier (`01-manifesto`, `02-process`, etc.) :

1. **Publier `3.png` en PREMIER**
2. **Attendre que le post soit publié, puis publier `2.png`**
3. **Enfin, publier `1.png`**

⚠️ **Ne pas changer la légende ou re-uploader** entre les 3 — ça décale l'ordre.

⚠️ **Ne pas publier 2 triptyques en même temps** — finalise un triptyque (les 3 posts) avant de passer au suivant. Sinon le grid se décale.

---

## 📁 Triptychs disponibles

| Dossier | Concept | Quand l'utiliser |
|---------|---------|------------------|
| `01-manifesto/` | "Pas de templates. Pas de compromis." | Lancement compte / re-statement DA |
| `02-process/` | Brief → Maquette → Live (ligne cyan qui traverse) | Présenter ton process |
| `03-stats/` | 48h · 95+ · 7j (gros chiffres) | Proof / différenciation |
| `04-hero-brand/` | Logo K monumental + tagline | Annonce / mois nouveau |
| `05-before-after/` | Avant template → Après Kove | Études de cas |
| `06-disponibilites/` | "3 places restantes ce mois" | Acquisition / urgence |

---

## 🔧 Workflow concret (exemple)

**Tu veux publier le triptyque "Manifesto" (`01-manifesto/`) :**

1. Ouvre Instagram (ou Postiz)
2. Upload `01-manifesto/3.png` → caption courte → publish
3. Attends 30s, refresh ton profil — vérifie que `3.png` est en haut-gauche
4. Upload `01-manifesto/2.png` → caption → publish
5. Attends 30s, vérifie que `2.png` est en haut-gauche, `3.png` à droite
6. Upload `01-manifesto/1.png` → caption → publish
7. Sur le grid : `1.png` (gauche) | `2.png` (centre) | `3.png` (droite) — l'image continue est reformée ✓

---

## 💡 Captions recommandées par triptyque

### `01-manifesto/`
1. (image gauche) → caption : *"Pas de"*
2. (image milieu) → caption : *"Templates."*
3. (image droite) → caption : *"Pas de compromis. — Sites web premium par Kove."*

### `02-process/`
1. (gauche) → *"Étape 1 : le brief. Vocal ou Notion. Je réponds en 24h."*
2. (milieu) → *"Étape 2 : la maquette. Premier draft en 48h. On itère ensemble."*
3. (droite) → *"Étape 3 : le live. En ligne en 7 jours max, sur ton domaine."*

### `03-stats/`
1. (gauche) → *"48h pour la première maquette. Pas une de plus."*
2. (milieu) → *"95+ score PageSpeed. Garanti."*
3. (droite) → *"7 jours pour livrer. Brief lundi, live vendredi."*

### `04-hero-brand/`
1. (gauche) → *"Kove. Sites premium en 48-72h."*
2. (milieu) → *"Pas une agence. Pas un freelance. Un builder qui livre."*
3. (droite) → *"→ Lien en bio pour briefer."*

### `05-before-after/`
1. (gauche) → *"Avant : template Wix. Lent. Générique."*
2. (milieu) → *"5 jours plus tard : refonte complète."*
3. (droite) → *"Après : Next.js, 95+ PageSpeed, pixel-perfect."*

### `06-disponibilites/`
1. (gauche) → *"Disponible ce mois-ci pour briefs sérieux."*
2. (milieu) → *"3 places. Pas une de plus."*
3. (droite) → *"→ koveagency.fr — réserve ton créneau."*

---

## 🛠️ Pour générer de nouvelles variantes

```bash
cd Kove
node scripts/brand/generate-triptychs.mjs
```

(Modifier les contenus des triptyques dans `scripts/brand/generate-triptychs.mjs`.)
