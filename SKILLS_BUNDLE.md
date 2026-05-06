# Kove — Setup Claude Code Identique

> Pour avoir le **même rendu et les mêmes capacités** que Maxime sur le projet, configure ton environnement Claude Code avec les skills + MCP servers ci-dessous.
>
> Temps total : ~30 minutes.

---

## 🎯 Pré-requis machine

- ✅ macOS, Linux ou Windows (WSL2)
- ✅ **Claude Code** installé : https://claude.ai/code (CLI ou desktop)
- ✅ **Node.js 20+** : `nvm install 20 && nvm use 20` ou via brew
- ✅ **Git configuré** avec ton compte GitHub
- ✅ Compte Claude actif (Pro ou Team)

Vérifie :
```bash
claude --version    # doit afficher Claude Code X.X.X
node --version      # doit afficher v20.x ou plus
git --version
```

---

## 📦 Skills Claude Code à installer

Les skills sont des extensions qui donnent à Claude Code des compétences spécialisées. Voici ceux qu'on utilise sur Kove.

### Méthode 1 — Marketplace officielle (le plus simple)

Dans Claude Code, tape :
```
/plugin marketplace add anthropics/skills
/plugin
```

Puis cherche et installe chacun de ces skills :

#### Skills design / frontend (essentiels pour Kove)

| Skill | Pourquoi | Source |
|-------|---------|--------|
| `frontend-design` | Composants React production-grade premium | Officiel Anthropic |
| `web-artifacts-builder` | HTML artifacts complexes (React + Tailwind + shadcn/ui) | Officiel Anthropic |
| `theme-factory` | Application de thèmes sur artifacts | Officiel Anthropic |
| `brand-guidelines` | Pattern doc brand structuré | Officiel Anthropic |
| `canvas-design` | Génération PNG/PDF (posters, moodboards) | Officiel Anthropic |

#### Skills "design taste" (style premium)

| Skill | Pourquoi | Source |
|-------|---------|--------|
| `taste-soft` | Look "agence premium" haut de gamme | Communauté |
| `taste-minimalist` | UI clean éditoriale | Communauté |
| `taste-redesign` | Upgrade sites existants vers premium | Communauté |
| `taste-frontend` | Architecture senior UI/UX | Communauté |
| `taste-stitch` | Design system sémantique | Communauté |
| `taste-output` | Anti-troncature output | Communauté |
| `taste-gpt-tasteskill` | GSAP motion + AIDA layout | Communauté |

Marketplaces communautaires recommandées (à ajouter avant de chercher les `taste-*`) :
```
/plugin marketplace add alirezarezvani/claude-skills
```

#### Skills custom (Maxime te les partagera directement)

Ces skills ne sont pas dans une marketplace publique. Maxime te zip son dossier `~/.claude/skills/<nom>/` et tu les colles dans le tien :

| Skill | Pourquoi |
|-------|----------|
| `design` | Conseil UI/UX + branding personnalisé |
| `clone-website` | Reverse-engineering pixel-perfect |
| `21st-sdk` | Composants 21st.dev premium |

**Méthode d'install manuelle** :
```bash
mkdir -p ~/.claude/skills/<nom>
# Maxime te zip le dossier ~/.claude/skills/design/ → tu unzip dedans
# Puis dans Claude Code :
/reload-plugins
```

### Vérifier les skills installés
```bash
claude plugin list 2>/dev/null   # ou via /plugin dans Claude Code
ls ~/.claude/skills/             # voir tous les skills installés
```

---

## 🔌 MCP Servers à configurer

Les MCP donnent à Claude Code des capacités externes (web, GitHub, devtools…).

### Fichier de config : `~/.claude/settings.json`

