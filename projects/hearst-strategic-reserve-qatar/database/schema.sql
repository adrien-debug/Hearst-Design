-- ============================================
-- HEARST STRATEGIC RESERVE QATAR - DATABASE SCHEMA
-- 30 Containers | 9,240 Miners | 4.37 EH/s
-- Version: 2.0 | Date: 24 Décembre 2025
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: users
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'viewer' CHECK (role IN ('admin', 'manager', 'operator', 'viewer')),
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index on email for fast lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ============================================
-- TABLE: containers
-- ANTSPACE HD5 Containers
-- ============================================
CREATE TABLE IF NOT EXISTS containers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  model VARCHAR(100) DEFAULT 'ANTSPACE HD5',
  location VARCHAR(255),
  capacity INT DEFAULT 308, -- 308 mineurs par container
  max_power_kw DECIMAL(10, 2) DEFAULT 1765, -- 1765 kW max par container
  status VARCHAR(50) DEFAULT 'operational' CHECK (status IN ('operational', 'maintenance', 'offline')),
  temperature DECIMAL(5, 2), -- Température en Celsius
  humidity DECIMAL(5, 2), -- Humidité en %
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index on status for filtering
CREATE INDEX IF NOT EXISTS idx_containers_status ON containers(status);

-- ============================================
-- TABLE: miners
-- S21XP Hydro Miners (473 TH/s, 5676 W)
-- ============================================
CREATE TABLE IF NOT EXISTS miners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  container_id UUID REFERENCES containers(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  model VARCHAR(100) DEFAULT 'S21XP Hydro',
  serial_number VARCHAR(100) UNIQUE,
  hashrate DECIMAL(10, 2) DEFAULT 473, -- 473 TH/s
  power_consumption INT DEFAULT 5676, -- 5676 W
  temperature DECIMAL(5, 2),
  fan_speed INT, -- RPM
  status VARCHAR(50) DEFAULT 'online' CHECK (status IN ('online', 'offline', 'maintenance', 'restarting')),
  uptime BIGINT DEFAULT 0, -- en secondes
  last_seen TIMESTAMP DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_miners_container_id ON miners(container_id);
CREATE INDEX IF NOT EXISTS idx_miners_status ON miners(status);
CREATE INDEX IF NOT EXISTS idx_miners_last_seen ON miners(last_seen);

-- ============================================
-- TABLE: metrics
-- Global site metrics
-- ============================================
CREATE TABLE IF NOT EXISTS metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  timestamp TIMESTAMP DEFAULT NOW(),
  total_containers INT,
  operational_containers INT,
  total_miners INT,
  online_miners INT,
  total_hashrate DECIMAL(15, 2), -- Total EH/s
  total_power_consumption DECIMAL(15, 2), -- Total MW
  average_temperature DECIMAL(5, 2),
  efficiency DECIMAL(5, 2), -- W/TH
  uptime_percentage DECIMAL(5, 2),
  notes TEXT
);

-- Index on timestamp for time-series queries
CREATE INDEX IF NOT EXISTS idx_metrics_timestamp ON metrics(timestamp DESC);

-- ============================================
-- TABLE: alerts
-- System alerts and notifications
-- ============================================
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) CHECK (type IN ('info', 'warning', 'error', 'critical')),
  source VARCHAR(100), -- container_id, miner_id, or 'system'
  message TEXT NOT NULL,
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP,
  resolved_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for unresolved alerts
CREATE INDEX IF NOT EXISTS idx_alerts_unresolved ON alerts(resolved) WHERE resolved = FALSE;
CREATE INDEX IF NOT EXISTS idx_alerts_created_at ON alerts(created_at DESC);

-- ============================================
-- TABLE: maintenance_logs
-- Maintenance history
-- ============================================
CREATE TABLE IF NOT EXISTS maintenance_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  target_type VARCHAR(50) CHECK (target_type IN ('container', 'miner')),
  target_id UUID NOT NULL,
  performed_by UUID REFERENCES users(id),
  maintenance_type VARCHAR(100),
  description TEXT,
  duration_minutes INT,
  cost DECIMAL(10, 2),
  status VARCHAR(50) CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  scheduled_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_maintenance_target ON maintenance_logs(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_status ON maintenance_logs(status);

-- ============================================
-- TABLE: audit_log
-- Security audit trail
-- ============================================
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100),
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log(created_at DESC);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_containers_updated_at ON containers;
CREATE TRIGGER update_containers_updated_at BEFORE UPDATE ON containers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_miners_updated_at ON miners;
CREATE TRIGGER update_miners_updated_at BEFORE UPDATE ON miners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INITIAL USERS
-- Mots de passe générés avec bcrypt (10 rounds)
-- ============================================
-- IMPORTANT: Exécuter scripts/generate-passwords.js pour régénérer
-- les hash avec des mots de passe sécurisés pour la production

