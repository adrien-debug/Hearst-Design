# Guide d'implémentation Multi-Tenant - Hearst Control

## 📋 Vue d'ensemble

Ce guide explique comment transformer votre système Hearst Control en plateforme SaaS multi-tenant B2B où chaque utilisateur appartient à un tenant (organisation) et où toutes les données sont isolées par tenant.

### Architecture choisie (simplicité maximale)

- **Auth** : Conservation de l'auth actuelle (JWT maison + bcrypt)
- **Source of truth** : `users.tenant_id` (un user = un tenant)
- **Isolation** : Filtrage applicatif côté backend via `.eq('tenant_id', ...)`
- **Super admin** : Le rôle `super_admin` peut voir tous les tenants
- **Emails** : Restent globalement uniques (un email ne peut exister dans 2 tenants)

---

## 🚀 Étape 1 : Migration de la base de données

### 1.1 Exécuter la migration SQL

Le fichier `database/multi-tenant-migration.sql` contient toutes les migrations nécessaires.

**Dans Supabase Dashboard** :
1. Aller dans **SQL Editor**
2. Créer une nouvelle query
3. Copier-coller le contenu de `database/multi-tenant-migration.sql`
4. **Exécuter sections 1-3 uniquement** (création tables + backfill)

```sql
-- Sections à exécuter en premier :
-- 1) Création table tenants
-- 2) Ajout colonnes tenant_id
-- 3) Backfill données existantes (tenant "hearst")
```

### 1.2 Vérifications post-migration

```sql
-- Vérifier qu'il y a bien un tenant "hearst"
SELECT * FROM public.tenants;

-- Vérifier qu'il n'y a plus de NULL
SELECT COUNT(*) as users_sans_tenant FROM public.users WHERE tenant_id IS NULL;
SELECT COUNT(*) as projects_sans_tenant FROM public.projects WHERE tenant_id IS NULL;

-- Voir la répartition
SELECT 
  t.slug, 
  t.name,
  COUNT(DISTINCT u.id) as nb_users,
  COUNT(DISTINCT p.id) as nb_projects
FROM public.tenants t
LEFT JOIN public.users u ON u.tenant_id = t.id
LEFT JOIN public.projects p ON p.tenant_id = t.id
GROUP BY t.id, t.slug, t.name;
```

**Résultat attendu** :
- 1 tenant "hearst" créé
- Tous les users/projects existants associés à ce tenant
- Aucun NULL dans tenant_id

### 1.3 Verrouillage NOT NULL (optionnel - après tests)

Une fois que tout fonctionne bien, décommenter et exécuter la section 4 :

```sql
ALTER TABLE public.users ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.projects ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.user_project_access ALTER COLUMN tenant_id SET NOT NULL;
```

---

## 🧪 Étape 2 : Tests des fonctionnalités

### 2.1 Test Bootstrap (création tenant)

**Créer un nouveau tenant "ACME Mining"** :

```bash
curl -s -X POST http://localhost:4000/api/auth/bootstrap \
  -H "Content-Type: application/json" \
  -d '{
    "tenant": {
      "name": "ACME Mining",
      "slug": "acme"
    },
    "user": {
      "name": "Alice Admin",
      "email": "alice@acme.com",
      "password": "Secret123!"
    }
  }'
```

**Résultat attendu** :
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "alice@acme.com",
    "name": "Alice Admin",
    "role": "admin",
    "tenant_id": "..."
  },
  "tenant": {
    "id": "...",
    "slug": "acme",
    "name": "ACME Mining",
    "status": "active"
  }
}
```

**Vérifications** :
- ✅ Code 201
- ✅ Token JWT présent
- ✅ user.tenant_id non null
- ✅ tenant.slug == "acme"

### 2.2 Test Login avec tenant

**Login Alice (tenant ACME)** :

```bash
curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@acme.com",
    "password": "Secret123!"
  }'
```

**Vérifier le JWT** :

```bash
# Décoder le JWT (sur jwt.io ou avec un outil)
# Le payload doit contenir : tenant_id
```

**Résultat attendu dans le payload JWT** :
```json
{
  "id": "...",
  "email": "alice@acme.com",
  "role": "admin",
  "tenant_id": "...",  // ← IMPORTANT
  "projects": []
}
```

### 2.3 Test isolation tenant (scope users)

**Avec token d'Alice (ACME), lister les users** :

```bash
TOKEN_ACME="..." # Token d'Alice

