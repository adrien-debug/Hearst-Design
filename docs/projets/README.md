# 🎯 Documentation des Projets

Ce dossier contient les spécifications et la documentation spécifique à chaque projet Hearst Control.

## 📋 Projets Documentés

### Hearst Design

- **[CREATE_HEARST_DESIGN.md](CREATE_HEARST_DESIGN.md)** - Guide de création du projet Hearst Design
- **[HEARST_DESIGN_SPECS.md](HEARST_DESIGN_SPECS.md)** - Spécifications techniques complètes

### Plans d'Action

- **[ACTION_PLAN.md](ACTION_PLAN.md)** - Plan d'action global pour les projets

## 🏗️ Projets Actifs

### 1. Hearst Qatar ✅
- **Statut** : ACTIF
- **Location** : `projects/hearst-qatar-new/`
- **Documentation** : Voir le README dans le dossier du projet

### 2. Hearst Design ✅
- **Statut** : ACTIF
- **Location** : `projects/hearst-design/`
- **Documentation** : [CREATE_HEARST_DESIGN.md](CREATE_HEARST_DESIGN.md)

### 3. Hearst Strategic Reserve Qatar ✅
- **Statut** : ACTIF
- **Location** : `projects/hearst-strategic-reserve-qatar/`
- **Documentation** : Voir `docs/rapports/STRATEGIC_RESERVE_QATAR.md`

## 🚀 Créer un Nouveau Projet

Pour créer un nouveau projet, consultez :
- [../guides/GUIDE_NOUVEAU_PROJET.md](../guides/GUIDE_NOUVEAU_PROJET.md)
- [../guides/GUIDE_NOUVEAU_PROJET_COMPLET.md](../guides/GUIDE_NOUVEAU_PROJET_COMPLET.md)

Ou utilisez le script :

```bash
./scripts/deploy-project.sh nom-du-projet
```

## 📁 Structure d'un Projet Type

```
projects/nom-du-projet/
├── backend/          # Backend API
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── server.js
├── frontend/         # Interface utilisateur
│   ├── pages/
│   ├── components/
│   └── public/
├── database/         # Schéma de base de données
│   └── schema.sql
└── README.md         # Documentation du projet
```

---

⬅️ [Retour à la documentation](../)

