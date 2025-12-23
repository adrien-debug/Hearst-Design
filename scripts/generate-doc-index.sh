#!/bin/bash
# ============================================
# HEARST CONTROL - Générateur d'Index Documentation
# Régénère automatiquement DOCUMENTATION_INDEX.md
# ============================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
INDEX_FILE="$ROOT_DIR/DOCUMENTATION_INDEX.md"
TEMP_FILE="$ROOT_DIR/.doc_index_temp.md"

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║  📚 HEARST CONTROL - Documentation Index Generator  ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# Date de mise à jour
UPDATE_DATE=$(date +"%d %B %Y")

# Fonction pour lister les fichiers MD dans un dossier
list_docs() {
    local folder="$1"
    local prefix="$2"
    
    if [ -d "$ROOT_DIR/$folder" ]; then
        for file in "$ROOT_DIR/$folder"/*.md; do
            if [ -f "$file" ]; then
                filename=$(basename "$file")
                echo "| [$filename](./$folder/$filename) | - | ✅ |"
            fi
        done
    fi
}

echo "📂 Analyse de la structure..."
echo ""

# Compter les fichiers
DOCS_GUIDES=$(find "$ROOT_DIR/docs/guides" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
DOCS_ARCH=$(find "$ROOT_DIR/docs/architecture" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
DOCS_RAPPORTS=$(find "$ROOT_DIR/docs/rapports" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
SCHEMAS=$(find "$ROOT_DIR/schemas" -name "*.sql" 2>/dev/null | wc -l | tr -d ' ')
ENV_FILES=$(find "$ROOT_DIR/env" -name "*.example" 2>/dev/null | wc -l | tr -d ' ')

echo "📊 Statistiques :"
echo "   • Guides       : $DOCS_GUIDES fichiers"
echo "   • Architecture : $DOCS_ARCH fichiers"
echo "   • Rapports     : $DOCS_RAPPORTS fichiers"
echo "   • Schémas SQL  : $SCHEMAS fichiers"
echo "   • Fichiers .env: $ENV_FILES fichiers"
echo ""

# Générer la liste des documents
echo "📝 Génération de l'inventaire..."

# Guides
echo "" > "$TEMP_FILE"
echo "### 📋 Guides disponibles :" >> "$TEMP_FILE"
if [ -d "$ROOT_DIR/docs/guides" ]; then
    for file in "$ROOT_DIR/docs/guides"/*.md; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            echo "- [$filename](./docs/guides/$filename)" >> "$TEMP_FILE"
        fi
    done
fi

# Architecture
echo "" >> "$TEMP_FILE"
echo "### 🏗️ Architecture :" >> "$TEMP_FILE"
if [ -d "$ROOT_DIR/docs/architecture" ]; then
    for file in "$ROOT_DIR/docs/architecture"/*.md; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            echo "- [$filename](./docs/architecture/$filename)" >> "$TEMP_FILE"
        fi
    done
fi

# Rapports
echo "" >> "$TEMP_FILE"
echo "### 📊 Rapports :" >> "$TEMP_FILE"
if [ -d "$ROOT_DIR/docs/rapports" ]; then
    for file in "$ROOT_DIR/docs/rapports"/*.md; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            echo "- [$filename](./docs/rapports/$filename)" >> "$TEMP_FILE"
        fi
    done
fi

# Schémas SQL
echo "" >> "$TEMP_FILE"
echo "### 🗄️ Schémas SQL :" >> "$TEMP_FILE"
if [ -d "$ROOT_DIR/schemas" ]; then
    for file in "$ROOT_DIR/schemas"/*.sql; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            echo "- [$filename](./schemas/$filename)" >> "$TEMP_FILE"
        fi
    done
fi

# Fichiers env
echo "" >> "$TEMP_FILE"
echo "### ⚙️ Variables d'environnement :" >> "$TEMP_FILE"
if [ -d "$ROOT_DIR/env" ]; then
    for file in "$ROOT_DIR/env"/*.example; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            echo "- [$filename](./env/$filename)" >> "$TEMP_FILE"
        fi
    done
fi

echo ""
echo "✅ Inventaire généré : $TEMP_FILE"
echo ""
echo "📄 Fichiers détectés :"
cat "$TEMP_FILE"
echo ""

# Nettoyer
rm -f "$TEMP_FILE"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Analyse terminée !"
echo ""
echo "📌 Pour mettre à jour l'index principal :"
echo "   Éditez manuellement : $INDEX_FILE"
echo ""
echo "💡 Tip: Claude peut mettre à jour l'index automatiquement"
echo "   en analysant cette sortie."
echo ""

