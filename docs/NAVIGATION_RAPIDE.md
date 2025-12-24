# 🧭 Navigation Rapide - Hearst Control

**Guide de navigation rapide dans la documentation**

---

## 🚀 DÉMARRAGE IMMÉDIAT

### Je veux commencer maintenant !
👉 **[docs/guides/START_ICI.md](docs/guides/START_ICI.md)** ⭐

### Je veux un aperçu rapide
👉 **[docs/QUICK_SUMMARY.md](docs/QUICK_SUMMARY.md)**

### Je veux lancer tous les services
```bash
./scripts/start-all.sh
```

---

## 📚 PAR CATÉGORIE

### 🚀 Guides de Démarrage
📁 **[docs/guides/](docs/guides/)** - [Index](docs/guides/README.md)

| Document | Usage |
|----------|-------|
| **[START_ICI.md](docs/guides/START_ICI.md)** ⭐ | Commencez ici ! |
| [GUIDE_DEMARRAGE_RAPIDE.md](docs/guides/GUIDE_DEMARRAGE_RAPIDE.md) | Démarrage en 5 minutes |
| [DEMARRAGE_BACKEND.md](docs/guides/DEMARRAGE_BACKEND.md) | Lancer le backend |
| [GUIDE_NOUVEAU_PROJET.md](docs/guides/GUIDE_NOUVEAU_PROJET.md) | Créer un projet |
| [GUIDE_MULTI_TENANT.md](docs/guides/GUIDE_MULTI_TENANT.md) | Multi-tenant |

### 🏗️ Architecture
📁 **[docs/architecture/](docs/architecture/)**

| Document | Usage |
|----------|-------|
| [ARCHITECTURE_GLOBALE.md](docs/architecture/ARCHITECTURE_GLOBALE.md) | Vue d'ensemble |
| [HEARST_CONTROL_COMPLET.md](docs/architecture/HEARST_CONTROL_COMPLET.md) | Documentation complète |
| [AUTONOMIE_COMPLETE.md](docs/architecture/AUTONOMIE_COMPLETE.md) | Système d'autonomie |

### 📊 Rapports et Statuts
📁 **[docs/rapports/](docs/rapports/)** - [Index](docs/rapports/README.md)

| Document | Usage |
|----------|-------|
| [SYSTEM_COMPLET_STATUS.md](docs/rapports/SYSTEM_COMPLET_STATUS.md) | État actuel |
| [SYSTEME_COMPLET_4_PROJETS.md](docs/rapports/SYSTEME_COMPLET_4_PROJETS.md) | Vue 4 projets |
| [SUCCESS_FINAL.md](docs/rapports/SUCCESS_FINAL.md) | Rapport final |
| [CORRECTIONS_24_DEC_2025.md](docs/rapports/CORRECTIONS_24_DEC_2025.md) | Dernières corrections |

### 🧪 Tests
📁 **[docs/tests/](docs/tests/)** - [Index](docs/tests/README.md)

| Document | Usage |
|----------|-------|
| [TEST_SUPABASE_COMPLET.md](docs/tests/TEST_SUPABASE_COMPLET.md) | Tests Supabase |
| [TEST_COMPLET_24_DEC_2025.md](docs/tests/TEST_COMPLET_24_DEC_2025.md) | Tests système |

### 🎯 Projets
📁 **[docs/projets/](docs/projets/)** - [Index](docs/projets/README.md)

| Document | Usage |
|----------|-------|
| [CREATE_HEARST_DESIGN.md](docs/projets/CREATE_HEARST_DESIGN.md) | Hearst Design |
| [HEARST_DESIGN_SPECS.md](docs/projets/HEARST_DESIGN_SPECS.md) | Spécifications |

---

## 🎯 PAR BESOIN

### 🆕 Je veux créer un nouveau projet
1. 📖 Lire : [docs/guides/GUIDE_NOUVEAU_PROJET.md](docs/guides/GUIDE_NOUVEAU_PROJET.md)
2. 🚀 Exécuter : `./scripts/deploy-project.sh nom-projet`

