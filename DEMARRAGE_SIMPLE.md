# 🚀 DÉMARRAGE SIMPLE - HEARST CONTROL

## 📋 Configuration Rapide (5 minutes)

### 1️⃣ Créer les fichiers .env.local

#### Qatar Frontend
```bash
# Créer le fichier
cat > projects/hearst-qatar-new/frontend/.env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_PROJECT_NAME=Qatar Project
EOF
```

#### SRQ Frontend
```bash
# Créer le fichier
cat > projects/hearst-strategic-reserve-qatar/frontend/.env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:3003
NEXT_PUBLIC_PROJECT_NAME=Hearst Strategic Reserve Qatar
NEXT_PUBLIC_PROJECT_SLUG=hearst-srq
NEXT_PUBLIC_THEME=dark
NEXT_PUBLIC_PRIMARY_COLOR=#8afd81
EOF
```

### 2️⃣ Démarrer tous les services

```bash
./scripts/start-all-simple.sh
```

✅ **Le script va :**
- Démarrer le Backend Central (port 4000)
- Démarrer Qatar Backend (port 3001) + Frontend (port 3000)
- Démarrer SRQ Backend (port 3003) + Frontend (port 3100)
- Ouvrir automatiquement la page de login

---

## 🎯 Page de Login Rapide

La page `quick-login.html` contient **tous les comptes avec identifiants pré-remplis**.

**Il vous suffit de cliquer sur une carte** pour :
1. ✅ Tester la connexion au backend
2. ✅ Récupérer le token JWT
3. ✅ Ouvrir le dashboard automatiquement

### Comptes disponibles :

#### 🇶🇦 Qatar
- **Admin** : `admin@hearstmining.com` / `SecureQatar2024!`
- **Manager** : `manager@hearstmining.com` / `ManagerQatar2024!`
- **Opérateur** : `operator@hearstmining.com` / `OperatorQatar2024!`

#### 🏛️ SRQ
- **Admin** : `admin@srq.qa` / `SecureSRQ2024!`
- **Manager** : `manager@srq.qa` / `ManagerSRQ2024!`
- **Opérateur** : `operator@srq.qa` / `OperatorSRQ2024!`

---

## 🔗 URLs d'Accès

| Service | URL | Port |
|---------|-----|------|
| **Backend Central** | http://localhost:4000 | 4000 |
| **Qatar Backend** | http://localhost:3001 | 3001 |
| **Qatar Frontend** | http://localhost:3000 | 3000 |
| **SRQ Backend** | http://localhost:3003 | 3003 |
| **SRQ Frontend** | http://localhost:3100 | 3100 |
| **Design Backend** | http://localhost:3002 | 3002 |

---

## 🛑 Arrêter tous les services

```bash
./scripts/stop-all.sh
```

---

## 📊 Voir les logs

```bash
# Tous les logs en temps réel
tail -f logs/*.log

# Backend Central uniquement
tail -f logs/backend-central.log

# Qatar uniquement
tail -f logs/qatar-*.log

# SRQ uniquement
tail -f logs/srq-*.log
```

---

## 🔧 Configuration Flexible

Les frontends sont maintenant configurés en **accès direct** aux backends :

- ✅ **Qatar** → pointe directement sur `localhost:3001`
- ✅ **SRQ** → pointe directement sur `localhost:3003`
- ✅ **Design** → pointera sur `localhost:3002`

Si vous voulez utiliser le **Backend Central** comme proxy :

```bash
# Qatar via Central
NEXT_PUBLIC_API_URL=http://localhost:4000/api/qatar

# SRQ via Central
NEXT_PUBLIC_API_URL=http://localhost:4000/api/srq
```

---

## ✅ Vérifications

### 1. Backend Central actif ?
```bash
curl http://localhost:4000/health
```

### 2. Qatar Backend actif ?
```bash
curl http://localhost:3001/api/health
```

### 3. SRQ Backend actif ?
```bash
curl http://localhost:3003/api/health
```

### 4. Test de connexion Qatar
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hearstmining.com","password":"SecureQatar2024!"}'
```

### 5. Test de connexion SRQ
```bash
curl -X POST http://localhost:3003/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@srq.qa","password":"SecureSRQ2024!"}'
```

---

## 🎉 Workflow de Développement

1. **Démarrer** : `./scripts/start-all-simple.sh`
2. **Ouvrir** : Le navigateur s'ouvre automatiquement sur `quick-login.html`
3. **Cliquer** : Sur le compte que vous voulez tester
4. **Développer** : Les frontends et backends se rechargent automatiquement
5. **Arrêter** : `./scripts/stop-all.sh`

---

## 🚨 Troubleshooting

### Les ports sont déjà utilisés ?
```bash
# Arrêter tous les services Hearst
./scripts/stop-all.sh

# Ou tuer manuellement les processus
lsof -ti:4000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
lsof -ti:3003 | xargs kill -9
```

### Le frontend ne se connecte pas ?
1. Vérifiez que le backend est démarré
2. Vérifiez le fichier `.env.local` existe
3. Relancez le frontend : `cd frontend && npm run dev`

### "Module not found" ?
```bash
# Réinstaller les dépendances
cd backend-central && npm install
cd ../projects/hearst-qatar-new/backend && npm install
cd ../frontend && npm install
cd ../../hearst-strategic-reserve-qatar/backend && npm install
cd ../frontend && npm install
```

---

## 📝 Notes Importantes

1. **Pas de verrouillage** : Les URLs peuvent être modifiées librement
2. **Accès direct** : Les frontends pointent directement sur les backends
3. **Backend Central optionnel** : Peut servir de proxy si besoin
4. **Identifiants de dev** : Ne JAMAIS utiliser en production

---

**Date** : 24 Décembre 2025  
**Version** : Simplifié - Accès Direct  
**Status** : ✅ Prêt à l'emploi

