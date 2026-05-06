# Kove — Contributing

> Workflow Git pour bosser à 2 sans casser la prod. Lis-moi avant ton premier commit.

---

## 🚨 Règle d'or

**Jamais de push direct sur `main`. Toujours via Pull Request.**

`main` est branchée en auto-deploy Railway → chaque push sur `main` = déploiement immédiat en prod sur https://web-production-996275.up.railway.app

Conséquence : un commit cassé sur `main` = site cassé pour les vrais visiteurs.

---

## 🌿 Convention de branches

| Préfixe | Usage | Exemple |
|---------|-------|---------|
| `feature/` | Nouvelle section, page, composant | `feature/case-studies-page` |
| `fix/` | Bug fix | `fix/hero-mobile-overflow` |
| `brand/` | Assets visuels, copy, modifs design | `brand/update-pricing-copy` |
| `chore/` | Config, deps, tooling, docs | `chore/upgrade-framer-motion` |

**Règle de naming :** kebab-case, en anglais, court et explicite.

✅ `feature/portfolio-filter` — clair
❌ `feature/new-stuff` — vague
❌ `feature/Updated_Some_Things` — pas kebab-case

---

## 🔄 Workflow PR standard

```bash
# 1. Toujours partir du main à jour
git checkout main
git pull origin main

# 2. Créer ta branche
git checkout -b feature/ma-feature

# 3. Bosser, commit en petits incréments lisibles
git add <files>
git commit -m "feat: add hero CTA animation"

# 4. Push ta branche
git push origin feature/ma-feature

# 5. Ouvrir une PR sur GitHub
# → Description claire : "quoi", "pourquoi", "comment tester"
# → Tag l'autre pour review
# → Attendre 1 review minimum avant merge

# 6. Une fois mergée, supprimer ta branche locale
git checkout main
git pull origin main
git branch -d feature/ma-feature
```

---

## ✍️ Convention de commits

