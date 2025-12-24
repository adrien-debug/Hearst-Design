# 🏗️ INFRASTRUCTURE - Infrastructure Monitoring

**Route :** `/infrastructure`  
**Type :** Monitoring infrastructure - Systèmes électriques et de refroidissement

---

## 🎯 Vue d'ensemble

Page de surveillance de l'infrastructure physique du data center de mining, incluant les systèmes électriques, de refroidissement, le monitoring de charge électrique, l'uptime des systèmes et l'efficacité opérationnelle.

---

## 🏷️ HEADER - Badges

### Badge 1 : Infrastructure
- **Type :** Badge de catégorie
- **Statut :** Actif

### Badge 2 : 100MW Facility
- **Capacité :** 100 Mégawatts
- **Type :** Badge d'information

### Titre
- **Nom :** Infrastructure Monitoring

### Filtres de temps
- **Options disponibles :** 24h, 7d, 30d
- **Sélection par défaut :** 24h

---

## 📊 CARTES KPI PRINCIPALES (4 Cartes)

### Carte 1 : SYSTEM UPTIME

**KPI Principal :**
- **Uptime :** 99.8%
  - Disponibilité du système sur les 30 derniers jours
  - Calcul : (Temps actif / Temps total) × 100

**Période :** Last 30 days

**Statut :** Optimal

**Barre de progression :**
- Visualisation à 99.8% de largeur
- Gradient vert indiquant excellente disponibilité

**Interprétation :**
- \> 99.5% = Excellente disponibilité
- 95-99.5% = Bonne disponibilité
- < 95% = Problèmes de stabilité

---

### Carte 2 : TOTAL LOAD

**KPI Principal :**
- **Charge électrique totale**
  - Valeur : Somme des charges de tous les Power Blocks
  - Unité : MW (Mégawatts)
  - Calcul : `Σ(currentLoad de chaque Power Block)`

**Contexte :** of 100 MW capacity

**Description :** Power consumption

**Barre de progression :**
- Visualisation en pourcentage de la capacité totale
- Formule : `(Total Load / 100) × 100`

**Métriques :**
- **Capacité totale :** 100 MW
- **Charge actuelle :** Variable selon les Power Blocks
- **Utilisation :** Pourcentage de charge

**Zones de performance :**
- 0-70% : Utilisation normale
- 70-85% : Utilisation élevée
- 85-95% : Charge critique
- \> 95% : Capacité maximale

---

### Carte 3 : EFFICIENCY

**KPI Principal :**
- **Efficacité moyenne**
  - Valeur : Moyenne des efficacités de tous les Power Blocks
  - Unité : %
  - Calcul : `Σ(efficiency) ÷ Nombre de Power Blocks`

**Statut :** High

**Description :** Power systems

**Barre de progression :**
- Visualisation du taux d'efficacité
- Plus haut = meilleur

**Interprétation :**
- \> 95% = Efficacité excellente
- 90-95% = Efficacité bonne
- 85-90% = Efficacité moyenne
- < 85% = Nécessite optimisation

**Impact :**
- Efficacité élevée = Moins de pertes énergétiques
- Réduction des coûts opérationnels
- Meilleure durabilité des équipements

---

### Carte 4 : TEMPERATURE

**KPI Principal :**
- **Température moyenne**
  - Valeur : Moyenne des températures de tous les Power Blocks
  - Unité : °C (Celsius)
  - Calcul : `Σ(temperature) ÷ Nombre de Power Blocks`

**Statut :** Normal

**Description :** Average

**Barre de progression :**
- Visualisation relative (basée sur max 50°C)
- Formule : `(Température / 50) × 100`

**Zones de température :**
- < 25°C : Très bon (froid)
- 25-35°C : Optimal
- 35-45°C : Normal
- 45-55°C : Attention
- \> 55°C : Critique

**Impact :**
- Température basse = Meilleure performance
- Réduction de l'usure des composants
- Efficacité du système de refroidissement

---

## 📈 SECTION : POWER MONITORING

### Graphique 1 : POWER LOAD MONITORING

**Type :** Area Chart temps réel

**Période affichée :**
- Dépend du filtre sélectionné (24h / 7d / 30d)
- Par défaut : 24 dernières heures

**Données affichées :**

