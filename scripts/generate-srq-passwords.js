const bcrypt = require('bcryptjs');

console.log('\n🔐 Génération des hash pour SRQ\n');

// Password pour operator@srq.qa
const operatorPassword = '<REDACTED>';
bcrypt.hash(operatorPassword, 10).then(hash => {
  console.log('Opérateur SRQ:');
  console.log('Email   : operator@srq.qa');
  console.log('Password:', operatorPassword);
  console.log('Hash    :', hash);
  console.log('');
  
  // Password pour manager@srq.qa
  const managerPassword = '<REDACTED>';
  bcrypt.hash(managerPassword, 10).then(hash2 => {
    console.log('Manager SRQ:');
    console.log('Email   : manager@srq.qa');
    console.log('Password:', managerPassword);
    console.log('Hash    :', hash2);
    console.log('');
    
    console.log('-- SQL pour mettre à jour:');
    console.log('');
    console.log(`UPDATE users SET password_hash = '${hash}' WHERE email = 'operator@srq.qa';`);
    console.log(`UPDATE users SET password_hash = '${hash2}' WHERE email = 'manager@srq.qa';`);
  });
});

