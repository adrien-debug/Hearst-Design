#!/bin/bash

# Script de test complet d'accès SQL à Supabase
# Hearst Control - 24 décembre 2025

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║     TEST COMPLET D'ACCÈS SQL - HEARST CONTROL             ║"
echo "║                    Supabase Database                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier que nous sommes dans le bon répertoire
if [ ! -d "backend-central" ]; then
    echo -e "${RED}❌ Erreur: Répertoire backend-central non trouvé${NC}"
    echo "   Veuillez exécuter ce script depuis la racine du projet"
    exit 1
fi

cd backend-central

# Vérifier que le fichier .env existe
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ Erreur: Fichier .env non trouvé${NC}"
    echo "   Veuillez créer un fichier .env avec vos credentials Supabase"
    exit 1
fi

echo -e "${BLUE}📋 Tests disponibles:${NC}"
echo ""
echo "  1. Test de connexion basique"
echo "  2. Test de vérification du schéma"
echo "  3. Test d'accès SQL complet"
echo "  4. Test de requêtes SQL complexes"
echo "  5. Exécuter TOUS les tests"
echo ""

# Si un argument est fourni, l'utiliser, sinon demander
if [ -z "$1" ]; then
    read -p "Choisissez un test (1-5): " choice
else
    choice=$1
fi

echo ""
echo -e "${YELLOW}═══════════════════════════════════════════════════════════${NC}"
echo ""

case $choice in
    1)
        echo -e "${BLUE}🔍 Exécution du test de connexion basique...${NC}"
        echo ""
        node test-supabase-connection.js
        ;;
    2)
        echo -e "${BLUE}🔍 Exécution de la vérification du schéma...${NC}"
        echo ""
        node verify-schema.js
        ;;
    3)
        echo -e "${BLUE}🔍 Exécution du test d'accès SQL complet...${NC}"
        echo ""
        node test-sql-access.js
        ;;
    4)
        echo -e "${BLUE}🔍 Exécution du test de requêtes SQL complexes...${NC}"
        echo ""
        node test-sql-queries.js
        ;;
    5)
        echo -e "${BLUE}🔍 Exécution de TOUS les tests...${NC}"
        echo ""
        
        echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${GREEN}TEST 1/4: Connexion basique${NC}"
        echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        node test-supabase-connection.js
        
        echo ""
        echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${GREEN}TEST 2/4: Vérification du schéma${NC}"
        echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        node verify-schema.js
        
        echo ""
        echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${GREEN}TEST 3/4: Accès SQL complet${NC}"
        echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        node test-sql-access.js
        
        echo ""
        echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${GREEN}TEST 4/4: Requêtes SQL complexes${NC}"
        echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        node test-sql-queries.js
        
        echo ""
        echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
        echo -e "${GREEN}║              ✅ TOUS LES TESTS TERMINÉS !                  ║${NC}"
        echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
        ;;
    *)
        echo -e "${RED}❌ Choix invalide. Veuillez choisir entre 1 et 5.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${YELLOW}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}✅ Test(s) terminé(s) avec succès !${NC}"
echo ""
echo -e "${BLUE}📊 Pour voir le rapport complet:${NC}"
echo "   cat ../RAPPORT_TEST_SQL_SUPABASE.md"
echo ""

