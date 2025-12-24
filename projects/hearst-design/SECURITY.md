# 🔒 SÉCURITÉ - HEARST DESIGN

> **Niveau de Sécurité** : 🟢 **STANDARD**  
> **Type** : Projet Web Design System  
> **Date** : 24 Décembre 2025

---

## 📊 CLASSIFICATION

**Type** : Projet Design System  
**Données** : Publiques / Non sensibles  
**Accès** : Standard (tous rôles autorisés)

---

## ⚠️ RÈGLES DE SÉCURITÉ

### 1. Règle #42 - URLs Frontend

**OBLIGATOIRE** :
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api/design
```

**INTERDIT** :
```bash
NEXT_PUBLIC_API_URL=http://localhost:3002  # ❌ Accès direct
```

### 2. Règles #30-31 - Secrets

**OBLIGATOIRE** :
- ✅ Pas de secrets en dur dans le code
- ✅ Variables d'environnement uniquement
- ✅ Fichiers `.env` dans `.gitignore`

**VÉRIFICATION** :
```bash
# Vérifier qu'aucun secret n'est exposé
../../scripts/check-secrets.sh
```

---

## 🔐 CONTRÔLE D'ACCÈS

### Permissions

| Rôle | Accéder | Créer Projets | Modifier Design | Gérer Utilisateurs |
|------|---------|---------------|-----------------|-------------------|
| **super_admin** | ✅ | ✅ | ✅ | ✅ |
| **admin** | ✅ | ✅ | ✅ | ✅ |
| **manager** | ✅ | ✅ | ✅ | ❌ |
| **operator** | ✅ | ✅ | ❌ | ❌ |
| **viewer** | ✅ | ❌ | ❌ | ❌ |

---

## 📊 AUDIT & TRAÇABILITÉ

### Logs

```
backend/logs/
├── access.log           # Accès API
├── error.log            # Erreurs
└── auth.log             # Authentifications
```

### Format

```json
{
  "timestamp": "2025-12-24T10:30:00.000Z",
  "user": "designer@hearst.com",
  "action": "CREATE_PROJECT",
  "resource": "projects/design-123",
  "status": "success"
}
```

---

## ✅ BONNES PRATIQUES

### DO ✅
- ✅ Pointer frontend vers Backend Central (port 4000)
- ✅ Utiliser variables d'environnement
- ✅ Valider les inputs utilisateur
- ✅ Gérer les erreurs (try/catch)
- ✅ Logger les actions importantes

### DON'T ❌
- ❌ Modifier les URLs frontend sans autorisation
- ❌ Mettre secrets en dur
- ❌ Bypasser le Backend Central
- ❌ Commit fichiers .env

---

## 📞 CONTACTS

**Email** : security@hearst.com  
**Documentation** : [README.md](./README.md)

---

**Date** : 24 Décembre 2025  
**Version** : 1.0  
**Classification** : 🟢 **STANDARD**
