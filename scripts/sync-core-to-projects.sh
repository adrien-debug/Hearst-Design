#!/bin/bash

# ============================================
# HEARST CONTROL - SYNCHRONISATION AUTOMATIQUE
# Propage les modifications de core/ vers tous les projets
# ============================================

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║       🔄 SYNCHRONISATION AUTOMATIQUE - CORE          ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
MANIFEST_FILE="$ROOT_DIR/SYNC_MANIFEST.json"
CHANGELOG_FILE="$ROOT_DIR/SYNC_CHANGELOG.md"
SYNC_LOG="$ROOT_DIR/logs/sync-$(date +%Y%m%d-%H%M%S).log"

# Créer dossier logs si nécessaire
mkdir -p "$ROOT_DIR/logs"

# Vérifier que le manifest existe
if [ ! -f "$MANIFEST_FILE" ]; then
    echo -e "${RED}❌ ERREUR: SYNC_MANIFEST.json introuvable${NC}"
    exit 1
fi

# Variables de comptage
TOTAL_FILES=0
SYNCED_FILES=0
FAILED_FILES=0
SKIPPED_FILES=0

# ============================================
# Fonction: Log dans fichier et console
# ============================================
log_message() {
    local message="$1"
    echo "$message" | tee -a "$SYNC_LOG"
}

# ============================================
# Fonction: Créer backup avant synchronisation
# ============================================
create_backup() {
    local target_file="$1"
    local backup_file="${target_file}.backup-$(date +%Y%m%d-%H%M%S)"
    
    if [ -f "$target_file" ]; then
        cp "$target_file" "$backup_file"
        log_message "   📦 Backup créé: $backup_file"
        return 0
    fi
    return 1
}

# ============================================
# Fonction: Synchroniser un fichier
# ============================================
sync_file() {
    local source="$1"
    local target="$2"
    local description="$3"
    local critical="$4"
    
    TOTAL_FILES=$((TOTAL_FILES + 1))
    
    echo ""
    log_message "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    if [ "$critical" == "true" ]; then
        log_message "${RED}🔴 CRITIQUE${NC} - $description"
    else
        log_message "${YELLOW}🟡 Standard${NC} - $description"
    fi
    log_message "   Source: $source"
    log_message "   Target: $target"
    
    # Vérifier que la source existe
    if [ ! -f "$ROOT_DIR/$source" ]; then
        log_message "${RED}   ❌ ERREUR: Fichier source introuvable${NC}"
        FAILED_FILES=$((FAILED_FILES + 1))
        return 1
    fi
    
    # Créer le dossier cible si nécessaire
    target_dir=$(dirname "$ROOT_DIR/$target")
    mkdir -p "$target_dir"
    
    # Créer backup si le fichier existe
    if [ -f "$ROOT_DIR/$target" ]; then
        # Vérifier si le fichier a changé
        if cmp -s "$ROOT_DIR/$source" "$ROOT_DIR/$target"; then
            log_message "${BLUE}   ⏭️  Fichier identique - Synchronisation ignorée${NC}"
            SKIPPED_FILES=$((SKIPPED_FILES + 1))
            return 0
        fi
        
        create_backup "$ROOT_DIR/$target"
    fi
    
    # Copier le fichier
    if cp "$ROOT_DIR/$source" "$ROOT_DIR/$target"; then
        log_message "${GREEN}   ✅ Synchronisation réussie${NC}"
        SYNCED_FILES=$((SYNCED_FILES + 1))
        
        # Logger dans le changelog
        echo "- [$( date '+%Y-%m-%d %H:%M:%S' )] Synchronisé: $source → $target" >> "$CHANGELOG_FILE"
        
        return 0
    else
        log_message "${RED}   ❌ ERREUR: Échec de la synchronisation${NC}"
        FAILED_FILES=$((FAILED_FILES + 1))
        return 1
    fi
}

# ============================================
# Fonction: Extraire info du manifest
# ============================================
get_sync_files() {
    # Utiliser jq pour parser le JSON (si disponible), sinon fallback
    if command -v jq &> /dev/null; then
        jq -r '.syncRules.core.files[] | "\(.source)|\(.targets[])|\(.description)|\(.critical)"' "$MANIFEST_FILE"
    else
        echo -e "${YELLOW}⚠️  jq non installé - Synchronisation manuelle requise${NC}"
        echo "   Installer: brew install jq (macOS) ou apt install jq (Linux)"
        exit 1
    fi
}

