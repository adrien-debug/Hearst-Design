/**
 * HEARST CONTROL - Projects Controller
 * Gestion des projets miniers
 */

const { createSupabaseClientFromEnv } = require('../../core/database/supabaseClient');
const { logger } = require('../../core/shared-utils/logger');

const supabase = createSupabaseClientFromEnv();

/**
 * Formate un projet de la DB vers le format frontend
 * @param {Object} project - Projet brut de la base de données
 * @returns {Object} - Projet formaté pour le frontend
 */
const formatProject = (project) => {
  if (!project) return null;
  
  return {
    id: project.id,
    name: project.name,
    slug: project.id, // Utiliser l'ID comme slug (pas de colonne slug dans la DB)
    description: project.description || '',
    status: project.status || 'active',
    icon: project.icon || '📦',
    color: project.color || '#8AFD81',
    baseUrl: project.frontend_url || project.api_endpoint || `http://localhost:${project.port || 3000}`,
    apiUrl: project.api_endpoint || `http://localhost:${project.port || 3000}`,
    port: project.port || 3000,
    tenant_id: project.tenant_id,
    location: project.location,
    // Métriques mining (optionnel)
    total_containers: project.total_containers || 0,
    total_miners: project.total_miners || 0,
    total_hashrate_ths: project.total_hashrate_ths || 0,
    total_power_mw: project.total_power_mw || 0,
    container_model: project.container_model,
    miner_model: project.miner_model,
    // Dates
    created_at: project.created_at,
    updated_at: project.updated_at,
    start_date: project.start_date,
  };
};

exports.getAll = async (req, res) => {
  try {
    // Construction de la requête avec scope tenant
    let query = supabase
      .from('projects')
      .select('*');

    // Si non super_admin, filtrer par tenant
    if (req.user.role !== 'super_admin') {
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }
      query = query.eq('tenant_id', req.user.tenant_id);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    // Formater les projets pour le frontend
    const formattedProjects = data.map(formatProject);

    res.json({ projects: formattedProjects });
  } catch (error) {
    logger.error('Error fetching projects', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    // Recherche par ID ou par slug
    let query = supabase
      .from('projects')
      .select('*');
    
    // D'abord essayer par ID exact
    let { data, error } = await query.eq('id', id).maybeSingle();
    
    // Si pas trouvé par ID, essayer par slug
    if (!data && !error) {
      const slugQuery = supabase
        .from('projects')
        .select('*')
        .eq('slug', id);
      
      const slugResult = await slugQuery.maybeSingle();
      data = slugResult.data;
      error = slugResult.error;
    }

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Vérifier l'accès tenant si non super_admin
    if (req.user.role !== 'super_admin') {
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }
      if (data.tenant_id && data.tenant_id !== req.user.tenant_id) {
        return res.status(404).json({ error: 'Project not found or access denied' });
      }
    }

    // Formater le projet pour le frontend
    res.json({ project: formatProject(data) });
  } catch (error) {
    logger.error(`Error fetching project ${req.params.id}`, error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const { id } = req.params;

    // Trouver le projet par ID uniquement (slug peut ne pas exister)
    let projectQuery = supabase
      .from('projects')
      .select('id, tenant_id, total_containers, total_miners, total_hashrate_ths, status')
      .eq('id', id);

    const { data: project, error: projectError } = await projectQuery.maybeSingle();

    if (projectError) throw projectError;

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Vérifier l'accès tenant si non super_admin
    if (req.user.role !== 'super_admin') {
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }
      if (project.tenant_id && project.tenant_id !== req.user.tenant_id) {
        return res.status(404).json({ error: 'Project not found or access denied' });
      }
    }

    // Récupérer les métriques récentes du projet
    const { data: metricsData, error: metricsError } = await supabase
      .from('project_metrics')
      .select('*')
      .eq('project_id', project.id)
      .order('timestamp', { ascending: false })
      .limit(1);

    if (metricsError) throw metricsError;

    // Formater les stats pour le frontend DevMonitor
    const metrics = metricsData?.[0];
    const stats = {
      servers: metrics?.total_containers || project.total_containers || 0,
      serversOnline: metrics?.operational_containers || project.total_containers || 0,
      pages: 0, // À récupérer depuis l'API du projet
      conflicts: 0,
      uptime: metrics?.uptime_percentage || (project.status === 'active' ? 99.9 : 0),
      // Métriques mining supplémentaires
      totalMiners: metrics?.total_miners || project.total_miners || 0,
      onlineMiners: metrics?.online_miners || project.total_miners || 0,
      totalHashrate: metrics?.total_hashrate_ths || project.total_hashrate_ths || 0,
      lastActivity: metrics?.timestamp || new Date().toISOString(),
    };

    res.json({ stats });
  } catch (error) {
    logger.error(`Error fetching project stats ${req.params.id}`, error);
    res.status(500).json({ error: 'Failed to fetch project stats' });
  }
};

exports.create = async (req, res) => {
  try {
    const projectData = { ...req.body };

    // Déterminer le tenant_id
    let targetTenantId;
    if (req.user.role === 'super_admin' && projectData.tenant_id) {
      // Super admin peut créer un projet dans n'importe quel tenant
      targetTenantId = projectData.tenant_id;
    } else if (req.user.role === 'super_admin' && !projectData.tenant_id) {
      return res.status(400).json({ error: 'Super admin must specify tenant_id' });
    } else {
      // Non super_admin : forcer le tenant de l'utilisateur
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }
      targetTenantId = req.user.tenant_id;
      projectData.tenant_id = targetTenantId; // Forcer le tenant
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();

    if (error) throw error;

    logger.success(`Project ${data.id} created successfully in tenant ${targetTenantId}`);

    res.status(201).json({ project: data });
  } catch (error) {
    logger.error('Error creating project', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // Ne pas permettre de modifier tenant_id
    delete updates.tenant_id;

    // Construction de la requête
    let query = supabase
      .from('projects')
      .update(updates)
      .eq('id', id);

    // Si non super_admin, scope par tenant
    if (req.user.role !== 'super_admin') {
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }
      query = query.eq('tenant_id', req.user.tenant_id);
    }

    const { data, error } = await query.select().single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Project not found or access denied' });
      }
      throw error;
    }

    logger.success(`Project ${id} updated successfully`);

    res.json({ project: data });
  } catch (error) {
    logger.error(`Error updating project ${req.params.id}`, error);
    res.status(500).json({ error: 'Failed to update project' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    // Construction de la requête
    let query = supabase
      .from('projects')
      .delete()
      .eq('id', id);

    // Si non super_admin, scope par tenant
    if (req.user.role !== 'super_admin') {
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }
      query = query.eq('tenant_id', req.user.tenant_id);
    }

    const { error } = await query;

    if (error) throw error;

    logger.warning(`Project ${id} deleted`);

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting project ${req.params.id}`, error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

