# 📜 Référence Complète des 41 Règles - Hearst Control V2.0

> **Document de référence** : Toutes les règles du projet avec exemples et explications  
> **Lecture obligatoire** avant toute modification du code

---

## 📑 Table des Matières

1. [Architecture (Règles 1-3)](#-1-règles-architecture)
2. [Base de Données (Règles 4-6)](#-2-règles-base-de-données)
3. [Authentification (Règles 7-10)](#-3-règles-dauthentification)
4. [Réutilisabilité (Règles 11-15)](#-4-règles-de-réutilisabilité)
5. [Création Projet (Règles 16-17)](#-5-règles-de-création-projet)
6. [Backend Central (Règles 18-22)](#-6-règles-backend-central)
7. [Documentation (Règles 23-24)](#-7-règles-de-documentation)
8. [Scripts (Règles 25-27)](#-8-règles-de-scripts)
9. [Tests (Règles 28-29)](#-9-règles-de-tests)
10. [Déploiement (Règles 30-31)](#-10-règles-de-déploiement)
11. [Performance (Règles 32-35)](#-11-règles-de-performance)
12. [Sécurité (Règles 36-41)](#-12-règles-de-sécurité)

---

## 🏗️ 1. RÈGLES ARCHITECTURE

### Règle #1 : Isolation du Code Métier

> **La plateforme centrale ne contient JAMAIS de code métier spécifique à un projet**

**Pourquoi :** Permet la réutilisabilité et évite les dépendances croisées

**✅ BON Exemple :**
```javascript
// core/auth/authService.js - Code générique réutilisable
exports.login = async (email, password, tenantId) => {
  // Logique d'authentification générique
  const user = await findUserByEmail(email);
  return generateToken(user);
};
```

**❌ MAUVAIS Exemple :**
```javascript
// core/auth/authService.js - NE JAMAIS FAIRE ÇA
exports.login = async (email, password) => {
  // ❌ Code spécifique Qatar dans core/
  if (email.includes('qatar')) {
    return handleQatarSpecificLogin(email);
  }
};
```

---

### Règle #2 : Isolation Complète des Projets

> **Chaque projet est totalement isolé et indépendant**

**Pourquoi :** Un problème dans un projet n'affecte pas les autres

**✅ BON :**
```
projects/
├── hearst-qatar/          ← Aucune dépendance vers autres projets
├── hearst-design/         ← Aucune dépendance vers autres projets
└── hearst-srq/            ← Aucune dépendance vers autres projets
```

**❌ MAUVAIS :**
```javascript
// projects/hearst-design/server.js
// ❌ NE JAMAIS importer depuis un autre projet
const { getResources } = require('../hearst-qatar/controllers/resources');
```

---

### Règle #3 : Code Commun dans Core

> **Le code commun réutilisable va dans `core/`**

**Pourquoi :** Évite la duplication, facilite la maintenance

**Structure obligatoire de core/ :**
```
core/
├── auth/authService.js           ← Authentification
├── middleware/authMiddleware.js  ← Middlewares
├── database/supabaseClient.js    ← Client DB
└── shared-utils/                 ← Utilitaires
    ├── logger.js
    └── validators.js
```

---

## 💾 2. RÈGLES BASE DE DONNÉES

### Règle #4 : Isolation des Données par Tenant

> **Un utilisateur ne voit JAMAIS les données d'un autre tenant**

**Pourquoi :** Sécurité et confidentialité des données

**✅ BON :**
```javascript
// Toujours filtrer par tenant_id
const getUsers = async (tenantId) => {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('tenant_id', tenantId);  // ✅ Filtrage obligatoire
  return data;
};
```

**❌ MAUVAIS :**
```javascript
// ❌ Pas de filtrage = fuite de données
const getUsers = async () => {
  const { data } = await supabase
    .from('users')
    .select('*');  // ❌ DANGEREUX - Retourne TOUS les users
  return data;
};
```

---

### Règle #5 : Super Admin Exception

> **Seul le `super_admin` peut voir tous les tenants**

**Implémentation :**
```javascript
exports.getAll = async (req, res) => {
  let query = supabase.from('users').select('*');
  
  // Super admin voit tout
  if (req.user.role !== 'super_admin') {
    query = query.eq('tenant_id', req.user.tenant_id);
  }
  
  const { data } = await query;
  res.json(data);
};
```

---

### Règle #6 : Filtrage SQL Systématique

> **Les requêtes SQL doivent TOUJOURS filtrer par `tenant_id`**

**Tables concernées :**
- `users` (tenant_id obligatoire)
- `projects` (tenant_id obligatoire)
- `user_project_access` (tenant_id obligatoire)
- `project_metrics` (tenant_id obligatoire)
- `global_alerts` (tenant_id obligatoire)

---

## 🔐 3. RÈGLES D'AUTHENTIFICATION

### Règle #7 : Tenant ID Obligatoire

> **Pas de tenant_id = pas d'accès**

**Payload JWT obligatoire :**
```json
{
  "id": "uuid-user",
  "email": "user@domain.com",
  "role": "admin",
  "tenant_id": "uuid-tenant"  // ← OBLIGATOIRE
}
```

**Vérification :**
```javascript
if (!req.user.tenant_id) {
  return res.status(403).json({ error: 'No tenant associated' });
}
```

---

### Règle #8 : Vérification Token Systématique

> **Le token doit être vérifié sur CHAQUE requête protégée**

**Middleware obligatoire :**
```javascript
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token required' });
  }
  
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

---

### Règle #9 : Hiérarchie des Rôles

> **Un rôle inférieur ne peut JAMAIS effectuer d'actions d'un rôle supérieur**

**Hiérarchie :**
```
1. super_admin  → Accès global (tous tenants)
2. admin        → Admin d'un tenant
3. manager      → Gestion opérationnelle
4. operator     → Opérations quotidiennes
5. viewer       → Lecture seule
```

**Vérification :**
```javascript
const ROLE_HIERARCHY = {
  super_admin: 5,
  admin: 4,
  manager: 3,
  operator: 2,
  viewer: 1
};

const requireRole = (minRole) => (req, res, next) => {
  if (ROLE_HIERARCHY[req.user.role] < ROLE_HIERARCHY[minRole]) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }
  next();
};
```

---

### Règle #10 : Double Vérification

> **Les permissions sont vérifiées au niveau middleware ET contrôleur**

**Pourquoi :** Défense en profondeur

```javascript
// 1. Middleware (première ligne de défense)
router.delete('/users/:id', requireRole('admin'), usersController.delete);

// 2. Controller (deuxième ligne de défense)
exports.delete = async (req, res) => {
  // Revérification dans le controller
  if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
    return res.status(403).json({ error: 'Admin required' });
  }
  // ... logique de suppression
};
```

---

## 🔄 4. RÈGLES DE RÉUTILISABILITÉ

### Règle #11 : Ne Jamais Réécrire l'Auth

> **NE JAMAIS réécrire l'authentification**

**✅ Utiliser :**
```javascript
const authService = require('../../../core/auth/authService');
const result = await authService.login(email, password);
```

**❌ Ne jamais :**
```javascript
// ❌ Créer sa propre auth dans un projet
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// ... réécrire toute la logique
```

---

### Règle #12 : Ne Jamais Recréer la Structure

> **NE JAMAIS recréer la structure de projet**

**✅ Utiliser :**
```bash
./scripts/deploy-project.sh nouveau-projet
```

**❌ Ne jamais :**
```bash
# ❌ Créer manuellement les dossiers
mkdir -p nouveau-projet/backend/controllers
mkdir -p nouveau-projet/frontend/src
# ... etc.
```

---

### Règle #13 : Toujours Utiliser les Scripts

> **TOUJOURS utiliser le script `create-new-project.sh` ou `deploy-project.sh`**

**Commandes autorisées :**
```bash
./scripts/deploy-project.sh <nom-projet>
./scripts/create-new-project.sh <nom-projet> "<Nom Affiché>"
```

---

### Règle #14 : Délai Maximum 6 Semaines

> **Nouveau projet = 3-6 semaines MAX (au lieu de 8-12)**

**Timeline standard :**
- Semaine 1-2 : Configuration + Adaptation DB
- Semaine 3-4 : Backend controllers
- Semaine 5-6 : Frontend + Tests + Déploiement

---

### Règle #15 : Économie 50-60% Minimum

> **Économie de 50-60% de temps MINIMUM**

**Ce qui est copié (0h de travail) :**
- Architecture MVC
- Authentification JWT
- Middlewares
- Scripts automation
- Structure frontend

**Ce qui est adapté (2-4 semaines) :**
- Schéma DB
- Controllers métier
- Composants UI
- Documentation

---

## 📊 5. RÈGLES DE CRÉATION PROJET

### Règle #16 : Supabase Dédié par Projet

> **Chaque nouveau projet DOIT avoir son propre Supabase**

**Pourquoi :** Isolation complète, sécurité, scalabilité

**Configuration :**
```bash
# .env du projet
SUPABASE_URL=https://xxx-projet-specifique.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...
```

---

### Règle #17 : Isolation Données Complète

> **Isolation complète des données entre projets**

**Vérification :**
- Chaque projet a son propre `SUPABASE_URL`
- Aucun partage de credentials entre projets
- Schémas SQL indépendants

---

## 🖥️ 6. RÈGLES BACKEND CENTRAL

### Règle #18 : Point d'Entrée Unique Auth

> **UN SEUL point d'entrée pour l'authentification**

**Route :**
```
POST http://localhost:4000/api/auth/login
```

**Tous les projets utilisent ce endpoint pour s'authentifier.**

---

### Règle #19 : Passage par Backend Central

> **TOUS les projets passent par le backend central**

**Routes proxy :**
```javascript
// backend-central/server.js
app.use('/api/qatar', proxy('http://localhost:3001'));
app.use('/api/design', proxy('http://localhost:3002'));
app.use('/api/srq', proxy('http://localhost:3003'));
```

---

### Règle #20 : Pas de Logique Métier dans Routes

> **JAMAIS de logique métier dans les routes**

**✅ BON :**
```javascript
// routes/users.js
router.get('/', usersController.getAll);
router.post('/', usersController.create);
```

**❌ MAUVAIS :**
```javascript
// routes/users.js
router.get('/', async (req, res) => {
  // ❌ Logique métier directement dans la route
  const users = await supabase.from('users').select('*');
  res.json(users);
});
```

---

### Règle #21 : Validation des Inputs

> **TOUJOURS valider les inputs**

```javascript
const { isValidEmail, isValidPassword } = require('../../core/shared-utils/validators');

exports.create = async (req, res) => {
  const { email, password, name } = req.body;
  
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  if (!isValidPassword(password)) {
    return res.status(400).json({ error: 'Password too weak' });
  }
  
  // ... suite de la logique
};
```

---

### Règle #22 : Gestion des Erreurs

> **TOUJOURS gérer les erreurs avec try/catch**

```javascript
exports.getAll = async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    
    if (error) throw error;
    
    res.json({ users: data });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
```

---

## 📁 7. RÈGLES DE DOCUMENTATION

### Règle #23 : Documentation Auto-Générée

> **Documentation générée AUTOMATIQUEMENT lors de la création**

**Fichiers générés par `deploy-project.sh` :**
- `README.md`
- `TODO_SETUP.md`
- `PROJECT_CONFIG.json`

---

### Règle #24 : Mise à Jour Continue

> **Documentation mise à jour à CHAQUE changement majeur**

**Quand mettre à jour :**
- Nouvelle fonctionnalité → README.md
- Nouvelle API → API_DOCUMENTATION.md
- Changement architecture → ARCHITECTURE.md
- Nouvelle règle → docs/ESSENTIELS/RULES_REFERENCE.md

---

## 🔧 8. RÈGLES DE SCRIPTS

### Règle #25 : Scripts Idempotents

> **Les scripts DOIVENT être idempotents (réexécutables)**

**Exemple :**
```bash
#!/bin/bash
# ✅ Vérifie si déjà fait avant de faire
if [ ! -d "node_modules" ]; then
  npm install
fi

# ✅ Vérifie si le processus existe déjà
if ! lsof -i:4000 > /dev/null; then
  npm start &
fi
```

---

### Règle #26 : Vérification Prérequis

> **TOUJOURS vérifier les prérequis avant exécution**

```bash
#!/bin/bash
# Vérifier Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js n'est pas installé"
  exit 1
fi

# Vérifier npm
if ! command -v npm &> /dev/null; then
  echo "❌ npm n'est pas installé"
  exit 1
fi

echo "✅ Prérequis OK"
```

---

### Règle #27 : Messages Clairs

> **TOUJOURS afficher des messages clairs (succès/erreur)**

```bash
#!/bin/bash
echo "🚀 Démarrage des services..."

if npm start; then
  echo "✅ Backend démarré avec succès sur port 4000"
else
  echo "❌ Erreur au démarrage du backend"
  exit 1
fi
```

---

## 🧪 9. RÈGLES DE TESTS

### Règle #28 : Tests Avant Commit

> **Les tests DOIVENT passer avant chaque commit**

```bash
# Pre-commit hook
npm test || exit 1
```

---

### Règle #29 : CI/CD Bloquant

> **CI/CD DOIT bloquer si tests échouent**

```yaml
# .github/workflows/test.yml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm test
        # Si échec, le pipeline s'arrête
```

---

## 🚀 10. RÈGLES DE DÉPLOIEMENT

### Règle #30 : Pas de Secrets en Dur

> **JAMAIS de secrets en dur dans le code**

**❌ MAUVAIS :**
```javascript
const JWT_SECRET = 'mon-secret-super-secret';
```

**✅ BON :**
```javascript
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET required');
```

---

### Règle #31 : Variables d'Environnement

> **TOUJOURS utiliser des variables d'environnement**

**Variables obligatoires :**
```bash
NODE_ENV=production
PORT=4000
JWT_SECRET=<secret-fort-64-chars-minimum>
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=eyJ...
SUPABASE_ANON_KEY=eyJ...
```

---

## 📈 11. RÈGLES DE PERFORMANCE

### Règle #32 : Scalabilité Horizontale

> **Chaque projet DOIT être scalable horizontalement**

**Implications :**
- Pas d'état en mémoire
- Sessions stateless (JWT)
- Préparé pour load balancing

---

### Règle #33 : Index sur Tenant ID

> **Base de données DOIT avoir des indexes sur `tenant_id`**

```sql
CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_projects_tenant ON projects(tenant_id);
CREATE INDEX idx_access_tenant ON user_project_access(tenant_id);
```

---

### Règle #34 : Support Load Balancing

> **API Gateway DOIT supporter le load balancing**

---

### Règle #35 : Caching Données Fréquentes

> **Caching DOIT être implémenté pour les données fréquentes**

---

## 🔒 12. RÈGLES DE SÉCURITÉ

### Règle #36 : Hashage Bcrypt

> **Mots de passe DOIVENT être hashés avec bcrypt (min 10 rounds)**

```javascript
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
```

---

### Règle #37 : Expiration JWT

> **Tokens JWT DOIVENT expirer (24h max)**

```javascript
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
```

---

### Règle #38 : CORS Strict

> **CORS DOIT être configuré strictement**

```javascript
const corsOptions = {
  origin: process.env.CORS_ORIGIN.split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};
app.use(cors(corsOptions));
```

---

### Règle #39 : Rate Limiting

> **Rate limiting DOIT être activé**

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // max 100 requêtes par fenêtre
});

app.use('/api/', limiter);
```

---

### Règle #40 : HTTPS Obligatoire

> **HTTPS OBLIGATOIRE en production**

```javascript
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
  });
}
```

---

### Règle #41 : Audit Logs

> **Audit logs DOIVENT tracer toutes actions sensibles**

```javascript
const logAudit = async (userId, action, details) => {
  await supabase.from('audit_log').insert({
    user_id: userId,
    action: action,
    details: details,
    timestamp: new Date().toISOString()
  });
};

// Utilisation
await logAudit(req.user.id, 'USER_DELETED', { targetUserId: id });
```

---

## 📋 Résumé par Catégorie

| Catégorie | Règles | Description |
|-----------|--------|-------------|
| Architecture | #1-3 | Isolation et structure |
| Base de Données | #4-6 | Multi-tenant et sécurité |
| Authentification | #7-10 | JWT et permissions |
| Réutilisabilité | #11-15 | Économie de temps |
| Création Projet | #16-17 | Isolation données |
| Backend Central | #18-22 | API Gateway |
| Documentation | #23-24 | Mise à jour continue |
| Scripts | #25-27 | Automatisation |
| Tests | #28-29 | Qualité code |
| Déploiement | #30-31 | Configuration |
| Performance | #32-35 | Scalabilité |
| Sécurité | #36-41 | Protection |

---

## ✅ Checklist Vérification

Avant de soumettre du code, vérifier :

- [ ] Pas de code métier dans core/ (Règle #1)
- [ ] Pas de dépendances entre projets (Règle #2)
- [ ] Filtrage tenant_id présent (Règle #4)
- [ ] Validation des inputs (Règle #21)
- [ ] Try/catch sur toutes les opérations async (Règle #22)
- [ ] Pas de secrets en dur (Règle #30)
- [ ] Tests passent (Règle #28)

---

**Hearst Control V2.0** | 41 Règles Fondamentales | Décembre 2025

