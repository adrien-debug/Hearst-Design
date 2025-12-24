# 🔌 GUIDE DE RACCORDEMENT - STRATEGIC RESERVE QATAR

**Intégration technique avec Hearst Control Platform**

---

## 🎯 OBJECTIF

Raccorder le projet Strategic Reserve Qatar (SRQ-001) à la plateforme centrale Hearst Control pour permettre :
- Authentification centralisée
- Proxying API via Gateway
- Monitoring global
- Gestion unifiée des utilisateurs

---

## 📋 PRÉREQUIS

### Système
- Hearst Control Backend Central installé et fonctionnel (port 4000)
- Base de données Supabase configurée avec schéma central
- Node.js 18+ installé

### Fichiers nécessaires
- `schemas/central-schema.sql` - Schéma base centrale
- `schemas/srq-schema.sql` - Schéma tables SRQ
- `database/POPULATE_SRQ_DATA.sql` - Données SRQ
- `backend-central/server.js` - API Gateway configuré

---

## 🔧 ÉTAPE 1 : CONFIGURATION BASE DE DONNÉES

### 1.1 Schéma Central (si pas déjà fait)

```bash
# Ouvrir Supabase SQL Editor
```

```sql
-- Exécuter : schemas/central-schema.sql
-- Crée les tables:
-- - users
-- - projects
-- - user_project_access
-- - global_metrics
-- - project_metrics
-- - global_alerts
-- - audit_log
```

### 1.2 Schéma SRQ

```sql
-- Exécuter : schemas/srq-schema.sql
-- Crée les tables:
-- - srq_containers
-- - srq_miners
-- - srq_metrics
```

### 1.3 Données SRQ

```sql
-- Exécuter : database/POPULATE_SRQ_DATA.sql
-- Insère:
-- - Projet SRQ-001 dans table projects
-- - Accès admin dans user_project_access
-- - Métriques initiales dans project_metrics
```

### 1.4 Vérification

```sql
-- Vérifier le projet
SELECT * FROM projects WHERE id = 'SRQ-001';
-- Résultat attendu: 1 ligne

-- Vérifier les accès
SELECT * FROM user_project_access WHERE project_id = 'SRQ-001';
-- Résultat attendu: 1+ lignes

-- Vérifier les containers
SELECT COUNT(*) FROM srq_containers;
-- Résultat attendu: 30

-- Vérifier les mineurs
SELECT COUNT(*) FROM srq_miners;
-- Résultat attendu: 9240
```

---

## 🔧 ÉTAPE 2 : CONFIGURATION BACKEND CENTRAL

### 2.1 Vérifier API Gateway

```javascript
// Fichier : backend-central/server.js
// Vérifier que cette section existe:

app.use('/api/srq', createProxyMiddleware({
  target: process.env.SRQ_API_URL || 'http://localhost:3003',
  changeOrigin: true,
  pathRewrite: {
    '^/api/srq': '/api'
  },
  onError: (err, req, res) => {
    console.error('❌ Strategic Reserve Qatar proxy error:', err.message);
    res.status(502).json({ 
      error: 'Strategic Reserve Qatar API unavailable',
      message: 'The Strategic Reserve Qatar project API is currently unavailable'
    });
  }
}));
```

### 2.2 Variables d'Environnement

```bash
# Fichier : backend-central/.env
SRQ_API_URL=http://localhost:3003
```

### 2.3 Redémarrer Backend Central

```bash
cd backend-central
npm start
# ou
pm2 restart backend-central
```

---

## 🔧 ÉTAPE 3 : CONFIGURATION BACKEND SRQ

### 3.1 Variables d'Environnement

```bash
# Fichier : projects/hearst-strategic-reserve-qatar/backend/.env

NODE_ENV=development
PORT=3003

# JWT (utiliser le même secret que backend central)
JWT_SECRET=votre-secret-jwt-identique-au-central

# Supabase
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_KEY=votre-service-role-key

# CORS
CORS_ORIGIN=http://localhost:3100
```

**IMPORTANT** : `JWT_SECRET` doit être identique dans tous les backends pour que les tokens soient valides.

### 3.2 Vérifier Configuration Supabase

