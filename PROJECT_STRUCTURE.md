# 📁 Structure Détaillée - Hearst Control V2.0

> **Document de référence pour la structure complète du projet**  
> Chaque dossier et fichier important est annoté avec son rôle et ses règles

## 🎯 Nature de l'Application

**Hearst Control** est une **application Electron (de bureau)** pour gérer plusieurs **projets web indépendants** avec une architecture multi-tenant centralisée.

### Composants Principaux

- **Interface Electron** : Application de bureau multi-plateforme
- **Backend Central** : API Gateway + authentification centralisée (Port 4000)
- **Core** : Code commun réutilisable (70-80%)
- **Projets Web** : Projets indépendants et isolés

**Projets web actuels** :
- **Hearst Design** : Projet web (en développement)
- **Hearst Qatar** : Projet web
- **Hearst SRQ** (Strategic Reserve Qatar) : Projet web

> **Note** : Hearst Control est une application Electron qui centralise la gestion de plusieurs projets web avec isolation complète entre chaque projet.

---

## 🌳 Arbre Complet Annoté

```
Hearst-Control-GitHub/
│
│
├── ═══════════════════════════════════════════════════════════════════════
│   📚 CORE - CODE COMMUN RÉUTILISABLE (70-80%)
│   Rôle : Bibliothèque partagée entre tous les projets
│   ⚠️ RÈGLE : NE JAMAIS mettre de logique métier spécifique ici
├── ═══════════════════════════════════════════════════════════════════════
│
├── core/
│   │
│   ├── auth/
│   │   └── authService.js              [SERVICE D'AUTHENTIFICATION]
│   │       ├── Fonctions : login(), register(), verifyToken()
│   │       ├── JWT avec tenant_id obligatoire
│   │       ├── Gestion multi-tenant native
│   │       └── Utilisé par : backend-central + tous les projets
│   │
│   ├── middleware/
│   │   └── authMiddleware.js           [MIDDLEWARES EXPRESS]
│   │       ├── createAuthMiddleware() - Vérification token
│   │       ├── requireProjectAccess() - Accès projet
│   │       ├── requireRole() - Vérification rôle
│   │       └── Exports réutilisables par tous les projets
│   │
│   ├── database/
│   │   └── supabaseClient.js           [CLIENT SUPABASE PARTAGÉ]
│   │       ├── Configuration centralisée
│   │       ├── Connection pool
│   │       └── Singleton pattern
│   │
│   ├── shared-utils/
│   │   ├── logger.js                   [WINSTON LOGGER STANDARDISÉ]
│   │   │   ├── Niveaux : info, warn, error, debug
│   │   │   ├── Format JSON pour production
│   │   │   └── Rotation des fichiers logs
│   │   │
│   │   └── validators.js               [VALIDATION DES DONNÉES]
│   │       ├── isValidEmail()
│   │       ├── isValidPassword()
│   │       ├── isValidProjectId()
│   │       └── sanitizeInput()
│   │
│   ├── package.json                    [DÉPENDANCES CORE]
│   └── README.md                       [DOCUMENTATION CORE]
│
│
├── ═══════════════════════════════════════════════════════════════════════
│   🖥️ BACKEND CENTRAL - API GATEWAY (Port 4000)
│   Rôle : Point d'entrée unique, authentification centralisée, routing
│   ⚠️ RÈGLE : TOUS les projets passent par ici pour l'auth
├── ═══════════════════════════════════════════════════════════════════════
│
├── backend-central/
│   │
│   ├── controllers/
│   │   ├── authController.js           [AUTHENTIFICATION CENTRALISÉE]
│   │   │   ├── login() - Login multi-tenant
│   │   │   ├── register() - Inscription
│   │   │   ├── verify() - Vérification token
│   │   │   ├── bootstrapTenant() - Onboarding self-serve
│   │   │   └── ⚠️ JWT contient TOUJOURS tenant_id
│   │   │
│   │   ├── projectsController.js       [GESTION PROJETS]
│   │   │   ├── getAll() - Liste projets (filtré par tenant)
│   │   │   ├── getById() - Détails projet
│   │   │   ├── create() - Créer projet
│   │   │   ├── update() - Modifier projet
│   │   │   └── delete() - Supprimer projet (super_admin)
│   │   │
│   │   ├── usersController.js          [GESTION UTILISATEURS]
│   │   │   ├── getAll() - Liste users (filtré par tenant)
│   │   │   ├── getById() - Détails user
│   │   │   ├── create() - Créer user
│   │   │   ├── update() - Modifier user
│   │   │   ├── delete() - Supprimer user
│   │   │   ├── grantProjectAccess() - Donner accès projet
│   │   │   └── revokeProjectAccess() - Retirer accès
│   │   │
│   │   └── dashboardController.js      [DASHBOARD GLOBAL]
│   │       ├── getOverview() - Vue d'ensemble
│   │       ├── getGlobalMetrics() - Métriques globales
│   │       ├── getProjectsMetrics() - Métriques par projet
│   │       ├── getActiveAlerts() - Alertes actives
│   │       └── getRealtimeStats() - Stats temps réel
│   │
│   ├── routes/
│   │   ├── auth.js                     [ROUTES /api/auth/*]
│   │   │   ├── POST /login
│   │   │   ├── POST /register
│   │   │   ├── GET /verify
│   │   │   └── POST /bootstrap
│   │   │
│   │   ├── projects.js                 [ROUTES /api/projects/*]
│   │   ├── users.js                    [ROUTES /api/users/*]
│   │   └── dashboard.js                [ROUTES /api/dashboard/*]
│   │
│   ├── server.js                       [SERVEUR PRINCIPAL]
│   │   ├── Port : 4000
│   │   ├── CORS configuré
│   │   ├── Helmet security
│   │   ├── Rate limiting
│   │   ├── Request logging
│   │   └── Proxy routes vers projets
│   │
│   ├── env.example                     [TEMPLATE VARIABLES ENV]
│   ├── package.json                    [DÉPENDANCES BACKEND]
│   │
│   ├── generate-design-passwords.js    [UTILITAIRE]
│   ├── generate-srq-passwords.js       [UTILITAIRE]
│   ├── test-sql-access.js              [TEST]
│   ├── test-sql-queries.js             [TEST]
│   ├── test-supabase-connection.js     [TEST CONNEXION DB]
│   └── verify-schema.js                [VÉRIFICATION SCHÉMA]
│
│
├── ═══════════════════════════════════════════════════════════════════════
│   📊 PROJECTS - PROJETS ISOLÉS
│   Rôle : Chaque projet est 100% indépendant
│   ⚠️ RÈGLE : Isolation complète, PAS de dépendances entre projets
├── ═══════════════════════════════════════════════════════════════════════
│
├── projects/
│   │
│   ├── hearst-design/                  [PROJET WEB - Port 3002]
│   │   ├── backend/
│   │   │   ├── controllers/            [Controllers métier du projet]
│   │   │   │   ├── authController.js
│   │   │   │   ├── [autres controllers]
│   │   │   │   ├── metricsController.js
│   │   │   │   └── [controllers spécifiques au projet]
│   │   │   ├── middleware/auth.js
│   │   │   ├── routes/                 [Fichiers routes]
│   │   │   ├── utils/supabase.js
│   │   │   ├── server.js
│   │   │   ├── swagger.json
│   │   │   └── env.example
│   │   │
│   │   └── frontend/
│   │       └── Public/                 [Assets (logos, images)]
│   │
│   ├── hearst-qatar-new/               [PROJET WEB - Port 3001]
│   │   ├── backend/                    [Structure identique]
│   │   ├── frontend/
│   │   │   └── src/app/                [Next.js App Router]
│   │   │       ├── dashboard/page.tsx
│   │   │       ├── login/page.tsx
│   │   │       └── layout.tsx
│   │   ├── database/schema.sql         [Schéma spécifique au projet]
│   │   ├── PROJECT_CONFIG.json
│   │   ├── README.md
│   │   └── [Scripts automatisation]
│   │       ├── FULL_AUTO.sh
│   │       ├── start-all.sh
│   │       └── stop-all.sh
│   │
│   ├── hearst-strategic-reserve-qatar/ [PROJET WEB - Port 3003]
│   │   ├── backend/                    [Structure identique]
│   │   ├── frontend/                   [Next.js complet]
│   │   ├── database/schema.sql         [Schéma spécifique au projet]
│   │   ├── PROJECT_INFO.md
│   │   ├── QUICK_START.md
│   │   └── RACCORDEMENT_GUIDE.md
│   │
│   └── qatar-dashboard-original/       [TEMPLATE RÉFÉRENCE]
│       └── [Documentation + Scripts de référence]
│
│
├── ═══════════════════════════════════════════════════════════════════════
│   🗄️ DATABASE / SCHEMAS - SCHÉMAS SQL
│   Rôle : Définitions des tables et migrations
│   ⚠️ RÈGLE : Chaque projet a son propre schéma Supabase
├── ═══════════════════════════════════════════════════════════════════════
│
├── database/
│   ├── central-schema.sql              [SCHÉMA CENTRAL]
│   │   ├── Table tenants
│   │   ├── Table users (avec tenant_id)
│   │   ├── Table projects (avec tenant_id)
│   │   ├── Table user_project_access
│   │   ├── Table project_metrics
│   │   ├── Table global_alerts
│   │   └── Table audit_log
│   │
│   ├── multi-tenant-migration.sql      [MIGRATION MULTI-TENANT]
│   ├── add-strategic-reserve-qatar.sql [AJOUT PROJET SRQ]
│   ├── ADD_SRQ_PROJECT.sql
│   ├── CHECK_SRQ_PROJECT.sql
│   ├── FIX_PASSWORD.sql
│   ├── FIX_SRQ_PASSWORDS.sql
│   ├── POPULATE_SRQ_DATA.sql
│   ├── VERIFY_SQL_SETUP.sql
│   └── README.md
│
├── schemas/
│   ├── central-schema.sql
│   ├── qatar-schema.sql
│   ├── srq-schema.sql
│   ├── FRESH_START.sql                 [RESET COMPLET]
│   ├── SETUP_DESIGN_COMPLET.sql
│   ├── SETUP_SRQ_COMPLET.sql
│   └── README.md
│
│
├── ═══════════════════════════════════════════════════════════════════════
│   🔧 SCRIPTS - AUTOMATISATION
│   Rôle : Scripts d'orchestration et outils
│   ⚠️ RÈGLE : Scripts DOIVENT être idempotents (réexécutables)
├── ═══════════════════════════════════════════════════════════════════════
│
├── scripts/
│   │
│   ├── [ORCHESTRATION]
│   ├── start-all.sh                    [DÉMARRER TOUS LES SERVICES]
│   ├── stop-all.sh                     [ARRÊTER TOUS LES SERVICES]
│   ├── start-multi-tenant.sh           [DÉMARRER MODE MULTI-TENANT]
│   │
│   ├── [CRÉATION PROJET]
│   ├── deploy-project.sh               [CRÉER NOUVEAU PROJET]
│   ├── create-new-project.sh           [ALTERNATIVE CRÉATION]
│   ├── raccorder-srq.sh                [RACCORDER SRQ]
│   ├── setup-backend.sh                [SETUP BACKEND]
│   │
│   ├── [TESTS]
│   ├── test-multi-tenant.sh            [TEST ISOLATION TENANT]
│   ├── test-supabase-complet.sh        [TEST COMPLET SUPABASE]
│   ├── test-password.js                [TEST PASSWORDS]
│   │
│   ├── [SÉCURITÉ]
│   ├── check-secrets.sh                [VÉRIFIER SECRETS EXPOSÉS]
│   ├── install-git-hooks.sh            [INSTALLER HOOKS GIT]
│   │
│   ├── [UTILITAIRES]
│   ├── generate-doc-index.sh           [GÉNÉRER INDEX DOC]
│   ├── generate-srq-passwords.js       [GÉNÉRER PASSWORDS SRQ]
│   └── SYNC.sh                         [SYNCHRONISATION]
│
│
├── ═══════════════════════════════════════════════════════════════════════
│   📚 DOCS - DOCUMENTATION COMPLÈTE
│   Rôle : Toute la documentation du projet
│   ⚠️ RÈGLE : Documentation mise à jour à chaque changement majeur
├── ═══════════════════════════════════════════════════════════════════════
│
├── docs/
│   │
│   ├── ESSENTIELS/                     [DOCUMENTATION CRITIQUE - NOUVEAU]
│   │   ├── RULES_REFERENCE.md          [41 RÈGLES DÉTAILLÉES]
│   │   ├── COMMANDS_REFERENCE.md       [TOUTES LES COMMANDES]
│   │   ├── ARCHITECTURE_REFERENCE.md   [RÉFÉRENCE TECHNIQUE]
│   │   └── DEVELOPMENT_WORKFLOW.md     [WORKFLOW DÉVELOPPEMENT]
│   │
│   ├── architecture/                   [ARCHITECTURE]
│   │   ├── ARCHITECTURE_GLOBALE.md     [Vue d'ensemble]
│   │   ├── AUTONOMIE_COMPLETE.md       [6 niveaux autonomie]
│   │   ├── DIAGRAMME_REUTILISATION.md  [Réutilisabilité 70-80%]
│   │   └── HEARST_CONTROL_COMPLET.md   [Doc complète]
│   │
│   ├── guides/                         [GUIDES DE DÉMARRAGE]
│   │   ├── START_ICI.md                [Point d'entrée]
│   │   ├── GUIDE_DEMARRAGE.md
│   │   ├── GUIDE_DEMARRAGE_RAPIDE.md
│   │   ├── GUIDE_NOUVEAU_PROJET.md
│   │   ├── GUIDE_NOUVEAU_PROJET_COMPLET.md
│   │   ├── GUIDE_MULTI_TENANT.md
│   │   ├── DEMARRAGE_BACKEND.md
│   │   ├── DEMARRAGE_MULTI_TENANT.md
│   │   ├── CONNECT_RAPIDE.md
│   │   └── [autres guides...]
│   │
│   ├── rapports/                       [RAPPORTS ET STATUTS]
│   │   ├── STATUS_SYSTEME.md
│   │   ├── PLATEFORME_COMPLETE.md
│   │   ├── CORRECTIONS_24_DEC_2025.md
│   │   └── [27 fichiers...]
│   │
│   ├── tests/                          [DOCUMENTATION TESTS]
│   │   ├── TEST_SUPABASE_COMPLET.md
│   │   ├── TEST_COMPLET_24_DEC_2025.md
│   │   └── [9 fichiers...]
│   │
│   ├── projets/                        [SPÉCIFICATIONS PROJETS]
│   │   ├── HEARST_DESIGN_SPECS.md
│   │   ├── CREATE_HEARST_DESIGN.md
│   │   └── ACTION_PLAN.md
│   │
│   ├── historique/                     [ARCHIVES]
│   │   └── [10 fichiers archivés]
│   │
│   ├── API_MULTI_TENANT.md
│   ├── MULTI_TENANT_README.md
│   ├── DOCUMENTATION_INDEX.md
│   ├── QUICK_SUMMARY.md
│   └── README.md
│
│
├── ═══════════════════════════════════════════════════════════════════════
│   📄 FICHIERS RACINE
├── ═══════════════════════════════════════════════════════════════════════
│
├── [DOCUMENTATION AGENTS AI]
├── .cursorrules                        [RÈGLES POUR CURSOR AI]
├── AI_AGENT_GUIDE.md                   [GUIDE PRINCIPAL AGENTS]
├── QUICK_START_AI.md                   [DÉMARRAGE RAPIDE 2 MIN]
├── PROJECT_STRUCTURE.md                [CE FICHIER]
├── VERSION.json                        [MÉTADONNÉES VERSION]
│
├── [DOCUMENTATION UTILISATEURS]
├── README.md                           [VUE D'ENSEMBLE]
├── COMMENCEZ_ICI.md                    [POINT D'ENTRÉE]
├── CHANGELOG.md                        [HISTORIQUE VERSIONS]
├── README_UTILISATION.md
│
├── [SÉCURITÉ]
├── SECURITY.md                         [POLITIQUE SÉCURITÉ]
├── GUIDE_ROTATION_SECRETS.md           [ROTATION DES SECRETS]
├── RAPPORT_AUDIT_SECURITE.md           [AUDIT SÉCURITÉ]
│
├── [RAPPORTS]
├── ETAT_BASE_DONNEES.md
├── RAPPORT_CONNEXION_DESIGN.md
│
├── [CONFIGURATION]
├── env/                                [TEMPLATES ENV]
│   ├── backend-central.env.example
│   ├── qatar-backend.env.example
│   ├── qatar-frontend.env.example
│   └── srq-backend.env.example
│
├── [UTILITAIRES]
├── organize-docs.sh
├── setup-supabase-design.js
├── test-design-dashboard.html
│
└── [ARCHIVES]
    └── _archive/                       [FICHIERS ARCHIVÉS]
        ├── test-html/
        ├── PAGES_LOGIN.md
        └── RESULTATS_TESTS.txt
```