Format préféré (inspiré de [Conventional Commits](https://www.conventionalcommits.org/)) :

```
<type>: <description courte en français ou anglais, < 70 chars>

[corps optionnel : pourquoi ce changement]
```

**Types courants :**
- `feat:` — nouvelle feature
- `fix:` — bug fix
- `style:` — changements visuels (CSS, design tokens)
- `refactor:` — refactor sans changement de comportement
- `chore:` — config, deps, build
- `docs:` — doc / readme
- `perf:` — perf
- `brand:` — assets visuels, copy

**Exemples corrects :**
```
feat: add case studies page with carousel
fix: resolve hero overflow on mobile <375px
brand: update pricing copy to remove "boost" wording
chore: upgrade next from 16.2.3 to 16.3.0
```

---

## 🛡️ Branch protection sur `main`

À configurer **par Maxime** dans GitHub Settings → Branches → Add rule :

- [x] **Require a pull request before merging**
- [x] **Require approvals** : 1 minimum
- [x] **Dismiss stale reviews when new commits are pushed**
- [x] **Restrict who can push** : aucun (force tout le monde à passer par PR)
- [x] **Do not allow bypassing** : OFF (admin peut bypasser en cas d'urgence prod)
- [ ] Require status checks : à ajouter quand on aura des tests CI

URL : https://github.com/Maximgeb/kove/settings/branches

---

## 🤝 Comment éviter les conflits

### Avant de démarrer une session de travail
```bash
git checkout main
git pull origin main
```
Toujours partir d'une `main` à jour. Sinon, tu vas merger sur une base obsolète et créer des conflits.

### Pendant que tu codes
- Si la session est longue (>2h), `git pull origin main` régulièrement **pendant que tu es sur `main`** (pas sur ta branche).
- Sur ta branche : `git fetch origin && git rebase origin/main` pour rebaser proprement.

### Communiquer en amont
Quand tu touches à un fichier critique, **préviens** l'autre avant :
- `src/app/globals.css` (palette, fonts, classes globales)
- `src/app/layout.tsx` (metadata, fonts loaders)
- `src/components/navbar.tsx` / `src/components/footer.tsx` (logo)
- `package.json` (deps)
- `CLAUDE.md` / `AGENTS.md` (règles projet)
- `brand/BRAND_BIBLE.md` (règles brand verrouillées)

Un message simple type *"je touche à globals.css pour ajouter la nouvelle classe .pill-glass-cyan, ETA 30 min"* évite 100% des conflits.

---

## 🔥 Procédure d'urgence : prod cassée

Si après un merge sur `main` le site est down :

### Option A — Rollback Railway (le plus rapide)
1. Aller sur https://railway.app/dashboard
2. Sélectionner le projet Kove → service `web`
3. Onglet **Deployments**
4. Trouver le dernier deploy qui marchait → **... → Redeploy**
5. Site live revient sur l'ancien build en ~30 sec

### Option B — Revert via Git
```bash
git checkout main
git pull origin main
git revert <commit-hash-cassé>
git push origin main
# → Railway redeploy automatiquement la version corrigée
```

### Après l'urgence
- Ouvrir une issue GitHub avec un postmortem rapide (3 lignes : qu'est-ce qui s'est cassé, pourquoi, comment on évite ça à l'avenir)
- Ajouter un test ou une vérif manuelle dans la PR template

---

## 📋 PR template (à coller dans la description)

```markdown
## Quoi
<une phrase>

## Pourquoi
<contexte / problème résolu>

## Comment tester
- [ ] Étape 1
- [ ] Étape 2

## Captures
<screenshots avant/après si visuel>

## Checklist
- [ ] `npm run build` passe sans erreur
- [ ] `npm run lint` passe sans warning
- [ ] Aucun orange / vert utilisé (brand check)
- [ ] Testé sur mobile (375px) et desktop (1440px)
- [ ] Pas de console.log / debugger oublié
```

---

## 🤔 Quand merger sans review (cas exceptionnels)

3 scénarios où tu peux merger toi-même sans attendre l'autre :

1. **Prod cassée + l'autre est pas dispo** → fix d'urgence + revert si nécessaire
2. **Typo / lint fix purement cosmétique** sans aucun impact sur la logique ou le visuel
3. **Update README ou doc interne** sans changement de code

**Dans tous les autres cas : attendre la review.** L'œil neuf attrape 80% des bugs et 100% des "off-brand" qu'on ne voit plus à force d'avoir le nez dedans.

---

## 🔐 Gestion des secrets

**Règle absolue** : aucune clé API, token, ou credential ne doit JAMAIS être committé.

`.gitignore` bloque déjà :
- `.env*` (toutes les variantes)
- `.env.local` (notre fichier de secrets)

**Le partage de secrets se fait :**
- ✅ Via 1Password / Bitwarden (idéal)
- ✅ Via iMessage privé (ok si pas d'option meilleure)
- ❌ JAMAIS via Slack / Discord public / mail / commit

**Si tu dois ajouter une nouvelle var d'env** :
1. L'ajouter dans `.env.local` (pour toi)
2. L'ajouter dans `.env.example` avec un placeholder + commentaire (`MA_KEY=YOUR_VALUE_HERE  # description`)
3. L'ajouter dans Railway Settings → Variables (pour la prod)
4. Prévenir l'autre pour qu'il l'ajoute aussi à son `.env.local`

---

## 🧪 Avant de push

Lance toujours :
```bash
npm run lint
npm run build
```

Et idéalement :
- Test manuel sur `npm run dev` (golden path + edge cases)
- Test responsive (375px / 768px / 1440px) via DevTools

---

## 📞 Communication PR

- **Tagger l'autre** dès la création de la PR (`@username` dans la description)
- **Commenter dans la PR** (pas en DM) : ça reste tracé
- **Resolve les conversations** une fois corrigées
- **Approuver explicitement** via le bouton GitHub avant merge

---

**Lis aussi :** [`ONBOARDING.md`](ONBOARDING.md) · [`SKILLS_BUNDLE.md`](SKILLS_BUNDLE.md)
