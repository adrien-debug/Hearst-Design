# 🎨 PROMPT ULTIME - DESIGN MODERNE GALLERY 2025

**Date :** 24 Décembre 2025  
**Page cible :** Gallery (`/gallery` - Port 3000)  
**Objectif :** Design ultra-moderne, frais, épuré avec beaux contrastes

---

## 🎯 BRIEFING DESIGN

### Vision Créative
Transformer la Gallery en une expérience visuelle **premium mais minimaliste** - inspirée par les interfaces modernes de Apple, Stripe, Linear et Vercel. L'objectif est d'obtenir un design qui respire, avec beaucoup d'espace blanc, des contrastes subtils mais puissants, et une typographie élégante.

### Principes Directeurs
1. **Lumière et Air** : Plus de blanc, plus d'espace négatif
2. **Contraste Intelligent** : Noir profond vs Blanc pur (pas de gris fades)
3. **Typographie Premium** : Police moderne, espacements généreux
4. **Subtilité** : Pas de néons, pas de sur-brillance, pas d'effets lourds
5. **Fluidité** : Animations douces et naturelles
6. **Hiérarchie Claire** : Information structurée visuellement

---

## 🎨 PALETTE DE COULEURS MODERNE

### 🔥 Proposition #1 : SLATE + ACCENT VERT (Recommandée)

**Philosophie :** Design sombre élégant avec accent vert électrique et beaucoup de blanc pour les contenus.

#### Couleurs Principales

```css
/* ============================================
   BACKGROUNDS - Dégradés de gris modernes
   ============================================ */

--bg-primary: #0A0A0A;           /* Noir profond (body) */
--bg-secondary: #FFFFFF;          /* Blanc pur (cards principales) */
--bg-tertiary: #F8F9FA;          /* Blanc cassé (hover cards) */
--bg-quaternary: #F1F3F5;        /* Gris ultra-léger (zones secondaires) */

/* Zones sombres (header, footer, sidebar) */
--dark-primary: #0F172A;         /* Slate 900 - Sombre élégant */
--dark-secondary: #1E293B;       /* Slate 800 - Sombre doux */
--dark-accent: #334155;          /* Slate 700 - Hover sombre */

/* ============================================
   TEXTE - Contraste maximal
   ============================================ */

--text-primary: #0A0A0A;         /* Noir profond (titres, contenu principal) */
--text-secondary: #475569;       /* Slate 600 (descriptions) */
--text-tertiary: #64748B;        /* Slate 500 (labels, metadata) */
--text-muted: #94A3B8;           /* Slate 400 (placeholders) */

/* Texte sur fond sombre */
--text-on-dark: #FFFFFF;         /* Blanc pur */
--text-on-dark-secondary: #E2E8F0; /* Slate 200 */

/* ============================================
   ACCENT - Vert électrique Hearst
   ============================================ */

--accent-primary: #10B981;       /* Emerald 500 - Vert moderne */
--accent-hover: #059669;         /* Emerald 600 - Hover */
--accent-light: #D1FAE5;         /* Emerald 100 - Backgrounds légers */
--accent-ultra-light: #ECFDF5;   /* Emerald 50 - Zones d'accent subtiles */

/* Alternative si vous voulez garder le vert Hearst original */
--accent-hearst: #8AFD81;        /* Vert Hearst classique */
--accent-hearst-dark: #6FDC66;   /* Version plus foncée */

/* ============================================
   BORDURES - Subtilité maximale
   ============================================ */

--border-primary: #E5E7EB;       /* Gray 200 - Bordures principales */
--border-secondary: #F3F4F6;     /* Gray 100 - Bordures ultra-légères */
--border-hover: #D1D5DB;         /* Gray 300 - Hover */
--border-accent: rgba(16, 185, 129, 0.2); /* Accent avec alpha */

/* Bordures sur fond sombre */
--border-dark: rgba(255, 255, 255, 0.1);
--border-dark-hover: rgba(255, 255, 255, 0.2);

/* ============================================
   ÉTATS - Feedback utilisateur
   ============================================ */

--success: #10B981;              /* Emerald 500 */
--success-bg: #D1FAE5;           /* Emerald 100 */

--warning: #F59E0B;              /* Amber 500 */
--warning-bg: #FEF3C7;           /* Amber 100 */

--error: #EF4444;                /* Red 500 */
--error-bg: #FEE2E2;             /* Red 100 */

--info: #3B82F6;                 /* Blue 500 */
--info-bg: #DBEAFE;              /* Blue 100 */

/* ============================================
   OMBRES - Profondeur subtile
   ============================================ */

--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);

/* Ombre colorée pour accent (très subtile) */
--shadow-accent: 0 4px 12px rgba(16, 185, 129, 0.15);
```