-- Supprimer les anciens utilisateurs SRQ si existants
DELETE FROM users WHERE email LIKE '%@srq.hearstmining.com';

-- Utilisateurs SRQ par défaut
-- ⚠️ CHANGER LES MOTS DE PASSE EN PRODUCTION
INSERT INTO users (email, password_hash, name, role) VALUES
  -- Admin: SRQ_Admin_2025!
  ('admin@srq.hearstmining.com', '$2a$10$rubc1aHoewSLb/n.xoT/RO/VPuvvTsIhEM7w7o2Eywhn4tLzarlaa', 'Admin SRQ', 'admin'),
  -- Manager: SRQ_Manager_2025!
  ('manager@srq.hearstmining.com', '$2a$10$s1w2rT29T2Kz3jX7G2PxLuwfhkCLHEo1ArgQw/OAZLBopi8.ncT82', 'Manager SRQ', 'manager'),
  -- Operator: SRQ_Operator_2025!
  ('operator@srq.hearstmining.com', '$2a$10$6qYkCDUpFuIZbwWDFbEVgup8sw0YWmPabacJLI.52cRWVK1/64Enu', 'Operator SRQ', 'operator'),
  -- Viewer: SRQ_Viewer_2025!
  ('viewer@srq.hearstmining.com', '$2a$10$dhazBbcAOAu2xdQ52ChuX.hz37Rk0wnrywFAsZTfdzBKSZqgI0Dfq', 'Viewer SRQ', 'viewer')
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  updated_at = NOW();

-- ============================================
-- SAMPLE CONTAINERS (30 total)
-- ANTSPACE HD5 - 308 miners each
-- ============================================

