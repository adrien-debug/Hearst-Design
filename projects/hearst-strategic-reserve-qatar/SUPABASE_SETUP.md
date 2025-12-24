# 🗄️ GUIDE CONFIGURATION SUPABASE - HEARST STRATEGIC RESERVE QATAR

**Version:** 2.0  
**Date:** 24 Décembre 2025  
**Projet:** Hearst Strategic Reserve Qatar  
**Specs:** 30 Containers | 9,240 Miners | 4.37 EH/s

---

## 📋 TABLE DES MATIÈRES

1. [Création Projet Supabase](#1-création-projet-supabase)
2. [Récupération des Clés](#2-récupération-des-clés)
3. [Configuration Base de Données](#3-configuration-base-de-données)
4. [Génération des Mots de Passe](#4-génération-des-mots-de-passe)
5. [Configuration Backend](#5-configuration-backend)
6. [Configuration Frontend](#6-configuration-frontend)
7. [Test de Connexion](#7-test-de-connexion)
8. [Sécurité RLS](#8-sécurité-rls)
9. [Dépannage](#9-dépannage)

---

## 1️⃣ Création Projet Supabase

### Étape 1: Créer un nouveau projet

1. Aller sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Cliquer sur **"New Project"**
3. Remplir les informations:
   - **Organization:** Hearst Mining (ou créer une nouvelle)
   - **Name:** `hearst-srq` ou `hearst-strategic-reserve-qatar`
   - **Database Password:** Générer un mot de passe fort
   - **Region:** Choisir la plus proche (eu-west-1 pour Europe)
   - **Pricing Plan:** Free tier pour dev, Pro pour production

4. Cliquer sur **"Create new project"**
5. Attendre 2-3 minutes que le projet soit prêt

---

## 2️⃣ Récupération des Clés

### Étape 2: Obtenir les clés API

1. Dans le dashboard Supabase, aller dans **Settings** → **API**
2. Noter les informations suivantes:

```
┌─────────────────────────────────────────────────────────────────┐
│ PROJECT URL                                                      │
│ https://XXXXXXXX.supabase.co                                    │
├─────────────────────────────────────────────────────────────────┤
│ ANON KEY (public)                                                │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.XXXXXXXXXX...              │
├─────────────────────────────────────────────────────────────────┤
│ SERVICE KEY (secret - NE JAMAIS EXPOSER)                        │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.XXXXXXXXXX...              │
└─────────────────────────────────────────────────────────────────┘
```

⚠️ **IMPORTANT:** Le `SERVICE KEY` est secret. Ne jamais le commiter dans Git!

---

## 3️⃣ Configuration Base de Données

### Étape 3: Exécuter le schéma SQL

1. Dans Supabase, aller dans **SQL Editor**
2. Cliquer sur **"New query"**
3. Copier le contenu de `database/schema.sql`
4. Cliquer sur **"Run"**

Vous devriez voir le message de succès:
```
✅ HEARST STRATEGIC RESERVE QATAR - Schema Created!
📦 30 ANTSPACE HD5 Containers
⚡ 9,240 S21XP Hydro Miners (473 TH/s each)
🔋 4.37 EH/s Total Hashrate
💡 52.95 MW Maximum Power
```

### Vérification

Vérifier que les tables sont créées:
- `users` (4 utilisateurs)
- `containers` (30 containers)
- `miners` (vide - à peupler)
- `metrics` (1 entrée initiale)
- `alerts`
- `maintenance_logs`
- `audit_log`

---

## 4️⃣ Génération des Mots de Passe

### Étape 4: Générer les mots de passe sécurisés

```bash
# Aller dans le dossier du projet
cd projects/hearst-strategic-reserve-qatar

# Installer les dépendances si nécessaire
cd backend && npm install && cd ..

# Exécuter le script de génération
node scripts/generate-passwords.js
```

Le script affichera:
- Les hash bcrypt pour chaque utilisateur
- Les commandes SQL pour mettre à jour les mots de passe
- Un nouveau JWT_SECRET

### Copier les SQL générés dans Supabase SQL Editor

Exemple de sortie:
```sql
UPDATE users SET password_hash = '$2a$10$...' WHERE email = 'admin@srq.hearstmining.com';
UPDATE users SET password_hash = '$2a$10$...' WHERE email = 'manager@srq.hearstmining.com';
UPDATE users SET password_hash = '$2a$10$...' WHERE email = 'operator@srq.hearstmining.com';
UPDATE users SET password_hash = '$2a$10$...' WHERE email = 'viewer@srq.hearstmining.com';
```

---

## 5️⃣ Configuration Backend

### Étape 5: Configurer le fichier .env

```bash
cd projects/hearst-strategic-reserve-qatar/backend

# Copier le template
cp env.example .env

# Éditer avec vos vraies clés
nano .env  # ou code .env
```

Contenu du `.env`:
```env
# Application
NODE_ENV=development
PORT=3003

# Supabase - REMPLACER AVEC VOS VRAIES CLÉS
SUPABASE_URL=https://VOTRE_PROJECT_ID.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.VOTRE_ANON_KEY
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.VOTRE_SERVICE_KEY

# JWT - UTILISER LE SECRET GÉNÉRÉ PAR LE SCRIPT
JWT_SECRET=VOTRE_JWT_SECRET_GENERE
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:3100
```

---

## 6️⃣ Configuration Frontend

### Étape 6: Configurer le fichier .env.local

```bash
cd projects/hearst-strategic-reserve-qatar/frontend

# Copier le template
cp env.example .env.local

# Éditer si nécessaire
nano .env.local
```

Contenu du `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3003
NEXT_PUBLIC_PROJECT_NAME=Hearst Strategic Reserve Qatar
NEXT_PUBLIC_PROJECT_SLUG=hearst-srq
NEXT_PUBLIC_THEME=dark
NEXT_PUBLIC_PRIMARY_COLOR=#8afd81
```

---

## 7️⃣ Test de Connexion

### Étape 7: Démarrer et tester

```bash
# Terminal 1 - Backend
cd projects/hearst-strategic-reserve-qatar/backend
npm install
npm start
# → Serveur sur http://localhost:3003

# Terminal 2 - Frontend
cd projects/hearst-strategic-reserve-qatar/frontend
npm install
npm run dev
# → Application sur http://localhost:3100
```

### Test de login

```bash
# Tester l'API de login
curl -X POST http://localhost:3003/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@srq.hearstmining.com","password":"SRQ_Admin_2025!"}'
```

Réponse attendue:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid...",
    "email": "admin@srq.hearstmining.com",
    "name": "Admin SRQ",
    "role": "admin"
  }
}
```

---

## 8️⃣ Sécurité RLS

### Étape 8: Activer Row Level Security (Optionnel mais recommandé)

Dans Supabase SQL Editor:

```sql
-- Activer RLS sur les tables sensibles
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE containers ENABLE ROW LEVEL SECURITY;
ALTER TABLE miners ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Politique: Seuls les admins peuvent voir tous les utilisateurs
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

-- Politique: Tous les utilisateurs authentifiés peuvent voir les containers
CREATE POLICY "Authenticated users can view containers" ON containers
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Politique: Seuls admin/manager peuvent modifier les containers
CREATE POLICY "Admin/Manager can update containers" ON containers
  FOR UPDATE
  USING (auth.jwt() ->> 'role' IN ('admin', 'manager'));
```

---

## 9️⃣ Dépannage

### Problèmes courants

#### ❌ Erreur: "Invalid API key"
```
Solution: Vérifier SUPABASE_URL et SUPABASE_ANON_KEY dans .env
```

#### ❌ Erreur: "relation 'users' does not exist"
```
Solution: Exécuter database/schema.sql dans Supabase SQL Editor
```

#### ❌ Erreur: "Invalid login credentials"
```
Solution: 
1. Vérifier que l'email existe: SELECT * FROM users WHERE email = 'admin@srq.hearstmining.com';
2. Régénérer les mots de passe: node scripts/generate-passwords.js
3. Exécuter les UPDATE SQL générés dans Supabase
```

#### ❌ Erreur: "CORS policy"
```
Solution: Vérifier CORS_ORIGIN dans .env (doit correspondre à l'URL du frontend)
```

#### ❌ Erreur: "jwt malformed"
```
Solution: Régénérer JWT_SECRET avec: openssl rand -base64 32
```

---

## 📊 Résumé des Ports

| Service | Port | URL |
|---------|------|-----|
| Backend SRQ | 3003 | http://localhost:3003 |
| Frontend SRQ | 3100 | http://localhost:3100 |
| Backend Central | 4000 | http://localhost:4000 |

---

## 👤 Comptes Utilisateurs

| Rôle | Email | Mot de passe par défaut |
|------|-------|-------------------------|
| Admin | admin@srq.hearstmining.com | SRQ_Admin_2025! |
| Manager | manager@srq.hearstmining.com | SRQ_Manager_2025! |
| Operator | operator@srq.hearstmining.com | SRQ_Operator_2025! |
| Viewer | viewer@srq.hearstmining.com | SRQ_Viewer_2025! |

⚠️ **IMPORTANT:** Changer ces mots de passe en production!

---

## 📚 Documentation Associée

- [QUICK_START.md](QUICK_START.md) - Démarrage rapide
- [README.md](README.md) - Documentation générale
- [RACCORDEMENT_GUIDE.md](RACCORDEMENT_GUIDE.md) - Raccordement au backend central

---

**Dernière mise à jour:** 24 Décembre 2025  
**Version:** 2.0

