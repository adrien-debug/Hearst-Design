/**
 * UI-CONTROLS.JS - Contrôles d'Interface (REFONTE v3.0)
 * Hearst Design System
 * 
 * Gère les toasts, modals, et interactions UI
 */

// ==================== TOAST NOTIFICATIONS ====================

/**
 * Affiche une notification toast
 * @param {string} type - Type ('success', 'error', 'warning', 'info')
 * @param {string} title - Titre
 * @param {string} message - Message
 */
export function showToast(type, title, message) {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <div class="toast__icon">${icons[type] || 'ℹ'}</div>
    <div class="toast__content">
      <div class="toast__title">${title}</div>
      ${message ? `<div class="toast__message">${message}</div>` : ''}
    </div>
    <button class="toast__close" onclick="this.parentElement.remove()">×</button>
  `;
  
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  container.appendChild(toast);
  
  // Auto-dismiss after 4s
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==================== MODAL CONTROLS ====================

/**
 * Ouvre une modal
 * @param {string} modalId - ID de la modal
 */
export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Ferme une modal
 * @param {string} modalId - ID de la modal
 */
export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

/**
 * Ferme toutes les modals
 */
export function closeAllModals() {
  document.querySelectorAll('.modal.is-open, .search-modal.is-open').forEach(modal => {
    modal.classList.remove('is-open');
  });
  document.body.style.overflow = '';
}

// ==================== COPY TO CLIPBOARD ====================

/**
 * Copie du texte dans le presse-papier
 * @param {string} text - Texte à copier
 * @param {string} label - Label pour le toast
 */
export function copyToClipboard(text, label = 'Value') {
  navigator.clipboard.writeText(text).then(() => {
    showToast('success', 'Copied!', `${label} copied to clipboard`);
  }).catch(() => {
    showToast('error', 'Error', 'Failed to copy');
  });
}

// ==================== DROPDOWN MENUS ====================

/**
 * Toggle un menu dropdown
 * @param {string} menuId - ID du menu
 */
export function toggleMenu(menuId) {
  const menu = document.getElementById(menuId);
  if (menu) {
    menu.classList.toggle('is-open');
  }
}

/**
 * Ferme tous les menus
 */
export function closeAllMenus() {
  document.querySelectorAll('.dropdown-menu.is-open').forEach(menu => {
    menu.classList.remove('is-open');
  });
}

// ==================== BUTTON LOADING STATE ====================

/**
 * Active/désactive l'état loading d'un bouton
 * @param {HTMLElement} button - Bouton cible
 * @param {boolean} loading - État loading
 */
export function setButtonLoading(button, loading) {
  if (!button) return;
  
  if (loading) {
    button.disabled = true;
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = `<span class="spinner"></span>`;
  } else {
    button.disabled = false;
    button.innerHTML = button.dataset.originalText || button.innerHTML;
    delete button.dataset.originalText;
  }
}

// ==================== INITIALIZATION ====================

/**
 * Initialise les contrôles UI
 */
export function initUIControls() {
  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      closeAllMenus();
    }
  });
  
  // Close modals on backdrop click
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop') || 
        e.target.classList.contains('search-modal__backdrop')) {
      closeAllModals();
    }
  });
  
  // Close modals on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
  
  console.log('✅ UI Controls initialized');
}

// ==================== LEGACY COMPATIBILITY ====================

// For backward compatibility with inline onclick handlers
export function closePaletteModal() {
  closeModal('paletteModal');
}

export function openPaletteModal(paletteId) {
  // Legacy - redirect to new flow
  if (window.themeManager) {
    window.themeManager.applyPalette(paletteId);
    showToast('success', 'Applied', 'Palette applied');
  }
}

export function toggleSaveLoadMenu() {
  toggleMenu('saveLoadMenu');
}

export function handleSearch(event) {
  // Legacy - now handled in app.js
  const query = event.target.value;
  if (window.app) {
    window.app.filterSearchResults(query);
  }
}

export function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function switchToMode(mode, button) {
  // Legacy - now using sidebar navigation
  if (window.app) {
    window.app.navigateTo(mode === 'favoris' ? 'dashboard' : 'palettes');
  }
}

export function closeThemeModal() {
  closeModal('themeModal');
}

export function compareMode() {
  showToast('info', 'Coming Soon', 'Compare mode is in development');
}

export function updateSelectionBar(type, value) {
  // Legacy - now using props panel
}

// ==================== GLOBAL EXPORTS ====================

if (typeof window !== 'undefined') {
  window.showToast = showToast;
  window.copyToClipboard = copyToClipboard;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.closeAllModals = closeAllModals;
  window.closePaletteModal = closePaletteModal;
  window.toggleSaveLoadMenu = toggleSaveLoadMenu;
  window.handleSearch = handleSearch;
  window.scrollToSection = scrollToSection;
  window.switchToMode = switchToMode;
  window.closeThemeModal = closeThemeModal;
  window.compareMode = compareMode;
}
