# 🔒 Politique de Sécurité — Hearst Design

## 📋 Versions Supportées

| Version | Support Sécurité | Status |
|---------|-----------------|--------|
| 1.0.x   | ✅ Support Complet | Active |
| < 1.0   | ❌ Non Supporté | Deprecated |

---

## 🐛 Signaler une Vulnérabilité

### ⚠️ Important : NE PAS créer d'issue publique

Si vous découvrez une vulnérabilité de sécurité, **ne la divulguez pas publiquement**.

### 📧 Processus de Signalement

1. **Email sécurisé** : Envoyez un email détaillé à :
   - **Email** : security@hearst-design.com (si applicable)
   - **Ou** : Créer une GitHub Security Advisory (privée)

2. **Informations à Inclure** :
   ```
   - Description de la vulnérabilité
   - Étapes pour reproduire
   - Impact potentiel
   - Versions affectées
   - Suggestions de correction (si disponibles)
   - Votre nom/pseudo pour crédit (optionnel)
   ```

3. **Délai de Réponse** :
   - Accusé de réception : **48 heures**
   - Analyse initiale : **5-7 jours**
   - Correctif : **30 jours** (selon gravité)

---

## 🎯 Scope de Sécurité

### ✅ Dans le Scope

| Composant | Description | Priorité |
|-----------|-------------|----------|
| Backend API | Express.js endpoints, authentification | 🔴 Critique |
| Frontend | Next.js application, gestion des sessions | 🟡 Élevée |
| Theme Builder | Interface web standalone | 🟢 Modérée |
| Authentification | JWT, Supabase Auth | 🔴 Critique |
| Base de données | Supabase, requêtes SQL | 🔴 Critique |

### ❌ Hors Scope

- Attaques DDoS sur infrastructure cloud
- Vulnérabilités dans dépendances tierces (signaler directement au projet concerné)
- Social engineering
- Attaques physiques

---

## 🔐 Mesures de Sécurité Implémentées

### 1. Authentification & Autorisation

- ✅ **JWT Tokens** : Avec expiration et refresh
- ✅ **Supabase Auth** : Authentification sécurisée
- ✅ **RBAC** : Role-Based Access Control (`super_admin`, `admin`, `user`)
- ✅ **Password Hashing** : bcrypt avec salt
- ✅ **Session Management** : Tokens avec TTL

### 2. Protection API

- ✅ **Rate Limiting** : Prévention brute-force
- ✅ **CORS Configuration** : Origins autorisées uniquement
- ✅ **Input Validation** : Validation de toutes les entrées
- ✅ **SQL Injection Protection** : Requêtes préparées
- ✅ **XSS Protection** : Sanitization des inputs

### 3. Sécurité Frontend

- ✅ **CSP Headers** : Content Security Policy
- ✅ **HTTPOnly Cookies** : Protection contre XSS
- ✅ **SameSite Cookies** : Protection CSRF
- ✅ **HTTPS Only** : En production
- ✅ **Secure Headers** : Helmet.js

### 4. Gestion des Secrets

- ✅ **Variables d'Environnement** : Pas de secrets hardcodés
- ✅ **`.gitignore`** : Exclusion des fichiers sensibles
- ✅ **Supabase Service Keys** : Stockage sécurisé
- ✅ **JWT Secrets** : Rotation régulière recommandée

### 5. Dépendances

- ✅ **npm audit** : Scan régulier des vulnérabilités
- ✅ **Dependabot** : Mises à jour automatiques
- ✅ **Package Lock** : Versions fixes en production
- ✅ **Security Updates** : Application rapide

---

## 📊 Niveaux de Gravité

### 🔴 Critique (P0)

- RCE (Remote Code Execution)
- SQL Injection
- Authentication Bypass
- Data Breach
- **Délai de correctif** : 24-48 heures

### 🟠 Élevée (P1)

- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- Privilege Escalation
- Information Disclosure
- **Délai de correctif** : 7 jours

### 🟡 Modérée (P2)

- IDOR (Insecure Direct Object Reference)
- Missing Security Headers
- Weak Password Policy
- Rate Limiting Issues
- **Délai de correctif** : 30 jours

### 🟢 Faible (P3)

- Information Leakage
- Missing Best Practices
- UI Security Issues
- **Délai de correctif** : 90 jours

---

## 🛡️ Best Practices pour Développeurs

### Configuration Backend

```javascript
// ✅ BON : Variables d'environnement
const JWT_SECRET = process.env.JWT_SECRET;

// ❌ MAUVAIS : Secret hardcodé
const JWT_SECRET = "my-super-secret-key";
```

### Validation des Entrées

```javascript
// ✅ BON : Validation stricte
const { error, value } = userSchema.validate(req.body);
if (error) {
  return res.status(400).json({ error: error.details[0].message });
}

// ❌ MAUVAIS : Pas de validation
const user = await db.users.create(req.body);
```

### Requêtes Sécurisées

```javascript
// ✅ BON : Requête préparée
const user = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
  .single();

// ❌ MAUVAIS : Concaténation SQL
const query = `SELECT * FROM users WHERE id = ${userId}`;
```

### Gestion des Erreurs

```javascript
// ✅ BON : Message générique
catch (error) {
  logger.error('Database error:', error);
  return res.status(500).json({ error: 'Internal server error' });
}

// ❌ MAUVAIS : Exposition détails
catch (error) {
  return res.status(500).json({ error: error.stack });
}
```

---

## 🔍 Audit de Sécurité

### Automatique

```bash
# Backend
cd backend
npm audit
npm audit fix

# Frontend
cd frontend
npm audit
npm audit fix
```

### Manuel

1. **Code Review** : Sur toutes les PRs sensibles
2. **Penetration Testing** : Annuel
3. **Dependency Audit** : Mensuel
4. **Security Headers Check** : https://securityheaders.com/

---

## 📚 Ressources Sécurité

### Standards & Frameworks

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

### Tools

- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Snyk](https://snyk.io/)
- [OWASP ZAP](https://www.zaproxy.org/)
- [Burp Suite](https://portswigger.net/burp)

---

## 🏆 Hall of Fame

Nous remercions les chercheurs en sécurité suivants pour leurs contributions :

| Nom | Vulnérabilité | Gravité | Date |
|-----|---------------|---------|------|
| [À venir] | - | - | - |

---

## 📝 Changelog Sécurité

### 2025-12-24 (v1.0.0)

- ✅ Implémentation JWT avec refresh tokens
- ✅ Rate limiting sur endpoints sensibles
- ✅ CORS configuration stricte
- ✅ Input validation avec Joi
- ✅ Security headers (Helmet.js)
- ✅ SQL injection protection (Supabase)

---

## ⚖️ Politique de Divulgation

1. **Découverte** : Signalement à l'équipe sécurité
2. **Verification** : Confirmation de la vulnérabilité (5-7 jours)
3. **Développement** : Création du correctif (selon gravité)
4. **Testing** : Tests du correctif
5. **Déploiement** : Release du patch
6. **Divulgation** : Publication advisory après 90 jours
7. **Crédit** : Mention du découvreur (avec accord)

---

## 📞 Contact

- **Email Sécurité** : security@hearst-design.com
- **GitHub Security Advisories** : https://github.com/adrien-debug/Hearst-Design/security/advisories
- **PGP Key** : [Si applicable]

---

**Hearst Design** | Politique de Sécurité  
**Version** : 1.0.0  
**Dernière mise à jour** : 24 décembre 2025

---

*"Security is not a product, but a process."* — Bruce Schneier

