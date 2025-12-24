# 🎨 Theme Builder — Intégration dans Hearst Design

**Version :** 2.0.0  
**Intégré dans :** Hearst Design (sous-projet)  
**Date :** 24 décembre 2025

---

## 📍 Emplacement

```
projects/hearst-design/theme-builder/
```

Ce Theme Builder est maintenant un **sous-projet** de **Hearst Design**, aux côtés du backend API et du frontend Next.js.

---

## 🚀 Lancement Rapide

### Option 1 : Serveur Local (Standalone)

```bash
cd projects/hearst-design/theme-builder
python3 -m http.server 8080
```

Ouvrir : **http://localhost:8080**

### Option 2 : Via Hearst Control (futur)

Le Theme Builder pourra être lancé directement depuis l'interface Hearst Control (à venir).

---

## 🔗 Intégration avec Hearst Design

### Architecture Multi-Composants

**Hearst Design** comprend maintenant 3 composants :

1. **Backend API** (Express.js) — Port 3002
2. **Frontend Next.js** — Interfaces web
3. **Theme Builder** (ce dossier) — Design System interactif

### Accès depuis le Frontend

Le Theme Builder peut être intégré dans le frontend Next.js via :

```tsx
// Dans une page Next.js
<iframe 
  src="http://localhost:8080" 
  width="100%" 
  height="800px"
  title="Theme Builder"
/>
```

Ou via un lien externe :

```tsx
<a href="http://localhost:8080" target="_blank">
  🎨 Ouvrir le Theme Builder
</a>
```

---

## 📊 Configuration Projet

Le Theme Builder est déclaré dans `PROJECT_CONFIG.json` :

```json
{
  "services": [
    {
      "id": "theme-builder",
      "name": "Theme Builder (Design System)",
      "port": 8080,
      "description": "Outil interactif de création de thèmes",
      "type": "static",
      "launchCommand": "cd theme-builder && python3 -m http.server 8080"
    }
  ]
}
```

---

## 🎯 Cas d'Usage

### 1. Créer un Thème pour le Frontend Next.js

1. Lancer le Theme Builder : `python3 -m http.server 8080`
2. Créer/personnaliser un thème
3. Exporter en JSON : `Ctrl/Cmd + E`
4. Importer le JSON dans le frontend Next.js

### 2. Générer des Design Tokens

1. Ouvrir le Theme Builder
2. Configurer les couleurs, typographie, espacements
3. Exporter `design-tokens.json`
4. Utiliser dans Tailwind config ou CSS Variables

### 3. Prototyper des Composants

1. Utiliser la preview en temps réel
2. Tester différentes palettes
3. Copier les styles CSS générés
4. Intégrer dans les composants Next.js

---

## 📂 Structure du Theme Builder

```
theme-builder/
├── index.html                   # Application principale
├── ds.css                       # Design System CSS
├── design-tokens.json           # Tokens de design
├── vercel.json                  # Config déploiement
│
├── css/                         # Styles modulaires
│   ├── modern-master.css
│   ├── modern-buttons.css
│   ├── modern-components.css
│   └── ...
│
├── js/                          # Modules JavaScript ES6
│   ├── app.js
│   ├── theme-manager.js
│   ├── ui-controls.js
│   └── ...
│
├── docs/                        # Documentation
│   └── ARCHITECTURE.md
│
├── backup/                      # Archives
│
└── README.md                    # Documentation principale
```

---

## 🔧 Maintenance

### Mise à Jour du Theme Builder

```bash
cd projects/hearst-design/theme-builder
# Éditer les fichiers HTML/CSS/JS
# Tester localement
python3 -m http.server 8080
```

### Synchronisation avec le Frontend

Après modification du Theme Builder :

1. Exporter les nouveaux design tokens
2. Mettre à jour `frontend/src/styles/design-tokens.json`
3. Adapter les composants Next.js si nécessaire

---

## 📚 Documentation Complète

| Document | Description |
|----------|-------------|
| `README.md` | Vue d'ensemble et guide d'utilisation |
| `ARCHITECTURE_UX_UI.md` | Architecture technique détaillée |
| `GUIDE_UTILISATEUR.md` | Guide utilisateur complet |
| `INDEX_DOCUMENTS.md` | Index de toute la documentation |
| `docs/ARCHITECTURE.md` | Documentation architecture |

---

## 🎨 Fonctionnalités Clés

- **4 palettes pré-configurées** : Dark Pro, Light Clean, Blue Tech, Green Mining
- **20+ composants** : Cards, Menus, Forms, Alerts, KPIs
- **Preview temps réel** : Application instantanée des changements
- **Export JSON/CSS** : Télécharger thèmes créés
- **Keyboard Shortcuts** : Ctrl/Cmd+S (save), Ctrl/Cmd+E (export)
- **Accessibilité WCAG AAA** : Contrastes optimisés

---

## 🔐 Règles d'Intégration Hearst Control

### Règle #42 : Backend Central

Si le Theme Builder doit appeler une API à l'avenir, il **DOIT** pointer vers le **Backend Central (port 4000)**, pas directement vers le backend du projet.

```javascript
// ✅ CORRECT
const API_URL = 'http://localhost:4000/api/design';

// ❌ INTERDIT
const API_URL = 'http://localhost:3002/api';
```

### Isolation

Le Theme Builder est **frontend-only** (HTML/CSS/JS) :
- Pas de backend dédié
- Pas de base de données
- Pas de secrets à gérer
- Peut être déployé sur Vercel/Netlify

---

## 🚀 Déploiement

### Vercel (Production)

```bash
cd projects/hearst-design/theme-builder
vercel --prod --yes
```

Le Theme Builder est déployé sur : https://hearst-theme-builder-[hash].vercel.app

### Intégration dans le Frontend

Le frontend Next.js peut pointer vers la version déployée :

```tsx
const THEME_BUILDER_URL = process.env.NODE_ENV === 'production'
  ? 'https://hearst-theme-builder-[hash].vercel.app'
  : 'http://localhost:8080';
```

---

## 📞 Support

Pour toute question sur le Theme Builder :

1. Consulter `README.md` dans ce dossier
2. Lire la documentation dans `docs/`
3. Vérifier `GUIDE_UTILISATEUR.md`

---

**Theme Builder** | Intégré dans Hearst Design  
**Hearst Control V2.0**  
**Dernière mise à jour :** 24 décembre 2025