Ajoute ces serveurs dans la section `mcpServers` :

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_YOUR_TOKEN_HERE"
      }
    },
    "lottiefiles-creator": {
      "command": "npx",
      "args": ["-y", "@lottiefiles/creator-mcp@latest"]
    }
  }
}
```

### À quoi sert chaque MCP

| MCP | Usage Kove |
|-----|------------|
| **`context7`** | Récupère les docs à jour de Next.js / React / Tailwind / Framer Motion. Indispensable pour Next 16 (la doc bundlée est plus fraîche que les sources web). |
| **`chrome-devtools`** | DevTools dans Claude. Inspect / debug / screenshot direct depuis la conversation. |
| **`github`** | Gérer issues, PRs, comments depuis Claude. Pour ça, génère un Personal Access Token : https://github.com/settings/tokens → scopes `repo` + `workflow`. |
| **`lottiefiles-creator`** | Créer des animations Lottie quand on en aura besoin (micro-interactions). |

### Optionnel (selon ton usage)

```json
{
  "postiz": {
    "command": "npx",
    "args": ["-y", "supergateway", "--streamableHttp", "https://mcp.postiz.com/mcp/YOUR_TOKEN"]
  },
  "railway": {
    "command": "npx",
    "args": ["-y", "@railway/mcp-server"]
  }
}
```

- **`postiz`** : programmer des posts Instagram/LinkedIn directement depuis Claude (utile pour les triptyques Kove).
- **`railway`** : déploiements Railway depuis Claude.

### Recharger après config
Quitter complètement Claude Code et le redémarrer pour charger les MCP.

---

## 🧠 Contexte projet Kove (auto-chargé)

Bonne nouvelle : tu n'as **rien à configurer** côté contexte.

Le repo contient déjà :
- `Kove/CLAUDE.md` (charge automatiquement quand Claude Code ouvre le projet)
- `Kove/AGENTS.md` (warning Next 16 breaking changes)

⚠️ **Important** : ton `~/.claude/CLAUDE.md` global ne sera **PAS** comme celui de Maxime (qui contient son setup mentor + RTK + structure workspace personnel). C'est OK : le `CLAUDE.md` du projet Kove suffit pour toutes les sessions liées à Kove.

---

## 📚 Fichiers de référence (déjà dans le repo)

Une fois cloné, tu as accès à :

| Fichier | Quand l'utiliser |
|---------|------------------|
| `brand/BRAND_BIBLE.md` | Avant tout travail visuel — règles brand verrouillées |
| `brand/MOODBOARD.md` | Atmosphère, références visuelles, anti-patterns |
| `brand/logo-options/ai-generated-v2/COMPARE.html` | Itérations historiques du logo (visuel) |
| `brand/logo-options/ai-generated-v2/manifest.json` | Prompts utilisés pour la génération IA des logos |
| `brand/instagram/triptychs/PUBLISH_ORDER.md` | Comment publier les triptyques pour aligner le grid Insta |
| `scripts/brand/generate-*.mjs` | Scripts pour régénérer les assets via Playwright + Kie.ai |

---

## ✅ Validation : ton setup est OK si…

Lance ces tests :

1. **Skills présents** :
   ```bash
   ls ~/.claude/skills/ | grep -E "(frontend-design|brand-guidelines|design|taste-soft)"
   ```
   Doit lister au minimum ces 4 skills.

2. **MCPs actifs** : dans Claude Code, tape `/mcp` (ou check `~/.claude/settings.json`).
   Doit montrer `context7`, `chrome-devtools`, `github`.

3. **Projet Kove cloné + lance** :
   ```bash
   cd kove && npm run dev
   ```
   Doit afficher `localhost:3000` sans erreur.

4. **Test fonctionnel Claude Code** : ouvre Claude Code dans le dossier `kove/`, demande :
   > "Lis brand/BRAND_BIBLE.md et résume-moi la palette de couleurs Kove"

   Si Claude répond avec `#3b82f6` + `#22d3ee` + `#0f0f0f`, tout marche.

---

## 🆘 Troubleshooting

| Problème | Solution |
|----------|----------|
| `claude: command not found` | Réinstaller Claude Code depuis https://claude.ai/code |
| MCP `github` refuse | Vérifier que ton PAT a les scopes `repo` + `workflow` |
| `/plugin marketplace add` échoue | Vérifier ta connexion + retenter, ou installer manuellement (zip) |
| Skill custom ne charge pas | `/reload-plugins` dans Claude Code, sinon redémarrer |
| `node --version` < 20 | `nvm install 20 && nvm use 20` |

---

## 📖 Ressources additionnelles

- Doc complète Claude Skills : https://claude.ai/help/skills
- Doc MCP : https://modelcontextprotocol.io/
- Marketplace centralisée : https://claudeskills.info/
- Setup web creation référence (workspace global Maxime) : `Data/SETUP_WEB_CREATION.md` (hors-repo, à demander)

---

**Lis aussi :** [`ONBOARDING.md`](ONBOARDING.md) · [`CONTRIBUTING.md`](CONTRIBUTING.md)
