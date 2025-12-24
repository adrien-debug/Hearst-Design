# 🎨 HEARST DESIGN

> **Type** : Projet Web Design System  
> **Statut** : 🟢 **ACTIF**  
> **Port Backend** : 3002  
> **Port Frontend** : 3200  
> **Date Création** : Décembre 2025

---

## 📊 À PROPOS DU PROJET

### Informations Générales

**Hearst Design** est un système de design complet comprenant un theme builder interactif, une application web moderne et une API backend robuste.

**Composants** :
- **Theme Builder** : Système de création de thèmes interactif
- **Design System** : Composants UI réutilisables
- **Backend API** : Gestion des projets et contenus
- **Frontend App** : Interface utilisateur moderne

### Architecture

```
hearst-design/
├── backend/                    # Backend Express.js (Port 3002)
│   ├── controllers/            # Contrôleurs métier
│   ├── routes/                 # Routes API
│   ├── middleware/             # Middlewares
│   ├── core-modules/           # Code partagé (copie de core/)
│   ├── utils/                  # Utilitaires
│   └── server.js               # Point d'entrée
│
├── frontend/                   # Frontend Next.js (Port 3200)
│   ├── src/
│   │   ├── app/                # Pages Next.js
│   │   └── lib/                # Bibliothèques client
│   └── package.json
│
├── theme-builder/              # Theme Builder interactif
│   ├── css/                    # Feuilles de style
│   ├── js/                     # Scripts JavaScript
│   ├── docs/                   # Documentation theme
│   └── index.html              # Interface theme builder
│
└── docs/                       # Documentation projet
```

---

## 🔐 SÉCURITÉ & CONFORMITÉ

### Règles Applicables

| # | Règle | Description | Statut |
|---|-------|-------------|--------|
| **#42** | URLs Frontend | DOIT pointer vers Backend Central (4000) | ✅ Conforme |
| **#43** | Accès Direct | Accès direct port 3002 INTERDIT | ✅ Documenté |
| **#44** | Modification URLs | Nécessite autorisation architecte | ✅ Warnings |
| **#30** | Secrets | Pas de secrets en dur | ✅ .gitignore |
| **#31** | Variables Env | Variables d'environnement | ✅ env.example |

### URLs & Ports

| Service | Port | URL | Accès |
|---------|------|-----|-------|
| **Backend Design** | 3002 | http://localhost:3002 | ⚠️ Direct déconseillé |
| **Frontend Design** | 3200 | http://localhost:3200 | ✅ Principal |
| **Backend Central** | 4000 | http://localhost:4000 | ✅ API Gateway |
| **API Design (via Central)** | 4000 | http://localhost:4000/api/design | ✅ Recommandé |

---

## 🚀 CONFIGURATION

### Prérequis

- Node.js 18+
- npm ou yarn
- Supabase configuré
- Backend Central démarré (port 4000)

### Variables d'Environnement

#### Backend (`.env`)

```bash
# Application
NODE_ENV=development
PORT=3002

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# JWT
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:3200

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

**⚠️ Voir** : `backend/env.example` pour le template complet

#### Frontend (`.env.local`)

```bash
# ⚠️ RÈGLE #42 - NE PAS MODIFIER L'URL API
# Toutes les requêtes DOIVENT passer par le Backend Central
NEXT_PUBLIC_API_URL=http://localhost:4000/api/design

# Project Information
NEXT_PUBLIC_PROJECT_NAME=Hearst Design
NEXT_PUBLIC_PROJECT_SLUG=hearst-design

# UI Configuration
NEXT_PUBLIC_THEME=light
NEXT_PUBLIC_PRIMARY_COLOR=#3b82f6
```

**⚠️ IMPORTANT** : Le frontend DOIT pointer vers le Backend Central (port 4000), PAS vers le backend Design direct (port 3002). Voir [REGLE_URLS_FRONTENDS.md](../../REGLE_URLS_FRONTENDS.md).

---

## 📦 INSTALLATION

### Installation Complète

```bash
# 1. Backend
cd backend
npm install
cp env.example .env
# Éditer .env avec vos credentials

# 2. Frontend  
cd ../frontend
npm install
cp env.example .env.local
# NE PAS MODIFIER l'URL API (Règle #42)