---

### 🌊 Proposition #2 : BLUE + CYAN (Alternative moderne)

**Philosophie :** Design tech moderne avec tons bleus froids et cyan pour une ambiance data-center futuriste mais épurée.

```css
/* BACKGROUNDS */
--bg-primary: #FAFBFC;           /* Blanc cassé très léger */
--bg-secondary: #FFFFFF;          /* Blanc pur */
--bg-tertiary: #F5F8FA;          /* Bleu gris ultra-léger */

--dark-primary: #0D1117;         /* GitHub dark */
--dark-secondary: #161B22;       /* GitHub dark secondary */

/* ACCENT */
--accent-primary: #06B6D4;       /* Cyan 500 */
--accent-hover: #0891B2;         /* Cyan 600 */
--accent-light: #CFFAFE;         /* Cyan 100 */

--accent-secondary: #3B82F6;     /* Blue 500 - Accent secondaire */
--accent-secondary-light: #DBEAFE; /* Blue 100 */

/* TEXTE */
--text-primary: #0F172A;         /* Slate 900 */
--text-secondary: #475569;       /* Slate 600 */
--text-tertiary: #64748B;        /* Slate 500 */
```

---

## 📐 TYPOGRAPHIE MODERNE

### Police Recommandée : **Inter** (gratuite, ultra-moderne)

**Pourquoi Inter ?**
- Dessinée spécifiquement pour les interfaces
- Excellente lisibilité à toutes les tailles
- Spacing optimisé pour le web
- Utilisée par Stripe, GitHub, Vercel, Linear
- Variable font disponible (économie de poids)

#### Import Google Fonts

```html
<!-- Dans <head> ou layout.tsx -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

#### Alternative : **SF Pro Display** (Apple)
Si vous êtes déjà sur macOS et voulez le look Apple premium.

#### Alternative 2 : **Poppins** (plus arrondie, plus friendly)

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

### 🎯 Système Typographique Complet

```css
/* ============================================
   FAMILLE DE POLICES
   ============================================ */

--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Inter', sans-serif;          /* Titres */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace; /* Code, données */

/* ============================================
   TAILLES - Scale harmonieuse
   ============================================ */

--text-xs: 0.6875rem;     /* 11px - Tiny labels, badges */
--text-sm: 0.8125rem;     /* 13px - Body secondaire, captions */
--text-base: 0.9375rem;   /* 15px - Body principal */
--text-md: 1rem;          /* 16px - Body large, labels importants */
--text-lg: 1.125rem;      /* 18px - Sous-titres */
--text-xl: 1.375rem;      /* 22px - Section titles */
--text-2xl: 1.75rem;      /* 28px - Page titles */
--text-3xl: 2.25rem;      /* 36px - Hero titles */
--text-4xl: 3rem;         /* 48px - Display titles */

/* ============================================
   POIDS - Limités pour cohérence
   ============================================ */

--font-light: 300;        /* Rarement utilisé */
--font-normal: 400;       /* Body text */
--font-medium: 500;       /* Labels, navigation */
--font-semibold: 600;     /* Titres, emphase */
--font-bold: 700;         /* Titres principaux uniquement */

/* ============================================
   LINE HEIGHTS - Lisibilité optimale
   ============================================ */

--leading-none: 1;        /* Titres compacts */
--leading-tight: 1.25;    /* Titres */
--leading-snug: 1.375;    /* Sous-titres */
--leading-normal: 1.5;    /* Body text (STANDARD) */
--leading-relaxed: 1.625; /* Long-form content */
--leading-loose: 2;       /* Très aéré */

/* ============================================
   LETTER SPACING - Subtil mais important
   ============================================ */

--tracking-tighter: -0.05em;  /* Grands titres */
--tracking-tight: -0.025em;   /* Titres normaux */
--tracking-normal: 0;         /* Body text */
--tracking-wide: 0.025em;     /* Labels, boutons */
--tracking-wider: 0.05em;     /* UPPERCASE labels */
--tracking-widest: 0.1em;     /* Badges, tags */
```

---

### 📝 Classes Typographiques Prêtes à l'Emploi

```css
/* Hero Title (page principale) */
.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);      /* 36px */
  font-weight: var(--font-bold);   /* 700 */
  line-height: var(--leading-tight); /* 1.25 */
  letter-spacing: var(--tracking-tighter); /* -0.05em */
  color: var(--text-primary);
}

/* Section Title */
.section-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);       /* 22px */
  font-weight: var(--font-semibold); /* 600 */
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
}

/* Card Title */
.card-title {
  font-family: var(--font-primary);
  font-size: var(--text-md);       /* 16px */
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
}

