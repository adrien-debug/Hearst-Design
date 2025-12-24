/**
 * HEARST DESIGN - Routes de Monitoring
 * Endpoints pour le DevMonitor central
 */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Charger la configuration du projet
const loadProjectConfig = () => {
  try {
    const configPath = path.join(__dirname, '../../PROJECT_CONFIG.json');
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
  } catch (error) {
    console.error('Error loading PROJECT_CONFIG.json:', error.message);
  }
  return null;
};

/**
 * GET /api/health
 * État de santé du serveur
 */
router.get('/health', (req, res) => {
  const config = loadProjectConfig();
  const startTime = process.hrtime();
  
  res.json({
    status: 'healthy',
    service: config?.project?.name || 'Hearst Design',
    version: config?.project?.version || '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    pid: process.pid
  });
});

/**
 * GET /api/pages
 * Liste des pages disponibles dans le projet
 */
router.get('/pages', (req, res) => {
  const config = loadProjectConfig();
  
  if (config && config.pages) {
    // Flatten pages from categories
    const allPages = [];
    config.pages.forEach(category => {
      category.items.forEach(page => {
        allPages.push({
          path: page.path,
          label: page.label,
          icon: page.icon,
          category: category.category,
          status: 'active',
          lastAccessed: null
        });
      });
    });

    res.json({
      success: true,
      pages: allPages,
      total: allPages.length,
      categories: config.pages.map(c => c.category)
    });
  } else {
    // Pages par défaut si pas de config
    res.json({
      success: true,
      pages: [
        { path: '/dashboard', label: 'Dashboard', icon: '📊', category: 'Dashboard', status: 'active' },
        { path: '/design', label: 'Design Studio', icon: '🎨', category: 'Design', status: 'active' }
      ],
      total: 2,
      categories: ['Dashboard', 'Design']
    });
  }
});

/**
 * GET /api/servers
 * État des services/serveurs du projet
 */
router.get('/servers', (req, res) => {
  const config = loadProjectConfig();
  const port = config?.network?.port || process.env.PORT || 3002;
  
  const servers = [
    {
      id: 'backend-design',
      name: 'Backend Design API',
      port: port,
      status: 'running',
      pid: process.pid,
      description: 'API principale Hearst Design',
      uptime: process.uptime(),
      memory: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
      startedAt: new Date(Date.now() - process.uptime() * 1000).toISOString()
    }
  ];

  // Ajouter les services définis dans la config
  if (config?.services) {
    config.services.forEach(service => {
      if (service.id !== 'backend-design') {
        servers.push({
          id: service.id,
          name: service.name,
          port: service.port,
          status: 'unknown', // À vérifier via health check
          pid: null,
          description: service.description,
          uptime: null,
          memory: null
        });
      }
    });
  }

  res.json({
    success: true,
    servers: servers,
    total: servers.length,
    running: servers.filter(s => s.status === 'running').length
  });
});

/**
 * GET /api/monitoring/summary
 * Résumé global du monitoring
 */
router.get('/summary', (req, res) => {
  const config = loadProjectConfig();
  
  res.json({
    success: true,
    project: {
      id: config?.project?.id || 'hearst-design',
      name: config?.project?.name || 'Hearst Design',
      status: config?.project?.status || 'active',
      version: config?.project?.version || '1.0.0'
    },
    health: {
      status: 'healthy',
      uptime: process.uptime(),
      lastCheck: new Date().toISOString()
    },
    stats: {
      pages: config?.pages?.reduce((acc, cat) => acc + cat.items.length, 0) || 0,
      services: config?.services?.length || 1,
      activeConnections: 0
    }
  });
});

module.exports = router;

