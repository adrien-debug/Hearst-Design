# ⚡ CONNEXION RAPIDE - 30 SECONDES

## 🎯 ÉTAPE 1 : Récupérer vos credentials (10 secondes)

Aller sur Supabase → **Settings** → **API** et copier :

1. **Project URL** : `https://xxx.supabase.co`
2. **anon public** : `eyJhbGci...` (la longue clé)

---

## 🎯 ÉTAPE 2 : Éditer .env (10 secondes)

```bash
# Ouvrir le fichier
open -e backend-central/.env

# Ou avec VSCode
code backend-central/.env
```

**Remplacer les 2 lignes :**
```
SUPABASE_URL=https://VOTRE-PROJET.supabase.co
SUPABASE_ANON_KEY=eyJ...VOTRE_CLE
```

**Par vos vraies valeurs** → Sauvegarder (CMD+S)

---

## 🎯 ÉTAPE 3 : Démarrer (10 secondes)

```bash
cd backend-central
npm install
npm start
```

**C'est tout ! ✅**

Le serveur démarre sur **http://localhost:4000**

---

## 🔥 VERSION ULTRA-RAPIDE

Si vous avez vos credentials sous la main :

```bash
cd backend-central

# Éditer .env (ouvre TextEdit)
open -e .env

# Coller vos credentials → Sauvegarder
# Puis :
npm install && npm start
```

**Temps total : 30 secondes** ⚡

