# 📚 INDEX DES PROJETS - HEARST CONTROL

**Date**: 24 décembre 2025  
**Système**: Multi-tenant Mining Control Platform

---

## 🎯 NAVIGATION RAPIDE

| Besoin | Fichier |
|--------|---------|
| 📊 Status système | `SYSTEM_COMPLET_STATUS.md` |
| 🚀 Créer nouveau projet | `CREATE_HEARST_DESIGN.md` |
| 📖 Guide démarrage | `GUIDE_DEMARRAGE_RAPIDE.md` |
| 💾 Sauvegarde complète | `SAUVEGARDE_COMPLETE.md` |
| ✅ Success reports | `SUCCESS_FINAL.md`, `SRQ_SUCCESS.md` |

---

## 📊 PROJETS ACTUELS

### 1. QATAR-001 - Hearst Qatar Mining ✅
```
Status      : active
Containers  : 58
Mineurs     : 17,864
Hashrate    : 8.45 EH/s
Backend     : :3001
Frontend    : :3000
Doc         : projects/hearst-qatar-new/
```

### 2. AQUA-001 - Hearst Aquahash ⏳
```
Status      : planned
Containers  : 15
Mineurs     : 4,620
Hashrate    : 2.19 EH/s
Backend     : :3002
Frontend    : :3100
Date        : 2025-06-01
```

### 3. SRQ-001 - Strategic Reserve Qatar ✅
```
Status      : active
Containers  : 30
Mineurs     : 9,240
Hashrate    : 4.37 EH/s
Backend     : :3002 ✅ Actif
Frontend    : :3100 ✅ Actif
Doc         : SRQ_SUCCESS.md
Users       : operator@srq.qa, manager@srq.qa
```

### 4. DESIGN-001 - Hearst Design 📝
```
Status      : en préparation
Specs       : HEARST_DESIGN_SPECS.md
Guide       : CREATE_HEARST_DESIGN.md
Backend     : :3201 (réservé)
Frontend    : :3300 (réservé)
```

---

## 🌐 ARCHITECTURE SYSTÈME

```
┌─────────────────────────────────────────────────┐
│   HEARST CONTROL CENTRAL (Port 4000)           │
│   ✅ Actif - API Gateway Multi-tenant          │
└───┬──────────┬──────────┬──────────┬───────────┘
    │          │          │          │
    │/api/qatar│/api/srq  │/api/aqua │/api/design
    │          │          │          │
    ▼          ▼          ▼          ▼
┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐
│QATAR  │  │SRQ    │  │AQUA   │  │DESIGN │
│:3001  │  │:3002  │  │:3002  │  │:3201  │
│✅     │  │✅     │  │⏳     │  │📝     │
└───────┘  └───────┘  └───────┘  └───────┘
    │          │          │          │
    └──────────┴──────────┴──────────┘
                   │
                   ▼
        ┌──────────────────┐
        │  SUPABASE DB     │
        │  Hearst-Control  │
        │  ✅ Partagée     │
        └──────────────────┘
```

---

## 📊 STATISTIQUES GLOBALES

### Actuelles (3 projets)
```
Projets      : 3
Containers   : 88
Mineurs      : 27,104
Hashrate     : 12.82 EH/s
Power        : 155.32 MW
Utilisateurs : 3
```

### Projection (4 projets avec Design)
```
Projets      : 4
Containers   : 88 + [X]
Mineurs      : 27,104 + [X]
Hashrate     : 12.82 + [X] EH/s
Power        : 155.32 + [X] MW
Utilisateurs : 3 + 3 (Design)
```

---

## 🔑 CREDENTIALS PAR PROJET

### Global - Super Admin
```
admin@hearstmining.com / <REDACTED>
→ Accès: TOUS les projets
```

### SRQ-001
```
operator@srq.qa / <REDACTED>
manager@srq.qa / <REDACTED>
```

### DESIGN-001 (à créer)
```
admin@design.hearst.com / <REDACTED>
operator@design.hearst.com / <REDACTED>
manager@design.hearst.com / <REDACTED>
```

