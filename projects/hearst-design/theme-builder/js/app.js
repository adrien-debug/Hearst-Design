/**
 * APP.JS - Point d'Entrée Principal (REFONTE v4.0)
 * Hearst Design System
 * 
 * Architecture modulaire ES6 avec gestion d'état optimisée
 * @version 4.0.0
 * @author Hearst Team
 */

import themeManager from './theme-manager.js';
import { showToast, initUIControls } from './ui-controls.js';
import { setupKeyboardShortcuts, getSavedThemes } from './utils.js';

// Constants
const APP_VERSION = '4.0.0';
const STORAGE_KEY_PANEL = 'hearst-props-panel-open';
const STORAGE_KEY_PAGES = 'hearst-pages';
const TOAST_DURATION = 3000;

// ==================== APP CLASS ====================

class App {
  constructor() {
    this.version = APP_VERSION;
    this.currentView = 'dashboard';
    this.isPropsPanelOpen = true;
    this.pages = this.loadPagesFromStorage();
    this.currentPageId = 'home';
    
    // Bind methods to preserve context
    this.navigateTo = this.navigateTo.bind(this);
    this.togglePropsPanel = this.togglePropsPanel.bind(this);
    this.exportProject = this.exportProject.bind(this);
  }
  
  /**
   * Charge les pages depuis le localStorage
   * @returns {Array} Liste des pages sauvegardées
   */
  loadPagesFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PAGES);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erreur chargement pages:', error);
      return [];
    }
  }
  
  /**
   * Sauvegarde les pages dans le localStorage
   */
  savePagesToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_PAGES, JSON.stringify(this.pages));
    } catch (error) {
      console.error('Erreur sauvegarde pages:', error);
    }
  }

  /**
   * Initialise l'application
   */
  async init() {
    console.log(`🚀 Hearst Theme Builder v${this.version}`);
    
    try {
      // 1. Init UI Controls
      initUIControls();
      
      // 2. Init Theme Manager
      themeManager.init();
      
      // 3. Setup Navigation
      this.setupNavigation();
      
      // 4. Setup Header Actions
      this.setupHeaderActions();
      
      // 5. Setup Preview Controls
      this.setupPreviewControls();
      
      // 6. Setup Properties Panel
      this.setupPropsPanel();
      
      // 7. Setup Keyboard Shortcuts
      this.setupKeyboardShortcuts();
      
      // 8. Setup Page Type Cards
      this.setupPageTypeCards();
      
      // 9. Render Initial Content (Legacy)
      this.renderQuickPalettes();
      this.renderColorTokens();
      
      // 10. Load Saved State
      this.loadSavedState();
      
      console.log('✅ App initialized');
      
    } catch (error) {
      console.error('❌ Init error:', error);
    }
  }

  /**
   * Configure la navigation sidebar
   */
  setupNavigation() {
    const sidebarItems = document.querySelectorAll('.app-sidebar__item[data-view]');
    
    sidebarItems.forEach(item => {
      item.addEventListener('click', () => {
        const view = item.dataset.view;
        this.navigateTo(view);
        
        // Update active state
        sidebarItems.forEach(i => i.classList.remove('is-active'));
        item.classList.add('is-active');
      });
    });
  }

  /**
   * Navigue vers une vue
   * @param {string} viewId - ID de la vue
   */
  navigateTo(viewId) {
    // Hide all views
    document.querySelectorAll('.view-content').forEach(view => {
      view.style.display = 'none';
    });
    
    // Show target view
    const targetView = document.querySelector(`[data-view="${viewId}"]`);
    if (targetView) {
      targetView.style.display = 'block';
      this.currentView = viewId;
    }
    
    // Update view title
    this.updateViewTitle(viewId);
    
    // Special handling for views
    if (viewId === 'palettes') {
      this.renderPalettesGrid();
    }
  }

  /**
   * Met à jour le titre de la vue active
   * @param {string} viewId - ID de la vue
   */
  updateViewTitle(viewId) {
    const titles = {
      dashboard: { title: 'Accueil', subtitle: 'Choisissez une palette pour commencer' },
      palettes: { title: 'Couleurs', subtitle: 'Toutes les palettes disponibles' },
      typography: { title: 'Typographie', subtitle: 'Échelle de polices et styles de texte' },
      spacing: { title: 'Espacements', subtitle: 'Système d\'espacements cohérent' },
      components: { title: 'Composants', subtitle: 'Bibliothèque de composants UI' }
    };

    const viewInfo = titles[viewId] || { title: 'Hearst Theme Builder', subtitle: '' };
    
    const titleEl = document.getElementById('viewTitle');
    const subtitleEl = document.getElementById('viewSubtitle');
    
    if (titleEl) titleEl.textContent = viewInfo.title;
    if (subtitleEl) subtitleEl.textContent = viewInfo.subtitle;
  }

  /**
   * Configure les actions du header
   */
  setupHeaderActions() {
    // Add Page button
    const btnAddPage = document.getElementById('btnAddPage');
    if (btnAddPage) {
      btnAddPage.addEventListener('click', () => this.showPageCreator());
    }
    
    // Export button
    const btnExport = document.getElementById('btnExport');
    if (btnExport) {
      btnExport.addEventListener('click', () => this.exportProject());
    }
  }

  /**
   * Affiche le créateur de page
   */
  showPageCreator() {
    this.navigateTo('dashboard');
    showToast('info', 'Choisissez un type', 'Sélectionnez le type de page à créer');
  }

  /**
   * Setup page type cards
   */
  setupPageTypeCards() {
    const cards = document.querySelectorAll('.page-type-card');
    cards.forEach(card => {
      const btn = card.querySelector('.page-type-card__btn');
      const pageType = card.dataset.pageType;
      
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.createPage(pageType);
        });
      }
      
      card.addEventListener('click', () => {
        this.createPage(pageType);
      });
    });
  }

  /**
   * Crée une nouvelle page
   * @param {string} pageType - Type de page (dashboard, info, form, gallery, blank)
   */
  createPage(pageType) {
    const PAGE_CONFIG = {
      dashboard: {
        name: 'Dashboard',
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>'
      },
      info: {
        name: 'Page Info',
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'
      },
      form: {
        name: 'Formulaire',
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/></svg>'
      },
      gallery: {
        name: 'Galerie',
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/></svg>'
      },
      blank: {
        name: 'Page Vide',
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>'
      }
    };
    
    const config = PAGE_CONFIG[pageType] || PAGE_CONFIG.blank;
    const pageId = `page-${Date.now()}`;
    
    const page = {
      id: pageId,
      type: pageType,
      name: `${config.name} ${this.pages.length + 1}`,
      icon: config.icon,
      created: new Date().toISOString()
    };
    
    this.pages.push(page);
    this.savePagesToStorage();
    this.addPageToSidebar(page);
    this.currentPageId = pageId;
    
    showToast('success', 'Page créée', `${page.name} a été ajoutée`);
    
    // Switch to the new page view
    this.navigateTo('components');
  }

  /**
   * Ajoute une page dans la sidebar
   * @param {Object} page - Objet page
   */
  addPageToSidebar(page) {
    const pagesList = document.getElementById('pagesList');
    if (!pagesList) return;
    
    const pageItem = document.createElement('button');
    pageItem.className = 'app-sidebar__item';
    pageItem.dataset.pageId = page.id;
    pageItem.dataset.view = page.id;
    pageItem.title = page.name;
    
    pageItem.innerHTML = `
      ${page.icon}
      <span class="app-sidebar__label">${page.name}</span>
    `;
    
    pageItem.addEventListener('click', () => {
      // Update active state
      document.querySelectorAll('.app-sidebar__item').forEach(item => {
        item.classList.remove('is-active');
      });
      pageItem.classList.add('is-active');
      
      this.currentPageId = page.id;
      showToast('info', page.name, `Édition de ${page.name}`);
    });
    
    pagesList.appendChild(pageItem);
  }

  /**
   * Exporte le projet
   */
  exportProject() {
    const project = {
      version: this.version,
      pages: this.pages,
      created: new Date().toISOString()
    };
    
    const json = JSON.stringify(project, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hearst-project-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('success', 'Exporté !', `Projet avec ${this.pages.length} page(s)`);
  }

  /**
   * Configure les contrôles de preview
   */
  setupPreviewControls() {
    // Toggle props panel button in toolbar
    const btnToggleProps = document.getElementById('btnToggleProps');
    if (btnToggleProps) {
      btnToggleProps.addEventListener('click', () => this.togglePropsPanel());
    }
  }


  /**
   * Configure le panel de propriétés
   */
  setupPropsPanel() {
    const closeBtn = document.getElementById('closePanelBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.togglePropsPanel());
    }
    
    // Action buttons
    const actionSave = document.getElementById('actionSave');
    if (actionSave) {
      actionSave.addEventListener('click', () => this.saveCurrentTheme());
    }
    
    const actionExport = document.getElementById('actionExport');
    if (actionExport) {
      actionExport.addEventListener('click', () => this.exportTheme());
    }
    
    const actionCopy = document.getElementById('actionCopy');
    if (actionCopy) {
      actionCopy.addEventListener('click', () => this.copyCSSVariables());
    }
  }

  /**
   * Toggle le panel de propriétés
   */
  togglePropsPanel() {
    const panel = document.getElementById('propsPanel');
    if (panel) {
      panel.classList.toggle('is-hidden');
      this.isPropsPanelOpen = !panel.classList.contains('is-hidden');
    }
  }

  /**
   * Configure les raccourcis clavier
   */
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Cmd/Ctrl + S = Save
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        this.saveCurrentTheme();
      }
      
      // Cmd/Ctrl + E = Export
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        this.exportTheme();
      }
      
      // Escape = Close props panel if open
      if (e.key === 'Escape' && this.isPropsPanelOpen) {
        this.togglePropsPanel();
      }
    });
  }

  /**
   * Rend les palettes du dashboard
   */
  renderDashboardPalettes() {
    const container = document.getElementById('dashboardPalettes');
    if (!container) return;
    
    const palettes = themeManager.getAllPalettes();
    const currentId = themeManager.getCurrentPaletteId();
    
    container.innerHTML = Object.entries(palettes).map(([id, palette]) => `
      <div class="palette-card ${id === currentId ? 'is-active' : ''}" data-palette="${id}">
        <div class="palette-card__colors">
          <span style="background: ${palette.background.bgPrimary}"></span>
          <span style="background: ${palette.accents.accentPrimary}"></span>
          <span style="background: ${palette.background.bgSecondary}"></span>
          <span style="background: ${palette.text.textPrimary}"></span>
        </div>
        <div class="palette-card__info">
          <div class="palette-card__name">${palette.name}</div>
          <div class="palette-card__desc">${palette.description || ''}</div>
        </div>
      </div>
    `).join('');
    
    // Add click handlers
    container.querySelectorAll('.palette-card').forEach(card => {
      card.addEventListener('click', () => {
        themeManager.applyPalette(card.dataset.palette);
        this.renderDashboardPalettes();
        this.renderQuickPalettes();
        this.renderColorTokens();
        showToast('success', 'Palette applied', themeManager.getCurrentPalette().name);
      });
    });
  }

  /**
   * Rend la grille de palettes
   */
  renderPalettesGrid() {
    const container = document.getElementById('palettesGrid');
    if (!container) return;
    
    const palettes = themeManager.getAllPalettes();
    const currentId = themeManager.getCurrentPaletteId();
    
    container.innerHTML = Object.entries(palettes).map(([id, palette]) => `
      <div class="palette-card ${id === currentId ? 'is-active' : ''}" data-palette="${id}">
        <div class="palette-card__colors">
          <span style="background: ${palette.background.bgPrimary}"></span>
          <span style="background: ${palette.accents.accentPrimary}"></span>
          <span style="background: ${palette.background.bgSecondary}"></span>
          <span style="background: ${palette.text.textPrimary}"></span>
        </div>
        <div class="palette-card__info">
          <div class="palette-card__name">${palette.name}</div>
          <div class="palette-card__desc">${palette.description || ''}</div>
        </div>
      </div>
    `).join('');
    
    // Add click handlers
    container.querySelectorAll('.palette-card').forEach(card => {
      card.addEventListener('click', () => {
        themeManager.applyPalette(card.dataset.palette);
        this.renderPalettesGrid();
        this.renderDashboardPalettes();
        this.renderQuickPalettes();
        this.renderColorTokens();
        showToast('success', 'Palette applied', themeManager.getCurrentPalette().name);
      });
    });
  }

  /**
   * Rend les palettes rapides dans le panel
   */
  renderQuickPalettes() {
    const container = document.getElementById('quickPalettes');
    if (!container) return;
    
    const palettes = themeManager.getAllPalettes();
    const currentId = themeManager.getCurrentPaletteId();
    
    container.innerHTML = Object.entries(palettes).slice(0, 6).map(([id, palette]) => `
      <div class="quick-palette ${id === currentId ? 'is-active' : ''}" data-palette="${id}">
        <div class="quick-palette__colors">
          <span style="background: ${palette.background.bgPrimary}"></span>
          <span style="background: ${palette.accents.accentPrimary}"></span>
          <span style="background: ${palette.background.bgSecondary}"></span>
          <span style="background: ${palette.text.textPrimary}"></span>
        </div>
        <div class="quick-palette__name">${palette.name}</div>
      </div>
    `).join('');
    
    // Add click handlers
    container.querySelectorAll('.quick-palette').forEach(card => {
      card.addEventListener('click', () => {
        themeManager.applyPalette(card.dataset.palette);
        this.renderQuickPalettes();
        this.renderDashboardPalettes();
        this.renderPalettesGrid();
        this.renderColorTokens();
        showToast('success', 'Palette applied', themeManager.getCurrentPalette().name);
      });
    });
  }

  /**
   * Rend les tokens de couleur
   */
  renderColorTokens() {
    const container = document.getElementById('colorTokens');
    if (!container) return;
    
    const palette = themeManager.getCurrentPalette();
    if (!palette) return;
    
    const tokens = [
      { name: 'Accent', value: palette.accents.accentPrimary },
      { name: 'Background', value: palette.background.bgPrimary },
      { name: 'Surface', value: palette.background.bgSecondary },
      { name: 'Text', value: palette.text.textPrimary }
    ];
    
    container.innerHTML = tokens.map(token => `
      <div class="color-token">
        <div class="color-token__swatch" style="background: ${token.value}"></div>
        <div class="color-token__info">
          <div class="color-token__name">${token.name}</div>
          <div class="color-token__value">${token.value}</div>
        </div>
      </div>
    `).join('');
  }

  /**
   * Met à jour les statistiques
   */
  updateStats() {
    const statPalettes = document.getElementById('statPalettes');
    const statSaved = document.getElementById('statSaved');
    
    if (statPalettes) {
      statPalettes.textContent = Object.keys(themeManager.getAllPalettes()).length;
    }
    
    if (statSaved) {
      statSaved.textContent = getSavedThemes().length;
    }
  }

  /**
   * Sauvegarde le thème courant
   */
  saveCurrentTheme() {
    const name = prompt('Enter theme name:', themeManager.getCurrentPalette()?.name || 'My Theme');
    if (name) {
      themeManager.saveTheme(name);
      this.updateStats();
    }
  }

  /**
   * Exporte le thème
   */
  exportTheme() {
    const json = themeManager.exportCurrentPalette();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hearst-theme-${themeManager.getCurrentPaletteId()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('success', 'Exported', 'Theme downloaded as JSON');
  }

  /**
   * Copie les variables CSS
   */
  copyCSSVariables() {
    const palette = themeManager.getCurrentPalette();
    if (!palette) return;
    
    const css = `
/* ${palette.name} */
:root {
  --bg-primary: ${palette.background.bgPrimary};
  --bg-secondary: ${palette.background.bgSecondary};
  --bg-tertiary: ${palette.background.bgTertiary};
  --accent-primary: ${palette.accents.accentPrimary};
  --accent-secondary: ${palette.accents.accentSecondary};
  --text-primary: ${palette.text.textPrimary};
  --text-secondary: ${palette.text.textSecondary};
  --border-default: ${palette.borders.borderDefault};
}
    `.trim();
    
    navigator.clipboard.writeText(css).then(() => {
      showToast('success', 'Copied', 'CSS variables copied to clipboard');
    }).catch(() => {
      showToast('error', 'Error', 'Failed to copy');
    });
  }

  /**
   * Charge l'état sauvegardé
   */
  loadSavedState() {
    // Panel state
    const panelOpen = localStorage.getItem(STORAGE_KEY_PANEL);
    if (panelOpen === 'false') {
      this.togglePropsPanel();
    }
    
    // Restore saved pages
    this.pages.forEach(page => {
      this.addPageToSidebar(page);
    });
    
    // Listen for palette changes
    window.addEventListener('palette-changed', () => {
      this.renderQuickPalettes();
      this.renderColorTokens();
      this.renderDashboardPalettes();
      this.renderPalettesGrid();
    });
  }

  /**
   * Sauvegarde l'état
   */
  saveState() {
    localStorage.setItem(STORAGE_KEY_PANEL, this.isPropsPanelOpen.toString());
    this.savePagesToStorage();
  }
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  window.app = app;
  app.init();
});

// ==================== GLOBAL HELPERS ====================

if (typeof window !== 'undefined') {
  window.navigateTo = (viewId) => window.app?.navigateTo(viewId);
}

export default App;