### 🔧 Je veux configurer le backend
1. 📖 Lire : [docs/guides/DEMARRAGE_BACKEND.md](docs/guides/DEMARRAGE_BACKEND.md)
2. ⚙️ Configurer : `backend-central/.env`
3. 🚀 Lancer : `./scripts/start-all.sh`

### 🏗️ Je veux comprendre l'architecture
1. 📖 Vue d'ensemble : [docs/architecture/ARCHITECTURE_GLOBALE.md](docs/architecture/ARCHITECTURE_GLOBALE.md)
2. 📖 Détails : [docs/architecture/HEARST_CONTROL_COMPLET.md](docs/architecture/HEARST_CONTROL_COMPLET.md)

### 📊 Je veux voir l'état du système
1. 📊 Statut : [docs/rapports/SYSTEM_COMPLET_STATUS.md](docs/rapports/SYSTEM_COMPLET_STATUS.md)
2. 📊 Projets : [docs/rapports/SYSTEME_COMPLET_4_PROJETS.md](docs/rapports/SYSTEME_COMPLET_4_PROJETS.md)

### 🧪 Je veux tester le système
1. 📖 Guide : [docs/tests/TEST_SUPABASE_COMPLET.md](docs/tests/TEST_SUPABASE_COMPLET.md)
2. 🧪 Tester : `cd backend-central && node test-supabase-connection.js`

### 🔐 Je veux configurer l'authentification
1. 📖 Guide : [docs/guides/GUIDE_MULTI_TENANT.md](docs/guides/GUIDE_MULTI_TENANT.md)
2. 📖 API : [docs/API_MULTI_TENANT.md](docs/API_MULTI_TENANT.md)

---

## 👤 PAR PROFIL

### 👨‍💻 Développeur Frontend
```
1. 📖 START_ICI.md (docs/guides/)
2. 🏗️ ARCHITECTURE_GLOBALE.md (docs/architecture/)
3. 📁 Projets dans projects/
4. 🚀 npm run dev
```

### 👨‍💻 Développeur Backend
```
1. 📖 DEMARRAGE_BACKEND.md (docs/guides/)
2. 🏗️ HEARST_CONTROL_COMPLET.md (docs/architecture/)
3. 🧪 TEST_SUPABASE_COMPLET.md (docs/tests/)
4. 🚀 ./scripts/start-all.sh
```

### 👔 Chef de Projet
```
1. 📊 QUICK_SUMMARY.md (docs/)
2. 📊 SYSTEM_COMPLET_STATUS.md (docs/rapports/)
3. 📊 SYSTEME_COMPLET_4_PROJETS.md (docs/rapports/)
4. 📖 INDEX_PROJETS.md (docs/)
```

### 🔧 DevOps
```
1. 📖 GUIDE_MULTI_TENANT.md (docs/guides/)
2. 🏗️ AUTONOMIE_COMPLETE.md (docs/architecture/)
3. 🔧 Scripts dans scripts/
4. 🧪 Tests dans docs/tests/
```

---

## 🗂️ STRUCTURE COMPLÈTE

