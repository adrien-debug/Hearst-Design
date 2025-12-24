# 🚫 RÈGLE ABSOLUE - URLS FRONTEND

## ⛔ INTERDICTION FORMELLE

**IL EST STRICTEMENT INTERDIT de modifier les URLs API des frontends pour pointer directement vers les backends des projets.**

### ❌ INTERDIT

```bash
# NE JAMAIS FAIRE CECI
NEXT_PUBLIC_API_URL=http://localhost:3001  # ❌ Accès direct Qatar
NEXT_PUBLIC_API_URL=http://localhost:3002  # ❌ Accès direct Design
NEXT_PUBLIC_API_URL=http://localhost:3003  # ❌ Accès direct SRQ
```

### ✅ OBLIGATOIRE

```bash
# TOUS LES FRONTENDS DOIVENT PASSER PAR LE BACKEND CENTRAL
NEXT_PUBLIC_API_URL=http://localhost:4000/api/qatar    # ✅ Via Central
NEXT_PUBLIC_API_URL=http://localhost:4000/api/design   # ✅ Via Central
NEXT_PUBLIC_API_URL=http://localhost:4000/api/srq      # ✅ Via Central
```

---

## 🎯 ARCHITECTURE OBLIGATOIRE

```
┌──────────────┐
│   FRONTEND   │
│  (n'importe) │
└──────┬───────┘
       │
       │ TOUJOURS via port 4000
       │
       ▼
┌─────────────────────────────┐
│   BACKEND CENTRAL (4000)    │ ← POINT D'ENTRÉE UNIQUE
│   API Gateway & Auth        │
└──────┬──────────────────────┘
       │
       │ Proxy interne
       │
    ┌──┴──┬──────┬────────┐
    ▼     ▼      ▼        ▼
  Qatar Design  SRQ    Future
  :3001  :3002  :3003   :300X
```

---

## 📝 CONFIGURATION STANDARD PAR PROJET

### Hearst Qatar Frontend

**Fichier** : `projects/hearst-qatar-new/frontend/.env.local`

```bash
# ⚠️ NE PAS MODIFIER CETTE URL
# Toutes les requêtes DOIVENT passer par le Backend Central
NEXT_PUBLIC_API_URL=http://localhost:4000/api/qatar
NEXT_PUBLIC_PROJECT_NAME=Qatar Project
```

### Hearst Design Frontend

**Fichier** : `projects/hearst-design/frontend/.env.local`

```bash
# ⚠️ NE PAS MODIFIER CETTE URL
# Toutes les requêtes DOIVENT passer par le Backend Central
NEXT_PUBLIC_API_URL=http://localhost:4000/api/design
NEXT_PUBLIC_PROJECT_NAME=Hearst Design
```

### Hearst SRQ Frontend

**Fichier** : `projects/hearst-strategic-reserve-qatar/frontend/.env.local`

```bash
# ⚠️ NE PAS MODIFIER CETTE URL
# Toutes les requêtes DOIVENT passer par le Backend Central
NEXT_PUBLIC_API_URL=http://localhost:4000/api/srq
NEXT_PUBLIC_PROJECT_NAME=Hearst Strategic Reserve Qatar
NEXT_PUBLIC_PROJECT_SLUG=hearst-srq
NEXT_PUBLIC_THEME=dark
NEXT_PUBLIC_PRIMARY_COLOR=#8afd81
```

---

## 🔍 VÉRIFICATION

Pour vérifier que la configuration est correcte :

```bash
# Vérifier Backend Central actif
curl http://localhost:4000/health

# Vérifier proxy Qatar
curl http://localhost:4000/api/qatar/health

# Vérifier proxy Design
curl http://localhost:4000/api/design/health

# Vérifier proxy SRQ
curl http://localhost:4000/api/srq/health
```

**Script automatique** :

```bash
./scripts/verify-frontend-urls.sh
```

---

## 🚨 CONSÉQUENCES D'UNE MODIFICATION NON AUTORISÉE

Si quelqu'un modifie les URLs pour pointer directement vers les backends :

1. ❌ **Perte du contrôle centralisé**
2. ❌ **Bypass de l'authentification centrale**
3. ❌ **Pas d'audit des actions**
4. ❌ **Pas de rate limiting global**
5. ❌ **Architecture compromise**

---

## 👤 AUTORISATION DE MODIFICATION

**SEULES** les personnes suivantes peuvent modifier ces URLs :
- [ ] Architecte Système Principal
- [ ] Lead DevOps

**Toute modification nécessite** :
- Une demande écrite avec justification
- Une revue d'architecture
- Une mise à jour de la documentation

---

## 📋 CHECKLIST DE CONTRÔLE

Avant tout déploiement, vérifier :

- [ ] Tous les frontends pointent vers `http://localhost:4000/api/[projet]`
- [ ] Aucun frontend ne pointe directement vers `:3001`, `:3002`, `:3003`
- [ ] Backend Central est bien configuré avec les proxies
- [ ] Les tests passent via le Backend Central

---

## 🛡️ PROTECTIONS MISES EN PLACE

### 1. Documentation Stricte

Ce document (`REGLE_URLS_FRONTENDS.md`) est la référence unique et fait autorité.

### 2. Vérification au Build

Les `next.config.js` contiennent des vérifications webpack qui empêchent le build si une URL incorrecte est détectée.

### 3. Vérification au Runtime

Les fichiers `api.ts` contiennent des vérifications qui lancent une erreur si une URL directe est détectée.

### 4. Script de Vérification

Le script `verify-frontend-urls.sh` vérifie automatiquement toutes les configurations.

### 5. Règles Cursorrules

Les règles 42-44 dans `.cursorrules` rappellent cette obligation aux agents AI.

---

## 📚 DOCUMENTS LIÉS

- `/.cursorrules` - Règles 42-44
- `/README.md` - Section "Règle Critique - URLs Frontend"
- `/PROJECT_STRUCTURE.md` - Architecture détaillée
- `/AI_AGENT_GUIDE.md` - Guide pour les agents AI

---

## 🔧 EN CAS DE PROBLÈME

Si un frontend ne fonctionne pas :

1. **Vérifier Backend Central** : `curl http://localhost:4000/health`
2. **Vérifier les proxies** : `curl http://localhost:4000/api/[projet]/health`
3. **Vérifier les logs** : `tail -f logs/backend-central.log`
4. **Vérifier la configuration** : `./scripts/verify-frontend-urls.sh`

---

**Date de création** : 24 Décembre 2025  
**Version** : 1.0  
**Statut** : 🔒 VERROUILLÉ - NE PAS MODIFIER  
**Auteur** : Architecture Hearst Control V2.0

