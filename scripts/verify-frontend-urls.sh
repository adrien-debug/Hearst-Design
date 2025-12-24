#!/bin/bash

# ============================================
# HEARST CONTROL - Vérification URLs Frontend
# Vérifie que TOUS les frontends pointent vers le Backend Central
# ============================================

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║   🔍 VÉRIFICATION DES URLS FRONTEND                  ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

ERRORS=0

# Fonction de vérification
check_url() {
    local file=$1
    local expected=$2
    local project=$3
    
    if [ ! -f "$file" ]; then
        echo -e "${YELLOW}⚠️  $project: Fichier $file n'existe pas${NC}"
        return
    fi
    
    # Chercher l'URL dans le fichier
    local found_url=$(grep "NEXT_PUBLIC_API_URL" "$file" | grep -v "^#" | head -n 1)
    
    if echo "$found_url" | grep -q "$expected"; then
        echo -e "${GREEN}✅ $project: Configuration correcte${NC}"
        echo "   File: $(basename $file)"
        echo "   URL: $expected"
    else
        echo -e "${RED}❌ $project: ERREUR - URL incorrecte!${NC}"
        echo "   File: $(basename $file)"
        echo "   Trouvé: $found_url"
        echo "   Attendu: $expected"
        ERRORS=$((ERRORS + 1))
    fi
    echo ""
}

echo "Vérification des configurations frontend..."
echo ""

# Vérifier Qatar
check_url "$ROOT_DIR/projects/hearst-qatar-new/frontend/env.example" \
    "http://localhost:4000/api/qatar" \
    "Hearst Qatar"

check_url "$ROOT_DIR/projects/hearst-qatar-new/frontend/next.config.js" \
    "http://localhost:4000/api/qatar" \
    "Hearst Qatar (next.config)"

check_url "$ROOT_DIR/projects/hearst-qatar-new/frontend/src/lib/api.ts" \
    "http://localhost:4000/api/qatar" \
    "Hearst Qatar (api.ts)"

# Vérifier Design (si existe)
if [ -d "$ROOT_DIR/projects/hearst-design/frontend" ]; then
    check_url "$ROOT_DIR/projects/hearst-design/frontend/env.example" \
        "http://localhost:4000/api/design" \
        "Hearst Design"
fi

# Vérifier SRQ
check_url "$ROOT_DIR/projects/hearst-strategic-reserve-qatar/frontend/env.example" \
    "http://localhost:4000/api/srq" \
    "Hearst SRQ"

check_url "$ROOT_DIR/projects/hearst-strategic-reserve-qatar/frontend/next.config.js" \
    "http://localhost:4000/api/srq" \
    "Hearst SRQ (next.config)"

check_url "$ROOT_DIR/projects/hearst-strategic-reserve-qatar/frontend/src/lib/api.ts" \
    "http://localhost:4000/api/srq" \
    "Hearst SRQ (api.ts)"

# Vérifier les fichiers .env.local (s'ils existent)
if [ -f "$ROOT_DIR/projects/hearst-qatar-new/frontend/.env.local" ]; then
    check_url "$ROOT_DIR/projects/hearst-qatar-new/frontend/.env.local" \
        "http://localhost:4000/api/qatar" \
        "Hearst Qatar (.env.local)"
fi

if [ -f "$ROOT_DIR/projects/hearst-strategic-reserve-qatar/frontend/.env.local" ]; then
    check_url "$ROOT_DIR/projects/hearst-strategic-reserve-qatar/frontend/.env.local" \
        "http://localhost:4000/api/srq" \
        "Hearst SRQ (.env.local)"
fi

# Résultat final
echo "════════════════════════════════════════════════════════"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ SUCCÈS: Toutes les URLs sont correctement configurées!${NC}"
    echo ""
    echo "Tous les frontends pointent vers le Backend Central (port 4000)"
    exit 0
else
    echo -e "${RED}❌ ÉCHEC: $ERRORS erreur(s) détectée(s)!${NC}"
    echo ""
    echo "Des frontends pointent directement vers les backends individuels."
    echo "Voir la documentation: /REGLE_URLS_FRONTENDS.md"
    exit 1
fi

