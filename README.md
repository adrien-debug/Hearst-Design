# 🏢 HEARST CONTROL V2.0 "Autonomous Control"

**Plateforme Centralisée Multi-Projets - COMPLÈTE**

> 🤖 **Agent AI ?** Commencez ici : [AI_AGENT_GUIDE.md](AI_AGENT_GUIDE.md) ou [QUICK_START_AI.md](QUICK_START_AI.md)  
> 🚀 **Développeur ?** Commencez ici : [COMMENCEZ_ICI.md](COMMENCEZ_ICI.md)  
> 🗺️ **Navigation rapide** : [NAVIGATION_RAPIDE.md](NAVIGATION_RAPIDE.md)  
> 📚 **Documentation complète** : [docs/README.md](docs/README.md)

---

## 🤖 DOCUMENTATION POUR AGENTS AI (NOUVEAU V2.0)

> **Cette version introduit une documentation complète pour les agents AI permettant un onboarding instantané.**

### Fichiers Essentiels

| Fichier | Description | Temps |
|---------|-------------|-------|
| [`.cursorrules`](.cursorrules) | Règles auto-appliquées par Cursor | Auto |
| [AI_AGENT_GUIDE.md](AI_AGENT_GUIDE.md) | Guide complet pour agents AI | 15 min |
| [QUICK_START_AI.md](QUICK_START_AI.md) | Démarrage rapide | 2 min |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Structure annotée | 5 min |
| [VERSION.json](VERSION.json) | Métadonnées version | 1 min |

### Documentation Technique Essentielle

📁 **[docs/ESSENTIELS/](docs/ESSENTIELS/)**
- [RULES_REFERENCE.md](docs/ESSENTIELS/RULES_REFERENCE.md) - 41 règles détaillées avec exemples
- [COMMANDS_REFERENCE.md](docs/ESSENTIELS/COMMANDS_REFERENCE.md) - Toutes les commandes
- [ARCHITECTURE_REFERENCE.md](docs/ESSENTIELS/ARCHITECTURE_REFERENCE.md) - Référence technique
- [DEVELOPMENT_WORKFLOW.md](docs/ESSENTIELS/DEVELOPMENT_WORKFLOW.md) - Workflow de développement

### Ordre de Lecture Recommandé

1. `QUICK_START_AI.md` (2 min) - Vue d'ensemble rapide
2. `AI_AGENT_GUIDE.md` (15 min) - Guide complet
3. `docs/ESSENTIELS/RULES_REFERENCE.md` (10 min) - 41 règles détaillées
4. `PROJECT_STRUCTURE.md` (5 min) - Structure annotée

---

## 🔒 SÉCURITÉ - IMPORTANT

> **⚠️ AUDIT DE SÉCURITÉ EFFECTUÉ - 24/12/2025**  
> Des correctifs critiques ont été appliqués. **Actions urgentes requises avant production.**

### 📄 Documentation Sécurité
📁 **[docs/securite/](docs/securite/)** - Documentation complète de sécurité

- 🔴 **[RAPPORT_AUDIT_SECURITE.md](docs/securite/RAPPORT_AUDIT_SECURITE.md)** - Audit complet + checklist ⚡
- 🔐 **[SECURITY.md](docs/securite/SECURITY.md)** - Politique de sécurité
- 🔄 **[GUIDE_ROTATION_SECRETS.md](docs/securite/GUIDE_ROTATION_SECRETS.md)** - Rotation des secrets (step-by-step)
- ⚡ **[SECURITE_README.md](docs/securite/SECURITE_README.md)** - Guide rapide développeurs
- ✅ **[INSTALLATION_COMPLETE.md](docs/securite/INSTALLATION_COMPLETE.md)** - Installation terminée
- 📊 **[AUDIT_COMPLETE.md](docs/securite/AUDIT_COMPLETE.md)** - Résumé de l'audit

### ⚠️ Actions Urgentes (48h)
```bash
# 1. Installer les protections Git
./scripts/install-git-hooks.sh

# 2. Rotation des secrets (voir docs/securite/GUIDE_ROTATION_SECRETS.md)
# - Clés Supabase (compromises)
# - JWT_SECRET (exposé)
# - Mots de passe (si réels)
```

### ✅ Correctifs Appliqués
- ✅ Tous les secrets supprimés du code source
- ✅ Bug RBAC critique corrigé (`super_admin` ajouté)
- ✅ Configuration durcie (CORS, rate-limit)
- ✅ Scripts de sécurité automatisés
- ⚠️ Rotation des secrets requise (exposés dans historique Git)

---