/* Body Text */
.body-text {
  font-family: var(--font-primary);
  font-size: var(--text-base);     /* 15px */
  font-weight: var(--font-normal);
  line-height: var(--leading-normal); /* 1.5 */
  letter-spacing: var(--tracking-normal);
  color: var(--text-primary);
}

/* Body Secondary (descriptions) */
.body-secondary {
  font-family: var(--font-primary);
  font-size: var(--text-sm);       /* 13px */
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed); /* 1.625 */
  color: var(--text-secondary);
}

/* Label / Metadata */
.label {
  font-family: var(--font-primary);
  font-size: var(--text-xs);       /* 11px */
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--text-tertiary);
}

/* Badge */
.badge-text {
  font-family: var(--font-primary);
  font-size: var(--text-xs);       /* 11px */
  font-weight: var(--font-semibold);
  line-height: var(--leading-none);
  letter-spacing: var(--tracking-widest); /* 0.1em */
  text-transform: uppercase;
}
```

---

## 🏗️ STRUCTURE LAYOUT - Respiration Maximale

### Espacements Modernes (Généreux)

```css
/* ============================================
   ESPACEMENTS - Scale 8px base
   ============================================ */

--space-1: 0.25rem;      /* 4px - Micro spacing */
--space-2: 0.5rem;       /* 8px - Tight */
--space-3: 0.75rem;      /* 12px - Small */
--space-4: 1rem;         /* 16px - Base */
--space-5: 1.25rem;      /* 20px - Medium */
--space-6: 1.5rem;       /* 24px - Comfortable */
--space-8: 2rem;         /* 32px - Large */
--space-10: 2.5rem;      /* 40px - XL */
--space-12: 3rem;        /* 48px - XXL */
--space-16: 4rem;        /* 64px - Section spacing */
--space-20: 5rem;        /* 80px - Hero spacing */
--space-24: 6rem;        /* 96px - Page spacing */
--space-32: 8rem;        /* 128px - Mega spacing */

/* ============================================
   RÈGLES D'ESPACEMENT MODERNES
   ============================================ */

/* Entre sections : 80-96px (space-20 à space-24) */
/* Entre éléments : 48-64px (space-12 à space-16) */
/* Dans cards : 24-32px (space-6 à space-8) */
/* Entre textes : 16-24px (space-4 à space-6) */
/* Micro-spacing : 8-12px (space-2 à space-3) */
```

### Container Widths

```css
/* ============================================
   CONTENEURS - Max widths
   ============================================ */

--container-sm: 640px;    /* Prose, formulaires */
--container-md: 768px;    /* Contenu standard */
--container-lg: 1024px;   /* Contenu large */
--container-xl: 1280px;   /* Gallery grids */
--container-2xl: 1536px;  /* Full width dashboards */

/* Padding horizontal standard */
--container-padding: 2rem; /* 32px desktop */
--container-padding-mobile: 1rem; /* 16px mobile */
```

---

## 🎴 COMPOSANTS - Redesign Cards

### Model Card - Version Moderne Ultra-Épurée

```tsx
// Structure recommandée pour une card moderne