**Métrique principale :**
- **Total Load**
  - Source : `mockPowerHistory` / `mockPowerHistory7Days` / `mockPowerHistory30Days`
  - Charge électrique totale en temps réel
  - Couleur : Vert (#8AFD81)

**KPI Header du graphique :**
- **Current Load**
  - Charge actuelle en MW
  - Format : XX.X MW
  - Statut : Live

**Caractéristiques :**
- **Axe Y :** MW (Mégawatts)
- **Axe X :** 
  - 24h : Heures (format "hour")
  - 7d/30d : Dates (format "Mon Day")
- **Grille :** Activée
- **Ligne de référence :** Activée (moyenne)
- **Hauteur :** 380px

**Sources de données :**
- **24h :** `mockPowerHistory` (données horaires)
- **7d :** `mockPowerHistory7Days` (données quotidiennes)
- **30d :** `mockPowerHistory30Days` (données quotidiennes)

**Interprétation :**
- Pics = Périodes de forte demande
- Creux = Périodes de faible activité
- Tendance = Évolution de la consommation
- Ligne de référence = Charge moyenne

---

### Graphique 2 : SYSTEM UPTIME

**Type :** Line Chart avec aire remplie

**Période :** 30 derniers jours (fixe)

**Données affichées :**

**Métrique principale :**
- **Uptime**
  - Source : `mockSystemUptime`
  - Disponibilité globale du système en %
  - Couleur : Vert (#8AFD81)

**KPI Header du graphique :**
- **Average**
  - Uptime moyen : 99.8%
  - Format : XX.X%

**Caractéristiques :**
- **Axe Y :** % (Pourcentage)
- **Axe X :** Dates (30 derniers jours)
- **Grille :** Activée
- **Légende :** Désactivée
- **Aire remplie :** Activée
- **Hauteur :** 320px

**Interprétation :**
- Ligne stable près de 100% = Système très fiable
- Baisses occasionnelles = Maintenances ou incidents
- Tendance générale = Santé du système

**Objectifs :**
- SLA cible : > 99.5%
- Valeur actuelle : 99.8%
- Statut : Objectif atteint ✓

---

### Graphique 3 : OPERATIONAL EFFICIENCY

**Type :** Line Chart avec aire remplie

**Période :** 30 derniers jours (fixe)

**Données affichées :**

**Métrique principale :**
- **Efficiency**
  - Source : `mockEfficiencyHistory`
  - Moyenne d'efficacité des 4 Power Blocks
  - Calcul : `(pb1 + pb2 + pb3 + pb4) ÷ 4`
  - Couleur : Vert (#8AFD81)

**KPI Header du graphique :**
- **Average**
  - Efficacité moyenne sur 30 jours
  - Format : XX.X%

**Caractéristiques :**
- **Axe Y :** % (Pourcentage)
- **Axe X :** Dates (30 derniers jours)
- **Grille :** Activée
- **Légende :** Désactivée
- **Aire remplie :** Activée
- **Hauteur :** 320px

**Interprétation :**
- Ligne ascendante = Amélioration de l'efficacité
- Ligne stable = Performance constante
- Baisses = Problèmes ou dégradation

**Facteurs d'influence :**
- Charge électrique
- Température ambiante
- Âge des équipements
- Maintenance préventive

---

## 📊 SECTION : SYSTEM STATUS

### Sous-section 1 : POWER SYSTEMS

**Titre :** Power Systems  
**Description :** 4 Power Blocks Status  
**Statut global :** All Online

**Architecture :**
- **4 Power Blocks** (PB-1, PB-2, PB-3, PB-4)
- Chaque bloc alimente une partie de l'infrastructure
- Monitoring en temps réel

---

#### Power Block 1 (PB-1)

**Nom :** Power Block 1

**Métriques :**

1. **Load (Charge)**
   - Valeur : `system.currentLoad` MW
   - Charge électrique actuelle du bloc
   - Unité : MW

2. **Efficiency (Efficacité)**
   - Valeur : `system.efficiency` %
   - Rendement énergétique du bloc
   - Unité : %

3. **Temperature (Température)**
   - Valeur : `system.temperature` °C
   - Température opérationnelle
   - Unité : °C

**Statut :** En ligne (point vert pulsant)

**Source de données :** `mockPowerSystems[0]`

---

#### Power Block 2 (PB-2)

**Nom :** Power Block 2

**Métriques :**
- **Load :** Variable MW
- **Efficiency :** Variable %
- **Temperature :** Variable °C

**Statut :** En ligne (point vert pulsant)

**Source de données :** `mockPowerSystems[1]`

---

#### Power Block 3 (PB-3)

**Nom :** Power Block 3

**Métriques :**
- **Load :** Variable MW
- **Efficiency :** Variable %
- **Temperature :** Variable °C

**Statut :** En ligne (point vert pulsant)

**Source de données :** `mockPowerSystems[2]`

---

#### Power Block 4 (PB-4)

**Nom :** Power Block 4

**Métriques :**
- **Load :** Variable MW
- **Efficiency :** Variable %
- **Temperature :** Variable °C

**Statut :** En ligne (point vert pulsant)

**Source de données :** `mockPowerSystems[3]`

---

### Sous-section 2 : COOLING SYSTEMS

**Titre :** Cooling Systems  
**Description :** Hydro Cooling Status  
**Statut global :** Optimal

**Architecture :**
- **4 Systèmes de refroidissement** (Cooling-1, Cooling-2, Cooling-3, Cooling-4)
- Technologie : Hydro Cooling (refroidissement liquide)
- Configuration : Un système par Power Block

---

#### Cooling System 1

**Nom :** Cooling System 1

**Métriques :**

1. **Flow Rate (Débit)**
   - Valeur : `system.flowRate` L/min
   - Débit du liquide de refroidissement
   - Unité : L/min (Litres par minute)
   - Importance : Plus élevé = meilleur refroidissement

2. **ΔT (Delta T - Différence de température)**
   - Valeur : `temperature.input - temperature.output` °C
   - Différence entre température d'entrée et sortie
   - Calcul : Température entrée - Température sortie
   - Importance : Plus élevé = meilleur transfert thermique

3. **Efficiency (Efficacité)**
   - Valeur : `system.efficiency` %
   - Rendement du système de refroidissement
   - Unité : %

**Statut :** Optimal (point vert pulsant)

**Source de données :** `mockCoolingSystems[0]`

**Interprétation ΔT :**
- ΔT > 10°C : Excellent refroidissement
- ΔT 5-10°C : Bon refroidissement
- ΔT < 5°C : Refroidissement insuffisant

---

#### Cooling System 2

**Nom :** Cooling System 2

**Métriques :**
- **Flow Rate :** Variable L/min
- **ΔT :** Variable °C
- **Efficiency :** Variable %

**Statut :** Optimal (point vert pulsant)

**Source de données :** `mockCoolingSystems[1]`

---

#### Cooling System 3

**Nom :** Cooling System 3

**Métriques :**
- **Flow Rate :** Variable L/min
- **ΔT :** Variable °C
- **Efficiency :** Variable %

**Statut :** Optimal (point vert pulsant)

**Source de données :** `mockCoolingSystems[2]`

---

#### Cooling System 4

**Nom :** Cooling System 4

**Métriques :**
- **Flow Rate :** Variable L/min
- **ΔT :** Variable °C
- **Efficiency :** Variable %

**Statut :** Optimal (point vert pulsant)

**Source de données :** `mockCoolingSystems[3]`

---

## 📊 DONNÉES SOURCES

### Sources de données utilisées

1. **mockPowerSystems** (Array de 4 systèmes)
   - `id` : Identifiant du Power Block
   - `name` : Nom du Power Block
   - `currentLoad` : Charge actuelle en MW
   - `efficiency` : Efficacité en %
   - `temperature` : Température en °C

2. **mockCoolingSystems** (Array de 4 systèmes)
   - `id` : Identifiant du système de refroidissement
   - `name` : Nom du système
   - `flowRate` : Débit en L/min
   - `temperature.input` : Température entrée en °C
   - `temperature.output` : Température sortie en °C
   - `efficiency` : Efficacité en %

3. **mockPowerHistory** (24 heures)
   - `hour` : Heure de mesure
   - `total` : Charge totale en MW

4. **mockPowerHistory7Days** (7 jours)
   - `date` : Date de mesure
   - `total` : Charge totale en MW

5. **mockPowerHistory30Days** (30 jours)
   - `date` : Date de mesure
   - `total` : Charge totale en MW

6. **mockSystemUptime** (30 jours)
   - `date` : Date
   - `overall` : Uptime global en %

7. **mockEfficiencyHistory** (30 jours)
   - `date` : Date
   - `pb1` : Efficacité Power Block 1
   - `pb2` : Efficacité Power Block 2
   - `pb3` : Efficacité Power Block 3
   - `pb4` : Efficacité Power Block 4

---

## 📈 MÉTRIQUES CALCULÉES

### Formules utilisées

1. **Total Load (Charge totale) :**
   ```
   Σ(currentLoad de chaque Power Block)
   ```

2. **Average Efficiency (Efficacité moyenne) :**
   ```
   Σ(efficiency de chaque Power Block) ÷ 4
   ```

3. **Average Temperature (Température moyenne) :**
   ```
   Σ(temperature de chaque Power Block) ÷ 4
   ```

4. **Delta T (ΔT) pour chaque Cooling System :**
   ```
   temperature.input - temperature.output
   ```

5. **Average Efficiency (Graphique) :**
   ```
   (pb1 + pb2 + pb3 + pb4) ÷ 4
   ```

---

## 🎛️ FILTRES ET INTERACTIONS

### Filtres temporels

**Options disponibles :**
- **24h** : 24 dernières heures (défaut)
- **7d** : 7 derniers jours
- **30d** : 30 derniers jours

**Graphiques affectés :**
- Power Load Monitoring

**Graphiques non affectés (fixés à 30 jours) :**
- System Uptime
- Operational Efficiency

### Bouton Export

- Permet d'exporter les données
- Format : À définir
- Données : Toutes les métriques de la page

---

## 📊 RÉSUMÉ DES KPIs PRINCIPAUX

### Disponibilité & Performance
- **System Uptime :** 99.8%
- **Statut global :** Optimal
- **Objectif :** > 99.5%

### Consommation Électrique
- **Total Load :** Variable (somme des 4 Power Blocks)
- **Capacité :** 100 MW
- **Utilisation :** Pourcentage de charge

### Efficacité
- **Average Efficiency :** Variable (moyenne des 4 Power Blocks)
- **Statut :** High
- **Objectif :** > 95%

### Température
- **Average Temperature :** Variable (moyenne des 4 Power Blocks)
- **Statut :** Normal
- **Zone optimale :** 25-35°C

### Infrastructure
- **Power Blocks :** 4 (tous en ligne)
- **Cooling Systems :** 4 (tous optimaux)
- **Technologie :** Hydro Cooling

---

## 📈 ARCHITECTURE SYSTÈME

### Distribution Électrique

**Configuration :**
```
Grid 100MW
    ↓
Power Block 1 → Cooling System 1 → Conteneurs 1-12
Power Block 2 → Cooling System 2 → Conteneurs 13-24
Power Block 3 → Cooling System 3 → Conteneurs 25-36
Power Block 4 → Cooling System 4 → Conteneurs 37-48
```

### Relation Power/Cooling

**Principe :**
- Chaque Power Block alimente ~12 conteneurs
- Chaque Cooling System refroidit les conteneurs d'un Power Block
- Architecture redondante pour haute disponibilité

---

## 🔄 FONCTIONNALITÉS TEMPS RÉEL

### Indicateurs Live

1. **Power Load Monitoring**
   - Badge "Live" actif
   - Mise à jour continue de la charge

2. **Power Systems**
   - Badge "All Online" actif
   - Points verts pulsants sur chaque bloc

3. **Cooling Systems**
   - Badge "Optimal" actif
   - Points verts pulsants sur chaque système

---

## 📈 INTERPRÉTATION GLOBALE

### Santé de l'Infrastructure

**Indicateurs positifs :**
- Uptime > 99.5% = Infrastructure très stable
- Tous les Power Blocks en ligne = Redondance active
- Cooling Systems optimaux = Refroidissement efficace
- Efficacité élevée = Faibles pertes énergétiques

**Points de vigilance :**
- Charge > 85% = Prévoir expansion
- Température > 45°C = Vérifier refroidissement
- Efficacité < 90% = Optimisation nécessaire
- ΔT < 5°C = Problème de refroidissement

### KPIs Critiques

**À surveiller en priorité :**
1. **System Uptime** → Doit rester > 99.5%
2. **Total Load** → Ne pas dépasser 95 MW
3. **Temperature** → Maintenir < 40°C
4. **Efficiency** → Viser > 95%

### Objectifs Opérationnels

**Court terme :**
- Maintenir uptime > 99.5%
- Optimiser la répartition de charge
- Stabiliser les températures

**Moyen terme :**
- Améliorer l'efficacité globale
- Réduire la consommation d'énergie
- Maximiser le refroidissement

**Long terme :**
- Atteindre 99.9% d'uptime
- Infrastructure 100% optimale
- Préparation à l'expansion (> 100MW)

---

**Document créé le :** 24 Décembre 2025  
**Version :** 1.0  
**Page :** Infrastructure  
**Route :** `/infrastructure`



