# 🚀 Démarrage Multi-Tenant - GUIDE RAPIDE

## Étapes pour démarrer

### ✅ ÉTAPE 1 : Migration SQL (CRITIQUE - À FAIRE EN PREMIER)

**Dans Supabase Dashboard** :
1. Ouvrir https://supabase.com
2. Sélectionner votre projet
3. Aller dans **SQL Editor** (menu de gauche)
4. Cliquer sur **"New Query"**
5. Copier-coller TOUT le contenu de `database/multi-tenant-migration.sql`
6. **Exécuter sections 1-3 uniquement** (jusqu'à la ligne 151)
7. Vérifier le résultat :

```sql
-- Vérification rapide (exécuter dans SQL Editor)
SELECT slug, name FROM tenants WHERE slug = 'hearst';
-- Doit retourner 1 ligne

SELECT COUNT(*) FROM users WHERE tenant_id IS NULL;
-- Doit retourner 0

SELECT COUNT(*) FROM projects WHERE tenant_id IS NULL;
-- Doit retourner 0
```

**⚠️ IMPORTANT** : Ne passez pas à l'étape 2 avant d'avoir fait cette migration !

---

### ✅ ÉTAPE 2 : Démarrer le backend

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst-Control-GitHub/backend-central

# Vérifier que .env existe avec ces variables :
# - SUPABASE_URL
# - SUPABASE_SERVICE_KEY
# - JWT_SECRET
# - PORT (optionnel, par défaut 4000)

# Démarrer le backend
npm start
```

**Le backend doit afficher** :
```
✅ Supabase client created successfully
🚀 Backend Central running on port 4000
```

---

### ✅ ÉTAPE 3 : Tester l'implémentation multi-tenant

**Dans un nouveau terminal** :

```bash
cd /Users/adrienbeyondcrypto/Desktop/Hearst-Control-GitHub

# Exécuter le script de test automatisé
./scripts/test-multi-tenant.sh
```

**Le script va** :
- ✅ Créer 2 tenants de test (ACME et BitMine)
- ✅ Tester l'isolation des données
- ✅ Vérifier la sécurité cross-tenant
- ✅ Valider les duplicates (slug, email)

**Résultat attendu** :
```
🧪 Tests Multi-Tenant Hearst Control
========================================

✅ Backend accessible à http://localhost:4000
✅ Tenant A créé avec succès
✅ Tenant B créé avec succès
✅ Login réussi pour Alice
✅ Alice ne voit que ses propres users (1)
✅ Projet créé : ACME-TEST-001
✅ Bob ne voit aucun projet (isolation OK)
...
✅ TOUS LES TESTS PASSÉS
```

---

## Test manuel rapide (alternative)

Si vous préférez tester manuellement :

```bash
# 1. Créer un tenant
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

# 2. Copier le token reçu
TOKEN="<token_de_la_réponse>"

# 3. Vérifier l'isolation
curl http://localhost:4000/api/users \
  -H "Authorization: Bearer $TOKEN"

# Doit retourner 1 seul user (Alice)
```

---

## Checklist de vérification

### Avant de commencer
- [ ] Supabase projet créé et accessible
- [ ] Variables d'environnement configurées (SUPABASE_URL, SUPABASE_SERVICE_KEY, JWT_SECRET)
- [ ] Node.js et npm installés
- [ ] Dependencies installées (`cd backend-central && npm install`)

### Migration SQL
- [ ] Migration exécutée dans Supabase SQL Editor
- [ ] Tenant "hearst" créé
- [ ] Tous les users ont un tenant_id
- [ ] Tous les projects ont un tenant_id

### Backend
- [ ] Backend démarre sans erreur
- [ ] Port 4000 accessible
- [ ] Connexion Supabase OK

### Tests
- [ ] Script de test exécuté
- [ ] Tous les tests passent
- [ ] Aucune erreur dans les logs

---

## Dépannage rapide

### Erreur : "Missing Supabase credentials"

**Solution** :
```bash
cd backend-central
cp env.example .env
# Éditer .env avec vos credentials Supabase
```

### Erreur : "Port 4000 already in use"

**Solution** :
```bash
# Tuer le processus sur le port 4000
lsof -ti:4000 | xargs kill -9

# Ou changer le port dans .env
echo "PORT=4001" >> .env
```

### Erreur : "No tenant associated with user"

**Solution** : La migration SQL n'a pas été exécutée. Retour à l'étape 1.

### Erreur lors des tests : "Connection refused"

**Solution** : Le backend n'est pas démarré. Retour à l'étape 2.

---

## Commandes utiles

```bash
# Vérifier que le backend tourne
curl http://localhost:4000/health

# Voir les logs backend en direct
cd backend-central && npm start

# Nettoyer les tenants de test (dans Supabase SQL Editor)
DELETE FROM user_project_access WHERE tenant_id IN (
  SELECT id FROM tenants WHERE slug IN ('acme-test', 'bitmine-test')
);
DELETE FROM projects WHERE tenant_id IN (
  SELECT id FROM tenants WHERE slug IN ('acme-test', 'bitmine-test')
);
DELETE FROM users WHERE tenant_id IN (
  SELECT id FROM tenants WHERE slug IN ('acme-test', 'bitmine-test')
);
DELETE FROM tenants WHERE slug IN ('acme-test', 'bitmine-test');
```

---

## Prochaines étapes après tests OK

1. **Créer des tenants réels** pour vos clients
2. **Former les équipes** sur le nouveau système
3. **Monitorer** avec les requêtes SQL du guide
4. **Verrouiller NOT NULL** (section 4 de la migration) quand vous êtes prêt

---

**🎯 Objectif : Avoir le système multi-tenant fonctionnel en 5 minutes !**

