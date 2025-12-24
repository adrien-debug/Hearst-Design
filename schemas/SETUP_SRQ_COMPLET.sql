-- ============================================================================
-- SETUP COMPLET SRQ-001 - Strategic Reserve Qatar
-- ============================================================================
-- Script unique qui crée le projet ET remplit les données
-- ============================================================================

-- ============================================================================
-- PARTIE 1 : CRÉER LE PROJET SRQ-001
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
  'SRQ-001',
  'Strategic Reserve Qatar',
  '30 containers ANTSPACE HD5 avec 9,240 mineurs S21XP Hydro - National Bitcoin Mining Infrastructure',
  'Qatar',
  'active',
  30,
  9240,
  4369920,
  52.95,
  'ANTSPACE HD5',
  308,
  'S21XP Hydro',
  473,
  5676,
  'http://localhost:3002',
  'http://localhost:3100',
  DATE '2025-03-01',
  'Strategic project for Qatar national Bitcoin reserve.',
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
  'SRQ-001',
  'admin',
  u.id,
  u.tenant_id
FROM users u
WHERE u.email = 'admin@hearstmining.com'
  AND NOT EXISTS (
    SELECT 1 FROM user_project_access 
    WHERE user_id = u.id AND project_id = 'SRQ-001'
  );

-- ============================================================================
-- PARTIE 2 : CRÉER LES UTILISATEURS
-- ============================================================================

-- Opérateur SRQ (Email: operator@srq.qa | Password: <REDACTED>)
INSERT INTO users (email, password_hash, name, role, tenant_id, phone)
SELECT 
  'operator@srq.qa',
  '$2a$10$M5/QnmsQXA2AMvSduPp/ceABXSqQN6T7bj7WovQneBoX.6WKBVrXe',
  'SRQ Operator',
  'operator',
  t.id,
  '+974 1234 5678'
FROM tenants t WHERE t.slug = 'hearst'
ON CONFLICT (email) DO NOTHING;

-- Manager SRQ (Email: manager@srq.qa | Password: <REDACTED>)
INSERT INTO users (email, password_hash, name, role, tenant_id, phone)
SELECT 
  'manager@srq.qa',
  '$2a$10$M5/QnmsQXA2AMvSduPp/ceABXSqQN6T7bj7WovQneBoX.6WKBVrXe',
  'SRQ Manager',
  'manager',
  t.id,
  '+974 1234 5679'
FROM tenants t WHERE t.slug = 'hearst'
ON CONFLICT (email) DO NOTHING;

-- Accès Opérateur
INSERT INTO user_project_access (user_id, project_id, role, granted_by, tenant_id)
SELECT 
  u.id,
  'SRQ-001',
  'operator',
  (SELECT id FROM users WHERE email = 'admin@hearstmining.com'),
  u.tenant_id
FROM users u
WHERE u.email = 'operator@srq.qa'
  AND NOT EXISTS (
    SELECT 1 FROM user_project_access 
    WHERE user_id = u.id AND project_id = 'SRQ-001'
  );

-- Accès Manager
INSERT INTO user_project_access (user_id, project_id, role, granted_by, tenant_id)
SELECT 
  u.id,
  'SRQ-001',
  'manager',
  (SELECT id FROM users WHERE email = 'admin@hearstmining.com'),
  u.tenant_id
FROM users u
WHERE u.email = 'manager@srq.qa'
  AND NOT EXISTS (
    SELECT 1 FROM user_project_access 
    WHERE user_id = u.id AND project_id = 'SRQ-001'
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
  'SRQ-001',
  30, 30,
  9240, 9240, 0,
  4369920, 4.37,
  52450, 52.45,
  42.5, 12.0, 99.9
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
  ('SRQ-001', NOW() - INTERVAL '1 hour', 30, 30, 9240, 9235, 5, 4368145, 4.37, 52440, 52.44, 42.3, 12.0, 99.9),
  ('SRQ-001', NOW() - INTERVAL '2 hours', 30, 30, 9240, 9238, 2, 4369450, 4.37, 52448, 52.45, 42.1, 12.0, 99.9),
  ('SRQ-001', NOW() - INTERVAL '3 hours', 30, 30, 9240, 9240, 0, 4369920, 4.37, 52450, 52.45, 41.9, 12.0, 99.9),
  ('SRQ-001', NOW() - INTERVAL '6 hours', 30, 30, 9240, 9236, 4, 4368618, 4.37, 52442, 52.44, 42.4, 12.0, 99.8),
  ('SRQ-001', NOW() - INTERVAL '12 hours', 30, 30, 9240, 9240, 0, 4369920, 4.37, 52450, 52.45, 42.0, 12.0, 99.9),
  ('SRQ-001', NOW() - INTERVAL '24 hours', 30, 30, 9240, 9232, 8, 4366400, 4.37, 52430, 52.43, 42.6, 12.0, 99.7);

-- ============================================================================
-- PARTIE 4 : ALERTES
-- ============================================================================

INSERT INTO global_alerts (
  project_id, type, category, source, message, details, resolved
) VALUES 
  ('SRQ-001', 'info', 'maintenance', 'Container-05', 
   'Maintenance planifiée du container 05',
   '{"scheduled_time": "2025-03-15T10:00:00Z", "duration": "2h"}', false),
  ('SRQ-001', 'info', 'performance', 'Monitoring',
   'Performance optimale atteinte',
   '{"hashrate": "4.37 EH/s", "uptime": "99.9%"}', true);

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
  3, 2,
  88, 88,
  27104, 27104,
  12815320, 12.82,
  155.32, 12.0, 99.8
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
WHERE id = 'SRQ-001';

-- Utilisateurs créés
SELECT 
  email, name, role, phone,
  '✅ Utilisateur créé' as check_status
FROM users
WHERE email LIKE '%@srq.qa'
ORDER BY role;

-- Métriques créées
SELECT 
  COUNT(*) as metrics_count,
  '✅ Métriques créées' as check_status
FROM project_metrics
WHERE project_id = 'SRQ-001';

-- Alertes créées
SELECT 
  COUNT(*) as alerts_count,
  '✅ Alertes créées' as check_status
FROM global_alerts
WHERE project_id = 'SRQ-001';

-- ============================================================================
-- RÉSUMÉ
-- ============================================================================

DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    RAISE NOTICE '✅ SRQ-001 SETUP COMPLET RÉUSSI !';
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    RAISE NOTICE '';
    RAISE NOTICE '📊 PROJET SRQ-001 :';
    RAISE NOTICE '   • 30 containers';
    RAISE NOTICE '   • 9,240 mineurs';
    RAISE NOTICE '   • 4.37 EH/s';
    RAISE NOTICE '   • Backend: http://localhost:3002';
    RAISE NOTICE '   • Frontend: http://localhost:3100';
    RAISE NOTICE '';
    RAISE NOTICE '🔑 CREDENTIALS :';
    RAISE NOTICE '';
    RAISE NOTICE '   Super Admin:';
    RAISE NOTICE '   • admin@hearstmining.com / <REDACTED>';
    RAISE NOTICE '';
    RAISE NOTICE '   Opérateur SRQ:';
    RAISE NOTICE '   • operator@srq.qa / <REDACTED>';
    RAISE NOTICE '';
    RAISE NOTICE '   Manager SRQ:';
    RAISE NOTICE '   • manager@srq.qa / <REDACTED>';
    RAISE NOTICE '';
    RAISE NOTICE '✅ Données de test créées (métriques, alertes)';
    RAISE NOTICE '';
END $$;

