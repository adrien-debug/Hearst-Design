# 🇶🇦 STRATEGIC RESERVE QATAR - SPÉCIFICATIONS TECHNIQUES

**Project ID** : SRQ-001  
**Status** : Actif  
**Intégration** : Hearst Control V1.1.0

---

## 📊 SPÉCIFICATIONS INFRASTRUCTURE

### Containers

| Paramètre | Valeur |
|-----------|--------|
| **Modèle** | ANTSPACE HD5 |
| **Quantité** | 30 unités |
| **Miners par container** | 308 unités |
| **Refroidissement** | Hydro cooling |
| **Puissance par container** | 1.765 MW |

### Miners

| Paramètre | Valeur |
|-----------|--------|
| **Modèle** | S21XP Hydro |
| **Quantité totale** | 9,240 unités |
| **Hashrate unitaire** | 473 TH/s |
| **Puissance unitaire** | 5,676 W |
| **Efficacité** | 12 W/TH |

### Performance Totale

| Métrique | Valeur |
|----------|--------|
| **Hashrate total** | 4.37 EH/s (4,369,920 TH/s) |
| **Puissance maximale** | 52.95 MW |
| **Puissance moyenne** | ~47.65 MW (90% load) |
| **Efficacité globale** | 12 W/TH |

---

## 🔌 ARCHITECTURE ÉLECTRIQUE

### Distribution Primaire
```
132 kV Grid (Réseau national)
  ↓
2 × 55 MVA Transformers
  • Configuration N+1 (redondance)
  • Total capacity: 110 MVA
  ↓
33 kV Distribution Ring
  • Ring topology pour fiabilité
  • Isolation par sections
```

### Distribution Secondaire
```
33 kV Ring
  ↓
15 × 3,750 kVA Transformers
  • 2 containers par transformer
  • Load: ~3.53 MW par transformer
  • Capacité: 3.75 MW par transformer
  • Marge: ~5-6%
  ↓
30 × ANTSPACE HD5 Containers
  • Tension: 400V triphasé
  • Distribution interne automatisée
```

### Protections
- Disjoncteurs à chaque niveau
- Systèmes de protection différentielle
- Détection défaut terre
- Monitoring en temps réel

---

## 🌡️ SYSTÈME DE REFROIDISSEMENT

### Refroidissement Miners
- **Type** : Hydro cooling intégré S21XP
- **Liquide** : Fluide diélectrique
- **Circulation** : Pompes intégrées
- **Dissipation** : Radiateurs externes

### Refroidissement Containers
- **Type** : Air cooling
- **Ventilation** : Forcée
- **Température cible** : 35-45°C
- **Monitoring** : Capteurs température

---

## 🌐 ARCHITECTURE RÉSEAU

### Réseau Mining
```
Internet Uplink (redondant)
  ↓
Firewall & Router
  ↓
Core Switch (10G)
  ↓
Distribution Switches (1G)
  ↓
30 × Container Network
  ↓
9,240 × Miner Network Interfaces
```

### Bande Passante
- **Uplink** : 1 Gbps (redondant)
- **Par container** : 100 Mbps
- **Par miner** : ~108 Kbps
- **Latence** : < 50ms vers mining pool

### Mining Pools
- Pool primaire configuré
- Pool backup configuré
- Failover automatique

---

## 💾 ARCHITECTURE LOGICIELLE

### Stack Backend

#### Technologies
- **Runtime** : Node.js 18+
- **Framework** : Express.js 4.x
- **Database** : Supabase (PostgreSQL 15)
- **Authentication** : JWT (jsonwebtoken)
- **Password Hashing** : bcryptjs
- **CORS** : cors middleware

#### Structure
```
backend/
├── controllers/
│   ├── authController.js
│   ├── containersController.js
│   ├── metricsController.js
│   └── minersController.js
├── middleware/
│   └── auth.js
├── routes/
│   ├── auth.js
│   ├── containers.js
│   ├── metrics.js
│   └── miners.js
├── utils/
│   └── supabase.js
└── server.js
```

#### API Endpoints
```
POST   /api/auth/login
GET    /api/containers
GET    /api/containers/:id
GET    /api/containers/stats
GET    /api/miners
GET    /api/miners/stats
GET    /api/miners/container/:id
GET    /api/metrics/current
GET    /api/metrics/period
GET    /api/metrics/hashrate/history
GET    /api/metrics/power/history
GET    /api/metrics/stats
GET    /health
```

