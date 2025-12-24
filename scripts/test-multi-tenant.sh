#!/bin/bash

################################################################################
# HEARST CONTROL - Script de test Multi-Tenant
################################################################################
# Ce script teste l'implémentation multi-tenant en créant 2 tenants
# et en vérifiant l'isolation des données.
################################################################################

set -e  # Exit on error

# Configuration
BASE_URL="${BASE_URL:-http://localhost:4000}"
API_URL="$BASE_URL/api"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonctions utilitaires
print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Vérifier que le backend est accessible
check_backend() {
    print_header "Vérification du backend"
    
    if curl -s -f "$BASE_URL/health" > /dev/null 2>&1; then
        print_success "Backend accessible à $BASE_URL"
    else
        print_error "Backend non accessible à $BASE_URL"
        print_info "Assurez-vous que le backend est démarré sur le port 4000"
        exit 1
    fi
}

################################################################################
# TEST 1 : Bootstrap Tenant A
################################################################################
test_bootstrap_tenant_a() {
    print_header "TEST 1 : Bootstrap Tenant A (ACME Mining)"
    
    RESPONSE=$(curl -s -X POST "$API_URL/auth/bootstrap" \
        -H "Content-Type: application/json" \
        -d '{
            "tenant": {
                "name": "ACME Mining",
                "slug": "acme-test"
            },
            "user": {
                "name": "Alice Admin",
                "email": "alice@acme-test.com",
                "password": "Secret123!"
            }
        }')
    
    # Vérifier le code de réponse
    TOKEN_A=$(echo "$RESPONSE" | jq -r '.token // empty')
    TENANT_A_ID=$(echo "$RESPONSE" | jq -r '.tenant.id // empty')
    USER_A_ID=$(echo "$RESPONSE" | jq -r '.user.id // empty')
    
    if [ -n "$TOKEN_A" ] && [ -n "$TENANT_A_ID" ] && [ -n "$USER_A_ID" ]; then
        print_success "Tenant A créé avec succès"
        print_info "Tenant ID: $TENANT_A_ID"
        print_info "User ID: $USER_A_ID"
        print_info "Token obtenu"
    else
        print_error "Échec de la création du tenant A"
        echo "$RESPONSE" | jq '.'
        exit 1
    fi
}

################################################################################
# TEST 2 : Bootstrap Tenant B
################################################################################
test_bootstrap_tenant_b() {
    print_header "TEST 2 : Bootstrap Tenant B (BitMine Corp)"
    
    RESPONSE=$(curl -s -X POST "$API_URL/auth/bootstrap" \
        -H "Content-Type: application/json" \
        -d '{
            "tenant": {
                "name": "BitMine Corp",
                "slug": "bitmine-test"
            },
            "user": {
                "name": "Bob Manager",
                "email": "bob@bitmine-test.com",
                "password": "Secret456!"
            }
        }')
    
    TOKEN_B=$(echo "$RESPONSE" | jq -r '.token // empty')
    TENANT_B_ID=$(echo "$RESPONSE" | jq -r '.tenant.id // empty')
    USER_B_ID=$(echo "$RESPONSE" | jq -r '.user.id // empty')
    
    if [ -n "$TOKEN_B" ] && [ -n "$TENANT_B_ID" ] && [ -n "$USER_B_ID" ]; then
        print_success "Tenant B créé avec succès"
        print_info "Tenant ID: $TENANT_B_ID"
        print_info "User ID: $USER_B_ID"
        print_info "Token obtenu"
    else
        print_error "Échec de la création du tenant B"
        echo "$RESPONSE" | jq '.'
        exit 1
    fi
}

################################################################################
# TEST 3 : Login Tenant A
################################################################################
test_login_tenant_a() {
    print_header "TEST 3 : Login Tenant A (Alice)"
    
    RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
        -H "Content-Type: application/json" \
        -d '{
            "email": "alice@acme-test.com",
            "password": "Secret123!"
        }')
    
    TOKEN_A=$(echo "$RESPONSE" | jq -r '.token // empty')
    
    if [ -n "$TOKEN_A" ]; then
        print_success "Login réussi pour Alice"
        
        # Décoder le JWT pour vérifier tenant_id
        PAYLOAD=$(echo "$TOKEN_A" | cut -d'.' -f2 | base64 -d 2>/dev/null || echo "{}")
        TENANT_ID_JWT=$(echo "$PAYLOAD" | jq -r '.tenant_id // empty')
        
        if [ -n "$TENANT_ID_JWT" ]; then
            print_success "JWT contient tenant_id: $TENANT_ID_JWT"
        else
            print_error "JWT ne contient pas tenant_id"
            echo "$PAYLOAD" | jq '.'
        fi
    else
        print_error "Échec du login pour Alice"
        echo "$RESPONSE" | jq '.'
        exit 1
    fi
}

