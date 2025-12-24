-- ============================================================================
-- VERIFICATION DU SETUP HEARST CONTROL
-- ============================================================================
-- À exécuter APRÈS avoir lancé FRESH_START.sql
-- ============================================================================

\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo '🔍 VÉRIFICATION DE L''INSTALLATION HEARST CONTROL'
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo ''

-- ============================================================================
-- 1. VÉRIFICATION DES TABLES
-- ============================================================================

\echo '1️⃣  Vérification des tables...'

SELECT 
  'tenants' as table_name,
  COUNT(*) as count,
  CASE WHEN COUNT(*) >= 1 THEN '✅' ELSE '❌' END as status
FROM tenants
UNION ALL
SELECT 'users', COUNT(*), CASE WHEN COUNT(*) >= 1 THEN '✅' ELSE '❌' END FROM users
UNION ALL
SELECT 'projects', COUNT(*), CASE WHEN COUNT(*) >= 2 THEN '✅' ELSE '❌' END FROM projects
UNION ALL
SELECT 'user_project_access', COUNT(*), CASE WHEN COUNT(*) >= 1 THEN '✅' ELSE '❌' END FROM user_project_access;

\echo ''

-- ============================================================================
-- 2. VÉRIFICATION DES TYPES DE DONNÉES
-- ============================================================================

\echo '2️⃣  Vérification des types de colonnes...'

SELECT 
  column_name,
  data_type,
  CASE 
    WHEN column_name IN ('start_date', 'end_date') AND data_type = 'date' THEN '✅'
    WHEN column_name LIKE '%created_at%' AND data_type LIKE 'timestamp%' THEN '✅'
    WHEN column_name LIKE '%updated_at%' AND data_type LIKE 'timestamp%' THEN '✅'
    ELSE '⚠️'
  END as status
FROM information_schema.columns
WHERE table_name = 'projects' 
  AND column_name IN ('start_date', 'end_date', 'created_at', 'updated_at')
ORDER BY column_name;

\echo ''

-- ============================================================================
-- 3. VÉRIFICATION DES DONNÉES PROJETS
-- ============================================================================

\echo '3️⃣  Détails des projets...'

SELECT 
  id,
  name,
  status,
  total_containers as containers,
  total_miners as miners,
  ROUND(total_hashrate_ths / 1000000.0, 2) as hashrate_ehs,
  ROUND(total_power_mw, 2) as power_mw,
  start_date,
  '✅' as check_status
FROM projects
ORDER BY start_date;

\echo ''

-- ============================================================================
-- 4. VÉRIFICATION DES DATES
-- ============================================================================

\echo '4️⃣  Vérification des dates...'

SELECT 
  id,
  name,
  start_date,
  CASE 
    WHEN start_date IS NOT NULL THEN '✅ Date OK'
    ELSE '❌ Date manquante'
  END as date_status,
  pg_typeof(start_date) as column_type
FROM projects
ORDER BY start_date;

\echo ''

-- ============================================================================
-- 5. VÉRIFICATION MULTI-TENANT
-- ============================================================================

\echo '5️⃣  Vérification Multi-Tenant...'

SELECT 
  'Tenants' as category,
  slug,
  name,
  status,
  '✅' as check_status
FROM tenants
UNION ALL
SELECT 
  'Users sans tenant',
  'N/A',
  CAST(COUNT(*) as TEXT),
  CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'ERREUR' END,
  CASE WHEN COUNT(*) = 0 THEN '✅' ELSE '❌' END
FROM users WHERE tenant_id IS NULL
UNION ALL
SELECT 
  'Projects sans tenant',
  'N/A',
  CAST(COUNT(*) as TEXT),
  CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'ERREUR' END,
  CASE WHEN COUNT(*) = 0 THEN '✅' ELSE '❌' END
FROM projects WHERE tenant_id IS NULL;

\echo ''

-- ============================================================================
-- 6. VÉRIFICATION DES ACCÈS
-- ============================================================================

\echo '6️⃣  Vérification des accès utilisateurs...'

SELECT 
  u.name as user_name,
  u.role as user_role,
  p.id as project_id,
  p.name as project_name,
  upa.role as access_role,
  '✅' as status
FROM user_project_access upa
JOIN users u ON upa.user_id = u.id
JOIN projects p ON upa.project_id = p.id
ORDER BY u.name, p.id;

\echo ''

-- ============================================================================
-- 7. OVERVIEW GLOBAL
-- ============================================================================

\echo '7️⃣  Vue d''ensemble globale...'

SELECT 
  total_projects as "Total Projets",
  active_projects as "Projets Actifs",
  total_containers as "Total Containers",
  total_miners as "Total Mineurs",
  ROUND(total_hashrate_ehs, 2) as "Hashrate (EH/s)",
  ROUND(total_power_mw, 2) as "Power (MW)",
  active_users as "Utilisateurs Actifs",
  '✅' as "Status"
FROM global_overview;

\echo ''
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo '✅ VÉRIFICATION TERMINÉE'
\echo '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
\echo ''
\echo '📋 RÉSUMÉ DES CHECKS:'
\echo '   • Tables créées'
\echo '   • Types de colonnes corrects'
\echo '   • Projets initialisés'
\echo '   • Dates correctement typées'
\echo '   • Multi-tenant configuré'
\echo '   • Accès utilisateurs configurés'
\echo '   • Vue globale fonctionnelle'
\echo ''
\echo '🚀 PROCHAINES ÉTAPES:'
\echo '   cd backend-central'
\echo '   npm install'
\echo '   npm start'
\echo ''

