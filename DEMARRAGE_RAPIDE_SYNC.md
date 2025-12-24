# 🚀 DÉMARRAGE RAPIDE - SYSTÈME DE SYNCHRONISATION

> **5 minutes pour comprendre et utiliser le système**

---

## ✅ INSTALLATION (Déjà fait !)

Le système est **déjà installé et opérationnel** ! Les hooks Git sont actifs.

---

## 📋 LES 3 COMMANDES ESSENTIELLES

### 1️⃣ Synchroniser core → projets

```bash
./scripts/sync-core-to-projects.sh
```

**Quand ?** Après CHAQUE modification dans `core/` ou `backend-central/`

**Durée ?** ~10-30 secondes

**Résultat ?** Tous les projets reçoivent automatiquement vos changements

---

### 2️⃣ Vérifier la synchronisation

```bash
./scripts/verify-sync.sh
```

**Quand ?** 
- Début de journée
- Avant un commit important
- En cas de doute

**Durée ?** ~5-10 secondes

**Résultat ?** ✅ si tout est synchronisé, ❌ sinon

---

### 3️⃣ Détecter les changements critiques

```bash
./scripts/detect-changes.sh check
```

**Quand ?** Avant chaque commit (optionnel, le hook le fait automatiquement)

**Durée ?** ~2-5 secondes

**Résultat ?** Liste des fichiers critiques modifiés

---

## 🔄 WORKFLOW STANDARD (60 secondes)

```bash
# 1. Modifier core/
vim core/auth/authService.js

# 2. Synchroniser (10s)
./scripts/sync-core-to-projects.sh

# 3. Vérifier (5s)
./scripts/verify-sync.sh

# 4. Tester (30s)
npm test

# 5. Commiter (5s)
git add .
git commit -m "sync: Mise à jour authService"

# ✅ Le hook vérifie automatiquement !
```

---

## 🔴 CE QUI BLOQUE AUTOMATIQUEMENT

Le commit sera **BLOQUÉ** si :

❌ Vous modifiez `core/` sans synchroniser  
❌ Des secrets sont exposés dans le commit  
❌ Un fichier critique est désynchronisé  

**Solution ?** Le message d'erreur vous dit exactement quoi faire !

---

## 📁 FICHIERS IMPORTANTS

| Fichier | Rôle |
|---------|------|
| `SYNC_MANIFEST.json` | Configuration (QUI → OÙ) |
| `SYNC_CHANGELOG.md` | Historique complet |
| `SYSTEME_SYNCHRONISATION.md` | Documentation complète |
| `docs/ESSENTIELS/REGLES_SYNCHRONISATION.md` | Règles détaillées |

---

## 🆘 EN CAS DE PROBLÈME

### "Commit bloqué !"

```bash
./scripts/sync-core-to-projects.sh
git add projects/*/backend/core-modules/
git commit -m "sync: Propagation"
```

### "Fichiers désynchronisés !"

```bash
./scripts/sync-core-to-projects.sh
./scripts/verify-sync.sh
```

### "Hook ne fonctionne pas !"

```bash
./scripts/install-git-hooks.sh
```

---

## 💡 CONSEILS PRO

✅ **Synchronisez souvent** - Mieux vaut trop que pas assez  
✅ **Vérifiez le matin** - `./scripts/verify-sync.sh`  
✅ **Lisez les alertes** - Elles sont là pour vous aider  
✅ **Consultez les logs** - `logs/sync-*.log`  

---

## 🎯 RÈGLE D'OR

**"Si tu modifies core/, tu synchronises IMMÉDIATEMENT"**

C'est tout ! 🎉

---

## 📚 POUR ALLER PLUS LOIN

- **Documentation complète** : `SYSTEME_SYNCHRONISATION.md`
- **Règles détaillées** : `docs/ESSENTIELS/REGLES_SYNCHRONISATION.md`
- **Configuration** : `SYNC_MANIFEST.json`

---

**Besoin d'aide ?** Consultez `SYSTEME_SYNCHRONISATION.md` section "Dépannage"

*Hearst Control V2.0 - Autonomous Synchronization*

