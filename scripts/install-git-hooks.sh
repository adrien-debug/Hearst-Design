#!/bin/bash

# ============================================================================
# HEARST CONTROL - Installation des Git Hooks
# Installe automatiquement les hooks de sécurité ET de synchronisation
# ============================================================================

set -e

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║         🪝 INSTALLATION DES GIT HOOKS               ║"
echo "║          (Sécurité + Synchronisation)                ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# Obtenir le répertoire du script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
GIT_HOOKS_DIR="$ROOT_DIR/.git/hooks"
SOURCE_HOOKS_DIR="$SCRIPT_DIR/git-hooks"

# Vérifier qu'on est dans un repo Git
if [ ! -d "$ROOT_DIR/.git" ]; then
    echo -e "${RED}❌ Erreur: Ce n'est pas un repository Git${NC}"
    exit 1
fi

# Créer le dossier hooks s'il n'existe pas
mkdir -p "$GIT_HOOKS_DIR"

# ============================================================================
# Installer Pre-commit Hook (avec synchronisation)
# ============================================================================

echo -e "${CYAN}📝 Installation du pre-commit hook (synchronisation + sécurité)...${NC}"

# Vérifier si hook custom existe
if [ -f "$SOURCE_HOOKS_DIR/pre-commit" ]; then
    echo -e "  ${GREEN}✓${NC} Utilisation du hook avancé"
    
    # Backup si existe
    if [ -f "$GIT_HOOKS_DIR/pre-commit" ]; then
        cp "$GIT_HOOKS_DIR/pre-commit" "$GIT_HOOKS_DIR/pre-commit.backup-$(date +%Y%m%d-%H%M%S)"
        echo -e "  ${YELLOW}⚠${NC} Backup de l'ancien hook créé"
    fi
    
    cp "$SOURCE_HOOKS_DIR/pre-commit" "$GIT_HOOKS_DIR/pre-commit"
    chmod +x "$GIT_HOOKS_DIR/pre-commit"
else
    # Fallback: créer hook basique
    echo -e "  ${YELLOW}⚠${NC} Hook avancé non trouvé, création d'un hook basique"
    
    cat > "$GIT_HOOKS_DIR/pre-commit" << 'EOF'
#!/bin/bash

# Hearst Control - Pre-commit Hook
# Vérifie secrets + synchronisation

SCRIPT_DIR="$(git rev-parse --show-toplevel)"

# 1. Vérifier les secrets
if [ -f "$SCRIPT_DIR/scripts/check-secrets.sh" ]; then
    bash "$SCRIPT_DIR/scripts/check-secrets.sh"
fi

# 2. Détecter changements critiques
if [ -f "$SCRIPT_DIR/scripts/detect-changes.sh" ]; then
    bash "$SCRIPT_DIR/scripts/detect-changes.sh" check
fi

exit 0
EOF
    chmod +x "$GIT_HOOKS_DIR/pre-commit"
fi

echo -e "${GREEN}✅ Pre-commit hook installé${NC}"

# ============================================================================
# Installer Commit-msg Hook
# ============================================================================

echo ""
echo -e "${CYAN}📝 Installation du commit-msg hook...${NC}"

cat > "$GIT_HOOKS_DIR/commit-msg" << 'EOF'
#!/bin/bash

# Hearst Control - Commit Message Hook

commit_msg_file=$1
commit_msg=$(cat "$commit_msg_file")

# Vérifier qu'il y a un message
if [ -z "$commit_msg" ]; then
    echo "❌ Message de commit vide"
    exit 1
fi

