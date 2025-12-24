-- ============================================================================
-- HEARST CONTROL - FRESH START (Nettoyage + Setup Complet)
-- ============================================================================
-- Ce script NETTOIE tout et REPART de zéro avec les bons types
-- ============================================================================

-- ============================================================================
-- ÉTAPE 1 : NETTOYAGE COMPLET (supprime les tables existantes)
-- ============================================================================

DROP VIEW IF EXISTS global_overview CASCADE;
DROP VIEW IF EXISTS projects_summary CASCADE;

DROP TABLE IF EXISTS audit_log CASCADE;
DROP TABLE IF EXISTS global_alerts CASCADE;
DROP TABLE IF EXISTS project_metrics CASCADE;
DROP TABLE IF EXISTS global_metrics CASCADE;
DROP TABLE IF EXISTS user_project_access CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tenants CASCADE;

-- ============================================================================
-- ÉTAPE 2 : CRÉATION DES TABLES DE BASE (avec les bons types)
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: tenants (CRÉÉE EN PREMIER)
-- ============================================
CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_tenants_slug ON public.tenants(slug);
CREATE INDEX idx_tenants_status ON public.tenants(status);

COMMENT ON TABLE public.tenants IS 'Organisations/tenants dans le système multi-tenant';

-- ============================================
-- TABLE: users (AVEC tenant_id dès le départ)
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'viewer' CHECK (role IN ('super_admin', 'admin', 'manager', 'operator', 'viewer')),
  phone VARCHAR(50),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_tenant_id ON users(tenant_id);

-- ============================================
-- TABLE: projects (AVEC tenant_id dès le départ)
-- ============================================
CREATE TABLE projects (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'planned', 'maintenance', 'inactive')),
  
  total_containers INT DEFAULT 0,
  total_miners INT DEFAULT 0,
  total_hashrate_ths DECIMAL(15, 2) DEFAULT 0,
  total_power_mw DECIMAL(10, 3) DEFAULT 0,
  
  container_model VARCHAR(100),
  miners_per_container INT,
  
  miner_model VARCHAR(100),
  miner_hashrate DECIMAL(10, 2),
  miner_power_w INT,
  
  start_date DATE,
  end_date DATE,
  
  api_endpoint VARCHAR(255),
  frontend_url VARCHAR(255),
  
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_tenant_id ON projects(tenant_id);

-- ============================================
-- TABLE: user_project_access (AVEC tenant_id)
-- ============================================
CREATE TABLE user_project_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id VARCHAR(20) REFERENCES projects(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'viewer' CHECK (role IN ('admin', 'manager', 'operator', 'viewer')),
  granted_at TIMESTAMP DEFAULT NOW(),
  granted_by UUID REFERENCES users(id),
  expires_at TIMESTAMP,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  
  UNIQUE(user_id, project_id)
);

CREATE INDEX idx_user_project_access_user ON user_project_access(user_id);
CREATE INDEX idx_user_project_access_project ON user_project_access(project_id);
CREATE INDEX idx_upa_tenant_id ON user_project_access(tenant_id);

-- ============================================
-- TABLE: global_metrics
-- ============================================
CREATE TABLE global_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  timestamp TIMESTAMP DEFAULT NOW(),
  
  total_projects INT,
  active_projects INT,
  total_containers INT,
  operational_containers INT,
  total_miners INT,
  online_miners INT,
  
  total_hashrate_ths DECIMAL(15, 2),
  total_hashrate_ehs DECIMAL(10, 3),
  total_power_mw DECIMAL(10, 3),
  average_efficiency DECIMAL(5, 2),
  
  average_temperature DECIMAL(5, 2),
  uptime_percentage DECIMAL(5, 2),
  
  notes TEXT
);

CREATE INDEX idx_global_metrics_timestamp ON global_metrics(timestamp DESC);

-- ============================================
-- TABLE: project_metrics
-- ============================================
CREATE TABLE project_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id VARCHAR(20) REFERENCES projects(id) ON DELETE CASCADE,
  timestamp TIMESTAMP DEFAULT NOW(),
  
  total_containers INT,
  operational_containers INT,
  
  total_miners INT,
  online_miners INT,
  offline_miners INT,
  
  total_hashrate_ths DECIMAL(15, 2),
  total_hashrate_ehs DECIMAL(10, 3),
  total_power_kw DECIMAL(10, 2),
  total_power_mw DECIMAL(10, 3),
  average_temperature DECIMAL(5, 2),
  efficiency DECIMAL(5, 2),
  
  uptime_percentage DECIMAL(5, 2),
  
  notes TEXT
);

CREATE INDEX idx_project_metrics_project ON project_metrics(project_id);
CREATE INDEX idx_project_metrics_timestamp ON project_metrics(timestamp DESC);

-- ============================================
-- TABLE: global_alerts
-- ============================================
CREATE TABLE global_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id VARCHAR(20) REFERENCES projects(id) ON DELETE CASCADE,
  type VARCHAR(50) CHECK (type IN ('info', 'warning', 'error', 'critical')),
  category VARCHAR(100),
  source VARCHAR(100),
  message TEXT NOT NULL,
  details JSONB,
  
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP,
  resolved_by UUID REFERENCES users(id),
  resolution_notes TEXT,
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_global_alerts_project ON global_alerts(project_id);
CREATE INDEX idx_global_alerts_unresolved ON global_alerts(resolved) WHERE resolved = FALSE;
CREATE INDEX idx_global_alerts_type ON global_alerts(type);
CREATE INDEX idx_global_alerts_created_at ON global_alerts(created_at DESC);

