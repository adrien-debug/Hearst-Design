# RÈGLES DE SYNCHRONISATION OBLIGATOIRES

> 🔄 **CRITIQUE** : Ces règles garantissent la cohérence de la plateforme Hearst Control

---

## 🎯 PRINCIPE FONDAMENTAL

**"TOUTE MODIFICATION DANS `core/` OU `backend-central/` DOIT ÊTRE PROPAGÉE AUTOMATIQUEMENT"**

Si vous modifiez un fichier central, TOUS les projets qui en dépendent DOIVENT être mis à jour **IMMÉDIATEMENT**.

---

## 📜 LES 10 RÈGLES D'OR DE LA SYNCHRONISATION

### 🔴 RÈGLE #1 : SYNCHRONISATION OBLIGATOIRE

```
SI modification dans core/ 
ALORS synchronisation OBLIGATOIRE vers TOUS les projets
AVANT tout commit
```

**Aucune exception.** C'est automatisé via les hooks Git.

---

### 🔴 RÈGLE #2 : FICHIERS CRITIQUES = BLOCAGE

Les fichiers suivants **BLOQUENT** le commit s'ils ne sont pas synchronisés :

```
core/auth/authService.js               → CRITIQUE (Sécurité)
core/middleware/authMiddleware.js      → CRITIQUE (Sécurité)
core/database/supabaseClient.js        → CRITIQUE (Database)
backend-central/routes/auth.js         → CRITIQUE (Routes auth)
backend-central/controllers/authController.js → CRITIQUE (Auth)
database/central-schema.sql            → CRITIQUE (Schéma DB)
```

---

### 🟡 RÈGLE #3 : VÉRIFICATION PRE-COMMIT

Avant CHAQUE commit, le système vérifie automatiquement :

1. ✅ Pas de secrets exposés
2. ✅ Changements critiques détectés
3. ✅ Synchronisation core → projets effectuée
4. ✅ Fichiers identiques entre source et destinations

**Si une vérification échoue → Commit BLOQUÉ**

---

### 🟡 RÈGLE #4 : COMMANDE UNIQUE DE SYNC

```bash
./scripts/sync-core-to-projects.sh
```

**C'est la SEULE commande officielle** pour synchroniser. Ne tentez pas de copier manuellement.

**Que fait-elle ?**
- ✅ Lit SYNC_MANIFEST.json
- ✅ Crée backups automatiques
- ✅ Compare et synchronise uniquement les différences
- ✅ Log dans SYNC_CHANGELOG.md
- ✅ Vérifie post-synchronisation

---

### 🟡 RÈGLE #5 : DÉTECTION AUTOMATIQUE

```bash
# Mode vérification ponctuelle
./scripts/detect-changes.sh check

# Mode surveillance continue
./scripts/detect-changes.sh watch
```

Le mode `watch` surveille en temps réel les modifications dans :
- `core/`
- `backend-central/`
- `database/central-schema.sql`

**Alerte immédiate** si modification critique détectée.

---

### 🟡 RÈGLE #6 : VÉRIFICATION POST-SYNC

Après chaque synchronisation, **OBLIGATOIRE** :

```bash
./scripts/verify-sync.sh
```

Vérifie que :
- ✅ Tous les fichiers sont identiques (source = destinations)
- ✅ Structure des dossiers correcte
- ✅ Permissions des fichiers OK
- ✅ Dépendances npm cohérentes

---

### 🟡 RÈGLE #7 : WORKFLOW OBLIGATOIRE

```bash
# 1. Modifier un fichier dans core/
vim core/auth/authService.js

# 2. IMMÉDIATEMENT synchroniser
./scripts/sync-core-to-projects.sh

# 3. Vérifier la synchronisation
./scripts/verify-sync.sh

# 4. Tester CHAQUE projet
cd projects/hearst-design && npm test
cd projects/hearst-qatar-new && npm test
cd projects/hearst-strategic-reserve-qatar && npm test

# 5. Ajouter au commit (tous les fichiers synchronisés)
git add core/
git add projects/*/backend/core-modules/

# 6. Commiter (hook vérifiera automatiquement)
git commit -m "sync: Mise à jour authService.js"

# 7. Push (hook vérifiera une dernière fois)
git push
```

**JAMAIS sauter une étape.**

---

### 🟡 RÈGLE #8 : NOMENCLATURE DES COMMITS

Pour les synchronisations, utiliser le préfixe **`sync:`** :

```bash
git commit -m "sync: Propagation core → projets"
git commit -m "sync: Mise à jour authMiddleware.js"
git commit -m "sync: Correction logger.js"
```

Autres préfixes acceptés :
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `chore:` Maintenance
- `test:` Tests

---

### 🟡 RÈGLE #9 : STRUCTURE OBLIGATOIRE

Chaque projet DOIT avoir cette structure :

```
projects/<nom-projet>/
  backend/
    core-modules/           ← OBLIGATOIRE
      auth/
        authService.js      ← Copie de core/auth/authService.js
      middleware/
        authMiddleware.js   ← Copie de core/middleware/authMiddleware.js
      database/
        supabaseClient.js   ← Copie de core/database/supabaseClient.js
      utils/
        logger.js           ← Copie de core/shared-utils/logger.js
        validators.js       ← Copie de core/shared-utils/validators.js
```

