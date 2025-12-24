# 🚀 Guide de Démarrage Rapide - Hearst Control

**Date**: 24 décembre 2025  
**Status**: ✅ **TOUS LES FICHIERS SQL CORRIGÉS**

---

## 📋 Ce qui a été Corrigé

### Problème Initial
```
ERROR: column "start_date" is of type date but expression is of type text
```

### Solution Appliquée
Toutes les dates ont été corrigées dans **8 fichiers SQL** :
- ✅ FRESH_START.sql
- ✅ COMPLETE_SETUP.sql
- ✅ schemas/central-schema.sql
- ✅ schemas/add-strategic-reserve-qatar.sql
- ✅ database/central-schema.sql
- ✅ database/add-strategic-reserve-qatar.sql

---

## 🎯 Démarrage en 3 Étapes

### Étape 1 : Setup de la Base de Données

#### Option A : Fresh Start (Recommandé)
```bash
# Dans Supabase SQL Editor, copier-coller le contenu de :
FRESH_START.sql
```

Ce script va :
- 🗑️  Nettoyer toutes les tables existantes
- 🏗️  Créer les tables avec les bons types
- 👤 Créer un Super Admin
- 📊 Créer les projets initiaux (QATAR-001, AQUA-001)
- 🔐 Configurer le multi-tenant

#### Option B : Setup Incrémental
```bash
# Si vous avez déjà des données, utiliser :
COMPLETE_SETUP.sql
```

---

### Étape 2 : Vérification

```bash
# Dans Supabase SQL Editor, exécuter :
VERIFY_SQL_SETUP.sql
```

Vous devriez voir des ✅ partout !

---

### Étape 3 : Démarrage du Backend

```bash
# Terminal 1 : Backend Central
cd backend-central
npm install
npm start

# Le backend démarre sur http://localhost:5000
```

---

## 🔑 Identifiants par Défaut

### Super Admin
```
Email    : admin@hearstmining.com
Password : <REDACTED>
```

---

## 📊 Projets Créés Automatiquement

### 1. QATAR-001 (Actif)
- **Nom**: Hearst Qatar Mining
- **Status**: Active
- **Containers**: 58 × ANTSPACE HD5
- **Mineurs**: 17,864 × S21XP Hydro
- **Hashrate**: 8.45 EH/s
- **Power**: 102.37 MW
- **API**: http://localhost:3001
- **Frontend**: http://localhost:3000
- **Date de démarrage**: 1er janvier 2025

### 2. AQUA-001 (Planifié)
- **Nom**: Hearst Aquahash
- **Status**: Planned
- **Containers**: 15 × ANTSPACE HD5
- **Mineurs**: 4,620 × S21XP Hydro
- **Hashrate**: 2.19 EH/s
- **Power**: 26.37 MW
- **API**: http://localhost:3002
- **Frontend**: http://localhost:3100
- **Date de démarrage**: 1er juin 2025

---

## 🔍 Commandes de Vérification Rapide

### Vérifier les projets
```sql
SELECT id, name, status, start_date, total_hashrate_ths / 1000000.0 as hashrate_ehs
FROM projects
ORDER BY start_date;
```

### Vérifier les types de colonnes
```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'projects' 
  AND column_name IN ('start_date', 'end_date');
```

### Vue d'ensemble globale
```sql
SELECT * FROM global_overview;
```

---

## 🏗️ Structure du Projet

