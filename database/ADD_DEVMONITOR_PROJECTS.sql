-- ============================================
-- HEARST CONTROL - Ajout Projets DevMonitor
-- Hearst Design + Strategic Reserve Qatar
-- ============================================

-- ============================================
-- ÉTAPE 1: Ajouter colonnes manquantes à projects
-- ============================================

-- Ajouter slug (identifiant URL-friendly)
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS slug VARCHAR(100) UNIQUE;

-- Ajouter icon (emoji ou URL)
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS icon VARCHAR(50) DEFAULT '📦';

-- Ajouter color (couleur hexadécimale)
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS color VARCHAR(20) DEFAULT '#8AFD81';

-- Ajouter port (port backend)
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS port INT;

-- Ajouter tenant_id (pour multi-tenant)
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS tenant_id VARCHAR(50);

-- ============================================
-- ÉTAPE 2: Mettre à jour les contraintes de status
-- ============================================

-- Supprimer la contrainte existante et la recréer avec 'offline'
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_status_check;
ALTER TABLE projects ADD CONSTRAINT projects_status_check 
  CHECK (status IN ('active', 'planned', 'maintenance', 'inactive', 'offline'));

-- ============================================
-- ÉTAPE 3: Créer index sur slug
-- ============================================

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);

-- ============================================
-- ÉTAPE 4: Insérer Hearst Design
-- ============================================

