-- ============================================================================
-- REMPLIR LES DONNÉES SRQ-001 - Strategic Reserve Qatar
-- ============================================================================
-- Créer des données de test complètes pour le projet
-- ============================================================================

-- ============================================================================
-- 1. UTILISATEURS SRQ (avec mots de passe)
-- ============================================================================

-- Utilisateur Opérateur SRQ
-- Email: operator@srq.qa
-- Password: <REDACTED>
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

-- Utilisateur Manager SRQ
-- Email: manager@srq.qa
-- Password: <REDACTED>
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

-- Accès au projet SRQ-001
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
-- 2. MÉTRIQUES GLOBALES MISES À JOUR
-- ============================================================================

INSERT INTO global_metrics (
  total_projects,
  active_projects,
  total_containers,
  operational_containers,
  total_miners,
  online_miners,
  total_hashrate_ths,
  total_hashrate_ehs,
  total_power_mw,
  average_efficiency,
  uptime_percentage
) VALUES (
  3,  -- 3 projets (QATAR, AQUA, SRQ)
  2,  -- 2 actifs (QATAR, SRQ planifié compte comme actif en préparation)
  88, -- 58 (QATAR) + 30 (SRQ) = 88 containers
  88,
  27104, -- 17864 (QATAR) + 9240 (SRQ) = 27,104 miners
  27104,
  12815320, -- 8445400 (QATAR) + 4369920 (SRQ) = 12,815,320 TH/s
  12.82,    -- 12.82 EH/s
  155.32,   -- 102.37 (QATAR) + 52.95 (SRQ) = 155.32 MW
  12.0,     -- W/TH
  99.8
);

-- ============================================================================
-- 3. MÉTRIQUES PROJET SRQ-001
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
  30,
  30,
  9240,
  9240,
  0,
  4369920,
  4.37,
  52450,
  52.45,
  42.5,
  12.0,
  99.9
);

-- Métriques historiques (dernières 24h)
INSERT INTO project_metrics (
  project_id,
  timestamp,
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
) VALUES 
  ('SRQ-001', NOW() - INTERVAL '1 hour', 30, 30, 9240, 9235, 5, 4368145, 4.37, 52440, 52.44, 42.3, 12.0, 99.9),
  ('SRQ-001', NOW() - INTERVAL '2 hours', 30, 30, 9240, 9238, 2, 4369450, 4.37, 52448, 52.45, 42.1, 12.0, 99.9),
  ('SRQ-001', NOW() - INTERVAL '3 hours', 30, 30, 9240, 9240, 0, 4369920, 4.37, 52450, 52.45, 41.9, 12.0, 99.9),
  ('SRQ-001', NOW() - INTERVAL '6 hours', 30, 30, 9240, 9236, 4, 4368618, 4.37, 52442, 52.44, 42.4, 12.0, 99.8),
  ('SRQ-001', NOW() - INTERVAL '12 hours', 30, 30, 9240, 9240, 0, 4369920, 4.37, 52450, 52.45, 42.0, 12.0, 99.9),
  ('SRQ-001', NOW() - INTERVAL '24 hours', 30, 30, 9240, 9232, 8, 4366400, 4.37, 52430, 52.43, 42.6, 12.0, 99.7);

-- ============================================================================
-- 4. ALERTES SRQ
-- ============================================================================

-- Quelques alertes de test
INSERT INTO global_alerts (
  project_id,
  type,
  category,
  source,
  message,
  details,
  resolved
) VALUES 
  (
    'SRQ-001',
    'info',
    'maintenance',
    'Container-05',
    'Maintenance planifiée du container 05',
    '{"scheduled_time": "2025-03-15T10:00:00Z", "duration": "2h", "impact": "minimal"}',
    false
  ),
  (
    'SRQ-001',
    'info',
    'performance',
    'Monitoring',
    'Performance optimale atteinte',
    '{"hashrate": "4.37 EH/s", "uptime": "99.9%", "efficiency": "12 W/TH"}',
    true
  );

-- ============================================================================
-- VÉRIFICATION FINALE
-- ============================================================================

-- Afficher les utilisateurs SRQ
SELECT 
  email,
  name,
  role,
  phone,
  '✅ Créé' as status
FROM users
WHERE email LIKE '%@srq.qa';

-- Afficher les métriques SRQ
SELECT 
  project_id,
  total_containers,
  total_miners,
  ROUND(total_hashrate_ehs, 2) as hashrate_ehs,
  ROUND(total_power_mw, 2) as power_mw,
  ROUND(uptime_percentage, 1) as uptime,
  '✅ Métriques créées' as status
FROM project_metrics
WHERE project_id = 'SRQ-001'
ORDER BY timestamp DESC
LIMIT 1;

-- Afficher les alertes SRQ
SELECT 
  type,
  category,
  message,
  resolved,
  '✅ Alerte créée' as status
FROM global_alerts
WHERE project_id = 'SRQ-001'
ORDER BY created_at DESC;

-- ============================================================================
-- RÉSUMÉ DES CREDENTIALS
-- ============================================================================

DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    RAISE NOTICE '🔑 CREDENTIALS SRQ-001 CRÉÉS';
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    RAISE NOTICE '';
    RAISE NOTICE '👤 Opérateur SRQ:';
    RAISE NOTICE '   Email    : operator@srq.qa';
    RAISE NOTICE '   Password : <REDACTED>';
    RAISE NOTICE '   Role     : operator';
    RAISE NOTICE '';
    RAISE NOTICE '👤 Manager SRQ:';
    RAISE NOTICE '   Email    : manager@srq.qa';
    RAISE NOTICE '   Password : <REDACTED>';
    RAISE NOTICE '   Role     : manager';
    RAISE NOTICE '';
    RAISE NOTICE '👤 Super Admin (accès complet):';
    RAISE NOTICE '   Email    : admin@hearstmining.com';
    RAISE NOTICE '   Password : <REDACTED>';
    RAISE NOTICE '   Role     : super_admin';
    RAISE NOTICE '';
    RAISE NOTICE '✅ Métriques et données de test créées';
    RAISE NOTICE '✅ Alertes de test créées';
    RAISE NOTICE '';
END $$;

