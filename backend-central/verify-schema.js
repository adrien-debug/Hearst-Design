/**
 * Vérification du schéma de la base de données Supabase
 * Liste toutes les tables disponibles
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

console.log('\n🔍 VÉRIFICATION DU SCHÉMA SUPABASE\n');
console.log('=' .repeat(60));

const supabase = createClient(supabaseUrl, supabaseKey);

// Liste des tables à vérifier
const tablesToCheck = [
  'tenants',
  'users',
  'projects',
  'permissions',
  'audit_logs',
  'user_sessions',
  'project_settings'
];

async function verifySchema() {
  console.log('📋 Tables à vérifier:\n');
  
  for (const table of tablesToCheck) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.log(`❌ ${table.padEnd(20)} - ERREUR: ${error.message}`);
      } else {
        console.log(`✅ ${table.padEnd(20)} - ${count} enregistrement(s)`);
      }
    } catch (err) {
      console.log(`❌ ${table.padEnd(20)} - EXCEPTION: ${err.message}`);
    }
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('\n📊 DÉTAILS DES TABLES EXISTANTES:\n');
  
  // Détails pour chaque table existante
  const existingTables = ['tenants', 'users', 'projects'];
  
  for (const table of existingTables) {
    console.log(`\n🔹 Table: ${table.toUpperCase()}`);
    console.log('-'.repeat(60));
    
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (data && data.length > 0) {
        const columns = Object.keys(data[0]);
        console.log('Colonnes disponibles:');
        columns.forEach(col => {
          const value = data[0][col];
          const type = typeof value;
          console.log(`   - ${col.padEnd(25)} (${type})`);
        });
      } else {
        console.log('Table vide - impossible de détecter les colonnes');
      }
    } catch (err) {
      console.log(`Erreur: ${err.message}`);
    }
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('\n✅ Vérification terminée\n');
}

verifySchema();

