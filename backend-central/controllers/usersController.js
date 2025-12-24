/**
 * HEARST CONTROL - Users Controller
 * Gestion des utilisateurs
 */

const { createSupabaseClientFromEnv } = require('../../core/database/supabaseClient');
const { logger } = require('../../core/shared-utils/logger');
const bcrypt = require('bcryptjs');

const supabase = createSupabaseClientFromEnv();

exports.getAll = async (req, res) => {
  try {
    // Construction de la requête avec scope tenant
    let query = supabase
      .from('users')
      .select('id, email, name, role, is_active, last_login, created_at, tenant_id');

    // Si non super_admin, filtrer par tenant
    if (req.user.role !== 'super_admin') {
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }
      query = query.eq('tenant_id', req.user.tenant_id);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ users: data });
  } catch (error) {
    logger.error('Error fetching users', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    // Construction de la requête
    let query = supabase
      .from('users')
      .select('id, email, name, role, phone, avatar_url, is_active, last_login, created_at, tenant_id')
      .eq('id', id);

    // Si non super_admin, vérifier le scope tenant
    if (req.user.role !== 'super_admin') {
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }
      // Vérifier que l'utilisateur a le droit de voir ce profil
      // Soit c'est son propre profil, soit il est admin de son tenant
      if (req.user.id !== id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }
      query = query.eq('tenant_id', req.user.tenant_id);
    }

    const { data, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'User not found or access denied' });
      }
      throw error;
    }

    // Récupérer les accès projets (scopés par tenant)
    let projectsQuery = supabase
      .from('user_project_access')
      .select('*, projects(*)')
      .eq('user_id', id);

    if (req.user.role !== 'super_admin') {
      projectsQuery = projectsQuery.eq('tenant_id', req.user.tenant_id);
    }

    const { data: projects } = await projectsQuery;

    res.json({ user: { ...data, projects } });
  } catch (error) {
    logger.error(`Error fetching user ${req.params.id}`, error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

exports.create = async (req, res) => {
  try {
    const { email, password, name, role, phone, tenant_id } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Déterminer le tenant_id
    let targetTenantId;
    if (req.user.role === 'super_admin' && tenant_id) {
      // Super admin peut créer un user dans n'importe quel tenant
      targetTenantId = tenant_id;
    } else if (req.user.role === 'super_admin' && !tenant_id) {
      return res.status(400).json({ error: 'Super admin must specify tenant_id' });
    } else {
      // Non super_admin : forcer le tenant de l'utilisateur
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }
      targetTenantId = req.user.tenant_id;
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ 
        email, 
        password_hash, 
        name, 
        role, 
        phone,
        tenant_id: targetTenantId,
        is_active: true
      }])
      .select('id, email, name, role, tenant_id, created_at')
      .single();

    if (error) throw error;

    logger.success(`User ${email} created successfully in tenant ${targetTenantId}`);

    res.status(201).json({ user: data });
  } catch (error) {
    logger.error('Error creating user', error);
    
    // Gérer l'erreur d'email duplicate
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // Ne pas permettre de modifier le mot de passe ni tenant_id par cette route
    delete updates.password;
    delete updates.password_hash;
    delete updates.tenant_id; // Le tenant ne peut pas être changé

    // Construction de la requête
    let query = supabase
      .from('users')
      .update(updates)
      .eq('id', id);

    // Si non super_admin, scope par tenant
    if (req.user.role !== 'super_admin') {
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }
      // Vérifier que l'utilisateur peut modifier ce profil
      if (req.user.id !== id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }
      query = query.eq('tenant_id', req.user.tenant_id);
    }

    const { data, error } = await query
      .select('id, email, name, role, phone, avatar_url, is_active, tenant_id')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'User not found or access denied' });
      }
      throw error;
    }

    logger.success(`User ${id} updated successfully`);

    res.json({ user: data });
  } catch (error) {
    logger.error(`Error updating user ${req.params.id}`, error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    // Construction de la requête
    let query = supabase
      .from('users')
      .delete()
      .eq('id', id);

    // Si non super_admin, scope par tenant
    if (req.user.role !== 'super_admin') {
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }
      // Seuls les admins du tenant peuvent supprimer des users
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }
      query = query.eq('tenant_id', req.user.tenant_id);
    }

    const { error } = await query;

    if (error) throw error;

    logger.warning(`User ${id} deleted`);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting user ${req.params.id}`, error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

exports.grantProjectAccess = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectId, role } = req.body;

    if (!projectId || !role) {
      return res.status(400).json({ error: 'projectId and role are required' });
    }

    // Vérifier le scope tenant
    let targetTenantId;
    if (req.user.role === 'super_admin') {
      // Super admin : récupérer le tenant_id du user cible
      const { data: targetUser, error: userError } = await supabase
        .from('users')
        .select('tenant_id')
        .eq('id', id)
        .single();
      
      if (userError || !targetUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      targetTenantId = targetUser.tenant_id;
    } else {
      // Non super_admin : forcer le tenant de l'utilisateur
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }
      targetTenantId = req.user.tenant_id;

      // Vérifier que le user cible appartient au même tenant
      const { data: targetUser, error: userError } = await supabase
        .from('users')
        .select('tenant_id')
        .eq('id', id)
        .eq('tenant_id', targetTenantId)
        .single();
      
      if (userError || !targetUser) {
        return res.status(404).json({ error: 'User not found in your tenant' });
      }
    }

    // Vérifier que le projet appartient au même tenant
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('tenant_id')
      .eq('id', projectId)
      .eq('tenant_id', targetTenantId)
      .single();
    
    if (projectError || !project) {
      return res.status(404).json({ error: 'Project not found in the tenant' });
    }

    // Créer l'accès
    const { data, error } = await supabase
      .from('user_project_access')
      .insert([{
        user_id: id,
        project_id: projectId,
        tenant_id: targetTenantId, // Dénormalisé
        role,
        granted_by: req.user.id
      }])
      .select()
      .single();

    if (error) throw error;

    logger.success(`User ${id} granted ${role} access to project ${projectId}`);

    res.json({ access: data });
  } catch (error) {
    logger.error('Error granting project access', error);
    
    // Gérer l'erreur de duplicate
    if (error.code === '23505') {
      return res.status(409).json({ error: 'User already has access to this project' });
    }
    
    res.status(500).json({ error: 'Failed to grant project access' });
  }
};

exports.revokeProjectAccess = async (req, res) => {
  try {
    const { id, projectId } = req.params;

    // Construction de la requête
    let query = supabase
      .from('user_project_access')
      .delete()
      .eq('user_id', id)
      .eq('project_id', projectId);

    // Si non super_admin, scope par tenant
    if (req.user.role !== 'super_admin') {
      if (!req.user.tenant_id) {
        return res.status(401).json({ error: 'No tenant associated with user' });
      }
      query = query.eq('tenant_id', req.user.tenant_id);
    }

    const { error } = await query;

    if (error) throw error;

    logger.warning(`User ${id} access to project ${projectId} revoked`);

    res.json({ message: 'Project access revoked successfully' });
  } catch (error) {
    logger.error('Error revoking project access', error);
    res.status(500).json({ error: 'Failed to revoke project access' });
  }
};

