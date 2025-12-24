/**
 * THEME-MANAGER.JS - Gestion des Thèmes (REFONTE v3.0)
 * Hearst Design System
 * 
 * IMPORTANT: Applique les styles UNIQUEMENT dans .preview-zone
 * Ne touche JAMAIS aux variables --app-* de l'interface
 */

import { showToast } from './ui-controls.js';
import { getSavedThemes, saveThemeToStorage, deleteThemeFromStorage, generateId } from './utils.js';

// ==================== PALETTES PRÉDÉFINIES ====================

const predefinedPalettes = {
  'hearst-qatar': {
    id: 'hearst-qatar',
    name: 'Hearst Qatar',
    description: 'Vert Hearst #8AFD81 • Glassmorphism • Premium',
    gradient: 'linear-gradient(135deg, #8afd81 0%, #6fdc66 100%)',
    background: {
      bgPrimary: '#0a0a0a',
      bgSecondary: '#111111',
      bgTertiary: '#1a1a1a',
      bgElevated: '#222222',
      bgCard: 'rgba(17, 17, 17, 0.8)',
      bgCardHover: 'rgba(26, 26, 26, 0.9)'
    },
    text: {
      textPrimary: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      textTertiary: 'rgba(255, 255, 255, 0.5)',
      textOnAccent: '#000000'
    },
    accents: {
      accentPrimary: '#8afd81',
      accentSecondary: '#7ae872',
      accentTertiary: '#6fdc66',
      accentLight: '#9dff96',
      accentMuted: 'rgba(138, 253, 129, 0.15)'
    },
    borders: {
      borderSubtle: 'rgba(255, 255, 255, 0.06)',
      borderDefault: 'rgba(255, 255, 255, 0.1)',
      borderStrong: 'rgba(255, 255, 255, 0.15)',
      borderAccent: 'rgba(138, 253, 129, 0.3)'
    },
    effects: {
      glow: '0 0 20px rgba(138, 253, 129, 0.3)',
      glowStrong: '0 0 40px rgba(138, 253, 129, 0.4)'
    }
  },
  
  'dark-pro': {
    id: 'dark-pro',
    name: 'Dark Pro',
    description: 'Emerald accent • Clean dark • Professional',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    background: {
      bgPrimary: '#0f172a',
      bgSecondary: '#1e293b',
      bgTertiary: '#334155',
      bgElevated: '#475569',
      bgCard: 'rgba(30, 41, 59, 0.8)',
      bgCardHover: 'rgba(51, 65, 85, 0.9)'
    },
    text: {
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textTertiary: '#94a3b8',
      textOnAccent: '#000000'
    },
    accents: {
      accentPrimary: '#10b981',
      accentSecondary: '#059669',
      accentTertiary: '#047857',
      accentLight: '#34d399',
      accentMuted: 'rgba(16, 185, 129, 0.15)'
    },
    borders: {
      borderSubtle: 'rgba(148, 163, 184, 0.08)',
      borderDefault: 'rgba(148, 163, 184, 0.12)',
      borderStrong: 'rgba(148, 163, 184, 0.2)',
      borderAccent: 'rgba(16, 185, 129, 0.3)'
    },
    effects: {
      glow: '0 0 20px rgba(16, 185, 129, 0.3)',
      glowStrong: '0 0 40px rgba(16, 185, 129, 0.4)'
    }
  },
  
  'light-clean': {
    id: 'light-clean',
    name: 'Light Clean',
    description: 'Sky blue accent • Light theme • Modern',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    background: {
      bgPrimary: '#ffffff',
      bgSecondary: '#f8fafc',
      bgTertiary: '#f1f5f9',
      bgElevated: '#e2e8f0',
      bgCard: 'rgba(255, 255, 255, 0.9)',
      bgCardHover: 'rgba(248, 250, 252, 1)'
    },
    text: {
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      textTertiary: '#64748b',
      textOnAccent: '#ffffff'
    },
    accents: {
      accentPrimary: '#0ea5e9',
      accentSecondary: '#0284c7',
      accentTertiary: '#0369a1',
      accentLight: '#38bdf8',
      accentMuted: 'rgba(14, 165, 233, 0.15)'
    },
    borders: {
      borderSubtle: 'rgba(15, 23, 42, 0.06)',
      borderDefault: 'rgba(15, 23, 42, 0.1)',
      borderStrong: 'rgba(15, 23, 42, 0.15)',
      borderAccent: 'rgba(14, 165, 233, 0.3)'
    },
    effects: {
      glow: '0 0 20px rgba(14, 165, 233, 0.2)',
      glowStrong: '0 0 40px rgba(14, 165, 233, 0.3)'
    }
  },
  
  'blue-tech': {
    id: 'blue-tech',
    name: 'Blue Tech',
    description: 'Cyan accent • Tech dashboard • Modern',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    background: {
      bgPrimary: '#0a1929',
      bgSecondary: '#0d2137',
      bgTertiary: '#112a45',
      bgElevated: '#1a3a5c',
      bgCard: 'rgba(13, 33, 55, 0.8)',
      bgCardHover: 'rgba(17, 42, 69, 0.9)'
    },
    text: {
      textPrimary: '#e0f2fe',
      textSecondary: '#bae6fd',
      textTertiary: '#7dd3fc',
      textOnAccent: '#000000'
    },
    accents: {
      accentPrimary: '#06b6d4',
      accentSecondary: '#0891b2',
      accentTertiary: '#0e7490',
      accentLight: '#22d3ee',
      accentMuted: 'rgba(6, 182, 212, 0.15)'
    },
    borders: {
      borderSubtle: 'rgba(125, 211, 252, 0.08)',
      borderDefault: 'rgba(125, 211, 252, 0.12)',
      borderStrong: 'rgba(125, 211, 252, 0.2)',
      borderAccent: 'rgba(6, 182, 212, 0.3)'
    },
    effects: {
      glow: '0 0 20px rgba(6, 182, 212, 0.3)',
      glowStrong: '0 0 40px rgba(6, 182, 212, 0.4)'
    }
  },
  
  'purple-night': {
    id: 'purple-night',
    name: 'Purple Night',
    description: 'Violet accent • Night mode • Creative',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
    background: {
      bgPrimary: '#0f0a1a',
      bgSecondary: '#1a1225',
      bgTertiary: '#251a35',
      bgElevated: '#312345',
      bgCard: 'rgba(26, 18, 37, 0.8)',
      bgCardHover: 'rgba(37, 26, 53, 0.9)'
    },
    text: {
      textPrimary: '#faf5ff',
      textSecondary: '#e9d5ff',
      textTertiary: '#c4b5fd',
      textOnAccent: '#000000'
    },
    accents: {
      accentPrimary: '#a855f7',
      accentSecondary: '#9333ea',
      accentTertiary: '#7c3aed',
      accentLight: '#c084fc',
      accentMuted: 'rgba(168, 85, 247, 0.15)'
    },
    borders: {
      borderSubtle: 'rgba(196, 181, 253, 0.08)',
      borderDefault: 'rgba(196, 181, 253, 0.12)',
      borderStrong: 'rgba(196, 181, 253, 0.2)',
      borderAccent: 'rgba(168, 85, 247, 0.3)'
    },
    effects: {
      glow: '0 0 20px rgba(168, 85, 247, 0.3)',
      glowStrong: '0 0 40px rgba(168, 85, 247, 0.4)'
    }
  },

  'orange-fire': {
    id: 'orange-fire',
    name: 'Orange Fire',
    description: 'Orange accent • Energy • Bold',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    background: {
      bgPrimary: '#1a0f0a',
      bgSecondary: '#251812',
      bgTertiary: '#35211a',
      bgElevated: '#452b22',
      bgCard: 'rgba(37, 24, 18, 0.8)',
      bgCardHover: 'rgba(53, 33, 26, 0.9)'
    },
    text: {
      textPrimary: '#fff7ed',
      textSecondary: '#fed7aa',
      textTertiary: '#fdba74',
      textOnAccent: '#000000'
    },
    accents: {
      accentPrimary: '#f97316',
      accentSecondary: '#ea580c',
      accentTertiary: '#c2410c',
      accentLight: '#fb923c',
      accentMuted: 'rgba(249, 115, 22, 0.15)'
    },
    borders: {
      borderSubtle: 'rgba(253, 186, 116, 0.08)',
      borderDefault: 'rgba(253, 186, 116, 0.12)',
      borderStrong: 'rgba(253, 186, 116, 0.2)',
      borderAccent: 'rgba(249, 115, 22, 0.3)'
    },
    effects: {
      glow: '0 0 20px rgba(249, 115, 22, 0.3)',
      glowStrong: '0 0 40px rgba(249, 115, 22, 0.4)'
    }
  }
};

