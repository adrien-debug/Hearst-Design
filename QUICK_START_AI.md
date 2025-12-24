# ⚡ QUICK START - Agents AI (2 minutes)

> **Version :** 2.0.0 | **Date :** 24 décembre 2025

---

## 🎯 Contexte en 10 Secondes

**Hearst Control** = **Application Electron (de bureau)** pour gérer plusieurs **projets web indépendants** pour Hearst.

```
HEARST CONTROL (Application Electron)
│
├── Interface de bureau (Electron)
├── Backend central (API Gateway)
└── Projets web gérés :
    ├── Hearst Design ✅
    ├── Hearst Qatar ✅
    ├── Hearst Strategic Reserve Qatar ✅
    └── Futurs projets web...
```

> **NOTE IMPORTANTE** : Hearst Control est une application de bureau (Electron) qui permet de gérer et superviser plusieurs projets web depuis une interface centralisée.

---

## 📂 Structure Essentielle (1 minute)

```
Hearst-Control-GitHub/
│
├── 🔧 core/                    ← CODE COMMUN RÉUTILISABLE (70-80%)
│   ├── auth/authService.js     ← Authentification JWT multi-tenant
│   ├── middleware/             ← Middlewares partagés
│   └── database/               ← Client Supabase
│
├── 🖥️ backend-central/         ← API GATEWAY (Port 4000)
│   ├── controllers/            ← Auth, Projects, Users, Dashboard
│   ├── routes/                 ← Routes API centrales
│   └── server.js               ← Point d'entrée
│
├── 📊 projects/                ← PROJETS ISOLÉS
│   ├── hearst-design/          ← Port 3002
│   ├── hearst-qatar-new/       ← Port 3001
│   └── hearst-strategic-reserve-qatar/ ← Port 3003
│
├── 🔧 scripts/                 ← AUTOMATISATION
│   ├── start-all.sh            ← Démarrer TOUT
│   ├── stop-all.sh             ← Arrêter TOUT
│   └── deploy-project.sh       ← Créer nouveau projet
│
├── 📚 docs/                    ← DOCUMENTATION COMPLÈTE
│   ├── ESSENTIELS/             ← Règles, Commandes, Architecture
│   ├── architecture/           ← Architecture détaillée
│   └── guides/                 ← Guides de démarrage
│
└── 🗄️ database/ + schemas/    ← SCHÉMAS SQL
```

---

## 🔑 Commandes Essentielles (30 secondes)

```bash
# Démarrer TOUS les services
./scripts/start-all.sh

# Arrêter TOUS les services
./scripts/stop-all.sh

# Créer un nouveau projet
./scripts/deploy-project.sh nom-du-projet

# Tester isolation multi-tenant
./scripts/test-multi-tenant.sh
```

---

## ⚠️ 5 Règles Critiques

1. **JAMAIS** de code métier dans `core/` ou `backend-central/`
2. **TOUJOURS** filtrer par `tenant_id` dans les requêtes SQL
3. **JAMAIS** réécrire l'authentification - utiliser `core/auth/`
4. **TOUJOURS** utiliser les scripts existants pour créer des projets
5. **JAMAIS** de secrets en dur - utiliser variables `.env`

---

## 📚 Documentation Complète

| Besoin | Document |
|--------|----------|
| 🤖 Guide complet agent | `AI_AGENT_GUIDE.md` |
| 📋 Les 41 règles | `docs/ESSENTIELS/RULES_REFERENCE.md` |
| 🏗️ Architecture | `docs/architecture/ARCHITECTURE_GLOBALE.md` |
| 📁 Structure détaillée | `PROJECT_STRUCTURE.md` |
| 🔧 Toutes les commandes | `docs/ESSENTIELS/COMMANDS_REFERENCE.md` |
| 🔄 Workflow dev | `docs/ESSENTIELS/DEVELOPMENT_WORKFLOW.md` |

---

## ✅ Checklist Avant Intervention

- [ ] J'ai lu ce fichier (QUICK_START_AI.md)
- [ ] Je connais le contexte (quel projet ?)
- [ ] Je vérifie les règles si modification
- [ ] Je ne touche pas aux autres projets

---

## 🚀 Prochaine Étape

**Lire le guide complet :** [`AI_AGENT_GUIDE.md`](AI_AGENT_GUIDE.md) (10 minutes)

---

**Hearst Control V2.0** | Plateforme Multi-Projets Centralisée pour le Développement Technologique