```
📦 Hearst-Control-GitHub/
│
├── 📄 README.md                    ← Point d'entrée principal
├── 📄 NAVIGATION_RAPIDE.md         ← Ce fichier
├── 📄 ORGANISATION_DOCUMENTATION.md ← Détails organisation
│
├── 📚 docs/                        ← Toute la documentation
│   ├── 📄 README.md                ← Index documentation
│   │
│   ├── 🚀 guides/                  ← Guides de démarrage
│   │   ├── 📄 README.md
│   │   ├── ⭐ START_ICI.md         ← COMMENCEZ ICI
│   │   └── [12 autres guides...]
│   │
│   ├── 🏗️ architecture/            ← Architecture technique
│   │   ├── ARCHITECTURE_GLOBALE.md
│   │   ├── HEARST_CONTROL_COMPLET.md
│   │   └── [2 autres docs...]
│   │
│   ├── 📊 rapports/                ← Rapports et statuts
│   │   ├── 📄 README.md
│   │   └── [20 rapports...]
│   │
│   ├── 🧪 tests/                   ← Tests et validations
│   │   ├── 📄 README.md
│   │   └── [6 docs de tests...]
│   │
│   ├── 🎯 projets/                 ← Spécifications projets
│   │   ├── 📄 README.md
│   │   └── [3 specs...]
│   │
│   └── 📜 historique/              ← Archives
│       └── [9 fichiers d'archives...]
│
├── 🖥️ backend-central/             ← Backend central
├── 📚 core/                        ← Code commun
├── 📊 projects/                    ← Projets isolés
├── 🗄️ database/                    ← Schémas DB
├── 🔧 scripts/                     ← Scripts orchestration
└── 📁 schemas/                     ← Schémas SQL
```

---

## ⚡ COMMANDES RAPIDES

### Démarrage
```bash
# Tout démarrer
./scripts/start-all.sh

# Tout arrêter
./scripts/stop-all.sh

# Nouveau projet
./scripts/deploy-project.sh nom-projet
```

### Tests
```bash
# Test Supabase
cd backend-central
node test-supabase-connection.js

# Tests SQL
node test-sql-queries.js

# Vérifier schéma
node verify-schema.js
```

### Backend Central
```bash
cd backend-central
npm install
cp env.example .env
# Éditer .env
npm start
```

---

## 🔗 LIENS UTILES

### Documentation Principale
- 📖 [README Principal](README.md)
- 📚 [Index Documentation](docs/README.md)
- 📋 [Index Complet](docs/DOCUMENTATION_INDEX.md)

### Guides Essentiels
- ⭐ [START_ICI.md](docs/guides/START_ICI.md)
- 🚀 [Guide Démarrage Rapide](docs/guides/GUIDE_DEMARRAGE_RAPIDE.md)
- 🏗️ [Architecture Globale](docs/architecture/ARCHITECTURE_GLOBALE.md)

### Statuts
- 📊 [Statut Système](docs/rapports/SYSTEM_COMPLET_STATUS.md)
- ✅ [Succès Final](docs/rapports/SUCCESS_FINAL.md)

---

## 💡 CONSEILS

### Pour les Nouveaux
1. Commencez par [START_ICI.md](docs/guides/START_ICI.md)
2. Explorez la structure dans [docs/](docs/)
3. Consultez les README de chaque dossier
4. Utilisez ce fichier comme référence rapide

### Pour Trouver Quelque Chose
1. Consultez [docs/README.md](docs/README.md)
2. Utilisez la section "Par Besoin" ci-dessus
3. Regardez dans le dossier approprié
4. Consultez le README du dossier

### Pour Contribuer
1. Respectez la structure actuelle
2. Ajoutez des README si nécessaire
3. Mettez à jour les index
4. Documentez vos changements

---

## 📞 AIDE

### Problème de Démarrage
→ [docs/guides/GUIDE_DEMARRAGE_RAPIDE.md](docs/guides/GUIDE_DEMARRAGE_RAPIDE.md)

### Problème de Connexion
→ [docs/tests/TEST_SUPABASE_COMPLET.md](docs/tests/TEST_SUPABASE_COMPLET.md)

### Question d'Architecture
→ [docs/architecture/ARCHITECTURE_GLOBALE.md](docs/architecture/ARCHITECTURE_GLOBALE.md)

### Autre Question
→ [docs/DOCUMENTATION_INDEX.md](docs/DOCUMENTATION_INDEX.md)

---

**🏢 HEARST CONTROL V1.0**  
**Navigation Simplifiée**  
**24 Décembre 2025**

---

⬅️ [Retour au README principal](README.md) | 📚 [Documentation complète](docs/README.md)

