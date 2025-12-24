/* ============================================
   HEARST NAVIGATION - Routing SPA
   Gestion de la navigation entre les pages
   ============================================ */

// Routes disponibles
const routes = {
    '': 'dashboard',
    'dashboard': 'dashboard',
    'containers': 'containers-list',
    'container': 'container-detail',
    'miners': 'miners-list',
    'miner': 'miner-detail',
    'metrics': 'metrics',
    'alerts': 'alerts'
};

// Navigation state
const NavState = {
    currentPage: 'dashboard',
    params: {}
};

// Initialiser la navigation
function initNavigation() {
    // Load from hash
    const hash = window.location.hash.slice(1);
    navigateTo(hash || 'dashboard');
    
    // Listen to hash changes
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1);
        handleRouteChange(hash);
    });
    
    // Intercept link clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault();
            const href = link.getAttribute('data-link');
            navigateTo(href);
        }
    });
}

// Navigate to a page
function navigateTo(path, params = {}) {
    window.location.hash = path;
    NavState.params = params;
}

// Handle route change
function handleRouteChange(hash) {
    const [page, ...paramsParts] = hash.split('/');
    const route = routes[page] || 'dashboard';
    
    // Update active nav item
    updateActiveNavItem(page || 'dashboard');
    
    // Store current page
    NavState.currentPage = route;
    
    // Trigger page load event
    const event = new CustomEvent('page-change', {
        detail: { page: route, params: paramsParts }
    });
    window.dispatchEvent(event);
}

// Update active nav item (RÈGLE #1: fond vert + texte noir)
function updateActiveNavItem(page) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeItem = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// Generate breadcrumbs
function generateBreadcrumbs(items) {
    return items.map((item, index) => {
        const isLast = index === items.length - 1;
        return `
            <span class="breadcrumb-item ${isLast ? 'active' : ''}">
                ${isLast ? item.label : `<a href="#${item.href}">${item.label}</a>`}
            </span>
            ${!isLast ? '<span class="breadcrumb-separator">></span>' : ''}
        `;
    }).join('');
}

// Export
window.HearstNav = {
    init: initNavigation,
    navigateTo,
    generateBreadcrumbs,
    get currentPage() { return NavState.currentPage; },
    get params() { return NavState.params; }
};