### Stack Frontend

#### Technologies
- **Framework** : Next.js 14
- **UI Library** : React 18
- **Language** : TypeScript 5
- **Styling** : Tailwind CSS 3
- **HTTP Client** : fetch API

#### Structure
```
frontend/
└── src/
    ├── app/
    │   ├── dashboard/
    │   │   └── page.tsx
    │   ├── login/
    │   │   └── page.tsx
    │   ├── layout.tsx
    │   └── globals.css
    └── lib/
        └── api.ts
```

#### Pages
- `/` - Page d'accueil
- `/login` - Authentification
- `/dashboard` - Dashboard principal

---

## 🗄️ SCHÉMA BASE DE DONNÉES

### Tables Projet SRQ

#### srq_containers
```sql
id VARCHAR(20) PRIMARY KEY
name VARCHAR(255)
model VARCHAR(100)
status VARCHAR(50)
location VARCHAR(255)
miners_count INT
power_capacity_kw DECIMAL
temperature DECIMAL
uptime_percentage DECIMAL
last_maintenance DATE
created_at TIMESTAMP
updated_at TIMESTAMP
```

#### srq_miners
```sql
id VARCHAR(20) PRIMARY KEY
container_id VARCHAR(20) REFERENCES srq_containers(id)
name VARCHAR(255)
model VARCHAR(100)
status VARCHAR(50)
hashrate DECIMAL
power_consumption INT
temperature DECIMAL
fan_speed INT
uptime_percentage DECIMAL
last_maintenance DATE
created_at TIMESTAMP
updated_at TIMESTAMP
```

#### srq_metrics
```sql
id UUID PRIMARY KEY
timestamp TIMESTAMP
total_hashrate DECIMAL
total_power DECIMAL
average_temperature DECIMAL
active_miners INT
total_miners INT
pool_connected BOOLEAN
network_status VARCHAR(50)
```

### Tables Centrales (Hearst Control)

#### projects
```sql
id VARCHAR(20) PRIMARY KEY -- 'SRQ-001'
name VARCHAR(255)
description TEXT
location VARCHAR(255)
status VARCHAR(50)
total_containers INT
total_miners INT
total_hashrate_ths DECIMAL
total_power_mw DECIMAL
container_model VARCHAR(100)
miner_model VARCHAR(100)
api_endpoint VARCHAR(255)
frontend_url VARCHAR(255)
created_at TIMESTAMP
updated_at TIMESTAMP
```

#### project_metrics
```sql
id UUID PRIMARY KEY
project_id VARCHAR(20) REFERENCES projects(id)
timestamp TIMESTAMP
total_containers INT
operational_containers INT
total_miners INT
online_miners INT
total_hashrate_ths DECIMAL
total_hashrate_ehs DECIMAL
total_power_mw DECIMAL
average_temperature DECIMAL
efficiency DECIMAL
uptime_percentage DECIMAL
```

---

## 🔐 SÉCURITÉ

### Authentification
- **Type** : JWT (JSON Web Tokens)
- **Algorithm** : HS256
- **Expiration** : Configurable
- **Storage** : HTTP-only cookies (recommandé)

### Autorisation
- **Roles** : super_admin, admin, manager, operator, viewer
- **Permissions** : Par projet et par rôle
- **Access Control** : Table `user_project_access`

### API Security
- CORS configuré
- Rate limiting (optionnel)
- Helmet middleware (optionnel)
- HTTPS en production (recommandé)

### Database Security
- Service role key (backend)
- Row Level Security (RLS) activable
- Connexions SSL/TLS

---

## 📡 MONITORING

### Métriques Temps Réel
- Hashrate (TH/s, EH/s)
- Puissance (W, kW, MW)
- Température (°C)
- Uptime (%)
- Miners online/offline
- Containers operational/maintenance

### Métriques Historiques
- Hashrate sur 24h/7j/30j
- Consommation sur 24h/7j/30j
- Température sur 24h/7j/30j
- Performance sur 24h/7j/30j

### Alertes (à implémenter)
- Hashrate < seuil
- Température > seuil
- Miners offline > seuil
- Perte connexion mining pool
- Problème alimentation

