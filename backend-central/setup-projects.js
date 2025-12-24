/**
 * HEARST CONTROL - Setup Projects
 * Ajoute automatiquement les projets Design et SRQ à la base de données
 */

require('dotenv').config();
const { createSupabaseClientFromEnv } = require('../core/database/supabaseClient');

const supabase = createSupabaseClientFromEnv();

// Configuration des projets
const PROJECTS = [
  {
    id: 'hearst-design',
    name: 'Hearst Design',
    slug: 'hearst-design',
    description: 'Projet web de design et prototypage pour les interfaces Hearst',
    location: 'Paris, France',
    status: 'active',
    icon: '🎨',
    color: '#9B59B6',
    port: 3002,
    api_endpoint: 'http://localhost:3002',
    frontend_url: 'http://localhost:3002',
    tenant_id: 'hearst-global',
    total_containers: 0,
    total_miners: 0,
    notes: 'Projet de design UI/UX pour la plateforme Hearst',
  },
  {
    id: 'hearst-strategic-reserve-qatar',
    name: 'Strategic Reserve Qatar',
    slug: 'hearst-strategic-reserve-qatar',
    description: 'Gestion d\'opérations minières Bitcoin - Strategic Reserve au Qatar avec 30 containers ANTSPACE HD5',
    location: 'Qatar',
    status: 'active',
    icon: '🇶🇦',
    color: '#F39C12',
    port: 3003,
    api_endpoint: 'http://localhost:3003',
    frontend_url: 'http://localhost:3100',
    tenant_id: 'hearst-global',
    total_containers: 30,
    total_miners: 9240,
    total_hashrate_ths: 4369920,
    total_power_mw: 52.95,
    container_model: 'ANTSPACE HD5',
    miners_per_container: 308,
    miner_model: 'S21XP Hydro',
    miner_hashrate: 473,
    miner_power_w: 5676,
    notes: 'Strategic Reserve Qatar - 30 containers, 9240 miners, 4.37 EH/s',
    start_date: '2025-01-01',
  },
];

async function addProjects() {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║                                                      ║');
  console.log('║     🏢 HEARST CONTROL - SETUP PROJECTS              ║');
  console.log('║                                                      ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  let successCount = 0;
  let errorCount = 0;

  for (const project of PROJECTS) {
    try {
      console.log(`📦 Adding project: ${project.name}...`);

      // Vérifier si le projet existe déjà
      const { data: existing, error: checkError } = await supabase
        .from('projects')
        .select('id')
        .eq('id', project.id)
        .maybeSingle();

      if (checkError) {
        throw checkError;
      }

      let result;
      if (existing) {
        // Mettre à jour le projet existant
        console.log(`   ⚠️  Project exists, updating...`);
        const { data, error } = await supabase
          .from('projects')
          .update({
            ...project,
            updated_at: new Date().toISOString(),
          })
          .eq('id', project.id)
          .select()
          .single();

        if (error) throw error;
        result = data;
        console.log(`   ✅ Project updated: ${project.name}`);
      } else {
        // Insérer un nouveau projet
        const { data, error } = await supabase
          .from('projects')
          .insert([project])
          .select()
          .single();

        if (error) throw error;
        result = data;
        console.log(`   ✅ Project added: ${project.name}`);
      }

      // Afficher les détails
      console.log(`   📍 Location: ${project.location}`);
      console.log(`   🔢 Port: ${project.port}`);
      console.log(`   🌐 API: ${project.api_endpoint}`);
      if (project.total_containers > 0) {
        console.log(`   📦 Containers: ${project.total_containers}`);
        console.log(`   ⚙️  Miners: ${project.total_miners.toLocaleString()}`);
        console.log(`   ⚡ Hashrate: ${(project.total_hashrate_ths / 1000000).toFixed(2)} EH/s`);
      }
      console.log('');

      successCount++;
    } catch (error) {
      console.error(`   ❌ Error adding ${project.name}:`, error.message);
      console.log('');
      errorCount++;
    }
  }

  // Résumé
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║                                                      ║');
  console.log('║               ✅ SETUP COMPLETED                     ║');
  console.log('║                                                      ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  console.log(`📊 Results:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log('');

  // Lister tous les projets
  try {
    const { data: allProjects, error } = await supabase
      .from('projects')
      .select('id, name, slug, status, icon, port')
      .order('created_at', { ascending: false });

    if (error) throw error;

    console.log('📋 All Projects in Database:');
    console.log('');
    allProjects.forEach((p, index) => {
      console.log(`   ${index + 1}. ${p.icon} ${p.name}`);
      console.log(`      ID: ${p.id}`);
      console.log(`      Slug: ${p.slug}`);
      console.log(`      Status: ${p.status}`);
      console.log(`      Port: ${p.port || 'N/A'}`);
      console.log('');
    });
  } catch (error) {
    console.error('❌ Error listing projects:', error.message);
  }

  // Instructions suivantes
  console.log('🚀 Next Steps:');
  console.log('');
  console.log('   1. Start all services:');
  console.log('      ./scripts/start-all.sh');
  console.log('');
  console.log('   2. Open Frontend Central:');
  console.log('      http://localhost:3100');
  console.log('');
  console.log('   3. Login with admin credentials');
  console.log('');
  console.log('   4. Access projects from dashboard');
  console.log('');
}

// Exécuter
addProjects()
  .then(() => {
    console.log('✅ Script completed successfully\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });

