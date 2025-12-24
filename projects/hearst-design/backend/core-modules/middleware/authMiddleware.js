/**
 * HEARST CONTROL - Core Auth Middleware
 * Middleware d'authentification réutilisable pour tous les projets
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware d'authentification standard
 * @param {string} jwtSecret - Secret JWT
 * @returns {Function} Express middleware
 */
const createAuthMiddleware = (jwtSecret) => {
  if (!jwtSecret) {
    throw new Error('JWT secret is required to create auth middleware');
  }
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }

      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};

/**
 * Middleware pour vérifier l'accès à un projet spécifique
 * @param {string} projectId - ID du projet requis
 * @returns {Function} Express middleware
 */
const requireProjectAccess = (projectId) => {
  return (req, res, next) => {
    try {
      const user = req.user;
      
      if (!user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      // Vérifier si l'utilisateur a accès au projet
      const hasAccess = user.projects?.some(p => p.id === projectId);
      
      if (!hasAccess) {
        return res.status(403).json({ 
          error: 'No access to this project',
          projectId 
        });
      }

      req.projectAccess = user.projects.find(p => p.id === projectId);
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};

/**
 * Middleware pour vérifier un rôle minimum
 * @param {string} minRole - Rôle minimum requis ('admin', 'manager', 'operator', 'viewer')
 * @returns {Function} Express middleware
 */
const requireRole = (minRole) => {
  const roleHierarchy = {
    'viewer': 0,
    'operator': 1,
    'manager': 2,
    'admin': 3,
    'super_admin': 4
  };

  return (req, res, next) => {
    try {
      if (!(minRole in roleHierarchy)) {
        return res.status(500).json({
          error: 'Server misconfiguration',
          message: `Unknown required role: ${minRole}`
        });
      }

      const user = req.user;
      
      if (!user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const userRoleLevel = (user.role in roleHierarchy) ? roleHierarchy[user.role] : -1;
      const requiredLevel = roleHierarchy[minRole];

      if (userRoleLevel < requiredLevel) {
        return res.status(403).json({ 
          error: 'Insufficient permissions',
          required: minRole,
          current: user.role
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};

module.exports = {
  createAuthMiddleware,
  requireProjectAccess,
  requireRole
};