# Vérifier la longueur minimale
if [ ${#commit_msg} -lt 10 ]; then
    echo "❌ Message de commit trop court (minimum 10 caractères)"
    exit 1
fi

# Avertir si des secrets potentiels
if echo "$commit_msg" | grep -qiE '(password|secret|key|token|credential).*[:=]'; then
    echo "⚠️  ATTENTION: Le message contient potentiellement des secrets"
fi

# Suggérer préfixes conventionnels
if ! echo "$commit_msg" | grep -qiE '^(feat|fix|docs|style|refactor|test|chore|sync):'; then
    echo ""
    echo "💡 Conseil: Utilisez des préfixes conventionnels:"
    echo "   feat: Nouvelle fonctionnalité"
    echo "   fix: Correction de bug"
    echo "   docs: Documentation"
    echo "   sync: Synchronisation core → projets"
    echo "   chore: Tâches de maintenance"
fi

exit 0
EOF

chmod +x "$GIT_HOOKS_DIR/commit-msg"
echo -e "${GREEN}✅ Commit-msg hook installé${NC}"

# ============================================================================
# Installer Pre-push Hook
# ============================================================================

echo ""
echo -e "${CYAN}📝 Installation du pre-push hook...${NC}"

cat > "$GIT_HOOKS_DIR/pre-push" << 'EOF'
#!/bin/bash

# Hearst Control - Pre-push Hook

echo ""
echo "🔍 Vérification avant push..."
echo ""

# Vérifier .env dans commits
if git log @{u}.. --name-only --oneline 2>/dev/null | grep -qE '^\.env$|\.env\.local$'; then
    echo "❌ ERREUR: Fichier .env détecté dans les commits"
    exit 1
fi

# Vérifier synchronisation si core modifié
CORE_MODIFIED=$(git log @{u}.. --name-only 2>/dev/null | grep -c '^core/' || true)
if [ "$CORE_MODIFIED" -gt 0 ]; then
    echo "⚠️  Modifications de core/ détectées"
    echo "   Vérification de la synchronisation..."
    
    SCRIPT_DIR="$(git rev-parse --show-toplevel)"
    if [ -f "$SCRIPT_DIR/scripts/verify-sync.sh" ]; then
        if ! bash "$SCRIPT_DIR/scripts/verify-sync.sh"; then
            echo ""
            echo "❌ Synchronisation non conforme"
            echo "   Exécutez: ./scripts/sync-core-to-projects.sh"
            exit 1
        fi
    fi
fi

echo "✅ Vérifications pre-push OK"
exit 0
EOF

chmod +x "$GIT_HOOKS_DIR/pre-push"
echo -e "${GREEN}✅ Pre-push hook installé${NC}"

# ============================================================================
# Rendre scripts exécutables
# ============================================================================

echo ""
echo -e "${CYAN}🔧 Configuration des scripts...${NC}"

SCRIPTS_TO_CHMOD=(
    "sync-core-to-projects.sh"
    "detect-changes.sh"
    "verify-sync.sh"
    "check-secrets.sh"
    "start-all.sh"
    "stop-all.sh"
    "test-multi-tenant.sh"
)

for script in "${SCRIPTS_TO_CHMOD[@]}"; do
    if [ -f "$SCRIPT_DIR/$script" ]; then
        chmod +x "$SCRIPT_DIR/$script"
        echo -e "  ${GREEN}✓${NC} $script"
    fi
done

# ============================================================================
# Résumé
# ============================================================================

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                                                      ║"
echo "║              ✅ INSTALLATION TERMINÉE                ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

echo -e "${GREEN}Hooks Git installés:${NC}"
echo "  • pre-commit  → Secrets + Synchronisation"
echo "  • commit-msg  → Format des messages"
echo "  • pre-push    → Vérification finale"
echo ""

echo -e "${CYAN}🔍 Fonctionnalités de synchronisation:${NC}"
echo "  • Détection automatique changements critiques"
echo "  • Vérification synchronisation core → projets"
echo "  • Blocage commits si synchronisation manquante"
echo "  • Alertes pour modifications auth/security"
echo ""

echo -e "${CYAN}📖 Commandes disponibles:${NC}"
echo ""
echo -e "  ${GREEN}./scripts/sync-core-to-projects.sh${NC}"
echo "    → Synchroniser core vers tous les projets"
echo ""
echo -e "  ${GREEN}./scripts/detect-changes.sh check${NC}"
echo "    → Vérifier les changements critiques"
echo ""
echo -e "  ${GREEN}./scripts/detect-changes.sh watch${NC}"
echo "    → Surveiller en continu"
echo ""
echo -e "  ${GREEN}./scripts/verify-sync.sh${NC}"
echo "    → Vérifier cohérence synchronisation"
echo ""

echo -e "${YELLOW}💡 Pour désactiver temporairement:${NC}"
echo "   git commit --no-verify"
echo "   ${RED}(FORTEMENT DÉCONSEILLÉ)${NC}"
echo ""

echo -e "${CYAN}Pour désinstaller:${NC}"
echo "   rm .git/hooks/pre-commit"
echo "   rm .git/hooks/commit-msg"
echo "   rm .git/hooks/pre-push"
echo ""