// ==================== THEME MANAGER CLASS ====================

export class ThemeManager {
  constructor() {
    this.palettes = { ...predefinedPalettes };
    this.currentPalette = 'hearst-qatar';
    this.previewElement = null;
  }

  /**
   * Initialise le gestionnaire de thèmes
   */
  init() {
    // Trouver la zone de preview
    this.previewElement = document.querySelector('.preview-zone');
    
    if (!this.previewElement) {
      console.warn('⚠️ .preview-zone non trouvée, création différée');
    }
    
    // Charger le thème sauvegardé
    const saved = localStorage.getItem('hearst-current-palette');
    if (saved && this.palettes[saved]) {
      this.applyPalette(saved);
    } else {
      this.applyPalette(this.currentPalette);
    }
    
    console.log('✅ ThemeManager initialisé');
  }

  /**
   * Met à jour la référence à la preview zone
   */
  updatePreviewElement() {
    this.previewElement = document.querySelector('.preview-zone');
    return this.previewElement;
  }

  /**
   * Applique une palette à la zone de preview UNIQUEMENT
   * @param {string} paletteId - ID de la palette
   */
  applyPalette(paletteId) {
    const palette = this.palettes[paletteId];
    
    if (!palette) {
      console.error(`Palette "${paletteId}" non trouvée`);
      return;
    }
    
    // Mettre à jour la référence
    if (!this.previewElement) {
      this.updatePreviewElement();
    }
    
    const target = this.previewElement || document.querySelector('.preview-zone');
    
    if (!target) {
      console.warn('Zone de preview non trouvée, application différée');
      // Sauvegarder quand même pour appliquer plus tard
      this.currentPalette = paletteId;
      localStorage.setItem('hearst-current-palette', paletteId);
      return;
    }
    
    this.currentPalette = paletteId;
    
    // ========================================
    // APPLIQUER LES VARIABLES --preview-*
    // UNIQUEMENT sur .preview-zone
    // ========================================
    
    // Backgrounds
    target.style.setProperty('--preview-bg-primary', palette.background.bgPrimary);
    target.style.setProperty('--preview-bg-secondary', palette.background.bgSecondary);
    target.style.setProperty('--preview-bg-tertiary', palette.background.bgTertiary);
    target.style.setProperty('--preview-bg-elevated', palette.background.bgElevated);
    target.style.setProperty('--preview-bg-card', palette.background.bgCard);
    target.style.setProperty('--preview-bg-card-hover', palette.background.bgCardHover);
    
    // Text
    target.style.setProperty('--preview-text-primary', palette.text.textPrimary);
    target.style.setProperty('--preview-text-secondary', palette.text.textSecondary);
    target.style.setProperty('--preview-text-tertiary', palette.text.textTertiary);
    target.style.setProperty('--preview-text-on-accent', palette.text.textOnAccent);
    
    // Accents
    target.style.setProperty('--preview-accent-primary', palette.accents.accentPrimary);
    target.style.setProperty('--preview-accent-secondary', palette.accents.accentSecondary);
    target.style.setProperty('--preview-accent-tertiary', palette.accents.accentTertiary);
    target.style.setProperty('--preview-accent-light', palette.accents.accentLight);
    target.style.setProperty('--preview-accent-muted', palette.accents.accentMuted);
    
    // Borders
    target.style.setProperty('--preview-border-subtle', palette.borders.borderSubtle);
    target.style.setProperty('--preview-border-default', palette.borders.borderDefault);
    target.style.setProperty('--preview-border-strong', palette.borders.borderStrong);
    target.style.setProperty('--preview-border-accent', palette.borders.borderAccent);
    
    // Effects
    target.style.setProperty('--preview-glow', palette.effects.glow);
    target.style.setProperty('--preview-glow-strong', palette.effects.glowStrong);
    
    // Gradient
    target.style.setProperty('--preview-gradient', palette.gradient);
    target.style.setProperty('--preview-bg-gradient', `radial-gradient(ellipse at top, ${palette.background.bgSecondary} 0%, ${palette.background.bgPrimary} 100%)`);
    
    // Appliquer le fond
    target.style.background = `var(--preview-bg-gradient)`;
    
    // Mettre à jour l'UI
    this.updateActivePaletteUI(paletteId);
    
    // Animation de transition
    this.animateTransition(target);
    
    // Sauvegarder
    localStorage.setItem('hearst-current-palette', paletteId);
    
    // Dispatch event pour notifier les autres modules
    window.dispatchEvent(new CustomEvent('palette-changed', { 
      detail: { paletteId, palette } 
    }));
  }