```javascript
// Fichier : backend/utils/supabase.js

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = supabase;
```

### 3.3 Démarrer Backend SRQ

```bash
cd projects/hearst-strategic-reserve-qatar/backend
npm install
npm start
```

**Vérification :**
```bash
curl http://localhost:3003/health
# Résultat attendu: {"status":"ok","timestamp":"..."}
```

---

## 🔧 ÉTAPE 4 : CONFIGURATION FRONTEND SRQ

### 4.1 Variables d'Environnement

```bash
# Fichier : projects/hearst-strategic-reserve-qatar/frontend/.env.local

NEXT_PUBLIC_API_URL=http://localhost:3003
```

### 4.2 Démarrer Frontend SRQ

```bash
cd projects/hearst-strategic-reserve-qatar/frontend
npm install
npm run dev
```

**Accès :** http://localhost:3100

---

## ✅ ÉTAPE 5 : TESTS DE RACCORDEMENT

### 5.1 Test Health Check

```bash
# Backend SRQ direct
curl http://localhost:3003/health

# Via API Gateway
curl http://localhost:4000/api/srq/../health
```

### 5.2 Test Authentification Centralisée

```bash
# Login via Backend Central
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hearstmining.com",
    "password": "<REDACTED>"
  }'

# Copier le token de la réponse
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 5.3 Test API via Gateway

```bash
# Containers via Gateway
curl http://localhost:4000/api/srq/containers \
  -H "Authorization: Bearer $TOKEN"

# Métriques via Gateway
curl http://localhost:4000/api/srq/metrics/current \
  -H "Authorization: Bearer $TOKEN"

# Miners via Gateway
curl http://localhost:4000/api/srq/miners \
  -H "Authorization: Bearer $TOKEN"
```

### 5.4 Test API Direct

```bash
# Containers direct
curl http://localhost:3003/api/containers \
  -H "Authorization: Bearer $TOKEN"

# Métriques direct
curl http://localhost:3003/api/metrics/current \
  -H "Authorization: Bearer $TOKEN"
```

### 5.5 Test Frontend

```bash
# Ouvrir navigateur
open http://localhost:3100

# Login avec:
# Email: admin@hearstmining.com
# Password: <REDACTED>

# Vérifier:
# - Login réussit
# - Dashboard s'affiche
# - Métriques visibles
# - Containers listés
```

---

## 📊 ARCHITECTURE APRÈS RACCORDEMENT

```
┌─────────────────────────────────────────────────────────┐
│          CLIENT (Browser / API Client)                  │
└────────────────────┬────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
┌─────────────────┐   ┌─────────────────────┐
│  Frontend SRQ   │   │  Backend Central    │
│  Port 3100      │   │  Port 4000          │
│  Next.js        │   │  API Gateway        │
└────────┬────────┘   └──────────┬──────────┘
         │                       │
         │         ┌─────────────┴─────────────┐
         │         │                           │
         │         ▼                           ▼
         │  ┌──────────────┐         ┌────────────────┐
         └──► Backend SRQ  │         │ Backend Qatar  │
            │ Port 3002    │         │ Port 3001      │
            │ Express      │         │ Express        │
            └──────┬───────┘         └────────┬───────┘
                   │                          │
                   └──────────┬───────────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │   Supabase Database  │
                   │   PostgreSQL         │
                   │                      │
                   │  • users             │
                   │  • projects          │
                   │  • user_project_...  │
                   │  • srq_containers    │
                   │  • srq_miners        │
                   │  • srq_metrics       │
                   └──────────────────────┘
```

---

## 🔄 FLUX D'AUTHENTIFICATION

### Via Backend Central (Recommandé)

```
1. User → POST /api/auth/login → Backend Central (4000)
   ↓
2. Backend Central vérifie credentials dans Supabase
   ↓
3. Backend Central génère JWT token
   ↓
4. User reçoit token
   ↓
5. User → GET /api/srq/containers + token → Backend Central (4000)
   ↓
6. Backend Central vérifie token
   ↓
7. Backend Central proxy vers Backend SRQ (3002)
   ↓
8. Backend SRQ vérifie token (même JWT_SECRET)
   ↓
9. Backend SRQ répond avec données
   ↓
