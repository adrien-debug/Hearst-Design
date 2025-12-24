# ⛏️ MINING DASHBOARD - Mining Command Center

**Route :** `/mining-dashboard`  
**Type :** Centre de commande opérationnel - Monitoring temps réel des opérations de mining

---

## 🎯 Vue d'ensemble

Page de monitoring centralisé des opérations minières affichant en temps réel les performances de la flotte de miners, la production de hashrate, l'accumulation de Bitcoin et l'état de l'infrastructure par conteneur.

---

## 🏷️ HEADER - Badges

### Badge 1 : Operations
- **Statut :** Active
- **Type :** Badge de catégorie

### Badge 2 : Real-time Analytics
- **Statut :** En temps réel
- **Type :** Badge de mode

### Titre
- **Nom :** Mining Command Center

### Filtres de temps
- **Options disponibles :** 7d, 30d, 90d
- **Sélection par défaut :** 30d

---

## 📊 CARTES KPI PRINCIPALES (3 Cartes)

### Carte 1 : FLEET STATUS

**KPI Principal :**
- **Taux opérationnel :** 99.2%
  - Pourcentage de miners actifs sur le total
  - Calcul : (Miners actifs / Total miners) × 100

**Statut :** Live

**Métriques détaillées :**

1. **Active**
   - Nombre de miners actuellement actifs
   - Valeur visible via `mockHardwareStatus.activeMiners`

2. **Maintenance**
   - Nombre de miners en maintenance
   - Valeur : `mockHardwareStatus.maintenanceMiners`

3. **Total Miners**
   - Nombre total de miners dans la flotte
   - Valeur : `mockHardwareStatus.totalMiners`

**Barre de progression :**
- Visualisation du taux opérationnel (99.2%)
- Gradient vert indiquant la santé de la flotte

---

### Carte 2 : TOTAL HASHRATE

**KPI Principal :**
- **Hashrate total**
  - Valeur : Données de `mockBitcoinKPIs.totalHashrate`
  - Unité : PH/s (Pétahash par seconde)

**Statut :** Optimal

**Métriques détaillées :**

1. **Target (Objectif)**
   - Cible : 1,000 PH/s
   - Objectif de hashrate à atteindre

2. **Efficiency (Efficacité énergétique)**
   - Valeur : `mockBitcoinKPIs.efficiency`
   - Unité : J/TH (Joules par Térahash)
   - Plus bas = meilleur (consommation énergétique optimisée)

**Mini Chart :**
- Graphique en barres montrant l'évolution récente
- 15 barres représentant les mesures récentes
- Hauteurs variables de 45% à 85%

---

### Carte 3 : DAILY PRODUCTION

**KPI Principal :**
- **Production journalière**
  - Valeur : `mockBitcoinKPIs.dailyProduction`
  - Unité : BTC
  - Variation : +2.1%

**Statut :** Stable

**Métriques détaillées :**

1. **Revenue (Revenu journalier)**
   - Calcul : Production × Prix Bitcoin ÷ 1000
   - Formule : `dailyProduction × $98,450 ÷ 1000`
   - Format : $XXXk

2. **Monthly (Production mensuelle estimée)**
   - Calcul : Production journalière × 30
   - Formule : `dailyProduction × 30`
   - Unité : BTC

**Area Chart :**
- Visualisation de la tendance de production
- Courbe ascendante indiquant croissance

---

## 📈 SECTION : PERFORMANCE ANALYTICS

### Graphique 1 : HASHRATE EVOLUTION

**Type :** Line Chart avec aire remplie

**Période affichée :**
- Dépend du filtre sélectionné (7d / 30d / 90d)
- Par défaut : 30 derniers jours

**Données affichées :**

**Métrique principale :**
- **Total Hashrate**
  - Source : `mockHashrateHistory`
  - Données filtrées selon la période sélectionnée
  - Affichage : Ligne verte avec aire en dessous

**KPI Header du graphique :**
- **Current (Valeur actuelle)**
  - Hashrate actuel en temps réel
  - Format : XXX PH/s
  - Statut : Live

**Caractéristiques :**
- Axe Y : PH/s (Pétahash par seconde)
- Axe X : Dates (format "Mon Day")
- Grille : Activée
- Légende : Désactivée
- Hauteur : 380px

**Interprétation :**
- Ligne ascendante = augmentation de la puissance de calcul
- Ligne stable = performance constante
- Ligne descendante = baisse de performance (miners offline)

---

### Graphique 2 : BTC ACCUMULATION

**Type :** Area Chart

