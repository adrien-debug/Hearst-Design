#!/usr/bin/env node
/**
 * 🔐 HEARST STRATEGIC RESERVE QATAR - PASSWORD GENERATOR
 * 
 * Génère les hash bcrypt pour tous les utilisateurs SRQ
 * Usage: node generate-passwords.js
 * 
 * @project Hearst Strategic Reserve Qatar
 * @version 2.0
 * @date 2024-12-24
 */

const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Configuration
const SALT_ROUNDS = 10;

// Utilisateurs SRQ avec leurs rôles
const users = [
  {
    email: 'admin@srq.hearstmining.com',
    name: 'Admin SRQ',
    role: 'admin',
    password: 'SRQ_Admin_2025!'
  },
  {
    email: 'manager@srq.hearstmining.com',
    name: 'Manager SRQ',
    role: 'manager',
    password: 'SRQ_Manager_2025!'
  },
  {
    email: 'operator@srq.hearstmining.com',
    name: 'Operator SRQ',
    role: 'operator',
    password: 'SRQ_Operator_2025!'
  },
  {
    email: 'viewer@srq.hearstmining.com',
    name: 'Viewer SRQ',
    role: 'viewer',
    password: 'SRQ_Viewer_2025!'
  }
];

// Générer un JWT secret
function generateJWTSecret() {
  return crypto.randomBytes(32).toString('base64');
}

async function generateHashes() {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║  🔐 HEARST STRATEGIC RESERVE QATAR - PASSWORD GENERATOR      ║');
  console.log('║  30 Containers | 9,240 Miners | 4.37 EH/s                    ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  const results = [];
  
  for (const user of users) {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    results.push({ ...user, hash });
    
    console.log(`👤 ${user.role.toUpperCase()}`);
    console.log(`   Email    : ${user.email}`);
    console.log(`   Name     : ${user.name}`);
    console.log(`   Password : ${user.password}`);
    console.log(`   Hash     : ${hash}`);
    console.log('');
  }

  // Générer JWT Secret
  const jwtSecret = generateJWTSecret();
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('🔑 JWT SECRET (à mettre dans .env):');
  console.log(`   JWT_SECRET=${jwtSecret}`);
  console.log('');

  // SQL INSERT statements
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('📝 SQL STATEMENTS - Copier dans Supabase SQL Editor:\n');
  console.log('-- ============================================');
  console.log('-- USERS SRQ - Hearst Strategic Reserve Qatar');
  console.log('-- ============================================\n');
  
  console.log('-- Supprimer les anciens utilisateurs SRQ si existants');
  console.log("DELETE FROM users WHERE email LIKE '%@srq.hearstmining.com';\n");
  
  console.log('-- Insérer les nouveaux utilisateurs');
  console.log('INSERT INTO users (email, password_hash, name, role) VALUES');
  
  const insertValues = results.map((user, index) => {
    const comma = index < results.length - 1 ? ',' : ';';
    return `  ('${user.email}', '${user.hash}', '${user.name}', '${user.role}')${comma}`;
  });
  
  insertValues.forEach(line => console.log(line));
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  // Résumé des logins
  console.log('📋 RÉSUMÉ DES LOGINS:\n');
  console.log('┌──────────────┬────────────────────────────────┬─────────────────────┐');
  console.log('│ Rôle         │ Email                          │ Password            │');
  console.log('├──────────────┼────────────────────────────────┼─────────────────────┤');
  
  for (const user of users) {
    const role = user.role.padEnd(12);
    const email = user.email.padEnd(30);
    const pwd = user.password.padEnd(19);
    console.log(`│ ${role} │ ${email} │ ${pwd} │`);
  }
  
  console.log('└──────────────┴────────────────────────────────┴─────────────────────┘');
  console.log('');
  
  // Configuration .env
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('⚙️  CONFIGURATION .env BACKEND:\n');
  console.log('# Application');
  console.log('NODE_ENV=development');
  console.log('PORT=3003');
  console.log('');
  console.log('# Supabase - À REMPLACER avec vos vraies clés');
  console.log('SUPABASE_URL=https://YOUR_PROJECT.supabase.co');
  console.log('SUPABASE_ANON_KEY=YOUR_ANON_KEY');
  console.log('SUPABASE_SERVICE_KEY=YOUR_SERVICE_KEY');
  console.log('');
  console.log('# JWT');
  console.log(`JWT_SECRET=${jwtSecret}`);
  console.log('');
  console.log('# CORS');
  console.log('CORS_ORIGIN=http://localhost:3100');
  console.log('');
  
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('✅ Génération terminée!\n');
  console.log('📌 PROCHAINES ÉTAPES:');
  console.log('   1. Créer un projet Supabase dédié pour SRQ');
  console.log('   2. Exécuter le schema.sql dans Supabase SQL Editor');
  console.log('   3. Exécuter les INSERT SQL ci-dessus');
  console.log('   4. Copier les clés Supabase dans backend/.env');
  console.log('   5. Démarrer le backend: cd backend && npm start');
  console.log('   6. Démarrer le frontend: cd frontend && npm run dev');
  console.log('');
}

generateHashes().catch(console.error);

