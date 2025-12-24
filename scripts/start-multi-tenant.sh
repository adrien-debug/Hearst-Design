#!/bin/bash

################################################################################
# HEARST CONTROL - Script de démarrage Multi-Tenant
################################################################################
# Ce script vérifie la configuration et démarre le backend avec le système
# multi-tenant.
################################################################################

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Fonctions
print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Vérifications préalables
print_header "🚀 Démarrage Hearst Control Multi-Tenant"

# 1. Vérifier Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé"
    exit 1
fi
print_success "Node.js installé : $(node --version)"

# 2. Vérifier npm
if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé"
    exit 1
fi
print_success "npm installé : $(npm --version)"

# 3. Vérifier que nous sommes dans le bon dossier
if [ ! -d "backend-central" ]; then
    print_error "Vous devez exécuter ce script depuis la racine du projet Hearst-Control-GitHub"
    exit 1
fi

# 4. Vérifier le fichier .env
print_header "Vérification de la configuration"

if [ ! -f "backend-central/.env" ]; then
    print_warning "Fichier .env non trouvé dans backend-central/"
    print_info "Création depuis env.example..."
    
    if [ -f "backend-central/env.example" ]; then
        cp backend-central/env.example backend-central/.env
        print_success "Fichier .env créé"
        print_warning "⚠️  IMPORTANT : Éditez backend-central/.env avec vos credentials Supabase !"
        print_info "Vous devez configurer :"
        echo "  - SUPABASE_URL"
        echo "  - SUPABASE_SERVICE_KEY"
        echo "  - JWT_SECRET"
        echo ""
        read -p "Appuyez sur Entrée après avoir configuré le .env..."
    else
        print_error "env.example non trouvé"
        exit 1
    fi
fi

# Vérifier les variables critiques
print_info "Vérification des variables d'environnement..."

if ! grep -q "SUPABASE_URL=" backend-central/.env || ! grep -q "SUPABASE_SERVICE_KEY=" backend-central/.env || ! grep -q "JWT_SECRET=" backend-central/.env; then
    print_error "Variables d'environnement manquantes dans backend-central/.env"
    print_info "Assurez-vous d'avoir configuré :"
    echo "  - SUPABASE_URL"
    echo "  - SUPABASE_SERVICE_KEY"
    echo "  - JWT_SECRET"
    exit 1
fi

print_success "Variables d'environnement configurées"

# 5. Vérifier les dependencies
print_header "Vérification des dépendances"

if [ ! -d "backend-central/node_modules" ]; then
    print_warning "node_modules non trouvé, installation des dépendances..."
    cd backend-central
    npm install
    cd ..
    print_success "Dépendances installées"
else
    print_success "Dépendances déjà installées"
fi

# 6. Vérifier que le port 4000 est libre
print_header "Vérification du port 4000"

if lsof -Pi :4000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    print_warning "Le port 4000 est déjà utilisé"
    read -p "Voulez-vous tuer le processus existant ? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        lsof -ti:4000 | xargs kill -9
        print_success "Processus sur le port 4000 arrêté"
    else
        print_error "Le port 4000 doit être libre pour démarrer le backend"
        exit 1
    fi
else
    print_success "Port 4000 disponible"
fi

# 7. Vérifier la migration SQL
print_header "⚠️  Vérification de la migration SQL"

print_warning "IMPORTANT : Avez-vous exécuté la migration SQL dans Supabase ?"
print_info "La migration se trouve dans : database/multi-tenant-migration.sql"
print_info ""
print_info "Vous devez :"
echo "  1. Ouvrir Supabase Dashboard > SQL Editor"
echo "  2. Copier-coller le contenu de database/multi-tenant-migration.sql"
echo "  3. Exécuter les sections 1-3 (création + backfill)"
echo ""
read -p "La migration SQL a-t-elle été exécutée ? (y/n) " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_error "Vous devez exécuter la migration SQL avant de démarrer le backend"
    print_info "Consultez DEMARRAGE_MULTI_TENANT.md pour les instructions détaillées"
    exit 1
fi

print_success "Migration SQL confirmée"

# 8. Démarrer le backend
print_header "🚀 Démarrage du backend"

cd backend-central

print_info "Démarrage en cours..."
echo ""

# Démarrer le backend (node server.js ou npm start selon votre configuration)
if [ -f "server.js" ]; then
    node server.js
elif grep -q "\"start\"" package.json; then
    npm start
else
    print_error "Impossible de déterminer comment démarrer le backend"
    print_info "Vérifiez que server.js existe ou que package.json contient un script 'start'"
    exit 1
fi

