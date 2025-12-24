/**
 * HEARST CONTROL - Dashboard Controller
 * Vue d'ensemble globale de tous les projets
 */

const { createSupabaseClientFromEnv } = require('../../core/database/supabaseClient');
const { logger } = require('../../core/shared-utils/logger');

const supabase = createSupabaseClientFromEnv();

exports.getOverview = async (req, res) => {
  try {
    // NOTE: global_overview est une vue SQL qui devrait être scopée par tenant
    // Pour l'instant, on désactive pour les non super_admin ou on filtre manuellement
    
    if (req.user.role !== 'super_admin') {
      // Pour les non super_admin, construire un overview basé sur leurs projets
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }

      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('tenant_id', req.user.tenant_id);

      if (projectsError) throw projectsError;

      // Calculer un overview simple
      const overview = {
        total_projects: projects.length,
        active_projects: projects.filter(p => p.status === 'active').length,
        total_containers: projects.reduce((sum, p) => sum + (p.total_containers || 0), 0),
        total_miners: projects.reduce((sum, p) => sum + (p.total_miners || 0), 0),
        total_hashrate_ths: projects.reduce((sum, p) => sum + (parseFloat(p.total_hashrate_ths) || 0), 0),
        total_power_mw: projects.reduce((sum, p) => sum + (parseFloat(p.total_power_mw) || 0), 0)
      };

      return res.json({ overview });
    }

    // Super admin : utiliser la vue globale
    const { data, error } = await supabase
      .from('global_overview')
      .select('*')
      .single();

    if (error) throw error;

    res.json({ overview: data });
  } catch (error) {
    logger.error('Error fetching global overview', error);
    res.status(500).json({ error: 'Failed to fetch overview' });
  }
};

exports.getGlobalMetrics = async (req, res) => {
  try {
    const { period = '24h' } = req.query;

    // Calculer le timestamp de début selon la période
    let startDate = new Date();
    switch (period) {
      case '1h':
        startDate.setHours(startDate.getHours() - 1);
        break;
      case '24h':
        startDate.setHours(startDate.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      default:
        startDate.setHours(startDate.getHours() - 24);
    }

    // NOTE: global_metrics devrait avoir une colonne tenant_id pour être scopé
    // Pour l'instant, seuls les super_admin peuvent accéder à cette route
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ 
        error: 'Access denied',
        message: 'This endpoint is only available for super_admin. Use /api/dashboard/projects-metrics instead.'
      });
    }

    const { data, error } = await supabase
      .from('global_metrics')
      .select('*')
      .gte('timestamp', startDate.toISOString())
      .order('timestamp', { ascending: false });

    if (error) throw error;

    res.json({ metrics: data });
  } catch (error) {
    logger.error('Error fetching global metrics', error);
    res.status(500).json({ error: 'Failed to fetch global metrics' });
  }
};

exports.getProjectsMetrics = async (req, res) => {
  try {
    // Construction de la requête avec scope tenant
    let query = supabase
      .from('projects')
      .select('id, name, status, tenant_id');

    // Si non super_admin, filtrer par tenant
    if (req.user.role !== 'super_admin') {
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }
      query = query.eq('tenant_id', req.user.tenant_id);
    }

    const { data: projects, error: projectsError } = await query;

    if (projectsError) throw projectsError;

    // Récupérer les métriques les plus récentes pour chaque projet
    const metricsPromises = projects.map(async (project) => {
      const { data } = await supabase
        .from('project_metrics')
        .select('*')
        .eq('project_id', project.id)
        .order('timestamp', { ascending: false })
        .limit(1);

      return {
        project,
        metrics: data && data.length > 0 ? data[0] : null
      };
    });

    const projectsMetrics = await Promise.all(metricsPromises);

    res.json({ projectsMetrics });
  } catch (error) {
    logger.error('Error fetching projects metrics', error);
    res.status(500).json({ error: 'Failed to fetch projects metrics' });
  }
};

exports.getActiveAlerts = async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    // Construction de la requête
    let query = supabase
      .from('global_alerts')
      .select('*, projects(name, tenant_id)')
      .eq('resolved', false);

    // NOTE: global_alerts devrait avoir tenant_id pour être scopé proprement
    // Pour l'instant, on filtre côté application via la jointure projects
    
    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(parseInt(limit));

    if (error) throw error;

    // Si non super_admin, filtrer par tenant
    let alerts = data;
    if (req.user.role !== 'super_admin') {
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }
      alerts = data.filter(alert => 
        alert.projects && alert.projects.tenant_id === req.user.tenant_id
      );
    }

    res.json({ alerts });
  } catch (error) {
    logger.error('Error fetching active alerts', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};

exports.getRealtimeStats = async (req, res) => {
  try {
    // Construction de la requête avec scope tenant
    let query = supabase
      .from('projects')
      .select('*')
      .eq('status', 'active');

    // Si non super_admin, filtrer par tenant
    if (req.user.role !== 'super_admin') {
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }
      query = query.eq('tenant_id', req.user.tenant_id);
    }

    const { data: projects, error } = await query;

    if (error) throw error;

    const stats = {
      totalProjects: projects.length,
      totalContainers: projects.reduce((sum, p) => sum + (p.total_containers || 0), 0),
      totalMiners: projects.reduce((sum, p) => sum + (p.total_miners || 0), 0),
      totalHashrateThs: projects.reduce((sum, p) => sum + (parseFloat(p.total_hashrate_ths) || 0), 0),
      totalPowerMw: projects.reduce((sum, p) => sum + (parseFloat(p.total_power_mw) || 0), 0),
      projects: projects.map(p => ({
        id: p.id,
        name: p.name,
        containers: p.total_containers,
        miners: p.total_miners,
        hashrate: p.total_hashrate_ths,
        power: p.total_power_mw,
        status: p.status
      }))
    };

    // Convertir hashrate en EH/s
    stats.totalHashrateEhs = (stats.totalHashrateThs / 1000000).toFixed(2);

    res.json({ stats });
  } catch (error) {
    logger.error('Error fetching realtime stats', error);
    res.status(500).json({ error: 'Failed to fetch realtime stats' });
  }
};