  /**
   * Met à jour l'UI pour refléter la palette active
   * @param {string} paletteId - ID de la palette active
   */
  updateActivePaletteUI(paletteId) {
    // Mettre à jour les cartes de palette
    document.querySelectorAll('[data-palette]').forEach(card => {
      card.classList.remove('is-active');
      if (card.dataset.palette === paletteId) {
        card.classList.add('is-active');
      }
    });
    
    // Mettre à jour le panel de propriétés
    const paletteName = document.getElementById('currentPaletteName');
    const palettePreview = document.getElementById('currentPalettePreview');
    
    if (paletteName && this.palettes[paletteId]) {
      paletteName.textContent = this.palettes[paletteId].name;
    }
    
    if (palettePreview && this.palettes[paletteId]) {
      const p = this.palettes[paletteId];
      palettePreview.innerHTML = `
        <div class="palette-preview-colors">
          <span style="background: ${p.background.bgPrimary}"></span>
          <span style="background: ${p.accents.accentPrimary}"></span>
          <span style="background: ${p.background.bgSecondary}"></span>
          <span style="background: ${p.text.textPrimary}"></span>
        </div>
      `;
    }
  }

  /**
   * Anime la transition de thème
   * @param {HTMLElement} target - Élément cible
   */
  animateTransition(target) {
    target.style.transition = 'background 300ms ease, color 200ms ease';
    target.classList.add('theme-transitioning');
    
      setTimeout(() => {
      target.classList.remove('theme-transitioning');
    }, 300);
  }

