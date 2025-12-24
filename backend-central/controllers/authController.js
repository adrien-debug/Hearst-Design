/**
 * HEARST CONTROL - Auth Controller
 * Authentification centralisée pour tous les projets
 */

const AuthService = require('../../core/auth/authService');
const { createSupabaseClientFromEnv } = require('../../core/database/supabaseClient');
const { logger } = require('../../core/shared-utils/logger');

const supabase = createSupabaseClientFromEnv();
const authService = new AuthService(supabase, process.env.JWT_SECRET);

exports.login = async (req, res) => {
  try {
    const { email, password, projectId } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    logger.info(`Login attempt for ${email}${projectId ? ` (project: ${projectId})` : ''}`);

    const result = await authService.login(email, password, projectId);

    logger.success(`User ${email} logged in successfully`);

    res.json(result);
  } catch (error) {
    logger.error('Login failed', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

exports.verify = async (req, res) => {
  try {
    res.json({ 
      valid: true, 
      user: req.user 
    });
  } catch (error) {
    logger.error('Token verification failed', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.logout = async (req, res) => {
  try {
    logger.info(`User ${req.user.email} logged out`);
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    logger.error('Logout error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.refresh = async (req, res) => {
  try {
    // Implémenter la logique de refresh token
    res.json({ message: 'Token refresh not implemented yet' });
  } catch (error) {
    logger.error('Token refresh error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Bootstrap d'un nouveau tenant (onboarding self-serve)
 * Crée un tenant + un utilisateur admin en une seule transaction
 */
exports.bootstrapTenant = async (req, res) => {
  try {
    const { tenant, user } = req.body;

    // ========================================================================
    // 1) VALIDATION DES DONNÉES
    // ========================================================================

    // Validation tenant
    if (!tenant || !tenant.name || !tenant.slug) {
      return res.status(400).json({ 
        error: 'Tenant name and slug are required',
        details: 'Body must contain: { tenant: { name, slug }, user: { name, email, password } }'
      });
    }

    // Validation user
    if (!user || !user.name || !user.email || !user.password) {
      return res.status(400).json({ 
        error: 'User name, email and password are required',
        details: 'Body must contain: { tenant: { name, slug }, user: { name, email, password } }'
      });
    }

    // Validation du slug tenant : lowercase, [a-z0-9-], 3-30 chars
    const slugRegex = /^[a-z0-9-]{3,30}$/;
    if (!slugRegex.test(tenant.slug)) {
      return res.status(400).json({ 
        error: 'Invalid tenant slug',
        details: 'Slug must be lowercase, contain only letters, numbers and hyphens, and be 3-30 characters long'
      });
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      return res.status(400).json({ 
        error: 'Invalid email format'
      });
    }

    // Validation password (au moins 8 caractères)
    if (user.password.length < 8) {
      return res.status(400).json({ 
        error: 'Password must be at least 8 characters long'
      });
    }

    logger.info(`Bootstrap attempt for tenant "${tenant.slug}" with user "${user.email}"`);

    // ========================================================================
    // 2) VÉRIFIER LES UNIQUES (slug tenant & email user)
    // ========================================================================

    // Vérifier si le slug existe déjà
    const { data: existingTenant, error: tenantCheckError } = await supabase
      .from('tenants')
      .select('id, slug')
      .eq('slug', tenant.slug)
      .maybeSingle();

    if (tenantCheckError) {
      logger.error('Error checking tenant slug', tenantCheckError);
      throw tenantCheckError;
    }

    if (existingTenant) {
      logger.warning(`Tenant slug "${tenant.slug}" already exists`);
      return res.status(409).json({ 
        error: 'Tenant slug already exists',
        details: `A tenant with slug "${tenant.slug}" already exists`
      });
    }

    // Vérifier si l'email existe déjà
    const { data: existingUser, error: userCheckError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', user.email)
      .maybeSingle();

    if (userCheckError) {
      logger.error('Error checking user email', userCheckError);
      throw userCheckError;
    }

    if (existingUser) {
      logger.warning(`User email "${user.email}" already exists`);
      return res.status(409).json({ 
        error: 'Email already exists',
        details: `A user with email "${user.email}" already exists`
      });
    }

    // ========================================================================
    // 3) CRÉER LE TENANT
    // ========================================================================

    const { data: newTenant, error: tenantCreateError } = await supabase
      .from('tenants')
      .insert([{
        slug: tenant.slug.toLowerCase(),
        name: tenant.name,
        status: 'active'
      }])
      .select()
      .single();

    if (tenantCreateError) {
      logger.error('Error creating tenant', tenantCreateError);
      throw tenantCreateError;
    }

    logger.success(`Tenant "${newTenant.slug}" created successfully (ID: ${newTenant.id})`);

    // ========================================================================
    // 4) CRÉER L'UTILISATEUR ADMIN
    // ========================================================================

    try {
      // Hash du password
      const password_hash = await authService.hashPassword(user.password);

      const { data: newUser, error: userCreateError } = await supabase
        .from('users')
        .insert([{
          email: user.email,
          password_hash: password_hash,
          name: user.name,
          role: 'admin', // Le premier user du tenant est admin
          tenant_id: newTenant.id,
          is_active: true,
          phone: user.phone || null
        }])
        .select('id, email, name, role, tenant_id, is_active, created_at')
        .single();

      if (userCreateError) {
        logger.error('Error creating user', userCreateError);
        // Rollback : supprimer le tenant créé
        await supabase.from('tenants').delete().eq('id', newTenant.id);
        throw userCreateError;
      }

      logger.success(`User "${newUser.email}" created successfully (ID: ${newUser.id})`);

      // ========================================================================
      // 5) GÉNÉRER LE JWT
      // ========================================================================

      const jwt = require('jsonwebtoken');
      const token = jwt.sign(
        {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          tenant_id: newUser.tenant_id,
          projects: [] // Nouveau tenant, pas encore de projets
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // ========================================================================
      // 6) RÉPONSE
      // ========================================================================

      logger.success(`Bootstrap completed for tenant "${newTenant.slug}"`);

      return res.status(201).json({
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          tenant_id: newUser.tenant_id,
          is_active: newUser.is_active,
          created_at: newUser.created_at
        },
        tenant: {
          id: newTenant.id,
          slug: newTenant.slug,
          name: newTenant.name,
          status: newTenant.status,
          created_at: newTenant.created_at
        }
      });

    } catch (userError) {
      // En cas d'erreur lors de la création de l'utilisateur, rollback
      logger.error('Bootstrap failed, rolling back tenant creation', userError);
      await supabase.from('tenants').delete().eq('id', newTenant.id);
      throw userError;
    }

  } catch (error) {
    logger.error('Bootstrap tenant failed', error);
    res.status(500).json({ 
      error: 'Failed to bootstrap tenant',
      details: error.message 
    });
  }
};

