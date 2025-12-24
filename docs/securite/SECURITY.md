# Security Policy

## 🔒 Sécurité du Projet Hearst Control

Ce document décrit les politiques de sécurité et les procédures pour signaler des vulnérabilités.

---

## 📢 Signaler une Vulnérabilité

Si vous découvrez une vulnérabilité de sécurité :

1. **NE PAS** créer d'issue publique
2. Contactez l'équipe de sécurité directement
3. Fournissez un maximum de détails :
   - Description de la vulnérabilité
   - Étapes pour la reproduire
   - Impact potentiel
   - Suggestions de correctif (si applicable)

---

## 🛡️ Bonnes Pratiques Implémentées

### Gestion des Secrets
- ✅ Tous les secrets en variables d'environnement
- ✅ `.env` dans `.gitignore`
- ✅ Fichiers `.env.example` sans valeurs réelles
- ✅ Rotation régulière des secrets recommandée

### Authentification & Autorisation
- ✅ JWT avec expiration (24h)
- ✅ Bcrypt pour les mots de passe (10 rounds)
- ✅ Multi-tenant avec isolation stricte
- ✅ RBAC avec hiérarchie de rôles
- ✅ Validation tenant_id sur tous les endpoints

### Protection Réseau
- ✅ CORS configurable (pas de wildcard en production)
- ✅ Rate limiting configurable
- ✅ Helmet.js pour headers de sécurité
- ✅ HTTPS recommandé en production

### Base de Données
- ✅ Service role key sécurisée
- ✅ Requêtes préparées (via Supabase SDK)
- ✅ Scope tenant sur toutes les requêtes
- 🔄 RLS (Row Level Security) recommandé

---

## ⚠️ Secrets Compromis - Actions Immédiates

**Si vous pensez qu'un secret a été compromis** :

### 1. Clés Supabase
```bash
# 1. Aller sur https://app.supabase.com
# 2. Settings → API
# 3. Rotate service_role key
# 4. Rotate anon key
# 5. Mettre à jour tous les .env
# 6. Redémarrer les services
```

### 2. JWT Secret
```bash
# Générer nouveau secret
openssl rand -base64 48

# Mettre à jour dans tous les .env
# IMPORTANT: Même valeur partout !
# Redémarrer les services
# Note: Invalide tous les tokens existants
```

### 3. Mots de Passe Utilisateurs
```sql
-- Dans Supabase SQL Editor
-- Générer nouveau hash (voir scripts/generate-password-hash.js)
UPDATE users 
SET password_hash = '<nouveau_hash>' 
WHERE email = '<email_compromis>';
```

---

## 🔐 Configuration Sécurisée

### Variables d'Environnement Requises

**Backend Central** (`backend-central/.env`) :
```env
# Sécurité
JWT_SECRET=<généré-avec-openssl-rand-base64-48>

# Supabase
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_KEY=<service_role_key>  # Jamais committer !

# CORS (production)
CORS_ORIGIN=https://app.votredomaine.com,https://dashboard.votredomaine.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000    # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100     # Plus strict en prod
```

### CORS en Production
```javascript
// NE JAMAIS utiliser origin: '*' en production
// Toujours spécifier les domaines exacts
CORS_ORIGIN=https://app.hearstmining.com,https://dashboard.hearstmining.com
```

### Rate Limiting
```javascript
// Adapter selon le trafic attendu
// Trop permissif = risque d'abus
// Trop strict = impact utilisateurs légitimes
RATE_LIMIT_MAX_REQUESTS=100  # Recommandé pour production
```

---

## 🚨 Checklist Déploiement Production

Avant tout déploiement en production :

### Secrets
- [ ] Tous les secrets générés avec forte entropie
- [ ] Pas de secrets par défaut/exemple
- [ ] JWT_SECRET unique et fort (48+ caractères)
- [ ] Clés Supabase production (pas dev)
- [ ] Rotation des secrets planifiée

### Configuration
- [ ] `NODE_ENV=production`
- [ ] CORS configuré avec domaines exacts
- [ ] Rate limiting activé et configuré
- [ ] HTTPS obligatoire
- [ ] Logs structurés activés

### Base de Données
- [ ] RLS (Row Level Security) activé
- [ ] Policies tenant créées
- [ ] Backups automatiques configurés
- [ ] Schéma migrations testées

### Monitoring
- [ ] Logging centralisé (Sentry, DataDog)
- [ ] Alertes configurées
- [ ] Métriques de performance
- [ ] Health checks actifs

### Tests
- [ ] Tests unitaires passent
- [ ] Tests d'intégration passent
- [ ] Tests de sécurité effectués
- [ ] Scan de vulnérabilités (npm audit)

---

## 🔄 Rotation des Secrets (Planning Recommandé)

### Fréquence
- **JWT_SECRET** : Tous les 6 mois (ou immédiatement si compromis)
- **Supabase Keys** : Tous les 12 mois (ou immédiatement si compromis)
- **Mots de passe** : Politique de l'organisation

### Procédure de Rotation
1. Générer nouveau secret
2. Configurer en parallèle de l'ancien (si possible)
3. Déployer progressivement
4. Monitorer les erreurs
5. Supprimer ancien secret après validation

---

## 🧪 Tests de Sécurité

### Scan de Vulnérabilités
```bash
# NPM packages
npm audit
npm audit fix

# Dependencies outdatées
npm outdated
```

### Tests Manuels
```bash
# Test CORS
curl -H "Origin: https://malicious.com" \
  http://localhost:4000/api/health

# Test rate limiting
for i in {1..300}; do
  curl http://localhost:4000/api/health
done

# Test auth sans token
curl http://localhost:4000/api/users
```

---

## 📚 Ressources

### Standards & Best Practices
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

### Outils Recommandés
- **Secrets Scanning** : git-secrets, truffleHog
- **Dependency Checking** : npm audit, Snyk
- **SAST** : SonarQube, ESLint Security Plugin
- **Runtime Protection** : Sqreen, Snyk Runtime

---

## 📝 Historique des Incidents

### 2025-12-24 : Audit Initial
- **Problème** : Secrets committés dans le repository
- **Impact** : Exposition potentielle des clés Supabase et JWT
- **Action** : Redaction complète + rotation recommandée
- **Statut** : ✅ Corrigé (rotation en attente)

---

## ✅ Conformité

### RGPD / Privacy
- Données utilisateurs chiffrées en transit (HTTPS)
- Mots de passe hashés (bcrypt)
- Isolation multi-tenant stricte
- Logs ne contiennent pas de données sensibles

### SOC 2 Considerations
- Contrôle d'accès basé sur les rôles
- Audit logs disponibles
- Séparation des environnements (dev/prod)
- Sauvegarde et récupération

---

**Dernière mise à jour** : 24 décembre 2025  
**Version** : 1.0.0  
**Contact Sécurité** : [À définir]

