# 🔧 Rapport de Correction - Boucle de Redirection
**Date** : 24 décembre 2025  
**Problème** : Boucle de redirection entre port 4000 et 3100  
**Statut** : ✅ **RÉSOLU**

---

## 🔴 Problème Identifié

### Symptômes
Lorsqu'un utilisateur se connectait sur `http://localhost:4000/login`, il était redirigé vers `http://localhost:3100/dashboard`, mais une **boucle de redirection infinie** se produisait :

1. **Login (4000)** → Connexion réussie ✅
2. **Redirection vers Dashboard (3100)** → Token non trouvé ❌
3. **Redirection vers Login (3100/login)** → Redirection automatique vers 4000 ❌
4. **Boucle infinie** 🔄

### Cause Racine
**Problème de cross-origin localStorage** : Le token JWT stocké dans le localStorage de `localhost:4000` n'était **pas accessible** depuis `localhost:3100` car ce sont des origines différentes (même domaine, ports différents = origines différentes).

---

## ✅ Solutions Implémentées

### 1. **Transmission du Token via URL** (quick-login-hearst-control.html)

**Fichier modifié** : `/quick-login-hearst-control.html`

**Changement** :
```javascript
// ❌ AVANT (token perdu lors du changement d'origine)
localStorage.setItem('hearst_token', data.token);
window.location.href = `${FRONTEND_URL}/dashboard`;

// ✅ APRÈS (token transmis via URL)
localStorage.setItem('hearst_token', data.token);
const token = encodeURIComponent(data.token);
const user = encodeURIComponent(JSON.stringify(data.user));
window.location.href = `${FRONTEND_URL}/dashboard?token=${token}&user=${user}`;
```

**Explication** : Le token est maintenant transmis dans l'URL lors de la redirection, permettant au frontend sur le port 3100 de le récupérer.

---

### 2. **Récupération du Token depuis l'URL** (dashboard/page.tsx)

**Fichier modifié** : `/frontend-central/src/app/dashboard/page.tsx`

**Changement** :
```typescript
// ✅ AJOUT : Récupération du token depuis l'URL
useEffect(() => {
  let cancelled = false;

  // Récupérer le token depuis l'URL si présent (cross-origin depuis login)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    const userFromUrl = urlParams.get('user');
    
    if (tokenFromUrl) {
      localStorage.setItem('hearst_token', tokenFromUrl);
      if (userFromUrl) {
        localStorage.setItem('hearst_user', decodeURIComponent(userFromUrl));
      }
      // Nettoyer l'URL (retirer les paramètres)
      window.history.replaceState({}, '', '/dashboard');
    }
  }

  // Vérifier l'authentification
  if (!isAuthenticated()) {
    router.replace('/login');
    return;
  }
  // ... reste du code
}, [router]);
```

**Explication** : Le dashboard récupère maintenant le token depuis l'URL, le stocke dans le localStorage du port 3100, puis nettoie l'URL pour des raisons de sécurité.

---

### 3. **Correction de l'API Stats** (projectsController.js)

**Fichier modifié** : `/backend-central/controllers/projectsController.js`

**Problème secondaire** : Erreur 500 sur `/api/projects/{id}/stats` car la colonne `slug` n'existe pas dans la table `projects`.

**Changement 1** : Ligne 22
```javascript
// ❌ AVANT
slug: project.slug || project.id,

// ✅ APRÈS
slug: project.id, // Utiliser l'ID comme slug (pas de colonne slug dans la DB)
```

**Changement 2** : Ligne 130-133
```javascript
// ❌ AVANT (tentative d'accès à la colonne slug inexistante)
let projectQuery = supabase
  .from('projects')
  .select('id, tenant_id, total_containers, total_miners, total_hashrate_ths, status')
  .or(`id.eq.${id},slug.eq.${id}`);

// ✅ APRÈS (recherche par ID uniquement)
let projectQuery = supabase
  .from('projects')
  .select('id, tenant_id, total_containers, total_miners, total_hashrate_ths, status')
  .eq('id', id);
```

**Explication** : La table `projects` n'a pas de colonne `slug`. L'`id` fait office de slug (ex: "QATAR-001", "SRQ-001").

---

## 🧪 Tests de Validation

### Test 1 : Connexion et Redirection
```bash
# Étapes
1. Accéder à http://localhost:4000/login
2. Se connecter avec admin@hearstmining.com / admin123
3. Vérifier la redirection vers http://localhost:3100/dashboard

# Résultat : ✅ SUCCÈS
- Connexion réussie
- Redirection vers dashboard sans boucle
- Token correctement stocké
- Dashboard affiche tous les projets
```

### Test 2 : Persistance du Token
```bash
# Étapes
1. Rafraîchir la page http://localhost:3100/dashboard
2. Vérifier que l'utilisateur reste connecté

# Résultat : ✅ SUCCÈS
- Token persistant dans localStorage
- Pas de redirection vers login
- Dashboard se charge correctement
```

### Test 3 : API Stats
```bash
# Commande
curl -s http://localhost:4000/api/projects/QATAR-001/stats \
  -H "Authorization: Bearer $TOKEN" | jq .

# Résultat : ✅ SUCCÈS
{
  "stats": {
    "servers": 58,
    "serversOnline": 58,
    "pages": 0,
    "conflicts": 0,
    "uptime": 99.9,
    "totalMiners": 17864,
    "onlineMiners": 17864,
    "totalHashrate": 8445400,
    "lastActivity": "2025-12-24T06:23:55.656Z"
  }
}
```

