# 🚀 STRATEGIC RESERVE QATAR - QUICK START

**Guide de démarrage rapide - SRQ-001**

---

## ⚡ DÉMARRAGE (4 ÉTAPES)

### ÉTAPE 1 : Configuration Backend

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst-Control-GitHub/projects/hearst-strategic-reserve-qatar/backend

# Copier le fichier d'exemple
cp env.example .env
```

**Éditer `.env` avec vos credentials :**

```bash
# Server
NODE_ENV=development
PORT=3003

# JWT
JWT_SECRET=votre-secret-jwt-securise-ici

# Supabase
SUPABASE_URL=https://votre-projet-id.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# CORS
CORS_ORIGIN=http://localhost:3100
```

### ÉTAPE 2 : Configuration Frontend

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst-Control-GitHub/projects/hearst-strategic-reserve-qatar/frontend

# Copier le fichier d'exemple
cp env.example .env.local
```

**Éditer `.env.local` :**

```bash
NEXT_PUBLIC_API_URL=http://localhost:3003
```

### ÉTAPE 3 : Installation Dépendances

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### ÉTAPE 4 : Démarrage Services

```bash
# Terminal 1 - Backend
cd backend
npm start
# ✅ Backend disponible : http://localhost:3003

# Terminal 2 - Frontend
cd frontend
npm run dev
# ✅ Frontend disponible : http://localhost:3100
```

---

## 🗄️ SETUP BASE DE DONNÉES SUPABASE

### Option 1 : Setup Complet (Recommandé)

```bash
# Depuis la racine Hearst Control
cd /Users/adrienbeyondcrypto/Desktop/Hearst-Control-GitHub

# Ouvrir Supabase SQL Editor et exécuter dans l'ordre:
```

**Fichiers à exécuter :**

1. **Schéma central** (si pas déjà fait)
```sql
-- Fichier: schemas/central-schema.sql
-- Crée: users, projects, user_project_access, global_metrics, etc.
```

2. **Schéma SRQ**
```sql
-- Fichier: schemas/srq-schema.sql
-- Crée: srq_containers, srq_miners, srq_metrics
```

3. **Population données SRQ**
```sql
-- Fichier: database/POPULATE_SRQ_DATA.sql
-- Insère: Projet SRQ-001, métriques, containers, mineurs
```

### Option 2 : Setup Rapide (Tout-en-un)

```sql
-- Fichier: schemas/SETUP_SRQ_COMPLET.sql
-- Exécute tout en une fois
```

### Vérification Setup

```sql
-- Vérifier le projet
SELECT * FROM projects WHERE id = 'SRQ-001';

-- Vérifier les containers
SELECT COUNT(*) FROM srq_containers;
-- Résultat attendu: 30

-- Vérifier les mineurs
SELECT COUNT(*) FROM srq_miners;
-- Résultat attendu: 9240

-- Vérifier les métriques
SELECT * FROM project_metrics WHERE project_id = 'SRQ-001' ORDER BY timestamp DESC LIMIT 1;
```

### Données Créées

**Projet SRQ-001 :**
- ✅ ID: SRQ-001
- ✅ Nom: Strategic Reserve Qatar
- ✅ 30 containers ANTSPACE HD5
- ✅ 9,240 mineurs S21XP Hydro
- ✅ 4.37 EH/s hashrate total
- ✅ 52.95 MW puissance

**Utilisateurs :**
- ✅ admin@hearstmining.com avec accès admin

---

## 🔐 AUTHENTIFICATION

### Credentials
```
Email    : admin@hearstmining.com
Password : <REDACTED>
```

### Endpoints
```bash
# Login direct
POST http://localhost:3003/api/auth/login

# Login via API Gateway Central
POST http://localhost:4000/api/auth/login
```

---

## 🌐 URLS D'ACCÈS

| Service | URL | Port | Status |
|---------|-----|------|--------|
| **Backend SRQ** | http://localhost:3003 | 3003 | ✅ |
| **Frontend SRQ** | http://localhost:3100 | 3100 | ✅ |
| **Backend Central** | http://localhost:4000 | 4000 | ✅ |
| **API Gateway SRQ** | http://localhost:4000/api/srq/* | 4000 | ✅ |

---

## 📊 SPÉCIFICATIONS TECHNIQUES