**Période :** 90 derniers jours

**Données affichées :**

**Métrique principale :**
- **BTC Reserve**
  - Source : `mockReserveHistory` (90 derniers jours)
  - Accumulation totale de Bitcoin minés
  - Couleur : Vert (#8AFD81)

**KPI Header du graphique :**
- **Total**
  - Quantité totale de BTC accumulés
  - Valeur : Dernier point de données
  - Format : XXX BTC

**Caractéristiques :**
- Axe Y : BTC
- Axe X : Dates (90 derniers jours)
- Grille : Activée
- Ligne de référence : Activée (moyenne)
- Hauteur : 320px

**Interprétation :**
- Courbe croissante = accumulation continue
- Pente = taux d'accumulation quotidien
- Ligne de référence = benchmark de performance

---

### Graphique 3 : DAILY PRODUCTION

**Type :** Area Chart

**Période affichée :**
- Dépend du filtre sélectionné (7d / 30d / 90d)
- Par défaut : 30 derniers jours

**Données affichées :**

**Métrique principale :**
- **Daily BTC**
  - Source : `mockProductionHistory`
  - Production de Bitcoin par jour
  - Couleur : Vert (#8AFD81)

**KPI Header du graphique :**
- **Average (Moyenne)**
  - Moyenne de production sur la période
  - Calcul : Somme ÷ Nombre de jours
  - Format : X.XXX BTC

**Caractéristiques :**
- Axe Y : BTC
- Axe X : Dates (selon filtre)
- Grille : Activée
- Ligne de référence : Activée (moyenne)
- Hauteur : 320px

**Interprétation :**
- Fluctuations = variations quotidiennes normales
- Tendance générale = santé de la production
- Points au-dessus de la référence = jours performants

---

## 📊 SECTION : INFRASTRUCTURE HEATMAP

### Vue d'ensemble

**Titre :** Container Status

**Description :** Statut en temps réel des 48 conteneurs Hydro organisés par Power Block

**Statut :** Live Monitoring

---

### Architecture - 6 Power Blocks

**Organisation :**
- **6 Power Blocks** (A, B, C, D, E, F)
- **8 conteneurs par bloc**
- **Total : 48 conteneurs** (6 × 8)

**Disposition :**
- Grille : 3 colonnes sur desktop
- Chaque bloc : 2 rangées × 4 colonnes

---

### Power Block A (PB-1)

**Conteneurs :** C-01 à C-08  
**Disposition :** 2 rangées × 4 colonnes  
**Statut :** 8 unités

**Conteneurs individuels :**
| Position | ID    | Performance | Statut   |
|----------|-------|-------------|----------|
| [1,1]    | C-01  | Variable    | Voir data|
| [1,2]    | C-02  | Variable    | Voir data|
| [1,3]    | C-03  | Variable    | Voir data|
| [1,4]    | C-04  | Variable    | Voir data|
| [2,1]    | C-05  | Variable    | Voir data|
| [2,2]    | C-06  | Variable    | Voir data|
| [2,3]    | C-07  | Variable    | Voir data|
| [2,4]    | C-08  | Variable    | Voir data|

---

### Power Block B (PB-2)

**Conteneurs :** C-09 à C-16  
**Disposition :** 2 rangées × 4 colonnes  
**Statut :** 8 unités

---

### Power Block C (PB-3)

**Conteneurs :** C-17 à C-24  
**Disposition :** 2 rangées × 4 colonnes  
**Statut :** 8 unités

---

### Power Block D (PB-4)

**Conteneurs :** C-25 à C-32  
**Disposition :** 2 rangées × 4 colonnes  
**Statut :** 8 unités

---

### Power Block E (PB-5)

**Conteneurs :** C-33 à C-40  
**Disposition :** 2 rangées × 4 colonnes  
**Statut :** 8 unités

---

### Power Block F (PB-6)

**Conteneurs :** C-41 à C-48  
**Disposition :** 2 rangées × 4 colonnes  
**Statut :** 8 unités

---

## 🎨 LÉGENDE DES STATUTS

### Codes couleur des conteneurs

1. **Optimal** (Vert - #8AFD81)
   - Conteneur fonctionnant à performance optimale
   - Pas d'intervention nécessaire
   - État normal

2. **Warning** (Orange - #f59e0b)
   - Performance dégradée mais acceptable
   - Surveillance accrue recommandée
   - Intervention préventive à planifier

3. **Critical** (Rouge - #ef4444)
   - Performance critique
   - Intervention urgente requise
   - Risque d'arrêt imminent

4. **Offline** (Gris - #cbd5e1)
   - Conteneur hors ligne
   - Pas de production
   - Maintenance ou réparation en cours

---

## 📊 DONNÉES SOURCES

### Sources de données utilisées

1. **mockBitcoinKPIs**
   - `totalHashrate` : Hashrate total
   - `efficiency` : Efficacité énergétique
   - `dailyProduction` : Production journalière

2. **mockHardwareStatus**
   - `totalMiners` : Nombre total de miners
   - `activeMiners` : Miners actifs
   - `maintenanceMiners` : Miners en maintenance

3. **mockHashrateHistory**
   - Historique du hashrate
   - Données journalières
   - Filtrable par période (7d/30d/90d)

4. **mockProductionHistory**
   - Historique de production BTC
   - Données journalières
   - Filtrable par période (7d/30d/90d)

5. **mockReserveHistory**
   - Historique de la réserve BTC
   - 90 derniers jours
   - Accumulation totale

6. **mockContainerPerformance**
   - Performance de chaque conteneur (48 unités)
   - Statut en temps réel
   - Organisé par Power Block

---

## 🎛️ FILTRES ET INTERACTIONS

### Filtres temporels

**Options disponibles :**
- **7d** : 7 derniers jours
- **30d** : 30 derniers jours (défaut)
- **90d** : 90 derniers jours

**Graphiques affectés :**
- Hashrate Evolution
- Daily Production

**Graphiques non affectés :**
- BTC Accumulation (fixe à 90 jours)

### Bouton Export

- Permet d'exporter les données
- Format : À définir
- Données : Toutes les métriques affichées

---

## 📈 MÉTRIQUES CALCULÉES

### Formules utilisées

1. **Taux opérationnel :**
   ```
   (Miners actifs / Total miners) × 100
   ```

2. **Revenu journalier :**
   ```
   Production journalière × Prix BTC ÷ 1000
   ```

3. **Production mensuelle estimée :**
   ```
   Production journalière × 30
   ```

4. **Moyenne de production :**
   ```
   Σ(Production quotidienne) ÷ Nombre de jours
   ```

---

## 📊 RÉSUMÉ DES KPIs PRINCIPAUX

### Performance de la flotte
- **Taux opérationnel :** 99.2%
- **Miners actifs :** Données dynamiques
- **Miners en maintenance :** Données dynamiques
- **Total miners :** Données dynamiques

### Production
- **Hashrate total :** Variable (PH/s)
- **Objectif hashrate :** 1,000 PH/s
- **Efficacité :** Variable (J/TH)
- **Production journalière :** Variable (BTC)
- **Variation :** +2.1%

### Accumulation
- **Total BTC accumulé :** Variable (90 jours)
- **Moyenne journalière :** Calculée dynamiquement
- **Production mensuelle :** ~Production journalière × 30

### Infrastructure
- **Conteneurs totaux :** 48
- **Power Blocks :** 6 (A-F)
- **Conteneurs par bloc :** 8
- **Statuts :** Optimal / Warning / Critical / Offline

---

## 🔄 FONCTIONNALITÉS TEMPS RÉEL

### Indicateurs Live

1. **Fleet Status**
   - Badge "Live" actif
   - Mise à jour en temps réel

2. **Hashrate Evolution**
   - Badge "Live" actif
   - Valeur actuelle affichée

3. **Container Status**
   - Badge "Live Monitoring" actif
   - Heatmap mise à jour en temps réel

---

## 📈 INTERPRÉTATION GLOBALE

### Santé de l'opération

**Indicateurs positifs :**
- Taux opérationnel > 99% = excellente disponibilité
- Production stable avec +2.1% = croissance
- Hashrate en augmentation = expansion de la capacité

**Points de vigilance :**
- Conteneurs en warning = maintenance préventive nécessaire
- Conteneurs critiques = intervention urgente
- Conteneurs offline = impact sur la production

### Objectifs de performance

1. **Court terme :**
   - Maintenir taux opérationnel > 99%
   - Stabiliser la production journalière
   - Résoudre les alertes warning

2. **Moyen terme :**
   - Atteindre 1,000 PH/s de hashrate
   - Optimiser l'efficacité énergétique
   - Maximiser l'uptime

3. **Long terme :**
   - Expansion de la flotte
   - Accumulation continue de BTC
   - Infrastructure 100% optimal

---

**Document créé le :** 24 Décembre 2025  
**Version :** 1.0  
**Page :** Mining Dashboard  
**Route :** `/mining-dashboard`



