# 🔍 Test Supabase - Vérification des Données

## ⚠️ Le login ne fonctionne pas

Cela signifie probablement que :
1. Les données ne sont pas dans Supabase
2. Ou le hash du mot de passe n'est pas correct

---

## 📊 VÉRIFICATION DANS SUPABASE

### Étape 1 : Vérifier les projets

Dans Supabase SQL Editor, exécuter :

```sql
SELECT id, name, status, total_containers 
FROM projects;
```

**Résultat attendu :**
```
QATAR-001 | Hearst Qatar Mining | active  | 58
AQUA-001  | Hearst Aquahash     | planned | 15
```

---

### Étape 2 : Vérifier les utilisateurs

```sql
SELECT email, name, role, is_active 
FROM users;
```

**Résultat attendu :**
```
admin@hearstmining.com | Super Admin | super_admin | true
```

---

### Étape 3 : Vérifier le tenant

```sql
SELECT * FROM tenants;
```

**Résultat attendu :**
```
slug: hearst
name: Hearst (default)
status: active
```

---

## 🔧 SI LES DONNÉES NE SONT PAS LÀ

### Option 1 : Réexécuter FRESH_START.sql

Dans Supabase SQL Editor :
1. Copier tout le contenu de `FRESH_START.sql`
2. Coller dans SQL Editor
3. Exécuter (Run)

---

### Option 2 : Créer l'utilisateur manuellement

```sql
-- Créer l'utilisateur admin avec un mot de passe simple
INSERT INTO users (email, password_hash, name, role, tenant_id) 
SELECT 
  'admin@hearstmining.com',
  '$2a$10$rFKwEzYhQ6xqVz.iyKV8YOxfXRp.KNJKZy9QsT8H4ggO5YPQXvPea',
  'Super Admin',
  'super_admin',
  id
FROM tenants WHERE slug = 'hearst';
```

**Mot de passe** : `<REDACTED>`

---

## ✅ Test Final

Une fois les données vérifiées/créées, tester :

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hearstmining.com","password":"<REDACTED>"}'
```

**Résultat attendu :**
```json
{
  "token": "eyJhbGci...",
  "user": {
    "email": "admin@hearstmining.com",
    "name": "Super Admin",
    "role": "super_admin"
  }
}
```

---

## 📋 Checklist

- [ ] Projets visibles dans Supabase (2 projets)
- [ ] Utilisateur admin existe
- [ ] Tenant "hearst" existe
- [ ] Login fonctionne
- [ ] Backend répond sur port 4000

---

**Vérifiez d'abord les données dans Supabase !** 🔍