INSERT INTO projects (
  id, 
  name, 
  slug,
  description, 
  location, 
  status,
  icon,
  color,
  port,
  api_endpoint, 
  frontend_url,
  tenant_id,
  total_containers,
  total_miners,
  container_model,
  miner_model,
  notes,
  created_at
) VALUES (
  'hearst-design',
  'Hearst Design',
  'hearst-design',
  'Projet web de design et prototypage pour les interfaces Hearst',
  'Paris, France',
  'active',
  '🎨',
  '#9B59B6',
  3002,
  'http://localhost:3002',
  'http://localhost:3002',
  'hearst-global',
  0,
  0,
  NULL,
  NULL,
  'Projet de design UI/UX pour la plateforme Hearst',
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  status = EXCLUDED.status,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  port = EXCLUDED.port,
  api_endpoint = EXCLUDED.api_endpoint,
  frontend_url = EXCLUDED.frontend_url,
  tenant_id = EXCLUDED.tenant_id,
  updated_at = NOW();

-- ============================================
-- ÉTAPE 5: Insérer Strategic Reserve Qatar
-- ============================================

INSERT INTO projects (
  id, 
  name, 
  slug,
  description, 
  location, 
  status,
  icon,
  color,
  port,
  api_endpoint, 
  frontend_url,
  tenant_id,
  total_containers,
  total_miners,
  total_hashrate_ths,
  total_power_mw,
  container_model,
  miners_per_container,
  miner_model,
  miner_hashrate,
  miner_power_w,
  notes,
  start_date,
  created_at
) VALUES (
  'hearst-strategic-reserve-qatar',
  'Strategic Reserve Qatar',
  'hearst-strategic-reserve-qatar',
  'Gestion d''opérations minières Bitcoin - Strategic Reserve au Qatar avec 30 containers ANTSPACE HD5',
  'Qatar',
  'active',
  '🇶🇦',
  '#F39C12',
  3003,
  'http://localhost:3003',
  'http://localhost:3100',
  'hearst-global',
  30,
  9240,
  4369920,
  52.95,
  'ANTSPACE HD5',
  308,
  'S21XP Hydro',
  473,
  5676,
  'Strategic Reserve Qatar - 30 containers, 9240 miners, 4.37 EH/s',
  DATE '2025-01-01',
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  status = EXCLUDED.status,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  port = EXCLUDED.port,
  api_endpoint = EXCLUDED.api_endpoint,
  frontend_url = EXCLUDED.frontend_url,
  tenant_id = EXCLUDED.tenant_id,
  total_containers = EXCLUDED.total_containers,
  total_miners = EXCLUDED.total_miners,
  total_hashrate_ths = EXCLUDED.total_hashrate_ths,
  total_power_mw = EXCLUDED.total_power_mw,
  container_model = EXCLUDED.container_model,
  miners_per_container = EXCLUDED.miners_per_container,
  miner_model = EXCLUDED.miner_model,
  miner_hashrate = EXCLUDED.miner_hashrate,
  miner_power_w = EXCLUDED.miner_power_w,
  notes = EXCLUDED.notes,
  updated_at = NOW();

-- ============================================
-- ÉTAPE 6: Mettre à jour les projets existants avec slug
-- ============================================

UPDATE projects SET slug = 'qatar-001', icon = '⛏️', color = '#8AFD81', port = 3001 
WHERE id = 'QATAR-001' AND slug IS NULL;

UPDATE projects SET slug = 'aqua-001', icon = '💧', color = '#3498DB', port = 3002 
WHERE id = 'AQUA-001' AND slug IS NULL;

UPDATE projects SET slug = 'texas-001', icon = '🤠', color = '#E74C3C', port = NULL 
WHERE id = 'TEXAS-001' AND slug IS NULL;

-- ============================================
-- ÉTAPE 7: Donner accès admin aux nouveaux projets
-- ============================================

INSERT INTO user_project_access (user_id, project_id, role, granted_by)
SELECT 
  u.id,
  'hearst-design',
  'admin',
  u.id
FROM users u
WHERE u.email = 'admin@hearstmining.com'
ON CONFLICT (user_id, project_id) DO NOTHING;

INSERT INTO user_project_access (user_id, project_id, role, granted_by)
SELECT 
  u.id,
  'hearst-strategic-reserve-qatar',
  'admin',
  u.id
FROM users u
WHERE u.email = 'admin@hearstmining.com'
ON CONFLICT (user_id, project_id) DO NOTHING;

-- ============================================
-- VÉRIFICATION
-- ============================================

DO $$
DECLARE
  project_count INT;
  design_exists BOOLEAN;
  srq_exists BOOLEAN;
BEGIN
  SELECT COUNT(*) INTO project_count FROM projects;
  SELECT EXISTS(SELECT 1 FROM projects WHERE id = 'hearst-design') INTO design_exists;
  SELECT EXISTS(SELECT 1 FROM projects WHERE id = 'hearst-strategic-reserve-qatar') INTO srq_exists;
  
  RAISE NOTICE '';
  RAISE NOTICE '✅ PROJETS DEVMONITOR AJOUTÉS AVEC SUCCÈS !';
  RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Total projets: %', project_count;
  RAISE NOTICE '';
  RAISE NOTICE '🎨 Hearst Design: %', CASE WHEN design_exists THEN '✅ Ajouté' ELSE '❌ Erreur' END;
  RAISE NOTICE '   Port: 3002';
  RAISE NOTICE '   API: http://localhost:3002';
  RAISE NOTICE '';
  RAISE NOTICE '🇶🇦 Strategic Reserve Qatar: %', CASE WHEN srq_exists THEN '✅ Ajouté' ELSE '❌ Erreur' END;
  RAISE NOTICE '   Port: 3003';
  RAISE NOTICE '   API: http://localhost:3003';
  RAISE NOTICE '   Containers: 30';
  RAISE NOTICE '   Miners: 9,240';
  RAISE NOTICE '   Hashrate: 4.37 EH/s';
  RAISE NOTICE '';
  RAISE NOTICE '🔗 Frontend-Central: http://localhost:3100';
  RAISE NOTICE '🔗 Backend-Central: http://localhost:4000';
  RAISE NOTICE '';
END $$;

-- ============================================
-- AFFICHER LES PROJETS
-- ============================================

SELECT id, name, slug, status, icon, color, port, api_endpoint 
FROM projects 
ORDER BY created_at DESC;