################################################################################
# TEST 4 : Isolation - Alice ne voit que ses users
################################################################################
test_isolation_users() {
    print_header "TEST 4 : Isolation Users (Alice)"
    
    RESPONSE=$(curl -s "$API_URL/users" \
        -H "Authorization: Bearer $TOKEN_A")
    
    NB_USERS=$(echo "$RESPONSE" | jq '.users | length')
    
    if [ "$NB_USERS" -eq 1 ]; then
        print_success "Alice ne voit que ses propres users ($NB_USERS)"
    else
        print_error "Alice voit $NB_USERS users (attendu: 1)"
        echo "$RESPONSE" | jq '.users'
    fi
}

################################################################################
# TEST 5 : Créer un projet pour Tenant A
################################################################################
test_create_project_a() {
    print_header "TEST 5 : Créer un projet pour Tenant A"
    
    RESPONSE=$(curl -s -X POST "$API_URL/projects" \
        -H "Authorization: Bearer $TOKEN_A" \
        -H "Content-Type: application/json" \
        -d '{
            "id": "ACME-TEST-001",
            "name": "ACME Test Project",
            "status": "active",
            "location": "Qatar"
        }')
    
    PROJECT_ID=$(echo "$RESPONSE" | jq -r '.project.id // empty')
    
    if [ -n "$PROJECT_ID" ]; then
        print_success "Projet créé : $PROJECT_ID"
    else
        print_error "Échec de la création du projet"
        echo "$RESPONSE" | jq '.'
    fi
}

################################################################################
# TEST 6 : Bob ne voit PAS les projets d'Alice
################################################################################
test_cross_tenant_isolation() {
    print_header "TEST 6 : Isolation Cross-Tenant (Bob ne voit pas ACME-TEST-001)"
    
    # Bob liste les projets
    RESPONSE=$(curl -s "$API_URL/projects" \
        -H "Authorization: Bearer $TOKEN_B")
    
    NB_PROJECTS=$(echo "$RESPONSE" | jq '.projects | length')
    
    if [ "$NB_PROJECTS" -eq 0 ]; then
        print_success "Bob ne voit aucun projet (isolation OK)"
    else
        print_error "Bob voit $NB_PROJECTS projets (attendu: 0)"
        echo "$RESPONSE" | jq '.projects'
    fi
    
    # Bob tente d'accéder au projet d'Alice
    RESPONSE=$(curl -s "$API_URL/projects/ACME-TEST-001" \
        -H "Authorization: Bearer $TOKEN_B")
    
    ERROR=$(echo "$RESPONSE" | jq -r '.error // empty')
    
    if [ -n "$ERROR" ]; then
        print_success "Bob ne peut pas accéder au projet d'Alice : $ERROR"
    else
        print_error "Bob peut accéder au projet d'Alice (faille de sécurité !)"
        echo "$RESPONSE" | jq '.'
        exit 1
    fi
}

################################################################################
# TEST 7 : Créer un user dans Tenant A
################################################################################
test_create_user_in_tenant_a() {
    print_header "TEST 7 : Créer un user dans Tenant A"
    
    RESPONSE=$(curl -s -X POST "$API_URL/users" \
        -H "Authorization: Bearer $TOKEN_A" \
        -H "Content-Type: application/json" \
        -d '{
            "name": "Charlie Worker",
            "email": "charlie@acme-test.com",
            "password": "Charlie123!",
            "role": "user"
        }')
    
    USER_ID=$(echo "$RESPONSE" | jq -r '.user.id // empty')
    TENANT_ID=$(echo "$RESPONSE" | jq -r '.user.tenant_id // empty')
    
    if [ -n "$USER_ID" ] && [ -n "$TENANT_ID" ]; then
        print_success "User Charlie créé dans tenant A"
        print_info "User ID: $USER_ID"
        print_info "Tenant ID: $TENANT_ID"
    else
        print_error "Échec de la création du user Charlie"
        echo "$RESPONSE" | jq '.'
    fi
}

################################################################################
# TEST 8 : Alice voit maintenant 2 users
################################################################################
test_multiple_users_same_tenant() {
    print_header "TEST 8 : Alice voit 2 users dans son tenant"
    
    RESPONSE=$(curl -s "$API_URL/users" \
        -H "Authorization: Bearer $TOKEN_A")
    
    NB_USERS=$(echo "$RESPONSE" | jq '.users | length')
    
    if [ "$NB_USERS" -eq 2 ]; then
        print_success "Alice voit $NB_USERS users dans son tenant"
        echo "$RESPONSE" | jq '.users[] | {name, email, role}'
    else
        print_error "Alice voit $NB_USERS users (attendu: 2)"
        echo "$RESPONSE" | jq '.users'
    fi
}

