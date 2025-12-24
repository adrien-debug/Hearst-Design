# 🎨 Hearst Design - Frontend

**Design Management Platform - Interface utilisateur**

---

## 📋 Description

Frontend Next.js 14 pour la plateforme de gestion de design et prototypage Hearst Design.

---

## 🚀 Démarrage Rapide

### Installation

```bash
cd projects/hearst-design/frontend
npm install
```

### Configuration

```bash
# Copier le fichier d'environnement
cp env.example .env.local

# ⚠️ Ne PAS modifier NEXT_PUBLIC_API_URL
# L'URL doit toujours pointer vers le Backend Central (port 4000)
```

### Lancement

```bash
# Mode développement (port 3002)
npm run dev

# Build production
npm run build

# Lancer en production
npm start
```

---

## 🌐 URLs et Ports

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:3002 | 3002 |
| API (Backend Central) | http://localhost:4000/api/design | 4000 |
| Backend Project | http://localhost:3002 (internal) | 3002 |

⚠️ **IMPORTANT** : Le frontend communique **UNIQUEMENT** avec le Backend Central (port 4000).
L'accès direct au backend de projet est **INTERDIT**.

---

## 📁 Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── login/          # Page de connexion
│   │   ├── dashboard/      # Dashboard principal
│   │   ├── layout.tsx      # Layout racine
│   │   └── globals.css     # Styles globaux
│   └── lib/
│       └── api.ts          # Client API
├── public/                 # Assets statiques
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🎨 Charte Graphique

### Couleurs Hearst

- **Vert Principal** : `#8afd81` (`--hearst-green`)
- **Fond Sombre** : `#0a0a0a` (`--hearst-dark`)
- **Gris Hearst** : `#1a1a1a` (`--hearst-gray`)

### Utilisation Tailwind

```tsx
// Classes prédéfinies
<div className="bg-hearst-dark text-hearst-green border-hearst-gray" />

// CSS Variables
<div style={{ backgroundColor: 'var(--hearst-green)' }} />
```

---

## 🔐 Authentification

### Flux de connexion

1. L'utilisateur entre ses identifiants sur `/login`
2. Le frontend envoie la requête au Backend Central : `POST http://localhost:4000/api/design/auth/login`
3. Le Backend Central valide via le core/auth
4. Token JWT retourné et stocké dans localStorage
5. Redirection vers `/dashboard`

### Protection des routes

```tsx
// Vérification automatique du token
useEffect(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
  }
}, [])
```

---

## 📦 Technologies

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **Lucide React** - Icônes
- **Axios** - Requêtes HTTP

---

## 🔧 Scripts Disponibles

```bash
npm run dev          # Démarrage développement (port 3002)
npm run build        # Build production
npm start            # Lancer en production (port 3002)
npm run lint         # Linter ESLint
npm run type-check   # Vérification TypeScript
```

---

## 📊 Variables d'Environnement

| Variable | Valeur | Description |
|----------|--------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000/api/design` | **NE PAS MODIFIER** |
| `NEXT_PUBLIC_PROJECT_NAME` | `Hearst Design` | Nom du projet |
| `NEXT_PUBLIC_PROJECT_SLUG` | `hearst-design` | Slug du projet |

---

## ⚠️ Règles Importantes

### Règle #42 - Backend Central Obligatoire

**TOUS les appels API doivent passer par le Backend Central (port 4000)**

```typescript
// ✅ CORRECT
const API_URL = 'http://localhost:4000/api/design'

// ❌ INTERDIT
const API_URL = 'http://localhost:3002'  // Accès direct au backend projet
```

**Documentation complète** : `/REGLE_URLS_FRONTENDS.md`

---

## 🐛 Debugging

### Logs Frontend

```bash
# Logs en temps réel
tail -f ../../logs/design-frontend.log
```

### Erreurs Communes

1. **Port déjà utilisé**
   ```bash
   # Changer le port temporairement
   npm run dev -- -p 3010
   ```

2. **Backend Central non démarré**
   ```bash
   # Démarrer le backend central
   cd ../../../backend-central
   npm start
   ```

3. **Token expiré**
   ```typescript
   // Supprimer le token et se reconnecter
   localStorage.removeItem('token')
   ```

---

## 📚 Documentation

- [Architecture Globale](../../../README.md)
- [Backend Central](../../../backend-central/README.md)
- [Backend Design](../backend/README.md)
- [Règles URLs](../../../REGLE_URLS_FRONTENDS.md)

---

## 🔄 État du Projet

**Statut** : ✅ Structure complète créée (24 décembre 2025)

**Fonctionnalités implémentées** :
- ✅ Page de connexion
- ✅ Dashboard de base
- ✅ Client API configuré
- ✅ Authentification JWT
- ✅ Charte graphique Hearst

**À développer** :
- 🔨 Gestion des projets de design
- 🔨 Upload et gestion des prototypes
- 🔨 Bibliothèque d'assets
- 🔨 Collaboration en temps réel

---

**Hearst Design Frontend** | Port 3002 | Next.js 14 | Décembre 2025

