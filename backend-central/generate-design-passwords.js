const bcrypt = require('bcryptjs');

console.log('\n🔐 Génération des hash pour Hearst Design\n');

const passwords = [
  { email: 'admin@design.hearst.com', password: '<REDACTED>' },
  { email: 'operator@design.hearst.com', password: '<REDACTED>' },
  { email: 'manager@design.hearst.com', password: '<REDACTED>' }
];

async function generateAll() {
  console.log('📝 Hash générés:\n');
  
  for (const p of passwords) {
    const hash = await bcrypt.hash(p.password, 10);
    console.log(`${p.email}`);
    console.log(`Password: ${p.password}`);
    console.log(`Hash: ${hash}`);
    console.log('');
  }
  
  console.log('-- SQL pour insérer:');
  console.log('');
  
  for (const p of passwords) {
    const hash = await bcrypt.hash(p.password, 10);
    const role = p.email.includes('admin@') ? 'admin' : (p.email.includes('operator') ? 'operator' : 'manager');
    const name = p.email.includes('admin@') ? 'Design Admin' : (p.email.includes('operator') ? 'Design Operator' : 'Design Manager');
    
    console.log(`-- ${name}`);
    console.log(`'${p.email}', '${hash}',`);
  }
}

generateAll();

