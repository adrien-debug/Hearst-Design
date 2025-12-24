# 🇶🇦 Charte Graphique Hearst Qatar - Guide Complet

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Installation](#installation)
3. [Couleurs](#couleurs)
4. [Typographie](#typographie)
5. [Composants](#composants)
6. [Exemples d'utilisation](#exemples-dutilisation)
7. [Bonnes pratiques](#bonnes-pratiques)

---

## 🎨 Vue d'ensemble

La charte graphique **Hearst Qatar** est un système de design moderne, premium et professionnel caractérisé par :

- **Couleur signature** : Vert Hearst `#8AFD81`
- **Style** : Dark theme avec effets glassmorphism
- **Philosophie** : Modern, Premium, Professional
- **Framework** : CSS pur avec variables CSS (CSS Custom Properties)

---

## 📦 Installation

### Option 1 : Lien direct

```html
<link rel="stylesheet" href="hearst-qatar-theme.css">
```

### Option 2 : Import CSS

```css
@import url('hearst-qatar-theme.css');
```

### Option 3 : Copier les variables

Copiez uniquement les variables CSS `:root` dans votre fichier existant.

---

## 🎨 Couleurs

### Palette Principale

```css
/* Vert Hearst (Couleur signature) */
--hearst-green-primary: #8AFD81;
--hearst-green-hover: #7AED71;
--hearst-green-active: #6ADD61;
--hearst-green-light: #A0FE97;
--hearst-green-dark: #5FCC56;
```

### Surfaces & Backgrounds

```css
--hearst-bg-canvas: #0f172a;        /* Fond principal */
--hearst-bg-surface-1: #1e293b;     /* Cartes niveau 1 */
--hearst-bg-surface-2: #334155;     /* Cartes niveau 2 */
--hearst-bg-surface-3: #475569;     /* Cartes niveau 3 */
```

### Texte

```css
--hearst-text-primary: #F8FAFC;     /* Blanc principal */
--hearst-text-secondary: #CBD5E1;   /* Gris clair */
--hearst-text-tertiary: #94A3B8;    /* Gris moyen */
--hearst-text-disabled: #64748B;    /* Gris désactivé */
```

### Exemple d'utilisation

```html
<div style="background: var(--hearst-bg-canvas); color: var(--hearst-text-primary);">
  <h1 style="color: var(--hearst-green-primary);">Titre Hearst Qatar</h1>
  <p style="color: var(--hearst-text-secondary);">Description secondaire</p>
</div>
```

---

## ✍️ Typographie

### Familles de police

```css
--hearst-font-sans: Inter, system-ui, sans-serif;
--hearst-font-mono: 'IBM Plex Mono', monospace;
--hearst-font-display: Inter, system-ui, sans-serif;
```

### Échelle de tailles

| Classe | Taille | Usage |
|--------|--------|-------|
| `xs` | 11px | Labels, badges |
| `sm` | 13px | Texte secondaire |
| `base` | 15px | Texte principal |
| `lg` | 17px | Texte important |
| `xl` | 20px | Sous-titres |
| `2xl` | 24px | Titres H4 |
| `3xl` | 32px | Titres H3 |
| `4xl` | 40px | Titres H2 |
| `5xl` | 56px | Titres H1 |

### Exemple HTML

```html
<h1>Grand Titre Hearst</h1>
<h2>Sous-titre Important</h2>
<p>Paragraphe de texte standard avec une excellente lisibilité.</p>
```

---

## 🧩 Composants

### 1. Boutons

#### HTML
```html
<!-- Bouton principal (Vert Hearst) -->
<button class="hearst-btn hearst-btn--primary">
  Action Principale
</button>

<!-- Bouton secondaire -->
<button class="hearst-btn hearst-btn--secondary">
  Action Secondaire
</button>

<!-- Bouton ghost -->
<button class="hearst-btn hearst-btn--ghost">
  Action Tertiaire
</button>

<!-- Bouton désactivé -->
<button class="hearst-btn hearst-btn--primary" disabled>
  Désactivé
</button>
```

#### Variantes de taille
```html
<button class="hearst-btn hearst-btn--primary hearst-btn--sm">Petit</button>
<button class="hearst-btn hearst-btn--primary">Normal</button>
<button class="hearst-btn hearst-btn--primary hearst-btn--lg">Grand</button>
```

---

### 2. Cartes (Glassmorphism)

#### Carte Standard
```html
<div class="hearst-card">
  <div class="hearst-card__header">
    <h3 class="hearst-card__title">Titre de la Carte</h3>
  </div>
  <p>Contenu de la carte avec effet glassmorphism</p>
</div>
```

#### Carte avec Glow Effect
```html
<div class="hearst-card hearst-card--glow">
  <h3>Carte Premium</h3>
  <p>Carte avec effet de lueur verte caractéristique</p>
</div>
```

---

### 3. Formulaires

```html
<form>
  <div>
    <label class="hearst-label">Nom Complet</label>
    <input type="text" class="hearst-input" placeholder="Votre nom...">
  </div>
  
  <div>
    <label class="hearst-label">Email</label>
    <input type="email" class="hearst-input" placeholder="exemple@hearst.com">
  </div>
  
  <div>
    <label class="hearst-label">Message</label>
    <textarea class="hearst-textarea" placeholder="Votre message..."></textarea>
  </div>
  
  <button type="submit" class="hearst-btn hearst-btn--primary">
    Envoyer
  </button>
</form>
```

---

### 4. Navigation

```html
<nav class="hearst-nav">
  <button class="hearst-nav__item hearst-nav__item--active">Accueil</button>
  <button class="hearst-nav__item">Projets</button>
  <button class="hearst-nav__item">Équipe</button>
  <button class="hearst-nav__item">Contact</button>
</nav>
```

---

### 5. Badges & Pills

```html
<!-- Status Badges -->
<span class="hearst-badge hearst-badge--success">✅ Actif</span>
<span class="hearst-badge hearst-badge--warning">⚠️ Attention</span>
<span class="hearst-badge hearst-badge--error">❌ Erreur</span>
<span class="hearst-badge hearst-badge--info">ℹ️ Info</span>
```

---

### 6. Alerts

```html
<!-- Alert de succès -->
<div class="hearst-alert hearst-alert--success">
  <span>✓</span>
  <div>
    <strong>Succès !</strong>
    <p>Votre action a été effectuée avec succès.</p>
  </div>
</div>

<!-- Alert d'avertissement -->
<div class="hearst-alert hearst-alert--warning">
  <span>⚠</span>
  <div>
    <strong>Attention</strong>
    <p>Cette action nécessite une confirmation.</p>
  </div>
</div>

<!-- Alert d'erreur -->
<div class="hearst-alert hearst-alert--error">
  <span>✕</span>
  <div>
    <strong>Erreur</strong>
    <p>Une erreur s'est produite lors du traitement.</p>
  </div>
</div>
```

---

### 7. Tableaux

```html
<table class="hearst-table">
  <thead>
    <tr>
      <th>Nom</th>
      <th>Status</th>
      <th>Date</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Projet Alpha</td>
      <td><span class="hearst-badge hearst-badge--success">Actif</span></td>
      <td>24 Déc 2025</td>
      <td><button class="hearst-btn hearst-btn--sm">Voir</button></td>
    </tr>
    <tr>
      <td>Projet Beta</td>
      <td><span class="hearst-badge hearst-badge--warning">En cours</span></td>
      <td>23 Déc 2025</td>
      <td><button class="hearst-btn hearst-btn--sm">Voir</button></td>
    </tr>
  </tbody>
</table>
```

---

## 💡 Exemples d'utilisation

### Exemple 1 : Page Dashboard

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard - Hearst Qatar</title>
  <link rel="stylesheet" href="hearst-qatar-theme.css">
</head>
<body>
  <div style="padding: var(--hearst-space-8);">
    <!-- Header -->
    <header style="margin-bottom: var(--hearst-space-8);">
      <h1>Dashboard Hearst Qatar</h1>
      <p>Vue d'ensemble de vos projets</p>
    </header>
    
    <!-- KPI Cards Grid -->
    <div class="hearst-grid hearst-grid-cols-3 hearst-gap-6">
      <div class="hearst-card">
        <h3 style="color: var(--hearst-green-primary);">24</h3>
        <p class="hearst-text-secondary">Projets Actifs</p>
      </div>
      
      <div class="hearst-card">
        <h3 style="color: var(--hearst-green-primary);">87%</h3>
        <p class="hearst-text-secondary">Taux de Réussite</p>
      </div>
      
      <div class="hearst-card">
        <h3 style="color: var(--hearst-green-primary);">12.5k</h3>
        <p class="hearst-text-secondary">Utilisateurs</p>
      </div>
    </div>
    
    <!-- Actions -->
    <div style="margin-top: var(--hearst-space-8); display: flex; gap: var(--hearst-space-4);">
      <button class="hearst-btn hearst-btn--primary">Nouveau Projet</button>
      <button class="hearst-btn hearst-btn--secondary">Exporter Données</button>
    </div>
  </div>
</body>
</html>
```

---

### Exemple 2 : Formulaire de Contact

```html
<div class="hearst-card" style="max-width: 600px; margin: 0 auto;">
  <div class="hearst-card__header">
    <h2 class="hearst-card__title">Contactez-nous</h2>
  </div>
  
  <form>
    <div style="margin-bottom: var(--hearst-space-6);">
      <label class="hearst-label">Nom Complet</label>
      <input type="text" class="hearst-input" placeholder="John Doe" required>
    </div>
    
    <div style="margin-bottom: var(--hearst-space-6);">
      <label class="hearst-label">Email</label>
      <input type="email" class="hearst-input" placeholder="john@example.com" required>
    </div>
    
    <div style="margin-bottom: var(--hearst-space-6);">
      <label class="hearst-label">Message</label>
      <textarea class="hearst-textarea" placeholder="Votre message..." required></textarea>
    </div>
    
    <button type="submit" class="hearst-btn hearst-btn--primary" style="width: 100%;">
      Envoyer le Message
    </button>
  </form>
</div>
```

---

## ✅ Bonnes Pratiques

### 1. Hiérarchie Visuelle

- Utilisez `hearst-green-primary` pour les **actions principales** uniquement
- Limitez les effets glassmorphism aux **éléments importants**
- Respectez l'échelle typographique pour la **hiérarchie du contenu**

### 2. Accessibilité

```css
/* Toujours assurer un contraste suffisant */
✅ Bon : Texte blanc (#F8FAFC) sur fond dark (#0f172a) = ratio 18:1
❌ Mauvais : Texte gris clair sur fond gris = ratio < 4.5:1
```

### 3. Performance

- Les effets `backdrop-filter` peuvent être coûteux → **Utiliser avec modération**
- Préférer `transform` et `opacity` pour les **animations** (GPU accelerated)

### 4. Cohérence

- Utiliser **uniquement les variables CSS** définies
- Ne pas créer de nouvelles couleurs sans validation
- Respecter les espacements standardisés (`--hearst-space-*`)

---

## 🎯 Quick Reference

### Couleurs les plus utilisées

```css
/* Actions principales */
background: var(--hearst-green-primary);
color: var(--hearst-text-on-green);

/* Texte standard */
color: var(--hearst-text-primary);

/* Texte secondaire */
color: var(--hearst-text-secondary);

/* Fond de carte */
background: var(--hearst-glass-bg);
backdrop-filter: var(--hearst-glass-blur);
border: 1px solid var(--hearst-glass-border);
```

### Espacements standards

```css
gap: var(--hearst-space-4);        /* 16px - standard */
gap: var(--hearst-space-6);        /* 24px - large */
padding: var(--hearst-space-6);    /* 24px - cartes */
margin-bottom: var(--hearst-space-8); /* 40px - sections */
```

---

## 📞 Support

Pour toute question ou demande d'amélioration :
- 📧 Email : design@hearst.com
- 📱 Slack : #design-system
- 📖 Documentation : [wiki interne]

---

**Version** : 1.0.0  
**Dernière mise à jour** : Décembre 2025  
**Maintenu par** : Équipe Design Hearst Qatar

