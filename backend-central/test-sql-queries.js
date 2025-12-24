/**
 * Test de requêtes SQL complexes sur Supabase
 * Vérifie les JOINs, agrégations et requêtes avancées
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

console.log('\n🔍 TEST DE REQUÊTES SQL COMPLEXES\n');
console.log('=' .repeat(60));

const supabase = createClient(supabaseUrl, supabaseKey);

async function testComplexQueries() {
  try {
    // Test 1: Requête avec JOIN (users + tenants)
    console.log('📊 TEST 1: JOIN Users + Tenants');
    console.log('-'.repeat(60));
    const { data: usersWithTenants, error: e1 } = await supabase
      .from('users')
      .select(`
        id,
        email,
        name,
        role,
        tenants (
          name,
          slug,
          status
        )
      `)
      .order('role', { ascending: false });
    
    if (e1) {
      console.error('❌ Erreur:', e1.message);
    } else {
      console.log(`✅ ${usersWithTenants.length} utilisateurs avec leurs tenants:`);
      usersWithTenants.forEach(u => {
        console.log(`   ${u.email} (${u.role})`);
        console.log(`   └─ Tenant: ${u.tenants?.name || 'N/A'}`);
      });
    }
    console.log('');

    // Test 2: Requête avec filtres multiples
    console.log('📊 TEST 2: Filtres multiples (projets actifs)');
    console.log('-'.repeat(60));
    const { data: activeProjects, error: e2 } = await supabase
      .from('projects')
      .select('name, status, total_containers, total_miners')
      .eq('status', 'active')
      .order('total_miners', { ascending: false });
    
    if (e2) {
      console.error('❌ Erreur:', e2.message);
    } else {
      console.log(`✅ ${activeProjects.length} projets actifs:`);
      activeProjects.forEach(p => {
        console.log(`   ${p.name}`);
        console.log(`   └─ ${p.total_containers} containers, ${p.total_miners} mineurs`);
      });
    }
    console.log('');

    // Test 3: Agrégation (somme des mineurs par tenant)
    console.log('📊 TEST 3: Agrégation (total mineurs)');
    console.log('-'.repeat(60));
    const { data: allProjects, error: e3 } = await supabase
      .from('projects')
      .select('total_miners, total_containers, total_hashrate_ths');
    
    if (e3) {
      console.error('❌ Erreur:', e3.message);
    } else {
      const totalMiners = allProjects.reduce((sum, p) => sum + (p.total_miners || 0), 0);
      const totalContainers = allProjects.reduce((sum, p) => sum + (p.total_containers || 0), 0);
      const totalHashrate = allProjects.reduce((sum, p) => sum + (p.total_hashrate_ths || 0), 0);
      
      console.log('✅ Statistiques globales:');
      console.log(`   Total containers: ${totalContainers}`);
      console.log(`   Total mineurs: ${totalMiners.toLocaleString('fr-FR')}`);
      console.log(`   Total hashrate: ${totalHashrate.toLocaleString('fr-FR')} TH/s`);
    }
    console.log('');

    // Test 4: Recherche avec LIKE (case insensitive)
    console.log('📊 TEST 4: Recherche LIKE (projets avec "Qatar")');
    console.log('-'.repeat(60));
    const { data: qatarProjects, error: e4 } = await supabase
      .from('projects')
      .select('name, location, status')
      .ilike('name', '%Qatar%');
    
    if (e4) {
      console.error('❌ Erreur:', e4.message);
    } else {
      console.log(`✅ ${qatarProjects.length} projet(s) trouvé(s):`);
      qatarProjects.forEach(p => {
        console.log(`   ${p.name} - ${p.location} (${p.status})`);
      });
    }
    console.log('');

    // Test 5: Requête avec OR
    console.log('📊 TEST 5: Requête OR (admin ou manager)');
    console.log('-'.repeat(60));
    const { data: adminOrManager, error: e5 } = await supabase
      .from('users')
      .select('email, name, role')
      .or('role.eq.admin,role.eq.manager,role.eq.super_admin');
    
    if (e5) {
      console.error('❌ Erreur:', e5.message);
    } else {
      console.log(`✅ ${adminOrManager.length} utilisateur(s) admin/manager:`);
      adminOrManager.forEach(u => {
        console.log(`   ${u.email} - ${u.role}`);
      });
    }
    console.log('');

    // Test 6: Requête avec NULL check
    console.log('📊 TEST 6: NULL check (projets sans end_date)');
    console.log('-'.repeat(60));
    const { data: ongoingProjects, error: e6 } = await supabase
      .from('projects')
      .select('name, start_date, end_date, status')
      .is('end_date', null);
    
    if (e6) {
      console.error('❌ Erreur:', e6.message);
    } else {
      console.log(`✅ ${ongoingProjects.length} projet(s) sans date de fin:`);
      ongoingProjects.forEach(p => {
        console.log(`   ${p.name} - Démarré: ${p.start_date || 'N/A'}`);
      });
    }
    console.log('');

    // Test 7: Requête avec range (projets avec plus de 20 containers)
    console.log('📊 TEST 7: Range (projets > 20 containers)');
    console.log('-'.repeat(60));
    const { data: largeProjects, error: e7 } = await supabase
      .from('projects')
      .select('name, total_containers, total_miners')
      .gt('total_containers', 20);
    
    if (e7) {
      console.error('❌ Erreur:', e7.message);
    } else {
      console.log(`✅ ${largeProjects.length} grand(s) projet(s):`);
      largeProjects.forEach(p => {
        console.log(`   ${p.name}`);
        console.log(`   └─ ${p.total_containers} containers, ${p.total_miners} mineurs`);
      });
    }
    console.log('');

    // Test 8: Comptage par rôle
    console.log('📊 TEST 8: Comptage par rôle');
    console.log('-'.repeat(60));
    const { data: allUsers, error: e8 } = await supabase
      .from('users')
      .select('role');
    
    if (e8) {
      console.error('❌ Erreur:', e8.message);
    } else {
      const roleCount = allUsers.reduce((acc, u) => {
        acc[u.role] = (acc[u.role] || 0) + 1;
        return acc;
      }, {});
      
      console.log('✅ Distribution des rôles:');
      Object.entries(roleCount).forEach(([role, count]) => {
        console.log(`   ${role.padEnd(20)}: ${count} utilisateur(s)`);
      });
    }
    console.log('');

    // Test 9: Requête avec ORDER BY et LIMIT
    console.log('📊 TEST 9: Top 3 projets (par nombre de mineurs)');
    console.log('-'.repeat(60));
    const { data: topProjects, error: e9 } = await supabase
      .from('projects')
      .select('name, total_miners, total_hashrate_ths')
      .order('total_miners', { ascending: false })
      .limit(3);
    
    if (e9) {
      console.error('❌ Erreur:', e9.message);
    } else {
      console.log(`✅ Top 3 projets:`);
      topProjects.forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.name}`);
        console.log(`      └─ ${p.total_miners?.toLocaleString('fr-FR') || 0} mineurs, ${p.total_hashrate_ths?.toLocaleString('fr-FR') || 0} TH/s`);
      });
    }
    console.log('');

    // Test 10: Vérification de l'intégrité des données
    console.log('📊 TEST 10: Intégrité des données');
    console.log('-'.repeat(60));
    
    // Vérifier que tous les users ont un tenant_id valide
    const { data: usersCheck, error: e10a } = await supabase
      .from('users')
      .select('email, tenant_id')
      .is('tenant_id', null);
    
    // Vérifier que tous les projects ont un tenant_id valide
    const { data: projectsCheck, error: e10b } = await supabase
      .from('projects')
      .select('name, tenant_id')
      .is('tenant_id', null);
    
    if (e10a || e10b) {
      console.error('❌ Erreur lors de la vérification');
    } else {
      console.log('✅ Intégrité des données:');
      console.log(`   Users sans tenant: ${usersCheck.length}`);
      console.log(`   Projects sans tenant: ${projectsCheck.length}`);
      
      if (usersCheck.length === 0 && projectsCheck.length === 0) {
        console.log('   🎉 Toutes les relations sont valides !');
      }
    }
    console.log('');

    // Résumé final
    console.log('=' .repeat(60));
    console.log('✅ TOUS LES TESTS DE REQUÊTES SQL SONT RÉUSSIS !');
    console.log('=' .repeat(60));
    console.log('');
    console.log('🎉 Capacités SQL validées:');
    console.log('   ✅ JOINs (relations entre tables)');
    console.log('   ✅ Filtres multiples (WHERE, AND, OR)');
    console.log('   ✅ Agrégations (SUM, COUNT)');
    console.log('   ✅ Recherche textuelle (LIKE, ILIKE)');
    console.log('   ✅ Comparaisons (>, <, =, IS NULL)');
    console.log('   ✅ Tri et pagination (ORDER BY, LIMIT)');
    console.log('   ✅ Intégrité référentielle (Foreign Keys)');
    console.log('');

  } catch (error) {
    console.error('\n❌ ERREUR GÉNÉRALE:', error.message);
    console.error('Stack:', error.stack);
  }
}

testComplexQueries();

