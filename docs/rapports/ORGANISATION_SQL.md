# 📊 Organisation des Fichiers SQL - Hearst Control

**Date de réorganisation : 24 décembre 2025**

---

## ✅ Réorganisation Effectuée

### Fichiers supprimés (doublons)

- ❌ `COMPLETE_SETUP.sql` - Doublon de `FRESH_START.sql`
- ❌ `COPY_THIS_SQL.sql` - Doublon de `database/multi-tenant-migration.sql`
- ❌ `CHECK_DATA.sql` - Doublon simplifié de `VERIFY_SQL_SETUP.sql`

### Fichiers conservés et leur utilisation

| Fichier | Emplacement | Utilisation | Priorité |
|---------|-------------|-------------|----------|
| **FRESH_START.sql** | `/` | 🆕 Installation complète (nettoie + recrée tout) | ⭐⭐⭐ Principal |
| **VERIFY_SQL_SETUP.sql** | `/` | ✅ Vérification après installation | ⭐⭐⭐ Important |
| **multi-tenant-migration.sql** | `/database/` | 🔄 Migration vers multi-tenant | ⭐⭐ Migration |
| **central-schema.sql** | `/database/` | 📄 Schema de base (référence) | ⭐ Référence |
| **add-strategic-reserve-qatar.sql** | `/database/` | ➕ Ajout projet SRQ | ⭐ Optionnel |

### Documentation créée

- ✅ `/database/README.md` - Guide complet d'utilisation des scripts SQL
- ✅ `/schemas/README.md` - Explication des fichiers dépréciés

---

## 🎯 Guide d'Utilisation Rapide

### Scénario 1 : Nouvelle Installation

```bash
1. Ouvrir Supabase SQL Editor
2. Copier-coller le contenu de FRESH_START.sql
3. Exécuter
4. Vérifier avec VERIFY_SQL_SETUP.sql
```

**Résultat attendu :**
- ✅ Toutes les tables créées avec multi-tenant
- ✅ Tenant "hearst" créé
- ✅ Admin créé : admin@hearstmining.com / <REDACTED>
- ✅ 2 projets créés : QATAR-001, AQUA-001

### Scénario 2 : Migration Multi-Tenant

Si vous avez déjà une base sans multi-tenant :

```bash
1. Ouvrir Supabase SQL Editor
2. Copier-coller le contenu de database/multi-tenant-migration.sql
3. Exécuter
4. Vérifier avec VERIFY_SQL_SETUP.sql
```

**Résultat attendu :**
- ✅ Table `tenants` créée
- ✅ Colonne `tenant_id` ajoutée aux tables existantes
- ✅ Données existantes migrées vers tenant "hearst"

---

## 📁 Structure des Dossiers SQL

```
Hearst-Control-GitHub/
│
├── 📄 FRESH_START.sql              ⭐⭐⭐ Script principal
├── 📄 VERIFY_SQL_SETUP.sql         ⭐⭐⭐ Vérification
│
├── 📂 database/                    ⭐⭐ Scripts actifs
│   ├── 📄 README.md                   Guide complet
│   ├── 📄 multi-tenant-migration.sql  Migration multi-tenant
│   ├── 📄 central-schema.sql          Schema de référence
│   └── 📄 add-strategic-reserve-qatar.sql
│
└── 📂 schemas/                     ⚠️  Déprécié
    ├── 📄 README.md                   Explication obsolescence
    ├── 📄 qatar-schema.sql            ❌ Ancienne architecture
    ├── 📄 srq-schema.sql              ❌ Ancienne architecture
    ├── 📄 central-schema.sql          ❌ Doublon
    └── 📄 add-strategic-reserve-qatar.sql  ❌ Doublon
```

---

## 🔄 Évolution de l'Architecture

### Avant (architecture distribuée)

```
Projet Qatar        Projet SRQ          Projet AQUA
     ↓                   ↓                   ↓
 Base Qatar          Base SRQ            Base AQUA
    (users)            (users)             (users)
  (containers)       (containers)        (containers)
   (miners)           (miners)            (miners)
```

**Problèmes :**
- ❌ Duplication des données utilisateurs
- ❌ Gestion complexe des accès multi-projets
- ❌ Pas de vue globale
- ❌ Maintenance difficile

### Après (architecture multi-tenant)

```
                    Base Centrale
                         ↓
        ┌───────────────┴───────────────┐
        │                               │
    Tenant Hearst                  Tenant Acme
        │                               │
    ┌───┴───┐                       ┌───┴───┐
    │       │                       │       │
 QATAR   AQUA                    PROJ-A  PROJ-B
```

**Avantages :**
- ✅ Une seule base de données
- ✅ Isolation par `tenant_id`
- ✅ Utilisateurs partagés entre projets
- ✅ Vue globale du portefeuille
- ✅ B2B ready (multi-clients)

---

## 🚀 Prochaines Étapes

### Pour utiliser le système

1. **Backend Central**
   ```bash
   cd backend-central
   npm install
   npm start
   ```

2. **Tester l'API**
   ```bash
   # Login
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@hearstmining.com","password":"<REDACTED>"}'
   
   # Get projects
   curl http://localhost:3000/api/projects \
     -H "Authorization: Bearer <token>"
   ```

3. **Démarrer tous les services**
   ```bash
   ./scripts/start-multi-tenant.sh
   ```

---

## 📚 Documentation Complémentaire

- `/database/README.md` - Guide détaillé des scripts SQL
- `/docs/guides/GUIDE_MULTI_TENANT.md` - Architecture multi-tenant
- `/docs/architecture/HEARST_CONTROL_COMPLET.md` - Vision globale

---

## ⚠️ Notes Importantes

### Sauvegardes
- Toujours sauvegarder avant d'exécuter `FRESH_START.sql`
- Ce script fait un `DROP TABLE CASCADE` (efface tout)

### Mot de passe par défaut
```
Email    : admin@hearstmining.com
Password : <REDACTED>
```
⚠️ **À changer en production !**

### Tenant par défaut
```
Slug : hearst
Name : Hearst (default)
```

### Ordre d'exécution
1. `FRESH_START.sql` (ou `multi-tenant-migration.sql`)
2. `VERIFY_SQL_SETUP.sql`
3. Optionnel : `add-strategic-reserve-qatar.sql`

---

## 🆘 Support

### Problèmes courants

**Erreur : "table already exists"**
- Solution : Utiliser `FRESH_START.sql` qui nettoie d'abord

**Erreur : "column tenant_id does not exist"**
- Solution : Exécuter `database/multi-tenant-migration.sql`

**Login ne fonctionne pas**
- Vérifier que le hash du mot de passe est correct
- Exécuter `VERIFY_SQL_SETUP.sql` section 4

**Pas de projets visibles**
- Vérifier `user_project_access`
- Exécuter `VERIFY_SQL_SETUP.sql` section 6

---

## ✨ Améliorations Futures

- [ ] Scripts de migration de données entre tenants
- [ ] Scripts de backup automatique
- [ ] Scripts de nettoyage des vieilles métriques
- [ ] Scripts de génération de rapports

---

**Dernière mise à jour : 24 décembre 2025**

**Organisation effectuée par : Assistant IA**

