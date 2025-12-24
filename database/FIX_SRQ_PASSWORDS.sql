-- ============================================================================
-- CORRECTION DES MOTS DE PASSE SRQ
-- ============================================================================

-- Opérateur SRQ: operator@srq.qa / <REDACTED>
UPDATE users 
SET password_hash = '$2a$10$MmaRqK6Z2ZyZ3XFOqpm95eFaJHZQOn//EOjRdKrJdFas3U0lv6p36' 
WHERE email = 'operator@srq.qa';

-- Manager SRQ: manager@srq.qa / <REDACTED>
UPDATE users 
SET password_hash = '$2a$10$0zTmhcfroN7jKvPqN9qO5OgttctnhWeC22mCFRGYbXXuqVFlO0WB2' 
WHERE email = 'manager@srq.qa';

-- Vérification
SELECT 
  email,
  name,
  role,
  LEFT(password_hash, 30) || '...' as password_preview,
  '✅ Hash mis à jour' as status
FROM users
WHERE email LIKE '%@srq.qa'
ORDER BY role;

