-- ============================================================================
-- SETUP COMPLET DESIGN-001 - Hearst Design
-- ============================================================================
-- Script unique qui crée le projet ET remplit les données
-- ============================================================================

-- ============================================================================
-- PARTIE 1 : CRÉER LE PROJET DESIGN-001
-- ============================================================================

INSERT INTO projects (
  id, 
  name, 
  description, 
  location, 
  status,
  total_containers, 
  total_miners, 
  total_hashrate_ths, 
  total_power_mw,
  container_model, 
  miners_per_container,
  miner_model, 
  miner_hashrate, 
  miner_power_w,
  api_endpoint, 
  frontend_url, 
  start_date,
  notes,
  tenant_id
)
SELECT 
  'DESIGN-001',
  'Hearst Design',
  '20 containers ANTSPACE HD5 avec 6,160 mineurs S21XP Hydro - Design & Innovation Hub',
  'USA',
  'active',
  20,
  6160,
  2913680,
  34.96,
  'ANTSPACE HD5',
  308,
  'S21XP Hydro',
  473,
  5676,
  'http://localhost:3201',
  'http://localhost:3300',
  DATE '2025-01-15',
  'Hearst Design - Innovation and design-focused Bitcoin mining operations.',
  t.id
FROM tenants t 
WHERE t.slug = 'hearst'
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  total_containers = EXCLUDED.total_containers,
  total_miners = EXCLUDED.total_miners,
  total_hashrate_ths = EXCLUDED.total_hashrate_ths,
  total_power_mw = EXCLUDED.total_power_mw,
  status = EXCLUDED.status,
  updated_at = NOW();

-- Accorder l'accès au Super Admin
INSERT INTO user_project_access (user_id, project_id, role, granted_by, tenant_id)
SELECT 
  u.id,
  'DESIGN-001',
  'admin',
  u.id,
  u.tenant_id
FROM users u
WHERE u.email = 'admin@hearstmining.com'
  AND NOT EXISTS (
    SELECT 1 FROM user_project_access 
    WHERE user_id = u.id AND project_id = 'DESIGN-001'
  );

-- ============================================================================
-- PARTIE 2 : CRÉER LES UTILISATEURS
-- ============================================================================

-- Admin Design (Email: admin@design.hearst.com | Password: <REDACTED>)
INSERT INTO users (email, password_hash, name, role, tenant_id, phone)
SELECT 
  'admin@design.hearst.com',
  '$2a$10$r6SkSmPBbChF.qhbCtKTFujN2L59bwYD/gqWB529GEq9/CZD7PNPm',
  'Design Admin',
  'admin',
  t.id,
  '+1 555 0100'
FROM tenants t WHERE t.slug = 'hearst'
ON CONFLICT (email) DO NOTHING;

-- Opérateur Design (Email: operator@design.hearst.com | Password: <REDACTED>)
INSERT INTO users (email, password_hash, name, role, tenant_id, phone)
SELECT 
  'operator@design.hearst.com',
  '$2a$10$fVFvUWctZ6Ex/cj5b//ID..Bd9fkP/IcuzwJxDFk/2a.uMKrg2xyq',
  'Design Operator',
  'operator',
  t.id,
  '+1 555 0101'
FROM tenants t WHERE t.slug = 'hearst'
ON CONFLICT (email) DO NOTHING;

-- Manager Design (Email: manager@design.hearst.com | Password: <REDACTED>)
INSERT INTO users (email, password_hash, name, role, tenant_id, phone)
SELECT 
  'manager@design.hearst.com',
  '$2a$10$OHxdzeaJtJ.dfYZ0yVxAAeAIL214f5JUFjd2V0th/w/jsfETWki/y',
  'Design Manager',
  'manager',
  t.id,
  '+1 555 0102'
FROM tenants t WHERE t.slug = 'hearst'
ON CONFLICT (email) DO NOTHING;

-- Accès Admin
INSERT INTO user_project_access (user_id, project_id, role, granted_by, tenant_id)
SELECT 
  u.id,
  'DESIGN-001',
  'admin',
  (SELECT id FROM users WHERE email = 'admin@hearstmining.com'),
  u.tenant_id
FROM users u
WHERE u.email = 'admin@design.hearst.com'
  AND NOT EXISTS (
    SELECT 1 FROM user_project_access 
    WHERE user_id = u.id AND project_id = 'DESIGN-001'
  );

-- Accès Opérateur
INSERT INTO user_project_access (user_id, project_id, role, granted_by, tenant_id)
SELECT 
  u.id,
  'DESIGN-001',
  'operator',
  (SELECT id FROM users WHERE email = 'admin@hearstmining.com'),
  u.tenant_id
FROM users u
WHERE u.email = 'operator@design.hearst.com'
  AND NOT EXISTS (
    SELECT 1 FROM user_project_access 
    WHERE user_id = u.id AND project_id = 'DESIGN-001'
  );

-- Accès Manager
INSERT INTO user_project_access (user_id, project_id, role, granted_by, tenant_id)
SELECT 
  u.id,
  'DESIGN-001',
  'manager',
  (SELECT id FROM users WHERE email = 'admin@hearstmining.com'),
  u.tenant_id
FROM users u
WHERE u.email = 'manager@design.hearst.com'
  AND NOT EXISTS (
    SELECT 1 FROM user_project_access 
    WHERE user_id = u.id AND project_id = 'DESIGN-001'
  );

-- ============================================================================
-- PARTIE 3 : MÉTRIQUES PROJET
-- ============================================================================