| Paramètre | Valeur |
|-----------|--------|
| **Project ID** | SRQ-001 |
| **Containers** | 30 × ANTSPACE HD5 |
| **Miners** | 9,240 × S21XP Hydro |
| **Hashrate/Miner** | 473 TH/s |
| **Hashrate Total** | 4.37 EH/s (4,369,920 TH/s) |
| **Puissance/Miner** | 5,676 W |
| **Puissance Totale** | 52.95 MW |
| **Efficacité** | 12 W/TH |
| **Location** | Qatar |

---

## 🧪 TESTS API

### 1. Health Check
```bash
curl http://localhost:3003/health
```

**Réponse attendue :**
```json
{
  "status": "ok",
  "timestamp": "2025-12-24T..."
}
```

### 2. Authentification
```bash
curl -X POST http://localhost:3003/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hearstmining.com",
    "password": "<REDACTED>"
  }'
```

**Réponse attendue :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "admin@hearstmining.com",
    "role": "super_admin"
  }
}
```

### 3. Récupérer Containers
```bash
# Copier le token de la réponse précédente
curl http://localhost:3003/api/containers \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Réponse attendue :**
```json
[
  {
    "id": "SRQ-C001",
    "name": "Container 1",
    "model": "ANTSPACE HD5",
    "status": "operational",
    "miners_count": 308,
    "location": "Qatar"
  },
  ...
]
```

### 4. Récupérer Métriques
```bash
curl http://localhost:3003/api/metrics/current \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Réponse attendue :**
```json
{
  "total_containers": 30,
  "operational_containers": 30,
  "total_miners": 9240,
  "online_miners": 9240,
  "total_hashrate_ths": 4369920,
  "total_hashrate_ehs": 4.37,
  "total_power_mw": 52.95,
  "average_temperature": 42.5,
  "efficiency": 12,
  "uptime_percentage": 99.9
}
```

### 5. Tests via API Gateway Central
```bash
# Login via Gateway
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hearstmining.com",
    "password": "<REDACTED>"
  }'

# Containers via Gateway
curl http://localhost:4000/api/srq/containers \
  -H "Authorization: Bearer YOUR_TOKEN"

# Métriques via Gateway
curl http://localhost:4000/api/srq/metrics/current \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔄 INTÉGRATION HEARST CONTROL

### Démarrage Global

```bash
# Démarrer tous les services depuis la racine
cd /Users/adrienbeyondcrypto/Desktop/Hearst-Control-GitHub
./scripts/start-all.sh
```

**Services démarrés automatiquement :**
```
✅ Backend Central (4000) - API Gateway
✅ Qatar Backend (3001) + Frontend (3000)
✅ Strategic Reserve Backend (3002) + Frontend (3100)
```

### Architecture d'Intégration

```
Hearst Control Platform (Port 4000)
  │
  ├── API Gateway Central
  │   ├── /api/auth/* → Authentification centralisée
  │   ├── /api/qatar/* → Proxy vers Qatar (3001)
  │   └── /api/srq/* → Proxy vers SRQ (3002)
  │
  ├── Backend Central
  │   ├── Authentication JWT
  │   ├── Projects Management
  │   └── Users Management
  │
  └── Database Centrale (Supabase)
      ├── users
      ├── projects (QATAR-001, SRQ-001)
      ├── user_project_access
      └── project_metrics
```

### Proxying Automatique

Le backend central (4000) route automatiquement :
```
http://localhost:4000/api/srq/containers
  ↓ proxy
http://localhost:3003/api/containers
```

Tous les endpoints `/api/srq/*` sont automatiquement proxifiés vers le backend SRQ.

---

## 📚 DOCUMENTATION

### Documents Projet

| Document | Emplacement | Description |
|----------|-------------|-------------|
| **README.md** | `./README.md` | Vue d'ensemble technique |
| **PROJECT_INFO.md** | `./PROJECT_INFO.md` | Spécifications détaillées |
| **QUICK_START.md** | `./QUICK_START.md` | Ce fichier |

### Documentation Hearst Control

| Document | Chemin depuis racine | Contenu |
|----------|---------------------|---------|
| **Index Central** | `docs/DOCUMENTATION_INDEX.md` | Index complet |
| **Architecture** | `docs/architecture/ARCHITECTURE_GLOBALE.md` | Architecture globale |
| **Guide Démarrage** | `docs/guides/START_ICI.md` | Guide démarrage |
| **Rapport SRQ** | `docs/rapports/STRATEGIC_RESERVE_QATAR.md` | Rapport complet SRQ |
| **Status SRQ** | `docs/rapports/SRQ_STATUS.md` | Statut système |