---

## 🔄 INTÉGRATION HEARST CONTROL

### Ports
- **Backend SRQ** : 3002
- **Frontend SRQ** : 3100
- **Backend Central** : 4000
- **API Gateway** : 4000/api/srq/*

### Proxying
```
Client → http://localhost:4000/api/srq/containers
  ↓ (API Gateway)
Backend Central → http://localhost:3003/api/containers
  ↓
Backend SRQ → Response
```

### Authentification Centralisée
- Login via backend central (4000)
- Token valide pour tous les projets
- Permissions vérifiées par projet

### Base de Données Partagée
- Tables centrales : users, projects, user_project_access
- Tables projet : srq_containers, srq_miners, srq_metrics
- Isolation logique par prefixe (`srq_`)

---

## 🔧 CONFIGURATION

### Variables d'Environnement Backend
```bash
NODE_ENV=development|production
PORT=3003
JWT_SECRET=<secret-securise-64-chars>
SUPABASE_URL=https://<project-id>.supabase.co
SUPABASE_SERVICE_KEY=<service-role-key>
CORS_ORIGIN=http://localhost:3100
```

### Variables d'Environnement Frontend
```bash
NEXT_PUBLIC_API_URL=http://localhost:3003
```

### Package.json Backend
```json
{
  "name": "srq-backend",
  "version": "1.0.0",
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.6.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2"
  }
}
```

### Package.json Frontend
```json
{
  "name": "srq-frontend",
  "version": "1.0.0",
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "typescript": "5.x",
    "tailwindcss": "3.x"
  }
}
```

---

## 📦 DÉPLOIEMENT

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte Supabase
- Accès réseau aux miners

### Installation Backend
```bash
cd backend
cp env.example .env
# Éditer .env
npm install
npm start
```

### Installation Frontend
```bash
cd frontend
cp env.example .env.local
# Éditer .env.local
npm install
npm run dev
```

### Setup Base de Données
```bash
# Exécuter dans Supabase SQL Editor
schemas/SETUP_SRQ_COMPLET.sql
```

### Production
```bash
# Backend
npm start # ou pm2 start server.js

# Frontend
npm run build
npm run start
```

---

## 📊 DONNÉES TECHNIQUES

### Calculs de Performance

#### Hashrate
```
Hashrate par miner : 473 TH/s
Miners par container : 308
Hashrate par container : 145,684 TH/s = 0.1457 EH/s

Total miners : 9,240
Total hashrate : 4,369,920 TH/s = 4.37 EH/s
```

#### Puissance
```
Puissance par miner : 5,676 W = 5.676 kW
Miners par container : 308
Puissance par container : 1,748,208 W = 1.748 MW

Total miners : 9,240
Total puissance : 52,447,040 W = 52.45 MW
Avec pertes (1%) : ~52.95 MW
```

#### Efficacité
```
Efficacité : 5,676 W / 473 TH/s = 12 W/TH
```

### Distribution Électrique

#### Par Transformer
```
Containers par transformer : 2
Puissance par transformer : 2 × 1.748 MW = 3.496 MW
Capacité transformer : 3.75 MVA
Load : 3.496 / 3.75 = 93.2%
Marge : 6.8%
```

#### Total Site
```
Transformers : 15
Puissance installée : 15 × 3.75 MVA = 56.25 MVA
Consommation max : 52.95 MW
Load global : 94.1%
Marge globale : 5.9%
```

---

## 🌐 URLs ET ACCÈS

### Services
- **Backend** : http://localhost:3003
- **Frontend** : http://localhost:3100
- **API Gateway** : http://localhost:4000/api/srq/*
- **Backend Central** : http://localhost:4000

### Documentation
- **Projet README** : `./README.md`
- **Quick Start** : `./QUICK_START.md`
- **Architecture Hearst Control** : `../../docs/architecture/ARCHITECTURE_GLOBALE.md`

### Supabase
- **Dashboard** : https://app.supabase.com
- **API URL** : https://your-project.supabase.co
- **Database URL** : postgresql://...

---

> **Strategic Reserve Qatar - SRQ-001**  
> Spécifications Techniques Complètes  
> Hearst Control V1.1.0 - Décembre 2025
