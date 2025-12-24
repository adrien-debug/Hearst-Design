# 🔌 GUIDE DE RECONNEXION - HEARST CONTROL
## Connecter le Frontend Central aux Projets

**Date** : 24 décembre 2025  
**Version** : 2.0.1  

---

## 📍 OÙ SOMMES-NOUS ?

### ✅ Ce qui est prêt :

1. **Backend Central** (Port 4000) - API Gateway ✅
2. **Frontend Central** (Port 3100) - Dashboard Hearst Control ✅
3. **Projet Design** - Backend + Frontend complets ✅
4. **Projet SRQ** - Backend + Frontend complets ✅

### ⚠️ Ce qui manque :

**Les projets ne sont PAS ENCORE enregistrés dans la base de données !**

Le Frontend Central ne peut pas afficher les projets car ils n'existent pas dans la table `projects` de Supabase.

---

## 🎯 OBJECTIF

Reconnecter Hearst Control (Frontend Central) aux projets en :
1. Ajoutant les projets à la base de données
2. Démarrant tous les services
3. Se connectant au dashboard

---

## 📋 ÉTAPES DE RECONNEXION

### Étape 1️⃣ : Ajouter les Projets à la Base de Données

**Script à exécuter** : `/database/ADD_DEVMONITOR_PROJECTS.sql`

#### Option A : Via Interface Supabase (Recommandé)

```bash
1. Ouvrir https://supabase.com
2. Se connecter à votre projet Hearst Control
3. Aller dans "SQL Editor"
4. Ouvrir le fichier ADD_DEVMONITOR_PROJECTS.sql
5. Copier tout le contenu
6. Coller dans l'éditeur SQL
7. Cliquer "Run" (ou Ctrl/Cmd + Enter)
```

#### Option B : Via psql (Terminal)

```bash
# Si vous avez psql installé
cd /Users/adrienbeyondcrypto/Desktop/Hearst-Control-GitHub/database

# Remplacer par votre connection string Supabase
psql "postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]" \
  -f ADD_DEVMONITOR_PROJECTS.sql
```

#### Option C : Via Node.js (Script automatique)

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst-Control-GitHub
node backend-central/setup-projects.js
```

*(Je peux créer ce script si vous voulez)*

### ✅ Vérification

Après exécution, vous devriez voir :

```
✅ PROJETS DEVMONITOR AJOUTÉS AVEC SUCCÈS !
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Total projets: 5

🎨 Hearst Design: ✅ Ajouté
   Port: 3002
   API: http://localhost:3002

🇶🇦 Strategic Reserve Qatar: ✅ Ajouté
   Port: 3003
   API: http://localhost:3003
   Containers: 30
   Miners: 9,240
   Hashrate: 4.37 EH/s

🔗 Frontend-Central: http://localhost:3100
🔗 Backend-Central: http://localhost:4000
```

---

### Étape 2️⃣ : Démarrer Tous les Services

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst-Control-GitHub

# Arrêter d'abord tous les services existants
./scripts/stop-all.sh

# Démarrer tous les services
./scripts/start-all.sh
```

**Services démarrés** :
1. ✅ Backend Central (Port 4000)
2. ✅ Frontend Central (Port 3100)
3. ✅ SRQ Backend + Frontend (Port 3003)
4. ✅ Design Backend + Frontend (Port 3002)

**Temps de démarrage** : ~10-15 secondes

---

### Étape 3️⃣ : Se Connecter au Dashboard

1. **Ouvrir le navigateur** : http://localhost:3100

2. **Page de connexion** s'affiche

3. **Se connecter avec** :
   ```
   Email: admin@hearstmining.com
   Mot de passe: [Votre mot de passe admin]
   ```

4. **Dashboard s'affiche** avec les boxes de projets :
   - 🎨 **Hearst Design** (Port 3002)
   - 🇶🇦 **Strategic Reserve Qatar** (Port 3003)

5. **Cliquer sur une box** pour accéder au DevMonitor du projet

---

## 🏗️ ARCHITECTURE CONNECTÉE

```
┌──────────────────────────────────────────────────────────────┐
│         🏢 HEARST CONTROL (Frontend Central)                 │
│                http://localhost:3100                         │
│                                                              │
│  ┌──────────────┐              ┌──────────────┐            │
│  │  🎨 Design   │              │  🇶🇦 SRQ     │            │
│  │  Port 3002   │              │  Port 3003   │            │
│  └──────────────┘              └──────────────┘            │
│         │                              │                    │
└─────────┼──────────────────────────────┼────────────────────┘
          │                              │
          ▼                              ▼
    ┌──────────────────────────────────────────┐
    │     📡 Backend Central (Port 4000)       │
    │          API Gateway + Auth              │
    └──────────────────────────────────────────┘
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
    ┌─────────────┐       ┌─────────────┐
    │   Design    │       │     SRQ     │
    │  Backend    │       │   Backend   │
    │  (3002)     │       │   (3003)    │
    └─────────────┘       └─────────────┘
          │                     │
          ▼                     ▼
    ┌─────────────┐       ┌─────────────┐
    │ Supabase    │       │  Supabase   │
    │  Design DB  │       │    SRQ DB   │
    └─────────────┘       └─────────────┘
```

