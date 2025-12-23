# 📚 HEARST CONTROL - INDEX CENTRAL DE DOCUMENTATION

> **Version** : 1.0.0  
> **Dernière mise à jour** : 24 décembre 2025  
> **Responsable** : Claude (IA) / Gérard Bressence  
> **Génération automatique** : `./scripts/generate-doc-index.sh`

---

## 🎯 NAVIGATION RAPIDE

| Besoin | Document | Emplacement |
|--------|----------|-------------|
| **Démarrer rapidement** | [Guide Démarrage](#-démarrage--installation) | `docs/guides/` |
| **Comprendre l'architecture** | [Architecture Globale](#-architecture--schémas) | `docs/architecture/` |
| **Créer un nouveau projet** | [Guide Nouveau Projet](#-guides-opérationnels) | `docs/guides/` |
| **Schémas base de données** | [Schémas SQL](#-schémas-base-de-données) | `schemas/` |
| **Variables d'environnement** | [Fichiers .env](#-variables-denvironnement) | `env/` |

---

## 🚀 DÉMARRAGE & INSTALLATION

| Document | Description | Statut |
|----------|-------------|--------|
| [README.md](./README.md) | Présentation générale et démarrage ultra-rapide | ✅ Actif |
| [GUIDE_DEMARRAGE.md](./docs/guides/GUIDE_DEMARRAGE.md) | Guide complet d'installation | ✅ Actif |
| [GUIDE_NOUVEAU_PROJET.md](./docs/guides/GUIDE_NOUVEAU_PROJET.md) | Créer un nouveau projet client | ✅ Actif |
| [GUIDE_NOUVEAU_PROJET_COMPLET.md](./docs/guides/GUIDE_NOUVEAU_PROJET_COMPLET.md) | Mode d'emploi détaillé création projet | ✅ Actif |
| [REPONSE_RAPIDE_NOUVEAU_PROJET.md](./docs/guides/REPONSE_RAPIDE_NOUVEAU_PROJET.md) | FAQ création projet | ✅ Actif |

---

## 🏗️ ARCHITECTURE & SCHÉMAS

| Document | Description | Statut | ⭐ Stratégique |
|----------|-------------|--------|----------------|
| [ARCHITECTURE_GLOBALE.md](./docs/architecture/ARCHITECTURE_GLOBALE.md) | Vue macro du système multi-projets | ✅ Actif | ⭐ |
| [HEARST_CONTROL_COMPLET.md](./docs/architecture/HEARST_CONTROL_COMPLET.md) | Documentation technique complète | ✅ Actif | ⭐ |
| [DIAGRAMME_REUTILISATION.md](./docs/architecture/DIAGRAMME_REUTILISATION.md) | Flux logiques et réutilisation modules | ✅ Actif | |
| [AUTONOMIE_COMPLETE.md](./docs/architecture/AUTONOMIE_COMPLETE.md) | Système Ensemble - autonomie | ✅ Actif | |

---

## 💰 DOCUMENTS STRATÉGIQUES & DÉCISIONNELS

> ⭐ Documents de référence pour les décisions stratégiques

| Document | Description | Type |
|----------|-------------|------|
| [HEARST_CLIENT_PACKAGE.md](./docs/rapports/HEARST_CLIENT_PACKAGE.md) | Package client complet | 📊 Commercial |
| [PLATEFORME_COMPLETE.md](./docs/rapports/PLATEFORME_COMPLETE.md) | Synthèse plateforme | 📋 Synthèse |
| [STRATEGIC_RESERVE_QATAR.md](./docs/rapports/STRATEGIC_RESERVE_QATAR.md) | Réserve stratégique Qatar | 💰 Finance |
| [SYNTHESE_FINALE_PROJET.md](./docs/rapports/SYNTHESE_FINALE_PROJET.md) | Synthèse finale complète | 📋 Synthèse |

---

## 🧪 RAPPORTS & SUIVI

| Document | Description | Date | Statut |
|----------|-------------|------|--------|
| [RESUME_FINAL.md](./docs/rapports/RESUME_FINAL.md) | Résumé final du projet | 2025-12 | ✅ |
| [STATUT_CORRECTIONS.md](./docs/rapports/STATUT_CORRECTIONS.md) | Corrections en cours | 2025-12-24 | 🔄 Évolutif |

---

## 🗄️ SCHÉMAS BASE DE DONNÉES

| Fichier | Description | Projet |
|---------|-------------|--------|
| [central-schema.sql](./schemas/central-schema.sql) | Schéma central multi-projets | Global |
| [qatar-schema.sql](./schemas/qatar-schema.sql) | Schéma projet Qatar | Qatar |
| [srq-schema.sql](./schemas/srq-schema.sql) | Schéma Strategic Reserve Qatar | SRQ |
| [add-strategic-reserve-qatar.sql](./schemas/add-strategic-reserve-qatar.sql) | Migration SRQ | SRQ |

---

## ⚙️ VARIABLES D'ENVIRONNEMENT

| Fichier | Description | Projet |
|---------|-------------|--------|
| [backend-central.env.example](./env/backend-central.env.example) | Config backend central | Global |
| [qatar-backend.env.example](./env/qatar-backend.env.example) | Config backend Qatar | Qatar |
| [qatar-frontend.env.example](./env/qatar-frontend.env.example) | Config frontend Qatar | Qatar |
| [srq-backend.env.example](./env/srq-backend.env.example) | Config Strategic Reserve | SRQ |

---

## 📁 PROJETS

### Hearst Qatar (Actif) ✅
> **Specs** : 58 containers, 17,864 mineurs, 8.45 EH/s, 102.37 MW

| Élément | Description |
|---------|-------------|
| [README.md](./projects/hearst-qatar-new/README.md) | Documentation projet Qatar |
| Backend | Port 3001 |
| Frontend | Port 3000 |

### Strategic Reserve Qatar 🆕
| Élément | Description |
|---------|-------------|
| [README.md](./projects/hearst-strategic-reserve-qatar/README.md) | Documentation projet SRQ |
| Backend | Port 3002 |
| Frontend | Port 3100 |

### Core (Code Commun) 🔧
| Élément | Description |
|---------|-------------|
| [README.md](./core/README.md) | Documentation code partagé |

---

## 🔧 SCRIPTS & AUTOMATISATION

| Script | Description | Usage |
|--------|-------------|-------|
| [start-all.sh](./scripts/start-all.sh) | Démarrer tous les services | `./scripts/start-all.sh` |
| [stop-all.sh](./scripts/stop-all.sh) | Arrêter tous les services | `./scripts/stop-all.sh` |
| [deploy-project.sh](./scripts/deploy-project.sh) | Déployer un projet | `./scripts/deploy-project.sh <nom>` |
| [generate-doc-index.sh](./scripts/generate-doc-index.sh) | Analyser la documentation | `./scripts/generate-doc-index.sh` |

---

## 📂 STRUCTURE DES DOSSIERS

```
Hearst Controle/
├── 📄 DOCUMENTATION_INDEX.md    ← CE FICHIER (point d'entrée)
├── 📄 README.md                 ← Présentation rapide
│
├── 📁 docs/                     ← DOCUMENTATION CENTRALISÉE
│   ├── guides/                  ← Guides d'utilisation
│   ├── architecture/            ← Docs techniques
│   ├── rapports/                ← Synthèses et rapports
│   └── historique/              ← Archives
│
├── 📁 env/                      ← FICHIERS .env.example CENTRALISÉS
├── 📁 schemas/                  ← SCHÉMAS SQL CENTRALISÉS
│
├── 📁 core/                     ← Code commun réutilisable
├── 📁 backend-central/          ← API Gateway (port 4000)
├── 📁 database/                 ← Schémas originaux
├── 📁 scripts/                  ← Scripts d'orchestration
│
└── 📁 projects/                 ← PROJETS ISOLÉS
    ├── hearst-qatar-new/        ← Projet Qatar (ACTIF)
    ├── hearst-strategic-reserve-qatar/
    └── qatar-dashboard-original/
```

---

## 📜 HISTORIQUE DES VERSIONS

| Version | Date | Changements |
|---------|------|-------------|
| 1.0.0 | 2025-12-24 | Création de l'index centralisé, restructuration documentaire complète |

### Fichiers renommés (traçabilité)

| Ancien nom | Nouveau nom/emplacement | Raison |
|------------|-------------------------|--------|
| `🎉_STRATEGIC_RESERVE_QATAR_CREATED.md` | `docs/rapports/STRATEGIC_RESERVE_QATAR.md` | Robustesse |
| `🎯_PLATEFORME_COMPLETE.md` | `docs/rapports/PLATEFORME_COMPLETE.md` | Robustesse |
| `📦_NOUVEAU_PROJET_README.md` | `docs/guides/GUIDE_NOUVEAU_PROJET_COMPLET.md` | Clarification |
| `START_HERE.md` | `docs/guides/GUIDE_DEMARRAGE.md` | Clarification |
| `ARCHITECTURE_GLOBALE.md` | `docs/architecture/ARCHITECTURE_GLOBALE.md` | Centralisation |
| `AUTONOMIE_COMPLETE.md` | `docs/architecture/AUTONOMIE_COMPLETE.md` | Centralisation |

### Fichiers archivés

Les fichiers suivants ont été déplacés dans `docs/historique/` :
- `INDEX_DOCUMENTATION_OLD.md` (ancienne version de l'index)
- `START_HERE_V2.md`
- `EXECUTE_NOW.txt`, `FICHIERS_CRÉÉS.txt`, `FICHIERS_MODIFIÉS.txt`
- `STATUS_ULTRA_AUTO.txt`, `ULTIMATE_START.txt`

---

## 🤖 MAINTENANCE DE CET INDEX

**Responsabilité** : Claude (IA) ou référent technique

**Mise à jour** :
```bash
# Analyser la structure actuelle
./scripts/generate-doc-index.sh

# Puis mettre à jour manuellement ce fichier
# ou demander à Claude de le faire
```

**Règles** :
1. Tout nouveau document → Ajouter dans la section appropriée
2. Document supprimé → Retirer de l'index + ajouter dans "Historique"
3. Document renommé → Mettre à jour le lien + traçabilité

---

## 📞 SUPPORT

**En cas de problème :**

1. Consulter ce document d'abord
2. Vérifier les logs : `tail -f logs/*.log`
3. Lancer les tests : `node backend/scripts/testEnsemble.js`
4. Contacter l'équipe technique

---

> **Hearst Control V1.0**  
> Plateforme Multi-Projets Centralisée  
> *Index documentaire - Décembre 2025*