10. Backend Central retourne réponse au User
```

### Via Backend SRQ Direct

```
1. User → POST /api/auth/login → Backend SRQ (3002)
   ↓
2. Backend SRQ vérifie credentials dans Supabase
   ↓
3. Backend SRQ génère JWT token
   ↓
4. User reçoit token
   ↓
5. User → GET /api/containers + token → Backend SRQ (3002)
   ↓
6. Backend SRQ vérifie token
   ↓
7. Backend SRQ répond avec données
```

---

## 🔒 SÉCURITÉ

### JWT Secret Partagé
**Critique** : Tous les backends doivent utiliser le **même** `JWT_SECRET` pour que les tokens soient interopérables.

```bash
# backend-central/.env
JWT_SECRET=votre-secret-securise-64-chars-minimum

# projects/hearst-strategic-reserve-qatar/backend/.env
JWT_SECRET=votre-secret-securise-64-chars-minimum  # IDENTIQUE !
```

### Supabase Service Key
Utiliser la **service_role key** (pas anon key) pour accès backend complet.

```bash
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### CORS
Configurer CORS pour autoriser le frontend :

```bash
# Backend SRQ
CORS_ORIGIN=http://localhost:3100

# Backend Central
CORS_ORIGIN=* # ou spécifier les origines autorisées
```

---

## 🆘 DÉPANNAGE

### Erreur 502 via Gateway
```
Error: Strategic Reserve Qatar API unavailable
```

**Solutions :**
1. Vérifier que backend SRQ tourne sur port 3002
2. Vérifier `SRQ_API_URL` dans backend-central/.env
3. Tester backend SRQ direct : `curl http://localhost:3003/health`

### Erreur Token Invalid
```
Error: Invalid token / jwt malformed
```

**Solutions :**
1. Vérifier que `JWT_SECRET` est identique dans tous les backends
2. Régénérer le token (logout + login)
3. Vérifier que le token n'a pas expiré

### Erreur Supabase Connection
```
Error: Failed to connect to Supabase
```

**Solutions :**
1. Vérifier `SUPABASE_URL` dans .env
2. Vérifier `SUPABASE_SERVICE_KEY` (service_role, pas anon)
3. Tester connexion : `curl https://votre-projet.supabase.co`

### Erreur CORS
```
Access-Control-Allow-Origin error
```

**Solutions :**
1. Vérifier `CORS_ORIGIN` dans backend/.env
2. Redémarrer le backend après modification
3. Vérifier que le frontend utilise la bonne URL

---

## ✅ CHECKLIST RACCORDEMENT

- [ ] Schéma central exécuté dans Supabase
- [ ] Schéma SRQ exécuté dans Supabase
- [ ] Données SRQ populées
- [ ] Projet SRQ-001 visible dans table `projects`
- [ ] API Gateway configuré dans backend-central/server.js
- [ ] `SRQ_API_URL` configuré dans backend-central/.env
- [ ] `JWT_SECRET` identique dans tous les backends
- [ ] Backend Central démarré (port 4000)
- [ ] Backend SRQ démarré (port 3002)
- [ ] Frontend SRQ démarré (port 3100)
- [ ] Health check SRQ répond
- [ ] Login via backend central fonctionne
- [ ] API via gateway répond (GET /api/srq/containers)
- [ ] API directe répond (GET /api/containers)
- [ ] Frontend affiche le dashboard

---

## 🎉 RACCORDEMENT COMPLET

**Strategic Reserve Qatar est maintenant raccordé à Hearst Control !**

### Accès
- **Frontend** : http://localhost:3100
- **Backend SRQ** : http://localhost:3003
- **Via Gateway** : http://localhost:4000/api/srq/*
- **Backend Central** : http://localhost:4000

### Credentials
```
Email    : admin@hearstmining.com
Password : <REDACTED>
```

### Fonctionnalités Actives
- ✅ Authentification centralisée
- ✅ API Gateway proxying
- ✅ Monitoring global (à développer)
- ✅ Gestion utilisateurs unifiée
- ✅ Base de données partagée

---

> **Strategic Reserve Qatar - SRQ-001**  
> Raccordé à Hearst Control V1.1.0  
> Décembre 2025