-- Générer les 30 containers
INSERT INTO containers (name, model, location, capacity, max_power_kw, status, temperature, humidity) VALUES
  ('ANTSPACE-HD5-001', 'ANTSPACE HD5', 'Qatar Site A - Row 1', 308, 1765, 'operational', 28.5, 45),
  ('ANTSPACE-HD5-002', 'ANTSPACE HD5', 'Qatar Site A - Row 1', 308, 1765, 'operational', 29.0, 44),
  ('ANTSPACE-HD5-003', 'ANTSPACE HD5', 'Qatar Site A - Row 1', 308, 1765, 'operational', 28.8, 46),
  ('ANTSPACE-HD5-004', 'ANTSPACE HD5', 'Qatar Site A - Row 1', 308, 1765, 'operational', 28.2, 45),
  ('ANTSPACE-HD5-005', 'ANTSPACE HD5', 'Qatar Site A - Row 1', 308, 1765, 'operational', 29.1, 43),
  ('ANTSPACE-HD5-006', 'ANTSPACE HD5', 'Qatar Site A - Row 2', 308, 1765, 'operational', 28.7, 44),
  ('ANTSPACE-HD5-007', 'ANTSPACE HD5', 'Qatar Site A - Row 2', 308, 1765, 'operational', 28.4, 45),
  ('ANTSPACE-HD5-008', 'ANTSPACE HD5', 'Qatar Site A - Row 2', 308, 1765, 'operational', 29.3, 42),
  ('ANTSPACE-HD5-009', 'ANTSPACE HD5', 'Qatar Site A - Row 2', 308, 1765, 'operational', 28.9, 44),
  ('ANTSPACE-HD5-010', 'ANTSPACE HD5', 'Qatar Site A - Row 2', 308, 1765, 'maintenance', 30.1, 48),
  ('ANTSPACE-HD5-011', 'ANTSPACE HD5', 'Qatar Site A - Row 3', 308, 1765, 'operational', 28.6, 45),
  ('ANTSPACE-HD5-012', 'ANTSPACE HD5', 'Qatar Site A - Row 3', 308, 1765, 'operational', 28.8, 44),
  ('ANTSPACE-HD5-013', 'ANTSPACE HD5', 'Qatar Site A - Row 3', 308, 1765, 'operational', 29.0, 43),
  ('ANTSPACE-HD5-014', 'ANTSPACE HD5', 'Qatar Site A - Row 3', 308, 1765, 'operational', 28.5, 45),
  ('ANTSPACE-HD5-015', 'ANTSPACE HD5', 'Qatar Site A - Row 3', 308, 1765, 'operational', 28.7, 44),
  ('ANTSPACE-HD5-016', 'ANTSPACE HD5', 'Qatar Site A - Row 4', 308, 1765, 'operational', 28.9, 45),
  ('ANTSPACE-HD5-017', 'ANTSPACE HD5', 'Qatar Site A - Row 4', 308, 1765, 'operational', 28.4, 44),
  ('ANTSPACE-HD5-018', 'ANTSPACE HD5', 'Qatar Site A - Row 4', 308, 1765, 'operational', 28.6, 46),
  ('ANTSPACE-HD5-019', 'ANTSPACE HD5', 'Qatar Site A - Row 4', 308, 1765, 'operational', 29.2, 43),
  ('ANTSPACE-HD5-020', 'ANTSPACE HD5', 'Qatar Site A - Row 4', 308, 1765, 'operational', 28.8, 44),
  ('ANTSPACE-HD5-021', 'ANTSPACE HD5', 'Qatar Site B - Row 1', 308, 1765, 'operational', 28.5, 45),
  ('ANTSPACE-HD5-022', 'ANTSPACE HD5', 'Qatar Site B - Row 1', 308, 1765, 'operational', 28.7, 44),
  ('ANTSPACE-HD5-023', 'ANTSPACE HD5', 'Qatar Site B - Row 1', 308, 1765, 'operational', 29.1, 43),
  ('ANTSPACE-HD5-024', 'ANTSPACE HD5', 'Qatar Site B - Row 1', 308, 1765, 'operational', 28.3, 46),
  ('ANTSPACE-HD5-025', 'ANTSPACE HD5', 'Qatar Site B - Row 1', 308, 1765, 'operational', 28.9, 44),
  ('ANTSPACE-HD5-026', 'ANTSPACE HD5', 'Qatar Site B - Row 2', 308, 1765, 'operational', 28.6, 45),
  ('ANTSPACE-HD5-027', 'ANTSPACE HD5', 'Qatar Site B - Row 2', 308, 1765, 'operational', 28.8, 44),
  ('ANTSPACE-HD5-028', 'ANTSPACE HD5', 'Qatar Site B - Row 2', 308, 1765, 'operational', 29.0, 43),
  ('ANTSPACE-HD5-029', 'ANTSPACE HD5', 'Qatar Site B - Row 2', 308, 1765, 'maintenance', 31.2, 50),
  ('ANTSPACE-HD5-030', 'ANTSPACE HD5', 'Qatar Site B - Row 2', 308, 1765, 'operational', 28.7, 44)
ON CONFLICT (name) DO UPDATE SET
  status = EXCLUDED.status,
  temperature = EXCLUDED.temperature,
  humidity = EXCLUDED.humidity,
  updated_at = NOW();

-- ============================================
-- INITIAL METRICS
-- ============================================
INSERT INTO metrics (
  total_containers,
  operational_containers,
  total_miners,
  online_miners,
  total_hashrate,
  total_power_consumption,
  average_temperature,
  efficiency,
  uptime_percentage
) VALUES (
  30,
  28,
  9240,
  9100,
  4.37, -- EH/s
  52.95, -- MW
  28.7,
  12.0, -- W/TH
  98.5
);

-- ============================================
-- VIEWS
-- ============================================

-- View: Container summary with miner counts
CREATE OR REPLACE VIEW container_summary AS
SELECT 
    c.id,
    c.name,
    c.model,
    c.location,
    c.status,
    c.capacity,
    c.max_power_kw,
    COUNT(m.id) as miner_count,
    COUNT(m.id) FILTER (WHERE m.status = 'online') as online_miners,
    COALESCE(SUM(m.hashrate), 0) as total_hashrate,
    COALESCE(SUM(m.power_consumption), 0) as total_power_consumption,
    c.temperature,
    c.humidity,
    c.created_at,
    c.updated_at
