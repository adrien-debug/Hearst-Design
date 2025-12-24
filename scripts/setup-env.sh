#!/bin/bash

# ============================================
# HEARST CONTROL - Configuration Initiale
# Crée tous les fichiers .env nécessaires
# ============================================

set -e

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║       ⚙️  HEARST CONTROL - CONFIGURATION            ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# ============================================
# 1. Backend Central
# ============================================

echo -e "${YELLOW}📡 Configuration Backend Central...${NC}"
cd "$ROOT_DIR/backend-central"
if [ ! -f ".env" ]; then
    if [ -f "env.example" ]; then
        cp env.example .env
        echo -e "${GREEN}✅ .env créé depuis env.example${NC}"
    else
        cat > .env << 'EOF'
PORT=4000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
JWT_SECRET=your_jwt_secret_here_min_32_chars
EOF
        echo -e "${GREEN}✅ .env créé avec configuration par défaut${NC}"
    fi
else
    echo -e "${GREEN}✅ .env existe déjà${NC}"
fi

# ============================================
# 2. Qatar Frontend
# ============================================

echo ""
echo -e "${YELLOW}🇶🇦 Configuration Qatar Frontend...${NC}"
cd "$ROOT_DIR/projects/hearst-qatar-new/frontend"
if [ ! -f ".env.local" ]; then
    cat > .env.local << 'EOF'
# Qatar Frontend - Accès Direct au Backend
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_PROJECT_NAME=Qatar Project
EOF
    echo -e "${GREEN}✅ .env.local créé${NC}"
else
    echo -e "${GREEN}✅ .env.local existe déjà${NC}"
fi

# ============================================
# 3. SRQ Frontend
# ============================================

echo ""
echo -e "${YELLOW}🏛️  Configuration SRQ Frontend...${NC}"
cd "$ROOT_DIR/projects/hearst-strategic-reserve-qatar/frontend"
if [ ! -f ".env.local" ]; then
    cat > .env.local << 'EOF'
# SRQ Frontend - Accès Direct au Backend
NEXT_PUBLIC_API_URL=http://localhost:3003
NEXT_PUBLIC_PROJECT_NAME=Hearst Strategic Reserve Qatar
NEXT_PUBLIC_PROJECT_SLUG=hearst-srq
NEXT_PUBLIC_THEME=dark
NEXT_PUBLIC_PRIMARY_COLOR=#8afd81
EOF
    echo -e "${GREEN}✅ .env.local créé${NC}"
else
    echo -e "${GREEN}✅ .env.local existe déjà${NC}"
fi

# ============================================
# Résumé
# ============================================

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║           ✅ CONFIGURATION TERMINÉE                  ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}Fichiers créés :${NC}"
echo "  ✅ backend-central/.env"
echo "  ✅ projects/hearst-qatar-new/frontend/.env.local"
echo "  ✅ projects/hearst-strategic-reserve-qatar/frontend/.env.local"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT :${NC}"
echo "  Configurez les variables Supabase dans backend-central/.env"
echo ""
echo -e "${GREEN}Prochaine étape :${NC}"
echo "  ./scripts/start-all-simple.sh"
echo ""