# 3. Theme Builder (optionnel)
cd ../theme-builder
# Pas d'installation nécessaire (HTML/CSS/JS pur)
```

---

## 🎮 UTILISATION

### Démarrage Services

```bash
# Depuis la racine Hearst Control
./scripts/start-all.sh

# OU individuellement :

# Backend
cd projects/hearst-design/backend
npm start

# Frontend
cd projects/hearst-design/frontend
npm run dev

# Theme Builder
# Ouvrir theme-builder/index.html dans un navigateur
```

### Arrêter Services

```bash
# Depuis la racine
./scripts/stop-all.sh

# OU Ctrl+C dans chaque terminal
```

---

## 🌐 URLS

### Services Locaux

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3200 | Application principale |
| **Theme Builder** | file:///.../theme-builder/index.html | Constructeur de thèmes |
| **API (via Central)** | http://localhost:4000/api/design | API recommandée |
| **Backend Direct** | http://localhost:3002 | ⚠️ Déconseillé |

### Routes API Principales

```
GET  /api/design/health          # Health check
POST /api/design/auth/login      # Authentification
GET  /api/design/projects        # Liste projets
GET  /api/design/containers      # Liste containers
GET  /api/design/miners          # Liste mineurs
```

---

## 🎨 THEME BUILDER

### Accès

```bash
# Ouvrir dans un navigateur
open projects/hearst-design/theme-builder/index.html

# OU si vous avez un serveur HTTP local
cd projects/hearst-design/theme-builder
python3 -m http.server 8000
open http://localhost:8000
```

### Fonctionnalités

- ✅ Création de thèmes personnalisés
- ✅ Prévisualisation en temps réel
- ✅ Export CSS/JSON
- ✅ Composants UI préfabriqués
- ✅ Design tokens configurables

### Documentation

- [GUIDE_UTILISATEUR.md](./theme-builder/GUIDE_UTILISATEUR.md)
- [ARCHITECTURE_UX_UI.md](./theme-builder/ARCHITECTURE_UX_UI.md)
- [CSS_ENRICHMENT_GUIDE.md](./theme-builder/CSS_ENRICHMENT_GUIDE.md)

---

## 📚 DOCUMENTATION

### Documentation Principale

| Document | Description |
|----------|-------------|
| [README.md](./README.md) | Ce fichier |
| [SECURITY.md](./SECURITY.md) | Guide sécurité |
| [QUICK_START.md](./QUICK_START.md) | Démarrage rapide |
| [CHANGELOG.md](./CHANGELOG.md) | Historique versions |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Guide contribution |

### Documentation Theme Builder

| Document | Description |
|----------|-------------|
| [theme-builder/README.md](./theme-builder/README.md) | Vue d'ensemble |
| [theme-builder/GUIDE_UTILISATEUR.md](./theme-builder/GUIDE_UTILISATEUR.md) | Guide utilisateur |
| [theme-builder/ARCHITECTURE_UX_UI.md](./theme-builder/ARCHITECTURE_UX_UI.md) | Architecture UX/UI |
| [theme-builder/INDEX_DOCUMENTS.md](./theme-builder/INDEX_DOCUMENTS.md) | Index documentation |

---

## 🔧 DÉVELOPPEMENT

### Standards de Code

**Backend** :
- Node.js 18+
- Express.js
- Structure MVC
- Async/await obligatoire
- Try/catch sur toutes opérations async

**Frontend** :
- Next.js 14
- React 18
- TypeScript strict
- Tailwind CSS
- Composants fonctionnels uniquement

**Theme Builder** :
- HTML5/CSS3/JavaScript pur
- Pas de framework
- Vanilla JS
- CSS moderne (variables, grid, flexbox)

### Conventions Nommage

```javascript
// Fichiers
authController.js       // Backend
api.ts                  // Frontend
theme-manager.js        // Theme Builder

// Classes
class AuthService {}    // PascalCase

// Fonctions
function getUserById() {} // camelCase

// Constantes
const JWT_SECRET = ''   // UPPER_SNAKE_CASE

// Dossiers
core-modules/           // kebab-case
```

---

## 🧪 TESTS

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
```

### Tests Manuels

```bash
# Health check
curl http://localhost:4000/api/design/health

# Login (remplacer credentials)
curl -X POST http://localhost:4000/api/design/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hearst.com","password":"password"}'
```