curl -s http://localhost:4000/api/users \
  -H "Authorization: Bearer $TOKEN_ACME"
```

**Résultat attendu** :
```json
{
  "users": [
    {
      "id": "...",
      "email": "alice@acme.com",
      "name": "Alice Admin",
      "role": "admin",
      "tenant_id": "..." // Seulement les users du tenant ACME
    }
  ]
}
```

### 2.4 Test isolation tenant (scope projects)

**Créer un projet dans le tenant ACME** :

```bash
curl -s -X POST http://localhost:4000/api/projects \
  -H "Authorization: Bearer $TOKEN_ACME" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "ACME-001",
    "name": "ACME Site Qatar",
    "status": "active",
    "location": "Qatar"
  }'
```

**Lister les projets** :

```bash
curl -s http://localhost:4000/api/projects \
  -H "Authorization: Bearer $TOKEN_ACME"
```

**Résultat attendu** :
- Le projet ACME-001 apparaît
- Les projets du tenant "hearst" n'apparaissent PAS

### 2.5 Test cross-tenant (vérifier l'isolation)

**Créer un 2e tenant "BitMine Corp"** :

```bash
curl -s -X POST http://localhost:4000/api/auth/bootstrap \
  -H "Content-Type: application/json" \
  -d '{
    "tenant": {
      "name": "BitMine Corp",
      "slug": "bitmine"
    },
    "user": {
      "name": "Bob Manager",
      "email": "bob@bitmine.com",
      "password": "Secret456!"
    }
  }'
```

**Login Bob** :

```bash
TOKEN_BITMINE=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"bob@bitmine.com","password":"Secret456!"}' \
  | jq -r '.token')
```

**Avec le token de Bob, lister les projets** :

```bash
curl -s http://localhost:4000/api/projects \
  -H "Authorization: Bearer $TOKEN_BITMINE"
```

**Résultat attendu** :
```json
{
  "projects": [] // Vide - Bob ne voit PAS les projets d'ACME
}
```

**Tenter d'accéder au projet d'ACME** :

```bash
curl -s http://localhost:4000/api/projects/ACME-001 \
  -H "Authorization: Bearer $TOKEN_BITMINE"
```

**Résultat attendu** :
```json
{
  "error": "Project not found or access denied"
}
```

✅ **L'isolation fonctionne** : Bob ne peut pas voir les projets d'ACME !

### 2.6 Test super_admin (accès global)

Si vous avez un super_admin dans la base :

```bash
# Login super_admin
TOKEN_SUPER=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"super@hearst.com","password":"..."}' \
  | jq -r '.token')

# Lister TOUS les projets
curl -s http://localhost:4000/api/projects \
  -H "Authorization: Bearer $TOKEN_SUPER"
```

**Résultat attendu** :
- Le super_admin voit les projets de TOUS les tenants (hearst, acme, bitmine)

---

## ✅ Critères d'acceptation

### CA1 : Bootstrap crée un tenant + user admin

```bash
# Test
curl -X POST http://localhost:4000/api/auth/bootstrap \
  -H "Content-Type: application/json" \
  -d '{"tenant":{"name":"Test Corp","slug":"test"},"user":{"name":"Test","email":"test@test.com","password":"Test1234"}}'

# Vérifier en DB
SELECT * FROM tenants WHERE slug = 'test';
SELECT * FROM users WHERE email = 'test@test.com';
```

✅ Tenant créé
✅ User admin créé avec tenant_id

### CA2 : Login renvoie JWT avec tenant_id

```bash
# Test
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@acme.com","password":"Secret123!"}'

# Décoder le JWT (jwt.io)
```

✅ Payload contient `tenant_id`

### CA3 : Routes tenant-scopées

```bash
# Non super_admin : ne voit que son tenant
curl http://localhost:4000/api/users -H "Authorization: Bearer $TOKEN_ALICE"
curl http://localhost:4000/api/projects -H "Authorization: Bearer $TOKEN_ALICE"
curl http://localhost:4000/api/dashboard/overview -H "Authorization: Bearer $TOKEN_ALICE"
```

✅ Seulement les données du tenant retournées

### CA4 : Super_admin voit tout

```bash
# Super_admin : voit tous les tenants
curl http://localhost:4000/api/users -H "Authorization: Bearer $TOKEN_SUPER"
```

✅ Tous les users de tous les tenants retournés

### CA5 : Aucune fuite cross-tenant

```bash
# Bob (bitmine) tente d'accéder au projet ACME-001
curl http://localhost:4000/api/projects/ACME-001 \
  -H "Authorization: Bearer $TOKEN_BOB"