### Schémas et Scripts

| Fichier | Chemin | Usage |
|---------|--------|-------|
| **Schéma Central** | `schemas/central-schema.sql` | Base centrale |
| **Schéma SRQ** | `schemas/srq-schema.sql` | Tables SRQ |
| **Setup Complet** | `schemas/SETUP_SRQ_COMPLET.sql` | Setup tout-en-un |
| **Population** | `database/POPULATE_SRQ_DATA.sql` | Données initiales |
| **Fix Passwords** | `database/FIX_SRQ_PASSWORDS.sql` | Correction passwords |

---

## 🔧 FICHIERS DE CONFIGURATION

### Backend (.env)
```bash
NODE_ENV=development
PORT=3003
JWT_SECRET=votre-secret-jwt-securise
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOi...
CORS_ORIGIN=http://localhost:3100
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3003
```

### Backend Central (.env)
```bash
# Dans backend-central/.env
SRQ_API_URL=http://localhost:3003
```

---

## 🆘 DÉPANNAGE

### Port 3002 déjà utilisé
```bash
# MacOS/Linux
lsof -ti:3002 | xargs kill -9

# Vérifier
lsof -i:3002
```

### Port 3100 déjà utilisé
```bash
# MacOS/Linux
lsof -ti:3100 | xargs kill -9
```

### Erreur connexion Supabase
```
Erreur: Failed to connect to Supabase
```

**Solutions :**
1. Vérifier `SUPABASE_URL` dans `.env`
2. Vérifier `SUPABASE_SERVICE_KEY` (service_role key, pas anon key)
3. Tester connexion :
```bash
curl https://votre-projet.supabase.co/rest/v1/ \
  -H "apikey: votre-service-key"
```

### Erreur JWT Token
```
Erreur: Invalid token
```

**Solutions :**
1. Vérifier `JWT_SECRET` identique dans tous les backends
2. Régénérer le token (logout + login)

### Erreur CORS
```
Access-Control-Allow-Origin error
```

**Solutions :**
1. Vérifier `CORS_ORIGIN` dans `backend/.env` = `http://localhost:3100`
2. Redémarrer le backend après modification

### Backend ne démarre pas
```bash
# Vérifier les logs
cd backend
npm start

# Si erreur de module
rm -rf node_modules package-lock.json
npm install
```

### Frontend ne démarre pas
```bash
# Vérifier les logs
cd frontend
npm run dev

# Si erreur de module
rm -rf node_modules .next package-lock.json
npm install
```

### Base de données vide
```sql
-- Vérifier les tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Si vide, réexécuter
\i schemas/SETUP_SRQ_COMPLET.sql
```

---

## ✅ CHECKLIST DÉMARRAGE

- [ ] Backend .env configuré
- [ ] Frontend .env.local configuré
- [ ] Dépendances backend installées (`npm install`)
- [ ] Dépendances frontend installées (`npm install`)
- [ ] Scripts SQL exécutés dans Supabase
- [ ] Projet SRQ-001 visible dans table `projects`
- [ ] Backend démarre sur port 3002
- [ ] Frontend démarre sur port 3100
- [ ] Health check répond : `curl http://localhost:3003/health`
- [ ] Login fonctionne avec admin@hearstmining.com
- [ ] Containers visibles : `GET /api/containers`
- [ ] Métriques visibles : `GET /api/metrics/current`

---

## 🎉 SYSTÈME OPÉRATIONNEL

**Strategic Reserve Qatar (SRQ-001) est maintenant prêt !**

### Accès
- **Dashboard** : http://localhost:3100
- **API** : http://localhost:3003
- **Via Gateway** : http://localhost:4000/api/srq/*

### Credentials
```
Email    : admin@hearstmining.com
Password : <REDACTED>
```

### Specs
- 30 containers ANTSPACE HD5
- 9,240 mineurs S21XP Hydro
- 4.37 EH/s hashrate total
- 52.95 MW puissance

---

> **Strategic Reserve Qatar - SRQ-001**  
> Intégré à Hearst Control V1.1.0  
> Décembre 2025