# ============================================
# SYNCHRONISATION PRINCIPALE
# ============================================

echo -e "${BLUE}📋 Lecture du manifest de synchronisation...${NC}"
echo ""

# Header du changelog
if [ ! -f "$CHANGELOG_FILE" ]; then
    cat > "$CHANGELOG_FILE" << EOF
# SYNC CHANGELOG - Historique des Synchronisations

> 🔄 Ce fichier est généré automatiquement par \`sync-core-to-projects.sh\`

---

EOF
fi

# Ajouter entrée de session
echo "" >> "$CHANGELOG_FILE"
echo "## Session de synchronisation - $(date '+%Y-%m-%d %H:%M:%S')" >> "$CHANGELOG_FILE"
echo "" >> "$CHANGELOG_FILE"

# Synchroniser chaque fichier du manifest
while IFS='|' read -r source targets description critical; do
    # Découper les targets (séparés par des virgules dans le JSON)
    # Note: jq renvoie une ligne par target, donc on traite directement
    sync_file "$source" "$targets" "$description" "$critical"
done < <(get_sync_files)

# ============================================
# RÉSUMÉ
# ============================================

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║           📊 RÉSUMÉ DE LA SYNCHRONISATION            ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

log_message "   Total fichiers traités:  $TOTAL_FILES"
log_message "${GREEN}   ✅ Synchronisés:          $SYNCED_FILES${NC}"
log_message "${BLUE}   ⏭️  Ignorés (identiques):  $SKIPPED_FILES${NC}"

if [ $FAILED_FILES -gt 0 ]; then
    log_message "${RED}   ❌ Échecs:                $FAILED_FILES${NC}"
    echo ""
    echo -e "${RED}⚠️  ATTENTION: Certaines synchronisations ont échoué${NC}"
    echo "   Consultez le log: $SYNC_LOG"
    exit 1
else
    log_message "${GREEN}   ✨ Tous les fichiers synchronisés avec succès${NC}"
fi

echo ""
echo "📝 Log détaillé: $SYNC_LOG"
echo "📋 Changelog: $CHANGELOG_FILE"
echo ""

# ============================================
# VÉRIFICATIONS POST-SYNC
# ============================================

echo -e "${PURPLE}🔍 Vérifications post-synchronisation...${NC}"
echo ""

# Vérifier que chaque projet a bien les fichiers core
PROJECTS=("hearst-design" "hearst-qatar-new" "hearst-strategic-reserve-qatar")
MISSING_FILES=0

for project in "${PROJECTS[@]}"; do
    echo -e "${BLUE}  Vérification: $project${NC}"
    
    # Vérifier les fichiers critiques
    CRITICAL_FILES=(
        "backend/core-modules/auth/authService.js"
        "backend/core-modules/middleware/authMiddleware.js"
        "backend/core-modules/database/supabaseClient.js"
    )
    
    for file in "${CRITICAL_FILES[@]}"; do
        if [ -f "$ROOT_DIR/projects/$project/$file" ]; then
            echo -e "    ${GREEN}✓${NC} $file"
        else
            echo -e "    ${RED}✗${NC} $file ${RED}(MANQUANT)${NC}"
            MISSING_FILES=$((MISSING_FILES + 1))
        fi
    done
    echo ""
done

if [ $MISSING_FILES -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Attention: $MISSING_FILES fichiers critiques manquants${NC}"
    echo "   Certains projets pourraient nécessiter une synchronisation manuelle"
fi

# ============================================
# RECOMMANDATIONS
# ============================================

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║              📢 ACTIONS RECOMMANDÉES                 ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

if [ $SYNCED_FILES -gt 0 ]; then
    echo "1. ${YELLOW}Tester chaque projet après synchronisation${NC}"
    echo "   - cd projects/hearst-design && npm test"
    echo "   - cd projects/hearst-qatar-new && npm test"
    echo "   - cd projects/hearst-strategic-reserve-qatar && npm test"
    echo ""
    echo "2. ${YELLOW}Redémarrer les services${NC}"
    echo "   - ./scripts/stop-all.sh"
    echo "   - ./scripts/start-all.sh"
    echo ""
    echo "3. ${YELLOW}Vérifier les logs${NC}"
    echo "   - tail -f logs/*.log"
    echo ""
    echo "4. ${YELLOW}Commiter les changements${NC}"
    echo "   - git add ."
    echo "   - git commit -m \"sync: Propagation core → projects\""
fi

echo ""
echo -e "${GREEN}✅ Synchronisation terminée${NC}"
echo ""

