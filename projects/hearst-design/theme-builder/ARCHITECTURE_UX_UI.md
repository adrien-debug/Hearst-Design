# ARCHITECTURE UX/UI - Design System Builder
**Version:** 2.0  
**Date:** Décembre 2024  
**Projet:** Hearst Qatar - Design System Builder  

---

## TABLE DES MATIÈRES

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture Infrastructure](#architecture-infrastructure)
3. [Système de Variables CSS](#système-de-variables-css)
4. [Modes de Navigation](#modes-de-navigation)
5. [Zones d'Interface](#zones-dinterface)
6. [Flow Utilisateur](#flow-utilisateur)
7. [Composants UI](#composants-ui)
8. [Interactions & Animations](#interactions--animations)
9. [Responsive Design](#responsive-design)
10. [Performance](#performance)

---

## VUE D'ENSEMBLE

### Concept Principal

Le **Design System Builder** est une application web qui permet de :
- Configurer des chartes graphiques (couleurs, typographie, espacements)
- Prévisualiser en temps réel les changements
- Sauvegarder des configurations prédéfinies (Favoris)
- Exporter le code CSS généré

### Architecture en 3 Couches

```
┌─────────────────────────────────────────────────────────────┐
│                    COUCHE INTERFACE                          │
│  (Interface Builder - Couleurs neutres)                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  COUCHE CONFIGURATION                        │
│  (Variables CSS dynamiques - Scopées par zone)               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   COUCHE PREVIEW                             │
│  (Live Preview - Charte Hearst appliquée)                    │
└─────────────────────────────────────────────────────────────┘
```

---

## ARCHITECTURE INFRASTRUCTURE

### Structure des Fichiers

```
Charte graphique/
├── index.html                      # Interface principale (442 lignes)
├── ds.css                          # Design System CSS (650 lignes)
├── css/
│   ├── modern-buttons.css          # Styles boutons (535 lignes)
│   ├── modern-typography.css       # Typographie (576 lignes)
│   └── modern-components.css       # Composants (1000 lignes)
├── ARCHITECTURE_UX_UI.md           # Ce document
├── GUIDE_UTILISATEUR.md            # Guide utilisateur
└── INDEX_DOCUMENTS.md              # Index documentation
```

### Technologies Utilisées

| Technologie | Rôle | Pourquoi |
|-------------|------|----------|
| **HTML5** | Structure | Sémantique, accessible |
| **CSS3** | Styles | Variables CSS, Grid, Flexbox |
| **Vanilla JavaScript** | Logique | Léger, performant, pas de framework |
| **CSS Variables** | Tokens | Dynamic theming en temps réel |
| **Python HTTP Server** | Serveur local | Port 8080, simple, rapide |

---

## SYSTÈME DE VARIABLES CSS

### Principe de Séparation

Le système utilise **2 niveaux de variables CSS** :

#### 1. Variables Globales (Interface Builder)

```css
:root {
  /* === INTERFACE BUILDER (Neutre) === */
  --ds-bg-canvas: #0f172a;         /* Fond principal (bleu ardoise) */
  --ds-bg-surface-1: #1e293b;      /* Surface cards */
  --ds-bg-surface-2: #334155;      /* Surface hover */
  
  --ds-text-primary: #f8fafc;      /* Texte principal */
  --ds-text-secondary: #cbd5e1;    /* Texte secondaire */
  
  --ds-green-400: #10b981;         /* Accent neutre (vert émeraude) */
  --ds-focus-ring: #10b981;        /* Focus states */
  
  /* Spacing, Typography, Radius... */
}
```

**Portée :** Toute l'interface builder (sidebar, navigation, contrôles)

#### 2. Variables Scopées (Preview Hearst)

```css
.preview-zone,
.page-content-wrapper {
  /* === CHARTE HEARST (Preview uniquement) === */
  --primary-green: #8afd81;        /* Vert Hearst officiel */
  --bg-primary: #0a0a0a;           /* Noir profond Hearst */
  --bg-secondary: #1a1a1a;         /* Gris foncé Hearst */
  
  --text-primary: #ffffff;         /* Blanc pur */
  --text-on-green: #000000;        /* Noir sur vert (règle Hearst) */
  
  /* 100+ variables Hearst... */
  
  /* Fond forcé */
  background: #0a0a0a;
  color: #ffffff;
}
```

**Portée :** Uniquement la zone de preview à droite

### Avantages de cette Architecture

- **Isolation complète** - Changements preview ≠ changements interface  
- **Pas de conflits** - Variables scopées par sélecteurs CSS  
- **Maintenance facile** - Une source de vérité par zone  
- **Performance** - Pas de recalcul global, juste la zone concernée  

---

## MODES DE NAVIGATION

### 2 Modes Principaux

```
┌─────────────────────────────────────────────────────┐
│  [  Favoris  ]  [  Custom Builder  ]                │  ← Navigation principale
└─────────────────────────────────────────────────────┘
```

#### Mode 1 : **Favoris** (Vue Simple)

**Objectif :** Accès rapide aux configurations prédéfinies

**Interface :**
```
Sidebar:
  ✓ Section "Favoris - Configurations" visible
  ✗ Toutes les autres sections cachées
  ✗ Navigation Custom cachée

Preview:
  → Affiche la dernière configuration appliquée
```

**Cas d'usage :**
- Utilisateur débutant
- Changement rapide de thème
- Tests A/B de configurations

#### Mode 2 : **Custom Builder** (Vue Avancée)

**Objectif :** Personnalisation complète

**Interface :**
```
Sidebar:
  ✗ Section "Favoris" cachée
  ✓ Navigation Custom visible avec :
     - PAGES (Dashboard, New Page...)
     - DESIGN TOKENS (Colors, Typography, Spacing)
     - COMPONENTS (Boxes, Navigation, Forms, Alerts)
  ✓ Toutes les sections accessibles

Preview:
  → Mise à jour dynamique selon la section active
  → Scroll automatique vers la section
```

**Cas d'usage :**
- Utilisateur avancé
- Création de configuration sur mesure
- Ajustements fins de la charte

---

## ZONES D'INTERFACE

### Layout Principal

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER (sticky)                                    [70px]       │
│  Logo | Navigation | Actions                                     │
└─────────────────────────────────────────────────────────────────┘
│                                                                   │
│  ┌─────────────────────────┬───────────────────────────────────┐│
│  │   SIDEBAR (280px)       │    PREVIEW ZONE (flex: 1)         ││
│  │   • Favoris             │                                    ││
│  │   • Custom Nav          │    [LIVE PREVIEW]                  ││
│  │   • Sections            │    Charte Hearst appliquée         ││
│  │                         │                                    ││
│  │   [Builder UI]          │    • Dashboard                     ││
│  │   Couleurs neutres      │    • Components                    ││
│  │                         │    • Vert #8afd81                  ││
│  │                         │    • Fond noir #0a0a0a             ││
│  └─────────────────────────┴───────────────────────────────────┘│
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

### Zone 1 : **Header** (Sticky)

**Rôle :** Navigation globale et actions principales

**Contenu :**
- Logo / Titre du projet
- Navigation principale (Favoris / Custom Builder)
- Actions (Export, Settings, User)

**Styles :**
```css
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 70px;
  background: var(--ds-bg-surface-1);  /* Neutre */
  border-bottom: 1px solid var(--ds-border-subtle);
}
```

### Zone 2 : **Sidebar** (280px fixe)

**Rôle :** Contrôles, sélection de sections, configurations

**Sections :**

1. **Navigation Modes** (Toujours visible)
   ```html
   <div class="quick-nav">
     <button class="quick-nav__tab is-active">Favoris</button>
     <button class="quick-nav__tab">Custom Builder</button>
   </div>
   ```

2. **Section Favoris** (Mode Favoris uniquement)
   - Cartes de configuration prédéfinies
   - Bouton "Créer Config Custom"

3. **Navigation Custom** (Mode Custom uniquement)
   ```
   PAGES
     • Dashboard
     • + New Page
   
   DESIGN TOKENS
     • Colors
     • Typography
     • Spacing
   
   COMPONENTS
     • Boxes
     • Navigation
     • Forms
     • Alerts
   ```

4. **Sections de Contenu** (Mode Custom)
   - Palette de couleurs
   - Échantillons de typographie
   - Grille d'espacements
   - Exemples de composants

**Styles :**
```css
.selector-sidebar {
  width: 280px;
  background: var(--ds-bg-surface-1);  /* Neutre */
  border-right: 1px solid var(--ds-border-subtle);
  overflow-y: auto;
  padding: var(--ds-space-6);
}
```

### Zone 3 : **Preview Zone** (Flex: 1)

**Rôle :** Prévisualisation en temps réel avec la charte appliquée

**Contenu dynamique :**
- Dashboard Hearst Mining
- Components preview
- Pages dynamiques

**Styles :**
```css
.preview-zone {
  flex: 1;
  overflow-y: auto;
  padding: var(--ds-space-8);
  
  /* === CHARTE HEARST APPLIQUÉE === */
  background: #0a0a0a;
  color: #ffffff;
  
  /* + 100 variables Hearst scopées */
}
```

---

## FLOW UTILISATEUR

### Scénario 1 : Utilisateur Débutant (Mode Favoris)

```
1. Arrivée sur la page
   ↓
2. Mode "Favoris" actif par défaut
   ↓
3. Sidebar affiche les configurations prédéfinies
   - Style Hearst Qatar
   - Configuration 2 - Light & Clean
   - Configuration 3 - Tech Dashboard
   - Configuration 4 - Mining Ops
   ↓
4. Clic sur une carte de configuration
   ↓
5. Toast notification : "Configuration appliquée !"
   ↓
6. Preview mise à jour instantanément
   ↓
7. Bouton "Export CSS" pour récupérer le code
```

**Temps moyen :** 10 secondes pour changer de thème

### Scénario 2 : Utilisateur Avancé (Mode Custom)

```
1. Clic sur "Custom Builder"
   ↓
2. Sidebar affiche la navigation Custom
   ↓
3. Exploration des sections :
   - DESIGN TOKENS > Colors
     ↓
   4. Clic sur une palette
     ↓
   5. Preview mise à jour
     ↓
   - COMPONENTS > Boxes
     ↓
   6. Clic sur "Glassmorphism Card"
     ↓
   7. Preview affiche le composant
     ↓
8. Ajustements fins
   ↓
9. Sauvegarde comme nouveau Favori
   ↓
10. Export CSS final
```

**Temps moyen :** 2-5 minutes pour une configuration sur mesure

---

## COMPOSANTS UI

### 1. **Configuration Cards** (Favoris)

**Structure :**
```html
<div class="config-card config-card--hearst" onclick="applyConfig('hearst')">
  <div class="config-card__header">
    <div class="config-card__info">
      <div class="config-card__title">
        Style Hearst Qatar
      </div>
      <div class="config-card__subtitle">
        Vert Hearst (#8AFD81) • Glassmorphism • Modern
      </div>
    </div>
    <div class="config-card__arrow">→</div>
  </div>
  
  <div class="config-card__preview">
    <div class="config-card__preview-bar" style="background: #0f172a;"></div>
    <div class="config-card__preview-bar" style="background: #1e293b;"></div>
    <div class="config-card__preview-bar" style="background: #8AFD81;"></div>
    <div class="config-card__preview-bar" style="background: #7AED71;"></div>
  </div>
</div>
```

**États :**
- Default : Border gris subtil
- Hover : Border vert + lift + shadow
- Active : Border vert + glow persistant

**Interactions :**
```javascript
onclick → applyConfigPreset('config1')
  ↓
1. Récupère les variables de la config
2. Applique au :root ou .preview-zone
3. Affiche toast de confirmation
4. Met à jour l'état actif
```

### 2. **Palette Cards** (Couleurs)

**Structure :**
```html
<div class="palette-card is-active" data-palette="dark-pro">
  <div class="palette-card__colors">
    <div class="palette-card__color" style="background: #0f172a;"></div>
    <div class="palette-card__color" style="background: #10b981;"></div>
    <div class="palette-card__color" style="background: #1e293b;"></div>
    <div class="palette-card__color" style="background: #f8fafc;"></div>
  </div>
  
  <div class="palette-card__info">
    <div class="palette-card__name">Dark Pro</div>
    <div class="palette-card__value">#0f172a, #10b981...</div>
    <div class="palette-card__tag palette-card__tag--active">ACTIVE</div>
  </div>
</div>
```

**Grid 2x2 :** 4 couleurs principales en aperçu

### 3. **Smart Suggestions**

**Concept :** Suggestions intelligentes basées sur le contexte

```html
<div class="smart-suggestions">
  <div class="smart-suggestions__title">
    <span>Suggestions intelligentes</span>
  </div>
  
  <div class="smart-suggestions__list">
    <div class="smart-suggestions__item">
      <span>Dark Pro + Card Glass = Perfect combo</span>
      <span>Essayer →</span>
    </div>
  </div>
</div>
```

**Logique :**
- Analyse les choix actuels
- Propose des combinaisons optimales
- Basé sur des règles prédéfinies

---

## INTERACTIONS & ANIMATIONS

### Micro-interactions

#### 1. **Hover States**

```css
/* Toutes les cartes */
.config-card:hover,
.palette-card:hover,
.component-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Principe :** Lift effect + shadow + border color change

#### 2. **Active States**

```css
.quick-nav__tab.is-active {
  background: var(--ds-green-400);
  color: #000000;
  font-weight: 600;
}
```

**Principe :** Contrast fort pour feedback visuel immédiat

#### 3. **Transitions**

```css
/* Standard */
--ds-dur-fast: 150ms;      /* Hover, active states */
--ds-dur-base: 250ms;      /* Sections, cards */
--ds-dur-slow: 350ms;      /* Modals, panels */

/* Easing */
--ds-ease-standard: cubic-bezier(0.4, 0, 0.2, 1);  /* Material Design */
```

---

## RESPONSIVE DESIGN

### Breakpoints

```css
/* Mobile First */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;  /* Stack vertical */
  }
  
  .selector-sidebar {
    width: 100%;             /* Full width */
    border-right: none;
    border-bottom: 1px solid var(--ds-border-subtle);
  }
  
  .preview-zone {
    padding: var(--ds-space-4);  /* Reduce padding */
  }
  
  .palette-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}

@media (max-width: 480px) {
  .config-card {
    padding: 16px;  /* Reduce padding mobile */
  }
  
  .quick-nav__tab {
    font-size: 12px;
  }
}
```

### Stratégie Mobile

1. **Sidebar Collapsible** (futur)
2. **Bottom Sheet** pour navigation rapide
3. **Touch-friendly** : Min touch target 44x44px
4. **Swipe gestures** : Switch modes

---

## PERFORMANCE

### Optimisations Appliquées

#### 1. **CSS Variables** (pas de recalcul global)

```css
/* BAD - Recalcul de toute la page */
button {
  background: #10b981;
}

/* GOOD - Juste la variable change */
button {
  background: var(--ds-green-400);
}
```

#### 2. **Scope CSS** (isolation)

```css
/* Preview n'affecte pas Builder */
.preview-zone {
  --primary-green: #8afd81;
  /* Pas de pollution globale */
}
```

#### 3. **Lazy Loading** (sections)

```javascript
// Sections cachées ne sont pas rendues
section[style*="display: none"] {
  // Pas de calcul layout
}
```

#### 4. **Debounce** (inputs)

```javascript
// Pour recherche, resize, scroll
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
```

### Métriques

| Métrique | Valeur | Cible |
|----------|--------|-------|
| **First Paint** | ~100ms | < 200ms |
| **Interactive** | ~300ms | < 500ms |
| **CSS Size** | ~50KB | < 100KB |
| **JS Size** | ~15KB | < 50KB |
| **Repaints** | Minimisés | < 60fps |

---

## DESIGN TOKENS STRUCTURE

### Hiérarchie des Tokens

```
PRIMITIVES (couleurs de base)
  ↓
SEMANTIC (signification)
  ↓
COMPONENT (usage spécifique)
```

**Exemple :**

```css
/* PRIMITIVE */
--color-green-500: #10b981;

/* SEMANTIC */
--color-success: var(--color-green-500);
--color-primary: var(--color-green-500);

/* COMPONENT */
--button-bg-primary: var(--color-primary);
--badge-success-bg: var(--color-success);
```

### Nomenclature

```
--{category}-{property}-{variant?}-{state?}

Exemples :
--ds-bg-surface-1          (category: ds, property: bg, variant: surface-1)
--button-text-primary-hover (category: button, property: text, variant: primary, state: hover)
```

---

## RÈGLES & CONTRAINTES

### 1. **Règle Hearst Officielle**

```css
/* CRITIQUE - Ne JAMAIS modifier */
.preview-zone button {
  background: #8afd81;   /* Vert Hearst */
  color: #000000;        /* Texte NOIR obligatoire */
}
```

**Raison :** Accessibilité WCAG AAA (contraste 9.7:1)

### 2. **Isolation Preview**

```css
/* INTERDIT - Pas de Hearst dans Builder */
.selector-sidebar {
  background: #0a0a0a;  /* NON ! */
}

/* CORRECT - Couleurs neutres Builder */
.selector-sidebar {
  background: var(--ds-bg-surface-1);  /* #1e293b */
}
```

### 3. **Performance CSS**

```css
/* ÉVITER - Sélecteur trop large */
* {
  transition: all 0.3s;
}

/* MIEUX - Ciblé */
.config-card {
  transition: transform 0.25s, box-shadow 0.25s;
}
```

### 4. **Accessibilité**

- Tous les boutons ont un `aria-label` ou texte visible
- Focus states visibles (ring vert)
- Contraste min 4.5:1 (WCAG AA)
- Navigation clavier complète

---

## ROADMAP / AMÉLIORATIONS FUTURES

### Phase 1 : Stabilisation (actuelle)
- Séparation Builder / Preview
- Mode Favoris / Custom
- Variables CSS scopées
- Toast notifications

### Phase 2 : Enrichissement
- Drag & drop de composants
- Éditeur de code live
- Export multi-formats (CSS, SCSS, JSON)
- Import de configurations externes

### Phase 3 : Collaboration
- Sauvegarde cloud
- Partage de configurations (URL)
- Versionning (Git-like)
- Commentaires & annotations

### Phase 4 : Intelligence
- Suggestions AI (couleurs complémentaires)
- Génération auto de palettes
- Analyse d'accessibilité en temps réel
- A/B testing intégré

---

## RÉCAPITULATIF TECHNIQUE

### Stack Technique

```yaml
Frontend:
  - HTML5 (Sémantique)
  - CSS3 (Variables, Grid, Flexbox)
  - Vanilla JavaScript (ES6+)
  
Backend:
  - Python HTTP Server (Dev)
  - Port: 8080
  
Assets:
  - Pas de dépendances externes
  - Pas de framework CSS
  - Pas de bibliothèque JS
  
Build:
  - Aucun build step
  - Fichiers servis tels quels
  - Performance native
```

### Points Forts

- **Performance** : Aucune dépendance, charge ultra-rapide  
- **Maintenance** : Code simple, pas de breaking changes  
- **Flexibilité** : Variables CSS = theming dynamique  
- **Isolation** : Builder et Preview indépendants  
- **UX** : Feedback immédiat, animations fluides  

### Points d'Attention

- **Compatibilité** : CSS Variables = IE11 non supporté (OK en 2024)  
- **État** : Pas de state management (Redux/Zustand) - suffisant pour l'usage actuel  
- **Persistance** : localStorage pour l'instant (pas de DB)  

---

## BEST PRACTICES APPLIQUÉES

### CSS

1. **BEM Methodology** (partiel)
   ```css
   .config-card                    /* Block */
   .config-card__header            /* Element */
   .config-card--hearst            /* Modifier */
   ```

2. **Mobile First**
   ```css
   /* Base styles = mobile */
   .card { padding: 12px; }
   
   /* Progressive enhancement */
   @media (min-width: 768px) {
     .card { padding: 24px; }
   }
   ```

3. **CSS Variables Cascade**
   ```css
   :root { --color: blue; }           /* Global */
   .preview { --color: green; }       /* Override scopé */
   button { color: var(--color); }    /* Usage */
   ```

### JavaScript

1. **Event Delegation**
   ```javascript
   // BAD
   document.querySelectorAll('.btn').forEach(btn => {
     btn.addEventListener('click', handler);
   });
   
   // GOOD
   document.body.addEventListener('click', (e) => {
     if (e.target.matches('.btn')) handler(e);
   });
   ```

2. **Pure Functions**
   ```javascript
   // Pas d'effet de bord
   function applyConfig(config) {
     return { ...defaultConfig, ...config };
   }
   ```

3. **Naming Conventions**
   ```javascript
   // Verbs pour fonctions
   function showSection() {}
   function applyConfig() {}
   function updatePreview() {}
   
   // Nouns pour variables
   const activeConfig = {};
   const userPreferences = {};
   ```

---

## CONTACT & SUPPORT

**Projet :** Hearst Qatar Design System  
**Version :** 2.0  
**Date :** Décembre 2024  
**Documentation :** `/ARCHITECTURE_UX_UI.md`  

---

**Fin du document**
