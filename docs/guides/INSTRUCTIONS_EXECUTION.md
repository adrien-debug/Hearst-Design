# 🚀 INSTRUCTIONS D'EXÉCUTION - Hearst Control

## 📋 ÉTAPE PAR ÉTAPE

### 1️⃣ Se Connecter à Supabase

1. Aller sur : https://app.supabase.com
2. Sélectionner votre projet
3. Cliquer sur **SQL Editor** dans le menu de gauche

---

### 2️⃣ Exécuter FRESH_START.sql

1. Dans le SQL Editor, cliquer sur **"New Query"**
2. Ouvrir le fichier `FRESH_START.sql` depuis votre ordinateur
3. **Copier TOUT le contenu** du fichier
4. **Coller** dans le SQL Editor de Supabase
5. Cliquer sur **"Run"** ou **"Execute"** (ou CTRL/CMD + Enter)

**Durée : ~5-10 secondes**

Vous devriez voir :
```
✅ ✅ ✅ HEARST CONTROL - INSTALLATION RÉUSSIE ✅ ✅ ✅
```

---

### 3️⃣ Vérifier l'Installation

1. Créer une **nouvelle requête** dans SQL Editor
2. Ouvrir `VERIFY_SQL_SETUP.sql`
3. **Copier et coller** le contenu complet
4. Cliquer sur **"Run"**

Vous devriez voir des ✅ partout indiquant que tout fonctionne !

---

### 4️⃣ Configurer le Backend

```bash
# Terminal
cd backend-central

# Créer le fichier .env
cp env.example .env

# Éditer .env avec vos credentials Supabase :
# SUPABASE_URL=https://votre-projet.supabase.co
# SUPABASE_ANON_KEY=votre-clé-anonyme

# Installer les dépendances
npm install

# Démarrer le serveur
npm start
```

Le backend devrait démarrer sur **http://localhost:5000**

---

### 5️⃣ Tester l'API

```bash
# Test 1 : Overview
curl http://localhost:5000/api/dashboard/overview

# Test 2 : Projets
curl http://localhost:5000/api/projects

# Test 3 : Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hearstmining.com",
    "password": "<REDACTED>"
  }'
```

---

## 🔍 Vérifications Rapides dans Supabase

### Voir les projets créés
```sql
SELECT 
  id, 
  name, 
  status, 
  total_containers,
  total_miners,
  ROUND(total_hashrate_ths / 1000000.0, 2) as hashrate_ehs,
  start_date
FROM projects
ORDER BY start_date;
```

**Résultat attendu :**
```
QATAR-001 | Hearst Qatar Mining | active  | 58 | 17864 | 8.45 | 2025-01-01
AQUA-001  | Hearst Aquahash     | planned | 15 | 4620  | 2.19 | 2025-06-01
```

---

### Voir le tenant créé
```sql
SELECT * FROM tenants;
```

**Résultat attendu :**
```
slug: hearst
name: Hearst (default)
status: active
```

---

### Voir les utilisateurs
```sql
SELECT email, name, role FROM users;
```

**Résultat attendu :**
```
admin@hearstmining.com | Super Admin | super_admin
```

---

## ⚠️ Si Vous Rencontrez des Erreurs

### Erreur : "relation already exists"

**Solution :** Le script FRESH_START.sql nettoie automatiquement. Si l'erreur persiste :

```sql
-- Exécuter d'abord ceci pour tout nettoyer manuellement
DROP VIEW IF EXISTS global_overview CASCADE;
DROP VIEW IF EXISTS projects_summary CASCADE;
DROP TABLE IF EXISTS audit_log CASCADE;
DROP TABLE IF EXISTS global_alerts CASCADE;
DROP TABLE IF EXISTS project_metrics CASCADE;
DROP TABLE IF EXISTS global_metrics CASCADE;
DROP TABLE IF EXISTS user_project_access CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tenants CASCADE;

-- Puis relancer FRESH_START.sql
```

---

### Erreur : "permission denied"

**Solution :** Vérifier que vous êtes bien connecté en tant que propriétaire du projet Supabase.

---

### Backend ne démarre pas

**Vérifier :**
1. Node.js est installé : `node --version` (besoin de v16+)
2. Le fichier `.env` existe et contient les bonnes credentials
3. Les dépendances sont installées : `npm install`

---

## ✅ Checklist Finale

Avant de continuer, vérifier :

- [ ] ✅ FRESH_START.sql exécuté sans erreur
- [ ] ✅ Message "INSTALLATION RÉUSSIE" affiché
- [ ] ✅ VERIFY_SQL_SETUP.sql montre tous les ✅
- [ ] ✅ 2 projets visibles dans la table projects
- [ ] ✅ 1 tenant "hearst" créé
- [ ] ✅ 1 utilisateur admin créé
- [ ] ✅ Backend démarre sans erreur
- [ ] ✅ API répond sur http://localhost:5000

---

## 🎯 Résultat Final Attendu

### Dans Supabase
- ✅ 8 tables créées (tenants, users, projects, etc.)
- ✅ 1 tenant "hearst"
- ✅ 1 super admin
- ✅ 2 projets (QATAR-001, AQUA-001)
- ✅ Accès admin configuré

### Backend
- ✅ Serveur démarré sur port 5000
- ✅ Connexion Supabase OK
- ✅ API fonctionnelle

### Test API
```bash
curl http://localhost:5000/api/dashboard/overview
```

**Réponse attendue :**
```json
{
  "total_projects": 2,
  "active_projects": 1,
  "total_containers": 58,
  "total_miners": 17864,
  "total_hashrate_ths": 8445400,
  "total_hashrate_ehs": 8.45,
  "total_power_mw": 102.37
}
```

---

## 📞 Besoin d'Aide ?

Si quelque chose ne fonctionne pas :
1. Vérifier les logs du backend
2. Vérifier les credentials Supabase dans `.env`
3. Relancer `VERIFY_SQL_SETUP.sql` pour identifier le problème
4. Consulter `AUDIT_CORRECTIONS_SQL.md` pour plus de détails

---

**Bonne chance ! 🚀**