<div className="group relative">
  {/* Card Container - Blanc pur avec ombre subtile */}
  <div className="
    bg-white 
    rounded-2xl 
    overflow-hidden
    border border-gray-200
    hover:border-gray-300
    transition-all duration-300 ease-out
    hover:shadow-xl
    cursor-pointer
  ">
    
    {/* Preview 3D - Fond gris ultra-léger */}
    <div className="
      relative 
      aspect-[4/3] 
      bg-gray-50
      overflow-hidden
    ">
      {/* Canvas 3D ici */}
      
      {/* Hover Overlay - Très subtil */}
      <div className="
        absolute inset-0 
        bg-gradient-to-t from-black/60 via-black/0 to-transparent
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        flex items-end justify-center p-6
      ">
        <button className="
          px-6 py-3
          bg-white text-gray-900
          rounded-xl
          font-medium text-sm
          transform translate-y-2 group-hover:translate-y-0
          opacity-0 group-hover:opacity-100
          transition-all duration-300
          hover:scale-105
          shadow-lg
        ">
          Ouvrir le modèle →
        </button>
      </div>
      
      {/* Badges - Position absolue top */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
        {/* Badge Catégorie */}
        <span className="
          px-3 py-1.5
          bg-white/95 backdrop-blur-sm
          rounded-lg
          text-xs font-semibold uppercase tracking-widest
          text-gray-700
          border border-gray-200
        ">
          Container
        </span>
        
        {/* Badge Qualité */}
        <span className="
          px-3 py-1.5
          bg-emerald-50 backdrop-blur-sm
          rounded-lg
          text-xs font-semibold uppercase tracking-widest
          text-emerald-700
          border border-emerald-200
        ">
          ✦ Ultra HD
        </span>
      </div>
    </div>
    
    {/* Content - Padding généreux */}
    <div className="p-6 space-y-4">
      
      {/* Header */}
      <div className="space-y-2">
        <h3 className="
          text-lg font-semibold 
          text-gray-900
          group-hover:text-emerald-600
          transition-colors
          leading-tight
        ">
          Antspace HK3 V5
        </h3>
        
        <p className="
          text-xs uppercase tracking-wider
          text-gray-500 font-medium
        ">
          Bitmain
        </p>
      </div>
      
      {/* Description */}
      <p className="
        text-sm leading-relaxed
        text-gray-600
        line-clamp-2
      ">
        Conteneur de mining hydro-refroidi nouvelle génération avec système de cooling intégré.
      </p>
      
      {/* Specs - Grille légère */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        
        {/* Dimensions */}
        <div className="
          flex items-center gap-2
          px-3 py-2
          bg-gray-50 rounded-lg
          border border-gray-100
        ">
          <svg className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-mono text-gray-600">
            6.1×2.4×2.9m
          </span>
        </div>
        
        {/* Power */}
        <div className="
          flex items-center gap-2
          px-3 py-2
          bg-emerald-50 rounded-lg
          border border-emerald-100
        ">
          <svg className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-semibold text-emerald-700">
            250kW
          </span>
        </div>
        
      </div>
      
      {/* Tags - Mode Large uniquement */}
      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
        <span className="px-2 py-1 bg-gray-100 rounded-md text-[10px] font-medium text-gray-600 uppercase tracking-wide">
          Bitmain
        </span>
        <span className="px-2 py-1 bg-gray-100 rounded-md text-[10px] font-medium text-gray-600 uppercase tracking-wide">
          Hydro
        </span>
        <span className="px-2 py-1 bg-gray-100 rounded-md text-[10px] font-medium text-gray-600 uppercase tracking-wide">
          S19
        </span>
      </div>
      
    </div>
  </div>
</div>
```

---

### Search Bar - Version Moderne

```tsx
<div className="relative max-w-xl">
  {/* Icon gauche */}
  <div className="absolute left-4 top-1/2 -translate-y-1/2">
    <Search className="w-5 h-5 text-gray-400" />
  </div>
  
  {/* Input */}
  <input
    type="text"
    placeholder="Rechercher un modèle..."
    className="
      w-full
      pl-12 pr-12 py-3.5
      bg-white
      border border-gray-200
      rounded-xl
      text-sm text-gray-900 placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
      transition-all
    "
  />
  
  {/* Clear button */}
  {searchQuery && (
    <button className="
      absolute right-3 top-1/2 -translate-y-1/2
      p-2 rounded-lg
      text-gray-400 hover:text-gray-600 hover:bg-gray-100
      transition-colors
    ">
      <X className="w-4 h-4" />
    </button>
  )}
</div>
```

---

### Category Pills - Version Moderne

```tsx
<button className={`
  group
  flex items-center gap-2.5
  px-4 py-2.5
  rounded-xl
  border
  transition-all duration-200
  ${isActive 
    ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
  }
`}>
  {/* Icon */}
  <Icon className={`
    w-4 h-4 transition-transform group-hover:scale-110
    ${isActive ? 'text-emerald-600' : 'text-gray-400'}
  `} />
  
  {/* Label */}
  <span className="text-xs font-semibold uppercase tracking-wider">
    {category.name}
  </span>
  
  {/* Count Badge */}
  <span className={`
    px-2 py-0.5 rounded-full text-[10px] font-bold
    ${isActive 
      ? 'bg-emerald-200 text-emerald-700' 
      : 'bg-gray-100 text-gray-500'
    }
  `}>
    {count}
  </span>
</button>
```

---

## ✨ ANIMATIONS - Subtilité Maximale

### Transitions Naturelles

```css
/* ============================================
   DURÉES - Plus longues pour fluidité
   ============================================ */

--duration-instant: 100ms;   /* Micro-interactions */
--duration-fast: 200ms;      /* Hovers basiques */
--duration-normal: 300ms;    /* Standard (RECOMMANDÉ) */
--duration-slow: 500ms;      /* Animations complexes */
--duration-slower: 700ms;    /* Hero animations */

/* ============================================
   EASINGS - Courbes naturelles
   ============================================ */

/* Default - Pour tout */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);

/* Ease-out - Sorties rapides (préféré pour UI) */
--ease-out: cubic-bezier(0, 0, 0.2, 1);

/* Ease-in-out - Transitions douces */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Spring - Animations naturelles */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Custom - Extra smooth */
--ease-custom: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

---

### Animations Spécifiques

#### Hover Card (Subtil mais visible)

```css
.card {
  transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 12px 24px -8px rgba(0, 0, 0, 0.12),
    0 4px 12px -4px rgba(0, 0, 0, 0.08);
}
```

#### Fade In (Apparition douce)

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 500ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
```

#### Stagger (Cascade d'éléments)

```tsx
// Avec Framer Motion
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,  // 80ms entre chaque
        delayChildren: 0.1,
      }
    }
  }}
  initial="hidden"
  animate="show"
