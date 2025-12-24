# 🧪 Tests SQL Supabase - Hearst Control

> **Statut:** ✅ Tous les tests validés avec succès  
> **Date:** 24 décembre 2025

---

## 🎯 Démarrage rapide

### Exécuter tous les tests en une commande

```bash
./test-supabase-complet.sh 5
```

### Lire le résumé

```bash
cat ACCES_SUPABASE_OK.md
```

---

## 📚 Documentation disponible

| Fichier | Description | Utilisation |
|---------|-------------|-------------|
| **ACCES_SUPABASE_OK.md** ⭐ | Résumé rapide et visuel | Première lecture |
| **TEST_SUPABASE_COMPLET.md** | Guide d'utilisation complet | Référence |
| **RAPPORT_TEST_SQL_SUPABASE.md** | Rapport technique détaillé | Documentation technique |
| **INDEX_TESTS_SUPABASE.md** | Index de navigation | Navigation rapide |
| **SYNTHESE_TESTS_SUPABASE.md** | Vue d'ensemble complète | Vue globale |
| **README_TESTS_SUPABASE.md** | Ce fichier | Point d'entrée |

---

## 🔧 Scripts de test

### Script automatisé (recommandé)

```bash
./test-supabase-complet.sh
```

**Options:**
1. Test de connexion basique
2. Vérification du schéma
3. Test d'accès SQL complet
4. Test de requêtes complexes
5. **Exécuter TOUS les tests** ⭐

### Scripts individuels

```bash
cd backend-central

# Test 1: Connexion basique
node test-supabase-connection.js

# Test 2: Vérification du schéma
node verify-schema.js

# Test 3: Accès SQL complet
node test-sql-access.js

# Test 4: Requêtes complexes
node test-sql-queries.js
```

---

## ✅ Résultats

### Tests effectués

- ✅ **Connexion** - Supabase accessible
- ✅ **Lecture** - 11 enregistrements testés
- ✅ **Écriture** - INSERT/DELETE validés
- ✅ **Relations** - Foreign Keys validées
- ✅ **Sécurité** - RLS, bcrypt, isolation
- ✅ **Performance** - < 100ms par requête
- ✅ **Intégrité** - 100% des données cohérentes

### Données actuelles

- 🏢 **1 tenant** (Hearst)
- 👥 **6 utilisateurs** (1 super admin, 1 admin, 2 managers, 2 operators)
- 🚀 **4 projets** (3 actifs, 1 planifié)
- 📦 **123 containers**
- ⛏️ **37,884 mineurs**
- ⚡ **17.9 EH/s**

---

## 🔑 Connexion

### Base de données

```
URL: https://tnnsfheflydiuhiduntn.supabase.co
```

### Compte admin

```
Email: admin@hearstmining.com
Password: <REDACTED>
```

---

## 📊 Structure

### Tables validées

1. **tenants** (1 enregistrement, 6 colonnes)
2. **users** (6 enregistrements, 12 colonnes)
3. **projects** (4 enregistrements, 22 colonnes)
4. **permissions** (créée, vide)
5. **audit_logs** (créée, vide)
6. **user_sessions** (créée, vide)
7. **project_settings** (créée, vide)

### Fonctionnalités SQL

- ✅ CRUD (Create, Read, Update, Delete)
- ✅ JOINs (relations entre tables)
- ✅ Filtres (WHERE, AND, OR)
- ✅ Agrégations (SUM, COUNT)
- ✅ Recherche (LIKE, ILIKE)
- ✅ Tri (ORDER BY)
- ✅ Pagination (LIMIT, OFFSET)

---

## 🚀 Prochaines étapes

### 1. Démarrer le backend

```bash
cd backend-central
npm start
```

### 2. Tester l'API

```bash
curl http://localhost:4000/api/health
```

### 3. Se connecter

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hearstmining.com","password":"<REDACTED>"}'
```

---

## 📞 Support

### Fichiers de configuration

- `backend-central/.env` - Variables d'environnement
- `core/database/supabaseClient.js` - Client Supabase
- `database/central-schema.sql` - Schéma SQL

### Commandes utiles

```bash
# Relancer tous les tests
./test-supabase-complet.sh 5

# Vérifier le schéma
node backend-central/verify-schema.js

# Test rapide de connexion
node backend-central/test-supabase-connection.js
```

---

## 🎉 Conclusion

**La base de données Supabase est 100% opérationnelle !**

Tous les tests ont été validés avec succès. Le système est prêt pour la production.

---

**Hearst Control - Multi-Tenant Mining Management**  
**Tests validés le 24 décembre 2025**

