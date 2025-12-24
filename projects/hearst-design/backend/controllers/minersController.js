const supabase = require('../utils/supabase');

// Get all miners (from project metrics)
exports.getAllMiners = async (req, res) => {
  try {
    const { container_id, status } = req.query;
    
    // Get project info and metrics
    const { data: project } = await supabase
      .from('projects')
      .select('*')
      .eq('id', 'DESIGN-001')
      .single();

    const { data: metrics } = await supabase
      .from('project_metrics')
      .select('*')
      .eq('project_id', 'DESIGN-001')
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();

    // Generate miners data
    const miners = [];
    const totalMiners = project.total_miners || 6160;
    const onlineMiners = metrics?.online_miners || totalMiners;
    const minersPerContainer = project.miners_per_container || 308;

    for (let i = 1; i <= totalMiners; i++) {
      const containerNum = Math.ceil(i / minersPerContainer);
      const minerInContainer = ((i - 1) % minersPerContainer) + 1;
      const isOnline = i <= onlineMiners;
      
      const miner = {
        id: `DESIGN-M${String(i).padStart(4, '0')}`,
        name: `Miner ${i}`,
        container_id: `DESIGN-C${String(containerNum).padStart(3, '0')}`,
        model: project.miner_model || 'S21XP Hydro',
        status: isOnline ? 'online' : 'offline',
        hashrate: project.miner_hashrate || 473,
        power_consumption: project.miner_power_w || 5676
      };

      // Filter by container_id if specified
      if (container_id && miner.container_id !== container_id) continue;
      // Filter by status if specified
      if (status && miner.status !== status) continue;

      miners.push(miner);
    }

    res.json({ miners, total: miners.length });
  } catch (error) {
    console.error('Error fetching miners:', error);
    res.status(500).json({ error: 'Failed to fetch miners' });
  }
};

// Get miners by container
exports.getMinersByContainer = async (req, res) => {
  try {
    const { containerId } = req.params;

    // Extract container number
    const containerNum = parseInt(containerId.replace(/\D/g, ''));

    // Get project info
    const { data: project } = await supabase
      .from('projects')
      .select('*')
      .eq('id', 'DESIGN-001')
      .single();

    const { data: metrics } = await supabase
      .from('project_metrics')
      .select('*')
      .eq('project_id', 'DESIGN-001')
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();

    const minersPerContainer = project.miners_per_container || 308;
    const onlineMiners = metrics?.online_miners || project.total_miners;
    
    // Generate miners for this container
    const miners = [];
    const startMiner = ((containerNum - 1) * minersPerContainer) + 1;
    const endMiner = containerNum * minersPerContainer;

    for (let i = startMiner; i <= endMiner; i++) {
      const isOnline = i <= onlineMiners;
      miners.push({
        id: `DESIGN-M${String(i).padStart(4, '0')}`,
        name: `Miner ${i}`,
        container_id: containerId,
        model: project.miner_model || 'S21XP Hydro',
        status: isOnline ? 'online' : 'offline',
        hashrate: project.miner_hashrate || 473,
        power_consumption: project.miner_power_w || 5676
      });
    }

    res.json({ miners, total: miners.length });
  } catch (error) {
    console.error('Error fetching miners:', error);
    res.status(500).json({ error: 'Failed to fetch miners' });
  }
};

// Get miner stats
exports.getMinerStats = async (req, res) => {
  try {
    const { data: metrics, error } = await supabase
      .from('project_metrics')
      .select('*')
      .eq('project_id', 'DESIGN-001')
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    const stats = {
      total: metrics?.total_miners || 0,
      online: metrics?.online_miners || 0,
      offline: metrics?.offline_miners || 0,
      maintenance: 0,
      totalHashrate: metrics?.total_hashrate_ths || 0,
      totalHashrateEhs: metrics?.total_hashrate_ehs || 0,
      totalPower: metrics?.total_power_kw || 0
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching miner stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

// Update miner (not applicable for multi-tenant schema)
exports.updateMiner = async (req, res) => {
  try {
    res.status(501).json({ 
      error: 'Not implemented', 
      message: 'Miner updates are managed at project metrics level'
    });
  } catch (error) {
    console.error('Error updating miner:', error);
    res.status(500).json({ error: 'Failed to update miner' });
  }
};

// Restart miner (not applicable for multi-tenant schema)
exports.restartMiner = async (req, res) => {
  try {
    const { id } = req.params;
    
    res.json({ 
      message: 'Miner restart would be initiated via hardware API',
      miner_id: id,
      status: 'simulated'
    });
  } catch (error) {
    console.error('Error restarting miner:', error);
    res.status(500).json({ error: 'Failed to restart miner' });
  }
};

