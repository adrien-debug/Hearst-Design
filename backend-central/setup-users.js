/**
 * HEARST CONTROL - Setup Users
 * Crée les utilisateurs de test dans la base de données
 */

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { createSupabaseClientFromEnv } = require('../core/database/supabaseClient');

const supabase = createSupabaseClientFromEnv();

// Configuration des utilisateurs
const USERS = [
  {
    email: 'admin@hearstmining.com',
    password: 'admin123',
    name: 'Super Admin',
    role: 'super_admin',
    phone: '+1-555-0100',
  },
  {
    email: 'design@hearst.com',
    password: 'design123',
    name: 'Design Manager',
    role: 'admin',
    phone: '+33-1-55-0200',
  },
  {
    email: 'srq@hearst.com',
    password: 'srq123',
    name: 'SRQ Manager',
    role: 'admin',
    phone: '+974-555-0300',
  },
];

async function createUsers() {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║                                                      ║');
  console.log('║       🏢 HEARST CONTROL - SETUP USERS               ║');
  console.log('║                                                      ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  let successCount = 0;
  let errorCount = 0;

  for (const user of USERS) {
    try {
      console.log(`👤 Creating user: ${user.name} (${user.email})...`);

      // Vérifier si l'utilisateur existe déjà
      const { data: existing, error: checkError } = await supabase
        .from('users')
        .select('id, email')
        .eq('email', user.email)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existing) {
        console.log(`   ⚠️  User already exists, updating password...`);
        
        // Hasher le nouveau mot de passe
        const password_hash = await bcrypt.hash(user.password, 10);
        
        // Mettre à jour l'utilisateur
        const { error: updateError } = await supabase
          .from('users')
          .update({
            password_hash,
            role: user.role,
            name: user.name,
            phone: user.phone,
            is_active: true,
            updated_at: new Date().toISOString(),
          })
          .eq('email', user.email);

        if (updateError) throw updateError;
        
        console.log(`   ✅ User updated: ${user.email}`);
      } else {
        // Créer un nouvel utilisateur
        const password_hash = await bcrypt.hash(user.password, 10);
        
        const { data, error } = await supabase
          .from('users')
          .insert([{
            email: user.email,
            password_hash,
            name: user.name,
            role: user.role,
            phone: user.phone,
            is_active: true,
          }])
          .select()
          .single();

        if (error) throw error;
        
        console.log(`   ✅ User created: ${user.email}`);
      }

      // Afficher les détails
      console.log(`   👤 Name: ${user.name}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   🔑 Password: ${user.password}`);
      console.log(`   👑 Role: ${user.role}`);
      console.log('');

      successCount++;
    } catch (error) {
      console.error(`   ❌ Error creating ${user.email}:`, error.message);
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

  // Lister tous les utilisateurs
  try {
    const { data: allUsers, error } = await supabase
      .from('users')
      .select('email, name, role, is_active')
      .order('created_at', { ascending: false });

    if (error) throw error;

    console.log('📋 All Users in Database:');
    console.log('');
    allUsers.forEach((u, index) => {
      const status = u.is_active ? '✅' : '❌';
      console.log(`   ${index + 1}. ${status} ${u.name}`);
      console.log(`      Email: ${u.email}`);
      console.log(`      Role: ${u.role}`);
      console.log('');
    });
  } catch (error) {
    console.error('❌ Error listing users:', error.message);
  }

  // Instructions suivantes
  console.log('🚀 Next Steps:');
  console.log('');
  console.log('   1. Open the quick login page:');
  console.log('      open quick-login-hearst-control.html');
  console.log('');
  console.log('   2. Click on any account to select it');
  console.log('');
  console.log('   3. Click "⚡ Connexion Auto" to login');
  console.log('');
  console.log('   4. You will be redirected to the dashboard!');
  console.log('');

  // Afficher les credentials
  console.log('🔑 Test Credentials:');
  console.log('');
  USERS.forEach(u => {
    console.log(`   ${u.role === 'super_admin' ? '👑' : '👤'} ${u.name}:`);
    console.log(`      Email: ${u.email}`);
    console.log(`      Password: ${u.password}`);
    console.log('');
  });
}

// Exécuter
createUsers()
  .then(() => {
    console.log('✅ Script completed successfully\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });

