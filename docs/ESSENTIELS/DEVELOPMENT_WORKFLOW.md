# 🔄 Workflow de Développement - Hearst Control V2.0

> **Document de référence** : Processus et workflow pour le développement  
> Inclut : Git, création projet, modification, tests, déploiement

---

## 📑 Table des Matières

1. [Vue d'Ensemble](#-1-vue-densemble)
2. [Workflow Git](#-2-workflow-git)
3. [Création d'un Nouveau Projet](#-3-création-dun-nouveau-projet)
4. [Modification d'un Projet Existant](#-4-modification-dun-projet-existant)
5. [Tests et Validation](#-5-tests-et-validation)
6. [Déploiement](#-6-déploiement)
7. [Checklist par Contexte](#-7-checklist-par-contexte)

---

## 🎯 1. VUE D'ENSEMBLE

### Cycle de Développement

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  PLAN   │────>│  CODE   │────>│  TEST   │────>│ REVIEW  │────>│ DEPLOY  │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
     │                                                                │
     │                                                                │
     └────────────────────── FEEDBACK ────────────────────────────────┘
```

### Principes Fondamentaux

1. **Planifier avant de coder** - Lire la documentation pertinente
2. **Petits commits** - Un commit = une fonctionnalité
3. **Tests obligatoires** - Pas de merge sans tests
4. **Documentation** - Mettre à jour la doc avec le code
5. **Review** - Pas de push direct sur main

---

## 📦 2. WORKFLOW GIT

### Structure des Branches

```
main                          ← Production stable
  │
  ├── develop                 ← Développement actif
  │     │
  │     ├── feature/xxx       ← Nouvelles fonctionnalités
  │     ├── bugfix/xxx        ← Corrections de bugs
  │     └── hotfix/xxx        ← Corrections urgentes
  │
  └── release/v2.x            ← Versions de release
```

### Conventions de Nommage

```bash
# Features
feature/add-user-dashboard
feature/qatar-metrics-api

# Bugfixes
bugfix/fix-login-timeout
bugfix/fix-tenant-isolation

# Hotfixes (urgents)
hotfix/security-patch
hotfix/fix-critical-auth
```

### Format des Commits

```bash
# Format : <type>(<scope>): <description>

# Types
feat:     Nouvelle fonctionnalité
fix:      Correction de bug
docs:     Documentation
style:    Formatage (pas de changement de code)
refactor: Refactoring
test:     Ajout de tests
chore:    Maintenance

# Exemples
feat(auth): add multi-tenant login
fix(qatar): resolve metrics calculation error
docs(readme): update installation instructions
refactor(core): simplify auth middleware
test(users): add unit tests for user creation
```

### Workflow Quotidien

```bash
# 1. Récupérer les dernières modifications
git checkout develop
git pull origin develop

# 2. Créer une branche de travail
git checkout -b feature/ma-nouvelle-feature

# 3. Développer (commits réguliers)
git add .
git commit -m "feat(scope): description"

# 4. Pousser la branche
git push origin feature/ma-nouvelle-feature

# 5. Créer une Pull Request sur develop

# 6. Après review et merge, nettoyer
git checkout develop
git pull origin develop
git branch -d feature/ma-nouvelle-feature
```

### Protection des Branches

**main :**
- ❌ Pas de push direct
- ✅ Uniquement via Pull Request
- ✅ Requiert 1 review minimum
- ✅ Tous les tests doivent passer

**develop :**
- ❌ Pas de push direct
- ✅ Via Pull Request
- ✅ Tests doivent passer

---

## 🆕 3. CRÉATION D'UN NOUVEAU PROJET

### Étape 1 : Préparation (30 min)

```bash
# 1. Vérifier la documentation
cat docs/guides/GUIDE_NOUVEAU_PROJET.md

# 2. S'assurer d'être sur develop
git checkout develop
git pull origin develop

# 3. Créer une branche
git checkout -b feature/add-project-<nom>
```

### Étape 2 : Création du Projet (5 min)

```bash
# Utiliser le script de création
./scripts/deploy-project.sh <nom-projet>

# Exemple
./scripts/deploy-project.sh hearst-texas
```

### Étape 3 : Configuration Supabase (30 min)

```bash
# 1. Créer un nouveau projet sur https://supabase.com

# 2. Récupérer les credentials
# - SUPABASE_URL
# - SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_KEY

# 3. Exécuter le schéma SQL
# Copier le contenu de projects/<nom>/database/schema.sql
# L'exécuter dans Supabase SQL Editor

# 4. Configurer les .env
cd projects/<nom-projet>
cp backend/env.example backend/.env
# Éditer et ajouter les credentials

cp frontend/env.example frontend/.env.local
# Éditer et ajouter les credentials
```

### Étape 4 : Adaptation du Code (1-4 semaines)

```bash
# 1. Adapter le schéma base de données
# Modifier projects/<nom>/database/schema.sql

# 2. Adapter les controllers
# Modifier projects/<nom>/backend/controllers/*

# 3. Adapter le frontend
# Modifier projects/<nom>/frontend/src/*

# 4. Mettre à jour la documentation
# Modifier projects/<nom>/README.md
```

### Étape 5 : Tests (2-3 jours)

```bash
# 1. Installer les dépendances
cd projects/<nom-projet>/backend
npm install
npm test

cd ../frontend
npm install
npm run build
npm test

# 2. Tests d'intégration
cd ../../
./scripts/test-multi-tenant.sh
```

### Étape 6 : Commit et PR

```bash
# 1. Ajouter les fichiers
git add projects/<nom-projet>

# 2. Commit
git commit -m "feat(projects): add <nom-projet> project"

# 3. Push
git push origin feature/add-project-<nom>

# 4. Créer Pull Request sur GitHub/GitLab
```

---

## 🔧 4. MODIFICATION D'UN PROJET EXISTANT

### Workflow Standard

```bash
# 1. Identifier le contexte
# Quel projet ? Quel composant ?

# 2. Créer une branche
git checkout develop
git pull
git checkout -b feature/<description>

# 3. Localiser les fichiers à modifier
# Backend : projects/<projet>/backend/
# Frontend : projects/<projet>/frontend/src/
# Core : core/ (attention - impact tous les projets)

# 4. Modifier

# 5. Tester localement
cd projects/<projet>
npm test

# 6. Commit et PR
git add .
git commit -m "fix(<projet>): description"
git push origin feature/<description>
```

### Modification du Core (Attention !)

```bash
# ⚠️ Modifications dans core/ impactent TOUS les projets

# 1. Créer une branche spécifique
git checkout -b feature/core-<description>

# 2. Modifier core/

# 3. Tester TOUS les projets
./scripts/start-all.sh
./scripts/test-multi-tenant.sh

# 4. Vérifier chaque projet individuellement
cd projects/hearst-qatar-new && npm test
cd projects/hearst-design && npm test
cd projects/hearst-strategic-reserve-qatar && npm test

# 5. Documenter le changement
# Mettre à jour core/README.md

# 6. PR avec review obligatoire
```

### Modification du Backend Central

```bash
# ⚠️ Modifications dans backend-central/ impactent l'API Gateway

# 1. Vérifier l'impact
# - Auth ? → Impact tous les logins
# - Routes ? → Vérifier le routing
# - Proxy ? → Vérifier l'accès aux projets

# 2. Tester après modification
cd backend-central
npm start

# 3. Vérifier l'auth
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"xxx"}'

# 4. Vérifier les routes proxy
curl http://localhost:4000/api/qatar/health
curl http://localhost:4000/api/design/health
```

---

## 🧪 5. TESTS ET VALIDATION

### Types de Tests

| Type | Emplacement | Commande |
|------|-------------|----------|
| Unitaires | `*/tests/unit/` | `npm test` |
| Intégration | `*/tests/integration/` | `npm run test:integration` |
| E2E | `*/tests/e2e/` | `npm run test:e2e` |
| Multi-tenant | Racine | `./scripts/test-multi-tenant.sh` |

### Workflow de Test

```bash
# 1. Tests unitaires (rapides, locaux)
npm test

# 2. Tests d'intégration (avec DB)
npm run test:integration

# 3. Tests multi-tenant (isolation)
./scripts/test-multi-tenant.sh

# 4. Build de vérification
npm run build

# 5. Tests E2E (si disponibles)
npm run test:e2e
```

### Couverture Minimum

- **Backend** : 80% minimum
- **Frontend** : 70% minimum
- **Core** : 90% minimum (critique)

### Checklist Avant PR

```markdown
- [ ] Tous les tests passent (`npm test`)
- [ ] Build réussit (`npm run build`)
- [ ] Pas de warnings ESLint
- [ ] Documentation mise à jour
- [ ] CHANGELOG.md mis à jour (si changement significatif)
- [ ] Pas de secrets exposés (`./scripts/check-secrets.sh`)
```

---

## 🚀 6. DÉPLOIEMENT

### Environnements

| Environnement | Branch | URL | Usage |
|---------------|--------|-----|-------|
| Development | develop | localhost | Dev local |
| Staging | release/* | staging.xxx | Tests |
| Production | main | xxx.com | Production |

### Processus de Déploiement

```
develop → release/v2.x → main
             ↓
         Tests staging
             ↓
         Validation
             ↓
         Merge main
             ↓
         Deploy prod
```

### Déploiement Local

```bash
# 1. Installer les dépendances
cd backend-central && npm install
cd ../core && npm install
cd ../projects/hearst-qatar-new/backend && npm install
cd ../frontend && npm install
# ... répéter pour chaque projet

# 2. Démarrer tous les services
cd ../../../
./scripts/start-all.sh

# 3. Vérifier
curl http://localhost:4000/health
```

### Déploiement Production (PM2)

```bash
# 1. Build des frontends
cd projects/hearst-qatar-new/frontend
npm run build

cd projects/hearst-design/frontend
npm run build

# 2. Démarrer avec PM2
pm2 start ecosystem.config.js --env production

# 3. Vérifier
pm2 status
pm2 logs
```

### Rollback

```bash
# En cas de problème

# 1. Revenir à la version précédente
git checkout main~1

# 2. Redéployer
pm2 restart all

# 3. Si problème persistant
pm2 stop all
git checkout <last-stable-commit>
pm2 start ecosystem.config.js
```

---

## 📋 7. CHECKLIST PAR CONTEXTE

### Nouvelle Fonctionnalité

```markdown
## Checklist Nouvelle Fonctionnalité

### Avant de commencer
- [ ] Lu la documentation pertinente
- [ ] Branche créée depuis develop
- [ ] Comprend l'impact sur les autres composants

### Développement
- [ ] Code écrit selon les standards
- [ ] Tests unitaires ajoutés
- [ ] Pas de code dupliqué
- [ ] Pas de secrets en dur

### Tests
- [ ] Tests passent localement
- [ ] Tests d'intégration OK
- [ ] Testé manuellement

### Finalisation
- [ ] Documentation mise à jour
- [ ] CHANGELOG.md mis à jour
- [ ] PR créée avec description claire
- [ ] Review demandée
```

### Correction de Bug

```markdown
## Checklist Bug Fix

### Investigation
- [ ] Bug reproduit localement
- [ ] Cause identifiée
- [ ] Impact évalué

### Correction
- [ ] Fix implémenté
- [ ] Test de régression ajouté
- [ ] Pas d'effets secondaires

### Validation
- [ ] Bug ne se reproduit plus
- [ ] Tests passent
- [ ] Testé dans le contexte d'origine

### Finalisation
- [ ] PR créée
- [ ] Référence au ticket/issue
```

### Modification du Core

```markdown
## Checklist Modification Core

### Analyse d'Impact
- [ ] Identifié tous les composants impactés
- [ ] Évalué les risques
- [ ] Plan de test établi

### Développement
- [ ] Changement minimal et focalisé
- [ ] Rétrocompatibilité maintenue
- [ ] Tests ajoutés

### Validation
- [ ] Tous les projets testés
- [ ] Backend central testé
- [ ] Isolation tenant vérifiée

### Finalisation
- [ ] Documentation core/ mise à jour
- [ ] CHANGELOG.md mis à jour
- [ ] Review par 2 personnes minimum
```

### Ajout d'un Nouveau Projet

```markdown
## Checklist Nouveau Projet

### Préparation
- [ ] Nom du projet défini
- [ ] Specs techniques documentées
- [ ] Supabase project créé

### Création
- [ ] Script deploy-project.sh exécuté
- [ ] Structure vérifiée
- [ ] .env configurés

### Configuration
- [ ] Schéma SQL adapté
- [ ] Controllers adaptés
- [ ] Frontend adapté

### Tests
- [ ] Tests unitaires passent
- [ ] Tests d'intégration passent
- [ ] Isolation tenant vérifiée

### Documentation
- [ ] README.md complété
- [ ] API documentée
- [ ] Guide de déploiement créé

### Finalisation
- [ ] Ajouté à start-all.sh
- [ ] PR créée
- [ ] Review effectuée
```

---

## 🔄 Résumé du Workflow

```
┌──────────────────────────────────────────────────────────────────────┐
│                        WORKFLOW DÉVELOPPEMENT                        │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. PLANIFIER                                                        │
│     ├── Lire documentation                                           │
│     └── Créer branche depuis develop                                 │
│                                                                      │
│  2. DÉVELOPPER                                                       │
│     ├── Coder selon standards                                        │
│     ├── Commits réguliers et clairs                                  │
│     └── Tests en parallèle                                           │
│                                                                      │
│  3. TESTER                                                           │
│     ├── Tests unitaires                                              │
│     ├── Tests intégration                                            │
│     └── Tests multi-tenant                                           │
│                                                                      │
│  4. REVIEW                                                           │
│     ├── Pull Request                                                 │
│     ├── Code review                                                  │
│     └── Approbation                                                  │
│                                                                      │
│  5. DÉPLOYER                                                         │
│     ├── Merge vers develop                                           │
│     ├── Tests staging                                                │
│     └── Deploy production                                            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

**Hearst Control V2.0** | Workflow de Développement | Décembre 2025