---

## 📊 CE QUI EST AJOUTÉ À LA BASE DE DONNÉES

### Table `projects`

#### Projet 1 : Hearst Design 🎨

```sql
id: 'hearst-design'
name: 'Hearst Design'
slug: 'hearst-design'
description: 'Projet web de design et prototypage pour les interfaces Hearst'
location: 'Paris, France'
status: 'active'
icon: '🎨'
color: '#9B59B6' (violet)
port: 3002
api_endpoint: 'http://localhost:3002'
frontend_url: 'http://localhost:3002'
tenant_id: 'hearst-global'
```

#### Projet 2 : Strategic Reserve Qatar 🇶🇦

```sql
id: 'hearst-strategic-reserve-qatar'
name: 'Strategic Reserve Qatar'
slug: 'hearst-strategic-reserve-qatar'
description: 'Gestion d'opérations minières Bitcoin - Strategic Reserve au Qatar'
location: 'Qatar'
status: 'active'
icon: '🇶🇦'
color: '#F39C12' (orange)
port: 3003
api_endpoint: 'http://localhost:3003'
frontend_url: 'http://localhost:3100'
tenant_id: 'hearst-global'

# Métriques mining
total_containers: 30
total_miners: 9,240
total_hashrate_ths: 4,369,920 (4.37 EH/s)
total_power_mw: 52.95
container_model: 'ANTSPACE HD5'
miners_per_container: 308
miner_model: 'S21XP Hydro'
miner_hashrate: 473 TH/s
miner_power_w: 5,676 W
```

---

## 🔍 VÉRIFICATIONS POST-CONNEXION

### 1. Vérifier que les services sont démarrés

```bash
# Vérifier les logs
tail -f logs/backend-central.log
tail -f logs/frontend-central.log
tail -f logs/design-frontend.log
tail -f logs/srq-frontend.log

# Vérifier les ports
lsof -i :4000  # Backend Central
lsof -i :3100  # Frontend Central
lsof -i :3002  # Design
lsof -i :3003  # SRQ
```

### 2. Tester l'API Backend Central

```bash
# Test santé
curl http://localhost:4000/health

# Test liste projets (avec token)
curl http://localhost:4000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Vérifier le Frontend Central

1. Ouvrir http://localhost:3100
2. Se connecter
3. Dashboard doit afficher 2 boxes :
   - 🎨 Hearst Design
   - 🇶🇦 Strategic Reserve Qatar

### 4. Accéder aux projets directement

- Design : http://localhost:3002
- SRQ : http://localhost:3003

---

## 🐛 DÉPANNAGE

### Problème : "No projects found" dans le dashboard

**Cause** : Les projets ne sont pas dans la base de données

**Solution** :
```bash
# Vérifier dans Supabase
SELECT id, name, slug, status FROM projects;

# Si vide, exécuter ADD_DEVMONITOR_PROJECTS.sql
```

### Problème : "Cannot connect to backend"

**Cause** : Backend Central non démarré

**Solution** :
```bash
cd backend-central
npm start

# Vérifier
curl http://localhost:4000/health
```

### Problème : "Unauthorized" lors de l'accès aux projets

**Cause** : Token JWT invalide ou expiré

**Solution** :
```bash
# Se déconnecter et se reconnecter
# Ou supprimer le token en localStorage
localStorage.removeItem('hearst_token')
```

### Problème : Port déjà utilisé

**Cause** : Un service précédent n'a pas été arrêté

**Solution** :
```bash
# Arrêter tous les services
./scripts/stop-all.sh

# Ou tuer manuellement
lsof -ti:4000 | xargs kill -9
lsof -ti:3100 | xargs kill -9
lsof -ti:3002 | xargs kill -9
lsof -ti:3003 | xargs kill -9
```

### Problème : Les projets s'affichent mais le DevMonitor est vide

**Cause** : Les backends de projets ne retournent pas de données

**Solution** :
```bash
# Vérifier les backends de projets
curl http://localhost:3002/health
curl http://localhost:3003/health