>
  {items.map((item) => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.96 },
        show: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }
        }
      }}
    >
      {/* Card content */}
    </motion.div>
  ))}
</motion.div>
```

---

## 🎯 MICRO-INTERACTIONS - Les Secrets des Pros

### 1. Boutons - Feedback immédiat

```tsx
<button className="
  group relative
  px-6 py-3
  bg-emerald-500 hover:bg-emerald-600
  text-white font-medium
  rounded-xl
  overflow-hidden
  transition-all duration-300
  
  /* Scale au click */
  active:scale-[0.98]
  
  /* Ombre qui grandit au hover */
  hover:shadow-emerald-500/30 hover:shadow-xl
">
  {/* Shine effect au hover */}
  <div className="
    absolute inset-0
    bg-gradient-to-r from-transparent via-white/20 to-transparent
    -translate-x-full group-hover:translate-x-full
    transition-transform duration-1000
  " />
  
  <span className="relative z-10">
    Voir le modèle
  </span>
</button>
```

---

### 2. Input Focus - État actif clair

```tsx
<input className="
  w-full px-4 py-3
  bg-white
  border-2 border-gray-200
  rounded-xl
  
  /* Focus state */
  focus:border-emerald-500
  focus:ring-4 focus:ring-emerald-500/10
  focus:outline-none
  
  /* Transition fluide */
  transition-all duration-200
" />
```

---

### 3. Skeleton Loading - Pendant chargement 3D

```tsx
<div className="animate-pulse space-y-4">
  {/* Preview placeholder */}
  <div className="aspect-[4/3] bg-gray-200 rounded-2xl" />
  
  {/* Content placeholders */}
  <div className="space-y-3 p-6">
    <div className="h-4 bg-gray-200 rounded w-3/4" />
    <div className="h-3 bg-gray-200 rounded w-1/2" />
    <div className="grid grid-cols-2 gap-3 pt-2">
      <div className="h-10 bg-gray-200 rounded-lg" />
      <div className="h-10 bg-gray-200 rounded-lg" />
    </div>
  </div>
</div>
```

---

### 4. Tooltip - Information contextuelle

```tsx
<div className="group relative">
  <button className="...">
    <Info className="w-4 h-4" />
  </button>
  
  {/* Tooltip */}
  <div className="
    absolute bottom-full left-1/2 -translate-x-1/2 mb-2
    px-3 py-2
    bg-gray-900 text-white text-xs
    rounded-lg
    whitespace-nowrap
    opacity-0 group-hover:opacity-100
    invisible group-hover:visible
    transition-all duration-200
    pointer-events-none
  ">
    Informations techniques
    
    {/* Arrow */}
    <div className="
      absolute top-full left-1/2 -translate-x-1/2
      w-2 h-2 bg-gray-900
      transform rotate-45
    " />
  </div>
</div>
```

---

### 5. Badge Animated - Pulse subtil

```tsx
<span className="relative inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg">
  {/* Pulse indicator */}
  <span className="relative flex h-2 w-2">
    <span className="
      absolute inline-flex h-full w-full
      rounded-full bg-emerald-400
      opacity-75
      animate-ping
    " />
    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
  </span>
  
  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
    Featured
  </span>
