-- ============================================================================
-- FIX PASSWORD - Correction du hash du mot de passe admin
-- ============================================================================
-- Le hash original ne correspondait pas au mot de passe
-- Ce script corrige le hash pour le mot de passe: <REDACTED>
-- ============================================================================

UPDATE users 
SET password_hash = '$2a$10$M5/QnmsQXA2AMvSduPp/ceABXSqQN6T7bj7WovQneBoX.6WKBVrXe' 
WHERE email = 'admin@hearstmining.com';

-- Vérification
SELECT 
  email, 
  name, 
  role,
  LEFT(password_hash, 30) || '...' as password_preview,
  'Hash mis à jour ✅' as status
FROM users 
WHERE email = 'admin@hearstmining.com';