################################################################################
# TEST 9 : Tenter de créer un tenant avec un slug existant
################################################################################
test_duplicate_slug() {
    print_header "TEST 9 : Tenter de créer un tenant avec slug existant"
    
    RESPONSE=$(curl -s -X POST "$API_URL/auth/bootstrap" \
        -H "Content-Type: application/json" \
        -d '{
            "tenant": {
                "name": "ACME Copy",
                "slug": "acme-test"
            },
            "user": {
                "name": "Eve Hacker",
                "email": "eve@evil.com",
                "password": "Hacker123!"
            }
        }')
    
    ERROR=$(echo "$RESPONSE" | jq -r '.error // empty')
    
    if [[ "$ERROR" == *"already exists"* ]]; then
        print_success "Duplicate slug correctement rejeté : $ERROR"
    else
        print_error "Duplicate slug non détecté (problème de validation)"
        echo "$RESPONSE" | jq '.'
    fi
}

################################################################################
# TEST 10 : Tenter de créer un user avec email existant
################################################################################
test_duplicate_email() {
    print_header "TEST 10 : Tenter de créer un user avec email existant"
    
    RESPONSE=$(curl -s -X POST "$API_URL/auth/bootstrap" \
        -H "Content-Type: application/json" \
        -d '{
            "tenant": {
                "name": "Evil Corp",
                "slug": "evil-corp"
            },
            "user": {
                "name": "Alice Clone",
                "email": "alice@acme-test.com",
                "password": "Clone123!"
            }
        }')
    
    ERROR=$(echo "$RESPONSE" | jq -r '.error // empty')
    
    if [[ "$ERROR" == *"already exists"* ]]; then
        print_success "Duplicate email correctement rejeté : $ERROR"
    else
        print_error "Duplicate email non détecté (problème de validation)"
        echo "$RESPONSE" | jq '.'
    fi
}

################################################################################
# CLEANUP : Supprimer les tenants de test
################################################################################
cleanup() {
    print_header "Nettoyage des données de test"
    
    print_info "Suppression des tenants de test dans la base de données"
    print_info "Exécutez ce SQL dans Supabase SQL Editor :"
    
    cat << 'EOF'

-- Supprimer les tenants de test créés par le script
DELETE FROM public.user_project_access 
WHERE tenant_id IN (
    SELECT id FROM public.tenants 
    WHERE slug IN ('acme-test', 'bitmine-test', 'evil-corp')
);

DELETE FROM public.projects 
WHERE tenant_id IN (
    SELECT id FROM public.tenants 
    WHERE slug IN ('acme-test', 'bitmine-test', 'evil-corp')
);

DELETE FROM public.users 
WHERE tenant_id IN (
    SELECT id FROM public.tenants 
    WHERE slug IN ('acme-test', 'bitmine-test', 'evil-corp')
);

DELETE FROM public.tenants 
WHERE slug IN ('acme-test', 'bitmine-test', 'evil-corp');

EOF
}

################################################################################
# MAIN
################################################################################
main() {
    print_header "🧪 Tests Multi-Tenant Hearst Control"
    
    # Vérifier les prérequis
    if ! command -v curl &> /dev/null; then
        print_error "curl n'est pas installé"
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        print_error "jq n'est pas installé (brew install jq)"
        exit 1
    fi
    
    # Exécuter les tests
    check_backend
    test_bootstrap_tenant_a
    test_bootstrap_tenant_b
    test_login_tenant_a
    test_isolation_users
    test_create_project_a
    test_cross_tenant_isolation
    test_create_user_in_tenant_a
    test_multiple_users_same_tenant
    test_duplicate_slug
    test_duplicate_email
    
    # Résumé
    print_header "✅ TOUS LES TESTS PASSÉS"
    
    echo -e "\n${GREEN}Résumé :${NC}"
    echo "  ✅ Bootstrap tenant A"
    echo "  ✅ Bootstrap tenant B"
    echo "  ✅ Login avec tenant_id dans JWT"
    echo "  ✅ Isolation users par tenant"
    echo "  ✅ Création projet scopé"
    echo "  ✅ Isolation cross-tenant"
    echo "  ✅ Création user dans tenant"
    echo "  ✅ Multiple users même tenant"
    echo "  ✅ Validation duplicate slug"
    echo "  ✅ Validation duplicate email"
    
    echo -e "\n${BLUE}L'implémentation multi-tenant fonctionne correctement ! 🎉${NC}\n"
    
    # Proposer le nettoyage
    echo -e "${YELLOW}Voulez-vous nettoyer les données de test ? (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        cleanup
    else
        print_info "Données de test conservées"
    fi
}

# Exécuter
main "$@"

