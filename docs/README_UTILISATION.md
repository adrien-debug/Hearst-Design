# 🎯 HEARST CONTROL - Utilisation Rapide

## ✅ Tout est installé et fonctionne !

---

## 🔑 Se Connecter

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hearstmining.com","password":"<REDACTED>"}'
```

**Vous recevez un token JWT** → Utilisez-le pour toutes les requêtes

---

## 📊 Voir le Dashboard

```bash
# Remplacer YOUR_TOKEN par le token reçu du login
curl http://localhost:4000/api/dashboard/overview \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Résultat**:
- 2 projets (QATAR-001, AQUA-001)
- 17,864 mineurs
- 8.45 EH/s total

---

## 🏗️ Voir les Projets

```mohamed
curl http://localhost:4000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🚀 Démarrer/Arrêter

### Démarrer le Backend
```bash
cd backend-central
npm start
```

### Arrêter
```bash
pkill -f "node server.js"
```

---

## 📁 Fichiers Importants

- **SUCCESS_FINAL.md** - Rapport complet
- **GUIDE_DEMARRAGE_RAPIDE.md** - Guide détaillé
- **.env** (dans backend-central) - Configuration

---

## 🎉 C'est tout !

**Backend**: http://localhost:4000  
**Login**: admin@hearstmining.com / <REDACTED>  
**Status**: ✅ Opérationnel

**Bon mining ! ⛏️💎**