**Ne JAMAIS modifier `core-modules/` directement dans un projet.**

Si modification nécessaire → Modifier dans `core/` puis synchroniser.

---

### 🔴 RÈGLE #10 : INTERDICTIONS ABSOLUES

❌ **JAMAIS** modifier `core-modules/` dans un projet directement
❌ **JAMAIS** copier manuellement des fichiers de core vers projets
❌ **JAMAIS** bypasser les hooks avec `--no-verify` (sauf urgence)
❌ **JAMAIS** commiter core/ sans synchroniser les projets
❌ **JAMAIS** modifier core/ sans tester tous les projets après
❌ **JAMAIS** supprimer SYNC_CHANGELOG.md ou ses entrées
❌ **JAMAIS** modifier SYNC_MANIFEST.json sans comprendre l'impact

---

## 📋 SYNC_MANIFEST.json - Configuration

Le fichier `SYNC_MANIFEST.json` définit **QUI synchronise QUOI vers OÙ**.

### Structure :

```json
{
  "syncRules": {
    "core": {
      "files": [
        {
          "source": "core/auth/authService.js",
          "targets": [
            "projects/hearst-design/backend/core-modules/auth/authService.js",
            "projects/hearst-qatar-new/backend/core-modules/auth/authService.js",
            "projects/hearst-strategic-reserve-qatar/backend/core-modules/auth/authService.js"
          ],
          "critical": true,
          "description": "Service d'authentification"
        }
      ]
    }
  }
}
```

### Ajouter un nouveau fichier à synchroniser :

1. Éditer `SYNC_MANIFEST.json`
2. Ajouter l'entrée dans `syncRules.core.files[]`
3. Définir `critical: true` si fichier de sécurité
4. Tester : `./scripts/sync-core-to-projects.sh`

---

## 🚨 GESTION DES URGENCES

### Bypass temporaire (URGENCE UNIQUEMENT)

```bash
# Si vraiment nécessaire (incident en production)
git commit --no-verify -m "fix: Correction urgente"

# MAIS OBLIGATOIRE juste après :
./scripts/sync-core-to-projects.sh
git add projects/*/backend/core-modules/
git commit -m "sync: Rattrapage synchronisation"
```

**Documenter POURQUOI dans le commit message.**

---

## 📊 MONITORING ET LOGS

### Fichiers de log :

```
logs/sync-YYYYMMDD-HHMMSS.log        → Log détaillé de chaque sync
logs/changes-detected-YYYYMMDD.log   → Changements détectés
SYNC_CHANGELOG.md                     → Historique complet
```

### Consulter les logs :

```bash
# Log de la dernière synchronisation
ls -lt logs/sync-*.log | head -1 | xargs cat

# Changements détectés aujourd'hui
cat logs/changes-detected-$(date +%Y%m%d).log

# Historique complet
less SYNC_CHANGELOG.md
```

---

## 🔍 VÉRIFICATIONS QUOTIDIENNES

### Checklist développeur :

```bash
# Matin (début de journée)
./scripts/verify-sync.sh

# Avant chaque commit
./scripts/detect-changes.sh check

# Avant chaque push
./scripts/verify-sync.sh

# Soir (fin de journée)
git log --oneline --since="1 day ago" | grep "sync:"
```

---

## 🆘 DÉPANNAGE

### Problème : Commit bloqué

```bash
# Cause probable : core/ modifié mais pas synchronisé

# Solution :
./scripts/sync-core-to-projects.sh
git add projects/*/backend/core-modules/
git commit -m "sync: Propagation core"
```

### Problème : Fichiers désynchronisés

```bash
# Diagnostic
./scripts/verify-sync.sh

# Correction
./scripts/sync-core-to-projects.sh

# Vérification
./scripts/verify-sync.sh
```

### Problème : Hook ne fonctionne pas

```bash
# Réinstaller les hooks
./scripts/install-git-hooks.sh

# Vérifier permissions
ls -la .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

---

## 📚 RÉFÉRENCES

- `SYNC_MANIFEST.json` - Configuration de synchronisation
- `SYNC_CHANGELOG.md` - Historique des synchronisations
- `scripts/sync-core-to-projects.sh` - Script principal
- `scripts/detect-changes.sh` - Détection de changements
- `scripts/verify-sync.sh` - Vérification de cohérence
- `.git/hooks/pre-commit` - Hook de validation

---

## ✅ CHECKLIST AVANT COMMIT

Avant CHAQUE commit, vérifier :

- [ ] Pas de fichiers core/ modifiés sans sync
- [ ] `./scripts/verify-sync.sh` passe ✅
- [ ] Tous les projets testés
- [ ] SYNC_CHANGELOG.md mis à jour (automatique)
- [ ] Pas de secrets exposés
- [ ] Message de commit avec préfixe (`sync:`, `feat:`, etc.)

---

## 🎯 RÉSUMÉ : LES 3 COMMANDEMENTS

1. **"Tu synchroniseras IMMÉDIATEMENT après modification de core/"**
2. **"Tu ne modifieras JAMAIS core-modules/ directement dans un projet"**
3. **"Tu vérifieras TOUJOURS avant de commiter"**

---

**Date de création** : 2025-12-24  
**Version** : 1.0.0  
**Statut** : OBLIGATOIRE pour tous les développeurs

---

*Hearst Control V2.0 - Autonomous Control*