-- Métriques actuelles
INSERT INTO project_metrics (
  project_id,
  total_containers,
  operational_containers,
  total_miners,
  online_miners,
  offline_miners,
  total_hashrate_ths,
  total_hashrate_ehs,
  total_power_kw,
  total_power_mw,
  average_temperature,
  efficiency,
  uptime_percentage
) VALUES (
  'DESIGN-001',
  20, 20,
  6160, 6160, 0,
  2913680, 2.91,
  34960, 34.96,
  41.8, 12.0, 99.8
);

-- Historique 24h
INSERT INTO project_metrics (
  project_id, timestamp,
  total_containers, operational_containers,
  total_miners, online_miners, offline_miners,
  total_hashrate_ths, total_hashrate_ehs,
  total_power_kw, total_power_mw,
  average_temperature, efficiency, uptime_percentage
) VALUES 
  ('DESIGN-001', NOW() - INTERVAL '1 hour', 20, 20, 6160, 6158, 2, 2912753, 2.91, 34950, 34.95, 41.6, 12.0, 99.8),
  ('DESIGN-001', NOW() - INTERVAL '2 hours', 20, 20, 6160, 6160, 0, 2913680, 2.91, 34960, 34.96, 41.5, 12.0, 99.9),
  ('DESIGN-001', NOW() - INTERVAL '3 hours', 20, 20, 6160, 6157, 3, 2912280, 2.91, 34945, 34.95, 41.7, 12.0, 99.7),
  ('DESIGN-001', NOW() - INTERVAL '6 hours', 20, 20, 6160, 6160, 0, 2913680, 2.91, 34960, 34.96, 41.4, 12.0, 99.9),
  ('DESIGN-001', NOW() - INTERVAL '12 hours', 20, 20, 6160, 6159, 1, 2913207, 2.91, 34955, 34.96, 41.6, 12.0, 99.8),
  ('DESIGN-001', NOW() - INTERVAL '24 hours', 20, 20, 6160, 6155, 5, 2911334, 2.91, 34940, 34.94, 41.9, 12.0, 99.6);

-- ============================================================================
-- PARTIE 4 : ALERTES
-- ============================================================================

INSERT INTO global_alerts (
  project_id, type, category, source, message, details, resolved
) VALUES 
  ('DESIGN-001', 'info', 'system', 'Monitoring', 
   'Hearst Design opérationnel',
   '{"status": "active", "uptime": "99.8%"}', true),
  ('DESIGN-001', 'info', 'performance', 'Analytics',
   'Performance optimale - 2.91 EH/s',
   '{"hashrate": "2.91 EH/s", "efficiency": "12 W/TH"}', true);

-- ============================================================================
-- PARTIE 5 : MÉTRIQUES GLOBALES MISES À JOUR
-- ============================================================================

INSERT INTO global_metrics (
  total_projects, active_projects,
  total_containers, operational_containers,
  total_miners, online_miners,
  total_hashrate_ths, total_hashrate_ehs,
  total_power_mw, average_efficiency, uptime_percentage
) VALUES (
  4, 3,
  108, 108,
  33264, 33264,
  15729000, 15.73,
  190.28, 12.0, 99.8
);

-- ============================================================================
-- VÉRIFICATIONS
-- ============================================================================

-- Projet créé
SELECT 
  id, name, status, 
  total_containers, total_miners,
  ROUND(total_hashrate_ths / 1000000.0, 2) as hashrate_ehs,
  '✅ Projet créé' as check_status
FROM projects 
WHERE id = 'DESIGN-001';

-- Utilisateurs créés
SELECT 
  email, name, role, phone,
  '✅ Utilisateur créé' as check_status
FROM users
WHERE email LIKE '%@design.hearst.com'
ORDER BY role;

-- Métriques créées
SELECT 
  COUNT(*) as metrics_count,
  '✅ Métriques créées' as check_status
FROM project_metrics
WHERE project_id = 'DESIGN-001';

-- Alertes créées
SELECT 
  COUNT(*) as alerts_count,
  '✅ Alertes créées' as check_status
FROM global_alerts
WHERE project_id = 'DESIGN-001';

-- ============================================================================
-- RÉSUMÉ
-- ============================================================================

DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    RAISE NOTICE '✅ DESIGN-001 SETUP COMPLET RÉUSSI !';
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    RAISE NOTICE '';
    RAISE NOTICE '📊 PROJET DESIGN-001 :';
    RAISE NOTICE '   • 20 containers';
    RAISE NOTICE '   • 6,160 mineurs';
    RAISE NOTICE '   • 2.91 EH/s';
    RAISE NOTICE '   • Backend: http://localhost:3201';
    RAISE NOTICE '   • Frontend: http://localhost:3300';
    RAISE NOTICE '';
    RAISE NOTICE '🔑 CREDENTIALS :';
    RAISE NOTICE '';
    RAISE NOTICE '   Super Admin:';
    RAISE NOTICE '   • admin@hearstmining.com / <REDACTED>';
    RAISE NOTICE '';
    RAISE NOTICE '   Admin Design:';
    RAISE NOTICE '   • admin@design.hearst.com / <REDACTED>';
    RAISE NOTICE '';
    RAISE NOTICE '   Opérateur Design:';
    RAISE NOTICE '   • operator@design.hearst.com / <REDACTED>';
    RAISE NOTICE '';
    RAISE NOTICE '   Manager Design:';
    RAISE NOTICE '   • manager@design.hearst.com / <REDACTED>';
    RAISE NOTICE '';
    RAISE NOTICE '✅ Données de test créées (métriques, alertes)';
    RAISE NOTICE '';
    RAISE NOTICE '📊 SYSTÈME GLOBAL :';
    RAISE NOTICE '   • 4 projets';
    RAISE NOTICE '   • 33,264 mineurs';
    RAISE NOTICE '   • 15.73 EH/s';
    RAISE NOTICE '';
END $$;

