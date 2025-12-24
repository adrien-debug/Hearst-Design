# 🎨 GALLERY - Galerie de Modèles 3D

**Route :** `/gallery`  
**Type :** Bibliothèque d'assets 3D interactive - Prévisualisation et catalogue immersif

---

## 🎯 Vue d'ensemble

Galerie 3D immersive permettant d'explorer une bibliothèque complète de modèles 3D ultra-réalistes pour l'infrastructure de mining. Chaque modèle est prévisualisé en temps réel avec rendu 3D WebGL et peut être ouvert dans un workspace interactif complet.

---

## 🚀 TECHNOLOGIES UTILISÉES

### Stack 3D - React Three Fiber Ecosystem

La Gallery utilise un stack technologique 3D moderne et performant :

#### **Three.js** (Moteur 3D)
- **Version :** three@^0.160.0
- **Description :** Bibliothèque JavaScript 3D la plus populaire au monde
- **Rôle :** Moteur de rendu WebGL bas niveau
- **Caractéristiques :**
  - Rendu GPU accéléré via WebGL
  - Support des géométries, matériaux, lumières
  - Système de scène 3D complet
  - Optimisations de performance avancées

#### **React Three Fiber (R3F)** 
- **Package :** `@react-three/fiber`
- **Description :** Renderer React pour Three.js
- **Rôle :** Intégration déclarative de Three.js dans React
- **Avantages :**
  - Composants React pour objets 3D
  - Hook `useFrame` pour animation 60fps
  - Gestion automatique du cycle de vie
  - Performance optimisée (pas de re-render inutiles)

#### **React Three Drei**
- **Package :** `@react-three/drei`
- **Description :** Collection d'helpers et composants 3D
- **Composants utilisés :**
  - **`<Environment>`** : HDR environment mapping pour éclairage réaliste
  - **`<ContactShadows>`** : Ombres de contact au sol
  - **Autres helpers** : Caméra, controls, effets

#### **Framer Motion**
- **Package :** `framer-motion`
- **Description :** Bibliothèque d'animation React
- **Rôle :** Animations UI (cards, transitions, hover)
- **Fonctionnalités utilisées :**
  - Animations d'entrée/sortie (AnimatePresence)
  - Stagger animations (effet cascade)
  - Spring physics (animations naturelles)
  - Hover/Tap gestures

---

## 📊 ARCHITECTURE DE LA GALERIE

### Composants Principaux

#### 1. **GalleryPage** (Page principale)
- Container principal
- Gestion état (filtres, recherche, mode vue)
- Navigation vers workspace

#### 2. **Model3DPreview** (Composant 3D)
- Prévisualisation 3D temps réel
- IntersectionObserver pour lazy loading
- Canvas WebGL optimisé

#### 3. **UnifiedModelCatalog** (Catalogue)
- Base de données des modèles
- Métadonnées complètes
- Système de catégorisation

---

## 🏷️ HEADER - Hero Section

### Badges

