# 🔑 IDENTIFIANTS DE DÉVELOPPEMENT

**⚠️ ATTENTION : Ces identifiants sont pour l'environnement de DÉVELOPPEMENT uniquement !**

**Date** : 24 Décembre 2025  
**Environnement** : LOCAL (localhost)

---

## 🇶🇦 QATAR PROJECT (Port 3000)

**URL** : http://localhost:3000

### Comptes Disponibles

#### Admin Qatar
```
Email    : admin@hearstmining.com
Password : SecureQatar2024!
Role     : admin
Tenant   : Qatar
```

#### Manager Qatar
```
Email    : manager@hearstmining.com
Password : ManagerQatar2024!
Role     : manager
Tenant   : Qatar
```

#### Opérateur Qatar
```
Email    : operator@hearstmining.com
Password : OperatorQatar2024!
Role     : operator
Tenant   : Qatar
```

---

## 🏛️ STRATEGIC RESERVE QATAR (Port 3100)

**URL** : http://localhost:3100

### Comptes Disponibles

#### Admin SRQ
```
Email    : admin@srq.qa
Password : SecureSRQ2024!
Role     : admin
Tenant   : Strategic Reserve Qatar
```

#### Manager SRQ
```
Email    : manager@srq.qa
Password : ManagerSRQ2024!
Role     : manager
Tenant   : Strategic Reserve Qatar
```

#### Opérateur SRQ
```
Email    : operator@srq.qa
Password : OperatorSRQ2024!
Role     : operator
Tenant   : Strategic Reserve Qatar
```

---

## 🎨 HEARST DESIGN (Futur)

**URL** : À déterminer

### Comptes Prévus

#### Admin Design
```
Email    : admin@design.hearst.com
Password : SecureDesign2024!
Role     : admin
Tenant   : Hearst Design
```

#### Manager Design
```
Email    : manager@design.hearst.com
Password : ManagerDesign2024!
Role     : manager
Tenant   : Hearst Design
```

#### Opérateur Design
```
Email    : operator@design.hearst.com
Password : OperatorDesign2024!
Role     : operator
Tenant   : Hearst Design
```

---

## 🏢 SUPER ADMIN (Backend Central)

**URL** : http://localhost:4000

### Super Administrateur

```
Email    : superadmin@hearst.com
Password : SuperAdmin2024!
Role     : super_admin
Access   : Tous les tenants et projets
```

**Capabilities** :
- Accès à tous les projets
- Gestion des tenants
- Configuration système
- Audit global

---

## 🔐 SÉCURITÉ

### ⚠️ Règles de Sécurité

1. **Ces mots de passe sont pour le DÉVELOPPEMENT LOCAL uniquement**
2. **Ne JAMAIS utiliser ces mots de passe en production**
3. **Changer TOUS les mots de passe avant le déploiement**
4. **Utiliser des mots de passe forts et uniques en production**

### 🔄 Génération de Nouveaux Mots de Passe

Pour générer de nouveaux hash de mots de passe :

```bash
# Pour Qatar
cd backend-central
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('VOTRE_MOT_DE_PASSE', 10).then(h => console.log(h));"

# Pour SRQ
node generate-srq-passwords.js

# Pour Design
node generate-design-passwords.js
```

---

## 📊 HIÉRARCHIE DES RÔLES

```
┌─────────────────────────────────────┐
│     SUPER ADMIN                     │
│     • Accès global                  │
│     • Gestion multi-tenant          │
└──────────────┬──────────────────────┘
               │
    ┌──────────┼──────────┬────────────┐
    │          │          │            │
    ▼          ▼          ▼            ▼
┌────────┐┌────────┐┌────────┐┌────────────┐
│ ADMIN  ││ ADMIN  ││ ADMIN  ││   ADMIN    │
│ Qatar  ││ Design ││  SRQ   ││   Future   │
└───┬────┘└───┬────┘└───┬────┘└─────┬──────┘
    │         │         │            │
    ▼         ▼         ▼            ▼
┌────────┐┌────────┐┌────────┐┌────────────┐
│MANAGER ││MANAGER ││MANAGER ││  MANAGER   │
└───┬────┘└───┬────┘└───┬────┘└─────┬──────┘
    │         │         │            │
    ▼         ▼         ▼            ▼
┌────────┐┌────────┐┌────────┐┌────────────┐
│OPERATOR││OPERATOR││OPERATOR││  OPERATOR  │
└────────┘└────────┘└────────┘└────────────┘
```

---

## 🧪 TESTS DE CONNEXION

### Test Backend Central

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"superadmin@hearst.com","password":"SuperAdmin2024!"}'
```

### Test Qatar via Central

```bash
curl -X POST http://localhost:4000/api/qatar/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hearstmining.com","password":"SecureQatar2024!"}'
```

### Test SRQ via Central

```bash
curl -X POST http://localhost:4000/api/srq/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@srq.qa","password":"SecureSRQ2024!"}'
```

---

## 📝 NOTES IMPORTANTES

1. **Architecture Centralisée** : Tous les frontends pointent vers le Backend Central (port 4000)
2. **Isolation Multi-Tenant** : Chaque projet a ses propres utilisateurs et données
3. **JWT Tokens** : Les tokens expirent après 24h
4. **Rate Limiting** : 200 requêtes / 15 minutes par IP

---

## 🆘 EN CAS DE PROBLÈME

### Mot de passe oublié ?

1. Vérifiez ce document pour les identifiants par défaut
2. Ou régénérez les hash avec les scripts dans `backend-central/`
3. Ou utilisez SQL pour reset directement :

```sql
-- Reset password pour admin Qatar
UPDATE users 
SET password_hash = '$2a$10$NOUVEAU_HASH'
WHERE email = 'admin@hearstmining.com';
```

### Compte verrouillé ?

Les comptes ne se verrouillent pas en développement. Vérifiez :
1. Le serveur backend est-il actif ?
2. L'email est-il correct ?
3. Le mot de passe est-il correct ?
4. Le tenant existe-t-il ?

---

**⚠️ RAPPEL FINAL** : Ces identifiants sont pour le **DÉVELOPPEMENT LOCAL** uniquement. Ne JAMAIS les utiliser en production !

**Dernière mise à jour** : 24 Décembre 2025  
**Version** : 1.0 - Développement Local

