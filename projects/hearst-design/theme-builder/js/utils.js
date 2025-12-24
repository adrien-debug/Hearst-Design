/**
 * UTILS.JS - Utilitaires (REFONTE v3.0)
 * Hearst Design System
 */

// ==================== LOCAL STORAGE ====================

const STORAGE_KEYS = {
  THEMES: 'hearst-saved-themes',
  CURRENT_THEME: 'hearst-current-palette',
  SETTINGS: 'hearst-settings'
};

/**
 * Récupère les thèmes sauvegardés
 * @returns {Array} Thèmes sauvegardés
 */
export function getSavedThemes() {
  try {
    const themes = localStorage.getItem(STORAGE_KEYS.THEMES);
    return themes ? JSON.parse(themes) : [];
  } catch (e) {
    console.error('Error reading saved themes:', e);
    return [];
  }
}

/**
 * Sauvegarde un thème
 * @param {Object} theme - Thème à sauvegarder
 */
export function saveThemeToStorage(theme) {
  try {
    const themes = getSavedThemes();
    themes.push(theme);
    localStorage.setItem(STORAGE_KEYS.THEMES, JSON.stringify(themes));
  } catch (e) {
    console.error('Error saving theme:', e);
  }
}

/**
 * Supprime un thème
 * @param {string} themeId - ID du thème
 */
export function deleteThemeFromStorage(themeId) {
  try {
    const themes = getSavedThemes().filter(t => t.id !== themeId);
    localStorage.setItem(STORAGE_KEYS.THEMES, JSON.stringify(themes));
  } catch (e) {
    console.error('Error deleting theme:', e);
  }
}

/**
 * Définit le thème courant
 * @param {string} themeId - ID du thème
 */
export function setCurrentTheme(themeId) {
  localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, themeId);
}

/**
 * Récupère le thème courant
 * @returns {string|null} ID du thème courant
 */
export function getCurrentTheme() {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_THEME);
}

// ==================== ID GENERATION ====================

/**
 * Génère un ID unique
 * @param {string} prefix - Préfixe optionnel
 * @returns {string} ID unique
 */
export function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ==================== DEBOUNCE / THROTTLE ====================

/**
 * Debounce une fonction
 * @param {Function} func - Fonction à debouncer
 * @param {number} wait - Délai en ms
 * @returns {Function} Fonction debouncée
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle une fonction
 * @param {Function} func - Fonction à throttler
 * @param {number} limit - Délai minimum en ms
 * @returns {Function} Fonction throttlée
 */
export function throttle(func, limit = 100) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ==================== COLOR UTILITIES ====================

/**
 * Convertit hex en RGB
 * @param {string} hex - Couleur hex
 * @returns {Object} RGB values
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Convertit RGB en hex
 * @param {number} r - Rouge
 * @param {number} g - Vert
 * @param {number} b - Bleu
 * @returns {string} Couleur hex
 */
export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Éclaircit une couleur
 * @param {string} color - Couleur hex
 * @param {number} percent - Pourcentage
 * @returns {string} Couleur éclaircie
 */
export function lightenColor(color, percent) {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const amount = Math.round(2.55 * percent);
  return rgbToHex(
    Math.min(255, rgb.r + amount),
    Math.min(255, rgb.g + amount),
    Math.min(255, rgb.b + amount)
  );
}

/**
 * Assombrit une couleur
 * @param {string} color - Couleur hex
 * @param {number} percent - Pourcentage
 * @returns {string} Couleur assombrie
 */
export function darkenColor(color, percent) {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const amount = Math.round(2.55 * percent);
  return rgbToHex(
    Math.max(0, rgb.r - amount),
    Math.max(0, rgb.g - amount),
    Math.max(0, rgb.b - amount)
  );
}

/**
 * Ajoute de l'alpha à une couleur
 * @param {string} color - Couleur hex
 * @param {number} alpha - Alpha (0-1)
 * @returns {string} Couleur rgba
 */
export function addAlpha(color, alpha) {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

// ==================== KEYBOARD SHORTCUTS ====================

/**
 * Configure les raccourcis clavier globaux
 */
export function setupKeyboardShortcuts() {
  // Note: Main shortcuts are now handled in app.js
  console.log('✅ Keyboard shortcuts ready');
}

// ==================== GLOBAL EXPORTS ====================

if (typeof window !== 'undefined') {
  window.generateId = generateId;
  window.getSavedThemes = getSavedThemes;
  window.saveThemeToStorage = saveThemeToStorage;
  window.deleteThemeFromStorage = deleteThemeFromStorage;
}
