# 🔍 STRATEGIC RESERVE QATAR - STATUS & RACCORDEMENT

**Date** : 24 décembre 2025  
**Projet** : SRQ-001 - Strategic Reserve Qatar  
**Status** : ⏳ Prêt à raccorder

---

## ✅ CE QUI EST PRÊT

### 📁 Dossier du Projet
```
✅ projects/hearst-strategic-reserve-qatar/
   ✅ backend/ - Backend complet
   ✅ frontend/ - Frontend Next.js
   ✅ database/ - Schéma SQL
   ✅ Documentation complète (PROJECT_INFO.md)
```

### 📊 Spécifications Techniques
```
✅ 30 containers ANTSPACE HD5
✅ 9,240 mineurs S21XP Hydro
✅ 4.37 EH/s de hashrate
✅ 52.95 MW de puissance
✅ Ports : Backend 3002, Frontend 3100
```

---

## 📝 FICHIERS CRÉÉS POUR LE RACCORDEMENT

| Fichier | Description |
|---------|-------------|
| **ADD_SRQ_PROJECT.sql** | 📄 Script SQL pour ajouter le projet à la base centrale |
| **CHECK_SRQ_PROJECT.sql** | 🔍 Vérifier si le projet existe |
| **RACCORDEMENT_GUIDE.md** | 📖 Guide complet de raccordement |
| **raccorder-srq.sh** | 🚀 Script automatique de configuration |

---

## 🚀 RACCORDEMENT EN 3 ÉTAPES

### ÉTAPE 1 : Ajouter le Projet dans Supabase ⏱️ 1 min

```bash
# Dans Supabase SQL Editor :
# Copier-coller le contenu de ADD_SRQ_PROJECT.sql
```

**Résultat attendu** :
```sql
✅ Projet SRQ-001 créé
✅ 30 containers, 9,240 mineurs, 4.37 EH/s
✅ Accès Super Admin accordé
```

---

### ÉTAPE 2 : Configurer Automatiquement ⏱️ 2 min

```bash
# Exécuter le script de configuration
./raccorder-srq.sh
```

**Ce script va** :
- ✅ Créer `.env` pour le backend
- ✅ Créer `.env.local` pour le frontend
- ✅ Installer toutes les dépendances npm
- ✅ Tout configurer automatiquement

---

### ÉTAPE 3 : Démarrer les Services ⏱️ 1 min

**Terminal 1 : Backend SRQ**
```bash
cd projects/hearst-strategic-reserve-qatar/backend
npm start
```
→ Backend démarre sur **http://localhost:3002**

**Terminal 2 : Frontend SRQ**
```bash
cd projects/hearst-strategic-reserve-qatar/frontend
npm run dev
```
→ Frontend démarre sur **http://localhost:3100**

---

## 🌐 ARCHITECTURE FINALE

```
┌──────────────────────────────────────────────────────┐
│        HEARST CONTROL CENTRAL                        │
│        http://localhost:4000                         │
│        ✅ Déjà actif                                 │
└────────────┬──────────────────────────┬──────────────┘
             │                          │
             │ Proxy /api/qatar/*       │ Proxy /api/srq/*
             │                          │
             ▼                          ▼
┌────────────────────────┐  ┌──────────────────────────┐
│  QATAR-001             │  │  SRQ-001                 │
│  :3001 → :3000         │  │  :3002 → :3100           │
│  ✅ Actif              │  │  ⏳ À raccorder          │
└────────────────────────┘  └──────────────────────────┘
             │                          │
             └──────────┬───────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │  SUPABASE        │
              │  Hearst-Control  │
              │  ✅ Opérationnelle│
              └──────────────────┘
```

---

## 🔑 AUTHENTIFICATION UNIFIÉE

