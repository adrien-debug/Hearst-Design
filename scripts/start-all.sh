#!/bin/bash

# ============================================
# HEARST CONTROL - Start All Projects
# Démarre le backend central + tous les projets actifs
# ============================================

set -e

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║       🏢 HEARST CONTROL - START ALL PROJECTS        ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Logs (assurer l'existence du dossier)
mkdir -p "$ROOT_DIR/logs"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# ============================================
# 1. Démarrer Backend Central
# ============================================

echo -e "${BLUE}📡 Starting Hearst Control Central Backend...${NC}"

cd "$ROOT_DIR/backend-central"

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  No .env file found. Creating from .env.example...${NC}"
    cp env.example .env
    echo -e "${YELLOW}⚠️  Please configure .env file before starting!${NC}"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🚀 Starting backend on port 4000..."
nohup npm start > ../logs/backend-central.log 2>&1 &
BACKEND_PID=$!
echo "$BACKEND_PID" > ../logs/backend-central.pid

echo -e "${GREEN}✅ Backend Central started (PID: $BACKEND_PID)${NC}"
echo ""

# Attendre que le backend démarre
sleep 3

# ============================================
# 2. Démarrer Frontend Central
# ============================================

echo -e "${BLUE}🏢 Starting Hearst Control Frontend...${NC}"

if [ -d "$ROOT_DIR/frontend-central" ]; then
    cd "$ROOT_DIR/frontend-central"
    
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing dependencies..."
        npm install
    fi
    
    echo "🚀 Starting frontend on port 3100..."
    nohup npm run dev > ../logs/frontend-central.log 2>&1 &
    FRONTEND_CENTRAL_PID=$!
    echo "$FRONTEND_CENTRAL_PID" > ../logs/frontend-central.pid
    echo -e "${GREEN}✅ Frontend Central started (PID: $FRONTEND_CENTRAL_PID)${NC}"
else
    echo -e "${YELLOW}  ⚠️  Frontend Central not found${NC}"
fi

echo ""
sleep 2

# ============================================
# 3. Démarrer Projet Strategic Reserve Qatar
# ============================================

echo -e "${BLUE}🏦 Starting Strategic Reserve Qatar Project...${NC}"

if [ -d "$ROOT_DIR/projects/hearst-strategic-reserve-qatar" ]; then
    cd "$ROOT_DIR/projects/hearst-strategic-reserve-qatar"
    
    # Backend SRQ (port 3003)
    if [ -d "backend" ]; then
        cd backend
        if [ ! -d "node_modules" ]; then
            npm install
        fi
        nohup npm start > ../../logs/srq-backend.log 2>&1 &
        SRQ_BACKEND_PID=$!
        echo "$SRQ_BACKEND_PID" > ../../logs/srq-backend.pid
        echo -e "${GREEN}  ✅ SRQ Backend started (PID: $SRQ_BACKEND_PID)${NC}"
        cd ..
    fi
    
    # Frontend SRQ (port 3003)
    if [ -d "frontend" ]; then
        cd frontend
        if [ ! -d "node_modules" ]; then
            npm install
        fi
        nohup npm run dev > ../../logs/srq-frontend.log 2>&1 &
        SRQ_FRONTEND_PID=$!
        echo "$SRQ_FRONTEND_PID" > ../../logs/srq-frontend.pid
        echo -e "${GREEN}  ✅ SRQ Frontend started (PID: $SRQ_FRONTEND_PID)${NC}"
        cd ..
    fi
else
    echo -e "${YELLOW}  ⚠️  SRQ project not found${NC}"
fi

echo ""

# ============================================
# 4. Démarrer Projet Design
# ============================================

echo -e "${BLUE}🎨 Starting Design Project...${NC}"

if [ -d "$ROOT_DIR/projects/hearst-design" ]; then
    cd "$ROOT_DIR/projects/hearst-design"
    
    # Backend Design (port 3002)
    if [ -d "backend" ]; then
        cd backend
        if [ ! -d "node_modules" ]; then
            npm install
        fi
        nohup npm start > ../../logs/design-backend.log 2>&1 &
        DESIGN_BACKEND_PID=$!
        echo "$DESIGN_BACKEND_PID" > ../../logs/design-backend.pid
        echo -e "${GREEN}  ✅ Design Backend started (PID: $DESIGN_BACKEND_PID)${NC}"
        cd ..
    fi
    
    # Frontend Design (port 3002)
    if [ -d "frontend" ]; then
        cd frontend
        if [ ! -d "node_modules" ]; then
            npm install
        fi
        nohup npm run dev > ../../logs/design-frontend.log 2>&1 &
        DESIGN_FRONTEND_PID=$!
        echo "$DESIGN_FRONTEND_PID" > ../../logs/design-frontend.pid
        echo -e "${GREEN}  ✅ Design Frontend started (PID: $DESIGN_FRONTEND_PID)${NC}"
        cd ..
    fi
else
    echo -e "${YELLOW}  ⚠️  Design project not found${NC}"
fi

echo ""

# ============================================
# Résumé
# ============================================

echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║               ✅ ALL SERVICES STARTED                ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo "🌐 Access URLs:"
echo ""
echo "   🏢 Hearst Control Central:"
echo "      Backend:    http://localhost:4000"
echo "      Frontend:   http://localhost:3100"
echo ""
echo "   🏦 Strategic Reserve Qatar (SRQ):"
echo "      Frontend:   http://localhost:3003"
echo "      Backend:    http://localhost:3003 (internal)"
echo ""
echo "   🎨 Hearst Design:"
echo "      Frontend:   http://localhost:3002"
echo "      Backend:    http://localhost:3002 (internal)"
echo ""
echo "📊 Logs:"
echo "   Central Backend:   tail -f logs/backend-central.log"
echo "   Central Frontend:  tail -f logs/frontend-central.log"
echo "   SRQ Backend:       tail -f logs/srq-backend.log"
echo "   SRQ Frontend:      tail -f logs/srq-frontend.log"
echo "   Design Backend:    tail -f logs/design-backend.log"
echo "   Design Frontend:   tail -f logs/design-frontend.log"
echo ""
echo "🛑 To stop all services: ./scripts/stop-all.sh"
echo ""

