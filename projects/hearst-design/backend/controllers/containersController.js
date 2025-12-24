const supabase = require('../utils/supabase');

// Get all containers (from project metrics)
exports.getAllContainers = async (req, res) => {
  try {
    // Get project info and latest metrics
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', 'DESIGN-001')
      .single();

    if (projectError) throw projectError;

    const { data: metrics, error: metricsError } = await supabase
      .from('project_metrics')
      .select('*')
      .eq('project_id', 'DESIGN-001')
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();

    if (metricsError && metricsError.code !== 'PGRST116') throw metricsError;

    // Generate container data based on project info
    const containers = [];
    const totalContainers = project.total_containers || 20;
    const operationalContainers = metrics?.operational_containers || totalContainers;

    for (let i = 1; i <= totalContainers; i++) {
      containers.push({
        id: `DESIGN-C${String(i).padStart(3, '0')}`,
        name: `Container ${i}`,
        model: project.container_model || 'ANTSPACE HD5',
        status: i <= operationalContainers ? 'operational' : 'offline',
        miners_count: project.miners_per_container || 308,
        location: project.location || 'USA'
      });
    }

    res.json({ containers, total: containers.length });
  } catch (error) {
    console.error('Error fetching containers:', error);
    res.status(500).json({ error: 'Failed to fetch containers' });
  }
};

// Get container by ID
exports.getContainerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Get project info
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', 'DESIGN-001')
      .single();

    if (projectError) throw projectError;

    // Extract container number from id (e.g., DESIGN-C001 -> 1)
    const containerNum = parseInt(id.replace(/\D/g, ''));
    
    if (!containerNum || containerNum > project.total_containers) {
      return res.status(404).json({ error: 'Container not found' });
    }

    const container = {
      id: id,
      name: `Container ${containerNum}`,
      model: project.container_model || 'ANTSPACE HD5',
      status: 'operational',
      miners_count: project.miners_per_container || 308,
      location: project.location || 'USA',
      miner_model: project.miner_model || 'S21XP Hydro'
    };

    res.json(container);
  } catch (error) {
    console.error('Error fetching container:', error);
    res.status(500).json({ error: 'Failed to fetch container' });
  }
};

// Get container stats
exports.getContainerStats = async (req, res) => {
  try {
    const { data: metrics, error } = await supabase
      .from('project_metrics')
      .select('total_containers, operational_containers')
      .eq('project_id', 'DESIGN-001')
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    const total = metrics?.total_containers || 0;
    const operational = metrics?.operational_containers || 0;

    const stats = {
      total: total,
      operational: operational,
      maintenance: 0,
      offline: total - operational
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

// Create container (not applicable for multi-tenant schema)
exports.createContainer = async (req, res) => {
  try {
    res.status(501).json({ 
      error: 'Not implemented', 
      message: 'Container creation is managed at project level'
    });
  } catch (error) {
    console.error('Error creating container:', error);
    res.status(500).json({ error: 'Failed to create container' });
  }
};

// Update container (not applicable for multi-tenant schema)
exports.updateContainer = async (req, res) => {
  try {
    res.status(501).json({ 
      error: 'Not implemented', 
      message: 'Container updates are managed at project level'
    });
  } catch (error) {
    console.error('Error updating container:', error);
    res.status(500).json({ error: 'Failed to update container' });
  }
};

// Delete container (not applicable for multi-tenant schema)
exports.deleteContainer = async (req, res) => {
  try {
    res.status(501).json({ 
      error: 'Not implemented', 
      message: 'Container deletion is managed at project level'
    });
  } catch (error) {
    console.error('Error deleting container:', error);
    res.status(500).json({ error: 'Failed to delete container' });
  }
};

