const bcrypt = require('bcryptjs');

// Utilisateurs hardcodés pour développement
const DEV_USERS = [
  {
    id: '1',
    email: 'admin@srq.qa',
    password_hash: '$2a$10$YQ4vXR9J0mQZ5Z5Z5Z5Z5OqHxJy4X1Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z',
    password_plain: 'SecureSRQ2024!',
    name: 'Admin SRQ',
    role: 'admin',
    tenant_id: 'srq-001'
  },
  {
    id: '2',
    email: 'manager@srq.qa',
    password_hash: '$2a$10$YQ4vXR9J0mQZ5Z5Z5Z5Z5OqHxJy4X1Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z',
    password_plain: 'ManagerSRQ2024!',
    name: 'Manager SRQ',
    role: 'manager',
    tenant_id: 'srq-001'
  },
  {
    id: '3',
    email: 'operator@srq.qa',
    password_hash: '$2a$10$YQ4vXR9J0mQZ5Z5Z5Z5Z5OqHxJy4X1Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z',
    password_plain: 'OperatorSRQ2024!',
    name: 'Operator SRQ',
    role: 'operator',
    tenant_id: 'srq-001'
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

