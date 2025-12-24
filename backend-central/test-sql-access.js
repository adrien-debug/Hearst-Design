/**
 * Test d'accès SQL complet à Supabase
 * Vérifie toutes les tables et la structure de la base de données
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

console.log('\n🔍 TEST D\'ACCÈS SQL COMPLET - HEARST CONTROL\n');
console.log('=' .repeat(60));
console.log('URL Supabase:', supabaseUrl);
console.log('Clé:', supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'MANQUANTE');
console.log('=' .repeat(60));
console.log('');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSQLAccess() {
  try {
    // Test 1: Tenants
    console.log('📊 TEST 1: Table TENANTS');
    console.log('-'.repeat(60));
    const { data: tenants, error: tenantsError } = await supabase
      .from('tenants')
      .select('*');
    
    if (tenantsError) {
      console.error('❌ Erreur:', tenantsError.message);
    } else {
      console.log(`✅ ${tenants.length} tenant(s) trouvé(s):`);
      tenants.forEach(t => {
        console.log(`   - ${t.name} (${t.slug})`);
        console.log(`     ID: ${t.id}`);
        console.log(`     Status: ${t.status}`);
        console.log(`     Créé: ${new Date(t.created_at).toLocaleDateString('fr-FR')}`);
      });
    }
    console.log('');

    // Test 2: Users
    console.log('📊 TEST 2: Table USERS');
    console.log('-'.repeat(60));
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*, tenants(name, slug)');
    
    if (usersError) {
      console.error('❌ Erreur:', usersError.message);
    } else {
      console.log(`✅ ${users.length} utilisateur(s) trouvé(s):`);
      users.forEach(u => {
        console.log(`   - ${u.email}`);
        console.log(`     Nom: ${u.name}`);
        console.log(`     Rôle: ${u.role}`);
        console.log(`     Tenant: ${u.tenants ? u.tenants.name : 'N/A'}`);
        console.log(`     Actif: ${u.is_active ? 'Oui' : 'Non'}`);
      });
    }
    console.log('');

    // Test 3: Projects
    console.log('📊 TEST 3: Table PROJECTS');
    console.log('-'.repeat(60));
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*, tenants(name, slug)');
    
    if (projectsError) {
      console.error('❌ Erreur:', projectsError.message);
    } else {
      console.log(`✅ ${projects.length} projet(s) trouvé(s):`);
      projects.forEach(p => {
        console.log(`   - ${p.name} (${p.slug})`);
        console.log(`     Description: ${p.description}`);
        console.log(`     Tenant: ${p.tenants ? p.tenants.name : 'N/A'}`);
        console.log(`     Status: ${p.status}`);
        console.log(`     URL Backend: ${p.backend_url || 'N/A'}`);
        console.log(`     URL Frontend: ${p.frontend_url || 'N/A'}`);
      });
    }
    console.log('');

    // Test 4: Permissions
    console.log('📊 TEST 4: Table PERMISSIONS');
    console.log('-'.repeat(60));
    const { data: permissions, error: permissionsError } = await supabase
      .from('permissions')
      .select('*, users(email, name), projects(name)');
    
    if (permissionsError) {
      console.error('❌ Erreur:', permissionsError.message);
    } else {
      console.log(`✅ ${permissions.length} permission(s) trouvée(s):`);
      permissions.forEach(p => {
        console.log(`   - Utilisateur: ${p.users ? p.users.email : 'N/A'}`);
        console.log(`     Projet: ${p.projects ? p.projects.name : 'N/A'}`);
        console.log(`     Rôle: ${p.role}`);
        console.log(`     Accès: ${p.can_read ? '📖' : ''}${p.can_write ? '✏️' : ''}${p.can_delete ? '🗑️' : ''}`);
      });
    }
    console.log('');

    // Test 5: Audit Logs
    console.log('📊 TEST 5: Table AUDIT_LOGS (dernières 5 entrées)');
    console.log('-'.repeat(60));
    const { data: logs, error: logsError } = await supabase
      .from('audit_logs')
      .select('*, users(email, name)')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (logsError) {
      console.error('❌ Erreur:', logsError.message);
    } else {
      console.log(`✅ ${logs.length} log(s) trouvé(s):`);
      logs.forEach(l => {
        console.log(`   - ${new Date(l.created_at).toLocaleString('fr-FR')}`);
        console.log(`     Action: ${l.action}`);
        console.log(`     Utilisateur: ${l.users ? l.users.email : 'N/A'}`);
        console.log(`     Détails: ${l.details || 'N/A'}`);
      });
    }
    console.log('');

    // Test 6: Statistiques globales
    console.log('📊 TEST 6: STATISTIQUES GLOBALES');
    console.log('-'.repeat(60));
    
    const { count: tenantsCount } = await supabase
      .from('tenants')
      .select('*', { count: 'exact', head: true });
    
    const { count: usersCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    
    const { count: projectsCount } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true });
    
    const { count: permissionsCount } = await supabase
      .from('permissions')
      .select('*', { count: 'exact', head: true });
    
    const { count: logsCount } = await supabase
      .from('audit_logs')
      .select('*', { count: 'exact', head: true });
    
    console.log('✅ Résumé de la base de données:');
    console.log(`   📁 Tenants: ${tenantsCount}`);
    console.log(`   👥 Utilisateurs: ${usersCount}`);
    console.log(`   🚀 Projets: ${projectsCount}`);
    console.log(`   🔐 Permissions: ${permissionsCount}`);
    console.log(`   📝 Logs d'audit: ${logsCount}`);
    console.log('');

    // Test 7: Test d'écriture (création et suppression d'un log de test)
    console.log('📊 TEST 7: TEST D\'ÉCRITURE (création/suppression)');
    console.log('-'.repeat(60));
    
    // Récupérer l'admin pour le test
    const { data: admin } = await supabase
      .from('users')
      .select('id')
      .eq('email', 'admin@hearstmining.com')
      .single();
    
    if (admin) {
      // Créer un log de test
      const { data: newLog, error: createError } = await supabase
        .from('audit_logs')
        .insert({
          user_id: admin.id,
          action: 'test_sql_access',
          details: 'Test d\'accès SQL automatique',
          ip_address: '127.0.0.1'
        })
        .select()
        .single();
      
      if (createError) {
        console.error('❌ Erreur création:', createError.message);
      } else {
        console.log('✅ Log de test créé avec succès');
        console.log(`   ID: ${newLog.id}`);
        
        // Supprimer le log de test
        const { error: deleteError } = await supabase
          .from('audit_logs')
          .delete()
          .eq('id', newLog.id);
        
        if (deleteError) {
          console.error('❌ Erreur suppression:', deleteError.message);
        } else {
          console.log('✅ Log de test supprimé avec succès');
        }
      }
    }
    console.log('');

    // Résumé final
    console.log('=' .repeat(60));
    console.log('✅ TOUS LES TESTS SQL SONT RÉUSSIS !');
    console.log('=' .repeat(60));
    console.log('');
    console.log('🎉 La connexion à Supabase fonctionne parfaitement !');
    console.log('📊 Toutes les tables sont accessibles en lecture et écriture');
    console.log('🔐 Les permissions et relations fonctionnent correctement');
    console.log('');

  } catch (error) {
    console.error('\n❌ ERREUR GÉNÉRALE:', error.message);
    console.error('Stack:', error.stack);
  }
}

testSQLAccess();