```

✅ Erreur 404 ou 403

---

## 📝 Scénarios de test complets

### Scénario 1 : Onboarding d'un nouveau client

```bash
# 1. Le client s'inscrit (self-serve)
RESULT=$(curl -s -X POST http://localhost:4000/api/auth/bootstrap \
  -H "Content-Type: application/json" \
  -d '{
    "tenant": {"name": "NewCo", "slug": "newco"},
    "user": {"name": "CEO", "email": "ceo@newco.com", "password": "NewCo123!"}
  }')

TOKEN=$(echo $RESULT | jq -r '.token')
TENANT_ID=$(echo $RESULT | jq -r '.tenant.id')

echo "✅ Tenant créé : $TENANT_ID"

# 2. Le CEO crée son premier projet
curl -s -X POST http://localhost:4000/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "NEWCO-001",
    "name": "NewCo Mine Alpha",
    "status": "planning"
  }'

echo "✅ Projet créé"

# 3. Le CEO invite un manager
curl -s -X POST http://localhost:4000/api/users \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Manager",
    "email": "manager@newco.com",
    "password": "Manager123!",
    "role": "user"
  }'

echo "✅ Manager invité"

# 4. Vérifier l'isolation
curl -s http://localhost:4000/api/users \
  -H "Authorization: Bearer $TOKEN" | jq '.users | length'

# Doit afficher 2 (CEO + Manager, pas les autres tenants)
```

### Scénario 2 : Super admin surveille la plateforme

```bash
# 1. Login super admin
TOKEN_SUPER=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"super@hearst.com","password":"..."}' \
  | jq -r '.token')

# 2. Voir tous les tenants (via users)
curl -s http://localhost:4000/api/users \
  -H "Authorization: Bearer $TOKEN_SUPER" \
  | jq '.users | group_by(.tenant_id) | length'

echo "Nombre de tenants actifs"

# 3. Voir tous les projets de tous les tenants
curl -s http://localhost:4000/api/projects \
  -H "Authorization: Bearer $TOKEN_SUPER" \
  | jq '.projects | length'
```

---

## 🔧 Dépannage

### Problème : "No tenant associated with user"

**Cause** : L'utilisateur n'a pas de tenant_id dans son JWT ou en DB.

**Solution** :
```sql
-- Vérifier l'utilisateur
SELECT id, email, tenant_id FROM users WHERE email = 'user@example.com';

-- Assigner au tenant hearst si nécessaire
UPDATE users 
SET tenant_id = (SELECT id FROM tenants WHERE slug = 'hearst')
WHERE email = 'user@example.com';
```

Puis **re-login** pour obtenir un nouveau JWT.

### Problème : Bootstrap échoue avec "Tenant slug already exists"

**Cause** : Le slug est déjà pris.

**Solution** : Utiliser un slug différent ou supprimer le tenant existant :
```sql
DELETE FROM tenants WHERE slug = 'acme';
```

### Problème : Les projets n'ont pas de tenant_id

**Cause** : Backfill n'a pas été exécuté.

**Solution** :
```sql
-- Assigner tous les projets orphelins au tenant hearst
UPDATE projects 
SET tenant_id = (SELECT id FROM tenants WHERE slug = 'hearst')
WHERE tenant_id IS NULL;
```

### Problème : Super admin ne voit qu'un seul tenant

**Cause** : Le rôle n'est pas exactement 'super_admin'.

**Solution** :
```sql
-- Vérifier le rôle
SELECT email, role FROM users WHERE email = 'super@hearst.com';

