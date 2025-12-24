-- ============================================================================
-- HEARST CONTROL - MIGRATION MULTI-TENANT
-- ============================================================================
-- Ce script transforme la base centrale en système multi-tenant B2B
-- Exécuter dans le SQL Editor de Supabase
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1) CRÉATION DE LA TABLE TENANTS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index pour les recherches par slug
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON public.tenants(slug);
CREATE INDEX IF NOT EXISTS idx_tenants_status ON public.tenants(status);

-- Commentaires
COMMENT ON TABLE public.tenants IS 'Organisations/tenants dans le système multi-tenant';
COMMENT ON COLUMN public.tenants.slug IS 'Identifiant unique lowercase pour le tenant (ex: acme, hearst)';
COMMENT ON COLUMN public.tenants.status IS 'Statut du tenant (active/suspended)';

-- ----------------------------------------------------------------------------
-- 2) AJOUT DE tenant_id SUR LES TABLES EXISTANTES
-- ----------------------------------------------------------------------------

-- Table users
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_users_tenant_id ON public.users(tenant_id);

COMMENT ON COLUMN public.users.tenant_id IS 'Tenant auquel appartient cet utilisateur';

-- Table projects
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_projects_tenant_id ON public.projects(tenant_id);

COMMENT ON COLUMN public.projects.tenant_id IS 'Tenant propriétaire de ce projet';

-- Table user_project_access (dénormalisation pour performance)
ALTER TABLE public.user_project_access
  ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_upa_tenant_id ON public.user_project_access(tenant_id);

COMMENT ON COLUMN public.user_project_access.tenant_id IS 'Tenant (dénormalisé pour performance)';

-- Table project_metrics (optionnel mais recommandé)
-- Décommenter si vous voulez scope les métriques par tenant
-- ALTER TABLE public.project_metrics
--   ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
-- CREATE INDEX IF NOT EXISTS idx_project_metrics_tenant_id ON public.project_metrics(tenant_id);

-- ----------------------------------------------------------------------------
-- 3) BACKFILL DES DONNÉES EXISTANTES
-- ----------------------------------------------------------------------------

-- Créer le tenant "hearst" par défaut
INSERT INTO public.tenants (slug, name)
VALUES ('hearst', 'Hearst (default)')
ON CONFLICT (slug) DO NOTHING;

-- Backfill users avec le tenant "hearst"
WITH t AS (
  SELECT id FROM public.tenants WHERE slug = 'hearst'
)
UPDATE public.users
SET tenant_id = (SELECT id FROM t)
WHERE tenant_id IS NULL;

-- Backfill projects avec le tenant "hearst"
WITH t AS (
  SELECT id FROM public.tenants WHERE slug = 'hearst'
)
UPDATE public.projects
SET tenant_id = (SELECT id FROM t)
WHERE tenant_id IS NULL;

-- Backfill user_project_access avec le tenant "hearst"
WITH t AS (
  SELECT id FROM public.tenants WHERE slug = 'hearst'
)
UPDATE public.user_project_access
SET tenant_id = (SELECT id FROM t)
WHERE tenant_id IS NULL;

-- ----------------------------------------------------------------------------
-- 4) CONTRAINTES NOT NULL (à exécuter après backfill vérifié)
-- ----------------------------------------------------------------------------

-- IMPORTANT : Exécuter ces commandes UNIQUEMENT après avoir vérifié que le backfill est OK
-- et qu'il n'y a plus de NULL dans les colonnes tenant_id

-- ALTER TABLE public.users ALTER COLUMN tenant_id SET NOT NULL;
-- ALTER TABLE public.projects ALTER COLUMN tenant_id SET NOT NULL;
-- ALTER TABLE public.user_project_access ALTER COLUMN tenant_id SET NOT NULL;

-- ----------------------------------------------------------------------------
-- 5) FONCTION UTILITAIRE : Trigger pour updated_at
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger sur tenants
DROP TRIGGER IF EXISTS update_tenants_updated_at ON public.tenants;
CREATE TRIGGER update_tenants_updated_at
    BEFORE UPDATE ON public.tenants
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ----------------------------------------------------------------------------
-- 6) VÉRIFICATIONS POST-MIGRATION
-- ----------------------------------------------------------------------------

-- Compter les tenants
-- SELECT COUNT(*) as nb_tenants FROM public.tenants;

-- Vérifier que tous les users ont un tenant_id
-- SELECT COUNT(*) as users_sans_tenant FROM public.users WHERE tenant_id IS NULL;

-- Vérifier que tous les projects ont un tenant_id
-- SELECT COUNT(*) as projects_sans_tenant FROM public.projects WHERE tenant_id IS NULL;

-- Voir la répartition par tenant
-- SELECT 
--   t.slug, 
--   t.name,
--   COUNT(DISTINCT u.id) as nb_users,
--   COUNT(DISTINCT p.id) as nb_projects
-- FROM public.tenants t
-- LEFT JOIN public.users u ON u.tenant_id = t.id
-- LEFT JOIN public.projects p ON p.tenant_id = t.id
-- GROUP BY t.id, t.slug, t.name
-- ORDER BY t.created_at;

-- ----------------------------------------------------------------------------
-- NOTES IMPORTANTES
-- ----------------------------------------------------------------------------

/*
1. RLS (Row Level Security) :
   Ce script NE CONFIGURE PAS RLS car vous utilisez SUPABASE_SERVICE_KEY.
   Si vous voulez activer RLS plus tard pour une sécurité renforcée :
   
   ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
   
   Et créer des policies appropriées.

2. Ordre d'exécution :
   - Exécuter les sections 1-3 en premier
   - Vérifier que le backfill est OK
   - Tester l'application
   - Décommenter et exécuter la section 4 (NOT NULL)

3. Rollback :
   Si besoin de rollback (ATTENTION: perte de données) :
   
   ALTER TABLE public.user_project_access DROP COLUMN tenant_id;
   ALTER TABLE public.projects DROP COLUMN tenant_id;
   ALTER TABLE public.users DROP COLUMN tenant_id;
   DROP TABLE public.tenants CASCADE;
*/