</span>
```

---

## 🎨 HERO SECTION - Redesign Moderne

### Version Minimaliste (Recommandée)

```tsx
<section className="relative py-20 px-8 bg-gradient-to-b from-gray-50 to-white">
  
  {/* Background Pattern - Très subtil */}
  <div className="absolute inset-0 opacity-[0.03]">
    <div className="absolute inset-0" style={{
      backgroundImage: `
        linear-gradient(to right, #e5e7eb 1px, transparent 1px),
        linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
      `,
      backgroundSize: '48px 48px'
    }} />
  </div>
  
  <div className="relative max-w-5xl mx-auto">
    
    {/* Breadcrumb / Back link */}
    <button className="
      group inline-flex items-center gap-2 mb-8
      text-sm font-medium text-gray-600 hover:text-gray-900
      transition-colors
    ">
      <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      Retour au Dashboard
    </button>
    
    {/* Main Content */}
    <div className="space-y-6">
      
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="
          inline-flex items-center gap-2 px-4 py-2
          bg-white border border-gray-200 rounded-xl
          text-xs font-semibold uppercase tracking-wider text-gray-700
        ">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          Galerie 3D
        </span>
        
        <span className="
          px-4 py-2
          bg-emerald-50 border border-emerald-200 rounded-xl
          text-xs font-semibold uppercase tracking-wider text-emerald-700
        ">
          {modelCount} Modèles
        </span>
        
        <span className="
          px-4 py-2
          bg-blue-50 border border-blue-200 rounded-xl
          text-xs font-semibold uppercase tracking-wider text-blue-700
        ">
          UE5 Ready
        </span>
      </div>
      
      {/* Title */}
      <h1 className="
        text-5xl font-bold leading-tight tracking-tighter
        text-gray-900
        max-w-3xl
      ">
        Galerie de Modèles 3D
      </h1>
      
      {/* Description */}
      <p className="
        text-lg leading-relaxed
        text-gray-600
        max-w-2xl
      ">
        Explorez notre bibliothèque d'assets ultra-réalistes pour l'infrastructure mining. 
        Chaque modèle est optimisé pour le rendu temps réel Unreal Engine 5.
      </p>
      
      {/* Stats - Horizontal */}
      <div className="flex items-center gap-8 pt-4">
        <div className="space-y-1">
          <div className="text-3xl font-bold text-gray-900 font-mono">
            {modelCount}
          </div>
          <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">
            Assets
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-3xl font-bold text-gray-900 font-mono">
            4K
          </div>
          <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">
            Textures
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-3xl font-bold text-gray-900 font-mono">
            PBR
          </div>
          <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">
            Materials
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>
```

---

## 📱 RESPONSIVENESS - Mobile First

### Breakpoints Modernes

```css
/* ============================================
   BREAKPOINTS
   ============================================ */

--breakpoint-sm: 640px;    /* Mobile large */
--breakpoint-md: 768px;    /* Tablet portrait */
--breakpoint-lg: 1024px;   /* Tablet landscape / Desktop small */
--breakpoint-xl: 1280px;   /* Desktop */
--breakpoint-2xl: 1536px;  /* Large desktop */
```

### Grid Responsive

```tsx
// Mobile: 1 col
// Tablet: 2 cols
// Desktop: 3 cols
// Large: 4 cols

<div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  gap-6
  lg:gap-8
">
  {/* Cards */}
</div>
```

### Typography Responsive

```tsx
<h1 className="
  text-3xl    /* Mobile: 36px */
  md:text-4xl /* Tablet: 48px */
  lg:text-5xl /* Desktop: 60px */
  font-bold leading-tight tracking-tighter
">
  Title
</h1>
```

---

## 🚀 CHECKLIST DE MISE EN ŒUVRE

### Phase 1 : Fondations (1-2h)

- [ ] **1.1** Installer Inter font (ou alternative)
- [ ] **1.2** Créer variables CSS couleurs (Proposition #1)
- [ ] **1.3** Créer variables CSS typographie
- [ ] **1.4** Créer variables CSS espacements
- [ ] **1.5** Tester sur fond blanc pour body principal

### Phase 2 : Composants Core (2-3h)

- [ ] **2.1** Redesign Hero Section (version minimaliste)
- [ ] **2.2** Redesign Search Bar
- [ ] **2.3** Redesign Category Pills
- [ ] **2.4** Redesign Model Cards (blanc avec ombres subtiles)
- [ ] **2.5** Ajuster badges (nouveaux styles)

### Phase 3 : Micro-interactions (1-2h)

- [ ] **3.1** Hover states sur cards (translateY + shadow)
- [ ] **3.2** Focus states sur inputs (ring coloré)
- [ ] **3.3** Transitions boutons (scale + shadow)
- [ ] **3.4** Animations stagger (Framer Motion)
- [ ] **3.5** Skeleton loading pour 3D

### Phase 4 : Refinement (1-2h)

- [ ] **4.1** Ajuster tous les espacements (plus généreux)
- [ ] **4.2** Vérifier contrastes WCAG (accessibilité)
- [ ] **4.3** Tester responsive (mobile, tablet, desktop)
- [ ] **4.4** Optimiser performance (lazy loading)
- [ ] **4.5** Polish final (micro-ajustements)

---

## 🎯 PROMPT POUR CLAUDE (À utiliser tel quel)

```
Rôle : Tu es un expert en design UI/UX moderne et développeur front-end senior spécialisé en React/Next.js.

