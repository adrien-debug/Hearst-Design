/**
 * PAGES.JS - Gestion des Pages (REFONTE v3.0)
 * Hearst Design System
 * 
 * Note: La gestion des pages est maintenant intégrée dans app.js
 * Ce fichier est conservé pour compatibilité arrière
 */

// ==================== PAGES MANAGER CLASS ====================

export class PagesManager {
  constructor() {
    this.pages = [
      { id: 'preview', name: 'Preview', icon: '👁️' },
      { id: 'components', name: 'Components', icon: '📦' }
    ];
    this.activePage = 'preview';
  }

  /**
   * Initialise le gestionnaire de pages
   */
  init() {
    console.log('✅ PagesManager initialized (legacy mode)');
  }

  /**
   * Rend les onglets de pages
   */
  renderPagesTabs() {
    // Now handled by app.js
  }

  /**
   * Rend la page active
   */
  renderActivePage() {
    // Now handled by app.js
  }

  /**
   * Change de page
   * @param {string} pageId - ID de la page
   */
  switchToPage(pageId) {
    this.activePage = pageId;
    if (window.app) {
      window.app.navigateTo(pageId === 'preview' ? 'dashboard' : pageId);
    }
  }

  /**
   * Ajoute une nouvelle page
   * @param {Object} page - Configuration de la page
   */
  addPage(page) {
    this.pages.push(page);
  }

  /**
   * Supprime une page
   * @param {string} pageId - ID de la page
   */
  removePage(pageId) {
    this.pages = this.pages.filter(p => p.id !== pageId);
  }
}

// ==================== INSTANCE SINGLETON ====================

const pagesManager = new PagesManager();
export default pagesManager;

// ==================== GLOBAL EXPORTS ====================

if (typeof window !== 'undefined') {
  window.pagesManager = pagesManager;
}
