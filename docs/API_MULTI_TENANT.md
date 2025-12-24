# API Multi-Tenant - Référence rapide

## Nouveaux endpoints

### POST /api/auth/bootstrap

**Description** : Onboarding self-serve - crée un tenant + user admin en une seule requête.

**Auth** : Public (pas de token requis)

**Body** :
```json
{
  "tenant": {
    "name": "ACME Mining",
    "slug": "acme"
  },
  "user": {
    "name": "Alice Admin",
    "email": "alice@acme.com",
    "password": "Secret123!"
  }
}
```

**Validation** :
- `tenant.slug` : lowercase, [a-z0-9-], 3-30 chars, unique
- `user.email` : format email valide, unique globalement
- `user.password` : minimum 8 caractères

**Réponse 201** :
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "alice@acme.com",
    "name": "Alice Admin",
    "role": "admin",
    "tenant_id": "uuid",
    "is_active": true,
    "created_at": "2024-01-01T00:00:00Z"
  },
  "tenant": {
    "id": "uuid",
    "slug": "acme",
    "name": "ACME Mining",
    "status": "active",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

**Erreurs** :
- `400` : Validation échouée (slug invalide, password trop court, etc.)
- `409` : Slug ou email déjà existant
- `500` : Erreur serveur

**Exemple curl** :
```bash
curl -X POST http://localhost:4000/api/auth/bootstrap \
  -H "Content-Type: application/json" \
  -d '{
    "tenant": {"name": "ACME Mining", "slug": "acme"},
    "user": {"name": "Alice", "email": "alice@acme.com", "password": "Secret123!"}
  }'
```

---

## Endpoints modifiés (avec scope tenant)

### POST /api/auth/login

**Modification** : Le JWT retourné contient maintenant `tenant_id`

**Payload JWT avant** :
```json
{
  "id": "uuid",
  "email": "alice@acme.com",
  "role": "admin",
  "projects": []
}
```

**Payload JWT après (multi-tenant)** :
```json
{
  "id": "uuid",
  "email": "alice@acme.com",
  "role": "admin",
  "tenant_id": "uuid",  // ← NOUVEAU
  "projects": []
}
```

---

### GET /api/users

**Comportement avant** : Retourne tous les users

**Comportement après (multi-tenant)** :
- **Non super_admin** : Retourne seulement les users de son tenant
- **Super_admin** : Retourne tous les users de tous les tenants

**Exemple** :
```bash
# Alice (tenant ACME) ne voit que les users ACME
curl http://localhost:4000/api/users -H "Authorization: Bearer $TOKEN_ALICE"

# Super admin voit tous les users
curl http://localhost:4000/api/users -H "Authorization: Bearer $TOKEN_SUPER"
```

---

### POST /api/users

**Modification** : Force `tenant_id` selon le contexte

**Body** :
```json
{
  "name": "Bob Worker",
  "email": "bob@acme.com",
  "password": "Secret123!",
  "role": "user"
  // tenant_id non nécessaire (automatiquement assigné)
}
```

**Comportement** :
- **Non super_admin** : `tenant_id` forcé à celui du user créateur
- **Super_admin** : Peut spécifier `tenant_id` explicitement (optionnel)

---

### GET /api/projects

**Comportement après (multi-tenant)** :
- **Non super_admin** : Retourne seulement les projets de son tenant
- **Super_admin** : Retourne tous les projets de tous les tenants

---

### POST /api/projects

**Modification** : Force `tenant_id` selon le contexte

**Body** :
```json
{
  "id": "ACME-001",
  "name": "ACME Qatar Site",
  "status": "active",
  "location": "Qatar"
  // tenant_id non nécessaire (automatiquement assigné)
}
```

**Comportement** :
- **Non super_admin** : `tenant_id` forcé à celui du user créateur
- **Super_admin** : Peut spécifier `tenant_id` explicitement (obligatoire)

---

### GET /api/dashboard/overview

**Comportement après (multi-tenant)** :
- **Non super_admin** : Overview calculé depuis les projets de son tenant
- **Super_admin** : Overview global depuis la vue `global_overview`

---

### GET /api/dashboard/projects-metrics

**Comportement après (multi-tenant)** :
- **Non super_admin** : Métriques des projets de son tenant uniquement
- **Super_admin** : Métriques de tous les projets

---

### GET /api/dashboard/realtime-stats

**Comportement après (multi-tenant)** :
- **Non super_admin** : Stats des projets actifs de son tenant
- **Super_admin** : Stats de tous les projets actifs

---

## Matrice de permissions

| Endpoint | User | Admin | Super Admin |
|----------|------|-------|-------------|
| `POST /api/auth/bootstrap` | Public | Public | Public |
| `POST /api/auth/login` | Public | Public | Public |
| `GET /api/users` | ❌ Son profil uniquement | ✅ Tenant scope | ✅ Global |
| `POST /api/users` | ❌ | ✅ Tenant scope | ✅ Global + spécifier tenant |
| `GET /api/projects` | ✅ Tenant scope | ✅ Tenant scope | ✅ Global |
| `POST /api/projects` | ❌ | ✅ Tenant scope | ✅ Global + spécifier tenant |
| `GET /api/dashboard/*` | ✅ Tenant scope | ✅ Tenant scope | ✅ Global |

---

## Codes d'erreur spécifiques

### 401 Unauthorized

**Cas 1 : User sans tenant_id**
```json
{
  "error": "No tenant associated with user"
}
```

**Cause** : L'utilisateur n'a pas de `tenant_id` en DB ou dans le JWT.

**Solution** : Réassigner un tenant_id et re-login.

---

### 404 Not Found

**Cas 1 : Ressource cross-tenant**
```json
{
  "error": "Project not found or access denied"
}
```

**Cause** : L'utilisateur tente d'accéder à une ressource d'un autre tenant.

**Solution** : Normal - c'est l'isolation qui fonctionne.

---

### 409 Conflict

**Cas 1 : Slug tenant existant**
```json
{
  "error": "Tenant slug already exists",
  "details": "A tenant with slug \"acme\" already exists"
}
```

**Cas 2 : Email existant**
```json
{
  "error": "Email already exists",
  "details": "A user with email \"alice@acme.com\" already exists"
}
```

---

## Headers requis

### Tous les endpoints authentifiés

```
Authorization: Bearer <JWT_TOKEN>
```

### Création/Modification (JSON)

```
Content-Type: application/json
```

---

## Exemples de workflows

### Workflow 1 : Onboarding nouveau client

```bash
# 1. Bootstrap tenant
RESPONSE=$(curl -s -X POST http://localhost:4000/api/auth/bootstrap \
  -H "Content-Type: application/json" \
  -d '{
    "tenant": {"name": "NewCo", "slug": "newco"},
    "user": {"name": "CEO", "email": "ceo@newco.com", "password": "NewCo123!"}
  }')

TOKEN=$(echo $RESPONSE | jq -r '.token')

# 2. Créer premier projet
curl -X POST http://localhost:4000/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "NEWCO-001",
    "name": "NewCo Alpha Site",
    "status": "planning"
  }'

# 3. Inviter un manager
curl -X POST http://localhost:4000/api/users \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Manager",
    "email": "manager@newco.com",
    "password": "Manager123!",
    "role": "user"
  }'
```

---

### Workflow 2 : Admin surveille son tenant

```bash
# Login
TOKEN=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@acme.com","password":"Secret123!"}' \
  | jq -r '.token')

# Voir les users du tenant
curl http://localhost:4000/api/users -H "Authorization: Bearer $TOKEN"

# Voir les projets du tenant
curl http://localhost:4000/api/projects -H "Authorization: Bearer $TOKEN"

# Voir le dashboard tenant
curl http://localhost:4000/api/dashboard/overview -H "Authorization: Bearer $TOKEN"
```

---

### Workflow 3 : Super admin surveille la plateforme

```bash
# Login super admin
TOKEN=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"super@hearst.com","password":"..."}' \
  | jq -r '.token')

# Voir tous les users (tous tenants)
curl http://localhost:4000/api/users -H "Authorization: Bearer $TOKEN"

# Voir tous les projets (tous tenants)
curl http://localhost:4000/api/projects -H "Authorization: Bearer $TOKEN"

# Dashboard global
curl http://localhost:4000/api/dashboard/overview -H "Authorization: Bearer $TOKEN"

# Créer un user dans un tenant spécifique
curl -X POST http://localhost:4000/api/users \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Admin",
    "email": "admin2@acme.com",
    "password": "Admin123!",
    "role": "admin",
    "tenant_id": "<UUID_TENANT_ACME>"
  }'
```

---

## Migration depuis mono-tenant

Si vous avez des users/projects existants, ils ont été automatiquement assignés au tenant "hearst" lors de la migration.

**Vérifier** :
```sql
SELECT slug, name FROM tenants WHERE slug = 'hearst';
```

**Les users existants peuvent se login normalement** :
```bash
# Login fonctionnera, JWT contiendra tenant_id du tenant "hearst"
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"existing@user.com","password":"..."}' 
```

---

## Notes importantes

### Unicité des emails

Les emails sont globalement uniques (pas de `UNIQUE (email, tenant_id)`).

**Conséquence** : Un email ne peut exister que dans un seul tenant.

**Avantage** : Évite les confusions d'identité.

**Alternative** : Si vous voulez permettre le même email dans plusieurs tenants, modifiez la contrainte :
```sql
-- Retirer contrainte UNIQUE sur email
ALTER TABLE users DROP CONSTRAINT users_email_key;

-- Ajouter contrainte UNIQUE (email, tenant_id)
ALTER TABLE users ADD CONSTRAINT users_email_tenant_unique UNIQUE (email, tenant_id);
```

### RLS (Row Level Security)

L'implémentation actuelle **N'UTILISE PAS** RLS Supabase car :
- Vous utilisez `SUPABASE_SERVICE_KEY` (bypass RLS)
- Isolation applicative (filtre côté backend)

Pour activer RLS (optionnel, sécurité renforcée) :
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Puis créer des policies appropriées
```

---

## Support et debugging

### Debug JWT

```bash
# Extraire le payload du JWT
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
echo $TOKEN | cut -d'.' -f2 | base64 -d | jq '.'
```

### Vérifier tenant_id d'un user

```sql
SELECT id, email, tenant_id, role 
FROM users 
WHERE email = 'alice@acme.com';
```

### Vérifier tenant d'un projet

```sql
SELECT id, name, tenant_id 
FROM projects 
WHERE id = 'ACME-001';
```

### Lister les tenants actifs

```sql
SELECT 
  t.slug,
  t.name,
  t.status,
  COUNT(DISTINCT u.id) as nb_users,
  COUNT(DISTINCT p.id) as nb_projects
FROM tenants t
LEFT JOIN users u ON u.tenant_id = t.id
LEFT JOIN projects p ON p.tenant_id = t.id
GROUP BY t.id
ORDER BY t.created_at DESC;
```

---

## Contact

Pour toute question sur l'API multi-tenant :
- **Documentation** : `docs/guides/GUIDE_MULTI_TENANT.md`
- **Tests** : `scripts/test-multi-tenant.sh`
- **README** : `MULTI_TENANT_README.md`

