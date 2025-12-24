#!/bin/bash

# ============================================
# HEARST CONTROL - VÉRIFICATION SYNCHRONISATION
# Vérifie que core/ est bien synchronisé avec tous les projets
# ============================================

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║       🔍 VÉRIFICATION DE SYNCHRONISATION             ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
MANIFEST_FILE="$ROOT_DIR/SYNC_MANIFEST.json"

# Variables de comptage
TOTAL_CHECKS=0
SYNC_OK=0
SYNC_ERRORS=0
WARNINGS=0

# ============================================
# Fonction: Comparer deux fichiers
# ============================================
compare_files() {
    local source="$1"
    local target="$2"
    local description="$3"
    
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo "$description"
    echo "  Source: $source"
    echo "  Target: $target"
    
    # Vérifier que la source existe
    if [ ! -f "$ROOT_DIR/$source" ]; then
        echo -e "${RED}  ✗ Source manquante${NC}"
        SYNC_ERRORS=$((SYNC_ERRORS + 1))
        return 1
    fi
    
    # Vérifier que la target existe
    if [ ! -f "$ROOT_DIR/$target" ]; then
        echo -e "${YELLOW}  ⚠ Target manquante (non synchronisé)${NC}"
        WARNINGS=$((WARNINGS + 1))
        return 1
    fi
    
    # Comparer les fichiers
    if cmp -s "$ROOT_DIR/$source" "$ROOT_DIR/$target"; then
        echo -e "${GREEN}  ✓ Synchronisé${NC}"
        SYNC_OK=$((SYNC_OK + 1))
        return 0
    else
        echo -e "${RED}  ✗ DÉSYNCHRONISÉ${NC}"
        
        # Afficher les différences (première ligne différente)
        DIFF_OUTPUT=$(diff -u "$ROOT_DIR/$source" "$ROOT_DIR/$target" 2>/dev/null | head -20)
        if [ -n "$DIFF_OUTPUT" ]; then
            echo -e "${YELLOW}  Aperçu des différences:${NC}"
            echo "$DIFF_OUTPUT" | head -10 | sed 's/^/    /'
            echo "    ..."
        fi
        
        SYNC_ERRORS=$((SYNC_ERRORS + 1))
        return 1
    fi
}

# ============================================
# Vérification des fichiers critiques
# ============================================

echo -e "${CYAN}📋 Vérification des fichiers core...${NC}"
echo ""

# Projets à vérifier
PROJECTS=("hearst-design" "hearst-qatar-new" "hearst-strategic-reserve-qatar")

# Fichiers core critiques
CORE_FILES=(
    "auth/authService.js"
    "middleware/authMiddleware.js"
    "database/supabaseClient.js"
    "shared-utils/logger.js"
    "shared-utils/validators.js"
)

# Vérifier chaque combinaison projet x fichier
for project in "${PROJECTS[@]}"; do
    echo ""
    echo -e "${CYAN}═══ Projet: $project ═══${NC}"
    echo ""
    
    # Vérifier que le projet existe
    if [ ! -d "$ROOT_DIR/projects/$project" ]; then
        echo -e "${RED}⚠️  Projet non trouvé: projects/$project${NC}"
        WARNINGS=$((WARNINGS + 1))
        continue
    fi
    
    # Vérifier chaque fichier core
    for core_file in "${CORE_FILES[@]}"; do
        SOURCE="core/$core_file"
        TARGET="projects/$project/backend/core-modules/$core_file"
        DESC="Core: $core_file"
        
        compare_files "$SOURCE" "$TARGET" "$DESC"
    done
done

# ============================================
# Vérifications supplémentaires
# ============================================

echo ""
echo ""
echo -e "${CYAN}🔍 Vérifications supplémentaires...${NC}"
echo ""

# 1. Vérifier package.json core vs projets
echo -e "${BLUE}1. Dépendances npm (core)${NC}"

if [ -f "$ROOT_DIR/core/package.json" ]; then
    CORE_VERSION=$(jq -r '.version' "$ROOT_DIR/core/package.json" 2>/dev/null || echo "unknown")
    echo "   Version core: $CORE_VERSION"
    
    # Vérifier dans chaque projet
    for project in "${PROJECTS[@]}"; do
        PROJECT_BACKEND="$ROOT_DIR/projects/$project/backend"
        if [ -f "$PROJECT_BACKEND/package.json" ]; then
            # Extraire dépendances critiques
            BCRYPT_VERSION=$(jq -r '.dependencies.bcryptjs // "N/A"' "$PROJECT_BACKEND/package.json" 2>/dev/null)
            JWT_VERSION=$(jq -r '.dependencies.jsonwebtoken // "N/A"' "$PROJECT_BACKEND/package.json" 2>/dev/null)
            
            echo "   $project:"
            echo "     • bcryptjs: $BCRYPT_VERSION"
            echo "     • jsonwebtoken: $JWT_VERSION"
        fi
    done
