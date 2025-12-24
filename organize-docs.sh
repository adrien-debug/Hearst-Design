#!/bin/bash
# organize-docs.sh - Script pour ranger automatiquement les documents

echo "🧹 Démarrage de l'organisation des documents..."
echo ""

# Créer les dossiers s'ils n'existent pas
mkdir -p docs/rapports
mkdir -p docs/guides
mkdir -p docs/tests
mkdir -p database
mkdir -p schemas
mkdir -p docs/projets

# Compteurs
MOVED=0

# Rapports
echo "📊 Organisation des rapports..."
for file in RAPPORT_*.md *_SUCCESS.md *_STATUS.md CORRECTIONS_*.md AUDIT_*.md SAUVEGARDE_*.md ETAT_*.md; do
  if [ -f "$file" ]; then
    mv "$file" docs/rapports/ 2>/dev/null && echo "  ✓ $file → docs/rapports/" && ((MOVED++))
  fi
done

# Guides
echo "📚 Organisation des guides..."
for file in GUIDE_*.md DEMARRAGE_*.md START_*.md INSTRUCTIONS_*.md CONNECT_*.md; do
  if [ -f "$file" ]; then
    mv "$file" docs/guides/ 2>/dev/null && echo "  ✓ $file → docs/guides/" && ((MOVED++))
  fi
done

# Tests
echo "🧪 Organisation des tests..."
for file in TEST_*.md SYNTHESE_TESTS_*.md INDEX_TESTS_*.md README_TESTS_*.md; do
  if [ -f "$file" ]; then
    mv "$file" docs/tests/ 2>/dev/null && echo "  ✓ $file → docs/tests/" && ((MOVED++))
  fi
done

# Scripts SQL - Setup/Schema
echo "🗄️  Organisation des schémas SQL..."
for file in SETUP_*.sql *_SCHEMA.sql FRESH_START.sql; do
  if [ -f "$file" ]; then
    mv "$file" schemas/ 2>/dev/null && echo "  ✓ $file → schemas/" && ((MOVED++))
  fi
done

# Scripts SQL - Fixes/Populate
echo "🔧 Organisation des scripts SQL..."
for file in FIX_*.sql POPULATE_*.sql ADD_*.sql CHECK_*.sql VERIFY_*.sql; do
  if [ -f "$file" ]; then
    mv "$file" database/ 2>/dev/null && echo "  ✓ $file → database/" && ((MOVED++))
  fi
done

# Specs et projets
echo "📋 Organisation des specs projets..."
for file in *_SPECS.md CREATE_*.md; do
  if [ -f "$file" ]; then
    mv "$file" docs/projets/ 2>/dev/null && echo "  ✓ $file → docs/projets/" && ((MOVED++))
  fi
done

# Index et organisation
echo "📑 Organisation des index..."
for file in INDEX_*.md ORGANISATION_*.md NAVIGATION_*.md RESUME_*.md REORGANISATION_*.md; do
  if [ -f "$file" ] && [ "$file" != "DOCUMENTATION_INDEX.md" ]; then
    mv "$file" docs/ 2>/dev/null && echo "  ✓ $file → docs/" && ((MOVED++))
  fi
done

# Fichiers HTML de test
echo "🌐 Organisation des fichiers HTML de test..."
mkdir -p _archive/test-html
for file in login-*.html test-*.html; do
  if [ -f "$file" ]; then
    mv "$file" _archive/test-html/ 2>/dev/null && echo "  ✓ $file → _archive/test-html/" && ((MOVED++))
  fi
done

# Scripts shell de génération
echo "📝 Organisation des scripts utilitaires..."
for file in generate-*.js raccorder-*.sh setup-*.sh test-*.js; do
  if [ -f "$file" ] && [ "$file" != "organize-docs.sh" ]; then
    mv "$file" scripts/ 2>/dev/null && echo "  ✓ $file → scripts/" && ((MOVED++))
  fi
done

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║       ✅ ORGANISATION TERMINÉE !                     ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "📊 Statistiques:"
echo "   • $MOVED fichiers déplacés"
echo ""
echo "📁 Structure finale:"
echo "   • docs/rapports/     - Rapports et statuts"
echo "   • docs/guides/       - Guides d'utilisation"
echo "   • docs/tests/        - Documentation tests"
echo "   • schemas/           - Schémas base de données"
echo "   • database/          - Scripts SQL (fixes, populate)"
echo "   • scripts/           - Scripts utilitaires"
echo "   • _archive/          - Fichiers archivés"
echo ""