## ⚠️ RÈGLE CRITIQUE - URLs Frontend

**TOUS les frontends DOIVENT pointer vers le Backend Central (port 4000).**

### Architecture Obligatoire

```
Frontend → Backend Central (4000) → Backends Projets (3001, 3002, 3003)
```

### URLs Correctes

| Projet | URL Frontend (✅ CORRECT) | URL Direct (❌ INTERDIT) |
|--------|---------------------------|--------------------------|
| Qatar  | `http://localhost:4000/api/qatar` | ❌ `http://localhost:3001` |
| Design | `http://localhost:4000/api/design` | ❌ `http://localhost:3002` |
| SRQ    | `http://localhost:4000/api/srq` | ❌ `http://localhost:3003` |

**📖 Documentation complète** : [REGLE_URLS_FRONTENDS.md](REGLE_URLS_FRONTENDS.md)

**🔍 Vérification** : `./scripts/verify-frontend-urls.sh`

### Pourquoi cette règle ?

1. ✅ **Authentification centralisée** - Un seul point d'entrée
2. ✅ **Audit complet** - Toutes les actions tracées
3. ✅ **Rate limiting global** - Protection DDOS
4. ✅ **Architecture cohérente** - Maintenance simplifiée
5. ✅ **Sécurité renforcée** - Pas de bypass possible

---

## 🎯 QU'EST-CE QUE HEARST CONTROL ?

**Hearst Control** est une **application Electron (de bureau)** qui permet de gérer et superviser **plusieurs projets web indépendants** pour Hearst.

### 🔑 Points Clés

- **Type d'application** : Application de bureau (Electron)
- **Objectif** : Gérer plusieurs projets web depuis une interface centralisée
- **Architecture** : Multi-tenant avec backend central + projets isolés
- **Projets actuels** : 
  - Hearst Qatar = Projet web
  - Hearst SRQ (Strategic Reserve Qatar) = Projet web
  - Hearst Design = Projet web (en développement)

> **IMPORTANT** : Hearst Control est une application de bureau basée sur Electron qui sert de plateforme centralisée pour gérer différents projets web.

### Architecture Multi-Couches

```
HEARST CONTROL V2.0 "Autonomous Control"
Application Electron pour la gestion de projets web
    │
    ├─> 🖥️ INTERFACE ELECTRON
    │   └── Application de bureau multi-plateforme
    │
    ├─> 🤖 COUCHE 1 : Documentation Agents AI
    │   └── Onboarding automatique des agents IA
    │
    ├─> 📚 COUCHE 2 : Core (Code Commun Réutilisable)
    │   └── Authentification, middlewares, utilitaires partagés
    │
    ├─> 🖥️ COUCHE 3 : Backend Central + API Gateway
    │   └── Point d'entrée unique, routing, gestion centralisée
    │
    ├─> 🗄️ COUCHE 4 : Base de Données Centrale
    │   └── Multi-tenant, isolation des données
    │
    ├─> 🔧 COUCHE 5 : Scripts d'Orchestration
    │   └── Automatisation, déploiement, tests
    │
    └─> 📊 COUCHE 6 : Projets Web Isolés
        ├─> Hearst Qatar              ✅ ACTIF (Projet web)
        ├─> Hearst Design             ✅ ACTIF (Projet web)
        ├─> Hearst Strategic Reserve  ✅ ACTIF (Projet web)
        └─> Autres projets web...     📋 FUTUR
```

---

## 📚 DOCUMENTATION

La documentation a été organisée de manière structurée dans le dossier `docs/` :

### 🚀 Guides de Démarrage

📁 **[docs/guides/](docs/guides/)**
- **[START_ICI.md](docs/guides/START_ICI.md)** - Commencez ici ! 🌟
- [START_HERE.md](docs/guides/START_HERE.md) - English version
- [GUIDE_DEMARRAGE_RAPIDE.md](docs/guides/GUIDE_DEMARRAGE_RAPIDE.md) - Démarrage rapide
- [DEMARRAGE_BACKEND.md](docs/guides/DEMARRAGE_BACKEND.md) - Backend central
- [DEMARRAGE_MULTI_TENANT.md](docs/guides/DEMARRAGE_MULTI_TENANT.md) - Multi-tenant
- [CONNECT_RAPIDE.md](docs/guides/CONNECT_RAPIDE.md) - Connexion rapide
- [GUIDE_MULTI_TENANT.md](docs/guides/GUIDE_MULTI_TENANT.md) - Guide multi-tenant complet
- [GUIDE_NOUVEAU_PROJET.md](docs/guides/GUIDE_NOUVEAU_PROJET.md) - Créer un nouveau projet

