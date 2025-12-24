# Core Modules - Hearst Design

> ⚠️ **NE JAMAIS MODIFIER CES FICHIERS DIRECTEMENT**

## 📋 Origine

Ces fichiers sont **automatiquement synchronisés** depuis `core/` (racine du projet Hearst Control).

## 🔄 Synchronisation

### Source Unique de Vérité
- **`core/auth/authService.js`** → `core-modules/auth/authService.js`
- **`core/middleware/authMiddleware.js`** → `core-modules/middleware/authMiddleware.js`
- **`core/database/supabaseClient.js`** → `core-modules/database/supabaseClient.js`
- **`core/shared-utils/logger.js`** → `core-modules/shared-utils/logger.js`
- **`core/shared-utils/validators.js`** → `core-modules/shared-utils/validators.js`

## ⚠️ RÈGLE CRITIQUE

**JAMAIS modifier ces fichiers directement dans ce projet !**

Si vous devez modifier un fichier core :

1. Modifier dans `core/` (racine Hearst Control)
2. Synchroniser : `./scripts/sync-core-to-projects.sh`
3. Vérifier : `./scripts/verify-sync.sh`
4. Tester ce projet
5. Commiter (le hook Git vérifie automatiquement)

## 📚 Documentation

- **Guide complet** : `SYSTEME_SYNCHRONISATION.md` (racine)
- **Démarrage rapide** : `DEMARRAGE_RAPIDE_SYNC.md` (racine)
- **Règles** : `docs/ESSENTIELS/REGLES_SYNCHRONISATION.md`

## ✅ Dernière Synchronisation

Consultez `SYNC_CHANGELOG.md` à la racine du projet Hearst Control.

---

*Ce dossier est géré automatiquement par le système de synchronisation Hearst Control V2.0*

