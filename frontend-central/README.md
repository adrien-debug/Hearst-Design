# 🏢 Hearst Control - Frontend Central

**Interface centralisée pour la gestion des projets Hearst**

---

## 🎯 Vue d'ensemble

Le frontend-central est l'interface utilisateur principale de Hearst Control. Il permet de :
- ✅ Se connecter avec un compte centralisé
- ✅ Voir tous les projets accessibles sous forme de BOXES
- ✅ Accéder au monitoring de chaque projet

---

## 📁 Structure

```
frontend-central/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── login/             # Page de connexion
│   │   ├── dashboard/         # Dashboard avec BOXES des projets
│   │   └── project/[slug]/    # Monitoring dynamique par projet
│   ├── lib/                   # Utilitaires
│   │   ├── api-client.ts      # Client API vers backend-central
│   │   ├── auth.ts            # Gestion authentification
│   │   └── utils.ts           # Fonctions utilitaires
│   └── types/                 # Types TypeScript
│       └── index.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

---

## 🚀 Installation et démarrage

### 1. Installation des dépendances

```bash
cd frontend-central
npm install
```

### 2. Configuration

Créer un fichier `.env.local` :

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 3. Démarrage en développement

```bash
npm run dev
```

Le frontend sera accessible sur **http://localhost:3100**

### 4. Build production

```bash
npm run build
npm start
```

---

## 🔗 Connexion au Backend

Le frontend se connecte automatiquement au **backend-central** sur le port **4000**.

### Endpoints utilisés

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/auth/login` | POST | Connexion utilisateur |
| `/api/auth/verify` | GET | Vérification token |
| `/api/projects` | GET | Liste des projets |
| `/api/projects/:id` | GET | Détails d'un projet |
| `/api/projects/:id/stats` | GET | Statistiques d'un projet |

---

## 📄 Pages

### 1. **Login** (`/login`)
- Formulaire d'authentification
- Validation email/password
- Stockage du token JWT
- Redirection vers `/dashboard` après succès

### 2. **Dashboard** (`/dashboard`) ⭐ **PAGE PRINCIPALE**
- Affichage de tous les projets sous forme de BOXES
- Filtres : Tous / Actifs / Hors ligne
- Stats temps réel (serveurs, pages, conflits, uptime)
- Clic sur une BOX → Redirection vers `/project/[slug]`

### 3. **DevMonitor** (`/project/[slug]`)
- Monitoring du projet sélectionné
- 3 onglets : Vue d'ensemble, Pages, Serveurs
- Bouton retour vers le dashboard
- Design cohérent avec la charte Hearst

---

## 🎨 Design

### Charte Graphique Hearst

- **Background** : `#050506` (noir profond)
- **Accent** : `#8AFD81` (vert Hearst signature)
- **Pattern** : Points verts avec effet glow
- **Cards** : `bg-white/[0.02]` avec bordures subtiles
- **Animations** : Transitions fluides 300ms

### Composants UI

- **ProjectCard** : Box cliquable avec stats et status indicator
- **DashboardHeader** : Header avec logo, horloge, et menu utilisateur
- **Inputs** : Style uniforme avec focus vert Hearst
- **Buttons** : Primaire (vert) et secondaire (transparent)

---

## 🔐 Authentification

### Flux

1. Utilisateur saisit email/password sur `/login`
2. Appel à `POST /api/auth/login` (backend-central)
3. Réception du token JWT et des infos utilisateur
4. Stockage dans `localStorage` :
   - `hearst_token` : JWT
   - `hearst_user` : Objet utilisateur
5. Redirection vers `/dashboard`

### Protection des routes

Toutes les pages sauf `/login` vérifient l'authentification :

```typescript
if (!isAuthenticated()) {
  router.replace('/login');
}
```

---

## 🧩 Composants principaux

### ProjectCard (Dashboard)

Affiche un projet sous forme de card avec :
- Icône et nom du projet
- Status indicator (actif/maintenance/offline)
- 4 stats : Serveurs, Pages, Conflits, Uptime
- Dernière activité
- Hover effect avec flèche

### DashboardHeader

Header sticky avec :
- Logo Hearst animé
- Horloge temps réel
- Menu utilisateur (nom, rôle, déconnexion)

---

## 📊 Gestion des données

### Polling

Le dashboard fait du polling toutes les **10 secondes** pour rafraîchir :
- Liste des projets
- Stats de chaque projet

### Cache

Les données sont stockées dans l'état React et rafraîchies automatiquement.

---

## 🛠️ Technologies

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **React Hooks** - Gestion d'état

---

## 📝 TODO

- [ ] Connecter les onglets Pages/Serveurs aux APIs des projets
- [ ] Ajouter un onglet Métriques avec charts
- [ ] Implémenter le polling pour les stats temps réel
- [ ] Ajouter des notifications toast
- [ ] Mode sombre/clair (optionnel)

---

## 🐛 Debugging

### Problème de connexion API

Vérifier que le backend-central est bien démarré :

```bash
cd ../backend-central
npm start
```

### Token expiré

Le token JWT expire après 24h. Déconnexion automatique et redirection vers `/login`.

### CORS

Le backend-central doit avoir la configuration CORS appropriée pour accepter les requêtes depuis `http://localhost:3100`.

---

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

---

**Hearst Control V2.0** | Frontend Central | Décembre 2025

