#!/bin/bash

# ============================================
# HEARST CONTROL - Start Services (SIMPLIFIÉ)
# Backend Central + Frontend Central UNIQUEMENT
# ============================================

set -e

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║       🏢 HEARST CONTROL - START SERVICES            ║"
echo "║          Architecture Simplifiée                     ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Logs
mkdir -p "$ROOT_DIR/logs"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# ============================================
# 1. Démarrer Backend Central (Port 4000)
# ============================================

echo -e "${BLUE}📡 Starting Backend Central...${NC}"

cd "$ROOT_DIR/backend-central"

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  No .env file found. Creating from env.example...${NC}"
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
# 2. Démarrer Frontend Central (Port 3100)
# ============================================

echo -e "${BLUE}🖥️  Starting Frontend Central...${NC}"

cd "$ROOT_DIR/frontend-central"

if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🚀 Starting frontend on port 3100..."
nohup npm run dev > ../logs/frontend-central.log 2>&1 &
FRONTEND_PID=$!
echo "$FRONTEND_PID" > ../logs/frontend-central.pid

echo -e "${GREEN}✅ Frontend Central started (PID: $FRONTEND_PID)${NC}"
echo ""

# Attendre que le frontend démarre
sleep 5

# ============================================
# Résumé
# ============================================

echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║            ✅ SERVICES STARTED                       ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo "🌐 Access URLs:"
echo ""
echo "   🏢 Hearst Control:"
echo "      Backend:    http://localhost:4000"
echo "      Frontend:   http://localhost:3100"
echo "      Login:      http://localhost:4000/login"
echo ""
echo "📊 Logs:"
echo "   Backend:   tail -f logs/backend-central.log"
echo "   Frontend:  tail -f logs/frontend-central.log"
echo ""
echo "🛑 To stop: ./scripts/stop-all.sh"
echo ""
echo "🎯 Quick Login: open http://localhost:4000/login"
echo ""