-- Corriger si nécessaire
UPDATE users SET role = 'super_admin' WHERE email = 'super@hearst.com';
```

---

## 🔒 Sécurité et bonnes pratiques

### 1. Validation du slug tenant

Le slug doit :
- Être lowercase
- Contenir uniquement [a-z0-9-]
- Faire 3-30 caractères
- Être unique globalement

✅ **Implémenté dans** `authController.bootstrapTenant`

### 2. Email unique global

Un email ne peut exister que dans un seul tenant.

**Avantage** : Évite les confusions et conflits d'identité.
**Inconvénient** : Un même email ne peut pas appartenir à 2 tenants.

Si besoin de changer, il faut modifier la contrainte UNIQUE en `UNIQUE (email, tenant_id)`.

### 3. Filtrage systématique

**TOUTES** les requêtes doivent filtrer par `tenant_id` sauf pour `super_admin`.

✅ **Implémenté dans** :
- `usersController.js`
- `projectsController.js`
- `dashboardController.js`

### 4. Dénormalisation tenant_id

La colonne `tenant_id` est ajoutée sur `user_project_access` pour accélérer les requêtes.

**Cohérence** : Lors de l'insertion, toujours copier le `tenant_id` du user/project.

---

## 📊 Monitoring et observabilité

### Requêtes utiles

```sql
-- Nombre d'utilisateurs par tenant
SELECT 
  t.name,
  COUNT(u.id) as nb_users
FROM tenants t
LEFT JOIN users u ON u.tenant_id = t.id
GROUP BY t.id, t.name
ORDER BY nb_users DESC;

-- Nombre de projets par tenant
SELECT 
  t.name,
  COUNT(p.id) as nb_projects
FROM tenants t
LEFT JOIN projects p ON p.tenant_id = t.id
GROUP BY t.id, t.name
ORDER BY nb_projects DESC;

-- Tenants actifs vs suspendus
SELECT status, COUNT(*) FROM tenants GROUP BY status;

-- Activité par tenant (dernière connexion)
SELECT 
  t.name,
  MAX(u.last_login) as derniere_connexion
FROM tenants t
LEFT JOIN users u ON u.tenant_id = t.id
GROUP BY t.id, t.name
ORDER BY derniere_connexion DESC;
```

---

## 🚀 Prochaines étapes (optionnel)

### 1. RLS (Row Level Security) Supabase

Pour renforcer la sécurité au niveau DB :

```sql
-- Activer RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy : users peuvent voir leur tenant
CREATE POLICY tenant_isolation_users ON users
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);
```

**Note** : Nécessite de passer par `SUPABASE_ANON_KEY` et d'injecter le `tenant_id` via `set_config()`.

### 2. Colonnes tenant_id sur tables annexes

Ajouter `tenant_id` sur :
- `project_metrics`
- `global_alerts`
- `global_metrics` (ou renommer en `tenant_metrics`)

### 3. Facturation et quotas

Ajouter sur la table `tenants` :
```sql
ALTER TABLE tenants
  ADD COLUMN plan TEXT DEFAULT 'free',
  ADD COLUMN max_projects INTEGER DEFAULT 3,
  ADD COLUMN max_users INTEGER DEFAULT 5;
```

### 4. Audit log par tenant

Créer une table `audit_logs` :
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id),
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 📚 Références

- **Architecture** : `docs/architecture/ARCHITECTURE_GLOBALE.md`
- **Migration SQL** : `database/multi-tenant-migration.sql`
- **Auth Service** : `core/auth/authService.js`
- **Controllers** : `backend-central/controllers/`

---

## 💡 Résumé des modifications

### Fichiers créés
1. `database/multi-tenant-migration.sql` - Migration SQL complète

### Fichiers modifiés
1. `core/auth/authService.js` - JWT avec tenant_id
2. `backend-central/controllers/authController.js` - Ajout bootstrapTenant
3. `backend-central/routes/auth.js` - Route /bootstrap
4. `backend-central/controllers/usersController.js` - Scope tenant
5. `backend-central/controllers/projectsController.js` - Scope tenant
6. `backend-central/controllers/dashboardController.js` - Scope tenant

### Nouvelles routes
- `POST /api/auth/bootstrap` - Création tenant + user admin

### Nouveaux champs JWT
- `tenant_id` - UUID du tenant de l'utilisateur

---

**🎉 Félicitations ! Votre système est maintenant multi-tenant !**

Pour toute question ou problème, consultez la section Dépannage ou créez une issue.