Contexte : Je travaille sur une Gallery page (route /gallery, port 3000) qui affiche une bibliothèque de modèles 3D. 
Le design actuel est trop sombre et manque de fraîcheur.

Objectif : Transformer cette page en un design ultra-moderne inspiré de Apple, Stripe, Linear et Vercel avec :
- Beaucoup de blanc (fond principal blanc, cards blanches)
- Contrastes subtils mais puissants (noir profond vs blanc pur)
- Typographie élégante (Inter font)
- Espacements généreux (respiration maximale)
- Animations subtiles (pas de néons, pas de sur-brillance)
- Micro-interactions fluides et naturelles

Palette de couleurs :
- Background principal : Blanc (#FFFFFF)
- Background secondaire : Gris ultra-léger (#F8F9FA)
- Texte principal : Noir profond (#0A0A0A)
- Texte secondaire : Slate 600 (#475569)
- Accent principal : Emerald 500 (#10B981)
- Bordures : Gray 200 (#E5E7EB)
- Ombres : Subtiles, noires avec opacité faible

Typographie :
- Police : Inter (Google Fonts)
- Body : 15px (text-base)
- Titres : 22-36px (text-xl à text-3xl)
- Letter-spacing : Négatif pour titres (-0.025em à -0.05em)
- Line-height : 1.5 pour body, 1.25 pour titres

Composants clés à redesigner :
1. Hero section (minimaliste avec badges horizontaux)
2. Search bar (blanc avec bordure grise, focus ring coloré)
3. Category pills (blanc avec hover subtil, actif = bg-emerald-50)
4. Model cards (blanc pur, ombre subtile, hover = translateY + shadow-xl)
5. Badges (arrondis, backgrounds légers, texte uppercase)

Animations :
- Durée standard : 300ms
- Easing : cubic-bezier(0, 0, 0.2, 1)
- Hover cards : translateY(-4px) + shadow-xl
- Stagger children : 80ms delay
- Transitions : Toujours fluides et naturelles

Espacements :
- Entre sections : 80-96px
- Dans cards : 24-32px
- Gap grilles : 24-32px
- Padding containers : 32px desktop, 16px mobile

Contraintes :
- Conserver la structure React Three Fiber pour 3D
- Garder la logique de filtrage existante
- Mobile-first (responsive)
- Performance optimale (lazy loading)
- Accessibilité WCAG AA

Instructions :
1. Analyse le code actuel de la Gallery page
2. Propose une refonte complète en suivant exactement ce brief
3. Fournis le code complet des composants modifiés
4. Ajoute des commentaires pour les parties critiques
5. Suggère des améliorations UX si pertinentes

Format de sortie :
- Code TypeScript/TSX propre et commenté
- Classes Tailwind CSS
- Variables CSS custom properties
- Exemples d'utilisation
```

---

## 🎨 INSPIRATION - Sites de Référence

### Pour étudier et s'inspirer :

1. **Linear.app** - Animations subtiles, typographie parfaite
2. **Stripe.com** - Contrastes, espacements, clarté
3. **Vercel.com** - Minimalisme, performance, élégance
4. **Apple.com** - Premium, épuré, respiration
5. **Figma.com** - Interface moderne, micro-interactions
6. **Notion.so** - Blanc immaculé, hiérarchie claire
7. **GitHub.com** - Lisibilité, accessibilité, cohérence

### Ce qu'on garde de ces références :

✅ Beaucoup de blanc (80%+ de la surface)  
✅ Texte noir profond (pas de gris fade pour titres)  
✅ Bordures ultra-subtiles (gray-200, opacity faible)  
✅ Ombres douces mais visibles au hover  
✅ Espacements généreux (2-3x plus que habituellement)  
✅ Typographie grande et lisible  
✅ Animations fluides 300ms+  
✅ Focus states accessibles  

❌ Pas de dégradés flashy  
❌ Pas de néons, glows, brillances  
❌ Pas de couleurs saturées partout  
❌ Pas d'animations trop rapides (<200ms)  
❌ Pas de texte gris sur gris  

---

## 🔥 SECRETS DE PRO - Ce que personne ne dit

### 1. L'Espace Négatif est Roi
> "Le white space n'est pas du vide, c'est du luxe"

- Doublez tous vos espacements actuels
- Si ça semble "trop aéré", c'est parfait
- Le confort visuel > densité d'information

### 2. Le Contraste Fait le Design
> "Noir profond vs Blanc pur, pas de demi-mesures"

- Texte principal : toujours noir #0A0A0A (pas #333)
- Fond principal : toujours blanc #FFFFFF (pas #F5F5F5)
- Les gris sont pour les éléments secondaires uniquement

### 3. Les Micro-Interactions Vendent le Design
> "Les utilisateurs ne voient pas le design, ils le ressentent"

- Hover : translateY(-4px) fait toute la différence
- Focus : ring coloré donne confiance
- Loading : skeleton > spinner
- Transitions : 300ms est le sweet spot

### 4. La Typographie Porte 80% du Design
> "Une belle typo sur fond blanc > n'importe quel dégradé"

- Inter > toutes les autres pour UI
- 15px pour body (pas 13px ou 14px)
- Letter-spacing négatif pour titres (-0.025em)
- Line-height 1.5 minimum pour body

### 5. Les Ombres Créent la Profondeur
> "shadow-xl au hover, pas shadow-sm"

- Pas d'ombre au repos (ou ultra-légère)
- shadow-xl au hover avec transition 300ms
- Ombre colorée pour accent (opacity 15%)
- Ombres noires avec opacité faible > ombres grises

### 6. Le Système de 8px est Non-Négociable
> "4, 8, 12, 16, 24, 32, 48, 64... Jamais 15px ou 27px"

- Tous les espacements multiples de 4 (idéalement 8)
- Facilite l'alignement pixel-perfect
- Cohérence visuelle automatique

### 7. Mobile First = Meilleur Design Desktop
> "Contraint sur mobile = épuré partout"

- Commencer par mobile force la simplicité
- Le design desktop en hérite naturellement
- Résistez à la tentation de "remplir" sur grand écran

### 8. L'Animation Doit Être Physique
> "Spring > Linear, toujours"

- cubic-bezier(0, 0, 0.2, 1) pour tout
- Type: 'spring' avec stiffness: 100, damping: 15
- Les animations linéaires sont robotiques
- La nature est fluide, votre UI aussi

### 9. La Couleur est un Accent, Pas une Base
> "80% neutral, 20% couleur"

- Background : blanc/gris
- Texte : noir/slate
- Accent : une seule couleur forte (#10B981)
- La retenue crée l'impact

### 10. La Performance EST une Feature Design
> "60fps ou rien"

- Lazy loading obligatoire pour 3D
- Skeleton > spinner
- Optimistic UI
- Les utilisateurs ressentent chaque frame drop

---

## 📊 MÉTRIQUES DE SUCCÈS

### Comment savoir si le redesign fonctionne :

**Visuellement :**
- [ ] 80%+ de surface blanche/gris clair
- [ ] Contrastes clairs entre sections
- [ ] Hiérarchie visuelle évidente (on sait où regarder)
- [ ] Respiration (espaces vides confortables)
- [ ] Élégance (sentiment de "premium")

**Techniquement :**
- [ ] 60fps constant
- [ ] Time to Interactive < 2s
- [ ] Lighthouse Score > 90
- [ ] Pas de layout shifts
- [ ] Smooth scrolling

**UX :**
- [ ] Interactions évidentes (on sait où cliquer)
- [ ] Feedback immédiat sur actions
- [ ] Loading states clairs
- [ ] Mobile confortable (pas de zoom nécessaire)
- [ ] Accessibilité WCAG AA

**Comparaison Avant/Après :**
- [ ] Sentiment "plus pro"
- [ ] Sentiment "plus aéré"
- [ ] Sentiment "plus moderne"
- [ ] Sentiment "plus rapide"
- [ ] Envie d'explorer plus

---

## 🎬 CONCLUSION

Ce prompt contient **TOUT** ce qu'il faut savoir pour créer un design moderne, frais, et épuré pour votre Gallery. 

**Les 3 règles d'or à retenir :**

1. **BLANC + ESPACE = LUXE**  
   → Plus d'espace blanc, plus de respiration, plus de confort

2. **CONTRASTE + SUBTILITÉ = ÉLÉGANCE**  
   → Noir profond vs Blanc pur, mais avec touches légères

3. **FLUIDITÉ + PERFORMANCE = PLAISIR**  
   → 300ms, spring animations, 60fps constant

**Next Steps :**

1. Montrez ce prompt à Claude (ou n'importe quel LLM)
2. Demandez l'implémentation complète pour votre Gallery
3. Testez sur plusieurs devices
4. Itérez sur les micro-détails
5. Profitez du résultat 🎉

---

**Document créé le :** 24 Décembre 2025  
**Version :** 1.0 ULTRA  
**Pour :** Gallery Page (/gallery, port 3000)  
**Projet :** Hearst Strategic Reserve Qatar

**Author Notes :**  
Ce prompt contient 15 ans d'expérience design condensés en un document.  
Tout est là : couleurs, typographie, espacements, animations, secrets de pro.  
Suivez-le à la lettre = résultat garanti. 🎨✨