# Vérifier les logs
tail -f logs/design-backend.log
tail -f logs/srq-backend.log
```

---

## 📝 IDENTIFIANTS DE TEST

### Super Admin (Accès global)

```
Email: admin@hearstmining.com
Password: [À définir dans votre .env]
Role: super_admin
```

### Admin Design

```
Email: design@hearst.com
Password: [À définir]
Role: admin
Tenant: hearst-global
```

### Admin SRQ

```
Email: srq@hearst.com
Password: [À définir]
Role: admin
Tenant: hearst-global
```

---

## 🚀 WORKFLOW COMPLET (Résumé)

```bash
# 1. Exécuter le script SQL dans Supabase
#    → Ajoute les projets à la DB

# 2. Arrêter les services existants
./scripts/stop-all.sh

# 3. Démarrer tous les services
./scripts/start-all.sh

# 4. Ouvrir le navigateur
open http://localhost:3100

# 5. Se connecter
#    Email: admin@hearstmining.com
#    Password: [votre mot de passe]

# 6. Cliquer sur les boxes de projets
#    → Design ou SRQ

# 7. DevMonitor s'affiche avec les métriques
```

---

## 📂 FICHIERS IMPORTANTS

### Configuration Backend Central

```
/backend-central/.env
```

Variables essentielles :
```env
SUPABASE_URL=https://[votre-projet].supabase.co
SUPABASE_KEY=[votre-clé]
JWT_SECRET=[votre-secret]
PORT=4000
```

### Configuration Frontend Central

```
/frontend-central/.env.local
```

Variables essentielles :
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Scripts SQL

```
/database/ADD_DEVMONITOR_PROJECTS.sql  ← Script principal
/database/central-schema.sql           ← Schéma complet
/database/VERIFY_SQL_SETUP.sql         ← Vérification
```

---

## 📊 MÉTRIQUES ATTENDUES

### Dashboard Global (Frontend Central)

- **Total Projets** : 2 (Design + SRQ)
- **Projets Actifs** : 2
- **Total Containers** : 30 (SRQ uniquement)
- **Total Miners** : 9,240 (SRQ uniquement)
- **Total Hashrate** : 4.37 EH/s (SRQ uniquement)

### DevMonitor SRQ

- **Containers** : 30 / 30 online
- **Miners** : 9,240 / 9,240 online
- **Hashrate** : 4.37 EH/s
- **Power** : 52.95 MW
- **Uptime** : 99.9%

### DevMonitor Design

- **Pages** : 0 (à développer)
- **Components** : 0 (à développer)
- **Assets** : 0 (à développer)
- **Status** : En développement

---

## ✅ CHECKLIST DE RECONNEXION

- [ ] Script SQL exécuté dans Supabase
- [ ] Projets visibles dans la table `projects`
- [ ] Backend Central démarré (port 4000)
- [ ] Frontend Central démarré (port 3100)
- [ ] Design Backend + Frontend démarrés (port 3002)
- [ ] SRQ Backend + Frontend démarrés (port 3003)
- [ ] Connexion au dashboard réussie
- [ ] Les 2 boxes de projets s'affichent
- [ ] Accès au DevMonitor Design fonctionnel
- [ ] Accès au DevMonitor SRQ fonctionnel
- [ ] Métriques SRQ affichées correctement

---

## 🎯 PROCHAINES ÉTAPES

### Immédiat

1. ✅ Exécuter ADD_DEVMONITOR_PROJECTS.sql
2. ✅ Démarrer tous les services
3. ✅ Tester la connexion

### Court Terme

1. Compléter le Dashboard Design avec vraies données
2. Ajouter des métriques en temps réel pour SRQ
3. Implémenter la recherche de projets
4. Ajouter des filtres de statut

### Moyen Terme

1. Créer d'autres projets (Qatar Mining, etc.)
2. Implémenter la gestion des utilisateurs
3. Ajouter des graphiques de performance
4. Système d'alertes et notifications

---

## 📞 SUPPORT

En cas de problème :

1. **Vérifier les logs** : `tail -f logs/*.log`
2. **Vérifier les ports** : `lsof -i :4000 :3100 :3002 :3003`
3. **Redémarrer les services** : `./scripts/stop-all.sh && ./scripts/start-all.sh`
4. **Vérifier la DB** : Se connecter à Supabase et vérifier la table `projects`

---

## 📚 DOCUMENTATION ASSOCIÉE

- [RAPPORT_NETTOYAGE_FRONTENDS_24DEC2025.md](RAPPORT_NETTOYAGE_FRONTENDS_24DEC2025.md) - Nettoyage effectué
- [ARCHITECTURE_DEVMONITOR_PROJECTS.md](ARCHITECTURE_DEVMONITOR_PROJECTS.md) - Architecture détaillée
- [README.md](README.md) - Documentation générale
- [AI_AGENT_GUIDE.md](AI_AGENT_GUIDE.md) - Guide pour agents AI

---

**Guide de Reconnexion Hearst Control**  
**Version** : 2.0.1  
**Date** : 24 décembre 2025  
**Auteur** : Agent AI  

🔌 **Prêt à reconnecter !** 🚀

