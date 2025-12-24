# ⚠️ Dossier Déprécié - Schemas SQL

## 🚨 Important : Ce dossier est obsolète

**Utilisez plutôt le dossier `/database/` à la racine du projet.**

Ce dossier `/schemas/` contient d'anciens fichiers SQL de l'architecture précédente (avant multi-tenant).

---

## 📋 Contenu de ce dossier

### ❌ Fichiers obsolètes (ne plus utiliser)

#### `qatar-schema.sql`
- Ancien schema pour base de données dédiée projet Qatar
- **Remplacé par** : Architecture multi-tenant centralisée
- **Alternative** : Utiliser `FRESH_START.sql` à la racine

#### `srq-schema.sql`
- Ancien schema pour base de données dédiée projet Strategic Reserve Qatar
- **Remplacé par** : Architecture multi-tenant centralisée
- **Alternative** : Utiliser `FRESH_START.sql` à la racine

#### `central-schema.sql`
- ⚠️ Doublon de `/database/central-schema.sql`
- **Alternative** : Utiliser `/database/central-schema.sql` ou `FRESH_START.sql`

#### `add-strategic-reserve-qatar.sql`
- ⚠️ Doublon de `/database/add-strategic-reserve-qatar.sql`
- **Alternative** : Utiliser `/database/add-strategic-reserve-qatar.sql`

---

## ✅ Scripts recommandés

### Pour une nouvelle installation :
```bash
Utiliser : /FRESH_START.sql
```

### Pour ajouter le multi-tenant à une base existante :
```bash
Utiliser : /database/multi-tenant-migration.sql
```

### Pour vérifier l'installation :
```bash
Utiliser : /VERIFY_SQL_SETUP.sql
```

---

## 🏗️ Évolution de l'architecture

### Ancienne architecture (ce dossier)
- ❌ Une base de données par projet
- ❌ Duplication des tables `users`, `containers`, `miners`
- ❌ Gestion complexe et non scalable

### Nouvelle architecture (multi-tenant)
- ✅ Une seule base de données centralisée
- ✅ Isolation par `tenant_id`
- ✅ Partage intelligent des ressources
- ✅ Scalable et maintenable

---

## 📚 Documentation complète

Consultez `/database/README.md` pour le guide complet d'utilisation des scripts SQL.

---

**Ce dossier est conservé uniquement pour référence historique.**

**Dernière mise à jour : 24 décembre 2025**

