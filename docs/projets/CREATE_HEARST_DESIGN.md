# 🚀 CRÉER HEARST DESIGN - Guide Complet

**Nouveau Projet** : DESIGN-001  
**Status** : 📝 Prêt à créer

---

## 📋 INFORMATIONS NÉCESSAIRES

### À DÉFINIR D'ABORD :

**1. Infrastructure Mining**
```
Nombre de containers      : _____ unités
Modèle de container       : _____ (ex: ANTSPACE HD5)
Mineurs par container     : _____ 
Modèle de mineur         : _____ (ex: S21XP Hydro)
Hashrate par mineur      : _____ TH/s
Power par mineur         : _____ W
```

**2. Localisation**
```
Pays/Région : _____
Site        : _____
```

**3. Planning**
```
Date de démarrage : _____ (ex: 2025-02-01)
Status initial    : planned / active
```

---

## 🎯 CRÉATION AUTOMATIQUE

### Option 1 : Script SQL Complet

Je peux générer un script SQL similaire à `SETUP_SRQ_COMPLET.sql` qui va :
- ✅ Créer le projet DESIGN-001
- ✅ Créer 3 utilisateurs avec mots de passe
- ✅ Configurer les accès
- ✅ Ajouter des métriques de test
- ✅ Mettre à jour les statistiques globales

**Exemple de commande** :
```
./create-project.sh \
  --id DESIGN-001 \
  --name "Hearst Design" \
  --containers 20 \
  --miners-per-container 308 \
  --miner-model "S21XP Hydro" \
  --hashrate 473 \
  --power 5676 \
  --location "USA" \
  --start-date "2025-02-01" \
  --backend-port 3201 \
  --frontend-port 3300
```

---

## 🔧 PORTS RÉSERVÉS

```
Backend  : 3201
Frontend : 3300
Gateway  : /api/design/* → http://localhost:3201
```

---

## 📊 CALCUL AUTOMATIQUE

Donnez-moi les chiffres et je calcule :

**Exemple** :
```
Containers: 20
Mineurs/container: 308
Total mineurs: 20 × 308 = 6,160

Hashrate/mineur: 473 TH/s
Total hashrate: 6,160 × 473 = 2,913,680 TH/s = 2.91 EH/s

Power/mineur: 5,676 W
Total power: 6,160 × 5,676 / 1,000,000 = 34.96 MW
```

---

## 👥 UTILISATEURS PAR DÉFAUT

```
admin@design.hearst.com      / <REDACTED>
operator@design.hearst.com   / <REDACTED>
manager@design.hearst.com    / <REDACTED>
```

---

## 🚀 PROCESSUS DE CRÉATION (10 minutes)

### Étape 1 : Spécifications (2 min)
Vous me donnez :
- Nombre de containers
- Modèles de matériel
- Localisation
- Date de démarrage

### Étape 2 : Génération SQL (1 min)
Je génère :
- Script SQL complet
- Scripts de configuration
- Documentation

### Étape 3 : Exécution SQL (2 min)
Vous exécutez :
- Le script dans Supabase

### Étape 4 : Configuration (3 min)
Je configure automatiquement :
- Backend .env
- Frontend .env.local
- Installation dépendances

### Étape 5 : Démarrage (2 min)
Je démarre :
- Backend sur port 3201
- Frontend sur port 3300
- Tests de connexion

---

## 📝 TEMPLATE DE SPÉCIFICATIONS

**Copiez et complétez ceci** :

```yaml
Projet: Hearst Design
ID: DESIGN-001

Infrastructure:
  containers: [NOMBRE]
  container_model: "ANTSPACE HD5"
  miners_per_container: 308
  total_miners: [AUTO-CALCULÉ]
  
  miner_model: "S21XP Hydro"
  miner_hashrate: 473  # TH/s
  miner_power: 5676    # W
  
  total_hashrate_ths: [AUTO-CALCULÉ]
  total_hashrate_ehs: [AUTO-CALCULÉ]
  total_power_mw: [AUTO-CALCULÉ]

Location:
  country: "___"
  site: "___"
  
Dates:
  start_date: "2025-__-__"
  status: "planned"  # ou "active"
  
Network:
  backend_port: 3201
  frontend_port: 3300
  api_endpoint: "http://localhost:3201"
  frontend_url: "http://localhost:3300"
```

---

## 🎯 APRÈS CRÉATION

### Dashboard Mis à Jour
```
Projets : 3 → 4
Stats globales mises à jour automatiquement
```

### Accès Immédiat
```
Login: admin@design.hearst.com / <REDACTED>
URL Backend: http://localhost:3201
URL Frontend: http://localhost:3300
```

### Intégration Complète
```
✅ Visible dans dashboard central
✅ Authentification unifiée
✅ API Gateway configuré
✅ Métriques actives
```

---

## 📞 PROCHAINE ÉTAPE

**Donnez-moi les spécifications et je crée tout en 10 minutes !**

**Format simplifié** :
```
Containers: [nombre]
Localisation: [pays/site]
Date démarrage: [YYYY-MM-DD]
Notes: [optionnel]
```

Ou utilisez le template YAML complet ci-dessus.

---

**Prêt à créer Hearst Design ! 🎨🚀**