-- ============================================
-- FUNCTION: update_updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tenants_updated_at ON tenants;
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ÉTAPE 3 : DONNÉES INITIALES
-- ============================================================================

-- Créer le tenant "hearst"
INSERT INTO tenants (slug, name) VALUES ('hearst', 'Hearst (default)');

-- Super Admin (password: <REDACTED>)
INSERT INTO users (email, password_hash, name, role, tenant_id) 
SELECT 
  'admin@hearstmining.com',
  '$2a$10$rFKwEzYhQ6xqVz.iyKV8YOxfXRp.KNJKZy9QsT8H4ggO5YPQXvPea',
  'Super Admin',
  'super_admin',
  id
FROM tenants WHERE slug = 'hearst';

-- Projets initiaux
INSERT INTO projects (id, name, description, location, status, 
  total_containers, total_miners, total_hashrate_ths, total_power_mw,
  container_model, miners_per_container,
  miner_model, miner_hashrate, miner_power_w,
  api_endpoint, frontend_url, start_date, tenant_id)
SELECT 
  'QATAR-001',
  'Hearst Qatar Mining',
  '58 containers ANTSPACE HD5 avec 17,864 mineurs S21XP Hydro',
  'Qatar',
  'active',
  58, 17864, 8445400, 102.37,
  'ANTSPACE HD5', 308,
  'S21XP Hydro', 473, 5676,
  'http://localhost:3001', 'http://localhost:3000', DATE '2025-01-01',
  t.id
FROM tenants t WHERE t.slug = 'hearst'
UNION ALL
SELECT 
  'AQUA-001',
  'Hearst Aquahash',
  '15 containers avec 4,620 mineurs',
  'TBD',
  'planned',
  15, 4620, 2185260, 26.37,
  'ANTSPACE HD5', 308,
  'S21XP Hydro', 473, 5676,
  'http://localhost:3002', 'http://localhost:3100', DATE '2025-06-01',
  t.id
FROM tenants t WHERE t.slug = 'hearst';

-- Accès admin aux projets
INSERT INTO user_project_access (user_id, project_id, role, granted_by, tenant_id)
SELECT 
  u.id,
  p.id,
  'admin',
  u.id,
  u.tenant_id
FROM users u
CROSS JOIN projects p
WHERE u.email = 'admin@hearstmining.com'
  AND p.tenant_id = u.tenant_id;

-- ============================================
-- VIEWS
-- ============================================
CREATE OR REPLACE VIEW global_overview AS
SELECT 
    (SELECT COUNT(*) FROM projects) as total_projects,
    (SELECT COUNT(*) FROM projects WHERE status = 'active') as active_projects,
    (SELECT SUM(total_containers) FROM projects WHERE status = 'active') as total_containers,
    (SELECT SUM(total_miners) FROM projects WHERE status = 'active') as total_miners,
    (SELECT SUM(total_hashrate_ths) FROM projects WHERE status = 'active') as total_hashrate_ths,
    (SELECT SUM(total_hashrate_ths) / 1000000.0 FROM projects WHERE status = 'active') as total_hashrate_ehs,
    (SELECT SUM(total_power_mw) FROM projects WHERE status = 'active') as total_power_mw,
    (SELECT COUNT(*) FROM global_alerts WHERE resolved = FALSE) as active_alerts,
    (SELECT COUNT(*) FROM users WHERE is_active = TRUE) as active_users;

-- ============================================================================
-- SUCCÈS !
-- ============================================================================

DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    RAISE NOTICE '✅ ✅ ✅ HEARST CONTROL - INSTALLATION RÉUSSIE ✅ ✅ ✅';
    RAISE NOTICE '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    RAISE NOTICE '';
    RAISE NOTICE '✅ Tables créées avec succès';
    RAISE NOTICE '✅ Multi-tenant activé (tenant: hearst)';
    RAISE NOTICE '✅ Super admin créé';
    RAISE NOTICE '✅ Projets initiaux créés (QATAR-001, AQUA-001)';
    RAISE NOTICE '';
    RAISE NOTICE '🔑 LOGIN SUPER ADMIN :';
    RAISE NOTICE '   Email    : admin@hearstmining.com';
    RAISE NOTICE '   Password : <REDACTED>';
    RAISE NOTICE '';
    RAISE NOTICE '📊 PROJETS :';
    RAISE NOTICE '   • QATAR-001 : 58 containers, 17,864 miners, 8.45 EH/s';
    RAISE NOTICE '   • AQUA-001  : 15 containers, 4,620 miners (planned)';
    RAISE NOTICE '';
    RAISE NOTICE '🎯 ÉTAPE SUIVANTE :';
    RAISE NOTICE '   cd backend-central';
    RAISE NOTICE '   npm start';
    RAISE NOTICE '';
    RAISE NOTICE '   OU : ./scripts/start-multi-tenant.sh';
    RAISE NOTICE '';
END $$;

