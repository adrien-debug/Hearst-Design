# 🤝 Guide de Contribution — Hearst Design

Merci de votre intérêt pour contribuer à **Hearst Design** ! Ce document vous guide à travers le processus de contribution.

---

## 📋 Table des Matières

1. [Code de Conduite](#code-de-conduite)
2. [Comment Contribuer](#comment-contribuer)
3. [Structure du Projet](#structure-du-projet)
4. [Standards de Code](#standards-de-code)
5. [Workflow Git](#workflow-git)
6. [Tests](#tests)
7. [Documentation](#documentation)

---

## 📜 Code de Conduite

En participant à ce projet, vous acceptez de respecter notre code de conduite :

- **Respect** : Traitez tous les contributeurs avec respect
- **Inclusivité** : Soyez accueillant envers tous les niveaux d'expérience
- **Professionnalisme** : Maintenez un environnement professionnel
- **Collaboration** : Travaillez ensemble pour améliorer le projet

---

## 🚀 Comment Contribuer

### 1. Signaler un Bug

Avant de créer une issue :
- Vérifiez que le bug n'a pas déjà été signalé
- Testez sur la dernière version
- Collectez les informations de debugging

**Template d'Issue Bug :**
```markdown
## Description
[Description claire du bug]

## Étapes de Reproduction
1. Aller à '...'
2. Cliquer sur '...'
3. Voir l'erreur

## Comportement Attendu
[Ce qui devrait se passer]

## Comportement Actuel
[Ce qui se passe réellement]

## Environnement
- OS : [e.g. macOS 14.0]
- Node.js : [e.g. 20.10.0]
- Navigateur : [e.g. Chrome 120]

## Screenshots
[Si applicable]
```

### 2. Proposer une Fonctionnalité

**Template d'Issue Feature :**
```markdown
## Problème à Résoudre
[Quel problème cette fonctionnalité résout-elle ?]

## Solution Proposée
[Comment résoudre ce problème ?]

## Alternatives Considérées
[Autres approches envisagées]

## Contexte Additionnel
[Mockups, exemples, références]
```

### 3. Soumettre une Pull Request

#### Checklist PR
- [ ] Code testé localement
- [ ] Tests ajoutés/mis à jour
- [ ] Documentation mise à jour
- [ ] Commits suivent la convention
- [ ] Branch à jour avec `main`
- [ ] Pas de conflits
- [ ] Linter passe (ESLint)

---

## 📁 Structure du Projet

```
hearst-design/
├── backend/                 # API Express.js
│   ├── controllers/         # Logique métier
│   ├── routes/             # Routes API
│   ├── middleware/         # Middlewares
│   ├── core-modules/       # Modules partagés
│   └── utils/              # Utilitaires
│
├── frontend/               # Application Next.js 14
│   ├── src/app/           # App Router
│   ├── src/lib/           # Bibliothèques
│   └── public/            # Assets statiques
│
├── theme-builder/         # Design System Tool
│   ├── css/              # Styles modulaires
│   ├── js/               # Modules ES6
│   └── design-tokens.json
│
└── docs/                  # Documentation
```

### Composants Clés

| Composant | Description | Port |
|-----------|-------------|------|
| Backend API | Express.js + Supabase | 3002 |
| Frontend | Next.js 14 + TypeScript | 3002 |
| Theme Builder | HTML/CSS/JS Vanilla | 8080 |

---

## 🎨 Standards de Code

### JavaScript/TypeScript

```javascript
// ✅ BON
const fetchUserData = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    logger.error('Error fetching user:', error);
    throw error;
  }
};

// ❌ MAUVAIS
const f = async (id) => {
  return await api.get('/users/' + id);
};
```

### Conventions de Nommage

- **Variables/Fonctions** : `camelCase`
- **Classes** : `PascalCase`
- **Constantes** : `UPPER_SNAKE_CASE`
- **Fichiers** : `kebab-case.js` ou `PascalCase.tsx` (composants React)
- **CSS Classes** : `kebab-case`

### ESLint Configuration

```bash
# Vérifier le code
npm run lint

# Auto-fix
npm run lint:fix
```

### Prettier Configuration

```bash
# Formater le code
npm run format
```

---

## 🔄 Workflow Git

### 1. Fork & Clone

```bash
# Fork via GitHub UI
# Clone votre fork
git clone https://github.com/VOTRE-USERNAME/Hearst-Design.git
cd Hearst-Design

# Ajouter l'upstream
git remote add upstream https://github.com/adrien-debug/Hearst-Design.git
```

### 2. Créer une Branch

```bash
# Mettre à jour main
git checkout main
git pull upstream main

# Créer une branch feature
git checkout -b feature/nom-de-la-feature

# Ou pour un bugfix
git checkout -b fix/nom-du-bug
```

### 3. Conventions de Commit

Format : `type(scope): message`

**Types :**
- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Documentation
- `style` : Formatage (pas de changement de code)
- `refactor` : Refactoring
- `test` : Ajout de tests
- `chore` : Maintenance

**Exemples :**
```bash
feat(theme-builder): add dark mode toggle
fix(backend): resolve JWT authentication issue
docs(readme): update installation instructions
style(frontend): format dashboard components
refactor(api): simplify user controller logic
test(auth): add unit tests for login flow
chore(deps): update dependencies
```

### 4. Pusher & Créer PR

```bash
# Pusher votre branch
git push origin feature/nom-de-la-feature

# Créer une Pull Request via GitHub UI
```

### 5. Template de Pull Request

```markdown
## 📝 Description
[Description claire des changements]

## 🎯 Type de Changement
- [ ] 🐛 Bug fix
- [ ] ✨ Nouvelle fonctionnalité
- [ ] 💥 Breaking change
- [ ] 📝 Documentation
- [ ] 🎨 Style/UI
- [ ] ♻️ Refactoring

## 🧪 Tests
- [ ] Tests unitaires ajoutés
- [ ] Tests d'intégration ajoutés
- [ ] Tests manuels effectués

## 📸 Screenshots
[Si applicable]

## ✅ Checklist
- [ ] Code suit les conventions du projet
- [ ] Auto-review effectué
- [ ] Documentation mise à jour
- [ ] Pas de warnings
- [ ] Tests passent
```

---

## 🧪 Tests

### Backend Tests

```bash
cd backend
npm test                    # Tous les tests
npm test -- --watch        # Mode watch
npm test -- --coverage     # Coverage
```

### Frontend Tests

```bash
cd frontend
npm test                   # Jest
npm run test:e2e          # Playwright E2E
npm run test:coverage     # Coverage
```

### Tests Manuels

1. **Backend Health Check**
```bash
curl http://localhost:3002/api/health
```

2. **Frontend**
- Tester l'authentification
- Vérifier le dashboard
- Tester la navigation

3. **Theme Builder**
- Tester les 4 palettes
- Vérifier l'export JSON/CSS
- Tester les keyboard shortcuts

---

## 📚 Documentation

### Documentation Code

```javascript
/**
 * Récupère les données utilisateur depuis l'API
 * @param {string} userId - ID unique de l'utilisateur
 * @returns {Promise<User>} Objet utilisateur
 * @throws {ApiError} Si l'utilisateur n'existe pas
 */
async function fetchUserData(userId) {
  // ...
}
```

### README Components

Chaque composant majeur doit avoir son README :
- `backend/README.md`
- `frontend/README.md`
- `theme-builder/README.md`

### Documentation API

Mettre à jour `backend/swagger.json` pour tout nouvel endpoint.

---

## 🔐 Sécurité

### Signaler une Vulnérabilité

**NE PAS** créer d'issue publique. Envoyer un email à :
- **Email** : security@hearst-design.com
- **GPG Key** : [Si applicable]

### Guidelines Sécurité

- ❌ Ne jamais commit de secrets (`.env`, keys, tokens)
- ✅ Utiliser des variables d'environnement
- ✅ Valider toutes les entrées utilisateur
- ✅ Utiliser des requêtes préparées (SQL)
- ✅ Implémenter rate limiting

---

## 🎓 Ressources

### Documentation Technique

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Design Tokens W3C](https://design-tokens.github.io/community-group/)

### Guides Internes

- [`README.md`](README.md) : Vue d'ensemble projet
- [`theme-builder/README.md`](theme-builder/README.md) : Guide Theme Builder
- [`PROJECT_CONFIG.json`](PROJECT_CONFIG.json) : Configuration

---

## 💬 Questions ?

- **GitHub Discussions** : Pour questions générales
- **GitHub Issues** : Pour bugs et features
- **Email** : contact@hearst-design.com

---

## 🏆 Contributeurs

Merci à tous nos contributeurs ! 🎉

[Contributors Graph]

---

**Hearst Design** | Guide de Contribution  
Dernière mise à jour : 24 décembre 2025

