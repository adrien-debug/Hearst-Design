# 🔒 SÉCURITÉ - GUIDE RAPIDE

**Pour les Développeurs Hearst Control**

---

## ⚡ DÉMARRAGE RAPIDE SÉCURITÉ

### 1️⃣ Installer les Git Hooks (Obligatoire)

```bash
./scripts/install-git-hooks.sh
```

**Ce que ça fait** :
- ✅ Bloque les commits contenant des secrets
- ✅ Vérifie les messages de commit
- ✅ Empêche le push de fichiers .env

**Utilisation** :
```bash
# Commit normal - sera vérifié automatiquement
git commit -m "feat: nouvelle fonctionnalité"

# Si un secret est détecté → commit bloqué ❌
# Retirez le secret et recommitez

# Pour forcer (⚠️ déconseillé) :
git commit --no-verify
```

---

### 2️⃣ Vérifier Manuellement Avant Commit

```bash
./scripts/check-secrets.sh
```

**Quand l'utiliser** :
- Avant un gros commit
- Après avoir travaillé avec des credentials
- Avant de push

---

### 3️⃣ Configurer Votre .env (Nouveau Projet)

```bash
# Backend
cd backend-central
cp env.example .env

# Générer un JWT_SECRET fort
openssl rand -base64 48

# Éditer .env avec vos vraies valeurs
nano .env
```

**⚠️ IMPORTANT** :
- ❌ Ne JAMAIS committer le fichier `.env`
- ✅ Toujours utiliser `.env.example` pour les exemples
- ✅ JWT_SECRET doit être identique dans tous les backends

---

## 📋 CHECKLIST QUOTIDIENNE

### Avant de Committer
- [ ] Pas de secrets dans les fichiers ?
- [ ] Pas de mots de passe en dur ?
- [ ] `.env` dans le `.gitignore` ?
- [ ] Tests passent ?

### Avant de Pusher
- [ ] `./scripts/check-secrets.sh` passe ?
- [ ] Aucun fichier `.env` dans le commit ?
- [ ] Message de commit descriptif ?

---

## 🚨 EN CAS D'INCIDENT

### J'ai Committé un Secret par Accident

**1. STOP - Ne pas pusher !**
```bash
# Si pas encore pushé
git reset HEAD~1      # Annule le commit
git restore --staged .env  # Unstage le fichier
```

**2. Si déjà pushé → Alerte Immédiate**
```bash
# Informer l'équipe immédiatement
# Suivre le GUIDE_ROTATION_SECRETS.md
```

### J'ai des Doutes sur un Fichier

```bash
# Vérifier ce qui sera commité
git diff --cached

# Vérifier l'historique d'un fichier
git log --all -- path/to/file

# Chercher des secrets dans l'historique
git log -S "mot_clé" --all
```

---

## 🔐 SECRETS À NE JAMAIS COMMITTER

### ❌ Interdits
- Clés API (Supabase, AWS, etc.)
- Mots de passe
- JWT secrets
- Tokens d'accès
- Certificats privés (.key, .pem)
- Fichiers .env
- Connection strings avec credentials

### ✅ Autorisés
- `.env.example` (avec valeurs fictives)
- Documentation avec `<REDACTED>`
- Clés publiques
- Configuration sans secrets

---

## 📚 DOCUMENTATION COMPLÈTE

### Pour Aller Plus Loin
- **`RAPPORT_AUDIT_SECURITE.md`** : Audit complet + actions requises
- **`SECURITY.md`** : Politique de sécurité détaillée
- **`GUIDE_ROTATION_SECRETS.md`** : Comment rotater les secrets
- **`.gitignore`** : Patterns exclus automatiquement

### Scripts Disponibles
- `scripts/check-secrets.sh` : Scan de secrets
- `scripts/install-git-hooks.sh` : Installation hooks
- `scripts/start-all.sh` : Démarrage avec logs

---

## 🎯 BONNES PRATIQUES

### Variables d'Environnement
```javascript
// ❌ MAUVAIS
const apiKey = "sk_live_abc123xyz";

// ✅ BON
const apiKey = process.env.API_KEY;
```

### Configuration
```javascript
// ❌ MAUVAIS
const config = {
  jwt: "mon-secret-123",
  db: "postgres://user:pass@host/db"
};

// ✅ BON
const config = {
  jwt: process.env.JWT_SECRET,
  db: process.env.DATABASE_URL
};
```

### Logs
```javascript
// ❌ MAUVAIS
console.log('User logged in:', { email, password });

// ✅ BON
console.log('User logged in:', { email });
// Ne JAMAIS logger de secrets/passwords
```

---

## 🔄 ROTATION DES SECRETS

### Planning Recommandé
- **JWT_SECRET** : Tous les 6 mois
- **Clés Supabase** : Tous les 12 mois
- **Mots de passe** : Tous les 90 jours

### Procédure
Voir **`GUIDE_ROTATION_SECRETS.md`** pour la procédure complète étape par étape.

---

## 🆘 SUPPORT

### Questions Sécurité
1. Consulter `SECURITY.md`
2. Vérifier `RAPPORT_AUDIT_SECURITE.md`
3. Contacter l'équipe sécurité

### Signaler une Vulnérabilité
**NE PAS** créer d'issue publique → Contacter directement l'équipe

---

## ✅ ACTIONS POST-AUDIT (URGENT)

🔴 **À faire dans les 48h** :
- [ ] Rotation clés Supabase
- [ ] Rotation JWT_SECRET
- [ ] Changement mots de passe
- [ ] Installation Git hooks

🟡 **À faire cette semaine** :
- [ ] Activer RLS sur Supabase
- [ ] Sécuriser endpoint /bootstrap
- [ ] Tests de validation

---

**Version** : 1.0.0  
**Dernière mise à jour** : 24 décembre 2025  
**Contact** : Équipe Sécurité Hearst Control

---

## 🎓 FORMATION

### Nouveaux Développeurs
1. Lire ce document (5 min)
2. Installer les Git hooks
3. Lire `SECURITY.md` (15 min)
4. Configurer son `.env` local

### Audit de Sécurité Réalisé
✅ Audit complet effectué le 24/12/2025  
✅ Tous les correctifs appliqués  
⚠️ Rotation des secrets requise avant production

**📖 Voir `RAPPORT_AUDIT_SECURITE.md` pour les détails**

