# 🚀 Démarrage du Backend - Instructions

## ⚠️ IMPORTANT : Configuration Supabase Requise

Avant de démarrer, vous devez récupérer vos **credentials Supabase** :

### 📍 Comment obtenir vos credentials Supabase :

1. Aller sur https://app.supabase.com
2. Sélectionner votre projet
3. Cliquer sur **⚙️ Settings** (dans le menu)
4. Cliquer sur **API** (dans la barre latérale)
5. Copier ces 2 valeurs :
   - **Project URL** (commence par `https://xxx.supabase.co`)
   - **anon/public key** (longue clé commençant par `eyJ...`)

---

## 🔧 Configuration Manuelle

### Option 1 : Édition Rapide (Recommandé)

Je vais créer le fichier .env pour vous, mais vous devrez ajouter vos credentials.

### Option 2 : Copie du Template

```bash
cd backend-central
cp env.example .env
# Puis éditer .env avec vos credentials
```

---

## ✅ Contenu du fichier .env

Voici ce que doit contenir votre fichier `.env` :

```env
# Server
NODE_ENV=development
PORT=4000

# CORS
CORS_ORIGIN=http://localhost:4100,http://localhost:3000

# JWT
JWT_SECRET=hearst-control-secret-key-2025-production-change-me

# Supabase (Central Database)
SUPABASE_URL=https://VOTRE-PROJET.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.VOTRE_CLE_ICI

# Project API URLs (for proxy)
QATAR_API_URL=http://localhost:3001
AQUAHASH_API_URL=http://localhost:3002
TEXAS_API_URL=http://localhost:3003

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=200
```

**⚠️ REMPLACER :**
- `https://VOTRE-PROJET.supabase.co` par votre URL Supabase
- `eyJhbGciOi...VOTRE_CLE_ICI` par votre clé anonyme (anon key)

---

## 🚀 Démarrage

Une fois le fichier .env configuré :

```bash
# 1. Aller dans le dossier backend
cd backend-central

# 2. Installer les dépendances
npm install

# 3. Démarrer le serveur
npm start
```

Le serveur démarre sur **http://localhost:4000**

---

## ✅ Test Rapide

```bash
# Tester l'API
curl http://localhost:4000/api/dashboard/overview
```

Vous devriez voir les données des projets !

---

## 🔍 Logs

Si tout fonctionne, vous verrez :
```
🚀 Backend Central démarré sur le port 4000
✅ Connexion Supabase réussie
```

Si erreur :
```
❌ Erreur de connexion Supabase
→ Vérifier SUPABASE_URL et SUPABASE_ANON_KEY dans .env
```

