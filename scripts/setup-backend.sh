#!/bin/bash

# ============================================================================
# HEARST CONTROL - Configuration et Démarrage du Backend
# ============================================================================

set -e

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 CONFIGURATION DU BACKEND HEARST CONTROL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Aller dans le dossier backend-central
cd backend-central

# Vérifier si .env existe déjà
if [ -f .env ]; then
    echo "⚠️  Le fichier .env existe déjà."
    read -p "Voulez-vous le recréer ? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "✅ Conservation du fichier .env existant"
    else
        rm .env
        echo "🗑️  Ancien fichier .env supprimé"
    fi
fi

# Créer le fichier .env si nécessaire
if [ ! -f .env ]; then
    echo ""
    echo "📝 Configuration de Supabase..."
    echo ""
    echo "🔗 Pour obtenir vos credentials :"
    echo "   1. Aller sur https://app.supabase.com"
    echo "   2. Sélectionner votre projet"
    echo "   3. Settings → API"
    echo ""
    
    read -p "📍 SUPABASE_URL (https://xxx.supabase.co): " SUPABASE_URL
    read -p "🔑 SUPABASE_SERVICE_KEY (service_role / sb_secret_...): " SUPABASE_SERVICE_KEY
    read -p "🔑 SUPABASE_ANON_KEY (publishable / sb_publishable_... - optionnel): " SUPABASE_ANON_KEY
    
    echo ""
    echo "✍️  Création du fichier .env..."
    
    # Générer un secret JWT fort par défaut (modifiable ensuite)
    if command -v openssl >/dev/null 2>&1; then
        GENERATED_JWT_SECRET="$(openssl rand -base64 48)"
    else
        GENERATED_JWT_SECRET="$(node -e "console.log(require('crypto').randomBytes(48).toString('base64'))")"
    fi
    
    cat > .env << EOF
# HEARST CONTROL - Backend Central Configuration

# Server
NODE_ENV=development
PORT=4000

# CORS
CORS_ORIGIN=http://localhost:4100,http://localhost:3000

# JWT
JWT_SECRET=${GENERATED_JWT_SECRET}

# Supabase (Central Database)
SUPABASE_URL=${SUPABASE_URL}
SUPABASE_SERVICE_KEY=${SUPABASE_SERVICE_KEY}
SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}

# Project API URLs (for proxy)
QATAR_API_URL=http://localhost:3001
AQUAHASH_API_URL=http://localhost:3002
TEXAS_API_URL=http://localhost:3003

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=200
EOF
    
    echo "✅ Fichier .env créé avec succès !"
fi

echo ""
echo "📦 Installation des dépendances..."
npm install

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ CONFIGURATION TERMINÉE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🚀 Démarrage du serveur..."
echo ""

npm start

