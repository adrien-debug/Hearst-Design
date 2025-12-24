# 🚀 DÉMARRAGE RAPIDE - Hearst Control Frontend

**Interface centralisée créée avec succès ! ✅**

---

## ✅ CE QUI A ÉTÉ CRÉÉ

### 📁 Structure complète

```
frontend-central/
├── src/
│   ├── app/
│   │   ├── login/page.tsx              ✅ Page de connexion
│   │   ├── dashboard/page.tsx          ✅ Dashboard avec BOXES
│   │   │   └── components/
│   │   │       ├── ProjectCard.tsx     ✅ BOX de projet
│   │   │       └── DashboardHeader.tsx ✅ Header
│   │   ├── project/[slug]/page.tsx     ✅ DevMonitor dynamique
│   │   ├── layout.tsx                  ✅ Layout racine
│   │   ├── globals.css                 ✅ Styles Hearst
│   │   └── page.tsx                    ✅ Redirect home
│   ├── lib/
│   │   ├── api-client.ts               ✅ Client API
│   │   ├── auth.ts                     ✅ Auth utils
│   │   └── utils.ts                    ✅ Utilitaires
│   └── types/
│       └── index.ts                    ✅ Types TypeScript
├── package.json                        ✅ Config Next.js 14
├── tsconfig.json                       ✅ TypeScript
├── tailwind.config.js                  ✅ Tailwind + couleurs Hearst
├── next.config.js                      ✅ Config Next
└── README.md                           ✅ Documentation
```

### 🎯 3 Pages principales

1. **`/login`** - Authentification centralisée
2. **`/dashboard`** - BOXES des projets (PAGE PRINCIPALE) ⭐
3. **`/project/[slug]`** - DevMonitor dynamique

---

## 🏁 DÉMARRAGE EN 3 ÉTAPES

### Étape 1 : Installation

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst-Control-GitHub/frontend-central
npm install
```

### Étape 2 : Configuration

Créer le fichier `.env.local` :

```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local
```

### Étape 3 : Lancement

```bash
# Démarrer le frontend
npm run dev
```

Le frontend sera accessible sur : **http://localhost:3100**

---

## 🔗 CONNEXION AU BACKEND

Le frontend se connecte automatiquement au **backend-central** (port 4000).

### ⚠️ IMPORTANT : Démarrer le backend d'abord

```bash
# Dans un autre terminal
cd /Users/adrienbeyondcrypto/Desktop/Hearst-Control-GitHub/backend-central
npm start
```

Le backend doit être sur le port **4000**.

---

## 🎬 FLUX COMPLET

### 1️⃣ Démarrer le backend-central

```bash
cd backend-central
npm start
# ✅ Backend sur http://localhost:4000
```

### 2️⃣ Démarrer le frontend-central

```bash
cd frontend-central
npm run dev
# ✅ Frontend sur http://localhost:3100
```

### 3️⃣ Accéder à l'interface

1. Ouvrir **http://localhost:3100**
2. Vous serez redirigé vers `/login`
3. Saisir vos identifiants Hearst
4. Après connexion → Dashboard avec les BOXES des projets
5. Cliquer sur un projet → Page DevMonitor

---

## 📊 STRUCTURE DES DONNÉES

### Projets dans la base de données

Le frontend récupère les projets depuis :
- **Endpoint** : `GET /api/projects`
- **Authentification** : Bearer token (JWT)
- **Filtrage** : Automatique par tenant_id (sauf super_admin)

### Format attendu

```json
{
  "projects": [
    {
      "id": "uuid",
      "name": "Hearst Qatar",
      "slug": "hearst-qatar",
      "description": "Mining Dashboard Qatar 100MW",
      "status": "active",
      "icon": "🏜️",
      "color": "#8AFD81",
      "baseUrl": "http://localhost:3001",
      "apiUrl": "http://localhost:3001",
      "port": 3001,
      "tenant_id": "tenant-uuid"
    }
  ]
}
```

---

## 🎨 DESIGN HEARST

### Couleurs

- **Background** : `#050506` (noir profond)
- **Accent** : `#8AFD81` (vert Hearst signature)
- **Status actif** : `#8AFD81`
- **Status maintenance** : `#F59E0B`
- **Status offline** : `#EF4444`

