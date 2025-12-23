#!/bin/bash
# ============================================
# HEARST CONTROL - Script de Synchronisation GitHub
# Pousse automatiquement les modifications vers GitHub
# ============================================

set -e

cd "$(dirname "$0")"

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║  🔄 HEARST CONTROL - Synchronisation GitHub         ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# Vérifier s'il y a des changements
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ Aucun changement à synchroniser."
    echo ""
    git log --oneline -3
    exit 0
fi

# Afficher les changements
echo "📝 Changements détectés :"
git status --short
echo ""

# Message de commit
if [ -z "$1" ]; then
    COMMIT_MSG="🔄 Mise à jour automatique - $(date '+%Y-%m-%d %H:%M')"
else
    COMMIT_MSG="$1"
fi

# Commit et push
echo "📦 Commit : $COMMIT_MSG"
git add -A
git commit -m "$COMMIT_MSG"

echo ""
echo "🚀 Push vers GitHub..."
git push origin main

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║  ✅ SYNCHRONISATION RÉUSSIE !                       ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo "📍 GitHub : https://github.com/adrien-debug/Hearst-Control"
echo "📅 Date   : $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