FROM containers c
LEFT JOIN miners m ON m.container_id = c.id
GROUP BY c.id;

-- View: Site overview
CREATE OR REPLACE VIEW site_overview AS
SELECT 
    (SELECT COUNT(*) FROM containers) as total_containers,
    (SELECT COUNT(*) FROM containers WHERE status = 'operational') as operational_containers,
    (SELECT COUNT(*) FROM containers WHERE status = 'maintenance') as maintenance_containers,
    (SELECT COUNT(*) FROM containers WHERE status = 'offline') as offline_containers,
    (SELECT COUNT(*) FROM miners) as total_miners,
    (SELECT COUNT(*) FROM miners WHERE status = 'online') as online_miners,
    (SELECT COALESCE(SUM(hashrate), 0) FROM miners WHERE status = 'online') as total_hashrate_ths,
    (SELECT COALESCE(SUM(power_consumption), 0) FROM miners WHERE status = 'online') as total_power_w,
    (SELECT COALESCE(AVG(temperature), 0) FROM containers WHERE status = 'operational') as avg_temperature,
    (SELECT COALESCE(AVG(humidity), 0) FROM containers WHERE status = 'operational') as avg_humidity,
    (SELECT COUNT(*) FROM alerts WHERE resolved = FALSE) as active_alerts;

-- View: User summary (sans password_hash)
CREATE OR REPLACE VIEW user_summary AS
SELECT 
    id,
    email,
    name,
    role,
    is_active,
    last_login,
    created_at,
    updated_at
FROM users;

-- ============================================
-- COMMENTS
-- ============================================
COMMENT ON TABLE containers IS 'ANTSPACE HD5 containers - 30 total, 308 miners each';
COMMENT ON TABLE miners IS 'S21XP Hydro miners - 9,240 total, 473 TH/s each, 5676 W';
COMMENT ON TABLE metrics IS 'Global site metrics - time series data';
COMMENT ON TABLE audit_log IS 'Security audit trail for all user actions';
COMMENT ON COLUMN containers.max_power_kw IS 'Maximum power per container: 1765 kW (cooling included)';
COMMENT ON COLUMN miners.hashrate IS 'Hashrate in TH/s (terahash per second)';
COMMENT ON COLUMN miners.power_consumption IS 'Power consumption in Watts';

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '╔══════════════════════════════════════════════════════════════╗';
    RAISE NOTICE '║  ✅ HEARST STRATEGIC RESERVE QATAR - Schema Created!         ║';
    RAISE NOTICE '╠══════════════════════════════════════════════════════════════╣';
    RAISE NOTICE '║  📦 30 ANTSPACE HD5 Containers                               ║';
    RAISE NOTICE '║  ⚡ 9,240 S21XP Hydro Miners (473 TH/s each)                 ║';
    RAISE NOTICE '║  🔋 4.37 EH/s Total Hashrate                                 ║';
    RAISE NOTICE '║  💡 52.95 MW Maximum Power                                   ║';
    RAISE NOTICE '╠══════════════════════════════════════════════════════════════╣';
    RAISE NOTICE '║  👤 UTILISATEURS CRÉÉS:                                      ║';
    RAISE NOTICE '║  ┌──────────┬─────────────────────────────────┐              ║';
    RAISE NOTICE '║  │ admin    │ admin@srq.hearstmining.com      │              ║';
    RAISE NOTICE '║  │ manager  │ manager@srq.hearstmining.com    │              ║';
    RAISE NOTICE '║  │ operator │ operator@srq.hearstmining.com   │              ║';
    RAISE NOTICE '║  │ viewer   │ viewer@srq.hearstmining.com     │              ║';
    RAISE NOTICE '║  └──────────┴─────────────────────────────────┘              ║';
    RAISE NOTICE '╠══════════════════════════════════════════════════════════════╣';
    RAISE NOTICE '║  ⚠️  Exécuter scripts/generate-passwords.js pour             ║';
    RAISE NOTICE '║     générer les mots de passe sécurisés                      ║';
    RAISE NOTICE '╚══════════════════════════════════════════════════════════════╝';
    RAISE NOTICE '';
END $$;
