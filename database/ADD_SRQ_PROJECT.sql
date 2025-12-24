-- ============================================================================
-- AJOUT DU PROJET STRATEGIC RESERVE QATAR
-- ============================================================================
-- Ajoute le projet SRQ-001 dans la base de données centrale
-- 30 containers × 308 miners = 9,240 miners total
-- ============================================================================

-- Insérer le projet SRQ-001
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
  'planned',
  30,
  9240,
  4369920,  -- 30 × 308 × 473 = 4,369,920 TH/s = 4.37 EH/s
  52.95,    -- 30 × 308 × 5676 / 1,000,000 = 52.45 MW
  'ANTSPACE HD5',
  308,
  'S21XP Hydro',
  473,
  5676,
  'http://localhost:3002',
  'http://localhost:3100',
  DATE '2025-03-01',
  'Strategic project for Qatar national Bitcoin reserve. Focus on energy efficiency and sovereignty.',
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

-- Vérification
SELECT 
  id,
  name,
  status,
  total_containers,
  total_miners,
  ROUND(total_hashrate_ths / 1000000.0, 2) as hashrate_ehs,
  ROUND(total_power_mw, 2) as power_mw,
  start_date,
  '✅ Projet ajouté' as status_message
FROM projects
WHERE id = 'SRQ-001';

