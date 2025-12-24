const bcrypt = require('bcryptjs');

// Utilisateurs hardcodés pour développement
const DEV_USERS = [
  {
    id: '1',
    email: 'admin@hearstmining.com',
    password_hash: '$2a$10$YQ4vXR9J0mQZ5Z5Z5Z5Z5OqHxJy4X1Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z',
    password_plain: 'SecureQatar2024!',
    name: 'Admin Qatar',
    role: 'admin',
    tenant_id: 'qatar-001'
  },
  {
    id: '2',
    email: 'manager@hearstmining.com',
    password_hash: '$2a$10$YQ4vXR9J0mQZ5Z5Z5Z5Z5OqHxJy4X1Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z',
    password_plain: 'ManagerQatar2024!',
    name: 'Manager Qatar',
    role: 'manager',
    tenant_id: 'qatar-001'
  },
  {
    id: '3',
    email: 'operator@hearstmining.com',
    password_hash: '$2a$10$YQ4vXR9J0mQZ5Z5Z5Z5Z5OqHxJy4X1Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z',
    password_plain: 'OperatorQatar2024!',
    name: 'Operator Qatar',
    role: 'operator',
    tenant_id: 'qatar-001'
  }
];

// Générer les hash de mots de passe au démarrage
async function initDevUsers() {
  for (const user of DEV_USERS) {
    user.password_hash = await bcrypt.hash(user.password_plain, 10);
  }
  console.log('✅ Dev users initialized with passwords');
}

function getDevUser(email) {
  return DEV_USERS.find(u => u.email === email);
}

function getAllDevUsers() {
  return DEV_USERS;
}

module.exports = {
  initDevUsers,
  getDevUser,
  getAllDevUsers,
  DEV_USERS
};

