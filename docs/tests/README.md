# 🧪 Documentation des Tests

Ce dossier contient toute la documentation relative aux tests et validations du système Hearst Control.

## 📋 Tests Disponibles

### Tests Supabase

- **[TEST_SUPABASE_COMPLET.md](TEST_SUPABASE_COMPLET.md)** - Tests complets de la connexion Supabase
- **[TEST_SUPABASE.md](TEST_SUPABASE.md)** - Tests de base Supabase
- **[SYNTHESE_TESTS_SUPABASE.md](SYNTHESE_TESTS_SUPABASE.md)** - Synthèse des résultats des tests
- **[INDEX_TESTS_SUPABASE.md](INDEX_TESTS_SUPABASE.md)** - Index des tests Supabase
- **[RAPPORT_TEST_SQL_SUPABASE.md](RAPPORT_TEST_SQL_SUPABASE.md)** - Rapport détaillé SQL

### Tests Système

- **[TEST_COMPLET_24_DEC_2025.md](TEST_COMPLET_24_DEC_2025.md)** - Tests complets du système (24 décembre 2025)

## 🎯 Comment Utiliser

### Exécuter les Tests

```bash
# Tester la connexion Supabase
cd backend-central
node test-supabase-connection.js

# Tests SQL complets
node test-sql-queries.js

# Vérifier le schéma
node verify-schema.js
```

### Lire les Résultats

1. **Connexion de base** : [TEST_SUPABASE.md](TEST_SUPABASE.md)
2. **Tests complets** : [TEST_SUPABASE_COMPLET.md](TEST_SUPABASE_COMPLET.md)
3. **Synthèse** : [SYNTHESE_TESTS_SUPABASE.md](SYNTHESE_TESTS_SUPABASE.md)

## ✅ Statut des Tests

Consultez [TEST_COMPLET_24_DEC_2025.md](TEST_COMPLET_24_DEC_2025.md) pour le statut le plus récent de tous les tests.

---

⬅️ [Retour à la documentation](../)

