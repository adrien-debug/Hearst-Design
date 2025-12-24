# 🔧 Référence Complète des Commandes - Hearst Control V2.0

> **Document de référence** : Toutes les commandes disponibles organisées par catégorie  
> Chaque commande inclut : description, usage, résultat attendu

---

## 📑 Table des Matières

1. [Orchestration](#-1-orchestration)
2. [Création de Projet](#-2-création-de-projet)
3. [Tests](#-3-tests)
4. [Sécurité](#-4-sécurité)
5. [Base de Données](#-5-base-de-données)
6. [Backend Central](#-6-backend-central)
7. [Projets Individuels](#-7-projets-individuels)
8. [Utilitaires](#-8-utilitaires)
9. [API Endpoints](#-9-api-endpoints)

---

## 🚀 1. ORCHESTRATION

### Démarrer Tous les Services

```bash
./scripts/start-all.sh
```

| Paramètre | Description |
|-----------|-------------|
| Aucun | Démarre tous les services configurés |

**Ce qui est démarré :**
- ✅ Backend Central (port 4000)
- ✅ Projets actifs (ports 3001, 3002, 3003)
- ✅ Frontends associés

**Résultat attendu :**
```
✅ Backend Central démarré sur port 4000
✅ Hearst Qatar démarré sur port 3001
✅ Hearst Design démarré sur port 3002
✅ Hearst SRQ démarré sur port 3003
```

---

### Arrêter Tous les Services

```bash
./scripts/stop-all.sh
```

**Ce qui est arrêté :**
- Tous les processus Node.js du projet
- Libération de tous les ports utilisés

**Résultat attendu :**
```
✅ Tous les services arrêtés
✅ Ports 4000, 3001, 3002, 3003 libérés
```

---

### Démarrer en Mode Multi-Tenant

```bash
./scripts/start-multi-tenant.sh
```

**Description :** Démarre le système avec configuration multi-tenant complète

---

## 📦 2. CRÉATION DE PROJET

### Créer un Nouveau Projet

```bash
./scripts/deploy-project.sh <nom-projet>
```

**Exemple :**
```bash
./scripts/deploy-project.sh hearst-texas
```

**Ce qui est créé :**
```
projects/hearst-texas/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── env.example
├── frontend/
│   ├── src/
│   └── env.example
├── database/
│   └── schema.sql
├── README.md
├── TODO_SETUP.md
└── PROJECT_CONFIG.json
```

**Prochaines étapes affichées :**
```
✅ Projet hearst-texas créé !
📋 Prochaines étapes :
   1. cd projects/hearst-texas
   2. Configurer backend/.env
   3. Configurer frontend/.env.local
   4. npm install dans backend/ et frontend/
   5. Voir TODO_SETUP.md pour la suite
```

---

### Alternative : Script de Création Complet

```bash
./scripts/create-new-project.sh <nom-projet> "<Nom Affiché>"
```

**Exemple :**
```bash
./scripts/create-new-project.sh hearst-texas "Hearst Texas"
```

---

### Raccorder un Projet Existant

```bash
./scripts/raccorder-srq.sh
```

**Description :** Raccorde le projet Strategic Reserve Qatar au système central

---

### Setup Backend

```bash
./scripts/setup-backend.sh
```

**Description :** Configure le backend central avec toutes les dépendances

---

## 🧪 3. TESTS

### Test Isolation Multi-Tenant

```bash
./scripts/test-multi-tenant.sh
```

**Ce qui est testé :**
- ✅ Création de 2 tenants distincts
- ✅ Login avec tenant_id dans JWT
- ✅ Isolation des users par tenant
- ✅ Isolation des projects par tenant
- ✅ Aucune fuite cross-tenant

**Résultat attendu :**
```
🧪 Test 1: Création tenant A... ✅
🧪 Test 2: Création tenant B... ✅
🧪 Test 3: Isolation users... ✅
🧪 Test 4: Isolation projects... ✅
🧪 Test 5: Cross-tenant access... ✅ (bloqué)

✅ Tous les tests passent !
```

---

### Test Complet Supabase

```bash
./scripts/test-supabase-complet.sh
```

**Ce qui est testé :**
- ✅ Connexion Supabase
- ✅ Existence des tables
- ✅ Permissions RLS
- ✅ Données de test

---

### Test de Mot de Passe

```bash
node scripts/test-password.js
```

**Description :** Vérifie le hashage et la validation des mots de passe

---

## 🔒 4. SÉCURITÉ

### Vérifier les Secrets Exposés

```bash
./scripts/check-secrets.sh
```

**Ce qui est vérifié :**
- ⚠️ Fichiers `.env` non commités
- ⚠️ Clés API dans le code
- ⚠️ Passwords en dur
- ⚠️ Tokens exposés

**Résultat attendu (si OK) :**
```
🔍 Recherche de secrets exposés...
✅ Aucun secret trouvé dans le code
✅ .env files dans .gitignore
✅ Sécurité OK
```

---

### Installer les Git Hooks

```bash
./scripts/install-git-hooks.sh
```

**Ce qui est installé :**
- Pre-commit hook (vérifie secrets)
- Pre-push hook (lance tests)

---

### Générer des Mots de Passe Sécurisés

```bash
# Pour le projet Design
node backend-central/generate-design-passwords.js

# Pour le projet SRQ
node backend-central/generate-srq-passwords.js
# ou
node scripts/generate-srq-passwords.js
```

---

## 🗄️ 5. BASE DE DONNÉES

### Vérifier la Connexion Supabase

```bash
cd backend-central
node test-supabase-connection.js
```

**Résultat attendu :**
```
🔗 Connexion à Supabase...
✅ Connexion établie
✅ Tables trouvées: users, projects, tenants, ...
```

---

### Vérifier le Schéma

```bash
cd backend-central
node verify-schema.js
```

**Ce qui est vérifié :**
- Existence de toutes les tables requises
- Colonnes obligatoires (tenant_id, etc.)
- Index présents

---

### Tester les Requêtes SQL

```bash
cd backend-central
node test-sql-access.js
node test-sql-queries.js
```

---

### Scripts SQL à Exécuter dans Supabase

| Fichier | Description | Quand l'utiliser |
|---------|-------------|------------------|
| `schemas/FRESH_START.sql` | Reset complet | Nouvelle installation |
| `schemas/central-schema.sql` | Schéma central | Setup initial |
| `database/multi-tenant-migration.sql` | Migration multi-tenant | Upgrade existant |
| `database/ADD_SRQ_PROJECT.sql` | Ajouter projet SRQ | Nouveau projet |
| `database/VERIFY_SQL_SETUP.sql` | Vérification | Après modifications |

---

## 🖥️ 6. BACKEND CENTRAL

### Démarrer le Backend Central

```bash
cd backend-central
npm install  # Première fois seulement
npm start
```

**Port :** 4000

**Vérification :**
```bash
curl http://localhost:4000/health
```

**Résultat attendu :**
```json
{
  "status": "ok",
  "service": "backend-central",
  "version": "2.0.0"
}
```

---

### Mode Développement

```bash
cd backend-central
npm run dev
```

**Description :** Démarre avec nodemon (rechargement automatique)

---

## 📊 7. PROJETS INDIVIDUELS

### Structure de Commandes par Projet

Chaque projet dans `projects/` a les mêmes commandes :

```bash
cd projects/<nom-projet>

# Backend
cd backend
npm install
npm start           # Port spécifique au projet
npm run dev         # Mode développement

# Frontend
cd frontend
npm install
npm run dev         # Mode développement
npm run build       # Build production
npm start           # Production
```

### Ports par Projet

| Projet | Backend | Frontend |
|--------|---------|----------|
| hearst-qatar-new | 3001 | 3000 |
| hearst-design | 3002 | 3010 |
| hearst-strategic-reserve-qatar | 3003 | 3020 |

---

### Scripts Spécifiques Qatar

```bash
cd projects/hearst-qatar-new

# Automatisation complète
./FULL_AUTO.sh      # Tout automatique
./ZERO_CLICK.sh     # Mode sans intervention
./GO.sh             # Démarrage rapide
./ULTRA_AUTO.sh     # Ultra automatisation

# Gestion
./start-all.sh      # Démarrer backend + frontend
./stop-all.sh       # Arrêter tout
./install.sh        # Installation complète

# Diagnostic
./verify-setup.sh   # Vérification configuration
./auto-fix.sh       # Réparation automatique
./watch.sh          # Monitoring en temps réel
./CLI.sh            # Interface interactive
```

---

## 🛠️ 8. UTILITAIRES

### Générer l'Index de Documentation

```bash
./scripts/generate-doc-index.sh
```

**Description :** Génère un index de tous les fichiers de documentation

---

### Synchronisation

```bash
./scripts/SYNC.sh
```

**Description :** Synchronise les fichiers entre environnements

---

### Organiser la Documentation

```bash
./organize-docs.sh
```

**Description :** Réorganise et structure la documentation

---

## 🌐 9. API ENDPOINTS

### Backend Central (Port 4000)

#### Authentification

```bash
# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hearst.com",
    "password": "votre-password"
  }'

# Réponse
{
  "token": "eyJ...",
  "user": {
    "id": "uuid",
    "email": "admin@hearst.com",
    "role": "admin",
    "tenant_id": "uuid"
  }
}
```

```bash
# Vérifier token
curl http://localhost:4000/api/auth/verify \
  -H "Authorization: Bearer <token>"
```

```bash
# Bootstrap (créer tenant + user)
curl -X POST http://localhost:4000/api/auth/bootstrap \
  -H "Content-Type: application/json" \
  -d '{
    "tenant": {"name": "ACME Corp", "slug": "acme"},
    "user": {"name": "Admin", "email": "admin@acme.com", "password": "Secret123!"}
  }'
```

---

#### Utilisateurs

```bash
# Liste des utilisateurs (filtré par tenant)
curl http://localhost:4000/api/users \
  -H "Authorization: Bearer <token>"

# Détails d'un utilisateur
curl http://localhost:4000/api/users/<id> \
  -H "Authorization: Bearer <token>"

# Créer un utilisateur
curl -X POST http://localhost:4000/api/users \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@domain.com",
    "password": "Password123!",
    "name": "New User",
    "role": "operator"
  }'

# Modifier un utilisateur
curl -X PUT http://localhost:4000/api/users/<id> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name"}'

# Supprimer un utilisateur
curl -X DELETE http://localhost:4000/api/users/<id> \
  -H "Authorization: Bearer <token>"

# Donner accès à un projet
curl -X POST http://localhost:4000/api/users/<id>/projects \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"projectId": "QATAR-001", "role": "operator"}'
```

---

#### Projets

```bash
# Liste des projets
curl http://localhost:4000/api/projects \
  -H "Authorization: Bearer <token>"

# Détails d'un projet
curl http://localhost:4000/api/projects/<id> \
  -H "Authorization: Bearer <token>"

# Stats d'un projet
curl http://localhost:4000/api/projects/<id>/stats \
  -H "Authorization: Bearer <token>"

# Créer un projet
curl -X POST http://localhost:4000/api/projects \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "TEXAS-001",
    "name": "Hearst Texas",
    "location": "Texas, USA"
  }'
```

---

#### Dashboard

```bash
# Vue d'ensemble
curl http://localhost:4000/api/dashboard/overview \
  -H "Authorization: Bearer <token>"

# Métriques globales (super_admin seulement)
curl http://localhost:4000/api/dashboard/metrics/global \
  -H "Authorization: Bearer <token>"

# Métriques par projet
curl http://localhost:4000/api/dashboard/metrics/projects \
  -H "Authorization: Bearer <token>"

# Alertes actives
curl http://localhost:4000/api/dashboard/alerts \
  -H "Authorization: Bearer <token>"

# Stats temps réel
curl http://localhost:4000/api/dashboard/realtime \
  -H "Authorization: Bearer <token>"
```

---

#### Health Check

```bash
# Santé du service
curl http://localhost:4000/health
```

---

## 📋 Résumé Rapide

### Commandes Essentielles (Top 10)

| # | Commande | Description |
|---|----------|-------------|
| 1 | `./scripts/start-all.sh` | Démarrer tout |
| 2 | `./scripts/stop-all.sh` | Arrêter tout |
| 3 | `./scripts/deploy-project.sh <nom>` | Créer projet |
| 4 | `./scripts/test-multi-tenant.sh` | Tester isolation |
| 5 | `./scripts/check-secrets.sh` | Vérifier sécurité |
| 6 | `cd backend-central && npm start` | Backend central |
| 7 | `node test-supabase-connection.js` | Test DB |
| 8 | `curl localhost:4000/health` | Health check |
| 9 | `./scripts/install-git-hooks.sh` | Sécuriser git |
| 10 | `node verify-schema.js` | Vérifier schéma |

---

### Commandes par Contexte

| Contexte | Commande |
|----------|----------|
| Premier démarrage | `./scripts/start-all.sh` |
| Nouveau projet | `./scripts/deploy-project.sh <nom>` |
| Problème de sécurité | `./scripts/check-secrets.sh` |
| Test après modification | `./scripts/test-multi-tenant.sh` |
| Vérifier la DB | `node backend-central/test-supabase-connection.js` |
| Debug ports | `lsof -i:4000` puis `./scripts/stop-all.sh` |

---

**Hearst Control V2.0** | Référence des Commandes | Décembre 2025

