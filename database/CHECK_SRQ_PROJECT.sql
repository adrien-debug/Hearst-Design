-- Vérifier si le projet Strategic Reserve Qatar existe
SELECT 
  id,
  name,
  status,
  total_containers,
  total_miners,
  ROUND(total_hashrate_ths / 1000000.0, 2) as hashrate_ehs,
  ROUND(total_power_mw, 2) as power_mw,
  start_date,
  api_endpoint,
  frontend_url
FROM projects
WHERE id LIKE '%SRQ%' OR id LIKE '%AQUA%' OR name LIKE '%Strategic%' OR name LIKE '%Reserve%';

-- Tous les projets
SELECT id, name, status FROM projects ORDER BY id;

