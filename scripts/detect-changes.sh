#!/bin/bash

# ============================================
# HEARST CONTROL - DÉTECTION DE CHANGEMENTS
# Surveille les modifications dans core/ et backend-central/
# ============================================

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
MANIFEST_FILE="$ROOT_DIR/SYNC_MANIFEST.json"
DETECTION_LOG="$ROOT_DIR/logs/changes-detected-$(date +%Y%m%d).log"

mkdir -p "$ROOT_DIR/logs"

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║       🔍 DÉTECTION DE CHANGEMENTS CRITIQUES          ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# ============================================
# MODE: watch (continu) ou check (ponctuel)
# ============================================

MODE="${1:-check}"

if [ "$MODE" == "watch" ]; then
    echo -e "${CYAN}📡 Mode surveillance continue activé${NC}"
    echo -e "${CYAN}   (Ctrl+C pour arrêter)${NC}"
    echo ""
elif [ "$MODE" == "check" ]; then
    echo -e "${BLUE}🔍 Mode vérification ponctuelle${NC}"
    echo ""
else
    echo -e "${RED}❌ Mode inconnu: $MODE${NC}"
    echo "   Usage: $0 [check|watch]"
    exit 1
fi

# ============================================
# Fonction: Analyser un fichier modifié
# ============================================
analyze_change() {
    local file="$1"
    local change_type="$2"  # modified, added, deleted
    
    echo ""
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    # Déterminer la criticité
    CRITICAL=false
    NOTIFICATION_TYPE=""
    ACTION_REQUIRED=""
    
    # Analyse selon le chemin du fichier
    case "$file" in
        core/auth/*)
            CRITICAL=true
            NOTIFICATION_TYPE="AUTH_MODIFIED"
            ACTION_REQUIRED="./scripts/verify-auth-security.sh && ./scripts/sync-core-to-projects.sh"
            echo -e "${RED}🔴 CRITIQUE - AUTHENTIFICATION${NC}"
            ;;
        core/middleware/*)
            CRITICAL=true
            NOTIFICATION_TYPE="CORE_MODIFIED"
            ACTION_REQUIRED="./scripts/sync-core-to-projects.sh"
            echo -e "${RED}🔴 CRITIQUE - MIDDLEWARE${NC}"
            ;;
        core/database/*)
            CRITICAL=true
            NOTIFICATION_TYPE="CORE_MODIFIED"
            ACTION_REQUIRED="./scripts/sync-core-to-projects.sh"
            echo -e "${RED}🔴 CRITIQUE - DATABASE${NC}"
            ;;
        core/*)
            CRITICAL=true
            NOTIFICATION_TYPE="CORE_MODIFIED"
            ACTION_REQUIRED="./scripts/sync-core-to-projects.sh"
            echo -e "${YELLOW}🟡 IMPORTANT - CORE${NC}"
            ;;
        backend-central/routes/auth.js)
            CRITICAL=true
            NOTIFICATION_TYPE="AUTH_MODIFIED"
            ACTION_REQUIRED="./scripts/verify-backend-impact.sh"
            echo -e "${RED}🔴 CRITIQUE - ROUTES AUTH${NC}"
            ;;
        backend-central/controllers/authController.js)
            CRITICAL=true
            NOTIFICATION_TYPE="AUTH_MODIFIED"
            ACTION_REQUIRED="./scripts/verify-backend-impact.sh"
            echo -e "${RED}🔴 CRITIQUE - AUTH CONTROLLER${NC}"
            ;;
        backend-central/*)
            CRITICAL=false
            NOTIFICATION_TYPE="BACKEND_CENTRAL_MODIFIED"
            ACTION_REQUIRED="./scripts/verify-backend-impact.sh"
            echo -e "${YELLOW}🟡 IMPORTANT - BACKEND CENTRAL${NC}"
            ;;
        database/central-schema.sql)
            CRITICAL=true
            NOTIFICATION_TYPE="SCHEMA_MODIFIED"
            ACTION_REQUIRED="./scripts/sync-schemas.sh"
            echo -e "${RED}🔴 CRITIQUE - SCHÉMA DB${NC}"
            ;;
        core/package.json|backend-central/package.json)
            CRITICAL=false
            NOTIFICATION_TYPE="DEPENDENCY_UPDATE"
            ACTION_REQUIRED="./scripts/check-dependencies.sh"
            echo -e "${BLUE}🔵 INFO - DÉPENDANCES${NC}"
            ;;
        *)
            echo -e "${BLUE}ℹ️  Fichier modifié (non critique)${NC}"
            ;;
    esac
    
    echo ""
    echo "   📁 Fichier: $file"
    echo "   🔄 Type: $change_type"
    echo "   ⚠️  Critique: $([ "$CRITICAL" = true ] && echo "${RED}OUI${NC}" || echo "${GREEN}NON${NC}")"
    
    if [ -n "$ACTION_REQUIRED" ]; then
        echo ""
        echo -e "${CYAN}   📋 ACTION REQUISE:${NC}"
        echo "   $ACTION_REQUIRED"
    fi
    
    # Logger
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $change_type: $file (critical: $CRITICAL)" >> "$DETECTION_LOG"
    
    # Si critique, afficher l'avertissement
    if [ "$CRITICAL" = true ]; then
        echo ""
        echo -e "${RED}╔════════════════════════════════════════════════════╗${NC}"
        echo -e "${RED}║                                                    ║${NC}"
        echo -e "${RED}║  ⚠️  SYNCHRONISATION OBLIGATOIRE REQUISE ⚠️       ║${NC}"
        echo -e "${RED}║                                                    ║${NC}"
        echo -e "${RED}╚════════════════════════════════════════════════════╝${NC}"
        echo ""
        echo -e "${YELLOW}Les projets suivants DOIVENT être mis à jour:${NC}"
        echo "   • hearst-design"
        echo "   • hearst-qatar-new"
        echo "   • hearst-strategic-reserve-qatar"
        echo ""
        
        # Demander confirmation pour synchronisation auto
        if [ "$MODE" == "check" ]; then
            echo -e "${CYAN}Lancer la synchronisation maintenant? (y/n)${NC}"
            read -r response
            if [[ "$response" =~ ^[Yy]$ ]]; then
                echo ""
                echo -e "${GREEN}🚀 Lancement de la synchronisation...${NC}"
                bash "$SCRIPT_DIR/sync-core-to-projects.sh"
            else
                echo ""
                echo -e "${YELLOW}⚠️  Synchronisation reportée${NC}"
                echo "   ATTENTION: N'oubliez pas de synchroniser avant de commiter!"
                echo "   Commande: $ACTION_REQUIRED"
            fi
        fi
    fi
    
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# ============================================
# Fonction: Vérifier changements Git
# ============================================
check_git_changes() {
    echo -e "${BLUE}🔍 Analyse des changements Git...${NC}"
    echo ""
    
    # Fichiers modifiés non commités
    MODIFIED_FILES=$(git diff --name-only 2>/dev/null || echo "")
    
    # Fichiers staged
    STAGED_FILES=$(git diff --cached --name-only 2>/dev/null || echo "")
    
    # Combiner
    ALL_CHANGED_FILES=$(echo -e "$MODIFIED_FILES\n$STAGED_FILES" | sort -u | grep -v '^$')
    
    if [ -z "$ALL_CHANGED_FILES" ]; then
        echo -e "${GREEN}✅ Aucun changement détecté${NC}"
        return 0
    fi
    
    CRITICAL_CHANGES=0
    
    # Analyser chaque fichier
    while IFS= read -r file; do
        # Filtrer selon les chemins surveillés
        if [[ "$file" == core/* ]] || \
           [[ "$file" == backend-central/* ]] || \
           [[ "$file" == database/central-schema.sql ]]; then
            
            # Déterminer le type de changement
            if git diff --cached --name-only | grep -q "^${file}$"; then
                CHANGE_TYPE="staged"
            else
                CHANGE_TYPE="modified"
            fi
            
            analyze_change "$file" "$CHANGE_TYPE"
            
            # Vérifier criticité
            case "$file" in
                core/auth/*|core/middleware/*|core/database/*|backend-central/routes/auth.js|backend-central/controllers/authController.js|database/central-schema.sql)
                    CRITICAL_CHANGES=$((CRITICAL_CHANGES + 1))
                    ;;
            esac
        fi
    done <<< "$ALL_CHANGED_FILES"
    
    echo ""
    
    if [ $CRITICAL_CHANGES -gt 0 ]; then
        echo -e "${RED}╔════════════════════════════════════════════════════╗${NC}"
        echo -e "${RED}║                                                    ║${NC}"
        echo -e "${RED}║  ⚠️  $CRITICAL_CHANGES CHANGEMENT(S) CRITIQUE(S) DÉTECTÉ(S)   ║${NC}"
        echo -e "${RED}║                                                    ║${NC}"
        echo -e "${RED}╚════════════════════════════════════════════════════╝${NC}"
        return 1
    else
        echo -e "${GREEN}✅ Aucun changement critique${NC}"
        return 0
    fi
}

# ============================================
# Fonction: Mode surveillance continue
# ============================================
watch_mode() {
    echo -e "${CYAN}👀 Surveillance des fichiers critiques...${NC}"
    echo ""
    
    # Chemins à surveiller
    WATCH_PATHS=(
        "$ROOT_DIR/core"
        "$ROOT_DIR/backend-central"
        "$ROOT_DIR/database/central-schema.sql"
    )
    
    # Vérifier que fswatch est installé
    if ! command -v fswatch &> /dev/null; then
        echo -e "${RED}❌ fswatch n'est pas installé${NC}"
        echo ""
        echo "Installation:"
        echo "  macOS:  brew install fswatch"
        echo "  Linux:  apt-get install fswatch"
        echo ""
        exit 1
    fi
    
    echo -e "${GREEN}✓${NC} Surveillance active sur:"
    for path in "${WATCH_PATHS[@]}"; do
        echo "  • $path"
    done
    echo ""
    echo -e "${YELLOW}En attente de modifications...${NC}"
    echo ""
    
    # Surveiller les changements
    fswatch -0 -r "${WATCH_PATHS[@]}" | while read -d "" file; do
        # Ignorer node_modules, .log, etc.
        if [[ "$file" =~ node_modules ]] || \
           [[ "$file" =~ \.log$ ]] || \
           [[ "$file" =~ \.env$ ]]; then
            continue
        fi
        
        # Fichier relatif
        REL_FILE="${file#$ROOT_DIR/}"
        
        echo ""
        echo -e "${CYAN}═══════════════════════════════════════════════════════${NC}"
        echo -e "${CYAN}Changement détecté: $(date '+%H:%M:%S')${NC}"
        echo -e "${CYAN}═══════════════════════════════════════════════════════${NC}"
        
        analyze_change "$REL_FILE" "modified"
        
        echo ""
        echo -e "${YELLOW}En attente de modifications...${NC}"
    done
}

# ============================================
# EXÉCUTION PRINCIPALE
# ============================================

if [ "$MODE" == "watch" ]; then
    watch_mode
else
    check_git_changes
    EXIT_CODE=$?
    
    echo ""
    echo "📝 Log détaillé: $DETECTION_LOG"
    echo ""
    
    exit $EXIT_CODE
fi

