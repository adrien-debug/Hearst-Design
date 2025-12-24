# 📋 PROJECT MONITORING - Master SOP Lifecycle

**Route :** `/monitoring`  
**Type :** Gouvernance de projet - Suivi du cycle de vie SOP (Standard Operating Procedures)

---

## 🎯 Vue d'ensemble

Page de gouvernance du projet de mining Bitcoin suivant un framework Master SOP avec 7 phases obligatoires. Chaque phase doit passer une validation gate et compléter 4 dimensions avant de progresser. Le système suit une méthodologie structurée de gestion de projet industriel.

---

## 🏷️ HEADER - Informations projet

### Badges principaux

**Badge 1 : Master SOP**
- **Type :** Catégorie de gouvernance
- **Style :** Vert (#8AFD81)

**Badge 2 : Lifecycle Governance**
- **Type :** Méthodologie
- **Style :** Badge secondaire

### Informations projet

**Titre :** Qatar 100MW Bitcoin Mining Facility  
**Source :** `project.name`

**Détails :**
- **Capacity :** 100MW
- **Location :** Doha, Qatar
- **Owner :** Hearst Corporation

### KPI Principal (Header)

**Overall Progress**
- Valeur : `project.overallProgress` %
- Description : Progression globale du projet
- Format : Grande carte avec pourcentage

---

## 📑 SYSTÈME D'ONGLETS (3 Tabs)

### Tab 1 : Overview
- **Icône :** Layers
- **Fonction :** Vue d'ensemble du lifecycle

### Tab 2 : Validation Gates
- **Icône :** Lock
- **Fonction :** Suivi des portes de validation

### Tab 3 : Sub-SOPs
- **Icône :** FileText
- **Fonction :** Documents requis par phase

---

## 🔄 FRAMEWORK : 7 PHASES DU LIFECYCLE

### Architecture du cycle de vie

Le projet suit un cycle de vie en 7 phases obligatoires :

1. **Strategic Intent** (Intention stratégique)
2. **Pre-Conception** (Pré-conception)
3. **Conception** (Conception)
4. **Industrialisation** (Industrialisation)
5. **Deployment** (Déploiement)
6. **Commissioning** (Mise en service)
7. **Steady-State** (État stable / Opérations)

---

## 📊 TAB 1 : OVERVIEW

### Section 1 : LIFECYCLE PROGRESS

**Titre :** 7 Phases Timeline

**KPI Header :**
- **Completed phases :** `completedPhases` of `project.phases.length`
- Affichage : "X of 7 phases completed"

**Timeline visuelle :**
- 7 nodes représentant les 7 phases
- Ligne de progression reliant les nodes
- Couleur verte pour phases complétées
- Couleur noire pour phase active
- Couleur grise pour phases futures

**Détails de chaque phase :**

#### Phase 1 : Strategic Intent

**Nom complet :** Strategic Intent  
**Nom court :** `phase.shortName`  
**Icône :** Target (Cible)

**Statuts possibles :**
- `completed` : Phase terminée (vert)
- `in-progress` : Phase en cours (noir)
- `not-started` : Pas démarrée (gris)
- `blocked` : Bloquée (gris foncé)
- `at-risk` : À risque (gris)

**Métriques :**
- **Completion Percent :** `phase.completionPercent` %
- Badge sous le node avec pourcentage

---

#### Phase 2 : Pre-Conception

**Nom complet :** Pre-Conception  
**Nom court :** `phase.shortName`  
**Icône :** Lightbulb (Ampoule)

**Métriques :**
- **Completion Percent :** `phase.completionPercent` %

---

#### Phase 3 : Conception

**Nom complet :** Conception  
**Nom court :** `phase.shortName`  
**Icône :** PenTool (Stylo)

**Métriques :**
- **Completion Percent :** `phase.completionPercent` %

---

#### Phase 4 : Industrialisation

**Nom complet :** Industrialisation  
**Nom court :** `phase.shortName`  
**Icône :** Factory (Usine)

**Métriques :**
- **Completion Percent :** `phase.completionPercent` %

---

#### Phase 5 : Deployment

**Nom complet :** Deployment  
**Nom court :** `phase.shortName`  
**Icône :** Rocket (Fusée)

**Métriques :**
- **Completion Percent :** `phase.completionPercent` %

---

#### Phase 6 : Commissioning

**Nom complet :** Commissioning  
**Nom court :** `phase.shortName`  
**Icône :** Zap (Éclair)

**Métriques :**
- **Completion Percent :** `phase.completionPercent` %

---

#### Phase 7 : Steady-State

**Nom complet :** Steady-State  
**Nom court :** `phase.shortName`  
**Icône :** RefreshCw (Rotation)

**Métriques :**
- **Completion Percent :** `phase.completionPercent` %

---

### Section 2 : CURRENT PHASE DETAILS

**Titre :** Current Phase Details

**Phase affichée :**
- Phase actuelle par défaut
- Phase sélectionnée si l'utilisateur clique sur la timeline

**Informations de la phase :**
- **Name :** `displayPhase.name`
- **Description :** `displayPhase.description`
- **Status :** `displayPhase.status`

---

#### Les 4 Dimensions Obligatoires

Chaque phase doit compléter **4 dimensions** avant de pouvoir progresser :

##### Dimension 1 : BUSINESS

**Icône :** Briefcase (Mallette)  
**Nom :** Business

**Métriques :**
- **Completion Percent :** `dimension.completionPercent` %
- **Criteria met :** X of Y criteria
  - Calcul : `criteria.filter(c => c.completed).length` / `criteria.length`

**Barre de progression :**
- Gradient vert si 100%
- Gradient gris si < 100%

**Critères :**
- Liste des critères business à valider
- Chaque critère : Completed true/false

---

##### Dimension 2 : ADMINISTRATIVE

**Icône :** ClipboardList (Presse-papiers)  
**Nom :** Administrative

**Métriques :**
- **Completion Percent :** `dimension.completionPercent` %
- **Criteria met :** X of Y criteria

**Critères administratifs :**
- Licences
- Permis
- Conformité réglementaire
- Documentation légale

---

##### Dimension 3 : TECHNOLOGY

**Icône :** Monitor (Écran)  
**Nom :** Technology

**Métriques :**
- **Completion Percent :** `dimension.completionPercent` %
- **Criteria met :** X of Y criteria

**Critères technologiques :**
- Sélection des technologies
- Architecture système
- Infrastructure IT
- Cybersécurité

---

##### Dimension 4 : ENGINEERING

**Icône :** Settings (Engrenage)  
**Nom :** Engineering

**Métriques :**
- **Completion Percent :** `dimension.completionPercent` %
- **Criteria met :** X of Y criteria

**Critères d'ingénierie :**
- Conception technique
- Plans d'exécution
- Spécifications
- Validation technique

---

### Section 3 : VALIDATION GATE

**Titre :** Validation Gate

**Carte latérale (sidebar) affichant :**

**Gate Information :**
- **Name :** `displayPhase.gate.name`
- **Description :** `displayPhase.gate.description`
- **Status :** `displayPhase.gate.status`

**Statuts possibles :**
- `passed` : Gate validée (vert, unlock icon)
- `pending` : En attente (gris, lock icon)
- `blocked` : Bloquée (gris foncé)
- `not-applicable` : Non applicable (gris clair)

**Critères de validation :**
- Liste des critères à valider pour passer la gate
- Chaque critère : Completed true/false
- Icône CheckCircle si complété
- Icône Circle vide si non complété

**Quick Stats :**

**Passed Gates**
- Valeur : `passedGates`
- Nombre de gates validées
- Style : Carte verte

**Pending Gates**
- Valeur : `pendingGates`
- Nombre de gates en attente
- Style : Carte grise

---

### Section 4 : SUB-SOPs FOR CURRENT PHASE

**Titre :** Sub-SOPs for {Phase Name}

**Description :** Required Documents

**Vue d'ensemble :**
- Documents nécessaires pour la phase actuelle
- Organisés par dimension
- Avec statut de complétion

**Structure d'un Sub-SOP :**

#### Sub-SOP Card

**En-tête :**
- **Icon :** Icône de la dimension
- **Code :** `sop.code` (ex: "SOP-001")
- **Status badge :** completed / in-progress / not-started / blocked

**Contenu :**
- **Name :** `sop.name`
- **Description :** `sop.description`
- **Completion Percent :** `sop.completionPercent` %
- **Progress bar :** Barre visuelle de progression

**Statuts :**
- **completed :** Vert, 100%
- **in-progress :** Gris, < 100%
- **not-started :** Gris clair, 0%
- **blocked :** Gris foncé avec alerte

---

## 📊 TAB 2 : VALIDATION GATES

### Vue d'ensemble

**Titre :** Validation Gates  
**Sous-titre :** All Phase Gates • Master SOP Lifecycle

### KPI Header (3 badges)

**Badge 1 : Passed**
- **Valeur :** `passedGates`
- **Icône :** Unlock (cadenas ouvert)
- **Couleur :** Vert

**Badge 2 : Total**
- **Valeur :** `project.phases.length` (7)
- **Icône :** Lock (cadenas)
- **Couleur :** Gris

**Badge 3 : Progress**
- **Valeur :** `(passedGates / total) × 100` %
- **Icône :** TrendingUp
- **Couleur :** Vert
- **Calcul :** Pourcentage de gates validées

---

### SIDEBAR - Stats Panel

#### Card 1 : Gates Progress

**KPI Principal :**
- **Pourcentage global :** `(passedGates / total) × 100` %
- **Description :** "X of Y gates passed"

**Barre de progression :**
- Gradient vert
- Visualisation du pourcentage

---

#### Card 2 : Status Breakdown

**Répartition par statut :**

1. **Passed**
   - Icône : Unlock
   - Couleur : #8AFD81 (vert)
   - Count : `passedGates`

2. **Pending**
   - Icône : Clock
   - Couleur : #94A3B8 (gris)
   - Count : `pendingGates`

3. **Blocked**
   - Icône : AlertTriangle
   - Couleur : #475569 (gris foncé)
   - Count : Nombre de gates bloquées

4. **N/A (Not Applicable)**
   - Icône : Circle
   - Couleur : #CBD5E1 (gris clair)
   - Count : Gates non applicables

---

#### Card 3 : By Phase

**Progression par phase :**
- Affiche les 4 premières phases
- Pour chaque phase :
  - Nom court
  - Icône Lock ou Unlock
  - Progression (100% si passed, 0% sinon)
  - Barre de progression

---

#### Quick Actions

**Action 1 : Export All Gates**
- Bouton avec icône FileText
- Exporte toutes les gates

**Action 2 : View Timeline**
- Bouton avec icône Clock
- Affiche la timeline

---

### MAIN CONTENT - Gates Grid

**Disposition :** Grille 2 colonnes

**Pour chaque gate :**

#### Gate Card

**Header (noir) :**
- **Icône :** Icône de la phase
- **Code :** `gate.name`
- **Status badge :** "• • • Passed" / "• • Pending" / etc.

**Body (blanc) :**
- **Phase Name :** `phase.name`
- **Description :** `gate.description`

**Critères (max 3 affichés) :**
- CheckCircle si complété
- Circle vide si non complété
- Texte du critère
- "+ X more criteria" si plus de 3

**Progress :**
- **Pourcentage :** Calcul basé sur critères complétés
- **Formule :** `(completed criteria / total criteria) × 100`
- **Barre :** Gradient vert si passed, gris sinon

---

### FOOTER - Summary Bar

**Informations affichées :**
- **Current Phase :** `currentPhaseData.shortName`
- **Passed Gates :** `passedGates`
- **Pending :** `pendingGates`
- **Badge :** "LIVE"

---

## 📊 TAB 3 : SUB-SOPs

### Vue d'ensemble

**Titre :** Sub-SOP Documents  
**Sous-titre :** All Required Documents • Master SOP Lifecycle

### KPI Header (3 badges)

**Badge 1 : Completed**
- **Valeur :** `completedSubSOPs`
- **Icône :** CheckCircle
- **Couleur :** Vert
- **Calcul :** `allSubSOPs.filter(s => s.status === 'completed').length`

**Badge 2 : Total**
- **Valeur :** `allSubSOPs.length`
- **Icône :** FileText
- **Couleur :** Gris
- **Calcul :** Total de tous les Sub-SOPs

**Badge 3 : Progress**
- **Valeur :** `(completedSubSOPs / total) × 100` %
- **Icône :** TrendingUp
- **Couleur :** Vert
- **Calcul :** Pourcentage de documents complétés

---

### SIDEBAR - Stats Panel

#### Card 1 : Overall Progress

**KPI Principal :**
- **Pourcentage global :** `(completedSubSOPs / allSubSOPs.length) × 100` %
- **Description :** "X of Y documents completed"

**Barre de progression :**
- Gradient vert
- Visualisation du pourcentage

---

#### Card 2 : Status Breakdown

**Répartition par statut :**

1. **Completed**
   - Icône : CheckCircle
   - Couleur : #8AFD81 (vert)
   - Count : Documents complétés

2. **In Progress**
   - Icône : Clock
   - Couleur : #64748B (gris)
   - Count : Documents en cours

3. **Not Started**
   - Icône : Circle
   - Couleur : #94A3B8 (gris clair)
   - Count : Documents non démarrés

4. **Blocked**
   - Icône : AlertTriangle
   - Couleur : #475569 (gris foncé)
   - Count : Documents bloqués

---

#### Card 3 : By Dimension

**Répartition par dimension :**

Pour chaque dimension (Business, Administrative, Technology, Engineering) :
- **Icône :** Icône de la dimension
- **Nom :** Nom capitalisé
- **Count :** "X/Y" (complétés / total)
- **Progress bar :** `(completed / total) × 100` %

---

#### Quick Actions

**Action 1 : Export All Documents**
- Bouton avec icône FileText
- Exporte tous les Sub-SOPs

**Action 2 : View Timeline**
- Bouton avec icône Clock
- Affiche la timeline

---

### MAIN CONTENT - Sub-SOPs Grid

**Disposition :** Grille 3 colonnes (responsive)

**Pour chaque Sub-SOP :**

#### Sub-SOP Card

**Header (noir) :**
- **Icône :** Icône de la dimension
- **Code :** `sop.code`
- **Status badge :** "• • • Complete" / "• • In Progress" / etc.

**Body (blanc) :**
- **Name :** `sop.name`
- **Description :** `sop.description` (max 2 lignes)

**Progress :**
- **Label :** "Progress"
- **Pourcentage :** `sop.completionPercent` %
- **Barre :** Gradient vert si 100%, gris sinon

**Owner (optionnel) :**
- **Icône :** User
- **Nom :** `sop.owner`
- Affichage si défini

---

### FOOTER - Summary Bar

**Informations affichées :**
- **Current Phase :** `currentPhaseData.shortName`
- **Active SOPs :** `allSubSOPs.filter(s => s.status === 'in-progress').length`
- **Pending :** `allSubSOPs.filter(s => s.status === 'not-started').length`
- **Badge :** "LIVE"

---

## 📊 DONNÉES SOURCES

### Source principale

**mockSOPProject :**
- Contient toutes les données du projet
- Structure : `Project` type

### Structure des données

```typescript
Project {
  name: string
  capacity: string
  location: string
  owner: string
  currentPhase: PhaseId
  overallProgress: number
  phases: Phase[]
}

Phase {
  id: PhaseId
  name: string
  shortName: string
  description: string
  status: Status
  completionPercent: number
  dimensions: {
    business: Dimension
    administrative: Dimension
    technology: Dimension
    engineering: Dimension
  }
  gate: Gate
  subSOPs: SubSOP[]
}

Dimension {
  completionPercent: number
  criteria: Criterion[]
}

Gate {
  id: string
  name: string
  description: string
  status: GateStatus
  criteria: Criterion[]
}

SubSOP {
  id: string
  code: string
  name: string
  description: string
  dimension: DimensionId
  status: Status
  completionPercent: number
  owner?: string
}
```

---

## 📈 MÉTRIQUES CALCULÉES

### Formules utilisées

1. **Completed Phases :**
   ```
   phases.filter(p => p.status === 'completed').length
   ```

2. **Passed Gates :**
   ```
   phases.filter(p => p.gate.status === 'passed').length
   ```

3. **Pending Gates :**
   ```
   phases.filter(p => p.gate.status === 'pending').length
   ```

4. **All Sub-SOPs :**
   ```
   phases.flatMap(p => p.subSOPs)
   ```

5. **Completed Sub-SOPs :**
   ```
   allSubSOPs.filter(s => s.status === 'completed').length
   ```

6. **Gate Progress :**
   ```
   (passed gates / total gates) × 100
   ```

7. **Sub-SOP Progress :**
   ```
   (completed sub-SOPs / total sub-SOPs) × 100
   ```

8. **Criteria Progress (per dimension) :**
   ```
   (completed criteria / total criteria) × 100
   ```

---

## 🎛️ INTERACTIONS

### Navigation Timeline

**Clic sur une phase :**
- Sélectionne la phase
- Met à jour les détails affichés
- Zoom visuel sur la phase

**Clic répété :**
- Désélectionne la phase
- Retour à la phase actuelle

### Navigation Tabs

**Clic sur un onglet :**
- Change le contenu affiché
- Animation de transition
- Mise à jour de l'URL

### Help Panel

**Bouton Guide :**
- Affiche/masque le panneau d'aide
- Explique le framework SOP
- Montre les 4 dimensions

---

## 📊 RÉSUMÉ DES KPIs PRINCIPAUX

### Progression Globale
- **Overall Progress :** Variable %
- **Completed Phases :** X of 7
- **Current Phase :** Nom de la phase actuelle

### Validation Gates
- **Passed Gates :** Nombre validé
- **Pending Gates :** Nombre en attente
- **Blocked Gates :** Nombre bloqué
- **Gate Progress :** % de completion

### Sub-SOPs
- **Total Documents :** Nombre total
- **Completed :** Documents terminés
- **In Progress :** Documents en cours
- **SOP Progress :** % de completion

### Dimensions (par phase)
- **Business :** % de completion
- **Administrative :** % de completion
- **Technology :** % de completion
- **Engineering :** % de completion

---

## 📈 MÉTHODOLOGIE SOP

### Principe du Master SOP

Le **Master SOP** (Standard Operating Procedure) est un framework de gouvernance de projet qui :

1. **Structure le projet** en 7 phases séquentielles
2. **Impose 4 dimensions** à compléter par phase
3. **Valide chaque phase** via une Validation Gate
4. **Documente le processus** via des Sub-SOPs

### Les 7 Phases expliquées

**1. Strategic Intent :**
- Définition de la vision stratégique
- Business case
- Objectifs de haut niveau

**2. Pre-Conception :**
- Études de faisabilité
- Analyse de marché
- Sélection du site

**3. Conception :**
- Design détaillé
- Architecture technique
- Plans d'exécution

**4. Industrialisation :**
- Approvisionnement
- Fabrication
- Préparation logistique

**5. Deployment :**
- Installation
- Construction
- Mise en place

**6. Commissioning :**
- Tests
- Mise en service
- Validation opérationnelle

**7. Steady-State :**
- Opérations normales
- Optimisation
- Maintenance

### Les 4 Dimensions

**Business :**
- Stratégie commerciale
- Modèle économique
- Rentabilité

**Administrative :**
- Conformité légale
- Permis et licences
- Gouvernance

**Technology :**
- Infrastructure IT
- Systèmes
- Cybersécurité

**Engineering :**
- Conception technique
- Spécifications
- Exécution

### Validation Gates

Chaque phase se termine par une **Validation Gate** qui :
- Vérifie que tous les critères sont remplis
- Valide les 4 dimensions
- Autorise le passage à la phase suivante

### Sub-SOPs

Les **Sub-SOPs** sont des documents opérationnels qui :
- Détaillent les procédures par dimension
- Guident l'exécution
- Assurent la conformité

---

## 🎯 OBJECTIFS DE GOUVERNANCE

### Court terme
- Compléter la phase actuelle
- Valider toutes les dimensions
- Passer la validation gate

### Moyen terme
- Progresser vers Deployment
- Compléter tous les Sub-SOPs
- Maintenir >80% de progression

### Long terme
- Atteindre Steady-State
- 100% des gates validées
- Opérations optimales

---

**Document créé le :** 24 Décembre 2025  
**Version :** 1.0  
**Page :** Project Monitoring  
**Route :** `/monitoring`



