# DDD Catalog Viewer

Catalogue interactif des **45 patterns Domain-Driven Design** (fondations, tactiques et stratégiques), pensé pour les architectes SI et solution. Chaque pattern présente le problème, la solution et un diagramme SVG. Les patterns stratégiques sont mis en avant, avec un regroupement dédié des relations de **Context Map**.

Application statique : HTML, CSS et JavaScript vanilla, sans dépendance, déployable sur GitHub Pages.

## Contenu

| Catégorie | Patterns |
|---|---|
| Stratégique | 24 (Bounded Context, Ubiquitous Language, Context Map et ses 9 relations, Distillation, Large-scale Structure) |
| Tactique | 17 (Building Blocks et Supple Design) |
| Fondations | 4 (Continuous Integration, Model-Driven Design, Hands-on Modelers, Refactoring Toward Deeper Insight) |

## Structure

```
index.html          Page (bandeau, filtres, panneau Concepts)
style.css           Styles (thème clair/sombre, mise en page responsive/iPhone)
app.js              Rendu des cartes, filtres, zoom diagramme, copie Markdown, état d'URL
data/patterns.json  Les 45 patterns (source unique des données, avec effets négatifs et liens croisés)
```

## Lancer en local

Le catalogue charge `data/patterns.json` via `fetch` : ouvrir `index.html` directement ne fonctionne pas, il faut un serveur HTTP.

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Déployer sur GitHub Pages

1. Pousser les fichiers à la racine du dépôt (branche `main`).
2. Dans **Settings > Pages**, choisir **Deploy from a branch**, branche `main`, dossier `/ (root)`.
3. Le site est servi à `https://<utilisateur>.github.io/<dépôt>/`.

## Ajouter ou modifier un pattern

Éditer `data/patterns.json`. Format d'une entrée :

```json
{
  "id": "mon-pattern",
  "name": "Mon Pattern",
  "cat": "strategique",
  "group": "IV. Context Mapping for Strategic Design",
  "problem": "…",
  "solution": "…",
  "note": "Complément optionnel (DDD Crew)",
  "src": "DDD Reference (Evans, 2015), p. 00",
  "dg": {
    "w": 640, "h": 190,
    "b": [{ "x": 10, "y": 20, "w": 250, "h": 150, "l": "Contexte A" }],
    "n": [{ "id": "a", "x": 50, "y": 70, "w": 170, "h": 60, "k": "root", "t": "Titre", "s": "sous-titre" }],
    "e": [{ "a": "a", "b": "b", "l": "libellé", "d": 1 }]
  }
}
```

- `cat` : `fondations`, `tactique` ou `strategique`.
- Les patterns dont `group` vaut `IV. Context Mapping for Strategic Design` alimentent l'onglet et le bloc **Context Map** (l'ordre d'affichage est défini par `ORDER` dans `app.js`).
- Types de nœuds `k` : `root`, `vo`, `ext`, `acl`, `core`, `gen`, `repo`.
- Arêtes `e` : `d: 1` pour un trait pointillé.
- `page` : numéro de page dans le livre (utilisé pour le lien direct vers le PDF, avec décalage `OFF` dans `app.js`).
- `summary`, `pShort`, `sShort` : accroche et versions courtes affichées sur la carte (le `problem`/`solution` complets restent dans le détail repliable).
- `tags` : mots-clés cliquables via la recherche.
- `neg` : effets négatifs `{ "t": titre, "d": description }` (2-3 par pattern, analyse rédactionnelle, hors sources).
- `see` : patterns liés `["id", "Nom affiché"]`.
- `crew` (optionnel) : `["Nom de l'outil", "URL"]` vers une ressource DDD Crew (canvas, etc.).

## Sources et licences

- *Domain-Driven Design Reference*, Eric Evans, 2015 (CC BY 4.0) : source principale, résumés reformulés et traduits en français. Le lien « Evans p. X » de chaque carte pointe vers le PDF officiel à la bonne page (décalage constant `OFF` dans `app.js`, à vérifier si une autre édition est utilisée).
- DDD Crew, https://github.com/ddd-crew (CC-BY-SA-4.0) : compléments sur le context mapping et liens vers certains canvas (Aggregate Design Canvas, Bounded Context Canvas, Core Domain Charts, Domain Message Flow Modelling).
- Les effets négatifs (`neg`) sont une analyse rédactionnelle, pas une traduction d'Evans ou de DDD Crew.

Merci de conserver l'attribution des deux sources.

## Changelog

### 2.0.0 - 2026-09-28
- Nouvelle mise en page façon EIP : bandeau de recherche, grille de cartes, diagramme visible en tête de carte (zoom au clic)
- Panneau « Concepts » replié par défaut (introduction au DDD + 5 définitions), à la place du gros bloc fixe
- Cartes raccourcies : accroche, Problème/Solution en 1-2 lignes, texte complet d'Evans replié en détail
- Ajout des effets négatifs (2-3 par pattern) et d'un bloc « Voir aussi » entre patterns liés
- Actions par carte : copier en Markdown, lien direct vers la page du PDF d'Evans, lien vers l'outil DDD Crew le cas échéant
- Bande Context Map compacte (relations par type) au lieu du bloc pleine largeur
- État de l'onglet et de la recherche conservé dans l'URL
- Optimisations iPhone : barre de filtres collante avec zone de sécurité, zoom diagramme adapté au petit écran, champ de recherche sans zoom auto iOS

### 1.0.0 - 2026-09-28
- Catalogue de 45 patterns avec diagrammes SVG
- Onglets Stratégique (par défaut), Context Map, Tactique, Fondations, Tous
- Bloc Context Map : relations regroupées par type (Mutually Dependent, Upstream/Downstream, Free)
- Introduction au DDD et recherche plein texte
- Thème clair/sombre automatique