---

## 📊 Résumé par Catégorie

### Code (4 dossiers principaux)

| Dossier | Rôle | Fichiers | Règle Principale |
|---------|------|----------|------------------|
| `core/` | Code commun réutilisable | ~10 | Pas de logique métier |
| `backend-central/` | API Gateway + Auth | ~20 | Point d'entrée unique |
| `projects/` | Projets isolés | ~150+ | Isolation complète |
| `scripts/` | Automatisation | ~15 | Idempotents |

### Documentation (1 dossier principal)

| Sous-dossier | Contenu | Fichiers |
|--------------|---------|----------|
| `docs/ESSENTIELS/` | Règles, Commandes, Workflow | 4 |
| `docs/architecture/` | Architecture détaillée | 4 |
| `docs/guides/` | Guides de démarrage | 13 |
| `docs/rapports/` | Rapports et statuts | 27 |
| `docs/tests/` | Documentation tests | 9 |

### Données (2 dossiers)

| Dossier | Contenu | Fichiers |
|---------|---------|----------|
| `database/` | Schémas SQL centraux | 10 |
| `schemas/` | Schémas par projet | 8 |

---

## 🔗 Relations Entre Composants

```
┌─────────────────────────────────────────────────────────────────┐
│                        AGENTS AI                                │
│  Lisent : .cursorrules, AI_AGENT_GUIDE.md, QUICK_START_AI.md   │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     DOCUMENTATION                               │
│  docs/ESSENTIELS/ : Règles, Commandes, Architecture, Workflow  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                        CORE                                     │
│  auth/ + middleware/ + database/ + shared-utils/                │
│  Réutilisé par : backend-central + tous les projets             │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND CENTRAL                               │
│  Port 4000 : API Gateway + Auth centralisée                     │
│  Route vers : projects/*                                        │
└──────────────────────────┬──────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  hearst-design  │ │ hearst-qatar-new│ │ hearst-srq      │
│    Port 3002    │ │    Port 3001    │ │    Port 3003    │
│   (ISOLÉ)       │ │   (ISOLÉ)       │ │   (ISOLÉ)       │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

---

## ✅ Checklist Vérification Structure

Avant toute modification, vérifier :

- [ ] Le fichier modifié est dans le BON projet
- [ ] Pas d'impact sur les autres projets
- [ ] Respect de l'isolation `core/` (pas de logique métier)
- [ ] Respect de l'isolation `backend-central/` (pas de code projet)
- [ ] Documentation mise à jour si changement majeur

---

**Hearst Control V2.0** | Structure Complète Annotée | Décembre 2025