---

## 🚨 DÉPANNAGE

### Problèmes Courants

#### 1. Erreur "URL non conforme"

**Cause** : Frontend ne pointe pas vers Backend Central  
**Solution** :

```bash
# Vérifier frontend/.env.local
cat frontend/.env.local
# Doit contenir : NEXT_PUBLIC_API_URL=http://localhost:4000/api/design
```

#### 2. Backend ne démarre pas

```bash
# Port déjà utilisé ?
lsof -i :3002
kill -9 <PID>

# Variables manquantes ?
cat backend/.env

# Tester Supabase
cd backend
node -e "require('dotenv').config(); console.log(process.env.SUPABASE_URL)"
```

#### 3. Frontend ne se connecte pas

```bash
# Backend Central démarré ?
curl http://localhost:4000/api/design/health

# URL correcte ?
grep NEXT_PUBLIC_API_URL frontend/.env.local
```

#### 4. Theme Builder ne charge pas

```bash
# Vérifier le chemin des assets
# Les chemins doivent être relatifs dans index.html

# Servir via HTTP local
cd theme-builder
python3 -m http.server 8000
```

---

## 🔗 LIENS UTILES

### Documentation Globale

- [Architecture Hearst Control](../../docs/architecture/ARCHITECTURE_GLOBALE.md)
- [Guide Agents AI](../../AI_AGENT_GUIDE.md)
- [Quick Start AI](../../QUICK_START_AI.md)
- [Project Structure](../../PROJECT_STRUCTURE.md)

### Règles & Sécurité

- [Règles URLs Frontends](../../REGLE_URLS_FRONTENDS.md)
- [44 Règles Complètes](../../docs/ESSENTIELS/RULES_REFERENCE.md)
- [Guide Sécurité](../../docs/securite/SECURITE_README.md)

### Scripts Utiles

```bash
# Depuis la racine Hearst Control
./scripts/start-all.sh              # Démarrer tous les services
./scripts/stop-all.sh               # Arrêter tous les services
./scripts/verify-frontend-urls.sh   # Vérifier URLs conformes
./scripts/check-secrets.sh          # Vérifier secrets
```

---

## 📞 SUPPORT

### En Cas de Problème

1. **Consulter la documentation** :
   - Ce README
   - [QUICK_START.md](./QUICK_START.md)
   - [SECURITY.md](./SECURITY.md)

2. **Vérifier les logs** :
   ```bash
   tail -f backend/logs/*.log
   ```

3. **Tester la configuration** :
   ```bash
   curl http://localhost:4000/api/design/health
   ```

4. **Contacter l'équipe** :
   - Technique : tech@hearst.com
   - Design : design@hearst.com

---

## ✅ CHECKLIST

### Avant de Commencer

- [ ] Node.js 18+ installé
- [ ] Backend Central démarré (port 4000)
- [ ] Supabase configuré
- [ ] Variables d'environnement configurées

### Avant de Développer

- [ ] Backend configuré (.env)
- [ ] Frontend configuré (.env.local avec URL correcte)
- [ ] Tests passent
- [ ] Je ne modifie PAS les URLs frontend (Règle #42)

### Avant de Pousser

- [ ] Code testé localement
- [ ] Pas de secrets en dur
- [ ] Documentation mise à jour
- [ ] Pas de régression
- [ ] Tests passent

---

## 📈 STATISTIQUES PROJET

```
Composants:      3 (Backend, Frontend, Theme Builder)
Pages Theme:     15+ composants UI
API Endpoints:   20+ routes
Documentation:   25+ fichiers
Technologies:    Express, Next.js, TypeScript, Tailwind
```

---

## 📝 CHANGELOG

### Version 1.0.0 (Décembre 2025)
- ✅ Backend API complet
- ✅ Frontend Next.js moderne
- ✅ Theme Builder interactif
- ✅ Documentation complète
- ✅ Conformité Règle #42 (URLs)
- ✅ Architecture sécurisée

---

## 📄 LICENSE

**Projet Propriétaire - Hearst Corporation**

---

**Date Mise à Jour** : 24 Décembre 2025  
**Version** : 1.0.0  
**Statut** : 🟢 **ACTIF**

---

**Hearst Control V2.0** | Design System | Projet Web