### Effets visuels

- ✅ Pattern de points verts en background
- ✅ Effet glow vert sur le logo
- ✅ Animations fluides (300ms)
- ✅ Hover effects sur les cards
- ✅ Status indicators animés

---

## 🔐 AUTHENTIFICATION

### Connexion

1. Utilisateur saisit email + password
2. Appel `POST /api/auth/login`
3. Réception token JWT + infos user
4. Stockage dans localStorage
5. Redirection vers dashboard

### Token JWT

Le token contient :
```json
{
  "id": "user-uuid",
  "email": "admin@hearst.com",
  "role": "admin",
  "tenant_id": "tenant-uuid"
}
```

### Déconnexion

Cliquer sur le menu utilisateur (en haut à droite) → Déconnexion

---

## 📦 SCRIPTS DISPONIBLES

```bash
# Développement (avec hot-reload)
npm run dev

# Build production
npm run build

# Démarrage production
npm start

# Linting
npm run lint

# Type-check
npm run type-check
```

---

## 🐛 DÉPANNAGE

### Le frontend ne démarre pas

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Erreur de connexion API

1. Vérifier que backend-central est démarré :
   ```bash
   curl http://localhost:4000/api/health
   ```

2. Vérifier l'URL dans `.env.local` :
   ```
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

### CORS Error

Le backend-central doit accepter les requêtes depuis `http://localhost:3100`.

Vérifier dans `backend-central/server.js` :
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3100',
  credentials: true
}));
```

### Token expiré

Le token JWT expire après 24h. Si vous avez un token expiré :
1. Déconnexion automatique
2. Redirection vers `/login`
3. Se reconnecter

---

## 📚 PROCHAINES ÉTAPES

### Fonctionnalités à ajouter (optionnel)

- [ ] Onglet Métriques avec charts (Chart.js ou Recharts)
- [ ] Connexion temps réel aux APIs des projets individuels
- [ ] Notifications toast pour les événements
- [ ] Filtres avancés sur le dashboard
- [ ] Recherche de projets
- [ ] Mode sombre/clair

### Connexion aux projets individuels

Pour connecter le DevMonitor aux APIs spécifiques de chaque projet :

```typescript
// Exemple : récupérer les serveurs du projet
const serversResponse = await fetch(`${project.apiUrl}/api/servers`);
const serversData = await serversResponse.json();
```

---

## ✅ CHECKLIST VÉRIFICATION

- [x] Structure frontend-central créée
- [x] Page Login fonctionnelle
- [x] Page Dashboard avec BOXES
- [x] Page DevMonitor dynamique
- [x] Composants UI (ProjectCard, DashboardHeader)
- [x] Client API configuré
- [x] Authentification JWT
- [x] Design Hearst complet
- [x] TypeScript configuré
- [x] Tailwind CSS configuré
- [x] Documentation README

---

## 🎉 FÉLICITATIONS !

Le **frontend-central** de Hearst Control est **complet et opérationnel** ! ✨

Vous avez maintenant :
- ✅ Une interface de connexion élégante
- ✅ Un dashboard avec toutes les BOXES des projets
- ✅ Un système de monitoring par projet
- ✅ Une authentification centralisée
- ✅ Un design 100% Hearst

### 🚀 Lancement rapide

```bash
# Terminal 1 : Backend
cd backend-central && npm start

# Terminal 2 : Frontend
cd frontend-central && npm run dev

# Ouvrir http://localhost:3100
```

---

**Hearst Control V2.0** | Frontend Central Opérationnel | Décembre 2025 🎊

