# 📊 Scripts SQL Hearst Control

Guide d'utilisation des scripts de base de données.

## 🎯 Quel script utiliser ?

### 🆕 Nouvelle installation (démarrage propre)

**Utilisez : `/FRESH_START.sql`** (à la racine du projet)

- ✅ Nettoie complètement la base de données
- ✅ Recrée toutes les tables avec multi-tenant intégré
- ✅ Insère les données initiales (tenant 'hearst', admin, projets)
- ✅ Configure les triggers et views

**Quand l'utiliser :**
- Première installation de Hearst Control
- Réinitialisation complète de la base
- Correction de problèmes de structure

**Comment l'exécuter :**
```bash
# Dans Supabase SQL Editor, copier-coller tout le fichier
```

---

### 🔄 Migration Multi-Tenant (base existante)

**Utilisez : `/database/multi-tenant-migration.sql`**

- ✅ Ajoute la table `tenants`
- ✅ Ajoute `tenant_id` aux tables existantes
- ✅ Backfill les données existantes avec tenant 'hearst'
- ✅ Conserve vos données existantes

**Quand l'utiliser :**
- Vous avez déjà une base Hearst Control sans multi-tenant
- Vous voulez ajouter le support multi-tenant sans perdre vos données
- Migration progressive

**Comment l'exécuter :**
```bash
# Dans Supabase SQL Editor, copier-coller tout le fichier
```

---

### ✅ Vérification Post-Installation

**Utilisez : `/VERIFY_SQL_SETUP.sql`** (à la racine du projet)

- 🔍 Vérifie que toutes les tables sont créées
- 🔍 Vérifie les types de colonnes
- 🔍 Vérifie les données des projets
- 🔍 Vérifie le multi-tenant
- 🔍 Affiche une vue d'ensemble complète

**Quand l'utiliser :**
- Après avoir exécuté FRESH_START.sql
- Après avoir exécuté multi-tenant-migration.sql
- Pour diagnostiquer des problèmes

**Comment l'exécuter :**
```bash
# Dans Supabase SQL Editor, copier-coller tout le fichier
```

---

## 📁 Autres scripts disponibles

### `/database/central-schema.sql`
Schema de base (sans multi-tenant) - **Déprécié, utiliser FRESH_START.sql**

### `/database/add-strategic-reserve-qatar.sql`
Ajoute le projet Strategic Reserve Qatar (projet spécifique)

### `/schemas/`
Contient des copies des schemas principaux pour référence

---

## 🎬 Workflow recommandé

### Scénario 1 : Nouvelle installation complète

```bash
1. Exécuter : FRESH_START.sql
2. Vérifier : VERIFY_SQL_SETUP.sql
3. Démarrer : cd backend-central && npm start
```

### Scénario 2 : Migration d'une base existante

```bash
1. Sauvegarder votre base actuelle
2. Exécuter : database/multi-tenant-migration.sql
3. Vérifier : VERIFY_SQL_SETUP.sql
4. Tester l'application
```

### Scénario 3 : Problèmes de structure

```bash
1. Sauvegarder vos données importantes
2. Exécuter : FRESH_START.sql (réinitialise tout)
3. Vérifier : VERIFY_SQL_SETUP.sql
4. Restaurer vos données si nécessaire
```

---

## 🔑 Informations importantes

### Super Admin par défaut
```
Email    : admin@hearstmining.com
Password : <REDACTED>
```

### Tenant par défaut
```
Slug : hearst
Name : Hearst (default)
```

### Projets initiaux

**QATAR-001** - Hearst Qatar Mining
- 58 containers ANTSPACE HD5
- 17,864 mineurs S21XP Hydro
- 8.45 EH/s
- Status : Active

**AQUA-001** - Hearst Aquahash
- 15 containers
- 4,620 mineurs
- 2.18 EH/s
- Status : Planned

---

## ⚠️ Avertissements

1. **FRESH_START.sql** supprime TOUTES les données existantes (DROP TABLE)
2. Toujours faire une sauvegarde avant d'exécuter des migrations
3. Tester d'abord sur un environnement de développement
4. Les scripts utilisent `IF NOT EXISTS` et `ON CONFLICT` pour être idempotents quand possible

---

## 🆘 Aide

Si vous rencontrez des problèmes :

1. Vérifiez les logs d'exécution SQL pour les erreurs
2. Exécutez VERIFY_SQL_SETUP.sql pour diagnostiquer
3. Consultez les fichiers dans `/docs/guides/` pour plus d'informations
4. En dernier recours, utilisez FRESH_START.sql pour repartir de zéro

---

**Dernière mise à jour : 24 décembre 2025**

