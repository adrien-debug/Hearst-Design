#!/bin/bash

# ============================================
# HEARST CONTROL - Démarrage Simplifié
# Démarre tous les services en mode développement
# ============================================

set -e

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║       🚀 HEARST CONTROL - DÉMARRAGE SIMPLE          ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Créer dossier logs
mkdir -p "$ROOT_DIR/logs"

# ============================================
# 1. Backend Central (Port 4000)
# ============================================

echo -e "${BLUE}📡 Démarrage Backend Central...${NC}"
cd "$ROOT_DIR/backend-central"

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  Création du fichier .env...${NC}"
    cp env.example .env 2>/dev/null || echo "SUPABASE_URL=your_url" > .env
fi

if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install --silent
fi

nohup npm start > "$ROOT_DIR/logs/backend-central.log" 2>&1 &
echo $! > "$ROOT_DIR/logs/backend-central.pid"
echo -e "${GREEN}✅ Backend Central démarré (Port 4000)${NC}"

sleep 2

# ============================================
# 2. Projet Qatar
# ============================================

echo ""
echo -e "${BLUE}🇶🇦 Démarrage Qatar...${NC}"

# Backend Qatar (Port 3001)
if [ -d "$ROOT_DIR/projects/hearst-qatar-new/backend" ]; then
    cd "$ROOT_DIR/projects/hearst-qatar-new/backend"
    [ ! -d "node_modules" ] && npm install --silent
    nohup npm start > "$ROOT_DIR/logs/qatar-backend.log" 2>&1 &
    echo $! > "$ROOT_DIR/logs/qatar-backend.pid"
    echo -e "${GREEN}  ✅ Backend Qatar (Port 3001)${NC}"
fi

# Frontend Qatar (Port 3000)
if [ -d "$ROOT_DIR/projects/hearst-qatar-new/frontend" ]; then
    cd "$ROOT_DIR/projects/hearst-qatar-new/frontend"
    [ ! -d "node_modules" ] && npm install --silent
    nohup npm run dev > "$ROOT_DIR/logs/qatar-frontend.log" 2>&1 &
    echo $! > "$ROOT_DIR/logs/qatar-frontend.pid"
    echo -e "${GREEN}  ✅ Frontend Qatar (Port 3000)${NC}"
fi

sleep 2

# ============================================
# 3. Projet SRQ
# ============================================

echo ""
echo -e "${BLUE}🏛️  Démarrage Strategic Reserve Qatar...${NC}"

# Backend SRQ (Port 3003)
if [ -d "$ROOT_DIR/projects/hearst-strategic-reserve-qatar/backend" ]; then
    cd "$ROOT_DIR/projects/hearst-strategic-reserve-qatar/backend"
    [ ! -d "node_modules" ] && npm install --silent
    nohup npm start > "$ROOT_DIR/logs/srq-backend.log" 2>&1 &
    echo $! > "$ROOT_DIR/logs/srq-backend.pid"
    echo -e "${GREEN}  ✅ Backend SRQ (Port 3003)${NC}"
fi

# Frontend SRQ (Port 3100)
if [ -d "$ROOT_DIR/projects/hearst-strategic-reserve-qatar/frontend" ]; then
    cd "$ROOT_DIR/projects/hearst-strategic-reserve-qatar/frontend"
    [ ! -d "node_modules" ] && npm install --silent
    nohup npm run dev -- -p 3100 > "$ROOT_DIR/logs/srq-frontend.log" 2>&1 &
    echo $! > "$ROOT_DIR/logs/srq-frontend.pid"
    echo -e "${GREEN}  ✅ Frontend SRQ (Port 3100)${NC}"
fi

sleep 2

# ============================================
# 4. Projet Design (si configuré)
# ============================================

echo ""
echo -e "${BLUE}🎨 Vérification Design...${NC}"

# Backend Design (Port 3002)
if [ -d "$ROOT_DIR/projects/hearst-design/backend" ]; then
    cd "$ROOT_DIR/projects/hearst-design/backend"
    [ ! -d "node_modules" ] && npm install --silent
    nohup npm start > "$ROOT_DIR/logs/design-backend.log" 2>&1 &
    echo $! > "$ROOT_DIR/logs/design-backend.pid"
    echo -e "${GREEN}  ✅ Backend Design (Port 3002)${NC}"
else
    echo -e "${YELLOW}  ⚠️  Backend Design non configuré${NC}"
fi

# ============================================
# Résumé
# ============================================

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║               ✅ TOUS LES SERVICES DÉMARRÉS          ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}🌐 ACCÈS RAPIDE:${NC}"
echo ""
echo -e "${BLUE}📄 Page de Login Rapide:${NC}"
echo -e "   ${YELLOW}file://$ROOT_DIR/quick-login.html${NC}"
echo ""
echo -e "${BLUE}🔧 Backend Central:${NC}"
echo "   http://localhost:4000"
echo ""
echo -e "${BLUE}🇶🇦 Qatar:${NC}"
echo "   Backend:  http://localhost:3001"
echo "   Frontend: http://localhost:3000"
echo ""
echo -e "${BLUE}🏛️  SRQ:${NC}"
echo "   Backend:  http://localhost:3003"
echo "   Frontend: http://localhost:3100"
echo ""
echo -e "${BLUE}🎨 Design:${NC}"
echo "   Backend:  http://localhost:3002"
echo ""
echo -e "${YELLOW}📊 Logs:${NC}"
echo "   tail -f $ROOT_DIR/logs/*.log"
echo ""
echo -e "${RED}🛑 Arrêter tout:${NC}"
echo "   ./scripts/stop-all.sh"
echo ""
echo -e "${GREEN}🚀 Pour ouvrir la page de login:${NC}"
echo -e "   ${YELLOW}open $ROOT_DIR/quick-login.html${NC}"
echo ""

# Ouvrir automatiquement la page de login
sleep 1
open "$ROOT_DIR/quick-login.html" 2>/dev/null || xdg-open "$ROOT_DIR/quick-login.html" 2>/dev/null || echo "Ouvrez manuellement: quick-login.html"

