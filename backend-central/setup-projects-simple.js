/**
 * HEARST CONTROL - Setup Projects (Simplifié)
 * Ajoute uniquement Design et SRQ sans colonnes complexes
 */

require('dotenv').config();
const { createSupabaseClientFromEnv } = require('../core/database/supabaseClient');

const supabase = createSupabaseClientFromEnv();

// Configuration des projets (format simple)
const PROJECTS = [
  {
    id: 'hearst-design',
    name: 'Hearst Design',
    description: 'Projet de design et prototypage pour les interfaces Hearst',
    location: 'Paris, France',
    status: 'active',
    api_endpoint: 'http://localhost:3002',
    frontend_url: 'http://localhost:3100',
    total_containers: 0,
    total_miners: 0,
  },
  {
    id: 'hearst-strategic-reserve-qatar',
    name: 'Strategic Reserve Qatar',
    description: 'Gestion d\'opérations minières Bitcoin - Strategic Reserve au Qatar',
    location: 'Qatar',
    status: 'active',
    api_endpoint: 'http://localhost:3003',
    frontend_url: 'http://localhost:3100',
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
  console.log('║              (Version Simplifiée)                    ║');
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

      if (checkError && checkError.code !== 'PGRST116') {
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
      .select('id, name, status')
      .order('created_at', { ascending: false });

    if (error) throw error;

    console.log('📋 All Projects in Database:');
    console.log('');
    allProjects.forEach((p, index) => {
      const emoji = p.id.includes('design') ? '🎨' : '🇶🇦';
      console.log(`   ${index + 1}. ${emoji} ${p.name}`);
      console.log(`      ID: ${p.id}`);
      console.log(`      Status: ${p.status}`);
      console.log('');
    });
  } catch (error) {
    console.error('❌ Error listing projects:', error.message);
  }

  console.log('🎯 Dashboard: http://localhost:3100/dashboard');
  console.log('🔑 Login: http://localhost:4000/login');
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

