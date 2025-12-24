# Hearst Design — Projet Web Multi-Composants

**Version :** 1.0.0  
**Port Backend :** 3002  
**Port Frontend :** 3002  
**Status :** Active

---

## 🎯 Vue d'ensemble

**Hearst Design** est un projet web complet comprenant :

1. **Backend API** (Express.js) — Port 3002
2. **Frontend Application** (Next.js 14) — Interfaces web interactives
3. **Theme Builder** (HTML/CSS/JS Vanilla) — Système de design interactif

---

## 📁 Structure du Projet

```
hearst-design/
├── backend/                    # API Express.js (Port 3002)
│   ├── controllers/            # Logique métier
│   ├── routes/                 # Définition routes API
│   ├── middleware/             # Middlewares Express
│   ├── utils/                  # Utilitaires
│   └── server.js               # Point d'entrée backend
│
├── frontend/                   # Application Next.js 14
│   ├── src/app/                # App Router Next.js
│   │   ├── dashboard/          # Dashboard principal
│   │   ├── login/              # Page de connexion
│   │   └── layout.tsx          # Layout global
│   └── src/lib/                # Bibliothèques utilitaires
│
├── theme-builder/              # Theme Builder / Design System
│   ├── index.html              # Application principale
│   ├── css/                    # Styles modulaires
│   ├── js/                     # Modules JavaScript ES6
│   ├── design-tokens.json      # Tokens de design
│   └── README.md               # Documentation Theme Builder
│
├── PROJECT_CONFIG.json         # Configuration projet
└── VERSION.json                # Métadonnées version
```

---

## 🚀 Démarrage Rapide

### Option 1 : Démarrage via Hearst Control (recommandé)

```bash
# Depuis la racine du repo
./scripts/start-all.sh
```

Hearst Control démarre automatiquement :
- Backend Central (port 4000)
- Hearst Design Backend (port 3002)
- Hearst Design Frontend (port 3002)

**URLs :**
- Frontend : http://localhost:3002
- Backend API : http://localhost:3002/api
- Theme Builder : http://localhost:3002/theme-builder (si intégré)

### Option 2 : Démarrage Manuel

#### Backend

```bash
cd projects/hearst-design/backend
npm install
npm start
```

Le backend démarre sur **port 3002**.

#### Frontend

```bash
cd projects/hearst-design/frontend
npm install
npm run dev
```

Le frontend démarre sur **port 3002**.

#### Theme Builder (Standalone)

```bash
cd projects/hearst-design/theme-builder
python3 -m http.server 8080
```

Puis ouvrir : http://localhost:8080

---

## 🎨 Theme Builder — Système de Design Interactif

Le **Theme Builder** est un outil web standalone pour créer, prévisualiser et exporter des thèmes graphiques en temps réel.

### Fonctionnalités

- **4 palettes pré-configurées** : Dark Pro, Light Clean, Blue Tech, Green Mining
- **Composants interactifs** : Cards, Menus, Forms, Alerts, KPIs
- **Preview en temps réel** : Application instantanée via CSS Variables
- **Export JSON/CSS** : Télécharger thèmes créés
- **Keyboard Shortcuts** : Ctrl/Cmd+S (save), Ctrl/Cmd+E (export)
- **Accessibilité WCAG AAA** : Contrastes optimisés, navigation clavier complète

### Lancer le Theme Builder

#### Standalone (serveur local)

```bash
cd projects/hearst-design/theme-builder
python3 -m http.server 8080
```

Ouvrir : http://localhost:8080

#### Documentation complète

Voir [`theme-builder/README.md`](theme-builder/README.md) pour :
- Guide d'utilisation complet
- Documentation architecture
- Roadmap phases 2-3
- Raccourcis clavier

---

## 🔐 Configuration

### Backend (.env)

```bash
cd backend
cp env.example .env
```

Variables requises :
```bash
PORT=3002
NODE_ENV=development
JWT_SECRET=<votre-secret>
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...
```

### Frontend (.env.local)

```bash
cd frontend
cp env.example .env.local
```

Variables requises :
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api/design
```

**Important :** Le frontend DOIT pointer vers le **Backend Central (port 4000)**, pas directement vers le backend du projet (règle #42).

---

## 📊 API Documentation

### Endpoints Principaux

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/health` | GET | Health check |
| `/api/auth/login` | POST | Authentification |
| `/api/auth/verify` | GET | Vérification token |
| `/api/metrics` | GET | Métriques projet |
| `/api/pages` | GET | Liste des pages |
| `/api/servers` | GET | État des serveurs |

Documentation complète : `backend/swagger.json`

---

## 🧪 Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

---

## 📚 Documentation Complémentaire

| Document | Description |
|----------|-------------|
| `theme-builder/README.md` | Guide complet Theme Builder |
| `theme-builder/ARCHITECTURE_UX_UI.md` | Architecture technique |
| `theme-builder/GUIDE_UTILISATEUR.md` | Guide utilisateur |
| `backend/swagger.json` | Documentation API |
| `PROJECT_CONFIG.json` | Configuration projet |

---

## 🔗 Intégration Hearst Control

Ce projet est intégré dans **Hearst Control** :

- **Backend Central** : http://localhost:4000
- **API Gateway** : Toutes les requêtes passent par le backend central
- **Authentification** : JWT multi-tenant centralisée
- **Monitoring** : DevMonitor intégré

---

## 📝 Notes d'Architecture

### Règles Respectées

- **Isolation complète** : Projet 100% indépendant (règle #2)
- **Pas de dépendances** : Aucun import depuis d'autres projets (règle #2)
- **Backend Central** : Frontend pointe vers port 4000 (règle #42)
- **Code commun** : Utilise `core/` pour auth et middlewares (règle #3)

### Structure Multi-Composants

Ce projet combine 3 composants indépendants :

1. **Backend API** : Logique métier, authentification, données
2. **Frontend Next.js** : Interface web principale
3. **Theme Builder** : Outil de design standalone (HTML/CSS/JS)

Chaque composant peut être lancé et utilisé indépendamment.

---

## 🛑 Arrêt des Services

### Via Hearst Control

```bash
./scripts/stop-all.sh
```

### Manuel

```bash
# Trouver les PIDs
lsof -i:3002

# Tuer les processus
kill <PID>
```

---

## 📞 Support

Pour toute question ou problème :

1. Vérifier la documentation dans `docs/`
2. Consulter les logs : `tail -f ../../logs/design-backend.log`
3. Vérifier l'état : `curl http://localhost:3002/api/health`

---

**Hearst Design** | Projet Web Multi-Composants  
**Intégré à Hearst Control V2.0**  
**Dernière mise à jour :** 24 décembre 2025

