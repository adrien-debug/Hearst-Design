/**
 * Test de connexion Supabase
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

console.log('\n🔍 Test de connexion Supabase\n');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'MANQUANTE');
console.log('');

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  try {
    // Test 1: Récupérer les utilisateurs
    console.log('📊 Test 1: Récupération des utilisateurs...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*');
    
    if (usersError) {
      console.error('❌ Erreur:', usersError);
      return;
    }
    
    console.log('✅ Utilisateurs trouvés:', users.length);
    users.forEach(u => {
      console.log(`   - ${u.email} (${u.name}) - Role: ${u.role}`);
    });
    console.log('');
    
    // Test 2: Chercher admin spécifiquement
    console.log('📊 Test 2: Recherche de admin@hearstmining.com...');
    const { data: admin, error: adminError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@hearstmining.com')
      .single();
    
    if (adminError) {
      console.error('❌ Erreur:', adminError);
      return;
    }
    
    if (!admin) {
      console.log('❌ Utilisateur non trouvé !');
      return;
    }
    
    console.log('✅ Utilisateur trouvé:');
    console.log('   Email:', admin.email);
    console.log('   Name:', admin.name);
    console.log('   Role:', admin.role);
    console.log('   Tenant ID:', admin.tenant_id);
    console.log('   Password Hash:', admin.password_hash.substring(0, 30) + '...');
    console.log('');
    
    // Test 3: Test du hash de mot de passe
    console.log('📊 Test 3: Test du mot de passe...');
    const bcrypt = require('bcryptjs');
    const password = '<REDACTED>';
    const isValid = await bcrypt.compare(password, admin.password_hash);
    
    if (isValid) {
      console.log('✅ Mot de passe correct !');
    } else {
      console.log('❌ Mot de passe incorrect !');
      console.log('   Le hash ne correspond pas au mot de passe:', password);
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error);
  }
}

test();

