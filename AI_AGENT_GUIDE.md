# 🤖 Guide Complet pour Agents AI - Hearst Control V2.0

> **Document principal** : Guide exhaustif pour tout agent AI travaillant sur ce projet  
> **Temps de lecture** : 10-15 minutes  
> **Dernière mise à jour** : 24 décembre 2025

---

## 📖 Table des Matières

1. [Introduction - Qu'est-ce que Hearst Control](#-1-introduction)
2. [Architecture Globale](#-2-architecture-globale)
3. [Les 41 Règles Fondamentales](#-3-les-41-règles-fondamentales)
4. [Structure des Dossiers](#-4-structure-des-dossiers)
5. [Workflow de Travail](#-5-workflow-de-travail)
6. [Commandes Essentielles](#-6-commandes-essentielles)
7. [Standards de Code](#-7-standards-de-code)
8. [Checklist d'Intervention](#-8-checklist-dintervention)
9. [Erreurs Courantes à Éviter](#-9-erreurs-courantes-à-éviter)
10. [Ressources et Documentation](#-10-ressources-et-documentation)

---

## 🎯 1. INTRODUCTION

### Qu'est-ce que Hearst Control ?

**Hearst Control** est une **application Electron (de bureau)** développée pour **Hearst** afin de gérer plusieurs **projets web indépendants** depuis une interface centralisée unique.

### Concept Clé : Application Electron ≠ Projets Web

```
HEARST CONTROL (Application Electron)
     │
     ├── Interface de bureau (Electron)
     │   └── Gestion centralisée des projets
     │
     ├── Backend Central (API Gateway)
     │   └── Point d'entrée unique
     │
     └── Projets Web Gérés
         ├── Hearst Qatar ──────────> Projet web
         ├── Hearst Design ─────────> Projet web
         ├── Hearst SRQ ────────────> Projet web
         └── Futurs projets web...
```

**IMPORTANT :** Hearst Control est une application de bureau (Electron) qui sert de plateforme centralisée pour :
- ✅ Gérer plusieurs projets web indépendants
- ✅ Authentification centralisée multi-tenant
- ✅ Routing et orchestration des projets
- ✅ Interface unique pour superviser tous les projets

### Les 3 Principes Fondateurs

| Principe | Description |
|----------|-------------|
| **Autonomie** | Le système s'auto-installe, configure, vérifie, répare, et lance |
| **Isolation** | Chaque projet/tenant est 100% indépendant, aucune contamination |
| **Réutilisabilité** | 70-80% du code est commun et réutilisable entre projets |

### Version Actuelle

```json
{
  "version": "2.0.0",
  "codename": "Autonomous Control",
  "status": "stable",
  "date": "2025-12-24"
}
```

---

## 🏗️ 2. ARCHITECTURE GLOBALE

### Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENTS                                       │
│                    (Navigateurs / Applications)                         │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      BACKEND CENTRAL (Port 4000)                        │
│                                                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │                    API GATEWAY + AUTH                            │  │
│   │  • Authentification centralisée (JWT + tenant_id)               │  │
│   │  • Routing vers les projets                                      │  │
│   │  • Gestion utilisateurs et projets                              │  │
│   └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
          ▼                       ▼                       ▼
   ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
   │   QATAR     │         │   DESIGN    │         │    SRQ      │
   │  Port 3001  │         │  Port 3002  │         │  Port 3003  │
   │  ────────── │         │  ────────── │         │  ────────── │
   │  Backend    │         │  Backend    │         │  Backend    │
   │  Frontend   │         │  Frontend   │         │  Frontend   │
   │  Database   │         │  Database   │         │  Database   │
   │  (Isolé)    │         │  (Isolé)    │         │  (Isolé)    │
   └─────────────┘         └─────────────┘         └─────────────┘
          │                       │                       │
          └───────────────────────┼───────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                              CORE                                       │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                 │
│   │ authService  │  │ middleware   │  │supabaseClient│                 │
│   │   (Auth)     │  │  (Guards)    │  │   (Database) │                 │
│   └──────────────┘  └──────────────┘  └──────────────┘                 │
│   ┌──────────────┐  ┌──────────────┐                                   │
│   │   logger     │  │  validators  │                                   │
│   │   (Logs)     │  │ (Validation) │                                   │
│   └──────────────┘  └──────────────┘                                   │
└─────────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      SUPABASE (PostgreSQL)                              │
│                                                                         │
│   Tables : tenants | users | projects | user_project_access | ...      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Composants Principaux

| Composant | Rôle | Technologie | Port |
|-----------|------|-------------|------|
| **core/** | Code commun réutilisable | Node.js | - |
| **backend-central/** | API Gateway + Auth | Express.js | 4000 |
| **projects/** | Projets isolés | Express + Next.js | 3001-300X |
| **scripts/** | Automatisation | Bash + Node.js | - |
| **database/** | Schémas SQL | PostgreSQL | Cloud |

### Flux d'Authentification

```
1. Client → POST /api/auth/login → Backend Central
2. Backend Central → Vérifie credentials → Supabase
3. Supabase → Retourne user + tenant_id → Backend Central
4. Backend Central → Génère JWT (avec tenant_id) → Client
5. Client → Requête avec Bearer token → Backend Central
6. Backend Central → Vérifie token, filtre par tenant → Projet/Data
```

---

## 📜 3. LES 41 RÈGLES FONDAMENTALES

> **CRITIQUE** : Ces règles doivent être respectées à TOUT moment

### Catégorie 1 : Architecture (Règles 1-3)

| # | Règle | Importance |
|---|-------|------------|
| 1 | La plateforme centrale ne contient JAMAIS de code métier spécifique | 🔴 Critique |
| 2 | Chaque projet est totalement isolé et indépendant | 🔴 Critique |
| 3 | Le code commun réutilisable va dans `core/` | 🟡 Important |

### Catégorie 2 : Base de Données (Règles 4-6)

| # | Règle | Importance |
|---|-------|------------|
| 4 | Un utilisateur ne voit JAMAIS les données d'un autre tenant | 🔴 Critique |
| 5 | Seul le `super_admin` peut voir tous les tenants | 🔴 Critique |
| 6 | Requêtes SQL TOUJOURS filtrées par `tenant_id` | 🔴 Critique |

### Catégorie 3 : Authentification (Règles 7-10)

| # | Règle | Importance |
|---|-------|------------|
| 7 | Pas de tenant_id = pas d'accès | 🔴 Critique |
| 8 | Token vérifié sur CHAQUE requête protégée | 🔴 Critique |
| 9 | Rôle inférieur ne peut pas agir comme supérieur | 🔴 Critique |
| 10 | Double vérification (middleware + controller) | 🟡 Important |

### Catégorie 4 : Réutilisabilité (Règles 11-15)

| # | Règle | Importance |
|---|-------|------------|
| 11 | NE JAMAIS réécrire l'authentification | 🔴 Critique |
| 12 | NE JAMAIS recréer la structure de projet | 🟡 Important |
| 13 | TOUJOURS utiliser `deploy-project.sh` | 🟡 Important |
| 14 | Nouveau projet = 3-6 semaines MAX | 🟢 Guideline |
| 15 | Économie 50-60% minimum | 🟢 Guideline |

### Catégorie 5 : Création Projet (Règles 16-17)

| # | Règle | Importance |
|---|-------|------------|
| 16 | Chaque projet a son propre Supabase | 🔴 Critique |
| 17 | Isolation complète des données | 🔴 Critique |

### Catégorie 6 : Backend Central (Règles 18-22)

| # | Règle | Importance |
|---|-------|------------|
| 18 | UN SEUL point d'entrée pour l'auth | 🔴 Critique |
| 19 | Tous les projets passent par le central | 🟡 Important |
| 20 | JAMAIS de logique métier dans les routes | 🟡 Important |
| 21 | TOUJOURS valider les inputs | 🔴 Critique |
| 22 | TOUJOURS try/catch sur async | 🔴 Critique |

### Catégorie 7 : Documentation (Règles 23-24)

| # | Règle | Importance |
|---|-------|------------|
| 23 | Documentation auto-générée à la création | 🟡 Important |
| 24 | Mise à jour à chaque changement majeur | 🟡 Important |

### Catégorie 8 : Scripts (Règles 25-27)

| # | Règle | Importance |
|---|-------|------------|
| 25 | Scripts idempotents (réexécutables) | 🟡 Important |
| 26 | TOUJOURS vérifier les prérequis | 🟡 Important |
| 27 | Messages clairs (succès/erreur) | 🟢 Guideline |

### Catégorie 9 : Tests (Règles 28-29)

| # | Règle | Importance |
|---|-------|------------|
| 28 | Tests DOIVENT passer avant commit | 🔴 Critique |
| 29 | CI/CD bloque si tests échouent | 🔴 Critique |

### Catégorie 10 : Déploiement (Règles 30-31)

| # | Règle | Importance |
|---|-------|------------|
| 30 | JAMAIS de secrets en dur | 🔴 Critique |
| 31 | TOUJOURS variables d'environnement | 🔴 Critique |

### Catégorie 11 : Performance (Règles 32-35)

| # | Règle | Importance |
|---|-------|------------|
| 32 | Scalabilité horizontale | 🟡 Important |
| 33 | Index sur tenant_id | 🟡 Important |
| 34 | Support load balancing | 🟢 Guideline |
| 35 | Caching données fréquentes | 🟢 Guideline |

### Catégorie 12 : Sécurité (Règles 36-41)

| # | Règle | Importance |
|---|-------|------------|
| 36 | bcrypt 10 rounds minimum | 🔴 Critique |
| 37 | JWT expire en 24h max | 🔴 Critique |
| 38 | CORS strict | 🔴 Critique |
| 39 | Rate limiting activé | 🟡 Important |
| 40 | HTTPS en production | 🔴 Critique |
| 41 | Audit logs obligatoires | 🟡 Important |

**Légende :** 🔴 Critique (ne jamais violer) | 🟡 Important | 🟢 Guideline (recommandé)

---

## 📁 4. STRUCTURE DES DOSSIERS

### Vue Globale

```
Hearst-Control-GitHub/
│
├── 🤖 FICHIERS POUR AGENTS AI
│   ├── .cursorrules              ← Règles auto-lues par Cursor
│   ├── AI_AGENT_GUIDE.md         ← CE FICHIER (guide principal)
│   ├── QUICK_START_AI.md         ← Démarrage rapide (2 min)
│   ├── PROJECT_STRUCTURE.md      ← Structure annotée détaillée
│   └── VERSION.json              ← Métadonnées version
│
├── 📚 core/                      ← CODE COMMUN (70-80% réutilisable)
│   ├── auth/authService.js       ← Service d'authentification
│   ├── middleware/authMiddleware.js
│   ├── database/supabaseClient.js
│   └── shared-utils/             ← Logger, validators
│
├── 🖥️ backend-central/           ← API GATEWAY (Port 4000)
│   ├── controllers/              ← 4 controllers principaux
│   ├── routes/                   ← 4 fichiers de routes
│   └── server.js                 ← Point d'entrée
│
├── 📊 projects/                  ← PROJETS ISOLÉS
│   ├── hearst-qatar-new/         ← Port 3001
│   ├── hearst-design/            ← Port 3002
│   ├── hearst-strategic-reserve-qatar/ ← Port 3003
│   └── qatar-dashboard-original/ ← Template de référence
│
├── 🔧 scripts/                   ← AUTOMATISATION
│   ├── start-all.sh
│   ├── stop-all.sh
│   ├── deploy-project.sh
│   └── test-multi-tenant.sh
│
├── 🗄️ database/                  ← SCHÉMAS SQL
│
├── 📚 docs/                      ← DOCUMENTATION
│   └── ESSENTIELS/               ← Documentation critique
│       ├── RULES_REFERENCE.md
│       ├── COMMANDS_REFERENCE.md
│       ├── ARCHITECTURE_REFERENCE.md
│       └── DEVELOPMENT_WORKFLOW.md
│
└── 📄 Fichiers racine            ← README, CHANGELOG, etc.
```

### Où Modifier Quoi ?

| Je veux modifier... | Dossier | Attention |
|---------------------|---------|-----------|
| Auth commune | `core/auth/` | ⚠️ Impact TOUS les projets |
| Middlewares partagés | `core/middleware/` | ⚠️ Impact TOUS les projets |
| API Gateway | `backend-central/` | ⚠️ Impact routing |
| Logique métier Qatar | `projects/hearst-qatar-new/` | ✅ Isolé |
| Logique métier Design | `projects/hearst-design/` | ✅ Isolé |
| Scripts automation | `scripts/` | Vérifier idempotence |
| Documentation | `docs/` | Mettre à jour |

---

## 🔄 5. WORKFLOW DE TRAVAIL

### Avant Toute Intervention

```
┌─────────────────────────────────────────────────────────────┐
│                    WORKFLOW OBLIGATOIRE                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. LIRE la documentation pertinente                        │
│     • AI_AGENT_GUIDE.md (ce fichier)                        │
│     • QUICK_START_AI.md                                     │
│     • docs/ESSENTIELS/RULES_REFERENCE.md                   │
│                                                             │
│  2. IDENTIFIER le contexte                                  │
│     • Quel projet ?                                         │
│     • Quel composant ?                                      │
│     • Quel impact ?                                         │
│                                                             │
│  3. VÉRIFIER les règles applicables                         │
│     • Règles d'isolation                                    │
│     • Règles de sécurité                                    │
│     • Standards de code                                     │
│                                                             │
│  4. PROPOSER un plan (si modification complexe)             │
│     • Description du changement                             │
│     • Fichiers impactés                                     │
│     • Risques potentiels                                    │
│                                                             │
│  5. ATTENDRE validation utilisateur                         │
│                                                             │
│  6. EXÉCUTER avec précaution                                │
│                                                             │
│  7. TESTER                                                  │
│                                                             │
│  8. DOCUMENTER si changement significatif                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Types d'Interventions

#### Modification Simple (< 5 fichiers)

```
Lire → Identifier → Modifier → Tester → Valider
```

#### Modification Complexe (> 5 fichiers ou impact multiple)

```
Lire → Analyser → Proposer Plan → Validation → Exécuter par étapes → Test → Doc
```

#### Modification du Core (ATTENTION !)

```
Lire → Impact Analysis → Plan détaillé → Validation → Modifier → Test TOUS projets → Doc
```

#### Nouveau Projet

```
deploy-project.sh → Config Supabase → Adapter Schema → Adapter Controllers → Adapter UI → Tests → Doc
```

---

## 🔧 6. COMMANDES ESSENTIELLES

### Top 10 des Commandes

| Commande | Description | Quand l'utiliser |
|----------|-------------|------------------|
| `./scripts/start-all.sh` | Démarrer tous les services | Au démarrage |
| `./scripts/stop-all.sh` | Arrêter tous les services | À l'arrêt |
| `./scripts/deploy-project.sh <nom>` | Créer nouveau projet | Nouveau client |
| `./scripts/test-multi-tenant.sh` | Tester isolation tenant | Après modif DB/Auth |
| `./scripts/check-secrets.sh` | Vérifier secrets exposés | Avant commit |
| `cd backend-central && npm start` | Démarrer backend central | Dev/Debug |
| `node test-supabase-connection.js` | Tester connexion DB | Problème DB |
| `curl localhost:4000/health` | Health check | Vérification rapide |
| `npm test` | Lancer tests | Avant commit |
| `npm run build` | Build production | Avant deploy |

### Par Contexte

```bash
# Premier démarrage
./scripts/start-all.sh

# Après modification du code
npm test
./scripts/test-multi-tenant.sh

# Nouveau projet
./scripts/deploy-project.sh hearst-nouveau

# Problème de connexion DB
cd backend-central
node test-supabase-connection.js

# Vérifier la sécurité
./scripts/check-secrets.sh

# Debug ports
lsof -i:4000
./scripts/stop-all.sh
```

---

## 📝 7. STANDARDS DE CODE

### Format JavaScript

```javascript
/**
 * Description de la fonction
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
exports.getAll = async (req, res) => {
  try {
    // 1. Validation des inputs
    const { tenant_id, role } = req.user;
    
    if (!tenant_id && role !== 'super_admin') {
      return res.status(403).json({ error: 'Tenant required' });
    }
    
    // 2. Construire la requête
    let query = supabase.from('users').select('*');
    
    // 3. Filtrage par tenant (OBLIGATOIRE)
    if (role !== 'super_admin') {
      query = query.eq('tenant_id', tenant_id);
    }
    
    // 4. Exécuter
    const { data, error } = await query;
    
    if (error) throw error;
    
    // 5. Retourner
    res.json({ success: true, data });
    
  } catch (error) {
    console.error('Error in getAll:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
```

### Conventions de Nommage

| Type | Convention | Exemple |
|------|------------|---------|
| Fichiers | camelCase | `authController.js` |
| Classes | PascalCase | `AuthService` |
| Fonctions | camelCase | `getUserById` |
| Constantes | UPPER_SNAKE | `JWT_SECRET` |
| Dossiers | kebab-case | `shared-utils` |
| Variables | camelCase | `tenantId` |

### Imports

```javascript
// 1. Modules Node.js natifs
const path = require('path');

// 2. Modules npm
const express = require('express');
const jwt = require('jsonwebtoken');

// 3. Modules locaux (core)
const authService = require('../../../core/auth/authService');
const { logger } = require('../../../core/shared-utils/logger');

// 4. Modules locaux (projet)
const supabase = require('../utils/supabase');
```

---

## ✅ 8. CHECKLIST D'INTERVENTION

### Avant de Commencer

```markdown
- [ ] J'ai lu AI_AGENT_GUIDE.md
- [ ] J'ai lu QUICK_START_AI.md
- [ ] Je connais le contexte (projet, composant)
- [ ] J'ai vérifié les règles applicables
- [ ] Je sais quels fichiers modifier
- [ ] J'ai identifié les impacts potentiels
```

### Pendant le Développement

```markdown
- [ ] Pas de code métier dans core/
- [ ] Pas de code métier dans backend-central/
- [ ] Filtrage tenant_id présent (si DB)
- [ ] Validation des inputs
- [ ] Try/catch sur async
- [ ] Pas de secrets en dur
- [ ] Pas d'import depuis autre projet
```

### Après Modification

```markdown
- [ ] Tests passent localement
- [ ] Pas de régression sur autres composants
- [ ] Documentation mise à jour (si changement majeur)
- [ ] Code propre et lisible
```

---

## 🚫 9. ERREURS COURANTES À ÉVITER

### ❌ Erreur 1 : Code Métier dans Core

```javascript
// ❌ MAUVAIS - dans core/auth/authService.js
exports.login = async (email, password) => {
  // Code spécifique Qatar
  if (email.includes('qatar')) {
    return handleQatarLogin();  // ❌ Logique métier !
  }
};

// ✅ BON - Code générique
exports.login = async (email, password, tenantId) => {
  const user = await findUser(email);
  return generateToken(user, tenantId);
};
```

### ❌ Erreur 2 : Pas de Filtrage Tenant

```javascript
// ❌ MAUVAIS - Fuite de données !
const getUsers = async () => {
  const { data } = await supabase.from('users').select('*');
  return data;  // Retourne TOUS les users de TOUS les tenants !
};

// ✅ BON
const getUsers = async (tenantId) => {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('tenant_id', tenantId);
  return data;
};
```

### ❌ Erreur 3 : Import Entre Projets

```javascript
// ❌ MAUVAIS - dans projects/hearst-design/
const { getResources } = require('../hearst-qatar-new/controllers/resources');

// ✅ BON - Chaque projet est indépendant
const { getEquipment } = require('./controllers/equipment');
```

### ❌ Erreur 4 : Secret en Dur

```javascript
// ❌ MAUVAIS
const JWT_SECRET = 'mon-super-secret-123';

// ✅ BON
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable required');
}
```

### ❌ Erreur 5 : Pas de Try/Catch

```javascript
// ❌ MAUVAIS - Crash si erreur
exports.create = async (req, res) => {
  const { data } = await supabase.from('users').insert(req.body);
  res.json(data);
};

// ✅ BON
exports.create = async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').insert(req.body);
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Creation failed' });
  }
};
```

---

## 📚 10. RESSOURCES ET DOCUMENTATION

### Documents Principaux

| Document | Contenu | Temps |
|----------|---------|-------|
| `AI_AGENT_GUIDE.md` | CE FICHIER - Guide complet | 15 min |
| `QUICK_START_AI.md` | Vue rapide | 2 min |
| `.cursorrules` | Règles auto-appliquées | Auto |
| `PROJECT_STRUCTURE.md` | Structure annotée | 5 min |
| `VERSION.json` | Métadonnées version | 1 min |

### Documentation Technique

| Document | Contenu |
|----------|---------|
| `docs/ESSENTIELS/RULES_REFERENCE.md` | 41 règles détaillées avec exemples |
| `docs/ESSENTIELS/COMMANDS_REFERENCE.md` | Toutes les commandes |
| `docs/ESSENTIELS/ARCHITECTURE_REFERENCE.md` | Architecture technique |
| `docs/ESSENTIELS/DEVELOPMENT_WORKFLOW.md` | Workflow de développement |

### Documentation Architecture

| Document | Contenu |
|----------|---------|
| `docs/architecture/ARCHITECTURE_GLOBALE.md` | Architecture d'ensemble |
| `docs/architecture/AUTONOMIE_COMPLETE.md` | 6 niveaux d'autonomie |
| `docs/architecture/HEARST_CONTROL_COMPLET.md` | Documentation complète |

### Ordre de Lecture Recommandé

1. **Premier contact** : `QUICK_START_AI.md` (2 min)
2. **Compréhension** : `AI_AGENT_GUIDE.md` (15 min)
3. **Règles** : `docs/ESSENTIELS/RULES_REFERENCE.md` (10 min)
4. **Structure** : `PROJECT_STRUCTURE.md` (5 min)
5. **Au besoin** : Autres docs selon contexte

---

## 🆘 EN CAS DE DOUTE

### Hiérarchie de Décision

```
1. Vérifier dans .cursorrules
2. Vérifier dans docs/ESSENTIELS/RULES_REFERENCE.md
3. Vérifier dans AI_AGENT_GUIDE.md
4. Demander clarification à l'utilisateur
5. NE JAMAIS supposer ou deviner
```

### Questions à Se Poser

- Est-ce que cette modification respecte l'isolation ?
- Est-ce que j'impacte d'autres projets ?
- Est-ce que le filtrage tenant_id est présent ?
- Est-ce que je valide les inputs ?
- Est-ce que je gère les erreurs ?
- Est-ce qu'il y a des secrets exposés ?

### En Cas d'Incertitude

**TOUJOURS demander à l'utilisateur plutôt que de faire une supposition.**

```
"Je voudrais clarifier avant de procéder :
- [Question 1]
- [Question 2]
Pouvez-vous confirmer ?"
```

---

## 🎯 RÉSUMÉ FINAL

### Les 5 Commandements Hearst Control

1. **Tu ne réinventeras point la roue** - Réutilise 70-80% du code
2. **Tu isoleras complètement** - Chaque projet = environnement séparé
3. **Tu centraliseras l'auth** - Un seul login pour tous
4. **Tu automatiseras tout** - Scripts pour chaque tâche
5. **Tu documenteras toujours** - Doc = code de première classe

### Mantra

> **"Autonomie + Isolation + Réutilisabilité = Hearst Control"**

### Checklist Express (30 secondes)

- ✅ Lu la doc pertinente ?
- ✅ Contexte identifié ?
- ✅ Règles vérifiées ?
- ✅ Pas d'impact non prévu ?
- ✅ Prêt à procéder ?

---

**Hearst Control V2.0** | Guide Complet pour Agents AI | Décembre 2025

---

**Bon travail ! Vous avez maintenant toutes les informations nécessaires pour travailler efficacement sur Hearst Control.** 🚀