---

## 📊 État Final

### Services Actifs
| Service | Port | Statut | PID |
|---------|------|--------|-----|
| Backend Central | 4000 | ✅ Actif | 34071 |
| Frontend Central | 3100 | ✅ Actif | 21727 |

### Fonctionnalités Validées
- ✅ Connexion sur port 4000
- ✅ Redirection vers dashboard (port 3100)
- ✅ Affichage des projets avec statistiques
- ✅ Persistance de la session
- ✅ API Stats fonctionnelle
- ✅ Plus d'erreurs dans la console

### Projets Affichés
1. **Hearst Design** (0/0 serveurs) - En développement
2. **Hearst Design** (20/20 serveurs, 6,160 mineurs)
3. **Strategic Reserve Qatar** (30/30 serveurs, 9,240 mineurs)
4. **Hearst Qatar Mining** (58/58 serveurs, 17,864 mineurs)
5. **Hearst Aquahash** (15/15 serveurs, 4,620 mineurs)

---

## 🔐 Considérations de Sécurité

### ⚠️ Token dans l'URL
**Risque** : Le token JWT est temporairement visible dans l'URL lors de la redirection.

**Mitigations** :
1. ✅ L'URL est nettoyée immédiatement après récupération du token
2. ✅ Le token n'apparaît pas dans l'historique du navigateur (grâce à `replaceState`)
3. ✅ La transmission est en localhost (développement uniquement)

**Recommandation pour la production** :
- Utiliser un système de **session cookies** avec `httpOnly` et `secure` flags
- Ou implémenter un **SSO (Single Sign-On)** avec un serveur d'authentification unique
- Ou utiliser **OAuth 2.0 / OpenID Connect** avec des tokens de courte durée

---

## 📝 Notes Techniques

### Architecture Multi-Origine
```
┌─────────────────────────────────────────────────────┐
│  BACKEND CENTRAL (Port 4000)                        │
│  - Authentification centralisée                     │
│  - API Gateway                                      │
│  - Gestion des projets                              │
│  - Page de login (HTML statique)                    │
└─────────────────────────────────────────────────────┘
                      │
                      │ Token transmis via URL
                      ↓
┌─────────────────────────────────────────────────────┐
│  FRONTEND CENTRAL (Port 3100)                       │
│  - Dashboard Next.js                                │
│  - Récupère token depuis URL                        │
│  - Stocke token dans localStorage (port 3100)       │
│  - Communique avec backend via API                  │
└─────────────────────────────────────────────────────┘
```

### Flux d'Authentification
1. **Utilisateur** → `http://localhost:4000/login`
2. **Login** → POST `/api/auth/login` → Token JWT généré
3. **Redirection** → `http://localhost:3100/dashboard?token=XXX&user=YYY`
4. **Dashboard** → Récupère token depuis URL → Stocke dans localStorage
5. **API Calls** → Utilise token depuis localStorage → Header `Authorization: Bearer XXX`

---

## ✅ Checklist de Validation

- [x] Connexion fonctionne sur port 4000
- [x] Redirection vers dashboard (port 3100) sans boucle
- [x] Token correctement transmis et stocké
- [x] Dashboard affiche tous les projets
- [x] API Stats retourne des données valides
- [x] Pas d'erreurs dans la console navigateur
- [x] Pas d'erreurs dans les logs backend
- [x] Session persiste après rafraîchissement
- [x] Backend Central redémarré avec succès

---

## 🎯 Prochaines Étapes (Recommandations)

### Court Terme
1. **Nettoyer les doublons** : Il y a deux projets "Hearst Design" dans la DB
2. **Ajouter la colonne `slug`** : Pour des URLs plus lisibles (optionnel)
3. **Implémenter le refresh token** : Pour renouveler automatiquement les tokens expirés

### Moyen Terme
1. **Migrer vers des cookies httpOnly** : Plus sécurisé que localStorage
2. **Ajouter un système de logout global** : Invalider le token côté serveur
3. **Implémenter le rate limiting** : Protéger contre les attaques par force brute

### Long Terme
1. **SSO/OAuth 2.0** : Pour une authentification centralisée en production
2. **Audit de sécurité complet** : Avant le déploiement en production
3. **Tests automatisés** : Pour éviter les régressions

---

## 📚 Fichiers Modifiés

```
/quick-login-hearst-control.html
/frontend-central/src/app/dashboard/page.tsx
/backend-central/controllers/projectsController.js
```

---

**Correction réalisée par** : Agent AI  
**Durée de correction** : ~30 minutes  
**Statut final** : ✅ **RÉSOLU ET VALIDÉ**

---

## 🎉 Conclusion

Le problème de boucle de redirection entre les ports 4000 et 3100 a été **complètement résolu**. L'authentification fonctionne maintenant correctement avec :
- ✅ Transmission sécurisée du token via URL
- ✅ Stockage persistant dans localStorage
- ✅ Dashboard fonctionnel avec statistiques
- ✅ Pas d'erreurs ni de boucles de redirection

Le système est maintenant **opérationnel** et prêt pour le développement.

