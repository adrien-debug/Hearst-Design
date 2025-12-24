const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const containersRoutes = require('./routes/containers');
const minersRoutes = require('./routes/miners');
const metricsRoutes = require('./routes/metrics');
const monitoringRoutes = require('./routes/monitoring');

const app = express();
// ⚠️ NOTE: NE PAS MODIFIER CE PORT - Configuration infrastructure fixe
// Port 3002 = Hearst Design (selon PROJECT_STRUCTURE.md)
const PORT = process.env.PORT || 3002;

// Middleware
app.use(helmet());
app.use(cors({ origin: '*', credentials: false })); // Allow all origins in development
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/containers', containersRoutes);
app.use('/api/miners', minersRoutes);
app.use('/api/metrics', metricsRoutes);

// Monitoring routes (pour DevMonitor central)
app.use('/api', monitoringRoutes);
app.use('/api/monitoring', monitoringRoutes);

// Health check (legacy endpoint)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Hearst Design',
    port: PORT,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
app.listen(PORT, () => {
  // #region agent log
  fetch('http://127.0.0.1:7246/ingest/eae5f0fe-29ef-4376-8b15-c32e28fe1e52',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'design-server.js:66',message:'Design backend started',data:{port:PORT,service:'hearst-design'},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;

