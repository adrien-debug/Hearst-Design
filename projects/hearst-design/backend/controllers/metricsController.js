const supabase = require('../utils/supabase');

// Get current metrics
exports.getCurrentMetrics = async (req, res) => {
  try {
    // Get latest metrics for DESIGN-001 project
    const { data, error } = await supabase
      .from('project_metrics')
      .select('*')
      .eq('project_id', 'DESIGN-001')
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    res.json(data || {});
  } catch (error) {
    console.error('Error fetching current metrics:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
};

// Get metrics by period
exports.getMetricsByPeriod = async (req, res) => {
  try {
    const { period = '24h' } = req.query;
    
    let startTime;
    switch (period) {
      case '1h': startTime = new Date(Date.now() - 3600000); break;
      case '24h': startTime = new Date(Date.now() - 86400000); break;
      case '7d': startTime = new Date(Date.now() - 604800000); break;
      case '30d': startTime = new Date(Date.now() - 2592000000); break;
      default: startTime = new Date(Date.now() - 86400000);
    }

    const { data, error } = await supabase
      .from('project_metrics')
      .select('*')
      .eq('project_id', 'DESIGN-001')
      .gte('timestamp', startTime.toISOString())
      .order('timestamp');

    if (error) throw error;

    res.json({ metrics: data, period, total: data.length });
  } catch (error) {
    console.error('Error fetching metrics by period:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
};

// Get hashrate history
exports.getHashrateHistory = async (req, res) => {
  try {
    const { period = '24h' } = req.query;
    
    let startTime;
    switch (period) {
      case '1h': startTime = new Date(Date.now() - 3600000); break;
      case '24h': startTime = new Date(Date.now() - 86400000); break;
      case '7d': startTime = new Date(Date.now() - 604800000); break;
      default: startTime = new Date(Date.now() - 86400000);
    }

    const { data, error } = await supabase
      .from('project_metrics')
      .select('timestamp, total_hashrate_ths, total_hashrate_ehs')
      .eq('project_id', 'DESIGN-001')
      .gte('timestamp', startTime.toISOString())
      .order('timestamp');

    if (error) throw error;

    res.json({ data, period });
  } catch (error) {
    console.error('Error fetching hashrate history:', error);
    res.status(500).json({ error: 'Failed to fetch hashrate history' });
  }
};

// Get power consumption history
exports.getPowerHistory = async (req, res) => {
  try {
    const { period = '24h' } = req.query;
    
    let startTime;
    switch (period) {
      case '1h': startTime = new Date(Date.now() - 3600000); break;
      case '24h': startTime = new Date(Date.now() - 86400000); break;
      case '7d': startTime = new Date(Date.now() - 604800000); break;
      default: startTime = new Date(Date.now() - 86400000);
    }

    const { data, error } = await supabase
      .from('project_metrics')
      .select('timestamp, total_power_kw, total_power_mw')
      .eq('project_id', 'DESIGN-001')
      .gte('timestamp', startTime.toISOString())
      .order('timestamp');

    if (error) throw error;

    res.json({ data, period });
  } catch (error) {
    console.error('Error fetching power history:', error);
    res.status(500).json({ error: 'Failed to fetch power history' });
  }
};

// Get aggregated stats
exports.getAggregatedStats = async (req, res) => {
  try {
    // Get project info
    const { data: project } = await supabase
      .from('projects')
      .select('*')
      .eq('id', 'DESIGN-001')
      .single();
    
    // Get latest metrics
    const { data: latestMetric } = await supabase
      .from('project_metrics')
      .select('*')
      .eq('project_id', 'DESIGN-001')
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();

    const stats = {
      project: project || {},
      containers: {
        total: latestMetric?.total_containers || 0,
        operational: latestMetric?.operational_containers || 0,
        maintenance: 0,
        offline: (latestMetric?.total_containers || 0) - (latestMetric?.operational_containers || 0)
      },
      miners: {
        total: latestMetric?.total_miners || 0,
        online: latestMetric?.online_miners || 0,
        offline: latestMetric?.offline_miners || 0,
        totalHashrate: latestMetric?.total_hashrate_ths || 0,
        totalHashrateEhs: latestMetric?.total_hashrate_ehs || 0,
        totalPower: latestMetric?.total_power_kw || 0
      },
      latest: latestMetric || {}
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching aggregated stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

