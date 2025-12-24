# 🏢 Hearst Control - Multi-Tenant SaaS

## Vue d'ensemble

Hearst Control a été transformé en plateforme SaaS multi-tenant B2B. Chaque organisation (tenant) dispose de :

- **Isolation complète** des données (users, projects, metrics)
- **Onboarding self-serve** via endpoint `/api/auth/bootstrap`
- **Auth maison conservée** (JWT + bcrypt)
- **Super admin** pour la gestion plateforme

---

## 🚀 Démarrage rapide

### 1. Migration de la base de données

```bash
# Ouvrir Supabase SQL Editor
# Copier-coller le contenu de : database/multi-tenant-migration.sql
# Exécuter les sections 1-3 (création + backfill)
```

### 2. Créer votre premier tenant

```bash
curl -X POST http://localhost:4000/api/auth/bootstrap \
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

**Résultat** : Un tenant + un user admin créés en une seule requête !

### 3. Tester l'isolation

```bash
# Login Alice (tenant ACME)
TOKEN=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@acme.com","password":"Secret123!"}' \
  | jq -r '.token')

# Voir seulement les données de son tenant
curl http://localhost:4000/api/users -H "Authorization: Bearer $TOKEN"
curl http://localhost:4000/api/projects -H "Authorization: Bearer $TOKEN"
```

---

## 📚 Documentation complète

**Guide détaillé** : `docs/guides/GUIDE_MULTI_TENANT.md`

Ce guide contient :
- ✅ Instructions de migration SQL
- ✅ Scénarios de test complets
- ✅ Critères d'acceptation
- ✅ Dépannage
- ✅ Requêtes de monitoring

---

## 🔑 Concepts clés

### Tenant

Une organisation cliente qui utilise la plateforme. Identifié par :
- `id` (UUID)
- `slug` (unique, lowercase, ex: "acme", "hearst")
- `name` (nom d'affichage)
- `status` (active/suspended)

### Isolation

Toutes les données sont filtrées par `tenant_id` :
- **Users** : appartiennent à un tenant
- **Projects** : appartiennent à un tenant
- **Project Access** : scopé par tenant (dénormalisé)

### Rôles

- **admin** : Admin d'un tenant (voit son tenant uniquement)
- **user** : Utilisateur standard d'un tenant
- **super_admin** : Admin plateforme (voit tous les tenants)

### Bootstrap

Endpoint public `/api/auth/bootstrap` pour l'onboarding self-serve :
- Crée un tenant
- Crée le premier user admin
- Retourne un JWT

---

## 📝 Modifications apportées

### Base de données

- ✅ Table `tenants` créée
- ✅ Colonne `tenant_id` ajoutée sur `users`, `projects`, `user_project_access`
- ✅ Backfill : tenant "hearst" créé avec données existantes
- ✅ Indexes optimisés

### Code backend

**Fichiers modifiés** :

1. **`core/auth/authService.js`**
   - JWT inclut maintenant `tenant_id`
   - Filtrage des accès projets par tenant

2. **`backend-central/controllers/authController.js`**
   - Nouveau : `bootstrapTenant()` pour onboarding

3. **`backend-central/routes/auth.js`**
   - Nouvelle route : `POST /api/auth/bootstrap`

4. **`backend-central/controllers/usersController.js`**
   - Toutes les méthodes scopées par `tenant_id`
   - Super admin conserve l'accès global

5. **`backend-central/controllers/projectsController.js`**
   - Toutes les méthodes scopées par `tenant_id`
   - Création de projet force le `tenant_id`

6. **`backend-central/controllers/dashboardController.js`**
   - Dashboard scopé par tenant
   - Super admin voit la vue globale

### Routes API

| Endpoint | Auth | Description |
|----------|------|-------------|
| `POST /api/auth/bootstrap` | Public | Créer tenant + user admin |
| `POST /api/auth/login` | Public | Login (JWT avec tenant_id) |
| `GET /api/users` | Token | Liste users du tenant |
| `GET /api/projects` | Token | Liste projets du tenant |
| `GET /api/dashboard/*` | Token | Stats du tenant |

---

## ✅ Critères d'acceptation validés

- [x] **CA1** : Bootstrap crée un tenant + user admin lié
- [x] **CA2** : Login renvoie JWT avec `tenant_id`
- [x] **CA3** : Routes scopées par tenant pour non super_admin
- [x] **CA4** : Super admin voit tous les tenants
- [x] **CA5** : Aucune fuite cross-tenant

---

## 🔒 Sécurité

### Validation slug tenant

- Lowercase uniquement
- Pattern : `[a-z0-9-]{3,30}`
- Unique globalement

### Isolation applicative

Tous les filtres SQL incluent :
```javascript
if (req.user.role !== 'super_admin') {
  query = query.eq('tenant_id', req.user.tenant_id);
}
```

### Email unique global

Un email ne peut exister que dans un seul tenant (contrainte DB).

---

## 🧪 Tests rapides

### Test 1 : Créer 2 tenants

```bash
# Tenant A
curl -X POST http://localhost:4000/api/auth/bootstrap \
  -H "Content-Type: application/json" \
  -d '{"tenant":{"name":"TenantA","slug":"tenanta"},"user":{"name":"UserA","email":"a@a.com","password":"Pass1234"}}'

# Tenant B
curl -X POST http://localhost:4000/api/auth/bootstrap \
  -H "Content-Type: application/json" \
  -d '{"tenant":{"name":"TenantB","slug":"tenantb"},"user":{"name":"UserB","email":"b@b.com","password":"Pass1234"}}'
```

### Test 2 : Vérifier l'isolation

```bash
# Login A
TOKEN_A=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"a@a.com","password":"Pass1234"}' | jq -r '.token')

# Login B
TOKEN_B=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"b@b.com","password":"Pass1234"}' | jq -r '.token')

# UserA ne voit que ses users
curl http://localhost:4000/api/users -H "Authorization: Bearer $TOKEN_A" | jq '.users | length'
# Résultat : 1

# UserB ne voit que ses users
curl http://localhost:4000/api/users -H "Authorization: Bearer $TOKEN_B" | jq '.users | length'
# Résultat : 1
```

### Test 3 : Super admin voit tout

```bash
# Login super admin
TOKEN_SUPER=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"super@hearst.com","password":"..."}' | jq -r '.token')

# Voit tous les users
curl http://localhost:4000/api/users -H "Authorization: Bearer $TOKEN_SUPER" | jq '.users | length'
# Résultat : 3+ (UserA + UserB + autres)
```

---

## 📊 Monitoring

### Vérifier les tenants actifs

```sql
SELECT 
  t.slug,
  t.name,
  t.status,
  COUNT(DISTINCT u.id) as nb_users,
  COUNT(DISTINCT p.id) as nb_projects,
  MAX(u.last_login) as derniere_activite
FROM tenants t
LEFT JOIN users u ON u.tenant_id = t.id
LEFT JOIN projects p ON p.tenant_id = t.id
GROUP BY t.id, t.slug, t.name, t.status
ORDER BY derniere_activite DESC;
```

---

## 🔧 Dépannage rapide

### Erreur : "No tenant associated with user"

```sql
-- Assigner un tenant à l'utilisateur
UPDATE users 
SET tenant_id = (SELECT id FROM tenants WHERE slug = 'hearst')
WHERE email = 'user@example.com';
```

Puis **re-login**.

### Erreur : "Tenant slug already exists"

Le slug est unique. Utilisez un slug différent ou supprimez l'ancien tenant.

### Les données existantes ne sont pas visibles

Vérifiez que le backfill a été exécuté :

```sql
-- Tous les users doivent avoir un tenant_id
SELECT COUNT(*) FROM users WHERE tenant_id IS NULL;
-- Résultat attendu : 0

-- Tous les projects doivent avoir un tenant_id
SELECT COUNT(*) FROM projects WHERE tenant_id IS NULL;
-- Résultat attendu : 0
```

---

## 🎯 Prochaines étapes (optionnel)

1. **RLS Supabase** : Renforcer l'isolation au niveau DB
2. **Tenant quotas** : Limiter nb de projets/users par plan
3. **Billing** : Intégrer Stripe pour la facturation
4. **Audit logs** : Tracer toutes les actions par tenant
5. **Tenant settings** : Préférences et branding par tenant

---

## 📞 Support

Pour toute question :
1. Consulter `docs/guides/GUIDE_MULTI_TENANT.md`
2. Vérifier la section Dépannage
3. Consulter les logs backend

---

**🎉 Hearst Control est maintenant une plateforme SaaS multi-tenant prête à l'emploi !**

