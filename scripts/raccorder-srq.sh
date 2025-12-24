#!/bin/bash

# ============================================================================
# RACCORDEMENT AUTOMATIQUE - STRATEGIC RESERVE QATAR
# ============================================================================

set -e

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔌 RACCORDEMENT DU PROJET SRQ-001"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ============================================================================
# Credentials (NE JAMAIS hardcoder des secrets dans le repo)
# - Priorité: variables d'environnement déjà exportées
# - Fallback: charger depuis backend-central/.env si présent
# ============================================================================

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
CENTRAL_ENV="$ROOT_DIR/backend-central/.env"

if [ -f "$CENTRAL_ENV" ]; then
  # shellcheck disable=SC1090
  set -a
  source "$CENTRAL_ENV"
  set +a
fi

: "${SUPABASE_URL:?Missing SUPABASE_URL (export it or set it in backend-central/.env)}"
: "${SUPABASE_SERVICE_KEY:?Missing SUPABASE_SERVICE_KEY (service_role key)}"
: "${SUPABASE_ANON_KEY:?Missing SUPABASE_ANON_KEY (publishable/anon key)}"
: "${JWT_SECRET:?Missing JWT_SECRET (must match Central JWT secret)}"

# ============================================================================
# ÉTAPE 1 : Créer .env pour le Backend
# ============================================================================

echo "📝 Étape 1 : Configuration du backend..."
cd "$ROOT_DIR/projects/hearst-strategic-reserve-qatar/backend"

cat > .env << EOF
# Application
NODE_ENV=development
PORT=3002

# Supabase (Base centrale partagée)
SUPABASE_URL=${SUPABASE_URL}
SUPABASE_SERVICE_KEY=${SUPABASE_SERVICE_KEY}
SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}

# JWT (Même secret que central)
JWT_SECRET=${JWT_SECRET}

# CORS
CORS_ORIGIN=http://localhost:3100

# Project Info
PROJECT_ID=SRQ-001
PROJECT_NAME=Strategic Reserve Qatar
EOF

echo "✅ Backend .env créé"

# ============================================================================
# ÉTAPE 2 : Installer les dépendances backend
# ============================================================================

echo ""
echo "📦 Étape 2 : Installation des dépendances backend..."
npm install

echo "✅ Dépendances backend installées"

# ============================================================================
# ÉTAPE 3 : Créer .env.local pour le Frontend
# ============================================================================

echo ""
echo "📝 Étape 3 : Configuration du frontend..."
cd ../frontend

cat > .env.local << EOF
# API Backend du projet
NEXT_PUBLIC_API_URL=http://localhost:3002

# Supabase (pour authentification frontend)
NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}

# Project Info
NEXT_PUBLIC_PROJECT_ID=SRQ-001
NEXT_PUBLIC_PROJECT_NAME=Strategic Reserve Qatar
EOF

echo "✅ Frontend .env.local créé"

# ============================================================================
# ÉTAPE 4 : Installer les dépendances frontend
# ============================================================================

echo ""
echo "📦 Étape 4 : Installation des dépendances frontend..."
npm install

echo "✅ Dépendances frontend installées"

# ============================================================================
# RÉSUMÉ
# ============================================================================

cd ../../..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ CONFIGURATION TERMINÉE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Backend .env créé et dépendances installées"
echo "✅ Frontend .env.local créé et dépendances installées"
echo ""
echo "⚠️  IMPORTANT : Exécuter dans Supabase SQL Editor :"
echo "    ADD_SRQ_PROJECT.sql"
echo ""
echo "🚀 DÉMARRAGE :"
echo ""
echo "   Terminal 1 (Backend SRQ):"
echo "   cd projects/hearst-strategic-reserve-qatar/backend"
echo "   npm start"
echo ""
echo "   Terminal 2 (Frontend SRQ):"
echo "   cd projects/hearst-strategic-reserve-qatar/frontend"
echo "   npm run dev"
echo ""
echo "🌐 URLS :"
echo "   Backend:  http://localhost:3002"
echo "   Frontend: http://localhost:3100"
echo ""

