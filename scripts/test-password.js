/**
 * Test du hash de mot de passe
 */

const bcrypt = require('bcryptjs');

const password = '<REDACTED>';
const hashFromDB = '$2a$10$rFKwEzYhQ6xqVz.iyKV8YOxfXRp.KNJKZy9QsT8H4ggO5YPQXvPea';

console.log('🔐 Test du hash de mot de passe\n');
console.log('Mot de passe:', password);
console.log('Hash DB:', hashFromDB);
console.log('');

// Test si le hash correspond
bcrypt.compare(password, hashFromDB).then(isValid => {
  console.log('✅ Hash valide:', isValid);
  
  if (!isValid) {
    console.log('\n❌ Le hash ne correspond pas !');
    console.log('🔧 Génération d\'un nouveau hash...\n');
    
    // Générer un nouveau hash
    bcrypt.hash(password, 10).then(newHash => {
      console.log('✅ Nouveau hash généré:');
      console.log(newHash);
      console.log('');
      console.log('📝 Requête SQL pour mettre à jour:');
      console.log('');
      console.log(`UPDATE users SET password_hash = '${newHash}' WHERE email = 'admin@hearstmining.com';`);
    });
  } else {
    console.log('\n✅ Le hash est correct ! Le problème vient d\'ailleurs.');
  }
});