### Se connecter via Central API
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hearstmining.com","password":"<REDACTED>"}'
```

**Le token JWT contiendra l'accès à** :
- ✅ QATAR-001
- ✅ AQUA-001  
- ✅ SRQ-001 (après raccordement)

---

## 📊 DONNÉES DU PROJET SRQ-001

```json
{
  "id": "SRQ-001",
  "name": "Strategic Reserve Qatar",
  "description": "National Bitcoin Mining Infrastructure",
  "location": "Qatar",
  "status": "planned",
  
  "infrastructure": {
    "total_containers": 30,
    "total_miners": 9240,
    "container_model": "ANTSPACE HD5",
    "miners_per_container": 308,
    "miner_model": "S21XP Hydro"
  },
  
  "performance": {
    "total_hashrate_ths": 4369920,
    "total_hashrate_ehs": 4.37,
    "miner_hashrate": 473,
    "miner_power_w": 5676,
    "total_power_mw": 52.95
  },
  
  "endpoints": {
    "api_endpoint": "http://localhost:3002",
    "frontend_url": "http://localhost:3100"
  },
  
  "schedule": {
    "start_date": "2025-03-01"
  }
}
```

---

## 🧪 TESTS APRÈS RACCORDEMENT

### Test 1 : Vérifier le Projet dans la Base
```sql
SELECT id, name, status, total_miners 
FROM projects 
WHERE id = 'SRQ-001';
```

### Test 2 : Login et Vérifier l'Accès
```bash
# Login
TOKEN=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hearstmining.com","password":"<REDACTED>"}' \
  | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")

# Voir tous les projets (devrait inclure SRQ-001)
curl -s http://localhost:4000/api/projects \
  -H "Authorization: Bearer $TOKEN" | grep SRQ-001
```

### Test 3 : Accéder au Backend SRQ
```bash
# Health check
curl http://localhost:3002/health

# Métriques
curl http://localhost:3002/api/metrics \
  -H "Authorization: Bearer $TOKEN"
```

### Test 4 : Dashboard Global Mis à Jour
```bash
curl -s http://localhost:4000/api/dashboard/overview \
  -H "Authorization: Bearer $TOKEN"
```

**Devrait montrer** :
- 3 projets (QATAR-001, AQUA-001, SRQ-001)
- 27,104 mineurs total
- 15.01 EH/s total

---

## 📋 CHECKLIST COMPLÈTE

### Préparation ✅
- [x] Dossier du projet existe
- [x] Backend complet
- [x] Frontend complet
- [x] Scripts SQL créés
- [x] Guide de raccordement créé
- [x] Script automatique créé

### À Faire ⏳
- [ ] Exécuter ADD_SRQ_PROJECT.sql dans Supabase
- [ ] Exécuter ./raccorder-srq.sh
- [ ] Démarrer backend SRQ (port 3002)
- [ ] Démarrer frontend SRQ (port 3100)
- [ ] Tester login et accès
- [ ] Vérifier dashboard global

---

## 🎯 COMMANDES RAPIDES

### Configuration Automatique
```bash
# Tout en une commande
./raccorder-srq.sh
```

### Démarrage Manuel
```bash
# Backend
cd projects/hearst-strategic-reserve-qatar/backend && npm start

# Frontend (nouveau terminal)
cd projects/hearst-strategic-reserve-qatar/frontend && npm run dev
```

---

## 📊 RÉCAPITULATIF DES PORTS

| Service | Port | URL | Status |
|---------|------|-----|--------|
| Central API | 4000 | http://localhost:4000 | ✅ Actif |
| QATAR Backend | 3001 | http://localhost:3001 | ✅ Actif |
| QATAR Frontend | 3000 | http://localhost:3000 | ⏳ |
| **SRQ Backend** | **3002** | **http://localhost:3002** | **⏳ À démarrer** |
| **SRQ Frontend** | **3100** | **http://localhost:3100** | **⏳ À démarrer** |

---

## 🎉 APRÈS LE RACCORDEMENT

### Vous aurez accès à :
- ✅ Dashboard unifié avec 3 projets
- ✅ 27,104 mineurs au total
- ✅ 15.01 EH/s de hashrate total
- ✅ Authentification unifiée
- ✅ API Gateway centralisé

---

## 📞 SUPPORT

**Fichiers de référence** :
- `RACCORDEMENT_GUIDE.md` - Guide détaillé
- `ADD_SRQ_PROJECT.sql` - Script SQL
- `raccorder-srq.sh` - Script automatique

**En cas de problème** :
1. Vérifier que Supabase SQL a bien été exécuté
2. Vérifier les fichiers `.env` créés
3. Vérifier que les ports 3002 et 3100 sont libres
4. Consulter les logs des serveurs

---

**Prêt à raccorder SRQ-001 ! 🚀**

**Temps estimé** : 5 minutes  
**Difficulté** : Facile (tout est automatisé)

