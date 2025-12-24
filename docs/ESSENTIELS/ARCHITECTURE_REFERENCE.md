# 🏗️ Référence Architecture Technique - Hearst Control V2.0

> **Document de référence** : Architecture technique complète du système  
> **Hearst Control** = Application Electron pour gérer des projets web  
> Inclut : Diagrammes, flux de données, patterns, technologies

---

## 📑 Table des Matières

1. [Vue d'Ensemble](#-1-vue-densemble)
2. [Architecture Multi-Tenant](#-2-architecture-multi-tenant)
3. [Flux d'Authentification](#-3-flux-dauthentification)
4. [API Gateway](#-4-api-gateway)
5. [Base de Données](#-5-base-de-données)
6. [Projets Isolés](#-6-projets-isolés)
7. [Technologies](#-7-technologies)
8. [Patterns Utilisés](#-8-patterns-utilisés)
9. [Configuration](#-9-configuration)

---

## 🎯 1. VUE D'ENSEMBLE

### Architecture Globale

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CLIENTS (Navigateurs)                           │
│                    Frontend Apps / API Consumers                        │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      BACKEND CENTRAL (Port 4000)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  Auth       │  │  Projects   │  │  Users      │  │  Dashboard  │   │
│  │  Controller │  │  Controller │  │  Controller │  │  Controller │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      API GATEWAY (Proxy)                        │   │
│  │    /api/qatar/* → :3001    /api/design/* → :3002                │   │
│  │    /api/srq/* → :3003      /api/future/* → :300X                │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐           ┌───────────────┐           ┌───────────────┐
│ HEARST QATAR  │           │ HEARST DESIGN │           │  HEARST SRQ   │
│  Port 3001    │           │   Port 3002   │           │   Port 3003   │
│               │           │               │           │               │
│ ┌───────────┐ │           │ ┌───────────┐ │           │ ┌───────────┐ │
│ │ Backend   │ │           │ │ Backend   │ │           │ │ Backend   │ │
│ │ Express   │ │           │ │ Express   │ │           │ │ Express   │ │
│ └─────┬─────┘ │           │ └─────┬─────┘ │           │ └─────┬─────┘ │
│       │       │           │       │       │           │       │       │
│ ┌─────▼─────┐ │           │ ┌─────▼─────┐ │           │ ┌─────▼─────┐ │
│ │ Frontend  │ │           │ │ Frontend  │ │           │ │ Frontend  │ │
│ │ Next.js   │ │           │ │ Next.js   │ │           │ │ Next.js   │ │
│ └───────────┘ │           │ └───────────┘ │           │ └───────────┘ │
└───────┬───────┘           └───────┬───────┘           └───────┬───────┘
        │                           │                           │
        └───────────────────────────┼───────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                              CORE                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│  │ authService  │  │ middleware   │  │ supabaseClient│                 │
│  └──────────────┘  └──────────────┘  └──────────────┘                  │
│  ┌──────────────┐  ┌──────────────┐                                    │
│  │   logger     │  │  validators  │                                    │
│  └──────────────┘  └──────────────┘                                    │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         SUPABASE (PostgreSQL)                           │
│                                                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ tenants │ │  users  │ │projects │ │ access  │ │ metrics │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### Composants Principaux

| Composant | Rôle | Type | Port | Technologie |
|-----------|------|------|------|-------------|
| Interface Electron | Application de bureau | Frontend | - | Electron |
| Backend Central | API Gateway + Auth | Infrastructure | 4000 | Express.js |
| Core | Code commun | Infrastructure | - | Node.js |
| Hearst Qatar | Projet web | Projet web | 3001 | Express + Next.js |
| Hearst Design | Projet web | Projet web | 3002 | Express + Next.js |
| Hearst SRQ | Projet web | Projet web | 3003 | Express + Next.js |
| Supabase | Base de données | Infrastructure | Cloud | PostgreSQL |

**Note** : Hearst Control est une application Electron qui gère plusieurs projets web indépendants avec isolation complète.

---

## 🏢 2. ARCHITECTURE MULTI-TENANT

### Modèle d'Isolation

```
┌─────────────────────────────────────────────────────────────────┐
│                        PLATEFORME HEARST                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐       │
│  │  TENANT A   │     │  TENANT B   │     │  TENANT C   │       │
│  │  (Hearst)   │     │  (Client X) │     │  (Client Y) │       │
│  ├─────────────┤     ├─────────────┤     ├─────────────┤       │
│  │ Users       │     │ Users       │     │ Users       │       │
│  │ Projects    │     │ Projects    │     │ Projects    │       │
│  │ Data        │     │ Data        │     │ Data        │       │
│  └─────────────┘     └─────────────┘     └─────────────┘       │
│         ▲                   ▲                   ▲               │
│         │                   │                   │               │
│         └───────────────────┼───────────────────┘               │
│                             │                                   │
│                    ╔════════╧════════╗                         │
│                    ║   ISOLATION     ║                         │
│                    ║   COMPLÈTE      ║                         │
│                    ╚═════════════════╝                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Table Tenants

```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(30) UNIQUE NOT NULL,  -- ex: "hearst", "acme"
  name VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',  -- active, suspended
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Filtrage par Tenant

```javascript
// Pattern obligatoire dans tous les controllers
exports.getAll = async (req, res) => {
  let query = supabase.from('users').select('*');
  
  // Isolation par tenant (sauf super_admin)
  if (req.user.role !== 'super_admin') {
    query = query.eq('tenant_id', req.user.tenant_id);
  }
  
  const { data, error } = await query;
  res.json({ data });
};
```

---

## 🔐 3. FLUX D'AUTHENTIFICATION

### Diagramme de Séquence - Login

```
┌────────┐          ┌────────────────┐          ┌──────────┐
│ Client │          │ Backend Central│          │ Supabase │
└────┬───┘          └───────┬────────┘          └────┬─────┘
     │                      │                        │
     │  POST /api/auth/login│                        │
     │  {email, password}   │                        │
     │─────────────────────>│                        │
     │                      │                        │
     │                      │  SELECT user           │
     │                      │  WHERE email = ?       │
     │                      │───────────────────────>│
     │                      │                        │
     │                      │  User + tenant_id      │
     │                      │<───────────────────────│
     │                      │                        │
     │                      │  Verify bcrypt         │
     │                      │  password              │
     │                      │                        │
     │                      │  Generate JWT with:    │
     │                      │  - id                  │
     │                      │  - email               │
     │                      │  - role                │
     │                      │  - tenant_id           │
     │                      │                        │
     │  {token, user}       │                        │
     │<─────────────────────│                        │
     │                      │                        │
```

### JWT Payload Structure

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@hearst.com",
  "role": "admin",
  "tenant_id": "660e8400-e29b-41d4-a716-446655440000",
  "iat": 1703462400,
  "exp": 1703548800
}
```

### Middleware d'Authentification

```javascript
// core/middleware/authMiddleware.js
const createAuthMiddleware = (jwtSecret) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token required' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      
      // Vérification tenant_id obligatoire
      if (!decoded.tenant_id && decoded.role !== 'super_admin') {
        return res.status(403).json({ error: 'No tenant associated' });
      }
      
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};
```

---

## 🌐 4. API GATEWAY

### Routing Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND CENTRAL (Port 4000)                  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                    ROUTES DIRECTES                        │ │
│  │                                                           │ │
│  │  /api/auth/*        → authController                      │ │
│  │  /api/users/*       → usersController                     │ │
│  │  /api/projects/*    → projectsController                  │ │
│  │  /api/dashboard/*   → dashboardController                 │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                    ROUTES PROXY                           │ │
│  │                                                           │ │
│  │  /api/qatar/*       → http://localhost:3001/api/*         │ │
│  │  /api/design/*      → http://localhost:3002/api/*         │ │
│  │  /api/srq/*         → http://localhost:3003/api/*         │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Configuration du Proxy

```javascript
// backend-central/server.js
const { createProxyMiddleware } = require('http-proxy-middleware');

// Routes proxy vers les projets
app.use('/api/qatar', authMiddleware, createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: { '^/api/qatar': '/api' }
}));

app.use('/api/design', authMiddleware, createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: { '^/api/design': '/api' }
}));

app.use('/api/srq', authMiddleware, createProxyMiddleware({
  target: 'http://localhost:3003',
  changeOrigin: true,
  pathRewrite: { '^/api/srq': '/api' }
}));
```

---

## 🗄️ 5. BASE DE DONNÉES

### Schéma Entité-Relation

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   TENANTS    │       │    USERS     │       │   PROJECTS   │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)      │◄──────│ tenant_id(FK)│   ┌──►│ id (PK)      │
│ slug         │       │ id (PK)      │   │   │ tenant_id(FK)│
│ name         │       │ email        │   │   │ name         │
│ status       │       │ password_hash│   │   │ location     │
│ created_at   │       │ name         │   │   │ status       │
└──────────────┘       │ role         │   │   │ created_at   │
                       │ created_at   │   │   └──────────────┘
                       └──────┬───────┘   │
                              │           │
                              │           │
                              ▼           │
                       ┌──────────────────┴───┐
                       │ USER_PROJECT_ACCESS  │
                       ├──────────────────────┤
                       │ id (PK)              │
                       │ user_id (FK)         │
                       │ project_id (FK)      │
                       │ tenant_id (FK)       │
                       │ role                 │
                       │ granted_at           │
                       └──────────────────────┘
                              │
                              │
                              ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ PROJECT_METRICS  │  │  GLOBAL_ALERTS   │  │   AUDIT_LOG      │
├──────────────────┤  ├──────────────────┤  ├──────────────────┤
│ id (PK)          │  │ id (PK)          │  │ id (PK)          │
│ project_id (FK)  │  │ project_id (FK)  │  │ user_id (FK)     │
│ tenant_id (FK)   │  │ tenant_id (FK)   │  │ action           │
│ hashrate         │  │ type             │  │ details (JSON)   │
│ power            │  │ message          │  │ timestamp        │
│ timestamp        │  │ resolved         │  └──────────────────┘
└──────────────────┘  └──────────────────┘
```

### Tables Principales

```sql
-- Tenants (organisations)
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(30) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Utilisateurs
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(20) DEFAULT 'viewer',
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- Projets
CREATE TABLE projects (
  id VARCHAR(20) PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active',
  total_containers INTEGER DEFAULT 0,
  total_resources INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Accès projets
CREATE TABLE user_project_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id VARCHAR(20) REFERENCES projects(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id),
  role VARCHAR(20) DEFAULT 'viewer',
  granted_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, project_id)
);

-- Index pour performance
CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_projects_tenant ON projects(tenant_id);
CREATE INDEX idx_access_tenant ON user_project_access(tenant_id);
CREATE INDEX idx_users_email ON users(email);
```

---

## 📊 6. PROJETS ISOLÉS

### Structure Standard d'un Projet Web

**Note** : Cette structure est standard pour tous les projets web gérés par Hearst Control. Chaque projet peut adapter ses controllers et routes selon ses besoins.

```
projects/<nom-projet>/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js       # Auth locale (optionnel)
│   │   ├── [controllers métier]    # Logique métier spécifique au projet
│   │   └── metricsController.js    # Métriques (optionnel)
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── containers.js
│   │   ├── resources.js
│   │   └── metrics.js
│   │
│   ├── middleware/
│   │   └── auth.js                 # Vérifie token du central
│   │
│   ├── utils/
│   │   └── supabase.js             # Client DB du projet
│   │
│   ├── server.js                   # Point d'entrée
│   ├── swagger.json                # Doc API
│   ├── package.json
│   └── env.example
│
├── frontend/
│   ├── src/
│   │   ├── app/                    # Next.js App Router
│   │   │   ├── dashboard/
│   │   │   ├── login/
│   │   │   └── layout.tsx
│   │   └── lib/
│   │       └── api.ts              # Client API
│   │
│   ├── public/                     # Assets statiques
│   ├── package.json
│   └── env.example
│
├── database/
│   └── schema.sql                  # Schéma spécifique
│
├── README.md
├── PROJECT_CONFIG.json
└── TODO_SETUP.md
```

### Isolation Garantie

```
┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐
│  HEARST QATAR     │     │  HEARST DESIGN    │     │   HEARST SRQ      │
│                   │     │                   │     │                   │
│  ┌─────────────┐  │     │  ┌─────────────┐  │     │  ┌─────────────┐  │
│  │ Port 3001   │  │     │  │ Port 3002   │  │     │  │ Port 3003   │  │
│  │ Backend     │  │     │  │ Backend     │  │     │  │ Backend     │  │
│  └─────────────┘  │     │  └─────────────┘  │     │  └─────────────┘  │
│                   │     │                   │     │                   │
│  ┌─────────────┐  │     │  ┌─────────────┐  │     │  ┌─────────────┐  │
│  │ .env propre │  │     │  │ .env propre │  │     │  │ .env propre │  │
│  └─────────────┘  │     │  └─────────────┘  │     │  └─────────────┘  │
│                   │     │                   │     │                   │
│  ┌─────────────┐  │     │  ┌─────────────┐  │     │  ┌─────────────┐  │
│  │ DB/Schéma   │  │     │  │ DB/Schéma   │  │     │  │ DB/Schéma   │  │
│  │ propre      │  │     │  │ propre      │  │     │  │ propre      │  │
│  └─────────────┘  │     │  └─────────────┘  │     │  └─────────────┘  │
│                   │     │                   │     │                   │
│  ╳ AUCUN IMPORT   │     │  ╳ AUCUN IMPORT   │     │  ╳ AUCUN IMPORT   │
│  depuis autres    │     │  depuis autres    │     │  depuis autres    │
│  projets          │     │  projets          │     │  projets          │
└───────────────────┘     └───────────────────┘     └───────────────────┘
```

---

## 💻 7. TECHNOLOGIES

### Stack Backend

| Technologie | Version | Usage |
|-------------|---------|-------|
| Node.js | ≥18.0.0 | Runtime |
| Express.js | 4.x | Framework API |
| Supabase JS | 2.x | Client PostgreSQL |
| bcrypt | 5.x | Hashage passwords |
| jsonwebtoken | 9.x | JWT tokens |
| cors | 2.x | Cross-Origin |
| helmet | 7.x | Sécurité HTTP |
| express-rate-limit | 7.x | Rate limiting |

### Stack Frontend

| Technologie | Version | Usage |
|-------------|---------|-------|
| Next.js | 14.x | Framework React |
| React | 18.x | UI Library |
| TypeScript | 5.x | Typage statique |
| Tailwind CSS | 3.x | Styling |
| Axios | 1.x | Client HTTP |

### Infrastructure

| Technologie | Usage |
|-------------|-------|
| Supabase | Database (PostgreSQL) + Auth |
| PM2 | Process Manager |
| Docker | Containerisation (optionnel) |
| GitHub Actions | CI/CD |

---

## 🔄 8. PATTERNS UTILISÉS

### MVC (Model-View-Controller)

```
Request → Route → Controller → Service → Database
                     ↓
Response ← Route ← Controller ← Service ← Database
```

### Repository Pattern (via Supabase)

```javascript
// utils/supabase.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = supabase;
```

### Middleware Chain

```javascript
// Chaîne de middlewares
app.use(cors());           // 1. CORS
app.use(helmet());         // 2. Sécurité
app.use(express.json());   // 3. Parse JSON
app.use(rateLimiter);      // 4. Rate limiting
app.use(requestLogger);    // 5. Logging
app.use(authMiddleware);   // 6. Auth (routes protégées)
```

### Singleton Pattern (Client DB)

```javascript
// core/database/supabaseClient.js
let instance = null;

const getSupabaseClient = () => {
  if (!instance) {
    instance = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );
  }
  return instance;
};

module.exports = { getSupabaseClient };
```

---

## ⚙️ 9. CONFIGURATION

### Variables d'Environnement Requises

#### Backend Central (.env)

```bash
# Serveur
NODE_ENV=development|production
PORT=4000

# JWT
JWT_SECRET=<min-64-chars-random-string>
JWT_EXPIRES_IN=24h

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3010

# Projets (URLs pour proxy)
QATAR_API_URL=http://localhost:3001
DESIGN_API_URL=http://localhost:3002
SRQ_API_URL=http://localhost:3003
```

#### Projet (.env)

```bash
# Serveur
NODE_ENV=development
PORT=3001

# Supabase (peut être différent du central)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...

# Backend Central (pour validation token)
CENTRAL_API_URL=http://localhost:4000
JWT_SECRET=<même-que-central>
```

### Configuration PM2

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'backend-central',
      script: './backend-central/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 4000
      }
    },
    {
      name: 'qatar-backend',
      script: './projects/hearst-qatar-new/backend/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }
    // ... autres projets
  ]
};
```

---

## 📋 Résumé Architecture

### Points Clés

1. **Centralisation** : Un seul point d'entrée (backend-central)
2. **Isolation** : Chaque projet est 100% indépendant
3. **Réutilisabilité** : 70-80% de code commun dans core/
4. **Multi-tenant** : Isolation complète par tenant_id
5. **Sécurité** : JWT, bcrypt, CORS, rate limiting
6. **Scalabilité** : Architecture horizontalement scalable

### Flux de Données Simplifié

```
Client → Backend Central (auth) → Proxy → Projet → Supabase
```

---

**Hearst Control V2.0** | Architecture Technique | Décembre 2025