```
Hearst-Control-GitHub/
├── 📄 FRESH_START.sql              ← Setup complet (recommandé)
├── 📄 COMPLETE_SETUP.sql           ← Setup incrémental
├── 📄 VERIFY_SQL_SETUP.sql         ← Script de vérification
├── 📄 AUDIT_CORRECTIONS_SQL.md     ← Rapport d'audit
├── 📄 GUIDE_DEMARRAGE_RAPIDE.md    ← Ce fichier
│
├── 🗂️ backend-central/             ← API Gateway
│   ├── server.js
│   ├── controllers/
│   ├── routes/
│   └── package.json
│
├── 🗂️ core/                        ← Modules partagés
│   ├── auth/
│   ├── database/
│   └── middleware/
│
├── 🗂️ projects/
│   ├── hearst-qatar-new/          ← Projet Qatar
│   └── hearst-strategic-reserve-qatar/
│
├── 🗂️ database/                    ← Schémas SQL
│   ├── central-schema.sql
│   └── add-strategic-reserve-qatar.sql
│
└── 🗂️ scripts/                     ← Scripts utilitaires
    ├── start-all.sh
    └── stop-all.sh
```

---

## 📡 Endpoints API Disponibles

### Authentification
```bash
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me
```

### Dashboard
```bash
GET  /api/dashboard/overview
GET  /api/dashboard/alerts
GET  /api/dashboard/metrics
```

### Projets
```bash
GET  /api/projects
GET  /api/projects/:id
POST /api/projects
PUT  /api/projects/:id
```

### Utilisateurs
```bash
GET  /api/users
GET  /api/users/:id
POST /api/users
PUT  /api/users/:id
```

---

## 🛠️ Commandes Utiles

### Démarrer tous les services
```bash
./scripts/start-all.sh
```

### Arrêter tous les services
```bash
./scripts/stop-all.sh
```

### Tester le multi-tenant
```bash
./scripts/test-multi-tenant.sh
```

---

## 🐛 Résolution de Problèmes

### Erreur : "column is of type date but expression is of type text"
✅ **RÉSOLU** - Tous les fichiers SQL ont été corrigés

### Erreur : "relation does not exist"
```bash
# Réexécuter le script de setup
FRESH_START.sql
```

### Erreur : Backend ne démarre pas
```bash
cd backend-central
npm install
# Vérifier le fichier .env
cp env.example .env
# Configurer SUPABASE_URL et SUPABASE_KEY
npm start
```

### Erreur : Impossible de se connecter à Supabase
```bash
# Vérifier les variables d'environnement dans .env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

---

## 📚 Documentation Complémentaire

- 📖 [Architecture Globale](docs/architecture/ARCHITECTURE_GLOBALE.md)
- 🔒 [Guide Multi-Tenant](docs/guides/GUIDE_MULTI_TENANT.md)
- 🆕 [Créer un Nouveau Projet](docs/guides/GUIDE_NOUVEAU_PROJET_COMPLET.md)
- 🔍 [Rapport d'Audit SQL](AUDIT_CORRECTIONS_SQL.md)

---

## ✅ Checklist de Vérification

Avant de considérer le setup comme complet, vérifier :

- [ ] ✅ FRESH_START.sql exécuté sans erreur
- [ ] ✅ VERIFY_SQL_SETUP.sql montre tous les checks OK
- [ ] ✅ Super Admin peut se connecter
- [ ] ✅ 2 projets visibles (QATAR-001, AQUA-001)
- [ ] ✅ Backend démarre sur port 5000
- [ ] ✅ API /api/dashboard/overview retourne des données
- [ ] ✅ Aucune erreur dans les logs

---

## 🎉 Prêt à Commencer !

Vous êtes maintenant prêt à utiliser Hearst Control :

1. ✅ Base de données configurée
2. ✅ Multi-tenant activé
3. ✅ Projets initialisés
4. ✅ API opérationnelle
5. ✅ Types de données corrects

**Bon mining ! ⛏️💎**

---

## 📞 Support

Pour toute question ou problème :
1. Consulter [AUDIT_CORRECTIONS_SQL.md](AUDIT_CORRECTIONS_SQL.md)
2. Vérifier les logs : `tail -f backend-central/logs/app.log`
3. Réexécuter les scripts de vérification

---

**Dernière mise à jour** : 24 décembre 2025  
**Version** : 1.0.0  
**Status** : ✅ Production Ready

