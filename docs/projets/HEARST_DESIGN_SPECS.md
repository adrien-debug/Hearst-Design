# 🎨 HEARST DESIGN - Spécifications du Projet

**Date**: 24 décembre 2025  
**Projet ID**: DESIGN-001  
**Status**: 📝 En préparation

---

## 🎯 INFORMATIONS GÉNÉRALES

### Identité du Projet
```
ID              : DESIGN-001
Nom             : Hearst Design
Description     : [À définir]
Location        : [À définir]
Status          : planned
```

---

## 📊 SPÉCIFICATIONS TECHNIQUES (À COMPLÉTER)

### Infrastructure Proposée
```
Containers      : [Nombre] × [Modèle]
Mineurs         : [Nombre total] × [Modèle]
Hashrate/miner  : [TH/s]
Power/miner     : [W]
```

### Calculs Automatiques
```
Total Hashrate  : [containers × miners_per_container × hashrate_per_miner]
Total Power     : [total_miners × power_per_miner / 1,000,000] MW
```

---

## 🌐 CONFIGURATION RÉSEAU

### Ports Réservés
```
Backend API     : http://localhost:3201
Frontend        : http://localhost:3300
```

### Intégration Central API
```
Gateway URL     : http://localhost:4000/api/design/*
Proxy to        : http://localhost:3201
```

---

## 👥 UTILISATEURS À CRÉER

### Administrateur Design
```
Email    : admin@design.hearst.com
Password : <REDACTED>
Role     : admin
```

### Opérateur Design
```
Email    : operator@design.hearst.com
Password : <REDACTED>
Role     : operator
```

### Manager Design
```
Email    : manager@design.hearst.com
Password : <REDACTED>
Role     : manager
```

---

## 📅 PLANNING

### Dates Clés
```
Date création   : 2025-01-15 (suggéré)
Date démarrage  : [À définir]
Date fin        : [À définir]
```

---

## 🔧 CONFIGURATION TECHNIQUE

### Variables d'Environnement Backend
```env
NODE_ENV=development
PORT=3201

SUPABASE_URL=https://tnnsfheflydiuhiduntn.supabase.co
SUPABASE_SERVICE_KEY=sb_secret_<REDACTED>
SUPABASE_ANON_KEY=sb_publishable_<REDACTED>

JWT_SECRET=<REDACTED>

CORS_ORIGIN=http://localhost:3300

PROJECT_ID=DESIGN-001
PROJECT_NAME=Hearst Design
```

### Variables d'Environnement Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:3201
NEXT_PUBLIC_SUPABASE_URL=https://tnnsfheflydiuhiduntn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_<REDACTED>
NEXT_PUBLIC_PROJECT_ID=DESIGN-001
NEXT_PUBLIC_PROJECT_NAME=Hearst Design
```

---

## 📁 STRUCTURE À CRÉER

```
projects/
└── hearst-design/
    ├── backend/
    │   ├── controllers/
    │   ├── routes/
    │   ├── middleware/
    │   ├── utils/
    │   ├── server.js
    │   ├── package.json
    │   └── .env
    │
    ├── frontend/
    │   ├── src/
    │   ├── public/
    │   ├── package.json
    │   └── .env.local
    │
    ├── database/
    │   └── schema.sql
    │
    └── PROJECT_INFO.md
```

---

## 🎯 ÉTAPES DE CRÉATION

### 1. Définir les Spécifications
- [ ] Nombre de containers
- [ ] Nombre de mineurs
- [ ] Modèles de matériel
- [ ] Localisation
- [ ] Dates de démarrage

### 2. Créer la Structure
- [ ] Dossier du projet
- [ ] Backend (copier template)
- [ ] Frontend (copier template)
- [ ] Configuration

### 3. Ajouter à la Base de Données
- [ ] Créer le projet dans Supabase
- [ ] Créer les utilisateurs
- [ ] Configurer les accès
- [ ] Ajouter métriques de test

### 4. Raccorder au Système
- [ ] Configurer .env backend
- [ ] Configurer .env frontend
- [ ] Installer dépendances
- [ ] Démarrer les services
- [ ] Tester l'authentification

---

## 📊 IMPACT SUR LE SYSTÈME GLOBAL

### Avant Hearst Design
```
Projets         : 3
Containers      : 88
Mineurs         : 27,104
Hashrate        : 12.82 EH/s
Power           : 155.32 MW
```

### Après Hearst Design (estimation)
```
Projets         : 4
Containers      : 88 + [X]
Mineurs         : 27,104 + [X]
Hashrate        : 12.82 + [X] EH/s
Power           : 155.32 + [X] MW
```

---

## 🔗 LIENS RAPIDES

### Templates Disponibles
- `projects/hearst-qatar-new/` - Template backend/frontend
- `projects/hearst-strategic-reserve-qatar/` - Référence récente

### Scripts de Création
- `raccorder-srq.sh` - À adapter pour Design
- `SETUP_SRQ_COMPLET.sql` - À adapter pour Design

---

## 📝 NOTES

**Questions à résoudre** :
1. Quel est le rôle exact de "Hearst Design" ?
2. S'agit-il d'un projet de mining ou autre chose ?
3. Quelles sont les spécifications techniques ?
4. Quelle est la localisation ?

**Une fois les specs définies, le projet peut être créé en ~10 minutes !**

---

**Prêt à compléter les spécifications ! 🎨**

