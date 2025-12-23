# 🔧 Core - Code Commun Réutilisable

> **Rôle** : Bibliothèque partagée entre tous les projets Hearst

---

## 📦 Modules Disponibles

| Module | Description | Usage |
|--------|-------------|-------|
| `auth/` | Service d'authentification JWT | `require('../core/auth/authService')` |
| `middleware/` | Middlewares partagés | `require('../core/middleware/authMiddleware')` |
| `database/` | Client Supabase | `require('../core/database/supabaseClient')` |
| `shared-utils/` | Logger, validators | `require('../core/shared-utils/logger')` |

---

## 🔧 Structure

```
core/
├── auth/
│   └── authService.js      # JWT, login, register
├── middleware/
│   └── authMiddleware.js   # Vérification token
├── database/
│   └── supabaseClient.js   # Client Supabase partagé
├── shared-utils/
│   ├── logger.js           # Winston logger
│   └── validators.js       # Validation des données
└── README.md               # Ce fichier
```

---

## 📚 Documentation Complète

👉 **Consulter l'index central** : [DOCUMENTATION_INDEX.md](../DOCUMENTATION_INDEX.md)

---

> **Hearst Control Core** - Code commun  
> Décembre 2025
