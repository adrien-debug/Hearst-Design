#!/usr/bin/env node

/**
 * Script pour créer automatiquement les tables et données pour Hearst Design
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: './projects/hearst-design/backend/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement manquantes');
  console.error('   SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.error('   SUPABASE_SERVICE_KEY:', supabaseServiceKey ? '✅' : '❌');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkTables() {
  console.log('\n🔍 Vérification des tables existantes...\n');
  
  const tables = [
    'tenants',
    'users', 
    'projects',
    'project_metrics',
    'user_project_access',
    'global_alerts',
    'global_metrics'
  ];
  
  const results = {};
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('*').limit(1);
      if (error) {
        results[table] = '❌ N\'existe pas';
      } else {
        const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
        results[table] = `✅ Existe (${count || 0} lignes)`;
      }
    } catch (e) {
      results[table] = '❌ Erreur: ' + e.message;
    }
  }
  
  console.log('📊 État des tables:\n');
  for (const [table, status] of Object.entries(results)) {
    console.log(`   ${table.padEnd(25)} ${status}`);
  }
  
  return results;
}

async function createSchemaIfNeeded() {
  console.log('\n🔧 Vérification du schéma...\n');
  
  // Vérifier si les tables existent
  const { data, error } = await supabase.from('tenants').select('*').limit(1);
  
  if (error && error.message.includes('does not exist')) {
    console.log('⚠️  Les tables de base n\'existent pas.');
    console.log('\n📋 INSTRUCTIONS POUR CRÉER LE SCHÉMA:\n');
    console.log('1. Ouvrez https://app.supabase.com');
    console.log('2. Sélectionnez votre projet');
    console.log('3. Allez dans "SQL Editor" (menu gauche)');
    console.log('4. Cliquez sur "New Query"');
    console.log('5. Copiez le contenu du fichier: FRESH_START.sql');
    console.log('6. Collez dans l\'éditeur SQL');
    console.log('7. Cliquez sur "Run" (ou Cmd/Ctrl + Enter)');
    console.log('\n⏳ Une fois fait, relancez ce script.\n');
    return false;
  }
  
  console.log('✅ Les tables de base existent\n');
  return true;
}

async function setupDesignProject() {
  console.log('\n🎨 Configuration du projet Hearst Design...\n');
  
  // Lire le fichier SQL
  const sqlFile = path.join(__dirname, 'SETUP_DESIGN_COMPLET.sql');
  
  if (!fs.existsSync(sqlFile)) {
    console.error('❌ Fichier SETUP_DESIGN_COMPLET.sql introuvable');
    return false;
  }
  
  const sqlContent = fs.readFileSync(sqlFile, 'utf8');
  
  console.log('📄 Fichier SQL chargé');
  console.log('⚠️  ATTENTION: L\'exécution de SQL brut via l\'API Supabase est limitée.\n');
  console.log('📋 INSTRUCTIONS POUR EXÉCUTER LE SCRIPT:\n');
  console.log('1. Ouvrez https://app.supabase.com');
  console.log('2. Sélectionnez votre projet');
  console.log('3. Allez dans "SQL Editor"');
  console.log('4. Cliquez sur "New Query"');
  console.log('5. Copiez le contenu du fichier: SETUP_DESIGN_COMPLET.sql');
  console.log('6. Collez dans l\'éditeur SQL');
  console.log('7. Cliquez sur "Run"\n');
  
  // Vérifier si le projet existe déjà
  const { data: existingProject } = await supabase
    .from('projects')
    .select('*')
    .eq('id', 'DESIGN-001')
    .single();
  
  if (existingProject) {
    console.log('✅ Le projet DESIGN-001 existe déjà!\n');
    console.log('   Nom:', existingProject.name);
    console.log('   Containers:', existingProject.total_containers);
    console.log('   Mineurs:', existingProject.total_miners);
    console.log('   Hashrate:', existingProject.total_hashrate_ehs, 'EH/s');
    return true;
  }
  
  console.log('⏳ Projet DESIGN-001 non trouvé. Exécutez le SQL ci-dessus.\n');
  return false;
}

async function verifyDesignSetup() {
  console.log('\n✅ Vérification de la configuration Hearst Design...\n');
  
  // Vérifier le projet
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', 'DESIGN-001')
    .single();
  
  if (projectError) {
    console.log('❌ Projet DESIGN-001:', projectError.message);
    return false;
  }
  
  console.log('✅ Projet DESIGN-001:', project.name);
  
  // Vérifier les utilisateurs
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('email, name, role')
    .like('email', '%@design.hearst.com');
  
  if (usersError) {
    console.log('❌ Utilisateurs Design:', usersError.message);
  } else {
    console.log(`✅ Utilisateurs Design: ${users.length} utilisateurs`);
    users.forEach(u => console.log(`   - ${u.email} (${u.role})`));
  }
  
  // Vérifier les métriques
  const { data: metrics, error: metricsError } = await supabase
    .from('project_metrics')
    .select('*')
    .eq('project_id', 'DESIGN-001')
    .order('timestamp', { ascending: false })
    .limit(1)
    .single();
  
  if (metricsError) {
    console.log('❌ Métriques:', metricsError.message);
  } else {
    console.log('✅ Métriques:');
    console.log(`   - Containers: ${metrics.operational_containers}/${metrics.total_containers}`);
    console.log(`   - Mineurs: ${metrics.online_miners}/${metrics.total_miners}`);
    console.log(`   - Hashrate: ${metrics.total_hashrate_ehs} EH/s`);
    console.log(`   - Power: ${metrics.total_power_mw} MW`);
  }
  
  console.log('\n🎉 Configuration complète!\n');
  return true;
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║   🎨 SETUP HEARST DESIGN - SUPABASE                   ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  
  try {
    // Étape 1: Vérifier les tables
    await checkTables();
    
    // Étape 2: Vérifier le schéma de base
    const schemaExists = await createSchemaIfNeeded();
    
    if (!schemaExists) {
      console.log('⚠️  Veuillez d\'abord créer le schéma de base (voir instructions ci-dessus)\n');
      process.exit(1);
    }
    
    // Étape 3: Setup du projet Design
    await setupDesignProject();
    
    // Étape 4: Vérification finale
    await verifyDesignSetup();
    
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    process.exit(1);
  }
}

main();

