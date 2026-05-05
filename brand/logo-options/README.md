# Logo Options — Archive

> **Le logo Kove est verrouillé** : "Sliced K with cyan" (référence : `ai-generated/02-sliced-K-cyan.png`).
> Les fichiers vectorisés finaux sont dans `Kove/brand/assets/`.

## Structure

- `ai-generated/` — Les 8 propositions Kie.ai (Flux Kontext Pro) générées le 2026-05-05
  - `02-sliced-K-cyan.png` est le logo retenu (référence visuelle)
  - `COMPARE.html` permet de comparer toutes les propositions
- `_archive/` — Anciennes propositions SVG manuelles (v1-slice / v2-spark / v3-block / v4-orbit) — non retenues, gardées pour référence

## Itérer

Pour générer de nouvelles variations sur le concept retenu :

```bash
cd Kove
node --env-file=.env.local scripts/brand/generate-ai-logos.mjs
```

(Modifier les prompts dans `scripts/brand/generate-ai-logos.mjs` avant de relancer.)
