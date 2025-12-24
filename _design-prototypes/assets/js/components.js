/* ============================================
   HEARST COMPONENTS - Composants réutilisables
   Fonctions helper pour générer des composants UI
   ============================================ */

// Stat Card
function createStatCard(config) {
    const { icon, title, value, label, trend } = config;
    return `
        <div class="stat-card">
            <div class="stat-card-header">
                ${icon} ${title}
            </div>
            <div class="stat-card-value">${value}</div>
            <div class="stat-card-label">
                ${label}
                ${trend ? `<span class="trend ${trend.direction}">${trend.text}</span>` : ''}
            </div>
        </div>
    `;
}

// Badge (RÈGLE #3: uppercase + letter-spacing)
function createBadge(text, type = 'success') {
    const icon = {
        success: '🟢',
        warning: '⚠️',
        danger: '🔴',
        info: 'ℹ️'
    }[type] || '';
    
    return `
        <span class="badge badge-${type}">
            ${icon} ${text.toUpperCase()}
        </span>
    `;
}

// Container Card
function createContainerCard(container) {
    return `
        <div class="card container-card" data-link="container/${container.id}">
            <div class="card-header">
                <h3 class="card-title">${container.id}</h3>
                ${createBadge(container.status, container.status === 'operational' ? 'success' : 'danger')}
            </div>
            <div class="card-body">
                <div class="container-info">
                    <div class="info-row">
                        <span class="info-label">Model:</span>
                        <span class="info-value">${container.model}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Miners:</span>
                        <span class="info-value">${container.miners_count}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Hashrate:</span>
                        <span class="info-value">${(container.total_hashrate_ths / 1000).toFixed(1)} PH/s</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Power:</span>
                        <span class="info-value">${container.total_power_kw.toFixed(1)} kW</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Table Row
function createTableRow(data, columns) {
    return `
        <tr>
            ${columns.map(col => `
                <td>
                    ${col.render ? col.render(data[col.key], data) : data[col.key]}
                </td>
            `).join('')}
        </tr>
    `;
}

// Pagination
function createPagination(currentPage, totalPages, onPageChange) {
    const pages = [];
    const maxVisible = 7;
    
    let startPage = Math.max(1, currentPage - 3);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    
    return `
        <div class="pagination">
            ${currentPage > 1 ? `
                <button class="pagination-btn" onclick="${onPageChange}(${currentPage - 1})">
                    ← Previous
                </button>
            ` : ''}
            
            ${startPage > 1 ? `
                <button class="pagination-btn" onclick="${onPageChange}(1)">1</button>
                ${startPage > 2 ? '<span class="pagination-ellipsis">...</span>' : ''}
            ` : ''}
            
            ${pages.map(page => `
                <button class="pagination-btn ${page === currentPage ? 'active' : ''}" 
                        onclick="${onPageChange}(${page})">
                    ${page}
                </button>
            `).join('')}
            
            ${endPage < totalPages ? `
                ${endPage < totalPages - 1 ? '<span class="pagination-ellipsis">...</span>' : ''}
                <button class="pagination-btn" onclick="${onPageChange}(${totalPages})">${totalPages}</button>
            ` : ''}
            
            ${currentPage < totalPages ? `
                <button class="pagination-btn" onclick="${onPageChange}(${currentPage + 1})">
                    Next →
                </button>
            ` : ''}
        </div>
    `;
}

// Loading Spinner
function createLoader(text = 'Loading...') {
    return `
        <div class="loading">
            <div class="spinner"></div>
            <p>${text}</p>
        </div>
    `;
}

// Empty State
function createEmptyState(message) {
    return `
        <div class="empty-state">
            <p>${message}</p>
        </div>
    `;
}

// Modal
function showModal(config) {
    const { title, content, actions } = config;
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">${title}</div>
            <div class="modal-body">${content}</div>
            <div class="modal-footer">
                ${actions.map(action => `
                    <button class="btn ${action.primary ? 'btn-primary' : 'btn-secondary'}"
                            onclick="${action.onClick}">
                        ${action.label}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    document.body.appendChild(modal);
}

// Toast Notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: var(--primary-grey);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Format numbers
function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

function formatHashrate(ths) {
    if (ths >= 1000000) {
        return `${(ths / 1000000).toFixed(2)} EH/s`;
    } else if (ths >= 1000) {
        return `${(ths / 1000).toFixed(2)} PH/s`;
    }
    return `${ths.toFixed(2)} TH/s`;
}

function formatPower(watts) {
    if (watts >= 1000000) {
        return `${(watts / 1000000).toFixed(2)} MW`;
    } else if (watts >= 1000) {
        return `${(watts / 1000).toFixed(2)} kW`;
    }
    return `${watts.toFixed(2)} W`;
}

function formatTemperature(celsius) {
    return `${celsius.toFixed(1)}°C`;
}

// Export
window.HearstComponents = {
    createStatCard,
    createBadge,
    createContainerCard,
    createTableRow,
    createPagination,
    createLoader,
    createEmptyState,
    showModal,
    showToast,
    formatNumber,
    formatHashrate,
    formatPower,
    formatTemperature
};