else
    echo -e "   ${YELLOW}⚠ core/package.json non trouvé${NC}"
fi

echo ""

# 2. Vérifier structure des dossiers
echo -e "${BLUE}2. Structure des dossiers core-modules${NC}"

for project in "${PROJECTS[@]}"; do
    CORE_MODULES_DIR="$ROOT_DIR/projects/$project/backend/core-modules"
    
    if [ -d "$CORE_MODULES_DIR" ]; then
        echo -e "   ${GREEN}✓${NC} $project/backend/core-modules"
        
        # Vérifier sous-dossiers essentiels
        for subdir in "auth" "middleware" "database" "utils"; do
            if [ -d "$CORE_MODULES_DIR/$subdir" ]; then
                echo -e "     ${GREEN}✓${NC} $subdir/"
            else
                echo -e "     ${YELLOW}⚠${NC} $subdir/ (manquant)"
                WARNINGS=$((WARNINGS + 1))
            fi
        done
    else
        echo -e "   ${RED}✗${NC} $project/backend/core-modules (MANQUANT)"
        SYNC_ERRORS=$((SYNC_ERRORS + 1))
    fi
done

echo ""

# 3. Vérifier permissions des fichiers
echo -e "${BLUE}3. Permissions des scripts${NC}"

SCRIPTS_TO_CHECK=(
    "scripts/sync-core-to-projects.sh"
    "scripts/detect-changes.sh"
    "scripts/verify-sync.sh"
    "scripts/start-all.sh"
    "scripts/stop-all.sh"
)

for script in "${SCRIPTS_TO_CHECK[@]}"; do
    if [ -f "$ROOT_DIR/$script" ]; then
        if [ -x "$ROOT_DIR/$script" ]; then
            echo -e "   ${GREEN}✓${NC} $script (exécutable)"
        else
            echo -e "   ${YELLOW}⚠${NC} $script (pas exécutable)"
            WARNINGS=$((WARNINGS + 1))
        fi
    else
        echo -e "   ${YELLOW}⚠${NC} $script (non trouvé)"
        WARNINGS=$((WARNINGS + 1))
    fi
done

# ============================================
# RÉSUMÉ
# ============================================

echo ""
echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║              📊 RÉSUMÉ DE LA VÉRIFICATION            ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

echo "   Total vérifications:      $TOTAL_CHECKS"
echo -e "${GREEN}   ✓ Synchronisés:           $SYNC_OK${NC}"
echo -e "${YELLOW}   ⚠ Avertissements:         $WARNINGS${NC}"
echo -e "${RED}   ✗ Erreurs:                $SYNC_ERRORS${NC}"

echo ""

# ============================================
# DÉCISION FINALE
# ============================================

if [ $SYNC_ERRORS -eq 0 ]; then
    echo -e "${GREEN}╔════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                    ║${NC}"
    echo -e "${GREEN}║            ✅ SYNCHRONISATION CONFORME             ║${NC}"
    echo -e "${GREEN}║                                                    ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════╝${NC}"
    
    if [ $WARNINGS -gt 0 ]; then
        echo ""
        echo -e "${YELLOW}⚠️  $WARNINGS avertissement(s) détecté(s)${NC}"
        echo "   Recommandé de vérifier mais pas bloquant"
    fi
    
    echo ""
    exit 0
else
    echo -e "${RED}╔════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║                                                    ║${NC}"
    echo -e "${RED}║         ❌ SYNCHRONISATION NON CONFORME ❌         ║${NC}"
    echo -e "${RED}║                                                    ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${CYAN}📋 ACTIONS REQUISES:${NC}"
    echo ""
    echo "1. Synchroniser les fichiers:"
    echo -e "   ${GREEN}./scripts/sync-core-to-projects.sh${NC}"
    echo ""
    echo "2. Revérifier la synchronisation:"
    echo -e "   ${GREEN}./scripts/verify-sync.sh${NC}"
    echo ""
    echo "3. Si erreurs persistent, vérifier manuellement:"
    echo "   • Structure des dossiers core-modules/"
    echo "   • Permissions des fichiers"
    echo "   • Contenu des fichiers source"
    echo ""
    
    exit 1
fi