---

## 🔌 CARTE DES PORTS

| Port | Service | Status | Projet |
|------|---------|--------|--------|
| 4000 | Central API | ✅ Actif | - |
| 3001 | Backend | ⏳ Disponible | QATAR-001 |
| 3000 | Frontend | ⏳ Disponible | QATAR-001 |
| 3002 | Backend | ✅ Actif | SRQ-001 |
| 3100 | Frontend | ✅ Actif | SRQ-001 |
| 3003 | Backend | ⏳ Disponible | TEXAS / Autre |
| **3201** | **Backend** | **🔒 Réservé** | **DESIGN-001** |
| **3300** | **Frontend** | **🔒 Réservé** | **DESIGN-001** |
| 3400 | Backend | ⏳ Disponible | Futur |
| 3500 | Frontend | ⏳ Disponible | Futur |

---

## 📁 DOCUMENTATION PAR PROJET

### Documentation Générale
```
📄 START_ICI.md                    - Démarrage rapide
📄 SYSTEM_COMPLET_STATUS.md        - Status complet
📄 SAUVEGARDE_COMPLETE.md          - Backup config
📄 INDEX_PROJETS.md                - Ce fichier
```

### QATAR-001
```
📁 projects/hearst-qatar-new/
   📄 README.md
   📄 PROJECT_CONFIG.json
```

### SRQ-001
```
📄 SRQ_STATUS.md
📄 SRQ_SUCCESS.md
📄 RACCORDEMENT_GUIDE.md
📄 SETUP_SRQ_COMPLET.sql
📁 projects/hearst-strategic-reserve-qatar/
```

### DESIGN-001 (nouveau)
```
📄 HEARST_DESIGN_SPECS.md          - Spécifications
📄 CREATE_HEARST_DESIGN.md         - Guide création
📄 (à créer) SETUP_DESIGN_COMPLET.sql
📁 (à créer) projects/hearst-design/
```

---

## 🚀 CRÉER UN NOUVEAU PROJET

### Processus Standard (10 min)

1. **Définir les specs** → `HEARST_DESIGN_SPECS.md`
2. **Générer les scripts** → `SETUP_[PROJET]_COMPLET.sql`
3. **Exécuter SQL** → Dans Supabase
4. **Configurer .env** → Backend + Frontend
5. **Démarrer services** → npm start
6. **Tester** → Logins + API

### Templates Disponibles
```
✅ SETUP_SRQ_COMPLET.sql           - Référence SQL
✅ raccorder-srq.sh                - Script config auto
✅ projects/hearst-strategic-reserve-qatar/ - Structure
```

---

## 📞 COMMANDES UTILES

### Voir tous les projets actifs
```bash
curl http://localhost:4000/api/projects \
  -H "Authorization: Bearer $TOKEN"
```

### Dashboard global
```bash
curl http://localhost:4000/api/dashboard/overview \
  -H "Authorization: Bearer $TOKEN"
```

### Health check tous services
```bash
curl http://localhost:4000/health  # Central
curl http://localhost:3002/health  # SRQ
curl http://localhost:3201/health  # Design (futur)
```

---

## 🎯 PROCHAINES ÉTAPES

### Pour Hearst Design :
1. ✅ Spécifications créées
2. ⏳ Attente des détails techniques
3. ⏳ Génération scripts SQL
4. ⏳ Configuration et démarrage

### Expansion Future :
- ⏳ Hearst Texas
- ⏳ Autres sites géographiques
- ⏳ Projets spécialisés

---

## 📊 CAPACITÉ SYSTÈME

### Actuellement Utilisé
```
Projets opérationnels : 2/∞
Ports utilisés        : 3/∞
Base de données       : 1 tenant (hearst)
Utilisateurs          : 3
```

### Capacité Disponible
```
Nouveaux projets      : Illimité
Ports disponibles     : 3200-9999
Tenants               : Multi-tenant activé
Scalabilité           : Horizontale
```

---

**Système prêt pour expansion ! 🚀**

**Dernière mise à jour** : 24 décembre 2025 - 02:00 AM

