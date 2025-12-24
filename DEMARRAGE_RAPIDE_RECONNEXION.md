# ⚡ DÉMARRAGE RAPIDE - RECONNEXION
## En 3 minutes chrono ! ⏱️

---

## 🎯 OBJECTIF

Connecter **Hearst Control** (votre dashboard central) aux projets **Design** et **SRQ**.

---

## 📍 SITUATION ACTUELLE

✅ **Ce qui fonctionne** :
- Backend Central (Port 4000)
- Frontend Central (Port 3100)
- Projets Design et SRQ (backends + frontends)

❌ **Ce qui manque** :
- Les projets ne sont PAS dans la base de données
- Le dashboard ne peut pas les afficher

---

## 🚀 SOLUTION EN 3 ÉTAPES

### 1️⃣ Ajouter les Projets à la DB (2 options)

#### Option A : Script Automatique (Recommandé) ⭐

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst-Control-GitHub/backend-central
node setup-projects.js
```

**Résultat attendu** :
```
✅ Project added: Hearst Design
✅ Project added: Strategic Reserve Qatar
```

#### Option B : Interface Supabase

1. Ouvrir https://supabase.com
2. Aller dans "SQL Editor"
3. Copier le contenu de `/database/ADD_DEVMONITOR_PROJECTS.sql`
4. Coller et "Run"

---

### 2️⃣ Démarrer les Services

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst-Control-GitHub

# Arrêter d'abord
./scripts/stop-all.sh

# Démarrer tout
./scripts/start-all.sh
```

**Attendez 10 secondes** ⏳

---

### 3️⃣ Ouvrir le Dashboard

```bash
# Ouvrir dans le navigateur
open http://localhost:3100
```

**Connexion** :
```
Email: admin@hearstmining.com
Password: [Votre mot de passe]
```

---

## ✅ RÉSULTAT

Vous verrez le dashboard avec **2 boxes** :

```
┌─────────────────────────────────────────────┐
│     🏢 HEARST CONTROL DASHBOARD             │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────┐    ┌──────────────┐      │
│  │              │    │              │      │
│  │  🎨 Design   │    │  🇶🇦 SRQ     │      │
│  │  Port 3002   │    │  Port 3003   │      │
│  │              │    │              │      │
│  └──────────────┘    └──────────────┘      │
│                                             │
└─────────────────────────────────────────────┘
```

**Cliquez sur une box** → Accès au DevMonitor du projet ! 🎉

---

## 🐛 PROBLÈME ?

### "Cannot connect to backend"

```bash
cd backend-central
npm start
```

### "No projects found"

```bash
# Re-exécuter le script
cd backend-central
node setup-projects.js
```

### Port déjà utilisé

```bash
./scripts/stop-all.sh
./scripts/start-all.sh
```

---

## 📚 DOCUMENTATION COMPLÈTE

Pour plus de détails :  
👉 **[GUIDE_RECONNEXION_HEARST_CONTROL.md](GUIDE_RECONNEXION_HEARST_CONTROL.md)**

---

## 🎯 CHECKLIST RAPIDE

- [ ] Script `setup-projects.js` exécuté
- [ ] Services démarrés avec `start-all.sh`
- [ ] Dashboard ouvert à http://localhost:3100
- [ ] Les 2 boxes de projets s'affichent
- [ ] Accès aux projets fonctionnel

---

**C'est parti !** 🚀

**Temps total** : ~3 minutes  
**Niveau** : Débutant  
**Version** : 2.0.2