### 🏗️ Architecture

📁 **[docs/architecture/](docs/architecture/)**
- [ARCHITECTURE_GLOBALE.md](docs/architecture/ARCHITECTURE_GLOBALE.md) - Architecture complète
- [HEARST_CONTROL_COMPLET.md](docs/architecture/HEARST_CONTROL_COMPLET.md) - Documentation complète
- [AUTONOMIE_COMPLETE.md](docs/architecture/AUTONOMIE_COMPLETE.md) - Système d'autonomie
- [DIAGRAMME_REUTILISATION.md](docs/architecture/DIAGRAMME_REUTILISATION.md) - Réutilisabilité

### 📊 Rapports et Statut

📁 **[docs/rapports/](docs/rapports/)**
- [STATUS_SYSTEME.md](docs/rapports/STATUS_SYSTEME.md) - Statut du système
- [SYSTEM_COMPLET_STATUS.md](docs/rapports/SYSTEM_COMPLET_STATUS.md) - Statut complet
- [SYSTEME_COMPLET_4_PROJETS.md](docs/rapports/SYSTEME_COMPLET_4_PROJETS.md) - 4 projets
- [SUCCESS_FINAL.md](docs/rapports/SUCCESS_FINAL.md) - Rapport final
- [CORRECTIONS_24_DEC_2025.md](docs/rapports/CORRECTIONS_24_DEC_2025.md) - Corrections récentes
- [PLATEFORME_COMPLETE.md](docs/rapports/PLATEFORME_COMPLETE.md) - Plateforme complète
- [STRATEGIC_RESERVE_QATAR.md](docs/rapports/STRATEGIC_RESERVE_QATAR.md) - Strategic Reserve

### 🧪 Tests et Validation

📁 **[docs/tests/](docs/tests/)**
- [TEST_SUPABASE_COMPLET.md](docs/tests/TEST_SUPABASE_COMPLET.md) - Tests Supabase complets
- [TEST_COMPLET_24_DEC_2025.md](docs/tests/TEST_COMPLET_24_DEC_2025.md) - Tests du 24 décembre
- [SYNTHESE_TESTS_SUPABASE.md](docs/tests/SYNTHESE_TESTS_SUPABASE.md) - Synthèse des tests
- [INDEX_TESTS_SUPABASE.md](docs/tests/INDEX_TESTS_SUPABASE.md) - Index des tests

### 🎯 Projets Spécifiques

📁 **[docs/projets/](docs/projets/)**
- [CREATE_HEARST_DESIGN.md](docs/projets/CREATE_HEARST_DESIGN.md) - Hearst Design
- [HEARST_DESIGN_SPECS.md](docs/projets/HEARST_DESIGN_SPECS.md) - Spécifications Design
- [ACTION_PLAN.md](docs/projets/ACTION_PLAN.md) - Plan d'action

### 📋 Index et Sommaires

📁 **[docs/](docs/)**
- [DOCUMENTATION_INDEX.md](docs/DOCUMENTATION_INDEX.md) - Index complet 📖
- [INDEX_FINAL.md](docs/INDEX_FINAL.md) - Index final
- [INDEX_PROJETS.md](docs/INDEX_PROJETS.md) - Index des projets
- [QUICK_SUMMARY.md](docs/QUICK_SUMMARY.md) - Résumé rapide
- [MULTI_TENANT_README.md](docs/MULTI_TENANT_README.md) - Multi-tenant README

---

## 🚀 DÉMARRAGE ULTRA-RAPIDE

### Tous les Services en Une Commande

```bash
# Lancer TOUS les services (backend central + projets)
./scripts/start-all.sh
```

**Services démarrés :**
- ✅ Backend Central : http://localhost:4000 (API Gateway)
- ✅ Projets actifs (selon configuration)

### Arrêter Tous les Services

```bash
./scripts/stop-all.sh
```

### Créer un Nouveau Projet

```bash
# Déployer un nouveau projet
./scripts/deploy-project.sh nom-du-projet
```

---

## 📁 STRUCTURE DU PROJET

