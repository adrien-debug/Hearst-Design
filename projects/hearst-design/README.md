<div align="center">

# 🎨 Hearst Design

**Système de Design Complet & Multi-Composants**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/adrien-debug/Hearst-Design)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[![CI Pipeline](https://img.shields.io/badge/CI-passing-brightgreen.svg)](.github/workflows/ci.yml)
[![Security](https://img.shields.io/badge/security-audited-brightgreen.svg)](SECURITY.md)
[![Code Quality](https://img.shields.io/badge/code%20quality-A-brightgreen.svg)](https://github.com/adrien-debug/Hearst-Design)

[🚀 Démarrage Rapide](#-démarrage-rapide) • [📚 Documentation](#-documentation-complémentaire) • [🤝 Contribuer](CONTRIBUTING.md) • [🔒 Sécurité](SECURITY.md)

</div>

---

## 🎯 Vue d'ensemble

**Hearst Design** est un système de design complet et un projet web multi-composants comprenant :

<table>
<tr>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/Backend-Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Backend"/>
<br/>
<strong>Backend API</strong>
<br/>
Express.js • Port 3002
<br/>
<em>API REST complète avec authentification JWT</em>
</td>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/Frontend-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Frontend"/>
<br/>
<strong>Frontend Application</strong>
<br/>
Next.js 14 • TypeScript
<br/>
<em>Interface web interactive moderne</em>
</td>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/Design-Theme_Builder-9B59B6?style=for-the-badge&logo=css3&logoColor=white" alt="Theme Builder"/>
<br/>
<strong>Theme Builder</strong>
<br/>
HTML/CSS/JS Vanilla
<br/>
<em>Système de design interactif</em>
</td>
</tr>
</table>

---

## ✨ Fonctionnalités Principales

### 🔧 Backend API

- ✅ **API REST** complète avec Express.js
- ✅ **Authentification JWT** avec Supabase
- ✅ **RBAC** (Role-Based Access Control)
- ✅ **Rate Limiting** & sécurité avancée
- ✅ **Documentation Swagger** (OpenAPI 3.0)
- ✅ **Health Checks** & monitoring

### ⚛️ Frontend Next.js

- ✅ **Next.js 14** avec App Router
- ✅ **TypeScript** pour type safety
- ✅ **Tailwind CSS** pour styling
- ✅ **Dashboard** responsive
- ✅ **Authentification** intégrée
- ✅ **Design System** cohérent

### 🎨 Theme Builder

- ✅ **4 Palettes** pré-configurées (Dark Pro, Light Clean, Blue Tech, Green Mining)
- ✅ **Preview Temps Réel** des changements
- ✅ **Export JSON/CSS** des thèmes
- ✅ **Design Tokens** modulaires
- ✅ **Composants Interactifs** (Cards, Forms, Alerts, KPIs)
- ✅ **Accessibilité WCAG AAA**
- ✅ **Keyboard Shortcuts** (Ctrl/Cmd+S, Ctrl/Cmd+E)

---

## 📁 Structure du Projet

```
hearst-design/
├── 🔧 backend/                    # API Express.js (Port 3002)
│   ├── controllers/            # Logique métier
│   ├── routes/                 # Routes API REST
│   ├── middleware/             # Middlewares Express
│   ├── core-modules/           # Modules partagés
│   │   ├── auth/              # Service d'authentification
│   │   ├── database/          # Client Supabase
│   │   └── middleware/        # Middleware auth
│   └── server.js               # Point d'entrée backend
│
├── ⚛️ frontend/                   # Application Next.js 14
│   ├── src/app/                # App Router Next.js
│   │   ├── dashboard/          # Dashboard principal
│   │   ├── login/              # Page de connexion
│   │   └── layout.tsx          # Layout global
│   └── src/lib/                # Bibliothèques utilitaires
│
├── 🎨 theme-builder/              # Theme Builder / Design System
│   ├── index.html              # Application principale
│   ├── css/                    # Styles modulaires
│   │   ├── modern-tokens.css  # Design tokens CSS
│   │   ├── modern-components.css
│   │   └── modern-master.css  # Style principal
│   ├── js/                     # Modules JavaScript ES6
│   │   ├── theme-manager.js   # Gestion des thèmes
│   │   ├── export.js          # Export JSON/CSS
│   │   └── app.js             # Application principale
│   └── design-tokens.json      # Tokens de design
│
├── 📄 .github/                    # GitHub Configuration
│   ├── workflows/              # GitHub Actions CI/CD
│   │   ├── ci.yml             # Pipeline CI
│   │   ├── deploy.yml         # Déploiement
│   │   └── pr-check.yml       # Vérifications PR
│   ├── ISSUE_TEMPLATE/         # Templates d'issues
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODE_OF_CONDUCT.md
│
├── 📚 Documentation/
│   ├── README.md               # Ce fichier
│   ├── CONTRIBUTING.md         # Guide de contribution
│   ├── SECURITY.md             # Politique de sécurité
│   ├── CHANGELOG.md            # Historique des versions
│   └── LICENSE                 # Licence MIT
│
├── ⚙️ Configuration/
│   ├── PROJECT_CONFIG.json     # Configuration projet
│   ├── VERSION.json            # Métadonnées version
│   └── .gitignore              # Git ignore rules
│
└── 🌐 Déploiement/
    └── vercel.json             # Configuration Vercel
```

---

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0
- **Supabase Account** (pour l'authentification)

### Option 1 : Démarrage via Hearst Control (Recommandé)

```bash
# Depuis la racine du mono-repo Hearst Control
./scripts/start-all.sh
```

Hearst Control démarre automatiquement :
- ✅ Backend Central (port 4000)
- ✅ Hearst Design Backend (port 3002)
- ✅ Hearst Design Frontend (port 3002)

**URLs Disponibles :**
- 🌐 Frontend : http://localhost:3002
- 🔌 Backend API : http://localhost:3002/api
- 🎨 Theme Builder : http://localhost:8080

### Option 2 : Démarrage Manuel

#### 1️⃣ Backend

```bash
# Naviguer vers le backend
cd backend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp env.example .env
# Éditer .env avec vos credentials Supabase

# Démarrer le serveur
npm start
```

Le backend démarre sur **http://localhost:3002**

#### 2️⃣ Frontend

```bash
# Naviguer vers le frontend
cd frontend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp env.example .env.local
# Éditer .env.local

# Démarrer en développement
npm run dev
```

Le frontend démarre sur **http://localhost:3000** (ou 3002 si configuré)

#### 3️⃣ Theme Builder (Standalone)

```bash
# Naviguer vers theme-builder
cd theme-builder

# Démarrer un serveur HTTP simple
python3 -m http.server 8080
# Ou avec Node.js :
npx http-server -p 8080
```

Ouvrir : **http://localhost:8080**

---

## 🔐 Configuration

### Backend (.env)

```bash
cd backend
cp env.example .env
```

Variables requises :

```env
# Server
PORT=3002
NODE_ENV=development

# JWT
JWT_SECRET=votre-secret-jwt-tres-securise

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Frontend (.env.local)

```bash
cd frontend
cp env.example .env.local
```

Variables requises :

```env
# API Backend Central (Hearst Control)
NEXT_PUBLIC_API_URL=http://localhost:4000/api/design

# Ou Backend Direct (développement)
# NEXT_PUBLIC_API_URL=http://localhost:3002/api
```

**⚠️ Important :** En production, le frontend **doit** pointer vers le **Backend Central (port 4000)**, conformément à l'architecture Hearst Control (règle #42).

---

## 📊 API Documentation

### Endpoints Principaux

| Endpoint | Méthode | Description | Auth |
|----------|---------|-------------|------|
| `/api/health` | GET | Health check | ❌ |
| `/api/auth/login` | POST | Authentification | ❌ |
| `/api/auth/verify` | GET | Vérification token | ✅ |
| `/api/auth/me` | GET | Profil utilisateur | ✅ |
| `/api/metrics` | GET | Métriques projet | ✅ |
| `/api/pages` | GET | Liste des pages | ✅ |
| `/api/servers` | GET | État des serveurs | ✅ |

### Swagger Documentation

Documentation interactive complète disponible dans `backend/swagger.json`

Exemple d'appel API :

```bash
# Health Check
curl http://localhost:3002/api/health

# Login
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Métriques (avec token)
curl http://localhost:3002/api/metrics \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🎨 Theme Builder — Guide d'Utilisation

### Palettes Disponibles

<table>
<tr>
<td align="center">🌑 <strong>Dark Pro</strong><br/>Mode sombre professionnel</td>
<td align="center">☀️ <strong>Light Clean</strong><br/>Mode clair minimal</td>
</tr>
<tr>
<td align="center">🔵 <strong>Blue Tech</strong><br/>Bleu technologique</td>
<td align="center">🟢 <strong>Green Mining</strong><br/>Vert mining</td>
</tr>
</table>

### Raccourcis Clavier

| Raccourci | Action |
|-----------|--------|
| `Ctrl/Cmd + S` | Sauvegarder le thème actuel |
| `Ctrl/Cmd + E` | Exporter en JSON/CSS |
| `Ctrl/Cmd + L` | Charger un thème |
| `Esc` | Fermer les modales |

### Export de Thèmes

Le Theme Builder permet d'exporter les thèmes dans deux formats :

**📦 JSON (Design Tokens)**
```json
{
  "colors": {
    "primary": "#667eea",
    "secondary": "#764ba2",
    ...
  },
  "typography": {...},
  "spacing": {...}
}
```

**🎨 CSS (Variables)**
```css
:root {
  --color-primary: #667eea;
  --color-secondary: #764ba2;
  --font-family-base: 'Inter', sans-serif;
  ...
}
```

Pour plus de détails, consultez [`theme-builder/README.md`](theme-builder/README.md)

---

## 🧪 Tests

### Backend Tests

```bash
cd backend
npm test                    # Tous les tests
npm test -- --watch        # Mode watch
npm test -- --coverage     # Avec coverage
```

### Frontend Tests

```bash
cd frontend
npm test                   # Tests Jest
npm run test:e2e          # Tests E2E (Playwright)
npm run test:coverage     # Avec coverage
```

### Tests Manuels

```bash
# Backend Health Check
curl http://localhost:3002/api/health

# Frontend
open http://localhost:3002

# Theme Builder
open http://localhost:8080
```

---

## 🛠️ Stack Technologique

### Backend

<p>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"/>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
</p>

### Frontend

<p>
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
</p>

### Design System

<p>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
<img src="https://img.shields.io/badge/Design_Tokens-9B59B6?style=for-the-badge" alt="Design Tokens"/>
</p>

### DevOps & Tools

<p>
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions"/>
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint"/>
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" alt="Prettier"/>
</p>

---

## 📚 Documentation Complémentaire

| Document | Description |
|----------|-------------|
| 📖 [`theme-builder/README.md`](theme-builder/README.md) | Guide complet Theme Builder |
| 🏗️ [`theme-builder/ARCHITECTURE_UX_UI.md`](theme-builder/ARCHITECTURE_UX_UI.md) | Architecture technique |
| 👤 [`theme-builder/GUIDE_UTILISATEUR.md`](theme-builder/GUIDE_UTILISATEUR.md) | Guide utilisateur détaillé |
| 🤝 [`CONTRIBUTING.md`](CONTRIBUTING.md) | Guide de contribution |
| 🔒 [`SECURITY.md`](SECURITY.md) | Politique de sécurité |
| 📝 [`CHANGELOG.md`](CHANGELOG.md) | Historique des versions |
| 📋 [`PROJECT_CONFIG.json`](PROJECT_CONFIG.json) | Configuration projet |
| 📡 [`backend/swagger.json`](backend/swagger.json) | Documentation API |

---

## 🤝 Contribuer

Nous accueillons toutes les contributions ! Voici comment vous pouvez aider :

1. 🍴 **Fork** le projet
2. 🌿 **Créez** une branche feature (`git checkout -b feature/AmazingFeature`)
3. ✅ **Committez** vos changements (`git commit -m 'feat: Add AmazingFeature'`)
4. 📤 **Poussez** vers la branche (`git push origin feature/AmazingFeature`)
5. 🔀 **Ouvrez** une Pull Request

Consultez [`CONTRIBUTING.md`](CONTRIBUTING.md) pour plus de détails.

### 📋 Conventions de Commit

Nous utilisons [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat(scope): add new feature
fix(scope): fix bug
docs(scope): update documentation
style(scope): format code
refactor(scope): refactor code
test(scope): add tests
chore(scope): update dependencies
```

---

## 🔒 Sécurité

La sécurité est une priorité absolue. Si vous découvrez une vulnérabilité :

- **🚫 NE PAS** créer d'issue publique
- **📧 Envoyer** un email à : security@hearst-design.com
- **🔐 Ou** créer une GitHub Security Advisory (privée)

Consultez [`SECURITY.md`](SECURITY.md) pour plus de détails.

---

## 📜 Licence

Ce projet est sous licence **MIT**. Voir [`LICENSE`](LICENSE) pour plus d'informations.

---

## 🔗 Liens Utiles

- 📦 **Repository** : [github.com/adrien-debug/Hearst-Design](https://github.com/adrien-debug/Hearst-Design)
- 🐛 **Issues** : [Issues Tracker](https://github.com/adrien-debug/Hearst-Design/issues)
- 💡 **Feature Requests** : [Request Feature](https://github.com/adrien-debug/Hearst-Design/issues/new?template=feature_request.md)
- 💬 **Discussions** : [GitHub Discussions](https://github.com/adrien-debug/Hearst-Design/discussions)
- 📧 **Contact** : contact@hearst-design.com

---

## 🙏 Remerciements

- **Hearst Control** pour l'intégration centralisée
- **Supabase** pour l'authentification
- **Vercel** pour l'hébergement
- **Next.js Team** pour le framework
- **Communauté Open Source** pour l'inspiration

---

## 🎯 Roadmap

### ✅ Version 1.0 (Actuelle)

- [x] Backend API complet
- [x] Frontend Next.js 14
- [x] Theme Builder interactif
- [x] 4 palettes pré-configurées
- [x] Export JSON/CSS
- [x] Documentation complète
- [x] CI/CD GitHub Actions

### 🚧 Version 1.1 (Q1 2026)

- [ ] Export Figma pour design tokens
- [ ] Mode collaboration temps réel
- [ ] Historique des versions de thèmes
- [ ] Templates de composants additionnels
- [ ] API publique design tokens
- [ ] Plugin VS Code
- [ ] Support i18n (FR, EN, AR)

### 🔮 Version 1.2 (Q2 2026)

- [ ] Design system versioning
- [ ] Component library npm package
- [ ] Storybook integration
- [ ] Visual regression testing
- [ ] AI-assisted theme generation
- [ ] Mobile app (React Native)

---

## 📊 Statistiques du Projet

- **64 fichiers** créés
- **34,000+ lignes** de code
- **3 composants** principaux
- **4 palettes** de design
- **15+ composants** UI
- **10+ endpoints** API
- **100% TypeScript** (Frontend)
- **WCAG AAA** accessible

---

## 🌟 Montrez votre Support

Si ce projet vous aide, donnez-lui une ⭐ sur GitHub !

<div align="center">

**[⬆ Retour en haut](#-hearst-design)**

---

**Hearst Design** | Système de Design Complet  
Intégré à **Hearst Control V2.0**  
Fait avec ❤️ par l'équipe Hearst Design

**Version 1.0.0** | Dernière mise à jour : 24 décembre 2025

</div>