**Badge 1 : Galerie 3D**
- **Icône :** Sparkles (étincelles)
- **Style :** Vert (#8AFD81)
- **Type :** Badge principal

**Badge 2 : Nombre de modèles**
- **Valeur :** `UNIFIED_MODEL_CATALOG.length` modèles
- **Format :** "X Modèles"
- **Style :** Badge secondaire transparent

**Bouton Dashboard**
- **Action :** Retour au dashboard
- **Route :** `/`
- **Style :** Bouton secondaire

### Titre

**Titre principal :** "Galerie de Modèles 3D"  
**Description :** "Explorez notre bibliothèque d'assets ultra-réalistes. Cliquez sur un modèle pour l'ouvrir dans le workspace 3D interactif."

### Background

**Effets visuels :**
- Gradient animé (slate-900 → slate-800)
- Radial gradient avec accent vert
- Grille de fond (50px × 50px)
- Opacité 10% pour effet subtil

---

## ⭐ SECTION : MODÈLES EN VEDETTE

**Condition d'affichage :**
- Visible uniquement si aucun filtre actif
- Masqué si recherche ou catégorie sélectionnée

**Titre :** "Modèles en vedette"  
**Icône :** Star (étoile jaune)

### Source des données

**Fonction :** `getFeaturedModels()`
- Sélectionne les modèles marqués `featured: true`
- Retourne un tableau de modèles mis en avant

### Featured Card

**Disposition :** Grille 4 colonnes (responsive)

**Structure d'une carte :**

#### Prévisualisation 3D
- **Ratio :** 4:3
- **Technologie :** Model3DPreview component
- **Animation :** Rotation auto-accélérée au hover

#### Badge Featured
- **Position :** Top-left
- **Couleur :** Jaune (#fbbf24)
- **Texte :** "Featured"
- **Icône :** Star

#### Informations
- **Name :** `model.name`
- **Description :** `model.description` (1 ligne)
- **Power :** `model.power` (si disponible)
- **Action :** "Ouvrir" avec flèche

**Interaction :**
- Hover : Accélération rotation 3D
- Click : Ouvre workspace (`/3d-workspace/{modelId}`)

---

## 🔍 BARRE DE RECHERCHE & FILTRES

### Search Bar

**Composant :** Input avec icône Search

**Fonctionnalités :**
- **Placeholder :** "Rechercher un modèle, tag, catégorie..."
- **Recherche en temps réel** (onChange)
- **Champs recherchés :**
  - `model.name`
  - `model.description`
  - `model.tags[]`
- **Bouton Clear** (X) si texte présent

**Algorithme de filtrage :**
```javascript
model.name.toLowerCase().includes(query.toLowerCase()) ||
model.description.toLowerCase().includes(query.toLowerCase()) ||
model.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
```

---

### View Mode Toggle

**2 modes d'affichage :**

#### Mode Grid (Grille)
- **Icône :** Grid3X3
- **Layout :** 4 colonnes (responsive)
- **Taille :** Cartes compactes
- **Ratio :** 16:9

#### Mode Large (Large)
- **Icône :** LayoutGrid
- **Layout :** 3 colonnes (responsive)
- **Taille :** Cartes plus grandes
- **Ratio :** 16:10
- **Extras :** Affiche les tags

---

## 📂 FILTRES PAR CATÉGORIES

### Les 7 Catégories

#### 1. Tous (Filtre par défaut)
- **Icône :** Filter
- **Couleur :** Vert (#8AFD81)
- **Count :** `UNIFIED_MODEL_CATALOG.length`
- **Action :** Réinitialise les filtres

#### 2. Containers
- **ID :** `container`
- **Icône :** Box
- **Couleur :** #8AFD81 (vert)
- **Count :** Nombre de containers
- **Types :** Conteneurs de mining, Antspace HK3

#### 3. Transformateurs
- **ID :** `transformer`
- **Icône :** Zap
- **Couleur :** #f59e0b (orange)
- **Count :** Nombre de transformateurs
- **Types :** Transformateurs électriques, ABB, Siemens

#### 4. Power Blocks
- **ID :** `power`
- **Icône :** Zap
- **Couleur :** #3b82f6 (bleu)
- **Count :** Nombre de power blocks
- **Types :** Blocs d'alimentation, distribution électrique

#### 5. Refroidissement
- **ID :** `cooling`
- **Icône :** Snowflake
- **Couleur :** #06b6d4 (cyan)
- **Count :** Nombre de systèmes cooling
- **Types :** Tours de refroidissement, radiateurs

#### 6. Distribution
- **ID :** `distribution`
- **Icône :** Shield
- **Couleur :** #a855f7 (violet)
- **Count :** Nombre d'équipements distribution
- **Types :** Panneaux, switchgear, câblage

#### 7. Sols
- **ID :** `ground`
- **Icône :** Layers
- **Couleur :** #78716c (marron)
- **Count :** Nombre de types de sols
- **Types :** Béton, gravier, asphalte

#### 8. Environnement
- **ID :** `environment`
- **Icône :** Layers
- **Couleur :** #22c55e (vert)
- **Count :** Nombre d'éléments environnement
- **Types :** Clôtures, caméras, éclairage

**Comportement des filtres :**
- Click : Active/désactive le filtre
- Badge count : Affiche nombre de modèles
- Couleur active : Badge coloré avec couleur de catégorie
- Scroll horizontal sur mobile

---

## 🎨 GRILLE DE MODÈLES

### Layout Responsif

**Mode Grid :**
```
1 col  : Mobile
2 cols : sm (640px)
3 cols : lg (1024px)
4 cols : xl (1280px)
```

**Mode Large :**
```
1 col  : Mobile
2 cols : sm (640px)
3 cols : lg (1024px)
```

### Animations

**Container animations (Framer Motion) :**
- **Type :** Stagger children
- **Delay :** 0.05s entre chaque carte
- **Effet :** Cascade d'apparition

**Item animations :**
- **Initial :** opacity: 0, y: 20, scale: 0.95
- **Animate :** opacity: 1, y: 0, scale: 1
- **Transition :** Spring (stiffness: 100, damping: 15)

---

## 🎴 MODEL CARD - Structure détaillée

### Prévisualisation 3D

**Technologie :** `<Model3DPreview>` component

**Props :**
- `modelType` : Type de primitive 3D
- `color` : Couleur d'accent
- `variant` : Variante du modèle
- `hovered` : État hover pour animations
- `className` : Classes CSS

**Rendu 3D :**
- **Canvas WebGL** : Rendu GPU accéléré
- **Rotation automatique** : 0.4 rad/s (normal), 1.5 rad/s (hover)
- **Lumières :**
  - Ambient light (0.6 intensity)
  - Directional lights (positions multiples)
  - Point light coloré (couleur d'accent)
- **Environnement :** Preset "city" (HDR)
- **Ombres :** ContactShadows (blur: 2, opacity: 0.5)
- **Sol :** Plane 20×20 gris (#475569)

**Optimisations :**
- **IntersectionObserver :** Charge uniquement si visible
- **Lazy loading :** Canvas créé seulement au scroll
- **DPR adaptatif :** [1, 1.5] pour performance
- **Memoization :** Scene3D mémorisée (React.memo)

---

### Badges

#### Badge Catégorie (Top-left)
- **Contenu :** Nom de la catégorie
- **Couleur :** Couleur de catégorie
- **Style :** Semi-transparent avec bordure
- **Format :** UPPERCASE

#### Badge Qualité (Top-right)
- **Niveaux :**
  - **Ultra HD** : ultra-realistic (#8AFD81)
  - **High** : high (#3b82f6)
  - **Standard** : standard (#64748b)
  - **Basic** : basic (#94a3b8)
- **Style :** Semi-transparent avec bordure

---

### Hover Actions

**Overlay au hover :**
- **Background :** Noir 40% + blur
- **Animation :** Fade in/out
- **Contenu :** Bouton principal

**Bouton "Ouvrir le Workspace" :**
- **Couleur :** Vert (#8AFD81)
- **Icône :** Eye
- **Animation :** Scale from 0.8 to 1
- **Hover :** Scale 1.05
- **Action :** Navigate to `/3d-workspace/{modelId}`

---

### Informations Modèle

#### Textes
- **Name :** `model.name`
  - Font : Semibold, text-sm
  - Hover : Couleur verte

- **Description :** `model.description`
  - Taille : text-xs
  - Couleur : slate-500
  - Limite : 2 lignes (line-clamp-2)

#### Dimensions
- **Format :** "Lm × Wm × Hm"
- **Source :** `model.dimensions`
  - length (longueur)
  - width (largeur)
  - height (hauteur)
- **Couleur :** slate-500

#### Power (optionnel)
- **Affichage :** Si `model.power` existe
- **Icône :** Zap (éclair)
- **Couleur :** #8AFD81
- **Format :** Ex: "25MW", "100kW"

#### Tags (mode Large uniquement)
- **Affichage :** 4 premiers tags
- **Style :** Pills gris semi-transparent
- **Overflow :** "+X" si plus de 4 tags
- **Taille :** text-[10px]

---

## 🔄 OPTIMISATIONS DE PERFORMANCE

### Lazy Loading avec IntersectionObserver

**Principe :**
- Canvas 3D chargé uniquement si visible à l'écran
- Économie de mémoire GPU
- Amélioration temps de chargement initial

**Configuration :**
```javascript
IntersectionObserver({
  rootMargin: '100px',    // Précharge 100px avant
  threshold: 0.1,         // 10% visible pour trigger
})
```

**États :**
- **Non visible :** Placeholder avec spinner
- **Visible :** Canvas WebGL actif
- **Hors écran :** Canvas désactivé

---

### Memoization React

**Scene3D mémorisée :**
```javascript
const Scene3D = memo(function Scene3D({ ... }) {
  // Évite re-render si props identiques
})
```

**Avantages :**
- Pas de re-render inutile
- Performance 60fps maintenue
- Mémoire optimisée

---

### WebGL Configuration

**Settings Canvas :**
```javascript
gl={{
  antialias: true,              // Anti-aliasing activé
  alpha: false,                 // Pas de transparence (performance)
  powerPreference: 'default',   // Équilibre performance/qualité
  failIfMajorPerformanceCaveat: false,  // Fallback sur GPU faibles
}}
```

**DPR (Device Pixel Ratio) :**
- Min : 1 (écrans standard)
- Max : 1.5 (écrans haute résolution)
- Limite pour éviter surcharge GPU

---

## 📊 STRUCTURE DES DONNÉES - UnifiedModel

### Interface TypeScript

```typescript
interface UnifiedModel {
  id: string;                    // Identifiant unique
  name: string;                  // Nom du modèle
  category: string;              // Catégorie (container, transformer...)
  description: string;           // Description courte
  primitiveType: PrimitiveType;  // Type de forme 3D
  primitiveColor?: string;       // Couleur personnalisée
  primitiveVariant?: string;     // Variante du modèle
  dimensions: {                  // Dimensions réelles
    length: number;              // Longueur (m)
    width: number;               // Largeur (m)
    height: number;              // Hauteur (m)
  };
  power?: string;                // Puissance électrique
  capacity?: string;             // Capacité (miners, MW...)
  tags: string[];                // Tags de recherche
  quality: string;               // Qualité du modèle
  featured?: boolean;            // Mis en avant
  manufacturer?: string;         // Fabricant
  specifications?: any;          // Specs techniques
}
```

### Exemple de Modèle

```json
{
  "id": "antspace-hk3-v5-01",
  "name": "Antspace HK3 V5",
  "category": "container",
  "description": "Conteneur de mining hydro-refroidi nouvelle génération",
  "primitiveType": "container",
  "primitiveColor": "#8AFD81",
  "primitiveVariant": "antspace",
  "dimensions": {
    "length": 6.058,
    "width": 2.438,
    "height": 2.896
  },
  "power": "250kW",
  "capacity": "210 miners",
  "tags": ["bitmain", "hydro", "immersion", "s19"],
  "quality": "ultra-realistic",
  "featured": true,
  "manufacturer": "Bitmain"
}
```

---

## 📊 KPIs PRINCIPAUX

### Header KPIs

**Total Models**
- **Valeur :** `UNIFIED_MODEL_CATALOG.length`
- **Description :** Nombre total de modèles dans le catalogue

### Filtered Results

**Displayed Models**
- **Valeur :** `filteredModels.length`
- **Description :** Nombre de modèles après filtres
- **Affichage :** Footer avec format "X modèle(s) affiché(s)"

### Category Counts

**Per Category**
- **Calcul :** `categoryCounts[categoryId]`
- **Méthode :** Reduce sur UNIFIED_MODEL_CATALOG
- **Affichage :** Badge count sur chaque filtre

---

## 🎬 ANIMATIONS & INTERACTIONS

### Animations Framer Motion

#### Container Stagger
```javascript
containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    staggerChildren: 0.05,  // 50ms entre chaque enfant
  }
}
```

#### Item Spring Animation
```javascript
itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,        // Décalage bas
    scale: 0.95   // Légèrement réduit
  },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,   // Ressort raide
      damping: 15,      // Amortissement
    }
  }
}
```

#### Card Hover
```javascript
whileHover={{ y: -4 }}  // Lève de 4px
transition={{ 
  type: 'spring', 
  stiffness: 300,    // Ressort très raide (rapide)
  damping: 20        // Bon amortissement
}}
```

---

### Animations 3D (Three.js)

#### Rotation Continue
```javascript
useFrame((state, delta) => {
  const targetSpeed = hovered ? 1.5 : 0.4;
  speedRef.current += (targetSpeed - speedRef.current) * 0.1;
  groupRef.current.rotation.y += delta * speedRef.current;
})
```

**Caractéristiques :**
- **Vitesse normale :** 0.4 rad/s
- **Vitesse hover :** 1.5 rad/s
- **Transition :** Smooth lerp (0.1 factor)
- **Frame rate :** 60fps (via requestAnimationFrame)

#### Camera Setup
```javascript
camera.position.set(distance, height, distance);
camera.lookAt(0, lookAtY, 0);
```

**Configuration par modèle :**
- Chaque type a sa distance/hauteur optimale
- Point de visée (lookAtY) ajusté pour centrage
- FOV : 35° (perspective modérée)

---

## 🎨 SYSTÈME DE QUALITÉ

### 4 Niveaux de Qualité

#### Ultra-Realistic (Ultra HD)
- **Valeur :** `ultra-realistic`
- **Couleur :** #8AFD81 (vert)
- **Description :** Modèles 4K avec PBR complet
- **Caractéristiques :**
  - Textures 4K
  - Normal maps détaillées
  - Roughness/Metalness maps
  - AO (Ambient Occlusion)

#### High
- **Valeur :** `high`
- **Couleur :** #3b82f6 (bleu)
- **Description :** Haute définition
- **Textures :** 2K

#### Standard
- **Valeur :** `standard`
- **Couleur :** #64748b (gris)
- **Description :** Qualité standard
- **Textures :** 1K

#### Basic
- **Valeur :** `basic`
- **Couleur :** #94a3b8 (gris clair)
- **Description :** Qualité basique
- **Textures :** 512px

---

## 🔄 ÉTAT VIDE (Empty State)

**Condition d'affichage :**
- Aucun modèle après filtrage
- `filteredModels.length === 0`

**Contenu :**
- **Icône :** Box (grande, grise)
- **Titre :** "Aucun modèle trouvé"
- **Description :** "Essayez de modifier vos filtres de recherche"
- **Action :** Bouton "Réinitialiser les filtres"
  - Click : Reset `searchQuery` et `selectedCategory`

---

## 📊 FOOTER STATS

### Informations affichées

**Gauche :**
- **Count :** "X modèle(s) affiché(s)"
- **Format :** Singulier/pluriel automatique

**Droite :**

**Formats supportés :**
- **Icône :** Box
- **Texte :** "Formats: GLB, GLTF"
- **Description :** Formats de fichiers 3D standard

**Qualité :**
- **Icône :** Sparkles (#8AFD81)
- **Texte :** "Qualité 4K Ultra"
- **Description :** Résolution maximale

---

## 🚀 NAVIGATION VERS WORKSPACE

### Action principale

**Click sur modèle :**
```javascript
handleOpenWorkspace(modelId) {
  router.push(`/3d-workspace/${modelId}`);
}
```

**Route cible :** `/3d-workspace/{modelId}`

**Page destination :**
- Workspace 3D complet
- Éditeur interactif
- Outils de manipulation
- Export Unreal Engine

---

## 🎯 FONCTIONNALITÉS CLÉS

### 1. Recherche Full-Text
- Recherche dans nom, description, tags
- Temps réel (onChange)
- Insensible à la casse
- Clear button intégré

### 2. Filtrage Multi-Critères
- Par catégorie (7 catégories)
- Par recherche texte
- Combinable (AND logic)

### 3. Double Vue
- Grid compact (4 cols)
- Large détaillé (3 cols + tags)
- Toggle instantané

### 4. Prévisualisation 3D Temps Réel
- WebGL natif dans navigateur
- Rotation interactive
- 60fps constant
- Lazy loading intelligent

### 5. Modèles Vedette
- Section dédiée
- Badge Featured
- Mise en avant automatique

### 6. Performance Optimale
- IntersectionObserver
- React memoization
- Canvas lazy loading
- GPU optimization

---

## 📊 RÉSUMÉ TECHNIQUE

### Technologies Core
- **Three.js** : Moteur 3D WebGL
- **React Three Fiber** : React renderer pour Three.js
- **@react-three/drei** : Helpers 3D
- **Framer Motion** : Animations UI
- **Next.js** : Framework React

### Optimisations
- IntersectionObserver pour lazy loading
- React.memo pour éviter re-renders
- DPR adaptatif [1, 1.5]
- Canvas pooling

### Performance
- **Target :** 60fps constant
- **Lazy load :** Seulement modèles visibles
- **Memory :** Optimisée via cleanup automatique
- **GPU :** Configuration équilibrée

### Formats 3D
- **GLB** : Binary glTF (recommandé)
- **GLTF** : Text glTF
- **Qualité :** Jusqu'à 4K Ultra

---

**Document créé le :** 24 Décembre 2025  
**Version :** 1.0  
**Page :** Gallery  
**Route :** `/gallery`