```
Hearst-Control-GitHub/
│
├── 📚 core/                    # Code commun réutilisable
│   ├── auth/                   # Authentification
│   ├── middleware/             # Middlewares partagés
│   ├── database/               # Client Supabase
│   └── shared-utils/           # Utilitaires
│
├── 🖥️  backend-central/        # Backend central + API Gateway
│   ├── controllers/            # Contrôleurs
│   ├── routes/                 # Routes API
│   └── server.js               # Serveur principal (port 4000)
│
├── 🗄️  database/               # Base de données centrale
│   └── schemas/                # Schémas SQL
│
├── 📊 projects/                # Projets isolés
│   ├── hearst-qatar-new/      # Projet Qatar
│   ├── hearst-design/         # Projet Design
│   └── hearst-strategic-reserve-qatar/  # Strategic Reserve
│
├── 🔧 scripts/                 # Scripts d'orchestration
│   ├── start-all.sh           # Démarrer tous les services
│   ├── stop-all.sh            # Arrêter tous les services
│   └── deploy-project.sh      # Créer nouveau projet
│
└── 📚 docs/                    # Documentation organisée
    ├── guides/                 # Guides de démarrage
    ├── architecture/           # Documentation architecture
    ├── rapports/              # Rapports et statut
    ├── tests/                 # Documentation tests
    ├── projets/               # Spécifications projets
    └── historique/            # Archives
```

---

## 🎯 AVANTAGES DE L'ARCHITECTURE

### ✅ Réutilisabilité (70-80%)
- Code commun dans `core/`
- Template projet complet
- Nouveau projet en **3-6 semaines** au lieu de 8-12

### ✅ Isolation Complète
- Base de données séparée par projet
- Backend séparé (ports différents)
- Frontend séparé
- Variables d'environnement séparées

### ✅ Centralisation
- **Un seul login** pour tous les projets
- **API Gateway** unique
- **Vue globale** de tous les projets
- **Gestion centralisée** des utilisateurs

### ✅ Scalabilité
Ajouter un projet = `./scripts/deploy-project.sh <nom>`

---

## 🔐 AUTHENTIFICATION CENTRALISÉE

### Login Multi-Projets

```bash
POST http://localhost:4000/api/auth/login

{
  "email": "admin@hearst.com",
  "password": "votre-mot-de-passe",
  "projectId": "QATAR-001"  # optionnel
}
```

**Un seul login → Accès à tous les projets autorisés !**

---

## 🛠️ TECHNOLOGIES

### Backend
- Node.js 18+
- Express.js
- Supabase (PostgreSQL)
- JWT Authentication

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

### Infrastructure
- PM2 (Process Manager)
- Docker / Docker Compose
- Scripts Bash

---

## 📞 SUPPORT

### En cas de problème :

1. **Consulter la documentation** :
   - [docs/guides/START_ICI.md](docs/guides/START_ICI.md) - Guide de démarrage
   - [docs/architecture/ARCHITECTURE_GLOBALE.md](docs/architecture/ARCHITECTURE_GLOBALE.md) - Architecture
   - [docs/DOCUMENTATION_INDEX.md](docs/DOCUMENTATION_INDEX.md) - Index complet

2. **Vérifier les logs** :
   ```bash
   tail -f logs/*.log
   ```

3. **Tester les connexions** :
   ```bash
   cd backend-central
   node test-supabase-connection.js
   ```

---

## 🏆 STATUT DU SYSTÈME

### ✅ Développé et Opérationnel :

- ✅ **Core** : Code commun réutilisable
- ✅ **Backend Central** : API Gateway + Auth centralisée
- ✅ **Base de Données** : Schéma central multi-projets
- ✅ **Scripts** : Orchestration complète
- ✅ **Projets** : Qatar, Design, Strategic Reserve
- ✅ **Documentation** : Complète et organisée

---

## 🚀 COMMENCER MAINTENANT

```bash
# 1. Configurer le backend central
cd backend-central
cp env.example .env
# Éditer .env avec vos credentials Supabase

# 2. Installer les dépendances
npm install

# 3. Lancer tous les services
cd ..
./scripts/start-all.sh

# 4. Accéder à l'API
# Backend Central: http://localhost:4000
```

---

## 📖 EN SAVOIR PLUS

- 📘 **Guide complet** : [docs/architecture/HEARST_CONTROL_COMPLET.md](docs/architecture/HEARST_CONTROL_COMPLET.md)
- 🚀 **Démarrage rapide** : [docs/guides/START_ICI.md](docs/guides/START_ICI.md)
- 🏗️ **Architecture** : [docs/architecture/ARCHITECTURE_GLOBALE.md](docs/architecture/ARCHITECTURE_GLOBALE.md)
- 📊 **Index complet** : [docs/DOCUMENTATION_INDEX.md](docs/DOCUMENTATION_INDEX.md)

---

**🏢 HEARST CONTROL V2.0 "Autonomous Control"**  
**Plateforme Multi-Projets Centralisée pour le Développement Technologique**  
**✨ Complète et Opérationnelle ✨**  
**🤖 Documentation Agents AI Incluse**  
**Décembre 2025**