  /**
   * Retourne la palette courante
   * @returns {Object} Palette courante
   */
  getCurrentPalette() {
    return this.palettes[this.currentPalette];
  }

  /**
   * Retourne l'ID de la palette courante
   * @returns {string} ID de la palette
   */
  getCurrentPaletteId() {
    return this.currentPalette;
  }

  /**
   * Retourne toutes les palettes
   * @returns {Object} Toutes les palettes
   */
  getAllPalettes() {
    return this.palettes;
  }

  /**
   * Ajoute une palette custom
   * @param {Object} palette - Palette à ajouter
   * @returns {string} ID de la nouvelle palette
   */
  addCustomPalette(palette) {
    const id = 'custom-' + Date.now();
    this.palettes[id] = {
      id,
      ...palette
    };
    return id;
  }

  /**
   * Supprime une palette custom
   * @param {string} paletteId - ID de la palette
   */
  removeCustomPalette(paletteId) {
    if (paletteId.startsWith('custom-') && this.palettes[paletteId]) {
      delete this.palettes[paletteId];
      return true;
    }
    return false;
  }

  /**
   * Exporte la palette courante en JSON
   * @returns {string} JSON de la palette
   */
  exportCurrentPalette() {
    const palette = this.getCurrentPalette();
    const data = {
      name: palette.name,
      id: this.currentPalette,
      exportedAt: new Date().toISOString(),
      palette: palette
    };
    return JSON.stringify(data, null, 2);
  }

  /**
   * Importe une palette depuis JSON
   * @param {string} json - JSON de la palette
   * @returns {string|null} ID de la palette importée ou null
   */
  importPalette(json) {
    try {
      const data = JSON.parse(json);
      if (data.palette) {
        const id = this.addCustomPalette(data.palette);
        this.applyPalette(id);
        return id;
      }
    } catch (e) {
      console.error('Erreur import palette:', e);
    }
    return null;
  }

  /**
   * Sauvegarde le thème courant
   * @param {string} name - Nom du thème
   */
  saveTheme(name) {
    const theme = {
      id: generateId('theme'),
      name: name || `Theme ${Date.now()}`,
      paletteId: this.currentPalette,
      timestamp: new Date().toISOString()
    };
    
    saveThemeToStorage(theme);
    showToast('success', 'Thème sauvegardé', `"${theme.name}" a été sauvegardé`);
    return theme;
  }

  /**
   * Charge un thème sauvegardé
   * @param {string} themeId - ID du thème
   */
  loadTheme(themeId) {
    const themes = getSavedThemes();
    const theme = themes.find(t => t.id === themeId);
    
    if (theme && theme.paletteId && this.palettes[theme.paletteId]) {
      this.applyPalette(theme.paletteId);
      showToast('success', 'Thème chargé', `"${theme.name}" appliqué`);
      return true;
    }
    
    showToast('error', 'Erreur', 'Thème introuvable');
    return false;
  }

  /**
   * Supprime un thème sauvegardé
   * @param {string} themeId - ID du thème
   */
  deleteTheme(themeId) {
    deleteThemeFromStorage(themeId);
    showToast('success', 'Supprimé', 'Thème supprimé');
  }
}

// ==================== INSTANCE SINGLETON ====================

const themeManager = new ThemeManager();
export default themeManager;

// ==================== EXPOSITION GLOBALE ====================

if (typeof window !== 'undefined') {
  window.themeManager = themeManager;
  
  // Fonctions globales pour les événements inline
  window.applyPalette = (id) => themeManager.applyPalette(id);
  window.getCurrentPalette = () => themeManager.getCurrentPalette();
  window.getAllPalettes = () => themeManager.getAllPalettes();
  window.exportTheme = () => {
    const json = themeManager.exportCurrentPalette();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hearst-theme-${themeManager.getCurrentPaletteId()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('success', 'Exporté', 'Thème téléchargé');
  };
}
